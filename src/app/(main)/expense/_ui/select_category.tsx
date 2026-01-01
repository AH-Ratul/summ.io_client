"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { CATEGORY } from "../categories/_ui/add_category";
import { getCategory } from "@/src/api/query/category.query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

export const SelectCategory = ({ category, searchParams }: any) => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: result, isLoading } = useQuery({
    queryKey: [CATEGORY],
    queryFn: getCategory,
  });

  const categories = result?.data;

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set("category", value);
    } else {
      params.delete("category");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      <Select
        onValueChange={handleCategoryChange}
        value={category ? category : "all"}
        disabled={isLoading}
      >
        <SelectTrigger className="min-w-44 focus:border-primary bg-white! shadow-none focus:ring-0! focus:ring-offset-0! focus:outline-none!">
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
