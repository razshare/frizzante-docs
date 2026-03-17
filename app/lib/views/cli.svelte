<script lang="ts">
    import Code from "$lib/components/code.svelte"
    import FileTree from "$lib/components/file_tree.svelte"
    import Footer from "$lib/components/footer.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import Note from "$lib/components/note.svelte"
    import Page from "$lib/components/page.svelte"
    import RightSidebar from "$lib/components/right_sidebar.svelte"
    import Tip from "$lib/components/tip.svelte"
    import Title from "$lib/components/title.svelte"
    import { mdiApplication, mdiCodeBraces, mdiFolder } from "@mdi/js"
</script>

<Page title="Cli">
    <Title text="Cli" />
    <span>The cli provides various commands to manage your project lifecycle, from creation to deployment.</span>
    <Title text="Create Project" />
    <Code
        lang="sh"
        source={`
            frizzante c my_project
            # or
            frizzante create my_project
        `}
    />
    <span>Creates a new project in a new directory using the given name.</span>
    <FileTree>
        {#snippet children({ Directory, File })}
            <Directory name="MyProject" icon={mdiFolder} expanded>
                <Directory name="app" icon={mdiFolder} expanded>
                    <File name="index.html" icon={mdiCodeBraces} />
                </Directory>
                <File name="main.go" icon={mdiCodeBraces} />
            </Directory>
        {/snippet}
    </FileTree>
    <Title text="Generate" />
    <Code
        lang="sh"
        source={`
            frizzante g
            # or
            frizzante generate
        `}
    />
    <span>This command generates code and/or resources.</span>
    <Note>
        <span>Many of frizzante’s functionalities come as code and resource generations, not as packages.</span>
    </Note>
    <Tip>
        <Title text="Plugins" type="h5" noMargin />
        <span>It is possible, but not required, to create generation plugins for you cli.</span>
        <br />
        <br />
        <span>
            All you need to do is create a directory
            <InlineCode source="plugins/generate/[plugin name]" /> directory in your project.
        </span>
        <br />
        <span>This directory must be a Go <InlineCode source="main" /> package.</span>
        <FileTree>
            {#snippet children({ Directory, File })}
                <Directory name="plugins" expanded>
                    <Directory name="generate" expanded>
                        <Directory name="my-awesome-plugin" expanded>
                            <File name="main.go" />
                        </Directory>
                    </Directory>
                </Directory>
            {/snippet}
        </FileTree>
        <Code
            lang="go"
            source={`
                package main

                func main() {
                    println("hello, this is my generation plugin")
                }
            `}
        />
        <span>You will then be able to invoke this plugin using the frizzante cli.</span>
        <Code lang="go" source="frizzante generate my-awesome-plugin" />
        <Note>
            <span>
                Environment variables, cli flags and additional cli positional parameters will be passed down to your
                plugin program.
            </span>
            <br />
            <span>For example, given this plugin program</span>
            <Code
                lang="go"
                source={`
                    package main

                    import (
                        "fmt"
                        "os"
                        "strings"
                    )

                    func main() {
                        fmt.Printf("args: %s\\n", strings.Join(os.Args, " "))
                    }
                `}
            />
            <span>The following script</span>
            <Code lang="go" source="frizzante --strict generate my-awesome-plugin world" />
            <span>Will output to the console something like this</span>
            <Code
                lang="bash"
                source={`
                    args: /tmp/go-build2815184765/b001/exe/types --strict --bun=".gen/bun/bun" --go="go" --air=".gen/air/air" --sqlc=".gen/sqlc/sqlc" world 
                `}
            />
            <span>
                There are no implicit flags, frizzante will resolve the default flags automatically and pass them down
                to your plugin program explicitly.
            </span>
        </Note>
    </Tip>
    <Title text="Configure" />
    <Code lang="sh" source="frizzante configure" />
    <span>Runs</span>
    <ol>
        <li><InlineCode source="frizzante generate air,bun" /></li>
        <li><InlineCode source="frizzante install" /></li>
        <li><InlineCode source="frizzante package" /></li>
    </ol>
    <span>
        This will generate Air and Bun binaries in <InlineCode source={".gen/{air,bun}"} />.
    </span>
    <FileTree>
        {#snippet children({ Directory, File })}
            <Directory name=".gen" icon={mdiFolder} expanded>
                <Directory name="air" icon={mdiFolder} expanded>
                    <File name="air" icon={mdiCodeBraces} />
                </Directory>
                <Directory name="bun" icon={mdiFolder} expanded>
                    <File name="bun" icon={mdiCodeBraces} />
                </Directory>
            </Directory>
        {/snippet}
    </FileTree>
    <Title text="Install" />
    <Code
        lang="sh"
        source={`
            frizzante i
            # or
            frizzante install
        `}
    />
    <span>
        Installs Go and JavaScript packages from <InlineCode source="go.mod" /> and
        <InlineCode source="app/package.json" />.
    </span>
    <FileTree>
        {#snippet children({ Directory, File })}
            <Directory name="app" expanded>
                <File name="package.json" icon={mdiCodeBraces} />
            </Directory>
            <File name="go.mod" />
        {/snippet}
    </FileTree>
    <Note>
        <span>
            JavaScript packages are installed using <InlineCode source=".gen/bun/bin" /> by default. You can point to a custom
            Bun binary of your choice by setting <InlineCode source="--bun" />.
        </span>

        <span>
            For example, the following will install JavaScript packages using a
            <InlineCode source="~/.bun/bun binary" />
        </span>
        <Code lang="sh" source="frizzante --bun=~/.bun/bun install" />
        <span>Alternatively you can also use a global binary.</span>
        <Code lang="sh" source="frizzante --bun=bun install" />
        <span>This will force the cli to use the binary present in your path.</span>
    </Note>
    <Title text="Update" />
    <Code
        lang="sh"
        source={`
            frizzante u
            # or
            frizzante update
        `}
    />
    <span>
        Updates Go and JavaScript packages from <InlineCode source="go.mod" /> and
        <InlineCode source="app/package.json" />.
    </span>
    <FileTree>
        {#snippet children({ Directory, File })}
            <File name="go.mod" />
            <Directory name="app">
                <File name="package.json" icon={mdiCodeBraces} />
            </Directory>
        {/snippet}
    </FileTree>
    <Note>
        <span>
            JavaScript packages are updated using <InlineCode source=".gen/bun/bin" /> by default. You can point to a custom
            Bun binary of your choice by setting <InlineCode source="--bun" />
        </span>
        <span>
            For example, the following will update JavaScript packages using a
            <InlineCode source="~/.bun/bun binary" />
        </span>
        <Code lang="sh" source="frizzante --bun=~/.bun/bun update" />
        <span>Alternatively you can also use a global binary.</span>
        <Code lang="sh" source="frizzante --bun=bun update" />
        <span>This will force the cli to use the binary present in your path.</span>
    </Note>
    <Title text="Package" />
    <Code
        lang="sh"
        source={`
            frizzante p
            # or
            frizzante package
        `}
    />
    <span>
        Runs
        <InlineCode source="vite build" />
        and
        <InlineCode source="vite build --ssr" />
        in order to package the the
        <InlineCode source="app" />
        directory into
        <InlineCode source="app/dist" />.
    </span>
    <FileTree>
        {#snippet children({ Directory, File })}
            <Directory name="app" expanded>
                <Directory name="dist" expanded>
                    <Directory name="client" expanded>
                        <Directory name="assets" expanded>
                            <File name={"index-{hash}.css"} icon={mdiCodeBraces} />
                            <File name={"index-{hash}.js"} icon={mdiCodeBraces} />
                        </Directory>
                        <File name="index.html" icon={mdiCodeBraces} />
                    </Directory>
                    <File name="app.server.js" icon={mdiCodeBraces} />
                </Directory>
            </Directory>
        {/snippet}
    </FileTree>
    <span>
        The output contains a <InlineCode source="client" /> directory which can be simply served as is to the client and
        a <InlineCode source="app.server.js" />
        file that can be executed on the server in order to render the contents of the application in advanced.
    </span>
    <Note>
        <span>
            Your app directory is packaged using <InlineCode source=".gen/bun/bin" /> by default. You can point to a custom
            Bun binary of your choice by setting <InlineCode source="--bun" />.
        </span>
        <br />
        <br />
        <span>
            For example, the following will package your app using a <InlineCode source="~/.bun/bun binary" />
        </span>
        <Code lang="sh" source="frizzante --bun=~/.bun/bun package" />
        <span>Alternatively you can also use a global binary.</span>
        <Code lang="sh" source="frizzante --bun=bun package" />
        <span>This will force the cli to use the binary present in your path.</span>
    </Note>
    <Title text="Package Watch" />
    <Code lang="sh" source="frizzante package-watch" />
    <span>Runs <InlineCode source="frizzante package" /> in watch mode.</span>
    <Note>
        This will detect changes made only in the <InlineCode source="app" /> directory.
    </Note>
    <Title text="Dev" />
    <Code
        lang="sh"
        source={`
            frizzante d
            # or
            frizzante dev
        `}
    />
    <span>
        Runs <a target="_blank" href="https://github.com/air-verse/air">Air</a> and
        <InlineCode source="frizzante package-watch" /> in parallel.
    </span>
    <Note>
        <span>
            The cli uses <InlineCode source=".gen/air/air" /> by default. You can point to a custom Air binary of your choice
            by setting <InlineCode source="--air" />.
        </span>
        <br />
        <br />
        <span>For example, the following will run air using a <InlineCode source="~/.air/air" /> binary.</span>
        <Code lang="sh" source="frizzante --air=~/.air/air dev" />
        <span>You can also use a global binary.</span>
        <Code lang="sh" source="frizzante --air=air dev" />
        <span>Or even use custom paths for both Air and Bun.</span>
        <Code lang="sh" source="frizzante --air=air --bun=bun dev" />
    </Note>
    <Title text="Build" />
    <Code
        lang="sh"
        source={`
            frizzante b
            # or
            frizzante build
        `}
    />
    <span>
        Runs <InlineCode source="frizzante package" /> and then builds the Go program in
        <InlineCode source=".gen/bin/app" />.
    </span>
    <FileTree>
        {#snippet children({ Directory, File })}
            <Directory name=".gen" expanded>
                <Directory name="bin" expanded>
                    <File name="app" icon={mdiApplication} />
                </Directory>
            </Directory>
        {/snippet}
    </FileTree>
    <Title text="Check" />
    <Code lang="sh" source="frizzante --check" />
    <span>
        Runs <InlineCode source="eslint" /> and <InlineCode source="svelte-check" /> in your
        <InlineCode source="app" /> directory in order to detect code syntax and style errors.
    </span>
    <Note>
        <span>
            Checks are run using <InlineCode source=".gen/bun/bin" /> by default. You can point to a custom Bun binary of
            your choice by setting <InlineCode source="--bun" />.
        </span>
        <span>
            For example, the following will check your app using a
            <InlineCode source="~/.bun/bun" /> binary.
        </span>
        <Code lang="sh" source="frizzante --bun=~/.bun/bun --check" />
        <span>Alternatively you can also use a global binary.</span>
        <Code lang="sh" source="frizzante --bun=bun --check" />
        <span>This will force the cli to use the binary present in your path.</span>
    </Note>
    <Title text="Format" />
    <Code
        lang="sh"
        source={`
            frizzante f
            # or
            frizzante format
        `}
    />
    <span>
        This will run <InlineCode source="go fmt ./..." /> and <InlineCode source="prettier --write ." />
        in your <InlineCode source="app" /> directory.
    </span>
    <Note>
        <span>
            Prettier is run using <InlineCode source=".gen/bun/bun" /> by default. You can point to a custom Bun binary of
            your choice by setting <InlineCode source="--bun" />.
        </span>
        <span>
            For example, the following will format your app using a <InlineCode source="~/.bun/bun" /> binary.
        </span>
        <Code lang="sh" source="frizzante --bun=~/.bun/bun format" />
        <span>Alternatively you can also use a global binary.</span>
        <Code lang="sh" source="frizzante --bun=bun format" />
        <span>This will force the cli to use the binary present in your path.</span>
    </Note>
    <Title text="Clean Project" />
    <Code lang="sh" source="frizzante clean-project" />
    <span>
        Removes directories
        <InlineCode source=".gen" />,
        <InlineCode source="app/dist" />,
        <InlineCode source="app/.vite" />,
        <InlineCode source="app/node_modules" />,
        <InlineCode source="cover.html" />,
        <InlineCode source="cover.out" />
    </span>
    <Title text="Reset" />
    <Code lang="sh" source="frizzante reset" />
    <span>Deletes frizzante’s global cache.</span>
    <Note>
        <span>The global cache is located at <InlineCode source="~/.frizzante" /> by default.</span>
        <Tip>
            <span>
                You can configure this location by setting <InlineCode source="FRIZZANTE_HOME" />
                to whatever path you want in your environment variables.
            </span>
        </Tip>
    </Note>
    <Title text="Strict" />
    <Code
        lang="sh"
        source={`
            frizzante -s
            # or
            frizzante --strict
        `}
    />
    <span>
        Normally <InlineCode source="frizzante" /> will prompt the user for required parameters whenever they're being passed
        in, the <InlineCode source="--strict" />
        flag disables this behavior and instead defaults to stopping the program whenever a required parameter is missing.
    </span>
    <Tip>
        <span>This is useful for ci/cd pipelines, automated scripts, batch operations and so on.</span>
    </Tip>
    <Title text="Version" />
    <Code
        lang="sh"
        source={`
            frizzante v
            # or
            frizzante version
        `}
    />
    <span>Displays the version of the binary.</span>
    <Title text="Help" />
    <Code
        lang="sh"
        source={`
            frizzante h
            # or
            frizzante help
        `}
    />
    <span>Shows the complete list of available commands.</span>
    <Title text="Interactive Mode" />
    <Code lang="sh" source="frizzante" />
    <span>
        Running <InlineCode source="frizzante" /> without any flags starts an interactive menu where you can select commands
        using arrow keys.
    </span>
    <Note>
        <span>This is useful if</span>
        <ul>
            <li>you’re learning the available commands</li>
            <li>you’re not sure which command to use</li>
            <li>you prefer a guided interface</li>
        </ul>
    </Note>
    {#snippet rightSidebar()}
        <RightSidebar
            items={[
                { shift: 0, text: "Cli" },
                { shift: 0, text: "Create Project" },
                { shift: 0, text: "Generate" },
                { shift: 1, text: "Plugins" },
                { shift: 0, text: "Configure" },
                { shift: 0, text: "Install" },
                { shift: 0, text: "Update" },
                { shift: 0, text: "Package" },
                { shift: 0, text: "Package Watch" },
                { shift: 0, text: "Build" },
                { shift: 0, text: "Check" },
                { shift: 0, text: "Touch" },
                { shift: 0, text: "Clean Project" },
                { shift: 0, text: "Reset" },
                { shift: 0, text: "Strict" },
                { shift: 0, text: "Version" },
                { shift: 0, text: "Help" },
                { shift: 0, text: "Interactive Mode" },
            ]}
        />
    {/snippet}
    {#snippet footer()}
        <Footer
            previous={{ label: "Web Standards", href: "/web_standards" }}
            next={{ label: "Type Definitions", href: "/type_definitions" }}
        />
    {/snippet}
</Page>
