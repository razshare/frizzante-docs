Pages are just svelte components located in the `lib/pages` directory.

You can refer to these pages by their relative file names.

!!! note
	The `.svelte` extension is optional.

!!! example
	A page located at `lib/pages/welcome.svelte` will be identified by `welcome`.

Subdirectories are joined by `::` instead of `/` or `\`.

!!! example
	A page located at `lib/pages/about/welcome.svelte` will be identified by `about::welcome`.


## Mapping a page

You can map pages with `f.ServerWithIndex()`

```go
f.ServerWithIndex(srv, WelcomeIndex)
```

The `WelcomeIndex` function is called an `index function`.

An index function maps a path to a page and handles (often indirectly) the logic behind said page.

!!! note
	In other patterns you would call this a [controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller).

```go
func WelcomeIndex() (
	page string,
	show f.PageFunction,
	action f.PageFunction,
){
	page = "welcome"
	show = func (_ *f.Request, _ *f.Response, p *f.Page) {
		f.PageWithRender(f.RenderServer)
		f.PageWithData(p, "name", "world")
	}
	action = func (_ *f.Request, res *f.Response, _ *f.Page) {
		f.SendNotFound(res)
	}
	return
}
```

This index defines 

1. the name of the `page` to use
2. what to do when the page is `show`n
3. what to do then an `action` is sent to the page

!!! note
	An `action` is any form sent to the page.

In this example the index uses a page by the name of `welcome`, which is nothing more than the file `lib/pages/welcome.svelte`.

When the index shows the page, or rather when a `GET` request comes in, 
it will set the rendering mode to `ssr` (Server Side Rendering) and set a
data field called `name` with a value of `world`.

!!! note
	These `data fields` can be retrieves in your svelte components with [getContext("data")](https://svelte.dev/docs/svelte/svelte#getContext), see example bellow.

On the other hand, when an action comes in, or rather when a `POST` request comes in,
the index responds with `404 not found`.



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