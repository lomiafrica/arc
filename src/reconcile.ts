import { isAddressEqual, type Address, type Hex } from "viem";
import { decodePayoutId } from "./calldata.js";
import { assertArcTestnet } from "./chain.js";
import { SETTLE_NATIVE } from "./config.js";
import type { TestnetProofFile } from "./proof.js";

export class ReconcileError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ReconcileError";
  }
}

export type HopTransaction = {
  hash: Hex;
  from: Address;
  to: Address | null;
  value: bigint;
  input: Hex;
  chainId?: number;
};

export type ReconcileResult = {
  status: "reconciled";
  payoutId: string;
};

function sameHash(left: string, right: string): boolean {
  return left.toLowerCase() === right.toLowerCase();
}

export function reconcileHop(
  proof: TestnetProofFile,
  tx: HopTransaction,
): ReconcileResult {
  if (tx.chainId !== undefined) {
    assertArcTestnet({
      id: tx.chainId,
      nativeCurrency: { symbol: "USDC", decimals: 18 },
    });
  }
  if (!proof.payoutId || !proof.settlementTx) {
    throw new ReconcileError("proof is missing payout_id or settlement tx");
  }
  if (!sameHash(tx.hash, proof.settlementTx)) {
    throw new ReconcileError("transaction hash does not match the proof");
  }
  if (!tx.to || !isAddressEqual(tx.to, proof.merchantAddress as Address)) {
    throw new ReconcileError("recipient does not match the proof");
  }
  if (!isAddressEqual(tx.from, proof.omnibusAddress as Address)) {
    throw new ReconcileError("sender is not the omnibus");
  }
  if (tx.value !== SETTLE_NATIVE) {
    throw new ReconcileError("value is not 10 native USDC");
  }
  const payoutId = decodePayoutId(tx.input);
  if (payoutId !== proof.payoutId.toLowerCase()) {
    throw new ReconcileError("calldata payout_id does not match the proof");
  }
  return { status: "reconciled", payoutId };
}
