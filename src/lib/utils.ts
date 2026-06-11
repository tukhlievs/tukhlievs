// Минимальный cn без clsx/tailwind-merge: классы контролируем сами,
// конфликтующих переопределений нет, поэтому простого join достаточно.
export function cn(
  ...inputs: Array<string | false | null | undefined>
): string {
  return inputs.filter(Boolean).join(" ");
}
