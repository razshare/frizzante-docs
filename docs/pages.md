Pages are just svelte components located in the `lib/pages` directory.

You can refer to these pages by their relative file names.

!!! note
	The `.svelte` extension is optional.

!!! example
	A page located at `lib/pages/welcome.svelte` will be identified by `welcome`.

Subdirectories are joined by `.` instead of `/` or `\`.

!!! example
	A page located at `lib/pages/about/welcome.svelte` will be identified by `about.welcome`.


## Mapping a page

You can map pages with `f.ServerWithIndex()`

```go
f.ServerWithIndex(srv, WelcomeIndex)
```

The `WelcomeIndex` function is called an `index function`.

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
		f.PageWithData(p, "name", "Cat")
	}
	action = func (req *f.Request, res *f.Response, _ *f.Page) {
		f.ReceiveForm(req)
		f.SendNavigate(res, "cats")
	}
	return
}
```

This index sets the `page` to `welcome` indicating it will render the `lib/pages/welcome.svelte` file.


Whenever the `welcome` page is requested using the `GET` http verb, the index will execute the `show` function.

Whenever the `welcome` page is requested using the `POST` http verb, the index will execute the `action` function.

!!! note
	Invoking `f.SendNavigate(res, "cats")` hints to the client it should navigate to the `cats` page.

# Data fields

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