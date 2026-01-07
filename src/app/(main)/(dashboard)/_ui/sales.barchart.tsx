import { getBarChartData } from "@/src/api/query/dashboard.query";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SalesBarChart = ({ result, isAnimationActive = true }: any) => {
  return (
    <div
      className="w-full bg-white p-6 rounded-xl shadow-sm my-10"
      style={{ height: "400px" }}
    >
      <h2 className="text-lg font-bold mb-4 text-gray-800 font-sans">
        Sales vs Expense analysis
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={result}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          barSize={35}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f0f0f0"
          />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />

          <Tooltip
            cursor={{ fill: "#f9fafb" }}
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              fontFamily: "sans-serif",
            }}
          />

          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{
              paddingBottom: "20px",
              fontSize: "12px",
              fontFamily: "sans-serif",
            }}
          />

          <Bar
            dataKey="sales"
            name="Sales"
            fill="#236e56"
            radius={[4, 4, 0, 0]}
            isAnimationActive={isAnimationActive}
          />

          <Bar
            dataKey="expense"
            name="Expense"
            fill="#009689"
            radius={[4, 4, 0, 0]}
            isAnimationActive={isAnimationActive}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesBarChart;
