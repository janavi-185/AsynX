import type { CapitalGains, GainBucket, Holding } from "@/types";

export interface CapitalGainsSummary {
	stcgNet: number;
	ltcgNet: number;
	realizedCapitalGains: number;
}

export interface SavingsInsight {
	shouldShowSavings: boolean;
	savingsAmount: number;
	preHarvestRealized: number;
	postHarvestRealized: number;
}

const createEmptyBucket = (): GainBucket => ({ profits: 0, losses: 0 });

const cloneCapitalGains = (capitalGains: CapitalGains): CapitalGains => ({
	stcg: { ...capitalGains.stcg },
	ltcg: { ...capitalGains.ltcg },
});

const addGainToBucket = (bucket: GainBucket, gain: number): GainBucket => {
	if (gain >= 0) {
		return {
			...bucket,
			profits: bucket.profits + gain,
		};
	}

	return {
		...bucket,
		losses: bucket.losses + Math.abs(gain),
	};
};

export const getNetGain = (bucket: GainBucket): number => {
	return bucket.profits - bucket.losses;
};

export const getRealizedCapitalGains = (capitalGains: CapitalGains): number => {
	return getNetGain(capitalGains.stcg) + getNetGain(capitalGains.ltcg);
};

export const getCapitalGainsSummary = (
	capitalGains: CapitalGains,
): CapitalGainsSummary => {
	const stcgNet = getNetGain(capitalGains.stcg);
	const ltcgNet = getNetGain(capitalGains.ltcg);

	return {
		stcgNet,
		ltcgNet,
		realizedCapitalGains: stcgNet + ltcgNet,
	};
};

export const applyHoldingToCapitalGains = (
	capitalGains: CapitalGains,
	holding: Pick<Holding, "stcg" | "ltcg">,
): CapitalGains => {
	const next = cloneCapitalGains(capitalGains);

	next.stcg = addGainToBucket(next.stcg, holding.stcg.gain);
	next.ltcg = addGainToBucket(next.ltcg, holding.ltcg.gain);

	return next;
};

export const buildPostHarvestCapitalGains = (
	baseCapitalGains: CapitalGains,
	selectedHoldings: ReadonlyArray<Pick<Holding, "stcg" | "ltcg">>,
): CapitalGains => {
	return selectedHoldings.reduce<CapitalGains>(
		(acc, holding) => applyHoldingToCapitalGains(acc, holding),
		cloneCapitalGains(baseCapitalGains),
	);
};

export const getSavingsInsight = (
	preHarvestCapitalGains: CapitalGains,
	postHarvestCapitalGains: CapitalGains,
): SavingsInsight => {
	const preHarvestRealized = getRealizedCapitalGains(preHarvestCapitalGains);
	const postHarvestRealized = getRealizedCapitalGains(postHarvestCapitalGains);
	const savingsAmount = preHarvestRealized - postHarvestRealized;

	return {
		shouldShowSavings: savingsAmount > 0,
		savingsAmount: savingsAmount > 0 ? savingsAmount : 0,
		preHarvestRealized,
		postHarvestRealized,
	};
};

export const createEmptyCapitalGains = (): CapitalGains => ({
	stcg: createEmptyBucket(),
	ltcg: createEmptyBucket(),
});

