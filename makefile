dev:
	which bun || curl -fsSL https://bun.sh/install | bash
	bun update
	bun run dev