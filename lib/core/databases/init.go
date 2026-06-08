package databases

import (
	"database/sql"
	"log"

	"main/lib/core/databases/schema"
)

func init() {
	var err error
	var database *sql.DB
	if database, err = Load(); err != nil {
		log.Fatal(err)
	}
	var queriesLocal *schema.Queries
	if queriesLocal = schema.New(database); queriesLocal == nil {
		log.Fatal("could not construct database queries object")
	}
	Queries = *queriesLocal
}
