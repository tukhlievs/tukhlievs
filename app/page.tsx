import { SiteNav } from "@/components/site-nav";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ConnectSection } from "@/components/connect-section";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      <SiteNav />
      <HeroSection />
      <AboutSection />
      <ConnectSection />

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-mono">
            © 2025 tukhlievs
          </span>
          <span className="text-xs text-muted-foreground font-mono">
            Kokand, Uzbekistan
          </span>
        </div>
      </footer>
    </main>
  );
}
