"use client";

import { useState, useId, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type AccordionItem = {
  id?: string;
  question: string;
  answer: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  /** Allow only one item open at a time (true = exclusive). */
  exclusive?: boolean;
  className?: string;
};

/**
 * Accessible accordion with smooth height transitions.
 * Each row is a real <button> for keyboard focus + aria-expanded.
 */
export function Accordion({ items, exclusive = true, className = "" }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());
  const baseId = useId();

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(exclusive ? [] : prev);
      if (prev.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <ul className={`divide-y divide-white/10 border-y border-white/10 ${className}`}>
      {items.map((item, i) => {
        const id = item.id ?? `${baseId}-${i}`;
        const open = openIds.has(id);
        return (
          <li key={id}>
            <AccordionRow
              id={id}
              question={item.question}
              answer={item.answer}
              open={open}
              onToggle={() => toggle(id)}
            />
          </li>
        );
      })}
    </ul>
  );
}

function AccordionRow({
  id,
  question,
  answer,
  open,
  onToggle,
}: {
  id: string;
  question: string;
  answer: ReactNode;
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;

  return (
    <>
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-shine"
      >
        <span className="text-base font-semibold tracking-tight sm:text-lg">
          {question}
        </span>
        <span
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/15 text-shine transition-all duration-300 group-hover:border-shine ${
            open ? "rotate-45 bg-shine/10" : ""
          }`}
          aria-hidden="true"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
            }
            className="overflow-hidden"
          >
            <div className="pb-6 text-sm leading-relaxed text-slate-muted sm:text-base">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
