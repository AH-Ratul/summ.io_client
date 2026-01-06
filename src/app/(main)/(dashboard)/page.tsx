"use client";

import { useQuery } from "@tanstack/react-query";
import SummaryCard from "./_ui/summary";
import { getDashboardData } from "@/src/api/query/dashboard.query";
import { CONST } from "@/src/lib/const";

export default function Home() {
  const { data: metaData, isLoading } = useQuery({
    queryKey: ["META"],
    queryFn: getDashboardData,
  });

  const revenue = metaData?.data?.totalRevenue?._sum?.total;
  const expense = metaData?.data?.totalExpense?._sum?.amount;
  const pr = metaData?.data?.totalProduct;

  if (isLoading) {
    return "loading";
  }

  return (
    <div className="px-4 sm:px-8 my-5 mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5">
        <SummaryCard title={"Revenue"} value={revenue} icon={CONST.TK} />
        <SummaryCard title={"Total Expense"} value={expense} icon={CONST.TK} />
        <SummaryCard title={"Total Product"} value={pr} />
      </div>
    </div>
  );
}
