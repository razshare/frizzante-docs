---
title: Status
---

Use `SendStatus()` to send the status of the response.

```go
//lib/handlers/hello.go
package handlers

import "github.com/razshare/frizzante/frz"

func Hello(c *frz.Connection) {
    c.SendStatus(404)                             // Sends status 404.
    c.SendMessage("Resource not found.")   // Sends text.
}
```

:::danger
The order in which data is sent to the client matters. <br/>
Read more about [order of operations](../order-of-operations).
:::