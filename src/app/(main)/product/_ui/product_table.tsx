"use client";

import { Button } from "@/src/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { deleteProduct, getProduct } from "@/src/api/query/product.query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash } from "lucide-react";
import TableSkeleton from "./table_skeleton";
import DeleteConfirmation from "@/src/components/DeleteConfirmation";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useState } from "react";
import { Paginate } from "@/src/components/Shared/paginate";

const AllProductsTable = () => {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);

  const { data: result, isLoading } = useQuery({
    queryKey: ["PRODUCTS", page],
    queryFn: () => getProduct({ page }),
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

  const products = result?.data?.product;
  const totalPage = result?.data?.totalPage;

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
      <div className="flex justify-between items-end mb-2">
        <div>
          <p className="font-semibold text-lg">Products</p>
          <span className="text-sm text-muted-foreground">
            Manage Your Products
          </span>
        </div>
      </div>

      <section className="mt-6 border border-gray-200 rounded-md overflow-x-auto bg-white">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader className="bg-primary/10 sticky">
            <TableRow>
              <TableHead className="py-2 px-4 font-bold text-gray-700 uppercase w-[43%]">
                Product Name
              </TableHead>
              <TableHead className="py-2 px-4 font-bold text-gray-700 uppercase text-start">
                Category
              </TableHead>
              <TableHead className="py-2 px-4 font-bold text-gray-700 uppercase  text-start">
                Price
              </TableHead>
              <TableHead className="py-2 px-4 font-bold text-gray-700 uppercase text-start">
                Stock
              </TableHead>
              <TableHead className="py-2 px-3 font-bold text-gray-700 uppercase text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100">
            {products?.map((product: any, index: number) => (
              <TableRow key={product.id}>
                <TableCell className="p-4 font-medium">
                  {product.product_name}
                </TableCell>

                <TableCell className="p-4 font-medium text-start">
                  <span className="text-sm">{product.category}</span>
                </TableCell>

                <TableCell className="p-4 text-sm text-start">
                  ট {product.price.toFixed(2)}
                </TableCell>

                <TableCell className="p-4">
                  <span className={` ${product.stock < 10 && "text-red-500"}`}>
                    {product.stock} in Stock
                  </span>
                </TableCell>

                <TableCell className="p-2 flex justify-center gap-2">
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

        <div>
          {products?.length === 0 ? (
            <p className="text-center py-3 text-sm text-destructive">
              No Result Found
            </p>
          ) : null}
        </div>

        <div className="p-3 flex justify-end border-t">
          <Paginate page={page} setPage={setPage} totalPage={totalPage} />
        </div>
      </section>
    </div>
  );
};

export default AllProductsTable;
