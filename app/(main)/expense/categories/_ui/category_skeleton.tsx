"use client";

import { Button } from "@/components/ui/button";

const CategorySkeleton = ({ length }: { length: number }) => {
  return (
    <div className="px-4 lg:px-8 my-5 mx-auto max-w-7xl">
      <div className="flex justify-end mb-5">
        <Button
          disabled
          variant={"outline"}
          className="animate-pulse bg-gray-200 w-28"
        ></Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length }).map((_, idx) => (
          <div
            key={idx}
            aria-hidden="true"
            className="border rounded-md py-2 px-2.5 w-full bg-card shadow-xs flex items-center flex-wrap justify-between"
          >
            <div className="w-20 h-4 bg-muted animate-pulse rounded-full" />

            <div className="flex items-center gap-2">
              <Button
                disabled
                className="bg-muted w-8 h-8 animate-pulse pointer-events-none"
              />
              <Button
                disabled
                className="bg-muted w-8 h-8 animate-pulse pointer-events-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySkeleton;
