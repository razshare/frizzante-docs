import{p as fs,f as d,a as p,s as e,h as r,b as l,c as hs,g as De,u as Ee}from"./index-imKwFRqS.js";import{a as _s,h as bs,b}from"./navbar.js";import{C as w}from"./caution.js";import{C as a}from"./code.js";import{P as ws,T as i,R as Ss,F as ys}from"./right_sidebar.js";import{I as s}from"./inline_code.js";import{N as _}from"./note.js";import{T as S}from"./tip.js";var xs=d("<span>You are also welcome to <a>contribute</a> back if you can.</span>"),ks=d(`<span>The <!> function creates a function that is capable executing JavaScript code on
            the server. This is what enables Server Side Rendering for your server, as the package name implies.</span>`),Cs=d(`<span>The first parameter of <!> indicates how many runtimes should be created and executed
            in parallel when rendering views.</span> <br/> <span>Setting this value too high could lead to unnecessary large memory usage by your JavaScript runtimes.</span> <br/> <span>For most use cases a limit of 1 runtime is more than enough.</span> <br/> <br/> <span>Modify based on actual performance benchmarks.</span>`,1),Rs=d("<span>If you don't plan to use SSR features then create your render function using <!> instead.</span> <!> <span>This will reduce the minimum size of the final binary from 25MB to 10MB.</span>",1),Ps=d('<span>Sending header fields or status after sending out content is not allowed.</span> <br/> <span>Read <a href="#order-of-operations">below</a>.</span>',1),Ts=d("<span>You can also use a <!> tag, it will match the field correctly as if it were a <!> tag.</span> <br/> <span>This is so that you can integrate your structs more easily with other libraries that only take into account <!> formats.</span>",1),Vs=d("<span>Form structs can define slices and files.</span> <!> <span>You can open and read the file.</span> <!> <span>Remember to close your files.</span> <!>",1),Hs=d("<span>The session id is retrieved from the client’s session-id cookie.</span> <span>If the client doesn’t provide such cookie, <!> creates a new session id and sends the cookie to the client.</span>",1),Ns=d(`<span>Since <!> might send a cookie to the client, it is important to remember
            that order of operations matters.</span>`),Fs=d("The session is retrieved using <!>.",1),$s=d(`<!> <span>All internals of the framework are exposed.</span> <br/> <span>You can modify these internals, in fact it is intended for you to do so whenever you're in a state of urgency,
        you're hitting a performance wall that needs to be solved immediately, a bug comes up and so on.</span> <!> <!> <span>Create a new server with <!>, then followup with <!> in order to start the server.</span> <!> <!> <!> <!> <!> <span>Each server exposes a slice of Routes which you can freely modify.</span> <br/> <span>You can add a new route by appending to or overwriting <!>.</span> <!> <span>Where <!> is a function pointer.</span> <!> <!> <span>Route patterns can define dynamic path fields using <!> syntax.</span> <!> <span>Path fields can then be retrieved with <!>.</span> <!> <!> <span>Use <!> to retrieve messages sent by the client.</span> <!> <span>Use <!> to send a message to the client.</span> <!> <!> <span>Use <!> to retrieve header fields sent by the client.</span> <!> <span>Use <!> to send header fields to the client.</span> <!> <!> <span>Use <!> to send the status of the response to the client.</span> <!> <!> <!> <span>Order of operations matters when sending data to the client.</span> <br/> <span>For example, sending the status code with <!> after you’ve already sent content with <!> is not allowed.</span> <!> <span><!> will fail and the client will receive status 200 instead of 404.</span> <!> <span>The failure is logged to the server’s error logger.</span> <br/> <span>Assuming you’re using the default error logger, you’ll see an error of sorts in your <strong>console</strong></span> <!> <span><!>, meaning the status code has already been sent to the client and
        there’s nothing you can do about it.</span> <!> <span>Use <!> to retrieve query fields.</span> <!> <!> <span>Use <!> to parse incoming content as multipart form or url encoded form when using <!> and <!> http verbs.</span> <!> <!> <!> <!> <!> <span>Use <!> to parse incoming content as json when using POST and PUT http verbs and <!> to send json content.</span> <!> <!> <!> <span>Use <!> to retrieve cookies and <!> to send
        them.</span> <!> <!> <span>Use <!> to retrieve the client’s session id.</span> <!> <!> <!> <!> <span>Use <!> to retrieve the client’s session.</span> <!> <!> <!> <span>Use <!> to redirect to a different location.</span> <!> <!> <span>Use <!> to redirect to a different location with status 302.</span> <!>`,1);function Es(Ye,m){fs(m,!0),ws(Ye,{title:"Basics",get prefix(){return m.prefix},rightSidebar:(g,h)=>{let u=()=>h?.().body;Ss(g,{get body(){return u()},items:[{shift:0,text:"Basics"},{shift:0,text:"Server"},{shift:0,text:"Routes"},{shift:0,text:"Path Fields"},{shift:0,text:"Messages"},{shift:0,text:"Headers"},{shift:0,text:"Status"},{shift:0,text:"Order of Operations"},{shift:0,text:"Queries"},{shift:0,text:"Forms"},{shift:0,text:"Json"},{shift:0,text:"Cookies"},{shift:0,text:"Session Id"},{shift:0,text:"Session"},{shift:0,text:"Redirect"},{shift:0,text:"Navigate"}]})},footer:g=>{{let h=Ee(()=>({label:"Get Started",href:b("/get_started",{prefix:m.prefix})})),u=Ee(()=>({label:"Web Sockets",href:b("/web_sockets",{prefix:m.prefix})}));ys(g,{get previous(){return De(h)},get next(){return De(u)}})}},children:(g,h)=>{var u=$s(),y=p(u);i(y,{text:"Basics"});var x=e(y,8);_(x,{children:(o,v)=>{var n=xs(),t=e(r(n));_s(t,c=>({...c}),[()=>bs(b("/issues",{prefix:m.prefix}))]),l(o,n)}});var k=e(x,2);i(k,{text:"Server"});var C=e(k,2),R=e(r(C));s(R,{source:"servers.New()"});var Qe=e(R,2);s(Qe,{source:"servers.Start()"});var P=e(C,2);a(P,{lang:"go",source:`
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
        `});var O=e(M,2);i(O,{text:"Path Fields"});var I=e(O,2),We=e(r(I));s(We,{source:"{}"});var A=e(I,2);a(A,{lang:"go",source:'routes.Route{Pattern: "GET /{name}", Handler: welcome.View}'});var G=e(A,2),Ke=e(r(G));s(Ke,{source:"receive.Path()"});var J=e(G,2);a(J,{lang:"go",source:`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
            )

            func View(client *clients.Client) {
                _ = receive.Path(client, "name") // Retrieves field "name".
            }
        `});var j=e(J,2);i(j,{text:"Messages"});var B=e(j,2),Le=e(r(B));s(Le,{source:"receive.Message()"});var D=e(B,2);a(D,{lang:"go",source:`
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
        `});var W=e(q,2),es=e(r(W));s(es,{source:"send.Header()"});var K=e(W,2);a(K,{lang:"go",source:`
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
        `});var L=e(K,2);i(L,{text:"Status"});var X=e(L,2),ss=e(r(X));s(ss,{source:"send.Status()"});var Z=e(X,2);a(Z,{lang:"go",source:`
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
