"use client";

import { useState, useEffect, useMemo } from "react";

const categoryColors: Record<string, string> = {
  Food: "bg-blue-500",
  Shopping: "bg-purple-500",
  Travel: "bg-green-500",
  Subscription: "bg-rose-500",
  Income: "bg-emerald-500"
};

export default function AnalyticsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Read the saved data from the Transactions page
  useEffect(() => {
    const savedData = localStorage.getItem("finSightTransactions");
    if (savedData) {
      setTransactions(JSON.parse(savedData));
    }
    setIsLoaded(true);
  }, []);

  // Calculate metrics dynamically based on whatever is in LocalStorage
  const analytics = useMemo(() => {
    let totalIncome = 0;
    let totalExpenses = 0;
    let recurring = 0;
    const categoryTotals: Record<string, number> = {};

    transactions.forEach((tx) => {
      const amountValue = Number(tx.amount.replace(/[^0-9.-]+/g, ""));

      if (amountValue > 0) {
        totalIncome += amountValue;
      } else {
        const expense = Math.abs(amountValue);
        totalExpenses += expense;
        
        if (categoryTotals[tx.category]) {
          categoryTotals[tx.category] += expense;
        } else {
          categoryTotals[tx.category] = expense;
        }

        if (tx.category === "Subscription" || tx.category === "EMI") {
          recurring += expense;
        }
      }
    });

    const savingsRatio = totalIncome > 0 
      ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100) 
      : 0;

    const expensesByCategory = Object.keys(categoryTotals)
      .filter(cat => cat !== "Income") // Don't graph income as an expense
      .map((category) => {
        const amount = categoryTotals[category];
        const percentage = totalExpenses > 0 ? Math.round((amount / totalExpenses) * 100) : 0;
        return {
          category,
          amount,
          percentage,
          color: categoryColors[category] || "bg-indigo-500", 
        };
      }).sort((a, b) => b.percentage - a.percentage); 

    return { totalIncome, totalExpenses, savingsRatio, recurring, expensesByCategory };
  }, [transactions]); // Recalculates whenever transactions change

  if (!isLoaded) return <div className="min-h-screen bg-black" />;

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold md:text-5xl">Analytics</h1>
        <p className="mt-4 text-slate-400">
          Expense breakdown and financial trends updated in real-time.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          
          {/* Monthly Spending Panel */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
            <h2 className="text-2xl font-bold">Monthly Spending</h2>
            <div className="mt-10 space-y-6">
              
              {analytics.expensesByCategory.map((item) => (
                <div key={item.category}>
                  <div className="mb-2 flex justify-between font-medium">
                    <p>{item.category}</p>
                    <p className="text-slate-300">{item.percentage}% <span className="text-slate-500 text-sm">(₹{item.amount.toLocaleString("en-IN")})</span></p>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${item.percentage}%` }} 
                    ></div>
                  </div>
                </div>
              ))}

              {analytics.expensesByCategory.length === 0 && (
                <p className="py-4 text-center text-slate-500">No expense data to display.</p>
              )}

            </div>
          </div>

          {/* Financial Health Panel */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
            <h2 className="text-2xl font-bold">Financial Health</h2>
            
            <div className="mt-10">
              <div className="rounded-2xl border border-slate-800/50 bg-slate-900 p-6 transition-all hover:border-slate-700">
                <p className="text-sm font-medium text-slate-400">Savings Ratio</p>
                <h3 className={`mt-2 text-4xl font-bold tracking-tight ${analytics.savingsRatio > 20 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {analytics.savingsRatio}%
                </h3>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-800/50 bg-slate-900 p-6 transition-all hover:border-slate-700">
                <p className="text-sm font-medium text-slate-400">Recurring Expenses</p>
                <h3 className="mt-2 text-4xl font-bold tracking-tight text-purple-400">
                  ₹{analytics.recurring.toLocaleString("en-IN")}
                </h3>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-800/50 bg-slate-900 p-6 transition-all hover:border-slate-700">
                <p className="text-sm font-medium text-slate-400">Total Expenses</p>
                <h3 className="mt-2 text-4xl font-bold tracking-tight text-rose-400">
                  ₹{analytics.totalExpenses.toLocaleString("en-IN")}
                </h3>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}