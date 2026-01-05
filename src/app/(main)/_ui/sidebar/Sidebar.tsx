"use client";

import { cn } from "@/src/lib/utils";

import { SidebarLinks } from "./sidebar_links";
import Logo from "../../../../../public/icons/Logo";
import { useSidebarLinks } from "./use.sidebar_links";

const Sidebar = ({ className }: { className?: string }) => {
  const { sidebarLinks } = useSidebarLinks();

  return (
    <aside
      className={cn(`min-h-screen border-r flex flex-col py-4 px-4`, className)}
    >
      <Logo />

      <section className="mt-10">
        {sidebarLinks?.map((link, index) => (
          <SidebarLinks key={index} {...link} />
        ))}
      </section>
    </aside>
  );
};

export default Sidebar;
