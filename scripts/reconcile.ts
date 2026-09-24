import type { Hash } from "viem";
import { fetchHopTransaction } from "../src/fetch-hop.js";
import { readTestnetProof } from "../src/proof.js";
import { ReconcileError, reconcileHop } from "../src/reconcile.js";

function blockNumberOf(value: string | undefined): bigint | undefined {
  if (!value) return undefined;
  if (!/^[0-9]+$/.test(value)) {
    throw new ReconcileError("proof blockNumber is not a decimal block");
  }
  return BigInt(value);
}

async function main() {
  const proof = readTestnetProof();
  if (!proof?.settlementTx || !proof.payoutId) {
    console.error("No settled proof in data/testnet-proof.json");
    process.exit(1);
  }
  const tx = await fetchHopTransaction(
    settlementHash(proof.settlementTx),
    blockNumberOf(proof.blockNumber),
  );
  const result = reconcileHop(proof, tx);
  console.log(result.status);
  console.log(result.payoutId);
}

function settlementHash(value: string): Hash {
  if (!/^0x[0-9a-fA-F]{64}$/.test(value)) {
    throw new ReconcileError("settlement tx is not a 32-byte hex hash");
  }
  // SAFETY: the check matches viem's 0x-prefixed 32-byte Hash form.
  return value as Hash;
}

main().catch((err: Error) => {
  console.error(err.message);
  process.exit(1);
});
