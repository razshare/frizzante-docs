---
title: Sessions
---

Sessions are the recommended way to manage state.

You can start a session with `f.SessionStart()`.

```go
//main.go
package main

import f "github.com/razshare/frizzante"

func main() {
    f.NewServer().OnRequest("GET /api", handle).Start()
}

func handle(req *f.Request, res *f.Response){
	session := f.SessionStart(req, res, sessions.Archived)
	// Do something with session.
}
```

Where `session.Archived` is a `f.SessionBuilder[T]` function and is implemented as follows.

```go
//lib/sessions/archived.go
package sessions

import (
	"encoding/json"
	f "github.com/razshare/frizzante"
	"main/lib"
	"time"
)

type Data struct {
	Items        []string    `json:"items"`
	LastActivity time.Time `json:"lastActivity"`
	Expired      bool      `json:"expired"`
}

func NewData() Data {
	return Data{
		Items: []string{
			"Pet the cat.",
			"Do laundry",
			"Pet the cat.",
			"Cook",
			"Pet the cat.",
		},
	}
}

var key = "session.json"
var notifier = f.NewNotifier()
var archive = f.NewArchiveOnDisk(".sessions", time.Second/2)

func Archived(session *f.Session[Data]) {
	// Define handlers.
	session.WithExistsHandler(func() bool {
		return archive.Has(session.Id, key)
	})
	session.WithLoadHandler(func() {
		data := archive.Get(session.Id, key)
		unmarshalError := json.Unmarshal(data, &session.Data)
		if nil != unmarshalError {
			notifier.SendError(unmarshalError)
		}
	})
	session.WithSaveHandler(func() {
		data, marshalError := json.Marshal(session.Data)
		if nil != marshalError {
			notifier.SendError(marshalError)
			return
		}
		archive.Set(session.Id, key, data)
	})
	session.WithDestroyHandler(func() {
		archive.RemoveDomain(session.Id)
	})

	// Load session data from disk if it exists.
	if session.Exists() {
		session.Load()
		return
	}

	// Otherwise initialize the session data.
	session.Data = NewData()
}
```

This sessions implementation manages session on the local file system.

:::note
Currently, it's up to you to create an implementation that best suits your needs,
but in the future, specific implementations that manage session using databases will be provided out of the box.
:::

## Modify Data

Once you retrieve a session, you can freely modify its `.Data`.

```go
//main.go
package main

import f "github.com/razshare/frizzante"

func main() {
	f.NewServer().OnRequest("GET /api", handle).Start()
}

func handle(req *f.Request, res *f.Response){
	// Retrieve session.
	session := f.SessionStart(req, res, sessions.Archived)
	
	// Modify session data.
	session.Data = append(session.Data, "Pet the cat.")
	
	// Save changes.
	session.Save()
}
```

Once you've made your changes to the `session.Data`, 
you should save those change by invoking `session.Save()`, as shown above.


## Lifetime

As you might've noticed, the `f.SessionStart()` function acts on 
both the `request` and the `response`. 

This is because this functions not only **creates** sessions, but
it also takes care of **retrieving** existing sessions based on the request's
`session-id` cookie.

If no valid session is found, it silently creates a new session and provides
the client with a new (**valid**) `session-id` cookie, which is why this functions 
acts on the `respnse`.

**It sends header fields to the client.**

However, on the same note, when `f.SessionStart()` provides the client with a new `session-id`
cookie, it doesn't set any limitations on that cookie.

No expiration date or path constraints.

:::note
There are plans to introduce limitations on domain names.
:::

That is because the session implementation (for example `sessions.Archived` from above) 
is expected to fully manage sessions on the server side,
including expirations dates and other restrictions.