import{p as fs,f as d,a as p,s as e,h as r,b as l,c as hs,g as De,u as Ee}from"./index-4KvfKxUW.js";import{a as _s,h as bs,b}from"./navbar.js";import{C as w}from"./caution.js";import{C as a}from"./code.js";import{P as ws,T as i,R as Ss,F as ys}from"./right_sidebar.js";import{I as s}from"./inline_code.js";import{N as _}from"./note.js";import{T as S}from"./tip.js";var xs=d("<span>You are also welcome to <a>contribute</a> back if you can.</span>"),ks=d(`<span>The <!> function creates a function that is capable executing JavaScript code on
            the server. This is what enables Server Side Rendering for your server, as the package name implies.</span>`),Cs=d(`<span>The first parameter of <!> indicates how many runtimes should be created and executed
            in parallel when rendering views.</span> <br/> <span>Setting this value too high could lead to unnecessary large memory usage by your JavaScript runtimes.</span> <br/> <span>For most use cases a limit of 1 runtime is more than enough.</span> <br/> <br/> <span>Modify based on actual performance benchmarks.</span>`,1),Rs=d("<span>If you don't plan to use SSR features then create your render function using <!> instead.</span> <!> <span>This will reduce the minimum size of the final binary from 25MB to 10MB.</span>",1),Ps=d('<span>Sending header fields or status after sending out content is not allowed.</span> <br/> <span>Read <a href="#order-of-operations">below</a>.</span>',1),Ts=d("<span>You can also use a <!> tag, it will match the field correctly as if it were a <!> tag.</span> <br/> <span>This is so that you can integrate your structs more easily with other libraries that only take into account <!> formats.</span>",1),Vs=d("<span>Form structs can define slices and files.</span> <!> <span>You can open and read the file.</span> <!> <span>Remember to close your files.</span> <!>",1),Hs=d("<span>The session id is retrieved from the client’s session-id cookie.</span> <span>If the client doesn’t provide such cookie, <!> creates a new session id and sends the cookie to the client.</span>",1),Ns=d(`<span>Since <!> might send a cookie to the client, it is important to remember
            that order of operations matters.</span>`),Fs=d("The session is retrieved using <!>.",1),$s=d(`<!> <span>All internals of the framework are exposed.</span> <br/> <span>You can modify these internals, in fact it is intended for you to do so whenever you're in a state of urgency,
        you're hitting a performance wall that needs to be solved immediately, a bug comes up and so on.</span> <!> <!> <span>Create a new server with <!>, then followup with <!> in order to start the server.</span> <!> <!> <!> <!> <!> <span>Each server exposes a slice of Routes which you can freely modify.</span> <br/> <span>You can add a new route by appending to or overwriting <!>.</span> <!> <span>Where <!> is a function pointer.</span> <!> <!> <span>Route patterns can define dynamic path fields using <!> syntax.</span> <!> <span>Path fields can then be retrieved with <!>.</span> <!> <!> <span>Use <!> to retrieve messages sent by the client.</span> <!> <span>Use <!> to send a message to the client.</span> <!> <!> <span>Use <!> to retrieve header fields sent by the client.</span> <!> <span>Use <!> to send header fields to the client.</span> <!> <!> <span>Use <!> to send the status of the response to the client.</span> <!> <!> <!> <span>Order of operations matters when sending data to the client.</span> <br/> <span>For example, sending the status code with <!> after you’ve already sent content with <!> is not allowed.</span> <!> <span><!> will fail and the client will receive status 200 instead of 404.</span> <!> <span>The failure is logged to the server’s error logger.</span> <br/> <span>Assuming you’re using the default error logger, you’ll see an error of sorts in your <strong>console</strong></span> <!> <span><!>, meaning the status code has already been sent to the client and
        there’s nothing you can do about it.</span> <!> <span>Use <!> to retrieve query fields.</span> <!> <!> <span>Use <!> to parse incoming content as multipart form or url encoded form when using <!> and <!> http verbs.</span> <!> <!> <!> <!> <!> <span>Use <!> to parse incoming content as json when using POST and PUT http verbs and <!> to send json content.</span> <!> <!> <!> <span>Use <!> to retrieve cookies and <!> to send
        them.</span> <!> <!> <span>Use <!> to retrieve the client’s session id.</span> <!> <!> <!> <!> <span>Use <!> to retrieve the client’s session.</span> <!> <!> <!> <span>Use <!> to redirect to a different location.</span> <!> <!> <span>Use <!> to redirect to a different location with status 302.</span> <!>`,1);function Es(Ye,m){fs(m,!0),ws(Ye,{title:"Basics",get prefix(){return m.prefix},rightSidebar:(g,h)=>{let u=()=>h?.().body;Ss(g,{get body(){return u()},items:[{shift:0,text:"Basics"},{shift:0,text:"Server"},{shift:0,text:"Routes"},{shift:0,text:"Path Fields"},{shift:0,text:"Messages"},{shift:0,text:"Headers"},{shift:0,text:"Status"},{shift:0,text:"Order of Operations"},{shift:0,text:"Queries"},{shift:0,text:"Forms"},{shift:0,text:"Json"},{shift:0,text:"Cookies"},{shift:0,text:"Session Id"},{shift:0,text:"Session"},{shift:0,text:"Redirect"},{shift:0,text:"Navigate"}]})},footer:g=>{{let h=Ee(()=>({label:"Get Started",href:b("/get_started",{prefix:m.prefix})})),u=Ee(()=>({label:"Build Checkpoints",href:b("/build_checkpoints",{prefix:m.prefix})}));ys(g,{get previous(){return De(h)},get next(){return De(u)}})}},children:(g,h)=>{var u=$s(),y=p(u);i(y,{text:"Basics"});var x=e(y,8);_(x,{children:(o,v)=>{var n=xs(),t=e(r(n));_s(t,c=>({...c}),[()=>bs(b("/issues",{prefix:m.prefix}))]),l(o,n)}});var k=e(x,2);i(k,{text:"Server"});var C=e(k,2),R=e(r(C));s(R,{source:"servers.New()"});var Qe=e(R,2);s(Qe,{source:"servers.Start()"});var P=e(C,2);a(P,{lang:"go",source:`
            package main

            import (
                "main/lib/core/servers"
                "main/lib/core/ssr"
            )

            var server = servers.New() // Creates server.
            var render = ssr.New(1)    // Creates an SSR function.

            func main() {
                server.Render = render // Assigns render function to the server.
                servers.Start(server)  // Starts server.
            }
        `});var T=e(P,2);_(T,{children:(o,v)=>{var n=ks(),t=e(r(n));s(t,{source:"ssr.New()"}),l(o,n)}});var V=e(T,2);w(V,{children:(o,v)=>{var n=Cs(),t=p(n),c=e(r(t));s(c,{source:"ssr.New()"}),l(o,n)}});var H=e(V,2);S(H,{children:(o,v)=>{var n=Rs(),t=p(n),c=e(r(t));s(c,{source:"csr.New()"});var f=e(t,2);a(f,{lang:"go",source:`
            package main

            import (
                "main/lib/core/servers"
                "main/lib/core/csr"
            )

            var server = servers.New() // Creates server.
            var render = csr.New()     // Creates CSR function.

            func main() {
                server.Render = render // Assigns render function to the server.
                servers.Start(server)  // Starts server.
            }
        `}),l(o,n)}});var N=e(H,2);i(N,{text:"Routes"});var F=e(N,6),ze=e(r(F));s(ze,{source:"server.Routes"});var $=e(F,2);a($,{lang:"go",source:`
            package main

            import (
                "main/lib/core/servers"
                "main/lib/routes/welcome"
            )

            var server = servers.New()                         // Creates server.

            func main() {
                defer servers.Start(server)                    // Starts server.
                server.Routes = []routes.Route{                // Overwrites routes.
                    {Pattern: "GET /", Handler: welcome.View}, // Adds route.
                }
            }
        `});var U=e($,2),qe=e(r(U));s(qe,{source:"welcome.View"});var M=e(U,2);a(M,{lang:"go",source:`
            package welcome

            import "main/lib/core/clients"

            func View(client *clients.Client) {}
        `});var O=e(M,2);i(O,{text:"Path Fields"});var I=e(O,2),Ke=e(r(I));s(Ke,{source:"{}"});var A=e(I,2);a(A,{lang:"go",source:'routes.Route{Pattern: "GET /{name}", Handler: welcome.View}'});var G=e(A,2),Le=e(r(G));s(Le,{source:"receive.Path()"});var J=e(G,2);a(J,{lang:"go",source:`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
            )

            func View(client *clients.Client) {
                _ = receive.Path(client, "name") // Retrieves field "name".
            }
        `});var j=e(J,2);i(j,{text:"Messages"});var B=e(j,2),We=e(r(B));s(We,{source:"receive.Message()"});var D=e(B,2);a(D,{lang:"go",source:`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
            )

            func View(client *clients.Client) {
                _ = receive.Message(client) // Retrieves message.
            }
        `});var E=e(D,2),Xe=e(r(E));s(Xe,{source:"send.Message()"});var Y=e(E,2);a(Y,{lang:"go",source:`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/send"
            )

            func View(client *clients.Client) {
                send.Message(client, "Hello.") // Sends message.
            }
        `});var Q=e(Y,2);i(Q,{text:"Headers"});var z=e(Q,2),Ze=e(r(z));s(Ze,{source:"receive.Header()"});var q=e(z,2);a(q,{lang:"go",source:`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
            )

            func View(client *clients.Client) {
                _ = receive.Header(client, "Accept") // Retrieves field "Accept".
            }
        `});var K=e(q,2),es=e(r(K));s(es,{source:"send.Header()"});var L=e(K,2);a(L,{lang:"go",source:`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
                "main/lib/core/send"
            )

            func View(client *clients.Client) {
                accept := receive.Header(client, "Accept")  // Retrieves field "Accept".
                send.Header(client, "Content-Type", accept) // Sends it back.
            }
        `});var W=e(L,2);i(W,{text:"Status"});var X=e(W,2),ss=e(r(X));s(ss,{source:"send.Status()"});var Z=e(X,2);a(Z,{lang:"go",source:`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/send"
            )

            func View(client *clients.Client) {
                send.Status(client, 404)           // Sends status 404.
                send.Message(client, "Not found.") // Sends message.
            }
        `});var ee=e(Z,2);w(ee,{children:(o,v)=>{var n=Ps();l(o,n)}});var se=e(ee,2);i(se,{text:"Order of Operations"});var re=e(se,6),ne=e(r(re));s(ne,{source:"send.Status()"});var rs=e(ne,2);s(rs,{source:"send.Message()"});var ae=e(re,2);a(ae,{lang:"go",source:`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/send"
            )

            func View(client *clients.Client) {
                send.Message(client, "Hello.") // Sends message (Succeeds).
                send.Status(client, 404)       // Sends status (Fails).
            }
        `});var te=e(ae,2),ns=r(te);s(ns,{source:"send.Status(client, 404)"});var oe=e(te,2);a(oe,{lang:"http",source:`
            HTTP/1.1 200 OK
            Date: Sun, 25 May 2025 02:00:37 GMT
            Content-Length: 6
            Content-Type: text/plain; charset=utf-8

            Hello.
        `});var ie=e(oe,8);a(ie,{lang:"log",source:`
            listening for requests at http://127.0.0.1:8080
            status is locked
        `});var ce=e(ie,2),as=r(ce);s(as,{source:"status is locked"});var le=e(ce,2);i(le,{text:"Queries"});var de=e(le,2),ts=e(r(de));s(ts,{source:"receive.Query()"});var ve=e(de,2);a(ve,{lang:"go",source:`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
                "main/lib/core/send"
            )

            func View(client *clients.Client) {
                name := receive.Query(client, "name") // Retrieves field "name".
                send.Message(client, "Hello " + name) // Sends message.
            }
        `});var pe=e(ve,2);i(pe,{text:"Forms"});var ue=e(pe,2),me=e(r(ue));s(me,{source:"receive.Form()"});var ge=e(me,2);s(ge,{source:"POST"});var os=e(ge,2);s(os,{source:"GET"});var fe=e(ue,2);a(fe,{lang:"go",source:`
            routes.Route{Pattern: "POST /", Handler: welcome.View}
            // or
            routes.Route{Pattern: "GET /", Handler: welcome.View}
        `});var he=e(fe,2);a(he,{lang:"go",source:`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
                "main/lib/core/send"
            )

            type Form struct {                             // Defines a struct in which to
                Name string \`form:"name"\`                  // store the form content.
            }

            func View(client *clients.Client) {
                var form Form
                receive.Form(client, &form)                // Retrieves form.
                send.Message(client, "Hello " + form.Name) // Sends message.
            }
        `});var _e=e(he,2);S(_e,{children:(o,v)=>{var n=Ts(),t=p(n),c=e(r(t));s(c,{source:"json"});var f=e(c,2);s(f,{source:"form"});var ms=e(t,4),gs=e(r(ms));s(gs,{source:"json"}),l(o,n)}});var be=e(_e,2);S(be,{children:(o,v)=>{var n=Vs(),t=e(p(n),2);a(t,{lang:"go",source:'\n                type Form struct {\n                    Name     string               `form:"name"`\n                    Comments []string             `form:"comments"` // slice of strings\n                    File     multipart.FileHeader `form:"file"`     // file handler\n                }\n            '});var c=e(t,4);a(c,{lang:"go",source:`
                src, _ := form.File.Open()
                dst, _ := os.Create("my-file.txt")
                io.Copy(src, dst)
            `});var f=e(c,4);a(f,{lang:"go",source:`
                defer src.Close()
                defer dst.Close()
            `}),l(o,n)}});var we=e(be,2);i(we,{text:"Json"});var Se=e(we,2),ye=e(r(Se));s(ye,{source:"receive.Json()"});var is=e(ye,2);s(is,{source:"send.Json()"});var xe=e(Se,2);a(xe,{lang:"go",source:`
            routes.Route{Pattern: "POST /", Handler: welcome.View}
            // or
            routes.Route{Pattern: "PUT /", Handler: welcome.View}
        `});var ke=e(xe,2);a(ke,{lang:"go",source:`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
                "main/lib/core/send"
            )

            type GreetingDetails struct {      // Defines a struct in which to
                Name string \`json:"name"\`      // store the json content.
            }

            func View(client *clients.Client) {
                var details GreetingDetails    // Creates a zero value.
                receive.Json(client, &details) // Unmarshals the content into details.
                send.Json(client, details)     // Sends content back as json.
            }
        `});var Ce=e(ke,2);i(Ce,{text:"Cookies"});var Re=e(Ce,2),Pe=e(r(Re));s(Pe,{source:"receive.Cookie()"});var cs=e(Pe,2);s(cs,{source:"send.Cookie()"});var Te=e(Re,2);a(Te,{lang:"go",source:`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
                "main/lib/core/send"
            )

            func View(client *clients.Client) {
                nickname := receive.Cookie(client, "nickname") // Retrieves cookie.
                send.Cookie(client, "nickname", nickname)      // Sends it back.
            }
        `});var Ve=e(Te,2);i(Ve,{text:"Session Id"});var He=e(Ve,2),ls=e(r(He));s(ls,{source:"receive.SessionId()"});var Ne=e(He,2);a(Ne,{lang:"go",source:`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
            )

            func View(client *clients.Client) {
                _ = receive.SessionId(client) // Retrieves session id.
            }
        `});var Fe=e(Ne,2);_(Fe,{children:(o,v)=>{var n=Hs(),t=e(p(n),2),c=e(r(t));s(c,{source:"receive.SessionId()"}),l(o,n)}});var $e=e(Fe,2);w($e,{children:(o,v)=>{var n=Ns(),t=e(r(n));s(t,{source:"receive.SessionId()"}),l(o,n)}});var Ue=e($e,2);i(Ue,{text:"Session"});var Me=e(Ue,2),ds=e(r(Me));s(ds,{source:"receive.Session()"});var Oe=e(Me,2);_(Oe,{children:(o,v)=>{var n=Fs(),t=e(p(n));s(t,{source:"receive.SessionId()"}),l(o,n)}});var Ie=e(Oe,2);a(Ie,{lang:"go",source:`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
            )

            func View(client *clients.Client) {
                var session *sessions.Session         // Creates a zero value.
                _ = receive.Session(client, &session) // Unmarshals the content into session.
            }
        `});var Ae=e(Ie,2);i(Ae,{text:"Redirect"});var Ge=e(Ae,2),vs=e(r(Ge));s(vs,{source:"send.Redirect()"});var Je=e(Ge,2);a(Je,{lang:"go",source:`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/send"
            )

            func View(client *clients.Client) {
                send.Redirect(client, "/login", 307) // Redirects to /login.
            }
        `});var je=e(Je,2);i(je,{text:"Navigate"});var Be=e(je,2),ps=e(r(Be));s(ps,{source:"send.Navigate()"});var us=e(Be,2);a(us,{lang:"go",source:`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/send"
            )

            func View(client *clients.Client) {
                send.Navigate(client, "/login") // Redirects to /login with status 302.
            }
        `}),l(g,u)},$$slots:{rightSidebar:!0,footer:!0,default:!0}}),hs()}export{Es as default};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWNzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvdmlld3MvYmFzaWNzLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuICAgIGltcG9ydCBDYXV0aW9uIGZyb20gXCIkbGliL2NvbXBvbmVudHMvY2F1dGlvbi5zdmVsdGVcIlxuICAgIGltcG9ydCBDb2RlIGZyb20gXCIkbGliL2NvbXBvbmVudHMvY29kZS5zdmVsdGVcIlxuICAgIGltcG9ydCBGb290ZXIgZnJvbSBcIiRsaWIvY29tcG9uZW50cy9mb290ZXIuc3ZlbHRlXCJcbiAgICBpbXBvcnQgSW5saW5lQ29kZSBmcm9tIFwiJGxpYi9jb21wb25lbnRzL2lubGluZV9jb2RlLnN2ZWx0ZVwiXG4gICAgaW1wb3J0IE5vdGUgZnJvbSBcIiRsaWIvY29tcG9uZW50cy9ub3RlLnN2ZWx0ZVwiXG4gICAgaW1wb3J0IFBhZ2UgZnJvbSBcIiRsaWIvY29tcG9uZW50cy9wYWdlLnN2ZWx0ZVwiXG4gICAgaW1wb3J0IFJpZ2h0U2lkZWJhciBmcm9tIFwiJGxpYi9jb21wb25lbnRzL3JpZ2h0X3NpZGViYXIuc3ZlbHRlXCJcbiAgICBpbXBvcnQgVGlwIGZyb20gXCIkbGliL2NvbXBvbmVudHMvdGlwLnN2ZWx0ZVwiXG4gICAgaW1wb3J0IFRpdGxlIGZyb20gXCIkbGliL2NvbXBvbmVudHMvdGl0bGUuc3ZlbHRlXCJcbiAgICBpbXBvcnQgeyBocmVmIH0gZnJvbSBcIiRsaWIvc2NyaXB0cy9jb3JlL2hyZWZcIlxuICAgIGltcG9ydCB7IGJhc2UgfSBmcm9tIFwiJGxpYi9zY3JpcHRzL3N0cmluZ3MvYmFzZVwiXG4gICAgbGV0IHsgcHJlZml4IH0gPSAkcHJvcHMoKVxuPC9zY3JpcHQ+XG5cbjxQYWdlIHRpdGxlPVwiQmFzaWNzXCIge3ByZWZpeH0+XG4gICAgPFRpdGxlIHRleHQ9XCJCYXNpY3NcIiAvPlxuICAgIDxzcGFuPiBBbGwgaW50ZXJuYWxzIG9mIHRoZSBmcmFtZXdvcmsgYXJlIGV4cG9zZWQuIDwvc3Bhbj5cbiAgICA8YnIgLz5cbiAgICA8c3Bhbj5cbiAgICAgICAgWW91IGNhbiBtb2RpZnkgdGhlc2UgaW50ZXJuYWxzLCBpbiBmYWN0IGl0IGlzIGludGVuZGVkIGZvciB5b3UgdG8gZG8gc28gd2hlbmV2ZXIgeW91J3JlIGluIGEgc3RhdGUgb2YgdXJnZW5jeSxcbiAgICAgICAgeW91J3JlIGhpdHRpbmcgYSBwZXJmb3JtYW5jZSB3YWxsIHRoYXQgbmVlZHMgdG8gYmUgc29sdmVkIGltbWVkaWF0ZWx5LCBhIGJ1ZyBjb21lcyB1cCBhbmQgc28gb24uXG4gICAgPC9zcGFuPlxuICAgIDxOb3RlPlxuICAgICAgICA8c3Bhbj5Zb3UgYXJlIGFsc28gd2VsY29tZSB0byA8YSB7Li4uaHJlZihiYXNlKFwiL2lzc3Vlc1wiLCB7IHByZWZpeCB9KSl9PmNvbnRyaWJ1dGU8L2E+IGJhY2sgaWYgeW91IGNhbi48L3NwYW4+XG4gICAgPC9Ob3RlPlxuICAgIDxUaXRsZSB0ZXh0PVwiU2VydmVyXCIgLz5cbiAgICA8c3Bhbj5cbiAgICAgICAgQ3JlYXRlIGEgbmV3IHNlcnZlciB3aXRoIDxJbmxpbmVDb2RlIHNvdXJjZT1cInNlcnZlcnMuTmV3KClcIiAvPiwgdGhlbiBmb2xsb3d1cCB3aXRoXG4gICAgICAgIDxJbmxpbmVDb2RlIHNvdXJjZT1cInNlcnZlcnMuU3RhcnQoKVwiIC8+IGluIG9yZGVyIHRvIHN0YXJ0IHRoZSBzZXJ2ZXIuXG4gICAgPC9zcGFuPlxuICAgIDxDb2RlXG4gICAgICAgIGxhbmc9XCJnb1wiXG4gICAgICAgIHNvdXJjZT17YFxuICAgICAgICAgICAgcGFja2FnZSBtYWluXG5cbiAgICAgICAgICAgIGltcG9ydCAoXG4gICAgICAgICAgICAgICAgXCJtYWluL2xpYi9jb3JlL3NlcnZlcnNcIlxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9zc3JcIlxuICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICB2YXIgc2VydmVyID0gc2VydmVycy5OZXcoKSAvLyBDcmVhdGVzIHNlcnZlci5cbiAgICAgICAgICAgIHZhciByZW5kZXIgPSBzc3IuTmV3KDEpICAgIC8vIENyZWF0ZXMgYW4gU1NSIGZ1bmN0aW9uLlxuXG4gICAgICAgICAgICBmdW5jIG1haW4oKSB7XG4gICAgICAgICAgICAgICAgc2VydmVyLlJlbmRlciA9IHJlbmRlciAvLyBBc3NpZ25zIHJlbmRlciBmdW5jdGlvbiB0byB0aGUgc2VydmVyLlxuICAgICAgICAgICAgICAgIHNlcnZlcnMuU3RhcnQoc2VydmVyKSAgLy8gU3RhcnRzIHNlcnZlci5cbiAgICAgICAgICAgIH1cbiAgICAgICAgYH1cbiAgICAvPlxuICAgIDxOb3RlPlxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgIFRoZSA8SW5saW5lQ29kZSBzb3VyY2U9XCJzc3IuTmV3KClcIiAvPiBmdW5jdGlvbiBjcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpcyBjYXBhYmxlIGV4ZWN1dGluZyBKYXZhU2NyaXB0IGNvZGUgb25cbiAgICAgICAgICAgIHRoZSBzZXJ2ZXIuIFRoaXMgaXMgd2hhdCBlbmFibGVzIFNlcnZlciBTaWRlIFJlbmRlcmluZyBmb3IgeW91ciBzZXJ2ZXIsIGFzIHRoZSBwYWNrYWdlIG5hbWUgaW1wbGllcy5cbiAgICAgICAgPC9zcGFuPlxuICAgIDwvTm90ZT5cbiAgICA8Q2F1dGlvbj5cbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICBUaGUgZmlyc3QgcGFyYW1ldGVyIG9mIDxJbmxpbmVDb2RlIHNvdXJjZT1cInNzci5OZXcoKVwiIC8+IGluZGljYXRlcyBob3cgbWFueSBydW50aW1lcyBzaG91bGQgYmUgY3JlYXRlZCBhbmQgZXhlY3V0ZWRcbiAgICAgICAgICAgIGluIHBhcmFsbGVsIHdoZW4gcmVuZGVyaW5nIHZpZXdzLlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxiciAvPlxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgIFNldHRpbmcgdGhpcyB2YWx1ZSB0b28gaGlnaCBjb3VsZCBsZWFkIHRvIHVubmVjZXNzYXJ5IGxhcmdlIG1lbW9yeSB1c2FnZSBieSB5b3VyIEphdmFTY3JpcHQgcnVudGltZXMuXG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPGJyIC8+XG4gICAgICAgIDxzcGFuPkZvciBtb3N0IHVzZSBjYXNlcyBhIGxpbWl0IG9mIDEgcnVudGltZSBpcyBtb3JlIHRoYW4gZW5vdWdoLiA8L3NwYW4+XG4gICAgICAgIDxiciAvPlxuICAgICAgICA8YnIgLz5cbiAgICAgICAgPHNwYW4+TW9kaWZ5IGJhc2VkIG9uIGFjdHVhbCBwZXJmb3JtYW5jZSBiZW5jaG1hcmtzLjwvc3Bhbj5cbiAgICA8L0NhdXRpb24+XG4gICAgPFRpcD5cbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICBJZiB5b3UgZG9uJ3QgcGxhbiB0byB1c2UgU1NSIGZlYXR1cmVzIHRoZW4gY3JlYXRlIHlvdXIgcmVuZGVyIGZ1bmN0aW9uIHVzaW5nXG4gICAgICAgICAgICA8SW5saW5lQ29kZSBzb3VyY2U9XCJjc3IuTmV3KClcIiAvPiBpbnN0ZWFkLlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxDb2RlXG4gICAgICAgICAgICBsYW5nPVwiZ29cIlxuICAgICAgICAgICAgc291cmNlPXtgXG4gICAgICAgICAgICBwYWNrYWdlIG1haW5cblxuICAgICAgICAgICAgaW1wb3J0IChcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvc2VydmVyc1wiXG4gICAgICAgICAgICAgICAgXCJtYWluL2xpYi9jb3JlL2NzclwiXG4gICAgICAgICAgICApXG5cbiAgICAgICAgICAgIHZhciBzZXJ2ZXIgPSBzZXJ2ZXJzLk5ldygpIC8vIENyZWF0ZXMgc2VydmVyLlxuICAgICAgICAgICAgdmFyIHJlbmRlciA9IGNzci5OZXcoKSAgICAgLy8gQ3JlYXRlcyBDU1IgZnVuY3Rpb24uXG5cbiAgICAgICAgICAgIGZ1bmMgbWFpbigpIHtcbiAgICAgICAgICAgICAgICBzZXJ2ZXIuUmVuZGVyID0gcmVuZGVyIC8vIEFzc2lnbnMgcmVuZGVyIGZ1bmN0aW9uIHRvIHRoZSBzZXJ2ZXIuXG4gICAgICAgICAgICAgICAgc2VydmVycy5TdGFydChzZXJ2ZXIpICAvLyBTdGFydHMgc2VydmVyLlxuICAgICAgICAgICAgfVxuICAgICAgICBgfVxuICAgICAgICAvPlxuICAgICAgICA8c3Bhbj5UaGlzIHdpbGwgcmVkdWNlIHRoZSBtaW5pbXVtIHNpemUgb2YgdGhlIGZpbmFsIGJpbmFyeSBmcm9tIDI1TUIgdG8gMTBNQi48L3NwYW4+XG4gICAgPC9UaXA+XG4gICAgPFRpdGxlIHRleHQ9XCJSb3V0ZXNcIiAvPlxuICAgIDxzcGFuPkVhY2ggc2VydmVyIGV4cG9zZXMgYSBzbGljZSBvZiBSb3V0ZXMgd2hpY2ggeW91IGNhbiBmcmVlbHkgbW9kaWZ5Ljwvc3Bhbj5cbiAgICA8YnIgLz5cbiAgICA8c3Bhbj5Zb3UgY2FuIGFkZCBhIG5ldyByb3V0ZSBieSBhcHBlbmRpbmcgdG8gb3Igb3ZlcndyaXRpbmcgPElubGluZUNvZGUgc291cmNlPVwic2VydmVyLlJvdXRlc1wiIC8+Ljwvc3Bhbj5cbiAgICA8Q29kZVxuICAgICAgICBsYW5nPVwiZ29cIlxuICAgICAgICBzb3VyY2U9e2BcbiAgICAgICAgICAgIHBhY2thZ2UgbWFpblxuXG4gICAgICAgICAgICBpbXBvcnQgKFxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9zZXJ2ZXJzXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL3JvdXRlcy93ZWxjb21lXCJcbiAgICAgICAgICAgIClcblxuICAgICAgICAgICAgdmFyIHNlcnZlciA9IHNlcnZlcnMuTmV3KCkgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlcyBzZXJ2ZXIuXG5cbiAgICAgICAgICAgIGZ1bmMgbWFpbigpIHtcbiAgICAgICAgICAgICAgICBkZWZlciBzZXJ2ZXJzLlN0YXJ0KHNlcnZlcikgICAgICAgICAgICAgICAgICAgIC8vIFN0YXJ0cyBzZXJ2ZXIuXG4gICAgICAgICAgICAgICAgc2VydmVyLlJvdXRlcyA9IFtdcm91dGVzLlJvdXRleyAgICAgICAgICAgICAgICAvLyBPdmVyd3JpdGVzIHJvdXRlcy5cbiAgICAgICAgICAgICAgICAgICAge1BhdHRlcm46IFwiR0VUIC9cIiwgSGFuZGxlcjogd2VsY29tZS5WaWV3fSwgLy8gQWRkcyByb3V0ZS5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIGB9XG4gICAgLz5cbiAgICA8c3Bhbj5XaGVyZSA8SW5saW5lQ29kZSBzb3VyY2U9XCJ3ZWxjb21lLlZpZXdcIiAvPiBpcyBhIGZ1bmN0aW9uIHBvaW50ZXIuPC9zcGFuPlxuICAgIDxDb2RlXG4gICAgICAgIGxhbmc9XCJnb1wiXG4gICAgICAgIHNvdXJjZT17YFxuICAgICAgICAgICAgcGFja2FnZSB3ZWxjb21lXG5cbiAgICAgICAgICAgIGltcG9ydCBcIm1haW4vbGliL2NvcmUvY2xpZW50c1wiXG5cbiAgICAgICAgICAgIGZ1bmMgVmlldyhjbGllbnQgKmNsaWVudHMuQ2xpZW50KSB7fVxuICAgICAgICBgfVxuICAgIC8+XG4gICAgPFRpdGxlIHRleHQ9XCJQYXRoIEZpZWxkc1wiIC8+XG4gICAgPHNwYW4+Um91dGUgcGF0dGVybnMgY2FuIGRlZmluZSBkeW5hbWljIHBhdGggZmllbGRzIHVzaW5nIDxJbmxpbmVDb2RlIHNvdXJjZT17XCJ7fVwifSAvPiBzeW50YXguPC9zcGFuPlxuICAgIDxDb2RlIGxhbmc9XCJnb1wiIHNvdXJjZT17YHJvdXRlcy5Sb3V0ZXtQYXR0ZXJuOiBcIkdFVCAve25hbWV9XCIsIEhhbmRsZXI6IHdlbGNvbWUuVmlld31gfSAvPlxuICAgIDxzcGFuPlBhdGggZmllbGRzIGNhbiB0aGVuIGJlIHJldHJpZXZlZCB3aXRoIDxJbmxpbmVDb2RlIHNvdXJjZT1cInJlY2VpdmUuUGF0aCgpXCIgLz4uPC9zcGFuPlxuICAgIDxDb2RlXG4gICAgICAgIGxhbmc9XCJnb1wiXG4gICAgICAgIHNvdXJjZT17YFxuICAgICAgICAgICAgcGFja2FnZSB3ZWxjb21lXG5cbiAgICAgICAgICAgIGltcG9ydCAoXG4gICAgICAgICAgICAgICAgXCJtYWluL2xpYi9jb3JlL2NsaWVudHNcIlxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9yZWNlaXZlXCJcbiAgICAgICAgICAgIClcblxuICAgICAgICAgICAgZnVuYyBWaWV3KGNsaWVudCAqY2xpZW50cy5DbGllbnQpIHtcbiAgICAgICAgICAgICAgICBfID0gcmVjZWl2ZS5QYXRoKGNsaWVudCwgXCJuYW1lXCIpIC8vIFJldHJpZXZlcyBmaWVsZCBcIm5hbWVcIi5cbiAgICAgICAgICAgIH1cbiAgICAgICAgYH1cbiAgICAvPlxuICAgIDxUaXRsZSB0ZXh0PVwiTWVzc2FnZXNcIiAvPlxuICAgIDxzcGFuPlVzZSA8SW5saW5lQ29kZSBzb3VyY2U9XCJyZWNlaXZlLk1lc3NhZ2UoKVwiIC8+IHRvIHJldHJpZXZlIG1lc3NhZ2VzIHNlbnQgYnkgdGhlIGNsaWVudC48L3NwYW4+XG4gICAgPENvZGVcbiAgICAgICAgbGFuZz1cImdvXCJcbiAgICAgICAgc291cmNlPXtgXG4gICAgICAgICAgICBwYWNrYWdlIHdlbGNvbWVcblxuICAgICAgICAgICAgaW1wb3J0IChcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvY2xpZW50c1wiXG4gICAgICAgICAgICAgICAgXCJtYWluL2xpYi9jb3JlL3JlY2VpdmVcIlxuICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICBmdW5jIFZpZXcoY2xpZW50ICpjbGllbnRzLkNsaWVudCkge1xuICAgICAgICAgICAgICAgIF8gPSByZWNlaXZlLk1lc3NhZ2UoY2xpZW50KSAvLyBSZXRyaWV2ZXMgbWVzc2FnZS5cbiAgICAgICAgICAgIH1cbiAgICAgICAgYH1cbiAgICAvPlxuICAgIDxzcGFuPlVzZSA8SW5saW5lQ29kZSBzb3VyY2U9XCJzZW5kLk1lc3NhZ2UoKVwiIC8+IHRvIHNlbmQgYSBtZXNzYWdlIHRvIHRoZSBjbGllbnQuPC9zcGFuPlxuICAgIDxDb2RlXG4gICAgICAgIGxhbmc9XCJnb1wiXG4gICAgICAgIHNvdXJjZT17YFxuICAgICAgICAgICAgcGFja2FnZSB3ZWxjb21lXG5cbiAgICAgICAgICAgIGltcG9ydCAoXG4gICAgICAgICAgICAgICAgXCJtYWluL2xpYi9jb3JlL2NsaWVudHNcIlxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9zZW5kXCJcbiAgICAgICAgICAgIClcblxuICAgICAgICAgICAgZnVuYyBWaWV3KGNsaWVudCAqY2xpZW50cy5DbGllbnQpIHtcbiAgICAgICAgICAgICAgICBzZW5kLk1lc3NhZ2UoY2xpZW50LCBcIkhlbGxvLlwiKSAvLyBTZW5kcyBtZXNzYWdlLlxuICAgICAgICAgICAgfVxuICAgICAgICBgfVxuICAgIC8+XG4gICAgPFRpdGxlIHRleHQ9XCJIZWFkZXJzXCIgLz5cbiAgICA8c3Bhbj5Vc2UgPElubGluZUNvZGUgc291cmNlPVwicmVjZWl2ZS5IZWFkZXIoKVwiIC8+IHRvIHJldHJpZXZlIGhlYWRlciBmaWVsZHMgc2VudCBieSB0aGUgY2xpZW50Ljwvc3Bhbj5cbiAgICA8Q29kZVxuICAgICAgICBsYW5nPVwiZ29cIlxuICAgICAgICBzb3VyY2U9e2BcbiAgICAgICAgICAgIHBhY2thZ2Ugd2VsY29tZVxuXG4gICAgICAgICAgICBpbXBvcnQgKFxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9jbGllbnRzXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvcmVjZWl2ZVwiXG4gICAgICAgICAgICApXG5cbiAgICAgICAgICAgIGZ1bmMgVmlldyhjbGllbnQgKmNsaWVudHMuQ2xpZW50KSB7XG4gICAgICAgICAgICAgICAgXyA9IHJlY2VpdmUuSGVhZGVyKGNsaWVudCwgXCJBY2NlcHRcIikgLy8gUmV0cmlldmVzIGZpZWxkIFwiQWNjZXB0XCIuXG4gICAgICAgICAgICB9XG4gICAgICAgIGB9XG4gICAgLz5cbiAgICA8c3Bhbj5Vc2UgPElubGluZUNvZGUgc291cmNlPVwic2VuZC5IZWFkZXIoKVwiIC8+IHRvIHNlbmQgaGVhZGVyIGZpZWxkcyB0byB0aGUgY2xpZW50Ljwvc3Bhbj5cbiAgICA8Q29kZVxuICAgICAgICBsYW5nPVwiZ29cIlxuICAgICAgICBzb3VyY2U9e2BcbiAgICAgICAgICAgIHBhY2thZ2Ugd2VsY29tZVxuXG4gICAgICAgICAgICBpbXBvcnQgKFxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9jbGllbnRzXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvcmVjZWl2ZVwiXG4gICAgICAgICAgICAgICAgXCJtYWluL2xpYi9jb3JlL3NlbmRcIlxuICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICBmdW5jIFZpZXcoY2xpZW50ICpjbGllbnRzLkNsaWVudCkge1xuICAgICAgICAgICAgICAgIGFjY2VwdCA6PSByZWNlaXZlLkhlYWRlcihjbGllbnQsIFwiQWNjZXB0XCIpICAvLyBSZXRyaWV2ZXMgZmllbGQgXCJBY2NlcHRcIi5cbiAgICAgICAgICAgICAgICBzZW5kLkhlYWRlcihjbGllbnQsIFwiQ29udGVudC1UeXBlXCIsIGFjY2VwdCkgLy8gU2VuZHMgaXQgYmFjay5cbiAgICAgICAgICAgIH1cbiAgICAgICAgYH1cbiAgICAvPlxuICAgIDxUaXRsZSB0ZXh0PVwiU3RhdHVzXCIgLz5cbiAgICA8c3Bhbj5Vc2UgPElubGluZUNvZGUgc291cmNlPVwic2VuZC5TdGF0dXMoKVwiIC8+IHRvIHNlbmQgdGhlIHN0YXR1cyBvZiB0aGUgcmVzcG9uc2UgdG8gdGhlIGNsaWVudC48L3NwYW4+XG4gICAgPENvZGVcbiAgICAgICAgbGFuZz1cImdvXCJcbiAgICAgICAgc291cmNlPXtgXG4gICAgICAgICAgICBwYWNrYWdlIHdlbGNvbWVcblxuICAgICAgICAgICAgaW1wb3J0IChcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvY2xpZW50c1wiXG4gICAgICAgICAgICAgICAgXCJtYWluL2xpYi9jb3JlL3NlbmRcIlxuICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICBmdW5jIFZpZXcoY2xpZW50ICpjbGllbnRzLkNsaWVudCkge1xuICAgICAgICAgICAgICAgIHNlbmQuU3RhdHVzKGNsaWVudCwgNDA0KSAgICAgICAgICAgLy8gU2VuZHMgc3RhdHVzIDQwNC5cbiAgICAgICAgICAgICAgICBzZW5kLk1lc3NhZ2UoY2xpZW50LCBcIk5vdCBmb3VuZC5cIikgLy8gU2VuZHMgbWVzc2FnZS5cbiAgICAgICAgICAgIH1cbiAgICAgICAgYH1cbiAgICAvPlxuICAgIDxDYXV0aW9uPlxuICAgICAgICA8c3Bhbj5TZW5kaW5nIGhlYWRlciBmaWVsZHMgb3Igc3RhdHVzIGFmdGVyIHNlbmRpbmcgb3V0IGNvbnRlbnQgaXMgbm90IGFsbG93ZWQuPC9zcGFuPlxuICAgICAgICA8YnIgLz5cbiAgICAgICAgPHNwYW4+UmVhZCA8YSBocmVmPVwiI29yZGVyLW9mLW9wZXJhdGlvbnNcIj5iZWxvdzwvYT4uPC9zcGFuPlxuICAgIDwvQ2F1dGlvbj5cbiAgICA8VGl0bGUgdGV4dD1cIk9yZGVyIG9mIE9wZXJhdGlvbnNcIiAvPlxuICAgIDxzcGFuPk9yZGVyIG9mIG9wZXJhdGlvbnMgbWF0dGVycyB3aGVuIHNlbmRpbmcgZGF0YSB0byB0aGUgY2xpZW50Ljwvc3Bhbj5cbiAgICA8YnIgLz5cbiAgICA8c3Bhbj5cbiAgICAgICAgRm9yIGV4YW1wbGUsIHNlbmRpbmcgdGhlIHN0YXR1cyBjb2RlIHdpdGggPElubGluZUNvZGUgc291cmNlPVwic2VuZC5TdGF0dXMoKVwiIC8+XG4gICAgICAgIGFmdGVyIHlvdeKAmXZlIGFscmVhZHkgc2VudCBjb250ZW50IHdpdGggPElubGluZUNvZGUgc291cmNlPVwic2VuZC5NZXNzYWdlKClcIiAvPlxuICAgICAgICBpcyBub3QgYWxsb3dlZC5cbiAgICA8L3NwYW4+XG4gICAgPENvZGVcbiAgICAgICAgbGFuZz1cImdvXCJcbiAgICAgICAgc291cmNlPXtgXG4gICAgICAgICAgICBwYWNrYWdlIHdlbGNvbWVcblxuICAgICAgICAgICAgaW1wb3J0IChcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvY2xpZW50c1wiXG4gICAgICAgICAgICAgICAgXCJtYWluL2xpYi9jb3JlL3NlbmRcIlxuICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICBmdW5jIFZpZXcoY2xpZW50ICpjbGllbnRzLkNsaWVudCkge1xuICAgICAgICAgICAgICAgIHNlbmQuTWVzc2FnZShjbGllbnQsIFwiSGVsbG8uXCIpIC8vIFNlbmRzIG1lc3NhZ2UgKFN1Y2NlZWRzKS5cbiAgICAgICAgICAgICAgICBzZW5kLlN0YXR1cyhjbGllbnQsIDQwNCkgICAgICAgLy8gU2VuZHMgc3RhdHVzIChGYWlscykuXG4gICAgICAgICAgICB9XG4gICAgICAgIGB9XG4gICAgLz5cbiAgICA8c3Bhbj5cbiAgICAgICAgPElubGluZUNvZGUgc291cmNlPVwic2VuZC5TdGF0dXMoY2xpZW50LCA0MDQpXCIgLz4gd2lsbCBmYWlsIGFuZCB0aGUgY2xpZW50IHdpbGwgcmVjZWl2ZSBzdGF0dXMgMjAwIGluc3RlYWQgb2YgNDA0LlxuICAgIDwvc3Bhbj5cbiAgICA8Q29kZVxuICAgICAgICBsYW5nPVwiaHR0cFwiXG4gICAgICAgIHNvdXJjZT17YFxuICAgICAgICAgICAgSFRUUC8xLjEgMjAwIE9LXG4gICAgICAgICAgICBEYXRlOiBTdW4sIDI1IE1heSAyMDI1IDAyOjAwOjM3IEdNVFxuICAgICAgICAgICAgQ29udGVudC1MZW5ndGg6IDZcbiAgICAgICAgICAgIENvbnRlbnQtVHlwZTogdGV4dC9wbGFpbjsgY2hhcnNldD11dGYtOFxuXG4gICAgICAgICAgICBIZWxsby5cbiAgICAgICAgYH1cbiAgICAvPlxuICAgIDxzcGFuPlRoZSBmYWlsdXJlIGlzIGxvZ2dlZCB0byB0aGUgc2VydmVy4oCZcyBlcnJvciBsb2dnZXIuPC9zcGFuPlxuICAgIDxiciAvPlxuICAgIDxzcGFuPlxuICAgICAgICBBc3N1bWluZyB5b3XigJlyZSB1c2luZyB0aGUgZGVmYXVsdCBlcnJvciBsb2dnZXIsIHlvdeKAmWxsIHNlZSBhbiBlcnJvciBvZiBzb3J0cyBpbiB5b3VyIDxzdHJvbmc+Y29uc29sZTwvc3Ryb25nPlxuICAgIDwvc3Bhbj5cbiAgICA8Q29kZVxuICAgICAgICBsYW5nPVwibG9nXCJcbiAgICAgICAgc291cmNlPXtgXG4gICAgICAgICAgICBsaXN0ZW5pbmcgZm9yIHJlcXVlc3RzIGF0IGh0dHA6Ly8xMjcuMC4wLjE6ODA4MFxuICAgICAgICAgICAgc3RhdHVzIGlzIGxvY2tlZFxuICAgICAgICBgfVxuICAgIC8+XG4gICAgPHNwYW4+XG4gICAgICAgIDxJbmxpbmVDb2RlIHNvdXJjZT1cInN0YXR1cyBpcyBsb2NrZWRcIiAvPiwgbWVhbmluZyB0aGUgc3RhdHVzIGNvZGUgaGFzIGFscmVhZHkgYmVlbiBzZW50IHRvIHRoZSBjbGllbnQgYW5kXG4gICAgICAgIHRoZXJl4oCZcyBub3RoaW5nIHlvdSBjYW4gZG8gYWJvdXQgaXQuXG4gICAgPC9zcGFuPlxuICAgIDxUaXRsZSB0ZXh0PVwiUXVlcmllc1wiIC8+XG4gICAgPHNwYW4+VXNlIDxJbmxpbmVDb2RlIHNvdXJjZT1cInJlY2VpdmUuUXVlcnkoKVwiIC8+IHRvIHJldHJpZXZlIHF1ZXJ5IGZpZWxkcy48L3NwYW4+XG4gICAgPENvZGVcbiAgICAgICAgbGFuZz1cImdvXCJcbiAgICAgICAgc291cmNlPXtgXG4gICAgICAgICAgICBwYWNrYWdlIHdlbGNvbWVcblxuICAgICAgICAgICAgaW1wb3J0IChcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvY2xpZW50c1wiXG4gICAgICAgICAgICAgICAgXCJtYWluL2xpYi9jb3JlL3JlY2VpdmVcIlxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9zZW5kXCJcbiAgICAgICAgICAgIClcblxuICAgICAgICAgICAgZnVuYyBWaWV3KGNsaWVudCAqY2xpZW50cy5DbGllbnQpIHtcbiAgICAgICAgICAgICAgICBuYW1lIDo9IHJlY2VpdmUuUXVlcnkoY2xpZW50LCBcIm5hbWVcIikgLy8gUmV0cmlldmVzIGZpZWxkIFwibmFtZVwiLlxuICAgICAgICAgICAgICAgIHNlbmQuTWVzc2FnZShjbGllbnQsIFwiSGVsbG8gXCIgKyBuYW1lKSAvLyBTZW5kcyBtZXNzYWdlLlxuICAgICAgICAgICAgfVxuICAgICAgICBgfVxuICAgIC8+XG4gICAgPFRpdGxlIHRleHQ9XCJGb3Jtc1wiIC8+XG4gICAgPHNwYW4+XG4gICAgICAgIFVzZSA8SW5saW5lQ29kZSBzb3VyY2U9XCJyZWNlaXZlLkZvcm0oKVwiIC8+IHRvIHBhcnNlIGluY29taW5nIGNvbnRlbnQgYXMgbXVsdGlwYXJ0IGZvcm0gb3IgdXJsIGVuY29kZWQgZm9ybSB3aGVuIHVzaW5nXG4gICAgICAgIDxJbmxpbmVDb2RlIHNvdXJjZT1cIlBPU1RcIiAvPiBhbmQgPElubGluZUNvZGUgc291cmNlPVwiR0VUXCIgLz4gaHR0cCB2ZXJicy5cbiAgICA8L3NwYW4+XG4gICAgPENvZGVcbiAgICAgICAgbGFuZz1cImdvXCJcbiAgICAgICAgc291cmNlPXtgXG4gICAgICAgICAgICByb3V0ZXMuUm91dGV7UGF0dGVybjogXCJQT1NUIC9cIiwgSGFuZGxlcjogd2VsY29tZS5WaWV3fVxuICAgICAgICAgICAgLy8gb3JcbiAgICAgICAgICAgIHJvdXRlcy5Sb3V0ZXtQYXR0ZXJuOiBcIkdFVCAvXCIsIEhhbmRsZXI6IHdlbGNvbWUuVmlld31cbiAgICAgICAgYH1cbiAgICAvPlxuICAgIDxDb2RlXG4gICAgICAgIGxhbmc9XCJnb1wiXG4gICAgICAgIHNvdXJjZT17YFxuICAgICAgICAgICAgcGFja2FnZSB3ZWxjb21lXG5cbiAgICAgICAgICAgIGltcG9ydCAoXG4gICAgICAgICAgICAgICAgXCJtYWluL2xpYi9jb3JlL2NsaWVudHNcIlxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9yZWNlaXZlXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvc2VuZFwiXG4gICAgICAgICAgICApXG5cbiAgICAgICAgICAgIHR5cGUgRm9ybSBzdHJ1Y3QgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGVmaW5lcyBhIHN0cnVjdCBpbiB3aGljaCB0b1xuICAgICAgICAgICAgICAgIE5hbWUgc3RyaW5nIFxcYGZvcm06XCJuYW1lXCJcXGAgICAgICAgICAgICAgICAgICAvLyBzdG9yZSB0aGUgZm9ybSBjb250ZW50LlxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jIFZpZXcoY2xpZW50ICpjbGllbnRzLkNsaWVudCkge1xuICAgICAgICAgICAgICAgIHZhciBmb3JtIEZvcm1cbiAgICAgICAgICAgICAgICByZWNlaXZlLkZvcm0oY2xpZW50LCAmZm9ybSkgICAgICAgICAgICAgICAgLy8gUmV0cmlldmVzIGZvcm0uXG4gICAgICAgICAgICAgICAgc2VuZC5NZXNzYWdlKGNsaWVudCwgXCJIZWxsbyBcIiArIGZvcm0uTmFtZSkgLy8gU2VuZHMgbWVzc2FnZS5cbiAgICAgICAgICAgIH1cbiAgICAgICAgYH1cbiAgICAvPlxuICAgIDxUaXA+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgWW91IGNhbiBhbHNvIHVzZSBhIDxJbmxpbmVDb2RlIHNvdXJjZT1cImpzb25cIiAvPiB0YWcsIGl0IHdpbGwgbWF0Y2ggdGhlIGZpZWxkIGNvcnJlY3RseSBhcyBpZiBpdCB3ZXJlIGFcbiAgICAgICAgICAgIDxJbmxpbmVDb2RlIHNvdXJjZT1cImZvcm1cIiAvPiB0YWcuXG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPGJyIC8+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgVGhpcyBpcyBzbyB0aGF0IHlvdSBjYW4gaW50ZWdyYXRlIHlvdXIgc3RydWN0cyBtb3JlIGVhc2lseSB3aXRoIG90aGVyIGxpYnJhcmllcyB0aGF0IG9ubHkgdGFrZSBpbnRvIGFjY291bnRcbiAgICAgICAgICAgIDxJbmxpbmVDb2RlIHNvdXJjZT1cImpzb25cIiAvPiBmb3JtYXRzLlxuICAgICAgICA8L3NwYW4+XG4gICAgPC9UaXA+XG4gICAgPFRpcD5cbiAgICAgICAgPHNwYW4+Rm9ybSBzdHJ1Y3RzIGNhbiBkZWZpbmUgc2xpY2VzIGFuZCBmaWxlcy48L3NwYW4+XG4gICAgICAgIDxDb2RlXG4gICAgICAgICAgICBsYW5nPVwiZ29cIlxuICAgICAgICAgICAgc291cmNlPXtgXG4gICAgICAgICAgICAgICAgdHlwZSBGb3JtIHN0cnVjdCB7XG4gICAgICAgICAgICAgICAgICAgIE5hbWUgICAgIHN0cmluZyAgICAgICAgICAgICAgIFxcYGZvcm06XCJuYW1lXCJcXGBcbiAgICAgICAgICAgICAgICAgICAgQ29tbWVudHMgW11zdHJpbmcgICAgICAgICAgICAgXFxgZm9ybTpcImNvbW1lbnRzXCJcXGAgLy8gc2xpY2Ugb2Ygc3RyaW5nc1xuICAgICAgICAgICAgICAgICAgICBGaWxlICAgICBtdWx0aXBhcnQuRmlsZUhlYWRlciBcXGBmb3JtOlwiZmlsZVwiXFxgICAgICAvLyBmaWxlIGhhbmRsZXJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBgfVxuICAgICAgICAvPlxuICAgICAgICA8c3Bhbj5Zb3UgY2FuIG9wZW4gYW5kIHJlYWQgdGhlIGZpbGUuPC9zcGFuPlxuICAgICAgICA8Q29kZVxuICAgICAgICAgICAgbGFuZz1cImdvXCJcbiAgICAgICAgICAgIHNvdXJjZT17YFxuICAgICAgICAgICAgICAgIHNyYywgXyA6PSBmb3JtLkZpbGUuT3BlbigpXG4gICAgICAgICAgICAgICAgZHN0LCBfIDo9IG9zLkNyZWF0ZShcIm15LWZpbGUudHh0XCIpXG4gICAgICAgICAgICAgICAgaW8uQ29weShzcmMsIGRzdClcbiAgICAgICAgICAgIGB9XG4gICAgICAgIC8+XG4gICAgICAgIDxzcGFuPlJlbWVtYmVyIHRvIGNsb3NlIHlvdXIgZmlsZXMuPC9zcGFuPlxuICAgICAgICA8Q29kZVxuICAgICAgICAgICAgbGFuZz1cImdvXCJcbiAgICAgICAgICAgIHNvdXJjZT17YFxuICAgICAgICAgICAgICAgIGRlZmVyIHNyYy5DbG9zZSgpXG4gICAgICAgICAgICAgICAgZGVmZXIgZHN0LkNsb3NlKClcbiAgICAgICAgICAgIGB9XG4gICAgICAgIC8+XG4gICAgPC9UaXA+XG4gICAgPFRpdGxlIHRleHQ9XCJKc29uXCIgLz5cbiAgICA8c3Bhbj5cbiAgICAgICAgVXNlIDxJbmxpbmVDb2RlIHNvdXJjZT1cInJlY2VpdmUuSnNvbigpXCIgLz4gdG8gcGFyc2UgaW5jb21pbmcgY29udGVudCBhcyBqc29uIHdoZW4gdXNpbmcgUE9TVCBhbmQgUFVUIGh0dHAgdmVyYnMgYW5kXG4gICAgICAgIDxJbmxpbmVDb2RlIHNvdXJjZT1cInNlbmQuSnNvbigpXCIgLz4gdG8gc2VuZCBqc29uIGNvbnRlbnQuXG4gICAgPC9zcGFuPlxuICAgIDxDb2RlXG4gICAgICAgIGxhbmc9XCJnb1wiXG4gICAgICAgIHNvdXJjZT17YFxuICAgICAgICAgICAgcm91dGVzLlJvdXRle1BhdHRlcm46IFwiUE9TVCAvXCIsIEhhbmRsZXI6IHdlbGNvbWUuVmlld31cbiAgICAgICAgICAgIC8vIG9yXG4gICAgICAgICAgICByb3V0ZXMuUm91dGV7UGF0dGVybjogXCJQVVQgL1wiLCBIYW5kbGVyOiB3ZWxjb21lLlZpZXd9XG4gICAgICAgIGB9XG4gICAgLz5cbiAgICA8Q29kZVxuICAgICAgICBsYW5nPVwiZ29cIlxuICAgICAgICBzb3VyY2U9e2BcbiAgICAgICAgICAgIHBhY2thZ2Ugd2VsY29tZVxuXG4gICAgICAgICAgICBpbXBvcnQgKFxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9jbGllbnRzXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvcmVjZWl2ZVwiXG4gICAgICAgICAgICAgICAgXCJtYWluL2xpYi9jb3JlL3NlbmRcIlxuICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICB0eXBlIEdyZWV0aW5nRGV0YWlscyBzdHJ1Y3QgeyAgICAgIC8vIERlZmluZXMgYSBzdHJ1Y3QgaW4gd2hpY2ggdG9cbiAgICAgICAgICAgICAgICBOYW1lIHN0cmluZyBcXGBqc29uOlwibmFtZVwiXFxgICAgICAgLy8gc3RvcmUgdGhlIGpzb24gY29udGVudC5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuYyBWaWV3KGNsaWVudCAqY2xpZW50cy5DbGllbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGV0YWlscyBHcmVldGluZ0RldGFpbHMgICAgLy8gQ3JlYXRlcyBhIHplcm8gdmFsdWUuXG4gICAgICAgICAgICAgICAgcmVjZWl2ZS5Kc29uKGNsaWVudCwgJmRldGFpbHMpIC8vIFVubWFyc2hhbHMgdGhlIGNvbnRlbnQgaW50byBkZXRhaWxzLlxuICAgICAgICAgICAgICAgIHNlbmQuSnNvbihjbGllbnQsIGRldGFpbHMpICAgICAvLyBTZW5kcyBjb250ZW50IGJhY2sgYXMganNvbi5cbiAgICAgICAgICAgIH1cbiAgICAgICAgYH1cbiAgICAvPlxuICAgIDxUaXRsZSB0ZXh0PVwiQ29va2llc1wiIC8+XG4gICAgPHNwYW4+XG4gICAgICAgIFVzZSA8SW5saW5lQ29kZSBzb3VyY2U9XCJyZWNlaXZlLkNvb2tpZSgpXCIgLz4gdG8gcmV0cmlldmUgY29va2llcyBhbmQgPElubGluZUNvZGUgc291cmNlPVwic2VuZC5Db29raWUoKVwiIC8+IHRvIHNlbmRcbiAgICAgICAgdGhlbS5cbiAgICA8L3NwYW4+XG4gICAgPENvZGVcbiAgICAgICAgbGFuZz1cImdvXCJcbiAgICAgICAgc291cmNlPXtgXG4gICAgICAgICAgICBwYWNrYWdlIHdlbGNvbWVcblxuICAgICAgICAgICAgaW1wb3J0IChcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvY2xpZW50c1wiXG4gICAgICAgICAgICAgICAgXCJtYWluL2xpYi9jb3JlL3JlY2VpdmVcIlxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9zZW5kXCJcbiAgICAgICAgICAgIClcblxuICAgICAgICAgICAgZnVuYyBWaWV3KGNsaWVudCAqY2xpZW50cy5DbGllbnQpIHtcbiAgICAgICAgICAgICAgICBuaWNrbmFtZSA6PSByZWNlaXZlLkNvb2tpZShjbGllbnQsIFwibmlja25hbWVcIikgLy8gUmV0cmlldmVzIGNvb2tpZS5cbiAgICAgICAgICAgICAgICBzZW5kLkNvb2tpZShjbGllbnQsIFwibmlja25hbWVcIiwgbmlja25hbWUpICAgICAgLy8gU2VuZHMgaXQgYmFjay5cbiAgICAgICAgICAgIH1cbiAgICAgICAgYH1cbiAgICAvPlxuICAgIDxUaXRsZSB0ZXh0PVwiU2Vzc2lvbiBJZFwiIC8+XG4gICAgPHNwYW4+VXNlIDxJbmxpbmVDb2RlIHNvdXJjZT1cInJlY2VpdmUuU2Vzc2lvbklkKClcIiAvPiB0byByZXRyaWV2ZSB0aGUgY2xpZW504oCZcyBzZXNzaW9uIGlkLjwvc3Bhbj5cbiAgICA8Q29kZVxuICAgICAgICBsYW5nPVwiZ29cIlxuICAgICAgICBzb3VyY2U9e2BcbiAgICAgICAgICAgIHBhY2thZ2Ugd2VsY29tZVxuXG4gICAgICAgICAgICBpbXBvcnQgKFxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9jbGllbnRzXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvcmVjZWl2ZVwiXG4gICAgICAgICAgICApXG5cbiAgICAgICAgICAgIGZ1bmMgVmlldyhjbGllbnQgKmNsaWVudHMuQ2xpZW50KSB7XG4gICAgICAgICAgICAgICAgXyA9IHJlY2VpdmUuU2Vzc2lvbklkKGNsaWVudCkgLy8gUmV0cmlldmVzIHNlc3Npb24gaWQuXG4gICAgICAgICAgICB9XG4gICAgICAgIGB9XG4gICAgLz5cbiAgICA8Tm90ZT5cbiAgICAgICAgPHNwYW4+VGhlIHNlc3Npb24gaWQgaXMgcmV0cmlldmVkIGZyb20gdGhlIGNsaWVudOKAmXMgc2Vzc2lvbi1pZCBjb29raWUuPC9zcGFuPlxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgIElmIHRoZSBjbGllbnQgZG9lc27igJl0IHByb3ZpZGUgc3VjaCBjb29raWUsIDxJbmxpbmVDb2RlIHNvdXJjZT1cInJlY2VpdmUuU2Vzc2lvbklkKClcIiAvPlxuICAgICAgICAgICAgY3JlYXRlcyBhIG5ldyBzZXNzaW9uIGlkIGFuZCBzZW5kcyB0aGUgY29va2llIHRvIHRoZSBjbGllbnQuXG4gICAgICAgIDwvc3Bhbj5cbiAgICA8L05vdGU+XG4gICAgPENhdXRpb24+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgU2luY2UgPElubGluZUNvZGUgc291cmNlPVwicmVjZWl2ZS5TZXNzaW9uSWQoKVwiIC8+IG1pZ2h0IHNlbmQgYSBjb29raWUgdG8gdGhlIGNsaWVudCwgaXQgaXMgaW1wb3J0YW50IHRvIHJlbWVtYmVyXG4gICAgICAgICAgICB0aGF0IG9yZGVyIG9mIG9wZXJhdGlvbnMgbWF0dGVycy5cbiAgICAgICAgPC9zcGFuPlxuICAgIDwvQ2F1dGlvbj5cbiAgICA8VGl0bGUgdGV4dD1cIlNlc3Npb25cIiAvPlxuICAgIDxzcGFuPlVzZSA8SW5saW5lQ29kZSBzb3VyY2U9XCJyZWNlaXZlLlNlc3Npb24oKVwiIC8+IHRvIHJldHJpZXZlIHRoZSBjbGllbnTigJlzIHNlc3Npb24uPC9zcGFuPlxuICAgIDxOb3RlPlRoZSBzZXNzaW9uIGlzIHJldHJpZXZlZCB1c2luZyA8SW5saW5lQ29kZSBzb3VyY2U9XCJyZWNlaXZlLlNlc3Npb25JZCgpXCIgLz4uPC9Ob3RlPlxuICAgIDxDb2RlXG4gICAgICAgIGxhbmc9XCJnb1wiXG4gICAgICAgIHNvdXJjZT17YFxuICAgICAgICAgICAgcGFja2FnZSB3ZWxjb21lXG5cbiAgICAgICAgICAgIGltcG9ydCAoXG4gICAgICAgICAgICAgICAgXCJtYWluL2xpYi9jb3JlL2NsaWVudHNcIlxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9yZWNlaXZlXCJcbiAgICAgICAgICAgIClcblxuICAgICAgICAgICAgZnVuYyBWaWV3KGNsaWVudCAqY2xpZW50cy5DbGllbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2Vzc2lvbiAqc2Vzc2lvbnMuU2Vzc2lvbiAgICAgICAgIC8vIENyZWF0ZXMgYSB6ZXJvIHZhbHVlLlxuICAgICAgICAgICAgICAgIF8gPSByZWNlaXZlLlNlc3Npb24oY2xpZW50LCAmc2Vzc2lvbikgLy8gVW5tYXJzaGFscyB0aGUgY29udGVudCBpbnRvIHNlc3Npb24uXG4gICAgICAgICAgICB9XG4gICAgICAgIGB9XG4gICAgLz5cbiAgICA8VGl0bGUgdGV4dD1cIlJlZGlyZWN0XCIgLz5cbiAgICA8c3Bhbj5Vc2UgPElubGluZUNvZGUgc291cmNlPVwic2VuZC5SZWRpcmVjdCgpXCIgLz4gdG8gcmVkaXJlY3QgdG8gYSBkaWZmZXJlbnQgbG9jYXRpb24uPC9zcGFuPlxuICAgIDxDb2RlXG4gICAgICAgIGxhbmc9XCJnb1wiXG4gICAgICAgIHNvdXJjZT17YFxuICAgICAgICAgICAgcGFja2FnZSB3ZWxjb21lXG5cbiAgICAgICAgICAgIGltcG9ydCAoXG4gICAgICAgICAgICAgICAgXCJtYWluL2xpYi9jb3JlL2NsaWVudHNcIlxuICAgICAgICAgICAgICAgIFwibWFpbi9saWIvY29yZS9zZW5kXCJcbiAgICAgICAgICAgIClcblxuICAgICAgICAgICAgZnVuYyBWaWV3KGNsaWVudCAqY2xpZW50cy5DbGllbnQpIHtcbiAgICAgICAgICAgICAgICBzZW5kLlJlZGlyZWN0KGNsaWVudCwgXCIvbG9naW5cIiwgMzA3KSAvLyBSZWRpcmVjdHMgdG8gL2xvZ2luLlxuICAgICAgICAgICAgfVxuICAgICAgICBgfVxuICAgIC8+XG4gICAgPFRpdGxlIHRleHQ9XCJOYXZpZ2F0ZVwiIC8+XG4gICAgPHNwYW4+VXNlIDxJbmxpbmVDb2RlIHNvdXJjZT1cInNlbmQuTmF2aWdhdGUoKVwiIC8+IHRvIHJlZGlyZWN0IHRvIGEgZGlmZmVyZW50IGxvY2F0aW9uIHdpdGggc3RhdHVzIDMwMi48L3NwYW4+XG4gICAgPENvZGVcbiAgICAgICAgbGFuZz1cImdvXCJcbiAgICAgICAgc291cmNlPXtgXG4gICAgICAgICAgICBwYWNrYWdlIHdlbGNvbWVcblxuICAgICAgICAgICAgaW1wb3J0IChcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvY2xpZW50c1wiXG4gICAgICAgICAgICAgICAgXCJtYWluL2xpYi9jb3JlL3NlbmRcIlxuICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICBmdW5jIFZpZXcoY2xpZW50ICpjbGllbnRzLkNsaWVudCkge1xuICAgICAgICAgICAgICAgIHNlbmQuTmF2aWdhdGUoY2xpZW50LCBcIi9sb2dpblwiKSAvLyBSZWRpcmVjdHMgdG8gL2xvZ2luIHdpdGggc3RhdHVzIDMwMi5cbiAgICAgICAgICAgIH1cbiAgICAgICAgYH1cbiAgICAvPlxuICAgIHsjc25pcHBldCByaWdodFNpZGViYXIoeyBib2R5IH0pfVxuICAgICAgICA8UmlnaHRTaWRlYmFyXG4gICAgICAgICAgICB7Ym9keX1cbiAgICAgICAgICAgIGl0ZW1zPXtbXG4gICAgICAgICAgICAgICAgeyBzaGlmdDogMCwgdGV4dDogXCJCYXNpY3NcIiB9LFxuICAgICAgICAgICAgICAgIHsgc2hpZnQ6IDAsIHRleHQ6IFwiU2VydmVyXCIgfSxcbiAgICAgICAgICAgICAgICB7IHNoaWZ0OiAwLCB0ZXh0OiBcIlJvdXRlc1wiIH0sXG4gICAgICAgICAgICAgICAgeyBzaGlmdDogMCwgdGV4dDogXCJQYXRoIEZpZWxkc1wiIH0sXG4gICAgICAgICAgICAgICAgeyBzaGlmdDogMCwgdGV4dDogXCJNZXNzYWdlc1wiIH0sXG4gICAgICAgICAgICAgICAgeyBzaGlmdDogMCwgdGV4dDogXCJIZWFkZXJzXCIgfSxcbiAgICAgICAgICAgICAgICB7IHNoaWZ0OiAwLCB0ZXh0OiBcIlN0YXR1c1wiIH0sXG4gICAgICAgICAgICAgICAgeyBzaGlmdDogMCwgdGV4dDogXCJPcmRlciBvZiBPcGVyYXRpb25zXCIgfSxcbiAgICAgICAgICAgICAgICB7IHNoaWZ0OiAwLCB0ZXh0OiBcIlF1ZXJpZXNcIiB9LFxuICAgICAgICAgICAgICAgIHsgc2hpZnQ6IDAsIHRleHQ6IFwiRm9ybXNcIiB9LFxuICAgICAgICAgICAgICAgIHsgc2hpZnQ6IDAsIHRleHQ6IFwiSnNvblwiIH0sXG4gICAgICAgICAgICAgICAgeyBzaGlmdDogMCwgdGV4dDogXCJDb29raWVzXCIgfSxcbiAgICAgICAgICAgICAgICB7IHNoaWZ0OiAwLCB0ZXh0OiBcIlNlc3Npb24gSWRcIiB9LFxuICAgICAgICAgICAgICAgIHsgc2hpZnQ6IDAsIHRleHQ6IFwiU2Vzc2lvblwiIH0sXG4gICAgICAgICAgICAgICAgeyBzaGlmdDogMCwgdGV4dDogXCJSZWRpcmVjdFwiIH0sXG4gICAgICAgICAgICAgICAgeyBzaGlmdDogMCwgdGV4dDogXCJOYXZpZ2F0ZVwiIH0sXG4gICAgICAgICAgICBdfVxuICAgICAgICAvPlxuICAgIHsvc25pcHBldH1cbiAgICB7I3NuaXBwZXQgZm9vdGVyKCl9XG4gICAgICAgIDxGb290ZXJcbiAgICAgICAgICAgIHByZXZpb3VzPXt7IGxhYmVsOiBcIkdldCBTdGFydGVkXCIsIGhyZWY6IGJhc2UoXCIvZ2V0X3N0YXJ0ZWRcIiwgeyBwcmVmaXggfSkgfX1cbiAgICAgICAgICAgIG5leHQ9e3sgbGFiZWw6IFwiQnVpbGQgQ2hlY2twb2ludHNcIiwgaHJlZjogYmFzZShcIi9idWlsZF9jaGVja3BvaW50c1wiLCB7IHByZWZpeCB9KSB9fVxuICAgICAgICAvPlxuICAgIHsvc25pcHBldH1cbjwvUGFnZT5cbiJdLCJuYW1lcyI6WyJQYWdlIiwiJCRhbmNob3IiLCIkJGFyZzAiLCJib2R5IiwiUmlnaHRTaWRlYmFyIiwiYmFzZSIsIiQkcHJvcHMiLCJGb290ZXIiLCJUaXRsZSIsIm5vZGUiLCJOb3RlIiwibm9kZV8xIiwic3BhbiIsInJvb3RfNCIsImEiLCIkLmF0dHJpYnV0ZV9lZmZlY3QiLCJocmVmIiwibm9kZV8yIiwic3Bhbl8xIiwiJC5zaWJsaW5nIiwiSW5saW5lQ29kZSIsIm5vZGVfMyIsIm5vZGVfNCIsIkNvZGUiLCJub2RlXzUiLCJub2RlXzYiLCJzcGFuXzIiLCJyb290XzUiLCJub2RlXzciLCJDYXV0aW9uIiwibm9kZV84Iiwic3Bhbl8zIiwiJC5maXJzdF9jaGlsZCIsImZyYWdtZW50XzQiLCJub2RlXzkiLCJUaXAiLCJub2RlXzEwIiwic3Bhbl80IiwiZnJhZ21lbnRfNSIsIm5vZGVfMTEiLCJub2RlXzEyIiwibm9kZV8xMyIsInNwYW5fNSIsIm5vZGVfMTQiLCJub2RlXzE1Iiwic3Bhbl82Iiwibm9kZV8xNiIsIm5vZGVfMTciLCJub2RlXzE4Iiwic3Bhbl83Iiwibm9kZV8yMCIsInNwYW5fOCIsIm5vZGVfMjEiLCJub2RlXzIyIiwibm9kZV8yMyIsInNwYW5fOSIsIm5vZGVfMjQiLCJub2RlXzI1Iiwic3Bhbl8xMCIsIm5vZGVfMjYiLCJub2RlXzI3Iiwibm9kZV8yOCIsInNwYW5fMTEiLCJub2RlXzI5Iiwibm9kZV8zMCIsInNwYW5fMTIiLCJub2RlXzMxIiwibm9kZV8zMiIsIm5vZGVfMzMiLCJzcGFuXzEzIiwibm9kZV8zNCIsIm5vZGVfMzUiLCJub2RlXzM2Iiwibm9kZV8zNyIsInNwYW5fMTQiLCJub2RlXzM4Iiwibm9kZV8zOSIsIm5vZGVfNDAiLCJzcGFuXzE1Iiwibm9kZV80MSIsIm5vZGVfNDIiLCJub2RlXzQzIiwic3Bhbl8xNiIsIm5vZGVfNDQiLCJub2RlXzQ1Iiwic3Bhbl8xNyIsIm5vZGVfNDYiLCJub2RlXzQ3Iiwibm9kZV80OCIsInNwYW5fMTgiLCJub2RlXzQ5Iiwibm9kZV81MCIsIm5vZGVfNTEiLCJub2RlXzUyIiwibm9kZV81MyIsIm5vZGVfNTQiLCJzcGFuXzE5IiwiZnJhZ21lbnRfNyIsIm5vZGVfNTUiLCJub2RlXzU2Iiwic3Bhbl8yMCIsIm5vZGVfNTciLCJub2RlXzU4Iiwibm9kZV81OSIsIm5vZGVfNjAiLCJub2RlXzYxIiwibm9kZV82MiIsInNwYW5fMjEiLCJub2RlXzYzIiwibm9kZV82NCIsIm5vZGVfNjUiLCJub2RlXzY2Iiwibm9kZV82NyIsInNwYW5fMjIiLCJub2RlXzY4Iiwibm9kZV82OSIsIm5vZGVfNzAiLCJub2RlXzcxIiwic3Bhbl8yMyIsIm5vZGVfNzIiLCJub2RlXzczIiwibm9kZV83NCIsInNwYW5fMjQiLCJmcmFnbWVudF85Iiwibm9kZV83NSIsIm5vZGVfNzYiLCJzcGFuXzI1Iiwicm9vdF8xMiIsIm5vZGVfNzciLCJub2RlXzc4Iiwic3Bhbl8yNiIsIm5vZGVfNzkiLCJub2RlXzgwIiwibm9kZV84MSIsIm5vZGVfODIiLCJub2RlXzgzIiwic3Bhbl8yNyIsIm5vZGVfODQiLCJub2RlXzg1Iiwibm9kZV84NiIsInNwYW5fMjgiLCJub2RlXzg3Iiwibm9kZV84OCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OytVQUFBLFVBZUNBLEdBQUlDLEdBQUEsOENBb2dCUyxhQUFZLENBQUFBLEVBQUFDLElBQUEsQ0FBRyxJQUFBQyxZQUFBLEtBQ3BCQyxHQUFBSCxFQUFBLG1CQUNJRSxFQUFJLFVBRUMsQ0FBQSxNQUFPLEVBQUcsS0FBTSxRQUFRLEVBQ3hCLENBQUEsTUFBTyxFQUFHLEtBQU0sUUFBUSxFQUN4QixDQUFBLE1BQU8sRUFBRyxLQUFNLFFBQVEsRUFDeEIsQ0FBQSxNQUFPLEVBQUcsS0FBTSxhQUFhLEVBQzdCLENBQUEsTUFBTyxFQUFHLEtBQU0sVUFBVSxFQUMxQixDQUFBLE1BQU8sRUFBRyxLQUFNLFNBQVMsRUFDekIsQ0FBQSxNQUFPLEVBQUcsS0FBTSxRQUFRLEVBQ3hCLENBQUEsTUFBTyxFQUFHLEtBQU0scUJBQXFCLEVBQ3JDLENBQUEsTUFBTyxFQUFHLEtBQU0sU0FBUyxFQUN6QixDQUFBLE1BQU8sRUFBRyxLQUFNLE9BQU8sRUFDdkIsQ0FBQSxNQUFPLEVBQUcsS0FBTSxNQUFNLEVBQ3RCLENBQUEsTUFBTyxFQUFHLEtBQU0sU0FBUyxFQUN6QixDQUFBLE1BQU8sRUFBRyxLQUFNLFlBQVksRUFDNUIsQ0FBQSxNQUFPLEVBQUcsS0FBTSxTQUFTLEVBQ3pCLENBQUEsTUFBTyxFQUFHLEtB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
