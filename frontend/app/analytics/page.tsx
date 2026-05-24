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
    
    // Dynamic scaling for the bar graph
    const maxVal = Math.max(totalIncome, totalExpenses) || 1;
    const incomePercent = (totalIncome / maxVal) * 100;
    const expensePercent = (totalExpenses / maxVal) * 100;

    const expensesByCategory = Object.keys(categoryTotals)
      .filter(cat => cat !== "Income")
      .map((category) => ({
        category,
        amount: categoryTotals[category],
        percentage: totalExpenses > 0 ? Math.round((categoryTotals[category] / totalExpenses) * 100) : 0,
        color: categoryColors[category] || "bg-indigo-500",
      })).sort((a, b) => b.percentage - a.percentage);

    return { totalIncome, totalExpenses, savingsRatio, recurring, expensesByCategory, incomePercent, expensePercent };
  }, [transactions]);

  if (!isLoaded) return <div className="min-h-screen bg-black" />;

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">Analytics</h1>
        
        {/* Income vs Expense Summary Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-emerald-900/50 bg-emerald-950/20 p-8">
            <p className="text-sm text-emerald-400">Total Income</p>
            <h2 className="text-4xl font-bold mt-2">₹{analytics.totalIncome.toLocaleString("en-IN")}</h2>
          </div>
          <div className="rounded-3xl border border-rose-900/50 bg-rose-950/20 p-8">
            <p className="text-sm text-rose-400">Total Expenses</p>
            <h2 className="text-4xl font-bold mt-2">₹{analytics.totalExpenses.toLocaleString("en-IN")}</h2>
          </div>
          <div className="rounded-3xl border border-blue-900/50 bg-blue-950/20 p-8">
            <p className="text-sm text-blue-400">Net Balance</p>
            <h2 className="text-4xl font-bold mt-2">₹{(analytics.totalIncome - analytics.totalExpenses).toLocaleString("en-IN")}</h2>
          </div>
        </div>

        {/* --- ADDED: Visual Bar Graph --- */}
        <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-950 p-8">
          <h2 className="text-xl font-semibold mb-6">Income vs Expense Ratio</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-emerald-400 font-medium">Income</span>
                <span className="font-bold">₹{analytics.totalIncome.toLocaleString("en-IN")}</span>
              </div>
              <div className="h-4 w-full rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${analytics.incomePercent}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-rose-400 font-medium">Expenses</span>
                <span className="font-bold">₹{analytics.totalExpenses.toLocaleString("en-IN")}</span>
              </div>
              <div className="h-4 w-full rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-rose-500 transition-all duration-1000" style={{ width: `${analytics.expensePercent}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Monthly Spending Breakdown */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
            <h2 className="text-2xl font-bold mb-8">Category Breakdown</h2>
            <div className="space-y-6">
              {analytics.expensesByCategory.map((item) => (
                <div key={item.category}>
                  <div className="flex justify-between mb-2">
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
              <h2 className="text-2xl font-bold mb-6">Financial Health</h2>
              <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
                <p className="text-sm text-slate-400">Savings Ratio</p>
                <h3 className="text-3xl font-bold mt-1">{analytics.savingsRatio}%</h3>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
              <h2 className="text-2xl font-bold mb-6">Recurring Expenses</h2>
              <div className="p-6 bg-rose-950/20 border border-rose-900/30 rounded-2xl">
                <p className="text-sm text-rose-400">Monthly Subscriptions & EMIs</p>
                <h3 className="text-3xl font-bold mt-1">₹{analytics.recurring.toLocaleString("en-IN")}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}