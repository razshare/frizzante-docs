<script lang="ts">
    import Caution from "$lib/components/caution.svelte"
    import Code from "$lib/components/code.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import MenuItem from "$lib/components/menu_item.svelte"
    import Note from "$lib/components/note.svelte"
    import Page from "$lib/components/page.svelte"
    import Tip from "$lib/components/tip.svelte"
</script>

<Page title="Overview">
    <h1 id="basics">Basics</h1>
    <span>
        Create a new server with <InlineCode source="servers.New()" />, then followup with servers.Start() in order to
        start a server.
    </span>
    <Code
        lang="go"
        source={`
            package main

            import "main/lib/core/servers"

            var server = servers.New()      // Creates server.

            func main() {
                defer servers.Start(server) // Starts server.
            }
        `}
    />
    <h1 id="routes">Routes</h1>
    <span>Each server exposes a slice of Routes which you can freely modify.</span>
    <br />
    <span>You can add a new route by appending to or overwriting <InlineCode source="server.Routes" />.</span>
    <Code
        lang="go"
        source={`
            package main

            import (
                "main/lib/core/servers"
                "main/lib/routes/welcome"
            )

            var server = servers.New()                        // Creates server.

            func main() {
                defer servers.Start(server)                   // Starts server.
                server.Routes = []routes.Route{               // Overwrites routes.
                {Pattern: "GET /", Handler: welcome.View}, // Adds route.
                }
            }
        `}
    />
    <span>Where <InlineCode source="welcome.View" /> is a function pointer.</span>
    <Code
        lang="go"
        source={`
            package welcome

            import "main/lib/core/clients"

            func View(client *clients.Client) {}
        `}
    />
    <h1 id="path-fields">Path Fields</h1>
    <span>Route patterns can define dynamic path fields using <InlineCode source={"{}"} /> syntax.</span>
    <Code lang="go" source={`routes.Route{Pattern: "GET /{name}", Handler: welcome.View}`} />
    <span>Path fields can then be retrieved with <InlineCode source="receive.Path()" />.</span>
    <Code
        lang="go"
        source={`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
            )

            func View(client *clients.Client) {
                _ = receive.Path(client, "name") // Retrieves field "name".
            }
        `}
    />
    <h1 id="messages">Messages</h1>
    <span>Use <InlineCode source="receive.Message()" /> to retrieve messages sent by the client.</span>
    <Code
        lang="go"
        source={`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
            )

            func View(client *clients.Client) {
                _ = receive.Message(client) // Retrieves message.
            }
        `}
    />
    <span>Use <InlineCode source="send.Message()" /> to send a message to the client.</span>
    <Code
        lang="go"
        source={`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/send"
            )

            func View(client *clients.Client) {
                send.Message(client, "Hello.") // Sends message.
            }
        `}
    />
    <h1 id="headers">Headers</h1>
    <span>Use <InlineCode source="receive.Header()" /> to retrieve header fields sent by the client.</span>
    <Code
        lang="go"
        source={`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
            )

            func View(client *clients.Client) {
                _ = receive.Header(client, "Accept") // Retrieves field "Accept".
            }
        `}
    />
    <span>Use <InlineCode source="send.Header()" /> to send header fields to the client.</span>
    <Code
        lang="go"
        source={`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
                "main/lib/core/send"
            )

            func View(client *clients.Client) {
                accept := receive.Header(client, "Accept")  // Retrieves field "Accept".
                send.Header(client, "Content-Type", accept) // Sends it back.
            }
        `}
    />
    <h1 id="status">Status</h1>
    <span>Use <InlineCode source="send.Status()" /> to send the status of the response to the client.</span>
    <Code
        lang="go"
        source={`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/send"
            )

            func View(client *clients.Client) {
                send.Status(client, 404)           // Sends status 404.
                send.Message(client, "Not found.") // Sends message.
            }
        `}
    />
    <Caution>
        <span>Sending header fields or status after sending out content is not allowed.</span>
        <span>Read <a href="#order-of-oprations">below</a>.</span>
    </Caution>
    <h1 id="order-of-oprations">Order of Operations</h1>
    <span>Order of operations matters when sending data to the client.</span>
    <br />
    <span>
        For example, sending the status code with <InlineCode source="send.Status()" />
        after you’ve already sent content with <InlineCode source="send.Message()" />
        is not allowed.
    </span>
    <Code
        lang="go"
        source={`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/send"
            )

            func View(client *clients.Client) {
                send.Message(client, "Hello.") // Sends message (Succeeds).
                send.Status(client, 404)       // Sends status (Fails).
            }
        `}
    />
    <span>
        <InlineCode source="send.Status(client, 404)" /> will fail and the client will receive status 200 instead of 404.
    </span>
    <Code
        lang="http"
        source={`
            HTTP/1.1 200 OK
            Date: Sun, 25 May 2025 02:00:37 GMT
            Content-Length: 6
            Content-Type: text/plain; charset=utf-8

            Hello.
        `}
    />
    <span>The failure is logged to the server’s error logger.</span>
    <br />
    <span>
        Assuming you’re using the default error logger, you’ll see an error of sorts in your <strong>console</strong>
    </span>
    <Code
        lang="log"
        source={`
            listening for requests at http://127.0.0.1:8080
            status is locked
        `}
    />
    <span>
        <InlineCode source="status is locked" />, meaning the status code has already been sent to the client and
        there’s nothing you can do about it.
    </span>
    <h1 id="queries">Queries</h1>
    <span>Use <InlineCode source="receive.Query()" /> to retrieve query fields.</span>
    <Code
        lang="go"
        source={`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
                "main/lib/core/send"
            )

            func View(client *clients.Client) {
                name := receive.Query(client, "name") // Retrieves field "name".
                send.Message(client, "Hello " + name) // Sends message.
            }
        `}
    />
    <h1 id="forms">Forms</h1>
    <span>
        Use <InlineCode source="receive.Form()" /> to parse incoming content as multipart form or url encoded form when using
        <strong>POST</strong> and <strong>GET</strong> http verbs.
    </span>
    <Code
        lang="go"
        source={`
            routes.Route{Pattern: "POST /", Handler: welcome.View}
            // or
            routes.Route{Pattern: "GET /", Handler: welcome.View}
        `}
    />
    <Code
        lang="go"
        source={`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
                "main/lib/core/send"
            )

            type Form struct {                             // Defines a struct in which to
                Name string \`form:"name"\`                  // store the form content.
            }

            func View(client *clients.Client) {
                var form Form
                receive.Form(client, &form)                // Retrieves form.
                send.Message(client, "Hello " + form.Name) // Sends message.
            }
        `}
    />
    <Tip>
        <span>
            You can also use a <strong>json</strong> tag, it will match the field correctly as if it were a
            <strong>form</strong> tag.
        </span>
        <br />
        <span>
            This is so that you can integrate your structs more easily with other libraries that only take into account
            <strong>json</strong> formats.
        </span>
    </Tip>
    <Tip>
        <span>Form structs can define slices and files.</span>
        <Code
            lang="go"
            source={`
                type Form struct {
                    Name     string               \`form:"name"\`
                    Comments []string             \`form:"comments"\` // slice of strings
                    File     multipart.FileHeader \`form:"file"\`     // file handler
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
    <h1 id="json">Json</h1>
    <span>
        Use <InlineCode source="receive.Json()" /> to parse incoming content as json when using POST and PUT http verbs and
        <InlineCode source="send.Json()" /> to send json content.
    </span>
    <Code
        lang="go"
        source={`
            routes.Route{Pattern: "POST /", Handler: welcome.View}
            // or
            routes.Route{Pattern: "PUT /", Handler: welcome.View}
        `}
    />
    <Code
        lang="go"
        source={`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
                "main/lib/core/send"
            )

            type GreetingDetails struct {      // Defines a struct in which to
                Name string \`json:"name"\`      // store the json content.
            }

            func View(client *clients.Client) {
                var details GreetingDetails    // Creates a zero value.
                receive.Json(client, &details) // Unmarshals the content into details.
                send.Json(client, details)     // Sends content back as json.
            }
        `}
    />
    <h1 id="cookies">Cookies</h1>
    <span>
        Use <InlineCode source="receive.Cookie()" /> to retrieve cookies and <InlineCode source="send.Cookie()" /> to send
        them.
    </span>
    <Code
        lang="go"
        source={`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
                "main/lib/core/send"
            )

            func View(client *clients.Client) {
                nickname := receive.Cookie(client, "nickname") // Retrieves cookie.
                send.Cookie(client, "nickname", nickname)      // Sends it back.
            }
        `}
    />
    <h1 id="session-id">Session Id</h1>
    <span>Use <InlineCode source="receive.SessionId()" /> to retrieve the client’s session id.</span>
    <Code
        lang="go"
        source={`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
            )

            func View(client *clients.Client) {
                _ = receive.SessionId(client) // Retrieves session id.
            }
        `}
    />
    <Note>
        <span>The session id is retrieved from the client’s session-id cookie.</span>
        <span>
            If the client doesn’t provide such cookie, <InlineCode source="receive.SessionId()" />
            creates a new session id and sends the cookie to the client.
        </span>
    </Note>
    <Caution>
        <span>
            Since <InlineCode source="receive.SessionId()" /> might send a cookie to the client, it is important to remember
            that order of operations matters.
        </span>
    </Caution>
    <h1 id="session">Session</h1>
    <span>Use <InlineCode source="receive.Session()" /> to retrieve the client’s session.</span>
    <Note>The session is retrieved using <InlineCode source="receive.SessionId()" />.</Note>
    <Code
        lang="go"
        source={`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
            )

            func View(client *clients.Client) {
                var session *sessions.Session         // Creates a zero value.
                _ = receive.Session(client, &session) // Unmarshals the content into session.
            }
        `}
    />
    <h1 id="redirect">Redirect</h1>
    <span>Use <InlineCode source="send.Redirect()" /> to redirect to a different location.</span>
    <Code
        lang="go"
        source={`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/send"
            )

            func View(client *clients.Client) {
                send.Redirect(client, "/login", 307) // Redirects to /login.
            }
        `}
    />
    <h1 id="navigate">Navigate</h1>
    <span>Use <InlineCode source="send.Navigate()" /> to redirect to a different location with status 302.</span>
    <Code
        lang="go"
        source={`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/send"
            )

            func View(client *clients.Client) {
                send.Navigate(client, "/login") // Redirects to /login with status 302.
            }
        `}
    />
    {#snippet rightSidebar()}
        <MenuItem>
            <a href="#basics">Basics</a>
            {#snippet menu()}
                <MenuItem><a href="#routes">Routes</a></MenuItem>
                <MenuItem><a href="#path-fields">Path Fields</a></MenuItem>
                <MenuItem><a href="#messages">Messages</a></MenuItem>
                <MenuItem><a href="#headers">Headers</a></MenuItem>
                <MenuItem><a href="#status">Status</a></MenuItem>
                <MenuItem><a href="#order-of-operation">Order of Operations</a></MenuItem>
                <MenuItem><a href="#queries">Queries</a></MenuItem>
                <MenuItem><a href="#forms">Forms</a></MenuItem>
                <MenuItem><a href="#json">Json</a></MenuItem>
                <MenuItem><a href="#cookies">Cookies</a></MenuItem>
                <MenuItem><a href="#session-id">Session Id</a></MenuItem>
                <MenuItem><a href="#session">Session</a></MenuItem>
                <MenuItem><a href="#navigate">Navigate</a></MenuItem>
            {/snippet}
        </MenuItem>
    {/snippet}
</Page>
