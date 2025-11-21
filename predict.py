import numpy as np
import json
import sys
import joblib

# Load trained model artifacts
model = joblib.load("emotion_model.pkl")
scaler = joblib.load("scaler.pkl")
label_encoder = joblib.load("label_encoder.pkl")

# Read JSON input from Node.js
data = json.loads(sys.stdin.read())

# The correct feature order (7 features):
# TypingSpeed, DwellTime, FlightTime, ErrorRate, TotalTime, NumKeys, SentenceComplexity

features = np.array([[
    data["features"][0],  # TypingSpeed
    data["features"][1],  # DwellTime
    data["features"][2],  # FlightTime
    data["features"][3],  # ErrorRate
    data["features"][4],  # TotalTime
    data["features"][5],  # NumKeys
    data["features"][6],  # SentenceComplexity
]])

# Scale features
scaled = scaler.transform(features)

# Predict
pred = model.predict(scaled)

# Convert numeric label → emotion name
emotion = label_encoder.inverse_transform(pred)[0]

print(emotion)
