import{_ as ce}from"./WqbmNLH1.js";import{d as z,az as se,aA as ae,o as m,c as g,j as n,t as h,$ as P,a4 as de,ct as pe,aF as W,a2 as fe,f as y,w as N,l as K,k as E,a0 as be,p as ve,cu as me,a as H,q as b,J as le,h as t,ao as he,cv as re,cw as Y,ap as _e,A as ye,v as k,as as Q,cx as ge,cy as we,D as $e,H as x,b as ke,cr as Ve,aq as Se,m as X,ce as L,a6 as Z,aP as Ne}from"./CMcu4vOi.js";const Pe={"flex-1":"","ms-2":"","pointer-events-none":""},Ce=["value"],Ee=z({__name:"CommonRadio",props:se({label:{},value:{},hover:{type:Boolean}},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup(a){const e=ae(a,"modelValue");return(i,o)=>(m(),g("label",{class:P(["common-radio flex items-center cursor-pointer py-1 text-md w-full gap-y-1",i.hover?"hover:bg-active ms--2 px-4 py-2":null]),onClick:o[1]||(o[1]=W(d=>e.value=i.value,["prevent"]))},[n("span",Pe,h(i.label),1),n("span",{class:P(e.value===i.value?"i-ri:radio-button-line":"i-ri:checkbox-blank-circle-line"),"aria-hidden":"true"},null,2),de(n("input",{"onUpdate:modelValue":o[0]||(o[0]=d=>e.value=d),type:"radio",value:i.value,"sr-only":""},null,8,Ce),[[pe,e.value]])],2))}}),xe={key:0,role:"alert","aria-describedby":"notification-failed",flex:"~ col","gap-1":"","text-sm":"","pt-1":"","ps-2":"","pe-1":"","pb-2":"","text-red-600":"","dark:text-red-400":"",border:"~ base rounded red-600 dark:red-400"},Ae={id:"notification-failed",flex:"","justify-between":""},Ue={flex:"","items-center":"","gap-x-2":"","font-bold":""},Te=n("div",{"aria-hidden":"true","i-ri:error-warning-fill":""},null,-1),Be=["aria-label"],Me=n("span",{"aria-hidden":"true",w:"1.75em",h:"1.75em","i-ri:close-line":""},null,-1),Ie=[Me],Ke={"py-2":""},Oe=n("span",{"inline-block":"","aria-hidden":"true","i-ri:external-link-line":"",class:"rtl-flip"},null,-1),De={"py-2":""},Re=n("span",{"inline-block":"","aria-hidden":"true","i-ri:external-link-line":"",class:"rtl-flip"},null,-1),qe=z({__name:"NotificationSubscribePushNotificationError",props:se({title:{},message:{}},{modelValue:{type:Boolean,required:!0},modelModifiers:{}}),emits:["update:modelValue"],setup(a){const e=ae(a,"modelValue");return(i,o)=>{const d=be,u=ve,r=fe("i18n-t");return e.value?(m(),g("div",xe,[n("head",Ae,[n("div",Ue,[Te,n("p",null,h(i.title??i.$t("settings.notifications.push_notifications.subscription_error.title")),1)]),y(d,{placement:"bottom",content:i.$t("settings.notifications.push_notifications.subscription_error.clear_error")},{default:N(()=>[n("button",{flex:"","rounded-4":"",p1:"","hover:bg-active":"","cursor-pointer":"","transition-100":"","aria-label":i.$t("settings.notifications.push_notifications.subscription_error.clear_error"),onClick:o[0]||(o[0]=_=>e.value=!1)},Ie,8,Be)]),_:1},8,["content"])]),n("p",null,h(i.message),1),n("p",Ke,[y(r,{keypath:"settings.notifications.push_notifications.subscription_error.error_hint"},{default:N(()=>[y(u,{"font-bold":"",href:"https://docs.elk.zone/pwa#faq",target:"_blank","inline-flex":"~ row","items-center":"","gap-x-2":""},{default:N(()=>[K(" https://docs.elk.zone/pwa#faq "),Oe]),_:1})]),_:1})]),n("p",De,[y(u,{"font-bold":"","text-primary":"",href:"https://github.com/elk-zone/elk",target:"_blank",flex:"~ row","items-center":"","gap-x-2":""},{default:N(()=>[K(h(i.$t("settings.notifications.push_notifications.subscription_error.repo_link"))+" ",1),Re]),_:1})])])):E("",!0)}}}),He={flex:"","items-center":"","pb-2":""},ze={id:"notifications-warning","text-md":"","font-bold":"","w-full":""},Fe=["title","disabled"],je=n("span",{"aria-hidden":"true","i-ri:close-line":""},null,-1),Le=[je],We={"xl:hidden":""},Ye={"xl:hidden":""},Ge={key:1},Je={key:2},Qe=["disabled"],Xe={key:0,"aria-hidden":"true",block:"","animate-spin":"","preserve-3d":""},Ze=n("span",{block:"","i-ri:loader-2-fill":"","aria-hidden":"true"},null,-1),et=[Ze],tt={key:1,"aria-hidden":"true",block:"","i-ri:check-line":""},ot=z({__name:"NotificationEnablePushNotification.client",props:{closeableHeader:{type:Boolean},busy:{type:Boolean},animate:{type:Boolean}},emits:["hide","subscribe"],setup(a){const e=me("(min-width: 1280px)"),i=H(()=>!b.value?.vapidKey);return(o,d)=>(m(),g("div",{flex:"~ col","gap-y-2":"",role:"alert","aria-labelledby":"notifications-warning",class:P(o.closeableHeader?"border-b border-base":"px6 px4")},[n("header",He,[n("h2",ze,h(o.$t("settings.notifications.push_notifications.warning.enable_title")),1),o.closeableHeader?(m(),g("button",{key:0,flex:"","rounded-4":"",type:"button",title:o.$t("settings.notifications.push_notifications.warning.enable_close"),"hover:bg-active":"","cursor-pointer":"","transition-100":"",disabled:o.busy,onClick:d[0]||(d[0]=u=>o.$emit("hide"))},Le,8,Fe)):E("",!0)]),o.closeableHeader?(m(),g(le,{key:0},[n("p",We,h(o.$t("settings.notifications.push_notifications.warning.enable_description")),1),n("p",Ye,h(o.$t("settings.notifications.push_notifications.warning.enable_description_mobile")),1),n("p",{class:P(t(e)?null:"hidden")},h(o.$t("settings.notifications.push_notifications.warning.enable_description_desktop")),3)],64)):(m(),g("p",Ge,h(o.$t("settings.notifications.push_notifications.warning.enable_description_settings")),1)),t(i)?(m(),g("p",Je,h(o.$t("settings.notifications.push_notifications.warning.re_auth")),1)):E("",!0),n("button",{"btn-outline":"","rounded-full":"","font-bold":"",py4:"",flex:"~ gap2 center",m5:"",type:"button",class:P(o.busy||t(i)?"border-transparent":null),disabled:o.busy||t(i),onClick:d[1]||(d[1]=u=>o.$emit("subscribe"))},[o.busy&&o.animate?(m(),g("span",Xe,et)):(m(),g("span",tt)),n("span",null,h(o.$t("settings.notifications.push_notifications.warning.enable_desktop")),1)],10,Qe),he(o.$slots,"error")],2))}});class q extends Error{code;constructor(e,i){super(i),this.code=e}}async function nt(a,e,i="all",o=!1){const{server:d,vapidKey:u}=a;return await ee().then(te).then(({registration:r,subscription:_})=>{if(_){const V=new Uint8Array(_.options.applicationServerKey).toString();if(ue(u).toString()===V&&_.endpoint===d&&!o&&a.pushSubscription)return Promise.resolve(a.pushSubscription);if(a.pushSubscription)return ne(!1,!1).catch(it).then(()=>oe(r,u)).then(U=>ie(U,e,i))}return oe(r,u).then(V=>ie(V,e,i))}).catch(r=>{let _=r;return r.code===11&&r.name==="InvalidStateError"?_=new q("too_many_registrations","Too many registrations"):r.code===20&&r.name==="AbortError"?_=new q("vapid_not_supported","Your browser supports Web Push Notifications, but does not seem to implement the VAPID protocol."):r.code===5&&r.name==="InvalidCharacterError"&&(_=new q("invalid_vapid_key",`The VAPID public key seems to be invalid: ${u}`)),ee().then(te).then(()=>ne(!0)).then(()=>Promise.resolve(void 0)).catch(V=>(console.error(V),Promise.resolve(void 0))).finally(()=>Promise.reject(_))})}function ue(a){const e="=".repeat((4-a.length%4)%4),i=`${a}${e}`.replace(/-/g,"+").replace(/_/g,"/"),o=window.atob(i),d=new Uint8Array(o.length);for(let u=0;u<o.length;++u)d[u]=o.charCodeAt(u);return d}function ee(){return navigator.serviceWorker.ready}async function te(a){const e=await a.pushManager.getSubscription();return{registration:a,subscription:e}}async function oe(a,e){return await a.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:ue(e)})}async function ne(a,e=!0){const i=b.value;i&&(await re(i),e&&await Y(i,a))}async function it(a){const e=b.value;throw e&&await Y(e,!0),a}async function ie(a,e,i){const{endpoint:o,keys:d}=a.toJSON();return await _e().v1.push.subscription.create({policy:i,subscription:{endpoint:o,keys:{p256dh:d.p256dh,auth:d.auth}},data:e})}const st=typeof window<"u"&&"serviceWorker"in navigator&&"PushManager"in window&&"getKey"in PushSubscription.prototype;function at(){const{client:a}=ye(),e=k(!1),i=k(Notification.permission==="denied"?"denied":Notification.permission==="granted"?"granted":Notification.permission==="default"?"prompt":void 0),o=H(()=>st),d=Q(ge,{}),u=Q(we,{}),r=k(R(b.value?.pushSubscription,u.value[b.value?.account?.acct??""])),_=k(R(b.value?.pushSubscription,u.value[b.value?.account?.acct??""])),V=H(()=>{const l=r.value,p=_.value;return l.favourite!==p.favourite||l.reblog!==p.reblog||l.mention!==p.mention||l.follow!==p.follow||l.poll!==p.poll||l.policy!==p.policy});$e(()=>b.value?.pushSubscription,l=>{e.value=!!l,r.value=R(l,u.value[b.value?.account?.acct??""]),_.value=R(l,u.value[b.value?.account?.acct??""])},{immediate:!0,flush:"post"});const A=async(l,p,S)=>{if(!o.value)return"not-supported";if(!b.value)return"no-user";const{pushSubscription:w,server:$,token:B,vapidKey:M,account:{acct:j}}=b.value;if(!B||!$||!M)return"invalid-vapid-key";const C=await Promise.resolve(Notification.requestPermission()).then(O=>O==="default"?"prompt":O);return C==="denied"?(i.value=C,"notification-denied"):(b.value.pushSubscription=await nt({pushSubscription:w,server:$,token:B,vapidKey:M},l??{alerts:{follow:!0,favourite:!0,reblog:!0,mention:!0,poll:!0}},p??"all",S),await x(),i.value=C,d.value[j]=!0,"subscribed")},U=async()=>{if(!o.value||!e.value||!b.value)return!1;await re(b.value),await Y(b.value)},T=async l=>{l&&(r.value.policy=l);const p=r.value;_.value={favourite:p.favourite,reblog:p.reblog,mention:p.mention,follow:p.follow,poll:p.poll,policy:p.policy},l?u.value[b.value.account.acct??""]=l:u.value[b.value.account.acct??""]=r.value.policy,await x()};return{pushNotificationData:r,saveEnabled:V,undoChanges:()=>{const l=_.value;r.value={favourite:l.favourite,reblog:l.reblog,mention:l.mention,follow:l.follow,poll:l.poll,policy:l.policy},u.value[b.value.account.acct??""]=l.policy},hiddenNotification:d,isSupported:o,isSubscribed:e,notificationPermission:i,updateSubscription:async()=>{if(b.value){const l=_.value,p={alerts:{follow:r.value.follow,favourite:r.value.favourite,reblog:r.value.reblog,mention:r.value.mention,poll:r.value.poll}},S=r.value.policy,w=l.policy!==S;w?await A(p,S,!0):b.value.pushSubscription=await a.value.v1.push.subscription.update({data:p}),w&&await x(),await T(w?S:void 0)}},subscribe:A,unsubscribe:U}}function R(a,e){return{follow:a?.alerts.follow??!0,favourite:a?.alerts.favourite??!0,reblog:a?.alerts.reblog??!0,mention:a?.alerts.mention??!0,poll:a?.alerts.poll??!0,policy:e??"all"}}const lt=Ne(ot),rt={key:0,"aria-labelledby":"pn-s"},ut={key:0,flex:"~ col",border:"b base"},ct={id:"pn-settings",px6:"",py4:"",mt2:"","font-bold":"","text-xl":"",flex:"~ gap-1","items-center":""},dt={key:0,flex:"~ col"},pt={id:"pn-instructions","text-sm":"",pb2:"","aria-hidden":"true"},ft={flex:"~ col","gap-y-1":"","py-1":""},bt={flex:"~ col","gap-y-1":"","py-1":""},vt={flex:"~ col","gap-y-4":"","gap-x-2":"","py-1":"",sm:"~ justify-between flex-row"},mt=["disabled"],ht={key:0,"aria-hidden":"true",block:"","animate-spin":"","preserve-3d":""},_t=n("span",{block:"","i-ri:loader-2-fill":"","aria-hidden":"true"},null,-1),yt=[_t],gt={key:1,block:"","aria-hidden":"true","i-ri:save-2-fill":""},wt=["disabled"],$t=n("span",{"aria-hidden":"true",class:"block i-material-symbols:undo-rounded"},null,-1),kt=n("span",{border:"b base 2px",class:"bg-$c-text-secondary"},null,-1),Vt=["disabled"],St={key:0,"aria-hidden":"true",block:"","animate-spin":"","preserve-3d":""},Nt=n("span",{block:"","i-ri:loader-2-fill":"","aria-hidden":"true"},null,-1),Pt=[Nt],Ct={key:1,block:"","aria-hidden":"true","i-material-symbols:cancel-rounded":""},Et={key:1,px6:"",pb4:"",role:"alert","aria-labelledby":"n-unsupported"},xt={id:"n-unsupported"},Tt=z({__name:"NotificationPreferences.client",props:{show:{type:Boolean}},setup(a){const{pushNotificationData:e,saveEnabled:i,undoChanges:o,hiddenNotification:d,isSubscribed:u,isSupported:r,notificationPermission:_,updateSubscription:V,subscribe:A,unsubscribe:U}=at(),{t:T}=ke(),F=Ve().pwaEnabled,v=k(!1),l=k(!1),p=k(!1),S=k(!1),w=k(""),$=k(!1);function B(){const s=b.value?.account?.acct;s&&(d.value[s]=!0)}const M=H(()=>F?r&&(!u.value||!_.value||_.value==="prompt")&&!d.value[b.value?.account?.acct??""]:!1);async function j(){if(!v.value){v.value=!0,await x(),l.value=!0;try{await V()}catch(s){console.error(s)}finally{v.value=!1,l.value=!1}}}async function C(){if(!v.value){v.value=!0,await x(),p.value=!0;try{const s=await A();s!=="subscribed"&&(w.value=T(`settings.notifications.push_notifications.subscription_error.${s==="notification-denied"?"permission_denied":"request_error"}`),$.value=!0)}catch(s){s instanceof q?w.value=T(`settings.notifications.push_notifications.subscription_error.${s.code}`):(console.error(s),w.value=T("settings.notifications.push_notifications.subscription_error.request_error")),$.value=!0}finally{v.value=!1,p.value=!1}}}async function O(){if(!v.value){v.value=!0,await x(),S.value=!0;try{await U()}catch(s){console.error(s)}finally{v.value=!1,S.value=!1}}}return Se(()=>v.value=!1),(s,c)=>{const I=ce,D=Ee,G=qe,J=lt;return t(F)&&(t(M)||s.show)?(m(),g("section",rt,[y(L,{name:"slide-down"},{default:N(()=>[s.show?(m(),g("div",ut,[n("h3",ct,h(s.$t("settings.notifications.push_notifications.label")),1),t(r)?(m(),g(le,{key:0},[t(u)?(m(),g("div",dt,[n("form",{flex:"~ col","gap-y-2":"",px6:"",pb4:"",onSubmit:W(j,["prevent"])},[n("p",pt,h(s.$t("settings.notifications.push_notifications.instructions")),1),n("fieldset",ft,[n("legend",null,h(s.$t("settings.notifications.push_notifications.alerts.title")),1),y(I,{modelValue:t(e).follow,"onUpdate:modelValue":c[0]||(c[0]=f=>t(e).follow=f),hover:"",label:s.$t("settings.notifications.push_notifications.alerts.follow")},null,8,["modelValue","label"]),y(I,{modelValue:t(e).favourite,"onUpdate:modelValue":c[1]||(c[1]=f=>t(e).favourite=f),hover:"",label:s.$t("settings.notifications.push_notifications.alerts.favourite")},null,8,["modelValue","label"]),y(I,{modelValue:t(e).reblog,"onUpdate:modelValue":c[2]||(c[2]=f=>t(e).reblog=f),hover:"",label:s.$t("settings.notifications.push_notifications.alerts.reblog")},null,8,["modelValue","label"]),y(I,{modelValue:t(e).mention,"onUpdate:modelValue":c[3]||(c[3]=f=>t(e).mention=f),hover:"",label:s.$t("settings.notifications.push_notifications.alerts.mention")},null,8,["modelValue","label"]),y(I,{modelValue:t(e).poll,"onUpdate:modelValue":c[4]||(c[4]=f=>t(e).poll=f),hover:"",label:s.$t("settings.notifications.push_notifications.alerts.poll")},null,8,["modelValue","label"])]),n("fieldset",bt,[n("legend",null,h(s.$t("settings.notifications.push_notifications.policy.title")),1),y(D,{modelValue:t(e).policy,"onUpdate:modelValue":c[5]||(c[5]=f=>t(e).policy=f),hover:"",value:"all",label:s.$t("settings.notifications.push_notifications.policy.all")},null,8,["modelValue","label"]),y(D,{modelValue:t(e).policy,"onUpdate:modelValue":c[6]||(c[6]=f=>t(e).policy=f),hover:"",value:"followed",label:s.$t("settings.notifications.push_notifications.policy.followed")},null,8,["modelValue","label"]),y(D,{modelValue:t(e).policy,"onUpdate:modelValue":c[7]||(c[7]=f=>t(e).policy=f),hover:"",value:"follower",label:s.$t("settings.notifications.push_notifications.policy.follower")},null,8,["modelValue","label"]),y(D,{modelValue:t(e).policy,"onUpdate:modelValue":c[8]||(c[8]=f=>t(e).policy=f),hover:"",value:"none",label:s.$t("settings.notifications.push_notifications.policy.none")},null,8,["modelValue","label"])]),n("div",vt,[n("button",{"btn-solid":"","font-bold":"",py2:"","full-w":"","sm-wa":"",flex:"~ gap2 center",class:P(t(v)||!t(i)?"border-transparent":null),disabled:t(v)||!t(i)},[t(v)&&t(l)?(m(),g("span",ht,yt)):(m(),g("span",gt)),K(" "+h(s.$t("settings.notifications.push_notifications.save_settings")),1)],10,mt),n("button",{"btn-outline":"","font-bold":"",py2:"","full-w":"","sm-wa":"",flex:"~ gap2 center",type:"button",class:P(t(v)||!t(i)?"border-transparent":null),disabled:t(v)||!t(i),onClick:c[9]||(c[9]=(...f)=>t(o)&&t(o)(...f))},[$t,K(" "+h(s.$t("settings.notifications.push_notifications.undo_settings")),1)],10,wt)])],32),n("form",{flex:"~ col","mt-4":"",onSubmit:W(O,["prevent"])},[kt,n("button",{"btn-outline":"","rounded-full":"","font-bold":"","py-4":"",flex:"~ gap2 center",m5:"",class:P(t(v)?"border-transparent":null),disabled:t(v)},[t(v)&&t(S)?(m(),g("span",St,Pt)):(m(),g("span",Ct)),K(" "+h(s.$t("settings.notifications.push_notifications.unsubscribe")),1)],10,Vt)],32)])):(m(),X(J,{key:1,animate:t(p),busy:t(v),onHide:B,onSubscribe:C},{error:N(()=>[y(L,{name:"slide-down"},{default:N(()=>[y(G,{modelValue:t($),"onUpdate:modelValue":c[10]||(c[10]=f=>Z($)?$.value=f:null),message:t(w)},null,8,["modelValue","message"])]),_:1})]),_:1},8,["animate","busy"]))],64)):(m(),g("div",Et,[n("p",xt,h(s.$t("settings.notifications.push_notifications.unsupported")),1)]))])):E("",!0)]),_:1}),t(M)&&!s.show?(m(),X(J,{key:0,"closeable-header":"",px5:"",py4:"",animate:t(p),busy:t(v),onHide:B,onSubscribe:C},{error:N(()=>[y(L,{name:"slide-down"},{default:N(()=>[y(G,{modelValue:t($),"onUpdate:modelValue":c[11]||(c[11]=f=>Z($)?$.value=f:null),message:t(w)},null,8,["modelValue","message"])]),_:1})]),_:1},8,["animate","busy"])):E("",!0)])):E("",!0)}}});export{Tt as _};