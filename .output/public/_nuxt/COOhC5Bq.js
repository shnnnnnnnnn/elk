import{d as l,aB as _,ap as d,v as h,o as m,c as $,f as u,h as n,i as b,j as i,w as v,$ as g,_ as C,a0 as k,s as w,a as A,m as B}from"./CMcu4vOi.js";import{c as y}from"./Cy5WKwqU.js";const R={flex:"","justify-between":"","hover:bg-active":"","transition-100":"","items-center":""},I=l({__name:"Account",props:{account:{},hoverCard:{type:Boolean},list:{}},setup(e){_(e.account);const c=d(),o=h(!1);async function a(){try{o.value?await c.v1.lists.$select(e.list).accounts.create({accountIds:[e.account.id]}):await c.v1.lists.$select(e.list).accounts.remove({accountIds:[e.account.id]}),o.value=!o.value}catch(t){console.error(t)}}return(t,f)=>{const s=C,r=k;return m(),$("div",R,[u(s,{account:t.account,hover:"",p1:"",as:"router-link","hover-card":t.hoverCard,shrink:"","overflow-hidden":"",to:("getAccountRoute"in t?t.getAccountRoute:n(b))(t.account)},null,8,["account","hover-card","to"]),i("div",null,[u(r,{content:n(o)?t.$t("list.add_account"):t.$t("list.remove_account"),hover:n(o)?"text-green":"text-red","no-auto-focus":""},{default:v(()=>[i("button",{"text-sm":"",p2:"","border-1":"","transition-colors":"","border-dark":"","btn-action-icon":"",onClick:a},[i("span",{class:g(n(o)?"i-ri:user-add-line":"i-ri:user-unfollow-line")},null,2)])]),_:1},8,["content","hover"])])])}}}),N=l({__name:"accounts",setup(e){const c=w().params,o=A(()=>c.list),a=d().v1.lists.$select(o.value).accounts.list();return(t,f)=>{const s=I,r=y;return m(),B(r,{paginator:n(a)},{default:v(({item:p})=>[u(s,{account:p,list:n(o),"hover-card":"",border:"b base",py2:"",px4:""},null,8,["account","list"])]),_:1},8,["paginator"])}}});export{N as default};