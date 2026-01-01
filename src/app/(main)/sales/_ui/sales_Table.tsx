"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { getSales } from "@/src/api/query/sales.query";
import { useQuery } from "@tanstack/react-query";
import SaleSkeleton from "./sales_skeleton";
import { format } from "date-fns";
import AddSales, { SALES } from "./add_sales";
import { useState } from "react";
import { Paginate } from "@/src/components/Shared/paginate";
import { useSearchParams } from "next/navigation";
import { DateRange } from "@/src/components/Shared/date_range";

const AllSalesTable = () => {
  const [page, setPage] = useState(1);

  const searchParams = useSearchParams();

  const range = searchParams.get("range") || "";

  const { data: result, isLoading } = useQuery({
    queryKey: [SALES, page, range],
    queryFn: () => getSales({ page, range }),
    placeholderData: (prevData) => prevData,
  });

  const sales = result?.data?.allSales || [];
  const totalPage = result?.data?.totalPage;

  if (isLoading) {
    return (
      <>
        <SaleSkeleton />
      </>
    );
  }

  return (
    <div className="px-4 sm:px-8 my-5 mx-auto max-w-7xl">
      <AddSales />

      <section className="mt-6 border border-gray-200 rounded-md overflow-x-auto bg-white">
        <div className="flex justify-end p-4 text-sm">
          <DateRange range={range} searchParams={searchParams} />
        </div>

        <Table className="min-w-full divide-y divide-gray-200 ">
          <TableHeader className="bg-primary/10 sticky">
            <TableRow>
              <TableHead className="py-2 px-4 font-semibold uppercase text-gray-800 w-1/2">
                Product Name
              </TableHead>
              <TableHead className="py-2 px-4 font-semibold uppercase text-gray-800 text-start">
                Price
              </TableHead>
              <TableHead className="py-2 px-4 font-semibold uppercase text-gray-800 text-center">
                Quantity
              </TableHead>
              <TableHead className="py-2 px-4 font-semibold uppercase text-gray-800 text-start">
                Total
              </TableHead>
              <TableHead className="py-2 px-4 font-semibold uppercase text-gray-800 text-center">
                Date
              </TableHead>
              <TableHead className="py-2 px-4 font-semibold uppercase text-gray-800 text-center">
                Sale By
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100">
            {sales.map((sale: any, index: number) => (
              <TableRow key={sale.id}>
                <TableCell className="p-4 font-medium">
                  {sale.product.product_name}
                </TableCell>

                <TableCell className="p-4 font-medium text-start">
                  ট {sale.product.price.toFixed(2)}
                </TableCell>

                <TableCell className="p-4 font-medium text-center">
                  {sale.quantity}
                </TableCell>

                <TableCell className="p-4 font-medium text-start">
                  ট {sale.total.toFixed(2)}
                </TableCell>

                <TableCell className="p-4 font-medium text-center">
                  {format(new Date(sale.createdAt), "dd-MM-yyyy (hh:mm a)")}
                </TableCell>

                <TableCell className="p-4 font-medium text-center">
                  {sale.user.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div>
          {sales.length === 0 ? (
            <p className="text-sm py-3 text-destructive text-center">
              No Result Found
            </p>
          ) : (
            ""
          )}
        </div>

        <div className="flex justify-end border-t gap-2 p-2 text-sm">
          <Paginate page={page} setPage={setPage} totalPage={totalPage} />
        </div>
      </section>
    </div>
  );
};

export default AllSalesTable;
