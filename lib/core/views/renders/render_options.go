package renders

import (
	"embed"
	"log"

	"main/lib/core/views"
)

type RenderOptions struct {
	View     views.View
	Efs      embed.FS
	InfoLog  *log.Logger
	ErrorLog *log.Logger
}
