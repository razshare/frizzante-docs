---
title: Query
---

Use `ReceiveQuery()` to retrieve query fields.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(connection *connections.Connection) {
    name := connection.ReceiveQuery("name") // Retrieves field "name".
    connection.SendMessage("Hello " + name) // Sends text.
}
```