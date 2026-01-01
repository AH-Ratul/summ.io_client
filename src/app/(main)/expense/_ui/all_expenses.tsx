"use client";

import { useQuery } from "@tanstack/react-query";
import AddExpense, { EXPENSE } from "./add_expense";
import { getExpense } from "@/src/api/query/expense.query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { format } from "date-fns";
import ExpenseTableSkeleton from "./expense_skeleton";
import { Button } from "@/src/components/ui/button";
import { Edit, Trash } from "lucide-react";
import DeleteConfirmation from "@/src/components/DeleteConfirmation";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { PaginateExpense } from "./paginate_expense";
import { SelectCategory } from "./select_category";
import { DateRange } from "./date_range";

const AllExpenses = () => {
  const [page, setPage] = useState(1);

  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "";
  const range = searchParams.get("range") || "";

  const { data: result, isLoading } = useQuery({
    queryKey: [EXPENSE, page, range, category],
    queryFn: () => getExpense({ page, limit: 10, range, category }),
    placeholderData: (prevData) => prevData,
  });

  const expenses = result?.data?.expenses;
  const totalPage = result?.data?.totalPage;

  if (isLoading) {
    return (
      <>
        <ExpenseTableSkeleton />
      </>
    );
  }

  return (
    <div className="px-4 lg:px-8 my-5 mx-auto max-w-7xl">
      <AddExpense />

      <section className="mt-5 bg-white border border-gray-200 rounded-md w-full">
        <div className="flex justify-end items-center gap-4 p-4 text-sm">
          <DateRange range={range} searchParams={searchParams} />
          <SelectCategory category={category} searchParams={searchParams} />
        </div>

        <Table className="divide-y min-w-4xl divide-gray-200 overflow-x-auto ">
          <TableHeader className="bg-primary/10">
            <TableRow>
              <TableHead className="py-2 px-4 font-semibold uppercase text-gray-800 w-[43%]">
                Title
              </TableHead>
              <TableHead className="py-2 px-4 font-semibold uppercase text-gray-800 text-start">
                Category
              </TableHead>
              <TableHead className="py-2 px-4 font-semibold uppercase text-gray-800 text-start">
                Amount
              </TableHead>
              <TableHead className="py-2 px-4 font-semibold uppercase text-gray-800 text-start">
                Date
              </TableHead>
              <TableHead className="py-2 px-3 font-semibold uppercase text-gray-800 text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {expenses?.map((expense: any, index: number) => (
              <TableRow key={expense.id}>
                <TableCell className="p-4 font-medium ">
                  {expense.title}
                </TableCell>
                <TableCell className="p-4 font-medium text-start">
                  {expense.category.name}
                </TableCell>
                <TableCell className="p-4 font-medium text-start">
                  ট {expense.amount}
                </TableCell>
                <TableCell className="p-4 font-medium text-start">
                  {format(expense.date, "dd MMM yyyy")}
                </TableCell>

                <TableCell className="p-2 flex justify-center gap-2">
                  <Button
                    size={"icon-sm"}
                    className="cursor-pointer hover:bg-chart-2"
                  >
                    <Edit />
                  </Button>

                  <DeleteConfirmation onConfirm={() => console.log("")}>
                    <Button
                      //disabled={isPending}
                      size={"icon-sm"}
                      className="cursor-pointer bg-destructive hover:bg-red-500"
                    >
                      <Trash />
                    </Button>
                  </DeleteConfirmation>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div>
          {expenses?.length === 0 ? (
            <p className="text-center py-3 text-sm text-destructive">
              No Result Found
            </p>
          ) : null}
        </div>

        <div className="flex justify-end border-t gap-2 p-2 text-sm">
          <PaginateExpense
            page={page}
            setPage={setPage}
            totalPage={totalPage}
          />
        </div>
      </section>
    </div>
  );
};

export default AllExpenses;
