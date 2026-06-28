import type { Suggestion } from "$lib/scripts/searchbar/suggestion"
import { base } from "$lib/scripts/strings/base"
import { textToAnchor } from "$lib/scripts/text_to_anchor"
import Fuse from "fuse.js"
const suggestions: Suggestion[] = [
    // Get Started.
    {
        page: "Get Started",
        section: "Install frizzante",
        description: "Install frizzante and get started",
        href(prefix: string): string {
            return base(`/get_started#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Get Started",
        section: "Create project",
        description: "Create a new frizzante project using the cli",
        href(prefix: string): string {
            return base(`/get_started#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Get Started",
        section: "Configure project",
        description: "Configure the project after creating it",
        href(prefix: string): string {
            return base(`/get_started#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Get Started",
        section: "Start development",
        description: "Start development watcher",
        href(prefix: string): string {
            return base(`/get_started#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Get Started",
        section: "Build",
        description: "Build the project to a standalone binary",
        href(prefix: string): string {
            return base(`/get_started#${textToAnchor(this.section)}`, { prefix })
        },
    },
    // Basics.
    {
        page: "Basics",
        section: "Basics",
        description: "Basic concepts of frizzante",
        href(prefix: string): string {
            return base(`/basics#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Basics",
        section: "Server",
        description: "Create a new server",
        href(prefix: string): string {
            return base(`/basics#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Basics",
        section: "Routes",
        description: "Manage server routes",
        href(prefix: string): string {
            return base(`/basics#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Basics",
        section: "Path Fields",
        description: "Define variable path fields and retrieve them in your route handler",
        href(prefix: string): string {
            return base(`/basics#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Basics",
        section: "Messages",
        description: "Send and receives messages",
        href(prefix: string): string {
            return base(`/basics#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Basics",
        section: "Headers",
        description: "Send and receive header fields",
        href(prefix: string): string {
            return base(`/basics#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Basics",
        section: "Status",
        description: "Send status code to the client",
        href(prefix: string): string {
            return base(`/basics#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Basics",
        section: "Order of Operations",
        description: "The order in which data is sent to the client is important",
        href(prefix: string): string {
            return base(`/basics#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Basics",
        section: "Queries",
        description: "Receive query strings from the client",
        href(prefix: string): string {
            return base(`/basics#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Basics",
        section: "Forms",
        description: "Receive and unmarshal form payloads from the client",
        href(prefix: string): string {
            return base(`/basics#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Basics",
        section: "Json",
        description: "Receive and unmarshal json payloads from the client",
        href(prefix: string): string {
            return base(`/basics#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Basics",
        section: "Cookies",
        description: "Send and receive cookies",
        href(prefix: string): string {
            return base(`/basics#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Basics",
        section: "Session Id",
        description: "Receive (and initialize) a client's session id",
        href(prefix: string): string {
            return base(`/basics#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Basics",
        section: "Session",
        description: "Receive (and initialize) a client's session",
        href(prefix: string): string {
            return base(`/basics#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Basics",
        section: "Redirect",
        description: "Redirect the client to a different page",
        href(prefix: string): string {
            return base(`/basics#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Basics",
        section: "Navigate",
        description: "Redirect the client to a different page using status code 302",
        href(prefix: string): string {
            return base(`/basics#${textToAnchor(this.section)}`, { prefix })
        },
    },
    // Build Checkpoints.
    {
        page: "Build Checkpoints",
        section: "Build Checkpoints",
        description: "Execute code before and after building",
        href(prefix: string): string {
            return base(`/build_checkpoints#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Build Checkpoints",
        section: "Pre Build Checkpoint",
        description: "Execute code before building",
        href(prefix: string): string {
            return base(`/build_checkpoints#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Build Checkpoints",
        section: "Post Build Checkpoint",
        description: "Execute code after building",
        href(prefix: string): string {
            return base(`/build_checkpoints#${textToAnchor(this.section)}`, { prefix })
        },
    },
    // Web Sockets.
    {
        page: "Web Sockets",
        section: "Web Sockets",
        description: "Upgrade the connection to web sockets",
        href(prefix: string): string {
            return base(`/web_sockets#${textToAnchor(this.section)}`, { prefix })
        },
    },
    // Serve Sent Events.
    {
        page: "Server Sent Events",
        section: "Server Sent Events",
        description: "Upgrade the connection to server sent events",
        href(prefix: string): string {
            return base(`/server_sent_events#${textToAnchor(this.section)}`, { prefix })
        },
    },
    // Guards.
    {
        page: "Guards",
        section: "Guards",
        description: "Protect your routes using custom rules",
        href(prefix: string): string {
            return base(`/guards#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Guards",
        section: "Composition",
        description: "Compose guards to create advances rules",
        href(prefix: string): string {
            return base(`/guards#${textToAnchor(this.section)}`, { prefix })
        },
    },
    // Views
    {
        page: "Views",
        section: "Views",
        description: "Manage views",
        href(prefix: string): string {
            return base(`/views#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Views",
        section: "Server Exports",
        description: "Views that are meant to be rendered on the server",
        href(prefix: string): string {
            return base(`/views#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Views",
        section: "Client Exports",
        description: "Views that are meant to be rendered on the client",
        href(prefix: string): string {
            return base(`/views#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Views",
        section: "Send Views",
        description: "Send views from a route handler",
        href(prefix: string): string {
            return base(`/views#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Views",
        section: "Default View",
        description: 'How to setup a "default" view',
        href(prefix: string): string {
            return base(`/views#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Views",
        section: "View Properties",
        description: "Pass properties to views",
        href(prefix: string): string {
            return base(`/views#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Views",
        section: "Render Modes",
        description: "Switch between render modes at runtime",
        href(prefix: string): string {
            return base(`/views#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Views",
        section: "RenderModeFull",
        description: "The view is rendered on both the server and the client",
        href(prefix: string): string {
            // debugger
            return base(`/views#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Views",
        section: "RenderModeServer",
        description: "The view is rendered only on the server",
        href(prefix: string): string {
            // debugger
            return base(`/views#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Views",
        section: "RenderModeClient",
        description: "The view is rendered only on the client",
        href(prefix: string): string {
            return base(`/views#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Views",
        section: "Disabling server-side JavaScript runtime",
        description: "Disable the server-side JavaScript runtime in order to reduce memory footprint and binary size",
        href(prefix: string): string {
            return base(`/views#${textToAnchor(this.section)}`, { prefix })
        },
    },
    // Web Standards.
    {
        page: "Web Standards",
        section: "Web Standards",
        description: "",
        href(prefix: string): string {
            return base(`/web_standards#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Web Standards",
        section: "Adaptive Hyperlinks",
        description: "",
        href(prefix: string): string {
            return base(`/web_standards#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Web Standards",
        section: "Adaptive Forms",
        description: "",
        href(prefix: string): string {
            return base(`/web_standards#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Web Standards",
        section: "Link Component",
        description: "",
        href(prefix: string): string {
            return base(`/web_standards#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Web Standards",
        section: "Form Component",
        description: "",
        href(prefix: string): string {
            return base(`/web_standards#${textToAnchor(this.section)}`, { prefix })
        },
    },
    // Type Definitions.
    {
        page: "Type Definitions",
        section: "Type Definitions",
        description: "",
        href(prefix: string): string {
            return base(`/type_definitions#${textToAnchor(this.section)}`, { prefix })
        },
    },
    // Cli.
    {
        page: "Cli",
        section: "Cli",
        description: "",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Create Project",
        description: "",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Generate",
        description: "",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Configure",
        description: "",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Configure",
        description: "",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Plugins",
        description: "",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Update",
        description: "",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Package",
        description: "",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Package Watch",
        description: "",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Build",
        description: "",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Check",
        description: "",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Touch",
        description: "",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Clean Project",
        description: "",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Reset",
        description: "",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Strict",
        description: "",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Version",
        description: "",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Help",
        description: "",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Interactive Mode",
        description: "",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    // Snapshots.
    {
        page: "Snapshots",
        section: "Snapshots",
        description: "",
        href(prefix: string): string {
            return base(`/snapshots#${textToAnchor(this.section)}`, { prefix })
        },
    },
    // Docker.
    {
        page: "Docker",
        section: "Docker",
        description: "",
        href(prefix: string): string {
            return base(`/docker#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Docker",
        section: "Build your program statically",
        description: "",
        href(prefix: string): string {
            return base(`/docker#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Docker",
        section: "Make a Dockerfile",
        description: "",
        href(prefix: string): string {
            return base(`/docker#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Docker",
        section: "Build the immage",
        description: "",
        href(prefix: string): string {
            return base(`/docker#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Docker",
        section: "Run",
        description: "",
        href(prefix: string): string {
            return base(`/docker#${textToAnchor(this.section)}`, { prefix })
        },
    },
    // Issues.
    {
        page: "Issues",
        section: "Reporting a Bug",
        description: "",
        href(prefix: string): string {
            return base(`/issues#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Issues",
        section: "Requesting a Feature",
        description: "",
        href(prefix: string): string {
            return base(`/issues#${textToAnchor(this.section)}`, { prefix })
        },
    },
    // Contributing.
    {
        page: "Contributing",
        section: "Contributing",
        description: "",
        href(prefix: string): string {
            return base(`/contributing#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Contributing",
        section: "Clone Repository",
        description: "",
        href(prefix: string): string {
            return base(`/contributing#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Contributing",
        section: "Create Branch",
        description: "",
        href(prefix: string): string {
            return base(`/contributing#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Contributing",
        section: "Coding Standards",
        description: "",
        href(prefix: string): string {
            return base(`/contributing#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Contributing",
        section: "Export Everything",
        description: "",
        href(prefix: string): string {
            return base(`/contributing#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Contributing",
        section: "Data & Logic",
        description: "",
        href(prefix: string): string {
            return base(`/contributing#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Contributing",
        section: "Pull Requests",
        description: "",
        href(prefix: string): string {
            return base(`/contributing#${textToAnchor(this.section)}`, { prefix })
        },
    },
    // Faq.
    {
        page: "Faq",
        section: "Why doesn't frizzante have middleware?",
        description: "",
        href(prefix: string): string {
            return base(`/faq#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Faq",
        section: "Middleware Implementation",
        description: "",
        href(prefix: string): string {
            return base(`/faq#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Faq",
        section: "Middleware Usage",
        description: "",
        href(prefix: string): string {
            return base(`/faq#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Faq",
        section: "Can I use Frizzante with other frontend frameworks?",
        description: "",
        href(prefix: string): string {
            return base(`/faq#${textToAnchor(this.section)}`, { prefix })
        },
    },
]
const fuse = new Fuse(suggestions, {
    keys: ["page", "section", "description"],
})
export function find(query: string): Suggestion[] {
    const results = fuse.search(query)
    const suggestions: Suggestion[] = []
    for (const result of results) {
        const suggestion = result.item
        suggestions.push(suggestion)
    }
    return suggestions
}
