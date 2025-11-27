"use client";

import FormDialog from "@/components/Shared/form.dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModalState } from "@/hooks/hook";
import { addCategory } from "@/src/api/query/category.query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export const CATEGORY = "CATEGORY";

const formId = CATEGORY + "_ADD";

const AddCategory = () => {
  const qc = useQueryClient();
  const { open, onOpenChange } = useModalState();
  const form = useForm<TCategoryForm>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate } = useMutation({
    mutationKey: [CATEGORY],
    mutationFn: addCategory,
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: [CATEGORY] });
      toast.success(res.message);

      form.reset();
      onOpenChange(false);
    },
    onError: (err) => {
      if (err instanceof AxiosError) toast.error(err.response?.data.message);
      else if (err instanceof Error) toast.error(err.message);
    },
  });

  const onSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <div className="flex justify-end mb-5">
      <Button onClick={() => onOpenChange(true)} className="cursor-pointer">
        <Plus /> Add Category
      </Button>

      <FormDialog
        title="Add Category"
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
      >
        <Form {...form}>
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            <Label htmlFor="category" className="text-sm my-2 font-semibold">
              Category Name
            </Label>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <>
                  <FormControl>
                    <Input {...field} placeholder="Enter category name" />
                  </FormControl>
                  <FormMessage />
                </>
              )}
            />
          </form>
        </Form>
      </FormDialog>
    </div>
  );
};

export default AddCategory;

const categorySchema = z.object({
  name: z.string().min(1, "Name Required"),
});

export type TCategoryForm = z.infer<typeof categorySchema>;
