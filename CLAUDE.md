# Fork Differences from pugson/telegram-twitter-url-expand-bot

This is a personal fork by Philip Dukhov. Key differences from the original:

## Infrastructure

- **Deployment**: fly.io instead of Railway — added `Dockerfile`, `fly.toml`, `.github/workflows/fly-deploy.yml`
- **Database**: Uses **Xata** (`helpers/xata.ts`) instead of Redis. The original migrated from Xata to Redis (`ioredis`), but this fork retains Xata for chat settings storage.

## Logging

- Removed LogTape (`helpers/logger.ts` deleted) — all logging uses plain `console.log/error/warn` instead.
- This was done because LogTape caused issues in the fly.io environment.

## Platform Support (Simplified)

This fork intentionally removes some platforms the original added:

| Platform | Original | This Fork |
|---|---|---|
| Facebook | ✅ | ❌ removed |
| Threads | ✅ | ❌ removed |
| YouTube Shorts | ✅ | ❌ removed |
| Instagram | ✅ `eeinstagram.com` (from array) | ✅ hardcoded `eeinstagram.com` |
| TikTok | ✅ `fxTikTok` (from array) | ✅ hardcoded `tfxktok.com` |
| Twitter/X | ✅ `fxtwitter`/`vxtwitter` (from array) | ✅ hardcoded `fxtwitter.com` |

The original uses `INSTAGRAM_DOMAINS`, `TIKTOK_DOMAINS`, `TWITTER_DOMAINS`, `FACEBOOK_DOMAINS` arrays with a switchable service feature. This fork hardcodes specific domains and removes the service-switching UI.

## Link Handling

- Removed `helpers/sanitize-html.ts` (HTML escaping utilities used by original for Facebook/Threads metadata)
- Simplified tracker-stripping logic in `actions/expand-link.ts`
- Fixed a bug where a second link was incorrectly stripped when tracker params were removed

## Button State / Timeouts

- Removed the intermediate undo button timeout state (was at 35s in original)
- Final button state timeout changed from **60s → 35s**
- Simplified `getButtonState` calls in `expand-link.ts`

## Analytics

- Analytics posting is **disabled** (commented out in `helpers/analytics.ts`)
- Original sends events to a custom analytics endpoint; this fork skips that

## Other

- Instagram share URL resolver (`helpers/instagram-share.ts`) improved to handle cases where the same URL is resolved repeatedly
- `link_preview_options` used instead of `---` separator in expanded messages
- Fly.io machine config set to never suspend (`auto_stop_machines = 'off'`, `min_machines_running = 1`)

## When Merging from Original

When pulling upstream changes, expect conflicts in:
- `actions/expand-link.ts` — platform handling and domain logic differ significantly
- `helpers/platforms.ts` — original has domain arrays and more platforms; this fork has simpler checks
- `callbacks/undo.ts` — button state changes
- `index.ts` — logger setup removed
- Any file that imports from `helpers/logger`, `helpers/redis`, or `helpers/sanitize-html` — those are deleted in this fork
