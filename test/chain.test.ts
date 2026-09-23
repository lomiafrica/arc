import assert from "node:assert/strict";
import { test } from "node:test";
import { arcTestnet } from "../src/config.js";
import { assertArcTestnet, ChainError } from "../src/chain.js";

test("Arc testnet is chain 5042002 with native USDC", () => {
  assert.equal(arcTestnet.id, 5042002);
  assert.equal(arcTestnet.nativeCurrency.symbol, "USDC");
  assert.equal(arcTestnet.nativeCurrency.decimals, 18);
  assert.equal(arcTestnet.testnet, true);
  assert.doesNotThrow(() => assertArcTestnet(arcTestnet));
});

test("any other chain is refused", () => {
  assert.throws(
    () =>
      assertArcTestnet({
        id: 1,
        nativeCurrency: { symbol: "USDC", decimals: 18 },
      }),
    ChainError,
  );
  assert.throws(
    () =>
      assertArcTestnet({
        id: 5042002,
        nativeCurrency: { symbol: "USDC", decimals: 6 },
      }),
    ChainError,
  );
});
