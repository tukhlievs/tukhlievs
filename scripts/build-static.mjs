// Копирует статичный сайт из site/ в out/ — артефакт для GitHub Pages.
import { cpSync, mkdirSync, rmSync } from "node:fs";

rmSync("out", { recursive: true, force: true });
mkdirSync("out", { recursive: true });
cpSync("site", "out", { recursive: true });
console.log("Static site copied to out/");
