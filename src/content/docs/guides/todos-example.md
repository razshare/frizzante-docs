---
title: Todos Example
---

The starter template comes with a todos application.

![alt text](image100.png)

Although the application itself is simple, there are many 
things that might need some explanation.

## Main

First of all every interaction happens through a `GET` verb.

```go
//main.go
package main

import (
    "embed"
    "main/lib/core/route"
    "main/lib/core/server"
    "main/lib/core/view/ssr"
    "main/lib/routes/handlers/fallback"
    "main/lib/routes/handlers/todos"
    "main/lib/routes/handlers/welcome"
    "os"
)

//go:embed app/dist
var efs embed.FS
var srv = server.New()
var dev = os.Getenv("DEV") == "1"
var render = ssr.New(ssr.Config{Efs: efs, Disk: dev})

func main() {
    defer server.Start(srv)
    srv.Efs = efs
    srv.Render = render
    srv.Routes = []route.Route{
        {Pattern: "GET /", Handler: fallback.View},
        {Pattern: "GET /welcome", Handler: welcome.View},
        {Pattern: "GET /todos", Handler: todos.View},
        {Pattern: "GET /check", Handler: todos.Check},
        {Pattern: "GET /uncheck", Handler: todos.Uncheck},
        {Pattern: "GET /add", Handler: todos.Add},
        {Pattern: "GET /remove", Handler: todos.Remove},
    }
}
```

As you can see, all handlers are exposed with a `GET /...` pattern.

## fallback.View

The `fallback.View` handler is exposed with a `GET /` pattern, 
which acts as a fallback handler.

![](image200.svg)

It is for that reason that this handler tries to send a matching file
with `send.FileOrElse()` before doing anything else, in doing so it 
acts as a file server and falls back to `welcome.View`.

```go
//lib/routes/handlers/fallback/view.go
func View(client *client.Client) {
    send.FileOrElse(client, func() { welcome.View(client) })
}
```

## welcome.View

All this handler does is send the `"Welcome"` view to the client with `send.View()`.

```go
//lib/routes/handlers/welcome/view.go
func View(client *client.Client) {
    send.View(client, view.View{Name: "Welcome"})
}
```

This `"Welcome"` view is exported by the application for both the client and the server.

```ts
//app/exports.server.ts
import Welcome from "$lib/views/Welcome.svelte"
import Todos from "$lib/views/Todos.svelte"

export const views = {
    "Welcome": Welcome, // Exporting "Welcome".
    "Todos": Todos,
}
```

```ts
//app/exports.client.ts
export const views = {
    "Welcome": import("$lib/views/Welcome.svelte"), // Exporting "Welcome".
    "Todos": import("$lib/views/Todos.svelte"),
}
```

These are key/value records.

The keys are important, because they dictate the `Name` of the view, the actual property `Name` of the view.

```go
view.View{
    Name: "Welcome", // This.
}
```

## Welcome.svelte

The `"Welcome"` view is simply laying down a header message and a link pointing 
to `"/todos"`.

```svelte
//app/lib/views/Welcome.svelte
<script lang="ts">
    import Layout from "$lib/components/Layout.svelte"
    import { href } from "$lib/scripts/core/href.ts"
</script>

<Layout title="Welcome">
    <h1>Welcome to Frizzante.</h1>
    <a class="link" {...href("/todos")}> Show todos </a>
</Layout>
```

This hyperlink is a bit special, because it doesn't just specify an `href` attribute
as you would normally expect.

Instead it uses the `href()` function to set said attribute.

This is because in reality `href()` also returns a `onclick` handler.

```ts
//lib/scripts/core/href.ts
export function href(path = ""): {
    href: string
    onclick: (event: MouseEvent) => Promise<boolean>
}
```

When the view is allowed to execute JavaScript inside the users's browser,
the hyperlink will swap the view dynamically instead 
of navigating away to the given path.

![](image98.gif)

However, if the view is not allowed to execute JavaScript code, then
the hyperlink will fallback to using web standards, 
and it will navigate away to the given path when clicked.

![](image99.gif)

:::tip
There are several reason as to when and why a view can't execute JavaScript code.

Although rare, a client might choose to disable JavaScript altogether on your
website.

The server itself could choose to not serve a JavaScript bundle to the client.

```go
view.View{
    Name: "Welcome",
    // This will disable JavaScript.
    RenderMode: view.RenderModeServer,
}
```

Another reason might be if, for some reason, your JavaScript bundle is broken, or
not compatible with the client's browser. In that case there's still a good chance that
the hyperlink will continue to work by falling back to its standard behavior.
:::

