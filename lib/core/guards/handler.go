package guards

import "main/lib/core/clients"

type Handler = func(client *clients.Client, allow func())
