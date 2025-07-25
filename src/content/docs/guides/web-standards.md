---
title: Web Standards
---

You can use `href()` and `action()` in order to make your hyperlinks and forms adapt to the user's browser capabilities and/or the server's rendering configuration.

## Adaptive Hyperlinks

```svelte
//app/lib/views/Hello.svelte
<script lang="ts">
    import { href } from "$frizzante/scripts/href.ts"
</script>

<a {...href("/some-other-page")}> Go to some other page </a> <!-- Defines a link, which when triggered will either 
                                                                  directly navigate to the given path, or do so 
                                                                  through an http request, depending on wether 
                                                                  JavaScript is enabled or not. -->
```

When JavaScript is disabled, `<a>` will render as a traditional anchor, which by default
will navigate the user away to `/some-other-page`.

On the other hand, when JavaScript is enabled, `<a>` will render to an anchor that overrides the default behavior of the browser.\
Instead of navigating away immediately, [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is used
to retrieve the contents of `/some-other-page` and update the current state and view based on the server's response.

For example, given the following handler using `views.RenderModeServer`

```go
//lib/handlers/welcome.go
package handlers

import (
    "github.com/razshare/frizzante/connections"
    "github.com/razshare/frizzante/views"
)

func Welcome(con *connections.Connection)  {
    con.SendView(views.View{                // Sends a view.
        Name: "Welcome",                    // Sets the view's name.
        RenderMode: views.RenderModeServer, // Renders the view only on the server, 
                                            // meaning the view won't contain any JavaScript code.
    })
}
```

The view will ultimately render the following in the user's browser

```html
<a href="/some-other-page"> Go to some other page </a>
```

But using `views.RenderModeFull` will instead render

```html
<a href="/some-other-page" onclick="onclick"> Go to some other page </a>
```

Where `onclick` is defined as 

```ts
//app/frizzante/core/scripts/href.ts
import { getContext } from "svelte"
import type { View } from "$frizzante/core/types.ts"
import { route } from "$frizzante/core/scripts/route.ts"
import { swaps } from "$frizzante/core/scripts/swaps.ts"

export function href(path = ""): {
    href: string
    onclick: (event: MouseEvent) => Promise<boolean>
} {
    const view = getContext("view") as View<never>
    route(view)
    return {
        href: path,
        async onclick(event: MouseEvent) {
            event.preventDefault()
            await swaps
                .swap(view)       // Sets a reference to the current view state (which is reactive).
                .withPath(path)   // Defines the path where to send the underlying http request.
                .withUpdate(true) // Defines wether or not to update the application state and url.
                .play()           // Sends the http request, grabs the result, update the view 
                                  // and also updates state and url if possible.
            return false
        },
    }
}

```

Which swaps the current state and view for new ones served by `/some-other-page`.

## Adaptive Forms

```svelte
//lib/views/Hello.svelte
<script lang="ts">
    import { action } from "$frizzante/scripts/action.ts"
</script>

<form {...action("/process")}>            <!-- Defines a form. -->
    <input type="text" name="name" />     <!-- Defines a text field. -->
    <button type="submit">Submit</button> <!-- Defines a button, which when triggered will either 
                                               directly submit the form, or do so through an http request, 
                                               depending on wether JavaScript is enabled or not. -->
</form>
```

When JavaScript is disabled, `<form>` will render as a traditional form, which by default
will submit to `/process` and navigate the user away.

On the other hand, when JavaScript is enabled, `<form>` will render to a form that overrides the default behavior of the browser.\
Instead of navigating away immediately, [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is used
to submit the form to `/process` and update the current state and view based on the server's response.

For example, given the following handler using `views.RenderModeServer`

```go
//lib/handlers/welcome.go
package handlers

import (
    "github.com/razshare/frizzante/connections"
    "github.com/razshare/frizzante/views"
)

func Welcome(con *connections.Connection)  {
    con.SendView(views.View{                // Sends a view.
        Name: "Welcome",                    // Sets the name of the view.
        RenderMode: views.RenderModeServer, // Render the view only on the server.
    })
}
```

The view will ultimately render the following in the user's browser

```html
<form action="/process">
    <input type="text" name="name" />
    <button type="submit">Submit</button>
</form>
```

But using `views.RenderModeFull` will instead render

```html
<form action="/process" onsubmit="onsubmit">
    <input type="text" name="name" />
    <button type="submit">Submit</button>
</form>
```

Where `onsubmit` is defined as 

```ts
//app/frizzante/core/scripts/action.ts
import { getContext } from "svelte"
import type { View } from "$frizzante/core/types.ts"
import { route } from "$frizzante/core/scripts/route.ts"
import { swaps } from "$frizzante/core/scripts/swaps.ts"

export function action(path = ""): {
    action: string
    onsubmit: (event: Event) => Promise<void>
} {
    const view = getContext("view") as View<never>
    route(view)
    return {
        action: path,
        async onsubmit(event: Event) {
            event.preventDefault()
            const form = event.target as HTMLFormElement
            const body = new FormData(form)
            const target = event.target as HTMLFormElement

            await swaps
                .swap(view)                // Sets a reference to the current view state (which is reactive).
                .withMethod(target.method) // Sets the method for the underlying http request.
                .withPath(path)            // Sets the path where to send the http request.
                .withBody(body)            // Sets the body for the http request.
                .withUpdate(true)          // Defines wether or not to update the application state and url.
                .play()                    // Sends the http request, grabs the result, update the view 
                                           // and application's state and url (if possible, as defined by withUpdate()).
                .then(function done() {
                    form.reset()           // Resets the form in order to mimic the standard form behavior.
                })
        },
    }
}

```

Which swaps the current state and view for new ones served by `/process`.


## Link Component

Frizzante provides a builtin `<Link>` component that manages
pending requests and errors while navigating hyperlinks.

It is a replacement for your `<a>` elements.

In your project root directory, run the following

```sh
frizzante -dlink
```

This will add the `<Link>` component to your project.

This component passes down `pending` and `error` states through the `children` snippet.

```svelte
<script lang="ts">
    import Link from "$frizzante/links/components/Link.svelte"
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
```

## Form Component

Frizzante provides a builtin `<Form>` component that manages
pending requests and errors while submitting form.

It is a replacement for your `<form>` elements.

In your project root directory, run the following

```sh
frizzante -dform
```

This will add the `<Form>` component to your project.

This component passes down `pending` and `error` states through the `children` snippet.

```svelte
<script lang="ts">
    import Form from "$frizzante/forms/components/Form.svelte"
</script>

<From method="POST" action="/login">                            <!-- Defines a form. -->
    {#snippet children({pending, error})}                       <!-- Captures the forms's pending and error states. -->
        <input type="email" name="email">                       <!-- Defines an email field. -->
        <input type="password" name="password">                 <!-- Defines an password field. -->
        <button disabled={pending} type="submit">Login</button> <!-- Defines a button, which is disabled when the form request is pending. -->
        
        {#if error}                                             <!-- If there's been some sort of error... -->
            <span>Something went wrong: {error}</span>          <!-- ...renders the error. -->
        {/if}
    {/snippet}
</Form>
```
