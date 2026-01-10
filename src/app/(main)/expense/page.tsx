import { Suspense } from "react";
import AllExpenses from "./_ui/all_expenses";
import ExpenseTableSkeleton from "./_ui/expense_skeleton";

const ExpensePage = () => {
  return (
    <>
      <Suspense fallback={<ExpenseTableSkeleton />}>
        <AllExpenses />
      </Suspense>
    </>
  );
};

export default ExpensePage;
