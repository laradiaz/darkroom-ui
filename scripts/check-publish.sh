#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LIB="$ROOT/lib"

fail() {
  echo "check-publish: $*" >&2
  exit 1
}

[[ -d "$LIB" ]] || fail "lib/ missing — run pnpm run build first"

require_file() {
  local path="$1"
  [[ -f "$path" ]] || fail "missing $path"
}

require_file "$LIB/darkroom-ui.mjs"
require_file "$LIB/darkroom-ui.cjs"
require_file "$LIB/style.css"
require_file "$LIB/fonts.css"
require_file "$LIB/tokens.css"
require_file "$LIB/fonts/dm-sans-latin-400-normal.woff2"

# style.css should stay lean (fonts are separate)
STYLE_KB=$(($(wc -c < "$LIB/style.css") / 1024))
if [[ "$STYLE_KB" -gt 100 ]]; then
  fail "style.css is ${STYLE_KB}KB — fonts may have been inlined again"
fi
require_file "$LIB/core.mjs"
require_file "$LIB/core.cjs"
require_file "$LIB/button.mjs"
require_file "$LIB/badge.mjs"

if [[ "${DARKROOM_UI_CHECK_STORYBOOK:-0}" == "1" ]]; then
  echo "check-publish: building storybook..."
  (cd "$ROOT" && pnpm run build-storybook)
fi

ROOT="$ROOT" node <<'NODE'
const path = require("node:path");
const fs = require("node:fs");

const root = process.env.ROOT;
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const exports = pkg.exports ?? {};

for (const [subpath, entry] of Object.entries(exports)) {
  const target =
    typeof entry === "string"
      ? entry
      : entry.import ?? entry.require ?? entry.default;
  if (!target) continue;
  const abs = path.join(root, target);
  if (!fs.existsSync(abs)) {
    console.error(`check-publish: export "${subpath}" → missing ${target}`);
    process.exit(1);
  }
}

console.log("check-publish: ok");
NODE
