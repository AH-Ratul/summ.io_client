import { Suspense } from "react";
import AllSalesTable from "./_ui/sales_Table";
import SaleSkeleton from "./_ui/sales_skeleton";

const SalesPage = () => {
  return (
    <>
      <Suspense fallback={<SaleSkeleton />}>
        <AllSalesTable />
      </Suspense>
    </>
  );
};

export default SalesPage;
