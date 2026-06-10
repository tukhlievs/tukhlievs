import data from "@/data/telegram.json";

export type TgPost = {
  id: number;
  date: string;
  html: string;
  image: string | null;
  link: string;
};

export function getTgPosts(): TgPost[] {
  return (data.posts as TgPost[]) ?? [];
}

export const tgChannel = data.channel as string;

// Первая строка поста — заголовок карточки, остальное — тело
export function splitPost(html: string): { title: string; body: string } {
  const plainFirst = html.split("\n")[0].replace(/<[^>]+>/g, "").trim();
  const title =
    plainFirst.length > 90 ? `${plainFirst.slice(0, 87)}…` : plainFirst;
  const rest = html.split("\n").slice(1).join("\n").trim();
  return { title, body: rest };
}
