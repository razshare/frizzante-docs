#!/usr/bin/bash
export PREFIX="/frizzante-docs-using-snapshots"
git checkout main
git pull --rebase
git push
git checkout gh-pages
git pull . main --rebase
git push
make build
./.gen/bin/app & 
APP_PID=$!
make snapshot
echo "killing $APP_PID"
kill $APP_PID
rm docs -fr
mv ./.gen/snapshot ./docs
git add .
git commit -m"chore(app): creating snapshot"
git push
git checkout main