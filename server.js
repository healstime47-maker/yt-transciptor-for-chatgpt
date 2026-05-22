import express from "express";
import { YoutubeTranscript } from "youtube-transcript";

const app = express();
app.use(express.json());

// 👇 Browser test route (fixes your 404 confusion)
app.get("/", (req, res) => {
  res.send("YouTube Transcript API is running 🚀");
});

// 👇 POST API for GPT / apps
app.post("/transcript", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) return res.status(400).json({ error: "Missing url" });

    const transcript = await YoutubeTranscript.fetchTranscript(url);
    const text = transcript.map(t => t.text).join(" ");

    res.json({ text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👇 REQUIRED for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on", PORT));