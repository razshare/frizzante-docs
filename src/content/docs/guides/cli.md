---
title: CLI
---

The Frizzante CLI provides various commands to manage your project lifecycle, from creation to deployment.

## Configure

```sh
frizzante --configure
```

Configures your project by installing necessary binaries under the `./.gen` directory. This command sets up all required tools including:
- Air (for hot reloading)
- Bun (for JavaScript/TypeScript bundling)
- SQLC (for SQL code generation)
- Other project-specific binaries

Run this after creating a new project or cloning an existing one to ensure all dependencies are properly installed.

## Create Project

```sh
frizzante -c MyProject
# or
frizzante --create-project MyProject
```

Creates a new Frizzante project with the specified name. This command scaffolds a complete project structure including:
- Server configuration
- Route handlers
- Svelte components
- Build configuration
- Basic project files

## Install

```sh
frizzante -i
# or
frizzante --install
```

Installs all 'Go' project dependencies defined in your `go.mod` file.
## Update

```sh
frizzante -u
# or
frizzante --update
```

Updates all 'Go' project dependencies to their latest compatible versions. This ensures your project uses the most recent bug fixes and features while maintaining compatibility.

## Dev

```sh
frizzante -d
# or
frizzante --dev
```

Starts the development server with hot reloading enabled. This command:
- Watches for file changes in your Go and Svelte code
- Automatically rebuilds on changes
- Restarts the server when necessary
- Provides live reload for frontend changes

The development server typically runs on `http://127.0.0.1:8080` by default.

## Build

```sh
frizzante -b
# or
frizzante --build
```

Builds your project for production. This command:
- Compiles Go code into an optimized binary
- Bundles and minifies Svelte components
- Generates a standalone executable at `.gen/bin/app`
- Optimizes assets for production deployment

The resulting binary can be deployed independently without requiring the source code.

## Package

```sh
frizzante -p
# or
frizzante --package
```

Packages your application for distribution. This command:
- Builds the production binary
- Bundles all required assets
- Creates a distributable package in `app/dist`
- Includes all necessary runtime files

Use the `--platform` flag to target specific platforms:
```sh
frizzante --package --platform linux/amd64
```

Supported platforms:
- `linux/amd64`
- `linux/arm64`
- `darwin/amd64`
- `darwin/arm64`
- `windows/amd64`
- `windows/arm64`

## Package Watch

```sh
frizzante --package-watch
```

Continuously watches for changes and automatically repackages your application. This is useful during development when you need to:
- Test packaging configurations
- Verify asset bundling
- Debug production builds
- Monitor package output

Results are continuously updated in `app/dist`.

## Check

```sh
frizzante --check
```

Performs static analysis on your source code to detect:
- Syntax errors
- Type mismatches
- Unused variables
- Potential bugs
- Code quality issues

This command helps maintain code quality without running the full build process.

## Format

```sh
frizzante -f
# or
frizzante --format
```

Automatically formats your source code according to language-specific standards:
- Go code using `gofmt`
- JavaScript/TypeScript using configured formatters
- Svelte components using Prettier or similar

Ensures consistent code style across your entire project.

## Touch

```sh
frizzante --touch
```

Creates placeholder files in `app/dist` that are required for Go's embed directive. This command is necessary because:
- Go's `embed` directive requires files to exist at compile time
- The `app/dist` directory may be empty before the first build
- Placeholders ensure the embed directive doesn't fail

Run this before your first build if you're using embedded assets.

## Clean Project

```sh
frizzante --clean-project
```

Removes generated files and build artifacts from your project, including:
- Build output directories
- Cached dependencies
- Temporary files
- Generated code

Use this when you want to:
- Resolve build issues
- Start with a clean slate
- Reduce project size before committing
- Remove outdated generated files

## Reset

```sh
frizzante --reset
```

Deletes the Frizzante global directory and all its contents. This is a more aggressive cleanup that:
- Removes all globally installed Frizzante tools
- Clears configuration caches
- Resets to initial state

Use this when:
- Upgrading to a new major version
- Resolving persistent configuration issues
- Completely reinstalling Frizzante
- Troubleshooting tool corruption

:::caution
This will remove all Frizzante global configurations and tools. You'll need to run `--configure` again after resetting.
:::

## Additional Options

### Confirmation

```sh
frizzante -y
# or
frizzante --yes
```

Automatically confirms all prompts without user interaction. Useful for:
- CI/CD pipelines
- Automated scripts
- Batch operations

### Version

```sh
frizzante -v
# or
frizzante --version
```

Displays the current Frizzante version.

### Help

```sh
frizzante -h
# or
frizzante --help
```

Shows the complete list of available commands and options.

### Interactive Mode

```sh
frizzante
```

Running `frizzante` without any flags starts an interactive menu where you can select commands using arrow keys. This is helpful when you're:
- Learning the available commands
- Not sure which command to use
- Prefer a guided interface
