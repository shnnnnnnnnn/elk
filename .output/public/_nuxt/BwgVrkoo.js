import{q as f}from"./CMcu4vOi.js";const u=10,p=1e3;function s(n,l){const r=l.inReplyToId??l.reblog?.inReplyToId;return!!r&&(r===n.reblog?.id||r===n.id)}function a(n,l){const r=e=>e.filter.filterAction==="hide"&&e.filter.context.includes(l),t=e=>e.account.id===f.value?.account.id||!e.filtered?.find(r),i=e=>!e.reblog?.filtered?.find(r);return[...n].filter(t).filter(i)}function g(n,l="public"){let r=0;const t=a(n,l);for(let i=t.length-1;i>0;i--)for(let e=1;e<=u&&i-e>=0;e++){if(r++,r>p)return t;if(s(t[i],t[i-e])){const o=t.splice(i,1)[0];t.splice(i-e,0,o),e=0}else if(e>1&&s(t[i-e],t[i])){let o=i;for(;o<n.length-1&&s(t[o],t[o+1]);o++);const c=o-i+1,d=t.splice(i,c);t.splice(i-e+1,0,...d),e=0}}return t}export{g as r};
