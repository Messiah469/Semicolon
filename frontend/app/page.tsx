"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  FileText,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertCircle,
  RefreshCw,
  CreditCard,
  Wallet,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// --- MOCK DATA (INDIAN CONTEXT) ---
const MOCK_METRICS = {
  balance: 142500,
  income: 85000,
  expenses: 42500,
  healthScore: 78,
  balanceTrend: "+12.5%",
  incomeTrend: "+5.2%",
  expenseTrend: "-2.4%",
};

const MOCK_CASHFLOW = [
  { date: "01 May", income: 0, expense: 15000 },
  { date: "05 May", income: 85000, expense: 5000 },
  { date: "10 May", income: 0, expense: 2500 },
  { date: "15 May", income: 0, expense: 8000 },
  { date: "20 May", income: 0, expense: 3000 },
  { date: "25 May", income: 0, expense: 9000 },
];

const MOCK_CATEGORIES = [
  { name: "Rent & Utilities", value: 18000, color: "#3b82f6" }, // blue
  { name: "Food & Dining", value: 12000, color: "#f97316" }, // orange
  { name: "Shopping", value: 6500, color: "#ec4899" }, // pink
  { name: "Transport", value: 3000, color: "#8b5cf6" }, // purple
  { name: "Subscriptions", value: 3000, color: "#14b8a6" }, // teal
];

const MOCK_TRANSACTIONS = [
  { id: "tx1", date: "2024-05-24", narration: "UPI/Zomato/Dinner", amount: 850, type: "debit", category: "Food" },
  { id: "tx2", date: "2024-05-23", narration: "DMRC Smart Card Recharge", amount: 500, type: "debit", category: "Transport" },
  { id: "tx3", date: "2024-05-22", narration: "UPI/Nikhil/Split Bill", amount: 1200, type: "debit", category: "Transfer" },
  { id: "tx4", date: "2024-05-20", narration: "Amazon India", amount: 4500, type: "debit", category: "Shopping" },
  { id: "tx5", date: "2024-05-18", narration: "Netflix India", amount: 649, type: "debit", category: "Subscription" },
  { id: "tx6", date: "2024-05-15", narration: "Zerodha Broking Ltd", amount: 5000, type: "debit", category: "Investment" },
  { id: "tx7", date: "2024-05-05", narration: "NEFT/TechCorp/Salary", amount: 85000, type: "credit", category: "Income" },
  { id: "tx8", date: "2024-05-01", narration: "UPI/Landlord/Rent May", amount: 15000, type: "debit", category: "Rent" },
];

const MOCK_INSIGHTS = {
  summary: [
    "You spend 28% of your income on Food & Dining, which is 10% higher than last month.",
    "Detected 3 recurring subscriptions totaling ₹1,450/month.",
    "Healthy savings rate! You've retained 50% of your income this month.",
  ],
  recommendation: "Consider moving ₹20,000 to your Zerodha account to maximize your current idle balance.",
  recurring: [
    { name: "Netflix India", amount: 649, date: "18th" },
    { name: "Swiggy One", amount: 299, date: "12th" },
    { name: "Cult.fit", amount: 502, date: "5th" },
  ],
  unusual: [
    { name: "Amazon India", amount: 4500, reason: "3x higher than average shopping" },
  ],
};

// --- UTILS ---
const formatINR = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

// --- SHADCN-LIKE UI COMPONENTS ---
const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden", className)}>
    {children}
  </div>
);

const Button = ({ children, onClick, variant = "primary", className, disabled }: any) => {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none";
  const variants: any = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm px-4 py-2",
    outline: "border border-slate-200 bg-white hover:bg-slate-100 text-slate-900 px-4 py-2",
    ghost: "hover:bg-slate-100 text-slate-700 px-4 py-2",
    ai: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90 shadow-md px-6 py-3 text-base font-semibold",
  };
  return (
    <button onClick={onClick} disabled={disabled} className={cn(base, variants[variant], className)}>
      {children}
    </button>
  );
};

const Badge = ({ children, category }: { children: React.ReactNode; category: string }) => {
  const getColors = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "food": return "bg-orange-100 text-orange-700 border-orange-200";
      case "rent": return "bg-blue-100 text-blue-700 border-blue-200";
      case "transport": return "bg-purple-100 text-purple-700 border-purple-200";
      case "subscription": return "bg-teal-100 text-teal-700 border-teal-200";
      case "investment": return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case "shopping": return "bg-pink-100 text-pink-700 border-pink-200";
      case "income": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border", getColors(category))}>
      {children}
    </span>
  );
};

