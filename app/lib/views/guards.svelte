<script lang="ts">
    import Code from "$lib/components/code.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import Page from "$lib/components/page.svelte"
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    import diagram1 from "$lib/assets/guards_diagram_1.svg"
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    import diagram2 from "$lib/assets/guards_diagram_2.svg"
    import MenuItem from "$lib/components/menu_item.svelte"
    import Image from "$lib/components/image.svelte"
</script>

<Page title="Guards">
    <h1 id="guards">Guards</h1>
    <span>A guard is an object that is composed of an optional name and a required handler.</span>
    <br />
    <span>You can add guards to your routes in order to protect them.</span>
    <Code
        lang="go"
        source={`
            server.Routes = []routes.Route{
                {
                    Pattern: "GET /api/xml/data",
                    Handler: data.Get,
                    Guards: []guards.Guards{
                        {Name: "jsonless", Handler: func(client *clients.Client, allow func()) {
                            if receive.ContentType(client) == "application/json" {
                                return
                            }
                            allow()
                        }},
                    },
                },
            }
        `}
    />
    <span>
        Guards will block all incoming requests by default, you must call <InlineCode source="allow()" />
        to explicitly allow the request through.
    </span>
    <br />
    <span>
        In this example, <InlineCode source="GET /api/xml/data" /> the route will decline requests with content type <InlineCode
            source="application/json"
        />
    </span>
    <Image src={diagram1} width="100%" />
    <h1 id="composition">Composition</h1>
    <span>You can compose multiple guards in order to create more advanced restrictions.</span>
    <Code
        lang="go"
        source={`
            var authenticate = guards.Guard{Name: "authenticate", Handler: func(client *clients.Client, allow func()) {
                session := sessions.Start(receive.SessionId(client))
                if session.Verified && time.Since(session.LastActivity) <= 30*time.Minute {
                    allow()
                    return
                }
                send.Status(client, 401)
                send.Message(client, "not authenticated")
            }}
        `}
    />
    <Code
        lang="go"
        source={`
            var authorize = guards.Guard{Name: "authorize", Handler: func(client *clients.Client, allow func()) {
                session := sessions.Start(receive.SessionId(client))
                if session.UserId == receive.path("user_id") {
                    allow()
                    return
                }
                send.Status(client, 403)
                send.Message(client, "missing permissions")
            }}
        `}
    />
    <Code
        lang="go"
        source={`
            server.Routes = []routes.Route{
                {Pattern: "GET /public", Handler: public.Get},
                {Pattern: "GET /dashboard", Handler: dashboard.Get, Guards: []guards.Guard{authenticate}},
                {Pattern: "GET /user/{user_id}/settings", Handler: settings.Get, Guards: []guards.Guard{authenticate, authorize}},
                {Pattern: "DELETE /user/{user_id}", Handler: user.Delete, Guards: []guards.Guard{authenticate, authorize}},
            }
        `}
    />
    <Image src={diagram2} width="100%" />
    {#snippet rightSidebar()}
        <MenuItem><a href="#guards">Guards</a></MenuItem>
        <MenuItem><a href="#composition">Composition</a></MenuItem>
    {/snippet}
</Page>
