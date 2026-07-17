# Atlas — Prototype

Conversational front door for SKIN. A founder talks to Atlas for about three minutes. Atlas listens, forms a read, and ends with a First Read draft. Human review before anything official is sent.

Current version: **v1.1** (`atlas-v1.1.html`)

## How to run

Open `atlas-v1.1.html` inside a Claude.ai artifact (paste the file contents into a chat and ask Claude to render it, or open via the Claude environment it was built in). The model calls are proxied by Anthropic in that environment, so it works with zero setup.

It will NOT work opened as a plain local file or hosted on our own domain yet. Browser-side calls to the Anthropic API need a key, and a key cannot ship in client code. Production needs a small backend proxy (Vercel or Cloudflare function, ~50 lines) that holds the key. Roughly half a day. Cost per conversation: about $0.01 to $0.03.

## Mechanism

- Model: `claude-sonnet-4-6` via the Anthropic Messages API. Every reply is generated live. Nothing canned.
- A system prompt turns the model into Atlas: SKIN voice rules, five things to learn (goal, challenge, audience, proof, timeline), and doctrine judgment principles (evidence over belief, mis-staging, packaging vs proof).
- Every turn returns JSON: the reply plus silently captured intake signal. The Signal panel (top right) renders it live. Founders never see it. Flip it on mid-demo to show investors the engine behind the conversation.
- A second model call at the end drafts the First Read from the full transcript: what we heard, likely blocker, missing proof, next move, recommended SKIN path.

## Demo notes

- Rehearse with a real founder scenario, not test inputs. The stage-read moment lands hardest when the founder frames themselves further along than their evidence supports.
- "New" (top right) resets for back-to-back demos.
- Signal panel: the answer to "is this just a ChatGPT wrapper" is showing the structured signal being extracted while the founder talks.

## Known limits (deliberate V1 cuts)

- No persistence. Refresh loses the session.
- No Airtable write. Intake signal is captured but not stored.
- No file upload. The spec calls for it; next build priority.
- Email capture at the end is theater. Nothing is sent.

## Changelog

- **v1.1** — Removed all mid-conversation quick-reply chips. Rewrote the persona from a scripted six-phase flow into an open-ended listening brief: follows the founder's thread, names observations, answers direct questions instead of deflecting.
- **v1.0** — First working build. Live model brain, LLM-app interface, Signal panel, First Read draft generation.
