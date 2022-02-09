#!/usr/bin/env sh
set -e
npm run build
cd dist
git init
git add -A
git commit -m 'deploy'
git remote add origin git@github.com:0xecho/TrelloIntegrationdemo.git
git push -f -u origin master
cd -
