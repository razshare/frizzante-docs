package guards

import "main/lib/core/clients"

type Guard struct {
	Name    string
	Handler func(client *clients.Client, allow func())
}
