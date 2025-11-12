import { PropsWithChildren } from "react";
import Sidebar from "./_ui/sidebar/Sidebar";

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <main className="flex w-full h-dvh">
      <Sidebar />

      <div>{children}</div>
    </main>
  );
}
