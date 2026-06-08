package logs

import (
	"fmt"

	"main/lib/core/clients"
)

func Errorf(client *clients.Client, format string, args ...any) {
	Error(client, fmt.Sprintf(format, args...))
}
