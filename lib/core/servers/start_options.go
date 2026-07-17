package servers

import (
	"log"
	"net/http"
	"time"

	"main/lib/core/routes"
)

type StartOptions struct {
	Address        string
	Certificate    string
	Key            string
	ErrorLog       *log.Logger
	InfoLog        *log.Logger
	Routes         []routes.Route
	Cors           *http.CrossOriginProtection
	ReadTimeout    time.Duration
	WriteTimeout   time.Duration
	MaxHeaderBytes int
}
