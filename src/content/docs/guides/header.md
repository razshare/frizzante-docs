---
title: Header
---

Use `ReceiveHeader()` to retrieve header fields and `SendHeader()` to send them.

```go
//lib/handlers/hello.go
package handlers

import "github.com/razshare/frizzante/frz"

func Hello(c *frz.Connection) {
    ctype := c.ReceiveHeader("Accept")      // Retrieves field "Accept".
    c.SendHeader("Content-Type", ctype)     // Sends it back.
}
```

:::danger
The order in which data is sent to the client matters. <br/>
Read more about [order of operations](../order-of-operations).
:::
