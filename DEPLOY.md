# Deploy guide (site v2.0)

Nothing about the Vercel setup changes. Push to `main`, Vercel redeploys in about a minute.

## Upload these files to the repo root

- `index.html`  (REPLACES the existing one, which was the OS hub)
- `os.html`  (NEW, this is the old homepage)
- `atlas.html`  (NEW)
- `skin-logo.png`  (NEW)
- `api/atlas.js`  (replaces, token ceiling raised)
- `README.md`, `DEPLOY.md`

Leave `atlas-v1.2.html` and every `skin-*.html` file where they are. `os.html` links to them.

## After deploy, check these five things

1. `/` loads and the SKIN wordmark appears in the top left.
2. `/atlas.html` opens and Atlas asks the first question without being prompted.
3. Send a message. Atlas replies, and an item on the left rail turns copper.
4. Run a conversation to the end. The report appears with the score circle and signal bars.
5. `/os.html` loads and every module card still opens.

If Atlas replies with "Something broke on my side", the proxy is not reachable. Check that
`ANTHROPIC_API_KEY` is still set in Vercel and that `api/atlas.js` uploaded into an `api` folder,
not the root.

## Reminder for after the demos

Every page here is public, including Atlas, and every Atlas conversation costs tokens against the
SKIN key. Do not post the URL publicly. Dom's interim direction document requires server side
authentication, an approved email allowlist, usage logging, and a kill switch before public launch.
