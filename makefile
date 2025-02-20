configure:
	pip install mkdocs
	pip install mkdocs-video
	pip install mkdocs-material

dev:
	mkdocs serve

publish:
	mkdocs gh-deploy