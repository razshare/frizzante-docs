---
title: Cookies
---

Use `ReceiveCookie()` to retrieve cookies and `SendCookie()` to send them.

```go
//lib/handlers/hello.go
package handlers

import "github.com/razshare/frizzante/frz"

func Hello(c *frz.Connection) {
    cookie := c.ReceiveCookie("session-id") // Retrieves cookie.
    c.SendCookie("session-id", cookie)      // Sends it back.
}
```