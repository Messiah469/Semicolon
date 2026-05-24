"use client";

import { useState, useEffect } from "react";

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from LocalStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("finSightTransactions");
    if (savedData) {
      setTransactions(JSON.parse(savedData));
    } else {
      setTransactions([]); 
    }
    setIsLoaded(true);
  }, []);

  // Save data to LocalStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("finSightTransactions", JSON.stringify(transactions));
    }
  }, [transactions, isLoaded]);

  // Handle Edit (Smart Auto-Updating Status)
  const handleTransactionChange = (id: number, field: string, value: string) => {
    setTransactions((prev) =>
      prev.map((tx) => {
        if (tx.id !== id) return tx; // Skip if it's not the row we're editing

        const updatedTx = { ...tx, [field]: value };

       
        if (field === "amount") {
      
          if (value.includes("+") || parseFloat(value) > 0) {
            updatedTx.status = "Credited";
          } 
          
          else if (value.includes("-") || parseFloat(value) < 0) {
            updatedTx.status = "Debited";
          }
        }

        return updatedTx;
      })
    );
  };

  // Handle Delete
  const handleDelete = (id: number) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  // Handle Add New Row
  const handleAddRow = () => {
    const today = new Date();
  
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    
    const newTx = {
      id: Date.now(), // Generate a unique ID
      merchant: "New Merchant",
      category: "Food",
      amount: "-0",
      status: "Debited",
      date: formattedDate,
    };
    setTransactions([newTx, ...transactions]); 
  };

  const filteredTransactions = transactions.filter((tx) =>
    tx.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Prevent hydration mismatch screen flash
  if (!isLoaded) return <div className="min-h-screen bg-black" />; 

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        
        <div className="mb-8 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Transactions</h1>
            <p className="mt-2 text-sm text-slate-400 md:text-base">
              Add, edit, or delete transactions to see real-time analytics updates.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-800 bg-slate-900/50 px-6 py-3 text-sm text-white placeholder-slate-500 backdrop-blur-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all md:w-80"
            />
            <button 
              onClick={handleAddRow}
              className="whitespace-nowrap rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500 active:scale-95"
            >
              + Add Transaction
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/50 shadow-xl backdrop-blur-md">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm md:text-base">
              <thead className="border-b border-slate-800 bg-slate-900/80 text-slate-400">
                <tr>
                  <th className="px-6 py-5 font-medium tracking-wide">Merchant</th>
                  <th className="px-6 py-5 font-medium tracking-wide">Category</th>
                  <th className="px-6 py-5 font-medium tracking-wide">Amount</th>
                  <th className="px-6 py-5 font-medium tracking-wide">Status</th>
                  <th className="px-6 py-5 font-medium tracking-wide">Date</th>
                  <th className="px-6 py-5 font-medium tracking-wide text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="group transition-colors hover:bg-white/[0.02]">
                      <td className="px-2 py-2">
                        <input
                          type="text"
                          value={tx.merchant}
                          onChange={(e) => handleTransactionChange(tx.id, "merchant", e.target.value)}
                          className="w-full rounded-md border-b border-transparent bg-transparent px-4 py-3 outline-none transition-all focus:border-blue-500/50 focus:bg-blue-500/5"
                        />
                      </td>
                      <td className="px-2 py-2">
                        <input
                          type="text"
                          value={tx.category}
                          onChange={(e) => handleTransactionChange(tx.id, "category", e.target.value)}
                          className={`w-full rounded-md border-b border-transparent bg-transparent px-4 py-3 outline-none transition-all focus:border-blue-500/50 focus:bg-blue-500/5 ${
                            tx.category.toLowerCase() === "food" ? "text-blue-400" :
                            tx.category.toLowerCase() === "shopping" ? "text-purple-400" :
                            tx.category.toLowerCase() === "income" ? "text-emerald-400" :
                            "text-slate-300"
                          }`}
                        />
                      </td>
                      <td className="px-2 py-2">
                        <input
                          type="text"
                          value={tx.amount}
                          onChange={(e) => handleTransactionChange(tx.id, "amount", e.target.value)}
                          className={`w-full rounded-md border-b border-transparent bg-transparent px-4 py-3 outline-none transition-all focus:border-blue-500/50 focus:bg-blue-500/5 ${
                            tx.amount.includes("+") || parseFloat(tx.amount) > 0 ? "text-emerald-400" : "text-rose-400"
                          }`}
                        />
                      </td>
                      <td className="px-2 py-2">
                        <input
                          type="text"
                          value={tx.status}
                          onChange={(e) => handleTransactionChange(tx.id, "status", e.target.value)}
                          className={`w-full rounded-md border-b border-transparent bg-transparent px-4 py-3 outline-none transition-all focus:border-blue-500/50 focus:bg-blue-500/5 ${
                            tx.status.toLowerCase() === "pending" ? "text-amber-400" : 
                            tx.status.toLowerCase() === "debited" ? "text-rose-400" : 
                            tx.status.toLowerCase() === "credited" ? "text-emerald-400" : 
                            "text-slate-300"
                          }`}
                        />
                      </td>
                      <td className="px-2 py-2">
                        <input
                          type="text"
                          value={tx.date}
                          onChange={(e) => handleTransactionChange(tx.id, "date", e.target.value)}
                          className="w-full rounded-md border-b border-transparent bg-transparent px-4 py-3 text-slate-400 outline-none transition-all hover:text-slate-300 focus:border-blue-500/50 focus:bg-blue-500/5"
                        />
                      </td>
                      {/* Delete Button */}
                      <td className="px-4 py-2 text-center">
                        <button 
                          onClick={() => handleDelete(tx.id)}
                          className="rounded-lg bg-rose-500/10 px-3 py-1.5 text-sm font-medium text-rose-500 opacity-0 transition-all hover:bg-rose-500/20 group-hover:opacity-100"
                          title="Delete Transaction"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      No transactions found. Upload a statement to get started.
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