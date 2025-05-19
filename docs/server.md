You can create a server with `f.NewServer()` and start it with `server.Start()`.

`main.go`
```go
package main

import f "github.com/razshare/frizzante"

func main() {
	server := f.NewServer()
	server.Start()
}
```

You'll need to create an embedded file system with `go:embed`, including the `.dist/*/**` pattern and pass 
said embedded file system to the server.

This will make it so that your svelte assets get embedded directly into the final executable.

`main.go`
```go
package main

import (
	"embed"
	f "github.com/razshare/frizzante"
)

//go:embed .dist/*/**
var dist embed.FS

func main() {
	server := f.NewServer()
	server.WithEmbeddedFileSystem(&dist)
	server.Start()
}
```

By default, your server will be listening for requests at [http://127.0.0.1:8080](http://127.0.0.1:8080).

You can customize both your host name and port number with `server.WithEmbeddedFileSystem()` and `server.WithPortNumber()`.

`main.go`
```go
package main

import (
	"embed"
	f "github.com/razshare/frizzante"
)

//go:embed .dist/*/**
var dist embed.FS

func main() {

	server := f.NewServer()
	server.WithHostname("192.168.0.123")
	server.WithPort(8989)
	server.WithEmbeddedFileSystem(&dist)
	server.Start()
}
```