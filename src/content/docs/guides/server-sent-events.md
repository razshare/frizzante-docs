---
title: Server Sent Events
---

Use `send.SseUpgrade()` to upgrade the connection to server sent events.

```go
route.Route{Pattern: "GET /sse", Handler: handlers.Welcome}
```

```go
//lib/handlers/welcome.go
package handlers

import (
    "github.com/razshare/frizzante/client"
    "github.com/razshare/frizzante/receive"
    "github.com/razshare/frizzante/send"
    "time"
)

func Welcome(c *client.Client) {
    a := receive.IsAlive(c)            // Tracks request status.
    ev := send.SseUpgrade(c)            // Sends sse upgrade.
    for *a {                        // Loops until cancellation.
       ev("channel-1")                // Switches to "channel-1".
       send.Message(c, "Hello 1")       // Sends message.
       ev("channel-2")                // Switches to "channel-2".
       send.Message(c, "Hello 2")       // Sends message.
       time.Sleep(time.Second)         // Sleeps for 1 second.
    }
}
```

Then consume the stream on the client.

```svelte
<script lang="ts">
    import {source} from "$frizzante/scripts/source.ts";
    const connection = source("/sse")        // Connects to the handler.
    const c1 = connection.select("channel-1") // Listens to "channel-1".
    const c2 = connection.select("channel-2") // Listens to "channel-2".
</script>

<h1>Channel 1</h1>
<span>{$c1}</span>                       <!-- Renders most recent value of channel-1. -->

<h1>Channel 2</h1>
<span>{$c2}</span>                       <!-- Renders most recent value of channel-2. -->
```