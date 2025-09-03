import React, { useMemo } from "react";

type Props = {
  name: string;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
};

export default function UserAvatar({ name, className, size = "md" }: Props) {
  const initials = useMemo(() => 
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    [name]
  );

  const sizeClasses = useMemo(() => {
    switch (size) {
      case "xs":
        return "h-3 w-3 text-[8px]";
      case "sm":
        return "h-8 w-8 text-[10px]";
      case "lg":
        return "h-12 w-12 text-base";
      case "md":
      default:
        return "h-10 w-10 text-sm";
    }
  }, [size]);

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-slate-800 text-white font-semibold ${sizeClasses} ${className ?? ""}`}
      aria-hidden
    >
      {initials}
    </div>
  );
}


