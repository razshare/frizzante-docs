<script lang="ts">
    import diagram1 from "$lib/assets/todos_example_diagram_1.svg"
    import header from "$lib/assets/todos_example_header.png"
    import Code from "$lib/components/code.svelte"
    import Footer from "$lib/components/footer.svelte"
    import HyperTable from "$lib/components/hyper_table.svelte"
    import Image from "$lib/components/image.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import Note from "$lib/components/note.svelte"
    import Page from "$lib/components/page.svelte"
    import RightSidebar from "$lib/components/right_sidebar.svelte"
    import Title from "$lib/components/title.svelte"
    import { href } from "$lib/scripts/core/href"
    import { base } from "$lib/scripts/strings/base"
    let { prefix } = $props()
</script>

<Page title="Todos Example" {prefix}>
    <Title text="Todos Example" />
    <span>The starter template comes with a todos application.</span>
    <br />
    <br />
    <Image src={header} width="auto" />
    <br />
    <br />
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
    <br />
    <br />
    <Title text="Fallback" />
    <span>The <InlineCode source="GET /" /> pattern acts as a fallback.</span>
    <br />
    <Image src={diagram1} width="auto" />
    <br />
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
    <br />
    <br />
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
            ${"<"}script lang="ts">
                import Icon from "$lib/components/icons/icon.svelte"
                import Layout from "$lib/components/layout.svelte"
                import Logo from "$lib/components/logo.svelte"
                import { href } from "$lib/scripts/core/href.ts"
                import { mdiArrowRight } from "@mdi/js"
            </script>

            <Layout title="Welcome">
                <Logo />
                {@render Description()}
                <div>
                    {@render TodosButton()}
                    {@render DocumentationButton()}
                </div>
            </Layout>

            {#snippet Description()}
                <p>Modern Go + Svelte Framework</p>
            {/snippet}

            {#snippet TodosButton()}
                <a {...href("/todos")}>
                    <button>
                        <span>Show Todos</span>
                        <Icon path={mdiArrowRight} />
                    </button>
                </a>
            {/snippet}

            {#snippet DocumentationButton()}
                <a href="https://razshare.github.io/frizzante-docs/guides/get-started" target="_blank">
                    <button>Documentation</button>
                </a>
            {/snippet}
        `}
    />
    <br />
    <br />
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
        <a target="_blank" href="https://en.wikipedia.org/wiki/Create,_read,_update_and_delete">CRUD</a>
        web ui.
    </span>
    <Code
        lang="svelte"
        source={`
            ${"<"}script lang="ts">
                //...
                import type { Props, sessions } from "$gen/types/main/lib/routes/todos/props"
                let { items = [], error }: Props = $props()
                //...
            </script>
        `}
    />
    <Code
        lang="svelte"
        source={`
            <Layout title="Todos">
                {@render Description()}
                {@render AddTodoForm()}
                {@render TodoList(items)}
                {@render BackButton()}
            </Layout>
        `}
    />
    <br />
    <br />
    <Title text="List Todos" />
    <span>
        Items are listed by iterating over the <InlineCode source="items" />
        prop (which comes from the server).
    </span>
    <Code
        lang="svelte"
        source={`
            {#snippet TodoList(items: sessions.Todo[])}
                {#if items.length > 0}
                    <div class="todo-list">
                        {#each items as todo, index (index)}
                            <div transition:slide class="item">
                                {@render ToggleTodoButton(todo, index)}
                                {@render RemoveTodoButton(index)}
                            </div>
                        {/each}
                    </div>
                    {@render CountUncheckedTodos()}
                {:else}
                    <div class="todo-list">
                        {@render NoTodosFound()}
                    </div>
                {/if}
            {/snippet}
        `}
    />
    <span>Each item has remove and toggle buttons.</span>
    <Note>
        <span>Type <InlineCode source="sessions.Todo" /> is an autogenerated type definition.</span>
        <br />
        <span>See <a {...href(base("/type_definitions", { prefix }))}>type definitions</a>.</span>
    </Note>
    <br />
    <br />
    <Title text="Remove Todos" />
    <span>Items are removed by submitting a form to <InlineCode source="POST /remove" />.</span>
    <Code
        lang="svelte"
        source={`
            {#snippet RemoveTodoButton(index: number)}
                <form method="POST" {...action("/remove")}>
                    <input type="hidden" name="index" value={index} />
                    <label aria-label="Delete">
                        <Icon path={mdiClose} />
                        <button aria-label="remove"></button>
                    </label>
                </form>
            {/snippet}
        `}
    />
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
    <br />
    <br />
    <Title text="Toggle Todos" />
    <span>Items are toggled by submitting a form to <InlineCode source="POST /toggle" />.</span>
    <Code
        lang="svelte"
        source={`
            {#snippet ToggleTodoButton(todo: sessions.Todo, index: number)}
                {@const aria = todo.checked ? "Uncheck" : "Check"}
                {@const value = todo.checked ? "0" : "1"}
                {@const icon = todo.checked ? mdiCheckCircleOutline : mdiCircleOutline}
                <form method="POST" {...action("/toggle")}>
                    <input type="hidden" name="index" value={index} />
                    <input type="hidden" name="value" {value} />
                    <label aria-label={aria}>
                        <Icon path={icon} />
                        {#if todo.checked}
                            <strike>
                                <span>{todo.description}</span>
                            </strike>
                        {:else}
                            <span>{todo.description}</span>
                        {/if}
                        <button aria-label="toggle"></button>
                    </label>
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
    <br />
    <br />
    <Title text="Add Todos" />
    <span>Items are added by submitting a form to <InlineCode source="POST /add" />.</span>
    <Code
        lang="svelte"
        source={`
            {#snippet AddTodoForm()}
                <form method="POST" {...action("/add")}>
                    <input type="text" name="description" placeholder="Add a new task..." />
                    <br />
                    <button type="submit">
                        <Icon path={mdiPlus} />
                        <span>Add</span>
                    </button>
                </form>
                {#if error}
                    <div transition:slide>
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
    <br />
    <br />
    <Title text="More Examples" />
    <HyperTable
        hyperlinks={{
            "A live chat application": "https://github.com/razshare/frizzante-example-chat",
            "A blog application with login and registration forms":
                "https://github.com/razshare/frizzante-example-blog",
        }}
    />
    {#snippet rightSidebar({ body })}
        <RightSidebar
            {body}
            items={[
                { shift: 0, text: "Todos Example" },
                { shift: 0, text: "Main" },
                { shift: 0, text: "Fallback" },
                { shift: 0, text: "Welcome View" },
                { shift: 0, text: "Todos View" },
                { shift: 0, text: "List Todos" },
                { shift: 0, text: "Remove Todos" },
                { shift: 0, text: "Toggle Todos" },
                { shift: 0, text: "Add Todos" },
                { shift: 0, text: "More Examples" },
            ]}
        />
    {/snippet}
    {#snippet footer()}
        <Footer
            previous={{ label: "Snapshots", href: base("/snapshots", { prefix }) }}
            next={{ label: "Docker", href: base("/docker", { prefix }) }}
        />
    {/snippet}
</Page>
