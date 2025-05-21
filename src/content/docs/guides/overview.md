---
title: Overview
---

Frizzante is a procedural, minimalistic and opinionated web server that uses Svelte to render web pages.

Web pages can be rendered in one of 3 modes

- Server mode<br/>
    Pages are rendered only on the server, resulting in a fully rendered html document from the server.
- Client mode<br/>
    Pages are rendered only on the client, which means the client receives a basic html document which then renders the document by loading a JavaScript application asynchronously.
- Full mode<br/>
    A combination of both "Server mode" and "Client mode".


Each mode has its advantages and disadvantages.

:::note
Frizzante is aimed mainly at linux distributions.
:::
