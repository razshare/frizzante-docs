<script lang="ts">
    import Code from "$lib/components/code.svelte"
    import FileTree from "$lib/components/file_tree.svelte"
    import Footer from "$lib/components/footer.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import KeyedSection from "$lib/components/keyed_section.svelte"
    import Note from "$lib/components/note.svelte"
    import Page from "$lib/components/page.svelte"
    import RightSidebar from "$lib/components/right_sidebar.svelte"
    import Title from "$lib/components/title.svelte"
    import { base } from "$lib/scripts/strings/base"
    import { mdiPackage } from "@mdi/js"
    let { prefix } = $props()
</script>

<Page title="Get Started" {prefix}>
    <Title text="Get Started" />
    <KeyedSection key="1" description="Install frizzante.">
        <Code lang="bash" source="go install github.com/razshare/frizzante@latest" />
        <Note>
            <span>Remember to add Go binaries to your path.</span>
            <Code lang="bash" source={["export GOPATH=$HOME/go", "export PATH=$PATH:$GOPATH/bin"].join("\n")} />
        </Note>
    </KeyedSection>
    <KeyedSection key="2" description="Create project.">
        <Code lang="bash" source="frizzante create my_project" />
    </KeyedSection>
    <KeyedSection key="3" description="Configure project.">
        <Code lang="bash" source="frizzante configure" />
    </KeyedSection>
    <KeyedSection key="4" description="Start development.">
        <Code lang="bash" source="frizzante dev" />
    </KeyedSection>
    <KeyedSection key="5" description="Build." noLink>
        <Code lang="bash" source="frizzante build" />
        <span>This will create a</span>
        <InlineCode source=".gen/bin/app" />
        <span>standalone executable.</span>
        <br />
        <br />
        <FileTree>
            {#snippet children({ Directory, File })}
                <Directory name=".gen" expanded>
                    <Directory name="bin" expanded>
                        <File name="app" icon={mdiPackage}></File>
                    </Directory>
                </Directory>
            {/snippet}
        </FileTree>
    </KeyedSection>
    {#snippet rightSidebar({ body })}
        <RightSidebar
            {body}
            items={[
                { shift: 0, text: "Get Started" },
                { shift: 1, text: "Install frizzante" },
                { shift: 1, text: "Create project" },
                { shift: 1, text: "Configure project" },
                { shift: 1, text: "Start development" },
                { shift: 1, text: "Build" },
            ]}
        />
    {/snippet}
    {#snippet footer()}
        <Footer next={{ label: "Basics", href: base("/basics", { prefix }) }} />
    {/snippet}
</Page>
