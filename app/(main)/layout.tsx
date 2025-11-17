import { PropsWithChildren } from "react";
import Sidebar from "./_ui/sidebar/Sidebar";
import Header from "@/components/Shared/header";

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-dvh overflow-hidden">
      <Sidebar className="min-w-64 hidden md:flex shrink-0" />

      <section className="w-full h-dvh flex flex-col">
        <Header />

        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </section>
    </div>
  );
}
