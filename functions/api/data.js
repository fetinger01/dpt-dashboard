// Reads every tab of the DPT Ads Feed sheet as CSV and returns one JSON object keyed by tab.
// The sheet id lives in the SHEET_ID environment variable and never reaches the browser.
const TABS = ['meta', 'daily', 'keywords', 'search_terms', 'devices', 'campaigns', 'conversion_actions', 'negatives', 'shared_negatives'];

export async function onRequest({ env }) {
  const id = env.SHEET_ID;
  const out = { _fetched_at: new Date().toISOString() };
  if (!id) {
    for (const tab of TABS) out[tab] = '';
    out._error = 'SHEET_ID is not set';
    return json(out, 'no-store');
  }
  await Promise.all(TABS.map(async (tab) => {
    const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tab)}`;
    try {
      const res = await fetch(url, { cf: { cacheTtl: 300, cacheEverything: true }, redirect: 'follow' });
      const text = res.ok ? await res.text() : '';
      // A sheet that is not shared by link answers with a sign-in page, which is not CSV.
      out[tab] = /^\s*</.test(text) ? '' : text;
    } catch (e) {
      out[tab] = '';
    }
  }));
  return json(out, 'public, max-age=300');
}

function json(body, cache) {
  return new Response(JSON.stringify(body), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': cache,
      'x-robots-tag': 'noindex'
    }
  });
}
