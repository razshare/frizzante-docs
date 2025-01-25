Whenever you launch `make dev`, `make start`, or `make build`, a makefile task called `www-prepare` is executed.

This "preparation" phase is handled by your `prepare/main.go`, which usually looks like this

```go
package main

import frz "github.com/razshare/frizzante"

func main() {
	frz.SveltePrepareStart()
	frz.SveltePreparePage("welcome", "./www/lib/pages/welcome.svelte")
	frz.SveltePrepareEnd()
}
```

For lack of better words, `prepare/main.go` is a code generation program, in the example above, it generates a svelte page by the name of `welcome`.

!!! note
    You can find the server code for this automatically generated page in `www/dist/server/render.server.js` and the client code in `www/dist/client/assets/welcome-{some-uuid}.js`.

Unlike other solutions, there is no special syntax or naming convention that marks your `.svelte` files as "pages", instead you generate your pages in this preparation phase by invoking

```go
frz.SveltePreparePage("page-id", "./path/to/my/component.svelte")
```

This will take the contents of the svelte file `./path/to/my/component.svelte` and create a page, which you can identify throughout the rest of your code with `page-id`.

!!! note
    The path to the svelte file, `./path/to/my/component.svelte` in this example, is relative your [cwd](https://en.wikipedia.org/wiki/Working_directory), not to the `prepare/` directory.

Once you're done generating your pages, you can proceed and [map each svelte page to a web path](./svelte-pages.md).