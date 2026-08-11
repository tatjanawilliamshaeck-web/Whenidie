"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { QUESTIONS, RELIEF_CHAPTER, CHAPTER_META } from "@/lib/questions";
import {
  type AnswersMap,
  getAnsweredCount,
  getAnswerFor,
  getQuestionsByChapter,
  getNextUnansweredIndex,
  getFirstQuestionIndexForChapter,
  getPlanSections,
  hasAnswerValue,
  questionIdsForCategories,
  INVITE_SUCCESS_TOASTS,
  RELIEF_HUMOR_LINES,
} from "@/lib/plan";
import { DaisyProgress } from "@/components/dashboard/DaisyProgress";
import { ChapterNav } from "@/components/dashboard/ChapterNav";
import { QuestionCard } from "@/components/dashboard/QuestionCard";
import { PlanPreview } from "@/components/dashboard/PlanPreview";
import { ShareSection, type Share } from "@/components/dashboard/ShareSection";
import { MilestoneModal, UnlockModal, ReliefModal, Toast } from "@/components/dashboard/CelebrationModals";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [displayName, setDisplayName] = useState("there");
  const [answers, setAnswers] = useState<AnswersMap>({});
  const [shares, setShares] = useState<Share[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [toast, setToast] = useState<{ message: string; bloom?: boolean } | null>(null);
  const [milestone, setMilestone] = useState<{ level: number; pendingUnlock: string | null; pendingRelief: boolean } | null>(null);
  const [unlockName, setUnlockName] = useState<string | null>(null);
  const [reliefLine, setReliefLine] = useState<string | null>(null);
  const reliefSeenRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const { data: userRes } = await supabase.auth.getUser();
      const user = userRes.user;
      if (!user) {
        router.replace("/login");
        return;
      }
      if (cancelled) return;
      setUserId(user.id);
      setUserEmail(user.email || "");
      const metaName = (user.user_metadata as { display_name?: string } | null)?.display_name;
      if (metaName) setDisplayName(metaName);

      const [{ data: profile }, { data: answerRows }, { data: shareRows }] = await Promise.all([
        supabase.from("profiles").select("display_name").eq("id", user.id).single(),
        supabase.from("answers").select("question_id, value, updated_at").eq("user_id", user.id),
        supabase
          .from("shares")
          .select("id, email, invite_token, invite_sent_at, opened_at, allowed_question_ids")
          .eq("user_id", user.id)
          .order("invited_at", { ascending: false }),
      ]);
      if (cancelled) return;

      if (profile?.display_name) setDisplayName(profile.display_name);

      const map: AnswersMap = {};
      (answerRows || []).forEach((r) => {
        map[r.question_id] = { value: r.value, updated_at: r.updated_at };
      });
      setAnswers(map);
      setShares((shareRows as Share[]) || []);

      const firstUnanswered = QUESTIONS.findIndex((q) => !hasAnswerValue(q, map[q.id]?.value || ""));
      setCurrentIndex(firstUnanswered >= 0 ? firstUnanswered : 0);

      setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        router.replace("/login?message=session-ended");
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showToast = useCallback((message: string, bloom = false) => {
    const prefixed = message.startsWith("Saved") || message.startsWith("Nice answer") ? `💛 ${message}` : message;
    setToast({ message: prefixed, bloom });
    window.setTimeout(() => setToast(null), 2500);
  }, []);

  const tryShowRelief = useCallback(
    (force = false) => {
      if (reliefSeenRef.current) return;
      try {
        if (sessionStorage.getItem("wid-relief-seen")) {
          reliefSeenRef.current = true;
          return;
        }
      } catch {
        return;
      }
      if (!force) {
        const answeredCount = getAnsweredCount(answers);
        if (answeredCount < 2 && shares.length === 0) return;
      }
      reliefSeenRef.current = true;
      try {
        sessionStorage.setItem("wid-relief-seen", "1");
      } catch {
        // ignore
      }
      setReliefLine(RELIEF_HUMOR_LINES[Math.floor(Math.random() * RELIEF_HUMOR_LINES.length)]);
    },
    [answers, shares]
  );

  async function saveAnswer(question: (typeof QUESTIONS)[number], value: string) {
    const chaptersBefore = getQuestionsByChapter(answers);
    const nextAnswers: AnswersMap = { ...answers, [question.id]: { value, updated_at: new Date().toISOString() } };
    setAnswers(nextAnswers);

    if (!userId) return;
    await supabase.from("answers").upsert(
      { user_id: userId, question_id: question.id, value, updated_at: new Date().toISOString() },
      { onConflict: "user_id,question_id" }
    );

    const chaptersAfter = getQuestionsByChapter(nextAnswers);
    const currentChapter = question.chapter;
    const before = chaptersBefore.find((c) => c.level === currentChapter);
    const after = chaptersAfter.find((c) => c.level === currentChapter);
    const justCompleted = !!(before && after && !before.isComplete && after.isComplete);

    const nextBefore = chaptersBefore.find((c) => c.level === currentChapter + 1);
    const nextAfter = chaptersAfter.find((c) => c.level === currentChapter + 1);
    let pendingUnlockName: string | null = null;
    if (nextAfter && nextAfter.isUnlocked && nextBefore && !nextBefore.isUnlocked) {
      pendingUnlockName =
        currentChapter === 1
          ? "Explore the rest in any order—pick what matters to you next."
          : CHAPTER_META.find((m) => m.level === nextAfter.level)?.name || "Next chapter";
    }
    const reliefChapterAfter = chaptersAfter.find((c) => c.level === RELIEF_CHAPTER);
    const pendingRelief = !!(reliefChapterAfter && reliefChapterAfter.isComplete);

    if (value) showToast("Saved");
    if (after && after.total > 0 && after.total - after.answered === 1) {
      showToast("You're close to finishing this chapter");
    }

    if (justCompleted) {
      const meta = CHAPTER_META.find((m) => m.level === currentChapter);
      setMilestone({ level: currentChapter, pendingUnlock: pendingUnlockName, pendingRelief });
      if (meta) showToast(`Chapter complete. ${meta.completionMessage}`);
    } else {
      if (pendingUnlockName) setUnlockName(pendingUnlockName);
      if (pendingRelief) tryShowRelief(true);
    }
  }

  function closeMilestone() {
    if (!milestone) return;
    const { pendingUnlock, pendingRelief } = milestone;
    setMilestone(null);
    if (pendingUnlock) setUnlockName(pendingUnlock);
    else if (pendingRelief) tryShowRelief(true);
  }

  function goToQuestion(index: number) {
    if (index < 0 || index >= QUESTIONS.length) return;
    setCurrentIndex(index);
  }

  function goToChapter(chapterNum: number) {
    goToQuestion(getFirstQuestionIndexForChapter(chapterNum));
  }

  async function handleAddShare(email: string, allowedCategories: string[] | null) {
    if (!userId) return;
    const payload: Record<string, unknown> = { user_id: userId, email, role: "viewer" };
    if (allowedCategories) payload.allowed_question_ids = questionIdsForCategories(allowedCategories);
    const { data, error } = await supabase.from("shares").upsert(payload, { onConflict: "user_id,email" }).select();
    if (error || !data?.length) {
      showToast(error?.message || "Could not add.");
      return;
    }
    const newShare = data[0] as Share;
    setShares((prev) => [newShare, ...prev.filter((s) => s.id !== newShare.id)]);
    if (newShare.invite_token && navigator.clipboard) {
      const link = `${window.location.origin}/view-invite?token=${encodeURIComponent(newShare.invite_token)}`;
      navigator.clipboard.writeText(link).catch(() => {});
    }
    showToast(INVITE_SUCCESS_TOASTS[Math.floor(Math.random() * INVITE_SUCCESS_TOASTS.length)]);
    window.setTimeout(() => tryShowRelief(), 800);
  }

  async function handleRemoveShare(id: string) {
    if (!userId) return;
    await supabase.from("shares").delete().eq("id", id).eq("user_id", userId);
    setShares((prev) => prev.filter((s) => s.id !== id));
  }

  function copyText(text: string) {
    navigator.clipboard?.writeText(text).catch(() => {});
  }

  function handlePrint() {
    const sections = getPlanSections(answers).filter((s) => s.items.length > 0);
    try {
      localStorage.setItem(
        "wid-print-plan",
        JSON.stringify({ updatedAt: new Date().toISOString(), sections })
      );
    } catch {
      // ignore
    }
    window.open("/plan-print", "_blank", "noopener");
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="dashboard-gate">
        <div className="dashboard-gate-spinner" aria-hidden="true" />
        <p>Getting your plan ready…</p>
      </div>
    );
  }

  const chapters = getQuestionsByChapter(answers);
  const answeredCount = getAnsweredCount(answers);
  const currentQuestion = QUESTIONS[currentIndex];
  const currentChapter = chapters.find((c) => c.level === currentQuestion.chapter);
  const nextUnansweredIndex = getNextUnansweredIndex(answers, currentIndex);
  const unansweredInChapter = currentChapter ? currentChapter.total - currentChapter.answered : 0;
  const skipped = QUESTIONS.map((q, idx) => ({ q, idx })).filter(({ q }) => !hasAnswerValue(q, getAnswerFor(answers, q)));
  const planSections = getPlanSections(answers);

  return (
    <div className="page-app page-dashboard">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a href="/dashboard" className="logo">
            <Image src="/assets/Logo.svg" alt="When I Die™" className="logo-image" width={120} height={48} />
          </a>
          <nav className="nav">
            <span className="nav-user">{userEmail}</span>
            <a href="/">Home</a>
            <button type="button" className="btn secondary-btn btn--small" onClick={handleLogout}>
              Log out
            </button>
          </nav>
        </div>
        <div className="announcement-bar">
          <span className="announcement-bar__text">No doom. No guilt. Snacks encouraged.</span>
        </div>
      </header>

      <main className="app-main dashboard-main" id="main-content">
        <div className="container">
          <div className="dashboard-layout">
            <aside className="dashboard-sidebar" aria-label="Progress and milestones">
              <div className="progress-cycle" role="region" aria-labelledby="progress-cycle-label">
                <h2 id="progress-cycle-label" className="progress-cycle__heading">
                  Progress
                </h2>
                <DaisyProgress total={QUESTIONS.length} completed={answeredCount} variant="hero" />
                <span className="progress-cycle__center progress-cycle__center--daisy">
                  <span className="progress-cycle__count">{answeredCount}</span>
                  <span className="progress-cycle__sep">/</span>
                  <span className="progress-cycle__total">{QUESTIONS.length}</span>
                </span>
                <p className="progress-cycle__label">answered</p>
              </div>
              <ChapterNav
                chapters={chapters}
                answers={answers}
                currentIndex={currentIndex}
                onJumpToQuestion={goToQuestion}
                onJumpToChapter={goToChapter}
              />
            </aside>

            <div className="dashboard-center">
              <section className="dashboard-hero dashboard-hero--compact">
                <h1>Your plan</h1>
                <p className="dashboard-tagline">
                  Hey, <span>{displayName}</span>. One question at a time.
                </p>
              </section>

              <section className="dashboard-section dashboard-question-current" id="question-current-section">
                <QuestionCard
                  question={currentQuestion}
                  index={currentIndex}
                  total={QUESTIONS.length}
                  rawValue={getAnswerFor(answers, currentQuestion)}
                  onSave={(value) => saveAnswer(currentQuestion, value)}
                  onPrev={() => goToQuestion(currentIndex - 1)}
                  onNext={() => {
                    if (currentIndex >= QUESTIONS.length - 1) {
                      document.getElementById("plan-preview-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
                      return;
                    }
                    goToQuestion(currentIndex + 1);
                  }}
                  onSkip={() => {
                    if (currentIndex < QUESTIONS.length - 1) goToQuestion(currentIndex + 1);
                  }}
                />
              </section>

              <section className="dashboard-section dashboard-preview dashboard-preview--compact" id="plan-preview-section" aria-labelledby="plan-preview-heading">
                <div className="plan-preview-watermark" aria-hidden="true" />
                <h2 id="plan-preview-heading" className="plan-preview-heading-with-icon">
                  <Image src="/assets/Logo.svg" alt="" className="plan-preview-heading-daisy" width={80} height={32} aria-hidden="true" /> Your
                  Plan
                </h2>
                <PlanPreview
                  sections={planSections}
                  totalQuestions={QUESTIONS.length}
                  onStartFirst={() => goToQuestion(0)}
                  onPrint={handlePrint}
                />
              </section>
            </div>

            <aside className="dashboard-sidebar dashboard-sidebar--right" aria-label="Inspiration and progress">
              <div className="chapter-progress-wrap">
                <h3 className="chapter-progress__heading">Progress</h3>
                {currentChapter && currentChapter.total > 0 ? (
                  <DaisyProgress total={currentChapter.total} completed={currentChapter.answered} variant="chapter" />
                ) : null}
                <p className="chapter-progress__text">
                  {currentChapter ? `${currentChapter.answered} of ${currentChapter.total} questions answered in this chapter` : "0 of 0 questions answered in this chapter"}
                </p>
              </div>

              {currentQuestion.suggestions.length > 0 ? (
                <div className="question-inspiration">
                  <h3 className="question-inspiration__title">Need inspiration?</h3>
                  <p className="question-inspiration__text">{currentQuestion.suggestions.join(" · ")}</p>
                </div>
              ) : (
                <p className="right-sidebar-fallback">Take your time. You can come back and edit anytime.</p>
              )}

              {unansweredInChapter > 0 || nextUnansweredIndex >= 0 ? (
                <div className="next-unanswered-wrap">
                  <p className="next-unanswered-text">
                    {unansweredInChapter > 0
                      ? `You still have ${unansweredInChapter} unanswered question${unansweredInChapter === 1 ? "" : "s"} in this chapter.`
                      : "This chapter is complete. Jump to the next unanswered question elsewhere."}
                  </p>
                  {nextUnansweredIndex >= 0 ? (
                    <button type="button" className="btn secondary-btn btn--small" onClick={() => goToQuestion(nextUnansweredIndex)}>
                      Jump to next unanswered question
                    </button>
                  ) : null}
                </div>
              ) : null}

              {skipped.length > 0 ? (
                <div className="skipped-questions-wrap">
                  <h3 className="skipped-questions-heading">Come back to</h3>
                  <ul className="skipped-questions-list" aria-label="Skipped or unanswered questions">
                    {skipped.map(({ q, idx }) => (
                      <li key={q.id}>
                        <button type="button" className="skipped-question-link" onClick={() => goToQuestion(idx)}>
                          {q.title.length > 42 ? `${q.title.slice(0, 39)}…` : q.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </aside>
          </div>

          <div className="invitation-bridge" aria-hidden="true">
            <span className="invitation-bridge__text">Your plan gets even better when someone you trust knows about it.</span>
          </div>

          <ShareSection
            shares={shares}
            onAddShare={handleAddShare}
            onRemoveShare={handleRemoveShare}
            onCopy={copyText}
            onToast={showToast}
          />
        </div>
      </main>

      {toast ? <Toast message={toast.message} bloom={toast.bloom} /> : null}

      {milestone
        ? (() => {
            const meta = CHAPTER_META.find((m) => m.level === milestone.level);
            return (
              <MilestoneModal
                chapterName={meta?.name || `Chapter ${milestone.level}`}
                message={meta?.completionMessage || "You completed this chapter."}
                icon={meta?.icon || "/assets/icon-document.svg"}
                showShareCta={shares.length === 0}
                onClose={closeMilestone}
                onShare={() => {
                  setMilestone(null);
                  document.getElementById("dashboard-shared")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              />
            );
          })()
        : null}

      {unlockName ? <UnlockModal chapterName={unlockName} onClose={() => setUnlockName(null)} /> : null}

      {reliefLine ? (
        <ReliefModal
          humorLine={reliefLine}
          onClose={() => setReliefLine(null)}
          onInvite={() => {
            setReliefLine(null);
            document.getElementById("dashboard-shared")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        />
      ) : null}
    </div>
  );
}
