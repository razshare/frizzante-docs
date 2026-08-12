import{t as e}from"./code.js";import{B as t,E as n,G as r,J as i,K as a,O as o,P as s,R as c,W as l,Y as u,z as d}from"./index-BpsDYWKC.js";import{a as f}from"./navbar.js";import{i as p,n as m,r as h,t as g}from"./title.js";import{t as _}from"./inline_code.js";var v=o(`<!> <span>Use <!> to upgrade the connection to web sockets.</span> <!> <span>Then consume the web socket on the client.</span> <!>`,1);function y(o,y){a(y,!0),h(o,{title:`Web Sockets`,get prefix(){return y.prefix},rightSidebar:(e,t)=>{let n=()=>(t?.()).body;m(e,{get body(){return n()},items:[{shift:0,text:`Web Sockets`}]})},footer:e=>{{let t=l(()=>({label:`Basics`,href:f(`/basics`,{prefix:y.prefix})})),n=l(()=>({label:`Server Sent Events`,href:f(`/server_sent_events`,{prefix:y.prefix})}));p(e,{get previous(){return s(t)},get next(){return s(n)}})}},children:(r,a)=>{var o=v(),s=d(o);g(s,{text:`Web Sockets`});var l=t(s,2);_(t(c(l)),{source:`negotiate.WsUpgrade()`}),i(),u(l);var f=t(l,2);e(f,{lang:`go`,source:`
            package main

            import (
                "io"
                "main/lib/core/negotiate"
                "main/lib/core/routes"
                "main/lib/core/scopes"
                "net/http"
                "time"
            )

            var _ = routes.Route{
                Pattern: "GET /",
                Handler: func(_ scopes.Scope, request *http.Request, writer http.ResponseWriter) {
                    negotiate.WsUpgrade(&writer, request) // Negotiates ws upgrade with the client
                                                          // and replaces writer and request with 
                                                          // ws compliant ones.
                    for {
                        _, _ = io.ReadAll(request.Body)      // Receives message.
                        _, _ = writer.Write([]byte("hello")) // Sends message.
                        time.Sleep(time.Second)              // Sleeps for 1 second.
                    }
                },
            }
        `}),e(t(f,4),{lang:`svelte`,source:`
            <script lang="ts">
                const messages: string[] = $state([]) // Creates reactive list of messages.
                const socket = new WebSocket("/ws")   // Connects to handler.
                socket.addEventListener("message", function listen(event:MessageEvent) {
                    messages.push(event.data)         // Appends incoming messages to the 
                                                      // reactive list of messages for later use.
                })
                socket.send("Hello")                  // Sends message.
            <\/script>

            <Title text="Messages"/>
            {#each messages as message, id (id)}      <!-- Iterates the list of messages. -->
                <div>{message}</div>                  <!-- Renders message. -->
            {/each}
        `}),n(r,o)},$$slots:{rightSidebar:!0,footer:!0,default:!0}}),r()}export{y as default};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViX3NvY2tldHMuanMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3ZpZXdzL3dlYl9zb2NrZXRzLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuICAgIGltcG9ydCBDb2RlIGZyb20gXCIkbGliL2NvbXBvbmVudHMvY29kZS5zdmVsdGVcIlxuICAgIGltcG9ydCBGb290ZXIgZnJvbSBcIiRsaWIvY29tcG9uZW50cy9mb290ZXIuc3ZlbHRlXCJcbiAgICBpbXBvcnQgSW5saW5lQ29kZSBmcm9tIFwiJGxpYi9jb21wb25lbnRzL2lubGluZV9jb2RlLnN2ZWx0ZVwiXG4gICAgaW1wb3J0IFBhZ2UgZnJvbSBcIiRsaWIvY29tcG9uZW50cy9wYWdlLnN2ZWx0ZVwiXG4gICAgaW1wb3J0IFJpZ2h0U2lkZWJhciBmcm9tIFwiJGxpYi9jb21wb25lbnRzL3JpZ2h0X3NpZGViYXIuc3ZlbHRlXCJcbiAgICBpbXBvcnQgVGl0bGUgZnJvbSBcIiRsaWIvY29tcG9uZW50cy90aXRsZS5zdmVsdGVcIlxuICAgIGltcG9ydCB7IGJhc2UgfSBmcm9tIFwiJGxpYi9zY3JpcHRzL3N0cmluZ3MvYmFzZVwiXG4gICAgbGV0IHsgcHJlZml4IH0gPSAkcHJvcHMoKVxuPC9zY3JpcHQ+XG5cbjxQYWdlIHRpdGxlPVwiV2ViIFNvY2tldHNcIiB7cHJlZml4fT5cbiAgICA8VGl0bGUgdGV4dD1cIldlYiBTb2NrZXRzXCIgLz5cbiAgICA8c3Bhbj5Vc2UgPElubGluZUNvZGUgc291cmNlPVwibmVnb3RpYXRlLldzVXBncmFkZSgpXCIgLz4gdG8gdXBncmFkZSB0aGUgY29ubmVjdGlvbiB0byB3ZWIgc29ja2V0cy48L3NwYW4+XG4gICAgPENvZGVcbiAgICAgICAgbGFuZz1cImdvXCJcbiAgICAgICAgc291cmNlPXtgXG4gICAgICAgICAgICBwYWNrYWdlIG1haW5cblxuICAgICAgICAgICAgaW1wb3J0IChcbiAgICAgICAgICAgICAgICBcImlvXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvbmVnb3RpYXRlXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvcm91dGVzXCJcbiAgICAgICAgICAgICAgICBcIm1haW4vbGliL2NvcmUvc2NvcGVzXCJcbiAgICAgICAgICAgICAgICBcIm5ldC9odHRwXCJcbiAgICAgICAgICAgICAgICBcInRpbWVcIlxuICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICB2YXIgXyA9IHJvdXRlcy5Sb3V0ZXtcbiAgICAgICAgICAgICAgICBQYXR0ZXJuOiBcIkdFVCAvXCIsXG4gICAgICAgICAgICAgICAgSGFuZGxlcjogZnVuYyhfIHNjb3Blcy5TY29wZSwgcmVxdWVzdCAqaHR0cC5SZXF1ZXN0LCB3cml0ZXIgaHR0cC5SZXNwb25zZVdyaXRlcikge1xuICAgICAgICAgICAgICAgICAgICBuZWdvdGlhdGUuV3NVcGdyYWRlKCZ3cml0ZXIsIHJlcXVlc3QpIC8vIE5lZ290aWF0ZXMgd3MgdXBncmFkZSB3aXRoIHRoZSBjbGllbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbmQgcmVwbGFjZXMgd3JpdGVyIGFuZCByZXF1ZXN0IHdpdGggXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd3MgY29tcGxpYW50IG9uZXMuXG4gICAgICAgICAgICAgICAgICAgIGZvciB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLCBfID0gaW8uUmVhZEFsbChyZXF1ZXN0LkJvZHkpICAgICAgLy8gUmVjZWl2ZXMgbWVzc2FnZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIF8sIF8gPSB3cml0ZXIuV3JpdGUoW11ieXRlKFwiaGVsbG9cIikpIC8vIFNlbmRzIG1lc3NhZ2UuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lLlNsZWVwKHRpbWUuU2Vjb25kKSAgICAgICAgICAgICAgLy8gU2xlZXBzIGZvciAxIHNlY29uZC5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgIGB9XG4gICAgLz5cbiAgICA8c3Bhbj5UaGVuIGNvbnN1bWUgdGhlIHdlYiBzb2NrZXQgb24gdGhlIGNsaWVudC48L3NwYW4+XG4gICAgPENvZGVcbiAgICAgICAgbGFuZz1cInN2ZWx0ZVwiXG4gICAgICAgIHNvdXJjZT17YFxuICAgICAgICAgICAgJHtcIjxcIn1zY3JpcHQgbGFuZz1cInRzXCI+XG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZXM6IHN0cmluZ1tdID0gJHN0YXRlKFtdKSAvLyBDcmVhdGVzIHJlYWN0aXZlIGxpc3Qgb2YgbWVzc2FnZXMuXG4gICAgICAgICAgICAgICAgY29uc3Qgc29ja2V0ID0gbmV3IFdlYlNvY2tldChcIi93c1wiKSAgIC8vIENvbm5lY3RzIHRvIGhhbmRsZXIuXG4gICAgICAgICAgICAgICAgc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGZ1bmN0aW9uIGxpc3RlbihldmVudDpNZXNzYWdlRXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChldmVudC5kYXRhKSAgICAgICAgIC8vIEFwcGVuZHMgaW5jb21pbmcgbWVzc2FnZXMgdG8gdGhlIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVhY3RpdmUgbGlzdCBvZiBtZXNzYWdlcyBmb3IgbGF0ZXIgdXNlLlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgc29ja2V0LnNlbmQoXCJIZWxsb1wiKSAgICAgICAgICAgICAgICAgIC8vIFNlbmRzIG1lc3NhZ2UuXG4gICAgICAgICAgICA8L3NjcmlwdD5cblxuICAgICAgICAgICAgPFRpdGxlIHRleHQ9XCJNZXNzYWdlc1wiLz5cbiAgICAgICAgICAgIHsjZWFjaCBtZXNzYWdlcyBhcyBtZXNzYWdlLCBpZCAoaWQpfSAgICAgIDwhLS0gSXRlcmF0ZXMgdGhlIGxpc3Qgb2YgbWVzc2FnZXMuIC0tPlxuICAgICAgICAgICAgICAgIDxkaXY+e21lc3NhZ2V9PC9kaXY+ICAgICAgICAgICAgICAgICAgPCEtLSBSZW5kZXJzIG1lc3NhZ2UuIC0tPlxuICAgICAgICAgICAgey9lYWNofVxuICAgICAgICBgfVxuICAgIC8+XG4gICAgeyNzbmlwcGV0IHJpZ2h0U2lkZWJhcih7IGJvZHkgfSl9XG4gICAgICAgIDxSaWdodFNpZGViYXIge2JvZHl9IGl0ZW1zPXtbeyBzaGlmdDogMCwgdGV4dDogXCJXZWIgU29ja2V0c1wiIH1dfSAvPlxuICAgIHsvc25pcHBldH1cbiAgICB7I3NuaXBwZXQgZm9vdGVyKCl9XG4gICAgICAgIDxGb290ZXJcbiAgICAgICAgICAgIHByZXZpb3VzPXt7IGxhYmVsOiBcIkJhc2ljc1wiLCBocmVmOiBiYXNlKFwiL2Jhc2ljc1wiLCB7IHByZWZpeCB9KSB9fVxuICAgICAgICAgICAgbmV4dD17eyBsYWJlbDogXCJTZXJ2ZXIgU2VudCBFdmVudHNcIiwgaHJlZjogYmFzZShcIi9zZXJ2ZXJfc2VudF9ldmVudHNcIiwgeyBwcmVmaXggfSkgfX1cbiAgICAgICAgLz5cbiAgICB7L3NuaXBwZXR9XG48L1BhZ2U+XG4iXSwibWFwcGluZ3MiOiJvYUFBQSxTQVdDLEVBQUksRUFBQSxtREFvRFMsY0FBWSxFQUFBLElBQUEsS0FBRyxPQUFJLElBQUEsRUFBQSxDQUFKLEtBQ3BCLEVBQVksRUFBQSxtQkFBRSxFQUFJLFdBQVksTUFBTyxFQUFHLEtBQU0sYUFBYSxDQUFBLEtBRXRELE9BQU0sR0FBQSxnQkFFSSxNQUFPLFNBQVUsS0FBTSxFQUFLLFVBQVMsQ0FBSSxPQUFNLEVBQUEsTUFBQSxDQUFBLGVBQ25ELE1BQU8scUJBQXNCLEtBQU0sRUFBSyxzQkFBcUIsQ0FBSSxPQUFNLEVBQUEsTUFBQSxDQUFBLEtBRmxGLEVBQUEsRUFBQSwyRkF2REosRUFBSyxFQUFBLENBQUEsS0FBQSxhQUFBLENBQUEsTUFDTCxFQUFJLEVBQUEsRUFBQSxDQUFBLEVBQU0sRUFBQSxFQUFBLEVBQVYsQ0FBSSxDQUFnQixFQUFBLENBQUEsT0FBQSx1QkFBQSxDQUFBLFFBQXBCLENBQUksVUFBSixFQUFJLENBQUEsRUFDSixFQUFBLEVBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUE4QkEsRUFBQSxFQUFBLEVBQUEsQ0FBQSxFQUFBOzs7Ozs7Ozs7Ozs7Ozs7d0VBbkNHIn0=