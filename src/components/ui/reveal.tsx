"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  y?: number;
  as?: "div" | "section" | "article" | "li" | "header";
  once?: boolean;
}

/**
 * Section reveal — fade-up on scroll.
 *
 * Respects `prefers-reduced-motion`: under that preference we render
 * children at their final visual state with no animation. A 14px y-shift
 * is below most vestibular thresholds, but compounded across ~20 Reveal
 * instances per page it adds up enough to warrant the gate.
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
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <MotionTag className={cn(className)} {...rest}>
        {children}
      </MotionTag>
    );
  }

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
