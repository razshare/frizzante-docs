import{p as v,f as b,a as h,s as t,b as S,c as _,g as d,u as g,h as k}from"./index-imKwFRqS.js";import{C as n}from"./code.js";import{P as x,T as w,R as W,F as T}from"./right_sidebar.js";import{I as C}from"./inline_code.js";import{b as m}from"./navbar.js";var R=b("<!> <span>Use <!> to upgrade the connection to web sockets.</span> <!> <!> <span>Then consume the web socket on the client.</span> <!>",1);function A(p,a){v(a,!0),x(p,{title:"Web Sockets",get prefix(){return a.prefix},rightSidebar:(s,r)=>{let e=()=>r?.().body;W(s,{get body(){return e()},items:[{shift:0,text:"Web Sockets"}]})},footer:s=>{{let r=g(()=>({label:"Basics",href:m("/basics",{prefix:a.prefix})})),e=g(()=>({label:"Server Sent Events",href:m("/server_sent_events",{prefix:a.prefix})}));T(s,{get previous(){return d(r)},get next(){return d(e)}})}},children:(s,r)=>{var e=R(),o=h(e);w(o,{text:"Web Sockets"});var i=t(o,2),f=t(k(i));C(f,{source:"send.WsUpgrade()"});var c=t(i,2);n(c,{lang:"go",source:'routes.Route{Pattern: "GET /ws", Handler: welcome.View}'});var l=t(c,2);n(l,{lang:"go",source:`
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
                "main/lib/core/send"
                "time"
            )

            func View(client *clients.Client) {
                alive := receive.IsAlive(client)          // Tracks request status.
                send.WsUpgrade(client)                    // Sends ws upgrade.
                for *alive {                              // Loops until cancellation.
                    name := receive.Message(client)       // Receives message.
                    send.Message(client, "Hello " + name) // Sends message.
                    time.Sleep(time.Second)               // Sleeps for 1 second.
                }
            }
        `});var u=t(l,4);n(u,{lang:"svelte",source:`
        <script lang="ts">
            const messages: string[] = $state([]) // Creates reactive list of messages.
            const socket = new WebSocket("/ws")   // Connects to handler.
            socket.addEventListener("message", function listen(event:MessageEvent) {
                messages.push(event.data)         // Appends incoming messages to the 
                                                  // reactive list of messages for later use.
            })
            socket.send("Hello")                  // Sends message.
        <\/script>

        <Title  text="Messages"/>
        {#each messages as message, id (id)}      <!-- Iterates the list of messages. -->
            <div>{message}</div>                  <!-- Renders message. -->
        {/each}

    `}),S(s,e)},$$slots:{rightSidebar:!0,footer:!0,default:!0}}),_()}export{A as default};
