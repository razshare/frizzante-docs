---
title: Query
---

Use `ReceiveQuery()` to retrieve query fields.

```go
//lib/handlers/hello.go
package handlers

import "github.com/razshare/frizzante/libcon"

func Hello(con *libcon.Connection) {
    name := con.ReceiveQuery("name") // Retrieves field "name".
    con.SendMessage("Hello " + name) // Sends text.
}
```