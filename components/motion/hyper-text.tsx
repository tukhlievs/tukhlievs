"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

interface HyperTextProps {
  text: string;
  duration?: number;
  framerProps?: {
    initial?: object;
    animate?: object;
    transition?: object;
  };
  className?: string;
  animateOnLoad?: boolean;
}

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export function HyperText({
  text,
  duration = 800,
  framerProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.15, ease: "easeIn" },
  },
  className,
  animateOnLoad = true,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(text.split(""));
  const [trigger, setTrigger] = useState(false);
  const interations = useRef(0);
  const isFirstRender = useRef(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  const triggerAnimation = () => setTrigger(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    const startAnimation = () => {
      controls.start("animate");
      interval = setInterval(() => {
        if (interations.current < text.length) {
          setDisplayText((t) =>
            t.map((l, i) =>
              l === " "
                ? l
                : i <= interations.current
                  ? text[i]
                  : alphabets[getRandomInt(26)]
            )
          );
          interations.current = interations.current + 0.1;
        } else {
          if (interval) clearInterval(interval);
        }
      }, duration / (text.length * 10));
    };

    if (!animateOnLoad && isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isInView || trigger) {
      startAnimation();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [text, duration, trigger, controls, isInView, animateOnLoad]);

  return (
    <div
      className="overflow-hidden flex cursor-default"
      ref={ref}
      onMouseEnter={triggerAnimation}
    >
      {displayText.map((letter, i) => (
        <motion.span
          key={i}
          className={cn(
            "font-mono",
            letter === " " ? "w-3" : "",
            className
          )}
          {...framerProps}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
}
