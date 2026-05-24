package send

import (
	"testing"

	"main/lib/core/mocks"
)

func TestMessage(t *testing.T) {
	client := mocks.NewClient()
	Message(client, "hello")
	writer := client.Writer.(*mocks.ResponseWriter)
	if string(writer.MockBytes) != "hello" {
		t.Fatal("content should be hello")
	}
}
