import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

const buttonStyles = {
  base: "inline-flex items-center justify-center rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
  variants: {
    primary:
      "bg-[#F4B42A] text-[#1A1A1A] shadow-[0_12px_30px_rgba(244,180,42,0.24)] hover:bg-[#e6a81f] focus-visible:ring-[#F4B42A]",
    secondary:
      "border border-[#D1D5DB] bg-[#F7F7F7] text-[#272A30] hover:bg-white focus-visible:ring-[#1E1F24]",
  },
  sizes: {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm sm:px-6",
    lg: "px-5 py-3 text-sm sm:px-8",
  },
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonStyles.base, buttonStyles.variants[variant], buttonStyles.sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
