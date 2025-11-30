"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ExpenseTableSkeleton = ({ length = 5 }: { length?: number }) => {
  return (
    <div className="px-4 lg:px-8 my-5 mx-auto max-w-7xl">
      {/* Top Filters Skeleton */}
      <div className="flex justify-end gap-4 p-4 text-sm">
        <div className="w-20 h-4 bg-gray-200 animate-pulse rounded"></div>
        <div className="w-20 h-4 bg-gray-200 animate-pulse rounded"></div>
        <div className="w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
      </div>

      <section className="mt-5 bg-white border border-gray-200 rounded-md w-full">
        <Table className="divide-y min-w-5xl divide-gray-200 overflow-x-auto">
          <TableHeader className="bg-slate-100">
            <TableRow>
              <TableHead className="py-4 px-4 uppercase w-[43%]">
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
              </TableHead>
              <TableHead className="py-4 px-4">
                <div className="w-20 h-4 bg-gray-300 rounded"></div>
              </TableHead>
              <TableHead className="py-4 px-4 text-center">
                <div className="w-20 h-4 mx-auto bg-gray-300 rounded"></div>
              </TableHead>
              <TableHead className="py-4 px-4">
                <div className="w-20 h-4 bg-gray-300 rounded"></div>
              </TableHead>
              <TableHead className="py-4 px-4 text-center">
                <div className="w-20 h-4 mx-auto bg-gray-300 rounded"></div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length }).map((_, i) => (
              <TableRow key={i}>
                <TableCell className="py-4 px-4">
                  <div className="w-48 h-4 bg-gray-200 animate-pulse rounded"></div>
                </TableCell>
                <TableCell className="py-4 px-4">
                  <div className="w-28 h-4 bg-gray-200 animate-pulse rounded"></div>
                </TableCell>
                <TableCell className="py-4 px-4 text-center">
                  <div className="w-16 h-4 bg-gray-200 mx-auto animate-pulse rounded"></div>
                </TableCell>
                <TableCell className="py-4 px-4">
                  <div className="w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
                </TableCell>
                <TableCell className="py-4 px-4 text-center">
                  <div className="w-12 h-4 bg-gray-200 mx-auto animate-pulse rounded"></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-end border-t gap-3 p-4 text-sm">
          <div className="w-5 h-4 bg-gray-200 animate-pulse rounded"></div>
          <div className="w-5 h-4 bg-gray-200 animate-pulse rounded"></div>
          <div className="w-5 h-4 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </section>
    </div>
  );
};

export default ExpenseTableSkeleton;
