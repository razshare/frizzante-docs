package servers

import (
	"log"
	"net/http"

	"main/lib/core/guards"
	"main/lib/core/routes"
)

type StartOptions struct {
	SecureAddr  string
	Certificate string
	Key         string
	ErrorLog    *log.Logger
	InfoLog     *log.Logger
	Routes      []routes.Route
	Guards      []guards.Guard
	Cors        *http.CrossOriginProtection
}
