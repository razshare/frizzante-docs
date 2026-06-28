package negotiate

import (
	"testing"

	"main/lib/core/mocks"
)

func TestSessionId(t *testing.T) {
	request, writer := mocks.NewExchange()
	request.Header.Set("Cookie", "session-id=value;")
	if value, err := SessionId(request, writer); err != nil || value != "value" {
		t.Fatal("session id should be value")
	}
}
