import { parseGwei } from "viem";
import { randomUUID } from "node:crypto";
import { encodePayoutId } from "./calldata.js";
import { explorerTx, FAUCET_URL, SETTLE_NATIVE } from "./config.js";
import { publicClient, walletClient } from "./client.js";
import { assertFunded, UnderfundedError } from "./funding.js";
import { loadAccount, loadSecret } from "./keys.js";
import { writeTestnetProof } from "./proof.js";

export { UnderfundedError };

export async function settleOnce(): Promise<{
  payoutId: string;
  hash: `0x${string}`;
  explorer: string;
}> {
  const omnibus = loadAccount("omnibus");
  const merchant = loadAccount("merchant");
  const client = publicClient();
  const balance = await client.getBalance({ address: omnibus.address });
  assertFunded(balance, omnibus.address);

  const payoutId = randomUUID();
  const wallet = walletClient(loadSecret("omnibus"));
  const hash = await wallet.sendTransaction({
    to: merchant.address,
    value: SETTLE_NATIVE,
    data: encodePayoutId(payoutId),
    maxFeePerGas: parseGwei("20"),
    maxPriorityFeePerGas: parseGwei("1"),
  });
  const receipt = await client.waitForTransactionReceipt({ hash });
  writeTestnetProof({
    status: "settled",
    omnibusAddress: omnibus.address,
    merchantAddress: merchant.address,
    payoutId,
    settlementTx: hash,
    blockNumber: receipt.blockNumber.toString(),
    faucetUrl: FAUCET_URL,
  });
  return { payoutId, hash, explorer: explorerTx(hash) };
}
