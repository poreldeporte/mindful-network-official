type ColorType = "orange" | "green" | "blue";

interface Props {
  children: React.ReactNode;
  className?: string;
  isSelected?: boolean;
  color?: ColorType;
}

export const Badge = ({
  children,
  className = "",
  isSelected = true,
  color = "orange",
}: Props) => {
  const colorClasses: Record<ColorType, string> = {
    orange: `${
      isSelected ? "bg-orange-700 text-white" : "bg-transparent text-black"
    } border-orange-700`,
    green: `${
      isSelected ? "bg-green-600 text-white" : "bg-transparent text-black"
    } border-green-600`,
    blue: `${
      isSelected ? "bg-blue-600 text-white" : "bg-transparent text-black"
    } border-blue-600`,
  };

  const colorClass = colorClasses[color] || "";
  return (
    <span
      className={`${className} ${colorClass} text-sm rounded-full px-2.5 py-0.5 border font-medium`}
    >
      {children}
    </span>
  );
};
