dev:
	mkdocs serve

build:
	mkdocs build

publish:
	mkdocs gh-deploy

hooks:
	printf "#!/usr/bin/env bash\n" > ./.git/hooks/post-push
	printf "make publish\n" >> ./.git/hooks/post-push