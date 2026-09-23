import type { Hash } from "viem";
import { publicClient } from "./client.js";
import type { HopTransaction } from "./reconcile.js";

export async function fetchHopTransaction(
  hash: Hash,
  blockNumber?: bigint,
): Promise<HopTransaction> {
  const client = publicClient();
  const direct = await client.getTransaction({ hash }).catch(() => null);
  const tx =
    direct ??
    (blockNumber === undefined
      ? null
      : await transactionFromBlock(hash, blockNumber));
  if (!tx) {
    throw new Error(`Transaction ${hash} was not found on Arc testnet`);
  }
  return {
    hash: tx.hash,
    from: tx.from,
    to: tx.to,
    value: tx.value,
    input: tx.input,
    chainId: tx.chainId ?? undefined,
  };
}

async function transactionFromBlock(hash: Hash, blockNumber: bigint) {
  const block = await publicClient().getBlock({
    blockNumber,
    includeTransactions: true,
  });
  return (
    block.transactions.find(
      (tx) => tx.hash.toLowerCase() === hash.toLowerCase(),
    ) ?? null
  );
}
