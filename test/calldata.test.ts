import assert from "node:assert/strict";
import { test } from "node:test";
import { stringToHex } from "viem";
import {
  CalldataError,
  decodePayoutId,
  encodePayoutId,
} from "../src/calldata.js";

const PAYOUT_ID = "03528f0a-6a93-4e31-ad9e-15173b732083";
const CALLDATA =
  "0x30333532386630612d366139332d346533312d616439652d313531373362373332303833";

test("payout_id calldata round-trips", () => {
  const encoded = encodePayoutId(PAYOUT_ID);
  assert.equal(encoded, CALLDATA);
  assert.equal(decodePayoutId(encoded), PAYOUT_ID);
});

test("empty and non-uuid tags are rejected", () => {
  assert.throws(() => encodePayoutId(""), CalldataError);
  assert.throws(() => encodePayoutId("   "), CalldataError);
  assert.throws(() => encodePayoutId("not-a-uuid"), CalldataError);
  assert.throws(() => decodePayoutId("0x"), CalldataError);
  assert.throws(() => decodePayoutId(stringToHex("hello")), CalldataError);
});
