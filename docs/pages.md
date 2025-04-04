Pages are just svelte components located in the `lib/pages` directory.

You can refer to these pages by their relative file names.

!!! note
	The `.svelte` extension is optional.

!!! example
	A page located at `lib/pages/Welcome.svelte` will be identified by `Welcome`.

Subdirectories are joined by `::` instead of `/` or `\`.

!!! example
	A page located at `lib/pages/About/user.svelte` will be identified by `About::User`.


## Mapping a page

You can route pages with `frz.ServerRoutePage()`

```go
frz.ServerRoutePage(srv, "/Welcome", "Welcome", Welcome)
```

Mapping a page requires 

- a path, `/Welcome` in this case, 
- a page id, `Welcome` in this case,
- a page function, also called `Welcome` in this case.

This page function must take in a server, request, response and a page

```go
func Welcome(_ *frz.Server, _ *frz.Request, _ *frz.Response, p *frz.Page) {
	frz.PageWithRenderMode(frz.RenderModeServer)
	frz.PageWithData(p, "Name", "world")
}
```

In this example, the page function is using `frz.PageWithRenderMode()` 
to configure the rendering mode, 
which can be `frz.RenderModeServer`, `frz.RenderModeClient` or `frz.RenderModeFull`,
and it's passing a `Name` property with the value of `world` to the 
underlying `Welcome` page which can be retrieved 
by any of your components with [getContext("Data")](https://svelte.dev/docs/svelte/svelte#getContext).


```html
<script>
    import { getContext } from "svelte";
    const data = getContext("Data")
</script>

<h1>Hello {data.name}</h1>
```

!!! note
	See [overview page](./overview.md) for more details on rendering modes.

!!! note
	Default rendering mode is `frz.RenderModeFull`.

!!! note
	Context `Data` is created with [$state()](https://svelte.dev/docs/svelte/$state), hence it is reactive.