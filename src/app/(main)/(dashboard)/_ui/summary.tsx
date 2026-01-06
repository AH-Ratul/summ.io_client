"use client";

const SummaryCard = ({ title, value, icon }: TProps) => {
  return (
    <div className="w-full h-32 shadow-sm rounded-md p-6 bg-white text-xl flex flex-col justify-between">
      <p className="font-bold">{title}</p>
      <p className="font-semibold text-primary">
        {icon ? icon : null} {value}
      </p>
    </div>
  );
};

export default SummaryCard;

type TProps = {
  title: string;
  value: number | undefined;
  icon?: string | boolean;
};
