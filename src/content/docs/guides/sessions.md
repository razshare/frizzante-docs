---
title: Sessions
---

You can start a session with `f.SessionStart()`, a function that acts on 
both the `request` and the `response`. 

The reason being is that `f.SessionStart()` tries to 
**retrieve an existing session** based on the request's `session-id` 
cookie **before creating a new** one from scratch.

When the given `session-id` is not valid, it creates a new session, 
and so **it sends** the new `session-id` back to the client as a cookie.

The newly created `session-id` cookie doesn't set any limitations.

No expiration date or path constraints.

That is because the **session adapter** is expected to fully manage sessions on the server side,
including expirations dates and other restrictions.

```go
//lib/api/welcome/endpoint.go
package api

import (
	f "github.com/razshare/frizzante"
	"main/lib/config"
)

func init() {
	config.Server.OnRequest("GET /api/welcome", []f.Guard{}, get)
}

func get(req *f.Request, res *f.Response) {
	session := f.SessionStart(req, res, config.SessionAdapter)
	// Do something with session.
}
```

where `config.SessionAdapter` is a `f.SessionAdapter[T]`, for example

```go
//lib/config/session.go
package sessions

import (
	"encoding/json"
	f "github.com/razshare/frizzante"
	"time"
)

type SessionData struct {
	Todos        []string  `json:"todos"`
	LastActivity time.Time `json:"lastActivity"`
	Expired      bool      `json:"expired"`
}

func NewSessionData() SessionData {
	return SessionData{
		Todos: []string{
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

func SessionAdapter(session *f.Session[SessionData]) {
	// Handle exists.
	session.WithExistsHandler(func() bool {
		return archive.Has(session.Id, key)
	})

	// Handle load.
	session.WithLoadHandler(func() {
		data := archive.Get(session.Id, key)
		err := json.Unmarshal(data, &session.Data)
		if nil != err {
			notifier.SendError(err)
		}
	})

	// Handle save.
	session.WithSaveHandler(func() {
		data, err := json.Marshal(session.Data)
		if nil != err {
			notifier.SendError(err)
			return
		}
		archive.Set(session.Id, key, data)
	})

	// Handle destroy.
	session.WithDestroyHandler(func() {
		archive.RemoveDomain(session.Id)
	})

	// Check if session exists.
	if session.Exists() {
		// Load existing state.
		session.Load()
		return
	}

	// Otherwise initialize new state.
	session.Data = NewSessionData()
}
```

This **session adapter** manages sessions on the local file system.

## Modify Session Data

Once you retrieve a session, you can freely modify its `.Data`.

```go
//lib/api/welcome/endpoint.go
package api

import (
	f "github.com/razshare/frizzante"
	"main/lib/config"
)

func init() {
	config.Server.OnRequest("GET /api/welcome", []f.Guard{}, get)
}

func get(req *f.Request, res *f.Response) {
	// Retrieve session.
	session := f.SessionStart(req, res, sessions.Archived)
	
	// Modify session data.
	session.Data = append(session.Data, "Pet the cat.")
	
	// Save changes.
	session.Save()
}
```

After you've made your changes to the `session.Data`, 
you should save those change by invoking `session.Save()`, as shown above.