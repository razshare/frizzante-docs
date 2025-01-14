As previously mentioned in the [prepare](./prepare.md) section, pages are defined beforehand in the prepare phase.

However, defining a page doesn't mean it's being routed.

You must route pages yourself through the server api.

You can route a page with `frz.ServerWithSveltePage()`.

```go
frz.ServerWithSveltePage(server, "GET /welcome", "welcome", configure)
```

As you can see, routing a page requires a pattern (`GET /welcome`), the id of the page (`welcome`) and a `configure` function, which look like this

```go
func configure(_ *frz.Request, config *frz.SveltePageConfiguration) {
	config.Render = frz.ModeFull
	config.Props["name"] = "world"
}
```

The `Render` property is the rendering mode, which can be `frz.ModeServer`, `frz.ModeClient` or `frz.ModeFull`.

The `Props` property are the properties of the page.