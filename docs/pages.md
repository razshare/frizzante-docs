Before creating a page, you need to create a view, which are just `.svelte` components.<br/>
These components *must* be located under `lib/components/views`.

!!! note
	See the [views section](./views.md) for more details.

Views can be referred to by your Go code using their name relative to `lib/components/views`.

!!! example
	A view located at `lib/components/views/Welcome.svelte` will be identified by `Welcome`.

Subdirectories are joined by `.` instead of `/` or `\`.

!!! example
	A view located at `lib/components/views/about/Me.svelte` will be identified by `about.Me`.

After you've created your view, you can add a page to the server with `f.ServerWithPageBuilder()` in your `main.go` file.

`main.go`
```go
package main

import (
	"embed"
	f "github.com/razshare/frizzante"
	"main/lib/pages"
)

//go:embed .dist/*/**
var dist embed.FS

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
	f.ServerWithPageBuilder(server, pages.Welcome)

	// Start.
	f.ServerStart(server)
}
```

`lib/pages/Welcome.go`
```go
package pages

import f "github.com/razshare/frizzante"

func Welcome(page *f.Page) {
	// Build page.
	f.PageWithPath(page, "/Welcome")
	f.PageWithView(page, f.ViewReference("Welcome")) // This references the file 
													 // "lib/components/views/Welcome.svelte"
	f.PageWithBaseHandler(page, func(request *f.Request, response *f.Response, view *f.View) {
		// Show page.
	})
	f.PageWithActionHandler(page, func(request *f.Request, response *f.Response, view *f.View) {
		// Modify state.
	})
}
```

`lib/components/views/Welcome.svelte`
```html
<h1>Welcome to Frizzante.</h1>
```

In your setup function, `f.PageWithPath()` sets the path of your page 
and `f.PageWithView()` sets the view of your page.

!!! note
    You can map many paths to one view.
    ```go
    f.PageWithPath(page, "/")
    f.PageWithPath(page, "/api/greeting")
	f.PageWithView(page, f.ViewReference("Welcome"))
    ```
	
!!! danger
    You cannot map many views to one path.
    ```go
    f.PageWithPath(page, "/")
	f.PageWithView(page, f.ViewReference("Welcome"))  // <-- This is not allowed,
	f.PageWithView(page, f.ViewReference("Login"))    // <-- two views are exposed by the same path.
    ```

`f.PageWithBaseHandler()` sets the page base handler

!!! note
	A base page handler is a function that 
	handles requests to the `GET` http verb.<br/>
	This function usually does not modify the state, 
	it just renders information to the screen.

`f.PageWithActionHandler()` sets the page action handler

!!! note
	An action page handler is a function that 
	handles requests to the `POST` http verb.<br/>
	This function usually modifies the state and 
	sometimes redirects to some other page.

Each page exposes a `Data` map, which is automatically injected into the view


`lib/pages/Welcome.go`
```go
package pages

import f "github.com/razshare/frizzante"

func Welcome(page *f.Page) {
	// Build page.
	f.PageWithPath(page, "/Welcome")
	f.PageWithView(page, f.ViewReference("Welcome")) // This references the file 
													 // "lib/components/views/Welcome.svelte"
	f.PageWithBaseHandler(page, func(request *f.Request, response *f.Response, view *f.View) {
		f.ViewWithData(view, "name", "world")
	})
}
```

These `Data` fields can be retrieved from your svelte components with [getContext("data")](https://svelte.dev/docs/svelte/svelte#getContext).

`lib/components/views/Welcome.svelte`
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
	You can receives path fields with `f.RequestReceivePath()`, 
	queries with `f.RequestReceiveQuery()`,
	forms with `f.RequestReceiveForm()`,
	json objects with `f.RequestReceiveJson[T]()` and so on.<br/>
	!!! danger
		While rendering a page, you shouldn't send content to the client directly 
		using `f.ResponseSend*` functions, 
		like `f.ResponseSendMessage()`, `f.ResponseSendJson()`.<br/>
		<br/>
		Sending content directly to the client will break the HTML document structure by prepending 
		the content to the actual view.<br/>
		<br/>
		There are some use cases where sending content directly is useful, like debugging.<br/>
		!!! note
			Functions that send the status and header fields, like `f.ResponseSendStatus()`, `f.ResponseSendHeader()`, are safe to use.

!!! danger
	## Very important!<br/>
	After creating a new page, you must run again `make configure` in order to compile your new `.svelte` file into a `.js` file.

## Other details

Page functions should be created under `lib/pages/{name}.go`, where `{name}` is the name of the page.
