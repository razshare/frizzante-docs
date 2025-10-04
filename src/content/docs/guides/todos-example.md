---
title: Todos Example
---

The starter template comes with a todos application.

![alt text](todos.gif)

## Main

For the sake of simplicity, every interaction happens through a `GET` verb.

```go
//main.go
func main() {
    defer server.Start(srv)
    srv.Efs = efs
    srv.Routes = []route.Route{
        {Pattern: "GET /", Handler: fallback.View},
        {Pattern: "GET /welcome", Handler: welcome.View},
        {Pattern: "GET /todos", Handler: todos.View},
        {Pattern: "GET /toggle", Handler: todos.Toggle},
        {Pattern: "GET /add", Handler: todos.Add},
        {Pattern: "GET /remove", Handler: todos.Remove},
    }
}
```

As you can see, all handlers are exposed with a `GET /...` pattern.

## Fallback

The `GET /` pattern acts as a fallback.

![](image200.svg)

With that in mind, the fallback handler tries to send back a 
matching file or the `"Welcome"` view using `send.FileOrElse()`.

```go
//lib/routes/handlers/fallback/view.go
func View(client *client.Client) {
    send.FileOrElse(client, func() { welcome.View(client) })
}
```

## Welcome View

The `"Welcome"` view, among other things, renders a hyperlink pointing to `"GET /todos"`.

```go
//lib/routes/handlers/welcome/view.go
func View(client *client.Client) {
    send.View(client, view.View{Name: "Welcome"})
}
```

```svelte
//app/lib/views/Welcome.svelte
<Layout title="Welcome">
    <Logo />
    {@render Description()}
    <div class="pt-6"></div>
    <div class="flex justify-center gap-2 relative">
        {@render BackgroundEffect()}
        {@render TodosButton()}
        {@render DocumentationButton()}
    </div>
</Layout>
```

```svelte
//app/lib/views/Welcome.svelte
{#snippet TodosButton()}
    <a class="btn btn-primary btn-lg" {...href("/todos")}>
        <span>Show Todos</span>
        <Icon path={mdiArrowRight} size="18" />
    </a>
{/snippet}
```

## Todos View

The `"GET /todos"` pattern is then captured by a Go handler function, which sends back 
the `"Todos"` view along with a list of items retrieved from the user's session state.

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

:::note
The user session state is initialized with a few items.

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
:::


The `"Todos"` view is a [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) web ui.

```svelte
<script lang="ts">
    //...
    import type { Props, Todo } from "$gen/types/main/lib/routes/handlers/todos/Props"
    let { todos = [], error }: Props = $props()
    //...
</script>
```

```svelte
//app/lib/views/Todos.svelte
<Layout title="Todos">
    <div class="w-full min-w-[450px] max-w-2xl">
        <div class="text-center">
            {@render Description()}
        </div>
        <div class="card-body relative p-6">
            {@render AddTodoForm()}
            <div class="divider"></div>
            {@render ShowTodosList(todos)}
            {@render BackButton()}
        </div>
    </div>
</Layout>
```

### List Todos

Items are listed by iterating over `todos`.


```svelte
//app/lib/views/Todos.svelte
{#snippet ShowTodosList(todos: memory.Todo[])}
    {#if todos.length > 0}
        {#each todos as todo, index (index)}
            <div in:slide out:slide class="flex w-full text-base-content/80">
                {@render ToggleTodoButton(todo, index)}
                {@render RemoveTodoButton(index)}
            </div>
        {/each}
        {@render CountUncheckedTodos()}
    {:else}
        {@render NoTodosFound()}
    {/if}
{/snippet}
```

Each item has remove and toggle buttons.

:::note
Type `memory.Todo` comes from generated types.

```ts
//gen/types/main/lib/routes/handlers/welcome/Props.d.ts
export declare namespace memory {
    export type Todo = {
        description: string
        checked: boolean
    }
}
```

:::

### Remove Todos

Items are removed by submitting a form to `"GET /remove"`.

```svelte
//app/lib/views/Todos.svelte
{#snippet RemoveTodoButton(index: number)}
    <form {...action("/remove")}>
        <input type="hidden" name="index" value={index} />
        <button
            type="submit"
            class="btn btn-ghost btn-sm btn-square hover:text-error hover:bg-error/20 transition-colors"
            aria-label="Delete"
        >
            <Icon path={mdiClose} size="18" />
        </button>
    </form>
{/snippet}
```

