---
title: Path
---

Request handlers can define dynamic fields within the **pattern** using `{}` syntax.


```go
routes.Route{Pattern: "GET /{name}", Handler: handlers.Welcome}
```

Path fields can then be retrieved with `ReceivePath()`.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(connection *connections.Connection) {
    name := connection.ReceivePath("name")  // Retrieves field "name".
    connection.SendMessage("Hello " + name) // Sends text.
}
```