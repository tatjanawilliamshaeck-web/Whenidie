(function () {
  var supabase = window.widSupabase;
  var config = window.WID_CONFIG || {};
  var questionsData = [];
  var answersMap = {};
  var currentUserId = null;

  var printBody = document.getElementById('print-body');
  var printDateEl = document.getElementById('print-date');
  var printBtn = document.getElementById('print-btn');

  var CHAPTER_META = [
    { level: 1, name: 'Basic Adulting' },
    { level: 2, name: 'Prevent Future Chaos' },
    { level: 3, name: 'Your Legendary Send-Off' },
    { level: 4, name: 'The Stories That Matter' },
    { level: 5, name: 'The Weird Stuff' }
  ];

  function escapeHtml(s) {
    if (!s) return '';
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function parseAnswerValue(q, value) {
    if (!value) return null;
    var fieldType = (q && q.fieldType) || (q && q.format) || 'open';
    if (fieldType === 'choice_with_story' || fieldType === 'pick_one' || fieldType === 'short_text_story' || fieldType === 'memory_trigger') {
      try {
        if (typeof value === 'string' && value.charAt(0) === '{') return JSON.parse(value);
      } catch (e) {}
    }
    return value;
  }

  function getDisplayValue(q, value) {
    if (!value) return '';
    var parsed = parseAnswerValue(q, value);
    if (parsed && typeof parsed === 'object') {
      if (parsed.choice !== undefined) {
        var parts = [parsed.choice];
        if (parsed.story) parts.push(parsed.story);
        return parts.join('\n\n');
      }
      if (parsed.primary !== undefined) {
        var parts = [parsed.primary];
        if (parsed.story) parts.push(parsed.story);
        return parts.join('\n\n');
      }
      if (parsed.main !== undefined) {
        var follow = parsed.followUp;
        return follow ? parsed.main + '\n\n' + follow : parsed.main;
      }
    }
    return String(value);
  }

  function hasAnswerValue(q, value) {
    if (!value) return false;
    var parsed = parseAnswerValue(q, value);
    if (parsed && typeof parsed === 'object') {
      if (parsed.choice !== undefined) return !!parsed.choice;
      if (parsed.primary !== undefined) return !!String(parsed.primary).trim();
      if (parsed.main !== undefined) return !!parsed.main;
    }
    return !!String(value).trim();
  }

  function loadQuestions(cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../data/questions.json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        try {
          questionsData = JSON.parse(xhr.responseText);
        } catch (e) {}
      }
      if (cb) cb();
    };
    xhr.onerror = function () { if (cb) cb(); };
    xhr.send();
  }

  function loadAnswers(cb) {
    var client = window.widSupabase;
    if (!client || !currentUserId) return cb();
    client.from('answers').select('question_id, value').eq('user_id', currentUserId)
      .then(function (res) {
        answersMap = {};
        if (res.data) res.data.forEach(function (r) { answersMap[r.question_id] = r; });
        if (cb) cb();
      })
      .catch(function () { if (cb) cb(); });
  }

  function renderFromPlan(parts) {
    if (!printBody) return;
    if (printDateEl) printDateEl.textContent = new Date().toLocaleDateString(undefined, { dateStyle: 'long' });
    if (!parts || parts.length === 0) {
      printBody.innerHTML = '<p class="print-empty">No answers yet. Add answers in your dashboard to see your plan here.</p>';
      return;
    }
    printBody.innerHTML = parts.map(function (item) {
      return '<div class="print-plan-item"><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.value) + '</p></div>';
    }).join('');
  }

  function renderFromStructured(payload) {
    if (!printBody) return;
    var sections = payload && payload.sections;
    if (payload && payload.updatedAt && printDateEl) {
      try {
        var d = new Date(payload.updatedAt);
        printDateEl.textContent = d.toLocaleDateString(undefined, { dateStyle: 'long' });
      } catch (e) {
        printDateEl.textContent = new Date().toLocaleDateString(undefined, { dateStyle: 'long' });
      }
    } else if (printDateEl) {
      printDateEl.textContent = new Date().toLocaleDateString(undefined, { dateStyle: 'long' });
    }
    if (!sections || sections.length === 0) {
      printBody.innerHTML = '<p class="print-empty">No answers yet. Add answers in your dashboard to see your plan here.</p>';
      return;
    }
    printBody.innerHTML = sections.map(function (section) {
      var title = '<img src="../assets/Logo.svg" alt="" width="20" height="20" class="print-section-daisy" /> ' + escapeHtml(section.name || 'Section');
      var itemsHtml = (section.items || []).map(function (item) {
        return '<div class="print-plan-item"><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.value) + '</p></div>';
      }).join('');
      return '<section class="print-section"><h2 class="print-section-title">' + title + '</h2>' + itemsHtml + '</section>';
    }).join('');
  }

  function render() {
    var byChapter = {};
    questionsData.forEach(function (q) {
      var val = answersMap[q.id] && answersMap[q.id].value;
      if (!hasAnswerValue(q, val || '')) return;
      var ch = q.chapter != null ? q.chapter : (q.level != null ? q.level : 1);
      if (!byChapter[ch]) byChapter[ch] = [];
      byChapter[ch].push({ title: q.title, value: getDisplayValue(q, val || '') });
    });
    var sections = CHAPTER_META.map(function (meta) {
      var items = byChapter[meta.level] || [];
      return { name: meta.name, items: items };
    }).filter(function (s) { return s.items.length > 0; });
    renderFromStructured({ updatedAt: new Date().toISOString(), sections: sections });
  }

  function init() {
    var stored;
    try {
      stored = localStorage.getItem('wid-print-plan');
    } catch (e) {}
    if (stored) {
      try {
        var plan = JSON.parse(stored);
        if (plan && typeof plan === 'object' && Array.isArray(plan.sections)) {
          renderFromStructured(plan);
          try { localStorage.removeItem('wid-print-plan'); } catch (e) {}
          return;
        }
        if (Array.isArray(plan)) {
          renderFromPlan(plan.length > 0 ? plan : null);
          try { localStorage.removeItem('wid-print-plan'); } catch (e) {}
          return;
        }
      } catch (e) {}
    }
    if (!config.supabaseUrl || !config.supabaseAnonKey) {
      if (printBody) printBody.innerHTML = '<p class="print-empty">App not configured.</p>';
      return;
    }
    var client = window.widSupabase;
    if (!client) {
      if (printBody) printBody.innerHTML = '<p class="print-empty">App not configured.</p>';
      return;
    }
    var authReady = window.widAuthReady || Promise.resolve(true);
    authReady.then(function () {
      return client.auth.getSession();
    }).then(function (res) {
      var session = res && res.data && res.data.session;
      if (!session || !session.user) {
        window.location.href = 'login.html?redirect=plan-print.html';
        return;
      }
      currentUserId = session.user.id;
      loadQuestions(function () {
        loadAnswers(function () {
          render();
        });
      });
    }).catch(function () {
      if (printBody) printBody.innerHTML = '<p class="print-empty">Something went wrong.</p>';
    });
  }

  if (printBtn) printBtn.addEventListener('click', function () { window.print(); });

  init();
})();
