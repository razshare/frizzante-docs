---
title: Todos Example
---

The starter template comes with a todos application.

You can find this example at https://github.com/razshare/frizzante-starter.

![alt text](image100.png)

Although the application itself is simple, there are many 
things that might need some explanation.

## Main

First of all every interaction happens through a `GET` verb.

```go
//main.go
//go:embed app/dist
var efs embed.FS
var server = servers.New()

func main() {
    server.Efs = efs

	server.Routes = []routes.Route{
		{Pattern: "GET /", Handler: handlers.Default},
		{Pattern: "GET /welcome", Handler: handlers.Welcome},
		{Pattern: "GET /todos", Handler: handlers.Todos},
		{Pattern: "GET /check", Handler: handlers.Check},
		{Pattern: "GET /uncheck", Handler: handlers.Uncheck},
		{Pattern: "GET /add", Handler: handlers.Add},
		{Pattern: "GET /remove", Handler: handlers.Remove},
	}

	server.Start()
}
```

As you can see, all handlers are exposed with a `GET /...` pattern.

## Default

The `Default` handler is exposed with a `GET /` pattern, 
which acts as a fallback handler.

![](image200.svg)

It is for that reason that this handler tries to send a matching file
with `SendFileOrElse()` before doing anything else.

```go
//lib/handlers/default.go
func Default(connection *connections.Connection) {
    connection.SendFileOrElse(func() { Welcome(connection) })
}
```

:::note
This handler essentially acts as a file server and falls back to `Welcome`.
:::

## Welcome Handler

All this handler does is send the `"Welcome"` view to the user with `SendView()`.

```go
//lib/handlers/welcome.go
func Welcome(connection *connections.Connection) {
    connection.SendView(views.View{Name: "Welcome"})
}
```

This `"Welcome"` view is exported by the application for both the client and the server.

```ts
//app/exports/server.ts
import Welcome from "$lib/views/Welcome.svelte"
import Todos from "$lib/views/Todos.svelte"

export const views = {
    "Welcome": Welcome, // Exporting "Welcome".
    "Todos": Todos,
}
```

```ts
//app/exports/client.ts
export const views = {
    "Welcome": import("$lib/views/Welcome.svelte"), // Exporting "Welcome".
    "Todos": import("$lib/views/Todos.svelte"),
}
```

These are key/value records.

The keys are important, because they dictate the `Name` of the view, the actual property `Name` of the view.

```go
views.View{
    Name: "Welcome", // This.
}
```

## Welcome View

The `"Welcome"` view is simply laying down a header message and a link pointing 
to `"/todos"`.

