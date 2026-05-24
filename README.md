# FinSight AI

An AI-powered financial intelligence platform that analyzes bank statements and converts raw transaction data into smart financial insights.

---

# Features

1. Upload Bank Statements (PDF / CSV)
2. Extract Transactions Automatically
3. Custom Lightweight Financial NLP Model
4. AI-Based Transaction Categorization
5. Expense Analytics Dashboard
6. Recurring Subscription Detection
7. Financial Insights & Recommendations
8. Fraud / Anomaly Detection
9. REST API using FastAPI
10. Swagger API Documentation

---

# Tech Stack

## I. Frontend:

1. Built with Next.js 14, React, TypeScript & Tailwind CSS
2. Modern FinTech Dashboard UI
3. Drag-and-Drop Upload System
4. Interactive KPI Cards & AI Insight Panels
5. Responsive Dark-Themed Design

---

## II. Backend:

1. FastAPI
2. Python
3. Custom Smart Transaction Parser
4. RESTful API Architecture
5. Real-Time Financial Data Processing

---

## III. AI / Machine Learning:

1. Custom NLP-Based Financial Classification Model
2. TF-IDF Vectorization
3. Logistic Regression Classifier
4. Scikit-learn
5. Isolation Forest Anomaly Detection

---

## IV. Data Processing:

1. Pandas
2. pdfplumber
3. CSV / PDF Transaction Extraction
4. Dynamic Column Normalization
5. Financial Data Cleaning Pipeline

---

## V. Runtime Processing:

1. Real-Time In-Memory Transaction Processing
2. Dynamic Financial Data Analysis
3. Lightweight Local AI Inference
4. Database-Ready Scalable Architecture

---

# Project Architecture

```text id="full6201"
PDF/CSV Statement
        ↓
Smart Transaction Parser
        ↓
Financial Data Cleaning
        ↓
NLP Vectorization Engine
        ↓
Machine Learning Classification
        ↓
Transaction Categorization
        ↓
Anomaly Detection
        ↓
Financial Insights Engine
        ↓
JSON API Response
        ↓
Interactive Dashboard
```

---

# AI Workflow

```text id="full6202"
Transaction Text
        ↓
TF-IDF Vectorization
        ↓
Logistic Regression Model
        ↓
Predicted Financial Category
```

---

# About FinSight AI

FinSight AI is not a wrapper around external AI APIs such as ChatGPT or Gemini.
The platform uses a locally trained lightweight NLP-based machine learning model specialized for financial transaction understanding.

The system:

* parses raw bank statements,
* converts transaction text into mathematical vectors,
* classifies transactions using machine learning,
* detects anomalies,
* and generates financial insights in real time.

This enables:

* fast local inference,
* low resource usage,
* privacy-focused processing,
* and finance-specific intelligence without external AI dependency.

---

# How FinSight AI Works

1. User uploads a bank statement in PDF or CSV format
2. The parser extracts and normalizes transaction data
3. NLP vectorization converts transaction narration into mathematical vectors
4. Logistic Regression predicts transaction categories
5. Isolation Forest detects unusual spending behavior
6. The insights engine generates analytics and summaries
7. Results are returned through a FastAPI JSON API and visualized on the dashboard

---

# Example AI Predictions

| Transaction Narration       | Predicted Category |
| --------------------------- | ------------------ |
| SWIGGY ORDER                | Food               |
| UBER TRIP                   | Travel             |
| MACQUARIE CMA INTEREST PAID | Interest           |
| MUTUAL FUND SIP             | Investment         |
| NETFLIX SUBSCRIPTION        | Subscription       |

---

# Key Highlights

✅ No external AI APIs used
✅ Lightweight and fast local inference
✅ Real bank statement support
✅ AI-powered transaction understanding
✅ Fraud/anomaly detection
✅ Real-time financial analytics
✅ Modular scalable backend architecture
