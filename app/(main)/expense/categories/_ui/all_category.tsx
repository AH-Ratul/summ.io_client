"use client";

import { Button } from "@/components/ui/button";
import { deleteCategory, getCategory } from "@/src/api/query/category.query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash } from "lucide-react";
import CategorySkeleton from "./category_skeleton";
import AddCategory, { CATEGORY } from "./add_category";
import { toast } from "sonner";
import { AxiosError } from "axios";
import DeleteConfirmation from "@/components/DeleteConfirmation";

const AllCategory = () => {
  const qc = useQueryClient();
  const { data: result, isLoading } = useQuery({
    queryKey: [CATEGORY],
    queryFn: getCategory,
  });

  const categories = result?.data;
  const length = result?.data.length || 6;

  const { mutate, isPending } = useMutation({
    mutationKey: [CATEGORY],
    mutationFn: deleteCategory,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [CATEGORY] });
      toast.success("Category Deleted");
    },
    onError: (err) => {
      if (err instanceof AxiosError) toast.error(err.response?.data.message);
      else if (err instanceof Error) toast.error(err.message);
    },
  });

  const handleDeleteCategory = (id: string) => {
    mutate(id);
  };

  if (isLoading) {
    return (
      <>
        <CategorySkeleton length={length} />
      </>
    );
  }

  return (
    <div className="px-4 lg:px-8 my-5 mx-auto max-w-7xl">
      <AddCategory />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {categories?.map((category: any) => (
          <div
            key={category.id}
            className="border rounded-md py-2 px-2.5 w-full  bg-white shadow-xs flex items-center justify-between gap-1"
          >
            <p className="font-bold text-sm">{category.name.toUpperCase()}</p>

            <div className="flex items-center gap-2">
              <Button>
                <Edit />{" "}
              </Button>

              <DeleteConfirmation
                onConfirm={() => handleDeleteCategory(category.id)}
              >
                <Button
                  disabled={isPending}
                  className="bg-red-600 cursor-pointer hover:bg-red-500"
                >
                  <Trash />{" "}
                </Button>
              </DeleteConfirmation>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategory;
