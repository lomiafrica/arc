# Architecture

Custodial correspondent hop on Circle Arc. Fiat last mile stays on lomi. Agent rails stay on Rill.

## Flow

1. Merchant already collected XOF on Wave, MTN, cards, or SPI.
2. Treasury holds USDC on Arc in an omnibus wallet. Merchants never receive keys.
3. A payout moves USDC from omnibus to an internal receive address. Calldata carries `payout_id`.
4. Reconcile that id. Then pay the last mile as Wave, MTN, or SPI.
5. Rill Accept and Spend use Circle Gateway and x402 on the same chain. Separate product, same company.

## Mapping

| App | Production analogue |
| --- | --- |
| Omnibus wallet | Custodial treasury |
| Internal receive address | Not a merchant wallet product |
| Native USDC transfer | Correspondent hop |
| Calldata = `payout_id` | Ledger key for the last-mile payout |
| Gateway / x402 | Rill Accept and Spend |

USDC is not a merchant `currency_code` on the live PSP. There is no public `POST /payouts` rail until an allowlisted test org exists.

## Guardrails

- New mainnet addresses. Never reuse testnet secrets.
- No USDC balance on merchant `accounts`.
- Fail closed if the omnibus is unfunded or the tag is missing.
