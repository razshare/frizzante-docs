---
title: Json
---

Use `ReceiveJson()` to parse incoming content as json and `SendJson()` to send data as json when using `POST` and `PUT` http verbs.

```go
//lib/handlers/hello.go
package handlers

import "github.com/razshare/frizzante/frz"

type GreetingDetails struct {
    Name string `json:"name"`
}

func Hello(c *frz.Connection) {
    var value *GreetingDetails  // Prepares empty value.
    c.ReceiveJson(value)        // Parses the content into value.
    c.SendJson(value)           // Sends it back.
}
```