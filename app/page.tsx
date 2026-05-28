"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import type { ThemeMode } from "@/types";
import { Hero } from "@/components/Hero";
import { ContactCards } from "@/components/ContactCards";
import { useLocalTime } from "@/hooks/useLocalTime";

const SceneCanvas = dynamic(
  () => import("@/components/three/SceneCanvas").then((m) => m.SceneCanvas),
  { ssr: false }
);

const IMG = {
  kokand:
    "https://hyperagent.com/api/files/usergenerated/threads/cmpowu3uz01mk07ad53082hvc/images/e8f9cc87-5866-442d-8eb0-e8745a762834.png",
  desk: "https://hyperagent.com/api/files/usergenerated/threads/cmpowu3uz01mk07ad53082hvc/images/f75d0333-93a6-4cb1-aa8d-c17e2ad08af0.png",
  books:
    "https://hyperagent.com/api/files/usergenerated/threads/cmpowu3uz01mk07ad53082hvc/images/0bb75772-a22d-491e-9ace-e6052756a76a.png",
} as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HomePage(): JSX.Element {
  const { mode, isReady } = useLocalTime();

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  return (
    <main className="relative isolate min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-90">
        <SceneCanvas mode={mode} />
      </div>
      <div className="grain-overlay" aria-hidden />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative z-[3] mx-auto max-w-[920px] px-7 py-9 sm:px-14 sm:py-14 lg:px-20 lg:py-[72px]"
      >
        <TopStrip mode={mode} />
        <Hero mode={mode} />
        <Manifest />
        <BleedImage
          src={IMG.kokand}
          alt="Коканд на закате — узкая улица старого города в тёплом боковом свете"
          caption="Коканд / Старый город / золотой час"
        />
        <Now imgSrc={IMG.desk} />
        <Path />
        <Reading imgSrc={IMG.books} />
        <ContactCards />
        <Colophon mode={mode} />
      </motion.div>
    </main>
  );
}

/* ────────────────────────────────────────────────────────────────── */

function TopStrip({ mode }: { mode: ThemeMode }): JSX.Element {
  return (
    <header className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex items-center gap-3"
      >
        <span className="pulse-dot" />
        <span>Personal page · v2 · {new Date().getFullYear()}</span>
      </motion.div>
      <motion.span
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
        className="inline-flex items-center gap-2 rounded-full border border-[color:var(--stroke)] px-3.5 py-1.5"
      >
        <span className="size-1.5 rounded-full bg-[color:var(--accent)]" />
        {mode === "night" ? "Night" : "Day"}
      </motion.span>
    </header>
  );
}

interface SectionHeadProps {
  readonly num: string;
  readonly title: string;
  readonly eyebrow: string;
}

function SectionHead({ num, title, eyebrow }: SectionHeadProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="mb-7 flex items-baseline gap-4"
    >
      <span className="whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.24em] text-[color:var(--accent)]">
        {num}
      </span>
      <h2 className="max-w-[14ch] text-balance font-display text-[clamp(2.2rem,5.8vw,3.4rem)] font-normal italic leading-[1.05] tracking-[-0.015em]">
        {title}
      </h2>
      <span className="section-rule" aria-hidden />
      <span className="whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.24em] text-[color:var(--muted)]">
        {eyebrow}
      </span>
    </motion.div>
  );
}

function Manifest(): JSX.Element {
  return (
    <section className="mt-28 sm:mt-36">
      <SectionHead num="01 ━" title="Зачем эта страница" eyebrow="Манифест" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        className="prose-content max-w-[36em] text-[clamp(1.02rem,1.45vw,1.115rem)] leading-[1.66]"
      >
        <p>
          Это место, куда я свожу самое важное про себя — без раздутых
          биографий и без списков навыков, которые ничего не значат. Один URL,
          три ссылки, немного текста.{" "}
          <span className="text-[color:var(--muted)]">
            Я не пытаюсь продать себя крупными словами; пытаюсь честно
            зафиксировать, кто я сейчас и куда иду.
          </span>
        </p>
        <p>
          Я — Абубакир Тухлиев, шестнадцать лет, Узбекистан, Коканд. Веду эту
          страницу как первый серьёзный фронтенд-проект и одновременно как
          тихую витрину. Если у тебя есть, что мне сказать — самый быстрый
          способ внизу. Если просто пришёл посмотреть — спасибо за внимание.
        </p>
      </motion.div>
    </section>
  );
}

