---
title: Notifiers
---

Most of Frizzante's api tries to get out of your way while building stuff.

For that reason the api will not handle error management directly inline,
it is forgiving and assumes the developer knows what they are doing.

This doesn't mean you have to look out for `nil` references, it just means errors and messages
are handled through **notifiers**.

Notifiers are a mechanism that handle errors and messages.

You can create a notifier with `NewNotifier()`.

```go
//main.go
package main

import (
	"errors"
	f "github.com/razshare/frizzante"
)

func main() {
	notifier := f.NewNotifier()
	notifier.SendError(errors.New("some error"))
}
```

### Defaults

Frizzante's entities will always come with a custom internal notifier set out of the box.

Generally speaking these default notifier write to **STDOUT** and **STDERR**.

Use a custom notifier when you want to redirect errors and messages somewhere else.

For example the web server comes with its own notifier, 
but you can overwrite it by using `.WithNotifier()`.

```go
// config/server.go

package config

import f "github.com/razshare/frizzante"

var Server = f.
	NewServer().
	WithNotifier(f.NewNotifier())

```