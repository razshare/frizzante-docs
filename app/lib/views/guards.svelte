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
    <span>You can add guards to your routes in order to protect them or modify their scope.</span>
    <Code
        lang="go"
        source={`
            package main

            import (
                "main/lib/core/guards"
                "main/lib/core/routes"
                "main/lib/routes/data"
                "net/http"
            )

            var _ = []routes.Route{
                {
                    Pattern: "GET /api/xml/data",
                    Handler: data.Get,
                    Guards: []guards.Guard{
                        {
                            Name: "jsonless",
                            Handler: func(_ routes.Scope, request *http.Request, writer http.ResponseWriter, allow func()) {
                                if request.Header.Get("Content-Type") == "application/json" {
                                    writer.WriteHeader(http.StatusBadRequest)
                                    return
                                }
                                allow()
                            },
                        },
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
            package main

            import (
                "main/lib/core/databases"
                "main/lib/core/databases/schema"
                "main/lib/core/guards"
                "main/lib/core/negotiate"
                "main/lib/core/routes"
                "main/lib/routes/dashboard"
                "main/lib/routes/public"
                "main/lib/routes/settings"
                "main/lib/routes/users"
                "net/http"
            )

            var _, queries, _ = databases.Connect()

            var authenticate = guards.Guard{
                Name: "authenticate",
                Handler: func(scope routes.Scope, request *http.Request, writer http.ResponseWriter, allow func()) {
                    sessionId, _ := negotiate.SessionId(writer, request)
                    session, _ := queries.FindSessionById(request.Context(), sessionId)
                    if session.ID == "" {
                        writer.WriteHeader(401)
                        writer.Write([]byte("not authenticated"))
                        return
                    }
                    scope["session"] = session
                    allow()
                },
            }

            var authorize = guards.Guard{
                Name: "authorize",
                Handler: func(scope routes.Scope, request *http.Request, writer http.ResponseWriter, allow func()) {
                    session, _ := scope["session"].(schema.Session)
                    if request.PathValue("user_id") != session.UserID {
                        writer.WriteHeader(403)
                        writer.Write([]byte("missing permissions"))
                        return
                    }
                    allow()
                },
            }

            var server_routes = []routes.Route{
                {Pattern: "GET /public", Handler: public.Get},
                {Pattern: "GET /dashboard", Handler: dashboard.Get, Guards: []guards.Guard{authenticate}},
                {Pattern: "GET /users/{user_id}/settings", Handler: settings.Get, Guards: []guards.Guard{authenticate, authorize}},
                {Pattern: "DELETE /users/{user_id}", Handler: users.Delete, Guards: []guards.Guard{authenticate, authorize}},
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
