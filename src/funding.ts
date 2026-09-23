import { formatUnits } from "viem";
import { FAUCET_URL, SETTLE_NATIVE } from "./config.js";

export class UnderfundedError extends Error {
  readonly address: string;
  constructor(address: string, balanceUsdc: string) {
    super(
      `Omnibus has ${balanceUsdc} USDC. Fund 20 USDC at ${FAUCET_URL} (Arc Testnet + USDC) for ${address}`,
    );
    this.name = "UnderfundedError";
    this.address = address;
  }
}

export function assertFunded(balance: bigint, address: string): void {
  if (balance < SETTLE_NATIVE) {
    throw new UnderfundedError(address, formatUnits(balance, 18));
  }
}
