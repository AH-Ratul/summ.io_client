import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TableSkeleton = () => {
  const skeletonRows = Array.from({ length: 10 });
  return (
    <div className="mx-auto max-w-7xl  px-8">
      <section className="mt-6 border border-gray-200 rounded-md overflow-x-auto bg-white/50 ">
        <Table className=" divide-y divide-gray-200">
          <TableHeader className="bg-gray-100/70 sticky top-0 z-10">
            <TableRow>
              <TableHead className="py-4 px-4 font-bold text-gray-700 uppercase tracking-wider w-1/2 rounded-tl-xl">
                Product Name
              </TableHead>
              <TableHead className="py-4 px-4 font-bold text-gray-700 uppercase tracking-wider">
                Category
              </TableHead>
              <TableHead className="py-4 px-4 font-bold text-gray-700 uppercase tracking-wider">
                Price
              </TableHead>
              <TableHead className="py-4 px-4 font-bold text-gray-700 uppercase tracking-wider">
                Stock
              </TableHead>
              <TableHead className="py-4 px-4 font-bold text-gray-700 uppercase tracking-wider rounded-tr-xl">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100">
            {skeletonRows.map((_, index) => (
              <TableRow
                key={index}
                className={`transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
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

export default TableSkeleton;
