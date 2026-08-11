/**
 * When I Die™ – Auth-aware CTAs
 * Run on marketing pages (index, how-it-works, about, faq).
 * If user is logged in (Supabase session), update "Start" / "Create account" links
 * to "Your plan" / "Go to your plan" and point to app/dashboard.html so they stay in flow.
 */
(function () {
  var supabase = window.widSupabase;
  if (!supabase) return;

  var dashboardPath = "app/dashboard.html";

  function applyLoggedInState() {
    var els = document.querySelectorAll(".wid-cta-start");
    var text;
    els.forEach(function (el) {
      el.href = dashboardPath;
      text = el.getAttribute("data-wid-logged-in-text");
      el.textContent = text || "Your plan";
    });
    document.querySelectorAll("[data-wid-logged-in]").forEach(function (el) {
      var t = el.getAttribute("data-wid-logged-in");
      if (t) el.textContent = t;
    });
  }

  function init() {
    supabase.auth.getSession().then(function (res) {
      var session = res && res.data && res.data.session;
      if (session && session.user) applyLoggedInState();
    }).catch(function () {});
  }

  if (window.widAuthReady) {
    window.widAuthReady.then(function () { init(); });
  } else {
    init();
  }
})();
