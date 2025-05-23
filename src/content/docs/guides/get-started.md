---
title: Get Started
---

Frizzante is a an opinionated web server framework that uses Svelte to render web pages.


### Prerequisites

Make sure you have [Go](https://go.dev/doc/install), 
[build-essential](https://askubuntu.com/questions/398489/how-to-install-build-essential) and 
[Bun](https://bun.sh/) installed.

:::note
Frizzante is aimed mainly at linux distributions.
:::

### Create Project

Create a new project by cloning the started template.

```sh
git clone https://github.com/razshare/frizzante-starter && \
rm frizzante-starter/.git -fr
```

### Configure Project

Configure the project

```sh
cd frizzante-starter && \
make configure
```

Guides lead a user through a specific task they want to accomplish, often with a sequence of steps.
Writing a good guide requires thinking about what your users are trying to do.

### Start Development Mode

Start the server in development mode with

```sh
make dev
```

### Build Project

Build the project it into a standalone executable for production with

```sh
make build
```

:::note
The final output is a standalone executable.
:::