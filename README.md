# My Perfect Day — standalone app

This runs entirely on your own machine (or any Node host). A tiny
backend (`server.js`) holds your Anthropic API key and forwards
recommendation requests to Anthropic, so the key is never exposed in
the browser.

## Setup

1. **Install Node.js 18+** if you don't have it: https://nodejs.org

2. **Install dependencies**, from this folder:
   ```bash
   npm install
   ```

3. **Add your API key.** Copy the example env file and fill it in:
   ```bash
   cp .env.example .env
   ```
   Then open `.env` and paste your key from
   https://console.anthropic.com/settings/keys

4. **Run it:**
   ```bash
   npm start
   ```

5. Open **http://localhost:3000** in your browser.

## How it works

- `index.html`, `styles.css`, `script.js` — the app itself (unchanged
  UI/logic from before).
- `script.js` now calls `POST /api/messages` on your own server
  instead of calling `api.anthropic.com` directly from the browser.
- `server.js` is a minimal Express server that:
  - serves the three static files above, and
  - on `POST /api/messages`, attaches your real API key + the
    required `anthropic-version` header, forwards the request to
    Anthropic's Messages API, and sends the response straight back.

Your API key lives only in `.env` on your machine/server — it's
never sent to or visible in the browser.

## Deploying it publicly

To make this reachable from the internet (not just localhost), deploy
it to any Node-friendly host and set `ANTHROPIC_API_KEY` as an
environment variable there instead of a local `.env` file:

- **Render** / **Railway** / **Fly.io** — connect the repo, set the
  env var in their dashboard, done.
- **Vercel** / **Netlify** — works too, but you'd convert
  `server.js`'s `/api/messages` route into a serverless function
  instead of a long-running Express app.

Never commit your `.env` file or paste your API key into client-side
code — `.gitignore` here already excludes it.
