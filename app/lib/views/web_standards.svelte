<script lang="ts">
    import Code from "$lib/components/code.svelte"
    import Footer from "$lib/components/footer.svelte"
    import InlineCode from "$lib/components/inline_code.svelte"
    import Page from "$lib/components/page.svelte"
    import RightSidebar from "$lib/components/right_sidebar.svelte"
    import Title from "$lib/components/title.svelte"
</script>

<Page title="Web Standards">
    <Title text="Web Standards" />
    <span>
        You can use <InlineCode source="href()" /> and <InlineCode source="action()" />
        in order to make your hyperlinks and forms adapt to the client’s browser capabilities and/or the server’s rendering
        configuration.
    </span>
    <Title text="Adaptive Hyperlinks" />
    <Code
        lang="svelte"
        source={`
            ${"<"}script lang="ts">
                import { href } from "$lib/scripts/core/href.ts"
            </script>

            <a {...href("/some-other-page")}> Go to some other page </a> <!-- Defines a link, which when triggered will either
                                                                              directly navigate to the given path, or do so using 
                                                                              fetch, depending on wether JavaScript is enabled or not. -->
        `}
    />
    <span>
        When JavaScript is disabled, <InlineCode source="<a>" />
        will render as a traditional anchor, which by default will navigate the client away to /some-other-page
    </span>
    <br />
    <span>
        On the other hand, when JavaScript is enabled, <InlineCode source="<a>" />
        will render to an anchor that overrides the default behavior of the browser. Instead of navigating away immediately,
        <a href="/some-other-page">fetch</a> is used to retrieve the contents of
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
    <Title text="Adaptive Forms" />
    <Code
        lang="go"
        source={`
            ${"<"}script lang="ts">
                import { action } from "$lib/scripts/core/action.ts"
            </script>

            <form {...action("/process")}>            <!-- Defines a form. -->
                <input type="text" name="name" />     <!-- Defines a text field. -->
                <button type="submit">Submit</button> <!-- Defines a button, which when triggered will either
                                                           directly submit the form, or do so using fetch(),
                                                           depending on wether JavaScript is enabled or not. -->
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
    <Title text="Link Component" />
    <span>
        Frizzante provides a <InlineCode source="<Link>" />
        component that captures pending and error states while navigating hyperlinks.
    </span>
    <br />
    <span>It is a replacement for your <InlineCode source="<a>" /> elements.</span>
    <br />
    <span>In your project root directory, run the following</span>
    <Code lang="shell" source="frizzante -glinks" />
    <span>This will add the <InlineCode source="<Link>" /> component to your project.</span>
    <br />
    <span>
        This component passes down <InlineCode source="pending" /> and
        <InlineCode source="error" /> states through the
        <InlineCode source="children" /> snippet.
    </span>
    <Code
        lang="svelte"
        source={`
            ${"<"}script lang="ts">
                import Link from "$lib/components/links/link.svelte"
            </script>

            <Link href="/some-path">                               <!-- Defines a link. -->
                {#snippet children({pending, error})}              <!-- Captures the link's pending and error states. -->
                    {#if pending}                                  <!-- If the underlying http request is pending... -->
                        <span>Loading...</span>                    <!-- ...renders a loading hint. -->
                    {:else if error}                               <!-- If there's been some sort of error... -->
                        <span>Something went wrong: {error}</span> <!-- ...renders the error. -->
                    {:else}                                        <!-- If the link is idle... -->
                        <span>Click me</span>                      <!-- ...renders the link's idle content. -->
                    {/if}
                {/snippet}
            </Link>
        `}
    />
    <Title text="Form Component" />
    <span>
        Frizzante provides a <InlineCode source="<Form>" />
        component that captures pending and error states while submitting forms.
    </span>
    <br />
    <span>It is a replacement for your <InlineCode source="<form>" /> elements.</span>
    <br />
    <span>In your project root directory, run the following</span>
    <Code
        lang="shell"
        source={`
            frizzante -gforms
        `}
    />
    <span>This will add the <InlineCode source="<Form>" /> component to your project.</span>
    <br />
    <span>This component passes down pending and error states through the children snippet.</span>
    <Code
        lang="svelte"
        source={`
            ${"<"}script lang="ts">
                import Form from "$lib/components/forms/form.svelte"
            </script>

            <Form method="POST" action="/login">                            <!-- Defines a form. -->
                {#snippet children({pending, error})}                       <!-- Captures the forms's pending and error states. -->
                    <input type="email" name="email">                       <!-- Defines an email field. -->
                    <input type="password" name="password">                 <!-- Defines an password field. -->
                    <button disabled={pending} type="submit">Login</button> <!-- Defines a button, which is disabled when the form request is pending. -->

                    {#if error}                                             <!-- If there's been some sort of error... -->
                        <span>Something went wrong: {error}</span>          <!-- ...renders the error. -->
                    {/if}
                {/snippet}
            </Form>
        `}
    />
    {#snippet rightSidebar()}
        <RightSidebar
            items={[
                { shift: 0, text: "Web Standards" },
                { shift: 0, text: "Adaptive Hyperlinks" },
                { shift: 0, text: "Adaptive Forms" },
                { shift: 0, text: "Link Component" },
                { shift: 0, text: "Form Component" },
            ]}
        />
    {/snippet}
    {#snippet footer()}
        <Footer previous={{ label: "Views", href: "/views" }} next={{ label: "Cli", href: "/cli" }} />
    {/snippet}
</Page>
