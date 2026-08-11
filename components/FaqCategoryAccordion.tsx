"use client";

import { useRef } from "react";

export type FaqCategory = {
  id: string;
  label: string;
  items: { question: string; answer: React.ReactNode }[];
};

export function FaqCategoryAccordion({ categories }: { categories: FaqCategory[] }) {
  const categoryRefs = useRef<(HTMLDetailsElement | null)[]>([]);

  function handleToggle(index: number) {
    const opened = categoryRefs.current[index];
    if (!opened?.open) return;
    categoryRefs.current.forEach((el, i) => {
      if (i !== index && el) el.open = false;
    });
  }

  function jumpTo(id: string) {
    const index = categories.findIndex((c) => c.id === id);
    if (index === -1) return;
    const el = categoryRefs.current[index];
    if (el) el.open = true;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <div className="faq-jump" role="navigation" aria-label="FAQ topics">
        {categories.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="faq-jump-pill"
            onClick={(e) => {
              e.preventDefault();
              jumpTo(c.id);
            }}
          >
            {c.label}
          </a>
        ))}
      </div>

      <div className="faq-accordion">
        {categories.map((category, i) => (
          <details
            key={category.id}
            className="faq-category-block"
            id={category.id}
            open={i === 0}
            ref={(el) => {
              categoryRefs.current[i] = el;
            }}
            onToggle={() => handleToggle(i)}
          >
            <summary className="faq-category-summary">{category.label}</summary>
            <div className="faq-category-inner">
              {category.items.map((item) => (
                <details className="faq-item" key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
