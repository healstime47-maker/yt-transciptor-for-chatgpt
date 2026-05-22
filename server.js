console.log("BOOT START");

import express from "express";
import { YoutubeTranscript } from "youtube-transcript";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API WORKING");
});

app.post("/transcript", async (req, res) => {
    try {
        const { url } = req.body;

        const data = await YoutubeTranscript.fetchTranscript(url);
        const text = data.map(x => x.text).join(" ");

        res.json({ text });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("LISTENING ON", PORT);
});