:::tip
If you need more control over errors and pending states 
see [Form Component](../web-standards/#form-component).
:::

The form is then captured by the `Remove` handler,
which does some basic validation, error handling 
and then finally removes the item from the session.

```go
//lib/routes/handlers/todos/remove.go

func Remove(client *client.Client) {
    var err error
    var count int64
    var index int64
    var indexQuery string

    state := session.Start(receive.SessionId(client))

    if indexQuery = receive.Query(client, "index"); indexQuery == "" {
        // No index found, ignore the request.
        send.Navigate(client, "/todos")
        return
    }

    if index, err = strconv.ParseInt(indexQuery, 10, 64); err != nil {
        // Could not parse index, redirect with error.
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

### Toggle Todos

Items are toggled by submitting a form to `"GET /toggle"`.

```svelte
//app/lib/views/Todos.svelte
{#snippet ToggleTodoButton(todo: Todo, index: number)}
    {@const aria = todo.checked ? "Uncheck" : "Check"}
    {@const value = todo.checked ? "0" : "1"}
    {@const icon = todo.checked ? mdiCheckCircleOutline : mdiCircleOutline}
    <form {...action("/toggle")} class="grow content-center">
        <input type="hidden" name="index" value={index} />
        <input type="hidden" name="value" {value} />
        <button
            type="submit"
            class="w-full flex cursor-pointer"
            class:line-through={todo.checked}
            class:text-base-content={todo.checked}
            class:opacity-50={todo.checked}
            aria-label={aria}
        >
            <Icon path={icon} />
            <div class="pr-4"></div>
            <span>{todo.description}</span>
        </button>
    </form>
{/snippet}
```

The form is then captured by the `Toggle` handler.

```go
//lib/routes/handlers/todos/toggle.go
func Toggle(client *client.Client) {
    var err error
    var count int64
    var index int64
    var value int64
    var indexQuery string
    var valueQuery string

    state := session.Start(receive.SessionId(client))

    if indexQuery = receive.Query(client, "index"); indexQuery == "" {
        // No index found, ignore the request.
        send.Navigate(client, "/todos")
        return
    }

    if valueQuery = receive.Query(client, "value"); valueQuery == "" {
        // No value found, ignore the request.
        send.Navigate(client, "/todos")
        return
    }

    if index, err = strconv.ParseInt(indexQuery, 10, 64); err != nil {
        // Could not parse index, redirect with error.
        send.Navigatef(client, "/todos?error=%s", err.Error())
        return
    }

    if value, err = strconv.ParseInt(valueQuery, 10, 64); err != nil {
        // Could not parse value, redirect with error.
        send.Navigatef(client, "/todos?error=%s", err.Error())
        return
    }

    if count = int64(len(state.Todos)); index >= count || index < 0 {
        // Index is out of bounds, ignore the request.
        send.Navigate(client, "/todos")
        return
    }

    state.Todos[index].Checked = value > 0

    send.Navigate(client, "/todos")
}
```

### Add Todos

Items are added by submitting a form to `GET /add`.

```svelte
//lib/views/Todos.svelte
{#snippet AddTodoForm()}
    <form {...action("/add")} class="flex">
        <input
            type="text"
            name="description"
            placeholder="Add a new task..."
            class="input bg-base-100/ text-lg w-full"
        />
        <div class="pt-4"></div>
        <button type="submit" class="btn btn-ghost text-lg">
            <Icon path={mdiPlus} size="20" />
            <span>Add</span>
        </button>
    </form>

    {#if error}
        <div class="pt-4"></div>
        <div in:slide out:slide class="alert alert-error">
            <span>{error}</span>
        </div>
    {/if}
{/snippet}
```

The form is then captured by the `Add` handler.

```go
//lib/routes/handlers/todos/add.go
func Add(client *client.Client) {
    var description string

    state := session.Start(receive.SessionId(client))

    if description = receive.Query(client, "description"); description == "" {
        send.Navigate(client, "/todos?error=todo description cannot be empty")
        return
    }

    state.Todos = append(state.Todos, session.Todo{
        Checked:     false,
        Description: description,
    })

    send.Navigate(client, "/todos")
}
```

## More Examples

| Description | Hyperlink |
|-------------|-----------|
| A live chat application | https://github.com/razshare/frizzante-example-chat |
| A blog application with login and registration forms | https://github.com/razshare/frizzante-example-blog |