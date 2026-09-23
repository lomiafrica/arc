import { arcTestnet } from "./config.js";

export class ChainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChainError";
  }
}

export function assertArcTestnet(chain: {
  id: number;
  nativeCurrency: { symbol: string; decimals: number };
}): void {
  if (chain.id !== arcTestnet.id) {
    throw new ChainError(
      `chain id ${chain.id} is not Arc testnet ${arcTestnet.id}`,
    );
  }
  const native = chain.nativeCurrency;
  if (native.symbol !== "USDC" || native.decimals !== 18) {
    throw new ChainError(
      "Arc testnet native currency is USDC with 18 decimals",
    );
  }
}
