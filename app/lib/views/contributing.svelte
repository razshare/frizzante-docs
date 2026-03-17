<script lang="ts">
    import Code from "$lib/components/code.svelte"
    import Footer from "$lib/components/footer.svelte"
    import Page from "$lib/components/page.svelte"
    import RightSidebar from "$lib/components/right_sidebar.svelte"
    import Tip from "$lib/components/tip.svelte"
    import Title from "$lib/components/title.svelte"
</script>

<Page title="Contributing">
    <Title text="Contributing" />
    <span>
        This document describes the full process of setting up a fully working local development environment and
        submitting your first contribution.
    </span>
    <Title text="Clone Repository" />
    <span>Clone the frizzante repository from GitHub.</span>
    <Code source="git clone https://github.com/razshare/frizzante" />
    <Tip>
        <span>If you don’t have direct access to it you will need to fork your own frizzante repository.</span>
        <br />
        <span>Then when you’re done with your changes you will need to submit a pull request.</span>
    </Tip>
    <Title text="Create Branch" />
    <span>Create a new branch and give it a name that describes your changes.</span>
    <Code source="git checkout -b feature/some-feature" />
    <Title text="Coding Standards" />
    <span>Submitted code must follow a few rules.</span>
    <Title type="h3" text="Export Everything" />
    <span>Export Everything</span>
    <Code
        lang="go"
        source={`
            type MyStruct struct {
                Field1 string
                Field2 int
                Field3 bool
                Field4 any
            }
            func MyFunction(){}
            const Planet = "Earth"
            var Name = "World"
        `}
    />
    <Title type="h3" text="Data & Logic" />
    <span>
        Data and logic must be separated, don’t define receiver functions unless you’re forced to by some third party
        package.
    </span>
    <br />
    <span>This type of code should be avoided</span>
    <Code
        lang="go"
        source={`
            type MyStruct struct {
                field1 string
            }
            func (str *MyStruct) MyFunction(){
                str.field1 = "Hello!"
            }
        `}
    />
    <span>and be instead converted into</span>
    <Code
        lang="go"
        source={`
            type MyStruct struct {
                Field1 string
            }
            func MyFunction(str *MyStruct){
                str.Field1 = "Hello!"
            }
        `}
    />
    <Title text="Pull Requests" />
    <span>
        When you’re done with your changes you can submit a pull request in order to implement them into frizzante.
    </span>
    {#snippet rightSidebar()}
        <RightSidebar
            items={[
                { shift: 0, text: "Contributing" },
                { shift: 0, text: "Clone Repository" },
                { shift: 0, text: "Create Branch" },
                { shift: 0, text: "Coding Standards" },
                { shift: 1, text: "Export Everything" },
                { shift: 1, text: "Data & Logic" },
                { shift: 0, text: "Pull Requests" },
            ]}
        />
    {/snippet}
    {#snippet footer()}
        <Footer previous={{ label: "Issues", href: "/issues" }} next={{ label: "Faq", href: "/faq" }} />
    {/snippet}
</Page>
