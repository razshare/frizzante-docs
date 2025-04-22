Before creating a page, you need to create a view, a `.svelte` component under `lib/components/views`.

You can later refer to this component by its file name relative to `lib/components/views`.

!!! example
	A page located at `lib/components/views/Welcome.svelte` will be identified by `Welcome`.

Subdirectories are joined by `.` instead of `/` or `\`.

!!! example
	A page located at `lib/components/views/about/Me.svelte` will be identified by `about.Me`.

After you've created your view, you can create a page with `f.ServerWithPage()`

```go
f.ServerWithPage(srv, page)
```

Where `page` is a setup function

```go
package main

import (
	"embed"
	f "github.com/razshare/frizzante"
)

//go:embed .dist/*/**
var dist embed.FS

func page(
	withPath func(path string),
	withDocument func(document *f.Document),
	withBaseHandler func(baseHandler func(request *f.Request, response *f.Response, document *f.Document)),
	withActionHandler func(actionFunction func(request *f.Request, response *f.Response, document *f.Document)),
){
	withPath("/welcome")
	withDocument(f.DocumentCreate("Welcome"))  	// This is a reference 
												// to "lib/components/views/Welcome.svelte"

	withBaseHandler(func(req *f.Request, res *f.Response, page *f.Page) {
		// Show page.
		f.PageWithData(p, "name", "Cat")
	})
	withActionHandler(func(req *f.Request, res *f.Response, page *f.Page) {
		// Modify state.
	})	
}

func main() {
	// Create.
	server := f.ServerCreate()
	notifier := f.NotifierCreate()

	// Setup.
	f.ServerWithPort(server, 8080)
	f.ServerWithHostName(server, "127.0.0.1")
	f.ServerWithEmbeddedFileSystem(server, dist)
	f.ServerWithNotifier(server, notifier)

	// Pages.
	f.ServerWithPage(server, page)

	// Start.
	f.ServerStart(server)
}
```


!!! note
    You can route multiple paths to the same page.
    ```go
    withPath("/")
    withPath("/api/greeting")
	withDocument(f.DocumentCreate("Welcome"))
    ```
	
!!! danger
	You cannot route one path to multiple pages.
    ```go
    withPath("/")
	withDocument(f.DocumentCreate("Welcome"))
	withDocument(f.DocumentCreate("Login"))    // <-- This is now allowed.
    ```

`withBaseHandler()` sets the page base handler

!!! note
	A base page handler is a function that 
	handles requests to the `GET` http verb.<br/>
	This function usually does not modify the state, 
	it just renders information to the screen.

`withActionHandler()` sets the page action handler

!!! note
	An action page handler is a function that 
	handles requests to the `POST` http verb.<br/>
	This function usually modifies the state and 
	sometimes redirects to some other page.

`f.PageWithData()` sets data fields for the page

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

## Other details

Pages should be created under `lib/pages/{name}.go`, where `{name}` is the name of the page.

Views *must* be created under `lib/components/views/{name}.svelte`, where `{name}` is the name of the page.