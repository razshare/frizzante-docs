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
        section: "Migrate development",
        description: "Migrate the development database",
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
        section: "Build production",
        description: "Build the production binaries",
        href(prefix: string): string {
            return base(`/get_started#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Get Started",
        section: "Migrate production",
        description: "Build the production database",
        href(prefix: string): string {
            return base(`/get_started#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Get Started",
        section: "Serve production",
        description: "Serve the production application",
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
        section: "Serve",
        description: "Start an http server",
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
        section: "Headers Fields & Status",
        description: "Manage header fields and response status code",
        href(prefix: string): string {
            return base(`/basics#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Basics",
        section: "Queries",
        description: "Receive query strings",
        href(prefix: string): string {
            return base(`/basics#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Basics",
        section: "Forms",
        description: "Receive forms",
        href(prefix: string): string {
            return base(`/basics#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Basics",
        section: "Json",
        description: "Send and receive json",
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
        description: "Negotiate session id",
        href(prefix: string): string {
            return base(`/basics#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Basics",
        section: "Redirect",
        description: "Send the user to a different location",
        href(prefix: string): string {
            return base(`/basics#${textToAnchor(this.section)}`, { prefix })
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
        description: "What are views?",
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
        section: "views.RenderModeFull",
        description: "The view is rendered on both the server and the client",
        href(prefix: string): string {
            // debugger
            return base(`/views#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Views",
        section: "views.RenderModeServer",
        description: "The view is rendered only on the server",
        href(prefix: string): string {
            // debugger
            return base(`/views#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Views",
        section: "views.RenderModeClient",
        description: "The view is rendered only on the client",
        href(prefix: string): string {
            return base(`/views#${textToAnchor(this.section)}`, { prefix })
        },
    },
    // Web Standards.
    {
        page: "Web Standards",
        section: "Web Standards",
        description: "Web standards through hyperlinks and forms",
        href(prefix: string): string {
            return base(`/web_standards#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Web Standards",
        section: "Adaptive Hyperlinks",
        description: "Enhance your hyperlinks and detect states",
        href(prefix: string): string {
            return base(`/web_standards#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Web Standards",
        section: "Adaptive Forms",
        description: "Enhance your forms and detect states",
        href(prefix: string): string {
            return base(`/web_standards#${textToAnchor(this.section)}`, { prefix })
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
        description: "Create a new frizzante project",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Generate",
        description: "Generate code and resources",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Configure",
        description: "Configure project",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Install",
        description: "Install packages",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Update",
        description: "Update packages",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Package",
        description: "Package frontend application",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Package Watch",
        description: "Package frontend application in watch mode",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Build",
        description: "Build production binaries",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Check",
        description: "Check for code style and type errors",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Clean Project",
        description: "Clean resources that are irrelevant for production",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Reset",
        description: "Delete frizzante global cache",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Strict",
        description: "Enable strict mode",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Cli",
        section: "Version",
        description: "Show cli version",
        href(prefix: string): string {
            return base(`/cli#${textToAnchor(this.section)}`, { prefix })
        },
    },
    // Schema.
    {
        page: "Schema",
        section: "Schema",
        description: "Manage database schema",
        href(prefix: string): string {
            return base(`/schema#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Schema",
        section: "Requirements",
        description: "Requirements for managing database schema",
        href(prefix: string): string {
            return base(`/schema#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Schema",
        section: "Define Schema",
        description: "Define database schema using sql code",
        href(prefix: string): string {
            return base(`/schema#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Schema",
        section: "Define Queries",
        description: "Define database queries using sql code",
        href(prefix: string): string {
            return base(`/schema#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Schema",
        section: "Generate Go Code",
        description: "Generate go code from sql code",
        href(prefix: string): string {
            return base(`/schema#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Schema",
        section: "Invoke Queries",
        description: "Invoke sql queries through go code",
        href(prefix: string): string {
            return base(`/schema#${textToAnchor(this.section)}`, { prefix })
        },
    },
    // Migrate.
    {
        page: "Migrate",
        section: "Create Migration Files",
        description: "Create migrations files using frizzante cli",
        href(prefix: string): string {
            return base(`/migrate#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Migrate",
        section: "Execute Migration Files",
        description: "Execute migrations files to create and migrate your database",
        href(prefix: string): string {
            return base(`/migrate#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Migrate",
        section: "Create Migrate Program",
        description: "Create the standalone migrate program",
        href(prefix: string): string {
            return base(`/migrate#${textToAnchor(this.section)}`, { prefix })
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
    // Type Definitions.
    {
        page: "Type Definitions",
        section: "Type Definitions",
        description: "",
        href(prefix: string): string {
            return base(`/type_definitions#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Type Definitions",
        section: "Define your Go types",
        description: "Define go types to generate as typescript definitions",
        href(prefix: string): string {
            return base(`/type_definitions#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Type Definitions",
        section: "Create types program",
        description: "Create your types generation program",
        href(prefix: string): string {
            return base(`/type_definitions#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Type Definitions",
        section: "Generate Types",
        description: "Generate typescript definition from go types",
        href(prefix: string): string {
            return base(`/type_definitions#${textToAnchor(this.section)}`, { prefix })
        },
    },
    // Snapshots.
    {
        page: "Snapshots",
        section: "Snapshots",
        description: "Take a snapshot of your application and generate static assets from it",
        href(prefix: string): string {
            return base(`/snapshots#${textToAnchor(this.section)}`, { prefix })
        },
    },
    // Docker.
    {
        page: "Docker",
        section: "Docker",
        description: "Deploy with Docker",
        href(prefix: string): string {
            return base(`/docker#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Docker",
        section: "Build your program statically",
        description: "Build your program statically without cgo",
        href(prefix: string): string {
            return base(`/docker#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Docker",
        section: "Make a Dockerfile",
        description: "Make a Dockerfile and embed your program in it",
        href(prefix: string): string {
            return base(`/docker#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Docker",
        section: "Build the image",
        description: "Build the docker image",
        href(prefix: string): string {
            return base(`/docker#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Docker",
        section: "Run",
        description: "Run the docker image",
        href(prefix: string): string {
            return base(`/docker#${textToAnchor(this.section)}`, { prefix })
        },
    },
    // Issues.
    {
        page: "Issues",
        section: "Issues",
        description: "A guide to bugs and features",
        href(prefix: string): string {
            return base(`/issues#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Issues",
        section: "Reporting a Bug",
        description: "How to report a bug",
        href(prefix: string): string {
            return base(`/issues#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Issues",
        section: "Requesting a Feature",
        description: "How request a feature",
        href(prefix: string): string {
            return base(`/issues#${textToAnchor(this.section)}`, { prefix })
        },
    },
    // Contributing.
    {
        page: "Contributing",
        section: "Contributing",
        description: "Contributing to frizzante",
        href(prefix: string): string {
            return base(`/contributing#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Contributing",
        section: "Clone Repository",
        description: "Get the frizzante source code",
        href(prefix: string): string {
            return base(`/contributing#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Contributing",
        section: "Create Branch",
        description: "Branch out in order to fix bugs or develop features",
        href(prefix: string): string {
            return base(`/contributing#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Contributing",
        section: "Coding Standards",
        description: "Frizzante's coding style and standards",
        href(prefix: string): string {
            return base(`/contributing#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Contributing",
        section: "Export Everything",
        description: "Don't hide data or behavior from developers",
        href(prefix: string): string {
            return base(`/contributing#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Contributing",
        section: "Data & Logic",
        description: "Separate data and logic in your code",
        href(prefix: string): string {
            return base(`/contributing#${textToAnchor(this.section)}`, { prefix })
        },
    },
    {
        page: "Contributing",
        section: "Pull Requests",
        description: "Create pull requests to upstream changes",
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
