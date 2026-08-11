"use client";

import { useRef } from "react";

export type FaqItem = { question: string; answer: React.ReactNode };

export function FaqAccordion({
  items,
  className = "faq-accordion faq-accordion--simple",
  firstOpen = true,
}: {
  items: FaqItem[];
  className?: string;
  firstOpen?: boolean;
}) {
  const detailsRefs = useRef<(HTMLDetailsElement | null)[]>([]);

  function handleToggle(index: number) {
    const opened = detailsRefs.current[index];
    if (!opened?.open) return;
    detailsRefs.current.forEach((el, i) => {
      if (i !== index && el) el.open = false;
    });
  }

  return (
    <div className={className}>
      {items.map((item, i) => (
        <details
          key={item.question}
          className="faq-item"
          open={firstOpen && i === 0}
          ref={(el) => {
            detailsRefs.current[i] = el;
          }}
          onToggle={() => handleToggle(i)}
        >
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
