/* ============================================================
   SKIN Founder Match — global tally + leaderboard counter
   A tiny Cloudflare Worker. Free tier, no credit card needed.

   SETUP (about 5 minutes):
   1. Go to dash.cloudflare.com  ->  Workers & Pages  ->  Create  ->  Worker.
   2. Name it e.g. "skin-fm-counter" and Deploy the starter.
   3. Open the Worker  ->  Edit code  ->  paste THIS file  ->  Deploy.
   4. Add storage: Worker  ->  Settings  ->  Bindings  ->  Add  ->  KV namespace.
        - First create a KV namespace (Storage & Databases -> KV -> Create).
        - Bind it to this Worker with the Variable name:  STATS
   5. Copy the Worker URL (e.g. https://skin-fm-counter.YOURNAME.workers.dev).
   6. In skin-founder-match.html, set:   const REMOTE = "https://skin-fm-counter.YOURNAME.workers.dev";

   That's it. The cover tally and result leaderboard are now shared across
   every visitor of your live site, instead of being per-browser.
   ============================================================ */

export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    const url = new URL(request.url);

    // Load current winners map: { jobs: 12, musk: 8, ... }
    let winners = {};
    try {
      const stored = await env.STATS.get("winners");
      if (stored) winners = JSON.parse(stored);
    } catch (e) {
      winners = {};
    }

    // POST /?inc=<founderKey>  ->  increment that founder's count
    const inc = url.searchParams.get("inc");
    if (request.method === "POST" && inc) {
      const key = String(inc).slice(0, 40).replace(/[^a-z]/gi, "");
      if (key) {
        winners[key] = (winners[key] || 0) + 1;
        await env.STATS.put("winners", JSON.stringify(winners));
      }
    }

    // Always return the current totals
    return new Response(JSON.stringify({ winners }), {
      headers: { "Content-Type": "application/json", ...cors },
    });
  },
};
