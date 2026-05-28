import { site } from "@/lib/site-data";
import { SocialIcon } from "@/components/icons";
import Atmosphere from "@/components/atmosphere";
import Reveal from "@/components/reveal";
import RotatingRole from "@/components/rotating-role";
import Clock from "@/components/clock";
import SocialLinks from "@/components/social-links";
import Stack from "@/components/stack";

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <Atmosphere />

      <div className="frame">
        <header className="topbar">
          <span className="brand">~/{site.handle}</span>
          <span className="topbar-right">
            <span className="status">
              <span className="dot" aria-hidden="true" />
              available
            </span>
            <span className="sep" aria-hidden="true">
              /
            </span>
            <span className="clock-wrap">
              <Clock timeZone={site.timeZone} className="clock" />
              <span className="clock-tz">Kokand</span>
            </span>
          </span>
        </header>

        <main className="main">
          {/* ---- Hero / quick about-me ---- */}
          <section className="hero">
            <div className="hero-avatar anim anim-scale d0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={site.avatar}
                alt={site.name}
                width={88}
                height={88}
                loading="eager"
              />
            </div>

            <p className="eyebrow anim anim-fade d1">
              <span className="wave">{site.greeting}</span>
              <span aria-hidden="true">👋</span>
              <span className="eyebrow-dot" aria-hidden="true" />
              <span className="eyebrow-loc">{site.locationShort}</span>
            </p>

            <h1 className="name anim anim-blur d2">{site.name}</h1>

            <p className="role-line anim anim-fade d3">
              <RotatingRole items={site.roles} />
            </p>

            <p className="bio anim anim-fade d4">{site.bio}</p>

            <ul className="meta anim anim-fade d5">
              <li>{site.age} y/o</li>
              <li>{site.location}</li>
              <li className="meta-goal">→ {site.goal}</li>
            </ul>

            <div className="cta anim anim-fade d6">
              <a
                className="btn btn-primary"
                href={site.socials[0].href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon name="telegram" />
                Message me on Telegram
              </a>
              <a
                className="btn btn-ghost"
                href="https://github.com/tukhlievs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon name="github" />
                GitHub
              </a>
            </div>
          </section>

          {/* ---- Stack ---- */}
          <Reveal as="section" className="block">
            <span className="block-label">Stack</span>
            <Stack />
          </Reveal>

          {/* ---- Socials (primary CTA section) ---- */}
          <Reveal as="section" className="block connect">
            <span className="block-label">Elsewhere</span>
            <h2 className="connect-title">
              Find me <span className="accent">online</span>.
            </h2>
            <SocialLinks />
          </Reveal>
        </main>

        <footer className="footer">
          <span>{site.location}</span>
          <span className="footer-mid">Next.js · React · Three.js</span>
          <span>© {year}</span>
        </footer>
      </div>
    </>
  );
}
