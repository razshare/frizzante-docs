<script lang="ts">
    import Code from "$lib/components/code.svelte"
    import Footer from "$lib/components/footer.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import Page from "$lib/components/page.svelte"
    import RightSidebar from "$lib/components/right_sidebar.svelte"
    import Title from "$lib/components/title.svelte"
    import { base } from "$lib/scripts/strings/base"
    let { prefix } = $props()
</script>

<Page title="Web Standards" {prefix}>
    <Title text="Web Standards" />
    <span>
        You can use <InlineCode source="href()" /> and <InlineCode source="action()" />
        in order to make your hyperlinks and forms adapt to the client’s browser capabilities and/or the server’s rendering
        configuration.
    </span>
    <br />
    <br />
    <Title text="Adaptive Hyperlinks" />
    <Code
        lang="svelte"
        source={`
            ${"<"}script lang="ts">
                import { href } from "$lib/scripts/core/href.ts"
            </script>
            <!--
            Defines a link, which when triggered will either
            directly navigate to the given path, or do so using 
            fetch, depending on wether JavaScript is enabled or not.
            -->
            <a {...href("/some-other-page")}> Go to some other page </a>
        `}
    />
    <span>
        When JavaScript is disabled, <InlineCode source="<a>" />
        will render as a traditional anchor, which by default will navigate the client away to <InlineCode
            source="/some-other-page"
        />.
    </span>
    <br />
    <span>
        On the other hand, when JavaScript is enabled, <InlineCode source="<a>" />
        will render to an anchor that overrides the default behavior of the browser. Instead of navigating away immediately,
        <a href={base("/some-other-page", { prefix })}>fetch</a> is used to retrieve the contents of
        <InlineCode source="/some-other-page" /> and update the current state and view based on the server’s response.
    </span>
    <br />
    <span>For example, given the following handler using <InlineCode source="view.RenderModeServer" /></span>
    <Code
        lang="go"
        source={`
            package welcome
            
            import (
                "main/lib/core/clients"
                "main/lib/core/send"
                "main/lib/core/views"
            )

            func View(client *clients.Client)  {
                send.View(client, views.View{          // Sends view.
                    Name: "Welcome",                   // Sets name of the view.
                    RenderMode: view.RenderModeServer, // Renders view only on the server.
                })
            }
        `}
    />
    <span>The view will ultimately render the following in the client’s browser.</span>
    <Code
        lang="html"
        source={`
            <a href="/some-other-page"> Go to some other page </a>
        `}
    />
    <span>But using <InlineCode source="view.RenderModeFull" /> will instead render</span>
    <Code
        lang="html"
        source={`
            <a href="/some-other-page" onclick="onclick(event)"> Go to some other page </a>
        `}
    />
    <br />
    <br />
    <Title text="Adaptive Forms" />
    <Code
        lang="svelte"
        source={`
            ${"<"}script lang="ts">
                import { action } from "$lib/scripts/core/action.ts"
            </script>
            <form {...action("/process")}>
                <input type="text" name="name" />
                <!--
                Defines a button, which when triggered will either
                directly submit the form, or do so using fetch(),
                depending on wether JavaScript is enabled or not.
                -->
                <button type="submit">Submit</button>
            </form>
        `}
    />
    <span>
        When JavaScript is disabled, <InlineCode source="<form>" />
        will render as a traditional form, which by default will submit to
        <InlineCode source="/process" /> and navigate the client away.
    </span>
    <br />
    <span>
        On the other hand, when JavaScript is enabled, <InlineCode source="<form>" /> will render to a form that overrides
        the default behavior of the browser. Instead of navigating away immediately,
        <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">
            <span>fetch</span>
        </a>
        is used to submit the form to
        <InlineCode source="/process" /> and update the current state and view based on the server’s response.
    </span>
    <br />
    <span>For example, given the following handler using <InlineCode source="view.RenderModeServer" />.</span>
    <Code
        lang="go"
        source={`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/send"
                "main/lib/core/views"
            )

            func View(client *clients.Client)  {
                send.View(client, views.View{          // Sends view.
                    Name: "Welcome",                   // Sets name of the view.
                    RenderMode: view.RenderModeServer, // Renders view only on the server.
                })
            }
        `}
    />
    <span>The view will ultimately render the following in the client’s browser.</span>
    <Code
        lang="html"
        source={`
            <form action="/process">
                <input type="text" name="name" />
                <button type="submit">Submit</button>
            </form>
        `}
    />
    <span>But using <InlineCode source="view.RenderModeFull" /> will instead render.</span>
    <Code
        lang="html"
        source={`
            <form action="/process" onsubmit="onsubmit(event)">
                <input type="text" name="name" />
                <button type="submit">Submit</button>
            </form>
        `}
    />
    <span>
        Where <InlineCode source="onsubmit(event)" /> takes care of submitting the form and fetching the new state and view
        from
        <InlineCode source="/process" />.
    </span>
    {#snippet rightSidebar({ body })}
        <RightSidebar
            {body}
            items={[
                { shift: 0, text: "Web Standards" },
                { shift: 0, text: "Adaptive Hyperlinks" },
                { shift: 0, text: "Adaptive Forms" },
            ]}
        />
    {/snippet}
    {#snippet footer()}
        <Footer
            previous={{ label: "Views", href: base("/views", { prefix }) }}
            next={{ label: "Cli", href: base("/cli", { prefix }) }}
        />
    {/snippet}
</Page>
