<script lang="ts">
    import diagram1 from "$lib/assets/guards_diagram_1.svg"
    import diagram2 from "$lib/assets/guards_diagram_2.svg"
    import Code from "$lib/components/code.svelte"
    import Footer from "$lib/components/footer.svelte"
    import Image from "$lib/components/image.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import Page from "$lib/components/page.svelte"
    import RightSidebar from "$lib/components/right_sidebar.svelte"
    import Title from "$lib/components/title.svelte"
    import { base } from "$lib/scripts/strings/base"
    let { prefix } = $props()
</script>

<Page title="Guards" {prefix}>
    <Title text="Guards" />
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
        In this example, the route <InlineCode source="GET /api/xml/data" /> will decline requests with content type <InlineCode
            source="application/json"
        />
    </span>
    <br />
    <Image src={diagram1} width="auto" />
    <br />
    <br />
    <Title text="Composition" />
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
    <br />
    <Image src={diagram2} width="auto" />
    <br />
    {#snippet rightSidebar({ body })}
        <RightSidebar
            {body}
            items={[
                { shift: 0, text: "Guards" },
                { shift: 0, text: "Composition" },
            ]}
        />
    {/snippet}
    {#snippet footer()}
        <Footer
            previous={{ label: "Server Sent Events", href: base("/server_sent_events", { prefix }) }}
            next={{ label: "Views", href: base("/views", { prefix }) }}
        />
    {/snippet}
</Page>
