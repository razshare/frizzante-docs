package receive

import (
	"main/lib/core/clients"
	"main/lib/core/databases/schema"
	"main/lib/core/logs"
	"main/lib/core/stack"
)

func Session(client *clients.Client, queries *schema.Queries, session *schema.Session) bool {
	id := SessionId(client)
	context := client.Request.Context()
	var err error
	if *session, err = queries.FindSessionById(context, id); err != nil {
		logs.Errorf(client, "something went wrong while retrieving session %s: %v", id, err)
		logs.Infof(client, "attempting to add session %s...", id)
		if err = queries.AddSessionWithId(context, id); err != nil {
			logs.Errorf(client, "attempt to add session %s failed: %v\n%s", id, err, stack.Trace())
			return false
		}
		logs.Infof(client, "session %s created", id)
		session.ID = id
	}
	return true
}
