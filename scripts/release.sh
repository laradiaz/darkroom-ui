#!/usr/bin/env bash
set -euo pipefail

BUMP="${1:-patch}"

rm -rf lib
pnpm run build
pnpm run check-publish
npm version "$BUMP"
npm publish --access public
echo "Published lab-ui@$(node -p "require('./package.json').version")"
