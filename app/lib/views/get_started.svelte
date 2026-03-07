<script lang="ts">
    import Code from "$lib/components/code.svelte"
    import KeyedSection from "$lib/components/keyed_section.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import Page from "$lib/components/page.svelte"
    import Tip from "$lib/components/tip.svelte"
    import Tree from "$lib/components/file_tree.svelte"
    import { mdiPackage } from "@mdi/js"
    import Title from "$lib/components/title.svelte"
    import MenuItemHyperlink from "$lib/components/menu_item_hyperlink.svelte"
</script>

<Page title="Get Started">
    <Title text="What is Frizzante?" />
    <p>Frizzante is an opinionated web server framework written in Go that uses Svelte to render web pages.</p>
    <Title type="h2" text="Prerequisites" />
    <Code lang="bash" source="go install github.com/razshare/frizzante@latest" />
    <Tip>
        <span>Remember to add Go binaries to your path.</span>
        <Code lang="bash" source={["export GOPATH=$HOME/go", "export PATH=$PATH:$GOPATH/bin"].join("\n")} />
    </Tip>
    <Title text="Get Started" />
    <KeyedSection key="1" description="Create project.">
        <Code lang="bash" source="frizzante create my_project" />
    </KeyedSection>
    <KeyedSection key="2" description="Configure project.">
        <Code lang="bash" source="frizzante configure" />
    </KeyedSection>
    <KeyedSection key="3" description="Start development.">
        <Code lang="bash" source="frizzante dev" />
    </KeyedSection>
    <KeyedSection key="4" description="Build." noLink>
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
    </KeyedSection>
    {#snippet rightSidebar()}
        <MenuItemHyperlink text="What is Frizzante?" />
        <MenuItemHyperlink shift={1} text="Prerequisites" />
        <MenuItemHyperlink text="Get Started" />
    {/snippet}
</Page>
