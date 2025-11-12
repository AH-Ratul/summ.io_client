"use client";

import { cn } from "@/lib/utils";
import Logo from "@/public/icons/Logo";
import { SidebarLinks } from "./sidebar_links";

const Sidebar = ({ className }: { className?: string }) => {
  return (
    <aside
      className={cn(
        `min-h-screen border-r border-gray-200 py-4 px-4`,
        className
      )}
    >
      <Logo />

      <section>
        <SidebarLinks />
      </section>
    </aside>
  );
};

export default Sidebar;
