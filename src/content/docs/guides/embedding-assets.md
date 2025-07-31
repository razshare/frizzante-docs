---
title: Embedding Assets
---

You can embed assets into your binary so that you don't have to carry around your `app/dist` directory.

Use the server's `Efs` property to set the embedded file system.

```go
package main

import (
    "embed"
    "github.com/razshare/frizzante/servers"
)

//go:embed app/dist
var efs embed.FS           // Creates an embedded file system
                           // from the "app/dist" directory.
                           // This directory contains your
                           // JavaScript bundles.

var server = servers.New() // Creates server.

func main() {
    server.Efs = efs       // Sets the embedded file system.
                           // SendFileOrElse() will take this 
                           // file system into account.

    server.Start()         // Starts server.
}
```

Not only serving a file with `SendFileOrElse()` also takes into account the embedded file system, but
your views' bundles are also included in the embedded file system, which makes your final binary
completely standalone.

:::tip
The **host** file system **has precedence** over the embedded file system.

This means you can add a custom `app/dist` directory nearby your binary in order to serve
files that were not originally embedded into the binary.
:::
