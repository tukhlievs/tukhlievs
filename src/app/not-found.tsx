import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-32 text-center px-5">
      <p className="text-sm font-medium text-accent">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">
        Page not found
      </h1>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-full bg-accent text-white px-6 py-3 text-sm font-semibold shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.45)] hover:-translate-y-0.5 transition-all"
      >
        ← Back home
      </Link>
    </div>
  );
}
