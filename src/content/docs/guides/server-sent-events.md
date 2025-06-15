---
title: Server Sent Events
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
    alive := c.IsAlive()            // Tracks request status.
    ev := c.SendSseUpgrade()        // Sends sse upgrade.
    for *alive {                    // Loops until request gets cancelled.
        ev("channel-1")             // Switches to event "channel-1".
        c.SendMessage("hello 1")    // Sends message.
        ev("channel-2")             // Switches to event "channel-2".
        c.SendMessage("hello 2")    // Sends message.
        time.Sleep(time.Second)     // Sleeps for 1 second.
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