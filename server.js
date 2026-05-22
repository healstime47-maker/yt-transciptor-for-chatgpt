import express from "express";
import { YoutubeTranscript } from "youtube-transcript";

const app = express();
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("YouTube Transcript API is running");
});

// Main endpoint
app.post("/transcript", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "Missing url" });
    }

    const transcript = await YoutubeTranscript.fetchTranscript(url);
    const text = transcript.map(t => t.text).join(" ");

    res.json({ text });
  } catch (err) {
    res.status(500).json({
      error: err.message || "Failed to fetch transcript"
    });
  }
});

// IMPORTANT: Render provides PORT dynamically
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});