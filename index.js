import express from "express";
import cors from "cors";
import { predictEmotion } from "./predict.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // ✅ needed to parse JSON bodies

// Emotion prediction endpoint
app.post("/getEmotions", async (req, res) => {
  try {
    const { arrData } = req.body;

    // Validate input
    if (!Array.isArray(arrData) || arrData.length !== 8) {
      return res.status(400).json({
        success: false,
        message: "Invalid input: 'arrData' must be an array of exactly 8 numbers.",
      });
    }

    // Get emotion from Python model
    const emotionDetected = await predictEmotion(arrData);

    // Send clean JSON response
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
