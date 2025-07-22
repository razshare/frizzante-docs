---
title: Start server
---

Use `servers.New()` to create a server and `servers.Start()` to start it.

```go
//main.go
package main

import "github.com/razshare/frizzante/web"

func main() {
    // Creates a server and starts it.
    servers.Start(servers.New())
}
```