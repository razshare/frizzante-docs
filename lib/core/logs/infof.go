package logs

import (
	"fmt"

	"main/lib/core/clients"
)

func Infof(client *clients.Client, format string, args ...any) {
	Info(client, fmt.Sprintf(format, args...))
}
