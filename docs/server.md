You can create a server with `frz.CreateServer()` and start it with `frz.ServerStart()`.

```go
import frz "github.com/razshare/frizzante"

func main() {
	server := frz.ServerCreate()
	frz.ServerStart(server)
}
```

You'll need to create an embedded file system with `go:embed`, including the `www/dist/*/**` pattern and pass 
said embedded file system to the server.

This will make it so that your svelte assets get embedded directly into the final executable.

```go
import "embed"
import frz "github.com/razshare/frizzante"

//go:embed www/dist/*/**
var efs embed.FS

func main() {
	server := frz.ServerCreate()
	frz.ServerWithEmbeddedFileSystem(server, efs)
	frz.ServerStart(server)
}
```

By default, your server will be listening for requests at [http://127.0.0.1:8080](http://127.0.0.1:8080).

You can customize both your host name and port number with `frz.ServerWithHostname()` and `frz.ServerWithPortNumber()`.

```go
import "embed"
import frz "github.com/razshare/frizzante"

//go:embed www/dist/*/**
var efs embed.FS

func main() {
	server := frz.ServerCreate()
	frz.ServerWithPort(server, 8989)
	frz.ServerWithHostName(server, "192.168.0.123")
	frz.ServerWithEmbeddedFileSystem(server, efs)
	frz.ServerStart(server)
}
```