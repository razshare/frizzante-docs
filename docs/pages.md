Pages are just svelte components located in the `lib/pages` directory.

You can refer to these pages by their relative file names.

!!! note
	The `.svelte` extension is optional.

!!! example
	A page located at `lib/pages/welcome.svelte` will be identified by `welcome`.

Subdirectories are joined by `::` instead of `/` or `\`.

!!! example
	A page located at `lib/pages/about/user.svelte` will be identified by `about::user`.


## Mapping a page

You can route pages with `frz.ServerWithPage()`

```go
frz.ServerRoutePage(srv, "/welcome", "welcome", WelcomeIndex)
```

Mapping a page requires 

- a path, `/welcome` in this case, 
- a page id, `welcome` in this case,
- a page function, called `WelcomeIndex` in this case.

This page function must take in a server, request, response and a page

```go
func WelcomeIndex() (
	show frz.PageFunction,
	action frz.PageFunction,
){
	show = func (_ *frz.Request, _ *frz.Response, p *frz.Page) {
		frz.PageWithRender(frz.RenderServer)
		frz.PageWithData(p, "name", "world")
	}
	return
}
```

In this example, the page function is using `frz.PageWithRender()` 
to configure the rendering mode, 
which can be `frz.RenderServer`, `frz.RenderClient` or `frz.RenderFull`,
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
	Default rendering mode is `frz.RenderFull`.

!!! note
	Context `data` is created with [$state()](https://svelte.dev/docs/svelte/$state), hence it is reactive.