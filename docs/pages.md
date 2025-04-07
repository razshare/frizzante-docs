Pages are just svelte components located in the `lib/pages` directory.

You can refer to these pages by their relative file names.

!!! note
	The `.svelte` extension is optional.

!!! example
	A page located at `lib/pages/welcome.svelte` will be identified by `Welcome`.

Subdirectories are joined by `::` instead of `/` or `\`.

!!! example
	A page located at `lib/pages/about/User.svelte` will be identified by `about::User`.


## Mapping a page

You can route pages with `f.ServerWithPage()`

```go
f.ServerRoutePage(srv, "/welcome", "Welcome", WelcomeIndex)
```

Mapping a page requires 

- a path, `/welcome`, 
- a page id, `Welcome`, which points to the `lib/pages/Welcome.svelte` file,
- a page function called `WelcomeIndex`.

This page function must take in a server, request, response and a page

```go
func WelcomeIndex() (
	show f.PageFunction,
	action f.PageFunction,
){
	show = func (_ *f.Request, _ *f.Response, p *f.Page) {
		f.PageWithRender(f.RenderServer)
		f.PageWithData(p, "name", "world")
	}
	return
}
```

In this example, the page function is using `f.PageWithRender()` 
to configure the rendering mode, 
which can be `f.RenderServer`, `f.RenderClient` or `f.RenderFull`,
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
	Default rendering mode is `f.RenderFull`.

!!! note
	Context `data` is created with [$state()](https://svelte.dev/docs/svelte/$state), hence it is reactive.