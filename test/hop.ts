import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Address, Hex } from "viem";
import type { HopTransaction } from "../src/reconcile.js";

type HopFixture = {
  hash: Hex;
  from: Address;
  to: Address;
  value: string;
  input: Hex;
  chainId: number;
};

export function loadHopFixture(name: string): HopTransaction {
  const raw = readFileSync(join(import.meta.dirname, "fixtures", name), "utf8");
  const parsed = JSON.parse(raw) as HopFixture;
  return {
    hash: parsed.hash,
    from: parsed.from,
    to: parsed.to,
    value: BigInt(parsed.value),
    input: parsed.input,
    chainId: parsed.chainId,
  };
}
