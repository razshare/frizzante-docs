import{p as C,f as _,a as E,s as e,t as T,b,c as I,g as M,u as R,h as y}from"./index-B7rtd99V.js";import{b as k,f as A}from"./navbar.js";import{C as n}from"./code.js";import{P as G,T as r,R as S,F as V}from"./right_sidebar.js";import{I as x}from"./inline_code.js";import{N as j}from"./note.js";var D=_("<span>Your implementation may vary.</span> <br/> <span>This implementation doesn’t directly invoke the next hook, instead it use a flag to check when to stop.</span> <br/> <span>This should reduce nesting in your stack trace and keep it a little more readable.</span>",1),N=_(`<!> <!> <span>Frizzante intentionally uses guards instead of middleware.</span> <br/> <span>Middleware have some limitations.</span> <br/> <ul><li>All middleware handles must be invoked for each request</li> <li>Some middleware may contain path-checking logic while others may not, which introduces ambiguity and more
            details to remember as a developer</li> <li>Managing middleware execution order across different routes is complex</li></ul> <br/> <span>While guards have some advantages.</span> <br/> <ul><li><strong>Efficient</strong> <span>-</span> <span>each route has a defined slice of guards and only those guards will execute each time the route is
                matched</span></li> <li><strong>Explicit</strong> <span>-</span> <span>since each route explicitly defines its guards, you can see exactly which guards execute for any route
                just by looking at the slice</span></li> <li><strong>Composable</strong> <span>-</span> <span>in order to add a new guard you can just add a guard to the route’s guards slice</span></li> <li><strong>Easy to order</strong> <span>-</span> <span>it’s easy to define the order in which guards execute, you can simply move them around in the route’s
                guards slice</span></li></ul> <span>For more details see the <a>guards page</a>.</span> <!> <span>If you really want middleware-like behavior, you can easily implement it in your own project.</span> <!> <!> <!> <!> <!> <!> <span>Yes you can, as long as Vite supports your framework.</span> <br/> <span>All you need to do is configure your <!> and <!> to render your framework.</span> <br/> <span>You can find an old Vue3 example <a target="_blank" href="https://github.com/razshare/frizzante-example-vue3">here</a>.</span>`,1);function O(H,t){C(t,!0),G(H,{title:"Faq",get prefix(){return t.prefix},rightSidebar:(a,o)=>{let s=()=>o?.().body;S(a,{get body(){return s()},items:[{shift:0,text:"Faq"},{shift:0,text:"Why doesn’t Frizzante have middleware?"},{shift:1,text:"Middleware Implementation"},{shift:1,text:"Middleware Usage"},{shift:0,text:"Can I use Frizzante with other frontend frameworks?"}]})},footer:a=>{{let o=R(()=>({label:"Contributing",href:k("/contributing",{prefix:t.prefix})}));V(a,{get previous(){return M(o)}})}},children:(a,o)=>{var s=N(),l=E(s);r(l,{text:"Faq"});var d=e(l,2);r(d,{type:"h3",text:"Why doesn’t Frizzante have middleware?"});var u=e(d,20),F=e(y(u)),c=e(u,2);r(c,{type:"h5",text:"Middleware Implementation"});var p=e(c,4);n(p,{lang:"go",source:`
            package middlewares

            import "main/lib/core/clients"

            type Hook func(client *clients.Client, next func()) // Defines a hook function type which will be used by the middleware.

            type Middleware struct {                            // Defines a structure holding multiple hooks.
                Hooks []Hook                                    // Defines the actual hooks slice.
            }
        `});var m=e(p,2);n(m,{lang:"go",source:`
            package middlewares

            import (
                "main/lib/core/clients"
                "main/lib/core/routes"
            )

            func Apply(middleware *Middleware, routes []routes.Route) {
                for _, route := range routes {                               // For each route...
                    handler := r.Handler                                     // ...saves the route handler for later use.
                    route.Handler = func(client *clients.Client) {           // Assigns a new wrapper route handler.
                        var quit bool                                        // Creates flag used to interrupt the chain.
                        for _, hook := range middleware.Hooks {              // Iterate over hooks.
                            quit = true                                      // Prepares to quit.
                            if hook(client, func() { quit = false }); quit { // Invokes hook and checks if route should quit.
                                return                                       // Quits.
                            }
                        }
                        handler(client)                                      // Invokes the actual route handler.
                    }
                }
            }
        `});var h=e(m,2);j(h,{children:(i,Y)=>{var q=D();b(i,q)}});var f=e(h,2);r(f,{type:"h5",text:"Middleware Usage"});var g=e(f,2);n(g,{lang:"go",source:`
            package main

            import (
                "embed"
                "main/lib/core/clients"
                "main/lib/core/routes"
                "main/lib/core/servers"
                "main/lib/core/view/ssr"
                "main/lib/middlewares"
                "main/lib/routes/fallback"
                "main/lib/routes/todos"
                "main/lib/routes/welcome"
                "os"
            )

            //go:embed app/dist
            var efs embed.FS
            var server = servers.New()

            var middleware = &middlewares.Middleware{
                Hooks: []middleware.Hook{
                    func(client *clients.Client, next func()) {
                        // Hook logic goes here.
                    },
                },
            }

            func main() {
                defer servers.Start(server)
                defer middlewares.Apply(middleware, server.Routes) // Applies middleware to server routes.
                                                                   // Remember that deferred functions are executed in reverse,
                                                                   // so this line will execute before the server starts.
                server.Efs = efs                                   // Sets embedded file system.
                server.Routes = []routes.Route{
                    {Pattern: "GET /", Handler: fallback.View},
                    {Pattern: "GET /welcome", Handler: welcome.View},
                    {Pattern: "GET /todos", Handler: todos.View},
                    {Pattern: "GET /check", Handler: todos.Check},
                    {Pattern: "GET /uncheck", Handler: todos.Uncheck},
                    {Pattern: "GET /add", Handler: todos.Add},
                    {Pattern: "GET /remove", Handler: todos.Remove},
                }
            }
        `});var v=e(g,2);r(v,{type:"h3",text:"Can I use Frizzante with other frontend frameworks?"});var z=e(v,6),w=e(y(z));x(w,{source:"app/app.client.ts"});var P=e(w,2);x(P,{source:"app/app.server.ts"}),T(i=>A(F,"href",i),[()=>k("/guards",{prefix:t.prefix})]),b(a,s)},$$slots:{rightSidebar:!0,footer:!0,default:!0}}),I()}export{O as default};
