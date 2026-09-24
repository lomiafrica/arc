import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Address, Hex } from "viem";
import type { HopTransaction } from "../src/reconcile.js";

type HopFixture = {
  hash: string;
  from: string;
  to: string;
  value: string;
  input: string;
  chainId: number;
};

export function loadHopFixture(name: string): HopTransaction {
  const raw = readFileSync(join(import.meta.dirname, "fixtures", name), "utf8");
  const parsed = parseHopFixture(raw);
  return {
    hash: hexValue(parsed.hash, 64),
    from: hexValue(parsed.from, 40),
    to: hexValue(parsed.to, 40),
    value: BigInt(parsed.value),
    input: hexValue(parsed.input, undefined),
    chainId: parsed.chainId,
  };
}

function isFixtureString(value: string | number | undefined): value is string {
  return typeof value === "string";
}

function isFixtureNumber(value: string | number | undefined): value is number {
  return typeof value === "number";
}

function parseHopFixture(raw: string): HopFixture {
  const value: { [key: string]: string | number | undefined } = JSON.parse(raw);
  const hash = value["hash"];
  const from = value["from"];
  const to = value["to"];
  const amount = value["value"];
  const input = value["input"];
  const chainId = value["chainId"];
  if (
    !isFixtureString(hash) ||
    !isFixtureString(from) ||
    !isFixtureString(to) ||
    !isFixtureString(amount) ||
    !isFixtureString(input) ||
    !isFixtureNumber(chainId)
  ) {
    throw new Error(
      "hop fixture is missing hash, addresses, value, or chainId",
    );
  }
  return { hash, from, to, value: amount, input, chainId };
}

function hexValue<Bytes extends number | undefined>(
  value: string,
  bytes: Bytes,
): Bytes extends 40 ? Address : Hex {
  const body = bytes === undefined ? "+" : `{${bytes}}`;
  if (!new RegExp(`^0x[0-9a-fA-F]${body}$`).test(value)) {
    throw new Error("hop fixture hex field is not 0x-prefixed");
  }
  // SAFETY: the regex matches viem's 0x hex Address or Hex form for this width.
  return value as Bytes extends 40 ? Address : Hex;
}
