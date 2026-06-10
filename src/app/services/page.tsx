import type { Metadata } from "next";
import { tiers, orderContact } from "@/lib/services";

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

      <div className="mt-12 grid gap-6 lg:grid-cols-3 items-start">
        {tiers.map((tier) => (
          <section
            key={tier.slug}
            className={`relative rounded-2xl border bg-white p-7 flex flex-col shadow-[0_1px_2px_rgba(11,18,32,0.04),0_8px_24px_rgba(37,99,235,0.06)] ${
              tier.highlighted
                ? "border-accent/40 shadow-[0_2px_4px_rgba(11,18,32,0.05),0_16px_48px_rgba(37,99,235,0.16)] lg:-mt-3 lg:mb-3"
                : "border-border"
            }`}
          >
            {tier.highlighted && (
              <span className="absolute -top-3 left-7 text-xs font-semibold text-white bg-accent rounded-full px-3 py-1">
                Most popular
              </span>
            )}

            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-xl font-bold tracking-tight">{tier.name}</h2>
              <span className="text-3xl font-bold text-accent">
                {tier.price}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {tier.tagline}
            </p>

            <ul className="mt-6 space-y-3 flex-1">
              {tier.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm leading-relaxed">
                  <svg
                    className="size-5 shrink-0 text-accent mt-px"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M4 10.5l4 4 8-9" />
                  </svg>
                  <span className="text-fg/85">{f}</span>
                </li>
              ))}
            </ul>

            <a
              href={`${orderContact}?text=${encodeURIComponent(`Hi! I'd like to order the ${tier.name} package (${tier.price}).`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-7 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                tier.highlighted
                  ? "bg-accent text-white shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.45)] hover:-translate-y-0.5"
                  : "border border-border bg-white text-fg hover:border-accent/40 hover:text-accent"
              }`}
            >
              Order {tier.name} →
            </a>
          </section>
        ))}
      </div>

      <p className="mt-10 text-sm text-muted leading-relaxed max-w-2xl">
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
