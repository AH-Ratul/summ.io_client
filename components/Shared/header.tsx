"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { logoutUser } from "@/src/api/query/auth.query";
import { LockKeyhole, LogOut, Menu, Search } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Header = () => {
  const router = useRouter();
  const session = useSession();
  const name = session?.data?.user?.name?.slice(0, 1);

  const logout = async () => {
    await logoutUser();
    await signOut({
      redirect: false,
    });
    router.push("/login");
    toast.success("You are Logged out");
  };
  return (
    <div className="flex justify-between items-center border-b py-5 px-5">
      <div className="flex items-center gap-10">
        <button className="p-2 rounded-sm  border-gray-200 text-gray-600 transition-all duration-200 ease-in-out hover:border-primary-500 shadow-sm hover:text-primary-500 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer">
          <Menu size={24} className="text-current" />
        </button>

        <div className="relative flex items-center">
          <Input
            type="text"
            placeholder="Search"
            className="shadow-none bg-background border-primary ps-8 py-5 focus:ring-primary focus:ring-1"
          />
          <Search size={25} className="absolute text-muted-foreground ps-2" />
        </div>
      </div>

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="border outline-none rounded-lg w-11 h-11 text-3xl font-extrabold text-white bg-primary cursor-pointer">
            {name?.toUpperCase()}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-2">
            <DropdownMenuLabel className="flex flex-col pt-0">
              <span className="font-bold text-xl">
                {session.data?.user.name}
              </span>
              <span className="text-muted-foreground">
                {session.data?.user.email}
              </span>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <Link href={"/change-password"}>
              <DropdownMenuItem className="text-sm mt-2 px-3 focus:bg-primary focus:text-white cursor-pointer">
                <LockKeyhole className="focus:text-white" /> Change Password
              </DropdownMenuItem>
            </Link>

            <button onClick={logout} className="w-full">
              <DropdownMenuItem className="text-sm text-red-700 px-3 focus:bg-red-700 focus:text-white cursor-pointer">
                <LogOut className="focus:text-white" /> Log Out
              </DropdownMenuItem>
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
