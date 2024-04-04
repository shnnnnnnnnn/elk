import { bi as useBuildInfo, l as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, resolveComponent, mergeProps, withCtx, unref, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "CommonPreviewPrompt",
  __ssrInlineRender: true,
  setup(__props) {
    const build = useBuildInfo();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n_t = resolveComponent("i18n-t");
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        "m-2": "",
        p5: "",
        "bg-rose:10": "",
        relative: "",
        "rounded-lg": "",
        "of-hidden": "",
        flex: "~ col gap-3"
      }, _attrs))}><h2 font-bold text-rose>${ssrInterpolate(_ctx.$t("help.build_preview.title"))}</h2><p>`);
      _push(ssrRenderComponent(_component_i18n_t, { keypath: "help.build_preview.desc1" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              href: `https://github.com/elk-zone/elk/commit/${unref(build).commit}`,
              target: "_blank",
              "text-rose": "",
              "hover:underline": ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code${_scopeId2}>${ssrInterpolate(unref(build).shortCommit)}</code>`);
                } else {
                  return [
                    createVNode("code", null, toDisplayString(unref(build).shortCommit), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, {
                href: `https://github.com/elk-zone/elk/commit/${unref(build).commit}`,
                target: "_blank",
                "text-rose": "",
                "hover:underline": ""
              }, {
                default: withCtx(() => [
                  createVNode("code", null, toDisplayString(unref(build).shortCommit), 1)
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p><p>${ssrInterpolate(_ctx.$t("help.build_preview.desc2"))}</p><p font-bold>${ssrInterpolate(_ctx.$t("help.build_preview.desc3"))}</p><div i-ri-git-pull-request-line absolute text-10em bottom--10 inset-ie--10 text-rose op10 class="-z-1"></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/CommonPreviewPrompt.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
