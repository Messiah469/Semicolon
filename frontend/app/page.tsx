"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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

  // Actual logic to parse CSV, save to LocalStorage, and redirect
  const processFile = (file: File) => {
    if (file.type === "application/pdf") {
      alert("PDF parsing requires a backend service. Please upload a CSV file instead.");
      return;
    }

    setIsProcessing(true); // Start the loading animation

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result as string;
      
      if (text) {
        // 1. Parse the CSV
        const rows = text.split("\n").filter((row) => row.trim() !== "");
        const newTransactions = rows.slice(1).map((row, index) => {
          const columns = row.split(",");
          return {
            id: Date.now() + index, // Generate unique ID
            merchant: columns[0]?.trim() || "Unknown",
            category: columns[1]?.trim() || "Other",
            amount: columns[2]?.trim() || "0",
            status: columns[3]?.trim() || "Completed",
            date: columns[4]?.trim() || new Date().toLocaleDateString('en-GB'),
          };
        });

        // 2. Fetch existing transactions from LocalStorage
        const existingData = localStorage.getItem("finSightTransactions");
        let existingTransactions = [];
        if (existingData) {
          existingTransactions = JSON.parse(existingData);
        }

        // 3. Merge new uploads with existing data and save back to LocalStorage
        const combinedTransactions = [...newTransactions, ...existingTransactions];
        localStorage.setItem("finSightTransactions", JSON.stringify(combinedTransactions));
      }

      // Keep a small timeout to let the user see the "AI analyzing" animation
      setTimeout(() => {
        setIsProcessing(false);
        setIsUploadModalOpen(false);
        router.push("/dashboard"); // Redirect to dashboard
      }, 2000);
    };

    // Read the file as text
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

        {/* Upgraded Dashboard Button CSS */}
        
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105 hover:from-blue-500 hover:to-purple-500 active:scale-95"
        >
          Go to Dashboard
        </Link>
      </nav>
          

          
      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center px-6 pb-20 pt-24 text-center md:pt-32 lg:pt-40">
        <div className="group rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-xs font-medium text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all hover:bg-blue-500/20 md:text-sm">
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

        {/* Removed "View Demo" and centered the Upload button */}
        <div className="mt-10 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="rounded-full bg-white px-10 py-4 text-base font-semibold text-slate-900 shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:bg-slate-100 hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] active:scale-95"
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
        <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] md:p-8">
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

        <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/50 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] md:p-8">
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

        <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500/50 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] md:p-8">
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

      {/* Dashboard Preview Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-32 lg:px-12">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            AI Financial Dashboard
          </h2>
          <p className="mt-4 text-base text-slate-400 md:text-lg">
            Smart insights generated instantly from your bank statement.
          </p>
        </div>

        {/* KPI Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
          <div className="group rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]">
            <p className="text-sm font-medium text-slate-400">Total Income</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-emerald-400 lg:text-3xl">
              ₹82,000
            </h3>
          </div>

          <div className="group rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]">
            <p className="text-sm font-medium text-slate-400">Total Expenses</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-rose-400 lg:text-3xl">
              ₹46,500
            </h3>
          </div>

          <div className="group rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <p className="text-sm font-medium text-slate-400">Savings</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-blue-400 lg:text-3xl">
              ₹35,500
            </h3>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent"></div>
            <p className="relative z-10 text-sm font-medium text-slate-400">
              Financial Score
            </p>
            <h3 className="relative z-10 mt-2 text-2xl font-bold tracking-tight text-purple-400 lg:text-3xl">
              82<span className="text-lg text-purple-400/50 lg:text-xl">/100</span>
            </h3>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="relative mt-8 overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:mt-10 md:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[80px]"></div>

          <h3 className="flex items-center gap-3 text-xl font-bold tracking-tight md:text-2xl">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ✨ AI Insights
            </span>
          </h3>

          <div className="mt-6 grid gap-4 md:mt-8 md:grid-cols-3">
            <div className="rounded-2xl border border-white/5 bg-black/40 p-5 text-sm leading-relaxed text-slate-300 shadow-inner transition-colors hover:border-white/10 hover:bg-black/60 md:p-6">
              You spent <span className="font-semibold text-rose-400">28% more</span> on food delivery this month compared to your average.
            </div>

            <div className="rounded-2xl border border-white/5 bg-black/40 p-5 text-sm leading-relaxed text-slate-300 shadow-inner transition-colors hover:border-white/10 hover:bg-black/60 md:p-6">
              <span className="font-semibold text-purple-400">Netflix</span> and <span className="font-semibold text-emerald-400">Spotify</span> recurring subscriptions detected.
            </div>

            <div className="rounded-2xl border border-white/5 bg-black/40 p-5 text-sm leading-relaxed text-slate-300 shadow-inner transition-colors hover:border-white/10 hover:bg-black/60 md:p-6">
              Great job! Your savings ratio is <span className="font-semibold text-blue-400">healthier than last month</span>.
            </div>
          </div>
        </div>
      </section>

      {/* Upload Modal Overlay */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-all">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl md:p-10">
            
            {/* Close Button */}
            <button
              onClick={() => !isProcessing && setIsUploadModalOpen(false)}
              disabled={isProcessing}
              className="absolute right-6 top-6 text-slate-400 hover:text-white disabled:opacity-50"
            >
              ✕
            </button>

            <h2 className="mb-2 text-2xl font-bold text-white">Upload Statement</h2>
            <p className="mb-8 text-sm text-slate-400">
              Supported formats: .PDF, .CSV (Max 10MB)
            </p>

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
              {isProcessing ? (
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
                      accept=".pdf,.csv"
                      className="hidden"
                      onChange={handleFileInput}
                    />
                  </label>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}