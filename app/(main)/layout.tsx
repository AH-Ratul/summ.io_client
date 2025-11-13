import { PropsWithChildren } from "react";
import Sidebar from "./_ui/sidebar/Sidebar";

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <main className="flex w-full h-dvh">
      <Sidebar className="min-w-64 hidden md:flex" />

      <section className="w-full h-dvh">{children}</section>
    </main>
  );
}
