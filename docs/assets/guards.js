import{t as e}from"./code.js";import{B as t,E as n,G as r,J as i,K as a,O as o,P as s,R as c,W as l,Y as u,z as d}from"./index-BpsDYWKC.js";import{a as f}from"./navbar.js";import{i as p,n as m,r as h,t as g}from"./title.js";import{t as _}from"./inline_code.js";import{t as v}from"./image.js";var y=`/frizzante-docs/assets/guards_diagram_1.svg`,b=`/frizzante-docs/assets/guards_diagram_2.svg`,x=o(`<!> <span>A guard is an object that is composed of an optional name and a required handler.</span> <br/> <span>You can add guards to your routes in order to protect them or modify their scope.</span> <!> <span>Guards will block all incoming requests by default, you must call <!> to explicitly allow the request through.</span> <br/> <span>In this example, the route <!> will decline requests with content type <!></span> <br/> <!> <br/> <br/> <!> <span>You can compose multiple guards in order to create more advanced restrictions.</span> <!> <br/> <!> <br/>`,1);function S(o,S){a(S,!0),h(o,{title:`Guards`,get prefix(){return S.prefix},rightSidebar:(e,t)=>{let n=()=>(t?.()).body;m(e,{get body(){return n()},items:[{shift:0,text:`Guards`},{shift:0,text:`Composition`}]})},footer:e=>{{let t=l(()=>({label:`Server Sent Events`,href:f(`/server_sent_events`,{prefix:S.prefix})})),n=l(()=>({label:`Views`,href:f(`/views`,{prefix:S.prefix})}));p(e,{get previous(){return s(t)},get next(){return s(n)}})}},children:(r,a)=>{var o=x(),s=d(o);g(s,{text:`Guards`});var l=t(s,8);e(l,{lang:`go`,source:`
            package main

            import (
                "main/lib/core/guards"
                "main/lib/core/routes"
                "main/lib/core/scopes"
                "main/lib/routes/data"
                "net/http"
            )

            var _ = []routes.Route{
                {
                    Pattern: "GET /api/xml/data",
                    Handler: data.Get,
                    Guards: []guards.Guard{
                        {
                            Name: "jsonless",
                            Handler: func(_ scopes.Scope, request *http.Request, writer http.ResponseWriter, allow func()) {
                                if request.Header.Get("Content-Type") == "application/json" {
                                    writer.WriteHeader(http.StatusBadRequest)
                                    return
                                }
                                allow()
                            },
                        },
                    },
                },
            }
        `});var f=t(l,2);_(t(c(f)),{source:`allow()`}),i(),u(f);var p=t(f,4),m=t(c(p));_(m,{source:`GET /api/xml/data`}),_(t(m,2),{source:`application/json`}),u(p);var h=t(p,4);v(h,{get src(){return y},width:`auto`});var S=t(h,6);g(S,{text:`Composition`});var C=t(S,4);e(C,{lang:`go`,source:`
            package main

            import (
                "main/lib/core/databases"
                "main/lib/core/databases/schema"
                "main/lib/core/guards"
                "main/lib/core/negotiate"
                "main/lib/core/routes"
                "main/lib/core/scopes"
                "main/lib/routes/dashboard"
                "main/lib/routes/public"
                "main/lib/routes/settings"
                "main/lib/routes/users"
                "net/http"
            )

            var _, queries, _ = databases.Connect()

            var authenticate = guards.Guard{
                Name: "authenticate",
                Handler: func(scope scopes.Scope, request *http.Request, writer http.ResponseWriter, allow func()) {
                    sessionId, _ := negotiate.SessionId(writer, request)
                    session, _ := queries.FindSessionById(request.Context(), sessionId)
                    if session.ID == "" {
                        writer.WriteHeader(401)
                        writer.Write([]byte("not authenticated"))
                        return
                    }
                    scope["session"] = session
                    allow()
                },
            }

            var authorize = guards.Guard{
                Name: "authorize",
                Handler: func(scope scopes.Scope, request *http.Request, writer http.ResponseWriter, allow func()) {
                    session, _ := scope["session"].(schema.Session)
                    if request.PathValue("user_id") != session.UserID {
                        writer.WriteHeader(403)
                        writer.Write([]byte("missing permissions"))
                        return
                    }
                    allow()
                },
            }

            var server_routes = []routes.Route{
                {Pattern: "GET /public", Handler: public.Get},
                {Pattern: "GET /dashboard", Handler: dashboard.Get, Guards: []guards.Guard{authenticate}},
                {Pattern: "GET /users/{user_id}/settings", Handler: settings.Get, Guards: []guards.Guard{authenticate, authorize}},
                {Pattern: "DELETE /users/{user_id}", Handler: users.Delete, Guards: []guards.Guard{authenticate, authorize}},
            }
        `}),v(t(C,4),{get src(){return b},width:`auto`}),i(2),n(r,o)},$$slots:{rightSidebar:!0,footer:!0,default:!0}}),r()}export{S as default};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VhcmRzLmpzIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9hc3NldHMvZ3VhcmRzX2RpYWdyYW1fMS5zdmciLCIuLi8uLi8uLi9saWIvYXNzZXRzL2d1YXJkc19kaWFncmFtXzIuc3ZnIiwiLi4vLi4vLi4vbGliL3ZpZXdzL2d1YXJkcy5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCJfX1ZJVEVfQVNTRVRfX1dQR1lqd0lseldWTk0xYlloT2M4M3dfX1wiIiwiZXhwb3J0IGRlZmF1bHQgXCJfX1ZJVEVfQVNTRVRfX1ZSQWt1NmZqZ2hrQXBJSVNpQldQemdfX1wiIiwiPHNjcmlwdCBsYW5nPVwidHNcIj5cbiAgICBpbXBvcnQgZGlhZ3JhbTEgZnJvbSBcIiRsaWIvYXNzZXRzL2d1YXJkc19kaWFncmFtXzEuc3ZnXCJcbiAgICBpbXBvcnQgZGlhZ3JhbTIgZnJvbSBcIiRsaWIvYXNzZXRzL2d1YXJkc19kaWFncmFtXzIuc3ZnXCJcbiAgICBpbXBvcnQgQ29kZSBmcm9tIFwiJGxpYi9jb21wb25lbnRzL2NvZGUuc3ZlbHRlXCJcbiAgICBpbXBvcnQgRm9vdGVyIGZyb20gXCIkbGliL2NvbXBvbmVudHMvZm9vdGVyLnN2ZWx0ZVwiXG4gICAgaW1wb3J0IEltYWdlIGZyb20gXCIkbGliL2NvbXBvbmVudHMvaW1hZ2Uuc3ZlbHRlXCJcbiAgICBpbXBvcnQgSW5saW5lQ29kZSBmcm9tIFwiJGxpYi9jb21wb25lbnRzL2lubGluZV9jb2RlLnN2ZWx0ZVwiXG4gICAgaW1wb3J0IFBhZ2UgZnJvbSBcIiRsaWIvY29tcG9uZW50cy9wYWdlLnN2ZWx0ZVwiXG4gICAgaW1wb3J0IFJpZ2h0U2lkZWJhciBmcm9tIFwiJGxpYi9jb21wb25lbnRzL3JpZ2h0X3NpZGViYXIuc3ZlbHRlXCJcbiAgICBpbXBvcnQgVGl0bGUgZnJvbSBcIiRsaWIvY29tcG9uZW50cy90aXRsZS5zdmVsdGVcIlxuICAgIGltcG9ydCB7IGJhc2UgfSBmcm9tIFwiJGxpYi9zY3JpcHRzL3N0cmluZ3MvYmFzZVwiXG4gICAgbGV0IHsgcHJlZml4IH0gPSAkcHJvcHMoKVxuPC9zY3JpcHQ+XG5cbjxQYWdlIHRpdGxlPVwiR3VhcmRzXCIge3ByZWZpeH0+XG4gICAgPFRpdGxlIHRleHQ9XCJHdWFyZHNcIiAvPlxuICAgIDxzcGFuPkEgZ3VhcmQgaXMgYW4gb2JqZWN0IHRoYXQgaXMgY29tcG9zZWQgb2YgYW4gb3B0aW9uYWwgbmFtZSBhbmQgYSByZXF1aXJlZCBoYW5kbGVyLjwvc3Bhbj5cbiAgICA8YnIgLz5cbiAgICA8c3Bhbj5Zb3UgY2FuIGFkZCBndWFyZHMgdG8geW91ciByb3V0ZXMgaW4gb3JkZXIgdG8gcHJvdGVjdCB0aGVtIG9yIG1vZGlmeSB0aGVpciBzY29wZS48L3NwYW4+XG4gICAgPENvZGVcbiAgICAgICAgbGFuZz1cImdvXCJcbiAgICAgICAgc291cmNlPXtgXG4gICAgICAgICAgICBwYWNrYWdlIG1haW5cblxuICAgICAgICAgICAgaW1wb3J0IChcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvZ3VhcmRzXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvcm91dGVzXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvc2NvcGVzXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL3JvdXRlcy9kYXRhXCJcbiAgICAgICAgICAgICAgICBcIm5ldC9odHRwXCJcbiAgICAgICAgICAgIClcblxuICAgICAgICAgICAgdmFyIF8gPSBbXXJvdXRlcy5Sb3V0ZXtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFBhdHRlcm46IFwiR0VUIC9hcGkveG1sL2RhdGFcIixcbiAgICAgICAgICAgICAgICAgICAgSGFuZGxlcjogZGF0YS5HZXQsXG4gICAgICAgICAgICAgICAgICAgIEd1YXJkczogW11ndWFyZHMuR3VhcmR7XG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmFtZTogXCJqc29ubGVzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhhbmRsZXI6IGZ1bmMoXyBzY29wZXMuU2NvcGUsIHJlcXVlc3QgKmh0dHAuUmVxdWVzdCwgd3JpdGVyIGh0dHAuUmVzcG9uc2VXcml0ZXIsIGFsbG93IGZ1bmMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiByZXF1ZXN0LkhlYWRlci5HZXQoXCJDb250ZW50LVR5cGVcIikgPT0gXCJhcHBsaWNhdGlvbi9qc29uXCIge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVyLldyaXRlSGVhZGVyKGh0dHAuU3RhdHVzQmFkUmVxdWVzdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbG93KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICBgfVxuICAgIC8+XG4gICAgPHNwYW4+XG4gICAgICAgIEd1YXJkcyB3aWxsIGJsb2NrIGFsbCBpbmNvbWluZyByZXF1ZXN0cyBieSBkZWZhdWx0LCB5b3UgbXVzdCBjYWxsIDxJbmxpbmVDb2RlIHNvdXJjZT1cImFsbG93KClcIiAvPlxuICAgICAgICB0byBleHBsaWNpdGx5IGFsbG93IHRoZSByZXF1ZXN0IHRocm91Z2guXG4gICAgPC9zcGFuPlxuICAgIDxiciAvPlxuICAgIDxzcGFuPlxuICAgICAgICBJbiB0aGlzIGV4YW1wbGUsIHRoZSByb3V0ZSA8SW5saW5lQ29kZSBzb3VyY2U9XCJHRVQgL2FwaS94bWwvZGF0YVwiIC8+IHdpbGwgZGVjbGluZSByZXF1ZXN0cyB3aXRoIGNvbnRlbnQgdHlwZSA8SW5saW5lQ29kZVxuICAgICAgICAgICAgc291cmNlPVwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgIC8+XG4gICAgPC9zcGFuPlxuICAgIDxiciAvPlxuICAgIDxJbWFnZSBzcmM9e2RpYWdyYW0xfSB3aWR0aD1cImF1dG9cIiAvPlxuICAgIDxiciAvPlxuICAgIDxiciAvPlxuICAgIDxUaXRsZSB0ZXh0PVwiQ29tcG9zaXRpb25cIiAvPlxuICAgIDxzcGFuPllvdSBjYW4gY29tcG9zZSBtdWx0aXBsZSBndWFyZHMgaW4gb3JkZXIgdG8gY3JlYXRlIG1vcmUgYWR2YW5jZWQgcmVzdHJpY3Rpb25zLjwvc3Bhbj5cbiAgICA8Q29kZVxuICAgICAgICBsYW5nPVwiZ29cIlxuICAgICAgICBzb3VyY2U9e2BcbiAgICAgICAgICAgIHBhY2thZ2UgbWFpblxuXG4gICAgICAgICAgICBpbXBvcnQgKFxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9kYXRhYmFzZXNcIlxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9kYXRhYmFzZXMvc2NoZW1hXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvZ3VhcmRzXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvbmVnb3RpYXRlXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvcm91dGVzXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvc2NvcGVzXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL3JvdXRlcy9kYXNoYm9hcmRcIlxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvcm91dGVzL3B1YmxpY1wiXG4gICAgICAgICAgICAgICAgXCJtYWluL2xpYi9yb3V0ZXMvc2V0dGluZ3NcIlxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvcm91dGVzL3VzZXJzXCJcbiAgICAgICAgICAgICAgICBcIm5ldC9odHRwXCJcbiAgICAgICAgICAgIClcblxuICAgICAgICAgICAgdmFyIF8sIHF1ZXJpZXMsIF8gPSBkYXRhYmFzZXMuQ29ubmVjdCgpXG5cbiAgICAgICAgICAgIHZhciBhdXRoZW50aWNhdGUgPSBndWFyZHMuR3VhcmR7XG4gICAgICAgICAgICAgICAgTmFtZTogXCJhdXRoZW50aWNhdGVcIixcbiAgICAgICAgICAgICAgICBIYW5kbGVyOiBmdW5jKHNjb3BlIHNjb3Blcy5TY29wZSwgcmVxdWVzdCAqaHR0cC5SZXF1ZXN0LCB3cml0ZXIgaHR0cC5SZXNwb25zZVdyaXRlciwgYWxsb3cgZnVuYygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25JZCwgXyA6PSBuZWdvdGlhdGUuU2Vzc2lvbklkKHdyaXRlciwgcmVxdWVzdClcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbiwgXyA6PSBxdWVyaWVzLkZpbmRTZXNzaW9uQnlJZChyZXF1ZXN0LkNvbnRleHQoKSwgc2Vzc2lvbklkKVxuICAgICAgICAgICAgICAgICAgICBpZiBzZXNzaW9uLklEID09IFwiXCIge1xuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVyLldyaXRlSGVhZGVyKDQwMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlci5Xcml0ZShbXWJ5dGUoXCJub3QgYXV0aGVudGljYXRlZFwiKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlW1wic2Vzc2lvblwiXSA9IHNlc3Npb25cbiAgICAgICAgICAgICAgICAgICAgYWxsb3coKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBhdXRob3JpemUgPSBndWFyZHMuR3VhcmR7XG4gICAgICAgICAgICAgICAgTmFtZTogXCJhdXRob3JpemVcIixcbiAgICAgICAgICAgICAgICBIYW5kbGVyOiBmdW5jKHNjb3BlIHNjb3Blcy5TY29wZSwgcmVxdWVzdCAqaHR0cC5SZXF1ZXN0LCB3cml0ZXIgaHR0cC5SZXNwb25zZVdyaXRlciwgYWxsb3cgZnVuYygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb24sIF8gOj0gc2NvcGVbXCJzZXNzaW9uXCJdLihzY2hlbWEuU2Vzc2lvbilcbiAgICAgICAgICAgICAgICAgICAgaWYgcmVxdWVzdC5QYXRoVmFsdWUoXCJ1c2VyX2lkXCIpICE9IHNlc3Npb24uVXNlcklEIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlci5Xcml0ZUhlYWRlcig0MDMpXG4gICAgICAgICAgICAgICAgICAgICAgICB3cml0ZXIuV3JpdGUoW11ieXRlKFwibWlzc2luZyBwZXJtaXNzaW9uc1wiKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGFsbG93KClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc2VydmVyX3JvdXRlcyA9IFtdcm91dGVzLlJvdXRle1xuICAgICAgICAgICAgICAgIHtQYXR0ZXJuOiBcIkdFVCAvcHVibGljXCIsIEhhbmRsZXI6IHB1YmxpYy5HZXR9LFxuICAgICAgICAgICAgICAgIHtQYXR0ZXJuOiBcIkdFVCAvZGFzaGJvYXJkXCIsIEhhbmRsZXI6IGRhc2hib2FyZC5HZXQsIEd1YXJkczogW11ndWFyZHMuR3VhcmR7YXV0aGVudGljYXRlfX0sXG4gICAgICAgICAgICAgICAge1BhdHRlcm46IFwiR0VUIC91c2Vycy97dXNlcl9pZH0vc2V0dGluZ3NcIiwgSGFuZGxlcjogc2V0dGluZ3MuR2V0LCBHdWFyZHM6IFtdZ3VhcmRzLkd1YXJke2F1dGhlbnRpY2F0ZSwgYXV0aG9yaXplfX0sXG4gICAgICAgICAgICAgICAge1BhdHRlcm46IFwiREVMRVRFIC91c2Vycy97dXNlcl9pZH1cIiwgSGFuZGxlcjogdXNlcnMuRGVsZXRlLCBHdWFyZHM6IFtdZ3VhcmRzLkd1YXJke2F1dGhlbnRpY2F0ZSwgYXV0aG9yaXplfX0sXG4gICAgICAgICAgICB9XG4gICAgICAgIGB9XG4gICAgLz5cbiAgICA8YnIgLz5cbiAgICA8SW1hZ2Ugc3JjPXtkaWFncmFtMn0gd2lkdGg9XCJhdXRvXCIgLz5cbiAgICA8YnIgLz5cbiAgICB7I3NuaXBwZXQgcmlnaHRTaWRlYmFyKHsgYm9keSB9KX1cbiAgICAgICAgPFJpZ2h0U2lkZWJhclxuICAgICAgICAgICAge2JvZHl9XG4gICAgICAgICAgICBpdGVtcz17W1xuICAgICAgICAgICAgICAgIHsgc2hpZnQ6IDAsIHRleHQ6IFwiR3VhcmRzXCIgfSxcbiAgICAgICAgICAgICAgICB7IHNoaWZ0OiAwLCB0ZXh0OiBcIkNvbXBvc2l0aW9uXCIgfSxcbiAgICAgICAgICAgIF19XG4gICAgICAgIC8+XG4gICAgey9zbmlwcGV0fVxuICAgIHsjc25pcHBldCBmb290ZXIoKX1cbiAgICAgICAgPEZvb3RlclxuICAgICAgICAgICAgcHJldmlvdXM9e3sgbGFiZWw6IFwiU2VydmVyIFNlbnQgRXZlbnRzXCIsIGhyZWY6IGJhc2UoXCIvc2VydmVyX3NlbnRfZXZlbnRzXCIsIHsgcHJlZml4IH0pIH19XG4gICAgICAgICAgICBuZXh0PXt7IGxhYmVsOiBcIlZpZXdzXCIsIGhyZWY6IGJhc2UoXCIvdmlld3NcIiwgeyBwcmVmaXggfSkgfX1cbiAgICAgICAgLz5cbiAgICB7L3NuaXBwZXR9XG48L1BhZ2U+XG4iXSwibWFwcGluZ3MiOiJvU0FBQSxJQUFBLEVBQWUsOENDQWYsRUFBZSxzbkJDQWYsU0FjQyxFQUFJLEVBQUEsOENBa0hTLGNBQVksRUFBQSxJQUFBLEtBQUcsT0FBSSxJQUFBLEVBQUEsQ0FBSixLQUNwQixFQUFBLEVBQUEsbUJBQ0ksRUFBSSxXQUVDLE1BQU8sRUFBRyxLQUFNLFFBQVEsRUFBQSxDQUN4QixNQUFPLEVBQUcsS0FBTSxhQUFhLENBQUEsS0FJakMsT0FBTSxHQUFBLGdCQUVJLE1BQU8scUJBQXNCLEtBQU0sRUFBSyxzQkFBcUIsQ0FBSSxPQUFNLEVBQUEsTUFBQSxDQUFBLGVBQzNFLE1BQU8sUUFBUyxLQUFNLEVBQUssU0FBUSxDQUFJLE9BQU0sRUFBQSxNQUFBLENBQUEsS0FGeEQsRUFBQSxFQUFBLDJGQTNISixFQUFLLEVBQUEsQ0FBQSxLQUFBLFFBQUEsQ0FBQSxlQUlMLEVBQUEsRUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBaUNBLEVBQUksRUFBQSxFQUFBLENBQUEsRUFDa0UsRUFBQSxFQUFBLEVBRHRFLENBQUksQ0FDNEUsRUFBQSxDQUFBLE9BQUEsU0FBQSxDQUFBLFFBRGhGLENBQUksTUFLSixFQUFJLEVBTEosRUFBSSxDQUFBLFFBS0osQ0FBSSxDQUFBLEVBQzJCLEVBQVUsRUFBQSxDQUFBLE9BQUEsbUJBQUEsQ0FBQSxFQUF3RSxFQUFBLEVBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxPQUFBLGtCQUFBLENBQUEsSUFEakgsQ0FBSSxVQUFKLEVBQUksQ0FBQSxFQU1KLEVBQUssRUFBQSxrQkFBTSwrQkFHWCxFQUFLLEVBQUEsQ0FBQSxLQUFBLGFBQUEsQ0FBQSxlQUVMLEVBQUEsRUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUEwREEsRUFBQSxFQUFBLEVBQUEsQ0FBSyxFQUFBLGtCQUFNLG1GQWxIUiJ9