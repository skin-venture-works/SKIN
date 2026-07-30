# Strada Atlas — deploy notes (strada-1.0)

Upload these six files to the SKIN repo root, exactly like every other build:

- strada.html
- strada.css
- strada-logo.svg
- strada-students.avif
- strada-favicon.svg
- strada-geist.woff2

Vercel redeploys on push. The link to share:

    https://<your-project>.vercel.app/strada.html

## What it is

Dom's Strada ATLAS Idea Lab design (welcome, chat, results), ported file for file
from his deploy package: his stylesheet verbatim, his copy verbatim, his layout
exactly. The only change: the four question script is replaced with the live
Atlas conversational brain, tuned for students.

- Conversational, not scripted. The four step tracker (idea, problem, proof,
  first test) lights up as ATLAS learns each one, in any order.
- Student tone: no investor jargon, encouraging, honest. Same warmth plus
  honesty spine as SKIN Atlas v2.2, recalibrated for a first time idea.
- About 90 seconds, 4 to 6 turns, hard cap 7. Shortcut chips for categorical
  answers only.
- The readout page is Dom's results layout with every field generated live from
  the real conversation: verdict, score, four signal bars, three moves, and a
  personalized 14 day plan.
- "View a completed example" renders instantly from a built in sample. No
  tokens.
- Uses the same /api/atlas proxy already deployed. No new setup, no new keys.
- No SKIN funnel anywhere. Footer: Strada HBCU Initiative · Powered by SKIN
  ATLAS.

## Before Friday

- Run the script once end to end on the live URL (tokens hit your key).
- Check print: results page → Print or save report.
