---
title: Header
---

Use `ReceiveHeader()` to retrieve header fields and `SendHeader()` to send them.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(connection *connections.Connection) {
    accept := connection.ReceiveHeader("Accept")  // Retrieves field "Accept".
    connection.SendHeader("Content-Type", accept) // Sends it back.
}
```

:::danger
The order in which data is sent to the client matters. <br/>
Read more about [order of operations](../order-of-operations).
:::
