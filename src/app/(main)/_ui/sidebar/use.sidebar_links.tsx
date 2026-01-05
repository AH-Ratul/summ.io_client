import { Box, HandCoins, LayoutDashboard, Wallet } from "lucide-react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export type TSideBarItem = {
  label: string;
  icon: ReactNode;
  href?: string;
  isActive?: boolean;
  items?: { label?: string; href?: string; isActive?: boolean }[];
};

export const useSidebarLinks = () => {
  const pathname = usePathname();

  const exactMatch = (href: string) => pathname === href;
  const partialMatch = (href: string) => pathname.startsWith(href);

  const sidebarLinks: TSideBarItem[] = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={16} />,
      href: "/",
      isActive: exactMatch("/"),
    },
    {
      label: "Product",
      icon: <Box size={16} />,
      isActive: partialMatch("/product"),
      items: [
        {
          label: "View Products",
          href: "/product",
          isActive: exactMatch("/product"),
        },
        {
          label: "Add Products",
          href: "/product/add",
          isActive: partialMatch("/product/add"),
        },
      ],
    },
    {
      label: "Sales",
      icon: <HandCoins size={16} />,
      isActive: partialMatch("/sales"),
      items: [
        {
          label: "View Sales",
          href: "/sales",
          isActive: exactMatch("/sales"),
        },
      ],
    },
    {
      label: "Expense",
      icon: <Wallet size={16} />,
      isActive: partialMatch("/expense"),
      items: [
        {
          label: "Categories",
          href: "/expense/categories",
          isActive: exactMatch("/expense/categories"),
        },
        {
          label: "Expenses",
          href: "/expense",
          isActive: exactMatch("/expense"),
        },
      ],
    },
  ];

  return { sidebarLinks };
};
