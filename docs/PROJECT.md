<!-- Project documentation for the Next.js landing page that lives in this repo.
     The repository root README.md is intentionally preserved as the
     GitHub profile README and is not modified by this commit. -->

# tukhlievs

Personal landing page — Абубакир Тухлиев (Abu).

Stack: **Next.js 14 (App Router)** · **TypeScript (strict)** · **Tailwind CSS** · **Three.js** (`@react-three/fiber`, `@react-three/drei`) · **framer-motion** · **lucide-react**.

The page swaps between a deep-night sky (drifting stars + wireframe city horizon) and a warm daylight scene (floating geometric monoliths) based on the visitor's local clock — a custom `useLocalTime` hook resolves the mode at 18:00–06:00 = night, otherwise day.

## Project structure

```
app/               Layouts, metadata, page routing
components/        UI elements (Hero, ContactCard, …) + Three.js canvas
components/three/  Scene wrapper, NightScene, DayScene
hooks/             useLocalTime, useScreenSize
types/             Strict TypeScript declarations
```

## Quick start

```bash
git clone https://github.com/tukhlievs/tukhlievs.git
cd tukhlievs
pnpm install   # or npm install / yarn / bun
pnpm dev
```

Open `http://localhost:3000`.

## Scripts

| Script           | Purpose                            |
| ---------------- | ---------------------------------- |
| `pnpm dev`       | Local dev server (turbo-fast HMR)  |
| `pnpm build`     | Production build                    |
| `pnpm start`     | Serve production build              |
| `pnpm lint`      | Next + ESLint                       |
| `pnpm typecheck` | `tsc --noEmit` strict pass          |

## Deploy

The repository is ready for **Vercel** (zero-config). Push to `main` and import on vercel.com — no env vars required.

```bash
git remote add origin git@github.com:tukhlievs/tukhlievs.git
git branch -M main
git add .
git commit -m "init: personal landing page"
git push -u origin main
```

## Customisation notes

- Theme colors live in `tailwind.config.ts` (`night.*` and `day.*` palettes) and `app/globals.css` (`:root` / `:root[data-theme="day"]` variables).
- Contact list is the `PLATFORMS` array in `components/ContactCards.tsx`.
- Three.js scenes are mounted via `dynamic({ ssr: false })` to keep the LCP path light.
- `useLocalTime` is SSR-safe — it boots in `night` mode then resyncs after hydration.

## License

MIT © Abubakir Tukhliev
