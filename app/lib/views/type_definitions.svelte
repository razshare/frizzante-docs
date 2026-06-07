<script lang="ts">
    import Code from "$lib/components/code.svelte"
    import FileTree from "$lib/components/file_tree.svelte"
    import Footer from "$lib/components/footer.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import KeyedSection from "$lib/components/keyed_section.svelte"
    import Note from "$lib/components/note.svelte"
    import Page from "$lib/components/page.svelte"
    import RightSidebar from "$lib/components/right_sidebar.svelte"
    import Tip from "$lib/components/tip.svelte"
    import Title from "$lib/components/title.svelte"
    import { base } from "$lib/scripts/strings/base"
    let { prefix } = $props()
</script>

<Page title="Type Definitions" {prefix}>
    <Title text="Type Definitions" />
    <span>
        It is possible, but not required, to generate TypeScript type definitions from Go structs using
        <InlineCode source="types.Generate[T]()" />, where T is the type you wish to generate.
    </span>
    <br />
    <br />
    <KeyedSection key="1" description="Define your Go types.">
        <Code
            lang="go"
            source={`
                package welcome

                type Props struct {
                    Message string \`json:"message"\`
                    Error   string \`json:"error"\`
                }
            `}
        />
        <Note><span>All <InlineCode source="json" /> tags are optional.</span></Note>
    </KeyedSection>
    <KeyedSection key="2" description="Create types program.">
        <span>
            Create a new <InlineCode source="types/main.go" /> in your project program and call <InlineCode
                source="types.Generate[T]()"
            /> inside it for each type.
        </span>
        <FileTree>
            {#snippet children({ Directory, File })}
                <Directory name="types" expanded>
                    <File name="main.go" />
                </Directory>
                <File name="main.go" />
            {/snippet}
        </FileTree>
        <Code
            lang="go"
            source={`
                package main

                import (
                    "main/lib/core/dev/types"
                    "main/lib/routes/todos"
                )

                func main() {
                    _ = types.Generate[todos.Props]()
                }
            `}
        />
    </KeyedSection>
    <KeyedSection key="2" description="Generate types.">
        <span>Run the program</span>
        <br />
        <Code
            lang="shell"
            source={`
                frizzante generate type
                # or go run ./types
            `}
        />
        <br />
        <span>This will generate your type definitions in <InlineCode source=".gen/types" />.</span>
        <Code
            lang="ts"
            source={`
                export type Props = welcome.Props
                export declare namespace welcome {
                    export type Props = {
                        message: string
                        error: string
                    }
                }
            `}
        />
        <Tip>
            <span>
                You can use the default <InlineCode source="$gen" />
                alias to access the <InlineCode source=".gen" /> directory.
            </span>
            <Code
                lang="ts"
                source={`
                    ${"<"}script lang="ts">
                        import type { Props } from "$gen/types/main/lib/routes/welcome/Props"
                        let { message, error }:Props = $props()
                    </script>
                `}
            />
        </Tip>
    </KeyedSection>
    {#snippet rightSidebar({ body })}
        <RightSidebar
            {body}
            items={[
                { shift: 0, text: "Type Definitions" },
                { shift: 1, text: "Define your Go types" },
                { shift: 1, text: "Create types program" },
                { shift: 1, text: "Generate types" },
            ]}
        />
    {/snippet}
    {#snippet footer()}
        <Footer
            previous={{ label: "Build Checkpoints", href: base("/build_checkpoints", { prefix }) }}
            next={{ label: "Snapshots", href: base("/snapshots", { prefix }) }}
        />
    {/snippet}
</Page>
