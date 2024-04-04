import { _ as _sfc_main$1 } from './CommonAlert-BbxviVrC.mjs';
import { _ as _sfc_main$2 } from './TimelinePaginator-D6qhsp0Y.mjs';
import { e as useI18n, u as useRoute, Y as useMastoClient, Z as useLocalStorage, $ as STORAGE_KEY_HIDE_EXPLORE_POSTS_TIPS, h as useHydratedHead, a0 as STORAGE_KEY_LAST_ACCESSED_EXPLORE_ROUTE, i as isHydrated } from './server.mjs';
import { defineComponent, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import './CommonPaginator-BbZe3uv5.mjs';
import 'vue-virtual-scroller';
import './StatusCard-CHVUTCdD.mjs';
import './AccountInlineInfo-s2DIkMwx.mjs';
import './icons-m16uagef.mjs';
import './Dropdown-YHaGe2K7.mjs';
import './translate-B4UXe0Hf.mjs';
import './StatusPreviewCard-C7wSe9bY.mjs';
import 'unlazy';
import 'blurhash';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const route = useRoute();
    const paginator = useMastoClient().v1.trends.statuses.list();
    const hideNewsTips = useLocalStorage(STORAGE_KEY_HIDE_EXPLORE_POSTS_TIPS, false);
    useHydratedHead({
      title: () => `${t("tab.posts")} | ${t("nav.explore")}`
    });
    const lastAccessedExploreRoute = useLocalStorage(STORAGE_KEY_LAST_ACCESSED_EXPLORE_ROUTE, "");
    lastAccessedExploreRoute.value = route.path.replace(/(.*\/explore\/?)/, "");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonAlert = _sfc_main$1;
      const _component_TimelinePaginator = _sfc_main$2;
      _push(`<!--[-->`);
      if (("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) && !unref(hideNewsTips)) {
        _push(ssrRenderComponent(_component_CommonAlert, {
          onClose: ($event) => hideNewsTips.value = true
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<p${_scopeId}>${ssrInterpolate(_ctx.$t("tooltip.explore_posts_intro"))}</p>`);
            } else {
              return [
                createVNode("p", null, toDisplayString(_ctx.$t("tooltip.explore_posts_intro")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) {
        _push(ssrRenderComponent(_component_TimelinePaginator, {
          paginator: unref(paginator),
          context: "public"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[[server]]/explore/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
