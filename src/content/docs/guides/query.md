---
title: Query
---

Use `connections.ReceiveQuery()` to retrieve query fields.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(con *connections.Connection) {
    // Retrieves field "name".
    name := connections.ReceiveQuery(con, "name")
    // Sends text.
    connections.SendMessage(con, "Hello " + name)
}
```