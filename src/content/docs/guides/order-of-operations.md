---
title: Order of Operations
---

Order of operations matters when sending data to the client.

**Status codes** and **headers** cannot be modified after sending out content.

:::danger
For example, sending the status code with `SendStatus()` **after** you've already sent content
with `SendMessage()` is not allowed.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(connection *connections.Connection) {
    connection.SendMessage("Hello.") // Sends text (Succeeds).
    connection.SendStatus(404)       // Sends status (Fails).
}
```

`connections.SendStatus(404)` will fail and the user will receive status `200` instead of `404`.

```http
HTTP/1.1 200 OK
Date: Sun, 25 May 2025 02:00:37 GMT
Content-Length: 6
Content-Type: text/plain; charset=utf-8

Hello.
```

The failure is notified to the server notifier.

Assuming you're using the default notifier, you'll see an error of sorts in your **console**

```sh
listening for requests at http://127.0.0.1:8080
status is locked
```

`status is locked`, meaning the status code has already been sent to the client and there's nothing you can do about it.
:::