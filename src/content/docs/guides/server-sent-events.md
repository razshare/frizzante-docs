---
title: Server sent events
---

Use `SendSseUpgrade()` to upgrade the connection to server sent events.

```go
frz.Route{Pattern: "GET /sse", Handler: handlers.Hello}
```

```go
//lib/handlers/hello.go
package handlers

import (
    "github.com/razshare/frizzante/frz"
    "time"
)

func Hello(c *frz.Connection) {
    alive := c.IsAlive()            // Track request status.
    ev := c.SendSseUpgrade()        // Send sse upgrade.
    for *alive {                    // Loop until request gets cancelled.
        ev("channel-1")             // Switch to event "channel-1".
        c.SendMessage("hello 1")    // Send text.
        ev("channel-2")             // Switch to event "channel-2".
        c.SendMessage("hello 2")    // Send text.
        time.Sleep(time.Second)     // Sleep for 1 second.
    }
}
```

Then consume the stream on the client.

```svelte
<script lang="ts">
    import {source} from "$lib/utilities/scripts/source.ts";
    const c = source("/sse")            // Connects to the handler.
    const c1 = c.select("channel-1")    // Listens for messages on "channel-1"
    const c2 = c.select("channel-2")    // Listens for messages on "channel-2"
</script>

<h1>Channel 1</h1>
<span>{$c1}</span>

<h1>Channel 2</h1>
<span>{$c2}</span>
```