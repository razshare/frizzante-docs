import{p as fe,f as v,a as d,s as e,b as o,c as ge,g as X,u as Z,h as z,d as ee,e as t}from"./index-Bxc5mm7R.js";import{C as $}from"./code.js";import{F as _e}from"./file_tree.js";import{P as be,T as $e,R as ye,F as ke}from"./right_sidebar.js";import{I as p}from"./inline_code.js";import{K as T}from"./keyed_section.js";import{T as xe}from"./tip.js";import{b as te}from"./navbar.js";var ze=v(`<span>Before taking a snapshot of your server, you need to list the static routes you would like to snapshot using
            a server route.</span> <br/> <span>You can do this by hand</span> <!> <span>or you can use <!>.</span> <br/> <span>It will generate a route using the given <!>; the resulting route will list all
            available GET routes for the given <!> as <!>.</span> <!>`,1),we=v(`<span>It doesn't matter how you start the application, you can do it in development mode, in production mode or
            whatever other mode you're using.</span> <br/> <span>All that matters is that <!> is reachable.</span> <br/> <br/> <!> <!> <!>`,1),Se=v("<span>The default frizzante project comes with a <!> which already defines a shortcut <!> so you could also run <!></span>"),Pe=v("<!> <!>",1),Te=v("<!> <!> <!> <!> <!> <!> <!>",1),je=v("<!> <!>",1),Ee=v("<!> <!> <!> <!> <!>",1),Ge=v("<span>Run the frizzante cli and point it to the <!> route.</span> <!> <span>This will retrieve the list of static routes from <!> and generate the output in <!>.</span> <!> <!> <br/> <span>You can publish the <!> directory to a CDN and your website should render statically.</span>",1),Fe=v('<!> <span>You can take a snapshot of a server using the cli and statically generate your website.</span> <br/> <span>This technique is also known as <a target="_blank" href="https://en.wikipedia.org/wiki/Static_site_generator"><span>SSG, Static Site Generation</span></a>.</span> <br/> <br/> <!> <!> <!>',1);function qe(re,R){fe(R,!0),be(re,{title:"Snapshots",get prefix(){return R.prefix},rightSidebar:(j,H)=>{let w=()=>H?.().body;ye(j,{get body(){return w()},items:[{shift:0,text:"Snapshots"},{shift:1,text:"List statics"},{shift:1,text:"Start the application"},{shift:2,text:"Start development server"},{shift:2,text:"Start production server"},{shift:2,text:"Start development server using makefile"},{shift:1,text:"Snapshot"}]})},footer:j=>{{let H=Z(()=>({label:"Type Definitions",href:te("/type_definitions",{prefix:R.prefix})})),w=Z(()=>({label:"Todos Example",href:te("/todos_example",{prefix:R.prefix})}));ke(j,{get previous(){return X(H)},get next(){return X(w)}})}},children:(j,H)=>{var w=Fe(),C=d(w);$e(C,{text:"Snapshots"});var D=e(C,12);T(D,{key:"1",description:"List statics",children:(E,L)=>{var h=ze(),m=e(d(h),6);$(m,{lang:"go",source:`
                package main

                import (
                    "embed"
                    "log"

                    "main/lib/core/clients"
                    "main/lib/core/routes"
                    "main/lib/core/send"
                    "main/lib/core/servers"
                    "main/lib/core/ssr"
                    "main/lib/routes/fallback"
                    "main/lib/routes/about"
                    "main/lib/routes/projects"
                )

                //go:generate frizzante clean
                //go:generate frizzante configure
                //go:generate frizzante generate types
                //go:generate frizzante package
                //go:embed app/dist
                var efs embed.FS
                var server = servers.New()

                func main() {
                    server.Efs = efs
                    server.Render = ssr.New(1)
                    server.Routes = []routes.Route{
                        {Pattern: "GET /", Handler: fallback.View},
                        {Pattern: "GET /about", Handler: about.View},
                        {Pattern: "GET /projects", Handler: projects.View},
                        {Pattern: "GET /@statics", Handler: func(client *clients.Client) {
                            send.Json(client, []string{ // <======= Manually listing all routes.
                                "/",
                                "/about",
                                "/projects",
                            })
                        }},
                    }
                    if err := servers.Start(server); err != nil {
                        log.Fatal(err)
                    }
                }
            `});var S=e(m,2),y=e(z(S));p(y,{source:"statics.New()"});var f=e(S,4),k=e(z(f));p(k,{source:"pattern"});var n=e(k,2);p(n,{source:"server"});var x=e(n,2);p(x,{source:"application/json"});var N=e(f,2);$(N,{lang:"go",source:`
                package main

                import (
                    "embed"
                    "log"

                    "main/lib/core/routes"
                    "main/lib/core/routes/statics"
                    "main/lib/core/servers"
                    "main/lib/core/ssr"
                    "main/lib/routes/about"
                    "main/lib/routes/fallback"
                    "main/lib/routes/projects"
                )

                //go:generate frizzante clean
                //go:generate frizzante configure
                //go:generate frizzante generate types
                //go:generate frizzante package
                //go:embed app/dist
                var efs embed.FS
                var server = servers.New()

                func main() {
                    server.Efs = efs
                    server.Render = ssr.New(1)
                    server.Routes = []routes.Route{
                        {Pattern: "GET /", Handler: fallback.View},
                        {Pattern: "GET /about", Handler: about.View},
                        {Pattern: "GET /projects", Handler: projects.View},
                        statics.New("GET /@statics", server), // <========== This will automatically generate a route that 
                                                              //             lists all static routes of the a given server.
                    }
                    if err := servers.Start(server); err != nil {
                        log.Fatal(err)
                    }
                }

            `}),o(E,h)},$$slots:{default:!0}});var I=e(D,2);T(I,{key:"2",description:"Start the application",children:(E,L)=>{var h=we(),m=e(d(h),4),S=e(z(m));p(S,{source:"GET /@statics"});var y=e(m,6);T(y,{key:"A",description:"Start development server",children:(n,x)=>{$(n,{lang:"bash",source:"frizzante dev"})},$$slots:{default:!0}});var f=e(y,2);T(f,{key:"B",description:"Start production server",children:(n,x)=>{$(n,{lang:"bash",source:"frizzante build && ./gen/bin/app"})},$$slots:{default:!0}});var k=e(f,2);T(k,{key:"C",description:"Start development server using makefile",noLink:!0,children:(n,x)=>{$(n,{lang:"bash",source:"make dev"})},$$slots:{default:!0}}),o(E,h)},$$slots:{default:!0}});var ae=e(I,2);T(ae,{key:"3",description:"Snapshot",noLink:!0,children:(E,L)=>{var h=Ge(),m=d(h),S=e(z(m));p(S,{source:"GET /@statics"});var y=e(m,2);$(y,{lang:"bash",source:"frizzante generate snapshot http://127.0.0.1:8080/@statics"});var f=e(y,2),k=e(z(f));p(k,{source:"http://127.0.0.1:8080/@statics"});var n=e(k,2);p(n,{source:"./.gen/snapshot"});var x=e(f,2);xe(x,{children:(Y,A)=>{var G=Se(),g=e(z(G));p(g,{source:"makefile"});var r=e(g,2);$(r,{lang:"makefile",source:`
                        snapshot:
                            frizzante generate snapshot http://127.0.0.1:8080/@statics .gen/snapshot
                    `});var V=e(r,2);$(V,{source:"make snapshot"}),o(Y,G)}});var N=e(x,2);_e(N,{children:(A,G)=>{let g=()=>G?.().Directory,r=()=>G?.().File;var V=ee(),ne=d(V);t(ne,g,(ie,le)=>{le(ie,{name:".gen",expanded:!0,children:(de,Ne)=>{var B=ee(),pe=d(B);t(pe,g,(ue,ce)=>{ce(ue,{name:"snapshot",expanded:!0,children:(ve,Ve)=>{var K=Ee(),q=d(K);t(q,g,(u,c)=>{c(u,{name:"about",expanded:!0,children:(F,Q)=>{var _=Pe(),b=d(_);t(b,r,(i,l)=>{l(i,{name:"index.html"})});var P=e(b,2);t(P,r,(i,l)=>{l(i,{name:"data.json"})}),o(F,_)},$$slots:{default:!0}})});var J=e(q,2);t(J,g,(u,c)=>{c(u,{name:"assets",expanded:!0,children:(F,Q)=>{var _=Te(),b=d(_);t(b,r,(a,s)=>{s(a,{name:"index-[hash].css"})});var P=e(b,2);t(P,r,(a,s)=>{s(a,{name:"index-[hash].js"})});var i=e(P,2);t(i,r,(a,s)=>{s(a,{name:"projects-[hash].css"})});var l=e(i,2);t(l,r,(a,s)=>{s(a,{name:"projects-[hash].js"})});var U=e(l,2);t(U,r,(a,s)=>{s(a,{name:"about-[hash].css"})});var W=e(U,2);t(W,r,(a,s)=>{s(a,{name:"about-[hash].js"})});var me=e(W,2);t(me,r,(a,s)=>{s(a,{name:"[other scripts and assets...]"})}),o(F,_)},$$slots:{default:!0}})});var M=e(J,2);t(M,g,(u,c)=>{c(u,{name:"projects",expanded:!0,children:(F,Q)=>{var _=je(),b=d(_);t(b,r,(i,l)=>{l(i,{name:"index.html"})});var P=e(b,2);t(P,r,(i,l)=>{l(i,{name:"data.json"})}),o(F,_)},$$slots:{default:!0}})});var O=e(M,2);t(O,r,(u,c)=>{c(u,{name:"index.html"})});var he=e(O,2);t(he,r,(u,c)=>{c(u,{name:"data.json"})}),o(ve,K)},$$slots:{default:!0}})}),o(de,B)},$$slots:{default:!0}})}),o(A,V)}});var se=e(N,4),oe=e(z(se));p(oe,{source:".gen/snapshot"}),o(E,h)},$$slots:{default:!0}}),o(j,w)},$$slots:{rightSidebar:!0,footer:!0,default:!0}}),ge()}export{qe as default};
