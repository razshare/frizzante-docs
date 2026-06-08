package logs

import (
	"fmt"
	"strings"

	"main/lib/core/clients"
)

func Error(client *clients.Client, args ...any) {
	length := len(args)
	entries := make([]string, len(args))
	for i := 0; i < length; i++ {
		entries[i] = fmt.Sprintf("%s", args[i])
	}
	client.Options.ErrorLog.Println(strings.Join(entries, ""))
}
