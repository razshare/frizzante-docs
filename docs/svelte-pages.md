Pages are just svelte components located at `www/pages`.

You can refer to these pages by their relative file names.

!!! note
	The `.svelte` extension is optional.

!!! example
	A page located at `www/page/welcome.svelte` will be identified by `welcome`.

Subdirectories are joined by `::` instead of `/` or `\`.

!!! example
	A page located at `www/page/about/user.svelte` will be identified by `about::user`.


## Mapping a page

You can map pages with `frz.ServerWithSveltePage()`

```go
frz.ServerWithSveltePage(server, "GET /welcome", "welcome", configure)
```

Mapping a page requires 

- a pattern, `GET /welcome` in this case, 
- a page id, `welcome` in this case,
- a configuration provider, called `configure` in this case.

This configuration provider is a function that must take in a request and return a configuration

```go
func configure(_ *frz.Request) *frz.SveltePageConfiguration {
	return &frz.SveltePageConfiguration{
		Render: frz.ModeFull,
		Data: map[string]interface{}{
			"name": "world",
		},
	}
}
```

The resulting configuration defines a required `Render` property, indicating the rendering mode, 
which can be `frz.ModeServer`, `frz.ModeClient` or `frz.ModeFull`
and an optional `Data` property, which can be retrieved by any of your components with [getContext("data")](https://svelte.dev/docs/svelte/svelte#getContext).


!!! note
	See [overview page](./overview.md) for more details on rendering modes.

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
// prepare/main.go
frz.PrepareSveltePage("about", "www/lib/pages/about.svelte")
```

```go
// main.go
frz.ServerWithSveltePage(server, "GET /about", "about", configure)
```

```html
<!--www/lib/pages/about.svelte-->
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
// prepare/main.go
frz.PrepareSveltePage("about", "www/lib/pages/about.svelte")
```

```go
// main.go
frz.ServerWithSveltePage(server, "GET /about/{name}", "about", configure)
```

```html
<!--www/lib/pages/about.svelte-->
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
// prepare/main.go
frz.PrepareSveltePage("about", "www/lib/pages/about.svelte")
```

```go
// main.go

// GET /about
frz.ServerWithSveltePage(server, "GET /about", "about",
	func(_ *frz.Request) *frz.SveltePageConfiguration {
		return &frz.SveltePageConfiguration{Render: frz.ModeFull}
	},
)

// POST /about
frz.ServerWithSveltePage(server, "POST /about", "about",
	func(request *frz.Request) *frz.SveltePageConfiguration {
		form := frz.ReceiveForm(request)
		name := form.Get("name")

		if len(name) < 2 {
			return &frz.SveltePageConfiguration{
				Render: frz.ModeFull,
				Data:   map[string]interface{}{"error": "Name must be at least 2 characters long."},
			}
		}

		return &frz.SveltePageConfiguration{
			Render: frz.ModeFull,
			Data:   map[string]interface{}{"name": name},
		}
	},
)
```

```html
<!--www/lib/pages/about.svelte-->
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