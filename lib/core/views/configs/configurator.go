package configs

import (
	"embed"
	"log"
	"net/http"

	"main/lib/core/views"
	"main/lib/core/views/renders"
)

type Configurator func(
	http.ResponseWriter,
	*http.Request,
	views.View,
) (
	http.ResponseWriter,
	*http.Request,
	renders.Render,
	embed.FS,
	*log.Logger,
	*log.Logger,
	views.View,
)
