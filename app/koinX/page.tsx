"use client";

import { HoldingsTable } from "@/components/holdings-table";
import ImportantNotes from "@/components/important-notes";
import Navbar from "@/components/navbar";
import { PostHarvestCard } from "@/components/post-harvest-card";
import { PreHarvestCard } from "@/components/pre-harvest-card";
import ThemeToggle from "@/components/theme-toggle";
import { getCapitalGains, getHoldings } from "@/lib/api";
import type { CapitalGains, Holding } from "@/types";
import { useEffect, useMemo, useState } from "react";

const makeRowId = (holding: Holding, index: number): string => {
	return `${holding.coin}-${holding.coinName}-${index}`;
};

const netGain = (profits: number, losses: number): number => profits - losses;

const realizedGains = (capitalGains: CapitalGains): number => {
	return (
		netGain(capitalGains.stcg.profits, capitalGains.stcg.losses) +
		netGain(capitalGains.ltcg.profits, capitalGains.ltcg.losses)
	);
};

const buildPostHarvestGains = (
	baseCapitalGains: CapitalGains,
	selectedHoldings: Holding[],
): CapitalGains => {
	const next: CapitalGains = {
		stcg: {
			profits: baseCapitalGains.stcg.profits,
			losses: baseCapitalGains.stcg.losses,
		},
		ltcg: {
			profits: baseCapitalGains.ltcg.profits,
			losses: baseCapitalGains.ltcg.losses,
		},
	};

	for (const holding of selectedHoldings) {
		if (holding.stcg.gain >= 0) {
			next.stcg.profits += holding.stcg.gain;
		} else {
			next.stcg.losses += Math.abs(holding.stcg.gain);
		}

		if (holding.ltcg.gain >= 0) {
			next.ltcg.profits += holding.ltcg.gain;
		} else {
			next.ltcg.losses += Math.abs(holding.ltcg.gain);
		}
	}

	return next;
};

export default function KoinXPage() {
	const [holdings, setHoldings] = useState<Holding[]>([]);
	const [capitalGains, setCapitalGains] = useState<CapitalGains | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set());

	useEffect(() => {
		let mounted = true;

		const loadData = async () => {
			try {
				setLoading(true);
				setError(null);

				const [holdingsResponse, capitalGainsResponse] = await Promise.all([
					getHoldings(),
					getCapitalGains(),
				]);

				if (!mounted) return;

				setHoldings(holdingsResponse);
				setCapitalGains(capitalGainsResponse.capitalGains);
			} catch (loadError) {
				if (!mounted) return;

				const message =
					loadError instanceof Error
						? loadError.message
						: "Unable to load tax harvesting data";

				setError(message);
			} finally {
				if (mounted) {
					setLoading(false);
				}
			}
		};

		loadData();

		return () => {
			mounted = false;
		};
	}, []);

	const orderedHoldings = useMemo(() => {
		return [...holdings].sort((a, b) => {
			const aMagnitude = Math.abs(a.stcg.gain) + Math.abs(a.ltcg.gain);
			const bMagnitude = Math.abs(b.stcg.gain) + Math.abs(b.ltcg.gain);
			return bMagnitude - aMagnitude;
		});
	}, [holdings]);

	const selectedHoldings = useMemo(() => {
		return orderedHoldings.filter((holding, index) =>
			selectedRowIds.has(makeRowId(holding, index)),
		);
	}, [orderedHoldings, selectedRowIds]);

	const postHarvestGains = useMemo(() => {
		if (!capitalGains) return null;
		return buildPostHarvestGains(capitalGains, selectedHoldings);
	}, [capitalGains, selectedHoldings]);

	const savingsData = useMemo(() => {
		if (!capitalGains || !postHarvestGains) {
			return { showSavings: false, savingsAmount: 0 };
		}

		const pre = realizedGains(capitalGains);
		const post = realizedGains(postHarvestGains);
		const savingsAmount = pre - post;

		return {
			showSavings: savingsAmount > 0,
			savingsAmount: savingsAmount > 0 ? savingsAmount : 0,
		};
	}, [capitalGains, postHarvestGains]);

	const handleToggleAll = (checked: boolean) => {
		if (checked) {
			const allRowIds = orderedHoldings.map((holding, index) =>
				makeRowId(holding, index),
			);
			setSelectedRowIds(new Set(allRowIds));
			return;
		}

		setSelectedRowIds(new Set());
	};

	const handleToggleRow = (rowId: string, checked: boolean) => {
		setSelectedRowIds((previous) => {
			const next = new Set(previous);

			if (checked) {
				next.add(rowId);
			} else {
				next.delete(rowId);
			}

			return next;
		});
	};

	return (
			<section className="mx-auto w-full overflow-hidden rounded-sm bg-[#edf1f6]">
				<Navbar />

				<div className="mx-auto max-w-7xl space-y-3 p-4 sm:p-6">
					<div className="flex items-center gap-3 relative z-10">
						<h2 className="text-3xl font-semibold leading-none text-slate-800 dark:text-slate-100 sm:text-4xl">
							Tax Harvesting
						</h2>
						<div className="group relative flex items-center pt-2">
							<button
								type="button"
								className="text-sm font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4 dark:text-blue-400 dark:hover:text-blue-300"
							>
								How it works?
							</button>
							<div className="absolute left-1/2 top-[calc(100%+0.5rem)] hidden -translate-x-1/2 w-80 rounded-lg bg-[#0F1629] p-4 text-[13px] leading-5 text-slate-200 shadow-xl group-hover:block dark:bg-slate-800 border border-slate-700">
								<div className="absolute -top-1.5 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 rounded-sm bg-[#0F1629] border-l border-t border-slate-700 dark:bg-slate-800"></div>
								<div className="relative z-10">
									Lorem ipsum dolor sit amet consectetur. Euismod id posuere
									nibh semper mattis scelerisque tellus. Vel mattis diam duis
									morbi tellus dui consectetur.{" "}
									<a href="#" className="font-medium text-blue-400 underline underline-offset-2 hover:text-blue-300">
										Know More
									</a>
								</div>
							</div>
						</div>
						<div className="ml-auto">
							<ThemeToggle />
						</div>
					</div>

					<ImportantNotes />

					{loading ? (
						<div className="rounded-lg border border-slate-300 bg-white p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
							Loading holdings and gains...
						</div>
					) : null}

					{error ? (
						<div className="rounded-lg border border-rose-300 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-600/60 dark:bg-rose-950/30 dark:text-rose-200">
							{error}
						</div>
					) : null}

					{!loading && !error && capitalGains && postHarvestGains ? (
						<>
							<div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
								<PreHarvestCard
									capitalGains={capitalGains}
									className="rounded-lg border border-slate-200"
								/>
								<PostHarvestCard
									capitalGains={postHarvestGains}
									showSavings={savingsData.showSavings}
									savingsAmount={savingsData.savingsAmount}
									className="rounded-lg"
								/>
							</div>

							<section className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900 sm:p-4">
								<h3 className="mb-3 text-[30px] font-semibold leading-none text-slate-800 dark:text-slate-100">
									Holdings
								</h3>
								<HoldingsTable
									holdings={orderedHoldings}
									selectedRowIds={selectedRowIds}
									onToggleAll={handleToggleAll}
									onToggleRow={handleToggleRow}
									rowIdAccessor={makeRowId}
								/>
								<button
									type="button"
									className="mt-3 text-sm font-semibold text-blue-600 underline underline-offset-2 dark:text-blue-400"
								>
									View all
								</button>
							</section>
						</>
					) : null}
				</div>
			</section>
	);
}
