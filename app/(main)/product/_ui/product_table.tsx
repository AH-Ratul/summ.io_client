"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteProduct, getProduct } from "@/src/api/query/product.query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash } from "lucide-react";
import TableSkeleton from "./table_skeleton";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { toast } from "sonner";
import { AxiosError } from "axios";

const AllProductsTable = () => {
  const qc = useQueryClient();

  const { data: result, isLoading } = useQuery({
    queryKey: ["PRODUCTS"],
    queryFn: getProduct,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (res) => {
      toast.success(res.data.message);
      qc.invalidateQueries({ queryKey: ["PRODUCTS"] });
    },
    onError: (err) => {
      if (err instanceof AxiosError) toast.error(err.response?.data.message);
      else if (err instanceof Error) toast.error(err.message);
    },
  });

  const products = result?.data;

  const handleDeleteProduct = (id: string) => {
    mutate(id);
  };

  if (isLoading) {
    return (
      <>
        <TableSkeleton />
      </>
    );
  }

  return (
    <div className="px-4 sm:px-8 my-5 mx-auto max-w-7xl">
      <section className="mt-6 border border-gray-200 rounded-md overflow-x-auto bg-white/50">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader className="bg-gray-50 sticky">
            <TableRow>
              <TableHead className="py-5 px-4 font-bold text-gray-700 uppercase tracking-wider w-1/2 rounded-tl-xl">
                Product Name
              </TableHead>
              <TableHead className="py-5 font-bold text-gray-700 uppercase tracking-wider">
                Category
              </TableHead>
              <TableHead className="py-5 font-bold text-gray-700 uppercase tracking-wider text-center">
                Price
              </TableHead>
              <TableHead className="py-5 font-bold text-gray-700 uppercase tracking-wider">
                Stock
              </TableHead>
              <TableHead className="py-5 font-bold text-gray-700 uppercase tracking-wider rounded-tr-xl">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100">
            {products.map((product: any, index: number) => (
              <TableRow
                key={product.id}
                className={`transition-colors duration-200 ease-in-out ${
                  index % 2 === 0
                    ? "bg-white"
                    : "bg-gray-50/50 hover:bg-gray-100"
                }`}
              >
                <TableCell className="py-5 px-4 font-medium">
                  {product.product_name}
                </TableCell>

                <TableCell className="py-5 font-medium">
                  <span className=" px-3 py-2 text-xs">{product.category}</span>
                </TableCell>

                <TableCell className="py-5 px-2 text-sm text-center">
                  {product.price.toFixed(2)}
                </TableCell>

                <TableCell className="py-5 px-2">
                  <span className={` ${product.stock < 10 && "text-red-500"}`}>
                    {product.stock} in Stock
                  </span>
                </TableCell>

                <TableCell className="py-5 px-0 text-center flex gap-4">
                  <Button
                    size={"sm"}
                    className="cursor-pointer hover:bg-chart-2"
                  >
                    <Edit />
                  </Button>

                  <DeleteConfirmation
                    onConfirm={() => handleDeleteProduct(product.id)}
                  >
                    <Button
                      disabled={isPending}
                      size={"sm"}
                      className="cursor-pointer bg-destructive"
                    >
                      <Trash />
                    </Button>
                  </DeleteConfirmation>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default AllProductsTable;
