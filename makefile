dev:
	make update
	bin/bun x --bun astro dev

build:
	make update
	bin/bun x --bun astro build

preview:
	make update
	bin/bun x --bun astro preview

update:
	make configure
	bin/bun --bun update

configure:
	# Check requirements...
	command -v unzip >/dev/null || error 'unzip is required to install and configure dependencies'
	command -v curl >/dev/null || error 'curl is required to install and configure dependencies'
	# Get bun...
	mkdir bin -p
	which bin/bun || (curl -fsSL https://github.com/oven-sh/bun/releases/latest/download/bun-linux-x64.zip -o bin/bun.zip && \
	unzip -j bin/bun.zip -d bin && rm bin/bun.zip -f)