"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { Holding } from "@/types";

interface HoldingsTableProps {
  holdings: Holding[];
  selectedRowIds: Set<string>;
  onToggleAll: (checked: boolean) => void;
  onToggleRow: (rowId: string, checked: boolean, holding: Holding) => void;
  rowIdAccessor?: (holding: Holding, index: number) => string;
  className?: string;
}

const defaultRowIdAccessor = (holding: Holding, index: number): string => {
  return `${holding.coin}-${holding.coinName}-${index}`;
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
};

const compactCurrency = (value: number): string => {
  const absolute = Math.abs(value);

  if (absolute > 0 && absolute < 0.01) {
    return `₹${value.toFixed(6)}`;
  }

  return formatCurrency(value);
};

const formatQuantity = (value: number): string => {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 8,
  }).format(value);
};

const gainClassName = (gain: number): string => {
  if (gain > 0) return "text-emerald-600";
  if (gain < 0) return "text-rose-600";
  return "text-foreground";
};

export function HoldingsTable({
  holdings,
  selectedRowIds,
  onToggleAll,
  onToggleRow,
  rowIdAccessor = defaultRowIdAccessor,
  className,
}: HoldingsTableProps) {
  const totalRows = holdings.length;
  const selectedRows = selectedRowIds.size;
  const isAllSelected = totalRows > 0 && selectedRows === totalRows;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-slate-200 bg-white shadow-none dark:border-slate-700 dark:bg-slate-900",
        className,
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-230 text-left text-xs sm:text-sm">
          <thead className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <tr>
              <th className="w-10 px-4 py-3">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={(checked) => onToggleAll(Boolean(checked))}
                  aria-label="Select all holdings"
                />
              </th>
              <th className="px-3 py-3 font-medium">Asset</th>
              <th className="px-3 py-3 font-medium">
                <div className="leading-tight">
                  <p>Holdings</p>
                  <p className="text-[10px] font-medium text-slate-500">Current Market Rate</p>
                </div>
              </th>
              <th className="px-3 py-3 font-medium">Total Current Value</th>
              <th className="px-3 py-3 font-medium">Short-term</th>
              <th className="px-3 py-3 font-medium">Long-Term</th>
              <th className="px-3 py-3 font-medium">Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding, index) => {
              const rowId = rowIdAccessor(holding, index);
              const isSelected = selectedRowIds.has(rowId);

              return (
                <tr
                  key={rowId}
                  className={cn(
                    "border-t border-slate-200 transition-colors dark:border-slate-700",
                    isSelected
                      ? "bg-blue-50 dark:bg-blue-950/40"
                      : "bg-white dark:bg-slate-900",
                  )}
                >
                  <td className="px-4 py-3 align-top">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) =>
                        onToggleRow(rowId, Boolean(checked), holding)
                      }
                      aria-label={`Select ${holding.coinName}`}
                    />
                  </td>

                  <td className="px-3 py-3 align-top">
                    <div className="flex items-start gap-2">
                      <img
                        src={holding.logo}
                        alt={holding.coinName}
                        className="mt-0.5 size-5 rounded-full"
                        loading="lazy"
                      />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">{holding.coin}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{holding.coinName}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-3 align-top">
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      {formatQuantity(holding.totalHolding)} {holding.coin}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {formatCurrency(holding.averageBuyPrice)}/{holding.coin}
                    </p>
                  </td>

                  <td className="px-3 py-3 align-top font-medium text-slate-900 dark:text-slate-100">
                    {formatCurrency(holding.currentPrice * holding.totalHolding)}
                  </td>

                  <td className="px-3 py-3 align-top">
                    <p className={cn("font-medium", gainClassName(holding.stcg.gain))}>
                      {compactCurrency(holding.stcg.gain)}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {formatQuantity(holding.stcg.balance)} {holding.coin}
                    </p>
                  </td>

                  <td className="px-3 py-3 align-top">
                    <p className={cn("font-medium", gainClassName(holding.ltcg.gain))}>
                      {compactCurrency(holding.ltcg.gain)}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {formatQuantity(holding.ltcg.balance)} {holding.coin}
                    </p>
                  </td>

                  <td className="px-3 py-3 align-top font-medium text-slate-700 dark:text-slate-200">
                    {isSelected
                      ? `${formatQuantity(holding.totalHolding)} ${holding.coin}`
                      : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
