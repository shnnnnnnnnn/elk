import { _ as _sfc_main$1 } from './CommonAlert-BbxviVrC.mjs';
import { _ as _sfc_main$2 } from './TagCardPaginator-Bvlmtasm.mjs';
import { defineComponent, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { e as useI18n, u as useRoute, a as useMasto, Z as useLocalStorage, a2 as STORAGE_KEY_HIDE_EXPLORE_TAGS_TIPS, h as useHydratedHead, a0 as STORAGE_KEY_LAST_ACCESSED_EXPLORE_ROUTE } from './server.mjs';
import './CommonPaginator-BbZe3uv5.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tags",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const route = useRoute();
    const { client } = useMasto();
    const paginator = client.value.v1.trends.tags.list({
      limit: 20
    });
    const hideTagsTips = useLocalStorage(STORAGE_KEY_HIDE_EXPLORE_TAGS_TIPS, false);
    useHydratedHead({
      title: () => `${t("tab.hashtags")} | ${t("nav.explore")}`
    });
    const lastAccessedExploreRoute = useLocalStorage(STORAGE_KEY_LAST_ACCESSED_EXPLORE_ROUTE, "");
    lastAccessedExploreRoute.value = route.path.replace(/(.*\/explore\/?)/, "");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonAlert = _sfc_main$1;
      const _component_TagCardPaginator = _sfc_main$2;
      _push(`<!--[-->`);
      if (!unref(hideTagsTips)) {
        _push(ssrRenderComponent(_component_CommonAlert, {
          onClose: ($event) => hideTagsTips.value = true
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<p${_scopeId}>${ssrInterpolate(_ctx.$t("tooltip.explore_tags_intro"))}</p>`);
            } else {
              return [
                createVNode("p", null, toDisplayString(_ctx.$t("tooltip.explore_tags_intro")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_TagCardPaginator, { paginator: unref(paginator) }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[[server]]/explore/tags.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
