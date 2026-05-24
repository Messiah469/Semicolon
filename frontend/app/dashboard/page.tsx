"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CATEGORY_COLORS = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-emerald-500",
  "bg-rose-500",
  "bg-amber-500",
  "bg-cyan-500",
];

export default function DashboardPage() {
  // Analytics State
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [score, setScore] = useState(0);
  const [expenseCategories, setExpenseCategories] = useState<any[]>([]);
  
  // AI Insights State
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  
  // Transactions State
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);

  const savings = income - expenses;

  // On initial load, check if there's already data in LocalStorage to populate the dashboard
  useEffect(() => {
    const savedData = localStorage.getItem("finSightTransactions");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (parsedData.length > 0) {
        processTransactionData(parsedData);
      }
    }
  }, []);

  // Centralized function to calculate all dashboard metrics from an array of transactions
  const processTransactionData = (transactions: any[]) => {
    let calculatedIncome = 0;
    let calculatedExpenses = 0;
    const categoryTotals: Record<string, number> = {};

    transactions.forEach((tx) => {
      const amount = parseFloat(tx.amount.replace(/[^0-9.-]+/g, ""));
      const absAmount = Math.abs(amount);
      const category = tx.category;

      if (amount > 0 || tx.amount.includes('+')) {
        calculatedIncome += absAmount;
      } else if (amount < 0 || tx.amount.includes('-')) {
        calculatedExpenses += absAmount;
        
        // Track totals per category
        if (categoryTotals[category]) {
          categoryTotals[category] += absAmount;
        } else {
          categoryTotals[category] = absAmount;
        }
      }
    });

    setIncome(calculatedIncome);
    setExpenses(calculatedExpenses);
    
    // 1. Calculate Score
    const ratio = calculatedExpenses > 0 ? (calculatedIncome / calculatedExpenses) : 2;
    const generatedScore = Math.min(100, Math.floor(50 + (ratio * 15)));
    setScore(generatedScore);

    // 2. Calculate Breakdown Percentages
    const newCategories = Object.keys(categoryTotals).map((cat, index) => {
      const percentage = calculatedExpenses > 0 
        ? Math.round((categoryTotals[cat] / calculatedExpenses) * 100) 
        : 0;
      return {
        name: cat,
        percentage: percentage,
        color: CATEGORY_COLORS[index % CATEGORY_COLORS.length] 
      };
    }).sort((a, b) => b.percentage - a.percentage);
    setExpenseCategories(newCategories);

    // 3. Generate Dynamic AI Insights
    const newInsights = [];
    if (newCategories.length > 0) {
      newInsights.push(`Your highest spending category is ${newCategories[0].name} (${newCategories[0].percentage}% of expenses).`);
    }
    if (calculatedIncome > 0) {
      const savingsRate = Math.round(((calculatedIncome - calculatedExpenses) / calculatedIncome) * 100);
      if (savingsRate > 20) {
        newInsights.push(`Great job! You are saving ${savingsRate}% of your income.`);
      } else {
        newInsights.push(`Your savings rate is ${savingsRate}%. Try reducing non-essential expenses.`);
      }
    }
    newInsights.push(`Analyzed ${transactions.length} total transactions from your statement.`);
    setAiInsights(newInsights);

    // 4. Update Recent Transactions Table (Show max 4)
    setRecentTransactions(transactions.slice(0, 4));
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex">
        
        {/* Sidebar */}
        <aside className="flex min-h-screen w-72 flex-col border-r border-slate-800 bg-slate-950 p-8">
          <Link href="/" className="w-fit transition-transform hover:scale-105 active:scale-95">
            <h1 className="text-3xl font-bold hover:text-blue-400 transition-colors">FinSight AI</h1>
          </Link>

          <div className="mt-16 space-y-4">
            <button className="w-full rounded-2xl bg-blue-600 px-5 py-4 text-left text-lg font-medium">
              Dashboard
            </button>
            <Link href="/transactions" className="block w-full rounded-2xl px-5 py-4 text-left text-lg text-slate-400 hover:bg-slate-900">
              Transactions
            </Link>
            <Link href="/analytics" className="block w-full rounded-2xl px-5 py-4 text-left text-lg text-slate-400 hover:bg-slate-900">
              Analytics
            </Link>
            <Link href="/insights" className="block w-full rounded-2xl px-5 py-4 text-left text-lg text-slate-400 hover:bg-slate-900">
              AI Insights
            </Link>
            {/* UPDATED: Changed Settings to Downloads */}
            <Link href="/settings" className="block w-full rounded-2xl px-5 py-4 text-left text-lg text-slate-400 hover:bg-slate-900">
              Downloads
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1 p-10">
          
          <div className="mb-12">
            <h2 className="text-5xl font-bold">Financial Dashboard</h2>
            <p className="mt-3 text-lg text-slate-400">
              AI-powered analysis of your financial activity.
            </p>
          </div>

          {/* Metric Cards */}
          <div className="grid gap-6 md:grid-cols-4">
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
              <p className="text-slate-400">Income</p>
              <div className="mt-4 flex items-center text-4xl font-bold text-emerald-400">
                <span>₹{income.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
              <p className="text-slate-400">Expenses</p>
              <div className="mt-4 flex items-center text-4xl font-bold text-rose-400">
                <span>₹{expenses.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
              <p className="text-slate-400">Savings</p>
              <div className="mt-4 flex items-center text-4xl font-bold text-blue-400">
                <span>₹{savings.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
              <p className="text-slate-400">Financial Score</p>
              <div className="mt-4 flex items-baseline text-4xl font-bold text-purple-400">
                <span>{score}</span>
                <span className="text-3xl ml-1 text-purple-400/50">/100</span>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            
            {/* Dynamic Expense Breakdown */}
            <div className="rounded-[32px] border border-slate-800 bg-slate-950 p-10">
              <h3 className="text-3xl font-bold">Expense Breakdown</h3>
              <div className="mt-10 space-y-6">
                {expenseCategories.length > 0 ? (
                  expenseCategories.map((category, index) => (
                    <div key={index}>
                      <div className="mb-2 flex justify-between">
                        <p>{category.name}</p>
                        <p>{category.percentage}%</p>
                      </div>
                      <div className="h-3 rounded-full bg-slate-800">
                        <div 
                          className={`h-3 rounded-full ${category.color}`} 
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 italic">Upload a statement on the home page to see your breakdown.</p>
                )}
              </div>
            </div>

            {/* Dynamic AI Insights */}
            <div className="rounded-[32px] border border-slate-800 bg-slate-950 p-10">
              <h3 className="text-3xl font-bold">AI Insights</h3>
              <div className="mt-8 space-y-5">
                {aiInsights.length > 0 ? (
                  aiInsights.map((insight, index) => (
                    <div key={index} className="rounded-2xl bg-slate-900 p-5 text-slate-300">
                      {insight}
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 italic">Awaiting data to generate insights...</p>
                )}
              </div>
            </div>

          </div>

          {/* Dynamic Recent Transactions */}
          <div className="mt-10 rounded-[32px] border border-slate-800 bg-slate-950 p-10">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold">Recent Transactions</h3>
              <Link href="/transactions" className="rounded-xl border border-slate-700 px-5 py-2 hover:bg-slate-900">
                View All
              </Link>
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800">
              <table className="w-full">
                <thead className="bg-slate-900 text-slate-400">
                  <tr>
                    <th className="px-6 py-4 text-left">Merchant</th>
                    <th className="px-6 py-4 text-left">Category</th>
                    <th className="px-6 py-4 text-left">Amount</th>
                    <th className="px-6 py-4 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.length > 0 ? (
                    recentTransactions.map((tx) => (
                      <tr key={tx.id} className="border-t border-slate-800">
                        <td className="px-6 py-5">{tx.merchant}</td>
                        <td className={`px-6 py-5 ${tx.category.toLowerCase() === 'income' ? 'text-emerald-400' : 'text-slate-300'}`}>
                          {tx.category}
                        </td>
                        <td className={`px-6 py-5 ${tx.amount.includes('-') ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {tx.amount.includes('-') || tx.amount.includes('+') ? tx.amount : `₹${tx.amount}`}
                        </td>
                        <td className="px-6 py-5 text-slate-400">{tx.date}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-slate-500 italic">
                        No recent transactions found. Upload a statement on the home page.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}