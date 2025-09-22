---
title: Web Standards
---

You can use `href()` and `action()` in order to make your hyperlinks and forms adapt to the client's browser capabilities and/or the server's rendering configuration.

## Adaptive Hyperlinks

```svelte
//app/lib/views/Welcome.svelte
<script lang="ts">
    import { href } from "$lib/scripts/core/href.ts"
</script>

<a {...href("/some-other-page")}> Go to some other page </a> <!-- Defines a link, which when triggered will either 
                                                                  directly navigate to the given path, or do so 
                                                                  through an http request, depending on wether 
                                                                  JavaScript is enabled or not. -->
```

When JavaScript is disabled, `<a>` will render as a traditional anchor, which by default
will navigate the client away to `/some-other-page`.

On the other hand, when JavaScript is enabled, `<a>` will render to an anchor that overrides the default behavior of the browser.\
Instead of navigating away immediately, [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is used
to retrieve the contents of `/some-other-page` and update the current state and view based on the server's response.

For example, given the following handler using `view.RenderModeServer`

```go
//lib/routes/handlers/welcome/view.go
package welcome

import (
    "main/lib/core/client"
    "main/lib/core/send"
    "main/lib/core/view"
)

func View(client *client.Client)  {
    send.View(client, view.View{          // Sends view.
       Name: "Welcome",                   // Sets name of the view.
       RenderMode: view.RenderModeServer, // Renders view only on the server.
    })
}
```

The view will ultimately render the following in the client's browser

```html
<a href="/some-other-page"> Go to some other page </a>
```

But using `view.RenderModeFull` will instead render

```html
<a href="/some-other-page" onclick="onclick"> Go to some other page </a>
```

Where `onclick` takes care of fetching the new state and view from `/some-other-page`.

## Adaptive Forms

```svelte
//lib/views/Welcome.svelte
<script lang="ts">
    import { action } from "$lib/scripts/core/action.ts"
</script>

<form {...action("/process")}>            <!-- Defines a form. -->
    <input type="text" name="name" />     <!-- Defines a text field. -->
    <button type="submit">Submit</button> <!-- Defines a button, which when triggered will either 
                                               directly submit the form, or do so through an http request, 
                                               depending on wether JavaScript is enabled or not. -->
</form>
```

When JavaScript is disabled, `<form>` will render as a traditional form, which by default
will submit to `/process` and navigate the client away.

On the other hand, when JavaScript is enabled, `<form>` will render to a form that overrides the default behavior of the browser.\
Instead of navigating away immediately, [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is used
to submit the form to `/process` and update the current state and view based on the server's response.

For example, given the following handler using `view.RenderModeServer`

```go
//lib/routes/handlers/welcome/view.go
package welcome

import (
    "main/lib/core/client"
    "main/lib/core/send"
    "main/lib/core/view"
)

func View(client *client.Client)  {
    send.View(client, view.View{          // Sends view.
       Name: "Welcome",                   // Sets name of the view.
       RenderMode: view.RenderModeServer, // Renders view only on the server.
    })
}
```

The view will ultimately render the following in the client's browser

```html
<form action="/process">
    <input type="text" name="name" />
    <button type="submit">Submit</button>
</form>
```

But using `view.RenderModeFull` will instead render

```html
<form action="/process" onsubmit="onsubmit">
    <input type="text" name="name" />
    <button type="submit">Submit</button>
</form>
```

Where `onsubmit` takes care of submitting the form and fetching the new state and view from `/process`.

## Link Component

Frizzante provides a `<Link>` component that manages
pending requests and errors while navigating hyperlinks.

It is a replacement for your `<a>` elements.

In your project root directory, run the following

```sh
frizzante -glinks
```

This will add the `<Link>` component to your project.

This component passes down `pending` and `error` states through the `children` snippet.

```svelte
<script lang="ts">
    import Link from "$lib/components/links/Link.svelte"
</script>

<Link href="/some-path">                             <!-- Defines a link. -->
    {#snippet children({pending, error})}            <!-- Captures the link's pending and error states. -->
       {#if pending}                                 <!-- If the underlying http request is pending... -->
          <span>Loading...</span>                    <!-- ...renders a loading hint. -->
       {:else if error}                              <!-- If there's been some sort of error... -->
          <span>Something went wrong: {error}</span> <!-- ...renders the error. -->
       {:else}                                       <!-- If the link is idle... -->
          <span>Click me</span>                      <!-- ...renders the link's idle content. -->
       {/if}
    {/snippet}
</Link>
```

## Form Component

Frizzante provides a `<Form>` component that manages
pending requests and errors while submitting form.

It is a replacement for your `<form>` elements.

In your project root directory, run the following

```sh
frizzante -gforms
```

This will add the `<Form>` component to your project.

This component passes down `pending` and `error` states through the `children` snippet.

```svelte
<script lang="ts">
    import Form from "$lib/components/forms/Form.svelte"
</script>

<Form method="POST" action="/login">                           <!-- Defines a form. -->
    {#snippet children({pending, error})}                      <!-- Captures the forms's pending and error states. -->
       <input type="email" name="email">                       <!-- Defines an email field. -->
       <input type="password" name="password">                 <!-- Defines an password field. -->
       <button disabled={pending} type="submit">Login</button> <!-- Defines a button, which is disabled when the form request is pending. -->
       
       {#if error}                                             <!-- If there's been some sort of error... -->
          <span>Something went wrong: {error}</span>           <!-- ...renders the error. -->
       {/if}
    {/snippet}
</Form>
```
