import{_ as r}from"./BQ_uKm6x.js";import{d as i,b as m,s as u,a as n,o as p,m as l,h as _}from"./CMcu4vOi.js";const x=i({__name:"AccountTabs",setup(d){const{t:a}=m(),s=u(),e=n(()=>s.params.server),o=n(()=>s.params.account),c=n(()=>[{name:"account-index",to:{name:"account-index",params:{server:e.value,account:o.value}},display:a("tab.posts"),icon:"i-ri:file-list-2-line"},{name:"account-replies",to:{name:"account-replies",params:{server:e.value,account:o.value}},display:a("tab.posts_with_replies"),icon:"i-ri:chat-1-line"},{name:"account-media",to:{name:"account-media",params:{server:e.value,account:o.value}},display:a("tab.media"),icon:"i-ri:camera-2-line"}]);return(v,b)=>{const t=r;return p(),l(t,{force:"",replace:"",options:_(c),"prevent-scroll-top":"",command:"",border:"base b"},null,8,["options"])}}});export{x as _};