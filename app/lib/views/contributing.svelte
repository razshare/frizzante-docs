<script lang="ts">
    import Code from "$lib/components/code.svelte"
    import Page from "$lib/components/page.svelte"
    import Tip from "$lib/components/tip.svelte"
</script>

<Page title="Contributing">
    <h1>Contributing</h1>
    <span>
        This document describes the full process of setting up a fully working local development environment and
        submitting your first contribution.
    </span>
    <h1>Clone Repository</h1>
    <span>Clone the frizzante repository from GitHub.</span>
    <Code source="git clone https://github.com/razshare/frizzante" />
    <Tip>
        <span>If you don’t have direct access to it you will need to fork your own frizzante repository.</span>
        <br />
        <span>Then when you’re done with your changes you will need to submit a pull request.</span>
    </Tip>
    <h1>Create Branch</h1>
    <span>Create a new branch and give it a name that describes your changes.</span>
    <Code source="git checkout -b feature/some-feature" />
    <h1>Coding Standards</h1>
    <span>Submitted code must follow a few rules.</span>
    <h3>Export Everything</h3>
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
    <h3>Data & Logic</h3>
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
    <h1>Pull Requests</h1>
    <span>
        When you’re done with your changes you can submit a pull request in order to implement them into frizzante.
    </span>
    {#snippet rightSidebar()}
        <!-- empty -->
    {/snippet}
</Page>
