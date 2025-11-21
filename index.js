import express from "express";
import cors from "cors";
import { predictEmotion } from "./predict.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Emotion prediction API
app.post("/getEmotions", async (req, res) => {
  try {
    const { arrData } = req.body;

    // Validate input: must be EXACTLY 7 numbers
    if (!Array.isArray(arrData) || arrData.length !== 7) {
      return res.status(400).json({
        success: false,
        message: "Invalid input: 'arrData' must contain EXACTLY 7 numeric features.",
      });
    }

    const emotionDetected = await predictEmotion(arrData);

    return res.status(200).json({
      success: true,
      emotion: emotionDetected,
    });

  } catch (error) {
    console.error("❌ Prediction Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error: " + error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
