---
title: Cookies
---

Use `ReceiveCookie()` to retrieve cookies and `SendCookie()` to send them.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(connection *connections.Connection) {
    id := connection.ReceiveCookie("session-id") // Retrieves cookie.
    connection.SendCookie("session-id", id)      // Sends it back.
}
```