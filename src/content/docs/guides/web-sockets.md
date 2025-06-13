---
title: Web Sockets
---

Use `SendWsUpgrade()` to upgrade the connection to web sockets.

```go
//lib/handlers/hello.go
package handlers

import (
    "github.com/razshare/frizzante/frz"
    "time"
)

func Hello(c *frz.Connection) {
    alive := c.IsAlive()                // Track request status.
    c.SendWsUpgrade()                   // Send ws upgrade.
    for *alive {                        // Loop until request gets cancelled.
        name := c.ReceiveMessage()      // Receive message.
        c.SendMessage("hello "+name)    // Send text.
        time.Sleep(time.Second)         // Sleep for 1 second.
    }
}
```