"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, Info } from "lucide-react";
import { useState } from "react";

interface ImportantNotesProps {
  className?: string;
}

const defaultNotes = [
  "Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.",
  "Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.",
  "Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.",
  "Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.",
  "Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.",
];

export default function ImportantNotes({ className }: ImportantNotesProps) {
  const [open, setOpen] = useState(true);

  return (
    <section
      className={cn(
        "rounded-md border border-blue-400 bg-blue-100 dark:border-blue-500/60 dark:bg-slate-900",
        className,
      )}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-semibold text-slate-700 dark:text-slate-200"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <Info className="size-4 text-blue-600 dark:text-blue-400" />
          <span>Important Notes & Disclaimers</span>
        </span>
        <ChevronDown
          className={cn(
            "size-4 text-slate-500 transition-transform dark:text-slate-300",
            open ? "rotate-180" : "rotate-0",
          )}
        />
      </button>

      {open ? (
        <div className="border-t border-blue-200 px-4 py-3 dark:border-blue-500/40">
          <ul className="list-disc space-y-1.5 pl-4 text-sm text-slate-600 dark:text-slate-300">
            {defaultNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
