import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-dvh text-2xl">
      <h1 className="font-semibold">404 !Page Not Found</h1>
      <Link href={"/"} className="underline mt-3 text-primary text-base">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
