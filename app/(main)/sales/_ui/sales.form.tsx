"use client"

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/hook";
import { getProductQuery } from "@/src/api/query/product.query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface IProduct {
  id: string;
  product_name: string;
  category: string;
  price: number;
  stock: number;
}

const salesSchema = z.object({
  productId: z.string().min(1, { message: "Product must be selected" }),
  quantity: z.string().min(1, { message: "Quantity required" }),
});

export type TSalesForm = z.infer<typeof salesSchema>;

const SalesForm = ({ onSubmit, formId, resetTrigger }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const debounceValue = useDebounce(searchTerm, 300);

  const form = useForm<TSalesForm>({
    resolver: zodResolver(salesSchema),
    defaultValues: {
      productId: "",
      quantity: "1",
    },
  });

  const { data: result, isLoading } = useQuery({
    queryKey: ["PRODUCTS", "SEARCH", debounceValue],
    queryFn: () => getProductQuery(debounceValue),
    enabled: debounceValue.length > 0,
    staleTime: 5 * 60 * 1000,
  });

  const product = result?.data;

  const handleSelectProduct = (product: any) => {
    setSelectedProduct(product.id);
    setSearchTerm(product.product_name);
    form.setValue("productId", product.id, { shouldValidate: true });
  };

  useEffect(() => {
    if (resetTrigger) {
      form.reset();
    }
  }, [resetTrigger]);

  const isSearching = isLoading && debounceValue.length > 1;

  return (
    <>
      <Form {...form}>
        <form
          id={formId}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="relative">
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => {
                const handleInputChange = (
                  e: React.ChangeEvent<HTMLInputElement>
                ) => {
                  const newQuery = e.target.value;
                  setSearchTerm(newQuery);
                  field.onChange(newQuery);
                  setSelectedProduct(null);
                };

                return (
                  <>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeholder="Type product name to search..."
                      />
                    </FormControl>
                    <FormMessage />
                  </>
                );
              }}
            />

            {isSearching && (
              <p className="text-blue-500 mt-2 text-sm">
                Searching for "{debounceValue}"...
              </p>
            )}

            {product && product.length > 0 && !selectedProduct && (
              <ul className="top-10 border border-gray-200 rounded-lg max-h-40 overflow-y-auto bg-white shadow-md absolute z-10 w-full max-w-[460px]">
                {product.map((p: any) => (
                  <li
                    key={p.id}
                    onClick={() => handleSelectProduct(p)}
                    className="p-2 cursor-pointer hover:bg-blue-50 transition duration-100 border-b last:border-b-0 flex justify-between"
                  >
                    <span className="font-medium text-sm">
                      {p.product_name}
                    </span>
                    <span className="font-semibold text-sm pe-4 text-green-700">
                      stock: {p.stock}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <>
                <FormControl>
                  <Input {...field} placeholder="Quantity" />
                </FormControl>
                <FormMessage />
              </>
            )}
          />
        </form>
      </Form>
    </>
  );
};

export default SalesForm;
