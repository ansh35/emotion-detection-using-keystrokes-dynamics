import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib

# ============================
# 1. Load dataset
# ============================
df = pd.read_csv("synthetic_keystroke_emotion_dataset.csv")
print("Dataset loaded:", df.shape)

# ============================
# 2. Drop unused column
# ============================
if "user_id" in df.columns:
    df = df.drop(columns=["user_id"])

# ============================
# 3. Encode target variable
# ============================
label_encoder = LabelEncoder()
df["Emotion"] = label_encoder.fit_transform(df["Emotion"])

# ============================
# 4. Separate features and labels
# ============================
X = df.drop(columns=["Emotion"])   # 7 features
y = df["Emotion"]

# ============================
# 5. Scale features
# ============================
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# ============================
# 6. Train-Test split
# ============================
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# ============================
# 7. Train the model
# ============================
model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)
model.fit(X_train, y_train)

# ============================
# 8. Evaluate
# ============================
y_pred = model.predict(X_test)
print("\nAccuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:\n")
print(classification_report(
    y_test,
    y_pred,
    target_names=label_encoder.classes_
))

# ============================
# 9. Save model, scaler, encoder
# ============================
joblib.dump(model, "emotion_model.pkl")
joblib.dump(scaler, "scaler.pkl")
joblib.dump(label_encoder, "label_encoder.pkl")

print("\nSaved:")
print("- emotion_model.pkl")
print("- scaler.pkl")
print("- label_encoder.pkl")
