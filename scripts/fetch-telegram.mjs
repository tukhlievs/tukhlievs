// Парсит публичную ленту t.me/s/skenvco и пишет src/data/telegram.json.
// Картинки постов скачивает в public/blog/tg/ (URL Telegram CDN протухают).
// Запускается в prebuild на CI — лента обновляется на каждом деплое.
// При любой ошибке НЕ трогает существующий telegram.json (fallback в репо)
// и выходит с кодом 0, чтобы не ронять сборку.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";

// node fetch не умеет HTTPS_PROXY; в средах за прокси падаем на curl
async function get(url, binary = false) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; site-build)" },
    });
    if (!res.ok) throw new Error(`${res.status}`);
    return binary ? Buffer.from(await res.arrayBuffer()) : await res.text();
  } catch {
    const out = execFileSync(
      "curl",
      ["-sf", "-A", "Mozilla/5.0 (compatible; site-build)", url],
      { maxBuffer: 32 * 1024 * 1024, encoding: binary ? "buffer" : "utf8" },
    );
    return out;
  }
}

const CHANNEL = "skenvco";
const OUT = "src/data/telegram.json";
const IMG_DIR = "public/blog/tg";
const MAX_POSTS = 30;

// Служебные посты канала ("Channel created", смена названия/фото) — не контент
const SERVICE_RE =
  /^(Channel (created|name was changed|photo (changed|updated|removed))|Pinned message)/i;

function decodeEntities(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ");
}

// Telegram-разметку поста сводим к простому HTML: b/i/a/br, остальное — в текст
function sanitize(html) {
  let s = html;
  s = s.replace(/<tg-emoji[^>]*>([\s\S]*?)<\/tg-emoji>/g, "$1"); // кастом-эмодзи → юникод внутри
  s = s.replace(/<i class="emoji"[^>]*><b>([\s\S]*?)<\/b><\/i>/g, "$1");
  s = s.replace(/<br\s*\/?>/gi, "\n");
  s = s.replace(/<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, t) =>
    /^https?:\/\//.test(href) ? `<a href="${href}">${t}</a>` : t,
  );
  s = s.replace(/<(b|strong)>([\s\S]*?)<\/\1>/gi, "<b>$2</b>");
  s = s.replace(/<(i|em)>([\s\S]*?)<\/\1>/gi, "<i>$2</i>");
  s = s.replace(/<(?!\/?(b|i|a)( |>|\/))[^>]+>/g, ""); // всё прочее долой
  return decodeEntities(s).trim();
}

async function fetchImage(url, name) {
  const buf = await get(url, true);
  if (!buf?.length) throw new Error("empty image");
  mkdirSync(IMG_DIR, { recursive: true });
  const file = `${IMG_DIR}/${name}.jpg`;
  writeFileSync(file, buf);
  return `/blog/tg/${name}.jpg`;
}

try {
  const html = await get(`https://t.me/s/${CHANNEL}`);
  if (!html) throw new Error("empty t.me/s response");

  const blocks = html.split("tgme_widget_message_wrap").slice(1);
  if (blocks.length === 0) throw new Error("no posts in preview");

  const posts = [];
  for (const b of blocks) {
    const idMatch = b.match(/data-post="[^"]*\/(\d+)"/);
    const dt = b.match(/datetime="([^"]+)"/)?.[1];
    if (!idMatch || !dt) continue;
    const id = Number(idMatch[1]);

    const rawText =
      b.match(/tgme_widget_message_text[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? "";
    const text = sanitize(rawText);
    const plain = text.replace(/<[^>]+>/g, "").trim();
    if (!plain || SERVICE_RE.test(plain)) continue;

    // Фото поста (не эмодзи): лежит в message_photo_wrap как background-image
    const photoUrl = b.match(
      /tgme_widget_message_photo_wrap[^>]*background-image:url\('([^']+)'\)/,
    )?.[1];

    let image = null;
    if (photoUrl) {
      try {
        image = await fetchImage(photoUrl, `${CHANNEL}-${id}`);
      } catch (e) {
        console.warn(`fetch-telegram: image for #${id} failed — ${e.message}`);
      }
    }

    posts.push({
      id,
      date: dt,
      html: text,
      image,
      link: `https://t.me/${CHANNEL}/${id}`,
    });
  }

  if (posts.length === 0) throw new Error("zero content posts after filtering");

  posts.sort((a, z) => z.id - a.id);
  writeFileSync(
    OUT,
    JSON.stringify(
      {
        channel: CHANNEL,
        updated: new Date().toISOString(),
        posts: posts.slice(0, MAX_POSTS),
      },
      null,
      1,
    ),
  );
  console.log(`fetch-telegram: ${posts.length} posts from @${CHANNEL}`);
} catch (err) {
  let fallback = "absent";
  try {
    fallback = `kept (${JSON.parse(readFileSync(OUT, "utf8")).posts.length} posts)`;
  } catch {}
  console.warn(`fetch-telegram: skipped — ${err.message}; fallback ${fallback}`);
}
