#!/usr/bin/env bash
# Export Finder grid icons via NSWorkspace (macOS Big Sur+ rendered icons). macOS only.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/finder"
mkdir -p "$OUT"

swift "$ROOT/scripts/export-finder-icons.swift" "$OUT"

for f in "$OUT"/*.png; do
  sips -Z 512 "$f" >/dev/null
done

echo "Wrote modern Finder icons to $OUT"
