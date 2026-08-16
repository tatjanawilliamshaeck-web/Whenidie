"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "@/styles/plan-print.css";

type PrintSection = { name: string; items: { title: string; value: string }[] };
type PrintPlan = { updatedAt: string; sections: PrintSection[] };

export default function PlanPrintPage() {
  const [plan, setPlan] = useState<PrintPlan | null>(null);

  // localStorage isn't available during server render, so this can't be computed
  // during render — it has to run post-mount.
  useEffect(() => {
    try {
      const stored = localStorage.getItem("wid-print-plan");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed.sections)) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setPlan(parsed);
          localStorage.removeItem("wid-print-plan");
          return;
        }
      }
    } catch {
      // ignore
    }
    setPlan({ updatedAt: new Date().toISOString(), sections: [] });
  }, []);

  const date = plan
    ? new Date(plan.updatedAt).toLocaleDateString(undefined, {
        dateStyle: "long",
      })
    : "";

  return (
    <div className="page-print">
      <div className="print-actions no-print">
        <a href="/dashboard" className="btn secondary-btn">
          ← Back to dashboard
        </a>
        <button
          type="button"
          className="btn primary-btn"
          onClick={() => window.print()}
        >
          Print / Save as PDF
        </button>
        <p className="print-actions-hint">
          Use the button above to save this page as a PDF.
        </p>
      </div>
      <div className="print-content">
        <div className="print-header">
          <Image
            src="/assets/logo.png"
            alt="When I Die™"
            width={120}
            height={48}
            className="print-logo"
          />
          <p className="print-brand">When I Die™</p>
          <h1 className="print-title">Your Personal Plan</h1>
          <p className="print-subtitle">
            Your life, your wishes, your extremely specific playlist.
          </p>
          <p className="print-date">Generated {date}</p>
        </div>
        <div className="print-body">
          {!plan || plan.sections.length === 0 ? (
            <p className="print-empty">
              No answers yet. Add answers in your dashboard to see your plan
              here.
            </p>
          ) : (
            plan.sections.map((section) => (
              <section className="print-section" key={section.name}>
                <h2 className="print-section-title">
                  <Image
                    src="/assets/logo.png"
                    alt=""
                    width={20}
                    height={20}
                    className="print-section-daisy"
                  />{" "}
                  {section.name}
                </h2>
                {section.items.map((item) => (
                  <div className="print-plan-item" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.value}</p>
                  </div>
                ))}
              </section>
            ))
          )}
        </div>
        <footer className="print-footer">
          <p>
            This document was created with When I Die™. Your answers are
            private. We never sell your data.
          </p>
        </footer>
      </div>
    </div>
  );
}
