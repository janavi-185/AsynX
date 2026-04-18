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
  const [open, setOpen] = useState(false);

  return (
    <section
      className={cn(
        "rounded-lg border border-blue-400 bg-blue-100 dark:border-[#2C3B6E] dark:bg-[#1A223E]",
        className,
      )}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3 text-left text-[15px] font-medium text-slate-700 dark:text-slate-100"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
      >
        <span className="flex items-center gap-3">
          <div className="flex size-4.5 items-center justify-center rounded-full border border-blue-600 dark:border-blue-400">
            <Info className="size-3 text-blue-600 dark:text-blue-400" />
          </div>
          <span>Important Notes & Disclaimers</span>
        </span>
        <ChevronDown
          className={cn(
            "size-4.5 text-slate-500 transition-transform dark:text-slate-300",
            open ? "rotate-180" : "rotate-0",
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-blue-200 px-5 py-4 dark:border-[#2C3B6E]">
            <ul className="list-disc space-y-2.5 pl-4 text-[14px] text-slate-600 dark:text-slate-300">
              {defaultNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
