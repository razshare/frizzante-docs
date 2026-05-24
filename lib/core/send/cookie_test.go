package send

import (
	"testing"

	"main/lib/core/mocks"
)

func TestCookie(t *testing.T) {
	client := mocks.NewClient()
	Cookie(client, "cookie", "monster")
	writer := client.Writer.(*mocks.ResponseWriter)
	if writer.MockHeader.Get("Set-Cookie") != "cookie=monster; Path=/; HttpOnly" {
		t.Fatal("cookie should be monster")
	}
}
