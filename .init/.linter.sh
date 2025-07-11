#!/bin/bash
cd /home/kavia/workspace/code-generation/browser-tic-tac-toe-f8a43b61/web_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

