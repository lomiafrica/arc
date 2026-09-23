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
    proof.settlementTx as Hash,
    blockNumberOf(proof.blockNumber),
  );
  const result = reconcileHop(proof, tx);
  console.log(result.status);
  console.log(result.payoutId);
}

main().catch((err: unknown) => {
  if (err instanceof ReconcileError) {
    console.error(err.message);
    process.exit(1);
  }
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
