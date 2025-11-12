"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Box, ChevronDown, HandCoins, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export const SidebarLinks = () => {
  return (
    <div className="my-10 flex flex-col gap-1">
      <Link
        href={"/"}
        className="flex items-center gap-3 hover:bg-primary/20 hover:text-primary p-2 rounded-md"
      >
        <LayoutDashboard size={16} />
        <span className="font-semibold text-sm">Dashboard</span>
      </Link>

      <section>
        <Collapsible>
          <CollapsibleTrigger asChild className="">
            <button className="flex justify-between items-center hover:bg-primary/20 hover:text-primary p-2 w-full cursor-pointer rounded-md">
              <span className="flex items-center gap-3 font-semibold text-sm ">
                <Box size={16} />
                Product
              </span>

              <ChevronDown size={18} />
            </button>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="flex flex-col pl-6 mt-1  border-l ml-4">
              <Link
                href={"/products"}
                className=" hover:bg-primary/20 hover:text-primary p-2 text-sm rounded-md"
              >
                Products
              </Link>
              <Link
                href={"/add-product"}
                className=" hover:bg-primary/20 hover:text-primary p-2 text-sm rounded-md"
              >
                Add Product
              </Link>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </section>

      <section>
        <Collapsible>
          <CollapsibleTrigger asChild className="">
            <button className="flex justify-between items-center hover:bg-primary/20 hover:text-primary p-2 w-full cursor-pointer rounded-md">
              <span className="flex items-center gap-3 font-semibold text-sm ">
                <HandCoins size={16} />
                Sales
              </span>

              <ChevronDown size={18} />
            </button>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="flex flex-col pl-6 mt-1  border-l ml-4">
              <Link
                href={"/"}
                className=" hover:bg-primary/20 hover:text-primary p-2 text-sm rounded-md"
              >
                Sales
              </Link>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </section>
    </div>
  );
};
