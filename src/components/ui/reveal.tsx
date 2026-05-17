"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/use-is-mobile";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  y?: number;
  as?: "div" | "section" | "article" | "li" | "header";
  once?: boolean;
}

/**
 * Mobile-safe reveal. Mobile and reduced-motion users see content
 * rendered statically (no IntersectionObserver, no opacity-0 trap).
 * Desktop gets a subtle fade-up.
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
  const prefersReduced = useReducedMotion();
  const isMobile = useIsMobile();

  if (prefersReduced || isMobile) {
    const Tag = as as React.ElementType;
    return (
      <Tag className={cn(className)} {...rest}>
        {children}
      </Tag>
    );
  }

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
