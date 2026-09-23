import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { readTestnetProof, writeTestnetProof } from "../src/proof.js";

const PAYOUT_ID = "03528f0a-6a93-4e31-ad9e-15173b732083";

test("the committed proof is the 15 September hop", () => {
  const proof = readTestnetProof();
  assert.ok(proof);
  assert.equal(proof.status, "settled");
  assert.equal(proof.payoutId, PAYOUT_ID);
  assert.equal(
    proof.settlementTx,
    "0x43a52af26c50e0913d3199e0a91677bf261bb96e01b355d254d10246b23a8cfc",
  );
  assert.equal(proof.blockNumber, "62264944");
});

test("proof read and write round-trip", () => {
  const dir = mkdtempSync(join(tmpdir(), "arc-proof-"));
  const previous = process.env.ARC_DATA_DIR;
  process.env.ARC_DATA_DIR = dir;
  try {
    const written = writeTestnetProof({
      status: "settled",
      omnibusAddress: "0xA4a07c023C9f412b4F991dC5AFba9137D856529B",
      merchantAddress: "0xbff6064594AB0D037214C22cfdf708d962d6f365",
      payoutId: PAYOUT_ID,
      settlementTx:
        "0x43a52af26c50e0913d3199e0a91677bf261bb96e01b355d254d10246b23a8cfc",
      blockNumber: "62264944",
      faucetUrl: "https://faucet.circle.com",
      updatedAt: "2026-09-15T17:10:57.277Z",
    });
    assert.equal(written.updatedAt, "2026-09-15T17:10:57.277Z");
    assert.deepEqual(readTestnetProof(), written);
  } finally {
    if (previous === undefined) delete process.env.ARC_DATA_DIR;
    else process.env.ARC_DATA_DIR = previous;
    rmSync(dir, { recursive: true, force: true });
  }
});
