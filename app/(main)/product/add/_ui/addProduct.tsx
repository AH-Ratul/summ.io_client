"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "@/src/api/query/product.query";
import { toast } from "sonner";
import { AxiosError } from "axios";

const formSchema = z.object({
  product_name: z.string(),
  category: z.string(),
  price: z.string(),
  stock: z.string(),
});

const AddProduct = () => {
  const qc = useQueryClient();
  const { register, handleSubmit, reset } = useForm<z.infer<typeof formSchema>>(
    {
      resolver: zodResolver(formSchema),
      defaultValues: {
        product_name: "",
        category: "",
        price: "",
        stock: "",
      },
    }
  );

  const { mutate, isPending } = useMutation({
    mutationFn: addProduct,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: ["PRODUCTS"] });
      reset();
    },
    onError: (err) => {
      if (err instanceof AxiosError) toast.error(err?.response?.data?.message);
      else if (err instanceof Error) toast.error(err.message);
    },
  });

  const onSubmit = (data: any) => {
    const product = {
      product_name: data.product_name,
      category: data.category,
      price: Number(data.price),
      stock: Number(data.stock),
    };
    mutate(product);
  };
  return (
    <div className="px-8 my-5 mx-auto max-w-5xl">
      <h1 className="font-semibold text-xl">Add Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 rounded-md">
        <div className="flex flex-col sm:flex-row gap-5 mt-5">
          <div className="w-full flex flex-col">
            <label
              htmlFor="product_name"
              className="font-semibold mb-1 text-sm"
            >
              Product Name
            </label>
            <Input
              type="text"
              placeholder="@: Product name"
              {...register("product_name")}
              className="bg-background shadow-none focus:border-primary py-5"
            />
          </div>

          <div className="w-full flex flex-col">
            <label htmlFor="category" className="font-semibold mb-1 text-sm">
              Category
            </label>
            <Input
              type="text"
              placeholder="@: Category"
              {...register("category")}
              className="bg-background shadow-none focus:border-primary py-5"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-5 mt-5">
          <div className="w-full flex flex-col">
            <label htmlFor="price" className="font-semibold mb-1 text-sm">
              Price
            </label>
            <Input
              type="text"
              placeholder="@: Price"
              {...register("price")}
              className="bg-background shadow-none focus:border-primary py-5"
            />
          </div>

          <div className="w-full flex flex-col">
            <label htmlFor="stock" className="font-semibold mb-1 text-sm">
              Stock
            </label>
            <Input
              type="text"
              placeholder="@: Stock"
              {...register("stock")}
              className="bg-background shadow-none focus:border-primary py-5"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-5 mt-5">
          <Button
            variant="destructive"
            type="button"
            onClick={() => reset()}
            className="cursor-pointer"
          >
            Reset Form
          </Button>

          <Button type="submit" className="w-32  cursor-pointer">
            {isPending ? "Processing..." : "Add"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
