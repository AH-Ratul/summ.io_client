import Link from "next/link";

const Logo = () => {
  return (
    <>
      <Link
        href="/"
        className="font-extrabold text-2xl text-primary ml-2 mt-3 w-fit"
      >
        Summ.io
      </Link>
    </>
  );
};

export default Logo;
