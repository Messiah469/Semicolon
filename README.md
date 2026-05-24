FinSight AI

An AI-powered financial analysis utility platform that instantly processes uploaded bank statements and generates categorized transaction insights, analytics, and downloadable reports without requiring user accounts.

Features

1. Upload Bank Statements (PDF / CSV)
2. Extract Transactions Automatically
3. Custom Fine-Tuned Transformer AI Model
4. AI-Based Transaction Categorization
5. Expense Analytics Dashboard
6. Recurring Subscription Detection
7. Financial Insights & Recommendations
8. Fraud / Anomaly Detection
9. REST API using FastAPI
10. Swagger API Documentation

Tech Stack

I. Frontend:
Framework: Next.js
Language: TypeScript
Styling: Tailwind CSS
Data Storage: Web LocalStorage
PDF Generation: jsPDF, jsPDF-autotable

II. Backend:
1. FastAPI
2. Python

III. AI / Machine Learning:
1. NLP

IV. Data Processing:
1. Pandas
2. pdfplumber

Project Architecture

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
        ↓
Interactive Dashboard
