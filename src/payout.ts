/** Custodial Arc hop. Merchants never hold keys. Last mile stays Wave, MTN, or SPI. */

export type LastMileRail = "wave" | "mtn" | "spi";

export type ArcPayout = {
  payout_id: string;
  amount_usdc: string;
  last_mile_rail: LastMileRail;
};

export type ArcPayoutStatus = "pending" | "settled" | "reconciled" | "failed";
