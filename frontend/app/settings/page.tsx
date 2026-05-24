"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function DownloadsPage() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = () => {
    setIsDownloading(true);

    try {
      const savedData = localStorage.getItem("finSightTransactions");
      if (!savedData || JSON.parse(savedData).length === 0) {
        alert("No data available to export. Please upload a statement on the Home page first.");
        setIsDownloading(false);
        return;
      }

      const transactions = JSON.parse(savedData);

      // Calculate Metrics for PDF Summary
      let income = 0;
      let expenses = 0;
      transactions.forEach((tx: any) => {
        const amount = parseFloat(tx.amount.replace(/[^0-9.-]+/g, ""));
        if (amount > 0 || tx.amount.includes('+')) {
          income += Math.abs(amount);
        } else if (amount < 0 || tx.amount.includes('-')) {
          expenses += Math.abs(amount);
        }
      });
      const savings = income - expenses;
      const ratio = expenses > 0 ? (income / expenses) : 2;
      const score = Math.min(100, Math.floor(50 + (ratio * 15)));

      // Initialize PDF Document
      const doc = new jsPDF();

      // Title & Header
      doc.setFontSize(22);
      doc.setTextColor(37, 99, 235); // Blue color
      doc.text("FinSight AI - Financial Report", 14, 20);
      
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Generated on: ${new Date().toLocaleDateString('en-GB')}`, 14, 28);

      // Summary Section
      doc.setFontSize(14);
      doc.setTextColor(0);
      doc.text("Dashboard Summary", 14, 40);
      
      doc.setFontSize(11);
      doc.setTextColor(60);
      doc.text(`Total Income: INR ${income.toLocaleString('en-IN')}`, 14, 50);
      doc.text(`Total Expenses: INR ${expenses.toLocaleString('en-IN')}`, 14, 57);
      doc.text(`Total Savings: INR ${savings.toLocaleString('en-IN')}`, 14, 64);
      doc.text(`Financial Score: ${score} / 100`, 14, 71);

      // Transaction Table using autoTable
      doc.setFontSize(14);
      doc.setTextColor(0);
      doc.text("Transaction History", 14, 85);

      // Map data for the table
      const tableColumn = ["Date", "Merchant", "Category", "Amount", "Status"];
      const tableRows = transactions.map((tx: any) => [
        tx.date, 
        tx.merchant, 
        tx.category, 
        tx.amount, 
        tx.status
      ]);

      autoTable(doc, {
        startY: 90,
        head: [tableColumn],
        body: tableRows,
        theme: 'striped',
        headStyles: { fillColor: [37, 99, 235] }, // Blue table header
      });

      // Save the PDF
      doc.save(`FinSight_Report_${new Date().toISOString().split('T')[0]}.pdf`);

    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating your PDF. Make sure you ran 'npm install jspdf jspdf-autotable' in your terminal.");
    }

    setTimeout(() => setIsDownloading(false), 500);
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
          
          {/* PDF Download Card */}
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-slate-800 bg-slate-950 p-6 md:flex-row md:items-center md:p-8">
            <div>
              <h2 className="text-xl font-bold text-blue-400 md:text-2xl">
                Full Report (PDF)
              </h2>
              <p className="mt-2 text-sm text-slate-400 md:mt-3 md:text-base">
                Download the PDF document.
              </p>
            </div>
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className={`whitespace-nowrap rounded-xl px-6 py-3 font-semibold transition-all md:px-8 md:py-4 ${
                isDownloading 
                  ? "bg-slate-800 text-slate-400" 
      : "bg-slate-700 text-slate-200 hover:bg-slate-600 hover:text-white hover:shadow-lg hover:shadow-slate-500/10 active:scale-95"
  }`}
              
            >
              {isDownloading ? "Generating PDF..." : "Download PDF"}
            </button>
          </div>

        </div>
      </div>

    </main>
  );
}