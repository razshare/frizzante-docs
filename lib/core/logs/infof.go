package logs

import (
	"fmt"

	"main/lib/core/scopes"
)

func Infof(http *scopes.Http, format string, args ...any) {
	Info(http, fmt.Sprintf(format, args...))
}