```svelte
//app/lib/views/Welcome.svelte
<script lang="ts">
    import Layout from "$lib/components/Layout.svelte"
    import { href } from "$frizzante/scripts/href.ts"
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
//frizzante/scripts/href.ts
export function href(path = ""): {
    href: string
    onclick: (e: MouseEvent) => void
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

Although rare, a user might choose to disable JavaScript altogether on your
website.

The server itself could choose to not serve a JavaScript bundle to the user.

```go
views.View{
    Name: "Welcome",
    // This will disable JavaScript.
    RenderMode: views.RenderModeServer,
}
```

Another reason might be if, for some reason, your JavaScript bundle is broken, or
not compatible with the user's browser. In that case there's still a good chance that
the hyperlink will continue to work by falling back to its standard behavior.
:::

:::tip
If you need more control over errors and pending states 
see [Link Component](../web-standards/#link-component).
:::

## Todos Handler

It sends the `"Todos"` view to the user, along with a list of todos, which is
retrieved from the session state.

```go
//lib/handlers/todos.go
func Todos(connection *connections.Connection) {
    session := sessions.New(connection, state.Default()).Start()
    defer sessions.Save(session)

    connection.SendView(views.View{
        Name: "Todos", 
        Data: map[string]any{
            "todos": session.State.Todos,
        },
    })
}
```

As mentioned in the [sessions](../../guides/sessions) section,
the default session operator handles things in a local `sessions` directory.

By default the session state has a few items in it, initialized by 
`state.Default()`.

```go
//lib/state/functions.go
func Default() State {
	return State{
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

This state is immediately overwritten by the session operator if an existing session
is found for the user.

If the session is a fresh one instead, the initial state remains untouched,
thus the final `session.State.Todos` property will always contain the 5 todo items when initialized.

## Todos View

This `"Todos"` view does quite a few things.

1. Lists Items
1. Removes items.
1. Checks items.
1. Unchecks items.
1. Adds items.

```svelte
//app/lib/views/Todos.svelte
<script lang="ts">
    import Layout from "$lib/components/Layout.svelte"
    import { href } from "$frizzante/core/scripts/href.ts"
    import {action} from "$frizzante/core/scripts/action.ts";

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
//lib/handlers/remove.go
func Remove(connection *connections.Connection) {
    session := sessions.New(connection, state.Default()).Start()
    defer sessions.Save(session)

    count := int64(len(session.State.Todos))

    if 0 == count {
        // No todos found, ignore the request.
        connection.SendNavigate("/todos")
        return
    }

    indexString := connection.ReceiveQuery("index")
    if "" == indexString {
        // No index found, ignore the request.
        connection.SendNavigate("/todos")
        return
    }

    index, indexError := strconv.ParseInt(indexString, 10, 64)
    if nil != indexError {
        connection.SendView(views.View{Name: "Todos", Data: map[string]any{
            "error": indexError.Error(),
        }})
        return
    }

    if index >= count {
        // Index is out of bounds, ignore the request.
        connection.SendNavigate("/todos")
        return
    }

    session.State.Todos = append(
        session.State.Todos[:index], 
        session.State.Todos[index+1:]...,
    )

    connection.SendNavigate("/todos")
}
```

:::caution
Notice the use of `connection.ReceiveQuery("index")`.

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
//lib/handlers/remove.go
// ...
form := connection.ReceiveForm()
indexString := form.Get("index")
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
//lib/handlers/check.go
func Check(connection *connections.Connection) {
    session := sessions.New(connection, state.Default()).Start()
    defer session.Save()

    indexString := connection.ReceiveQuery("index")
    if "" == indexString {
        // No index found, ignore the request.
        connection.SendNavigate("/todos")
        return
    }

    index, indexError := strconv.ParseInt(indexString, 10, 64)
    if nil != indexError {
        connection.SendView(views.View{
            Name: "Todos", 
            Data: map[string]any{
                "error": indexError.Error(),
            },
        })
        return
    }

    count := int64(len(session.State.Todos))
    if index >= count {
        // Index is out of bounds, ignore the request.
        connection.SendNavigate("/todos")
        return
    }

    session.State.Todos[index].Checked = true

    connection.SendNavigate("/todos")
}
```

While unchecking is handled by the `Uncheck` handler, which does the exact same thing
as `Check`, except it sets `Checked` to `false` instead of `true`.

```go
//lib/handlers/uncheck.go
// ...
session.State.Todos[id].Checked = false
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
//lib/handlers/add.go
func Add(connection *connections.Connection) {
    session := sessions.New(connection, state.Default()).Start()
    defer sessions.Save(session)

    description := connection.ReceiveQuery("description")

    if "" == description {
        connection.SendView(views.View{
            Name: "Todos",
            Data: map[string]any{
                "todos": session.State.Todos,
                "error": "todo description cannot be empty",
            },
        })
        return
    }

    session.State.Todos = append(session.State.Todos, state.Todo{
        Checked:     false,
        Description: description,
    })

    connection.SendNavigate("/todos")
}
```

## More Examples

| Description | Hyperlink |
|-------------|-----------|
| A live chat application | https://github.com/razshare/frizzante-example-chat |
| A blog application with login and registration forms | https://github.com/razshare/frizzante-example-blog |