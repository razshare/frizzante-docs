---
title: Get Started
---

### Prerequisites

Make sure you have [Go](https://go.dev/doc/install), 
[build-essential](https://askubuntu.com/questions/398489/how-to-install-build-essential) and 
[Bun](https://bun.sh/) installed.

### Step 1

Create a new project by cloning the started template.

```sh
git clone https://github.com/razshare/frizzante-starter && \
rm frizzante-starter/.git -fr
```

### Step 2

Configure the project

```sh
cd frizzante-starter && \
make configure
```

Guides lead a user through a specific task they want to accomplish, often with a sequence of steps.
Writing a good guide requires thinking about what your users are trying to do.

### Step 3

Start the server in development mode

```sh
make dev
```

or build it into a standalone executable for production

```sh
make build
```
