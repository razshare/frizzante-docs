You can create a server with `f.NewServer()` and start it with `server.Start()`.

`main.go`
```go
package main

import f "github.com/razshare/frizzante"

func main() {
	f.NewServer().Start()
}
```

By default, your server will be listening for requests at [http://127.0.0.1:8080](http://127.0.0.1:8080).