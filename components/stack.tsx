import { site } from "@/lib/site-data";

function Group({ label, items }: { label: string; items: readonly string[] }) {
  return (
    <div className="stack-group">
      <span className="stack-sub">{label}</span>
      <ul className="chips">
        {items.map((it) => (
          <li key={it} className="chip">
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** What I work with — clean monospace chips, no badge clutter. */
export default function Stack() {
  return (
    <div className="stack">
      <Group label="AI" items={site.stack.ai} />
      <Group label="Tools" items={site.stack.tools} />
    </div>
  );
}
