#!/bin/bash
# Usage: tools/dumpdom.sh <url-path>  — print the rendered DOM of a locally served page.
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --virtual-time-budget=5000 --dump-dom "http://localhost:8765/$1" 2>/dev/null
