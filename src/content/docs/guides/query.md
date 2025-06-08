---
title: Query
---

Use `ReceiveQuery()` to retrieve query fields.

```go
//lib/handlers/hello.go
package handlers

import "github.com/razshare/frizzante/frz"

func Hello(c *frz.Connection) {
    name := c.ReceiveQuery("name")    // Retrieves field "name".
    c.SendMessage("Hello " + name)    // Sends text.
}
```