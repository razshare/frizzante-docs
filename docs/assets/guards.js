import{p as z,f as C,a as H,s as e,b as P,c as I,g as v,u as _,h as b}from"./index-imKwFRqS.js";import{C as n}from"./code.js";import{P as R,T as G,R as j,F as q}from"./right_sidebar.js";import{n as x,b as w}from"./navbar.js";import{I as i}from"./inline_code.js";const M="/frizzante-docs/assets/guards_diagram_1.svg",N="/frizzante-docs/assets/guards_diagram_2.svg";var A=C("<!> <span>A guard is an object that is composed of an optional name and a required handler.</span> <br/> <span>You can add guards to your routes in order to protect them.</span> <!> <span>Guards will block all incoming requests by default, you must call <!> to explicitly allow the request through.</span> <br/> <span>In this example, <!> the route will decline requests with content type <!></span> <br/> <!> <br/> <!> <span>You can compose multiple guards in order to create more advanced restrictions.</span> <!> <!> <!> <br/> <!> <br/>",1);function B(S,r){z(r,!0),R(S,{title:"Guards",get prefix(){return r.prefix},rightSidebar:(a,s)=>{let t=()=>s?.().body;j(a,{get body(){return t()},items:[{shift:0,text:"Guards"},{shift:0,text:"Composition"}]})},footer:a=>{{let s=_(()=>({label:"Server Sent Events",href:w("/server_sent_events",{prefix:r.prefix})})),t=_(()=>({label:"Views",href:w("/views",{prefix:r.prefix})}));q(a,{get previous(){return v(s)},get next(){return v(t)}})}},children:(a,s)=>{var t=A(),o=H(t);G(o,{text:"Guards"});var u=e(o,8);n(u,{lang:"go",source:`
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
        `});var d=e(u,2),y=e(b(d));i(y,{source:"allow()"});var l=e(d,4),c=e(b(l));i(c,{source:"GET /api/xml/data"});var E=e(c,2);i(E,{source:"application/json"});var g=e(l,4);x(g,{get src(){return M},width:"auto"});var p=e(g,4);G(p,{text:"Composition"});var f=e(p,4);n(f,{lang:"go",source:`
            var authenticate = guards.Guard{Name: "authenticate", Handler: func(client *clients.Client, allow func()) {
                session := sessions.Start(receive.SessionId(client))
                if session.Verified && time.Since(session.LastActivity) <= 30*time.Minute {
                    allow()
                    return
                }
                send.Status(client, 401)
                send.Message(client, "not authenticated")
            }}
        `});var m=e(f,2);n(m,{lang:"go",source:`
            var authorize = guards.Guard{Name: "authorize", Handler: func(client *clients.Client, allow func()) {
                session := sessions.Start(receive.SessionId(client))
                if session.UserId == receive.path("user_id") {
                    allow()
                    return
                }
                send.Status(client, 403)
                send.Message(client, "missing permissions")
            }}
        `});var h=e(m,2);n(h,{lang:"go",source:`
            server.Routes = []routes.Route{
                {Pattern: "GET /public", Handler: public.Get},
                {Pattern: "GET /dashboard", Handler: dashboard.Get, Guards: []guards.Guard{authenticate}},
                {Pattern: "GET /user/{user_id}/settings", Handler: settings.Get, Guards: []guards.Guard{authenticate, authorize}},
                {Pattern: "DELETE /user/{user_id}", Handler: user.Delete, Guards: []guards.Guard{authenticate, authorize}},
            }
        `});var T=e(h,4);x(T,{get src(){return N},width:"auto"}),P(a,t)},$$slots:{rightSidebar:!0,footer:!0,default:!0}}),I()}export{B as default};
