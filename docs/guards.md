You can guard your pages and api by injecting arbitrary functions to execute before said pages and/or api serve the client.

You can guard your pages with `f.ServerWithPageGuard()`

```go
f.ServerWithPageGuard(srv,
    func(req *f.Request, res *f.Response, _ *f.Page, pass func()) {
        f.SessionStart(req, res)
	    pass()
    }
)
```

You can guard your api with `f.ServerWithApiGuard()`

```go
f.ServerWithApiGuard(srv,
    func(req *f.Request, res *f.Response, _ *f.Page, pass func()) {
        f.SessionStart(req, res)
	    pass()
    }
)
```

Invoking `pass()` will let the request pass through.