// --- MAIN APPLICATION COMPONENT ---
export default function BankAnalyzer() {
  const [appState, setAppState] = useState<"landing" | "processing" | "dashboard">("landing");
  const [processingStep, setProcessingStep] = useState(0);

  // Handle fake processing steps
  useEffect(() => {
    if (appState === "processing") {
      const steps = 3;
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        setProcessingStep(currentStep);
        if (currentStep >= steps) {
          clearInterval(interval);
          setTimeout(() => setAppState("dashboard"), 800);
        }
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [appState]);

  const processingMessages = [
    "Securely reading statement...",
    "Extracting transactions...",
    "AI categorizing expenses...",
    "Generating financial intelligence...",
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-slate-900 p-1.5 rounded-lg">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">FinSight <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">AI</span></span>
        </div>
        {appState === "dashboard" && (
          <Button variant="outline" onClick={() => setAppState("landing")}>
            Upload New
          </Button>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          
          {/* STATE 1: LANDING */}
          {appState === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center min-h-[70vh] text-center"
            >
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
                Turn Your Bank Statement <br className="hidden md:block" />
                into <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Financial Intelligence.</span>
              </h1>
              <p className="text-lg text-slate-500 max-w-2xl mb-10">
                Upload your PDF or CSV bank statement. Our AI instantly categorizes transactions, spots hidden fees, and gives you actionable wealth-building insights.
              </p>

              <div className="w-full max-w-xl bg-white border-2 border-dashed border-slate-300 rounded-2xl hover:border-indigo-400 hover:bg-indigo-50/50 transition-all cursor-pointer p-12 flex flex-col items-center justify-center shadow-sm group">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-1">Drag & Drop your statement</h3>
                <p className="text-sm text-slate-500 mb-6">Supports PDF, CSV (Max 10MB)</p>
                <Button variant="outline" className="pointer-events-none">Select File</Button>
              </div>

              <div className="mt-8 flex items-center gap-4 text-sm text-slate-500">
                <span className="h-px w-12 bg-slate-200"></span>
                OR
                <span className="h-px w-12 bg-slate-200"></span>
              </div>

              <div className="mt-6">
                <Button variant="ai" onClick={() => setAppState("processing")}>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Try with Demo Data
                </Button>
              </div>
            </motion.div>
          )}

          {/* STATE 2: PROCESSING */}
          {appState === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex flex-col items-center justify-center min-h-[70vh]"
            >
              <div className="relative w-24 h-24 mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-4 border-slate-100 border-t-indigo-500"
                />
                <div className="absolute inset-0 flex items-center justify-center text-indigo-500">
                  <Sparkles className="w-8 h-8" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">Analyzing Finances</h2>
              <div className="h-6 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={processingStep}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="text-slate-500"
                  >
                    {processingMessages[Math.min(processingStep, processingMessages.length - 1)]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* STATE 3: DASHBOARD */}
          {appState === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
              className="space-y-6"
            >
              {/* Row 1: KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "Available Balance", amount: formatINR(MOCK_METRICS.balance), trend: MOCK_METRICS.balanceTrend, icon: Wallet, color: "text-slate-900" },
                  { title: "Total Income", amount: formatINR(MOCK_METRICS.income), trend: MOCK_METRICS.incomeTrend, icon: TrendingUp, color: "text-emerald-600" },
                  { title: "Total Expenses", amount: formatINR(MOCK_METRICS.expenses), trend: MOCK_METRICS.expenseTrend, icon: TrendingDown, color: "text-rose-600" },
                  { title: "Financial Health", amount: `${MOCK_METRICS.healthScore}/100`, trend: "Good Standing", icon: Activity, color: "text-indigo-600" },
                ].map((kpi, idx) => (
                  <Card key={idx} className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-slate-500">{kpi.title}</h3>
                      <div className={`p-2 rounded-md bg-slate-50 ${kpi.color}`}>
                        <kpi.icon className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-2xl font-bold ${kpi.color}`}>{kpi.amount}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                      {kpi.trend.includes('+') ? <TrendingUp className="w-3 h-3 text-emerald-500" /> : 
                       kpi.trend.includes('-') ? <TrendingDown className="w-3 h-3 text-rose-500" /> : null}
                      {kpi.trend} vs last month
                    </p>
                  </Card>
                ))}
              </div>

              {/* Row 2: AI Summary Hero */}
              <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
                <div className="bg-white rounded-[14px] p-6 sm:p-8 relative overflow-hidden">
                  {/* Decorative background blob */}
                  <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-2 text-indigo-600 font-semibold mb-2">
                        <Sparkles className="w-5 h-5" />
                        <h2>AI Intelligence Report</h2>
                      </div>
                      <ul className="space-y-3">
                        {MOCK_INSIGHTS.summary.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-slate-700 leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="w-full lg:w-1/3 bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-2">Smart Action</h4>
                      <p className="text-sm text-slate-800 font-medium mb-4">
                        {MOCK_INSIGHTS.recommendation}
                      </p>
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                        Move Funds Now <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Charts & Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Cash Flow Chart */}
                <Card className="p-6 lg:col-span-2">
                  <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-slate-400" /> Cash Flow Overview
                  </h3>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={MOCK_CASHFLOW} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => `₹${val/1000}k`} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          formatter={(value: number) => formatINR(value)}
                        />
                        <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                        <Area type="monotone" dataKey="expense" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                {/* Category Breakdown */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-slate-400" /> Spending by Category
                  </h3>
                  <div className="h-[220px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={MOCK_CATEGORIES}
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                        >
                          {MOCK_CATEGORIES.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: number) => formatINR(value)}
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-sm text-slate-500">Expenses</span>
                      <span className="text-lg font-bold text-slate-900">{formatINR(MOCK_METRICS.expenses)}</span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {MOCK_CATEGORIES.slice(0,3).map((cat, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{backgroundColor: cat.color}} />
                          <span className="text-slate-600">{cat.name}</span>
                        </div>
                        <span className="font-medium text-slate-900">{formatINR(cat.value)}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Row 4: Insights Sidebar & Table */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Insights Sidebar */}
                <div className="space-y-6">
                  <Card className="p-5">
                    <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-wide">
                      <RefreshCw className="w-4 h-4 text-indigo-500" /> Recurring Payments
                    </h3>
                    <div className="space-y-4">
                      {MOCK_INSIGHTS.recurring.map((item, i) => (
                        <div key={i} className="flex justify-between items-center border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                          <div>
                            <p className="font-medium text-slate-800 text-sm">{item.name}</p>
                            <p className="text-xs text-slate-500">Billed on {item.date}</p>
                          </div>
                          <span className="font-semibold text-slate-900">{formatINR(item.amount)}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-5 bg-rose-50/50 border-rose-100">
                    <h3 className="text-sm font-bold text-rose-700 mb-4 flex items-center gap-2 uppercase tracking-wide">
                      <AlertCircle className="w-4 h-4" /> Unusual Activity
                    </h3>
                    {MOCK_INSIGHTS.unusual.map((item, i) => (
                      <div key={i} className="bg-white p-3 rounded-lg border border-rose-100 shadow-sm">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-semibold text-slate-900 text-sm">{item.name}</p>
                          <span className="font-bold text-rose-600">{formatINR(item.amount)}</span>
                        </div>
                        <p className="text-xs text-rose-600">{item.reason}</p>
                      </div>
                    ))}
                  </Card>
                </div>

                {/* Smart Transaction Table */}
                <Card className="lg:col-span-2 flex flex-col">
                  <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <FileText className="w-5 h-5 text-slate-400" /> Smart Transactions
                    </h3>
                    <Button variant="ghost" className="text-sm text-indigo-600 hover:text-indigo-700">View All</Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                        <tr>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4">Narration</th>
                          <th className="px-6 py-4">Category</th>
                          <th className="px-6 py-4 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {MOCK_TRANSACTIONS.map((tx) => (
                          <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                              {new Date(tx.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                            </td>
                            <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                {tx.type === 'credit' ? <TrendingUp className="w-4 h-4 text-emerald-500" /> : <CreditCard className="w-4 h-4 text-slate-400" />}
                              </div>
                              <span className="truncate max-w-[200px]">{tx.narration}</span>
                            </td>
                            <td className="px-6 py-4">
                              <Badge category={tx.category}>{tx.category}</Badge>
                            </td>
                            <td className={cn(
                              "px-6 py-4 text-right font-bold whitespace-nowrap",
                              tx.type === "credit" ? "text-emerald-600" : "text-slate-900"
                            )}>
                              {tx.type === "credit" ? "+" : "-"}{formatINR(tx.amount)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}