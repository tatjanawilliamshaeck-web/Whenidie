"use client";

import Image from "next/image";
import type { ChapterProgress } from "@/lib/plan";
import { hasAnswerValue } from "@/lib/plan";
import type { AnswersMap } from "@/lib/plan";
import { QUESTIONS } from "@/lib/questions";

export function ChapterNav({
  chapters,
  answers,
  currentIndex,
  onJumpToQuestion,
  onJumpToChapter,
}: {
  chapters: ChapterProgress[];
  answers: AnswersMap;
  currentIndex: number;
  onJumpToQuestion: (index: number) => void;
  onJumpToChapter: (chapterNum: number) => void;
}) {
  return (
    <nav className="chapter-nav" aria-label="Chapters and questions">
      <h3 className="chapter-nav__heading">Chapters</h3>
      <ul className="chapter-question-nav" aria-label="Jump to any question">
        {chapters.map((chapter) => (
          <li
            key={chapter.level}
            className={`chapter-block${chapter.isUnlocked ? "" : " chapter-block--locked"}`}
          >
            <span
              className="chapter-nav__chapter-title"
              role="button"
              tabIndex={0}
              onClick={() => onJumpToChapter(chapter.level)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onJumpToChapter(chapter.level);
                }
              }}
            >
              <span className="chapter-nav__title-inner">
                <Image src="/assets/Logo.svg" alt="" className="chapter-nav__daisy-icon" width={48} height={19} aria-hidden="true" />
                <span className="chapter-nav__icon-cell">
                  <Image src={chapter.icon} alt="" className="chapter-nav__chapter-icon" width={20} height={20} aria-hidden="true" />
                </span>
                <span className="chapter-nav__chapter-text">{chapter.name}</span>
              </span>
            </span>
            <ul className="chapter-nav__question-list">
              {chapter.questions.map((q) => {
                const idx = QUESTIONS.findIndex((x) => x.id === q.id);
                const answered = hasAnswerValue(q, answers[q.id]?.value || "");
                const isCurrent = idx === currentIndex;
                const icon = isCurrent ? "→" : answered ? "✓" : "○";
                const shortTitle = q.title.length > 48 ? `${q.title.slice(0, 45)}…` : q.title;
                const cls = `nav-question${answered ? " nav-question--answered" : " nav-question--unanswered"}${isCurrent ? " nav-question--current" : ""}`;
                return (
                  <li key={q.id}>
                    <button
                      type="button"
                      className={cls}
                      onClick={() => onJumpToQuestion(idx)}
                      aria-label={`${isCurrent ? "Current question: " : ""}${q.title}`}
                    >
                      <span className="nav-question__icon" aria-hidden="true">
                        {icon}
                      </span>{" "}
                      <span className="nav-question__title">{shortTitle}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}
