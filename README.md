# 🧠 Emotion Detection Using Keystroke Dynamics

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey.svg)](https://expressjs.com/)

An AI-powered system that predicts a user's emotional state based on their typing behavior using Machine Learning. The project combines a **Python SVM model** for predictions with a **Node.js REST API** for real-time emotion detection.

## 📋 Table of Contents

- [Features](#-features)
- [Emotion Classes](#-emotion-classes)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Running the Server](#-running-the-server)
- [API Documentation](#-api-documentation)
- [Model Training](#-model-training)
- [Example Usage](#-example-usage)
- [Troubleshooting](#-troubleshooting)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Features

- **Real-time Emotion Detection**: Analyzes typing patterns to predict emotional states
- **Machine Learning Powered**: Uses Support Vector Machine (SVM) with RBF kernel
- **RESTful API**: Easy-to-use endpoint for emotion predictions
- **Hybrid Architecture**: Python ML backend + Node.js API server
- **7 Behavioral Features**: Analyzes comprehensive typing dynamics
- **Pre-trained Model**: Ready-to-use with included model files

---

## 🎭 Emotion Classes

The model predicts one of five emotional states:

| Emotion | Icon | Description |
|---------|------|-------------|
| **Happy** | 😀 | Positive, upbeat emotional state |
| **Angry** | 😡 | Frustrated or irritated state |
| **Sad** | 😢 | Melancholic or low mood |
| **Calm** | 😌 | Relaxed, peaceful state |
| **Neutral** | 😐 | Balanced, no strong emotion |

---

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing

### Machine Learning
- **Python 3.8+** - ML runtime
- **NumPy** - Numerical computations
- **Pandas** - Data manipulation
- **Scikit-Learn** - ML algorithms
- **Joblib** - Model serialization

---

## 📁 Project Structure

```
emotion-detection/
│
├── index.js                  # Express server entry point
├── predict.js                # Node → Python bridge
├── predict.py                # ML inference script
├── train.py                  # Model training script (optional)
│
├── emotion_model.pkl         # Trained SVM model
├── scaler.pkl                # Feature scaler
├── label_encoder.pkl         # Label encoder
│
├── package.json              # Node dependencies
├── requirements.txt          # Python dependencies
├── venv/                     # Python virtual environment
│
└── README.md                 # This file
```

---

## ⚙️ Installation & Setup

### Prerequisites

- **Node.js** v14 or higher
- **Python** 3.8 or higher
- **npm** or **yarn**

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/emotion-detection.git
cd emotion-detection
```

### 2️⃣ Setup Python Environment

Create and activate a virtual environment:

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

### 3️⃣ Install Node.js Dependencies

```bash
npm install
```

---

## 🚀 Running the Server

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
node index.js
```

The server will start at:
```
http://localhost:3000
```

---

## 📡 API Documentation

### Endpoint: Predict Emotion

**POST** `/getEmotions`

#### Request Headers
```
Content-Type: application/json
```

#### Request Body

```json
{
  "arrData": [5.4, 120, 140, 0.025, 12.4, 80, 0.42]
}
```

**Feature Order (7 values required):**

1. **TypingSpeed** - Words per minute
2. **DwellTime** - Time key is held down (ms)
3. **FlightTime** - Time between key releases (ms)
4. **ErrorRate** - Percentage of errors (0-1)
5. **TotalTime** - Total typing duration (seconds)
6. **NumKeys** - Number of keys pressed
7. **SentenceComplexity** - Complexity score (0-1)

#### Success Response

```json
{
  "success": true,
  "emotion": "Happy"
}
```

#### Error Response

```json
{
  "success": false,
  "message": "Invalid input data"
}
```

---

## 🎓 Model Training

If you want to retrain the model with your own dataset:

```bash
python train.py
```

This will:
- Read your training dataset
- Scale features using `StandardScaler`
- Train an SVM model with RBF kernel
- Save three files:
  - `emotion_model.pkl` - Trained model
  - `scaler.pkl` - Feature scaler
  - `label_encoder.pkl` - Label encoder

---

## 💡 Example Usage

### Using cURL

```bash
curl -X POST http://localhost:3000/getEmotions \
  -H "Content-Type: application/json" \
  -d '{"arrData": [6.1, 110, 160, 0.03, 14.2, 85, 0.39]}'
```

### Using JavaScript (Fetch API)

```javascript
fetch('http://localhost:3000/getEmotions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    arrData: [6.1, 110, 160, 0.03, 14.2, 85, 0.39]
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### Using Python (Requests)

```python
import requests

url = "http://localhost:3000/getEmotions"
data = {
    "arrData": [6.1, 110, 160, 0.03, 14.2, 85, 0.39]
}

response = requests.post(url, json=data)
print(response.json())
```

---

## 🧪 Sample Test Data

| TypingSpeed | DwellTime | FlightTime | ErrorRate | TotalTime | NumKeys | Complexity | Expected Emotion |
|-------------|-----------|------------|-----------|-----------|---------|------------|------------------|
| 6.2 | 105 | 150 | 0.01 | 14.3 | 85 | 0.32 | Happy |
| 3.9 | 125 | 205 | 0.05 | 16.5 | 60 | 0.67 | Sad |
| 7.3 | 112 | 159 | 0.07 | 12.8 | 75 | 0.22 | Angry |
| 5.4 | 92 | 130 | 0.02 | 15.9 | 90 | 0.39 | Calm |
| 5.1 | 111 | 161 | 0.03 | 9.9 | 48 | 0.46 | Neutral |

---

## ❗ Troubleshooting

### Common Issues

#### ❌ `InconsistentVersionWarning`

**Problem:** Model was created with a different scikit-learn version

**Solution:**
```bash
pip install scikit-learn==<version_that_matches_model>
# OR retrain the model
python train.py
```

#### ❌ `X has 7 features, expected 8`

**Problem:** Feature count mismatch between training and prediction

**Solution:**
- Ensure you're sending exactly 7 features
- OR retrain the model with the correct feature count

#### ❌ `Python script not found`

**Problem:** predict.py path is incorrect

**Solution:**
- Check that `predict.py` is in the project root
- Verify the path in `predict.js`

#### ❌ `Module not found` errors

**Problem:** Python dependencies not installed

**Solution:**
```bash
# Activate virtual environment first
pip install -r requirements.txt
```

---

## 📦 requirements.txt

```txt
numpy>=1.21.0
pandas>=1.3.0
scikit-learn>=1.0.0
joblib>=1.1.0
```

---

## 🚀 Future Improvements

- [ ] Real-time keystroke recording from web UI
- [ ] Support for more emotions (Excited, Tired, Anxious, etc.)
- [ ] Deep Learning model (LSTM/Transformer) for better accuracy
- [ ] User authentication and personalized models
- [ ] Historical emotion tracking dashboard
- [ ] Mobile app integration
- [ ] Deploy API to cloud (AWS/Heroku/Vercel)
- [ ] WebSocket support for live predictions
- [ ] Multi-language support

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---


## 👨‍💻 Author

**Your Name**
[Ansh Khare]

---

## ⭐ Show Your Support

If this project helped you, please give it a ⭐ on GitHub!

---

## 📞 Contact

For questions or feedback, please open an issue on GitHub or contact me at 
khareansh075@gmail.com

---

<div align="center">
  Made with ❤️ and ☕
</div>