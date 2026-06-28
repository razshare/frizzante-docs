package send

import (
	"net/http"
	"testing"

	"main/lib/core/mocks"
)

func TestSseUpgrade(t *testing.T) {
	_, writer := mocks.NewExchange()
	converted := http.ResponseWriter(writer)
	SseUpgrade(&converted)
	header := converted.Header()
	if header.Get("Content-Type") != "text/event-stream" {
		t.Fatal("content type should be text/event-stream")
	}
}
