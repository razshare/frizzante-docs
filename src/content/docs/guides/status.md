---
title: Status
---

Use `connections.SendStatus()` to send the status of the response.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(con *connections.Connection) {
    // Sends status 404.
    connections.SendStatus(con, 404)
    // Sends text.
    connections.SendMessage(con, "Resource not found.")
}
```

:::danger
The order in which data is sent to the client matters. <br/>
Read more about [order of operations](../order-of-operations).
:::