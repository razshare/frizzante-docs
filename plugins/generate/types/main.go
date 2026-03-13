package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	fmt.Printf("args: %s\n", strings.Join(os.Args, " "))
}
