"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  y?: number;
  as?: "div" | "section" | "article" | "li" | "header";
  once?: boolean;
}

/**
 * Section reveal — fade-up on scroll. Runs on every device, always.
 * No reduced-motion or mobile fallback by design: the visual experience
 * is the product.
 */
export function Reveal({
  className,
  children,
  delay = 0,
  y = 14,
  as = "div",
  once = true,
  ...rest
}: RevealProps) {
  const MotionTag = motion[as] as React.ElementType;

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px 0px -60px 0px", amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
