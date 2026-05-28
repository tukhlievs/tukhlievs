"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  framerProps?: {
    initial?: object;
    animate?: object;
    exit?: object;
    transition?: object;
  };
  className?: string;
}

export function WordRotate({
  words,
  duration = 2500,
  framerProps = {
    initial: { opacity: 0, y: 16, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -16, filter: "blur(4px)" },
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prevIndex) => (prevIndex + 1) % words.length),
      duration
    );
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div className="overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className={cn("inline-block", className)}
          {...framerProps}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
