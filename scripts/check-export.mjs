import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const output = path.resolve("out");
const rawBase = process.env.PAGES_BASE_PATH?.trim() ?? "";
const basePath =
  rawBase && rawBase !== "/" ? `/${rawBase.replace(/^\/+|\/+$/g, "")}` : "";
const routes = new Map([
  ["/", "GoldWorks"],
  ["/privacy/", "Privacy Policy"],
  ["/privacy/byeolmong/", "Byeolmong Privacy Notice"],
  ["/account-deletion/", "Account & Data Deletion"],
  ["/ko/privacy/", "개인정보처리방침"],
  ["/ko/privacy/byeolmong/", "별몽 개인정보 안내"],
  ["/ko/account-deletion/", "계정 및 데이터 삭제 요청"],
  ["/es/privacy/", "Política de privacidad"],
  ["/ja/privacy/", "プライバシーポリシー"],
  ["/pt-br/privacy/", "Política de Privacidade"],
  ["/zh-cn/privacy/", "隐私政策"],
]);
const localeCodes = {
  en: "en",
  es: "es",
  ja: "ja",
  ko: "ko",
  "pt-br": "pt-BR",
  "zh-cn": "zh-Hans",
};
const policyPaths = {
  en: "/privacy/",
  es: "/es/privacy/",
  ja: "/ja/privacy/",
  ko: "/ko/privacy/",
  "pt-br": "/pt-br/privacy/",
  "zh-cn": "/zh-cn/privacy/",
};
for (const [route, text] of routes) {
  const file = path.join(output, route, "index.html");
  assert(existsSync(file), `Missing public route: ${route}`);
  const html = readFileSync(file, "utf8");
  assert(
    html.replaceAll("&amp;", "&").includes(text),
    `${route} needs visible, server-rendered content`,
  );
  assert(
    html.includes('<html lang="en"'),
    `Missing document language: ${route}`,
  );
  const segment = route.split("/")[1];
  const locale = Object.hasOwn(localeCodes, segment) ? segment : "en";
  if (locale === "en") {
    const documentHtml = html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
      .replace(/<select\b[^>]*>[\s\S]*?<\/select>/g, "")
      .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/g, "");
    assert(
      !/[가-힣ㄱ-ㅎㅏ-ㅣ]/.test(documentHtml),
      `English page contains Korean content or metadata: ${route}`,
    );
    assert(
      html.includes('content="en_US"'),
      `English sharing locale missing: ${route}`,
    );
  }
  if (route !== "/") {
    assert(
      html.includes(`<div lang="${localeCodes[locale]}"`),
      `Incorrect legal content language: ${route}`,
    );
    const isPolicy = Object.values(policyPaths).includes(route);
    const options = [...html.matchAll(/<option\b([^>]*)>/g)].map((match) => ({
      value: match[1].match(/value="([^"]+)"/)?.[1],
      selected: /\bselected/.test(match[1]),
    }));
    const expectedLocales = isPolicy ? Object.keys(policyPaths) : ["en", "ko"];
    assert.deepEqual(
      options.map((option) => option.value).sort(),
      [...expectedLocales].sort(),
      `Wrong dropdown languages: ${route}`,
    );
    assert.deepEqual(
      options.filter((option) => option.selected).map((option) => option.value),
      [locale],
      `Incorrect selected language: ${route}`,
    );
    assert(
      html.includes("<noscript>"),
      `Missing no-JavaScript language navigation: ${route}`,
    );
    assert(
      !/Read in Korean|Read in English/.test(html),
      `Remove the old two-language link: ${route}`,
    );
    if (isPolicy) {
      for (const [lang, destination] of Object.entries(policyPaths)) {
        assert(
          html.includes(`href="${basePath}${destination}"`),
          `Missing fallback language link ${lang}: ${route}`,
        );
        assert(
          html
            .toLowerCase()
            .includes(`hreflang="${localeCodes[lang].toLowerCase()}"`),
          `Missing search language ${lang}: ${route}`,
        );
      }
      assert.equal(
        [...html.matchAll(/<section id="/g)].length,
        10,
        `Incomplete policy sections: ${route}`,
      );
    }
  }
  assert(
    html.includes(`https://goldworks.net${basePath}${route}`),
    `Incorrect canonical URL: ${route}`,
  );
  assert(
    !/name="robots"[^>]*noindex/.test(html),
    `${route} must be accessible to search crawlers`,
  );
}
const home = readFileSync(path.join(output, "index.html"), "utf8");
const deletion = readFileSync(
  path.join(output, "account-deletion/index.html"),
  "utf8",
);
assert(
  deletion.includes(
    encodeURIComponent("[GoldWorks] Account and data deletion request"),
  ),
  "Deletion email subject must be English",
);
assert(
  deletion.includes(
    encodeURIComponent(
      "App name: \nRegistered email address or account identifier:",
    ),
  ),
  "Deletion email template must be English",
);
assert(
  !/[가-힣ㄱ-ㅎㅏ-ㅣ]/.test(home),
  "Homepage content and metadata must be English only",
);
assert(
  home.includes('content="en_US"'),
  "Homepage sharing locale must be English",
);
assert(
  home.includes("Tiny Fishing Club"),
  "Keep the Tiny Fishing Club Steam link available",
);
assert(
  !/Byeolmong|별몽|Idle\s*Angler|아이들\s*앵글러/i.test(home),
  "Unannounced projects must not appear on the homepage",
);
assert(
  home.includes(
    "https://store.steampowered.com/app/3070310/Tiny_Fishing_Club/",
  ),
  "Missing real Steam destination",
);
for (const id of ["studio", "contact"]) {
  assert(home.includes(`id="${id}"`), `Missing navigation destination: ${id}`);
}
assert(
  !/tiny-fishing-club-(?:cover|01)/.test(home),
  "Game artwork must not appear on the studio homepage",
);
assert(
  !/Motion on|Motion off|world-motion/.test(home),
  "Do not expose a motion toggle",
);
assert(existsSync(path.join(output, ".nojekyll")), "Missing .nojekyll");
if (existsSync("public/CNAME"))
  assert.equal(
    readFileSync(path.join(output, "CNAME"), "utf8").trim(),
    readFileSync("public/CNAME", "utf8").trim(),
  );
for (const file of ["robots.txt", "sitemap.xml"])
  assert(existsSync(path.join(output, file)), `Missing ${file}`);

function* htmlFiles(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === "_next") continue;
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(file);
    else if (entry.name.endsWith(".html")) yield file;
  }
}
let checked = 0;
for (const file of htmlFiles(output)) {
  const html = readFileSync(file, "utf8");
  for (const match of html.matchAll(
    /<(?:link|script|img)\b[^>]*?\b(?:src|href)="([^"]+)"/g,
  )) {
    const url = match[1];
    if (!url.startsWith("/") || url.startsWith("//")) continue;
    const pathname = decodeURIComponent(url.split(/[?#]/)[0]);
    assert(
      !basePath || pathname.startsWith(`${basePath}/`),
      `Asset missing base path: ${url}`,
    );
    const relative = pathname.slice(basePath.length).replace(/^\//, "");
    const asset = path.resolve(output, relative);
    assert(asset.startsWith(output + path.sep), `Asset outside export: ${url}`);
    assert(
      existsSync(asset) && statSync(asset).isFile(),
      `Broken exported asset: ${url}`,
    );
    checked++;
  }
}
console.log(
  `Verified ${routes.size} public routes, ${checked} asset references, six policy languages, selected dropdown values, no-JavaScript links, English defaults, and GitHub Pages files (base path: ${basePath || "/"}).`,
);
