---
title: Server Mode
---

In server mode no actual JavaScript code is executed on the client's browser.

The serer will do all the heavy lifting by rendering the content of the HTML document in advance
and serve it directly to the client's browser.

This approach is also known as [Server Side Rendering (SSR)](https://en.wikipedia.org/wiki/Server-side_scripting#Server-side_rendering)

You will have to deal away with `fetch` or any similar apis.

Your new best friend is `<form>`.

### Advantages

The most obvious advantage of SSR is that
search engines will have an easier time rendering your document,
and thus they can index it faster.

However, another advantage is that your application will be
easier to reason about because every interaction with the server is 100% synchronized
with the server state.

:::note
Unless you fiddle around too much with cookies :)
:::

### Disadvantages
Since you cannot use client side scripts, interactivity and shiny effects will be somewhat limited.

:::tip
You can still use the `<svelte:head>` special
tag in order to inject scripts.
```svelte
<svelte:head>
    <script type="text/javascript" src="https://some.cdn/some.js" />
</svelte:head>
```
:::