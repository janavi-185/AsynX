import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { CapitalGains } from "@/types";

type CardVariant = "pre" | "post";

interface HarvestSummaryCardProps {
  title: string;
  totalLabel: string;
  capitalGains: CapitalGains;
  variant: CardVariant;
  showSavings?: boolean;
  savingsAmount?: number;
  className?: string;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
};

const netGain = (profits: number, losses: number): number => profits - losses;

export default function HarvestSummaryCard({
  title,
  totalLabel,
  capitalGains,
  variant,
  showSavings = false,
  savingsAmount = 0,
  className,
}: HarvestSummaryCardProps) {
  const stcgNet = netGain(capitalGains.stcg.profits, capitalGains.stcg.losses);
  const ltcgNet = netGain(capitalGains.ltcg.profits, capitalGains.ltcg.losses);
  const aggregate = stcgNet + ltcgNet;

  const isPost = variant === "post";

  return (
    <Card
      className={cn(
        "gap-3 py-4 shadow-none",
        isPost
          ? "border-0 bg-[#3B7BFF] text-white shadow-lg shadow-blue-900/20"
          : "border-slate-200 bg-white dark:border-[#2C3B6E]/30 dark:bg-[#161C2D] dark:text-slate-100",
        className,
      )}
    >
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2.5 text-xs sm:text-sm">
        <div
          className={cn(
            "grid grid-cols-3 gap-2 font-medium tracking-wide",
            isPost ? "text-white" : "text-slate-500 dark:text-slate-300",
          )}
        >
          <span />
          <span className="text-right">Short-term</span>
          <span className="text-right">Long-term</span>
        </div>

        <div className="grid grid-cols-3 gap-2 font-medium">
          <span>Profits</span>
          <span className="text-right">{formatCurrency(capitalGains.stcg.profits)}</span>
          <span className="text-right">{formatCurrency(capitalGains.ltcg.profits)}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 font-medium">
          <span>Losses</span>
          <span className="text-right">-{formatCurrency(capitalGains.stcg.losses)}</span>
          <span className="text-right">-{formatCurrency(capitalGains.ltcg.losses)}</span>
        </div>

        <div
          className={cn(
            "grid grid-cols-3 gap-2 pt-2 font-medium",
            isPost ? "border-t border-white/20" : "border-t border-border",
          )}
        >
          <span>Net Capital Gains</span>
          <span className="text-right">{formatCurrency(stcgNet)}</span>
          <span className="text-right">{formatCurrency(ltcgNet)}</span>
        </div>

        <div
          className={cn(
            "pt-3 text-sm font-semibold sm:text-base",
            isPost ? "border-t border-white/20" : "border-t border-border",
          )}
        >
          <div className="flex items-center gap-3">
            <span className="text-base sm:text-lg">{totalLabel}:</span>
            <span className="text-2xl sm:text-3xl">{formatCurrency(aggregate)}</span>
          </div>

          {isPost && showSavings ? (
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="text-xl leading-none">🎉</span>
              <span>You are going to save upto {formatCurrency(savingsAmount)}</span>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
