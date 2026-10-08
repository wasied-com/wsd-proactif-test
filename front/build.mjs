// Construction minimale : lit .env.<mode> (mode passe par --mode, defaut production) et ecrit dist/index.html.
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";

const i = process.argv.indexOf("--mode");
const mode = i === -1 ? "production" : process.argv[i + 1];
const file = `.env.${mode}`;
const env = {};
if (existsSync(file)) {
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const m = /^([A-Z0-9_]+)=(.*)$/u.exec(line.trim());
    if (m) env[m[1]] = m[2];
  }
}
mkdirSync("dist", { recursive: true });
writeFileSync(
  "dist/index.html",
  `<!doctype html><html lang="fr"><meta charset="utf-8"><title>Proactif</title><body><h1>Front d'essai</h1><p>API : ${env.VITE_API_URL ?? "non configuree"}</p></body></html>\n`,
);
console.log(`build ${mode} : dist/index.html (API ${env.VITE_API_URL ?? "absente"})`);
