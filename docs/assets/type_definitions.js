import{p as O,f as s,a as n,s as e,b as o,c as Q,g as I,u as C,h as i}from"./index-4KvfKxUW.js";import{a as U,h as V,b as A}from"./navbar.js";import{C as r}from"./code.js";import{P as W,T as X,R as Z,F as ee}from"./right_sidebar.js";import{I as t}from"./inline_code.js";import{K as E}from"./keyed_section.js";import{N as F}from"./note.js";import{T as K}from"./tip.js";var re=s("<span>All <!> tags are optional.</span>"),oe=s("<!> <!>",1),te=s("<span>You can use the default <!> alias to access the <!> directory.</span> <!>",1),se=s(`<span>You don't have to run <!> manually every time you make a change
                    to your type definitions.</span> <br/> <span>The default air configuration specifies a <strong>pre</strong> and a <strong>post</strong> build scripts, which will handle everything automatically.</span> <!>`,1),ae=s("<span>Instead of calling <!> in your main program, you can use the <a>pre build checkpoint</a> to generate types.</span> <!> <span>Then run the prebuild checkpoint directly.</span> <!> <!>",1),ne=s("<!> <span>All you have to do now is run your main program.</span> <br/> <!> <br/> <span>This will generate your type definitions in <!>.</span> <!> <!> <!>",1),ie=s("<!> <span>It is possible, but not required, to generate TypeScript type definitions from Go structs using <!>, where T is the type you wish to generate.</span> <br/> <br/> <!> <!>",1);function ye(M,m){O(m,!0),W(M,{title:"Type Definitions",get prefix(){return m.prefix},rightSidebar:(p,_)=>{let a=()=>_?.().body;Z(p,{get body(){return a()},items:[{shift:0,text:"Type Definitions"},{shift:1,text:"Define your Go types"},{shift:1,text:"Generate types"}]})},footer:p=>{{let _=C(()=>({label:"Cli",href:A("/cli",{prefix:m.prefix})})),a=C(()=>({label:"Snapshots",href:A("/snapshots",{prefix:m.prefix})}));ee(p,{get previous(){return I(_)},get next(){return I(a)}})}},children:(p,_)=>{var a=ie(),w=n(a);X(w,{text:"Type Definitions"});var k=e(w,2),N=e(i(k));t(N,{source:"types.Generate[T]()"});var z=e(k,6);E(z,{key:"1",description:"Define your Go types.",children:($,Y)=>{var l=oe(),d=n(l);r(d,{lang:"go",source:`
                package welcome

                type Props struct {
                    Message string \`json:"message"\`
                    Error   string \`json:"error"\`
                }
            `});var v=e(d,2);F(v,{children:(h,G)=>{var c=re(),y=e(i(c));t(y,{source:"json"}),o(h,c)}}),o($,l)},$$slots:{default:!0}});var R=e(z,2);E(R,{key:"2",description:"Generate types.",noLink:!0,children:($,Y)=>{var l=ne(),d=n(l);r(d,{lang:"go",source:`
                package welcome

                import "main/lib/core/types"

                var _ = types.Generate[welcome.Props]() // add this line

                type Props struct {
                    Message string \`json:"message"\`
                    Error   string \`json:"error"\`
                }
            `});var v=e(d,6);r(v,{lang:"shell",source:"frizzante dev"});var h=e(v,4),G=e(i(h));t(G,{source:".gen/types"});var c=e(h,2);r(c,{lang:"ts",source:`
                export type Props = welcome.Props
                export declare namespace welcome {
                    export type Props = {
                        message: string
                        error: string
                    }
                }
            `});var y=e(c,2);K(y,{children:(P,L)=>{var u=te(),g=n(u),f=e(i(g));t(f,{source:"$gen"});var x=e(f,2);t(x,{source:".gen"});var b=e(g,2);r(b,{lang:"ts",source:`
                    <script lang="ts">
                        import type { Props } from "$gen/types/main/lib/routes/welcome/Props"
                        let { message, error }:Props = $props()
                    <\/script>
                `}),o(P,u)}});var q=e(y,2);K(q,{children:(P,L)=>{var u=ae(),g=n(u),f=e(i(g));t(f,{source:"types.Generate[T]()"});var x=e(f,2);U(x,T=>({...T}),[()=>V("/build_checkpoints#pre-build-checkpoint")]);var b=e(g,2);r(b,{lang:"go",source:`
                    package main

                    import (
                        "main/lib/core/types"
                        "main/lib/routes/todos"
                    )

                    func main() {
                        types.Generate[todos.Props](),
                    }

                `});var j=e(b,4);r(j,{lang:"shell",source:"frizzante prebuild"});var B=e(j,2);F(B,{children:(T,de)=>{var D=se(),S=n(D),H=e(i(S));t(H,{source:"frizzante prebuild"});var J=e(S,6);r(J,{lang:"toml",source:`
                        post_cmd = ["frizzante postbuild"]
                        pre_cmd = ["frizzante prebuild"]
                    `}),o(T,D)}}),o(P,u)}}),o($,l)},$$slots:{default:!0}}),o(p,a)},$$slots:{rightSidebar:!0,footer:!0,default:!0}}),Q()}export{ye as default};
