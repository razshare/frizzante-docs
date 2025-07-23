---
title: Sessions
---

Use `sessions.Start()` to start a session.

```go
//lib/handlers/welcome.go
package handlers

import (
    "github.com/razshare/frizzante/connections"
    "github.com/razshare/frizzante/sessions"
)

type State struct{ // Defines session state,
    Name string    // which will be initialized
                   // with a zero value.
}

func Welcome(con *connections.Connection) {
    session := sessions.Start[State](con) // Starts session
                                          // with zero state.
}
```

This will retrieve the user's session or create a new one if none is found.

:::note
The session is retrieved based on the user's `session-id` cookie.

When session retrieval fails, `sessions.Start()` creates a 
new session instead and sends a new `session-id` cookie to the user.
:::

:::danger
Since `sessions.Start()` may send a cookie, it is important to remember that
the order in which data is sent to the user matters.

Read more about [order of operations](../order-of-operations).
:::

## Save

Use `Save()` to save the session state.

```go
//lib/handlers/welcome.go
package handlers

import (
    "github.com/razshare/frizzante/connections"
    "github.com/razshare/frizzante/sessions"
)

// Defines session state.
type State struct{
    Name string
}

func Welcome(con *connections.Connection) {
    session := sessions.Start[State](con) // Starts session.
    defer sessions.Save(session)          // Saves state.
    session.State.Name = "World"          // Modifies state.
}
```

## Load

Use `Load()` to load the session state.

```go
//lib/handlers/welcome.go
package handlers

import (
    "github.com/razshare/frizzante/connections"
    "github.com/razshare/frizzante/sessions"
)
// Defines session state.
type State struct{
    Name string
}

func Welcome(con *connections.Connection) {
    session := sessions.Start[State](con) // Starts session.
    sessions.Load(session)                // Loads session state 
                                          // (not necessary, 
                                          // read below).
    name := session.State.Name
    con.SendMessage("Hello " + name)      // Sends text.
}
```

:::tip
Session state is automatically loaded when invoking `sessions.Start()`.\
Generally speaking you wouldn't load the session state more than once per handler,
but there are some cases where it can be useful to do so, for example when handling
long running [server sent events](../server-sent-events) or [web socket](../web-sockets) connections.
:::

## Destroy

Use `Destroy()` to destroy a session.

```go
//lib/handlers/welcome.go
package handlers

import (
    "github.com/razshare/frizzante/connections"
    "github.com/razshare/frizzante/sessions"
)

// Defines session state.
type State struct{
    Name string
}

func Welcome(con *connections.Connection) {
    session := sessions.Start[State](con) // Starts session.
    sessions.Destroy(session)             // Destroys session.
}
```

## Customization

Sessions are managed through a series of function pointers defined directly under the `sessions` package.

You can overwrite these function pointers with your own in order to customize sessions behavior.


```go
//main.go
import "github.com/razshare/frizzante/sessions"

func main(){
    sessions.Set = func(id string, key string, value []byte) error {}
    sessions.Get = func(id string, key string) ([]byte, error) {}
    sessions.Has = func(id string, key string) (bool, error) {}
    sessions.Remove = func(id string, key string) error {}
    sessions.HasId = func(id string) (bool, error) {}
    sessions.RemoveId = func(id string) error {}
}
```