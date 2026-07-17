# Atlas — Deploy Guide (v1.2)

Goal: one live URL where the whole SKIN OS is served and Atlas actually works.
Time: about 20 minutes. Cost: free tier on everything except API usage (~$0.01-0.03 per conversation).

Why Vercel instead of GitHub Pages: Pages serves static files only, so Atlas's brain
would be dead there. Vercel serves the same static site AND runs the `/api/atlas`
proxy that holds the Anthropic key. Same repo, one deploy.

## Steps

**1. Get an Anthropic API key**
- console.anthropic.com → API Keys → Create key.
- Copy it once. Never commit it, never paste it into chat or the repo.

**2. Push these files to the repo (root)**
- `atlas-v1.2.html`
- `api/atlas.js`  (new folder `api` at repo root)
- `index.html`  (replaces the current one; adds the Atlas module, bumps OS to v1.6)
- `DEPLOY.md`  (this file)

**3. Import the repo to Vercel**
- vercel.com → Add New → Project → Import `skin-venture-works/SKIN` from GitHub.
- Framework preset: **Other**. No build command. Output directory: leave default.

**4. Add the key**
- Project → Settings → Environment Variables:
  - Name: `ANTHROPIC_API_KEY`
  - Value: the key from step 1
  - Environment: Production (and Preview if you want branch previews to work).
- Redeploy after saving (Deployments → ⋯ → Redeploy).

**5. Verify**
- Open `https://<your-project>.vercel.app/atlas-v1.2.html`
- Send a message. If Atlas replies, the proxy is live.
- The OS hub is at `https://<your-project>.vercel.app/` with Atlas as module 00.

**6. Optional: custom domain**
- Project → Settings → Domains → add e.g. `os.skin.global` or `atlas.skin.global`.
- Follow the DNS instructions Vercel shows.

## How the endpoint logic works

`atlas-v1.2.html` tries the same-origin proxy (`/api/atlas`) first. On Vercel that
succeeds and the key stays server-side. Inside a Claude.ai artifact the proxy does
not exist, so it falls back to the direct Anthropic endpoint, which that environment
proxies automatically. One file works in both places.

## Safety rails in the proxy

- Model and max_tokens are pinned server-side; client values are ignored.
- Conversation length and payload size are capped.
- Consider adding Vercel's rate limiting or a simple IP throttle before sharing
  the URL widely. For a VC demo week, the caps above are enough.

## Auto-deploys

Once imported, every push to `main` redeploys automatically. Ship v1.3 by
committing it; the URL updates in about a minute.
