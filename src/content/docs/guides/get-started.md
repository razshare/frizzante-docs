---
title: Get Started
---

Make sure you have [Go](https://go.dev/doc/install),
[build-essential](https://askubuntu.com/questions/398489/how-to-install-build-essential) and
[Bun](https://bun.sh/) installed.

:::note
Frizzante is aimed mainly at linux distributions.
:::

Create a new project by cloning the started template.

```sh
git clone https://github.com/razshare/frizzante-starter && \
rm frizzante-starter/.git -fr && \
cd frizzante-starter
```

Start the server in development mode with

```sh
make dev
```

Build the project it into a standalone executable for production with

```sh
make build
```

:::note
The final output is a standalone executable.
:::