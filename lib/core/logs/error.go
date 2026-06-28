package logs

import (
	"fmt"
	"strings"

	"main/lib/core/scopes"
)

func Error(http *scopes.Http, args ...any) {
	length := len(args)
	entries := make([]string, len(args))
	for i := 0; i < length; i++ {
		entries[i] = fmt.Sprintf("%s", args[i])
	}
	http.ErrorLog.Println(strings.Join(entries, ""))
}
