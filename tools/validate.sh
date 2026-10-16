#!/bin/bash
# Validate game files: tools/validate.sh [id ...]   (run from repo root)
cd "$(dirname "$0")/.." && /System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc tools/validate.js -- "$@"
