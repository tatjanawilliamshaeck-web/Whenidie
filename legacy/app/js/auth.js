(function () {
  var config = window.WID_CONFIG || {};
  var supabaseUrl = config.supabaseUrl;
  var supabaseAnonKey = config.supabaseAnonKey;

  if (!supabaseUrl || !supabaseAnonKey) {
    window.widSupabase = null;
    window.widAuthReady = Promise.resolve(false);
    return;
  }

  var supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
  window.widSupabase = supabase;
  window.widAuthReady = supabase.auth.getSession().then(function () { return true; });

  supabase.auth.onAuthStateChange(function (event, session) {
    window.dispatchEvent(new CustomEvent('wid-auth-change', { detail: { event: event, session: session } }));
  });
})();
