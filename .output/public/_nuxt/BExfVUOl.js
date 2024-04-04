import{d as L,o,c as v,j as c,f as i,l as q,t as A,w as p,h as n,i as Y,_ as ge,p as z,L as E,M as ne,b as O,A as W,N as he,O as ye,m as d,k as _,q as $e,J as I,P as be,Q as ke,R as Z,S as G,T as H,U as _e,V as K,W as we,X as Ne,Y as Ae,v as F,Z as te,$ as U,a0 as oe,u as Ce,a as V,a1 as je,D as Re,a2 as Se,a3 as De,a4 as Ue,a5 as Ie,a6 as Be,K as Q,a7 as X,a8 as Fe,a9 as Me,aa as Le,ab as Pe,ac as Te,ad as He,ae as qe,af as Ve,ag as ae,ah as xe,s as ze,ai as Ee,aj as Oe,F as We,G as Je,y as Ye,ak as Ze,g as Ge,al as Ke,am as Qe}from"./CMcu4vOi.js";import{_ as Xe}from"./weTs8tLg.js";import{_ as en}from"./C6zUqCbE.js";import{_ as nn}from"./BwHuf7fG.js";import{c as tn}from"./Cy5WKwqU.js";import{g as ee}from"./CziPTEgh.js";import{_ as on}from"./Bbd1R54p.js";import{u as an}from"./Cs8xWohE.js";const cn={flex:"~ col gap-2",p4:""},sn={flex:"~ gap-1","justify-center":""},ln={flex:""},un=c("div",{"flex-auto":""},null,-1),rn={flex:"","items-center":""},mn=L({__name:"AccountMoved",props:{account:{}},setup(s){return(r,$)=>{const l=Xe,u=ge,y=z;return o(),v("div",cn,[c("div",sn,[i(l,{account:r.account,link:!1},null,8,["account"]),q(" "+A(r.$t("account.moved_title")),1)]),c("div",ln,[i(y,{to:("getAccountRoute"in r?r.getAccountRoute:n(Y))(r.account.moved)},{default:p(()=>[i(u,{account:r.account.moved},null,8,["account"])]),_:1},8,["to"]),un,c("div",rn,[i(y,{to:("getAccountRoute"in r?r.getAccountRoute:n(Y))(r.account.moved),"btn-solid":"","inline-block":"","h-fit":""},{default:p(()=>[q(A(r.$t("account.go_to_profile")),1)]),_:1},8,["to"])])])])}}}),dn=c("button",{flex:"","gap-1":"","items-center":"","w-full":"",rounded:"",op75:"",hover:"op100 text-purple",group:"","aria-label":"More actions"},[c("div",{"rounded-5":"",p2:"","elk-group-hover":"bg-purple/10"},[c("div",{"i-ri:more-2-fill":""})])],-1),pn=L({__name:"AccountMoreButton",props:{account:{},command:{type:Boolean}},emits:["addNote","removeNote"],setup(s,{emit:r}){const $=r,l=E(s.account),u=ne(()=>s.account),{t:y}=O(),{client:f}=W(),S=he("useStarFavoriteIcon"),{share:g,isSupported:C}=ye();function j(){g({url:location.href})}async function w(){if(!l.value.showingReblogs&&(await Ne({title:y("confirm.show_reblogs.title"),description:y("confirm.show_reblogs.description",[s.account.acct]),confirm:y("confirm.show_reblogs.confirm"),cancel:y("confirm.show_reblogs.cancel")})).choice!=="confirm")return;const e=!l.value?.showingReblogs;l.value=await f.value.v1.accounts.$select(s.account.id).follow({reblogs:e})}async function R(){$("addNote")}async function M(){if(!l.value.note||l.value.note.length===0)return;const e=await f.value.v1.accounts.$select(s.account.id).note.create({comment:""});l.value.note=e.note,$("removeNote")}return(e,a)=>{const m=Ae,b=z,B=nn;return o(),d(B,{"eager-mount":e.command},{popper:p(()=>[i(b,{to:e.account.url,external:"",target:"_blank"},{default:p(()=>[i(m,{text:e.$t("menu.open_in_original_site"),icon:"i-ri:arrow-right-up-line",command:e.command},null,8,["text","command"])]),_:1},8,["to"]),n(C)?(o(),d(m,{key:0,text:e.$t("menu.share_account",[`@${e.account.acct}`]),icon:"i-ri:share-line",command:e.command,onClick:a[0]||(a[0]=k=>j())},null,8,["text","command"])):_("",!0),("currentUser"in e?e.currentUser:n($e))?(o(),v(I,{key:1},[n(u)?(o(),v(I,{key:1},[i(b,{to:"/pinned"},{default:p(()=>[i(m,{text:e.$t("account.pinned"),icon:"i-ri:pushpin-line",command:e.command},null,8,["text","command"])]),_:1}),i(b,{to:"/favourites"},{default:p(()=>[i(m,{text:e.$t("account.favourites"),icon:n(S)?"i-ri:star-line":"i-ri:heart-3-line",command:e.command},null,8,["text","icon","command"])]),_:1}),i(b,{to:"/mutes"},{default:p(()=>[i(m,{text:e.$t("account.muted_users"),icon:"i-ri:volume-mute-line",command:e.command},null,8,["text","command"])]),_:1}),i(b,{to:"/blocks"},{default:p(()=>[i(m,{text:e.$t("account.blocked_users"),icon:"i-ri:forbid-2-line",command:e.command},null,8,["text","command"])]),_:1}),i(b,{to:"/domain_blocks"},{default:p(()=>[i(m,{text:e.$t("account.blocked_domains"),icon:"i-ri:shut-down-line",command:e.command},null,8,["text","command"])]),_:1})],64)):(o(),v(I,{key:0},[i(m,{text:e.$t("menu.mention_account",[`@${e.account.acct}`]),icon:"i-ri:at-line",command:e.command,onClick:a[1]||(a[1]=k=>("mentionUser"in e?e.mentionUser:n(be))(e.account))},null,8,["text","command"]),i(m,{text:e.$t("menu.direct_message_account",[`@${e.account.acct}`]),icon:"i-ri:message-3-line",command:e.command,onClick:a[2]||(a[2]=k=>("directMessageUser"in e?e.directMessageUser:n(ke))(e.account))},null,8,["text","command"]),n(l)?.showingReblogs?(o(),d(m,{key:1,text:e.$t("menu.hide_reblogs",[`@${e.account.acct}`]),icon:"i-ri:repeat-line",command:e.command,onClick:a[4]||(a[4]=k=>w())},null,8,["text","command"])):(o(),d(m,{key:0,icon:"i-ri:repeat-line",text:e.$t("menu.show_reblogs",[`@${e.account.acct}`]),command:e.command,onClick:a[3]||(a[3]=k=>w())},null,8,["text","command"])),!n(l)?.note||n(l)?.note?.length===0?(o(),d(m,{key:2,text:e.$t("menu.add_personal_note",[`@${e.account.acct}`]),icon:"i-ri-edit-2-line",command:e.command,onClick:a[5]||(a[5]=k=>R())},null,8,["text","command"])):(o(),d(m,{key:3,text:e.$t("menu.remove_personal_note",[`@${e.account.acct}`]),icon:"i-ri-edit-2-line",command:e.command,onClick:a[6]||(a[6]=k=>M())},null,8,["text","command"])),n(l)?.muting?(o(),d(m,{key:5,text:e.$t("menu.unmute_account",[`@${e.account.acct}`]),icon:"i-ri:volume-up-fill",command:e.command,onClick:a[8]||(a[8]=k=>n(Z)(n(l),e.account))},null,8,["text","command"])):(o(),d(m,{key:4,text:e.$t("menu.mute_account",[`@${e.account.acct}`]),icon:"i-ri:volume-mute-line",command:e.command,onClick:a[7]||(a[7]=k=>n(Z)(n(l),e.account))},null,8,["text","command"])),n(l)?.blocking?(o(),d(m,{key:7,text:e.$t("menu.unblock_account",[`@${e.account.acct}`]),icon:"i-ri:checkbox-circle-line",command:e.command,onClick:a[10]||(a[10]=k=>n(G)(n(l),e.account))},null,8,["text","command"])):(o(),d(m,{key:6,text:e.$t("menu.block_account",[`@${e.account.acct}`]),icon:"i-ri:forbid-2-line",command:e.command,onClick:a[9]||(a[9]=k=>n(G)(n(l),e.account))},null,8,["text","command"])),("getServerName"in e?e.getServerName:n(H))(e.account)!==("currentServer"in e?e.currentServer:n(_e))?(o(),v(I,{key:8},[n(l)?.domainBlocking?(o(),d(m,{key:1,text:e.$t("menu.unblock_domain",[("getServerName"in e?e.getServerName:n(H))(e.account)]),icon:"i-ri:restart-line",command:e.command,onClick:a[12]||(a[12]=k=>n(K)(n(l),e.account))},null,8,["text","command"])):(o(),d(m,{key:0,text:e.$t("menu.block_domain",[("getServerName"in e?e.getServerName:n(H))(e.account)]),icon:"i-ri:shut-down-line",command:e.command,onClick:a[11]||(a[11]=k=>n(K)(n(l),e.account))},null,8,["text","command"]))],64)):_("",!0),i(m,{text:e.$t("menu.report_account",[`@${e.account.acct}`]),icon:"i-ri:flag-2-line",command:e.command,onClick:a[13]||(a[13]=k=>("openReportDialog"in e?e.openReportDialog:n(we))(e.account))},null,8,["text","command"])],64))],64)):_("",!0)]),default:p(()=>[dn]),_:1},8,["eager-mount"])}}}),fn={p4:"","hover:bg-active":"",block:"",w:"100%",flex:"","justify-between":"","items-center":"","gap-4":""},vn=["onClick"],gn=L({__name:"Lists",props:{userId:{}},async setup(s){let r,$;const{client:l}=W(),u=l.value.v1.lists.list(),y=F(([r,$]=te(()=>l.value.v1.accounts.$select(s.userId).lists.list()),r=await r,$(),r).map(g=>g.id));function f(g){return y.value.indexOf(g)}async function S(g){try{f(g)===-1?(await l.value.v1.lists.$select(g).accounts.create({accountIds:[s.userId]}),y.value.push(g)):(await l.value.v1.lists.$select(g).accounts.remove({accountIds:[s.userId]}),y.value=y.value.filter(j=>j!==g))}catch(C){console.error(C)}}return(g,C)=>{const j=oe,w=tn;return o(),d(w,{"end-message":!1,paginator:n(u)},{default:p(({item:R})=>[c("div",fn,[c("p",null,A(R.title),1),i(j,{content:f(R.id)===-1?g.$t("list.add_account"):g.$t("list.remove_account"),hover:f(R.id)===-1?"text-green":"text-red"},{default:p(()=>[c("button",{"text-sm":"",p2:"","border-1":"","transition-colors":"","border-dark":"","btn-action-icon":"",onClick:()=>S(R.id)},[c("span",{class:U(f(R.id)===-1?"i-ri:user-add-line":"i-ri:user-unfollow-line")},null,2)],8,vn)]),_:2},1032,["content","hover"])])]),_:1},8,["paginator"])}}}),hn={flex:"","flex-col":""},yn={key:0,"p-4":"",flex:"","justify-between":"","items-center":"","bg-card":""},$n={"text-primary":"","font-bold":""},bn=["src","alt"],kn={p4:"","mt--18":"",flex:"","flex-col":"","gap-4":""},_n={relative:""},wn={flex:"","justify-between":""},Nn={"inset-ie-0":"",flex:"~ wrap row-reverse","gap-2":"","items-center":"",pt18:"","justify-start":""},An={"inset-ie-0":"",flex:"","gap-2":"","items-center":""},Cn=["aria-pressed","aria-label"],jn={key:0,"i-ri:notification-4-fill":"",block:"","text-current":""},Rn={key:1,"i-ri-notification-4-line":"",block:"","text-current":""},Sn=["aria-label"],Dn=c("span",{"i-ri:play-list-add-fill":"",block:"","text-current":""},null,-1),Un=[Dn],In={flex:"~ col gap1",pt2:""},Bn={flex:"",gap2:"","items-center":"","flex-wrap":""},Fn={flex:"","items-center":"","gap-1":""},Mn={"sr-only":""},Ln={key:0,"space-y-2":"","pb-4":"",block:"",border:"b base"},Pn={flex:"","flex-row":"","space-x-2":"","flex-v-center":""},Tn=c("div",{"i-ri-edit-2-line":""},null,-1),Hn={"font-medium":""},qn={"position-relative":""},Vn={key:1,"max-h-100":"","overflow-y-auto":""},xn={key:2,flex:"~ col wrap gap1"},zn={mt:"0.5","text-secondary":"",uppercase:"","text-xs":"","font-bold":""},En=c("span",{"text-secondary":"","text-xs":"","font-bold":""},"|",-1),On={key:3,flex:"~ wrap gap-2"},Wn=["title"],x=2e3,Jn=L({__name:"AccountHeader",props:{account:{},command:{type:Boolean}},setup(s){const{client:r}=W(),{t:$}=O(),l=Ce(()=>s.account.createdAt,{month:"long",day:"numeric",year:"numeric"}),u=E(s.account),y=F([]),f=F([]),S=F(!1),g=V(()=>!s.account.header.endsWith("/original/missing.png")),C=F(!1);function j(t){return t==="Joined"?$("account.joined"):t}function w(){return u.value?.notifying?$("account.notifications_on_post_disable",{username:`@${s.account.username}`}):$("account.notifications_on_post_enable",{username:`@${s.account.username}`})}function R(){X([{id:`${s.account.acct}:header`,type:"image",previewUrl:s.account.header,description:$("account.profile_description",[s.account.username])}])}function M(){X([{id:`${s.account.acct}:avatar`,type:"image",previewUrl:s.account.avatar,description:$("account.avatar_description",[s.account.username])}])}async function e(){u.value.notifying=!u.value?.notifying;try{const t=await r.value.v1.accounts.$select(s.account.id).follow({notify:u.value?.notifying});Object.assign(u,t)}catch{u.value.notifying=!u.value?.notifying}}je(()=>{const t=[],h=[];s.account.fields?.forEach(D=>{ee(D.name)?h.push(D):t.push(D)}),h.push({name:"Joined",value:l.value}),y.value=t,f.value=h});const a=F(u.value?.note??"");Re(u,(t,h)=>{!h&&t&&(a.value=t.note??"")});async function m(t){if(!t.target||!("value"in t.target)||!u.value)return;const h=t.target?.value;if(u.value.note?.trim()===h.trim())return;const D=await r.value.v1.accounts.$select(s.account.id).note.create({comment:h});u.value.note=D.note,a.value=u.value.note??""}const b=ne(()=>s.account),B=V(()=>!!u.value?.notifying);async function k(){try{const t=Fe(s.account),h=H(s.account),D=`${t}@${h}`;await navigator.clipboard.writeText(D)}catch(t){console.error("Failed to copy account name:",t)}C.value=!0,setTimeout(()=>{C.value=!1},2e3)}return(t,h)=>{const D=en,J=Me,ce=z,ie=Le,se=pn,P=oe,le=gn,ue=Se("VDropdown"),re=Pe,me=Te,de=He,pe=qe,fe=Ve,T=ae,ve=xe;return o(),v("div",hn,[n(u)?.requestedBy?(o(),v("div",yn,[c("span",$n,A(t.$t("account.requested",[t.account.displayName])),1),i(D,{account:t.account,relationship:n(u)},null,8,["account","relationship"])])):_("",!0),(o(),d(De(n(g)?"button":"div"),{border:"b base","z-1":"",onClick:h[0]||(h[0]=N=>n(g)?R():void 0)},{default:p(()=>[c("img",{"h-50":"",height:"200","w-full":"","object-cover":"",src:t.account.header,alt:n($)("account.profile_description",[t.account.username])},null,8,bn)]),_:1})),c("div",kn,[c("div",_n,[c("div",wn,[c("button",{"shrink-0":"","h-full":"",class:U({"rounded-full":!n(b),squircle:n(b)}),p1:"","bg-base":"","border-bg-base":"","z-2":"",onClick:M},[i(J,{square:n(b),account:t.account,"hover:opacity-90":"","transition-opacity":"","w-28":"","h-28":""},null,8,["square","account"])],2),c("div",Nn,[n(b)?(o(),d(ce,{key:0,to:"/settings/profile/appearance","gap-1":"","items-center":"",border:"1","rounded-full":"",flex:"~ gap2 center","font-500":"","min-w-30":"","h-fit":"",px3:"",py1:"",hover:"border-primary text-primary bg-active"},{default:p(()=>[q(A(t.$t("settings.profile.appearance.title")),1)]),_:1})):_("",!0),i(ie,{account:t.account,command:t.command},null,8,["account","command"]),c("span",An,[i(se,{account:t.account,command:t.command,onAddNote:h[1]||(h[1]=N=>S.value=!0),onRemoveNote:h[2]||(h[2]=()=>{S.value=!1,a.value=""})},null,8,["account","command"]),!n(b)&&n(u)?.following?(o(),d(P,{key:0,content:w()},{default:p(()=>[c("button",{"aria-pressed":n(B),"aria-label":n($)("account.notifications_on_post_enable",{username:`@${t.account.username}`}),"rounded-full":"","text-sm":"",p2:"","border-1":"","transition-colors":"",class:U(n(B)?"text-primary border-primary hover:bg-red/20 hover:text-red hover:border-red":"border-base hover:text-primary"),onClick:e},[n(B)?(o(),v("span",jn)):(o(),v("span",Rn))],10,Cn)]),_:1},8,["content"])):_("",!0),i(P,{content:t.$t("list.modify_account")},{default:p(()=>[!n(b)&&n(u)?.following?(o(),d(ue,{key:0},{popper:p(()=>[i(le,{"user-id":t.account.id},null,8,["user-id"])]),default:p(()=>[c("button",{"aria-label":t.$t("list.modify_account"),"rounded-full":"","text-sm":"",p2:"","border-1":"","transition-colors":"","border-base":"","hover:text-primary":""},Un,8,Sn)]),_:1})):_("",!0)]),_:1},8,["content"])])])]),c("div",In,[c("div",Bn,[i(re,{account:t.account,"font-bold":"","sm:text-2xl":"","text-xl":""},null,8,["account"]),t.account.roles?.length?(o(),d(me,{key:0,account:t.account},null,8,["account"])):_("",!0),t.account.locked?(o(),d(de,{key:1,"show-label":""})):_("",!0),t.account.bot?(o(),d(pe,{key:2,"show-label":""})):_("",!0)]),c("div",Fn,[i(fe,{account:t.account,"overflow-unset":"","line-clamp-unset":""},null,8,["account"]),i(P,{placement:"bottom",content:t.$t("account.copy_account_name"),"no-auto-focus":"",flex:""},{default:p(()=>[c("button",{"text-secondary-light":"","text-sm":"",class:U(n(C)?"i-ri:check-fill text-green":"i-ri:file-copy-line"),onClick:k},[c("span",Mn,A(t.$t("account.copy_account_name")),1)],2)]),_:1},8,["content"])])])]),n(S)||n(u)?.note&&n(u).note.length>0?(o(),v("label",Ln,[c("div",Pn,[Tn,c("p",Hn,A(t.$t("account.profile_personal_note")),1),c("p",{"text-secondary":"","text-sm":"",class:U({"text-orange":n(a).length>x-100})},A(n(a).length)+" / "+A(x),3)]),c("div",qn,[c("div",{"input-base":"","min-h-10ex":"","whitespace-pre-wrap":"","opacity-0":"",class:U({"trailing-newline":n(a).endsWith(`
`)})},A(n(a)),3),Ue(c("textarea",{"onUpdate:modelValue":h[3]||(h[3]=N=>Be(a)?a.value=N:null),"input-base":"","position-absolute":"",style:{height:"100%"},"top-0":"","resize-none":"",maxlength:x,onChange:m},null,544),[[Ie,n(a)]])])])):_("",!0),t.account.note?(o(),v("div",Vn,[i(T,{"text-4":"","text-base":"",content:t.account.note,emojis:t.account.emojis},null,8,["content","emojis"])])):_("",!0),n(y).length?(o(),v("div",xn,[(o(!0),v(I,null,Q(n(y),N=>(o(),v("div",{key:N.name,flex:"~ gap-1","items-center":""},[c("div",zn,[i(T,{content:N.name,emojis:t.account.emojis},null,8,["content","emojis"])]),En,i(T,{content:N.value,emojis:t.account.emojis},null,8,["content","emojis"])]))),128))])):_("",!0),n(f).length?(o(),v("div",On,[(o(!0),v(I,null,Q(n(f),N=>(o(),v("div",{key:N.name,flex:"~ gap-1",px1:"","items-center":"",class:U(`${N.verifiedAt?"border-1 rounded-full border-dark":""}`)},[i(P,{content:j(N.name)},{default:p(()=>[c("div",{"text-secondary":"",class:U(("getAccountFieldIcon"in t?t.getAccountFieldIcon:n(ee))(N.name)),title:j(N.name)},null,10,Wn)]),_:2},1032,["content"]),i(T,{"text-sm":"",content:N.value,emojis:t.account.emojis},null,8,["content","emojis"])],2))),128))])):_("",!0),i(ve,{account:t.account},null,8,["account"])])])}}}),Yn={key:1,"h-30":"",flex:"~ col center gap-2"},Zn={"text-secondary":""},Gn={"text-secondary-light":"","text-sm":""},ct=L({__name:"index",async setup(s){let r,$;const l=ze().params,u=V(()=>Ee(l.account)),{t:y}=O(),{data:f,pending:S,refresh:g}=([r,$]=te(()=>an(()=>Ze(u.value).catch(()=>null),{immediate:!0,default:()=>Ye()},"$NnZymwqz1Y")),r=await r,$(),r),C=V(()=>f.value?E(f.value).value:void 0),j=Oe();return We(()=>{g()}),(w,R)=>{const M=ae,e=mn,a=Jn,m=Qe,b=on,B=Je;return o(),d(B,{back:""},{title:p(()=>[i(M,{"timeline-title-style":"",content:n(f)?("getDisplayName"in w?w.getDisplayName:n(Ge))(n(f)):n(y)("nav.profile"),"show-emojis":!("getPreferences"in w?w.getPreferences:n(Ke))(n(j),"hideUsernameEmojis"),markdown:!1},null,8,["content","show-emojis"])]),default:p(()=>[n(S)?(o(),v(I,{key:0},[],64)):n(f)?(o(),v(I,{key:1},[n(f).moved?(o(),d(e,{key:0,account:n(f)},null,8,["account"])):_("",!0),i(a,{account:n(f),command:"",border:"b base",class:U({"op-50 grayscale-50":!!n(f).moved})},null,8,["account","class"]),n(C)?.blockedBy?(o(),v("div",Yn,[c("div",Zn,A(w.$t("account.profile_unavailable")),1),c("div",Gn,A(w.$t("account.blocked_by")),1)])):(o(),d(m,{key:2}))],64)):(o(),d(b,{key:2},{default:p(()=>[q(A(w.$t("error.account_not_found",[`@${n(u)}`])),1)]),_:1}))]),_:1})}}});export{ct as default};