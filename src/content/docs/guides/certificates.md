---
title: Certificates
---

You can assign a certificate to your server using `.WithCertificate()`.

```go
//main.go
package main

import f "github.com/razshare/frizzante"

func main() {
    f.
		NewServer().
		WithCertificate("cert.pem", "key.pem").
		Start()
}
```

:::tip
You can quickly create a self-signed certificate for local development with 
```sh
make certificate
```

or you can interactively fill in the details of your certificate with 
```sh
make certificate-interactive
```
:::