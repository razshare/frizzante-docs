---
title: Start server
---

Use `servers.New()` to create a new server then `Start()` it.

```go
//main.go
package main

import "github.com/razshare/frizzante/servers"

func main() {
    server := servers.New() // Creates a server.
    server.Start()          // Starts the server.
}
```