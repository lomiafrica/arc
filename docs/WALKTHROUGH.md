# Walkthrough

One settled hop. No new keys. Not on Arc mainnet.

1. Open the transaction.

   https://testnet.arcscan.app/tx/0x43a52af26c50e0913d3199e0a91677bf261bb96e01b355d254d10246b23a8cfc

   Chain `5042002`. Value is 10 native USDC (18 decimals). Calldata is `payout_id` `03528f0a-6a93-4e31-ad9e-15173b732083`. From the omnibus to the internal receive address.

2. Run the tests. They do not call the faucet or the RPC. The fixture is a copy of that transaction.

   ```bash
   pnpm test
   ```

3. Reconcile the committed proof against Arc testnet. This prints `reconciled` and the payout id, or exits non-zero.

   ```bash
   pnpm reconcile
   ```

`data/testnet-proof.json` records block `62264944`. The public RPC hash lookup can miss this transaction even though it is still in that block. Reconcile reads the block when the hash lookup is empty.

CI runs `pnpm typecheck` and `pnpm test`. It does not call the RPC.
