# dpt-dashboard

Diamond ProTech performance dashboard, A+ pilot page and Ads page, hosted by Etinger Initiatives at `dpt.etingerinitiatives.com` on Cloudflare Pages. Static site, no build step.

- `/` reads `/api/data` on load and shows the Fall 2026 search campaign figures, refreshed hourly.
- `/aplus/` the Amazon A+ pilot. Images go in `img/aplus/` under the names used in the page.
- `/ads/` the ad creative and campaign proposal. Images and clips go in `img/ads/`.
- `functions/api/data.js` reads the DPT Ads Feed sheet through its gviz CSV endpoint and returns one JSON object keyed by tab. The sheet id is the `SHEET_ID` environment variable on the Pages project and never reaches the browser.
- `assets/dpt.css` the house style and the print stylesheet shared by the three pages.

## Deploy

Cloudflare Pages, connected to this repository, no build command, output directory `/`. Set `SHEET_ID` in the project's environment variables, then redeploy. Access is handled by Cloudflare Access on the hostname, one-time PIN by email.

## Data

A Google Ads Script named "DPT Ads Feed" in account 979-161-2242 writes the tabs `meta`, `daily`, `keywords`, `search_terms`, `devices`, `campaigns`, `conversion_actions`, `negatives` and `shared_negatives` to the sheet on an hourly schedule. Money fields arrive in micros and are divided by 1,000,000 on the page. If the feed is unreachable the page shows the figures read on Nov 4, 2026 with a visible notice.
