/**
 * Custom hook for handling file uploads to the backend
 */

import { useState } from 'react';
import { uploadBankStatement, UploadResponse } from '../api';

export interface UseFileUploadOptions {
  onSuccess?: (data: UploadResponse) => void;
  onError?: (error: Error) => void;
  maxFileSize?: number; // in bytes
}

export function useFileUpload(options: UseFileUploadOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<UploadResponse | null>(null);

  const MAX_FILE_SIZE = options.maxFileSize || 10 * 1024 * 1024; // 10MB default

  const uploadFile = async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate file type
      const validTypes = ['application/pdf', 'text/csv', 'application/vnd.ms-excel'];
      if (!validTypes.includes(file.type)) {
        throw new Error('Please upload a CSV or PDF file');
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        throw new Error(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`);
      }

      const result = await uploadBankStatement(file);
      setData(result);
      options.onSuccess?.(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Upload failed');
      setError(error);
      options.onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    uploadFile,
    isLoading,
    error,
    data,
  };
}