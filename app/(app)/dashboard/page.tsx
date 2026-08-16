"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
import {
  MilestoneModal,
  UnlockModal,
  ReliefModal,
  Toast,
} from "@/components/dashboard/CelebrationModals";

export default function DashboardPage() {
  const router = useRouter();
  // Lazily created on first use (never during render) — the Supabase browser
  // client touches `document`, which doesn't exist during Next's server-side
  // prerender pass for this client component.
  const supabaseRef = useRef<ReturnType<typeof createClient> | null>(null);
  function getSupabase() {
    if (!supabaseRef.current) supabaseRef.current = createClient();
    return supabaseRef.current;
  }

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [displayName, setDisplayName] = useState("there");
  const [answers, setAnswers] = useState<AnswersMap>({});
  const [shares, setShares] = useState<Share[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [toast, setToast] = useState<{
    message: string;
    bloom?: boolean;
  } | null>(null);
  const [milestone, setMilestone] = useState<{
    level: number;
    pendingUnlock: string | null;
    pendingRelief: boolean;
  } | null>(null);
  const [unlockName, setUnlockName] = useState<string | null>(null);
  const [reliefLine, setReliefLine] = useState<string | null>(null);
  const [showNotifyStep, setShowNotifyStep] = useState(false);
  const reliefSeenRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const { data: userRes } = await getSupabase().auth.getUser();
      const user = userRes.user;
      if (!user) {
        router.replace("/login");
        return;
      }
      if (cancelled) return;
      setUserId(user.id);
      setUserEmail(user.email || "");
      const metaName = (user.user_metadata as { display_name?: string } | null)
        ?.display_name;
      if (metaName) setDisplayName(metaName);

      const [{ data: profile }, { data: answerRows }, { data: shareRows }] =
        await Promise.all([
          getSupabase()
            .from("profiles")
            .select("display_name")
            .eq("id", user.id)
            .single(),
          getSupabase()
            .from("answers")
            .select("question_id, value, updated_at")
            .eq("user_id", user.id),
          getSupabase()
            .from("shares")
            .select(
              "id, email, invite_token, invite_sent_at, opened_at, allowed_question_ids",
            )
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
      const loadedShares = (shareRows as Share[]) || [];
      setShares(loadedShares);

      let notifyDismissed = false;
      try {
        notifyDismissed =
          sessionStorage.getItem("wid-notify-step-dismissed") === "1";
      } catch {
        // ignore
      }
      // Show once they've felt some progress (2+ answers), not as the very
      // first thing a brand-new user sees before experiencing any value.
      if (
        loadedShares.length === 0 &&
        !notifyDismissed &&
        getAnsweredCount(map) >= 2
      ) {
        setShowNotifyStep(true);
      }

      const firstUnanswered = QUESTIONS.findIndex(
        (q) => !hasAnswerValue(q, map[q.id]?.value || ""),
      );
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
    } = getSupabase().auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        router.replace("/login?message=session-ended");
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showToast = useCallback((message: string, bloom = false) => {
    const prefixed =
      message.startsWith("Saved") || message.startsWith("Nice answer")
        ? `💛 ${message}`
        : message;
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
      setReliefLine(
        RELIEF_HUMOR_LINES[
          Math.floor(Math.random() * RELIEF_HUMOR_LINES.length)
        ],
      );
    },
    [answers, shares],
  );

  async function saveAnswer(
    question: (typeof QUESTIONS)[number],
    value: string,
  ) {
    const chaptersBefore = getQuestionsByChapter(answers);
    const nextAnswers: AnswersMap = {
      ...answers,
      [question.id]: { value, updated_at: new Date().toISOString() },
    };
    setAnswers(nextAnswers);

    if (!userId) return;
    await getSupabase()
      .from("answers")
      .upsert(
        {
          user_id: userId,
          question_id: question.id,
          value,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,question_id" },
      );

    const chaptersAfter = getQuestionsByChapter(nextAnswers);
    const currentChapter = question.chapter;
    const before = chaptersBefore.find((c) => c.level === currentChapter);
    const after = chaptersAfter.find((c) => c.level === currentChapter);
    const justCompleted = !!(
      before &&
      after &&
      !before.isComplete &&
      after.isComplete
    );

    const nextBefore = chaptersBefore.find(
      (c) => c.level === currentChapter + 1,
    );
    const nextAfter = chaptersAfter.find((c) => c.level === currentChapter + 1);
    let pendingUnlockName: string | null = null;
    if (
      nextAfter &&
      nextAfter.isUnlocked &&
      nextBefore &&
      !nextBefore.isUnlocked
    ) {
      pendingUnlockName =
        currentChapter === 1
          ? "Explore the rest in any order—pick what matters to you next."
          : CHAPTER_META.find((m) => m.level === nextAfter.level)?.name ||
            "Next chapter";
    }
    const reliefChapterAfter = chaptersAfter.find(
      (c) => c.level === RELIEF_CHAPTER,
    );
    const pendingRelief = !!(
      reliefChapterAfter && reliefChapterAfter.isComplete
    );

    if (value) showToast("Saved");
    if (after && after.total > 0 && after.total - after.answered === 1) {
      showToast("You're close to finishing this chapter");
    }

    if (justCompleted) {
      const meta = CHAPTER_META.find((m) => m.level === currentChapter);
      setMilestone({
        level: currentChapter,
        pendingUnlock: pendingUnlockName,
        pendingRelief,
      });
      if (meta) showToast(`Chapter complete. ${meta.completionMessage}`);
    } else {
      if (pendingUnlockName) setUnlockName(pendingUnlockName);
      if (pendingRelief) tryShowRelief(true);
    }

    if (shares.length === 0 && getAnsweredCount(nextAnswers) === 2) {
      let notifyDismissed = false;
      try {
        notifyDismissed =
          sessionStorage.getItem("wid-notify-step-dismissed") === "1";
      } catch {
        // ignore
      }
      if (!notifyDismissed) setShowNotifyStep(true);
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

  async function handleAddShare(
    emails: string[],
    allowedCategories: string[] | null,
    message: string,
  ) {
    if (!userId) return;
    const newShares: Share[] = [];
    let failures = 0;

    for (const email of emails) {
      const payload: Record<string, unknown> = {
        user_id: userId,
        email,
        role: "viewer",
        invite_token: crypto.randomUUID().replace(/-/g, ""),
        invite_sent_at: new Date().toISOString(),
      };
      if (allowedCategories)
        payload.allowed_question_ids =
          questionIdsForCategories(allowedCategories);
      const { data, error } = await getSupabase()
        .from("shares")
        .upsert(payload, { onConflict: "user_id,email" })
        .select();
      if (error || !data?.length) {
        failures += 1;
        continue;
      }
      const newShare = data[0] as Share;
      newShares.push(newShare);

      if (newShare.invite_token) {
        const link = `${window.location.origin}/view-invite?token=${encodeURIComponent(newShare.invite_token)}`;
        fetch("/api/invites/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, message, inviteLink: link }),
        }).catch(() => {});
      }
    }

    if (newShares.length) {
      setShares((prev) => [
        ...newShares,
        ...prev.filter((s) => !newShares.some((n) => n.id === s.id)),
      ]);
      showToast(
        failures
          ? `Sent to ${newShares.length}, ${failures} failed.`
          : INVITE_SUCCESS_TOASTS[
              Math.floor(Math.random() * INVITE_SUCCESS_TOASTS.length)
            ],
      );
      window.setTimeout(() => tryShowRelief(), 800);
    } else {
      showToast("Hmm, that didn't land. Try again?");
    }
  }

  function dismissNotifyStep() {
    setShowNotifyStep(false);
    try {
      sessionStorage.setItem("wid-notify-step-dismissed", "1");
    } catch {
      // ignore
    }
  }

  async function handleOnboardingAddShare(
    emails: string[],
    allowedCategories: string[] | null,
    message: string,
  ) {
    await handleAddShare(emails, allowedCategories, message);
    dismissNotifyStep();
  }

  async function handleRemoveShare(id: string) {
    if (!userId) return;
    await getSupabase()
      .from("shares")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);
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
        JSON.stringify({ updatedAt: new Date().toISOString(), sections }),
      );
    } catch {
      // ignore
    }
    window.open("/plan-print", "_blank", "noopener");
  }

  async function handleLogout() {
    await getSupabase().auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="dashboard-gate">
        <div className="dashboard-gate-spinner" aria-hidden="true" />
        <p>Fluffing the petals…</p>
      </div>
    );
  }

  const chapters = getQuestionsByChapter(answers);
  const answeredCount = getAnsweredCount(answers);
  const currentQuestion = QUESTIONS[currentIndex];
  const currentChapter = chapters.find(
    (c) => c.level === currentQuestion.chapter,
  );
  const nextUnansweredIndex = getNextUnansweredIndex(answers, currentIndex);
  const unansweredInChapter = currentChapter
    ? currentChapter.total - currentChapter.answered
    : 0;
  const skipped = QUESTIONS.map((q, idx) => ({ q, idx })).filter(
    ({ q }) => !hasAnswerValue(q, getAnswerFor(answers, q)),
  );
  const planSections = getPlanSections(answers);

  return (
    <div className="page-app page-dashboard">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/dashboard" className="logo">
            <Image
              src="/assets/logo.png"
              alt="When I Die™"
              className="logo-image"
              width={120}
              height={48}
            />
          </Link>
          <nav className="nav">
            <span className="nav-user">{userEmail}</span>
            <Link href="/">Home</Link>
            <button
              type="button"
              className="btn secondary-btn btn--small"
              onClick={handleLogout}
            >
              Log out
            </button>
          </nav>
        </div>
        <div className="announcement-bar">
          <span className="announcement-bar__text">
            Your life, your wishes, your extremely specific playlist.
          </span>
        </div>
      </header>

      <main className="app-main dashboard-main" id="main-content">
        <div className="container">
          <div className="dashboard-layout">
            <aside
              className="dashboard-sidebar"
              aria-label="Progress and milestones"
            >
              <div
                className="progress-cycle"
                role="region"
                aria-labelledby="progress-cycle-label"
              >
                <h2
                  id="progress-cycle-label"
                  className="progress-cycle__heading"
                >
                  Progress
                </h2>
                <div
                  className="daisy-progress-wrap daisy-progress-wrap--hero"
                  role="progressbar"
                  aria-valuenow={
                    QUESTIONS.length > 0
                      ? Math.round((answeredCount / QUESTIONS.length) * 100)
                      : 0
                  }
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Overall progress"
                >
                  <DaisyProgress
                    total={QUESTIONS.length}
                    completed={answeredCount}
                    variant="hero"
                  />
                  <span className="progress-cycle__center progress-cycle__center--daisy">
                    <span className="progress-cycle__count">
                      {answeredCount}
                    </span>
                    <span className="progress-cycle__sep">/</span>
                    <span className="progress-cycle__total">
                      {QUESTIONS.length}
                    </span>
                  </span>
                </div>
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

              {showNotifyStep ? (
                <ShareSection
                  shares={shares}
                  onAddShare={handleOnboardingAddShare}
                  onRemoveShare={handleRemoveShare}
                  onCopy={copyText}
                  onToast={showToast}
                  eyebrow="First things first"
                  heading="Who should we tell you've started a plan?"
                  intro="They'll get a short note letting them know, and can check in on your progress anytime. They won't see your actual answers unless you choose to share them."
                  footer={
                    <button
                      type="button"
                      className="btn ghost-btn btn--small"
                      onClick={dismissNotifyStep}
                      style={{ marginTop: "0.5rem" }}
                    >
                      Skip for now
                    </button>
                  }
                />
              ) : (
                <section
                  className="dashboard-section dashboard-question-current"
                  id="question-current-section"
                >
                  <QuestionCard
                    key={currentQuestion.id}
                    question={currentQuestion}
                    index={currentIndex}
                    total={QUESTIONS.length}
                    rawValue={getAnswerFor(answers, currentQuestion)}
                    onSave={(value) => saveAnswer(currentQuestion, value)}
                    onPrev={() => goToQuestion(currentIndex - 1)}
                    onNext={() => {
                      if (currentIndex >= QUESTIONS.length - 1) {
                        document
                          .getElementById("plan-preview-section")
                          ?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        return;
                      }
                      goToQuestion(currentIndex + 1);
                    }}
                  />
                </section>
              )}

              <section
                className="dashboard-section dashboard-preview dashboard-preview--compact"
                id="plan-preview-section"
                aria-labelledby="plan-preview-heading"
              >
                <div className="plan-preview-watermark" aria-hidden="true" />
                <h2
                  id="plan-preview-heading"
                  className="plan-preview-heading-with-icon"
                >
                  <Image
                    src="/assets/logo.png"
                    alt=""
                    className="plan-preview-heading-daisy"
                    width={80}
                    height={32}
                    aria-hidden="true"
                  />{" "}
                  Your Plan
                </h2>
                <PlanPreview
                  sections={planSections}
                  totalQuestions={QUESTIONS.length}
                  onStartFirst={() => goToQuestion(0)}
                  onPrint={handlePrint}
                />
              </section>
            </div>

            <aside
              className="dashboard-sidebar dashboard-sidebar--right"
              aria-label="Inspiration and progress"
            >
              <div className="chapter-progress-wrap">
                <h3 className="chapter-progress__heading">Progress</h3>
                {currentChapter && currentChapter.total > 0 ? (
                  <DaisyProgress
                    total={currentChapter.total}
                    completed={currentChapter.answered}
                    variant="chapter"
                  />
                ) : null}
                <p className="chapter-progress__text">
                  {currentChapter
                    ? `${currentChapter.answered} of ${currentChapter.total} questions answered in this chapter`
                    : "0 of 0 questions answered in this chapter"}
                </p>
              </div>

              {currentQuestion.suggestions.length > 0 ? (
                <div className="question-inspiration">
                  <h3 className="question-inspiration__title">
                    Need inspiration?
                  </h3>
                  <p className="question-inspiration__text">
                    {currentQuestion.suggestions.join(" · ")}
                  </p>
                </div>
              ) : (
                <p className="right-sidebar-fallback">
                  Take your time. You can come back and edit anytime.
                </p>
              )}

              {unansweredInChapter > 0 || nextUnansweredIndex >= 0 ? (
                <div className="next-unanswered-wrap">
                  <p className="next-unanswered-text">
                    {unansweredInChapter > 0
                      ? `You still have ${unansweredInChapter} unanswered question${unansweredInChapter === 1 ? "" : "s"} in this chapter.`
                      : "This chapter is complete. Jump to the next unanswered question elsewhere."}
                  </p>
                  {nextUnansweredIndex >= 0 ? (
                    <button
                      type="button"
                      className="btn secondary-btn btn--small"
                      onClick={() => goToQuestion(nextUnansweredIndex)}
                    >
                      Jump to next unanswered question
                    </button>
                  ) : null}
                </div>
              ) : null}

              {skipped.length > 0 ? (
                <div className="skipped-questions-wrap">
                  <h3 className="skipped-questions-heading">Come back to</h3>
                  <ul
                    className="skipped-questions-list"
                    aria-label="Skipped or unanswered questions"
                  >
                    {skipped.map(({ q, idx }) => (
                      <li key={q.id}>
                        <button
                          type="button"
                          className="skipped-question-link"
                          onClick={() => goToQuestion(idx)}
                        >
                          {q.title.length > 42
                            ? `${q.title.slice(0, 39)}…`
                            : q.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </aside>
          </div>

          {!showNotifyStep ? (
            <>
              <div className="invitation-bridge" aria-hidden="true">
                <span className="invitation-bridge__text">
                  Your plan gets even better when someone you trust knows about
                  it.
                </span>
              </div>

              <ShareSection
                shares={shares}
                onAddShare={handleAddShare}
                onRemoveShare={handleRemoveShare}
                onCopy={copyText}
                onToast={showToast}
              />
            </>
          ) : null}
        </div>
      </main>

      {toast ? <Toast message={toast.message} bloom={toast.bloom} /> : null}

      {milestone
        ? (() => {
            const meta = CHAPTER_META.find((m) => m.level === milestone.level);
            return (
              <MilestoneModal
                chapterName={meta?.name || `Chapter ${milestone.level}`}
                message={
                  meta?.completionMessage || "You completed this chapter."
                }
                icon={meta?.icon || "/assets/icon-document.svg"}
                tone={meta?.tone || "light"}
                showShareCta={shares.length === 0}
                onClose={closeMilestone}
                onShare={() => {
                  setMilestone(null);
                  document
                    .getElementById("dashboard-shared")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              />
            );
          })()
        : null}

      {unlockName ? (
        <UnlockModal
          chapterName={unlockName}
          onClose={() => setUnlockName(null)}
        />
      ) : null}

      {reliefLine ? (
        <ReliefModal
          humorLine={reliefLine}
          onClose={() => setReliefLine(null)}
          onInvite={() => {
            setReliefLine(null);
            document
              .getElementById("dashboard-shared")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        />
      ) : null}
    </div>
  );
}
