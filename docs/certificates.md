You can assign a certificate and a key for said certificate with `f.ServerWithCertificateAndKey()`.

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
	// Create.
	server := f.NewServer()
	notifier := f.NewNotifier()

	// Configure.
	server.WithPort(8080)
	server.WithNotifier(notifier)
	server.WithHostName("127.0.0.1")
	server.WithEmbeddedFileSystem(&dist)

    // Setup certificate.
    server.WithCertificateAndKey("cert.pem", "key.pem")

	//Start.
	server.Start()
}
```

!!! note
    You can create a self-signed certificate for local development with `make certificate`, or interactively fill in the details of your certificate with `make certificate-interactive`.