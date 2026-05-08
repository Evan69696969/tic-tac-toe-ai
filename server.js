//後端

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/move", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: prompt }
      ],
    });

    res.json({
      text: response.choices[0].message.content,
    });

  } catch (err) {
    console.error("OpenAI 錯誤狀態:", err.status);
    console.error("OpenAI 錯誤訊息:", err.message);
    console.error("OpenAI 完整錯誤:", err);

    res.status(500).json({
      error: err.message || "OpenAI error",
      status: err.status || 500
    });
  }
});

app.get("/", (req, res) => {
  res.send("Server is alive");
});  

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

