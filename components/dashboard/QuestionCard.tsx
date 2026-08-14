"use client";

import { useEffect, useRef, useState } from "react";
import type { Question } from "@/lib/questions";
import { parseAnswerValue } from "@/lib/plan";

function buildValue(question: Question, primary: string, story: string): string {
  if (question.fieldType === "choice_with_story") {
    if (!primary) return "";
    return story.trim() ? JSON.stringify({ choice: primary, story: story.trim() }) : primary;
  }
  if (question.fieldType === "short_text_story") {
    let p = primary.trim();
    const s = story.trim();
    if (question.maxLength && p.length > question.maxLength) p = p.slice(0, question.maxLength);
    return s ? JSON.stringify({ primary: p, story: s }) : p;
  }
  let v = primary.trim();
  if (question.maxLength && v.length > question.maxLength) v = v.slice(0, question.maxLength);
  return v;
}

export function QuestionCard({
  question,
  index,
  total,
  rawValue,
  onSave,
  onPrev,
  onNext,
  onSkip,
}: {
  question: Question;
  index: number;
  total: number;
  rawValue: string;
  onSave: (value: string) => void;
  onPrev: () => void;
  onNext: () => void;
  onSkip: () => void;
}) {
  const parsed = parseAnswerValue(question, rawValue);
  const initialPrimary =
    parsed && typeof parsed === "object"
      ? parsed.choice ?? parsed.primary ?? ""
      : typeof parsed === "string"
        ? parsed
        : "";
  const initialStory = (parsed && typeof parsed === "object" && parsed.story) || "";

  const [primary, setPrimary] = useState(initialPrimary);
  const [story, setStory] = useState(initialStory);
  const [storyExpanded, setStoryExpanded] = useState(!!initialStory);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Parent renders this with `key={question.id}`, so a fresh instance (and fresh
  // state above) mounts per question — no reset effect needed.
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, []);

  function commit(nextPrimary = primary, nextStory = story) {
    onSave(buildValue(question, nextPrimary, nextStory));
  }

  // Read straight from the DOM on blur rather than the `primary`/`story` state
  // closures — avoids any risk of committing a stale value if blur fires before
  // a state update from the last keystroke has been applied.
  function commitFromDom() {
    const primaryEl = inputRef.current;
    const nextPrimary = primaryEl ? primaryEl.value : primary;
    onSave(buildValue(question, nextPrimary, story));
  }

  const hasStoryField = question.fieldType === "short_text_story" || question.fieldType === "choice_with_story";
  const maxLen =
    question.fieldType === "short_text" || question.fieldType === "short_text_story"
      ? question.maxLength || 120
      : question.maxLength || 2000;

  return (
    <div className="question-card-container">
      <div className="question-card-single" role="article">
        <h2 className="question-card-single__title">{question.title}</h2>
        <p className="question-card-single__prompt">{question.body}</p>

        {question.suggestions.length > 0 ? (
          <div className="question-card-single__suggestions" aria-label="Suggested ideas">
            <span className="question-card-single__suggestions-label">Suggested ideas</span>
            <div className="question-card-suggestions-list">
              {question.suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="question-card-suggestion-pill"
                  onClick={() => {
                    setPrimary(s);
                    commit(s, story);
                    inputRef.current?.focus();
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className="question-card-single__input">
          {question.fieldType === "choice_with_story" && question.choices ? (
            <div className="question-card-choices" role="group" aria-label="Choose one">
              {question.choices.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`answer-choice${c === primary ? " answer-choice--active" : ""}`}
                  onClick={() => {
                    setPrimary(c);
                    commit(c, story);
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          ) : question.fieldType === "short_text" || question.fieldType === "short_text_story" ? (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type="text"
              className="auth-input question-card-primary-input"
              placeholder={question.body}
              maxLength={maxLen}
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
              onBlur={commitFromDom}
            />
          ) : (
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              className="auth-input auth-textarea question-card-primary-input"
              rows={4}
              placeholder={question.body}
              maxLength={maxLen}
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
              onBlur={commitFromDom}
            />
          )}
        </div>

        {hasStoryField ? (
          <>
            <button
              type="button"
              className="question-card-story-toggle"
              aria-expanded={storyExpanded}
              onClick={() => setStoryExpanded((v) => !v)}
            >
              <span className="question-card-story-toggle__icon" aria-hidden="true" />
              <span>{question.storyPrompt || "Tell the story behind it"}</span>
            </button>
            {storyExpanded ? (
              <div className="question-card-single__story question-card-single__story--expandable">
                <label className="auth-label">{question.storyPrompt || "Tell the story behind it (optional)"}</label>
                <textarea
                  className="auth-input auth-textarea"
                  rows={3}
                  placeholder="Tell the story behind it (optional)"
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  onBlur={() => commit()}
                />
              </div>
            ) : null}
          </>
        ) : null}
      </div>

      <div className="question-nav-actions">
        <div className="question-nav-actions__left">
          {index > 0 ? (
            <button type="button" className="btn secondary-btn btn--nav" onClick={onPrev} aria-label="Previous question">
              Back
            </button>
          ) : null}
          <button type="button" className="btn ghost-btn btn--nav question-nav-skip" onClick={onSkip} aria-label="Skip this question">
            Skip
          </button>
        </div>
        <button type="button" className="btn primary-btn btn--nav" onClick={onNext} aria-label="Next question">
          {index >= total - 1 ? "View my plan" : "Next"}
        </button>
      </div>
    </div>
  );
}
