from finsight_ai import predict_category
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

from parser import extract_transactions
#from categorizer import categorize_transactions
from insights import generate_insights
from anomaly_detector import detect_anomalies

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.get("/")
def home():
    return {
        "message": "AI Bank Statement Analyzer Backend Running"
    }

@app.post("/upload")
async def upload_statement(
    file: UploadFile = File(...)
):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    transactions = extract_transactions(file_path)
    print(transactions.columns)
    print(transactions.head())
    #categorized = categorize_transactions(
    #    transactions
    #)
    if "narration" in transactions.columns:
        predictions = []

        for text in transactions["narration"]:

            prediction = predict_category(text)

            predictions.append(prediction)

        transactions["predicted_category"] = predictions
    else:
        transactions["predicted_category"] = "Unknown"
    categorized = transactions

    anomalies = detect_anomalies(
        categorized
    )

    insights = generate_insights(
        categorized
    )

    return {
        "transactions": categorized.to_dict(
            orient="records"
        ),
        "anomalies": anomalies,
        "insights": insights
    }