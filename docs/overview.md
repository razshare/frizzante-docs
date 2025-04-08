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

In this mode no actual JavaScript is executed on the client's browser, you will have to deal away with `fetch` or any similar apis.

Your new best friend is instead `<form>`.

Your application will be a traditional web site, loading documents from scratch with almost every interaction, 
making it easier to reason about state changes.

On top of that, search engines will have an easy time rendering your document, and thus indexing it correctly.

Most of the interactivity will have to come through either forms or Css.

That being said, I say `most` because you can still inject external 
JavaScript files through svelte's special `<svelte:head>` tag.

```xml
<svelte:head>
    <script type="text/javascript" src="/some.js" />
    <script type="text/javascript" src="/some-other.js" />
</svelte:head>
```

## Client mode

In this mode you can build [SPA](https://it.wikipedia.org/wiki/Single-page_application)s.

Your server will serve a shell html template, which in turn will asynchronously load your JavaScript bundle and render your client application.

## Full mode

It's just as it sounds, in this mode the the server both fully renders an html document and also serves a javaScript bundle, which once loaded, takes over the [Dom](https://en.wikipedia.org/wiki/Document_Object_Model).

Although more powerful and versatile, this mode adds some complexity to your application.