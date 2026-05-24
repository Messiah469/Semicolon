# FinSight AI 🚀

An AI-powered financial intelligence backend that analyzes bank statements using a custom fine-tuned NLP model, anomaly detection, and automated financial insights.

---

# Features

✅ Upload Bank Statements (PDF / CSV)

✅ Extract Transactions Automatically

✅ Custom Fine-Tuned Transformer AI Model

✅ AI-Based Transaction Categorization

✅ Fraud / Anomaly Detection

✅ Financial Insights Generation

✅ REST API using FastAPI

✅ Swagger API Documentation

---

# Tech Stack

## Backend
- FastAPI
- Python

## AI / Machine Learning
- DistilBERT (Fine-Tuned)
- HuggingFace Transformers
- PyTorch
- Isolation Forest

## Data Processing
- Pandas
- pdfplumber

## Database
- SQLite (Development)
- PostgreSQL (Production Ready)

---

# Project Architecture

```text
PDF/CSV Statement
        ↓
Transaction Parser
        ↓
Custom AI NLP Model
        ↓
Transaction Categorization
        ↓
Anomaly Detection
        ↓
Financial Insights Engine
        ↓
JSON API Response
