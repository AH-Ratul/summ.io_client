import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SaleSkeleton = () => {
  const skeletonRows = Array.from({ length: 10 });
  return (
    <div className="px-4 sm:px-8 my-5 mx-auto max-w-7xl">
      <section className="flex justify-end">
        <Button
          variant={"outline"}
          className=" outline-none text-gray-200 border-none shadow-none animate-pulse bg-gray-200 w-28"
        ></Button>
      </section>

      <section className="mt-6 border border-gray-200 rounded-md overflow-x-auto bg-white/50">
        <Table className="min-w-full divide-y divide-gray-200 ">
          <TableHeader className="bg-gray-50 sticky">
            <TableRow>
              <TableHead className="py-5 px-4 font-semibold uppercase text-gray-800 w-1/2">
                Product Name
              </TableHead>

              <TableHead className="py-5 px-4 font-semibold uppercase text-gray-800">
                Price
              </TableHead>

              <TableHead className="py-5 px-4 font-semibold uppercase text-gray-800">
                Quantity
              </TableHead>

              <TableHead className="py-5 px-4 font-semibold uppercase text-gray-800">
                Total
              </TableHead>

              <TableHead className="py-5 px-4 font-semibold uppercase text-gray-800">
                Sale By
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100">
            {skeletonRows.map((_, index) => (
              <TableRow
                key={index}
                className={`transition-colors ${
                  index % 2 === 0 ? "bg-wite" : "bg-gray-50/50"
                }`}
              >
                <TableCell className="py-5 px-4 w-1/2">
                  <div className="h-4 w-1/2 animate-pulse bg-gray-200 rounded-xl" />
                </TableCell>

                <TableCell className="py-5 px-4">
                  <div className="h-4 w-[40%] animate-pulse bg-gray-200 rounded-xl" />
                </TableCell>

                <TableCell className="py-5 px-4">
                  <div className="h-4 w-[40%] animate-pulse bg-gray-200 rounded-xl" />
                </TableCell>

                <TableCell className="py-5 px-4">
                  <div className="h-4 w-[40%] animate-pulse bg-gray-200 rounded-xl" />
                </TableCell>

                <TableCell className="py-5 px-4 text-center">
                  <div className="h-4 w-[40%] animate-pulse bg-gray-200 rounded-xl" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default SaleSkeleton;
