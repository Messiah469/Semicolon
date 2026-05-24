# Frontend-Backend Integration Guide

## Overview

This guide explains the integration between the Next.js frontend and FastAPI backend for the FinSight AI project.

## Setup Instructions

### 1. Configure Environment Variables

Create a `.env.local` file in the `frontend` directory (copy from `.env.local.example`):

```bash
cd frontend
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**For Production:**
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

### 2. Start the Backend

```bash
cd backend
pip install -r requirements.txt  # if you have a requirements.txt
python app.py
# Backend runs on http://localhost:8000
```

### 3. Start the Frontend

```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:3000
```

## Integration Files

### New Files Created

1. **`frontend/lib/api.ts`**
   - Centralized API client
   - Handles all backend communication
   - Includes TypeScript interfaces for type safety
   - Main functions:
     - `uploadBankStatement()` - Upload and process statements
     - `checkBackendHealth()` - Verify backend availability

2. **`frontend/lib/hooks/useFileUpload.ts`**
   - Custom React hook for file uploads
   - Handles loading states, errors, and success callbacks
   - Includes file validation (type and size)

3. **`frontend/app/page-integrated.tsx`**
   - Updated home page with backend integration
   - Shows backend connection status
   - Falls back to local processing if backend is unavailable
   - Saves processed data to localStorage for dashboard access

4. **`frontend/.env.local.example`**
   - Environment configuration template

## How It Works

### Upload Flow

1. User selects/drags a file (PDF or CSV)
2. Frontend checks if backend is available
3. **If backend available:**
   - File is uploaded to `/upload` endpoint
   - Backend processes: extraction → categorization → anomaly detection → insights
   - Response includes: `transactions`, `anomalies`, `insights`
   - Data saved to localStorage as `finSightData`
   - User redirected to dashboard

4. **If backend unavailable:**
   - Falls back to local CSV-only processing
   - Uses existing LocalStorage mechanism
   - Shows warning to user

## API Client Usage

### Basic Upload

```typescript
import { uploadBankStatement } from '@/lib/api';

const response = await uploadBankStatement(file);
console.log(response.transactions);
console.log(response.anomalies);
console.log(response.insights);
```

### Using the Hook

```typescript
import { useFileUpload } from '@/lib/hooks/useFileUpload';

const { uploadFile, isLoading, error, data } = useFileUpload({
  onSuccess: (data) => console.log('Upload complete:', data),
  onError: (error) => console.error('Upload failed:', error),
});

// Upload file
await uploadFile(file);
```

### Backend Health Check

```typescript
import { checkBackendHealth } from '@/lib/api';

const isAvailable = await checkBackendHealth();
if (!isAvailable) {
  console.log('Backend is offline');
}
```

## Next Steps - Implementation

### Step 1: Test Backend Connection

```bash
# In the frontend directory
cd frontend
cp .env.local.example .env.local
```

### Step 2: Use the Integrated Page

```bash
cd frontend
mv app/page.tsx app/page-original.tsx
mv app/page-integrated.tsx app/page.tsx
```

### Step 3: Update Dashboard

Update `frontend/app/dashboard/page.tsx` to read from localStorage:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { UploadResponse } from '@/lib/api';

export default function Dashboard() {
  const [data, setData] = useState<UploadResponse | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('finSightData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  if (!data) return <div>No data available</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Transactions: {data.transactions.length}</p>
      <p>Anomalies: {data.anomalies.length}</p>
      {/* Display data components */}
    </div>
  );
}
```

## Error Handling

The integration handles various errors:

- **Network errors** - Shows backend connection status
- **File validation** - Type and size checks
- **Upload failures** - Backend error messages displayed to user
- **Graceful fallback** - Switches to local processing if backend unavailable

## Troubleshooting

### Backend Connection Issues

1. **Check if backend is running:**
   ```bash
   curl http://localhost:8000/
   ```

2. **Verify API_URL in frontend:**
   ```bash
   cat frontend/.env.local
   ```

3. **Check browser console** for CORS or network errors

### File Upload Issues

1. **File size too large:** Max 10MB (configurable in hook)
2. **Unsupported format:** Only CSV and PDF supported by backend
3. **Backend processing error:** Check backend logs for details
