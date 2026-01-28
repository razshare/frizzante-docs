package receive

import (
	"testing"

	"main/lib/dev/mocks"
)

func TestHeader(t *testing.T) {
	client := mocks.NewClient()
	client.Request.Header.Set("X-Header", "value")
	if Header(client, "X-Header") != "value" {
		t.Fatal("header should be value")
	}
}
