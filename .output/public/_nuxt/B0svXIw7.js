import{d as k,a as _,b9 as v,h as s,o as c,c as u,j as e,m,a3 as b,k as y,t as l,f as w,w as x,l as S,p as g,bR as B,bS as z,an as C}from"./CMcu4vOi.js";import{a as N}from"./sfWYJY5J.js";import"./Brx9_43Z.js";const $=a=>(B("data-v-f7a109e5"),a=a(),z(),a),j={key:0,flex:"","flex-col":"","gap-1":"","display-block":"","of-hidden":"","w-full":"","rounded-lg":"","overflow-hidden":"","pb-2":""},P={"whitespace-pre-wrap":"","break-words":""},V={key:0,class:"content-rich line-compact",dir:"auto"},I={flex:"","justify-between":"","display-block":"","of-hidden":"","bg-card":"","w-full":"","p-3":"","pb-4":""},L={flex:"","flex-col":""},D={flex:"","gap-1":""},H={"text-secondary":""},O={flex:"","font-bold":"","gap-2":""},T={"text-primary":""},E=$(()=>e("span",{flex:"","text-secondary":""},[e("span",{flex:"","items-center":""},[e("svg",{"h-5":"",width:"22.27",height:"32",viewBox:"0 0 256 368"},[e("path",{fill:"currentColor",d:"M109.586 217.013H0L200.34 0l-53.926 150.233H256L55.645 367.246l53.927-150.233z"})])]),e("span",null,"StackBlitz")],-1)),M=20,R=k({__name:"StatusPreviewStackBlitz",props:{card:{},smallPictureOnly:{type:Boolean},root:{type:Boolean}},setup(a){const d=a,o=_(()=>{const{description:t}=d.card,n=t.match(/.*Code Snippet from (.+), lines (\S+)\n\n(.+)/s),r=n?.[1],i=n?.[2],f=n?.[3].split(`
`).slice(0,M).join(`
`),h=d.card.title?.replace(" - StackBlitz","");return{file:r,lines:i,code:f,project:h}}),p=_(()=>{if(!o.value.code)return null;const t=o.value.code.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/`/g,"&#96;");return v(`<p>\`\`\`${o.value.file?.split(".")?.[1]??""}
${t}
\`\`\`</p>`,{markdown:!0})});return(t,n)=>{const r=g,i=N;return s(o).code?(c(),u("div",j,[e("div",P,[s(p)?(c(),u("span",V,[(c(),m(b(s(p))))])):y("",!0)]),e("div",I,[e("div",L,[e("p",D,[e("span",null,l(t.$t("custom_cards.stackblitz.snippet_from",[s(o).file])),1),e("span",H,l(`- ${t.$t("custom_cards.stackblitz.lines",[s(o).lines])}`),1)]),e("div",O,[e("span",T,l(s(o).project),1),E])]),w(r,{external:"",target:"_blank","btn-solid":"","pt-0":"","pb-1":"","px-2":"","h-fit":"",to:t.card.url},{default:x(()=>[S(l(t.$t("custom_cards.stackblitz.open")),1)]),_:1},8,["to"])])])):(c(),m(i,{key:1,card:t.card,"small-picture-only":t.smallPictureOnly,root:t.root},null,8,["card","small-picture-only","root"]))}}}),G=C(R,[["__scopeId","data-v-f7a109e5"]]);export{G as default};