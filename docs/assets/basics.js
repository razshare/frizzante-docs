import{t as e}from"./code.js";import{B as t,E as n,G as r,J as i,K as a,O as o,P as s,R as c,W as l,Y as u,u as ee,z as d}from"./index-BpsDYWKC.js";import{a as f,s as te}from"./navbar.js";import{t as ne}from"./caution.js";import{i as p,n as m,r as h,t as g}from"./title.js";import{t as _}from"./inline_code.js";import{t as re}from"./note.js";import{t as ie}from"./tip.js";var ae=o(`<span>You are also welcome to <a>contribute</a> back if you can.</span>`),oe=o(`<span>Form structs can define slices and files.</span> <!> <span>You can open and read the file.</span> <!> <span>Remember to close your files.</span> <!>`,1),se=o(`<span>Session id must always be negotiated before invoking <!>.</span>`),ce=o(`<span>The session id is retrieved from the client’s <!> cookie.</span> <br/> <span>If the client doesn’t provide such cookie, <!> creates a new session id and sends the cookie to the client.</span> <!>`,1),le=o(`<!> <span>All internals of the framework are exposed.</span> <br/> <span>You can modify these internals, in fact it is intended for you to do so.</span> <!> <br/> <br/> <!> <span>You can start an http server with <!>.</span> <!> <br/> <br/> <!> <span>Route patterns can define dynamic path fields using <!> syntax.</span> <br/> <span>Path fields can then be retrieved with <!>.</span> <!> <br/> <br/> <!> <span>Use <!> to retrieve messages sent by the client.</span> <!> <span>Use <!> to send a message to the client.</span> <!> <br/> <br/> <!> <span>Use <!> to retrieve header fields sent by the client.</span> <!> <span>Use <!> and <!> to send header fields to the client.</span> <!> <br/> <br/> <!> <span>Use <!> to retrieve query fields.</span> <!> <br/> <br/> <!> <span>Use <!> to receive content as multipart form or url encoded form when using <!> and <!> http verbs.</span> <!> <!> <br/> <br/> <!> <span>Use <!> to receive content as json when using <!> and <!> http verbs and <!> to send json content.</span> <!> <br/> <br/> <!> <span>Use <!> to retrieve cookies and <!> to send
        them.</span> <!> <br/> <br/> <!> <span>Use <!> to negotiate a session session id with the client.</span> <!> <!> <br/> <br/> <!> <span>Use <!> to redirect to another page.</span> <!>`,1);function v(o,v){a(v,!0),h(o,{title:`Basics`,get prefix(){return v.prefix},rightSidebar:(e,t)=>{let n=()=>(t?.()).body;m(e,{get body(){return n()},items:[{shift:0,text:`Basics`},{shift:0,text:`Serve`},{shift:0,text:`Path Fields`},{shift:0,text:`Messages`},{shift:0,text:`Headers Fields & Status`},{shift:0,text:`Queries`},{shift:0,text:`Forms`},{shift:0,text:`Json`},{shift:0,text:`Cookies`},{shift:0,text:`Session Id`},{shift:0,text:`Redirect`}]})},footer:e=>{{let t=l(()=>({label:`Get Started`,href:f(`/get_started`,{prefix:v.prefix})})),n=l(()=>({label:`Web Sockets`,href:f(`/web_sockets`,{prefix:v.prefix})}));p(e,{get previous(){return s(t)},get next(){return s(n)}})}},children:(r,a)=>{var o=le(),s=d(o);g(s,{text:`Basics`});var l=t(s,8);re(l,{children:(e,r)=>{var a=ae();ee(t(c(a)),e=>({...e}),[()=>te(f(`/contributing`,{prefix:v.prefix}))]),i(),u(a),n(e,a)},$$slots:{default:!0}});var p=t(l,6);g(p,{text:`Serve`});var m=t(p,2);_(t(c(m)),{source:`servers.Start()`}),i(),u(m);var h=t(m,2);e(h,{lang:`go`,source:`
            package main

            import (
                "main/lib/core/routes"
                "main/lib/core/scopes"
                "main/lib/core/servers"
                "net/http"
            )

            var _ = servers.Start(servers.StartOptions{ // Starts server.
                Routes: []routes.Route{
                    {
                        Pattern: "GET /", 
                        Handler: func(_ scopes.Scope, request *http.Request, writer http.ResponseWriter) {
                            // ---> Handle request here. <---
                        },
                    },
                },
            })
        `});var y=t(h,6);g(y,{text:`Path Fields`});var b=t(y,2);_(t(c(b)),{source:`{}`}),i(),u(b);var x=t(b,4);_(t(c(x)),{source:`request.PathValue()`}),i(),u(x);var ue=t(x,2);e(ue,{lang:`go`,source:`
            package main

            import (
                "main/lib/core/routes"
                "main/lib/core/scopes"
                "net/http"
            )

            var _ = routes.Route{
                Pattern: "GET /{name}",
                Handler: func(_ scopes.Scope, request *http.Request, _ http.ResponseWriter) {
                    _ = request.PathValue("name") // Receives path field "name".
                },
            }
        `});var S=t(ue,6);g(S,{text:`Messages`});var C=t(S,2);_(t(c(C)),{source:`io.ReadAll()`}),i(),u(C);var w=t(C,2);e(w,{lang:`go`,source:`
            package main

            import (
                "io"
                "main/lib/core/routes"
                "main/lib/core/scopes"
                "net/http"
            )

            var _ = routes.Route{
                Pattern: "GET /",
                Handler: func(_ scopes.Scope, request *http.Request, _ http.ResponseWriter) {
                    _, _ = io.ReadAll(request.Body) // Receives message.
                },
            }
        `});var T=t(w,2);_(t(c(T)),{source:`writer.Write()`}),i(),u(T);var E=t(T,2);e(E,{lang:`go`,source:`
            package main

            import (
                "main/lib/core/routes"
                "main/lib/core/scopes"
                "net/http"
            )

            var _ = routes.Route{
                Pattern: "GET /",
                Handler: func(_ scopes.Scope, _ *http.Request, writer http.ResponseWriter) {
                    _, _ = writer.Write([]byte("hello")) // Sends message "hello".
                },
            }
        `});var D=t(E,6);g(D,{text:`Headers Fields & Status`});var O=t(D,2);_(t(c(O)),{source:`request.Header.Get()`}),i(),u(O);var k=t(O,2);e(k,{lang:`go`,source:`
            package main

            import (
                "main/lib/core/routes"
                "main/lib/core/scopes"
                "net/http"
            )

            var _ = routes.Route{
                Pattern: "GET /",
                Handler: func(_ scopes.Scope, request *http.Request, _ http.ResponseWriter) {
                    _ = request.Header.Get("Accept") // Retrieves header field "Accept".
                },
            }
        `});var A=t(k,2),j=t(c(A));_(j,{source:`writer.Header().Set()`}),_(t(j,2),{source:`writer.WriteHeader()`}),i(),u(A);var M=t(A,2);e(M,{lang:`go`,source:`
            package main

            import (
                "main/lib/core/routes"
                "main/lib/core/scopes"
                "net/http"
            )

            var _ = routes.Route{
                Pattern: "GET /",
                Handler: func(_ scopes.Scope, _ *http.Request, writer http.ResponseWriter) {
                    writer.Header().Set("Content-Type", "text/html") // Sets header field "Content-Type" 
                                                                     // with value "text/html".
                    writer.WriteHeader(200)                          // Sends status 200 and 
                                                                     // header fields to the client.
                },
            }
        `});var N=t(M,6);g(N,{text:`Queries`});var P=t(N,2);_(t(c(P)),{source:`request.URL.Query().Get()`}),i(),u(P);var F=t(P,2);e(F,{lang:`go`,source:`
            package main

            import (
                "main/lib/core/routes"
                "main/lib/core/scopes"
                "net/http"
            )

            var _ = routes.Route{
                Pattern: "GET /",
                Handler: func(_ scopes.Scope, request *http.Request, _ http.ResponseWriter) {
                    _ = request.URL.Query().Get("name") // Retrieves query field "name".
                },
            }
        `});var I=t(F,6);g(I,{text:`Forms`});var L=t(I,2),R=t(c(L));_(R,{source:`receive.Form()`});var z=t(R,2);_(z,{source:`POST`}),_(t(z,2),{source:`GET`}),i(),u(L);var B=t(L,2);e(B,{lang:`go`,source:`
            package main

            import (
                "main/lib/core/receive"
                "main/lib/core/routes"
                "main/lib/core/scopes"
                "net/http"
            )

            var _ = routes.Route{
                Pattern: "GET /",
                Handler: func(_ scopes.Scope, request *http.Request, _ http.ResponseWriter) {
                    var form struct {                // Creates a zero initialized form.
                        Name string \`form:"name"\`
                    }
                    _ = receive.Form(request, &form) // Receives data into form.
                },
            }
        `});var V=t(B,2);ie(V,{children:(r,i)=>{var a=oe(),o=t(d(a),2);e(o,{lang:`go`,source:`
                package main

                import (
                    "main/lib/core/receive"
                    "main/lib/core/routes"
                    "main/lib/core/scopes"
                    "mime/multipart"
                    "net/http"
                )

                var _ = routes.Route{
                    Pattern: "GET /",
                    Handler: func(_ scopes.Scope, request *http.Request, _ http.ResponseWriter) {
                        var form struct {
                            Name     string               \`form:"name"\`
                            Comments []string             \`form:"comments"\` // Slice of strings.
                            File     multipart.FileHeader \`form:"file"\`     // File handler.
                        }
                        _ = receive.Form(request, &form) // Receives data into form.
                    },
                }
            `});var s=t(o,4);e(s,{lang:`go`,source:`
                src, _ := form.File.Open()
                dst, _ := os.Create("my-file.txt")
                io.Copy(src, dst)
            `}),e(t(s,4),{lang:`go`,source:`
                defer src.Close()
                defer dst.Close()
            `}),n(r,a)},$$slots:{default:!0}});var H=t(V,6);g(H,{text:`Json`});var U=t(H,2),W=t(c(U));_(W,{source:`receive.Json()`});var G=t(W,2);_(G,{source:`POST`});var K=t(G,2);_(K,{source:`PUT`}),_(t(K,2),{source:`send.Json()`}),i(),u(U);var q=t(U,2);e(q,{lang:`go`,source:`
            package main

            import (
                "main/lib/core/receive"
                "main/lib/core/routes"
                "main/lib/core/scopes"
                "main/lib/core/send"
                "net/http"
            )

            type GreetingDetails struct {   // Defines a struct in which to
                Name string \`json:"name"\` // store the json content.
            }

            var _ = routes.Route{
                Pattern: "GET /",
                Handler: func(_ scopes.Scope, request *http.Request, writer http.ResponseWriter) {
                    var details GreetingDetails         // Creates a zero value.
                    _ = receive.Json(request, &details) // Unmarshals the content into details.
                    _ = send.Json(writer, details)      // Sends content back as json.
                },
            }
        `});var J=t(q,6);g(J,{text:`Cookies`});var Y=t(J,2),X=t(c(Y));_(X,{source:`receive.Cookie()`}),_(t(X,2),{source:`send.Cookie()`}),i(),u(Y);var Z=t(Y,2);e(Z,{lang:`go`,source:`
            package main

            import (
                "main/lib/core/receive"
                "main/lib/core/routes"
                "main/lib/core/scopes"
                "main/lib/core/send"
                "net/http"
            )

            var _ = routes.Route{
                Pattern: "GET /",
                Handler: func(_ scopes.Scope, request *http.Request, writer http.ResponseWriter) {
                    nickname, _ := receive.Cookie(request, "nickname") // Retrieves cookie "nickname".
                    send.Cookie(writer, "nickname", nickname)          // Sends it back.
                },
            }
        `});var de=t(Z,6);g(de,{text:`Session Id`});var Q=t(de,2);_(t(c(Q)),{source:`negotiate.SessionId()`}),i(),u(Q);var fe=t(Q,2);e(fe,{lang:`go`,source:`
            package main

            import (
                "main/lib/core/negotiate"
                "main/lib/core/routes"
                "main/lib/core/scopes"
                "net/http"
            )

            var _ = routes.Route{
                Pattern: "GET /",
                Handler: func(_ scopes.Scope, request *http.Request, writer http.ResponseWriter) {
                    _, _ = negotiate.SessionId(writer, request) // Negotiates session id and returns it.
                },
            }
        `});var pe=t(fe,2);re(pe,{children:(e,r)=>{var a=ce(),o=d(a);_(t(c(o)),{source:`session-id`}),i(),u(o);var s=t(o,4);_(t(c(s)),{source:`negotiate.SessionId()`}),i(),u(s),ne(t(s,2),{children:(e,r)=>{var a=se();_(t(c(a)),{source:`writer.WriteHeader()`}),i(),u(a),n(e,a)},$$slots:{default:!0}}),n(e,a)},$$slots:{default:!0}});var me=t(pe,6);g(me,{text:`Redirect`});var $=t(me,2);_(t(c($)),{source:`send.ToLocation()`}),i(),u($),e(t($,2),{lang:`go`,source:`
            package main

            import (
                "main/lib/core/routes"
                "main/lib/core/scopes"
                "main/lib/core/send"
                "net/http"
            )

            var _ = routes.Route{
                Pattern: "GET /",
                Handler: func(_ scopes.Scope, _ *http.Request, writer http.ResponseWriter) {
                    send.ToLocation(writer, "/some-other-page") // Sends client to some-other-page.
                },
            }
        `}),n(r,o)},$$slots:{rightSidebar:!0,footer:!0,default:!0}}),r()}export{v as default};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWNzLmpzIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi92aWV3cy9iYXNpY3Muc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgbGFuZz1cInRzXCI+XG4gICAgaW1wb3J0IENhdXRpb24gZnJvbSBcIiRsaWIvY29tcG9uZW50cy9jYXV0aW9uLnN2ZWx0ZVwiXG4gICAgaW1wb3J0IENvZGUgZnJvbSBcIiRsaWIvY29tcG9uZW50cy9jb2RlLnN2ZWx0ZVwiXG4gICAgaW1wb3J0IEZvb3RlciBmcm9tIFwiJGxpYi9jb21wb25lbnRzL2Zvb3Rlci5zdmVsdGVcIlxuICAgIGltcG9ydCBJbmxpbmVDb2RlIGZyb20gXCIkbGliL2NvbXBvbmVudHMvaW5saW5lX2NvZGUuc3ZlbHRlXCJcbiAgICBpbXBvcnQgTm90ZSBmcm9tIFwiJGxpYi9jb21wb25lbnRzL25vdGUuc3ZlbHRlXCJcbiAgICBpbXBvcnQgUGFnZSBmcm9tIFwiJGxpYi9jb21wb25lbnRzL3BhZ2Uuc3ZlbHRlXCJcbiAgICBpbXBvcnQgUmlnaHRTaWRlYmFyIGZyb20gXCIkbGliL2NvbXBvbmVudHMvcmlnaHRfc2lkZWJhci5zdmVsdGVcIlxuICAgIGltcG9ydCBUaXAgZnJvbSBcIiRsaWIvY29tcG9uZW50cy90aXAuc3ZlbHRlXCJcbiAgICBpbXBvcnQgVGl0bGUgZnJvbSBcIiRsaWIvY29tcG9uZW50cy90aXRsZS5zdmVsdGVcIlxuICAgIGltcG9ydCB7IGhyZWYgfSBmcm9tIFwiJGxpYi9zY3JpcHRzL2NvcmUvaHJlZi5zdmVsdGVcIlxuICAgIGltcG9ydCB7IGJhc2UgfSBmcm9tIFwiJGxpYi9zY3JpcHRzL3N0cmluZ3MvYmFzZVwiXG4gICAgbGV0IHsgcHJlZml4IH0gPSAkcHJvcHMoKVxuPC9zY3JpcHQ+XG5cbjxQYWdlIHRpdGxlPVwiQmFzaWNzXCIge3ByZWZpeH0+XG4gICAgPFRpdGxlIHRleHQ9XCJCYXNpY3NcIiAvPlxuICAgIDxzcGFuPiBBbGwgaW50ZXJuYWxzIG9mIHRoZSBmcmFtZXdvcmsgYXJlIGV4cG9zZWQuIDwvc3Bhbj5cbiAgICA8YnIgLz5cbiAgICA8c3Bhbj4gWW91IGNhbiBtb2RpZnkgdGhlc2UgaW50ZXJuYWxzLCBpbiBmYWN0IGl0IGlzIGludGVuZGVkIGZvciB5b3UgdG8gZG8gc28uIDwvc3Bhbj5cbiAgICA8Tm90ZT5cbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICBZb3UgYXJlIGFsc28gd2VsY29tZSB0byA8YSB7Li4uaHJlZihiYXNlKFwiL2NvbnRyaWJ1dGluZ1wiLCB7IHByZWZpeCB9KSl9PmNvbnRyaWJ1dGU8L2E+IGJhY2sgaWYgeW91IGNhbi5cbiAgICAgICAgPC9zcGFuPlxuICAgIDwvTm90ZT5cbiAgICA8YnIgLz5cbiAgICA8YnIgLz5cbiAgICA8VGl0bGUgdGV4dD1cIlNlcnZlXCIgLz5cbiAgICA8c3Bhbj5cbiAgICAgICAgWW91IGNhbiBzdGFydCBhbiBodHRwIHNlcnZlciB3aXRoIDxJbmxpbmVDb2RlIHNvdXJjZT1cInNlcnZlcnMuU3RhcnQoKVwiIC8+LlxuICAgIDwvc3Bhbj5cbiAgICA8Q29kZVxuICAgICAgICBsYW5nPVwiZ29cIlxuICAgICAgICBzb3VyY2U9e2BcbiAgICAgICAgICAgIHBhY2thZ2UgbWFpblxuXG4gICAgICAgICAgICBpbXBvcnQgKFxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9yb3V0ZXNcIlxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9zY29wZXNcIlxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9zZXJ2ZXJzXCJcbiAgICAgICAgICAgICAgICBcIm5ldC9odHRwXCJcbiAgICAgICAgICAgIClcblxuICAgICAgICAgICAgdmFyIF8gPSBzZXJ2ZXJzLlN0YXJ0KHNlcnZlcnMuU3RhcnRPcHRpb25zeyAvLyBTdGFydHMgc2VydmVyLlxuICAgICAgICAgICAgICAgIFJvdXRlczogW11yb3V0ZXMuUm91dGV7XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFBhdHRlcm46IFwiR0VUIC9cIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICBIYW5kbGVyOiBmdW5jKF8gc2NvcGVzLlNjb3BlLCByZXF1ZXN0ICpodHRwLlJlcXVlc3QsIHdyaXRlciBodHRwLlJlc3BvbnNlV3JpdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gLS0tPiBIYW5kbGUgcmVxdWVzdCBoZXJlLiA8LS0tXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KVxuICAgICAgICBgfVxuICAgIC8+XG4gICAgPGJyIC8+XG4gICAgPGJyIC8+XG4gICAgPFRpdGxlIHRleHQ9XCJQYXRoIEZpZWxkc1wiIC8+XG4gICAgPHNwYW4+Um91dGUgcGF0dGVybnMgY2FuIGRlZmluZSBkeW5hbWljIHBhdGggZmllbGRzIHVzaW5nIDxJbmxpbmVDb2RlIHNvdXJjZT17XCJ7fVwifSAvPiBzeW50YXguPC9zcGFuPlxuICAgIDxiciAvPlxuICAgIDxzcGFuPlBhdGggZmllbGRzIGNhbiB0aGVuIGJlIHJldHJpZXZlZCB3aXRoIDxJbmxpbmVDb2RlIHNvdXJjZT1cInJlcXVlc3QuUGF0aFZhbHVlKClcIiAvPi48L3NwYW4+XG4gICAgPENvZGVcbiAgICAgICAgbGFuZz1cImdvXCJcbiAgICAgICAgc291cmNlPXtgXG4gICAgICAgICAgICBwYWNrYWdlIG1haW5cblxuICAgICAgICAgICAgaW1wb3J0IChcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvcm91dGVzXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvc2NvcGVzXCJcbiAgICAgICAgICAgICAgICBcIm5ldC9odHRwXCJcbiAgICAgICAgICAgIClcblxuICAgICAgICAgICAgdmFyIF8gPSByb3V0ZXMuUm91dGV7XG4gICAgICAgICAgICAgICAgUGF0dGVybjogXCJHRVQgL3tuYW1lfVwiLFxuICAgICAgICAgICAgICAgIEhhbmRsZXI6IGZ1bmMoXyBzY29wZXMuU2NvcGUsIHJlcXVlc3QgKmh0dHAuUmVxdWVzdCwgXyBodHRwLlJlc3BvbnNlV3JpdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIF8gPSByZXF1ZXN0LlBhdGhWYWx1ZShcIm5hbWVcIikgLy8gUmVjZWl2ZXMgcGF0aCBmaWVsZCBcIm5hbWVcIi5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICBgfVxuICAgIC8+XG4gICAgPGJyIC8+XG4gICAgPGJyIC8+XG4gICAgPFRpdGxlIHRleHQ9XCJNZXNzYWdlc1wiIC8+XG4gICAgPHNwYW4+VXNlIDxJbmxpbmVDb2RlIHNvdXJjZT1cImlvLlJlYWRBbGwoKVwiIC8+IHRvIHJldHJpZXZlIG1lc3NhZ2VzIHNlbnQgYnkgdGhlIGNsaWVudC48L3NwYW4+XG4gICAgPENvZGVcbiAgICAgICAgbGFuZz1cImdvXCJcbiAgICAgICAgc291cmNlPXtgXG4gICAgICAgICAgICBwYWNrYWdlIG1haW5cblxuICAgICAgICAgICAgaW1wb3J0IChcbiAgICAgICAgICAgICAgICBcImlvXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvcm91dGVzXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvc2NvcGVzXCJcbiAgICAgICAgICAgICAgICBcIm5ldC9odHRwXCJcbiAgICAgICAgICAgIClcblxuICAgICAgICAgICAgdmFyIF8gPSByb3V0ZXMuUm91dGV7XG4gICAgICAgICAgICAgICAgUGF0dGVybjogXCJHRVQgL1wiLFxuICAgICAgICAgICAgICAgIEhhbmRsZXI6IGZ1bmMoXyBzY29wZXMuU2NvcGUsIHJlcXVlc3QgKmh0dHAuUmVxdWVzdCwgXyBodHRwLlJlc3BvbnNlV3JpdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIF8sIF8gPSBpby5SZWFkQWxsKHJlcXVlc3QuQm9keSkgLy8gUmVjZWl2ZXMgbWVzc2FnZS5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICBgfVxuICAgIC8+XG4gICAgPHNwYW4+VXNlIDxJbmxpbmVDb2RlIHNvdXJjZT1cIndyaXRlci5Xcml0ZSgpXCIgLz4gdG8gc2VuZCBhIG1lc3NhZ2UgdG8gdGhlIGNsaWVudC48L3NwYW4+XG4gICAgPENvZGVcbiAgICAgICAgbGFuZz1cImdvXCJcbiAgICAgICAgc291cmNlPXtgXG4gICAgICAgICAgICBwYWNrYWdlIG1haW5cblxuICAgICAgICAgICAgaW1wb3J0IChcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvcm91dGVzXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvc2NvcGVzXCJcbiAgICAgICAgICAgICAgICBcIm5ldC9odHRwXCJcbiAgICAgICAgICAgIClcblxuICAgICAgICAgICAgdmFyIF8gPSByb3V0ZXMuUm91dGV7XG4gICAgICAgICAgICAgICAgUGF0dGVybjogXCJHRVQgL1wiLFxuICAgICAgICAgICAgICAgIEhhbmRsZXI6IGZ1bmMoXyBzY29wZXMuU2NvcGUsIF8gKmh0dHAuUmVxdWVzdCwgd3JpdGVyIGh0dHAuUmVzcG9uc2VXcml0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgXywgXyA9IHdyaXRlci5Xcml0ZShbXWJ5dGUoXCJoZWxsb1wiKSkgLy8gU2VuZHMgbWVzc2FnZSBcImhlbGxvXCIuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgYH1cbiAgICAvPlxuICAgIDxiciAvPlxuICAgIDxiciAvPlxuICAgIDxUaXRsZSB0ZXh0PVwiSGVhZGVycyBGaWVsZHMgJiBTdGF0dXNcIiAvPlxuICAgIDxzcGFuPlVzZSA8SW5saW5lQ29kZSBzb3VyY2U9XCJyZXF1ZXN0LkhlYWRlci5HZXQoKVwiIC8+IHRvIHJldHJpZXZlIGhlYWRlciBmaWVsZHMgc2VudCBieSB0aGUgY2xpZW50Ljwvc3Bhbj5cbiAgICA8Q29kZVxuICAgICAgICBsYW5nPVwiZ29cIlxuICAgICAgICBzb3VyY2U9e2BcbiAgICAgICAgICAgIHBhY2thZ2UgbWFpblxuXG4gICAgICAgICAgICBpbXBvcnQgKFxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9yb3V0ZXNcIlxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9zY29wZXNcIlxuICAgICAgICAgICAgICAgIFwibmV0L2h0dHBcIlxuICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICB2YXIgXyA9IHJvdXRlcy5Sb3V0ZXtcbiAgICAgICAgICAgICAgICBQYXR0ZXJuOiBcIkdFVCAvXCIsXG4gICAgICAgICAgICAgICAgSGFuZGxlcjogZnVuYyhfIHNjb3Blcy5TY29wZSwgcmVxdWVzdCAqaHR0cC5SZXF1ZXN0LCBfIGh0dHAuUmVzcG9uc2VXcml0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgXyA9IHJlcXVlc3QuSGVhZGVyLkdldChcIkFjY2VwdFwiKSAvLyBSZXRyaWV2ZXMgaGVhZGVyIGZpZWxkIFwiQWNjZXB0XCIuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgYH1cbiAgICAvPlxuICAgIDxzcGFuPlxuICAgICAgICBVc2UgPElubGluZUNvZGUgc291cmNlPVwid3JpdGVyLkhlYWRlcigpLlNldCgpXCIgLz4gYW5kXG4gICAgICAgIDxJbmxpbmVDb2RlIHNvdXJjZT1cIndyaXRlci5Xcml0ZUhlYWRlcigpXCIgLz4gdG8gc2VuZCBoZWFkZXIgZmllbGRzIHRvIHRoZSBjbGllbnQuXG4gICAgPC9zcGFuPlxuICAgIDxDb2RlXG4gICAgICAgIGxhbmc9XCJnb1wiXG4gICAgICAgIHNvdXJjZT17YFxuICAgICAgICAgICAgcGFja2FnZSBtYWluXG5cbiAgICAgICAgICAgIGltcG9ydCAoXG4gICAgICAgICAgICAgICAgXCJtYWluL2xpYi9jb3JlL3JvdXRlc1wiXG4gICAgICAgICAgICAgICAgXCJtYWluL2xpYi9jb3JlL3Njb3Blc1wiXG4gICAgICAgICAgICAgICAgXCJuZXQvaHR0cFwiXG4gICAgICAgICAgICApXG5cbiAgICAgICAgICAgIHZhciBfID0gcm91dGVzLlJvdXRle1xuICAgICAgICAgICAgICAgIFBhdHRlcm46IFwiR0VUIC9cIixcbiAgICAgICAgICAgICAgICBIYW5kbGVyOiBmdW5jKF8gc2NvcGVzLlNjb3BlLCBfICpodHRwLlJlcXVlc3QsIHdyaXRlciBodHRwLlJlc3BvbnNlV3JpdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHdyaXRlci5IZWFkZXIoKS5TZXQoXCJDb250ZW50LVR5cGVcIiwgXCJ0ZXh0L2h0bWxcIikgLy8gU2V0cyBoZWFkZXIgZmllbGQgXCJDb250ZW50LVR5cGVcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdpdGggdmFsdWUgXCJ0ZXh0L2h0bWxcIi5cbiAgICAgICAgICAgICAgICAgICAgd3JpdGVyLldyaXRlSGVhZGVyKDIwMCkgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNlbmRzIHN0YXR1cyAyMDAgYW5kIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaGVhZGVyIGZpZWxkcyB0byB0aGUgY2xpZW50LlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgIGB9XG4gICAgLz5cbiAgICA8YnIgLz5cbiAgICA8YnIgLz5cbiAgICA8VGl0bGUgdGV4dD1cIlF1ZXJpZXNcIiAvPlxuICAgIDxzcGFuPlVzZSA8SW5saW5lQ29kZSBzb3VyY2U9XCJyZXF1ZXN0LlVSTC5RdWVyeSgpLkdldCgpXCIgLz4gdG8gcmV0cmlldmUgcXVlcnkgZmllbGRzLjwvc3Bhbj5cbiAgICA8Q29kZVxuICAgICAgICBsYW5nPVwiZ29cIlxuICAgICAgICBzb3VyY2U9e2BcbiAgICAgICAgICAgIHBhY2thZ2UgbWFpblxuXG4gICAgICAgICAgICBpbXBvcnQgKFxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9yb3V0ZXNcIlxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9zY29wZXNcIlxuICAgICAgICAgICAgICAgIFwibmV0L2h0dHBcIlxuICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICB2YXIgXyA9IHJvdXRlcy5Sb3V0ZXtcbiAgICAgICAgICAgICAgICBQYXR0ZXJuOiBcIkdFVCAvXCIsXG4gICAgICAgICAgICAgICAgSGFuZGxlcjogZnVuYyhfIHNjb3Blcy5TY29wZSwgcmVxdWVzdCAqaHR0cC5SZXF1ZXN0LCBfIGh0dHAuUmVzcG9uc2VXcml0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgXyA9IHJlcXVlc3QuVVJMLlF1ZXJ5KCkuR2V0KFwibmFtZVwiKSAvLyBSZXRyaWV2ZXMgcXVlcnkgZmllbGQgXCJuYW1lXCIuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgYH1cbiAgICAvPlxuICAgIDxiciAvPlxuICAgIDxiciAvPlxuICAgIDxUaXRsZSB0ZXh0PVwiRm9ybXNcIiAvPlxuICAgIDxzcGFuPlxuICAgICAgICBVc2UgPElubGluZUNvZGUgc291cmNlPVwicmVjZWl2ZS5Gb3JtKClcIiAvPiB0byByZWNlaXZlIGNvbnRlbnQgYXMgbXVsdGlwYXJ0IGZvcm0gb3IgdXJsIGVuY29kZWQgZm9ybSB3aGVuIHVzaW5nXG4gICAgICAgIDxJbmxpbmVDb2RlIHNvdXJjZT1cIlBPU1RcIiAvPiBhbmQgPElubGluZUNvZGUgc291cmNlPVwiR0VUXCIgLz4gaHR0cCB2ZXJicy5cbiAgICA8L3NwYW4+XG4gICAgPENvZGVcbiAgICAgICAgbGFuZz1cImdvXCJcbiAgICAgICAgc291cmNlPXtgXG4gICAgICAgICAgICBwYWNrYWdlIG1haW5cblxuICAgICAgICAgICAgaW1wb3J0IChcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvcmVjZWl2ZVwiXG4gICAgICAgICAgICAgICAgXCJtYWluL2xpYi9jb3JlL3JvdXRlc1wiXG4gICAgICAgICAgICAgICAgXCJtYWluL2xpYi9jb3JlL3Njb3Blc1wiXG4gICAgICAgICAgICAgICAgXCJuZXQvaHR0cFwiXG4gICAgICAgICAgICApXG5cbiAgICAgICAgICAgIHZhciBfID0gcm91dGVzLlJvdXRle1xuICAgICAgICAgICAgICAgIFBhdHRlcm46IFwiR0VUIC9cIixcbiAgICAgICAgICAgICAgICBIYW5kbGVyOiBmdW5jKF8gc2NvcGVzLlNjb3BlLCByZXF1ZXN0ICpodHRwLlJlcXVlc3QsIF8gaHR0cC5SZXNwb25zZVdyaXRlcikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSBzdHJ1Y3QgeyAgICAgICAgICAgICAgICAvLyBDcmVhdGVzIGEgemVybyBpbml0aWFsaXplZCBmb3JtLlxuICAgICAgICAgICAgICAgICAgICAgICAgTmFtZSBzdHJpbmcgXFxgZm9ybTpcIm5hbWVcIlxcYFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF8gPSByZWNlaXZlLkZvcm0ocmVxdWVzdCwgJmZvcm0pIC8vIFJlY2VpdmVzIGRhdGEgaW50byBmb3JtLlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgIGB9XG4gICAgLz5cbiAgICA8VGlwPlxuICAgICAgICA8c3Bhbj5Gb3JtIHN0cnVjdHMgY2FuIGRlZmluZSBzbGljZXMgYW5kIGZpbGVzLjwvc3Bhbj5cbiAgICAgICAgPENvZGVcbiAgICAgICAgICAgIGxhbmc9XCJnb1wiXG4gICAgICAgICAgICBzb3VyY2U9e2BcbiAgICAgICAgICAgICAgICBwYWNrYWdlIG1haW5cblxuICAgICAgICAgICAgICAgIGltcG9ydCAoXG4gICAgICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9yZWNlaXZlXCJcbiAgICAgICAgICAgICAgICAgICAgXCJtYWluL2xpYi9jb3JlL3JvdXRlc1wiXG4gICAgICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9zY29wZXNcIlxuICAgICAgICAgICAgICAgICAgICBcIm1pbWUvbXVsdGlwYXJ0XCJcbiAgICAgICAgICAgICAgICAgICAgXCJuZXQvaHR0cFwiXG4gICAgICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICAgICAgdmFyIF8gPSByb3V0ZXMuUm91dGV7XG4gICAgICAgICAgICAgICAgICAgIFBhdHRlcm46IFwiR0VUIC9cIixcbiAgICAgICAgICAgICAgICAgICAgSGFuZGxlcjogZnVuYyhfIHNjb3Blcy5TY29wZSwgcmVxdWVzdCAqaHR0cC5SZXF1ZXN0LCBfIGh0dHAuUmVzcG9uc2VXcml0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JtIHN0cnVjdCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmFtZSAgICAgc3RyaW5nICAgICAgICAgICAgICAgXFxgZm9ybTpcIm5hbWVcIlxcYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbW1lbnRzIFtdc3RyaW5nICAgICAgICAgICAgIFxcYGZvcm06XCJjb21tZW50c1wiXFxgIC8vIFNsaWNlIG9mIHN0cmluZ3MuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRmlsZSAgICAgbXVsdGlwYXJ0LkZpbGVIZWFkZXIgXFxgZm9ybTpcImZpbGVcIlxcYCAgICAgLy8gRmlsZSBoYW5kbGVyLlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXyA9IHJlY2VpdmUuRm9ybShyZXF1ZXN0LCAmZm9ybSkgLy8gUmVjZWl2ZXMgZGF0YSBpbnRvIGZvcm0uXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYH1cbiAgICAgICAgLz5cbiAgICAgICAgPHNwYW4+WW91IGNhbiBvcGVuIGFuZCByZWFkIHRoZSBmaWxlLjwvc3Bhbj5cbiAgICAgICAgPENvZGVcbiAgICAgICAgICAgIGxhbmc9XCJnb1wiXG4gICAgICAgICAgICBzb3VyY2U9e2BcbiAgICAgICAgICAgICAgICBzcmMsIF8gOj0gZm9ybS5GaWxlLk9wZW4oKVxuICAgICAgICAgICAgICAgIGRzdCwgXyA6PSBvcy5DcmVhdGUoXCJteS1maWxlLnR4dFwiKVxuICAgICAgICAgICAgICAgIGlvLkNvcHkoc3JjLCBkc3QpXG4gICAgICAgICAgICBgfVxuICAgICAgICAvPlxuICAgICAgICA8c3Bhbj5SZW1lbWJlciB0byBjbG9zZSB5b3VyIGZpbGVzLjwvc3Bhbj5cbiAgICAgICAgPENvZGVcbiAgICAgICAgICAgIGxhbmc9XCJnb1wiXG4gICAgICAgICAgICBzb3VyY2U9e2BcbiAgICAgICAgICAgICAgICBkZWZlciBzcmMuQ2xvc2UoKVxuICAgICAgICAgICAgICAgIGRlZmVyIGRzdC5DbG9zZSgpXG4gICAgICAgICAgICBgfVxuICAgICAgICAvPlxuICAgIDwvVGlwPlxuICAgIDxiciAvPlxuICAgIDxiciAvPlxuICAgIDxUaXRsZSB0ZXh0PVwiSnNvblwiIC8+XG4gICAgPHNwYW4+XG4gICAgICAgIFVzZSA8SW5saW5lQ29kZSBzb3VyY2U9XCJyZWNlaXZlLkpzb24oKVwiIC8+XG4gICAgICAgIHRvIHJlY2VpdmUgY29udGVudCBhcyBqc29uIHdoZW4gdXNpbmcgPElubGluZUNvZGUgc291cmNlPVwiUE9TVFwiIC8+XG4gICAgICAgIGFuZCA8SW5saW5lQ29kZSBzb3VyY2U9XCJQVVRcIiAvPiBodHRwIHZlcmJzIGFuZFxuICAgICAgICA8SW5saW5lQ29kZSBzb3VyY2U9XCJzZW5kLkpzb24oKVwiIC8+IHRvIHNlbmQganNvbiBjb250ZW50LlxuICAgIDwvc3Bhbj5cbiAgICA8Q29kZVxuICAgICAgICBsYW5nPVwiZ29cIlxuICAgICAgICBzb3VyY2U9e2BcbiAgICAgICAgICAgIHBhY2thZ2UgbWFpblxuXG4gICAgICAgICAgICBpbXBvcnQgKFxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9yZWNlaXZlXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvcm91dGVzXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvc2NvcGVzXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvc2VuZFwiXG4gICAgICAgICAgICAgICAgXCJuZXQvaHR0cFwiXG4gICAgICAgICAgICApXG5cbiAgICAgICAgICAgIHR5cGUgR3JlZXRpbmdEZXRhaWxzIHN0cnVjdCB7ICAgLy8gRGVmaW5lcyBhIHN0cnVjdCBpbiB3aGljaCB0b1xuICAgICAgICAgICAgICAgIE5hbWUgc3RyaW5nIFxcYGpzb246XCJuYW1lXCJcXGAgLy8gc3RvcmUgdGhlIGpzb24gY29udGVudC5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIF8gPSByb3V0ZXMuUm91dGV7XG4gICAgICAgICAgICAgICAgUGF0dGVybjogXCJHRVQgL1wiLFxuICAgICAgICAgICAgICAgIEhhbmRsZXI6IGZ1bmMoXyBzY29wZXMuU2NvcGUsIHJlcXVlc3QgKmh0dHAuUmVxdWVzdCwgd3JpdGVyIGh0dHAuUmVzcG9uc2VXcml0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRldGFpbHMgR3JlZXRpbmdEZXRhaWxzICAgICAgICAgLy8gQ3JlYXRlcyBhIHplcm8gdmFsdWUuXG4gICAgICAgICAgICAgICAgICAgIF8gPSByZWNlaXZlLkpzb24ocmVxdWVzdCwgJmRldGFpbHMpIC8vIFVubWFyc2hhbHMgdGhlIGNvbnRlbnQgaW50byBkZXRhaWxzLlxuICAgICAgICAgICAgICAgICAgICBfID0gc2VuZC5Kc29uKHdyaXRlciwgZGV0YWlscykgICAgICAvLyBTZW5kcyBjb250ZW50IGJhY2sgYXMganNvbi5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICBgfVxuICAgIC8+XG4gICAgPGJyIC8+XG4gICAgPGJyIC8+XG4gICAgPFRpdGxlIHRleHQ9XCJDb29raWVzXCIgLz5cbiAgICA8c3Bhbj5cbiAgICAgICAgVXNlIDxJbmxpbmVDb2RlIHNvdXJjZT1cInJlY2VpdmUuQ29va2llKClcIiAvPiB0byByZXRyaWV2ZSBjb29raWVzIGFuZCA8SW5saW5lQ29kZSBzb3VyY2U9XCJzZW5kLkNvb2tpZSgpXCIgLz4gdG8gc2VuZFxuICAgICAgICB0aGVtLlxuICAgIDwvc3Bhbj5cbiAgICA8Q29kZVxuICAgICAgICBsYW5nPVwiZ29cIlxuICAgICAgICBzb3VyY2U9e2BcbiAgICAgICAgICAgIHBhY2thZ2UgbWFpblxuXG4gICAgICAgICAgICBpbXBvcnQgKFxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9yZWNlaXZlXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvcm91dGVzXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvc2NvcGVzXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvc2VuZFwiXG4gICAgICAgICAgICAgICAgXCJuZXQvaHR0cFwiXG4gICAgICAgICAgICApXG5cbiAgICAgICAgICAgIHZhciBfID0gcm91dGVzLlJvdXRle1xuICAgICAgICAgICAgICAgIFBhdHRlcm46IFwiR0VUIC9cIixcbiAgICAgICAgICAgICAgICBIYW5kbGVyOiBmdW5jKF8gc2NvcGVzLlNjb3BlLCByZXF1ZXN0ICpodHRwLlJlcXVlc3QsIHdyaXRlciBodHRwLlJlc3BvbnNlV3JpdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5pY2tuYW1lLCBfIDo9IHJlY2VpdmUuQ29va2llKHJlcXVlc3QsIFwibmlja25hbWVcIikgLy8gUmV0cmlldmVzIGNvb2tpZSBcIm5pY2tuYW1lXCIuXG4gICAgICAgICAgICAgICAgICAgIHNlbmQuQ29va2llKHdyaXRlciwgXCJuaWNrbmFtZVwiLCBuaWNrbmFtZSkgICAgICAgICAgLy8gU2VuZHMgaXQgYmFjay5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICBgfVxuICAgIC8+XG4gICAgPGJyIC8+XG4gICAgPGJyIC8+XG4gICAgPFRpdGxlIHRleHQ9XCJTZXNzaW9uIElkXCIgLz5cbiAgICA8c3Bhbj5cbiAgICAgICAgVXNlIDxJbmxpbmVDb2RlIHNvdXJjZT1cIm5lZ290aWF0ZS5TZXNzaW9uSWQoKVwiIC8+IHRvIG5lZ290aWF0ZSBhIHNlc3Npb24gc2Vzc2lvbiBpZCB3aXRoIHRoZSBjbGllbnQuXG4gICAgPC9zcGFuPlxuICAgIDxDb2RlXG4gICAgICAgIGxhbmc9XCJnb1wiXG4gICAgICAgIHNvdXJjZT17YFxuICAgICAgICAgICAgcGFja2FnZSBtYWluXG5cbiAgICAgICAgICAgIGltcG9ydCAoXG4gICAgICAgICAgICAgICAgXCJtYWluL2xpYi9jb3JlL25lZ290aWF0ZVwiXG4gICAgICAgICAgICAgICAgXCJtYWluL2xpYi9jb3JlL3JvdXRlc1wiXG4gICAgICAgICAgICAgICAgXCJtYWluL2xpYi9jb3JlL3Njb3Blc1wiXG4gICAgICAgICAgICAgICAgXCJuZXQvaHR0cFwiXG4gICAgICAgICAgICApXG5cbiAgICAgICAgICAgIHZhciBfID0gcm91dGVzLlJvdXRle1xuICAgICAgICAgICAgICAgIFBhdHRlcm46IFwiR0VUIC9cIixcbiAgICAgICAgICAgICAgICBIYW5kbGVyOiBmdW5jKF8gc2NvcGVzLlNjb3BlLCByZXF1ZXN0ICpodHRwLlJlcXVlc3QsIHdyaXRlciBodHRwLlJlc3BvbnNlV3JpdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIF8sIF8gPSBuZWdvdGlhdGUuU2Vzc2lvbklkKHdyaXRlciwgcmVxdWVzdCkgLy8gTmVnb3RpYXRlcyBzZXNzaW9uIGlkIGFuZCByZXR1cm5zIGl0LlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgIGB9XG4gICAgLz5cbiAgICA8Tm90ZT5cbiAgICAgICAgPHNwYW4+VGhlIHNlc3Npb24gaWQgaXMgcmV0cmlldmVkIGZyb20gdGhlIGNsaWVudOKAmXMgPElubGluZUNvZGUgc291cmNlPVwic2Vzc2lvbi1pZFwiIC8+IGNvb2tpZS48L3NwYW4+XG4gICAgICAgIDxiciAvPlxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgIElmIHRoZSBjbGllbnQgZG9lc27igJl0IHByb3ZpZGUgc3VjaCBjb29raWUsIDxJbmxpbmVDb2RlIHNvdXJjZT1cIm5lZ290aWF0ZS5TZXNzaW9uSWQoKVwiIC8+XG4gICAgICAgICAgICBjcmVhdGVzIGEgbmV3IHNlc3Npb24gaWQgYW5kIHNlbmRzIHRoZSBjb29raWUgdG8gdGhlIGNsaWVudC5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8Q2F1dGlvbj5cbiAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgIFNlc3Npb24gaWQgbXVzdCBhbHdheXMgYmUgbmVnb3RpYXRlZCBiZWZvcmUgaW52b2tpbmdcbiAgICAgICAgICAgICAgICA8SW5saW5lQ29kZSBzb3VyY2U9XCJ3cml0ZXIuV3JpdGVIZWFkZXIoKVwiIC8+LlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L0NhdXRpb24+XG4gICAgPC9Ob3RlPlxuICAgIDxiciAvPlxuICAgIDxiciAvPlxuICAgIDxUaXRsZSB0ZXh0PVwiUmVkaXJlY3RcIiAvPlxuICAgIDxzcGFuPlVzZSA8SW5saW5lQ29kZSBzb3VyY2U9XCJzZW5kLlRvTG9jYXRpb24oKVwiIC8+IHRvIHJlZGlyZWN0IHRvIGFub3RoZXIgcGFnZS48L3NwYW4+XG5cbiAgICA8Q29kZVxuICAgICAgICBsYW5nPVwiZ29cIlxuICAgICAgICBzb3VyY2U9e2BcbiAgICAgICAgICAgIHBhY2thZ2UgbWFpblxuXG4gICAgICAgICAgICBpbXBvcnQgKFxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9yb3V0ZXNcIlxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9zY29wZXNcIlxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9zZW5kXCJcbiAgICAgICAgICAgICAgICBcIm5ldC9odHRwXCJcbiAgICAgICAgICAgIClcblxuICAgICAgICAgICAgdmFyIF8gPSByb3V0ZXMuUm91dGV7XG4gICAgICAgICAgICAgICAgUGF0dGVybjogXCJHRVQgL1wiLFxuICAgICAgICAgICAgICAgIEhhbmRsZXI6IGZ1bmMoXyBzY29wZXMuU2NvcGUsIF8gKmh0dHAuUmVxdWVzdCwgd3JpdGVyIGh0dHAuUmVzcG9uc2VXcml0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VuZC5Ub0xvY2F0aW9uKHdyaXRlciwgXCIvc29tZS1vdGhlci1wYWdlXCIpIC8vIFNlbmRzIGNsaWVudCB0byBzb21lLW90aGVyLXBhZ2UuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgYH1cbiAgICAvPlxuICAgIHsjc25pcHBldCByaWdodFNpZGViYXIoeyBib2R5IH0pfVxuICAgICAgICA8UmlnaHRTaWRlYmFyXG4gICAgICAgICAgICB7Ym9keX1cbiAgICAgICAgICAgIGl0ZW1zPXtbXG4gICAgICAgICAgICAgICAgeyBzaGlmdDogMCwgdGV4dDogXCJCYXNpY3NcIiB9LFxuICAgICAgICAgICAgICAgIHsgc2hpZnQ6IDAsIHRleHQ6IFwiU2VydmVcIiB9LFxuICAgICAgICAgICAgICAgIHsgc2hpZnQ6IDAsIHRleHQ6IFwiUGF0aCBGaWVsZHNcIiB9LFxuICAgICAgICAgICAgICAgIHsgc2hpZnQ6IDAsIHRleHQ6IFwiTWVzc2FnZXNcIiB9LFxuICAgICAgICAgICAgICAgIHsgc2hpZnQ6IDAsIHRleHQ6IFwiSGVhZGVycyBGaWVsZHMgJiBTdGF0dXNcIiB9LFxuICAgICAgICAgICAgICAgIHsgc2hpZnQ6IDAsIHRleHQ6IFwiUXVlcmllc1wiIH0sXG4gICAgICAgICAgICAgICAgeyBzaGlmdDogMCwgdGV4dDogXCJGb3Jtc1wiIH0sXG4gICAgICAgICAgICAgICAgeyBzaGlmdDogMCwgdGV4dDogXCJKc29uXCIgfSxcbiAgICAgICAgICAgICAgICB7IHNoaWZ0OiAwLCB0ZXh0OiBcIkNvb2tpZXNcIiB9LFxuICAgICAgICAgICAgICAgIHsgc2hpZnQ6IDAsIHRleHQ6IFwiU2Vzc2lvbiBJZFwiIH0sXG4gICAgICAgICAgICAgICAgeyBzaGlmdDogMCwgdGV4dDogXCJSZWRpcmVjdFwiIH0sXG4gICAgICAgICAgICBdfVxuICAgICAgICAvPlxuICAgIHsvc25pcHBldH1cbiAgICB7I3NuaXBwZXQgZm9vdGVyKCl9XG4gICAgICAgIDxGb290ZXJcbiAgICAgICAgICAgIHByZXZpb3VzPXt7IGxhYmVsOiBcIkdldCBTdGFydGVkXCIsIGhyZWY6IGJhc2UoXCIvZ2V0X3N0YXJ0ZWRcIiwgeyBwcmVmaXggfSkgfX1cbiAgICAgICAgICAgIG5leHQ9e3sgbGFiZWw6IFwiV2ViIFNvY2tldHNcIiwgaHJlZjogYmFzZShcIi93ZWJfc29ja2V0c1wiLCB7IHByZWZpeCB9KSB9fVxuICAgICAgICAvPlxuICAgIHsvc25pcHBldH1cbjwvUGFnZT5cbiJdLCJtYXBwaW5ncyI6IjtrTkFBQSxTQWVDLEVBQUksRUFBQSw4Q0FtWVMsY0FBWSxFQUFBLElBQUEsS0FBRyxPQUFJLElBQUEsRUFBQSxDQUFKLEtBQ3BCLEVBQUEsRUFBQSxtQkFDSSxFQUFJLFdBRUMsTUFBTyxFQUFHLEtBQU0sUUFBUSxHQUN4QixNQUFPLEVBQUcsS0FBTSxPQUFPLEdBQ3ZCLE1BQU8sRUFBRyxLQUFNLGFBQWEsR0FDN0IsTUFBTyxFQUFHLEtBQU0sVUFBVSxHQUMxQixNQUFPLEVBQUcsS0FBTSx5QkFBeUIsR0FDekMsTUFBTyxFQUFHLEtBQU0sU0FBUyxHQUN6QixNQUFPLEVBQUcsS0FBTSxPQUFPLEdBQ3ZCLE1BQU8sRUFBRyxLQUFNLE1BQU0sR0FDdEIsTUFBTyxFQUFHLEtBQU0sU0FBUyxHQUN6QixNQUFPLEVBQUcsS0FBTSxZQUFZLEdBQzVCLE1BQU8sRUFBRyxLQUFNLFVBQVUsTUFJOUIsT0FBTSxHQUFBLGdCQUVJLE1BQU8sY0FBZSxLQUFNLEVBQUssZUFBYyxDQUFJ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