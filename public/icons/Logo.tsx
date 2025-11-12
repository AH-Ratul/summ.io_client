import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <Link href="/">
        <h1 className="font-extrabold text-2xl text-primary">Summ.io</h1>
      </Link>
    </div>
  );
};

export default Logo;
