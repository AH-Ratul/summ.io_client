"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { addSales, getSales } from "@/src/api/query/sales.query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SaleSkeleton from "./sales_skeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FormDialog from "@/components/Shared/form.dialog";
import SalesForm from "./sales.form";
import { useModalState } from "@/hooks/hook";
import { useSession } from "next-auth/react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { format } from "date-fns";

const SALES = "SALES";

const formId = SALES + "_ADD";

const AllSalesTable = () => {
  const session = useSession();
  const qc = useQueryClient();
  const { open, onOpenChange } = useModalState();
  const [resetForm, setResetForm] = useState<boolean>(false);

  const { data: result, isLoading } = useQuery({
    queryKey: ["SALES"],
    queryFn: getSales,
  });

  const sales = result?.data || [];

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: addSales,
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: [SALES] });
      toast.success(res.message);
      setResetForm(true);
      setTimeout(() => setResetForm(false), 100);

      onOpenChange(false);
    },
    onError: (err) => {
      if (err instanceof AxiosError) toast.error(err.response?.data.message);
      else if (err instanceof Error) toast.error(err.message);
    },
  });

  const onSubmit = (formData: any) => {
    const finalData = {
      ...formData,
      userId: session.data?.user.id,
    };
    mutate(finalData);
  };

  if (isLoading) {
    return (
      <>
        <SaleSkeleton />
      </>
    );
  }
  return (
    <div className="px-4 sm:px-8 my-5 mx-auto max-w-7xl">
      <section className="flex justify-end">
        <Button
          onClick={() => onOpenChange(true)}
          className="cursor-pointer outline-none"
        >
          <Plus /> Add Sales
        </Button>
        <FormDialog formId={formId} open={open} onOpenChange={onOpenChange}>
          <SalesForm
            formId={formId}
            onSubmit={onSubmit}
            resetTrigger={resetForm}
          />
        </FormDialog>
      </section>

      <section className="mt-6 border border-gray-200 rounded-md overflow-x-auto bg-white/50">
        <Table className="min-w-full divide-y divide-gray-200 ">
          <TableHeader className="bg-gray-50 sticky">
            <TableRow>
              <TableHead className="py-5 px-4 font-semibold uppercase text-gray-800 w-1/2">
                Product Name
              </TableHead>
              <TableHead className="py-5 px-4 font-semibold uppercase text-gray-800 text-center">
                Price
              </TableHead>
              <TableHead className="py-5 px-4 font-semibold uppercase text-gray-800 text-center">
                Quantity
              </TableHead>
              <TableHead className="py-5 px-4 font-semibold uppercase text-gray-800 text-center">
                Total
              </TableHead>
              <TableHead className="py-5 px-4 font-semibold uppercase text-gray-800 text-center">
                Date
              </TableHead>
              <TableHead className="py-5 px-4 font-semibold uppercase text-gray-800 text-center">
                Sale By
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100">
            {sales.map((sale: any, index: number) => (
              <TableRow
                key={sale.id}
                className={`transition-colors ${
                  index % 2 === 0
                    ? "bg-white"
                    : "bg-gray-50/50 hover:bg-gray-100"
                }`}
              >
                <TableCell className="py-5 px-4 font-medium">
                  {sale.product.product_name}
                </TableCell>

                <TableCell className="py-5 px-4 font-medium text-center">
                  {sale.product.price.toFixed(2)}
                </TableCell>

                <TableCell className="py-5 px-4 font-medium text-center">
                  {sale.quantity}
                </TableCell>

                <TableCell className="py-5 px-4 font-medium text-center">
                  {sale.total.toFixed(2)}
                </TableCell>

                <TableCell className="py-5 px-4 font-medium text-center">
                  {format(new Date(sale.createdAt), "dd-MM-yyyy (hh:mm a)")}
                </TableCell>

                <TableCell className="py-5 px-4 font-medium text-center">
                  {sale.user.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default AllSalesTable;
