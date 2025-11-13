"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  product_name: z.string(),
  category: z.string(),
  price: z.string(),
  stock: z.string(),
});

const AddProduct = () => {
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

  const onSubmit = (data: any) => {
    console.log("data: ", data);
    reset();
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
            onClick={() => reset()}
            className="cursor-pointer"
          >
            Reset Form
          </Button>

          <Button type="submit" className="w-32  cursor-pointer">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
