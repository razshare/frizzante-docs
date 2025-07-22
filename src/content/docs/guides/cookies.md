---
title: Cookies
---

Use `connections.ReceiveCookie()` to retrieve cookies and `connections.SendCookie()` to send them.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(con *connections.Connection) {
    // Retrieves cookie.
    cookie := connections.ReceiveCookie(con, "session-id")
    // Sends it back.
    connections.SendCookie(con, "session-id", cookie)
}
```