# SKIN · Atlas and public site

Current: **site v2.0 · Atlas v2.3 · Strada Atlas v1.1**

Live URLs after deploy:

- `/` — SKIN homepage
- `/atlas.html` — Atlas, the founder guide
- `/os.html` — SKIN OS hub (the internal module grid, was previously the homepage)

## File map

| File | What it is |
| --- | --- |
| `index.html` | New public homepage. Vision led, Atlas front and centre, then diagnostics and execution. |
| `atlas.html` | **The live Atlas URL.** Always holds the current version. This link never changes. |
| `atlas-v2.3.html` | Versioned archive copy of the current build. Byte identical to `atlas.html`. |
| `atlas-v2.2.html` | Previous build, archived. |
| `strada.html` + `strada.css` + `strada-*` assets | Strada ATLAS Idea Lab. Dom's design, live student-tuned brain. |
| `atlas-v2.1.html` | Previous build, archived. |
| `atlas-v2.0.html` | Previous build, archived. |
| `os.html` | The former homepage, now the SKIN OS module hub. Atlas added as module 00. |
| `api/atlas.js` | Vercel serverless proxy. Holds the Anthropic key server side. |
| `skin-logo.png` | Official SKIN wordmark. Do not redraw or regenerate. |
| `atlas-v1.1.html`, `atlas-v1.2.html` | Previous Atlas builds, kept as archive. Nothing links to them. |

## Version rule

Every Atlas build ships under two filenames:

1. `atlas.html` — the permanent public URL. Everything links here. It never changes name, so a link
   shared with an investor keeps working across every future version.
2. `atlas-vX.Y.html` — the archive copy of that build, byte identical.

The version itself is stamped in three places inside the file: the HTML comment at the top, the
footer, and the `VERSION` constant in the script. To ship v2.1: update those three stamps, save the
file as both `atlas.html` and `atlas-v2.1.html`, upload both. No links anywhere need editing.

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

- **v2.3 / strada-1.1** — UX fixes from testing. Founder and student message text now matches Atlas's message size in both apps (was much smaller). Strada conversation rows get proper breathing room (the 28px rhythm from Dom's design, which only applied to the original fixed layout). Strada shortcut chips are now required for yes or no, counts, and confirmation questions, so students can tap instead of type.

- **v2.2** — Session feedback build. The word "snapshot" is gone, it is a first read everywhere. Conversation shortened to 4 to 6 founder turns with a hard cap at 7, targeting about ninety seconds. Tappable shortcuts return for categorical questions only, never for open ones. Waiting for the report now says "Hold tight while we create your first read." The rail is four items; timeline is still captured silently and still reaches the report.

- **v2.1** — Empathy pass. Atlas now receives what the founder said before it moves, asks at most one question per message, and leaves roughly every third message without a question at all. Kickers changed from verdicts to supportive markers. The rail item "The pressure" is now "The timeline". Atlas closes on three of five signals rather than grilling for all five, and the report names what the conversation did not cover. The report is framed as a snapshot, with the paid diagnostics positioned as the full read.

- **v2.0** — New public homepage. Atlas now ships under two filenames: `atlas.html` as the stable public URL, plus a versioned archive copy. Atlas rebuilt with a split layout: live signal rail on the left, conversation on the right, ending in a full First Read report with readiness view, signal map, three next moves, and a recommended SKIN path with live checkout links. OS hub moved to `os.html`. Failed model calls now return the founder's text to the composer instead of losing it. Proxy token ceiling raised for the longer report.
- **v1.2** — Same origin proxy support with automatic fallback. Atlas added to the SKIN OS hub as module 00.
- **v1.1** — Removed mid conversation quick replies. Rewrote the persona from a scripted six phase flow into an open ended listening brief.
- **v1.0** — First working build. Live model brain, Signal panel, First Read draft.
