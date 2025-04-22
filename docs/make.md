You can use `go run lib/make/main.go` to create apis, guards and pages from your terminal.

## Api

Use `go run lib/make/main.go -api -name="{name}"` to create an api, where `{name}` is the human readable name of the api.

!!! example
    ```sh
    go run lib/make/main.go -api -name="login"
    ```
    This will create a `lib/api/login.go` file.

## Guards

Use `go run lib/make/main.go -guard -name="{name}"` to create a guard, where `{name}` is the human readable name of the guard.

!!! example
    ```sh
    go run lib/make/main.go -guard -name="session"
    ```
    This will create a `lib/guards/session.go` file.

## Pages

Use `go run lib/make/main.go -page -name="{name}"` to create a page, where `{name}` is the human readable name of the page.

!!! example
    ```sh
    go run lib/make/main.go -page -name="welcome"
    ```
    This will create files `lib/page/welcome.go` and `lib/components/views/Welcome.svelte`.