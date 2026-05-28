"use client";

import { useEffect, useState } from "react";

/** Cycles through roles with a small rise/fade. One distinct text-motion style. */
export default function RotatingRole({
  items,
  interval = 2600,
}: {
  items: readonly string[];
  interval?: number;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((p) => (p + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [items.length, interval]);

  return (
    <span className="role">
      <span className="role-caret" aria-hidden="true">
        &gt;
      </span>
      <span className="role-track">
        {/* key forces remount so the CSS enter animation replays each cycle */}
        <span key={i} className="role-item">
          {items[i]}
        </span>
      </span>
    </span>
  );
}
