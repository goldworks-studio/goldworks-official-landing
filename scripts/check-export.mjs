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
const termsPaths = Object.fromEntries(
  Object.keys(localeCodes).map((locale) => [
    locale,
    `${locale === "en" ? "" : `/${locale}`}/terms/`,
  ]),
);
const termsCopies = Object.fromEntries(
  Object.keys(localeCodes).map((locale) => [
    locale,
    JSON.parse(readFileSync(`lib/terms-translations/${locale}.json`, "utf8")),
  ]),
);
for (const [locale, route] of Object.entries(termsPaths)) {
  routes.set(route, termsCopies[locale].title);
}

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [
      match[1].toLowerCase(),
      match[2],
    ]),
  );
}

function decodeText(value) {
  return value
    .replaceAll("&quot;", '"')
    .replace(/&#(?:x27|39);/g, "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&");
}

const absoluteUrl = (route) => `https://goldworks.net${basePath}${route}`;

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
  const isTerms = Object.values(termsPaths).includes(route);
  const isPolicy = Object.values(policyPaths).includes(route);
  const languagePaths = isTerms ? termsPaths : policyPaths;
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map((match) =>
    attributes(match[0]),
  );
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
    const options = [...html.matchAll(/<option\b([^>]*)>/g)].map((match) => ({
      value: match[1].match(/value="([^"]+)"/)?.[1],
      selected: /\bselected/.test(match[1]),
    }));
    const expectedLocales =
      isPolicy || isTerms ? Object.keys(localeCodes) : ["en", "ko"];
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
    assert.deepEqual(
      [...html.matchAll(/<time\b[^>]*>/g)].map(
        (match) => attributes(match[0]).datetime,
      ),
      [isTerms ? "2026-10-27" : "2026-09-10"],
      `Incorrect effective date: ${route}`,
    );
    if (isPolicy || isTerms) {
      const fallback = html.match(/<noscript\b[^>]*>([\s\S]*?)<\/noscript>/)?.[1];
      assert(fallback, `Missing fallback language navigation: ${route}`);
      for (const [lang, destination] of Object.entries(languagePaths)) {
        assert(
          fallback.includes(`href="${basePath}${destination}"`),
          `Missing no-JavaScript ${lang} language destination: ${route}`,
        );
        assert.deepEqual(
          links
            .filter(
              (link) =>
                link.rel === "alternate" &&
                link.hreflang?.toLowerCase() === localeCodes[lang].toLowerCase(),
            )
            .map((link) => link.href),
          [absoluteUrl(destination)],
          `Incorrect search language destination ${lang}: ${route}`,
        );
      }
      assert.deepEqual(
        links
          .filter(
            (link) => link.rel === "alternate" && link.hreflang === "x-default",
          )
          .map((link) => link.href),
        [absoluteUrl(languagePaths.en)],
        `Incorrect default language destination: ${route}`,
      );
    }
    if (isTerms) {
      const copy = termsCopies[locale];
      assert.equal(copy.sections.length, 13, `Incomplete terms source: ${locale}`);
      assert.deepEqual(
        [...html.matchAll(/<section\b[^>]*\bid="([^"]+)"/g)].map(
          (match) => match[1],
        ),
        copy.sections.map((section) => section.id),
        `Incorrect terms sections: ${route}`,
      );
      const documentHtml = decodeText(
        html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, ""),
      );
      for (const section of copy.sections) {
        assert(
          documentHtml.includes(`href="#${section.id}"`),
          `Missing terms contents anchor ${section.id}: ${route}`,
        );
        for (const content of [
          section.title,
          ...section.paragraphs,
          ...(section.items ?? []),
        ]) {
          assert(
            documentHtml.includes(content),
            `Missing server-rendered terms text in ${section.id}: ${route}`,
          );
        }
      }
    }
  }
  const footer = html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)?.[1];
  assert(footer, `Missing footer: ${route}`);
  const termsFooterLinks = [...footer.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)]
    .filter(
      (match) =>
        attributes(match[1]).href === `${basePath}${termsPaths[locale]}`,
    )
    .map((match) => decodeText(match[2].replace(/<[^>]*>/g, "")));
  assert.deepEqual(
    termsFooterLinks,
    [termsCopies[locale].title],
    `Missing localized terms footer link: ${route}`,
  );
  assert(
    html.includes(`https://goldworks.net${basePath}${route}`),
    `Incorrect canonical URL: ${route}`,
  );
  assert.deepEqual(
    links.filter((link) => link.rel === "canonical").map((link) => link.href),
    [absoluteUrl(route)],
    `Incorrect canonical link: ${route}`,
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
const sitemap = readFileSync(path.join(output, "sitemap.xml"), "utf8");
const sitemapEntries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(
  (match) => ({
    url: match[1].match(/<loc>([^<]+)<\/loc>/)?.[1],
    links: [...match[1].matchAll(/<xhtml:link\b[^>]*>/g)].map((link) =>
      attributes(link[0]),
    ),
  }),
);
for (const route of routes.keys()) {
  const entries = sitemapEntries.filter(
    (entry) => entry.url === absoluteUrl(route),
  );
  assert.equal(entries.length, 1, `Missing or duplicate sitemap route: ${route}`);
  const languagePaths = Object.values(termsPaths).includes(route)
    ? termsPaths
    : Object.values(policyPaths).includes(route)
      ? policyPaths
      : null;
  if (languagePaths) {
    for (const [locale, destination] of Object.entries(languagePaths)) {
      assert.deepEqual(
        entries[0].links
          .filter(
            (link) =>
              link.rel === "alternate" && link.hreflang === localeCodes[locale],
          )
          .map((link) => link.href),
        [absoluteUrl(destination)],
        `Incorrect sitemap language ${locale}: ${route}`,
      );
    }
  }
}

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
  `Verified ${routes.size} public routes, ${checked} asset references, six privacy and terms languages, complete terms sections, effective dates, localized footer links, dropdowns, no-JavaScript navigation, canonical URLs, sitemap alternatives, English defaults, and GitHub Pages files (base path: ${basePath || "/"}).`,
);