interface BleedImageProps {
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
}

function BleedImage({ src, alt, caption }: BleedImageProps): JSX.Element {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="bleed mt-14"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="block h-auto w-full"
        style={{ filter: "saturate(0.92) contrast(1.02)" }}
      />
      <figcaption className="mx-auto mt-3.5 flex max-w-[920px] items-center gap-3 px-7 font-mono text-[10.5px] uppercase tracking-[0.2em] text-[color:var(--muted)] sm:px-14 lg:px-20">
        <span aria-hidden className="text-[9px] text-[color:var(--accent)]">▢</span>
        {caption}
      </figcaption>
    </motion.figure>
  );
}

function Now({ imgSrc }: { imgSrc: string }): JSX.Element {
  return (
    <section className="mt-28 sm:mt-36">
      <SectionHead num="02 ━" title="Чем занят прямо сейчас" eyebrow="Now" />
      <div className="grid gap-10 sm:grid-cols-[1.2fr_0.85fr] sm:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="prose-content max-w-[36em] text-[clamp(1.02rem,1.45vw,1.115rem)] leading-[1.66]"
        >
          <p>
            Учу <em className="k">Python</em>. Не курсами по диагонали, а через
            задачи: пишу маленькие утилиты, разбираю чужой код, читаю про
            чистую архитектуру. Параллельно прокачиваю математику, без которой
            ML — это просто магия:{" "}
            <span className="text-[color:var(--muted)]">
              линейная алгебра, производные, основы статистики и теории
              вероятностей.
            </span>
          </p>
          <p>
            По будням стабильно два-три часа после школы и работы. Выходные
            оставляю на проекты — там можно сесть подольше и не выныривать
            каждые пятнадцать минут.
          </p>
          <p>
            Ближайшая большая цель — собрать первый полноценный ML-проект к
            концу следующего года и попробовать податься на стажировку. Не{" "}
            <em className="k">грандиозный</em>, а честный: с осмысленной
            постановкой задачи, нормальной валидацией и репозиторием, который
            не стыдно показать.
          </p>
        </motion.div>
        <FrameImage
          src={imgSrc}
          alt="Рабочий стол с открытой тетрадью с написанным карандашом кодом и кружкой чая"
          mark="№ 02 / Стол"
        />
      </div>
    </section>
  );
}

function Path(): JSX.Element {
  return (
    <section className="mt-28 sm:mt-36">
      <SectionHead num="03 ━" title="Куда иду" eyebrow="Path" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="prose-content max-w-[36em] text-[clamp(1.02rem,1.45vw,1.115rem)] leading-[1.66]"
      >
        <p>
          Долгосрочная цель — стать <em className="k">ML/AI инженером</em>. Это
          не вспышка увлечения, а решение, к которому я пришёл, понимая, что
          мне в нём интересно: математика, оптимизация, идея учить машину
          обобщать на новое.
        </p>
        <p>
          Иду без гонки. У меня нет жёсткого дедлайна и нет амбиции выложить к
          концу года грандиозный проект. Есть план — пройти подряд несколько
          глубоких стадий: основы Python, структуры данных и алгоритмы,
          классический ML, нейросети, один настоящий проект, стажировка.{" "}
          <span className="text-[color:var(--muted)]">
            На каждой стадии задерживаюсь столько, сколько нужно, чтобы не
            оставалось белых пятен.
          </span>
        </p>
      </motion.div>

      <motion.blockquote
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
        className="mt-16 max-w-[28em] border-l border-[color:var(--rule)] py-8 pl-9 font-display text-[clamp(1.35rem,2.8vw,1.8rem)] italic leading-[1.32]"
      >
        Глубина важнее скорости. Если на каждом шаге понимаешь, что и зачем —
        следующий шаг сам встаёт на место.
        <cite className="mt-4 block font-mono text-[10.5px] not-italic uppercase tracking-[0.22em] text-[color:var(--muted)]">
          Личный принцип / 2026
        </cite>
      </motion.blockquote>
    </section>
  );
}

