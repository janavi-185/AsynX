export interface GainPosition {
  balance: number;
  gain: number;
}

export interface Holding {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: GainPosition;
  ltcg: GainPosition;
}

export interface GainBucket {
  profits: number;
  losses: number;
}

export interface CapitalGains {
  stcg: GainBucket;
  ltcg: GainBucket;
}

export interface CapitalGainsResponse {
  capitalGains: CapitalGains;
}

export type HoldingsResponse = Holding[];

export interface MockApiOptions {
  delayMs?: number;
  shouldFail?: boolean;
}
