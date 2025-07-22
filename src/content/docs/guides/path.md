---
title: Path
---

Request handlers can define dynamic fields within the **pattern** using `{}` syntax.


```go
routes.Route{Pattern: "GET /{name}", Handler: handlers.Welcome}
```

Path fields can then be retrieved with `connections.ReceivePath()`.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(con *connections.Connection) {
    // Retrieves field "name".
    name := connections.ReceivePath(con, "name")
    // Sends text.
    connections.SendMessage(con, "Hello " + name)
}
```