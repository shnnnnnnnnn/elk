import{_ as u}from"./VLSdsOGO.js";import{d as p,b as m,s as _,a as f,Z as d,ap as g,M as h,e as w,h as a,m as x,k as y,g as k,ak as $,o as A}from"./CMcu4vOi.js";import"./BpHJWG9q.js";import"./Cy5WKwqU.js";const b=p({__name:"following",async setup(C){let o,e;const{t:s}=m(),c=_().params,i=f(()=>c.account),t=([o,e]=d(()=>$(i.value)),o=await o,e(),o),n=t?g().v1.accounts.$select(t.id).following.list():null,l=h(t);return t&&w({title:()=>`${s("account.following")} | ${k(t)} (@${t.acct})`}),(v,B)=>{const r=u;return a(n)?(A(),x(r,{key:0,paginator:a(n),"relationship-context":a(l)?"following":void 0,context:"following",account:a(t)},null,8,["paginator","relationship-context","account"])):y("",!0)}}});export{b as default};
