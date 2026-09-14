# arc

Circle Arc settlement for [lomi.](https://lomi.africa) and [Rill](https://userill.com).

**lomi.** is a live payment processor for francophone West Africa. Merchants collect XOF on Wave, MTN, cards, and bank rails. **Rill** is the agent payment control plane from the same company: humans fund, agents Accept and Spend.

This repository is the production Arc app. USDC on Arc is the correspondent hop. Last mile stays Wave, MTN, or SPI. Merchants never hold keys. We do not issue a token. This is not a crypto checkout.

Payout mapping: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)

Not wired to lomi. live systems until an allowlisted payout path exists.

## Products

| Product | URL | Role |
| --- | --- | --- |
| lomi. | https://lomi.africa | Fiat PSP. Wave, MTN, cards, SPI. |
| Rill | https://userill.com | Agent Accept (MPP / x402) and Spend. |

Company: lomi.africa S.A.R.L., Abidjan.

## What ships here

- Custodial omnibus on Arc. Native USDC gas.
- Tagged hop: `payout_id` in transaction data.
- Reconcile against that id. Last mile unchanged.
- Rill Gateway and x402 on Arc for agent pay links.

Not in v0: HSM/KMS, mainnet keys, or calls into the live PSP API.

## Setup

```bash
pnpm install
cp .env.example .env
pnpm bootstrap
```

Circle faucet needs a human (reCAPTCHA): [faucet.circle.com](https://faucet.circle.com) then Arc Testnet, USDC, omnibus address (printed by bootstrap). Then:

```bash
pnpm settle
pnpm proof
```

Chain `5042002`. RPC `https://rpc.testnet.arc.network`. Explorer [testnet.arcscan.app](https://testnet.arcscan.app). Native gas is USDC (18 decimals). Hop is 10 native USDC with `payout_id` in calldata.

Current testnet accounts (faucet still required):

- Omnibus: `0xA4a07c023C9f412b4F991dC5AFba9137D856529B`
- Merchant: `0xbff6064594AB0D037214C22cfdf708d962d6f365`

Do not send mainnet USDC to these addresses.

## Checks

```bash
pnpm typecheck
```

## Local data (gitignored)

| Path | Purpose |
| --- | --- |
| `keys/` | Testnet signing keys (never commit) |
| `.env` | Same secrets as `keys/` |

Committed public addresses (no secrets): `data/testnet-proof.json`.

## License

MIT
