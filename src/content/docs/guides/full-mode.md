---
title: Full Mode
---

In full mode both previous strategies are applied.

The server will serve a fully rendered HTML document to the client.

This document will asynchronously load a JavaScript bundle that will take over the
DOM, ***giving your application superpowers***.

### Advantages

Most of your userbase will enjoy an interactive experience, while
users that don't have JavaScript enabled can still use the application
by simply leveraging web standards.


Although this might sound scary at first, thanks to some Frizzante
primitives (like [actions]() and [hrefs]()), you can abstract away all details of client state management,
and focus on managing your state completely on the server, while still providing the same benefits of an SPA.

### Disadvantages

Frizzante's primitives are opinionated.

You might get locked into an opinionated way of doing things that complicate
even easy things, like hyperlinks and http requests.

---

It's important to figure out beforehand what type of application you're trying to build.

Are you trying to build a chatbot? [Client Mode](/frizzante-docs/guides/client-mode) is probably the best choice for that.

Are you trying to build an E-Commerce website? Cookies and anonymous sessions can be useful to onboard users without using an account, so [Server Mode](/frizzante-docs/guides/server-mode) or [Full Mode](/frizzante-docs/guides/full-mode) are probably best suited for that. 