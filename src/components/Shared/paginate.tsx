"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";

export const Paginate = ({ page, setPage, totalPage }: any) => {
  const tp = totalPage ? totalPage : 1;

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                page === 1 ? "pointer-events-none opacity-45" : "cursor-pointer"
              }
              onClick={() => setPage((prev: number) => prev - 1)}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink>
              {page} of {totalPage}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              className={
                page === tp
                  ? "pointer-events-none opacity-45"
                  : "cursor-pointer"
              }
              onClick={() => setPage((prev: number) => prev + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
