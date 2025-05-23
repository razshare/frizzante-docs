---
title: Api
---

Apis are defined onto the server as request handlers using `.OnRequest()`.

```go
//lib/api
package api

import (
	f "github.com/razshare/frizzante"
	"main/lib/config"
)

func init() {
	config.Server.OnRequest("GET /api/events", []f.Guard{}, get)
}

func get(req *f.Request, res *f.Response) {
	// Handler request.
}
```

You can also specify path fields within the pattern
using curly braces syntax (`{}`)

```http
GET /api/{username}/about
```

You can then retrieve these fields from the request by using `.ReceivePath()`.

```go
func get(req *f.Request, res *f.Response){
	name := req.ReceivePath("username")
	// Do something with name.
}
```