import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { LockKeyhole, LogOut, Search } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const name = "a";
  return (
    <div className="flex justify-between items-center border-b py-5 px-5 ">
      <div>
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
          <DropdownMenuTrigger className="border outline-none rounded-lg w-11 h-11 text-3xl font-extrabold text-white bg-primary">
            {name.toUpperCase()}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-2">
            <DropdownMenuLabel className="flex flex-col pt-0">
              <span className="font-bold text-xl">Admin</span>
              <span className="text-muted-foreground">admin@e.com</span>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <Link href={"/change-password"}>
              <DropdownMenuItem className="text-sm mt-2 px-3 focus:bg-primary focus:text-white cursor-pointer">
                <LockKeyhole className="focus:text-white" /> Change Password
              </DropdownMenuItem>
            </Link>

            <button className="w-full">
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
