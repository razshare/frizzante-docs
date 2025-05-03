Create a new project by cloning the starter template


```bash
git clone https://github.com/razshare/frizzante-starter && \
rm frizzante-starter/.git -fr
```

Then navigate to it

```bash
cd frizzante-starter
```

Update dependencies

```bash
make update
```

!!! note
    Make sure you have [Go](https://go.dev/doc/install), [build-essential](https://askubuntu.com/questions/398489/how-to-install-build-essential) and [Bun](https://bun.sh/) installed.<br/>
    If you'd rather use a different runtime than Bun to update your javascript dependencies, see [makefile](https://github.com/razshare/frizzante-starter/blob/main/makefile) and change all occurrences of `bun` and `bunx` with the equivalent of whatever runtime you'd like to use.

Then you can start the server with

```bash
make start
```


Enter development mode with

```dev
make dev
```

Or you can build the whole project with

```bash
make build
```

This will create a single, standalone, executable `bin/app` file.