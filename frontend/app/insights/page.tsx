/*export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-black p-10 text-white">

      <h1 className="text-5xl font-bold">
        AI Insights
      </h1>

      <p className="mt-4 text-slate-400">
        AI-generated recommendations based on your spending behavior.
      </p>

      <div className="mt-10 space-y-6">

        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
          <h2 className="text-2xl font-bold text-blue-400">
            Food Spending Increased
          </h2>

          <p className="mt-4 text-slate-300">
            Your food delivery expenses increased by 28% this month.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
          <h2 className="text-2xl font-bold text-purple-400">
            Subscription Alert
          </h2>

          <p className="mt-4 text-slate-300">
            Netflix, Spotify, and YouTube Premium recurring subscriptions detected.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
          <h2 className="text-2xl font-bold text-green-400">
            Savings Improvement
          </h2>

          <p className="mt-4 text-slate-300">
            Your savings ratio improved compared to last month.
          </p>
        </div>

      </div>

    </main>
  );
}*/

"use client";

import { useState, useEffect } from "react";

export default function InsightsPage() {
  const [insights, setInsights] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("finSightTransactions");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (parsedData.length > 0) {
        generateInsights(parsedData);
      }
    }
    setIsLoaded(true);
  }, []);

  const generateInsights = (transactions: any[]) => {
    let income = 0;
    let expenses = 0;
    const categoryTotals: Record<string, number> = {};
    let subscriptionCount = 0;
    let subscriptionTotal = 0;

    transactions.forEach((tx) => {
      const amount = parseFloat(tx.amount.replace(/[^0-9.-]+/g, ""));
      const absAmount = Math.abs(amount);
      const category = tx.category;

      if (amount > 0 || tx.amount.includes('+')) {
        income += absAmount;
      } else if (amount < 0 || tx.amount.includes('-')) {
        expenses += absAmount;
        categoryTotals[category] = (categoryTotals[category] || 0) + absAmount;
        
        // Track subscriptions specifically
        if (category.toLowerCase() === "subscription") {
          subscriptionCount += 1;
          subscriptionTotal += absAmount;
        }
      }
    });

    const generated = [];

    // Insight 1: Top Spending Category (Blue)
    const categories = Object.keys(categoryTotals).map(cat => ({ name: cat, total: categoryTotals[cat] })).sort((a,b) => b.total - a.total);
    if (categories.length > 0) {
      const topCat = categories[0];
      const percent = Math.round((topCat.total / expenses) * 100);
      generated.push({
        title: `${topCat.name} Spending Focus`,
        desc: `Your highest expense is ${topCat.name}, making up ${percent}% of your total spending (₹${topCat.total.toLocaleString('en-IN')}).`,
        color: "text-blue-400"
      });
    }

    // Insight 2: Subscriptions or General Activity (Purple)
    if (subscriptionCount > 0) {
      generated.push({
        title: "Subscription Alert",
        desc: `We detected ${subscriptionCount} recurring subscription payments totaling ₹${subscriptionTotal.toLocaleString('en-IN')}.`,
        color: "text-purple-400"
      });
    } else {
      generated.push({
        title: "Activity Summary",
        desc: `Analyzed ${transactions.length} total transactions to monitor your spending habits. No recurring subscriptions detected.`,
        color: "text-purple-400"
      });
    }

    // Insight 3: Savings Health (Green or Amber)
    if (income > 0) {
      const savingsRate = Math.round(((income - expenses) / income) * 100);
      if (savingsRate > 20) {
        generated.push({
          title: "Excellent Savings",
          desc: `Great job! You are saving ${savingsRate}% of your income. Your financial health is solid.`,
          color: "text-green-400"
        });
      } else {
        generated.push({
          title: "Savings Opportunity",
          desc: `Your savings rate is ${savingsRate}%. Consider reviewing your top expenses to increase your savings.`,
          color: "text-amber-400"
        });
      }
    }

    setInsights(generated);
  };

  // Prevent UI flash during hydration
  if (!isLoaded) return <main className="min-h-screen bg-black" />;

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-5xl font-bold">
          AI Insights
        </h1>

        <p className="mt-4 text-slate-400">
          AI-generated recommendations based on your spending behavior.
        </p>

        <div className="mt-10 space-y-6">
          {insights.length > 0 ? (
            insights.map((insight, index) => (
              <div key={index} className="rounded-3xl border border-slate-800 bg-slate-950 p-8 transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-white/5">
                <h2 className={`text-2xl font-bold ${insight.color}`}>
                  {insight.title}
                </h2>
                <p className="mt-4 text-slate-300 text-lg">
                  {insight.desc}
                </p>
              </div>
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/50 p-12 text-center">
              <div className="text-4xl mb-4">📄</div>
              <h2 className="text-xl font-semibold text-slate-300">No Data Available</h2>
              <p className="mt-2 text-slate-500">
                Please upload a bank statement on the Home page to generate your personalized AI insights.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}