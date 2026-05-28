"use client";

import { motion, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type AnimationVariant =
  | "fadeIn"
  | "blurIn"
  | "blurInUp"
  | "blurInDown"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scaleUp"
  | "scaleDown";

const animationVariants: Record<AnimationVariant, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
  },
  blurIn: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    show: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.5 } },
  },
  blurInUp: {
    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  },
  blurInDown: {
    hidden: { opacity: 0, filter: "blur(10px)", y: -20 },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  },
  slideDown: {
    hidden: { opacity: 0, y: -30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  },
  slideRight: {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.85 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  },
  scaleDown: {
    hidden: { opacity: 0, scale: 1.15 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  },
};

interface TextAnimateProps {
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: React.ElementType;
  by?: "word" | "character" | "line" | "text";
  animation?: AnimationVariant;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  startOnView?: boolean;
}

export function TextAnimate({
  text,
  as: Tag = "p",
  by = "word",
  animation = "blurInUp",
  className,
  delay = 0,
  staggerDelay = 0.04,
  startOnView = true,
}: TextAnimateProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const segments =
    by === "word"
      ? text.split(" ")
      : by === "character"
        ? text.split("")
        : by === "line"
          ? text.split("\n")
          : [text];

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const childVariants = animationVariants[animation];

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={!startOnView || isInView ? "show" : "hidden"}
    >
      <Tag className={cn("flex flex-wrap gap-x-[0.25em]", className)}>
        {segments.map((segment, i) => (
          <motion.span
            key={i}
            variants={childVariants}
            className={by === "character" ? "inline-block" : "inline-block"}
          >
            {segment}
            {by === "word" && i < segments.length - 1 ? "" : ""}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}
