!!! note
    This project is aimed mainly at linux distributions.

Frizzante is a procedural, minimalistic and opinionated web server that uses Svelte to render web pages.

Web pages can be rendered in one of 3 modes

- Server mode<br/>
    Pages are rendered only on the server, resulting in a fully rendered html document from the server.
- Client mode<br/>
    Pages are rendered only on the client, which means the client receives a basic html document which then renders the document by loading a JavaScript application asynchronously.
- Full mode<br/>
    A combination of both "Server mode" and "Client mode".


Each mode has its advantages and disadvantages.


## Server mode

This mode is how the web was intended to work as a whole.

In this mode no actual JavaScript is executed on the client's browser, you will have to deal away with `fetch` or any similar apis.

Your new best friend is instead `<form>`.

Your application will truly be a traditional web site, loading documents from scratch with each interaction you engage with the server.

Not only that, search engines will have an easy time rendering your document, and thus indexing it correctly.

Most of your interactivity will have to come through either forms or or Css.

I say `most` because you can still inject external JavaScripts through svelte's special `<svelte:head>` tag.

```xml
<svelte:head>
    <script type="text/javascript" src="/some.js" />
    <script type="text/javascript" src="/some-other.js" />
</svelte:head>
```

## Client mode

This is how you basically build SPAs.

Your whole application consists in 1 JavaScript file, 1 Css file and 1 Html file, that's it.

In this mode, building interactive experiences is easier than in server mode.

Since the server simply renders a generic html document before the actual application loads, in this mode, search engines have a harder time indexing you web site.

## Full mode

It's just as it sounds, the the server both fully renders an html document and also serves a javaScript bundle, which once loaded, takes of the [Dom](https://en.wikipedia.org/wiki/Document_Object_Model).