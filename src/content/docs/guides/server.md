---
title: Server
---

You can create and start a web server using `NewServer()` followed by `.Start()`

```go
// main.go
package main

import f "github.com/razshare/frizzante"

func main() {
    f.
    NewServer().
    Start()
}
```

And using a custom notifier ([as mentioned previously](/guides/notifiers))