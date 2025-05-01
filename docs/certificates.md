You can assign a certificate and a key for said certificate with `f.ServerWithCertificateAndKey()`.

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
	server := f.ServerCreate()
	notifier := f.NotifierCreate()

	// Setup.
	f.ServerWithPort(server, 8080)
	f.ServerWithHostName(server, "127.0.0.1")
	f.ServerWithEmbeddedFileSystem(server, dist)
	f.ServerWithNotifier(server, notifier)

    // Setup certificate.
    f.ServerWithCertificateAndKey(server, "cert.pem", "key.pem")

	// Start.
	f.ServerStart(server)
}
```

!!! note
    You can create a self-signed certificate for local development with `make certificate`, or interactively fill in the details of your certificate with `make certificate-interactive`.