configure:
	sudo apt install python3.12-venv
	python3 -m venv venv
	. venv/bin/activate && \
	pip install mkdocs && \
	pip install mkdocs-video && \
	pip install mkdocs-material

dev:
	. venv/bin/activate && \
	mkdocs serve

publish:
	. venv/bin/activate && \
	mkdocs gh-deploy