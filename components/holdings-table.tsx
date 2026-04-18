"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { Holding } from "@/types";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

interface HoldingsTableProps {
  holdings: Holding[];
  selectedRowIds: Set<string>;
  onToggleAll: (checked: boolean) => void;
  onToggleRow: (rowId: string, checked: boolean, holding: Holding) => void;
  rowIdAccessor?: (holding: Holding, index: number) => string;
  sortConfig?: { key: 'stcg' | 'ltcg' | null, direction: 'asc' | 'desc' };
  onSort?: (key: 'stcg' | 'ltcg') => void;
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
  if (gain > 0) return "text-emerald-600 dark:text-emerald-400";
  if (gain < 0) return "text-rose-600 dark:text-rose-400";
  return "text-slate-900 dark:text-slate-100";
};

export function HoldingsTable({
  holdings,
  selectedRowIds,
  onToggleAll,
  onToggleRow,
  rowIdAccessor = defaultRowIdAccessor,
  sortConfig = { key: null, direction: 'asc' },
  onSort = () => {},
  className,
}: HoldingsTableProps) {
  const totalRows = holdings.length;
  const selectedRows = selectedRowIds.size;
  const isAllSelected = totalRows > 0 && selectedRows === totalRows;

  const renderSortIcon = (key: 'stcg' | 'ltcg') => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? <ArrowUp className="size-3.5" /> : <ArrowDown className="size-3.5" />;
    }
    return <ArrowUpDown className="size-3.5 text-slate-400 opacity-50 transition-opacity group-hover:opacity-100" />;
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-slate-200 bg-white shadow-none dark:border-slate-700/50 dark:bg-[#161C2D]",
        className,
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-212.5 text-left text-xs sm:text-sm">
          <thead className="bg-[#f9fafc] text-slate-700 dark:bg-[#0F1425] dark:text-slate-100">
            <tr>
              <th className="w-10 px-4 py-4">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={(checked) => onToggleAll(Boolean(checked))}
                  aria-label="Select all holdings"
                />
              </th>
              <th className="px-3 py-4 font-semibold text-slate-500 dark:text-slate-300">Asset</th>
              <th className="px-3 py-4 font-semibold text-center sm:text-left text-slate-500 dark:text-slate-300">
                <div className="leading-tight">
                  <p>Holdings</p>
                  <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">Current Market Rate</p>
                </div>
              </th>
              <th className="px-3 py-4 font-semibold text-slate-500 dark:text-slate-300">Total Current Value</th>
              <th className="px-3 py-4 font-semibold">
                <button 
                  type="button" 
                  onClick={() => onSort('stcg')}
                  className="group flex items-center gap-1.5 focus:outline-hidden hover:text-blue-600 dark:hover:text-blue-400 text-slate-500 dark:text-slate-300 transition-colors"
                >
                  <span>Short-term</span>
                  {renderSortIcon('stcg')}
                </button>
              </th>
              <th className="px-3 py-4 font-semibold">
                <button 
                  type="button" 
                  onClick={() => onSort('ltcg')}
                  className="group flex items-center gap-1.5 focus:outline-hidden hover:text-blue-600 dark:hover:text-blue-400 text-slate-500 dark:text-slate-300 transition-colors"
                >
                  <span>Long-Term</span>
                  {renderSortIcon('ltcg')}
                </button>
              </th>
              <th className="px-3 py-4 font-semibold text-slate-500 dark:text-slate-300">Amount to Sell</th>
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
                    "border-t border-slate-200 transition-colors dark:border-slate-700/50",
                    isSelected
                      ? "bg-blue-50 dark:bg-[#1A254B]"
                      : "bg-white dark:bg-[#161C2D]",
                  )}
                >
                  <td className="px-4 py-4 align-top">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) =>
                        onToggleRow(rowId, Boolean(checked), holding)
                      }
                      aria-label={`Select ${holding.coinName}`}
                    />
                  </td>

                  <td className="px-3 py-4 align-top">
                    <div className="flex items-start gap-3">
                      <img
                        src={holding.logo}
                        alt={holding.coinName}
                        className="mt-0.5 size-5 rounded-full"
                        loading="lazy"
                      />
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{holding.coin}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{holding.coinName}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-4 align-top">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {formatQuantity(holding.totalHolding)} {holding.coin}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {formatCurrency(holding.averageBuyPrice)}/{holding.coin}
                    </p>
                  </td>

                  <td className="px-3 py-4 align-top font-semibold text-slate-900 dark:text-slate-100">
                    {formatCurrency(holding.currentPrice * holding.totalHolding)}
                  </td>

                  <td className="px-3 py-4 align-top">
                    <p className={cn("font-medium", gainClassName(holding.stcg.gain))}>
                      {holding.stcg.gain > 0 ? "+" : ""}{compactCurrency(holding.stcg.gain)}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {formatQuantity(holding.stcg.balance)} {holding.coin}
                    </p>
                  </td>

                  <td className="px-3 py-4 align-top">
                    <p className={cn("font-medium", gainClassName(holding.ltcg.gain))}>
                      {holding.ltcg.gain > 0 ? "+" : ""}{compactCurrency(holding.ltcg.gain)}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {formatQuantity(holding.ltcg.balance)} {holding.coin}
                    </p>
                  </td>

                  <td className="px-3 py-4 align-top font-medium text-slate-700 dark:text-slate-300">
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
