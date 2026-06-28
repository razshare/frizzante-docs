package databases

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/mattn/go-sqlite3"
	"main/lib/core/databases/schema"
	"main/lib/core/files"
)

func Connect() (database *sql.DB, queries *schema.Queries, err error) {
	if !files.IsFile("source.sqlite") {
		var data []byte
		if data, err = Efs.ReadFile("source.sqlite"); err != nil {
			return
		}

		if err = os.WriteFile("source.sqlite", data, os.ModePerm); err != nil {
			return
		}
	}
	database, err = sql.Open("sqlite3", "file:source.sqlite?cache=shared")
	if queries = schema.New(database); queries == nil {
		log.Fatal("could not construct database queries object")
	}
	return
}
