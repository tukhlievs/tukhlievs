import { site } from "@/lib/site-data";
import { SocialIcon, ArrowIcon } from "@/components/icons";

/** Quick links to socials — the primary purpose of the page. */
export default function SocialLinks() {
  return (
    <ul className="socials">
      {site.socials.map((s) => (
        <li key={s.name}>
          <a
            className="social"
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.name} — ${s.handle}`}
          >
            <span className="social-ic">
              <SocialIcon name={s.icon} />
            </span>
            <span className="social-name">{s.name}</span>
            <span className="social-handle">{s.handle}</span>
            {s.note ? <span className="social-note">{s.note}</span> : <span className="social-note social-note--empty" />}
            <span className="social-arrow">
              <ArrowIcon />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
