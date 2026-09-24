# Build phases

Coding order for the Circle Developer Grants hop. If Circle writes a different milestone list after award, follow theirs.

| Phase | Where     | What                                                                                                                                            |
| ----- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | This repo | Testnet custodial hop. `payout_id` in calldata. Reconcile checks recipient, 10 native USDC, and that tag. Tests and CI. No mainnet.             |
| 2     | This repo | Reconcile before any last-mile release. The same `payout_id` on Arc and in the payout ledger. Idempotent. Still not a merchant USDC balance.    |
| 3     | lomi.     | One allowlisted organization. XOF collection unchanged. USDC hop on Arc. Last mile Wave or MTN. Report reconciled payout count and USDC volume. |
| 4     | Later     | Rill agent pay on Arc through Gateway. Same company, separate product. This is not the title of the grant.                                      |

Phase 1 is the public proof: one settled testnet transaction, `pnpm test`, and `pnpm reconcile`.

Non-goals stay: no mainnet keys, no calls into the live PSP, no token, merchants never hold keys.
