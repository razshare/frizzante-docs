---
title: Query
---

Use `ReceiveQuery()` to retrieve query fields.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(con *connections.Connection) {
    name := con.ReceiveQuery("name") // Retrieves field "name".
    con.SendMessage("Hello " + name) // Sends text.
}
```