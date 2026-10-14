import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-[10px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        {
          primary: "bg-black text-white hover:bg-neutral-800 shadow-sm",
          secondary: "border border-[#e0e0e0] bg-white text-[#484848] hover:bg-[#f5f5f5]",
          ghost: "bg-transparent text-[#484848] hover:bg-[#f5f5f5]",
        }[variant],
        {
          sm: "h-9 px-4 text-xs",
          md: "h-11 px-6 text-sm",
          lg: "h-12 px-8 text-base",
        }[size],
        className,
      )}
      {...props}
    />
  );
}
