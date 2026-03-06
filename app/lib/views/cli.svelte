<script lang="ts">
    import Caution from "$lib/components/caution.svelte"
    import Code from "$lib/components/code.svelte"
    import FileTree from "$lib/components/file_tree.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import MenuItem from "$lib/components/menu_item.svelte"
    import Note from "$lib/components/note.svelte"
    import Page from "$lib/components/page.svelte"
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
            frizzante -cMyProject
            # or
            frizzante --create-project MyProject
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
            frizzante -g
            # or
            frizzante --generate
        `}
    />
    <span>This command generates code and/or resources.</span>
    <Note>
        <span>Many of frizzante’s functionalities come as code and resource generations, not as packages.</span>
        <Code lang="sh" source="frizzante -g:pick" />
    </Note>
    <Tip>
        <span>Use <InlineCode source=":pick" /> to run the interactive menu.</span>
    </Tip>
    <Title text="Configure" />
    <Code lang="sh" source="frizzante --configure" />
    <span>Runs</span>
    <ol>
        <li><InlineCode source="frizzante —generate=“air,bun”" /></li>
        <li><InlineCode source="frizzante —install" /></li>
        <li><InlineCode source="frizzante —package" /></li>
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
            frizzante -i
            # or
            frizzante --install
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
        <Code lang="sh" source="frizzante --bun=~/.bun/bun --install" />
        <span>Alternatively you can also use a global binary.</span>
        <Code lang="sh" source="frizzante --bun=bun --install" />
        <span>This will force the cli to use the binary present in your path.</span>
    </Note>
    <Title text="Update" />
    <Code
        lang="sh"
        source={`
            frizzante -u
            # or
            frizzante --update
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
    <Caution>
        <span>This will bump version numbers.</span>
    </Caution>
    <Note>
        <span>
            JavaScript packages are updated using <InlineCode source=".gen/bun/bin" /> by default. You can point to a custom
            Bun binary of your choice by setting <InlineCode source="--bun" />
        </span>
        <span>
            For example, the following will update JavaScript packages using a
            <InlineCode source="~/.bun/bun binary" />
        </span>
        <Code lang="sh" source="frizzante --bun=~/.bun/bun --update" />
        <span>Alternatively you can also use a global binary.</span>
        <Code lang="sh" source="frizzante --bun=bun --update" />
        <span>This will force the cli to use the binary present in your path.</span>
    </Note>
    <Title text="Package" />
    <Code
        lang="sh"
        source={`
            frizzante -p
            # or
            frizzante --package
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
        <Code lang="sh" source="frizzante --bun=~/.bun/bun --package" />
        <span>Alternatively you can also use a global binary.</span>
        <Code lang="sh" source="frizzante --bun=bun --package" />
        <span>This will force the cli to use the binary present in your path.</span>
    </Note>
    <Title text="Package Watch" />
    <Code lang="sh" source="frizzante --package-watch" />
    <span>Runs <InlineCode source="frizzante —package" /> in watch mode.</span>
    <Note>
        This will detect changes made only in the <InlineCode source="app" /> directory.
    </Note>
    <Title text="Dev" />
    <Code
        lang="sh"
        source={`
            frizzante -d
            # or
            frizzante --dev
        `}
    />
    <span>
        Runs <a href="https://github.com/air-verse/air">Air</a> and
        <InlineCode source="frizzante —package-watch" /> in parallel.
    </span>
    <Note>
        <span>
            The cli uses <InlineCode source=".gen/air/air" /> by default. You can point to a custom Air binary of your choice
            by setting <InlineCode source="--air" />.
        </span>
        <br />
        <br />
        <span>For example, the following will run air using a <InlineCode source="~/.air/air" /> binary.</span>
        <Code lang="sh" source="frizzante --air=~/.air/air --dev" />
        <span>You can also use a global binary.</span>
        <Code lang="sh" source="frizzante --air=air --dev" />
        <span>Or even use custom paths for both Air and Bun.</span>
        <Code lang="sh" source="frizzante --air=air --bun=bun --dev" />
    </Note>
    <Title text="Build" />
    <Code
        lang="sh"
        source={`
            frizzante -b
            # or
            frizzante --build
        `}
    />
    <span>
        Runs <InlineCode source="frizzante —package" /> and then builds the Go program in
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
            frizzante -f
            # or
            frizzante --format
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
        <Code lang="sh" source="frizzante --bun=~/.bun/bun --format" />
        <span>Alternatively you can also use a global binary.</span>
        <Code lang="sh" source="frizzante --bun=bun --format" />
        <span>This will force the cli to use the binary present in your path.</span>
    </Note>
    <Title text="Touch" />
    <Code lang="sh" source="frizzante --touch" />
    <span>Creates placeholder files in <InlineCode source="app/dist" />.</span>
    <Note>
        <span>This is just a pure convenience command.</span>
        <br />
        <br />
        <span>
            Go’s <InlineCode source="embed" /> directive requires files to exist at compile time, this command simply creates
            some placeholders in your <InlineCode source="app/dist" /> directory.
        </span>
    </Note>
    <Title text="Create Project" />
    <Code lang="sh" source="frizzante --clean-project" />
    <span>
        Removes directories
        <InlineCode source=".gen" />,
        <InlineCode source=".vite" />,
        <InlineCode source="app/dist" />,
        <InlineCode source="app/node_modules" />
        and then runs
        <InlineCode source="frizzante —touch" />.
    </span>
    <Note>
        These are all files that can easily be recreated with <InlineCode source="--configure" />
        followed by <InlineCode source="--package" />.
    </Note>
    <Title text="Reset" />
    <Code lang="sh" source="frizzante --reset" />
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
        flag disables this behavior and instead defaults to stopping the program.
    </span>
    <Tip>
        <span>This is useful for ci/cd pipelines, automated scripts, batch operations and so on.</span>
    </Tip>
    <Title text="Version" />
    <Code
        lang="sh"
        source={`
            frizzante -v
            # or
            frizzante --version
        `}
    />
    <span>Displays the version of the binary.</span>
    <Title text="Help" />
    <Code
        lang="sh"
        source={`
            frizzante -h
            # or
            frizzante --help
        `}
    />
    <span>Shows the complete list of available commands and options.</span>
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
        <MenuItem><a href="#cli">Cli</a></MenuItem>
        <MenuItem><a href="#create-project">Create Project</a></MenuItem>
        <MenuItem><a href="#generate">Generate</a></MenuItem>
        <MenuItem><a href="#configure">Configure</a></MenuItem>
        <MenuItem><a href="#install">Install</a></MenuItem>
        <MenuItem><a href="#update">Update</a></MenuItem>
        <MenuItem><a href="#package">Package</a></MenuItem>
        <MenuItem><a href="#package-watch">Package Watch</a></MenuItem>
        <MenuItem><a href="#check">Check</a></MenuItem>
        <MenuItem><a href="#touch">Touch</a></MenuItem>
        <MenuItem><a href="#create-project">Create Project</a></MenuItem>
        <MenuItem><a href="#reset">Reset</a></MenuItem>
        <MenuItem><a href="#version">Version</a></MenuItem>
        <MenuItem><a href="#help">Help</a></MenuItem>
        <MenuItem><a href="#interactive-mode">Interactive Mode</a></MenuItem>
    {/snippet}
</Page>
