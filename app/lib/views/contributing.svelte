<script lang="ts">
    import Code from "$lib/components/code.svelte"
    import MenuItemHyperlink from "$lib/components/menu_item_hyperlink.svelte"
    import Page from "$lib/components/page.svelte"
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
        <MenuItemHyperlink href="#contributing">Contributing</MenuItemHyperlink>
        <MenuItemHyperlink href="#clone-repository">Clone Repository</MenuItemHyperlink>
        <MenuItemHyperlink href="#create-branch">Create Branch</MenuItemHyperlink>
        <MenuItemHyperlink href="#coding-standards">Coding Standards</MenuItemHyperlink>
        <MenuItemHyperlink shift={1} href="#export-everything">Export Everything</MenuItemHyperlink>
        <MenuItemHyperlink shift={1} href="#data-and-logic">Data & Logic</MenuItemHyperlink>
        <MenuItemHyperlink href="#pull-requests">Pull Requests</MenuItemHyperlink>
    {/snippet}
</Page>
