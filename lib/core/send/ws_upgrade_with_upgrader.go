package send

import (
	"github.com/gorilla/websocket"
	"main/lib/core/clients"
	"main/lib/core/logs"
	"main/lib/core/stack"
)

// WsUpgradeWithUpgrader upgrades to web sockets.
func WsUpgradeWithUpgrader(client *clients.Client, upgrader websocket.Upgrader) {
	conn, err := upgrader.Upgrade(client.Writer, &client.Request, nil)
	if err != nil {
		logs.Errorf(
			client,
			"send.WsUpgradeWithUpgrader: failed to upgrade to WebSocket: %v\n%s",
			err,
			stack.Trace(),
		)
		return
	}
	client.WebSocket = conn
	client.Locked = true
}