function Reading({ imgSrc }: { imgSrc: string }): JSX.Element {
  return (
    <section className="mt-28 sm:mt-36">
      <SectionHead num="04 ━" title="Что меня формирует" eyebrow="Reading" />
      <div className="grid gap-10 sm:grid-cols-[0.85fr_1.2fr] sm:gap-16">
        <FrameImage
          src={imgSrc}
          alt="Стопка потёртых книг на подоконнике в утреннем свете"
          mark="№ 04 / Полка"
        />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="prose-content max-w-[36em] text-[clamp(1.02rem,1.45vw,1.115rem)] leading-[1.66]"
        >
          <p>
            Книги, которые сейчас вызывают у меня желание подумать — а не
            просто пролистать ленту: <em className="k">Fluent Python</em>{" "}
            (Лучано Рамальо),{" "}
            <em className="k">Designing Data-Intensive Applications</em>{" "}
            (Мартин Клеппман),{" "}
            <em className="k">Hands-On Machine Learning</em> (Орельен Жерон).
          </p>
          <p>
            Из людей — Andrej Karpathy с его серией{" "}
            <em className="k">Neural Networks: Zero to Hero</em>, Григорий
            Сапунов с постами про ML, и редкие разборы внутри Anthropic и
            DeepMind.
          </p>
          <p className="text-[color:var(--muted)]">
            Чтение для меня — не способ убить время, а способ занять голову
            мыслями, которыми хочется заниматься.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function FrameImage({
  src,
  alt,
  mark,
}: {
  src: string;
  alt: string;
  mark: string;
}): JSX.Element {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
      className="relative m-0"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="block h-auto w-full rounded-sm"
        style={{ filter: "saturate(0.92) contrast(1.02)" }}
      />
      <span className="absolute -bottom-2.5 -left-2.5 border border-[color:var(--stroke)] bg-[color:var(--bg)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
        {mark}
      </span>
    </motion.figure>
  );
}

function Colophon({ mode }: { mode: ThemeMode }): JSX.Element {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="mt-32 grid grid-cols-1 gap-6 border-t border-[color:var(--rule)] pt-8 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--muted)] sm:grid-cols-3 sm:gap-8"
    >
      <div>
        <h3 className="mb-2.5 font-medium text-[color:var(--muted-2)]">Set in</h3>
        <p className="mb-1 text-[color:var(--fg)]">Fraunces</p>
        <p className="mb-1 text-[color:var(--fg)]">Onest</p>
        <p className="text-[color:var(--fg)]">JetBrains Mono</p>
      </div>
      <div>
        <h3 className="mb-2.5 font-medium text-[color:var(--muted-2)]">Built with</h3>
        <p className="mb-1 text-[color:var(--fg)]">Next.js 14 · TS</p>
        <p className="mb-1 text-[color:var(--fg)]">Tailwind · Three.js</p>
        <p className="text-[color:var(--fg)]">Deployed to GH Pages</p>
      </div>
      <div>
        <h3 className="mb-2.5 font-medium text-[color:var(--muted-2)]">Colophon</h3>
        <p className="mb-1 text-[color:var(--fg)]">© {new Date().getFullYear()} A. Тухлиев</p>
        <p className="mb-1 text-[color:var(--fg)]">
          <a
            href="https://github.com/tukhlievs/tukhlievs"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-[color:var(--rule)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
          >
            source ↗
          </a>
        </p>
        <p className="text-[color:var(--fg)]">{mode === "night" ? "Night" : "Day"} build</p>
      </div>
    </motion.footer>
  );
}
