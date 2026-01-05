"use client";

import { PropsWithChildren } from "react";
import Sidebar from "./_ui/sidebar/Sidebar";
import Header from "@/src/components/Shared/header";
import { useModalState } from "@/src/hooks/hook";

export default function Layout({ children }: PropsWithChildren) {
  const { open, onOpenChange } = useModalState(true);
  return (
    <div className="flex h-dvh overflow-hidden">
      {open && <Sidebar className="min-w-64 hidden md:flex shrink-0" />}

      <section className="w-full h-dvh flex flex-col">
        <Header open={open} onOpenChange={onOpenChange} />

        <main className="flex-1 overflow-y-auto">{children}</main>
      </section>
    </div>
  );
}
