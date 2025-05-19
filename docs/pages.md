Use `server.WithPageController()` to create a page.

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

`lib/controllers/page/MyPageController.go`
```go
package pages

import (
	f "github.com/razshare/frizzante"
)

type MyPageController struct {
	f.PageController
}

func (controller MyPageController) Configure() f.PageConfiguration {
	return f.PageConfiguration{
		Path: "/",
	}
}

func (controller MyPageController) Base(request *f.Request, response *f.Response) {
	response.SendView(f.NewView(nil))
}

func (controller MyPageController) Action(request *f.Request, response *f.Response) {
	response.SendView(f.NewView(nil))
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

Both `Base` and `Action` handlers must use `response.SendView()` to send the view to the client.

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

You can inject data into views

`lib/controllers/page/MyPageController.go`
```go
func (controller MyPageController) Base(request *f.Request, response *f.Response) {
	data := map[string]string{
		"name": "world",
	}
	response.SendView(f.NewView(data))
}
```

This data can be retrieved from your svelte components with as properties.

`lib/components/views/MyPageView.svelte`
```html
<script lang="ts">
    type Data = { name: string }
    type Props = { server: ServerProperties<Data> }
    let {server = $bindable()}: Props = $props()
</script>

<h1>Hello {server.data.name}!</h1>
```

## Other details

Page controllers should be created under `lib/controllers/pages/{name}Controller.go`, where `{name}` is the name of the page.

Page views should be created under `lib/components/views/{name}Views.go`, where `{name}` is the name of the page.
