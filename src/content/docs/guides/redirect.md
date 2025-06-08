---
title: Redirect
---

Use `SendRedirect()` to redirect to a different location.

```go
//lib/handlers/hello.go
package handlers

import "github.com/razshare/frizzante/frz"

func Hello(c *frz.Connection) {
    c.SendRedirect("/login", 302)
}
```