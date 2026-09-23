import assert from "node:assert/strict";
import { test } from "node:test";
import { parseUnits } from "viem";
import { assertFunded, UnderfundedError } from "../src/funding.js";

const TEN = parseUnits("10", 18);
const ADDRESS = "0xA4a07c023C9f412b4F991dC5AFba9137D856529B";

test("a short omnibus balance is refused", () => {
  assert.throws(() => assertFunded(TEN - 1n, ADDRESS), UnderfundedError);
  assert.throws(() => assertFunded(0n, ADDRESS), UnderfundedError);
});

test("ten native USDC is enough to settle", () => {
  assert.doesNotThrow(() => assertFunded(TEN, ADDRESS));
  assert.doesNotThrow(() => assertFunded(TEN + 1n, ADDRESS));
});
