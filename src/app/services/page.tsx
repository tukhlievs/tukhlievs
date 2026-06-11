import type { Metadata } from "next";
import { orderContact } from "@/lib/services";
import { Pricing } from "@/components/Pricing";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites built end to end: landing pages from $10, full sites from $50, e-commerce from $150.",
};

export default function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
      <h1 className="text-4xl font-bold tracking-tight">Services</h1>
      <p className="mt-4 text-lg text-muted leading-relaxed max-w-2xl">
        I build websites end to end — from a one-evening landing page to a
        store with payments. Fixed price, clear scope, deployed and live.
      </p>

      <div className="mt-16 sm:mt-20">
        <Pricing />
      </div>

      <p className="mt-12 text-sm text-muted leading-relaxed max-w-2xl">
        Not sure which one fits? Message me on{" "}
        <a
          href={orderContact}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
        >
          Telegram
        </a>{" "}
        — describe the task and I&apos;ll suggest the right scope.
      </p>
    </div>
  );
}
