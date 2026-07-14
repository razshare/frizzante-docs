package routes

import (
	"net/http"

	"main/lib/core/scopes"
)

type Handler = func(scope scopes.Scope, request *http.Request, writer http.ResponseWriter)
