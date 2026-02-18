<script>
    import Code from "$lib/components/code.svelte"
    import IndexedSection from "$lib/components/indexed_section.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import Page from "$lib/components/page.svelte"
    import Tip from "$lib/components/tip.svelte"
    import Tree from "$lib/components/trees/tree.svelte"
    import { mdiPackage } from "@mdi/js"
</script>

<Page title="Get Started">
    <h1>What is Frizzante?</h1>
    <p>Frizzante is an opinionated web server framework written in Go that uses Svelte to render web pages.</p>
    <h2>Prerequisites</h2>
    <Code lang="bash" source="go install github.com/razshare/frizzante@latest" />
    <Tip>
        <span>Remember to add Go binaries to your path.</span>
        <Code lang="bash" source={["export GOPATH=$HOME/go", "export PATH=$PATH:$GOPATH/bin"].join("\n")} />
    </Tip>
    <h1>Get Started</h1>
    <IndexedSection index={1}>
        <span>Create project.</span>
        <Code lang="bash" source="frizzante create my_project" />
    </IndexedSection>
    <IndexedSection index={2}>
        <span>Configure project.</span>
        <Code lang="bash" source="frizzante configure" />
    </IndexedSection>
    <IndexedSection index={3}>
        <span>Start development.</span>
        <Code lang="bash" source="frizzante dev" />
    </IndexedSection>
    <IndexedSection index={4} noLink>
        <span>Build.</span>
        <Code lang="bash" source="frizzante build" />
        <span>This will create a</span>
        <InlineCode source=".gen/bin/app" />
        <span>standalone executable.</span>
        <br />
        <br />
        <Tree>
            {#snippet children({ Directory, File })}
                <Directory name=".gen" expanded>
                    <Directory name="bin" expanded>
                        <File name="app" icon={mdiPackage}></File>
                    </Directory>
                </Directory>
            {/snippet}
        </Tree>
    </IndexedSection>
    {#snippet rightSidebar()}
        <!-- empty -->
    {/snippet}
</Page>
