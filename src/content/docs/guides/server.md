---
title: Server
---

You can create server using `NewServer()`.

```go
// config/server.go

package config

import f "github.com/razshare/frizzante"

var Server = f.NewServer()

```

In order to properly render [views](/guides/pages#views),
you will need to embed the `.dist` directory from your `config` package.

The api is fluent, so you can chain modifiers.

```go
//config/server.go

package config

import (
	"embed"
	f "github.com/razshare/frizzante"
)

//go:embed .dist/*/**
var dist embed.FS
var Server = f.NewServer().WithEfs(dist)

```

Then `.Start()` the server.

```go
//main.go

package main

import "main/lib/config"

func main() {
	config.Server.Start()
}

```

:::note
The starter template is configured out of the box.
:::