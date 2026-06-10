// Собирает активность коммитов по всем не-fork репозиториям tukhlievs
// за последние ~26 недель и пишет src/data/activity.json.
// Запускается в prebuild на CI. При любой ошибке НЕ трогает существующий
// activity.json (закоммиченный fallback) и выходит с кодом 0,
// чтобы не ронять сборку из-за rate limit GitHub API.
import { readFileSync, writeFileSync } from "node:fs";

const USER = "tukhlievs";
const DAYS = 182;
const OUT = "src/data/activity.json";

const headers = { "User-Agent": USER };
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

async function gh(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

try {
  const since = new Date(Date.now() - DAYS * 864e5).toISOString();
  const repos = (
    await gh(`https://api.github.com/users/${USER}/repos?per_page=100&type=owner`)
  ).filter((r) => !r.fork);

  const days = {};
  let total = 0;

  for (const repo of repos) {
    // До 3 страниц по 100 коммитов на репозиторий — с запасом
    for (let page = 1; page <= 3; page++) {
      const commits = await gh(
        `https://api.github.com/repos/${repo.full_name}/commits?since=${since}&per_page=100&page=${page}`,
      );
      for (const c of commits) {
        const day = (c.commit?.author?.date ?? "").slice(0, 10);
        if (!day) continue;
        days[day] = (days[day] ?? 0) + 1;
        total++;
      }
      if (commits.length < 100) break;
    }
  }

  if (total === 0) throw new Error("no commits collected — keeping fallback");

  writeFileSync(
    OUT,
    JSON.stringify({ updated: new Date().toISOString(), total, days }),
  );
  console.log(`fetch-activity: ${total} commits across ${repos.length} repos`);
} catch (err) {
  let fallback = "absent";
  try {
    fallback = `kept (${JSON.parse(readFileSync(OUT, "utf8")).total} commits)`;
  } catch {}
  console.warn(`fetch-activity: skipped — ${err.message}; fallback ${fallback}`);
}
