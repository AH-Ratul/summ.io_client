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
} from "@/components/ui/table";
import { format } from "date-fns";
import ExpenseTableSkeleton from "./expense_skeleton";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import DeleteConfirmation from "@/components/DeleteConfirmation";

const AllExpenses = () => {
  const { data: result, isLoading } = useQuery({
    queryKey: [EXPENSE],
    queryFn: getExpense,
  });

  const expenses = result?.data;

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
        <div className="flex justify-end gap-2 p-4 text-sm">
          <p>Month</p>
          <p>Year</p>
          <p>Category</p>
        </div>

        <Table className="divide-y min-w-4xl divide-gray-200 overflow-x-auto ">
          <TableHeader className="bg-slate-100">
            <TableRow>
              <TableHead className="py-4 px-4 font-semibold uppercase text-gray-800 w-[43%]">
                Title
              </TableHead>
              <TableHead className="py-4 px-4 font-semibold uppercase text-gray-800 text-start">
                Category
              </TableHead>
              <TableHead className="py-4 px-4 font-semibold uppercase text-gray-800 text-center">
                Amount
              </TableHead>
              <TableHead className="py-4 px-4 font-semibold uppercase text-gray-800 text-start">
                Date
              </TableHead>
              <TableHead className="py-4 px-3 font-semibold uppercase text-gray-800 text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses?.map((expense: any, index: number) => (
              <TableRow key={expense.id}>
                <TableCell className="py-4 px-4 font-medium">
                  {expense.title}
                </TableCell>
                <TableCell className="py-4 px-4 font-medium text-start">
                  {expense.category.name}
                </TableCell>
                <TableCell className="py-4 px-4 font-medium text-center">
                  ট {expense.amount}
                </TableCell>
                <TableCell className="py-4 px-4 font-medium text-start">
                  {format(expense.date, "dd MMM, yyyy")}
                </TableCell>

                <TableCell className="py-2 px-3 flex justify-center gap-2">
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

        <div className="flex justify-end border-t gap-2 p-4 text-sm">
          <p>{"<"}</p>
          <p>1</p>
          <p>{">"}</p>
        </div>
      </section>
    </div>
  );
};

export default AllExpenses;
