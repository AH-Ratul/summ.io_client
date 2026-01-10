import { useMemo } from "react";

const CardSkeleton = () => (
  <div className="flex-1 w-full p-6 bg-white rounded-xl border border-gray-100 shadow-sm animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="h-4 w-24 bg-gray-200 rounded"></div>
    </div>
    <div className="h-8 w-32 bg-gray-200 rounded mb-2"></div>
  </div>
);

const ChartSkeleton = () => {
  //const height = useMemo(() => Math.floor(Math.random() * 60) + 20, []);

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100 my-5 animate-pulse">
      <div className="h-6 w-48 bg-gray-200 rounded mb-8"></div>

      <div className="flex items-end gap-4 h-[300px] w-full pt-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center gap-2 h-full justify-end"
          >
            <div className="flex gap-1 w-full items-end justify-center h-full">
              <div
                className="h-56 w-10 bg-gray-200 rounded-t-sm"
                //style={{ height: `${height}%` }}
              ></div>
              <div
                className="h-52 w-10 bg-gray-100 rounded-t-sm"
                //style={{ height: `${height}%` }}
              ></div>
            </div>
            <div className="h-3 w-10 bg-gray-100 rounded mt-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function DashboardSkeleton() {
  return (
    <div className="px-4 sm:px-8 my-5 mx-auto max-w-7xl">
      {/* Summary Cards Row */}
      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>

      {/* Chart Section */}
      <div className="mt-10">
        <ChartSkeleton />
      </div>
    </div>
  );
}
