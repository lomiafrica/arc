/** Custodial Arc hop. Merchants never hold keys. Last mile stays Wave, MTN, or SPI. */

export type LastMileRail = "wave" | "mtn" | "spi";

const LAST_MILE_RAILS: readonly LastMileRail[] = ["wave", "mtn", "spi"];

export function assertLastMileRail(rail: string): LastMileRail {
  if (rail === "wave" || rail === "mtn" || rail === "spi") return rail;
  throw new Error(`last mile must be ${LAST_MILE_RAILS.join(", ")}`);
}

export type ArcPayout = {
  payout_id: string;
  amount_usdc: string;
  last_mile_rail: LastMileRail;
};

export type ArcPayoutStatus = "pending" | "settled" | "reconciled" | "failed";
