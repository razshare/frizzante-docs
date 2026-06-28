package send

import (
	"testing"

	"main/lib/core/mocks"
)

func TestMessage(t *testing.T) {
	_, writer := mocks.NewExchange()
	if err := Message(writer, "hello"); err != nil {
		t.Fatal("sending message should succeed")
	}
	if string(writer.MockBytes) != "hello" {
		t.Fatal("content should be hello")
	}
}
