package send

import (
	"errors"
	"testing"

	"main/lib/dev/mocks"
)

func TestError(t *testing.T) {
	client := mocks.NewClient()
	Error(client, errors.New("error"))
	writer := client.Writer.(*mocks.ResponseWriter)
	if client.Status != 500 {
		t.Fatal("status should be 500")
	}
	if string(writer.MockBytes) != "error" {
		t.Fatal("content should be error")
	}
}
