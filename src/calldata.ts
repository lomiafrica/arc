import { hexToString, stringToHex, type Hex } from "viem";

const PAYOUT_ID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class CalldataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CalldataError";
  }
}

export function encodePayoutId(payoutId: string): Hex {
  const id = payoutId.trim();
  if (!PAYOUT_ID.test(id)) {
    throw new CalldataError("payout_id must be a uuid");
  }
  return stringToHex(id);
}

export function decodePayoutId(data: Hex): string {
  if (!data || data === "0x") {
    throw new CalldataError("calldata is empty");
  }
  const text = hexToString(data);
  if (!PAYOUT_ID.test(text)) {
    throw new CalldataError("calldata is not a payout_id");
  }
  return text.toLowerCase();
}
