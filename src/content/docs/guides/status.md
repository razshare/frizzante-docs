---
title: Status
---

Use `SendStatus()` to send the status of the response.

```go
//lib/handlers/hello.go
package handlers

import "github.com/razshare/frizzante/libcon"

func Hello(con *libcon.Connection) {
    con.SendStatus(404)                    // Sends status 404.
    con.SendMessage("Resource not found.") // Sends text.
}
```

:::danger
The order in which data is sent to the client matters. <br/>
Read more about [order of operations](../order-of-operations).
:::