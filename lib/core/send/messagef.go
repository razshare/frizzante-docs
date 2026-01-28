package send

import (
	"fmt"

	"main/lib/core/clients"
)

// Messagef sends utf-8 safe content using a format.
//
// Compatible with web sockets and server sent events.
func Messagef(client *clients.Client, format string, vars ...any) {
	Content(client, []byte(fmt.Sprintf(format, vars...)))
}
