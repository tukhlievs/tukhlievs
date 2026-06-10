// Декодирует public/**/*.b64 в бинарные файлы рядом (без расширения .b64).
// Нужен потому, что бинарники в репо хранятся как base64-текст
// (ограничение инструментов коммита); запускается автоматически как prebuild.
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith(".b64")) out.push(p);
  }
  return out;
}

const files = walk("public");
for (const file of files) {
  const target = file.slice(0, -4); // отрезаем ".b64"
  const data = Buffer.from(readFileSync(file, "utf8").trim(), "base64");
  writeFileSync(target, data);
  console.log(`decoded ${file} -> ${target} (${data.length} bytes)`);
}
console.log(`decode-assets: ${files.length} file(s)`);
