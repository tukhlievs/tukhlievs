import activity from "@/data/activity.json";

const WEEKS = 12;
const DAY_MS = 864e5;

// Шкала интенсивности: от почти белого к фирменному синему
const LEVELS = [
  "#eef2f9", // 0 коммитов
  "#dbeafe", // 1-2
  "#93c5fd", // 3-5
  "#3b82f6", // 6-11
  "#1d4ed8", // 12+
];

function level(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 11) return 3;
  return 4;
}

function buildGrid() {
  const days = activity.days as Record<string, number>;
  // Конец сетки — ближайшее воскресенье (полная последняя колонка)
  const today = new Date();
  const end = new Date(today.getTime() + (6 - today.getUTCDay()) * DAY_MS);
  const start = new Date(end.getTime() - (WEEKS * 7 - 1) * DAY_MS);

  const weeks: { date: string; count: number; future: boolean }[][] = [];
  for (let w = 0; w < WEEKS; w++) {
    const col = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(start.getTime() + (w * 7 + d) * DAY_MS);
      const key = date.toISOString().slice(0, 10);
      col.push({
        date: key,
        count: days[key] ?? 0,
        future: date > today,
      });
    }
    weeks.push(col);
  }
  return weeks;
}

export function ActivityGraph() {
  const weeks = buildGrid();
  const months: { index: number; label: string }[] = [];
  let lastMonth = "";
  weeks.forEach((col, i) => {
    const m = col[0].date.slice(0, 7);
    if (m !== lastMonth) {
      months.push({
        index: i,
        label: new Date(col[0].date).toLocaleDateString("en-US", {
          month: "short",
        }),
      });
      lastMonth = m;
    }
  });

  return (
    <div className="rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-[0_1px_2px_rgba(11,18,32,0.04),0_8px_24px_rgba(37,99,235,0.06)]">
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <h3 className="font-semibold text-fg">Commit activity</h3>
        <span className="text-xs text-muted">
          {activity.total} commits · last 12 weeks · all repos
        </span>
      </div>

      <div className="mt-4 overflow-x-auto">
        <div className="min-w-[420px]">
          {/* Подписи месяцев */}
          <div className="relative h-4 mb-1 text-[10px] text-muted">
            {months.map((m) => (
              <span
                key={m.index + m.label}
                className="absolute"
                style={{ left: `${(m.index / WEEKS) * 100}%` }}
              >
                {m.label}
              </span>
            ))}
          </div>

          <div className="flex gap-[3px]">
            {weeks.map((col, wi) => (
              <div key={wi} className="flex flex-col gap-[3px] flex-1">
                {col.map((day) => (
                  <div
                    key={day.date}
                    title={
                      day.future
                        ? undefined
                        : `${day.date}: ${day.count} commit${day.count === 1 ? "" : "s"}`
                    }
                    className="aspect-square rounded-[3px]"
                    style={{
                      background: day.future
                        ? "transparent"
                        : LEVELS[level(day.count)],
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Легенда */}
          <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-muted">
            <span>Less</span>
            {LEVELS.map((c) => (
              <span
                key={c}
                className="size-[10px] rounded-[3px]"
                style={{ background: c }}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
