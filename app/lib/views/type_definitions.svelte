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
</script>

<Page title="Type Definitions">
    <Title text="Type Definitions" />
    <span>
        It is possible, but not required, to generate TypeScript type definitions from Go structs using
        <a {...href("/cli#plugins")}>cli plugins</a> and
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
    <KeyedSection key="2" description="Call types.Generate[T]().">
        <Code
            lang="go"
            source={`
                package welcome

                func init() {
                    _ = types.Generate[Props]()
                }

                type Props struct {
                    Message string \`json:"message"\`
                    Error   string \`json:"error"\`
                }
            `}
        />
    </KeyedSection>
    <KeyedSection key="3" description="Generate types." noLink>
        <Code
            lang="shell"
            source={`
                frizzante -gtypes
            `}
        />
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
    {#snippet rightSidebar()}
        <RightSidebar
            items={[
                { shift: 0, text: "Type Definitions" },
                { shift: 1, text: "Define your Go types" },
                { shift: 1, text: "Call types.Generate[T]()" },
                { shift: 1, text: "Generate types" },
            ]}
        />
    {/snippet}
    {#snippet footer()}
        <Footer previous={{ label: "Cli", href: "/cli" }} next={{ label: "Snapshots", href: "/snapshots" }} />
    {/snippet}
</Page>
