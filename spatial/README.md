# 1AGE Spatial Design 005 — Exchange Financial Center

Independent preview at spatial/index.html, served over HTTP(S). Five walkable departments: Wallet Center, Exchange, Payment Center, Personal Vault and Global Finance. The central hub exposes an explicit opt-in public-account view using the existing wallets.mjs adapter. Four other departments explain future services and do not expose active financial operations. The vault is a planned visualization of external holdings, not custody.

## Design
Cosmic panoramic windows, rotating Earth using existing local assets, graphite/platinum/bronze materials, warm recessed lighting, realistic eye height and shared compact controls. Page walking/architecture modules ported from c1414ed39f45d4c0ea7b87895c708f2f61e84b49 with the 1.75m camera height used in Space. Existing local Three.js and standard-mapped gamepad modules reused unchanged. HQ1 is the graphical benchmark; visual parity is not yet verified.

## Financial boundaries
Guest exploration without a wallet; wallet connection only on deliberate button activation. Injected EVM or Phantom Solana provider, one public account at a time. No balances, wallet ownership proof, account persistence, seed phrases, private keys, custody, signing, payments, swaps, transfers, banking, lending or fiat conversion. Public account view is cleared on panel close and page exit; clearing is not wallet permission revocation. 1AGE Cash remains separate internal credit. No changes to existing wallet implementation or financial backend.

## Release gates
- Browser/WebGL tests, same-camera screenshots, collision checks, frame timing, iPhone portrait/landscape and physical gamepad testing.
- Mock provider tests and real supported-wallet browser tests: reject/approve connection, missing provider, clear or close during pending connection, account/network change, disconnect, and no signing requests. Solana cluster is unverified.
- Mobile wallet deep links, Wallet Standard, WalletConnect, simultaneous accounts, balance providers and transaction approvals require separate design/security review. No live transaction operations in this build.
- Recheck main and concurrent PRs before merge; obtain approval before production root cutover. Existing root iframe, application.html, wallet adapter, World, HQ1/HQ2 and all DNS remain untouched.

This is source implementation only; browser/device and live wallet validation have not been performed.

## Utility Guide 001
Purpose-first educational catalog: international remittances, everyday payments and reduced price volatility. Includes XLM, SOL, and USDC on Stellar/Solana with official documentation links and cost/risk caveats. Accessible on demand in Payment, Exchange and Global Finance departments. No current fee quotes, cheapest-route claims, Stellar wallet connection, transaction execution or automatic asset selection. Future contextual notifications should compare supported end-to-end routes, net recipient amount, conversion, ramp fees, network compatibility and quote freshness; include conventional services where appropriate. Browser validation pending.
