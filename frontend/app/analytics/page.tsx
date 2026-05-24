"use client";

import { useState, useEffect, useMemo } from "react";

const categoryColors: Record<string, string> = {
  Food: "bg-blue-500",
  Shopping: "bg-purple-500",
  Travel: "bg-green-500",
  Subscription: "bg-rose-500",
  EMI: "bg-amber-500",
  Income: "bg-emerald-500"
};

export default function AnalyticsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("finSightTransactions");
    if (savedData) {
      setTransactions(JSON.parse(savedData));
    }
    setIsLoaded(true);
  }, []);

  const analytics = useMemo(() => {
    let totalIncome = 0;
    let totalExpenses = 0;
    let recurring = 0;
    const categoryTotals: Record<string, number> = {};

    transactions.forEach((tx) => {
      const amountValue = Number(tx.amount.replace(/[^0-9.-]+/g, ""));
      const absAmount = Math.abs(amountValue);

      if (amountValue > 0 || tx.amount.includes('+')) {
        totalIncome += absAmount;
      } else {
        totalExpenses += absAmount;
        categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + absAmount;

        if (["Subscription", "EMI", "Rent", "Utility"].includes(tx.category)) {
          recurring += absAmount;
        }
      }
    });

    const savingsRatio = totalIncome > 0 ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100) : 0;
    
    // --- Pie Chart Math ---
    // A pie chart shows parts of a whole, so we combine Income and Expense to find their relative ratios.
    const totalFlow = totalIncome + totalExpenses || 1; 
    const incomePiePercent = (totalIncome / totalFlow) * 100;
    const expensePiePercent = (totalExpenses / totalFlow) * 100;

    const expensesByCategory = Object.keys(categoryTotals)
      .filter(cat => cat !== "Income")
      .map((category) => ({
        category,
        amount: categoryTotals[category],
        percentage: totalExpenses > 0 ? Math.round((categoryTotals[category] / totalExpenses) * 100) : 0,
        color: categoryColors[category] || "bg-indigo-500",
      })).sort((a, b) => b.percentage - a.percentage);

    return { 
      totalIncome, 
      totalExpenses, 
      savingsRatio, 
      recurring, 
      expensesByCategory, 
      incomePiePercent, 
      expensePiePercent 
    };
  }, [transactions]);

  if (!isLoaded) return <div className="min-h-screen bg-black" />;

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">Analytics</h1>
        
        {/* Income vs Expense Summary Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-emerald-900/50 bg-emerald-950/20 p-8 transition-all hover:bg-emerald-900/30">
            <p className="text-sm text-emerald-400">Total Income</p>
            <h2 className="text-4xl font-bold mt-2">₹{analytics.totalIncome.toLocaleString("en-IN")}</h2>
          </div>
          <div className="rounded-3xl border border-rose-900/50 bg-rose-950/20 p-8 transition-all hover:bg-rose-900/30">
            <p className="text-sm text-rose-400">Total Expenses</p>
            <h2 className="text-4xl font-bold mt-2">₹{analytics.totalExpenses.toLocaleString("en-IN")}</h2>
          </div>
          <div className="rounded-3xl border border-blue-900/50 bg-blue-950/20 p-8 transition-all hover:bg-blue-900/30">
            <p className="text-sm text-blue-400">Net Balance</p>
            <h2 className="text-4xl font-bold mt-2">₹{(analytics.totalIncome - analytics.totalExpenses).toLocaleString("en-IN")}</h2>
          </div>
        </div>

        {/* --- ADDED: CSS Donut Chart --- */}
        <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-950 p-8">
          <h2 className="text-2xl font-bold mb-8">Income vs Expense Ratio</h2>
          
          <div className="flex flex-col items-center gap-10 md:flex-row md:justify-around">
            
            {/* The Donut Graphic */}
            <div 
              className="relative flex h-56 w-56 items-center justify-center rounded-full shadow-[0_0_40px_rgba(0,0,0,0.5)]"
              style={{
                // This draws the pie slices based on the percentages
                background: `conic-gradient(#10b981 0% ${analytics.incomePiePercent}%, #f43f5e ${analytics.incomePiePercent}% 100%)`
              }}
            >
              {/* This inner circle turns the Pie Chart into a modern Donut Chart */}
              <div className="h-40 w-40 rounded-full bg-slate-950 flex items-center justify-center flex-col">
                <span className="text-slate-400 text-xs uppercase tracking-wider">Net Flow</span>
                <span className={`font-bold text-lg ${analytics.totalIncome >= analytics.totalExpenses ? 'text-emerald-400' : 'text-rose-400'}`}>
                  ₹{Math.abs(analytics.totalIncome - analytics.totalExpenses).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* The Chart Legend */}
            <div className="flex w-full flex-col justify-center space-y-6 md:w-1/2">
              <div className="rounded-2xl bg-slate-900/50 p-5 border border-slate-800/50">
                <div className="mb-1 flex justify-between text-sm">
                  <span className="flex items-center gap-3 font-medium text-emerald-400">
                    <span className="h-4 w-4 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span> 
                    Income
                  </span>
                  <span className="text-lg font-bold text-white">₹{analytics.totalIncome.toLocaleString("en-IN")}</span>
                </div>
                <p className="ml-7 text-xs text-slate-400">{analytics.incomePiePercent.toFixed(1)}% of total cash flow</p>
              </div>
              
              <div className="rounded-2xl bg-slate-900/50 p-5 border border-slate-800/50">
                <div className="mb-1 flex justify-between text-sm">
                  <span className="flex items-center gap-3 font-medium text-rose-400">
                    <span className="h-4 w-4 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]"></span> 
                    Expenses
                  </span>
                  <span className="text-lg font-bold text-white">₹{analytics.totalExpenses.toLocaleString("en-IN")}</span>
                </div>
                 <p className="ml-7 text-xs text-slate-400">{analytics.expensePiePercent.toFixed(1)}% of total cash flow</p>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Monthly Spending Breakdown */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
            <h2 className="mb-8 text-2xl font-bold">Category Breakdown</h2>
            <div className="space-y-6">
              {analytics.expensesByCategory.map((item) => (
                <div key={item.category}>
                  <div className="mb-2 flex justify-between">
                    <p>{item.category}</p>
                    <p className="text-slate-400">{item.percentage}%</p>
                  </div>
                  <div className="h-3 rounded-full bg-slate-800">
                    <div className={`h-3 rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Health & Recurring */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
              <h2 className="mb-6 text-2xl font-bold">Financial Health</h2>
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <p className="text-sm text-slate-400">Savings Ratio</p>
                <h3 className="mt-1 text-3xl font-bold text-white">{analytics.savingsRatio}%</h3>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
              <h2 className="mb-6 text-2xl font-bold">Recurring Expenses</h2>
              <div className="rounded-2xl border border-rose-900/30 bg-rose-950/20 p-6">
                <p className="text-sm text-rose-400">Monthly Subscriptions & EMIs</p>
                <h3 className="mt-1 text-3xl font-bold text-white">₹{analytics.recurring.toLocaleString("en-IN")}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}