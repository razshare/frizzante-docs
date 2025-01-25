As previously mentioned in the [prepare](./prepare.md) section, pages are generated beforehand in the prepare phase.

However, preparing a page doesn't mean it's being mapped to a web path, 
it just means the page files have been generated in your `www/dist` directory.

You must map pages yourself through the server api.

You can map a page to a web path with `frz.ServerWithSveltePage()`.

```go
frz.ServerWithSveltePage(server, "GET /welcome", "welcome", configure)
```

Mapping a page requires 

- a pattern, `GET /welcome` in this case, 
- a page, `welcome` in this case
- and a `configure` function, which configures how the page should be rendered.

This configure function must take in a request and return a configuration

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
	See [overview page](./index.md) for more details on rendering modes.

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

Say, for example, that you've map your svelte page to `GET /about` and some client requests `GET/about?name=world`.

You can retrieve the `name` query field with `getContext("data").query.name`.

```html
<script>
    import { getContext } from "svelte";
    const data = getContext("data")
</script>

<h1>Hello {data.query.name}</h1>
```


## Path fields

Path fields are automatically injected in the context of the svelte page that's being rendered.

Say, for example, that you've map your svelte page to `GET /about/{name}`.

You can retrieve the `{name}` path field with `getContext("data").path.name`.


```html
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