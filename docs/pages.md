Before creating a page, you need to create a view.

!!! note
	See the [views section](./views.md) for more details.

Views can be referred to by your Go code using their name relative to `lib/components/views`.

!!! example
	A view located at `lib/components/views/Welcome.svelte` will be identified by `Welcome`.

Subdirectories are joined by `.` instead of `/` or `\`.

!!! example
	A view located at `lib/components/views/about/Me.svelte` will be identified by `about.Me`.

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
	withView func(view *f.View),
	withBaseHandler func(baseHandler func(
		request *f.Request,
		response *f.Response,
		view *f.View,
	)),
	withActionHandler func(actionFunction func(
		request *f.Request,
		response *f.Response,
		view *f.View,
	)),
){
	withPath("/welcome")
	withView(f.ViewReference("Welcome"))  	// This references the
										    // file "lib/components/views/Welcome.svelte"

	withBaseHandler(func(
		request *f.Request,
		response *f.Response,
		page *f.Page,
	) {
		// Show page.
		f.PageWithData(p, "name", "Cat")
	})
	withActionHandler(func(request *f.Request, response *f.Response, page *f.Page) {
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

In your setup function, `withPath()` sets the path of your page 
and `withView()` sets the view of your page.

!!! note
    You can map many paths to one view.
    ```go
    withPath("/")
    withPath("/api/greeting")
	withView(f.ViewReference("Welcome"))
    ```
	
!!! danger
    You cannot map many views to one path.
    ```go
    withPath("/")
	withView(f.ViewReference("Welcome"))
	withView(f.ViewReference("Login"))    // <-- This is now allowed.
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


!!! note
	A page is treated like an [api](./api.md) under the hood, which means it 
	has access to the same features.<br/>
	<br/>
	You can receives path fields with `f.ReceivePath()`, 
	queries with `f.ReceiveQuery()`,
	forms with `f.ReceiveForm()`,
	json objects with `f.ReceiveJson[T]()` and so on.<br/>
	!!! danger
		While rendering a page, you shouldn't send content to the client directly 
		using `f.Send*` functions, 
		like `f.SendEcho()`, `f.SendJson()`.<br/>
		<br/>
		Sending content directly to the client will break the HTML document structure by prepending 
		the content to the actual view.<br/>
		<br/>
		There are some use cases where sending content directly is useful, like debugging.<br/>
		!!! note
			Functions that send the status and header fields, like `f.SendStatus()`, `f.SendHeader()`, are safe to use.

## Other details

Pages should be created under `lib/pages/{name}.go`, where `{name}` is the name of the page.

Views *must* be created under `lib/components/views/{name}.svelte`, where `{name}` is the name of the page.
