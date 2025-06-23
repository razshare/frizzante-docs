---
title: Cookies
---

Use `ReceiveCookie()` to retrieve cookies and `SendCookie()` to send them.

```go
//lib/handlers/hello.go
package handlers

import "github.com/razshare/frizzante/connections"

func Hello(con *connections.Connection) {
    cookie := con.ReceiveCookie("session-id") // Retrieves cookie.
    con.SendCookie("session-id", cookie)      // Sends it back.
}
```