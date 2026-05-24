#!/usr/bin/bash
export PREFIX="/frizzante-docs-using-snapshots"
git checkout main
make clean configure build
./.gen/bin/app & 
APP_PID=$!
make snapshot
echo "killing $APP_PID"
kill $APP_PID
git checkout gh-pages
rm docs -fr
mv ./.gen/snapshot ./docs
git add .
git commit -m"chore(app): creating snapshot"
git push
git checkout main