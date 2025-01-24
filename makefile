configure:
	pip install mkdocs --break-system-packages
	pip install mkdocs-material --break-system-packages

dev:
	mkdocs serve

publish:
	mkdocs gh-deploy