import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const root = new URL("../lib/privacy-translations/", import.meta.url);
const source = JSON.parse(readFileSync(new URL("en.json", root), "utf8"));
const digest = createHash("sha256")
  .update(JSON.stringify(source))
  .digest("hex");
for (const locale of ["es", "ja", "pt-br", "zh-cn"]) {
  const copy = JSON.parse(
    readFileSync(new URL(`${locale}.json`, root), "utf8"),
  );
  assert.equal(
    copy.sourceDigest,
    digest,
    `Review ${locale} after the source policy changes`,
  );
  assert.deepEqual(
    Object.keys(copy.text).sort(),
    Object.keys(source.text).sort(),
    `${locale}: missing or extra paragraphs`,
  );
  assert.equal(
    copy.contents.length,
    10,
    `${locale}: incomplete table of contents`,
  );
  for (const field of [
    "title",
    "description",
    "intro",
    "tocLabel",
    "tableLabel",
  ])
    assert(copy[field]?.trim(), `${locale}: missing ${field}`);
  for (const [key, value] of Object.entries(copy.text)) {
    assert.equal(typeof value, "string");
    assert(value.trim(), `${locale}: empty ${key}`);
    if (source.text[key].length > 40)
      assert.notEqual(
        value,
        source.text[key],
        `${locale}: untranslated paragraph ${key}`,
      );
  }
  assert(
    copy.text.t61.includes("14"),
    `${locale}: child-age disclosure missing`,
  );
  assert(copy.text.t71.includes("2026"), `${locale}: effective date missing`);
  assert(
    copy.text.t63.includes("GoldWorks"),
    `${locale}: privacy contact missing`,
  );
}
console.log(
  "Verified all 71 translated text entries, 10 sections and source revision for each added policy language.",
);

const termsRoot = new URL("../lib/terms-translations/", import.meta.url);
const termsSource = JSON.parse(
  readFileSync(new URL("en.json", termsRoot), "utf8"),
);
const termsDigest = createHash("sha256")
  .update(JSON.stringify(termsSource))
  .digest("hex");
assert.equal(termsSource.sections.length, 13, "Terms need all 13 sections");
const termsIds = termsSource.sections.map((section) => section.id);
assert.equal(new Set(termsIds).size, 13, "Terms section IDs must be unique");
assert(
  termsIds.every((id) => /^[a-z][a-z-]*$/.test(id)),
  "Terms section IDs must be valid anchors",
);

function checkTermsValue(value, original, field, locale) {
  const label = `Terms ${locale}: ${field}`;
  if (typeof original === "string") {
    assert.equal(typeof value, "string", `${label} must be text`);
    assert(value.trim(), `${label} must not be empty`);
    if (field.endsWith(".id")) {
      assert.equal(value, original, `${label} must preserve the section ID`);
    } else if (locale !== "en") {
      assert.notEqual(value, original, `${label} has not been translated`);
    }
    return;
  }
  if (Array.isArray(original)) {
    assert(Array.isArray(value), `${label} must be an array`);
    assert.equal(value.length, original.length, `${label} is incomplete`);
    original.forEach((entry, index) => {
      checkTermsValue(value[index], entry, `${field}[${index}]`, locale);
    });
    return;
  }
  assert(
    value && typeof value === "object" && !Array.isArray(value),
    `${label} must be an object`,
  );
  assert.deepEqual(
    Object.keys(value).sort(),
    Object.keys(original).sort(),
    `${label} has missing or extra fields`,
  );
  for (const key of Object.keys(original)) {
    checkTermsValue(value[key], original[key], `${field}.${key}`, locale);
  }
}

checkTermsValue(termsSource, termsSource, "document", "en");
for (const locale of ["es", "ja", "ko", "pt-br", "zh-cn"]) {
  const { sourceDigest, ...copy } = JSON.parse(
    readFileSync(new URL(`${locale}.json`, termsRoot), "utf8"),
  );
  assert.equal(
    sourceDigest,
    termsDigest,
    `Review ${locale} after the source terms change`,
  );
  checkTermsValue(copy, termsSource, "document", locale);
}
console.log(
  "Verified all six terms languages, 13 section IDs, paragraph and list counts, translated labels and source revisions.",
);
