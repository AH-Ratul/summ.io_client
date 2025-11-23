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
  formId: string;
  children: ReactNode;
  open: boolean;
  onOpenChange(open: boolean): void;
};

const FormDialog = ({ children, open, onOpenChange, formId }: TFormProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Add Sales</DialogTitle>
        {children}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"destructive"}>Cancel</Button>
          </DialogClose>
          <Button form={formId} type="submit" className="cursor-pointer">
            Record Sale
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
