You can use `go run lib/cli/main.go` to create apis and pages from your terminal.

## Api

Use `go run lib/cli/main.go -api -name="{name}"` to create an api, where `{name}` is the human readable name of the api.

!!! example
    ```sh
    go run lib/cli/main.go -api -name="login"
    ```
    This will create a `lib/api/Login.go` file.


## Pages

Use `go run lib/cli/main.go -page -name="{name}"` to create a page, where `{name}` is the human readable name of the page.

!!! example
    ```sh
    go run lib/cli/main.go -page -name="welcome"
    ```
    This will create files `lib/page/Welcome.go` and `lib/components/views/Welcome.svelte`.