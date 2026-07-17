// SKIN · Atlas proxy · v1.2
// Vercel serverless function. Holds the Anthropic API key server-side.
// Set ANTHROPIC_API_KEY in Vercel → Project → Settings → Environment Variables.
// The key never appears in client code or in this repo.

const MODEL = 'claude-sonnet-4-6'; // pinned server-side; client value is ignored
const MAX_TOKENS = 1024;
const MAX_MESSAGES = 40;           // an Atlas session is ~20 turns; hard cap against abuse
const MAX_CHARS = 60000;           // total payload guard

export default async function handler(req, res) {
  // Same-origin in production, but allow cross-origin for local testing
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { system, messages } = req.body || {};
  if (typeof system !== 'string' || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Expected { system, messages }' });
  }
  if (messages.length > MAX_MESSAGES) {
    return res.status(400).json({ error: 'Conversation too long' });
  }
  const size = system.length + messages.reduce((n, m) => n + String(m.content || '').length, 0);
  if (size > MAX_CHARS) {
    return res.status(400).json({ error: 'Payload too large' });
  }

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({ model: MODEL, max_tokens: MAX_TOKENS, system, messages })
    });
    const data = await upstream.json();
    if (!upstream.ok) {
      console.error('Anthropic error:', data);
      return res.status(502).json({ error: 'Upstream error' });
    }
    return res.status(200).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ error: 'Proxy failure' });
  }
}
