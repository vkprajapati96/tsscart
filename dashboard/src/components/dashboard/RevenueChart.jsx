import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const RevenueChart = () => {
  const data = [
    { month: "Jan", revenue: 45000, expenses: 32000 },
    { month: "Feb", revenue: 48000, expenses: 35000 },
    { month: "Mar", revenue: 52000, expenses: 37000 },
    { month: "Apr", revenue: 60000, expenses: 42000 },
    { month: "May", revenue: 64000, expenses: 46000 },
    { month: "Jun", revenue: 70000, expenses: 52000 },
    { month: "Jul", revenue: 68000, expenses: 49000 },
    { month: "Aug", revenue: 72000, expenses: 53000 },
    { month: "Sep", revenue: 69000, expenses: 51000 },
    { month: "Oct", revenue: 75000, expenses: 55000 },
    { month: "Nov", revenue: 78000, expenses: 57000 },
    { month: "Dec", revenue: 82000, expenses: 60000 },
  ];

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            Revenue Chart
          </h3>
          <p className="text-slate-500 dark:text-slate-400">
            Monthly Revenue and Expenses
          </p>
        
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Revenue
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Expenses
            </span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
          >
            {/* Gradient Fill */}
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#9333ea" stopOpacity={0.7} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0.7} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fill: "#94a3b8" }} />
            <YAxis tick={{ fill: "#94a3b8" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                color: "#fff",
                borderRadius: "8px",
              }}
            />
            <Legend />

            <Bar
              dataKey="revenue"
              fill="url(#colorRevenue)"
              radius={[6, 6, 0, 0]}
              barSize={20}
            />
            <Bar
              dataKey="expenses"
              fill="url(#colorExpenses)"
              radius={[6, 6, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
