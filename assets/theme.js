// Light and dark theme toggle. The choice is kept in this browser only; without one the system setting applies.
(function () {
  var KEY = 'dpt-theme';
  var root = document.documentElement;
  function saved() { try { var t = localStorage.getItem(KEY); return t === 'light' || t === 'dark' ? t : null; } catch (e) { return null; } }
  function effective() {
    var t = root.getAttribute('data-theme');
    if (t === 'light' || t === 'dark') return t;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function apply(t) {
    if (t) root.setAttribute('data-theme', t); else root.removeAttribute('data-theme');
    try { if (t) localStorage.setItem(KEY, t); else localStorage.removeItem(KEY); } catch (e) {}
    paint();
  }
  function paint() {
    var btn = document.getElementById('theme'); if (!btn) return;
    var dark = effective() === 'dark';
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('title', dark ? 'Light mode' : 'Dark mode');
    btn.querySelector('.ic-sun').style.display = dark ? 'block' : 'none';
    btn.querySelector('.ic-moon').style.display = dark ? 'none' : 'block';
    btn.querySelector('.theme-text').textContent = dark ? 'Light' : 'Dark';
  }
  function init() {
    var btn = document.getElementById('theme'); if (!btn) return;
    btn.addEventListener('click', function () { apply(effective() === 'dark' ? 'light' : 'dark'); });
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onChange = function () { if (!saved()) paint(); };
      if (mq.addEventListener) mq.addEventListener('change', onChange); else if (mq.addListener) mq.addListener(onChange);
    }
    paint();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
