import { b as _sfc_main$2 } from './CommonPaginator-BbZe3uv5.mjs';
import { _ as _sfc_main$3 } from './AccountBigCard-BGOdR6LF.mjs';
import { ssrRenderComponent, ssrRenderAttrs } from 'vue/server-renderer';
import { defineComponent, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { e as useI18n, u as useRoute, Y as useMastoClient, h as useHydratedHead, Z as useLocalStorage, a0 as STORAGE_KEY_LAST_ACCESSED_EXPLORE_ROUTE, k as getAccountRoute, X as _export_sfc } from './server.mjs';
import 'vue-virtual-scroller';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'xss';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'ts-custom-error';
import 'ws';
import 'events-to-async';
import 'lru-cache';
import 'ultrahtml';
import '@iconify/utils';
import 'tiny-decode';
import '@iconify-emoji/twemoji';
import '@iconify/utils/lib/emoji/replace/find';
import 'floating-vue';

const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}><div px2 pt2><div rounded of-hidden aspect="3.19" class="flex skeleton-loading-bg"></div><div px-4 pb-4 flex="~ col gap-2"><div flex sm:flex-row flex-col flex-gap-2><div flex items-center justify-between><div w-17 h-17 rounded-full border-4 border-bg-base z-2 mt--2 ms--1 of-hidden bg-base><div class="flex skeleton-loading-bg" w-full h-full></div></div><div block sm:hidden class="skeleton-loading-bg" h-8 w-30 rounded-full></div></div><div sm:mt-2 flex="~ col 1 gap-2"><div flex class="skeleton-loading-bg" h-5 w-20 rounded></div><div flex class="skeleton-loading-bg" h-4 w-40 rounded></div></div></div><div flex class="skeleton-loading-bg" h-4 my3 w="3/5" rounded></div><div flex justify-between items-center><div flex class="skeleton-loading-bg" h-4 w="sm:1/2 full" rounded></div><div sm:flex hidden class="skeleton-loading-bg" h-8 w-30 rounded-full></div></div></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountBigCardSkeleton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "users",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const route = useRoute();
    const paginator = useMastoClient().v2.suggestions.list({ limit: 20 });
    useHydratedHead({
      title: () => `${t("tab.for_you")} | ${t("nav.explore")}`
    });
    const lastAccessedExploreRoute = useLocalStorage(STORAGE_KEY_LAST_ACCESSED_EXPLORE_ROUTE, "");
    lastAccessedExploreRoute.value = route.path.replace(/(.*\/explore\/?)/, "");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonPaginator = _sfc_main$2;
      const _component_AccountBigCard = _sfc_main$3;
      const _component_AccountBigCardSkeleton = __nuxt_component_2;
      _push(ssrRenderComponent(_component_CommonPaginator, mergeProps({
        paginator: unref(paginator),
        "key-prop": "account"
      }, _attrs), {
        default: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_AccountBigCard, {
              account: item.account,
              as: "router-link",
              to: ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(item.account),
              border: "b base"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_AccountBigCard, {
                account: item.account,
                as: "router-link",
                to: ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(item.account),
                border: "b base"
              }, null, 8, ["account", "to"])
            ];
          }
        }),
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_AccountBigCardSkeleton, { border: "b base" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_AccountBigCardSkeleton, {
              border: "b base",
              op50: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_AccountBigCardSkeleton, {
              border: "b base",
              op25: ""
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_AccountBigCardSkeleton, { border: "b base" }),
              createVNode(_component_AccountBigCardSkeleton, {
                border: "b base",
                op50: ""
              }),
              createVNode(_component_AccountBigCardSkeleton, {
                border: "b base",
                op25: ""
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[[server]]/explore/users.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
