// server.js
// Small backend proxy so the browser never sees your Anthropic API key.
//
// The frontend (script.js) calls  POST /api/messages  on THIS server.
// This server adds the real API key + required headers, forwards the
// request to Anthropic, and pipes the response straight back.

import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json({ limit: "1mb" }));

// Serve index.html / styles.css / script.js as static files
app.use(express.static(__dirname));

app.post("/api/messages", async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Server is missing ANTHROPIC_API_KEY. Set it in your environment or .env file.",
    });
  }

  try {
    const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      // Forward exactly what the frontend sent (model, messages, tools, etc.)
      body: JSON.stringify(req.body),
    });

    const data = await anthropicResponse.text(); // pass through raw JSON text
    res
      .status(anthropicResponse.status)
      .set("Content-Type", "application/json")
      .send(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(502).json({ error: "Failed to reach Anthropic API", detail: String(err) });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`My Perfect Day running at http://localhost:${PORT}`);
});
