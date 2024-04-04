import { e as useI18n, a as useMasto, h as useHydratedHead, _ as _sfc_main$2, l as __nuxt_component_0$1 } from './server.mjs';
import { _ as _sfc_main$1 } from './TagCardPaginator-Bvlmtasm.mjs';
import { defineComponent, withCtx, unref, createVNode, toDisplayString, useSSRContext } from 'vue';
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
import './CommonPaginator-BbZe3uv5.mjs';
import 'vue-virtual-scroller';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "hashtags",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const { client } = useMasto();
    const paginator = client.value.v1.followedTags.list({
      limit: 20
    });
    useHydratedHead({
      title: () => t("nav.hashtags")
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MainContent = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_TagCardPaginator = _sfc_main$1;
      _push(ssrRenderComponent(_component_MainContent, _attrs, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/hashtags",
              "timeline-title-style": "",
              flex: "",
              "items-center": "",
              "gap-2": "",
              onClick: _ctx.$scrollToTop
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="i-ri:hashtag"${_scopeId2}></div><span${_scopeId2}>${ssrInterpolate(unref(t)("nav.hashtags"))}</span>`);
                } else {
                  return [
                    createVNode("div", { class: "i-ri:hashtag" }),
                    createVNode("span", null, toDisplayString(unref(t)("nav.hashtags")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, {
                to: "/hashtags",
                "timeline-title-style": "",
                flex: "",
                "items-center": "",
                "gap-2": "",
                onClick: _ctx.$scrollToTop
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "i-ri:hashtag" }),
                  createVNode("span", null, toDisplayString(unref(t)("nav.hashtags")), 1)
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_TagCardPaginator, { paginator: unref(paginator) }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_TagCardPaginator, { paginator: unref(paginator) }, null, 16)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/hashtags.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
