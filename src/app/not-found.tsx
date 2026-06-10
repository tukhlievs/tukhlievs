import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-32 text-center">
      <p className="text-sm text-muted">404</p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight">
        Page not found
      </h1>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm hover:border-fg/30 transition-colors"
      >
        ← Back home
      </Link>
    </div>
  );
}
