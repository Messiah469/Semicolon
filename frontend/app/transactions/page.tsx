/*
export default function TransactionsPage() {
  return (
    <main className="min-h-screen bg-black p-10 text-white">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-5xl font-bold">
            Transactions
          </h1>

          <p className="mt-4 text-slate-400">
            View and manage all categorized transactions.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search transactions..."
          className="rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 outline-none"
        />

      </div>

      <div className="mt-10 overflow-hidden rounded-3xl border border-slate-800">

        <table className="w-full">

          <thead className="bg-slate-900 text-slate-400">

            <tr>
              <th className="px-6 py-5 text-left">
                Merchant
              </th>

              <th className="px-6 py-5 text-left">
                Category
              </th>

              <th className="px-6 py-5 text-left">
                Amount
              </th>

              <th className="px-6 py-5 text-left">
                Status
              </th>

              <th className="px-6 py-5 text-left">
                Date
              </th>
            </tr>

          </thead>

          <tbody>

            <tr className="border-t border-slate-800">
              <td className="px-6 py-5">
                Swiggy
              </td>

              <td className="px-6 py-5 text-blue-400">
                Food
              </td>

              <td className="px-6 py-5 text-red-400">
                -₹450
              </td>

              <td className="px-6 py-5 text-green-400">
                Completed
              </td>

              <td className="px-6 py-5 text-slate-400">
                12 May
              </td>
            </tr>

            <tr className="border-t border-slate-800">
              <td className="px-6 py-5">
                Amazon
              </td>

              <td className="px-6 py-5 text-purple-400">
                Shopping
              </td>

              <td className="px-6 py-5 text-red-400">
                -₹2,499
              </td>

              <td className="px-6 py-5 text-green-400">
                Completed
              </td>

              <td className="px-6 py-5 text-slate-400">
                11 May
              </td>
            </tr>

            <tr className="border-t border-slate-800">
              <td className="px-6 py-5">
                Salary
              </td>

              <td className="px-6 py-5 text-green-400">
                Income
              </td>

              <td className="px-6 py-5 text-green-400">
                +₹50,000
              </td>

              <td className="px-6 py-5 text-green-400">
                Credited
              </td>

              <td className="px-6 py-5 text-slate-400">
                10 May
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </main>
  );
}
*/

"use client";

import { useState } from "react";

// 1. Move your static data into an array of objects so we can filter it
const initialTransactions = [
  { id: 1, merchant: "Swiggy", category: "Food", amount: -450, status: "Completed", date: "12 May" },
  { id: 2, merchant: "Amazon", category: "Shopping", amount: -2499, status: "Completed", date: "11 May" },
  { id: 3, merchant: "Salary", category: "Income", amount: 50000, status: "Credited", date: "10 May" },
  { id: 4, merchant: "Netflix", category: "Subscription", amount: -649, status: "Completed", date: "09 May" },
  { id: 5, merchant: "Uber", category: "Travel", amount: -320, status: "Pending", date: "08 May" },
];

export default function TransactionsPage() {
  // 2. Set up state for the search bar
  const [searchQuery, setSearchQuery] = useState("");

  // 3. Filter the transactions based on what the user types (checks merchant or category)
  const filteredTransactions = initialTransactions.filter((tx) =>
    tx.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        
        {/* Header Section: Responsive flexbox stacks on mobile, side-by-side on desktop */}
        <div className="mb-8 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Transactions</h1>
            <p className="mt-2 text-slate-400">
              View and manage all categorized transactions.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-80">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-800 bg-slate-900 px-6 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Table Section: overflow-x-auto allows horizontal scrolling on small phones */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
          <div className="overflow-x-auto">
            
            {/* min-w-[700px] ensures the table never squishes too small on mobile */}
            <table className="w-full min-w-[700px] text-left">
              <thead className="bg-slate-900 text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Merchant</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                
                {/* 4. Map over our FILTERED data to render rows dynamically */}
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="transition-colors hover:bg-slate-900/50">
                      <td className="px-6 py-5">{tx.merchant}</td>
                      
                      {/* Dynamic Category Colors */}
                      <td className={`px-6 py-5 ${
                        tx.category === "Food" ? "text-blue-400" :
                        tx.category === "Shopping" ? "text-purple-400" :
                        tx.category === "Income" ? "text-green-400" :
                        "text-slate-300"
                      }`}>
                        {tx.category}
                      </td>
                      
                      {/* Dynamic Amount Colors (Green for positive, Red for negative) */}
                      <td className={`px-6 py-5 ${tx.amount > 0 ? "text-green-400" : "text-red-400"}`}>
                        {tx.amount > 0 ? `+₹${tx.amount.toLocaleString('en-IN')}` : `-₹${Math.abs(tx.amount).toLocaleString('en-IN')}`}
                      </td>
                      
                      <td className="px-6 py-5 text-green-500">{tx.status}</td>
                      <td className="px-6 py-5 text-slate-400">{tx.date}</td>
                    </tr>
                  ))
                ) : (
                  /* Empty state if search returns no results */
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                      No transactions found for "{searchQuery}"
                    </td>
                  </tr>
                )}
                
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}