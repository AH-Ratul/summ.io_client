"use client";

import FormDialog from "@/components/Shared/form.dialog";
import { Button } from "@/components/ui/button";
import { useModalState } from "@/hooks/hook";
import { Plus } from "lucide-react";
import ExpenseForm, { TExpenseForm } from "./form.expense";
import { formatISO } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addExpense } from "@/src/api/query/expense.query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const EXPENSE = "EXPENSE";

const formId = EXPENSE + "_ADD";

const AddExpense = () => {
  const qc = useQueryClient();
  const { open, onOpenChange } = useModalState();

  const { mutate } = useMutation({
    mutationKey: [EXPENSE],
    mutationFn: addExpense,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [EXPENSE] });

      onOpenChange(false);
    },
    onError: (err) => {
      if (err instanceof AxiosError) toast.error(err.response?.data.message);
      else if (err instanceof Error) toast.error(err.message);
    },
  });

  const onSubmit = (data: TExpenseForm) => {
    const payload = {
      ...data,
      amount: parseFloat(data.amount),
      date: formatISO(data.date),
    };

    mutate(payload);
  };

  return (
    <>
      <div className="flex justify-between items-end mb-2">
        <div>
          <p className="font-semibold text-lg">Expenses</p>
          <span className="text-sm text-muted-foreground">
            Manage Your Expenses
          </span>
        </div>

        <div>
          <Button onClick={() => onOpenChange(true)} className="cursor-pointer">
            <Plus /> Add Expense
          </Button>
        </div>
      </div>

      <FormDialog
        title="Add Expense"
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
      >
        <ExpenseForm formId={formId} onSubmit={onSubmit} />
      </FormDialog>
    </>
  );
};

export default AddExpense;
