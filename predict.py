import numpy as np
import json
import sys
import joblib   # use joblib instead of pickle

# Load model, scaler, and encoder (all with joblib)
model = joblib.load("emotion_model.pkl")
scaler = joblib.load("scaler.pkl")
label_encoder = joblib.load("label_encoder.pkl")

# Read JSON input from Node
data = json.loads(sys.stdin.read())
# data = {"features": [0.52, 0.10, 0.75, 0.88, 0.63, 0.47, 0.31, 0.29]}



# Convert to numpy array
features = np.array([data["features"]])

# Scale
scaled = scaler.transform(features)

# Predict
pred = model.predict(scaled)

# Decode label
emotion = label_encoder.inverse_transform(pred)[0]

print(emotion)
