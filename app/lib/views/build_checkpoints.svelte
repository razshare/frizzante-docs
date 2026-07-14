<script lang="ts">
    import Code from "$lib/components/code.svelte"
    import FileTree from "$lib/components/file_tree.svelte"
    import Footer from "$lib/components/footer.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import Page from "$lib/components/page.svelte"
    import RightSidebar from "$lib/components/right_sidebar.svelte"
    import Title from "$lib/components/title.svelte"
    import { base } from "$lib/scripts/strings/base"
    let { prefix } = $props()
</script>

<Page title="Build Checkpoints" {prefix}>
    <Title text="Build Checkpoints" />
    <span>
        When building with <InlineCode source="frizzante build" />
        or <InlineCode source="frizzante dev" />, you're also executing 2 additional programs, before and after the
        build process.
    </span>
    <br />
    <span>
        These 2 programs are referred to as <strong>pre</strong>
        build checkpoint and <strong>post</strong> build checkpoint.
    </span>
    <br />
    <br />
    <Title text="Pre Build Checkpoint" />
    <span>
        The pre build checkpoint is a program that lives in <InlineCode source="./pre/main.go" />
        and is executed automatically by <InlineCode source="frizzante build" /> right before building your main program.
    </span>
    <FileTree>
        {#snippet children({ Directory, File })}
            <Directory expanded name="pre">
                <File name="main.go" />
            </Directory>
        {/snippet}
    </FileTree>
    <Code
        lang="go"
        source={`
            package main

            func main() {
                println("this is the pre build checkpoint!")
            }
        `}
    />
    <span>You can also invoke the pre build checkpoint directly with <InlineCode source="frizzante prebuild" />.</span>
    <br />
    <Code
        source={`
            frizzante prebuild
            #this is the pre build checkpoint!
        `}
    />
    <br />
    <br />
    <Title text="Post Build Checkpoint" />
    <span>
        The post build checkpoint is a program that lives in <InlineCode source="./post/main.go" />
        and is executed automatically by <InlineCode source="frizzante build" /> right after building your main program.
    </span>
    <FileTree>
        {#snippet children({ Directory, File })}
            <Directory expanded name="post">
                <File name="main.go" />
            </Directory>
        {/snippet}
    </FileTree>
    <Code
        lang="go"
        source={`
            package main

            func main() {
                println("this is the post build checkpoint!")
            }
        `}
    />
    <span>You can also invoke the post build checkpoint directly with <InlineCode source="frizzante postbuild" />.</span
    >
    <br />
    <Code
        source={`
            frizzante postbuild
            #this is the post build checkpoint!
        `}
    />
    {#snippet rightSidebar({ body })}
        <RightSidebar
            {body}
            items={[
                { shift: 0, text: "Build Checkpoints" },
                { shift: 1, text: "Pre Build Checkpoint" },
                { shift: 1, text: "Post Build Checkpoint" },
            ]}
        />
    {/snippet}
    {#snippet footer()}
        <Footer
            previous={{ label: "Migrate", href: base("/migrate", { prefix }) }}
            next={{ label: "Type Definitions", href: base("/type_definitions", { prefix }) }}
        />
    {/snippet}
</Page>
