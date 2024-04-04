function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{d as b,aj as x,b as L,a4 as V,bJ as C,h as s,o as r,c as d,J as v,K as h,t as o,v as q,a as w,f as _,j as t,aF as B,a6 as j,k as U,Z as E,e as M,m as T,w as f,G as A,bo as F,l as H,q as y,p as J}from"./CMcu4vOi.js";import{_ as O}from"./BEbAH63O.js";import{_ as P}from"./WqbmNLH1.js";import{I as S}from"./BsDGj7hD.js";import{s as R}from"./VKdB9Mfh.js";const z=["value","selected"],G=b({__name:"SettingsLanguage",setup($){const u=x(),{locales:n}=L();return(l,g)=>V((r(),d("select",{"onUpdate:modelValue":g[0]||(g[0]=i=>s(u).language=i)},[(r(!0),d(v,null,h(s(n),i=>(r(),d("option",{key:i.code,value:i.code,selected:s(u).language===i.code},o(i.name),9,z))),128))],512)),[[C,s(u).language]])}}),K={key:0,class:"mt-1 ms-2"},Z={class:"mb-2"},Q={class:"ms-4"},W=["title","onClick"],X=t("span",{class:"block i-ri:close-line","aria-hidden":"true"},null,-1),Y=[X],ee={class:"flex items-center mt-2"},te={disabled:"",selected:"",value:null},ne=["value"],se=b({__name:"SettingsTranslations",setup($){const u=S.getLanguages([...R]),n=x(),l=q(null),g=w(()=>Object.values(u).filter(e=>!n.value.disabledTranslationLanguages.includes(e.code)));function i(){if(l.value){const e=new Set(n.value.disabledTranslationLanguages);e.add(l.value),n.value.disabledTranslationLanguages=[...e],l.value=null}}function p(e){const c=new Set(n.value.disabledTranslationLanguages);c.delete(e),n.value.disabledTranslationLanguages=[...c]}return(e,c)=>{const m=P;return r(),d("div",null,[_(m,{modelValue:s(n).preferences.hideTranslation,"onUpdate:modelValue":c[0]||(c[0]=a=>s(n).preferences.hideTranslation=a),label:e.$t("settings.preferences.hide_translation")},null,8,["modelValue","label"]),s(n).preferences.hideTranslation?U("",!0):(r(),d("div",K,[t("p",Z,o(e.$t("settings.language.translations.hide_specific")),1),t("div",Q,[t("ul",null,[(r(!0),d(v,null,h(s(n).disabledTranslationLanguages,a=>(r(),d("li",{key:a,class:"flex items-center"},[t("div",null,o(s(S).getNativeName(a)),1),t("button",{class:"btn-text",type:"button",title:e.$t("settings.language.translations.remove"),onClick:B(k=>p(a),["prevent"])},Y,8,W)]))),128))]),t("div",ee,[V(t("select",{"onUpdate:modelValue":c[1]||(c[1]=a=>j(l)?l.value=a:null),class:"select-settings"},[t("option",te,o(e.$t("settings.language.translations.choose_language")),1),(r(!0),d(v,null,h(s(g),a=>(r(),d("option",{key:a.code,value:a.code},o(a.nativeName),9,ne))),128))],512),[[C,s(l)]]),t("button",{class:"btn-text shrink-0",onClick:i},o(e.$t("settings.language.translations.add")),1)])])]))])}}}),ae={p6:""},oe={"space-y-2":""},le={py2:"","font-bold":"","text-xl":"",flex:"~ gap-1","items-center":""},ie=t("span",{"inline-block":"","i-ri:information-line":""},null,-1),re={mt4:""},ue={"font-bold":"","text-xl":"",flex:"~ gap-1","items-center":""},ce={py4:"",mt2:"","font-bold":"","text-xl":"",flex:"~ gap-1","items-center":""},fe=b({__name:"index",async setup($){let u,n;const{t:l,locale:g}=L(),i=([u,n]=E(()=>F(()=>import("./BIy6TTuu.js"),__vite__mapDeps([]),import.meta.url).then(e=>e.default)),u=await u,n(),u);M({title:()=>`${l("settings.language.label")} | ${l("nav.settings")}`});const p=w(()=>{const e=i.locales[g.value];return l("settings.language.status",[e.total,i.total,e.percentage])});return(e,c)=>{const m=G,a=J,k=O,N=se,D=A;return r(),T(D,{"back-on-small-screen":""},{title:f(()=>[t("div",{"text-lg":"","font-bold":"",flex:"","items-center":"","gap-2":"",onClick:c[0]||(c[0]=(...I)=>e.$scrollToTop&&e.$scrollToTop(...I))},[t("span",null,o(e.$t("settings.language.label")),1)])]),default:f(()=>[t("div",ae,[t("div",oe,[t("h2",le,o(e.$t("settings.language.display_language")),1),t("div",null,o(s(p)),1),_(m,{"select-settings":""}),_(a,{href:"https://docs.elk.zone/guide/contributing",target:"_blank","hover:underline":"","text-primary":"","inline-flex":"","items-center":"","gap-1":""},{default:f(()=>[ie,H(" "+o(e.$t("settings.language.how_to_contribute")),1)]),_:1})]),t("div",re,[t("h2",ue,o(e.$t("settings.language.post_language")),1),("currentUser"in e?e.currentUser:s(y))?(r(),T(k,{key:0,command:"",large:"",icon:"i-ri:quill-pen-line",text:e.$t("settings.language.post_language"),description:e.$t("settings.account_settings.description"),to:`https://${("currentUser"in e?e.currentUser:s(y)).server}/settings/preferences/other`,external:"",target:"_blank"},null,8,["text","description","to"])):U("",!0)]),t("h2",ce,o(e.$t("settings.language.translations.heading")),1),_(N)])]),_:1})}}});export{fe as default};
