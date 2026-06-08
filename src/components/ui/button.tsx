"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "no-tap-highlight inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-tight transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary:
          "relative text-ink-950 bg-gradient-to-b from-ember-100 via-ember-300 to-ember-500 hover:from-ember-50 hover:via-ember-200 hover:to-ember-400 shadow-[0_14px_34px_-18px_rgba(236,139,42,0.9)] hover:shadow-[0_18px_44px_-18px_rgba(236,139,42,0.95)] active:scale-[0.98]",
        secondary:
          "border border-ember-300/24 bg-ink-950/35 text-ember-50 hover:bg-ember-300/[0.08] hover:border-ember-300/45 backdrop-blur-md active:scale-[0.98]",
        ghost:
          "text-ember-50/85 hover:text-ember-50 hover:bg-ember-300/[0.06]",
        link: "text-ember-300 underline-offset-4 hover:underline px-0 py-0 rounded-none",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-[15px]",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-7 text-[17px]",
      },
    },
    defaultVariants: { variant: "primary", size: "lg" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export interface AnchorButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {}

export const AnchorButton = React.forwardRef<
  HTMLAnchorElement,
  AnchorButtonProps
>(({ className, variant, size, ...props }, ref) => {
  return (
    <a
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
});
AnchorButton.displayName = "AnchorButton";

export { buttonVariants };
