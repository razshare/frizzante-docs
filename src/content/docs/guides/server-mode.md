---
title: Server Mode
---

In server mode no actual JavaScript code is executed on the client's browser.

The server will do all the heavy lifting by rendering the content of the HTML document in advance
and serve it directly to the client's browser.

You will have to deal away with `fetch` or any similar apis.

Your new best friend is `<form>`.

:::tip
Although your application won't serve a JavaScript bundle directly,
you can still use the `<svelte:head>` special
tag in order to inject scripts.
```svelte
<svelte:head>
    <script type="text/javascript" src="https://some.cdn/some.js" />
</svelte:head>
```
:::