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
	bin/bun --bun update