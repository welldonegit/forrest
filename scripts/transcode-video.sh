#!/usr/bin/env bash
# Regenerate the scroll-scrub video assets from the source (assets/fly.mp4).
# All-keyframe H.264 (every frame an I-frame) so scroll-seeking is smooth; 1080p + 720p + poster.
set -euo pipefail
SRC="${1:-assets/fly.mp4}"
OUT="public/video"
mkdir -p "$OUT"
ffmpeg -y -i "$SRC" -an -vf "scale=-2:1080" -c:v libx264 -g 1 -keyint_min 1 -pix_fmt yuv420p -crf 26 -preset slow -movflags +faststart "$OUT/fly-scrub-1080.mp4"
ffmpeg -y -i "$SRC" -an -vf "scale=-2:720"  -c:v libx264 -g 1 -keyint_min 1 -pix_fmt yuv420p -crf 27 -preset slow -movflags +faststart "$OUT/fly-scrub-720.mp4"
ffmpeg -y -i "$SRC" -vf "scale=-2:1080" -frames:v 1 -q:v 3 "$OUT/fly-poster.jpg"
echo "done -> $OUT"
