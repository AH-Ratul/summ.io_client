"use client";

import { useQuery } from "@tanstack/react-query";
import SummaryCard from "./_ui/summary";
import {
  getBarChartData,
  getDashboardData,
} from "@/src/api/query/dashboard.query";
import { CONST } from "@/src/lib/const";
import SalesBarChart from "./_ui/sales.barchart";
import DashboardSkeleton from "./_ui/dashboard_skeleton";

export default function Home() {
  const { data: metaData, isLoading } = useQuery({
    queryKey: ["META"],
    queryFn: getDashboardData,
  });

  const { data: barChartData, isLoading: barLoading } = useQuery({
    queryKey: ["BAR"],
    queryFn: getBarChartData,
  });

  const result: TChart = barChartData?.data?.chartdata;

  const revenue = metaData?.data?.totalRevenue?._sum?.total;
  const expense = metaData?.data?.totalExpense?._sum?.amount;
  const pr = metaData?.data?.totalProduct;

  if (isLoading && barLoading) {
    return (
      <>
        <DashboardSkeleton />
      </>
    );
  }

  return (
    <div className="px-4 sm:px-8 my-5 mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5">
        <SummaryCard title={"Total Revenue"} value={revenue} icon={CONST.TK} />
        <SummaryCard title={"Total Expense"} value={expense} icon={CONST.TK} />
        <SummaryCard title={"Total Product"} value={pr} />
      </div>

      <div>
        <SalesBarChart result={result} />
      </div>
    </div>
  );
}

type TChart = {
  name: string;
  sales: number;
  expense: number;
}[];
