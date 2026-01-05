"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { usePathname, useRouter } from "next/navigation";

export const DateRange = ({ range, searchParams }: any) => {
  const dateRanges = [
    {
      label: "Today",
      value: "today",
    },
    {
      label: "Last 7 days",
      value: "last-7-days",
    },
    {
      label: "Last 15 days",
      value: "last-15-days",
    },
    {
      label: "Last 30 days",
      value: "last-30-days",
    },
    {
      label: "This Month",
      value: "this-month",
    },
    {
      label: "This Year",
      value: "this-year",
    },
    {
      label: "Last Year",
      value: "last-year",
    },
    {
      label: "All Time",
      value: "all-time",
    },
  ];

  const router = useRouter();
  const pathname = usePathname();

  const handleDateRangeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all-time") {
      params.set("range", value);
    } else {
      params.delete("range");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      <Select
        onValueChange={handleDateRangeChange}
        value={range ? range : "all-time"}
      >
        <SelectTrigger className="w-full sm:min-w-44 focus:border-primary bg-white! shadow-none focus:ring-0! focus:ring-offset-0! focus:outline-none!">
          <SelectValue placeholder="Date" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {dateRanges?.map((item: { label: string; value: string }) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
