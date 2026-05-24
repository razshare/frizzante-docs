package receive

import (
	"testing"

	"main/lib/core/mocks"
)

func TestAccept(t *testing.T) {
	client := mocks.NewClient()
	client.Request.Header.Set("Accept", "text/html")
	if Accept(client) != "text/html" {
		t.Fatal("accept should be text/html")
	}
}
