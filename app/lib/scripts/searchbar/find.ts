import type { Suggestion } from "$lib/scripts/searchbar/suggestion"
import { textToAnchor } from "../text_to_anchor"
import Fuse from "fuse.js"
const suggestions: Suggestion[] = [
    // Get Started.
    {
        page: "Get Started",
        section: "Install frizzante",
        description: "Install frizzante and get started",
        href(): string {
            return `/get_started#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Get Started",
        section: "Create project",
        description: "Create a new frizzante project using the cli",
        href(): string {
            return `/get_started#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Get Started",
        section: "Configure project",
        description: "Configure the project after creating it",
        href(): string {
            return `/get_started#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Get Started",
        section: "Start development",
        description: "Start development watcher",
        href(): string {
            return `/get_started#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Get Started",
        section: "Build",
        description: "Build the project to a standalone binary",
        href(): string {
            return `/get_started#${textToAnchor(this.section)}`
        },
    },
    // Basics.
    {
        page: "Basics",
        section: "Basics",
        description: "Basic concepts of frizzante",
        href(): string {
            return `/basics#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Basics",
        section: "Server",
        description: "Create a new server",
        href(): string {
            return `/basics#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Basics",
        section: "Routes",
        description: "Manage server routes",
        href(): string {
            return `/basics#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Basics",
        section: "Path Fields",
        description: "Define variable path fields and retrieve them in your route handler",
        href(): string {
            return `/basics#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Basics",
        section: "Messages",
        description: "Send and receives messages",
        href(): string {
            return `/basics#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Basics",
        section: "Headers",
        description: "Send and receive header fields",
        href(): string {
            return `/basics#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Basics",
        section: "Status",
        description: "Send status code to the client",
        href(): string {
            return `/basics#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Basics",
        section: "Order of Operations",
        description: "The order in which data is sent to the client is important",
        href(): string {
            return `/basics#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Basics",
        section: "Queries",
        description: "Receive query strings from the client",
        href(): string {
            return `/basics#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Basics",
        section: "Forms",
        description: "Receive and unmarshal form payloads from the client",
        href(): string {
            return `/basics#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Basics",
        section: "Json",
        description: "Receive and unmarshal json payloads from the client",
        href(): string {
            return `/basics#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Basics",
        section: "Cookies",
        description: "Send and receive cookies",
        href(): string {
            return `/basics#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Basics",
        section: "Session Id",
        description: "Receive (and initialize) a client's session id",
        href(): string {
            return `/basics#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Basics",
        section: "Session",
        description: "Receive (and initialize) a client's session",
        href(): string {
            return `/basics#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Basics",
        section: "Redirect",
        description: "Redirect the client to a different page",
        href(): string {
            return `/basics#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Basics",
        section: "Navigate",
        description: "Redirect the client to a different page using status code 302",
        href(): string {
            return `/basics#${textToAnchor(this.section)}`
        },
    },
    // Web Sockets.
    {
        page: "Web Sockets",
        section: "Web Sockets",
        description: "Upgrade the connection to web sockets",
        href(): string {
            return `/web_sockets#${textToAnchor(this.section)}`
        },
    },
    // Serve Sent Events.
    {
        page: "Server Sent Events",
        section: "Server Sent Events",
        description: "Upgrade the connection to server sent events",
        href(): string {
            return `/server_sent_events#${textToAnchor(this.section)}`
        },
    },
    // Guards.
    {
        page: "Guards",
        section: "Guards",
        description: "Protect your routes using custom rules",
        href(): string {
            return `/guards#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Guards",
        section: "Composition",
        description: "Compose guards to create advances rules",
        href(): string {
            return `/guards#${textToAnchor(this.section)}`
        },
    },
    // Views
    {
        page: "Views",
        section: "Views",
        description: "Manage views",
        href(): string {
            return `/views#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Views",
        section: "Server Exports",
        description: "Views that are meant to be rendered on the server",
        href(): string {
            return `/views#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Views",
        section: "Client Exports",
        description: "Views that are meant to be rendered on the client",
        href(): string {
            return `/views#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Views",
        section: "Send Views",
        description: "Send views from a route handler",
        href(): string {
            return `/views#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Views",
        section: "Default View",
        description: 'How to setup a "default" view',
        href(): string {
            return `/views#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Views",
        section: "View Properties",
        description: "Pass properties to views",
        href(): string {
            return `/views#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Views",
        section: "Render Modes",
        description: "Switch between render modes at runtime",
        href(): string {
            return `/views#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Views",
        section: "RenderModeFull",
        description: "The view is rendered on both the server and the client",
        href(): string {
            return `/views#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Views",
        section: "RenderModeServer",
        description: "The view is rendered only on the server",
        href(): string {
            return `/views#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Views",
        section: "RenderModeClient",
        description: "The view is rendered only on the client",
        href(): string {
            return `/views#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Views",
        section: "Disabling server-side JavaScript runtime",
        description: "Disable the server-side JavaScript runtime in order to reduce memory footprint and binary size",
        href(): string {
            return `/views#${textToAnchor(this.section)}`
        },
    },
    // Web Standards.
    {
        page: "Web Standards",
        section: "Web Standards",
        description: "",
        href(): string {
            return `/web_standards#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Web Standards",
        section: "Adaptive Hyperlinks",
        description: "",
        href(): string {
            return `/web_standards#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Web Standards",
        section: "Adaptive Forms",
        description: "",
        href(): string {
            return `/web_standards#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Web Standards",
        section: "Link Component",
        description: "",
        href(): string {
            return `/web_standards#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Web Standards",
        section: "Form Component",
        description: "",
        href(): string {
            return `/web_standards#${textToAnchor(this.section)}`
        },
    },
    // Type Definitions.
    {
        page: "Type Definitions",
        section: "Type Definitions",
        description: "",
        href(): string {
            return `/type_definitions#${textToAnchor(this.section)}`
        },
    },
    // Todos Example.
    {
        page: "Todos Example",
        section: "Todos Example",
        description: "",
        href(): string {
            return `/todos_example#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Todos Example",
        section: "Main",
        description: "",
        href(): string {
            return `/todos_example#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Todos Example",
        section: "Fallback",
        description: "",
        href(): string {
            return `/todos_example#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Todos Example",
        section: "Welcome View",
        description: "",
        href(): string {
            return `/todos_example#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Todos Example",
        section: "Todos View",
        description: "",
        href(): string {
            return `/todos_example#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Todos Example",
        section: "List Todos",
        description: "",
        href(): string {
            return `/todos_example#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Todos Example",
        section: "Remove Todos",
        description: "",
        href(): string {
            return `/todos_example#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Todos Example",
        section: "Toggle Todos",
        description: "",
        href(): string {
            return `/todos_example#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Todos Example",
        section: "Add Todos",
        description: "",
        href(): string {
            return `/todos_example#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Todos Example",
        section: "More Examples",
        description: "",
        href(): string {
            return `/todos_example#${textToAnchor(this.section)}`
        },
    },
    // Cli.
    {
        page: "Cli",
        section: "Cli",
        description: "",
        href(): string {
            return `/cli#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Cli",
        section: "Create Project",
        description: "",
        href(): string {
            return `/cli#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Cli",
        section: "Generate",
        description: "",
        href(): string {
            return `/cli#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Cli",
        section: "Configure",
        description: "",
        href(): string {
            return `/cli#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Cli",
        section: "Configure",
        description: "",
        href(): string {
            return `/cli#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Cli",
        section: "Plugins",
        description: "",
        href(): string {
            return `/cli#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Cli",
        section: "Update",
        description: "",
        href(): string {
            return `/cli#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Cli",
        section: "Package",
        description: "",
        href(): string {
            return `/cli#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Cli",
        section: "Package Watch",
        description: "",
        href(): string {
            return `/cli#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Cli",
        section: "Build",
        description: "",
        href(): string {
            return `/cli#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Cli",
        section: "Check",
        description: "",
        href(): string {
            return `/cli#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Cli",
        section: "Touch",
        description: "",
        href(): string {
            return `/cli#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Cli",
        section: "Clean Project",
        description: "",
        href(): string {
            return `/cli#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Cli",
        section: "Reset",
        description: "",
        href(): string {
            return `/cli#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Cli",
        section: "Strict",
        description: "",
        href(): string {
            return `/cli#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Cli",
        section: "Version",
        description: "",
        href(): string {
            return `/cli#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Cli",
        section: "Help",
        description: "",
        href(): string {
            return `/cli#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Cli",
        section: "Interactive Mode",
        description: "",
        href(): string {
            return `/cli#${textToAnchor(this.section)}`
        },
    },
    // Snapshots.
    {
        page: "Snapshots",
        section: "Snapshots",
        description: "",
        href(): string {
            return `/snapshots#${textToAnchor(this.section)}`
        },
    },
    // Docker.
    {
        page: "Docker",
        section: "Docker",
        description: "",
        href(): string {
            return `/docker#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Docker",
        section: "Create a new container",
        description: "",
        href(): string {
            return `/docker#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Docker",
        section: "Start the container",
        description: "",
        href(): string {
            return `/docker#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Docker",
        section: "Attach to this container with your IDE or directly with a shell",
        description: "",
        href(): string {
            return `/docker#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Docker",
        section: "Configure project",
        description: "",
        href(): string {
            return `/docker#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Docker",
        section: "Start development",
        description: "",
        href(): string {
            return `/docker#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Docker",
        section: "Build",
        description: "",
        href(): string {
            return `/docker#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Docker",
        section: "Build and run production binary inside container",
        description: "",
        href(): string {
            return `/docker#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Docker",
        section: "Build production Docker image",
        description: "",
        href(): string {
            return `/docker#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Docker",
        section: "Use Docker Compose for production",
        description: "",
        href(): string {
            return `/docker#${textToAnchor(this.section)}`
        },
    },
    // Issues.
    {
        page: "Issues",
        section: "Reporting a Bug",
        description: "",
        href(): string {
            return `/issues#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Issues",
        section: "Requesting a Feature",
        description: "",
        href(): string {
            return `/issues#${textToAnchor(this.section)}`
        },
    },
    // Contributing.
    {
        page: "Contributing",
        section: "Contributing",
        description: "",
        href(): string {
            return `/contributing#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Contributing",
        section: "Clone Repository",
        description: "",
        href(): string {
            return `/contributing#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Contributing",
        section: "Create Branch",
        description: "",
        href(): string {
            return `/contributing#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Contributing",
        section: "Coding Standards",
        description: "",
        href(): string {
            return `/contributing#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Contributing",
        section: "Export Everything",
        description: "",
        href(): string {
            return `/contributing#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Contributing",
        section: "Data & Logic",
        description: "",
        href(): string {
            return `/contributing#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Contributing",
        section: "Pull Requests",
        description: "",
        href(): string {
            return `/contributing#${textToAnchor(this.section)}`
        },
    },
    // Faq.
    {
        page: "Faq",
        section: "Why doesn't frizzante have middleware?",
        description: "",
        href(): string {
            return `/faq#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Faq",
        section: "Middleware Implementation",
        description: "",
        href(): string {
            return `/faq#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Faq",
        section: "Middleware Usage",
        description: "",
        href(): string {
            return `/faq#${textToAnchor(this.section)}`
        },
    },
    {
        page: "Faq",
        section: "Can I use Frizzante with other frontend frameworks?",
        description: "",
        href(): string {
            return `/faq#${textToAnchor(this.section)}`
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
        suggestions.push(result.item)
    }
    return suggestions
}
