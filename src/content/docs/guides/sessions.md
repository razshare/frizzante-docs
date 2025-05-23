---
title: Sessions
---

You can start a session with `f.SessionStart()`.

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
	session := f.SessionStart(req, res, config.SessionAdapter)
	// Do something with session.
}
```

Where `config.SessionAdapter` is a `f.SessionAdapter[T]`, for example

```go
//lib/config/session.go
package sessions

import (
	"encoding/json"
	f "github.com/razshare/frizzante"
	"time"
)

type SessionData struct {
	Items        []string  `json:"items"`
	LastActivity time.Time `json:"lastActivity"`
	Expired      bool      `json:"expired"`
}

func NewSessionData() SessionData {
	return SessionData{
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

func SessionAdapter(session *f.Session[SessionData]) {
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
	session.Data = NewSessionData()
}

```

This **session adapter** manages sessions on the local file system.

## Modify Session Data

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

After you've made your changes to the `session.Data`, 
you should save those change by invoking `session.Save()`, as shown above.


## Session Lifetime

As you might've noticed, the `f.SessionStart()` function acts on 
both the `request` and the `response`. 

The reason being is that `f.SessionStart()` tries to 
**retrieve an existing session** based on the request's `session-id` 
cookie **before creating a new** one from scratch.

When the given `session-id` is not valid it creates a new session, 
and so **it sends** the new `session-id` back to the client as a cookie.

The newly created `session-id` cookie doesn't set any limitations.

No expiration date or path constraints.

That is because the **session adapter** is expected to fully manage sessions on the server side,
including expirations dates and other restrictions.