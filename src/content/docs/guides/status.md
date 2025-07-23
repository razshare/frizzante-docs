---
title: Status
---

Use `SendStatus()` to send the status of the response.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(con *connections.Connection) {
    con.SendStatus(404)           // Sends status 404.
    con.SendMessage("Not found.") // Sends text.
}
```

:::danger
The order in which data is sent to the client matters. <br/>
Read more about [order of operations](../order-of-operations).
:::