"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { HyperText } from "@/components/motion/hyper-text";
import { WordRotate } from "@/components/motion/word-rotate";
import { BlurFade } from "@/components/motion/blur-fade";
import { Badge } from "@/components/ui/badge";
import { siteData } from "@/lib/site-data";
import { ArrowDown } from "lucide-react";

// Load Three.js only on client
const ThreeBackground = dynamic(
  () =>
    import("@/components/three-background").then((m) => ({
      default: m.ThreeBackground,
    })),
  { ssr: false }
);

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-overlay">
      {/* Three.js architectural background */}
      <ThreeBackground />

      {/* Gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40 pointer-events-none z-[1]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">

        {/* Location badge */}
        <BlurFade delay={0.1}>
          <Badge
            variant="ghost"
            className="mb-8 text-xs tracking-[0.2em] uppercase"
          >
            <span className="mr-1.5 text-[10px]">◉</span>
            Kokand, Uzbekistan
          </Badge>
        </BlurFade>

        {/* Name — HyperText scramble on load */}
        <BlurFade delay={0.2}>
          <HyperText
            text="ABUBAKIR TUKHLIEV"
            duration={1200}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-mono font-bold tracking-tight text-foreground leading-none"
            animateOnLoad
          />
        </BlurFade>

        {/* Rotating tagline — WordRotate */}
        <BlurFade delay={0.45} className="mt-5">
          <div className="flex items-center gap-3 text-muted-foreground text-sm sm:text-base font-mono tracking-wider">
            <span className="text-border">—</span>
            <WordRotate
              words={siteData.taglines as unknown as string[]}
              duration={2800}
              className="min-w-[200px] text-muted-foreground"
            />
            <span className="text-border">—</span>
          </div>
        </BlurFade>

        {/* Short bio */}
        <BlurFade delay={0.6} className="mt-8 max-w-xl">
          <p className="text-muted-foreground text-sm font-mono leading-relaxed">
            {siteData.shortBio}
          </p>
        </BlurFade>

        {/* Skill badges */}
        <BlurFade delay={0.75} className="mt-6">
          <div className="flex flex-wrap justify-center gap-2">
            {siteData.skills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.85 + i * 0.07,
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Badge variant="outline" className="text-xs font-mono tracking-wider uppercase">
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </BlurFade>

        {/* CTA */}
        <BlurFade delay={0.95} className="mt-12">
          <a
            href="#connect"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors tracking-[0.2em] uppercase group"
          >
            Connect with me
            <motion.span
              animate={{ y: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <ArrowDown className="w-3 h-3" />
            </motion.span>
          </a>
        </BlurFade>
      </div>

      {/* Grid coordinates decoration */}
      <div className="absolute bottom-8 left-6 z-10">
        <BlurFade delay={1.1}>
          <span className="text-[10px] font-mono text-border/60 tracking-widest uppercase">
            40.5281° N / 70.9428° E
          </span>
        </BlurFade>
      </div>
      <div className="absolute bottom-8 right-6 z-10">
        <BlurFade delay={1.1}>
          <span className="text-[10px] font-mono text-border/60 tracking-widest uppercase">
            v1.0.0 — 2025
          </span>
        </BlurFade>
      </div>
    </section>
  );
}
