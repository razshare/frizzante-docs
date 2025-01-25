You can assign a certificate and a key for said certificate with `frz.ServerWithCertificateAndKey()`.

```go
frz.ServerWithCertificateAndKey(server, "cert.pem", "key.pem")
```

!!! note
    You can create a self-signed certificate for local development with `make certificate`, or interactively fill in the details of your certificate with `make certificate-interactive`.