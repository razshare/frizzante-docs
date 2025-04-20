Pages are just svelte components located in the `lib/pages` directory.

You can refer to these pages by their relative file names.

!!! example
	A page located at `lib/pages/welcome.svelte` will be identified by `welcome`.

Subdirectories are joined by `.` instead of `/` or `\`.

!!! example
	A page located at `lib/pages/about/welcome.svelte` will be identified by `about.welcome`.


## Index

An index is a function that routes one or more paths to a page.

Use  `f.ServerWithIndex()` to create an index.

```go
f.ServerWithIndex(srv, index)
```

Where `index` is a setup function.

```go
func index(
	withPage func(page string),
	withPath func(path string),
	withBaseHandler func(baseHandler func(req *f.Request, res *f.Response, page *f.Page)),
	withActionHandler func(actionFunction func(req *f.Request, res *f.Response, page *f.Page)),
){
	withPage("welcome")
	withPath("/welcome")
	withBaseHandler(baseHandler)
	withActionHandler(actionHandler)	
}

func baseHandler(req *f.Request, res *f.Response, page *f.Page) {
	f.PageWithData(p, "name", "Cat")
}

func actionHandler(req *f.Request, res *f.Response, page *f.Page) {
	modifyState()
}
```

Use `withPage()` to specify which page should render.

Use `withPath()` to specify which path to route.

!!! note
    You can route multiple paths to the same page.
    ```go
	withPage("welcome")
    withPath("/")
    withPath("/api/greeting")
    ```
	
!!! warning
	You cannot route one path to multiple pages.
    ```go
	withPage("welcome")
	withPage("login") // This is now allowed.
    withPath("/")
    ```

Use `withBaseHandler()` to set the base page handler.

!!! note
	A base page handler is a function that 
	handles requests to the `GET` http verb.<br/>
	This function usually does not modify the state, 
	it just renders information to the screen.

Use `withActionHandler()` to set the action page handler.

!!! note
	An action page handler is a function that 
	handles requests to the `POST` http verb.<br/>
	This function usually modifies the state and 
	sometimes redirects to some other page.

Use `f.PageWithData()` to set data fields for the page.

!!! note
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