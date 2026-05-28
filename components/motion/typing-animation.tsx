"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  text: string;
  duration?: number;
  className?: string;
  cursor?: boolean;
  startDelay?: number;
}

export function TypingAnimation({
  text,
  duration = 60,
  className,
  cursor = true,
  startDelay = 0,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setStarted(true);
    }, startDelay);
    return () => clearTimeout(delayTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => clearInterval(typingEffect);
  }, [text, duration, started]);

  return (
    <span className={cn("inline-flex items-center", className)}>
      {displayedText}
      {cursor && (
        <span
          className="inline-block w-[2px] h-[1em] bg-current ml-[2px] animate-blink"
          aria-hidden="true"
        />
      )}
    </span>
  );
}
