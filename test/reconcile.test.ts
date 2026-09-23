import assert from "node:assert/strict";
import { test } from "node:test";
import { readTestnetProof } from "../src/proof.js";
import { ReconcileError, reconcileHop } from "../src/reconcile.js";
import { loadHopFixture } from "./hop.js";

test("the 15 September hop reconciles", () => {
  const proof = readTestnetProof();
  assert.ok(proof);
  const result = reconcileHop(proof, loadHopFixture("hop-tx.json"));
  assert.deepEqual(result, {
    status: "reconciled",
    payoutId: "03528f0a-6a93-4e31-ad9e-15173b732083",
  });
});

test("a wrong tag fails closed", () => {
  const proof = readTestnetProof();
  assert.ok(proof);
  assert.throws(
    () => reconcileHop(proof, loadHopFixture("hop-tx.wrong-tag.json")),
    ReconcileError,
  );
});

test("a wrong value fails closed", () => {
  const proof = readTestnetProof();
  assert.ok(proof);
  assert.throws(
    () => reconcileHop(proof, loadHopFixture("hop-tx.wrong-value.json")),
    ReconcileError,
  );
});
