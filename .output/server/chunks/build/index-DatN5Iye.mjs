import { u as useRoute, e as useI18n, E as currentServer, a as useMasto, h as useHydratedHead, o as onReactivated, i as isHydrated, _ as _sfc_main$2, J as __nuxt_component_4 } from './server.mjs';
import { _ as _sfc_main$1 } from './CommonRouteTabs-LigkcvTo.mjs';
import { defineComponent, computed, withAsyncContext, mergeProps, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext, shallowRef } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useAsyncData } from './asyncData-D0OdvhXd.mjs';
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
import './Dropdown-YHaGe2K7.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { t } = useI18n();
    const list = computed(() => route.params.list);
    const server = computed(() => route.params.server ?? currentServer.value);
    const tabs = computed(
      () => [
        {
          to: {
            name: "list",
            params: { server: server.value, list: list.value }
          },
          display: t("tab.posts"),
          icon: "i-ri:list-unordered"
        },
        {
          to: {
            name: "list-accounts",
            params: { server: server.value, list: list.value }
          },
          display: t("tab.accounts"),
          icon: "i-ri:user-line"
        }
      ]
    );
    const { client } = useMasto();
    const { data: listInfo, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(() => client.value.v1.lists.$select(list.value).fetch(), { default: () => shallowRef() }, "$7Z23XGE2yw")), __temp = await __temp, __restore(), __temp);
    if (listInfo) {
      useHydratedHead({
        title: () => `${listInfo.value.title} | ${route.fullPath.endsWith("/accounts") ? t("tab.accounts") : t("tab.posts")} | ${t("nav.lists")}`
      });
    }
    onReactivated();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MainContent = _sfc_main$2;
      const _component_CommonRouteTabs = _sfc_main$1;
      const _component_NuxtPage = __nuxt_component_4;
      _push(ssrRenderComponent(_component_MainContent, mergeProps({ back: "" }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span text-lg font-bold${_scopeId}>${ssrInterpolate(unref(listInfo) ? unref(listInfo).title : unref(t)("nav.list"))}</span>`);
          } else {
            return [
              createVNode("span", {
                "text-lg": "",
                "font-bold": ""
              }, toDisplayString(unref(listInfo) ? unref(listInfo).title : unref(t)("nav.list")), 1)
            ];
          }
        }),
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CommonRouteTabs, {
              replace: "",
              options: unref(tabs)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_CommonRouteTabs, {
                replace: "",
                options: unref(tabs)
              }, null, 8, ["options"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) {
              _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) ? (openBlock(), createBlock(_component_NuxtPage, { key: 0 })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[[server]]/list/[list]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
