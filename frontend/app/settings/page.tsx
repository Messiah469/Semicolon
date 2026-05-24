/*"use client";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-black p-6 md:p-10 text-white">
      
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold md:text-5xl">
          Settings
        </h1>

        <p className="mt-2 text-sm text-slate-400 md:mt-4 md:text-base">
          Manage your preferences and account settings.
        </p>

        <div className="mt-8 space-y-6 md:mt-10">
          
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 md:p-8">
            <h2 className="text-xl font-bold md:text-2xl">
              Export Reports
            </h2>

            <p className="mt-2 text-sm text-slate-400 md:mt-3 md:text-base">
              Download monthly summaries and analytics reports.
            </p>
          </div>

        </div>
      </div>

    </main>
  );
}*/

"use client";

import { useState } from "react";

export default function DownloadsPage() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadReport = () => {
    setIsDownloading(true);

    try {
      const savedData = localStorage.getItem("finSightTransactions");
      if (!savedData || JSON.parse(savedData).length === 0) {
        alert("No data available to export. Please upload a statement on the Home page first.");
        setIsDownloading(false);
        return;
      }

      const transactions = JSON.parse(savedData);

      // 1. Calculate Dashboard Metrics
      let income = 0;
      let expenses = 0;
      const categoryTotals: Record<string, number> = {};

      transactions.forEach((tx: any) => {
        const amount = parseFloat(tx.amount.replace(/[^0-9.-]+/g, ""));
        const absAmount = Math.abs(amount);

        if (amount > 0 || tx.amount.includes('+')) {
          income += absAmount;
        } else if (amount < 0 || tx.amount.includes('-')) {
          expenses += absAmount;
          categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + absAmount;
        }
      });

      const savings = income - expenses;
      const ratio = expenses > 0 ? (income / expenses) : 2;
      const score = Math.min(100, Math.floor(50 + (ratio * 15)));

      // 2. Format the Text Report
      let report = `======================================\n`;
      report += `      FINSIGHT FINANCIAL REPORT\n`;
      report += `======================================\n`;
      report += `Generated on: ${new Date().toLocaleDateString('en-GB')}\n\n`;

      report += `[ DASHBOARD SUMMARY ]\n`;
      report += `Total Income:    ₹${income.toLocaleString('en-IN')}\n`;
      report += `Total Expenses:  ₹${expenses.toLocaleString('en-IN')}\n`;
      report += `Total Savings:   ₹${savings.toLocaleString('en-IN')}\n`;
      report += `Financial Score: ${score} / 100\n\n`;

      report += `[ EXPENSE BREAKDOWN ]\n`;
      if (expenses > 0) {
        Object.keys(categoryTotals)
          .sort((a, b) => categoryTotals[b] - categoryTotals[a])
          .forEach((cat) => {
            const percentage = Math.round((categoryTotals[cat] / expenses) * 100);
            report += `- ${cat}: ₹${categoryTotals[cat].toLocaleString('en-IN')} (${percentage}%)\n`;
          });
      } else {
        report += `No expenses recorded.\n`;
      }
      report += `\n`;

      report += `[ TRANSACTION HISTORY (${transactions.length} items) ]\n`;
      report += `Date       | Merchant             | Category       | Amount\n`;
      report += `---------------------------------------------------------------\n`;
      transactions.forEach((tx: any) => {
        // Pad strings to make the text columns align nicely
        const date = tx.date.padEnd(10, ' ');
        const merchant = tx.merchant.substring(0, 20).padEnd(20, ' ');
        const category = tx.category.padEnd(14, ' ');
        report += `${date} | ${merchant} | ${category} | ${tx.amount}\n`;
      });

      // 3. Trigger the Browser Download
      const blob = new Blob([report], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `FinSight_Report_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error generating report:", error);
      alert("There was an error generating your report.");
    }

    // Small timeout just to show the user the button click registered
    setTimeout(() => {
      setIsDownloading(false);
    }, 500);
  };

  return (
    <main className="min-h-screen bg-black p-6 md:p-10 text-white">
      
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold md:text-5xl">
          Downloads
        </h1>

        <p className="mt-2 text-sm text-slate-400 md:mt-4 md:text-base">
          Download your financial reports and transaction history.
        </p>

        <div className="mt-8 space-y-6 md:mt-10">
          
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-slate-800 bg-slate-950 p-6 md:flex-row md:items-center md:p-8">
            <div>
              <h2 className="text-xl font-bold md:text-2xl">
                Export Reports
              </h2>
              <p className="mt-2 text-sm text-slate-400 md:mt-3 md:text-base">
                Download a complete text summary of your dashboard analytics, expense breakdown, and full transaction history.
              </p>
            </div>
            
            <button
              onClick={handleDownloadReport}
              disabled={isDownloading}
              className={`whitespace-nowrap rounded-xl px-6 py-3 font-semibold transition-all md:px-8 md:py-4 ${
                isDownloading 
                  ? "bg-slate-800 text-slate-400" 
                  : "bg-blue-600 text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"
              }`}
            >
              {isDownloading ? "Generating..." : "Download Report"}
            </button>
          </div>

        </div>
      </div>

    </main>
  );
}