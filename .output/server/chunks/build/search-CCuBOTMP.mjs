import { a5 as useMagicKeys, e as useI18n, h as useHydratedHead, i as isHydrated, _ as _sfc_main$2, l as __nuxt_component_0$1 } from './server.mjs';
import { _ as _sfc_main$1 } from './SearchWidget-Dm1RXdb8.mjs';
import { defineComponent, ref, watchEffect, watch, withCtx, createVNode, toDisplayString, unref, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
import './SearchHashtagInfo-DJpkg2KL.mjs';
import './StatusCard-CHVUTCdD.mjs';
import './AccountInlineInfo-s2DIkMwx.mjs';
import './icons-m16uagef.mjs';
import './Dropdown-YHaGe2K7.mjs';
import './CommonPaginator-BbZe3uv5.mjs';
import 'vue-virtual-scroller';
import './translate-B4UXe0Hf.mjs';
import './StatusPreviewCard-C7wSe9bY.mjs';
import 'unlazy';
import 'blurhash';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "search",
  __ssrInlineRender: true,
  setup(__props) {
    const keys = useMagicKeys();
    const { t } = useI18n();
    useHydratedHead({
      title: () => t("nav.search")
    });
    const search = ref();
    watchEffect(() => {
      if (search.value?.input)
        search.value?.input?.focus();
    });
    watch(keys["/"], (v) => {
      if (!v)
        search.value?.input?.focus();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MainContent = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_SearchWidget = _sfc_main$1;
      _push(ssrRenderComponent(_component_MainContent, _attrs, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/search",
              "timeline-title-style": "",
              flex: "",
              "items-center": "",
              "gap-2": "",
              onClick: _ctx.$scrollToTop
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div i-ri:search-line class="rtl-flip"${_scopeId2}></div><span${_scopeId2}>${ssrInterpolate(_ctx.$t("nav.search"))}</span>`);
                } else {
                  return [
                    createVNode("div", {
                      "i-ri:search-line": "",
                      class: "rtl-flip"
                    }),
                    createVNode("span", null, toDisplayString(_ctx.$t("nav.search")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, {
                to: "/search",
                "timeline-title-style": "",
                flex: "",
                "items-center": "",
                "gap-2": "",
                onClick: _ctx.$scrollToTop
              }, {
                default: withCtx(() => [
                  createVNode("div", {
                    "i-ri:search-line": "",
                    class: "rtl-flip"
                  }),
                  createVNode("span", null, toDisplayString(_ctx.$t("nav.search")), 1)
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div px2 mt3${_scopeId}>`);
            if ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) {
              _push2(ssrRenderComponent(_component_SearchWidget, {
                ref_key: "search",
                ref: search,
                "m-1": ""
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                px2: "",
                mt3: ""
              }, [
                ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) ? (openBlock(), createBlock(_component_SearchWidget, {
                  key: 0,
                  ref_key: "search",
                  ref: search,
                  "m-1": ""
                }, null, 512)) : createCommentVNode("", true)
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[[server]]/search.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
