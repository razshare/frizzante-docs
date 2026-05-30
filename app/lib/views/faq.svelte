<script lang="ts">
    import Code from "$lib/components/code.svelte"
    import Footer from "$lib/components/footer.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import Note from "$lib/components/note.svelte"
    import Page from "$lib/components/page.svelte"
    import RightSidebar from "$lib/components/right_sidebar.svelte"
    import Title from "$lib/components/title.svelte"
    import { base } from "$lib/scripts/strings/base"
    let { prefix } = $props()
</script>

<Page title="Faq" {prefix}>
    <Title text="Faq" />
    <Title type="h3" text="Why doesn’t Frizzante have middleware?" />
    <span>Frizzante intentionally uses guards instead of middleware because of the following reasons</span>
    <br />
    <ul>
        <li>All middleware handlers must be invoked for each request</li>
        <li>It's difficult to understand which middleware handler checks which route</li>
        <li>Managing middleware execution order across different routes is complex</li>
    </ul>
    <br />
    <span>Instead, it favours guards because</span>
    <br />
    <ul>
        <li>Guards are applied only to specific routes, they don't check every single incoming request</li>
        <li>
            They are more explicit, you can see which guards protect which route just by looking at the route definition
        </li>
        <li>It's easy to compose and ensure a specific order of guards execution for each individual route</li>
    </ul>
    <span>
        For more details see the
        <a href={base("/guards", { prefix })}>guards page</a>.
    </span>
    <br />
    <br />
    <Title type="h5" text="Middleware Implementation" />
    <span> If you really want middleware-like behavior, you can easily implement it in your own project. </span>
    <Code
        lang="go"
        source={`
            package middlewares

            import "main/lib/core/clients"

            type Hook func(client *clients.Client, next func()) // Defines a hook function type which will be used by the middleware.

            type Middleware struct {                            // Defines a structure holding multiple hooks.
                Hooks []Hook                                    // Defines the actual hooks slice.
            }
        `}
    />
    <Code
        lang="go"
        source={`
            package middlewares

            import (
                "main/lib/core/clients"
                "main/lib/core/routes"
            )

            func Apply(middleware *Middleware, routes []routes.Route) {
                for _, route := range routes {                               // For each route...
                    handler := r.Handler                                     // ...saves the route handler for later use.
                    route.Handler = func(client *clients.Client) {           // Assigns a new wrapper route handler.
                        var quit bool                                        // Creates flag used to interrupt the chain.
                        for _, hook := range middleware.Hooks {              // Iterate over hooks.
                            quit = true                                      // Prepares to quit.
                            if hook(client, func() { quit = false }); quit { // Invokes hook and checks if route should quit.
                                return                                       // Quits.
                            }
                        }
                        handler(client)                                      // Invokes the actual route handler.
                    }
                }
            }
        `}
    />
    <Note>
        <span>Your implementation may vary.</span>
        <br />
        <span>
            This implementation doesn’t directly invoke the next hook, instead it use a flag to check when to stop.
        </span>
        <br />
        <span>This should reduce nesting in your stack trace and keep it a little more readable.</span>
    </Note>
    <br />
    <br />
    <Title type="h5" text="Middleware Usage" />
    <Code
        lang="go"
        source={`
            package main

            import (
                "embed"
                "main/lib/core/clients"
                "main/lib/core/routes"
                "main/lib/core/servers"
                "main/lib/core/view/ssr"
                "main/lib/middlewares"
                "main/lib/routes/fallback"
                "main/lib/routes/todos"
                "main/lib/routes/welcome"
                "os"
            )

            //go:embed app/dist
            var efs embed.FS
            var server = servers.New()

            var middleware = &middlewares.Middleware{
                Hooks: []middleware.Hook{
                    func(client *clients.Client, next func()) {
                        // Hook logic goes here.
                    },
                },
            }

            func main() {
                defer servers.Start(server)
                defer middlewares.Apply(middleware, server.Routes) // Applies middleware to server routes.
                                                                   // Remember that deferred functions are executed in reverse,
                                                                   // so this line will execute before the server starts.
                server.Efs = efs                                   // Sets embedded file system.
                server.Routes = []routes.Route{
                    {Pattern: "GET /", Handler: fallback.View},
                    {Pattern: "GET /welcome", Handler: welcome.View},
                    {Pattern: "GET /todos", Handler: todos.View},
                    {Pattern: "GET /check", Handler: todos.Check},
                    {Pattern: "GET /uncheck", Handler: todos.Uncheck},
                    {Pattern: "GET /add", Handler: todos.Add},
                    {Pattern: "GET /remove", Handler: todos.Remove},
                }
            }
        `}
    />
    <br />
    <br />
    <Title type="h3" text="Can I use Frizzante with other frontend frameworks?" />
    <span>Yes you can, as long as Vite supports your framework.</span>
    <br />
    <span>
        All you need to do is configure your
        <InlineCode source="app/app.client.ts" /> and
        <InlineCode source="app/app.server.ts" /> to render your framework.
    </span>
    <br />
    <span>
        You can find an old Vue3 example
        <a target="_blank" href="https://github.com/razshare/frizzante-example-vue3">here</a>.
    </span>
    {#snippet rightSidebar({ body })}
        <RightSidebar
            {body}
            items={[
                { shift: 0, text: "Faq" },
                { shift: 0, text: "Why doesn’t Frizzante have middleware?" },
                { shift: 1, text: "Middleware Implementation" },
                { shift: 1, text: "Middleware Usage" },
                { shift: 0, text: "Can I use Frizzante with other frontend frameworks?" },
            ]}
        />
    {/snippet}
    {#snippet footer()}
        <Footer previous={{ label: "Contributing", href: base("/contributing", { prefix }) }} />
    {/snippet}
</Page>
