"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Phone } from "lucide-react";

export function BottomNav(): JSX.Element {
  const pathname = usePathname();
  const isContacts = pathname === "/contacts" || pathname === "/contacts/";

  return (
    <nav
      aria-label="Main navigation"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        display: "flex",
        justifyContent: "center",
        padding: "10px 16px",
        paddingBottom: "calc(10px + env(safe-area-inset-bottom))",
        background: "rgba(12,10,8,0.75)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderTop: "1px solid var(--stroke)",
        animation: "blur-in 0.7s 3.0s cubic-bezier(0.22,1,0.36,1) both",
      }}
      className="day:bg-[rgba(240,234,217,0.82)]"
    >
      <div
        style={{
          display: "flex",
          gap: "6px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid var(--stroke)",
          padding: "4px",
          borderRadius: "14px",
          width: "100%",
          maxWidth: "320px",
        }}
      >
        <NavItem href="/" label="General" active={!isContacts}>
          <User size={14} />
        </NavItem>
        <NavItem href="/contacts" label="Contacts" active={isContacts}>
          <Phone size={14} />
        </NavItem>
      </div>
    </nav>
  );
}

function NavItem({
  href,
  label,
  active,
  children,
}: {
  href: string;
  label: string;
  active: boolean;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Link
      href={href}
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "7px",
        padding: "10px 16px",
        borderRadius: "10px",
        fontFamily: "var(--font-mono), monospace",
        fontSize: "11px",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        textDecoration: "none",
        background: active ? "var(--accent)" : "transparent",
        color: active ? "#fff" : "var(--muted)",
        transition: "background 350ms ease, color 350ms ease",
      }}
    >
      {children}
      {label}
    </Link>
  );
}
