#!/usr/bin/env bash
# macOS Quick Look thumbnail of page 1 → desktop icon (like Finder).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PDF="$ROOT/public/desktop/Eshaan_Walia_resume.pdf"
OUT="$ROOT/public/desktop/resume-pdf.png"
DIR="$(dirname "$PDF")"

qlmanage -t -s 512 "$PDF" -o "$DIR" >/dev/null
sips -s format png -Z 256 "$PDF.png" --out "$OUT" >/dev/null
rm -f "$PDF.png"
echo "wrote $OUT"
