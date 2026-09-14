# arc

Circle Arc settlement for [lomi.](https://lomi.africa) and [Rill](https://userill.com).

**lomi.** is a live payment processor for francophone West Africa. Merchants collect XOF on Wave, MTN, cards, and bank rails. **Rill** is the agent payment control plane from the same company: humans fund, agents Accept and Spend.

This repository is the production Arc app. USDC on Arc is the correspondent hop. Last mile stays Wave, MTN, or SPI. Merchants never hold keys. We do not issue a token. This is not a crypto checkout.

Payout mapping: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)

The HTTP hop, testnet settle, and reconcile land next in this repo. Not wired to lomi. live systems until an allowlisted payout path exists.

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
pnpm typecheck
```

Node 22. App bootstrap follows in this repo (payout hop, Arc testnet settle, explorer proof).

## License

MIT
