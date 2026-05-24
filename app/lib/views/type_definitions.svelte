<script lang="ts">
    import Code from "$lib/components/code.svelte"
    import Footer from "$lib/components/footer.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import KeyedSection from "$lib/components/keyed_section.svelte"
    import Note from "$lib/components/note.svelte"
    import Page from "$lib/components/page.svelte"
    import RightSidebar from "$lib/components/right_sidebar.svelte"
    import Tip from "$lib/components/tip.svelte"
    import Title from "$lib/components/title.svelte"
    import { href } from "$lib/scripts/core/href"
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
    <KeyedSection key="2" description="Generate types." noLink>
        <Code
            lang="go"
            source={`
                package welcome

                import "main/lib/core/types"

                var _ = types.Generate[welcome.Props]() // add this line

                type Props struct {
                    Message string \`json:"message"\`
                    Error   string \`json:"error"\`
                }
            `}
        />
        <span>All you have to do now is run your main program.</span>
        <br />
        <Code lang="shell" source="frizzante dev" />
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
        <Tip>
            <span>
                Instead of calling <InlineCode source="types.Generate[T]()" />
                in your main program, you can use the
                <a {...href("/build_checkpoints#pre-build-checkpoint")}>pre build checkpoint</a> to generate types.
            </span>
            <Code
                lang="go"
                source={`
                    package main

                    import (
                        "main/lib/core/types"
                        "main/lib/routes/todos"
                    )

                    func main() {
                        types.Generate[todos.Props](),
                    }

                `}
            />
            <span>Then run the prebuild checkpoint directly.</span>
            <Code lang="shell" source="frizzante prebuild" />
            <Note>
                <span>
                    You don't have to run <InlineCode source="frizzante prebuild" /> manually every time you make a change
                    to your type definitions.
                </span>
                <br />
                <span>
                    The default air configuration specifies a <strong>pre</strong> and a
                    <strong>post</strong> build scripts, which will handle everything automatically.
                </span>
                <Code
                    lang="toml"
                    source={`
                        post_cmd = ["frizzante postbuild"]
                        pre_cmd = ["frizzante prebuild"]
                    `}
                />
            </Note>
        </Tip>
    </KeyedSection>
    {#snippet rightSidebar({ body })}
        <RightSidebar
            {body}
            items={[
                { shift: 0, text: "Type Definitions" },
                { shift: 1, text: "Define your Go types" },
                { shift: 1, text: "Generate types" },
            ]}
        />
    {/snippet}
    {#snippet footer()}
        <Footer
            previous={{ label: "Cli", href: base("/cli", { prefix }) }}
            next={{ label: "Snapshots", href: base("/snapshots", { prefix }) }}
        />
    {/snippet}
</Page>
