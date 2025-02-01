You can automatically upgrade http requests to web sockets with `frz.ServerWithWebSocketHandler()`.

```go
frz.ServerWithWebSocketHandler(server, "GET /", 
    func(request *frz.Request, response *frz.Response) {
        for {
            frz.SendEcho(response, "hello")
            message := frz.ReceiveMessage(request)
            fmt.Printf("Received message `%s`.\n", message)
        }
    },
)
```

!!! note
    Web socket patterns must always use the `GET` verb.

!!! note
    Returning from the callback function will automatically close the web socket connection.<br/>
    In the example above, exiting the `for` loop will automatically close the web socket connection.

All web socket handlers are compatible with many of the same functions used by traditional request handlers.

However, many other functions that `send data to the client` have little compatibility with web sockets because of the nature of the protocol itself.

!!! note
    For example, you won't be able to send a status code to the client in your websocket loop because because by the time your callback function is executed, the underlying web socket handshake has already terminated and the status code has already been sent.

The following is a compatibility table between web socket and request handlers.

| Function | Compatible with request handlers | Compatible with web socket handlers |
|----------|----------------------------------|-----------------------------|
| [ReceivePath](https://pkg.go.dev/github.com/razshare/frizzante#ReceivePath) | Yes | Yes |
| [ReceiveQuery](https://pkg.go.dev/github.com/razshare/frizzante#ReceiveQuery) | Yes | Yes |
| [ReceiveHeader](https://pkg.go.dev/github.com/razshare/frizzante#ReceiveHeader) | Yes | Yes |
| [ReceiveCookie](https://pkg.go.dev/github.com/razshare/frizzante#ReceiveCookie) | Yes | Yes |
| [ReceiveContentType](https://pkg.go.dev/github.com/razshare/frizzante#ReceiveContentType) | Yes | Yes |
| [ReceiveMessage](https://pkg.go.dev/github.com/razshare/frizzante#ReceiveMessage) | Yes | Yes |
| [ReceiveJson](https://pkg.go.dev/github.com/razshare/frizzante#ReceiveJson) | Yes | Yes |
| [ReceiveForm](https://pkg.go.dev/github.com/razshare/frizzante#ReceiveForm) | Yes | No |
| [VerifyContentType](https://pkg.go.dev/github.com/razshare/frizzante#VerifyContentType) | Yes | Yes |
| [SendRedirect](https://pkg.go.dev/github.com/razshare/frizzante#SendRedirect) | Yes | No |
| [SendRedirectToSecure](https://pkg.go.dev/github.com/razshare/frizzante#SendRedirectToSecure) | Yes | No |
| [SendStatus](https://pkg.go.dev/github.com/razshare/frizzante#SendStatus) | Yes | No |
| [SendHeader](https://pkg.go.dev/github.com/razshare/frizzante#SendHeader) | Yes | No |
| [SendCookie](https://pkg.go.dev/github.com/razshare/frizzante#SendCookie) | Yes | No |
| [SendContent](https://pkg.go.dev/github.com/razshare/frizzante#SendContent) | Yes | Yes |
| [SendEcho](https://pkg.go.dev/github.com/razshare/frizzante#SendEcho) | Yes | Yes |
| [SendEmbeddedFileOrIndexOrElse](https://pkg.go.dev/github.com/razshare/frizzante#SendEmbeddedFileOrIndexOrElse) | Yes | No |
| [SendEmbeddedFileOrElse](https://pkg.go.dev/github.com/razshare/frizzante#SendEmbeddedFileOrElse) | Yes | No |
| [SendFileOrIndexOrElse](https://pkg.go.dev/github.com/razshare/frizzante#SendFileOrIndexOrElse) | Yes | No |
| [SendFileOrElse](https://pkg.go.dev/github.com/razshare/frizzante#SendFileOrElse) | Yes | No |
| [SendWebSocketUpgrade](https://pkg.go.dev/github.com/razshare/frizzante#SendWebSocketUpgrade) | Yes | No |
| [SendSveltePage](https://pkg.go.dev/github.com/razshare/frizzante#SendSveltePage) | Yes | No |