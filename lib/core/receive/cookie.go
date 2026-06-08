package receive

import (
	"net/url"

	"main/lib/core/clients"
	"main/lib/core/logs"
	"main/lib/core/stack"
)

// Cookie reads the contents of a cookie from the message and returns the value.
func Cookie(client *clients.Client, key string) string {
	cookie, err := client.Request.Cookie(key)
	if err != nil {
		logs.Errorf(
			client,
			"receive.Cookie: failed to read cookie %q: %v\n%s",
			key,
			err,
			stack.Trace(),
		)
		return ""
	}

	data, err := url.QueryUnescape(cookie.Value)
	if err != nil {
		logs.Errorf(
			client,
			"receive.Cookie: failed to unescape cookie %q value: %v\n%s",
			key,
			err,
			stack.Trace(),
		)
		return ""
	}

	return data
}
