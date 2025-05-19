Use `server.WithPageController()` to create a page

`main.go`
```go
package main

import (
	"embed"
	f "github.com/razshare/frizzante"
	"main/lib/controllers/pages"
)

//go:embed .dist/*/**
var dist embed.FS

func main() {
	// Create.
	server := f.NewServer()
	notifier := f.NewNotifier()

	// Configure.
	server.WithPort(8080)
	server.WithNotifier(notifier)
	server.WithHostName("127.0.0.1")
	server.WithEmbeddedFileSystem(&dist)

	// Pages.
	server.WithPageController(pages.MyPageController{})

	//Start.
	server.Start()
}
```

where `pages.MyPageController` is defined as

`lib/controllers/page/MyPageController.go`
```go
package pages

import (
	f "github.com/razshare/frizzante"
)

type MyPageController struct {
	f.PageController
}

func (_ MyPageController) Configure() f.PageConfiguration {
	return f.PageConfiguration{
		Path: "/",
	}
}

func (_ MyPageController) Base(req *f.Request, res *f.Response) {
	res.SendView(f.NewView(f.RenderFull))
}

func (_ MyPageController) Action(req *f.Request, res *f.Response) {
	res.SendView(f.NewView(f.RenderFull))
}
```

This controller expects a view located at `lib/components/views/MyPageView.svelte`

!!! note
	Page views are automatically bound to page controllers based on the name their names.<br/>
	<br/>
	Any page controller is expected to be named as `{Name}Controller` and its view is expected to be named `{Name}View`,
	where `Name` is the common prefix binding the controller to the view.<br/>
	!!! example
		A page controller located at `lib/controllers/pages/TestController.go` 
		will bind to a page view located at `lib/components/views/TestView.svelte`.

`lib/components/views/MyPageView.svelte`
```html
<h1>Welcome to Frizzante.</h1>
```

Both `Base` and `Action` handlers must use `res.SendView()` to send the view to the client.

!!! note
	A base page handler is a function that 
	handles requests to the `GET` http verb.<br/>
	This function usually does not modify the state, 
	it just renders information to the screen.


!!! note
	An action page handler is a function that 
	handles requests to the `POST` http verb.<br/>
	This function usually modifies the state and 
	sometimes redirects to some other page.


## View

Inject data into views with `f.NewViewWithData()`

`lib/controllers/page/MyPageController.go`
```go
func (_ MyPageController) Base(req *f.Request, res *f.Response) {
	data := map[string]string{
		"name": "world",
	}
	res.SendView(f.NewViewWithData(f.RenderFull, data))
}
```

This data can be retrieved from your svelte components using [getContext("server")](https://svelte.dev/docs/svelte/context).

`lib/components/views/MyPageView.svelte`
```html
<script lang="ts">
    import {getContext} from "svelte";
    import type {ServerContext} from "$frizzante/types.ts";
	
    const server = getContext("server") as ServerContext<{ 
		name: string
	}>
</script>

<h1>Hello {server.data.name}!</h1>
```

## Conventions

Page controllers should be created under `lib/controllers/pages/{name}Controller.go`, where `{name}` is the name of the page.

Page views should be created under `lib/components/views/{name}Views.go`, where `{name}` is the name of the page.
