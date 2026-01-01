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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { CATEGORY } from "../categories/_ui/add_category";
import { getCategory } from "@/src/api/query/category.query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const AllExpenses = () => {
  const [page, setPage] = useState(1);
  const [month, setMonth] = useState(""); //new Date().getMonth() + 1
  const [year, setYear] = useState(""); //new Date().getFullYear()

  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "";

  const { data: result, isLoading } = useQuery({
    queryKey: [EXPENSE, page, month, year, category],
    queryFn: () => getExpense({ page, limit: 4, month, year, category }),
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
          <p>Month</p>
          <p>Year</p>
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
                <TableCell className="py-2 px-4 font-medium ">
                  {expense.title}
                </TableCell>
                <TableCell className="py-2 px-4 font-medium text-start">
                  {expense.category.name}
                </TableCell>
                <TableCell className="py-2 px-4 font-medium text-start">
                  ট {expense.amount}
                </TableCell>
                <TableCell className="py-2 px-4 font-medium text-start">
                  {format(expense.date, "dd MMM yyyy")}
                </TableCell>

                <TableCell className="py-1.5 px-3 flex justify-center gap-2">
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

// pagination
const PaginateExpense = ({ page, setPage, totalPage }: any) => {
  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                page === 1 ? "pointer-events-none opacity-45" : "cursor-pointer"
              }
              onClick={() => setPage((prev: number) => prev - 1)}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink>{page} of {totalPage}</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              className={
                page === totalPage
                  ? "pointer-events-none opacity-45"
                  : "cursor-pointer"
              }
              onClick={() => setPage((prev: number) => prev + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

// Category Selection
const SelectCategory = ({ category, searchParams }: any) => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: result, isLoading } = useQuery({
    queryKey: [CATEGORY],
    queryFn: getCategory,
  });

  const categories = result?.data;

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", value);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      <Select
        onValueChange={handleCategoryChange}
        value={category ? category : "all"}
        disabled={isLoading}
      >
        <SelectTrigger className="w-44 focus:border-primary bg-white! shadow-none focus:ring-0! focus:ring-offset-0! focus:outline-none!">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem key={"all"} value={"all"}>
              All
            </SelectItem>
            {categories?.map((item: { name: string }) => (
              <SelectItem key={item.name} value={item.name}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
