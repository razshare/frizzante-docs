Whenever you start the server, enter dev mode or build your program, a make file task called `www-prepare` is executed.

This task is necessary, as it prepares all files needed for the project to function properly.

This "preparation" phase is handled by the `prepare/main.go` program, which usually looks like this

```go
package main

import frz "github.com/razshare/frizzante"

func main() {
	frz.SveltePrepareStart()
	frz.SveltePreparePage("welcome", "./www/lib/pages/welcome.svelte")
	frz.SveltePrepareEnd()
}
```

Unlike other solutions, there is no special syntax or naming convention that marks your files as "pages", instead you define your pages in this preparation phase by invoking

```go
frz.SveltePreparePage("page-id", "./path/to/my/component.svelte")
```

Once you've done so, the `./path/to/my/component.svelte` will be considered a page and you will refer to this page as `page-id` throughout the rest of your code.

!!! note
    Obviously `page-id` and `./path/to/my/component.svelte` are placeholder names.

!!! warning
    The path to the svelte file is relative your [cwd](https://en.wikipedia.org/wiki/Working_directory), not to the `prepare/` directory!

!!! note
    In the future, there will be available more types of preparation methods
    that generate code for your, like automatic type hints conversion from Go structs to Js types.<br/>
    That's the most obvious one.