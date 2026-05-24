/**
 * API Service Client for FinSight AI Backend
 * Handles all communication with the FastAPI backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Transaction {
  date: string;
  narration: string;
  amount: number;
  predicted_category: string;
  [key: string]: any;
}

export interface Anomaly {
  index: number;
  reason: string;
  [key: string]: any;
}

export interface InsightData {
  total_income: number;
  total_expenses: number;
  average_transaction: number;
  top_category: string;
  top_category_amount: number;
  recurring_transactions: any[];
  [key: string]: any;
}

export interface UploadResponse {
  transactions: Transaction[];
  anomalies: Anomaly[];
  insights: InsightData;
}

/**
 * Upload a bank statement file to the backend for processing
 * @param file - The CSV or PDF file to upload
 * @returns Promise with transactions, anomalies, and insights
 */
export async function uploadBankStatement(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data: UploadResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

/**
 * Check if the backend is available
 * @returns Promise that resolves if backend is reachable
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    console.warn('Backend health check failed:', error);
    return false;
  }
}

/**
 * Get the API base URL
 */
export function getApiBaseUrl(): string {
  return API_BASE_URL;
}