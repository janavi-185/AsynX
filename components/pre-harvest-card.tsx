import HarvestSummaryCard from "@/components/harvest-summary-card";
import type { CapitalGains } from "@/types";

interface PreHarvestCardProps {
  capitalGains: CapitalGains;
  className?: string;
}

export function PreHarvestCard({
  capitalGains,
  className,
}: PreHarvestCardProps) {
  return (
    <HarvestSummaryCard
      title="Pre Harvesting"
      totalLabel="Realised Capital Gains"
      capitalGains={capitalGains}
      variant="pre"
      className={className}
    />
  );
}
