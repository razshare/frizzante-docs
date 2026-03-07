<script lang="ts">
    import Page from "$lib/components/page.svelte"
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    import gif1 from "$lib/assets/todos_example_gif_1.gif"
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    import diagram1 from "$lib/assets/todos_example_diagram_1.svg"
    import Code from "$lib/components/code.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import Note from "$lib/components/note.svelte"
    import Tip from "$lib/components/tip.svelte"
    import HyperTable from "$lib/components/hyper_table.svelte"
    import Image from "$lib/components/image.svelte"
    import Title from "$lib/components/title.svelte"
    import MenuItemHyperlink from "$lib/components/menu_item_hyperlink.svelte"
</script>

<Page title="Todos Example">
    <Title text="Todos Example" />
    <span>The starter template comes with a todos application.</span>
    <br />
    <br />
    <Image src={gif1} width="500px" />
    <Title text="Main" />
    <span>The server defines a few routes.</span>
    <Code
        lang="go"
        source={`
            func main() {
                defer servers.Start(server)
                server.Efs = efs
                server.Routes = []routes.Route{
                    {Pattern: "GET /", Handler: fallback.View},
                    {Pattern: "GET /welcome", Handler: welcome.View},
                    {Pattern: "GET /todos", Handler: todos.View},
                    {Pattern: "POST /toggle", Handler: todos.Toggle},
                    {Pattern: "POST /add", Handler: todos.Add},
                    {Pattern: "POST /remove", Handler: todos.Remove},
                }
            }
        `}
    />
    <Title text="Fallback" />
    <span>The <InlineCode source="GET /" /> pattern acts as a fallback.</span>
    <Image src={diagram1} width="100%" />
    <span>
        With that in mind, the fallback handler tries to send back a matching file using
        <InlineCode source="send.RequestedFile()" />
        or, if it doesn’t exist, the <InlineCode source="Welcome" /> view using
        <InlineCode source="welcome.View()" />.
    </span>
    <Code
        lang="go"
        source={`
            func View(client *clients.Client) {
                if !send.RequestedFile(client) {
                    welcome.View(client)
                }
            }
        `}
    />
    <Title text="Welcome View" />
    <span>
        The <InlineCode source="Welcome" /> view, among other things, renders a hyperlink pointing to "GET /todos".
    </span>
    <Code
        lang="go"
        source={`
            func View(client *clients.Client) {
                send.View(client, views.View{Name: "Welcome"})
            }
        `}
    />
    <Code
        lang="svelte"
        source={`
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
        `}
    />
    <Code
        lang="svelte"
        source={`
            {#snippet TodosButton()}
                <a class="btn btn-primary btn-lg" {...href("/todos")}>
                    <span>Show Todos</span>
                    <Icon path={mdiArrowRight} size="18" />
                </a>
            {/snippet}
        `}
    />
    <Title text="Todos View" />
    <span>
        The <InlineCode source="GET /todos" /> pattern is then captured by a Go handler function, which sends back the "Todos"
        view along with a list of items retrieved from the user’s session.
    </span>
    <Code
        lang="go"
        source={`
            func View(client *clients.Client) {
                session := sessions.NewDefault()
                receive.Session(client, &session)
                defer func() { session.Error = "" }()
                send.View(client, views.View{Name: "todos", Props: Props{
                    Error: session.Error,
                    Items: session.Todos,
                }})
            }
        `}
    />
    <Note>
        <span>The user session is initialized with a few items.</span>
        <Code
            lang="go"
            source={`
                func NewDefault() *Session {
                    return &Session{
                        Todos: []Todo{
                            {Checked: false, Description: "Pet the cat."},
                            {Checked: false, Description: "Do laundry"},
                            {Checked: false, Description: "Pet the cat."},
                            {Checked: false, Description: "Cook"},
                            {Checked: false, Description: "Pet the cat."},
                        },
                    }
                }
            `}
        />
    </Note>
    <span>
        The <InlineCode source="Todos" /> view is a
        <a href="https://en.wikipedia.org/wiki/Create,_read,_update_and_delete">CRUD</a>
        web ui.
    </span>
    <Code
        lang="svelte"
        source={`
            ${"<"}script lang="ts">
                //...
                import type { Props, Todo } from "$gen/types/main/lib/routes/todos/Props"
                let { todos = [], error }: Props = $props()
                //...
            </script>
        `}
    />
    <Code
        lang="svelte"
        source={`
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
        `}
    />
    <Title text="List Todos" />
    <span>Items are listed by iterating over <InlineCode source="todos" />.</span>
    <Code
        lang="svelte"
        source={`
            {#snippet ShowTodosList(todos: sessions.Todo[])}
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
        `}
    />
    <span>Each item has remove and toggle buttons.</span>
    <Note>
        <span>Type <InlineCode source="sessions.Todo" /> is an autogenerated type definition.</span>
        <span>See <a href="/type_definitions">type definitions</a>.</span>
    </Note>
    <Title text="Remove Todos" />
    <span>Items are removed by submitting a form to <InlineCode source="POST /remove" />.</span>
    <Code
        lang="svelte"
        source={`
            {#snippet RemoveTodoButton(index: number)}
                <form method="POST" {...action("/remove")}>
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
        `}
    />
    <Tip>
        <span>
            If you need more control over errors and pending states see
            <a href="/web_standards#form-component">Form Component</a>.
        </span>
    </Tip>
    <span>
        The form is then captured by the <InlineCode source="Remove" />
        handler, which does some basic validation, error handling and then finally removes the item from the session.
    </span>
    <Code
        lang="go"
        source={`
            type RemoveForm struct {
                Index int \`form:"index"\`
            }
        `}
    />
    <Code
        lang="go"
        source={`
            func Remove(client *clients.Client) {
                session := sessions.NewDefault()
                receive.Session(client, &session)

                var form RemoveForm
                if !receive.Form(client, &form) {
                    session.Error = "could not parse form"
                    send.Navigate(client, "/todos")
                    return
                }

                if count := len(session.Todos); form.Index >= count || form.Index < 0 {
                    session.Error = "index out of bounds"
                    send.Navigate(client, "/todos")
                    return
                }

                session.Todos = append(
                    session.Todos[:form.Index],
                    session.Todos[form.Index+1:]...,
                )

                send.Navigate(client, "/todos")
            }
        `}
    />
    <Title text="Toggle Todos" />
    <span>Items are toggled by submitting a form to <InlineCode source="POST /toggle" />.</span>
    <Code
        lang="svelte"
        source={`
            {#snippet ToggleTodoButton(todo: Todo, index: number)}
                {@const aria = todo.checked ? "Uncheck" : "Check"}
                {@const value = todo.checked ? "0" : "1"}
                {@const icon = todo.checked ? mdiCheckCircleOutline : mdiCircleOutline}
                <form method="POST" {...action("/toggle")} class="grow content-center">
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
        `}
    />
    <span>The form is then captured by the <InlineCode source="Toggle" /> handler.</span>
    <Code
        lang="go"
        source={`
            type ToggleForm struct {
                Index int \`form:"index"\`
                Value int \`form:"value"\`
            }
        `}
    />
    <Code
        lang="go"
        source={`
            func Toggle(client *clients.Client) {
                session := sessions.NewDefault()
                receive.Session(client, &session)

                var form ToggleForm
                if !receive.Form(client, &form) {
                    session.Error = "could not parse form"
                    send.Navigate(client, "/todos")
                }

                if count := len(session.Todos); form.Index >= count || form.Index < 0 {
                    session.Error = "index out of bounds"
                    send.Navigate(client, "/todos")
                    return
                }

                session.Todos[form.Index].Checked = form.Value > 0

                send.Navigate(client, "/todos")
            }
        `}
    />
    <Title text="Add Todos" />
    <span>Items are added by submitting a form to <InlineCode source="POST /add" />.</span>
    <Code
        lang="svelte"
        source={`
            {#snippet AddTodoForm()}
                <form method="POST" {...action("/add")} class="flex">
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
        `}
    />
    <span>The form is then captured by the <InlineCode source="Add" /> handler.</span>
    <Code
        lang="go"
        source={`
            type AddForm struct {
                Description string \`form:"description"\`
            }
        `}
    />
    <Code
        lang="go"
        source={`
            func Add(client *clients.Client) {
                session := sessions.NewDefault()
                receive.Session(client, &session)

                var form AddForm
                if !receive.Form(client, &form) {
                    session.Error = "could not parse form"
                    send.Navigate(client, "/todos")
                    return
                }

                if form.Description == "" {
                    session.Error = "description cannot be empty"
                    send.Navigate(client, "/todos")
                    return
                }

                session.Todos = append(session.Todos, sessions.Todo{
                    Checked:     false,
                    Description: form.Description,
                })

                send.Navigate(client, "/todos")
            }
        `}
    />
    <Title text="More Examples" />
    <HyperTable
        hyperlinks={{
            "A live chat application": "https://github.com/razshare/frizzante-example-chat",
            "A blog application with login and registration forms":
                "https://github.com/razshare/frizzante-example-blog",
        }}
    />
    {#snippet rightSidebar()}
        <MenuItemHyperlink text="Todos Example" />
        <MenuItemHyperlink text="Main" />
        <MenuItemHyperlink text="Fallback" />
        <MenuItemHyperlink text="Welcome View" />
        <MenuItemHyperlink text="Todos View" />
        <MenuItemHyperlink text="List Todos" />
        <MenuItemHyperlink text="Remove Todos" />
        <MenuItemHyperlink text="Toggle Todos" />
        <MenuItemHyperlink text="Add Todos" />
        <MenuItemHyperlink text="More Examples" />
    {/snippet}
</Page>
