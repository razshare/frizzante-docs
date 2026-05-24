import{p as re,f as te,a as s,s as e,b as d,c as ie,g as H,u as J,h as l,d as u,e as h}from"./index-Bxc5mm7R.js";import{C as b}from"./code.js";import{F as K}from"./file_tree.js";import{P as ae,T as C,R as oe,F as ne}from"./right_sidebar.js";import{I as r}from"./inline_code.js";import{b as L}from"./navbar.js";var se=te(`<!> <span>When building with <!> or <!>, you're also executing 2 additional programs, before and after the
        build process.</span> <br/> <span>These 2 programs are referred to as <strong>pre</strong> build checkpoint and <strong>post</strong> build checkpoint.</span> <br/> <br/> <!> <span>The pre build checkpoint is a program that lives in <!> and is executed automatically by <!> right before building your main program.</span> <!> <!> <span>You can also invoke the pre build checkpoint directly with <!>.</span> <br/> <!> <br/> <br/> <!> <span>The pre build checkpoint is a program that lives in <!> and is executed automatically by <!> right after building your main program.</span> <!> <!> <span>You can also invoke the post build checkpoint directly with <!>.</span> <br/> <!>`,1);function me(M,p){re(p,!0),ae(M,{title:"Build Checkpoints",get prefix(){return p.prefix},rightSidebar:(i,c)=>{let t=()=>c?.().body;oe(i,{get body(){return t()},items:[{shift:0,text:"Build Checkpoints"},{shift:1,text:"Pre Build Checkpoint"},{shift:1,text:"Post Build Checkpoint"}]})},footer:i=>{{let c=J(()=>({label:"Basics",href:L("/basics",{prefix:p.prefix})})),t=J(()=>({label:"Web Sockets",href:L("/web_sockets",{prefix:p.prefix})}));ne(i,{get previous(){return H(c)},get next(){return H(t)}})}},children:(i,c)=>{var t=se(),P=s(t);C(P,{text:"Build Checkpoints"});var F=e(P,2),T=e(l(F));r(T,{source:"frizzante build"});var N=e(T,2);r(N,{source:"frizzante dev"});var w=e(F,10);C(w,{text:"Pre Build Checkpoint"});var D=e(w,2),S=e(l(D));r(S,{source:"./pre/main.go"});var O=e(S,2);r(O,{source:"frizzante build"});var $=e(D,2);K($,{children:(f,a)=>{let m=()=>a?.().Directory,g=()=>a?.().File;var o=u(),v=s(o);h(v,m,(_,k)=>{k(_,{expanded:!0,name:"pre",children:(x,ee)=>{var n=u(),y=s(n);h(y,g,(z,B)=>{B(z,{name:"main.go"})}),d(x,n)},$$slots:{default:!0}})}),d(f,o)}});var I=e($,2);b(I,{lang:"go",source:`
            package main

            func main() {
                println("this is the pre build checkpoint!")
            }
        `});var R=e(I,2),Q=e(l(R));r(Q,{source:"frizzante prebuild"});var W=e(R,4);b(W,{source:`
            frizzante prebuild
            #this is the pre build checkpoint!
        `});var Y=e(W,6);C(Y,{text:"Post Build Checkpoint"});var j=e(Y,2),q=e(l(j));r(q,{source:"./post/main.go"});var U=e(q,2);r(U,{source:"frizzante build"});var A=e(j,2);K(A,{children:(f,a)=>{let m=()=>a?.().Directory,g=()=>a?.().File;var o=u(),v=s(o);h(v,m,(_,k)=>{k(_,{expanded:!0,name:"post",children:(x,ee)=>{var n=u(),y=s(n);h(y,g,(z,B)=>{B(z,{name:"main.go"})}),d(x,n)},$$slots:{default:!0}})}),d(f,o)}});var E=e(A,2);b(E,{lang:"go",source:`
            package main

            func main() {
                println("this is the post build checkpoint!")
            }
        `});var G=e(E,2),V=e(l(G));r(V,{source:"frizzante postbuild"});var X=e(G,4);b(X,{source:`
            frizzante postbuild
            #this is the post build checkpoint!
        `}),d(i,t)},$$slots:{rightSidebar:!0,footer:!0,default:!0}}),ie()}export{me as default};
