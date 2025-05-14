You can use `go run lib/make/main.go` to create apis and pages from your terminal.

## Api

Use `go run lib/make/main.go -api -name="{name}"` to create an api, where `{name}` is the human readable name of the api.

!!! example
    ```sh
    go run lib/make/main.go -api -name="login"
    ```
    This will create a `lib/api/login.go` file.

As an alternative, you can use the provided makefile command

```sh
make api
```

## Pages

Use `go run lib/make/main.go -page -name="{name}"` to create a page, where `{name}` is the human readable name of the page.

!!! example
    ```sh
    go run lib/make/main.go -page -name="welcome"
    ```
    This will create files `lib/page/welcome.go` and `lib/components/views/Welcome.svelte`.

As an alternative, you can use the provided makefile command

```sh
make page
```
