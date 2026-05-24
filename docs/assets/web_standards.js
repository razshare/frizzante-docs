import{p as X,f as Z,a as ee,s as e,t as re,b as te,c as ae,g as B,u as D,h as t}from"./index-B7rtd99V.js";import{b as d,f as ne}from"./navbar.js";import{C as a}from"./code.js";import{P as oe,T as l,R as ie,F as se}from"./right_sidebar.js";import{I as r}from"./inline_code.js";var de=Z(`<!> <span>You can use <!> and <!> in order to make your hyperlinks and forms adapt to the client’s browser capabilities and/or the server’s rendering
        configuration.</span> <br/> <br/> <!> <!> <span>When JavaScript is disabled, <!> will render as a traditional anchor, which by default will navigate the client away to <!>.</span> <br/> <span>On the other hand, when JavaScript is enabled, <!> will render to an anchor that overrides the default behavior of the browser. Instead of navigating away immediately, <a>fetch</a> is used to retrieve the contents of <!> and update the current state and view based on the server’s response.</span> <br/> <span>For example, given the following handler using <!></span> <!> <span>The view will ultimately render the following in the client’s browser.</span> <!> <span>But using <!> will instead render</span> <!> <!> <!> <span>When JavaScript is disabled, <!> will render as a traditional form, which by default will submit to <!> and navigate the client away.</span> <br/> <span>On the other hand, when JavaScript is enabled, <!> will render to a form that overrides
        the default behavior of the browser. Instead of navigating away immediately, <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"><span>fetch</span></a> is used to submit the form to <!> and update the current state and view based on the server’s response.</span> <br/> <span>For example, given the following handler using <!>.</span> <!> <span>The view will ultimately render the following in the client’s browser.</span> <!> <span>But using <!> will instead render.</span> <!> <span>Where <!> takes care of submitting the form and fetching the new state and view
        from <!>.</span>`,1);function fe(H,o){X(o,!0),oe(H,{title:"Web Standards",get prefix(){return o.prefix},rightSidebar:(i,s)=>{let n=()=>s?.().body;ie(i,{get body(){return n()},items:[{shift:0,text:"Web Standards"},{shift:0,text:"Adaptive Hyperlinks"},{shift:0,text:"Adaptive Forms"}]})},footer:i=>{{let s=D(()=>({label:"Views",href:d("/views",{prefix:o.prefix})})),n=D(()=>({label:"Cli",href:d("/cli",{prefix:o.prefix})}));se(i,{get previous(){return B(s)},get next(){return B(n)}})}},children:(i,s)=>{var n=de(),c=ee(n);l(c,{text:"Web Standards"});var p=e(c,2),h=e(t(p));r(h,{source:"href()"});var N=e(h,2);r(N,{source:"action()"});var v=e(p,6);l(v,{text:"Adaptive Hyperlinks"});var m=e(v,2);a(m,{lang:"svelte",source:`
            <script lang="ts">
                import { href } from "$lib/scripts/core/href.ts"
            <\/script>
            <!--
            Defines a link, which when triggered will either
            directly navigate to the given path, or do so using 
            fetch, depending on wether JavaScript is enabled or not.
            -->
            <a {...href("/some-other-page")}> Go to some other page </a>
        `});var u=e(m,2),f=e(t(u));r(f,{source:"<a>"});var O=e(f,2);r(O,{source:"/some-other-page"});var b=e(u,4),g=e(t(b));r(g,{source:"<a>"});var w=e(g,2),$=e(w,2);r($,{source:"/some-other-page"});var _=e(b,4),z=e(t(_));r(z,{source:"view.RenderModeServer"});var y=e(_,2);a(y,{lang:"go",source:`
            package welcome
            
            import (
                "main/lib/core/clients"
                "main/lib/core/send"
                "main/lib/core/views"
            )

            func View(client *clients.Client)  {
                send.View(client, views.View{          // Sends view.
                    Name: "Welcome",                   // Sets name of the view.
                    RenderMode: view.RenderModeServer, // Renders view only on the server.
                })
            }
        `});var S=e(y,4);a(S,{lang:"html",source:`
            <a href="/some-other-page"> Go to some other page </a>
        `});var x=e(S,2),U=e(t(x));r(U,{source:"view.RenderModeFull"});var R=e(x,2);a(R,{lang:"html",source:`
            <a href="/some-other-page" onclick="onclick(event)"> Go to some other page </a>
        `});var k=e(R,2);l(k,{text:"Adaptive Forms"});var W=e(k,2);a(W,{lang:"svelte",source:`
            <script lang="ts">
                import { action } from "$lib/scripts/core/action.ts"
            <\/script>
            <form {...action("/process")}>
                <input type="text" name="name" />
                <!--
                Defines a button, which when triggered will either
                directly submit the form, or do so using fetch(),
                depending on wether JavaScript is enabled or not.
                -->
                <button type="submit">Submit</button>
            </form>
        `});var F=e(W,2),M=e(t(F));r(M,{source:"<form>"});var Y=e(M,2);r(Y,{source:"/process"});var V=e(F,4),A=e(t(V));r(A,{source:"<form>"});var j=e(A,4);r(j,{source:"/process"});var I=e(V,4),q=e(t(I));r(q,{source:"view.RenderModeServer"});var J=e(I,2);a(J,{lang:"go",source:`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/send"
                "main/lib/core/views"
            )

            func View(client *clients.Client)  {
                send.View(client, views.View{          // Sends view.
                    Name: "Welcome",                   // Sets name of the view.
                    RenderMode: view.RenderModeServer, // Renders view only on the server.
                })
            }
        `});var C=e(J,4);a(C,{lang:"html",source:`
            <form action="/process">
                <input type="text" name="name" />
                <button type="submit">Submit</button>
            </form>
        `});var P=e(C,2),E=e(t(P));r(E,{source:"view.RenderModeFull"});var T=e(P,2);a(T,{lang:"html",source:`
            <form action="/process" onsubmit="onsubmit(event)">
                <input type="text" name="name" />
                <button type="submit">Submit</button>
            </form>
        `});var K=e(T,2),G=e(t(K));r(G,{source:"onsubmit(event)"});var L=e(G,2);r(L,{source:"/process"}),re(Q=>ne(w,"href",Q),[()=>d("/some-other-page",{prefix:o.prefix})]),te(i,n)},$$slots:{rightSidebar:!0,footer:!0,default:!0}}),ae()}export{fe as default};
