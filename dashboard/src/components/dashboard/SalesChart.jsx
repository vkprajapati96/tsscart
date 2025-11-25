import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const SalesChart = () => {
  const data = [
    { name: "Electronics", value: 45, color: "#3b82f6" },
    { name: "Clothing", value: 30, color: "#8b5cf6" },
    { name: "Books", value: 15, color: "#10b981" },
    { name: "Other", value: 10, color: "#f59e0b" },
  ];

  return (

    <div className="bg-white dark:bg-slate-900 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-amber-700/50">
      {/* ===== Header ===== */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
          Sales by Category
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Product Distribution
        </p>
      </div>

      {/* ===== Chart + Labels Section ===== */}
      <div className="flex items-center justify-center gap-10">
        {/* Pie Chart */}
        <div className="w-[55%] h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip />
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={95}   // ✅ Chart thoda bada kiya
                innerRadius={60}
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Labels Section */}
        <div className="w-[45%] space-y-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-start gap-3 border-b border-slate-200/50 pb-2"
            >
              {/* color dot */}
              <div
                className="w-4 h-4 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              ></div>

              {/* label text left aligned */}
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {item.name}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {item.value}% of total sales
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
