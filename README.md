# SKIN · Atlas and public site

Current: **site v2.0 · Atlas v2.0**

Live URLs after deploy:

- `/` — SKIN homepage
- `/atlas.html` — Atlas, the founder guide
- `/os.html` — SKIN OS hub (the internal module grid, was previously the homepage)

## File map

| File | What it is |
| --- | --- |
| `index.html` | New public homepage. Vision led, Atlas front and centre, then diagnostics and execution. |
| `atlas.html` | Atlas v2.0. Split layout, live signal rail, full First Read report. |
| `os.html` | The former homepage, now the SKIN OS module hub. Atlas added as module 00. |
| `api/atlas.js` | Vercel serverless proxy. Holds the Anthropic key server side. |
| `skin-logo.png` | Official SKIN wordmark. Do not redraw or regenerate. |
| `atlas-v1.2.html` | Previous Atlas build, kept as archive. |

## Mechanism

- Model: `claude-sonnet-4-6` via the Anthropic Messages API. Every reply is generated live.
- A system prompt turns the model into Atlas: SKIN voice rules, five things to learn, doctrine judgment principles.
- Each turn returns JSON: a message plus cumulative intake signal. The left rail fills in as Atlas learns, not as it asks.
- A second model call drafts the First Read report from the full transcript.
- `atlas.html` calls the same origin proxy first, and falls back to the direct endpoint when rendered inside a Claude artifact. One file works in both places.

## Known limits (deliberate cuts for the demo build)

- No authentication. Every page is public, including Atlas.
- No usage limits per user, no kill switch, no usage logging.
- No persistence. Refresh loses the session. Nothing is stored or sent to SKIN.
- Checkout links go to live Stripe pages. Treat them as real.

Dom's interim direction document requires ATLAS and SKIN OS to sit behind server side authentication before public launch. That work is deliberately deferred until after the investor demos. It is a launch blocker, not a demo blocker.

## Changelog

- **v2.0** — New public homepage. Atlas rebuilt with a split layout: live signal rail on the left, conversation on the right, ending in a full First Read report with readiness view, signal map, three next moves, and a recommended SKIN path with live checkout links. OS hub moved to `os.html`. Failed model calls now return the founder's text to the composer instead of losing it. Proxy token ceiling raised for the longer report.
- **v1.2** — Same origin proxy support with automatic fallback. Atlas added to the SKIN OS hub as module 00.
- **v1.1** — Removed mid conversation quick replies. Rewrote the persona from a scripted six phase flow into an open ended listening brief.
- **v1.0** — First working build. Live model brain, Signal panel, First Read draft.
