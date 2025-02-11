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

You can map pages with `frz.ServerWithPage()`

```go
frz.ServerWithPage(srv, "GET /welcome", "welcome", cnf)
```

Mapping a page requires 

- a pattern, `GET /welcome` in this case, 
- a page id, `welcome` in this case,
- a request page handler, called `cnf` in this case.

This page handler is a function that must take in a server, request, response and a page

```go
func cnf(_ *frz.Server, _ *frz.Request, _ *frz.Response, p *frz.Page) {
	frz.PageWithRenderMode(p, frz.ModeFull)
	frz.PageWithData(p, "name", "world")
}
```

The page handler can use `frz.PageWithRenderMode()` in order to configure the rendering mode, 
which can be `frz.ModeServer`, `frz.ModeClient` or `frz.ModeFull`.

!!! note
	See [overview page](./overview.md) for more details on rendering modes.

!!! note
	Default rendering mode is `frz.ModeFull`.

The page handler can also use `frz.PageWithData()` in order to set a data key, which can be retrieved 
by any of your components with [getContext("data")](https://svelte.dev/docs/svelte/svelte#getContext).

```html
<script>
    import { getContext } from "svelte";
    const data = getContext("data")
</script>

<h1>Hello {data.name}</h1>
```

!!! note
	Context `data` is created with [$state()](https://svelte.dev/docs/svelte/$state), hence it is reactive.

!!! warning
	Context keys `query`, `path`, and `form` are reserved.<br/>
	See next sections.

## Query fields

Query fields are automatically injected in the context of the svelte page that's being rendered.

Say, for example, that you've mapped your svelte page to `GET /about` and some client requests `GET/about?name=world`.

You can retrieve the `name` query field with `getContext("data").query.name`.

```go
// main.go
frz.ServerWithPage(srv, "GET /about", "about", cnf)
```

```html
<!--pages/about.svelte-->
<script>
    import { getContext } from "svelte";
    const data = getContext("data")
</script>

<h1>Hello {data.query.name}</h1>
```


## Path fields

Path fields are automatically injected in the context of the svelte page that's being rendered.

Say, for example, that you've mapped your svelte page to `GET /about/{name}`.

You can retrieve the `{name}` path field with `getContext("data").path.name`.

```go
// main.go
frz.ServerWithPage(srv, "GET /about/{name}", "about", cnf)
```

```html
<!--pages/about.svelte-->
<script>
    import { getContext } from "svelte";
    const data = getContext("data")
</script>

<h1>Hello {data.path.name}</h1>
```

## Form fields

Form fields are automatically injected in the context of the svelte page that's being rendered.

All incoming form fields are mapped into `getContext("data").form`.

```html
<script>
    import { getContext } from "svelte";
    const data = getContext("data")
</script>

<h1>Hello {data.form.name}</h1>
```

However, when dealing with forms, you will most likely want to update your state in-place, 
so for that reason it is best to configure each page individually.

!!! note
	If you're coming from the [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) world, 
	you can think of configuration providers as Controllers.

The following is a more in-depth example using form fields.

```go
// main.go

// GET /about
frz.ServerWithPage(srv, "GET /about", "about",
	func(_ *frz.Server, _ *frz.Request, _ *frz.Response, p *frz.Page) {
		frz.PageWithRenderMode(p, frz.ModeFull)
	},
)

// POST /about
frz.ServerWithPage(srv, "POST /about", "about",
	func(_ *frz.Server, req *frz.Request, _ *frz.Response, p *frz.Page) {
		frz.PageWithRenderMode(p, frz.ModeFull)
		
		form := frz.ReceiveForm(req)
		name := form.Get("name")

		if len(name) < 2 {
			frz.PageWithData(p, "error", "Name must be at least 2 characters long.")
			return
		}

		frz.PageWithData(p, "name", name)
	},
)
```

```html
<!--pages/about.svelte-->
<script>
    import { getContext } from "svelte";
    const data = getContext("data")
</script>

{#if data.error}
	<h3>Error</h3>
	<span>{data.error}</span>
{:else if data.name}
	<h3>Welcome, {data.name}!</h3>
{:else}
	<form method="POST" action="?">
		<label for="name">
			<span>Name</span>
			<input type="text" id="name" name="name" value="" />
		</label>
		<br/>
		
		<button type="submit">Submit</button>
	</form>
{/if}
```

<video controls width="100%">
  <source src="https://github.com/razshare/frizzante-docs/raw/refs/heads/main/docs/Video_2025-01-25_20-59-54.mp4" type="video/mp4" />
</video>