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

<a {...href("/some-other-page")}> Go to some other page </a>
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
	con.SendView(views.View{
		Name: "Welcome",
		RenderMode: views.RenderModeServer,
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
import type { View } from "$frizzante/types.ts"
import { swaps } from "$frizzante/scripts/swaps.ts"

async function onclick(e: MouseEvent) {
    e.preventDefault()
    const view = getContext("view") as View<unknown>
    await swaps.swap(view).withPath(path).play(true)
    return false
}
```

Which swaps the current state and view for new ones served by `/some-other-page`.

## Adaptive Forms

```svelte
//lib/views/Hello.svelte
<script lang="ts">
    import { action } from "$frizzante/scripts/action.ts"
</script>

<form {...action("/process")}>
    <input type="text" name="name" />
    <button type="submit">Submit</button>
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
	con.SendView(views.View{
		Name: "Welcome",
		RenderMode: views.RenderModeServer,
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
import type { View } from "$frizzante/types.ts"
import { swaps } from "$frizzante/scripts/swaps.ts"

async function onsubmit(e: Event) {
    e.preventDefault()
    const view = getContext("view") as View<unknown>
    const form = e.target as HTMLFormElement
    const body = new FormData(form)
    const target = e.target as HTMLFormElement

    await swaps
        .swap(view)
        .withMethod(target.method)
        .withPath(path)
        .withBody(body)
        .play(true)
        .then(function done() {
            form.reset()
        })
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

<Link>
    {#snippet children({pending, error})}
        {#if pending}
            <span>Loading...</span>
        {:else if error}
            <span>Something went wrong: {error}</span>
        {:else}
            <span>Click me</span>
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

<From method="POST" action="/login">
    {#snippet children({pending, error})}
        <input type="email" name="email">
        <input type="password" name="password">
        <button disabled={pending} type="submit">Login</button>
        
        {#if error}
            <span>Something went wrong: {error}</span>
        {/if}
    {/snippet}
</Form>
```
