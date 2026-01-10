import FormDialog from "@/src/components/Shared/form.dialog";
import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import SalesForm from "./sales.form";
import { useModalState } from "@/src/hooks/hook";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addSales } from "@/src/api/query/sales.query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { getMe } from "@/src/api/query/user.query";

export const SALES = "SALES";

const formId = SALES + "_ADD";

const AddSales = () => {
  const qc = useQueryClient();
  const { open, onOpenChange } = useModalState();
  const [resetForm, setResetForm] = useState<boolean>(false);

  const { data: result, isLoading } = useQuery({
    queryKey: ["USER"],
    queryFn: getMe,
  });

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
      userId: result?.data?.user.id,
    };
    mutate(finalData);
  };

  return (
    <>
      <div className="flex justify-between items-end">
        <div>
          <div>
            <p className="font-semibold text-lg">Sales</p>
            <span className="text-sm text-muted-foreground">
              Manage Your Sales
            </span>
          </div>
        </div>

        <div>
          <Button
            onClick={() => onOpenChange(true)}
            className="cursor-pointer outline-none"
          >
            <Plus /> Add Sales
          </Button>
        </div>
      </div>

      <FormDialog
        title="Add Sales"
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
      >
        <SalesForm
          formId={formId}
          onSubmit={onSubmit}
          resetTrigger={resetForm}
        />
      </FormDialog>
    </>
  );
};

export default AddSales;
