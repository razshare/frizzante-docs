<script lang="ts">
    import Code from "$lib/components/code.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import KeyedSection from "$lib/components/keyed_section.svelte"
    import MenuItem from "$lib/components/menu_item.svelte"
    import Note from "$lib/components/note.svelte"
    import Page from "$lib/components/page.svelte"
    import Tip from "$lib/components/tip.svelte"
    import Title from "$lib/components/title.svelte"
</script>

<Page title="Type Definitions">
    <Title text="Type Definitions" />
    <span>
        It is possible, but not required, to generate TypeScript type definitions from Go structs with
        <InlineCode source="types.Generate[T]()" />, where T is the type you wish to generate.
    </span>
    <br />
    <br />
    <KeyedSection key="1">
        <span>Define your Go types.</span>
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
    <KeyedSection key="2">
        <span>Call <InlineCode source="types.Generate[T]()" />.</span>
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
    <KeyedSection key="3" noLink>
        <span>Generate types</span>
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
        <MenuItem><a href="#type-definitions">Type Definitions</a></MenuItem>
    {/snippet}
</Page>
