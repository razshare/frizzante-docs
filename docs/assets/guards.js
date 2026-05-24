import{p as C,f as H,a as P,s as e,b as R,c as I,g as v,u as _,h as b}from"./index-B7rtd99V.js";import{C as n}from"./code.js";import{P as j,T as G,R as q,F as z}from"./right_sidebar.js";import{n as w,b as x}from"./navbar.js";import{I as i}from"./inline_code.js";const L=""+new URL("guards_diagram_1.svg",import.meta.url).href,M=""+new URL("guards_diagram_2.svg",import.meta.url).href;var N=H("<!> <span>A guard is an object that is composed of an optional name and a required handler.</span> <br/> <span>You can add guards to your routes in order to protect them.</span> <!> <span>Guards will block all incoming requests by default, you must call <!> to explicitly allow the request through.</span> <br/> <span>In this example, <!> the route will decline requests with content type <!></span> <br/> <!> <br/> <!> <span>You can compose multiple guards in order to create more advanced restrictions.</span> <!> <!> <!> <br/> <!> <br/>",1);function B(S,a){C(a,!0),j(S,{title:"Guards",get prefix(){return a.prefix},rightSidebar:(r,s)=>{let t=()=>s?.().body;q(r,{get body(){return t()},items:[{shift:0,text:"Guards"},{shift:0,text:"Composition"}]})},footer:r=>{{let s=_(()=>({label:"Server Sent Events",href:x("/server_sent_events",{prefix:a.prefix})})),t=_(()=>({label:"Views",href:x("/views",{prefix:a.prefix})}));z(r,{get previous(){return v(s)},get next(){return v(t)}})}},children:(r,s)=>{var t=N(),o=P(t);G(o,{text:"Guards"});var u=e(o,8);n(u,{lang:"go",source:`
            server.Routes = []routes.Route{
                {
                    Pattern: "GET /api/xml/data",
                    Handler: data.Get,
                    Guards: []guards.Guards{
                        {Name: "jsonless", Handler: func(client *clients.Client, allow func()) {
                            if receive.ContentType(client) == "application/json" {
                                return
                            }
                            allow()
                        }},
                    },
                },
            }
        `});var d=e(u,2),y=e(b(d));i(y,{source:"allow()"});var l=e(d,4),c=e(b(l));i(c,{source:"GET /api/xml/data"});var E=e(c,2);i(E,{source:"application/json"});var p=e(l,4);w(p,{get src(){return L},width:"auto"});var g=e(p,4);G(g,{text:"Composition"});var m=e(g,4);n(m,{lang:"go",source:`
            var authenticate = guards.Guard{Name: "authenticate", Handler: func(client *clients.Client, allow func()) {
                session := sessions.Start(receive.SessionId(client))
                if session.Verified && time.Since(session.LastActivity) <= 30*time.Minute {
                    allow()
                    return
                }
                send.Status(client, 401)
                send.Message(client, "not authenticated")
            }}
        `});var h=e(m,2);n(h,{lang:"go",source:`
            var authorize = guards.Guard{Name: "authorize", Handler: func(client *clients.Client, allow func()) {
                session := sessions.Start(receive.SessionId(client))
                if session.UserId == receive.path("user_id") {
                    allow()
                    return
                }
                send.Status(client, 403)
                send.Message(client, "missing permissions")
            }}
        `});var f=e(h,2);n(f,{lang:"go",source:`
            server.Routes = []routes.Route{
                {Pattern: "GET /public", Handler: public.Get},
                {Pattern: "GET /dashboard", Handler: dashboard.Get, Guards: []guards.Guard{authenticate}},
                {Pattern: "GET /user/{user_id}/settings", Handler: settings.Get, Guards: []guards.Guard{authenticate, authorize}},
                {Pattern: "DELETE /user/{user_id}", Handler: user.Delete, Guards: []guards.Guard{authenticate, authorize}},
            }
        `});var T=e(f,4);w(T,{get src(){return M},width:"auto"}),R(r,t)},$$slots:{rightSidebar:!0,footer:!0,default:!0}}),I()}export{B as default};
