dev:
	mkdir bin -p
	which bin/bun || \
	(curl -fsSL https://github.com/oven-sh/bun/releases/latest/download/bun-linux-x64.zip -o bin/bun.zip && \
	unzip -j bin/bun.zip -d bin && rm bin/bun.zip -f)
	bin/bun update
	bin/bun run dev