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
