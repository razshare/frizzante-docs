<script lang="ts">
    import Code from "$lib/components/code.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import MenuItemHyperlink from "$lib/components/menu_item_hyperlink.svelte"
    import Note from "$lib/components/note.svelte"
    import Page from "$lib/components/page.svelte"
    import Title from "$lib/components/title.svelte"
</script>

<Page title="Faq">
    <Title text="Faq" />
    <Title type="h3" text="Why doesn’t Frizzante have middleware?" />
    <span>Frizzante intentionally uses guards instead of middleware.</span>
    <br />
    <span>Middleware have some limitations.</span>
    <br />
    <ul>
        <li>All middleware handles must be invoked for each request</li>
        <li>
            Some middleware may contain path-checking logic while others may not, which introduces ambiguity and more
            details to remember as a developer
        </li>
        <li>Managing middleware execution order across different routes is complex</li>
    </ul>
    <br />
    <span>While guards have some advantages.</span>
    <br />
    <ul>
        <li>
            <strong>Efficient</strong>
            <span>-</span>
            <span>
                each route has a defined slice of guards and only those guards will execute each time the route is
                matched
            </span>
        </li>
        <li>
            <strong>Explicit</strong>
            <span>-</span>
            <span>
                since each route explicitly defines its guards, you can see exactly which guards execute for any route
                just by looking at the slice
            </span>
        </li>
        <li>
            <strong>Composable</strong>
            <span>-</span>
            <span> in order to add a new guard you can just add a guard to the route’s guards slice </span>
        </li>
        <li>
            <strong>Easy to order</strong>
            <span>-</span>
            <span>
                it’s easy to define the order in which guards execute, you can simply move them around in the route’s
                guards slice
            </span>
        </li>
    </ul>
    <span>
        For more details see the
        <a href="/guards">guards page</a>.
    </span>
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
        <span>This implementation doesn’t directly invoke the next hook, instead it sets a flag.</span>
        <br />
        <span>This should keep your stack size smaller and thus more readable.</span>
    </Note>
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
        You can find a Vue3 example <a href="https://github.com/razshare/frizzante-example-vue3">here</a>.
    </span>
    {#snippet rightSidebar()}
        <MenuItemHyperlink href="#faq">Faq</MenuItemHyperlink>
        <MenuItemHyperlink href="#why-doesn’t-frizzante-have-middleware">
            <span>Why doesn't Frizzante have middleware?</span>
        </MenuItemHyperlink>
        <MenuItemHyperlink shift={1} href="#middleware-implementation">
            <span>Middleware Implementation</span>
        </MenuItemHyperlink>
        <MenuItemHyperlink shift={1} href="#middleware-usage">
            <span>Middleware Usage</span>
        </MenuItemHyperlink>
        <MenuItemHyperlink href="#can-i-use-frizzante-with-other-frontend-frameworks">
            <span>Can I use Frizzante with other frontend frameworks?</span>
        </MenuItemHyperlink>
    {/snippet}
</Page>
