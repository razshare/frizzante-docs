package send

import (
	"testing"

	"main/lib/core/mocks"
)

func TestCookie(t *testing.T) {
	_, writer := mocks.NewExchange()
	Cookie(writer, "cookie", "monster")
	if writer.MockHeader.Get("Set-Cookie") != "cookie=monster; Path=/; HttpOnly" {
		t.Fatal("cookie should be monster")
	}
}
