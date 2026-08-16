"use client";

import { useState } from "react";
import Image from "next/image";
import type { PlanSection } from "@/lib/plan";
import { DaisyProgress } from "@/components/dashboard/DaisyProgress";

export function PlanPreview({
  sections,
  totalQuestions,
  onStartFirst,
  onPrint,
}: {
  sections: PlanSection[];
  totalQuestions: number;
  onStartFirst: () => void;
  onPrint: () => void;
}) {
  const sectionsWithAnswers = sections.filter((s) => s.items.length > 0);
  const totalAnswered = sections.reduce((sum, s) => sum + s.answered, 0);
  const [allOpen, setAllOpen] = useState(true);

  if (totalAnswered === 0) {
    return (
      <div className="plan-preview-empty-state">
        <span className="plan-preview-empty-daisy" aria-hidden="true">
          <Image src="/assets/logo.png" alt="" width={120} height={48} />
        </span>
        <p className="plan-preview-empty">Your plan is just beginning.</p>
        <button
          type="button"
          className="btn primary-btn plan-preview-empty-cta"
          onClick={onStartFirst}
        >
          Start your first answer
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="plan-summary-daisy-wrap">
        <DaisyProgress
          total={totalQuestions}
          completed={totalAnswered}
          variant="hero"
        />
      </div>
      <div id="plan-header" className="plan-header">
        <p className="plan-header-date">
          Last updated:{" "}
          {new Date().toLocaleDateString(undefined, { dateStyle: "long" })}
        </p>
        <div className="plan-preview-actions">
          <a href="#question-current-section" className="btn secondary-btn">
            Edit answers
          </a>
          <button type="button" className="btn primary-btn" onClick={onPrint}>
            Print / Save as PDF
          </button>
        </div>
      </div>
      <div className="plan-expand-collapse">
        <button
          type="button"
          className="btn ghost-btn btn--small"
          onClick={() => setAllOpen(true)}
        >
          Expand all
        </button>
        <button
          type="button"
          className="btn ghost-btn btn--small"
          onClick={() => setAllOpen(false)}
        >
          Collapse all
        </button>
      </div>
      <div className="plan-sections">
        {sectionsWithAnswers.map((s) => (
          <details className="plan-section" key={s.level} open={allOpen}>
            <summary className="plan-section__summary">
              <Image
                src="/assets/logo.png"
                alt=""
                className="plan-section__daisy-icon"
                width={48}
                height={19}
                aria-hidden="true"
              />
              <Image
                src={s.icon}
                alt=""
                className="plan-section__icon"
                width={20}
                height={20}
                aria-hidden="true"
              />
              <span className="plan-section__title">{s.name}</span>
              {s.total > 0 ? (
                <span className="plan-section__count">
                  {s.answered} / {s.total} answered
                </span>
              ) : null}
            </summary>
            <div className="plan-section__body">
              {s.items.map((item) => (
                <div className="plan-item" key={item.title}>
                  <p className="plan-item-label">{item.title}</p>
                  <p className="plan-item-value">{item.value}</p>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
