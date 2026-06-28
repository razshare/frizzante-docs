<script lang="ts">
    import Caution from "$lib/components/caution.svelte"
    import Code from "$lib/components/code.svelte"
    import Footer from "$lib/components/footer.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import Note from "$lib/components/note.svelte"
    import Page from "$lib/components/page.svelte"
    import RightSidebar from "$lib/components/right_sidebar.svelte"
    import Tip from "$lib/components/tip.svelte"
    import Title from "$lib/components/title.svelte"
    import { href } from "$lib/scripts/core/href"
    import { base } from "$lib/scripts/strings/base"
    let { prefix } = $props()
</script>

<Page title="Basics" {prefix}>
    <Title text="Basics" />
    <span> All internals of the framework are exposed. </span>
    <br />
    <span> You can modify these internals, in fact it is intended for you to do so. </span>
    <Note>
        <span>
            You are also welcome to <a {...href(base("/contributing", { prefix }))}>contribute</a> back if you can.
        </span>
    </Note>
    <br />
    <br />
    <Title text="Serve" />
    <span>
        You can serve an http application with <InlineCode source="servers.Start()" />.
    </span>
    <Code
        lang="go"
        source={`
            package main

            import (
                "main/lib/core/routes"
                "main/lib/core/servers"
            )

            var _ = servers.Start(servers.StartOptions{ // Starts server.
                Routes: []routes.Route{
                    {Pattern: "GET /", Handler: func(request *http.Request, writer http.ResponseWriter) {
                        // ---> Handle request here. <---
                    }}
                },
            })
        `}
    />
    <!-- <Note>
        <span>
            <InlineCode source="ssr.New()" /> creates a function that is capable executing JavaScript code on the server.
        </span>
        <span>This is what enables Server Side Rendering for your server, as the package name implies.</span>
    </Note>
    <Caution>
        <span>
            The first parameter of <InlineCode source="ssr.New()" /> indicates how many runtimes should be created and executed
            in parallel when rendering views.
        </span>
        <br />
        <span>
            Setting this value too high could lead to unnecessary large memory usage by your JavaScript runtimes.
        </span>
        <br />
        <span>For most use cases a limit of 1 runtime is more than enough. </span>
        <br />
        <br />
        <span>Modify based on actual performance benchmarks.</span>
    </Caution> -->
    <!-- <Tip>
        <span>
            If you don't plan to use SSR features then create your render function using
            <InlineCode source="csr.New()" /> instead.
        </span>
        <Code
            lang="go"
            source={`
            package main

            import (
                "main/lib/core/servers"
                "main/lib/core/csr"
            )
            
            func main() {
                server := servers.New()   // Creates server.
                server.Render = csr.New() // Creates and assigns render function to server.
                servers.Start(server)     // Starts server.
            }
        `}
        />
        <span>
            This will disable the server side JavaScript runtime, and because of that the minimum size of the final
            binary will be reduced from 25MB to 10MB.
        </span>
    </Tip> -->
    <br />
    <br />
    <Title text="Path Fields" />
    <span>Route patterns can define dynamic path fields using <InlineCode source={"{}"} /> syntax.</span>
    <br />
    <span>Path fields can then be retrieved with <InlineCode source="receive.Path()" />.</span>
    <Code
        lang="go"
        source={`
            package main

            import (
                "main/lib/core/routes"
                "net/http"
            )

            var _ = routes.Route{
                Pattern: "GET /{name}",
                Handler: func(request *http.Request, _ http.ResponseWriter) {
                    _ = request.PathValue("name") // Receives path field "name".
                },
            }
        `}
    />
    <br />
    <br />
    <Title text="Messages" />
    <span>Use <InlineCode source="io.ReadAll()" /> to retrieve messages sent by the client.</span>
    <Code
        lang="go"
        source={`
            package main

            import (
                "io"
                "main/lib/core/routes"
                "net/http"
            )

            var _ = routes.Route{
                Pattern: "GET /",
                Handler: func(request *http.Request, _ http.ResponseWriter) {
                    _, _ = io.ReadAll(request.Body) // Receives message.
                },
            }
        `}
    />
    <span>Use <InlineCode source="writer.Write()" /> to send a message to the client.</span>
    <Code
        lang="go"
        source={`
            package main

            import (
                "main/lib/core/routes"
                "net/http"
            )

            var _ = routes.Route{
                Pattern: "GET /",
                Handler: func(_ *http.Request, writer http.ResponseWriter) {
                    _, _ = writer.Write([]byte("hello")) // Sends message "hello".
                },
            }
        `}
    />
    <br />
    <br />
    <Title text="Headers Fields & Status" />
    <span>Use <InlineCode source="request.Header.Get()" /> to retrieve header fields sent by the client.</span>
    <Code
        lang="go"
        source={`
            package main

            import (
                "main/lib/core/routes"
                "net/http"
            )

            var _ = routes.Route{
                Pattern: "GET /",
                Handler: func(request *http.Request, _ http.ResponseWriter) {
                    _ = request.Header.Get("Accept") // Retrieves header field "Accept".
                },
            }
        `}
    />
    <span>
        Use <InlineCode source="writer.Header().Set()" /> and
        <InlineCode source="writer.WriteHeader()" /> to send header fields to the client.
    </span>
    <Code
        lang="go"
        source={`
            package main

            import (
                "main/lib/core/routes"
                "net/http"
            )

            var _ = routes.Route{
                Pattern: "GET /",
                Handler: func(_ *http.Request, writer http.ResponseWriter) {
                    writer.Header().Set("Content-Type", "text/html") // Sets header field "Content-Type" 
                                                                    // with value "text/html".
                    writer.WriteHeader(200)                          // Sends status 200 and 
                                                                    // header fields to the client.
                },
            }
        `}
    />
    <br />
    <br />
    <Title text="Queries" />
    <span>Use <InlineCode source="request.URL.Query().Get()" /> to retrieve query fields.</span>
    <Code
        lang="go"
        source={`
            package main

            import (
                "main/lib/core/routes"
                "net/http"
            )

            var _ = routes.Route{
                Pattern: "GET /",
                Handler: func(request *http.Request, _ http.ResponseWriter) {
                    _ = request.URL.Query().Get("name") // Retrieves query field "name".
                },
            }
        `}
    />
    <br />
    <br />
    <Title text="Forms" />
    <span>
        Use <InlineCode source="receive.Form()" /> to parse incoming content as multipart form or url encoded form when using
        <InlineCode source="POST" /> and <InlineCode source="GET" /> http verbs.
    </span>
    <Code
        lang="go"
        source={`
            package main

            import (
                "main/lib/core/receive"
                "main/lib/core/routes"
                "net/http"
            )

            // Defines a struct in which to store the form content.
            type Form struct {
                Name string \`form:"name"\`
            }

            var _ = routes.Route{
                Pattern: "GET /",
                Handler: func(request *http.Request, _ http.ResponseWriter) {
                    var form Form                    // Zero initialize the form content.
                    _ = receive.Form(request, &form) // Retrieves form by reference.
                },
            }

        `}
    />
    <Tip>
        <span>
            You can also use a <InlineCode source="json" /> tag, it will match the field correctly as if it were a
            <InlineCode source="form" /> tag.
        </span>
        <br />
        <span>
            This is so that you can integrate your structs more easily with other libraries that only take into account
            <InlineCode source="json" /> formats.
        </span>
    </Tip>
    <Tip>
        <span>Form structs can define slices and files.</span>
        <Code
            lang="go"
            source={`
                package main

                import (
                    "main/lib/core/receive"
                    "main/lib/core/routes"
                    "mime/multipart"
                    "net/http"
                )

                type Form struct {
                    Name     string               \`form:"name"\`
                    Comments []string             \`form:"comments"\` // Slice of strings.
                    File     multipart.FileHeader \`form:"file"\`     // File handler.
                }

                var _ = routes.Route{
                    Pattern: "GET /",
                    Handler: func(request *http.Request, _ http.ResponseWriter) {
                        var form Form                    // Zero initialize the form content.
                        _ = receive.Form(request, &form) // Retrieves form by reference.
                    },
                }
            `}
        />
        <span>You can open and read the file.</span>
        <Code
            lang="go"
            source={`
                src, _ := form.File.Open()
                dst, _ := os.Create("my-file.txt")
                io.Copy(src, dst)
            `}
        />
        <span>Remember to close your files.</span>
        <Code
            lang="go"
            source={`
                defer src.Close()
                defer dst.Close()
            `}
        />
    </Tip>
    <br />
    <br />
    <Title text="Json" />
    <span>
        Use <InlineCode source="receive.Json()" />
        to parse incoming content as json when using <InlineCode source="POST" />
        and <InlineCode source="PUT" /> http verbs and
        <InlineCode source="send.Json()" /> to send json content.
    </span>
    <Code
        lang="go"
        source={`
            package main

            import (
                "main/lib/core/receive"
                "main/lib/core/routes"
                "main/lib/core/send"
                "net/http"
            )

            type GreetingDetails struct { // Defines a struct in which to
                Name string \`json:"name"\` // store the json content.
            }

            var _ = routes.Route{
                Pattern: "GET /",
                Handler: func(request *http.Request, writer http.ResponseWriter) {
                    var details GreetingDetails         // Creates a zero value.
                    _ = receive.Json(request, &details) // Unmarshals the content into details.
                    _ = send.Json(writer, details)      // Sends content back as json.
                },
            }

        `}
    />
    <br />
    <br />
    <Title text="Cookies" />
    <span>
        Use <InlineCode source="receive.Cookie()" /> to retrieve cookies and <InlineCode source="send.Cookie()" /> to send
        them.
    </span>
    <Code
        lang="go"
        source={`
            package main

            import (
                "main/lib/core/receive"
                "main/lib/core/routes"
                "main/lib/core/send"
                "net/http"
            )

            type GreetingDetails struct { // Defines a struct in which to
                Name string \`json:"name"\` // store the json content.
            }

            var _ = routes.Route{
                Pattern: "GET /",
                Handler: func(request *http.Request, writer http.ResponseWriter) {
                    nickname, _ := receive.Cookie(request, "nickname") // Retrieves cookie "nickname".
                    send.Cookie(writer, "nickname", nickname)          // Sends it back.
                },
            }

        `}
    />
    <br />
    <br />
    <Title text="Session Id" />
    <span>
        Use <InlineCode source="negotiate.SessionId()" /> to negotiate a session session id with the client.
    </span>
    <Code
        lang="go"
        source={`
            package main

            import (
                "main/lib/core/negotiate"
                "main/lib/core/routes"
                "net/http"
            )

            type GreetingDetails struct { // Defines a struct in which to
                Name string \`json:"name"\` // store the json content.
            }

            var _ = routes.Route{
                Pattern: "GET /",
                Handler: func(request *http.Request, writer http.ResponseWriter) {
                    _, _ = negotiate.SessionId(writer, request) // Negotiates session id and returns it.
                },
            }
        `}
    />
    <Note>
        <span>The session id is retrieved from the client’s <InlineCode source="session-id" /> cookie.</span>
        <br />
        <span>
            If the client doesn’t provide such cookie, <InlineCode source="negotiate.SessionId()" />
            creates a new session id and sends the cookie to the client.
        </span>
        <Caution>
            <span>
                Session id must always be negotiated before invoking
                <InlineCode source="writer.WriteHeader()" />.
            </span>
        </Caution>
    </Note>
    {#snippet rightSidebar({ body })}
        <RightSidebar
            {body}
            items={[
                { shift: 0, text: "Basics" },
                { shift: 0, text: "Serve" },
                { shift: 0, text: "Path Fields" },
                { shift: 0, text: "Messages" },
                { shift: 0, text: "Headers Fields & Status" },
                { shift: 0, text: "Queries" },
                { shift: 0, text: "Forms" },
                { shift: 0, text: "Json" },
                { shift: 0, text: "Cookies" },
                { shift: 0, text: "Session Id" },
            ]}
        />
    {/snippet}
    {#snippet footer()}
        <Footer
            previous={{ label: "Get Started", href: base("/get_started", { prefix }) }}
            next={{ label: "Web Sockets", href: base("/web_sockets", { prefix }) }}
        />
    {/snippet}
</Page>