:::tip
If you need more control over errors and pending states 
see [Link Component](../web-standards/#link-component).
:::

## todos.View

It sends the `"Todos"` view to the client, along with a list of todos, which is
retrieved from the session state.

```go
//lib/routes/handlers/todos/view.go
func View(client *client.Client) {
	state := session.Start(receive.SessionId(client))
	send.View(client, view.View{
		Name: "Todos",
		Props: Props{
			Todos: state.Todos,
			Error: receive.Query(client, "error"),
		},
	})
}
```

By default the session state has a few items in it.

```go
//lib/session/memory/new.go
func New() *State {
	return &State{
		Todos: []Todo{
			{Checked: false, Description: "Pet the cat."},
			{Checked: false, Description: "Do laundry"},
			{Checked: false, Description: "Pet the cat."},
			{Checked: false, Description: "Cook"},
			{Checked: false, Description: "Pet the cat."},
		},
	}
}
```

```go
//lib/session/memory/start.go
var States = map[string]*State{}

func Start(id string) *State {
	if state, ok := States[id]; ok {
		return state
	}

	States[id] = New()
	return States[id]
}
```

## Todos.svelte

The `"Todos"` view does quite a few things.

1. Lists Items
1. Removes items.
1. Checks items.
1. Unchecks items.
1. Adds items.

```svelte
//app/lib/views/Todos.svelte
<script lang="ts">
    import Layout from "$lib/components/Layout.svelte"
    import { href } from "$lib/scripts/core/href.ts"
    import {action} from "$lib/scripts/core/action.ts";

    type Todo = {
       Checked: boolean
       Description: string
    }

    type Props = {
       todos: Todo[]
       error: string
    }

    let { todos, error }: Props = $props()
</script>

<Layout title="Todos">
    <ol>
       {#each todos as todo, index (index)}
          <li>
             <form {...action("/remove")}>
                <input type="hidden" name="index" value={index} />
                <button class="link">[Remove]</button>
             </form>
             {#if todo.Checked}
                <form {...action("/uncheck")}>
                    <input
                       type="hidden"
                       name="index"
                       value={index}
                    />
                    <button class="link">
                       <!---->
                       (x) {todo.Description}
                       <!---->
                    </button>
                </form>
             {:else}
                <form {...action("/check")}>
                    <input
                       type="hidden"
                       name="index"
                       value={index}
                    />
                    <button class="link">
                       <!---->
                       (&nbsp;&nbsp;) {todo.Description}
                       <!---->
                    </button>
                </form>
             {/if}
          </li>
       {/each}
    </ol>
    <form {...action("/add")}>
       <span class="link">Description</span>
       <input type="text" value="" name="description" />
       <button class="link" type="submit">Add +</button>
    </form>

    {#if error}
       <br />
       <span class="error">{error}</span>
    {/if}

    <br />
    <a class="link" {...href("/")}>&lt; Back</a>
</Layout>
```

###### Listing Items

The component itself receives the todo list 
as a `todos` property from the server

```ts
//app/lib/views/Todos.svelte
let {todos, error}:Props = $props()
```

which is then iterated upon to render the items

```svelte
//app/lib/views/Todos.svelte
{#each todos as todo, index (index)}
    <li>
       <form {...action("/remove")}>
          <input type="hidden" name="index" value={index} />
          <button class="link">[Remove]</button>
       </form>
       {#if todo.Checked}
          <form {...action("/uncheck")}>
             <input
                type="hidden"
                name="index"
                value={index}
             />
             <button class="link">
                <!---->
                (x) {todo.Description}
                <!---->
             </button>
          </form>
       {:else}
          <form {...action("/check")}>
             <input
                type="hidden"
                name="index"
                value={index}
             />
             <button class="link">
                <!---->
                (&nbsp;&nbsp;) {todo.Description}
                <!---->
             </button>
          </form>
       {/if}
    </li>
{/each}
```

Each item has two buttons, a **remove button** and a **toggle** button.

###### Removing Items

Removing an item from the list involves submitting a form to `/remove`, along with the
index of the item, which is hidden.

```svelte
//app/lib/views/Todos.svelte
<form {...action("/remove")}>
    <input type="hidden" name="index" value={index} />
    <button class="link">[Remove]</button>
</form>
```

This action is then captured by the `Remove` handler,
which does some basic validation, error handling 
and then finally removes the item from the session.

:::tip
Similarly to `href()`, the `action()` function adapts the form.

In essence, forms behave similarly to hyperlinks, in that when submitted,
they naturally navigate away to a new path, the `action` path.

When JavaScript is enabled, `action()` makes it so that instead of navigating away
and reloading the whole page, the form will swap the view locally.

![](image101.gif)

On the other hand, if JavaScript is disabled, the form will fallback to web standards
and behave like any other form, navigating away to the new path.

![](image102.gif)
:::

:::tip
If you need more control over errors and pending states 
see [Form Component](../web-standards/#form-component).
:::

```go
//lib/routes/handlers/todos/remove.go
func Remove(client *client.Client) {
	var err error
	var index int64
	var count int64
	var query string
	var state *session.State

	state = session.Start(receive.SessionId(client))

	if query = receive.Query(client, "index"); query == "" {
		// No index found, ignore the request.
		send.Navigate(client, "/todos")
		return
	}

	if index, err = strconv.ParseInt(query, 10, 64); err != nil {
		send.Navigatef(client, "/todos?error=%s", err.Error())
		return
	}

	if count = int64(len(state.Todos)); index >= count || index < 0 {
		// Index is out of bounds, ignore the request.
		send.Navigate(client, "/todos")
		return
	}

	state.Todos = append(
		state.Todos[:index],
		state.Todos[index+1:]...,
	)

	send.Navigate(client, "/todos")
}
```

:::caution
Notice the use of `receive.Query(client, "index")`.

This is a reminder that, if not specified otherwise, 
forms prefer using the `GET` verb.

The equivalent using the `POST` verb would be

```svelte
//app/lib/views/Todos.svelte
<form method="POST" {...action("/remove")}>
    <input type="hidden" name="index" value={index} />
    <button class="link">[Remove]</button>
</form>
```

```go
//lib/routes/handlers/todos/Remove.go
// ...
query := receive.Form(client).Get("index")
// ...
```
:::

###### Checking & Unchecking Items

Checking and unchecking items is also done using forms.

```svelte
//app/lib/views/Todos.svelte
{#if todo.Checked}
    <form {...action("/uncheck")}>
       <input type="hidden" name="index" value={index} />
       <button class="link">
          <!---->
          (x) {todo.Description}
          <!---->
       </button>
    </form>
{:else}
    <form {...action("/check")}>
       <input type="hidden" name="index" value={index} />
       <button class="link">
          <!---->
          (&nbsp;&nbsp;) {todo.Description}
          <!---->
       </button>
    </form>
{/if}
```

Checking an item sends a form to `/check` and unchecking it sends the form to `/uncheck`.

Both forms indicate the index of the item using a hidden input field.

```svelte
//lib/views/Todos.svelte
<input type="hidden" name="index" value={index} />
```

Checking is handled by the `Check` handler.

```go
//lib/routes/handlers/todos/check.go
func Check(client *client.Client) {
	var err error
	var index int64
	var count int64
	var query string
	var state *session.State

	state = session.Start(receive.SessionId(client))

	if query = receive.Query(client, "index"); query == "" {
		// No index found, ignore the request.
		send.Navigate(client, "/todos")
		return
	}

	if index, err = strconv.ParseInt(query, 10, 64); err != nil {
		send.Navigatef(client, "/todos?error=%s", err.Error())
		return
	}

	if count = int64(len(state.Todos)); index >= count || index < 0 {
		// Index is out of bounds, ignore the request.
		send.Navigate(client, "/todos")
		return
	}

	state.Todos[index].Checked = true

	send.Navigate(client, "/todos")
}
```

While unchecking is handled by the `Uncheck` handler, which does the exact same thing
as `Check`, except it sets `Checked` to `false` instead of `true`.

```go
//lib/routes/handlers/todos/uncheck.go
// ...
state.Todos[index].Checked = false
// ...
```

###### Adding Items

The final piece of the puzzle is adding items to the list, which is done
by sending a form to `/add`.

```svelte
//lib/views/Todos.svelte
<form {...action("/add")}>
    <span class="link">Description</span>
    <input type="text" value="" name="description" />
    <button class="link" type="submit">Add +</button>
</form>
```

This form is then captured by the `Add` handler.

```go
//lib/routes/handlers/todos/add.go
func Add(client *client.Client) {
	var query string
	var state *session.State

	state = session.Start(receive.SessionId(client))

	if query = receive.Query(client, "description"); query == "" {
		send.Navigate(client, "/todos?error=todo description cannot be empty")
		return
	}

	state.Todos = append(state.Todos, session.Todo{
		Checked:     false,
		Description: query,
	})

	send.Navigate(client, "/todos")
}
```

## More Examples

| Description | Hyperlink |
|-------------|-----------|
| A live chat application | https://github.com/razshare/frizzante-example-chat |
| A blog application with login and registration forms | https://github.com/razshare/frizzante-example-blog |