package main

// import (
// 	"main/lib/core/databases"
// 	"main/lib/core/databases/schema"
// 	"main/lib/core/guards"
// 	"main/lib/core/negotiate"
// 	"main/lib/core/routes"
// 	"main/lib/routes/dashboard"
// 	"main/lib/routes/public"
// 	"main/lib/routes/settings"
// 	"main/lib/routes/users"
// 	"net/http"
// )

// var _, queries, _ = databases.Connect()

// var authenticate = guards.Guard{
// 	Name: "authenticate",
// 	Handler: func(scope routes.Scope, request *http.Request, writer http.ResponseWriter, allow func()) {
// 		sessionId, _ := negotiate.SessionId(writer, request)
// 		session, _ := queries.FindSessionById(request.Context(), sessionId)
// 		if session.ID == "" {
// 			writer.WriteHeader(401)
// 			writer.Write([]byte("not authenticated"))
// 			return
// 		}
// 		scope["session"] = session
// 		allow()
// 	},
// }

// var authorize = guards.Guard{
// 	Name: "authorize",
// 	Handler: func(scope routes.Scope, request *http.Request, writer http.ResponseWriter, allow func()) {
// 		session, _ := scope["session"].(schema.Session)
// 		if request.PathValue("user_id") != session.UserID {
// 			writer.WriteHeader(403)
// 			writer.Write([]byte("missing permissions"))
// 			return
// 		}
// 		allow()
// 	},
// }

// var server_routes = []routes.Route{
// 	{Pattern: "GET /public", Handler: public.Get},
// 	{Pattern: "GET /dashboard", Handler: dashboard.Get, Guards: []guards.Guard{authenticate}},
// 	{Pattern: "GET /users/{user_id}/settings", Handler: settings.Get, Guards: []guards.Guard{authenticate, authorize}},
// 	{Pattern: "DELETE /users/{user_id}", Handler: users.Delete, Guards: []guards.Guard{authenticate, authorize}},
// }
