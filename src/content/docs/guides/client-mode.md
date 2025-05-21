---
title: Client Mode
---

In client mode no actual JavaScript code is executed on the server.

The server will simply serve an empty HTML document which will 
asynchronously load you application's JavaScript bundle, allowing it 
to take over the [DOM](https://en.wikipedia.org/wiki/Document_Object_Model) and finally render content to the screen.


This approach is also known as [Client Side Rendering (CSR) or SPAs](https://en.wikipedia.org/wiki/Single-page_application).


### Advantages

***Your application has superpowers.***

You can use svelte [transitions](https://svelte.dev/docs/svelte/svelte-transition) to animate between pages transitions,
you can use [reactive state](https://svelte.dev/docs/svelte/$state) to manage state locally,
you can even implement [Progressive Web Apps (PAWs) or SPA mode](https://en.wikipedia.org/wiki/Single-page_application).

Generally speaking, your application will look more impressive.

### Disadvantages

***You application has superpowers.***

Some may laugh at the paradox, but having all these tools means your applications does **more** stuff,
while also being **not synchronized** with the server.

You now have to manage state twice: on the server and also on the client.

:::note
This doesn't mean that **Client Mode** doesn't have its place, 
in fact the best way to implement a PWA is arguably through Client Mode.

It's just something to keep in mind.
:::