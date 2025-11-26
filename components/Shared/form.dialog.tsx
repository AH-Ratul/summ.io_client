import React, { ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

type TFormProps = {
  title: string;
  formId: string;
  children: ReactNode;
  open: boolean;
  onOpenChange(open: boolean): void;
};

const FormDialog = ({
  title,
  children,
  open,
  onOpenChange,
  formId,
}: TFormProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        {children}
        <DialogFooter className="mt-3">
          <DialogClose asChild>
            <Button variant={"destructive"} className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <Button form={formId} type="submit" className="cursor-pointer">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
