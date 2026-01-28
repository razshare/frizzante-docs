package receive

import "main/lib/core/clients"

// Path reads a path value field and returns it.
func Path(client *clients.Client, key string) string {
	return client.Request.PathValue(key)
}
