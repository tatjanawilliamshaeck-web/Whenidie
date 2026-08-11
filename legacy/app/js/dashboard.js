(function () {
  var supabase = window.widSupabase;
  var config = window.WID_CONFIG || {};
  var questionsData = [];
  var answersMap = {};
  var sharesList = [];
  var currentUserId = null;
  var currentQuestionId = null;

  var gateEl = document.getElementById('dashboard-gate');
  var contentEl = document.getElementById('dashboard-content');
  var noConfigEl = document.getElementById('dashboard-no-config');
  var questionsListEl = document.getElementById('questions-list');
  var questionCardContainer = document.getElementById('question-card-container');
  var questionCardTitle = document.getElementById('question-card-title');
  var questionCardPrompt = document.getElementById('question-card-prompt');
  var questionCardSuggestions = document.getElementById('question-card-suggestions');
  var questionCardInputWrap = document.getElementById('question-card-input-wrap');
  var questionCardStoryWrap = document.getElementById('question-card-story-wrap');
  var questionCardStoryLabel = document.getElementById('question-card-story-label');
  var questionCardStoryInput = document.getElementById('question-card-story-input');
  var questionCardCounter = document.getElementById('question-card-counter');
  var autosaveIndicator = document.getElementById('autosave-indicator');
  var questionInspiration = document.getElementById('question-inspiration');
  var questionInspirationText = document.getElementById('question-inspiration-text');
  var currentQuestionIndex = 0;
  var sharedListEl = document.getElementById('shared-list');
  var shareForm = document.getElementById('share-form');
  var progressCountEl = document.getElementById('progress-count');
  var progressTotalEl = document.getElementById('progress-total');
  var progressSubEl = document.getElementById('progress-sub');
  var progressPayoffEl = document.getElementById('progress-payoff');
  var progressRingFill = contentEl ? contentEl.querySelector('.progress-ring-fill') : null;
  var questionsEmptyEl = document.getElementById('questions-empty');
  var navUserEmail = document.getElementById('nav-user-email');
  var userDisplayNameEl = document.getElementById('user-display-name');
  var answerModal = document.getElementById('answer-modal');
  var answerModalTitle = document.getElementById('answer-modal-title');
  var answerModalBody = document.getElementById('answer-modal-body');
  var answerModalCounter = document.getElementById('answer-modal-counter');
  var answerInput = document.getElementById('answer-input');
  var modalBackdrop = document.getElementById('modal-backdrop');
  var modalClose = document.getElementById('modal-close');
  var modalErrorEl = document.getElementById('modal-error');
  var modalErrorText = document.getElementById('modal-error-text');
  var dashboardWelcomeEl = document.getElementById('dashboard-welcome');
  var planPreviewEl = document.getElementById('plan-preview');
  var toastEl = document.getElementById('toast');
  var nextUpBlock = document.getElementById('next-up-block');
  var nextUpTitleEl = document.getElementById('next-up-title');
  var skippedReminderEl = document.getElementById('skipped-reminder');
  var skippedCountEl = document.getElementById('skipped-count');
  var sharedSummaryEl = document.getElementById('shared-summary');
  var sentInvitesSectionEl = document.getElementById('sent-invites-section');
  var recentActivityEl = document.getElementById('recent-activity');
  var shareCategoriesWrap = document.getElementById('share-categories-wrap');
  var shareFullPlanCheckbox = document.getElementById('share-full-plan');
  var shareCategoryCheckboxesEl = document.getElementById('share-category-checkboxes');
  var firstUnansweredId = null;
  var answeredCountBeforeSave = 0;

  var INVITE_MESSAGE_TEMPLATES = {
    responsible: "Hey — I did a responsible adult thing.\n\nI put some important info in one place in case something ever happens to me.\n\nYou're the person I trust with access if needed.",
    funny: "Hey — if I ever get hit by a bus, abducted by aliens, or just forget all my passwords…\n\nThis has the important stuff.\n\nYou're my designated \"person who knows things.\"",
    sweet: "Hey — I set up a secure place with some important information in case something ever happens to me.\n\nI added you because I trust you.",
    smartass: "If I disappear mysteriously, please don't let my internet history define my legacy.\n\nThis has the important information.\n\nYou're the chosen one.",
    chaotic: "If I disappear mysteriously, please don't let my internet history define my legacy.\n\nThis has the important information.\n\nYou're the chosen one.",
    millennial: "I have achieved peak adulthood.\n\nI organized my important life info.\n\nYou are now the emergency contact for my existence.",
    surprise: [
      "If I ever vanish into the woods to start a new life, this has the important stuff.\n\nYou are my chosen adult.",
      "I organized my life like a grown-up.\n\nPlease act surprised.",
      "In case of emergency, break glass — or just open this link.\n\nYou're the one I trust with the glass-breaking.",
      "If I ever get hit by a bus, abducted by aliens, or just forget all my passwords… This has the important stuff. You're my designated \"person who knows things.\"",
      "I have achieved peak adulthood. I organized my important life info. You are now the emergency contact for my existence."
    ]
  };

  var INVITE_SUCCESS_TOASTS = [
    "Invite sent. Nice. Responsible AND mysterious.",
    "Done. You've officially done more planning than 95% of people.",
    "Sent. Your future self is already thanking you.",
    "They're in. Now go have a snack."
  ];

  var RELIEF_HUMOR_LINES = [
    "You just became one of the most responsible people on the internet today.",
    "Congrats. Your future family just avoided a week of password-guessing.",
    "Nice work. You've officially done more planning than 90% of people.",
    "Life Admin Achievement: Future Chaos Prevented."
  ];

  var RELIEF_CHAPTER = 2;
  var ASSET_BASE = '../assets/';
  var CHAPTER_META = [
    { level: 1, name: 'Basic Adulting', tagline: 'Quick practical info.', completionMessage: "Nice. You've already done more planning than most humans.", icon: ASSET_BASE + 'icon-document.svg' },
    { level: 2, name: 'Prevent Future Chaos', tagline: 'Prevent confusion and detective work.', completionMessage: 'Future chaos reduced.', icon: ASSET_BASE + 'icon-checklist.svg' },
    { level: 3, name: 'Your Legendary Send-Off', tagline: 'Event planning.', completionMessage: 'Your send-off is taking shape.', icon: ASSET_BASE + 'icon-music.svg' },
    { level: 4, name: 'The Stories That Matter', tagline: 'Meaningful reflections.', completionMessage: "This is the part people will care about most.", icon: ASSET_BASE + 'icon-notebook.svg' },
    { level: 5, name: 'The Weird Stuff', tagline: 'Personality and humor.', completionMessage: 'Your legacy now includes chaos.', icon: ASSET_BASE + 'icon-chat.svg' }
  ];
  var LEVEL_META = CHAPTER_META;

  function tryShowReliefScreen(force) {
    try {
      if (sessionStorage.getItem('wid-relief-seen')) return;
    } catch (e) { return; }
    if (!force) {
      var answered = getAnsweredCount();
      var hasShared = sharesList && sharesList.length > 0;
      if (answered < 2 && !hasShared) return;
    }
    var reliefModal = document.getElementById('relief-modal');
    var reliefHumour = document.getElementById('relief-humor');
    if (!reliefModal) return;
    if (reliefHumour && RELIEF_HUMOR_LINES.length) {
      reliefHumour.textContent = RELIEF_HUMOR_LINES[Math.floor(Math.random() * RELIEF_HUMOR_LINES.length)];
    }
    reliefModal.hidden = false;
    document.body.classList.add('relief-modal-open');
    try {
      sessionStorage.setItem('wid-relief-seen', '1');
    } catch (e) {}
  }

  function closeReliefModal() {
    var reliefModal = document.getElementById('relief-modal');
    if (reliefModal) reliefModal.hidden = true;
    document.body.classList.remove('relief-modal-open');
  }

  function showGate() {
    if (gateEl) gateEl.hidden = false;
    if (contentEl) contentEl.hidden = true;
    if (noConfigEl) noConfigEl.hidden = true;
  }
  function showContent() {
    if (gateEl) gateEl.hidden = true;
    if (contentEl) contentEl.hidden = false;
    if (noConfigEl) noConfigEl.hidden = true;
    if (answerModal) answerModal.hidden = true;
    currentQuestionId = null;
  }
  function showNoConfig() {
    if (gateEl) gateEl.hidden = true;
    if (contentEl) contentEl.hidden = true;
    if (noConfigEl) noConfigEl.hidden = false;
  }

  function loadQuestionsFromJson(cb) {
    var done = false;
    function finish(err) {
      if (done) return;
      done = true;
      if (cb) cb(err);
    }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../data/questions.json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        try {
          questionsData = JSON.parse(xhr.responseText) || [];
          finish();
        } catch (e) {
          finish(e);
        }
      } else {
        tryFallback();
      }
    };
    xhr.onerror = function () { tryFallback(); };
    function tryFallback() {
      var f = new XMLHttpRequest();
      f.open('GET', 'data/questions.json');
      f.onload = function () {
        if (f.status === 200) {
          try {
            questionsData = JSON.parse(f.responseText) || [];
          } catch (e) {}
          finish();
        } else {
          finish(new Error('Could not load questions'));
        }
      };
      f.onerror = function () { finish(new Error('Could not load questions')); };
      f.send();
    }
    if (xhr.timeout !== undefined) {
      xhr.timeout = 10000;
      xhr.ontimeout = function () { finish(new Error('Timeout')); };
    }
    xhr.send();
  }

  function loadQuestionsFromSupabase(cb) {
    if (!supabase || !cb) return cb && cb();
    var done = false;
    function finish() {
      if (done) return;
      done = true;
      cb();
    }
    var t = setTimeout(finish, 8000);
    supabase.from('questions').select('*').order('order', { ascending: true })
      .then(function (res) {
        if (res.data && res.data.length) questionsData = res.data;
        clearTimeout(t);
        finish();
      })
      .catch(function () {
        clearTimeout(t);
        finish();
      });
  }

  function loadAnswers(cb) {
    if (!supabase || !currentUserId) return cb();
    supabase.from('answers').select('question_id, value, updated_at').eq('user_id', currentUserId)
      .then(function (res) {
        answersMap = {};
        if (res.data) res.data.forEach(function (r) { answersMap[r.question_id] = r; });
        if (cb) cb();
      })
      .catch(function () { if (cb) cb(); });
  }

  function loadShares(cb, opts) {
    if (!supabase || !currentUserId) return cb();
    supabase.from('shares').select('id, email, role, invited_at, invite_token, invite_sent_at, opened_at, allowed_categories').eq('user_id', currentUserId).order('invited_at', { ascending: false })
      .then(function (res) {
        var data = res.data || [];
        if (data.length > 0 || !opts || !opts.keepIfEmpty) sharesList = data;
        if (cb) cb();
      })
      .catch(function () { if (cb) cb(); });
  }

  function renderProgress() {
    var total = questionsData.length;
    var answered = getAnsweredCount();
    var countEl = document.getElementById('progress-count');
    var totalEl = document.getElementById('progress-total');
    if (countEl) countEl.textContent = answered;
    if (totalEl) totalEl.textContent = total;
    var daisyWrap = document.getElementById('daisy-progress-wrap');
    if (total > 0 && daisyWrap) {
      var pct = Math.round((answered / total) * 100);
      daisyWrap.setAttribute('aria-valuenow', pct);
    }
    if (progressSubEl) progressSubEl.hidden = !(total > 0 && answered === 0);
    if (progressPayoffEl) progressPayoffEl.hidden = answered === 0;
    var container = document.getElementById('daisy-progress-container');
    if (container && typeof window.DaisyProgress !== 'undefined') {
      window.DaisyProgress.update(container, {
        total: total,
        completed: answered,
        variant: 'hero',
        assetBase: '../assets/'
      });
    }
    if (daisyWrap) {
      daisyWrap.classList.toggle('daisy-progress-wrap--hero', total > 0);
    }
  }

  var LEVEL_UNLOCK_PCT = 0.7;

  function getQuestionsByLevel() {
    var byLevel = {};
    questionsData.forEach(function (q) {
      var lvl = q.chapter != null ? q.chapter : (q.level != null ? q.level : 1);
      if (!byLevel[lvl]) byLevel[lvl] = [];
      byLevel[lvl].push(q);
    });
    var level1 = byLevel[1] || [];
    var level1Sorted = level1.slice().sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
    var level1Answered = level1Sorted.filter(function (q) { return hasAnswerValue(q, (answersMap[q.id] && answersMap[q.id].value) || ''); }).length;
    var level1Total = level1Sorted.length;
    var level1Pct = level1Total > 0 ? level1Answered / level1Total : 0;
    var basicAdultingUnlocked = level1Pct >= LEVEL_UNLOCK_PCT;
    return CHAPTER_META.map(function (meta) {
      var lvl = meta.level;
      var questions = (byLevel[lvl] || []).slice().sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
      var answered = questions.filter(function (q) { return hasAnswerValue(q, (answersMap[q.id] && answersMap[q.id].value) || ''); }).length;
      var total = questions.length;
      var pct = total > 0 ? answered / total : 0;
      var isComplete = total > 0 && answered === total;
      var isUnlocked = lvl === 1 || basicAdultingUnlocked;
      return {
        level: lvl,
        name: meta.name,
        tagline: meta.tagline,
        completionMessage: meta.completionMessage,
        icon: meta.icon,
        questions: questions,
        answered: answered,
        total: total,
        pct: pct,
        isComplete: isComplete,
        isUnlocked: isUnlocked
      };
    });
  }

  function getLevelByQuestionId(questionId) {
    var q = questionsData.find(function (x) { return x.id === questionId; });
    return q ? (q.chapter != null ? q.chapter : (q.level != null ? q.level : 1)) : 1;
  }

  function getQuestionsByCategory() {
    var byCat = {};
    questionsData.forEach(function (q) {
      var c = q.category || 'Other';
      if (!byCat[c]) byCat[c] = [];
      byCat[c].push(q);
    });
    var levelOrder = LEVEL_META.map(function (m) { return m.name; });
    var order = levelOrder.concat(Object.keys(byCat).filter(function (c) { return levelOrder.indexOf(c) < 0; }));
    return order.filter(function (c) { return byCat[c]; }).map(function (c) { return { category: c, questions: byCat[c] }; });
  }

  function getFirstQuestionIndexForChapter(chapterNum) {
    for (var i = 0; i < questionsData.length; i++) {
      var ch = questionsData[i].chapter != null ? questionsData[i].chapter : questionsData[i].level;
      if (ch === chapterNum) return i;
    }
    return 0;
  }

  function renderLevelProgress() {
    var el = document.getElementById('level-progress-list');
    if (!el) return;
    var levels = getQuestionsByLevel();
    var currentQ = getCurrentQuestion();
    var currentIndex = currentQuestionIndex;
    el.innerHTML = levels.map(function (l) {
      var chapterTitle = escapeHtml(l.name);
      var questionItems = (l.questions || []).map(function (q) {
        var idx = questionsData.findIndex(function (x) { return x.id === q.id; });
        if (idx < 0) return '';
        var answered = hasAnswerValue(q, (answersMap[q.id] && answersMap[q.id].value) || '');
        var isCurrent = idx === currentIndex;
        var icon = isCurrent ? '→' : (answered ? '✓' : '○');
        var shortTitle = q.title.length > 48 ? q.title.substring(0, 45) + '…' : q.title;
        var cls = 'nav-question' + (answered ? ' nav-question--answered' : ' nav-question--unanswered') + (isCurrent ? ' nav-question--current' : '');
        var ariaLabel = (isCurrent ? 'Current question: ' : '') + q.title;
        return '<li><button type="button" class="' + cls + '" data-index="' + idx + '" aria-label="' + escapeHtml(ariaLabel) + '"><span class="nav-question__icon" aria-hidden="true">' + icon + '</span> <span class="nav-question__title">' + escapeHtml(shortTitle) + '</span></button></li>';
      }).join('');
      var chapterCls = 'chapter-block' + (l.isUnlocked ? '' : ' chapter-block--locked');
      var iconHtml = l.icon ? '<img src="' + escapeHtml(l.icon) + '" alt="" class="chapter-nav__chapter-icon" width="20" height="20" aria-hidden="true" />' : '';
      var titleWithIcon = '<span class="chapter-nav__title-inner"><img src="' + escapeHtml(ASSET_BASE) + 'Logo.svg" alt="" class="chapter-nav__daisy-icon" width="48" height="19" aria-hidden="true" /><span class="chapter-nav__icon-cell">' + iconHtml + '</span><span class="chapter-nav__chapter-text">' + chapterTitle + '</span></span>';
      return '<li class="' + chapterCls + '" data-chapter="' + l.level + '"><span class="chapter-nav__chapter-title">' + titleWithIcon + '</span><ul class="chapter-nav__question-list">' + questionItems + '</ul></li>';
    }).join('');
  }

  function getDaisySvg(state, answered, total) {
    if (state === 'done') {
      return '<svg class="milestone-daisy__svg milestone-daisy__svg--done" viewBox="0 0 24 24" width="20" height="20" focusable="false" aria-hidden="true"><circle class="daisy-center" cx="12" cy="12" r="3"/><circle class="daisy-petal" cx="12" cy="6" r="2.5"/><circle class="daisy-petal" cx="18.2" cy="9.8" r="2.5"/><circle class="daisy-petal" cx="18.2" cy="14.2" r="2.5"/><circle class="daisy-petal" cx="12" cy="18" r="2.5"/><circle class="daisy-petal" cx="5.8" cy="14.2" r="2.5"/><circle class="daisy-petal" cx="5.8" cy="9.8" r="2.5"/></svg>';
    }
    if (state === 'progress') {
      var petals = total > 0 ? Math.max(0, Math.min(6, Math.round((answered / total) * 6))) : 0;
      var positions = [[12,6],[18.2,9.8],[18.2,14.2],[12,18],[5.8,14.2],[5.8,9.8]];
      var petalsHtml = '';
      for (var i = 0; i < 6; i++) {
        var filled = i < petals ? ' daisy-petal--filled' : '';
        petalsHtml += '<circle class="daisy-petal' + filled + '" cx="' + positions[i][0] + '" cy="' + positions[i][1] + '" r="2.5"/>';
      }
      return '<svg class="milestone-daisy__svg milestone-daisy__svg--progress" viewBox="0 0 24 24" width="20" height="20" focusable="false" aria-hidden="true"><circle class="daisy-center" cx="12" cy="12" r="2.8"/>' + petalsHtml + '</svg>';
    }
    return '<svg class="milestone-daisy__svg milestone-daisy__svg--bud" viewBox="0 0 24 24" width="20" height="20" focusable="false" aria-hidden="true"><circle class="daisy-bud" cx="12" cy="12" r="4"/></svg>';
  }

  function goToChapter(chapterNum) {
    var idx = getFirstQuestionIndexForChapter(chapterNum);
    goToQuestion(idx);
  }

  function goToQuestion(index) {
    if (index < 0 || index >= questionsData.length) return;
    currentQuestionIndex = index;
    renderCurrentQuestion();
    renderLevelProgress();
    renderSkippedQuestions();
    renderChapterProgress();
    renderNextUnanswered();
  }

  function renderSkippedQuestions() {
    var wrap = document.getElementById('skipped-questions-wrap');
    var list = document.getElementById('skipped-questions-list');
    if (!wrap || !list) return;
    var skipped = [];
    questionsData.forEach(function (q, idx) {
      var val = answersMap[q.id] && answersMap[q.id].value;
      if (!hasAnswerValue(q, val || '')) skipped.push({ index: idx, title: q.title });
    });
    if (skipped.length === 0) {
      wrap.hidden = true;
      list.innerHTML = '';
      return;
    }
    wrap.hidden = false;
    list.innerHTML = skipped.map(function (s) {
      var short = s.title.length > 42 ? s.title.substring(0, 39) + '…' : s.title;
      return '<li><button type="button" class="skipped-question-link" data-index="' + s.index + '" aria-label="Go to question: ' + escapeHtml(s.title) + '">' + escapeHtml(short) + '</button></li>';
    }).join('');
  }

  function renderChapterProgress() {
    var wrap = document.getElementById('chapter-progress-wrap');
    var textEl = document.getElementById('chapter-progress-text');
    var chapterContainer = document.getElementById('chapter-daisy-container');
    var questionContainer = document.getElementById('question-level-daisy-container');
    if (!wrap || !textEl) return;
    var q = getCurrentQuestion();
    if (!q) {
      if (chapterContainer) { chapterContainer.hidden = true; chapterContainer.setAttribute('aria-hidden', 'true'); }
      if (questionContainer) { questionContainer.hidden = true; questionContainer.setAttribute('aria-hidden', 'true'); }
      textEl.textContent = '0 of 0 questions answered in this chapter';
      return;
    }
    var ch = q.chapter != null ? q.chapter : q.level;
    var levels = getQuestionsByLevel();
    var level = levels.find(function (l) { return l.level === ch; });
    if (!level) {
      if (chapterContainer) { chapterContainer.hidden = true; chapterContainer.setAttribute('aria-hidden', 'true'); }
      if (questionContainer) { questionContainer.hidden = true; questionContainer.setAttribute('aria-hidden', 'true'); }
      textEl.textContent = '0 of 0 questions answered in this chapter';
      return;
    }
    textEl.textContent = level.answered + ' of ' + level.total + ' questions answered in this chapter';
    if (typeof window.DaisyProgress !== 'undefined') {
      if (chapterContainer) {
        chapterContainer.hidden = false;
        chapterContainer.removeAttribute('aria-hidden');
        window.DaisyProgress.update(chapterContainer, {
          total: level.total,
          completed: level.answered,
          variant: 'chapter',
          assetBase: '../assets/'
        });
      }
      if (questionContainer && level.total > 0) {
        questionContainer.hidden = false;
        questionContainer.removeAttribute('aria-hidden');
        window.DaisyProgress.update(questionContainer, {
          total: level.total,
          completed: level.answered,
          variant: 'compact',
          petalCount: level.total,
          assetBase: '../assets/'
        });
      }
    }
    if (chapterContainer && !level.total) chapterContainer.hidden = true;
    if (questionContainer && !level.total) questionContainer.hidden = true;
  }

  function getNextUnansweredIndex(fromIndex) {
    for (var i = fromIndex + 1; i < questionsData.length; i++) {
      var q = questionsData[i];
      var val = answersMap[q.id] && answersMap[q.id].value;
      if (!hasAnswerValue(q, val || '')) return i;
    }
    for (var j = 0; j < fromIndex; j++) {
      var q2 = questionsData[j];
      var val2 = answersMap[q2.id] && answersMap[q2.id].value;
      if (!hasAnswerValue(q2, val2 || '')) return j;
    }
    return -1;
  }

  function getUnansweredCountInChapter(chapterNum) {
    var levels = getQuestionsByLevel();
    var level = levels.find(function (l) { return l.level === chapterNum; });
    if (!level) return 0;
    return level.total - level.answered;
  }

  function renderNextUnanswered() {
    var wrap = document.getElementById('next-unanswered-wrap');
    var textEl = document.getElementById('next-unanswered-text');
    if (!wrap || !textEl) return;
    var q = getCurrentQuestion();
    if (!q) return;
    var ch = q.chapter != null ? q.chapter : q.level;
    var unansweredInChapter = getUnansweredCountInChapter(ch);
    var nextIdx = getNextUnansweredIndex(currentQuestionIndex);
    if (unansweredInChapter <= 0 && nextIdx < 0) {
      wrap.hidden = true;
      return;
    }
    wrap.hidden = false;
    if (unansweredInChapter > 0) {
      textEl.textContent = 'You still have ' + unansweredInChapter + ' unanswered question' + (unansweredInChapter === 1 ? '' : 's') + ' in this chapter.';
    } else {
      textEl.textContent = 'This chapter is complete. Jump to the next unanswered question elsewhere.';
    }
  }

  function getCurrentQuestion() {
    return questionsData[currentQuestionIndex] || null;
  }

  function buildAnswerValueFromInputs(q) {
    var fieldType = (q.fieldType || q.format) || 'long_text';
    var primaryInput = document.getElementById('question-card-primary-input');
    var choiceActive = document.querySelector('.answer-choice--active');
    if (fieldType === 'choice_with_story' && q.choices && q.choices.length) {
      var choice = choiceActive ? (choiceActive.getAttribute('data-choice') || '').trim() : '';
      var story = (questionCardStoryInput && questionCardStoryInput.value) || '';
      if (!choice) return null;
      return story.trim() ? JSON.stringify({ choice: choice, story: story.trim() }) : choice;
    }
    if (fieldType === 'short_text_story') {
      var primary = (primaryInput && primaryInput.value) || '';
      var story = (questionCardStoryInput && questionCardStoryInput.value) || '';
      primary = primary.trim();
      story = story.trim();
      if (q.maxLength && primary.length > q.maxLength) primary = primary.substring(0, q.maxLength);
      return story ? JSON.stringify({ primary: primary, story: story }) : primary;
    }
    if (primaryInput) {
      var v = (primaryInput.value || '').trim();
      if (q.maxLength && v.length > q.maxLength) v = v.substring(0, q.maxLength);
      return v;
    }
    return null;
  }

  function saveCurrentAnswer(cb) {
    var q = getCurrentQuestion();
    if (!q) { if (cb) cb(); return; }
    var value = buildAnswerValueFromInputs(q);
    if (value == null && (q.fieldType === 'choice_with_story' || q.fieldType === 'pick_one')) { if (cb) cb(); return; }
    var levelGroupsBefore = getQuestionsByLevel();
    if (value == null) value = '';
    answersMap[q.id] = { value: value, updated_at: new Date().toISOString() };
    renderProgress();
    renderLevelProgress();
    renderSkippedQuestions();
    renderChapterProgress();
    renderNextUnanswered();
    renderPlanPreview();
    if (autosaveIndicator) {
      autosaveIndicator.textContent = 'Saving…';
      autosaveIndicator.hidden = false;
    }
    if (!supabase || !currentUserId) {
      if (autosaveIndicator) { autosaveIndicator.textContent = 'Saved'; setTimeout(function () { if (autosaveIndicator) autosaveIndicator.hidden = true; }, 2000); }
      if (cb) cb();
      return;
    }
    supabase.from('answers').upsert({
      user_id: currentUserId,
      question_id: q.id,
      value: value,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id,question_id' })
      .then(function () {
        var levelGroupsAfter = getQuestionsByLevel();
        if (autosaveIndicator) {
          autosaveIndicator.textContent = 'Saved';
          setTimeout(function () { if (autosaveIndicator) autosaveIndicator.hidden = true; }, 2000);
        }
        var currentChapter = q.chapter != null ? q.chapter : q.level;
        var currentBefore = levelGroupsBefore.find(function (x) { return x.level === currentChapter; });
        var currentAfter = levelGroupsAfter.find(function (x) { return x.level === currentChapter; });
        var justCompletedChapter = currentBefore && currentAfter && !currentBefore.isComplete && currentAfter.isComplete;
        var nextLvl = levelGroupsAfter.find(function (x) { return x.level === currentChapter + 1; });
        var nextBefore = levelGroupsBefore.find(function (x) { return x.level === currentChapter + 1; });
        var pendingUnlockName = null;
        if (nextLvl && nextLvl.isUnlocked && nextBefore && !nextBefore.isUnlocked) {
          if (currentChapter === 1) {
            pendingUnlockName = 'Explore the rest in any order—pick what matters to you next.';
          } else {
            var nextMeta = CHAPTER_META.find(function (m) { return m.level === nextLvl.level; });
            pendingUnlockName = nextMeta ? nextMeta.name : 'Next chapter';
          }
        }
        var ch2 = levelGroupsAfter.find(function (x) { return x.level === RELIEF_CHAPTER; });
        var pendingRelief = ch2 && ch2.isComplete;
        if (value && typeof showToast === 'function') showToast('Saved');
        var encouragementWrap = document.getElementById('encouragement-wrap');
        var encouragementText = document.getElementById('encouragement-text');
        if (value && encouragementText) {
          var levelMeta = CHAPTER_META.find(function (m) { return m.level === currentChapter; });
          encouragementText.textContent = levelMeta ? levelMeta.completionMessage : 'Nice answer.';
          if (encouragementWrap) encouragementWrap.hidden = false;
        }
        if (currentAfter && currentAfter.total > 0 && (currentAfter.total - currentAfter.answered) === 1 && typeof showToast === 'function') {
          showToast("You're close to finishing this chapter");
        }
        if (justCompletedChapter) {
          var meta = CHAPTER_META.find(function (m) { return m.level === currentChapter; });
          if (meta && typeof showToast === 'function') showToast('Chapter complete. ' + (meta.completionMessage || ''));
          showMilestoneCelebration(currentChapter, pendingUnlockName, pendingRelief);
        } else {
          if (pendingUnlockName) showUnlockModal(pendingUnlockName);
          if (pendingRelief) tryShowReliefScreen(true);
        }
        renderChapterProgress();
        renderNextUnanswered();
        if (cb) cb();
      })
      .catch(function () { if (cb) cb(); });
  }

  function showUnlockModal(chapterName) {
    var modal = document.getElementById('unlock-modal');
    var nameEl = document.getElementById('unlock-chapter-name');
    if (modal && nameEl) {
      nameEl.textContent = chapterName;
      modal.removeAttribute('hidden');
      document.body.classList.add('unlock-modal-open');
    }
  }

  function hideUnlockModal() {
    var modal = document.getElementById('unlock-modal');
    if (modal) {
      modal.setAttribute('hidden', '');
      document.body.classList.remove('unlock-modal-open');
    }
  }

  function isUnlockModalOpen() {
    var modal = document.getElementById('unlock-modal');
    return modal && !modal.hidden;
  }

  var milestonePendingUnlockName = null;
  var milestonePendingRelief = false;

  function showMilestoneCelebration(level, pendingUnlockName, pendingRelief) {
    var modal = document.getElementById('milestone-modal');
    var headingEl = document.getElementById('milestone-heading');
    var messageEl = document.getElementById('milestone-message');
    var iconEl = document.getElementById('milestone-icon');
    var shareWrap = document.getElementById('milestone-share-wrap');
    if (!modal || !headingEl || !messageEl) return;
    var meta = CHAPTER_META.find(function (m) { return m.level === level; });
    var name = meta ? meta.name : 'Chapter ' + level;
    var message = meta ? meta.completionMessage : 'You completed this chapter.';
    var icon = meta ? meta.icon : null;
    headingEl.textContent = name + ' complete!';
    messageEl.textContent = message;
    if (iconEl) {
      if (icon && typeof icon === 'string' && icon.indexOf('.svg') !== -1) {
        iconEl.innerHTML = '<img src="' + escapeHtml(icon) + '" alt="" width="32" height="32" aria-hidden="true" />';
      } else {
        iconEl.textContent = '';
      }
    }
    if (shareWrap) {
      shareWrap.hidden = !(sharesList && sharesList.length === 0);
    }
    milestonePendingUnlockName = pendingUnlockName || null;
    milestonePendingRelief = !!pendingRelief;
    modal.removeAttribute('hidden');
    document.body.classList.add('milestone-modal-open');
  }

  function hideMilestoneCelebration(skipPending) {
    var modal = document.getElementById('milestone-modal');
    if (modal) {
      modal.setAttribute('hidden', '');
      document.body.classList.remove('milestone-modal-open');
    }
    var pendingUnlock = milestonePendingUnlockName;
    var pendingRelief = milestonePendingRelief;
    milestonePendingUnlockName = null;
    milestonePendingRelief = false;
    if (!skipPending) {
      if (pendingUnlock) showUnlockModal(pendingUnlock);
      else if (pendingRelief) tryShowReliefScreen(true);
    }
  }

  function renderCurrentQuestion() {
    if (questionsEmptyEl) questionsEmptyEl.hidden = questionsData.length > 0;
    if (questionsData.length === 0) {
      if (questionCardContainer) questionCardContainer.innerHTML = '';
      return;
    }
    var q = getCurrentQuestion();
    if (!q || !questionCardTitle) return;
    questionCardTitle.textContent = q.title;
    questionCardPrompt.textContent = q.body || '';
    if (questionCardCounter) questionCardCounter.textContent = 'Question ' + (currentQuestionIndex + 1) + ' of ' + questionsData.length;
    var raw = (answersMap[q.id] && answersMap[q.id].value) || '';
    var parsed = parseAnswerValue(q, raw);
    var fieldType = (q.fieldType || q.format) || 'long_text';

    var suggestionsListEl = document.getElementById('question-card-suggestions-list');
    if (questionCardSuggestions) {
      if (q.suggestions && q.suggestions.length) {
        questionCardSuggestions.hidden = false;
        if (suggestionsListEl) {
          suggestionsListEl.innerHTML = '';
          q.suggestions.forEach(function (s) {
            var pill = document.createElement('button');
            pill.type = 'button';
            pill.className = 'question-card-suggestion-pill';
            pill.textContent = s;
            pill.addEventListener('click', function () {
              var primaryInput = document.getElementById('question-card-primary-input');
              if (primaryInput) {
                primaryInput.value = s;
                primaryInput.focus();
                saveCurrentAnswer();
              }
            });
            suggestionsListEl.appendChild(pill);
          });
        }
      } else {
        questionCardSuggestions.hidden = true;
      }
    }
    var rightSidebarFallback = document.getElementById('right-sidebar-fallback');
    if (questionInspiration && questionInspirationText) {
      if (q.suggestions && q.suggestions.length) {
        questionInspirationText.textContent = q.suggestions.join(' · ');
        questionInspiration.hidden = false;
        if (rightSidebarFallback) rightSidebarFallback.hidden = true;
      } else {
        questionInspiration.hidden = true;
        if (rightSidebarFallback) rightSidebarFallback.hidden = false;
      }
    } else if (rightSidebarFallback) {
      rightSidebarFallback.hidden = false;
    }

    var maxLen = fieldType === 'short_text' || fieldType === 'short_text_story' ? (q.maxLength || 120) : (q.maxLength || 2000);
    questionCardInputWrap.innerHTML = '';
    var hasStoryField = fieldType === 'short_text_story' || (fieldType === 'choice_with_story' && (q.storyPrompt || q.choices));
    var storyToggleBtn = document.getElementById('question-card-story-toggle');

    if (fieldType === 'choice_with_story' && q.choices && q.choices.length) {
      var selected = (parsed && typeof parsed === 'object' && parsed.choice) ? parsed.choice : (typeof parsed === 'string' ? parsed : '');
      var storyVal = (parsed && typeof parsed === 'object' && parsed.story) ? parsed.story : '';
      var choicesDiv = document.createElement('div');
      choicesDiv.className = 'question-card-choices';
      choicesDiv.setAttribute('role', 'group');
      choicesDiv.setAttribute('aria-label', 'Choose one');
      q.choices.forEach(function (c) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'answer-choice' + (c === selected ? ' answer-choice--active' : '');
        btn.setAttribute('data-choice', c);
        btn.textContent = c;
        btn.addEventListener('click', function () {
          choicesDiv.querySelectorAll('.answer-choice').forEach(function (b) { b.classList.remove('answer-choice--active'); });
          btn.classList.add('answer-choice--active');
        });
        choicesDiv.appendChild(btn);
      });
      questionCardInputWrap.appendChild(choicesDiv);
      if (questionCardStoryWrap && questionCardStoryLabel && questionCardStoryInput) {
        questionCardStoryLabel.textContent = q.storyPrompt || 'Tell the story behind it (optional)';
        questionCardStoryInput.value = storyVal;
      }
      if (storyToggleBtn) {
        storyToggleBtn.hidden = !(q.storyPrompt || q.choices.length);
        var toggleText = document.getElementById('question-card-story-toggle-text');
        if (toggleText) toggleText.textContent = q.storyPrompt || 'Tell the story behind it';
      }
      if (questionCardStoryWrap) {
        var storyExpanded = !!storyVal;
        questionCardStoryWrap.hidden = !storyExpanded;
        questionCardStoryWrap.setAttribute('aria-hidden', storyExpanded ? 'false' : 'true');
        if (storyToggleBtn) storyToggleBtn.setAttribute('aria-expanded', storyExpanded);
      }
    } else {
      var primaryVal = '';
      if (parsed && typeof parsed === 'object' && parsed.primary !== undefined) primaryVal = parsed.primary || '';
      else if (typeof raw === 'string') primaryVal = raw;
      if (fieldType === 'short_text' || fieldType === 'short_text_story') {
        var input = document.createElement('input');
        input.type = 'text';
        input.id = 'question-card-primary-input';
        input.className = 'auth-input question-card-primary-input';
        input.placeholder = q.placeholder || '';
        input.value = primaryVal;
        input.setAttribute('maxlength', maxLen);
        input.addEventListener('blur', function () { saveCurrentAnswer(); });
        questionCardInputWrap.appendChild(input);
      } else {
        var textarea = document.createElement('textarea');
        textarea.id = 'question-card-primary-input';
        textarea.className = 'auth-input auth-textarea question-card-primary-input';
        textarea.rows = 4;
        textarea.placeholder = q.placeholder || '';
        textarea.value = primaryVal;
        textarea.setAttribute('maxlength', maxLen);
        textarea.addEventListener('blur', function () { saveCurrentAnswer(); });
        questionCardInputWrap.appendChild(textarea);
      }
      if (questionCardStoryWrap && questionCardStoryLabel && questionCardStoryInput) {
        questionCardStoryLabel.textContent = q.storyPrompt || 'Tell the story behind it (optional)';
        questionCardStoryInput.value = (parsed && typeof parsed === 'object' && parsed.story) ? parsed.story : '';
      }
      if (storyToggleBtn) {
        storyToggleBtn.hidden = !(fieldType === 'short_text_story' && (q.storyPrompt || q.id));
        var toggleTextEl = document.getElementById('question-card-story-toggle-text');
        if (toggleTextEl) toggleTextEl.textContent = q.storyPrompt || 'Tell the story behind it';
      }
      if (fieldType === 'short_text_story' && questionCardStoryInput) {
        questionCardStoryInput.addEventListener('blur', function () { saveCurrentAnswer(); });
      }
      var storyValShort = (parsed && typeof parsed === 'object' && parsed.story) ? parsed.story : '';
      if (questionCardStoryWrap) {
        var storyExpandedShort = !!storyValShort;
        questionCardStoryWrap.hidden = !storyExpandedShort;
        questionCardStoryWrap.setAttribute('aria-hidden', storyExpandedShort ? 'false' : 'true');
        if (storyToggleBtn) storyToggleBtn.setAttribute('aria-expanded', storyExpandedShort);
      }
    }

    if (storyToggleBtn && !storyToggleBtn.hidden) {
      storyToggleBtn.onclick = function () {
        if (!questionCardStoryWrap) return;
        var expanded = questionCardStoryWrap.getAttribute('aria-hidden') === 'true';
        questionCardStoryWrap.hidden = !expanded;
        questionCardStoryWrap.setAttribute('aria-hidden', expanded ? 'false' : 'true');
        storyToggleBtn.setAttribute('aria-expanded', expanded);
      };
    }

    var btnPrev = document.getElementById('btn-question-prev');
    var btnNext = document.getElementById('btn-question-next');
    if (btnPrev) btnPrev.hidden = currentQuestionIndex <= 0;
    if (btnNext) btnNext.textContent = currentQuestionIndex >= questionsData.length - 1 ? 'View my plan' : 'Next';
    renderLevelProgress();
    setTimeout(function () {
      var primary = document.getElementById('question-card-primary-input');
      var firstChoice = document.querySelector('.answer-choice');
      if (primary) primary.focus();
      else if (firstChoice) firstChoice.focus();
    }, 80);
  }

  function renderQuestions() {
    renderLevelProgress();
    renderCurrentQuestion();
    if (questionsData.length === 0 && questionsEmptyEl) {
      questionsEmptyEl.innerHTML = 'No questions loaded yet. <button type="button" class="btn-ghost-text" id="btn-retry-questions">Refresh the page</button>.';
      questionsEmptyEl.hidden = false;
      var retryBtn = document.getElementById('btn-retry-questions');
      if (retryBtn) retryBtn.addEventListener('click', function () { window.location.reload(); });
    }
  }

  function renderShares() {
    var overviewWrap = document.getElementById('shared-overview-wrap');
    if (!sharedListEl) return;
    if (sharesList.length === 0) {
      sharedListEl.innerHTML = '<p class="empty-shared">You haven’t shared with anyone yet. Add someone below when you’re ready.</p>';
      if (overviewWrap) overviewWrap.hidden = true;
      if (sentInvitesSectionEl) sentInvitesSectionEl.hidden = true;
      sharedListEl.classList.remove('shared-list--overview');
      return;
    }
    if (overviewWrap) overviewWrap.hidden = false;
    if (sentInvitesSectionEl) sentInvitesSectionEl.hidden = false;
    sharedListEl.classList.add('shared-list--overview');
    sharedListEl.innerHTML = sharesList.map(function (s) {
      var sentStr = s.invite_sent_at ? new Date(s.invite_sent_at).toLocaleDateString(undefined, { dateStyle: 'medium' }) : '—';
      var openedStr = s.opened_at ? ('Yes, ' + new Date(s.opened_at).toLocaleDateString(undefined, { dateStyle: 'medium' })) : 'Not yet';
      var l = s.invite_token ? (window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '/') + 'view-invite.html?token=' + encodeURIComponent(s.invite_token)) : '';
      var whatStr = s.allowed_categories && s.allowed_categories.length ? s.allowed_categories.join(', ') : 'Full plan';
      return (
        '<div class="shared-item shared-item--overview" data-share-id="' + escapeHtml(s.id) + '">' +
        '<span class="shared-overview-col shared-overview-who"><span class="shared-item-email">' + escapeHtml(s.email) + '</span></span>' +
        '<span class="shared-overview-col shared-overview-what">' + escapeHtml(whatStr) + '</span>' +
        '<span class="shared-overview-col shared-overview-sent">' + escapeHtml(sentStr) + '</span>' +
        '<span class="shared-overview-col shared-overview-opened">' +
        (s.opened_at ? '<span class="shared-opened-yes" title="They opened the link">' + escapeHtml(openedStr) + '</span>' : '<span class="shared-opened-no">' + escapeHtml(openedStr) + '</span>') +
        '</span>' +
        '<span class="shared-overview-col shared-overview-actions">' +
        (l ? '<button type="button" class="shared-item-copy-link" data-invite-link="' + escapeHtml(l) + '" aria-label="Copy link">Copy link</button>' : '') +
        (l ? ' <button type="button" class="shared-item-resend" data-invite-link="' + escapeHtml(l) + '" aria-label="Resend link by email">Resend link</button>' : '') +
        ' <button type="button" class="shared-item-remove" data-share-id="' + escapeHtml(s.id) + '" aria-label="Revoke access">Revoke access</button>' +
        '</span></div>'
      );
    }).join('');
    sharedListEl.querySelectorAll('.shared-item-remove').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-share-id');
        removeShare(id);
      });
    });
    sharedListEl.querySelectorAll('.shared-item-copy-link').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var link = btn.getAttribute('data-invite-link');
        if (link && navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(link).then(function () { showToast('Invite link copied'); }).catch(function () {});
        }
      });
    });
    sharedListEl.querySelectorAll('.shared-item-resend').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var link = btn.getAttribute('data-invite-link');
        if (link && navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(link).then(function () { showToast('Link copied—send it again by email'); }).catch(function () {});
        }
      });
    });
  }

  function renderNextUp() {
    if (!nextUpBlock || !nextUpTitleEl) return;
    if (!firstUnansweredId) {
      nextUpBlock.hidden = true;
      return;
    }
    var q = getQuestion(firstUnansweredId);
    if (!q) { nextUpBlock.hidden = true; return; }
    nextUpTitleEl.textContent = q.title;
    nextUpBlock.hidden = false;
  }

  function renderSkippedReminder() {
    if (!skippedReminderEl || !skippedCountEl) return;
    var total = questionsData.length;
    var answered = getAnsweredCount();
    var skipped = total - answered;
    if (skipped <= 0) {
      skippedReminderEl.hidden = true;
      return;
    }
    skippedCountEl.textContent = skipped;
    skippedReminderEl.hidden = false;
  }

  function renderSharedSummary() {
    if (!sharedSummaryEl) return;
    if (sharesList.length === 0) {
      sharedSummaryEl.hidden = true;
      if (sentInvitesSectionEl) sentInvitesSectionEl.hidden = true;
      return;
    }
    var opened = sharesList.filter(function (s) { return s.opened_at; }).length;
    sharedSummaryEl.textContent = "You've shared with " + sharesList.length + " person(s). " + (opened ? opened + " have opened the link—so you know they received it." : "None have opened the link yet.");
    sharedSummaryEl.hidden = false;
    if (sentInvitesSectionEl) sentInvitesSectionEl.hidden = false;
  }

  function renderRecentActivity() {
    if (!recentActivityEl) return;
    var opened = sharesList.filter(function (s) { return s.opened_at; });
    if (opened.length === 0) {
      recentActivityEl.hidden = true;
      return;
    }
    opened.sort(function (a, b) { return new Date(b.opened_at) - new Date(a.opened_at); });
    recentActivityEl.innerHTML = '<span class="recent-activity-label">Recent activity</span>' + opened.slice(0, 5).map(function (s) {
      var d = new Date(s.opened_at);
      var dateStr = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: d.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined });
      return '<span class="recent-activity-item">' + escapeHtml(s.email) + ' opened your plan · ' + dateStr + '</span>';
    }).join('');
    recentActivityEl.hidden = false;
  }

  function escapeHtml(s) {
    if (!s) return '';
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function getQuestion(id) {
    return questionsData.find(function (q) { return q.id === id; });
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

  function getAnsweredCount() {
    return questionsData.filter(function (q) { return hasAnswerValue(q, (answersMap[q.id] && answersMap[q.id].value) || ''); }).length;
  }

  function openAnswerModal(questionId) {
    var q = getQuestion(questionId);
    if (!q) return;
    hideModalError();
    currentQuestionId = questionId;
    var fieldType = (q.fieldType || q.format) || 'long_text';
    answerModalTitle.textContent = q.title;
    answerModalBody.textContent = q.body || '';
    answerModalBody.classList.remove('answer-modal-body--sentence');
    var sceneIntroEl = document.getElementById('answer-modal-scene-intro');
    if (sceneIntroEl) sceneIntroEl.hidden = true;
    var suggestionsEl = document.getElementById('answer-modal-suggestions');
    if (suggestionsEl) {
      if (q.suggestions && Array.isArray(q.suggestions) && q.suggestions.length) {
        suggestionsEl.innerHTML = 'Ideas: <span class="answer-modal-suggestions-list">' + q.suggestions.map(function (s) { return escapeHtml(s); }).join(' • ') + '</span>';
        suggestionsEl.hidden = false;
      } else {
        suggestionsEl.textContent = '';
        suggestionsEl.hidden = true;
      }
    }
    var choicesWrap = document.getElementById('answer-modal-choices-wrap');
    var choicesEl = document.getElementById('answer-modal-choices');
    var inputLabel = document.getElementById('answer-input-label');
    var followWrap = document.getElementById('answer-modal-follow-wrap');
    var followLabel = document.getElementById('answer-follow-label');
    var followInput = document.getElementById('answer-input-follow');
    var mainMax = fieldType === 'short_text' || fieldType === 'short_text_story' ? (q.maxLength || 120) : (q.maxLength || 2000);
    answerInput.setAttribute('maxlength', mainMax);
    if (fieldType === 'choice_with_story' && q.choices && q.choices.length) {
      if (choicesWrap) choicesWrap.hidden = false;
      if (choicesEl) {
        var raw = (answersMap[questionId] && answersMap[questionId].value) || '';
        var parsed = parseAnswerValue(q, raw);
        var selected = (parsed && typeof parsed === 'object' && parsed.choice) ? parsed.choice : (typeof parsed === 'string' ? parsed : '');
        var story = (parsed && typeof parsed === 'object' && parsed.story) ? parsed.story : '';
        choicesEl.innerHTML = q.choices.map(function (c) {
          var active = c === selected ? ' answer-choice--active' : '';
          return '<button type="button" class="answer-choice' + active + '" data-choice="' + escapeHtml(c) + '">' + escapeHtml(c) + '</button>';
        }).join('');
        choicesEl.querySelectorAll('.answer-choice').forEach(function (btn) {
          btn.addEventListener('click', function () {
            choicesEl.querySelectorAll('.answer-choice').forEach(function (b) { b.classList.remove('answer-choice--active'); });
            btn.classList.add('answer-choice--active');
          });
        });
        answerInput.value = story;
        answerInput.placeholder = (q.storyPrompt || 'Tell the story behind it (optional)') ? '' : '';
        if (inputLabel) inputLabel.textContent = q.storyPrompt || 'Tell the story behind it (optional)';
        if (followWrap) followWrap.hidden = true;
      }
    } else {
      if (choicesWrap) choicesWrap.hidden = true;
      if (inputLabel) inputLabel.textContent = 'Your answer';
      if (fieldType === 'short_text_story') {
        if (followWrap) followWrap.hidden = false;
        if (followLabel) followLabel.textContent = q.storyPrompt || 'Tell the story behind it (optional)';
        if (followInput) followInput.value = '';
        var raw = (answersMap[questionId] && answersMap[questionId].value) || '';
        var parsed = parseAnswerValue(q, raw);
        if (parsed && typeof parsed === 'object' && (parsed.primary !== undefined || parsed.story !== undefined)) {
          answerInput.value = parsed.primary || '';
          if (followInput) followInput.value = parsed.story || '';
        } else {
          answerInput.value = typeof raw === 'string' ? raw : '';
          if (followInput) followInput.value = '';
        }
        answerInput.placeholder = q.placeholder || '';
      } else if (fieldType === 'memory_trigger' && q.followUpPrompt) {
        if (followWrap) followWrap.hidden = false;
        if (followLabel) followLabel.textContent = q.followUpPrompt;
        var raw = (answersMap[questionId] && answersMap[questionId].value) || '';
        var parsed = parseAnswerValue(q, raw);
        if (parsed && typeof parsed === 'object') {
          answerInput.value = parsed.main || '';
          if (followInput) followInput.value = parsed.followUp || '';
        } else {
          answerInput.value = raw || '';
          if (followInput) followInput.value = '';
        }
        answerInput.placeholder = q.placeholder || '';
      } else {
        if (followWrap) followWrap.hidden = true;
        if (followInput) followInput.value = '';
        answerInput.placeholder = q.placeholder || '';
        var raw = (answersMap[questionId] && answersMap[questionId].value) || '';
        var parsed = parseAnswerValue(q, raw);
        if (parsed && typeof parsed === 'object' && parsed.primary !== undefined) {
          answerInput.value = parsed.primary || '';
        } else {
          answerInput.value = typeof raw === 'string' ? raw : '';
        }
      }
    }
    var hasAnswer = hasAnswerValue(q, (answersMap[questionId] && answersMap[questionId].value) || '');
    var clearWrap = document.getElementById('answer-clear-wrap');
    if (clearWrap) clearWrap.hidden = !hasAnswer;
    var idx = getCurrentQuestionIndex();
    var total = questionsData.length;
    if (answerModalCounter) answerModalCounter.textContent = total ? (idx + 1) + ' of ' + total : '';
    var prevBtn = document.getElementById('answer-prev');
    var nextBtn = document.getElementById('answer-next');
    if (prevBtn) prevBtn.hidden = idx <= 0;
    if (nextBtn) nextBtn.hidden = idx < 0 || idx >= total - 1;
    answerModal.hidden = false;
    answerInput.focus();
    document.body.classList.add('modal-open');
  }

  function clearAnswer() {
    if (!currentQuestionId || !supabase || !currentUserId) return;
    var clearBtn = document.getElementById('answer-clear-btn');
    if (clearBtn) { clearBtn.disabled = true; clearBtn.textContent = 'Clearing…'; }
    supabase.from('answers').delete().eq('user_id', currentUserId).eq('question_id', currentQuestionId)
      .then(function (res) {
        if (res.error) throw res.error;
        delete answersMap[currentQuestionId];
        closeAnswerModal();
        refreshDashboard();
        showToast('Answer cleared. You can answer again anytime.');
      })
      .catch(function (err) {
        if (clearBtn) { clearBtn.disabled = false; clearBtn.textContent = 'Clear answer'; }
        alert(err && err.message ? err.message : 'Could not clear.');
      });
  }

  function closeAnswerModal() {
    answerModal.hidden = true;
    currentQuestionId = null;
    hideModalError();
    document.body.classList.remove('modal-open');
  }

  function saveAnswer() {
    if (!currentQuestionId || !supabase || !currentUserId) return;
    hideModalError();
    var q = getQuestion(currentQuestionId);
    var saveBtn = document.getElementById('answer-save');
    var defaultSaveText = saveBtn ? saveBtn.getAttribute('data-default-text') || 'Save' : 'Save';
    var fieldType = (q && q.fieldType) || (q && q.format) || 'long_text';
    var value;
    if (fieldType === 'choice_with_story' && q.choices && q.choices.length) {
      var activeBtn = document.querySelector('.answer-choice--active');
      var choice = activeBtn ? (activeBtn.getAttribute('data-choice') || '').trim() : '';
      var story = (document.getElementById('answer-input') && document.getElementById('answer-input').value) || '';
      if (!choice) {
        showToast('Pick one option first.');
        return;
      }
      value = story.trim() ? JSON.stringify({ choice: choice, story: story.trim() }) : choice;
    } else if (fieldType === 'short_text_story') {
      var primary = (document.getElementById('answer-input') && document.getElementById('answer-input').value) || '';
      var followInput = document.getElementById('answer-input-follow');
      var storyVal = (followInput && followInput.value) || '';
      primary = primary.trim();
      storyVal = storyVal.trim();
      if (q.maxLength && primary.length > q.maxLength) primary = primary.substring(0, q.maxLength);
      value = storyVal ? JSON.stringify({ primary: primary, story: storyVal }) : primary;
    } else if (fieldType === 'memory_trigger' && q.followUpPrompt) {
      var main = (document.getElementById('answer-input') && document.getElementById('answer-input').value) || '';
      var followInputM = document.getElementById('answer-input-follow');
      var followUp = (followInputM && followInputM.value) || '';
      value = JSON.stringify({ main: main.trim(), followUp: followUp.trim() });
    } else {
      value = (document.getElementById('answer-input') && document.getElementById('answer-input').value) || '';
      value = value.trim();
      var maxLen = q && q.maxLength;
      if (maxLen && value.length > maxLen) value = value.substring(0, maxLen);
    }
    answeredCountBeforeSave = getAnsweredCount();
    if (saveBtn) { saveBtn.disabled = true; saveBtn.textContent = 'Saving…'; }
    supabase.from('answers').upsert({
      user_id: currentUserId,
      question_id: currentQuestionId,
      value: value,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id,question_id' })
      .then(function (res) {
        if (res.error) throw res.error;
        var levelGroupsBefore = getQuestionsByLevel();
        answersMap[currentQuestionId] = { value: value, updated_at: new Date().toISOString() };
        var levelGroupsAfter = getQuestionsByLevel();
        renderProgress();
        renderLevelProgress();
        renderQuestions();
        renderPlanPreview();
        if (dashboardWelcomeEl) dashboardWelcomeEl.hidden = true;
        if (saveBtn) { saveBtn.textContent = 'Saved'; saveBtn.classList.add('btn--success'); }
        var currentLevel = getLevelByQuestionId(currentQuestionId);
        var meta = LEVEL_META.find(function (m) { return m.level === currentLevel; });
        var levelBefore = levelGroupsBefore.find(function (l) { return l.level === currentLevel; });
        var levelAfter = levelGroupsAfter.find(function (l) { return l.level === currentLevel; });
        var justCompletedLevel = levelBefore && !levelBefore.isComplete && levelAfter && levelAfter.isComplete;
        var nextLevelAfter = levelGroupsAfter.find(function (l) { return l.level === currentLevel + 1; });
        var nextBefore = levelGroupsBefore.find(function (l) { return l.level === currentLevel + 1; });
        var nextJustUnlocked = nextLevelAfter && nextLevelAfter.isUnlocked && nextBefore && !nextBefore.isUnlocked;
        if (answeredCountBeforeSave === 0) showToast("Saved. You can edit anytime.");
        else if (justCompletedLevel) showToast("Your plan is blooming.", true);
        else if (currentLevel <= 2) showToast("Saved. Future chaos reduced.");
        else if (currentLevel >= 4) showToast("Nice answer. This one matters.");
        else showToast("Saved.");
        if (nextJustUnlocked) {
          var nextMeta = LEVEL_META.find(function (m) { return m.level === currentLevel + 1; });
          setTimeout(function () {
            showToast("NEW LEVEL UNLOCKED — " + (nextMeta ? nextMeta.name : "Next level"));
            if (nextMeta && nextMeta.level === 4) setTimeout(function () { showToast("This is the part people will care about most."); }, 2200);
          }, 600);
        }
        var countNow = getAnsweredCount();
        if (countNow === 10 && !justCompletedLevel) showToast("Ten answers. That's a real plan. Share it or save as PDF so it's safe.");
        setTimeout(function () {
          closeAnswerModal();
          if (saveBtn) { saveBtn.disabled = false; saveBtn.textContent = defaultSaveText; saveBtn.classList.remove('btn--success'); }
          if (countNow >= RELIEF_ESSENTIALS_COUNT) tryShowReliefScreen();
        }, 500);
      })
      .catch(function (err) {
        if (saveBtn) { saveBtn.disabled = false; saveBtn.textContent = defaultSaveText; }
        var msg = err && err.message ? err.message : 'Could not save.';
        if (typeof navigator !== 'undefined' && !navigator.onLine) msg = "Couldn't save. Check your connection and try again.";
        showModalError(msg);
      });
  }

  function removeShare(shareId) {
    if (!supabase) return;
    supabase.from('shares').delete().eq('id', shareId).eq('user_id', currentUserId)
      .then(function () {
        sharesList = sharesList.filter(function (s) { return s.id !== shareId; });
        renderShares();
      })
      .catch(function (err) { alert(err.message || 'Could not remove.'); });
  }

  function addShare(e) {
    e.preventDefault();
    var emailEl = document.getElementById('share-email');
    var email = (emailEl && emailEl.value || '').trim().toLowerCase();
    if (!email || !supabase || !currentUserId) return;
    var allowedCategories = null;
    if (shareFullPlanCheckbox && !shareFullPlanCheckbox.checked && shareCategoryCheckboxesEl) {
      var checked = [];
      shareCategoryCheckboxesEl.querySelectorAll('input:checked').forEach(function (c) {
        if (c.value) checked.push(c.value);
      });
      if (checked.length) allowedCategories = checked;
    }
    var payload = {
      user_id: currentUserId,
      email: email,
      role: 'viewer'
    };
    if (allowedCategories) payload.allowed_categories = allowedCategories;
    supabase.from('shares').upsert(payload, { onConflict: 'user_id,email' }).select()
      .then(function (res) {
        if (res.error) throw res.error;
        emailEl.value = '';
        var relationshipEl = document.getElementById('share-relationship');
        if (relationshipEl) relationshipEl.value = '';
        if (shareFullPlanCheckbox) shareFullPlanCheckbox.checked = true;
        if (shareCategoryCheckboxesEl) shareCategoryCheckboxesEl.querySelectorAll('input').forEach(function (c) { c.checked = false; c.disabled = false; });
        var messageBodyEl = document.getElementById('share-message-body');
        if (messageBodyEl) messageBodyEl.value = INVITE_MESSAGE_TEMPLATES.responsible;
        var pills = document.querySelectorAll('.message-style-pill[data-style="responsible"]');
        pills.forEach(function (p) { p.classList.add('active'); p.setAttribute('aria-pressed', 'true'); });
        document.querySelectorAll('.message-style-pill:not([data-style="responsible"])').forEach(function (p) { p.classList.remove('active'); p.setAttribute('aria-pressed', 'false'); });
        if (res.data && res.data.length > 0) {
          var newShare = res.data[0];
          sharesList = [newShare].concat(sharesList.filter(function (s) { return s.id !== newShare.id; }));
          renderShares();
          renderSharedSummary();
          renderRecentActivity();
          var link = newShare.invite_token ? (window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '/') + 'view-invite.html?token=' + encodeURIComponent(newShare.invite_token)) : '';
          if (link && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(link).then(function () {}).catch(function () {});
          }
        }
        loadShares(function () {
          renderShares();
          renderSharedSummary();
          renderRecentActivity();
        }, { keepIfEmpty: true });
        var toastMsg = INVITE_SUCCESS_TOASTS[Math.floor(Math.random() * INVITE_SUCCESS_TOASTS.length)];
        showToast(toastMsg);
        setTimeout(function () { tryShowReliefScreen(); }, 800);
      })
      .catch(function (err) { alert(err.message || 'Could not add.'); });
  }

  function showToast(message, bloom) {
    if (!toastEl) return;
    if (message.indexOf('Saved') === 0 || message.indexOf('Nice answer') === 0) message = '💛 ' + message;
    toastEl.textContent = message;
    toastEl.classList.toggle('toast--bloom', !!bloom);
    toastEl.hidden = false;
    clearTimeout(showToast._t);
    if (bloom) setTimeout(function () { toastEl.classList.remove('toast--bloom'); }, 600);
    showToast._t = setTimeout(function () { toastEl.hidden = true; toastEl.classList.remove('toast--bloom'); }, 2500);
  }

  function showModalError(message) {
    if (modalErrorText) modalErrorText.textContent = message;
    if (modalErrorEl) modalErrorEl.hidden = false;
  }
  function hideModalError() {
    if (modalErrorEl) modalErrorEl.hidden = true;
  }

  function getCurrentQuestionIndex() {
    if (!currentQuestionId) return -1;
    for (var i = 0; i < questionsData.length; i++) { if (questionsData[i].id === currentQuestionId) return i; }
    return -1;
  }

  function goToPrevQuestion() {
    var idx = getCurrentQuestionIndex();
    if (idx <= 0) return;
    openAnswerModal(questionsData[idx - 1].id);
  }
  function goToNextQuestion() {
    var idx = getCurrentQuestionIndex();
    if (idx < 0 || idx >= questionsData.length - 1) return;
    openAnswerModal(questionsData[idx + 1].id);
  }

  function getPlanSections() {
    var levels = getQuestionsByLevel();
    return levels.map(function (l) {
      var items = [];
      l.questions.forEach(function (q) {
        var val = answersMap[q.id] && answersMap[q.id].value;
        if (!hasAnswerValue(q, val || '')) return;
        items.push({ title: q.title, value: getDisplayValue(q, val || '') });
      });
      return {
        level: l.level,
        name: l.name,
        icon: l.icon,
        answered: l.answered,
        total: l.total,
        items: items
      };
    });
  }

  function renderPlanPreview() {
    if (!planPreviewEl) return;
    var sections = getPlanSections();
    var totalAnswered = sections.reduce(function (sum, s) { return sum + s.answered; }, 0);
    var headerEl = document.getElementById('plan-header');
    var expandCollapseEl = document.getElementById('plan-expand-collapse');
    if (totalAnswered === 0) {
      if (headerEl) headerEl.hidden = true;
      if (expandCollapseEl) expandCollapseEl.hidden = true;
      var planSummaryDaisyWrapEmpty = document.getElementById('plan-summary-daisy-wrap');
      if (planSummaryDaisyWrapEmpty) { planSummaryDaisyWrapEmpty.hidden = true; planSummaryDaisyWrapEmpty.setAttribute('aria-hidden', 'true'); }
      planPreviewEl.innerHTML = '<div class="plan-preview-empty-state">' +
        '<span class="plan-preview-empty-daisy" aria-hidden="true"><img src="' + ASSET_BASE + 'Logo.svg" alt="" width="120" height="48" /></span>' +
        '<p class="plan-preview-empty">Your plan is just beginning.</p>' +
        '<button type="button" class="btn primary-btn plan-preview-empty-cta" id="plan-empty-start-cta">Start your first answer</button>' +
        '</div>';
      var emptyCta = document.getElementById('plan-empty-start-cta');
      if (emptyCta) emptyCta.addEventListener('click', function () {
        var first = document.getElementById('question-current-section');
        if (first) first.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (questionsData.length > 0) goToQuestion(0);
      });
      return;
    }
    if (headerEl) headerEl.hidden = false;
    if (expandCollapseEl) expandCollapseEl.hidden = false;
    var planSummaryDaisyWrap = document.getElementById('plan-summary-daisy-wrap');
    if (planSummaryDaisyWrap && typeof window.DaisyProgress !== 'undefined') {
      planSummaryDaisyWrap.hidden = false;
      planSummaryDaisyWrap.removeAttribute('aria-hidden');
      planSummaryDaisyWrap.innerHTML = '';
      var summaryContainer = document.createElement('div');
      summaryContainer.id = 'plan-summary-daisy-container';
      planSummaryDaisyWrap.appendChild(summaryContainer);
      window.DaisyProgress.update(summaryContainer, {
        total: questionsData.length,
        completed: totalAnswered,
        variant: 'hero',
        assetBase: '../assets/'
      });
    }
    var headerDate = document.getElementById('plan-header-date');
    if (headerDate) headerDate.textContent = new Date().toLocaleDateString(undefined, { dateStyle: 'long' });
    var sectionsWithAnswers = sections.filter(function (s) { return s.items.length > 0; });
    var sectionsHtml = sectionsWithAnswers.map(function (s) {
      var countText = s.total > 0 ? ' <span class="plan-section__count">' + s.answered + ' / ' + s.total + ' answered</span>' : '';
      var iconImg = s.icon ? '<img src="' + escapeHtml(s.icon) + '" alt="" class="plan-section__icon" width="20" height="20" aria-hidden="true" />' : '';
      var summary = '<img src="' + escapeHtml(ASSET_BASE) + 'Logo.svg" alt="" class="plan-section__daisy-icon" width="48" height="19" aria-hidden="true" />' + iconImg + '<span class="plan-section__title">' + escapeHtml(s.name) + '</span>' + countText;
      var itemsHtml = s.items.map(function (item) {
        return '<div class="plan-item"><p class="plan-item-label">' + escapeHtml(item.title) + '</p><p class="plan-item-value">' + escapeHtml(item.value) + '</p></div>';
      }).join('');
      return '<details class="plan-section" open data-plan-section><summary class="plan-section__summary">' + summary + '</summary><div class="plan-section__body">' + itemsHtml + '</div></details>';
    }).join('');
    planPreviewEl.innerHTML = '<div id="plan-sections" class="plan-sections">' + sectionsHtml + '</div>';
    var sectionsContainer = document.getElementById('plan-sections');
    var expandAllBtn = document.getElementById('plan-expand-all');
    var collapseAllBtn = document.getElementById('plan-collapse-all');
    if (expandAllBtn && sectionsContainer) {
      expandAllBtn.onclick = function () {
        sectionsContainer.querySelectorAll('details[data-plan-section]').forEach(function (d) { d.open = true; });
      };
    }
    if (collapseAllBtn && sectionsContainer) {
      collapseAllBtn.onclick = function () {
        sectionsContainer.querySelectorAll('details[data-plan-section]').forEach(function (d) { d.open = false; });
      };
    }
  }

  function getPlanText() {
    var parts = [];
    questionsData.forEach(function (q) {
      var val = answersMap[q.id] && answersMap[q.id].value;
      if (!hasAnswerValue(q, val || '')) return;
      parts.push(q.title + '\n' + getDisplayValue(q, val || ''));
    });
    return parts.length ? parts.join('\n\n') : 'No answers yet.';
  }

  function copyPlanToClipboard() {
    var text = getPlanText();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { showToast('Copied to clipboard'); }).catch(function () { showToast('Could not copy'); });
    } else { showToast('Copy not supported in this browser'); }
  }

  function downloadPlanAs(type) {
    var blob, name;
    if (type === 'md') {
      var parts = [];
      questionsData.forEach(function (q) {
        var val = answersMap[q.id] && answersMap[q.id].value;
        if (!hasAnswerValue(q, val || '')) return;
        parts.push('## ' + q.title + '\n\n' + getDisplayValue(q, val || ''));
      });
      var md = '# My plan\n\nWhen I Die™\n\n' + (parts.length ? parts.join('\n\n') : 'No answers yet.');
      blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
      name = 'my-plan-whenidie.md';
    } else {
      var txtParts = [];
      questionsData.forEach(function (q) {
        var val = answersMap[q.id] && answersMap[q.id].value;
        if (!hasAnswerValue(q, val || '')) return;
        txtParts.push(q.title + '\n' + getDisplayValue(q, val || ''));
      });
      blob = new Blob([txtParts.length ? txtParts.join('\n\n') : 'No answers yet.'], { type: 'text/plain;charset=utf-8' });
      name = 'my-plan-whenidie.txt';
    }
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    URL.revokeObjectURL(a.href);
    showToast(type === 'md' ? 'Downloaded .md' : 'Downloaded .txt');
  }

  function refreshDashboard() {
    var answered = questionsData.filter(function (q) { return hasAnswerValue(q, (answersMap[q.id] && answersMap[q.id].value) || ''); }).length;
    if (dashboardWelcomeEl) dashboardWelcomeEl.hidden = answered > 0;
    firstUnansweredId = null;
    for (var i = 0; i < questionsData.length; i++) {
      if (!hasAnswerValue(questionsData[i], (answersMap[questionsData[i].id] && answersMap[questionsData[i].id].value) || '')) {
        firstUnansweredId = questionsData[i].id;
        break;
      }
    }
    renderProgress();
    renderLevelProgress();
    renderSkippedQuestions();
    renderChapterProgress();
    renderNextUnanswered();
    renderQuestions();
    renderNextUp();
    renderSkippedReminder();
    renderShareCategoryOptions();
    renderShares();
    renderSharedSummary();
    renderRecentActivity();
    renderPlanPreview();
  }

  function renderShareCategoryOptions() {
    if (!shareCategoriesWrap || !shareCategoryCheckboxesEl) return;
    var groups = getQuestionsByCategory();
    if (groups.length === 0) {
      shareCategoriesWrap.hidden = true;
      return;
    }
    shareCategoryCheckboxesEl.innerHTML = groups.map(function (g) {
      return '<label class="share-category-option"><input type="checkbox" value="' + escapeHtml(g.category) + '" /> ' + escapeHtml(g.category) + '</label>';
    }).join('');
    shareCategoriesWrap.hidden = false;
    if (shareFullPlanCheckbox && shareFullPlanCheckbox.checked) {
      shareCategoryCheckboxesEl.querySelectorAll('input').forEach(function (c) { c.disabled = true; });
    }
  }

  function init() {
    if (!gateEl) return;

    if (!config.supabaseUrl || !config.supabaseAnonKey) {
      showNoConfig();
      return;
    }

    showGate();
    var gateP = gateEl && gateEl.querySelector('p');
    if (gateP) gateP.textContent = 'Getting your plan ready…';

    var safetyTimeout = setTimeout(function () {
      if (contentEl && contentEl.hidden) {
        try {
          refreshDashboard();
        } catch (e) {}
        showContent();
      }
    }, 12000);

    var authPromise = window.widAuthReady;
    if (!authPromise || typeof authPromise.then !== 'function') {
      authPromise = Promise.resolve();
    }
    authPromise.then(function () {
      return supabase ? supabase.auth.getSession() : { data: { session: null } };
    }).then(function (res) {
      var session = res && res.data && res.data.session;
      if (!session || !session.user) {
        window.location.href = 'login.html?redirect=dashboard.html';
        return;
      }
      currentUserId = session.user.id;
      if (navUserEmail) navUserEmail.textContent = session.user.email || '';
      var name = session.user.user_metadata && session.user.user_metadata.display_name;
      if (userDisplayNameEl) userDisplayNameEl.textContent = name || 'there';
      supabase.from('profiles').select('display_name').eq('id', currentUserId).single()
        .then(function (res) {
          if (res.data && res.data.display_name && userDisplayNameEl) userDisplayNameEl.textContent = res.data.display_name;
        }).catch(function () {});

      function next() {
        loadAnswers(function () {
          loadShares(function () {
            clearTimeout(safetyTimeout);
            try {
              refreshDashboard();
            } catch (e) {
              if (typeof console !== 'undefined' && console.error) console.error(e);
            }
            showContent();
          });
        });
      }
      loadQuestionsFromJson(function (err) {
        if (err || questionsData.length === 0) {
          loadQuestionsFromSupabase(function () { next(); });
        } else {
          next();
        }
      });
    }).catch(function () {
      clearTimeout(safetyTimeout);
      var p = gateEl && gateEl.querySelector('p');
      if (p) p.textContent = "We couldn't load this. Check your connection and try again.";
    });
  }

  document.getElementById('btn-logout').addEventListener('click', function () {
    if (supabase) supabase.auth.signOut().then(function () { window.location.href = '../index.html'; });
  });

  if (shareForm) shareForm.addEventListener('submit', addShare);
  var reliefModal = document.getElementById('relief-modal');
  var reliefClose = document.getElementById('relief-close');
  var reliefContinue = document.getElementById('relief-continue-btn');
  var reliefBackdrop = document.getElementById('relief-backdrop');
  var reliefInviteBtn = document.getElementById('relief-invite-btn');
  if (reliefClose) reliefClose.addEventListener('click', closeReliefModal);
  if (reliefContinue) reliefContinue.addEventListener('click', closeReliefModal);
  if (reliefBackdrop) reliefBackdrop.addEventListener('click', closeReliefModal);
  if (reliefInviteBtn) {
    reliefInviteBtn.addEventListener('click', function (e) {
      e.preventDefault();
      closeReliefModal();
      var target = document.getElementById('dashboard-shared');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
  var shareMessageBody = document.getElementById('share-message-body');
  if (shareMessageBody) {
    shareMessageBody.value = INVITE_MESSAGE_TEMPLATES.responsible;
  }
  document.querySelectorAll('.message-style-pill').forEach(function (pill) {
    pill.addEventListener('click', function () {
      var style = pill.getAttribute('data-style');
      document.querySelectorAll('.message-style-pill').forEach(function (p) {
        p.classList.remove('active');
        p.setAttribute('aria-pressed', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-pressed', 'true');
      if (shareMessageBody) {
        if (style === 'surprise') {
          var list = INVITE_MESSAGE_TEMPLATES.surprise;
          shareMessageBody.value = list[Math.floor(Math.random() * list.length)];
        } else if (style === 'custom') {
          shareMessageBody.placeholder = 'Write your own message…';
        } else {
          shareMessageBody.placeholder = 'Edit your message here…';
          if (style === 'responsible') shareMessageBody.value = INVITE_MESSAGE_TEMPLATES.responsible;
          else if (style === 'funny') shareMessageBody.value = INVITE_MESSAGE_TEMPLATES.funny;
          else if (style === 'sweet') shareMessageBody.value = INVITE_MESSAGE_TEMPLATES.sweet;
          else if (style === 'smartass') shareMessageBody.value = INVITE_MESSAGE_TEMPLATES.smartass;
        }
      }
    });
  });
  var copyMessageBtn = document.getElementById('copy-message-btn');
  if (copyMessageBtn && shareMessageBody) {
    copyMessageBtn.addEventListener('click', function () {
      var text = shareMessageBody.value.trim();
      if (!text) { showToast('Write or pick a message first'); return; }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          copyMessageBtn.textContent = 'Copied!';
          showToast('Message copied');
          setTimeout(function () { copyMessageBtn.textContent = 'Copy message'; }, 2000);
        }).catch(function () { showToast('Could not copy'); });
      } else { showToast('Copy not supported'); }
    });
  }
  if (shareFullPlanCheckbox && shareCategoryCheckboxesEl) {
    shareFullPlanCheckbox.addEventListener('change', function () {
      shareCategoryCheckboxesEl.querySelectorAll('input').forEach(function (c) { c.disabled = shareFullPlanCheckbox.checked; });
    });
  }

  if (document.getElementById('answer-save')) document.getElementById('answer-save').addEventListener('click', saveAnswer);
  var answerInputEl = document.getElementById('answer-input');
  var answerFollowEl = document.getElementById('answer-input-follow');
  if (answerInputEl) {
    answerInputEl.addEventListener('blur', function () {
      if (currentQuestionId) setTimeout(function () { saveAnswer(); }, 400);
    });
  }
  if (answerFollowEl) {
    answerFollowEl.addEventListener('blur', function () {
      if (currentQuestionId) setTimeout(function () { saveAnswer(); }, 400);
    });
  }
  if (document.getElementById('answer-skip')) document.getElementById('answer-skip').addEventListener('click', function () { closeAnswerModal(); });
  if (document.getElementById('answer-clear-btn')) document.getElementById('answer-clear-btn').addEventListener('click', clearAnswer);
  if (modalClose) modalClose.addEventListener('click', closeAnswerModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeAnswerModal);
  if (document.getElementById('answer-prev')) document.getElementById('answer-prev').addEventListener('click', goToPrevQuestion);
  if (document.getElementById('answer-next')) document.getElementById('answer-next').addEventListener('click', goToNextQuestion);
  if (document.getElementById('modal-error-retry')) document.getElementById('modal-error-retry').addEventListener('click', function () { hideModalError(); saveAnswer(); });
  var btnQuestionPrev = document.getElementById('btn-question-prev');
  var btnQuestionNext = document.getElementById('btn-question-next');
  var btnQuestionSkip = document.getElementById('btn-question-skip');
  if (btnQuestionPrev) btnQuestionPrev.addEventListener('click', function () { saveCurrentAnswer(function () { goToQuestion(currentQuestionIndex - 1); }); });
  if (btnQuestionNext) btnQuestionNext.addEventListener('click', function () {
    if (currentQuestionIndex >= questionsData.length - 1) {
      saveCurrentAnswer(function () {
        var planEl = document.getElementById('plan-preview');
        if (planEl) planEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return;
    }
    saveCurrentAnswer(function () { goToQuestion(currentQuestionIndex + 1); });
  });
  if (btnQuestionSkip) btnQuestionSkip.addEventListener('click', function () {
    if (currentQuestionIndex >= questionsData.length - 1) return;
    goToQuestion(currentQuestionIndex + 1);
  });
  var unlockContinueBtn = document.getElementById('unlock-continue-btn');
  var unlockBackdrop = document.getElementById('unlock-backdrop');
  if (unlockContinueBtn) unlockContinueBtn.addEventListener('click', hideUnlockModal);
  if (unlockBackdrop) unlockBackdrop.addEventListener('click', hideUnlockModal);
  var milestoneClose = document.getElementById('milestone-close');
  var milestoneBackdrop = document.getElementById('milestone-backdrop');
  var milestoneContinueBtn = document.getElementById('milestone-continue-btn');
  if (milestoneClose) milestoneClose.addEventListener('click', function () { hideMilestoneCelebration(); });
  if (milestoneBackdrop) milestoneBackdrop.addEventListener('click', function () { hideMilestoneCelebration(); });
  if (milestoneContinueBtn) milestoneContinueBtn.addEventListener('click', function () { hideMilestoneCelebration(); });
  var milestoneShareBtn = document.getElementById('milestone-share-btn');
  if (milestoneShareBtn) milestoneShareBtn.addEventListener('click', function () { hideMilestoneCelebration(true); });
  var reliefFinishLater = document.getElementById('relief-finish-later-btn');
  if (reliefFinishLater) reliefFinishLater.addEventListener('click', closeReliefModal);
  if (document.getElementById('btn-next-up')) document.getElementById('btn-next-up').addEventListener('click', function () { if (firstUnansweredId) openAnswerModal(firstUnansweredId); });
  if (document.getElementById('btn-skipped-answer')) document.getElementById('btn-skipped-answer').addEventListener('click', function () { if (firstUnansweredId) openAnswerModal(firstUnansweredId); });
  var btnPrintPlan = document.getElementById('btn-print-plan');
  if (btnPrintPlan) btnPrintPlan.addEventListener('click', function () {
    var sections = getPlanSections();
    var payload = {
      updatedAt: new Date().toISOString(),
      sections: sections.filter(function (s) { return s.items.length > 0; }).map(function (s) {
        return { name: s.name, icon: s.icon, items: s.items };
      })
    };
    try {
      localStorage.setItem('wid-print-plan', JSON.stringify(payload));
    } catch (e) {}
    window.open('plan-print.html', '_blank', 'noopener');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (answerModal && !answerModal.hidden) { closeAnswerModal(); return; }
    var milestoneModal = document.getElementById('milestone-modal');
    if (milestoneModal && !milestoneModal.hidden) { hideMilestoneCelebration(); return; }
    if (isUnlockModalOpen()) { hideUnlockModal(); return; }
    var reliefModal = document.getElementById('relief-modal');
    if (reliefModal && !reliefModal.hidden) { closeReliefModal(); return; }
  });

  var skippedQuestionsList = document.getElementById('skipped-questions-list');
  if (skippedQuestionsList) {
    skippedQuestionsList.addEventListener('click', function (e) {
      var btn = e.target.closest('.skipped-question-link');
      if (!btn) return;
      var idx = parseInt(btn.getAttribute('data-index'), 10);
      if (!isNaN(idx)) goToQuestion(idx);
    });
  }

  var levelProgressList = document.getElementById('level-progress-list');
  if (levelProgressList) {
    levelProgressList.addEventListener('click', function (e) {
      var btn = e.target.closest('.nav-question');
      if (btn) {
        var idx = parseInt(btn.getAttribute('data-index'), 10);
        if (!isNaN(idx)) {
          saveCurrentAnswer(function () { goToQuestion(idx); });
        }
        return;
      }
      var chapterTitle = e.target.closest('.chapter-nav__chapter-title');
      if (chapterTitle) {
        var block = chapterTitle.closest('.chapter-block');
        if (block) {
          var ch = parseInt(block.getAttribute('data-chapter'), 10);
          if (!isNaN(ch)) saveCurrentAnswer(function () { goToChapter(ch); });
        }
      }
    });
    levelProgressList.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var btn = e.target.closest('.nav-question');
      if (btn) {
        e.preventDefault();
        var idx = parseInt(btn.getAttribute('data-index'), 10);
        if (!isNaN(idx)) {
          saveCurrentAnswer(function () { goToQuestion(idx); });
        }
        return;
      }
      var chapterTitle = e.target.closest('.chapter-nav__chapter-title');
      if (chapterTitle) {
        e.preventDefault();
        var block = chapterTitle.closest('.chapter-block');
        if (block) {
          var ch = parseInt(block.getAttribute('data-chapter'), 10);
          if (!isNaN(ch)) saveCurrentAnswer(function () { goToChapter(ch); });
        }
      }
    });
  }
  var btnJumpNextUnanswered = document.getElementById('btn-jump-next-unanswered');
  if (btnJumpNextUnanswered) {
    btnJumpNextUnanswered.addEventListener('click', function () {
      var nextIdx = getNextUnansweredIndex(currentQuestionIndex);
      if (nextIdx >= 0) saveCurrentAnswer(function () { goToQuestion(nextIdx); });
    });
  }

  var announcementBar = document.getElementById('announcement-bar');
  var announcementDismiss = document.getElementById('announcement-dismiss');
  if (announcementBar && announcementDismiss) {
    try {
      if (sessionStorage.getItem('wid-announcement-dismissed')) announcementBar.hidden = true;
    } catch (e) {}
    announcementDismiss.addEventListener('click', function () {
      announcementBar.hidden = true;
      try { sessionStorage.setItem('wid-announcement-dismissed', '1'); } catch (e) {}
    });
  }

  if (supabase && supabase.auth) {
    supabase.auth.onAuthStateChange(function (event, session) {
      if (event === 'SIGNED_OUT' || !session) {
        if (contentEl && !contentEl.hidden) window.location.href = 'login.html?message=session-ended';
      }
    });
  }

  if (questionsListEl) {
    loadQuestionsFromJson(function (err) {
      if (err && questionsData.length === 0) questionsData = [];
    });
  }

  init();
})();
