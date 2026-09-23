import assert from "node:assert/strict";
import { test } from "node:test";
import { assertLastMileRail } from "../src/payout.js";

test("last mile is wave, mtn, or spi", () => {
  assert.equal(assertLastMileRail("wave"), "wave");
  assert.equal(assertLastMileRail("mtn"), "mtn");
  assert.equal(assertLastMileRail("spi"), "spi");
  assert.throws(() => assertLastMileRail("card"));
  assert.throws(() => assertLastMileRail(""));
});
