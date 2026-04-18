import HarvestSummaryCard from "@/components/harvest-summary-card";
import type { CapitalGains } from "@/types";

interface PostHarvestCardProps {
  capitalGains: CapitalGains;
  savingsAmount?: number;
  showSavings?: boolean;
  className?: string;
}

export function PostHarvestCard({
  capitalGains,
  savingsAmount = 0,
  showSavings = false,
  className,
}: PostHarvestCardProps) {
  return (
    <HarvestSummaryCard
      title="After Harvesting"
      totalLabel="Effective Capital Gains"
      capitalGains={capitalGains}
      variant="post"
      showSavings={showSavings}
      savingsAmount={savingsAmount}
      className={className}
    />
  );
}
