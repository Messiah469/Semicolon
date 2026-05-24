import pandas as pd
import joblib

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression


# -----------------------------
# TRAIN MODEL
# -----------------------------

df = pd.read_csv(
    "dataset.csv",
    header=None,
    names=[
        "narration",
        "category"
    ]
)

# Clean text
df["narration"] = df[
    "narration"
].astype(str).str.lower().str.strip()

df["category"] = df[
    "category"
].astype(str).str.strip()

# Features
X = df["narration"]

# Labels
y = df["category"]

# NLP vectorizer
vectorizer = TfidfVectorizer()

X_vectorized = vectorizer.fit_transform(X)

# Lightweight ML model
model = LogisticRegression(
    max_iter=1000
)

# Train model
model.fit(X_vectorized, y)

# Save model
joblib.dump(
    model,
    "finsight_model.pkl"
)

joblib.dump(
    vectorizer,
    "vectorizer.pkl"
)

print("FinSight AI trained successfully!")


# -----------------------------
# PREDICT CATEGORY
# -----------------------------

def predict_category(text):

    text = str(text).lower().strip()

    # Load saved model
    model = joblib.load(
        "finsight_model.pkl"
    )

    vectorizer = joblib.load(
        "vectorizer.pkl"
    )

    # Convert text into vector
    vector = vectorizer.transform(
        [text]
    )

    # Predict
    prediction = model.predict(
        vector
    )[0]

    print(
        "TEXT:",
        text,
        "->",
        prediction
    )

    return prediction