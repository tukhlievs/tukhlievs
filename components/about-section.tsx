"use client";

import { BlurFade } from "@/components/motion/blur-fade";
import { TextAnimate } from "@/components/motion/text-animate";
import { Separator } from "@/components/ui/separator";
import { siteData } from "@/lib/site-data";

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 border-t border-border/30">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-12 md:gap-16 items-start">

          {/* Left label */}
          <BlurFade inView delay={0}>
            <div className="space-y-3">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground/60">
                01 — About
              </span>
              <div>
                <p className="text-xs font-mono text-muted-foreground mt-2">
                  {siteData.age} years old
                </p>
                <p className="text-xs font-mono text-muted-foreground">
                  {siteData.location}
                </p>
              </div>
            </div>
          </BlurFade>

          {/* Right content */}
          <div className="space-y-8">
            <TextAnimate
              text={siteData.longBio}
              as="p"
              by="word"
              animation="blurInUp"
              className="text-foreground/90 font-mono text-base sm:text-lg leading-relaxed tracking-tight"
              startOnView
              staggerDelay={0.02}
            />

            <BlurFade inView delay={0.3}>
              <Separator className="bg-border/30" />
            </BlurFade>

            {/* Stats row */}
            <BlurFade inView delay={0.4}>
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-1">
                  <div className="text-2xl font-mono font-bold text-foreground">16</div>
                  <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Age</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-mono font-bold text-foreground">2+</div>
                  <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Years coding</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-mono font-bold text-foreground">∞</div>
                  <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Curiosity</div>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
