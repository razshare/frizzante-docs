---
title: Header
---

Use `ReceiveHeader()` to retrieve header fields and `SendHeader()` to send them.

```go
//lib/handlers/hello.go
package handlers

import "github.com/razshare/frizzante/libcon"

func Hello(con *libcon.Connection) {
    accept := con.ReceiveHeader("Accept")  // Retrieves field "Accept".
    con.SendHeader("Content-Type", accept) // Sends it back.
}
```

:::danger
The order in which data is sent to the client matters. <br/>
Read more about [order of operations](../order-of-operations).
:::
