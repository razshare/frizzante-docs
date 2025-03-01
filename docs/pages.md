Pages are just svelte components located in the `pages` directory.

You can refer to these pages by their relative file names.

!!! note
	The `.svelte` extension is optional.

!!! example
	A page located at `pages/welcome.svelte` will be identified by `welcome`.

Subdirectories are joined by `::` instead of `/` or `\`.

!!! example
	A page located at `pages/about/user.svelte` will be identified by `about::user`.


## Mapping a page

You can map pages with `frz.ServerRoutePage()`

```go
frz.ServerRoutePage(srv, "GET /welcome", "welcome", wlc)
```

Mapping a page requires 

- a pattern, `GET /welcome` in this case, 
- a page id, `welcome` in this case,
- a page handler, called `wlc` in this case.

This page handler is a function that must take in a server, request, response and a page

```go
func wlc(_ *frz.Server, _ *frz.Request, _ *frz.Response, p *frz.Page) {
	frz.PageWithRenderMode(frz.RenderModeServer)
	frz.PageWithData(p, "name", "world")
}
```

In this example, the page handler is using `frz.PageWithRenderMode()` 
to configure the rendering mode, 
which can be `frz.RenderModeServer`, `frz.RenderModeClient` or `frz.RenderModeFull`,
and it's passing a `name` property with the value of `world` to the 
underlying `welcome` page which can be retrieved 
by any of your components with [getContext("data")](https://svelte.dev/docs/svelte/svelte#getContext).


```html
<script>
    import { getContext } from "svelte";
    const data = getContext("data")
</script>

<h1>Hello {data.name}</h1>
```

!!! note
	See [overview page](./overview.md) for more details on rendering modes.

!!! note
	Default rendering mode is `frz.ModeFull`.

!!! note
	Context `data` is created with [$state()](https://svelte.dev/docs/svelte/$state), hence it is reactive.