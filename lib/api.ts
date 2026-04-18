import { mockCapitalGains, mockHoldings } from "../data/mockData";
import type {
  CapitalGainsResponse,
  HoldingsResponse,
  MockApiOptions,
} from "../types";

const DEFAULT_DELAY_MS = 700;

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

async function withMockDelay<T>(
  payload: T,
  options: MockApiOptions = {},
): Promise<T> {
  const { delayMs = DEFAULT_DELAY_MS, shouldFail = false } = options;

  await sleep(delayMs);

  if (shouldFail) {
    throw new Error("Mock API request failed");
  }

  return payload;
}

export async function getHoldings(
  options?: MockApiOptions,
): Promise<HoldingsResponse> {
  return withMockDelay([...mockHoldings], options);
}

export async function getCapitalGains(
  options?: MockApiOptions,
): Promise<CapitalGainsResponse> {
  return withMockDelay({ ...mockCapitalGains }, options);
}
