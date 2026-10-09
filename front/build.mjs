// Construction minimale facon Vite : dist/index.html + 5 fichiers d'assets a empreinte (ASSET_TAG).
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";

const i = process.argv.indexOf("--mode");
const mode = i === -1 ? "production" : process.argv[i + 1];
const env = {};
if (existsSync(`.env.${mode}`)) {
  for (const line of readFileSync(`.env.${mode}`, "utf8").split("\n")) {
    const m = /^([A-Z0-9_]+)=(.*)$/u.exec(line.trim());
    if (m) env[m[1]] = m[2];
  }
}
const tag = "v1";
mkdirSync("dist/assets", { recursive: true });
const assets = ["app", "vendor", "style", "router", "store"].map((n) => `assets/${n}-${tag}.js`);
for (const a of assets) writeFileSync(`dist/${a}`, `// ${a}\n`);
writeFileSync(
  "dist/index.html",
  `<!doctype html><html lang="fr"><meta charset="utf-8"><title>Proactif</title><body><h1>Front d'essai ${tag}</h1><p>API : ${env.VITE_API_URL ?? "non configuree"}</p>${assets.map((a) => `<script src="/${a}"></script>`).join("")}</body></html>\n`,
);
console.log(`build ${mode} ${tag}`);
