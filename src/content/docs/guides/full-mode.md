---
title: Full Mode
---

In full mode the serer will render the content of the HTML document in advance
and serve it directly to the client's browser and also injects a script that asynchronously
loads your application JavaScript bundle which ultimately takes over the [DOM](https://en.wikipedia.org/wiki/Document_Object_Model) and finally render content to the screen.

It is in essence a combination of [Server Mode](../server-mode) and [Client Mode](../client-mode)