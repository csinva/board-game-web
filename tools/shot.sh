#!/bin/bash
# Usage: tools/shot.sh <url-path> <out.png> [width] [height]
# Headless-Chrome screenshot of the locally served site (python3 -m http.server 8765).
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars \
  --virtual-time-budget=4000 --window-size="${3:-1300},${4:-2000}" --screenshot="$2" "http://localhost:8765/$1" 2>/dev/null
