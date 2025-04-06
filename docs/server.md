You can create a server with `f.ServerCreate()` and start it with `f.ServerStart()`.

```go
package main

import f "github.com/razshare/frizzante"

func main() {
	srv := f.ServerCreate()
	f.ServerStart(srv)
}
```

You'll need to create an embedded file system with `go:embed`, including the `.dist/*/**` pattern and pass 
said embedded file system to the server.

This will make it so that your svelte assets get embedded directly into the final executable.

```go
package main

import (
	"embed"
	f "github.com/razshare/frizzante"
)

//go:embed .dist/*/**
var dist embed.FS

func main() {
	srv := f.ServerCreate()
	f.ServerWithEmbeddedFileSystem(srv, dist)
	f.ServerStart(srv)
}
```

By default, your server will be listening for requests at [http://127.0.0.1:8080](http://127.0.0.1:8080).

You can customize both your host name and port number with `f.ServerWithHostname()` and `f.ServerWithPortNumber()`.

```go
package main

import (
	"embed"
	f "github.com/razshare/frizzante"
)

//go:embed .dist/*/**
var dist embed.FS

func main() {
	srv := f.ServerCreate()
	f.ServerWithPort(srv, 8989)
	f.ServerWithHostName(srv, "192.168.0.123")
	f.ServerWithEmbeddedFileSystem(srv, dist)
	f.ServerStart(srv)
}
```