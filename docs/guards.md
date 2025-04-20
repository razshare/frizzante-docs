Use `f.ServerWithGuard()` to add a new guard.

!!! note
	A guard is a setup function that can inject arbitrary request handlers
	to handle incoming requests before they reach any of your api and page handlers.<br/>
	Guards can decide which requests should pass through and which request should be rejected.

```go
f.ServerWithGuard(srv, guard)
```

Where `guard` is a setup function

```go
func Guard(
	withGuardHandler func(
		guardHandler func(
			req *f.Request,
			res *f.Response,
			pass func(),
		),
	),
) {
	withGuardHandler(guardHandler)
}

func guardHandler(req *f.Request, res *f.Response, pass func()) {
    // Guard.
	pass()
}
```

Use `pass()` to let the current request pass through.

!!! warning
	Failing to invoke `pass()` means the current request will be rejected.