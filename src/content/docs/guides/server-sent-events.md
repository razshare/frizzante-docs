---
title: Server Sent Events
---

Use `send.SseUpgrade()` to upgrade the connection to server sent events.

```go
routes.Route{Pattern: "GET /sse", Handler: welcome.View}
```

```go
//lib/routes/welcome/view.go
package welcome

import (
    "main/lib/core/clients"
    "main/lib/core/receive"
    "main/lib/core/send"
    "time"
)

func View(client *clients.Client) {
    alive := receive.IsAlive(client)   // Tracks request status.
    event := send.SseUpgrade(client)   // Sends sse upgrade.
    for *alive {                       // Loops until cancellation.
       event("channel-1")              // Switches to "channel-1".
       send.Message(client, "Hello 1") // Sends message.
       event("channel-2")              // Switches to "channel-2".
       send.Message(client, "Hello 2") // Sends message.
       time.Sleep(time.Second)         // Sleeps for 1 second.
    }
}
```

Then consume the stream on the client.

```svelte
<script lang="ts">
    import {source} from "$lib/scripts/core/source.ts";
    const connection = source("/sse")               // Connects to the handler.
    const channel1 = connection.select("channel-1") // Listens to "channel-1".
    const channel2 = connection.select("channel-2") // Listens to "channel-2".
</script>

<h1>Channel 1</h1>
<span>{$channel1}</span>                            <!-- Renders most recent value of channel-1. -->

<h1>Channel 2</h1>
<span>{$channel2}</span>                            <!-- Renders most recent value of channel-2. -->
```