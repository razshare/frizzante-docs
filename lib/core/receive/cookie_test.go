package receive

import (
	"testing"

	"main/lib/core/mocks"
)

func TestCookie(t *testing.T) {
	client := mocks.NewClient()
	client.Request.Header.Set("Cookie", "cookie=monster;")
	cookie := Cookie(client, "cookie")
	if cookie != "monster" {
		t.Fatal("cookie should be monster")
	}
}

func TestCookieEmptyKey(t *testing.T) {
	client := mocks.NewClient()
	cookie := Cookie(client, "")
	if cookie != "" {
		t.Fatal("cookie should be empty")
	}
}

func TestCookieInvalidContent(t *testing.T) {
	client := mocks.NewClient()
	client.Request.Header.Set("Cookie", "cookie=%monster;")
	cookie := Cookie(client, "cookie")
	if cookie != "" {
		t.Fatal("cookie should be empty")
	}
}
