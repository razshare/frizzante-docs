package main

import (
	"database/sql"
	"log"
	"main/lib/core/databases"
)

func main() {
	// no need to close database connection,
	// this program runs once and dies immediately
	var err error
	var database *sql.DB
	if database, _, err = databases.Connect(); err != nil {
		log.Fatal(err)
	}
	if err = databases.Migrate(
		database,
		"2025_00_01T09_16_00+02_00",
		"2026_07_13T09_19_16+02_00",
	); err != nil {
		log.Fatal(err)
	}
}
