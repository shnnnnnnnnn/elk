import { e as useI18n, h as useHydratedHead, _ as _sfc_main$2 } from './server.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "featured-tags",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useHydratedHead({
      title: () => `${t("settings.profile.featured_tags.label")} | ${t("nav.settings")}`
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MainContent = _sfc_main$2;
      _push(ssrRenderComponent(_component_MainContent, mergeProps({ back: "" }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div text-lg font-bold flex items-center gap-2${_scopeId}><div i-ri:test-tube-line${_scopeId}></div><span${_scopeId}>${ssrInterpolate(_ctx.$t("settings.profile.featured_tags.label"))}</span></div>`);
          } else {
            return [
              createVNode("div", {
                "text-lg": "",
                "font-bold": "",
                flex: "",
                "items-center": "",
                "gap-2": "",
                onClick: _ctx.$scrollToTop
              }, [
                createVNode("div", { "i-ri:test-tube-line": "" }),
                createVNode("span", null, toDisplayString(_ctx.$t("settings.profile.featured_tags.label")), 1)
              ], 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div text-center mt-10${_scopeId}><h1 text-4xl${_scopeId}><span sr-only${_scopeId}>${ssrInterpolate(_ctx.$t("settings.profile.featured_tags.under_construction"))}</span> \u{1F6A7} </h1><h3 text-xl${_scopeId}>${ssrInterpolate(_ctx.$t("settings.profile.featured_tags.label"))}</h3></div>`);
          } else {
            return [
              createVNode("div", {
                "text-center": "",
                "mt-10": ""
              }, [
                createVNode("h1", { "text-4xl": "" }, [
                  createVNode("span", { "sr-only": "" }, toDisplayString(_ctx.$t("settings.profile.featured_tags.under_construction")), 1),
                  createTextVNode(" \u{1F6A7} ")
                ]),
                createVNode("h3", { "text-xl": "" }, toDisplayString(_ctx.$t("settings.profile.featured_tags.label")), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings/profile/featured-tags.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
