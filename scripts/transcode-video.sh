#!/usr/bin/env bash
# Regenerate the scroll-scrub video assets from the source (assets/fly.mp4).
#
# Encoding note: strict all-keyframe (-g 1) makes seeking cheapest but is 2-3x larger for the
# same quality (no inter-frame compression) — at a web-friendly size it looks mushy. We use a
# short GOP instead (-g 12, keyframe every ~0.5s) with -sc_threshold 0 so keyframes are evenly
# spaced: seeks still land on the exact frame (the browser decodes a few frames from the nearest
# keyframe), scrubbing stays smooth on real hardware, and quality at crf 22 matches the source
# at ~37MB. Raise the GOP shorter (down to -g 1) if you need the smoothest possible seeks on very
# weak devices and can accept a much larger / softer file.
set -euo pipefail
SRC="${1:-assets/fly.mp4}"
OUT="public/video"
GOP="${GOP:-12}"
mkdir -p "$OUT"
ffmpeg -y -i "$SRC" -an -vf "scale=-2:1080" -c:v libx264 -g "$GOP" -keyint_min "$GOP" -sc_threshold 0 -pix_fmt yuv420p -crf 22 -preset slow -movflags +faststart "$OUT/fly-scrub-1080.mp4"
ffmpeg -y -i "$SRC" -an -vf "scale=-2:720"  -c:v libx264 -g "$GOP" -keyint_min "$GOP" -sc_threshold 0 -pix_fmt yuv420p -crf 24 -preset slow -movflags +faststart "$OUT/fly-scrub-720.mp4"
ffmpeg -y -i "$SRC" -vf "scale=-2:1080" -frames:v 1 -q:v 3 "$OUT/fly-poster.jpg"
echo "done -> $OUT"
