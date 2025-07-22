---
title: Header
---

Use `connections.ReceiveHeader()` to retrieve header fields and `connections.SendHeader()` to send them.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(con *connections.Connection) {

    // Retrieves field "Accept".
    accept := connections.ReceiveHeader(con, "Accept")
    // Sends it back.
    connections.SendHeader(con, "Content-Type", accept)
}
```

:::danger
The order in which data is sent to the client matters. <br/>
Read more about [order of operations](../order-of-operations).
:::
