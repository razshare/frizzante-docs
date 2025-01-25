Make sure you have [Go](https://go.dev/doc/install) and [Bun](https://bun.sh/) installed.

!!! note
    If you'd rather use a different runtime than Bun to update your javascript dependencies, see [makefile](https://github.com/razshare/frizzante-starter) and change all occurrences of `bun` and `bunx` with the equivalent of whatever runtime you'd like to use.


Create a new project using the starter template.

```bash
git clone https://github.com/razshare/frizzante-starter
```

Update your dependencies 

```bash
make update
```

Then you can start the server with

```bash
make start
```


You can enter dev mode with

```dev
make dev
```

Or you can build the whole project with

```bash
make build
```

This will create a single, standalone, executable `out/app` file.