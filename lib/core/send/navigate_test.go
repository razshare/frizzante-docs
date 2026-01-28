package send

import (
	"testing"

	"main/lib/dev/mocks"
)

func TestNavigate(t *testing.T) {
	client := mocks.NewClient()
	Navigate(client, "/about")
	writer := client.Writer.(*mocks.ResponseWriter)
	if client.Status != 302 {
		t.Fatal("status should be 302")
	}
	if writer.MockHeader.Get("Location") != "/about" {
		t.Fatal("location should be about")
	}
}
