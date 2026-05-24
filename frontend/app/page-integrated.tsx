"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useFileUpload } from "@/lib/hooks/useFileUpload";
import { checkBackendHealth, UploadResponse } from "@/lib/api";

export default function Home() {
  const router = useRouter();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [backendAvailable, setBackendAvailable] = useState<boolean | null>(null);
  const [useBackend, setUseBackend] = useState(true);

  const { uploadFile, isLoading, error: uploadError } = useFileUpload({
    onSuccess: (data: UploadResponse) => {
      // Save the processed data to localStorage for dashboard access
      localStorage.setItem("finSightData", JSON.stringify(data));
      
      // Clear any previous transactions
      localStorage.removeItem("finSightTransactions");
      
      // Redirect to dashboard after a brief delay
      setTimeout(() => {
        setIsUploadModalOpen(false);
        router.push("/dashboard");
      }, 1000);
    },
    onError: (error: Error) => {
      console.error("Upload error:", error);
      alert(`Upload failed: ${error.message}`);
    },
  });

  // Check backend availability on mount
  useEffect(() => {
    const checkBackend = async () => {
      const isAvailable = await checkBackendHealth();
      setBackendAvailable(isAvailable);
      setUseBackend(isAvailable);
    };
    checkBackend();
  }, []);

  // File drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  // Process file with backend or local processing
  const processFile = async (file: File) => {
    if (useBackend) {
      // Use backend API
      try {
        await uploadFile(file);
      } catch (error) {
        console.error("Backend upload failed:", error);
      }
    } else {
      // Fallback to local processing
      processFileLocally(file);
    }
  };

  // Local file processing (fallback)
  const processFileLocally = (file: File) => {
    if (file.type === "application/pdf") {
      alert("PDF parsing requires backend service. Backend is not available. Please ensure the backend is running.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result as string;

      if (text) {
        // 1. Parse the CSV
        const rows = text.split("\n").filter((row) => row.trim() !== "");
        const newTransactions = rows.slice(1).map((row, index) => {
          const columns = row.split(",");
          return {
            id: Date.now() + index,
            merchant: columns[0]?.trim() || "Unknown",
            category: columns[1]?.trim() || "Other",
            amount: columns[2]?.trim() || "0",
            status: columns[3]?.trim() || "Completed",
            date: columns[4]?.trim() || new Date().toLocaleDateString("en-GB"),
          };
        });

        // 2. Fetch existing transactions from LocalStorage
        const existingData = localStorage.getItem("finSightTransactions");
        let existingTransactions = [];
        if (existingData) {
          existingTransactions = JSON.parse(existingData);
        }

        // 3. Merge and save
        const combinedTransactions = [
          ...newTransactions,
          ...existingTransactions,
        ];
        localStorage.setItem(
          "finSightTransactions",
          JSON.stringify(combinedTransactions)
        );
      }

      setTimeout(() => {
        setIsUploadModalOpen(false);
        router.push("/dashboard");
      }, 2000);
    };

    reader.readAsText(file);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[120px]"></div>
      <div className="pointer-events-none absolute -right-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-purple-600/15 blur-[120px]"></div>
      <div className="pointer-events-none absolute bottom-[-10%] left-[30%] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[120px]"></div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-6 py-6 backdrop-blur-xl md:px-12 lg:px-24">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 font-bold shadow-lg shadow-blue-500/20">
            F
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            FinSight AI
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {backendAvailable !== null && (
            <div
              className={`text-xs font-medium px-3 py-1 rounded-full ${
                backendAvailable
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-orange-500/20 text-orange-300"
              }`}
            >
              {backendAvailable ? "✓ Backend Connected" : "⚠ Backend Offline"}
            </div>
          )}
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
          >
            Go to Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center px-6 pb-20 pt-24 text-center md:pt-32 lg:pt-40">
        <div className="group rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-xs font-medium text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all hover:bg-blue-500/20">
          ✨ AI-Powered Financial Insights
        </div>

        <h1 className="mt-8 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Understand Your <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
            Bank Statement
          </span>{" "}
          Instantly.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg md:text-xl">
          Upload your bank statement and receive AI-generated insights, expense
          analysis, recurring payment detection, and financial recommendations in
          seconds.
        </p>

        <div className="mt-10 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="rounded-full bg-white px-10 py-4 text-base font-semibold text-slate-900 shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:bg-slate-100 hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]"
          >
            Upload Statement
          </button>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-slate-500 sm:gap-x-8 sm:text-sm">
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>{" "}
            Secure Uploads
          </p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span> AI
            Insights
          </p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>{" "}
            Expense Analytics
          </p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>{" "}
            Recurring Payments
          </p>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="relative z-10 mx-auto mt-16 grid max-w-7xl gap-6 px-6 pb-24 sm:mt-28 md:grid-cols-3 lg:px-12">
        <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:bg-white/10 hover:shadow-xl hover:shadow-blue-500/20">
          <div className="mb-6 inline-flex w-fit rounded-2xl bg-blue-500/20 p-4 text-3xl shadow-inner transition-transform group-hover:scale-110">
            📊
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-white">
            Smart Categorization
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Automatically classifies transactions into food, travel,
            subscriptions, shopping, salary, EMI, and more.
          </p>
        </div>

        <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/50 hover:bg-white/10 hover:shadow-xl hover:shadow-purple-500/20">
          <div className="mb-6 inline-flex w-fit rounded-2xl bg-purple-500/20 p-4 text-3xl shadow-inner transition-transform group-hover:scale-110">
            📈
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-white">
            Expense Analytics
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Visualize spending trends with interactive charts, summaries, and
            monthly comparisons.
          </p>
        </div>

        <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500/50 hover:bg-white/10 hover:shadow-xl hover:shadow-emerald-500/20">
          <div className="mb-6 inline-flex w-fit rounded-2xl bg-emerald-500/20 p-4 text-3xl shadow-inner transition-transform group-hover:scale-110">
            🤖
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-white">
            AI Financial Insights
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Receive intelligent recommendations, recurring payment alerts, and
            unusual transaction detection instantly.
          </p>
        </div>
      </section>

      {/* Upload Modal Overlay */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-all">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl md:p-10">
            {/* Close Button */}
            <button
              onClick={() => !isLoading && setIsUploadModalOpen(false)}
              disabled={isLoading}
              className="absolute right-6 top-6 text-slate-400 hover:text-white disabled:opacity-50"
            >
              ✕
            </button>

            <h2 className="mb-2 text-2xl font-bold text-white">
              Upload Statement
            </h2>
            <p className="mb-2 text-sm text-slate-400">
              Supported formats: .PDF, .CSV (Max 10MB)
            </p>
            {backendAvailable === false && (
              <p className="mb-4 text-xs text-orange-400 bg-orange-500/10 p-2 rounded">
                ⚠ Backend is offline. Local CSV processing only.
              </p>
            )}

            {/* Drag & Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
                isDragging
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-slate-700 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800"
              }`}
            >
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                  <p className="animate-pulse font-medium text-blue-400">
                    AI is analyzing your statement...
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-4 rounded-full bg-slate-700 p-4 text-3xl">
                    📄
                  </div>
                  <p className="mb-2 text-base font-medium text-white">
                    Drag and drop your file here
                  </p>
                  <p className="mb-6 text-sm text-slate-400">or</p>

                  {/* Hidden File Input */}
                  <label className="cursor-pointer rounded-full bg-blue-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
                    Browse Files
                    <input
                      type="file"
                      accept={backendAvailable ? ".pdf,.csv" : ".csv"}
                      className="hidden"
                      onChange={handleFileInput}
                    />
                  </label>
                </>
              )}
            </div>

            {uploadError && (
              <div className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
                {uploadError.message}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}