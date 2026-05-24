package send

import (
	"testing"

	"main/lib/core/mocks"
)

func TestSseUpgrade(t *testing.T) {
	client := mocks.NewClient()
	SseUpgrade(client)
	if client.EventName != "message" {
		t.Fatal("event name should be message")
	}
}
