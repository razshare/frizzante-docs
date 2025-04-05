You can guard your page and api by injecting arbitrary functions to execute before said pages and/or api serve the client.

You can guard your pages with `frz.ServerWithPageGuard()`

```go
frz.ServerWithPageGuard(srv,
    func(req *frz.Request, res *frz.Response, _ *frz.Page, pass func()) {
        frz.SessionStart(req, res)
	    pass()
    }
)

frz.ServerWithApiGuard(srv,
    func(req *frz.Request, res *frz.Response, _ *frz.Page, pass func()) {
        frz.SessionStart(req, res)
	    pass()
    }
)
```

Invoking `pass()` will let the request pass through to the next guard or the actual page handler.