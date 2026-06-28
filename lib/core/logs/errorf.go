package logs

import (
	"fmt"

	"main/lib/core/scopes"
)

func Errorf(http *scopes.Http, format string, args ...any) {
	Error(http, fmt.Sprintf(format, args...))
}
