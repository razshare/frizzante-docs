Pages are just svelte components located in the `lib/pages` directory.

You can refer to these pages by their relative file names.

!!! example
	A page located at `lib/pages/welcome.svelte` will be identified by `welcome`.

Subdirectories are joined by `.` instead of `/` or `\`.

!!! example
	A page located at `lib/pages/about/welcome.svelte` will be identified by `about.welcome`.


## Routing pages

You can rout pages with `f.ServerWithIndex()`, which takes an index function.

```go
func indexShowFunction(_ *f.Request, _ *f.Response, p *f.Page) {
	f.PageWithData(p, "name", "Cat")
}

func indexActionFunction(_req_ *f.Request, _res_ *f.Response, _ *f.Page) {
	updateStuff()
}

func index(
	route func(path string, page string),
	show func(showFunction func(req *f.Request, res *f.Response, p *f.Page)),
	action func(actionFunction func(req *f.Request, res *f.Response, p *f.Page)),
){
	route("/welcome", "welcome")
	show(indexShowFunction)
	action(indexActionFunction)	
}
```

```go
f.ServerWithIndex(srv, index)
```

This index routes the page `welcome` to the path `/welcome`, indicating it will render the `lib/pages/welcome.svelte` file.

Whenever the user opens the `welcome` page, the index will execute the `indexShowFunction` function.

Whenever the user sends a POST form to the `welcome` page, the index will execute the `indexActionFunction` function.

## Data fields

In the example above, the `f.PageWithData()` function is used, which sets a data field using a `key` and a `value`.

Data fields can be retrieved from your svelte components with [getContext("data")](https://svelte.dev/docs/svelte/svelte#getContext).

```html
<script>
    import { getContext } from "svelte";
    const data = getContext("data")
</script>

<h1>Hello {data.name}</h1>
```

!!! note
	Context `data` is created with [$state()](https://svelte.dev/docs/svelte/$state), hence it is reactive.