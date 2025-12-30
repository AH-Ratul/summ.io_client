"use client";

import { cn } from "@/src/lib/utils";

import { SidebarLinks } from "./sidebar_links";
import Logo from "../../../../../public/icons/Logo";

const Sidebar = ({ className }: { className?: string }) => {
  return (
    <aside
      className={cn(`min-h-screen border-r flex flex-col py-4 px-4`, className)}
    >
      <Logo />

      <section>
        <SidebarLinks />
      </section>
    </aside>
  );
};

export default Sidebar;
