"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/src/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { TSideBarItem } from "./use.sidebar_links";
import { ReactNode } from "react";
import { cn } from "@/src/lib/utils";

export const SidebarLinks = ({
  label,
  icon,
  href,
  isActive,
  items,
}: TSideBarItem) => {
  if (items)
    return (
      <div className="my-1 flex flex-col gap-1">
        <Collapsible>
          <CollapsibleTrigger asChild className="group w-full">
            <button
              className={cn(
                `flex items-center gap-2 font-medium hover:bg-primary/20 hover:text-primary p-2 w-full cursor-pointer rounded-md`,
                isActive && `bg-primary/20 text-primary font-semibold`
              )}
            >
              {icon}
              <h2 className="text-sm"> {label}</h2>

              <span className="ml-auto group-data-[state=open]:rotate-180">
                <ChevronDown size={18} />
              </span>
            </button>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="flex flex-col pl-6 mt-0.5  border-l ml-4">
              {items.map((item) => (
                <ActiveLink
                  key={item.href}
                  href={item.href!}
                  label={item.label!}
                  isActive={item.isActive}
                  className="my-0.5"
                />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );

  return (
    <ActiveLink href={href!} label={label} icon={icon} isActive={isActive} />
  );
};

const ActiveLink = ({
  href,
  label,
  icon,
  isActive,
  className,
}: TActiveLink) => {
  return (
    <Link
      href={href!}
      className={cn(
        `flex items-center gap-3 hover:bg-primary/20 hover:text-primary p-2 rounded-md text-sm`,
        className,
        isActive && `bg-primary/20 text-primary font-semibold`
      )}
    >
      {icon}
      {label}
    </Link>
  );
};

type TActiveLink = {
  label: string;
  href: string;
  icon?: ReactNode;
  isActive?: boolean;
  className?: string;
};
