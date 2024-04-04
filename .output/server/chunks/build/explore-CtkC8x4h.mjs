import { e as useI18n, u as useRoute, q as useUserSettings, i as isHydrated, E as currentServer, c as currentUser, _ as _sfc_main$2, J as __nuxt_component_4 } from './server.mjs';
import { _ as _sfc_main$1 } from './CommonRouteTabs-LigkcvTo.mjs';
import { defineComponent, ref, watchEffect, computed, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { i as isMediumOrLargeScreen } from './screen-yh7ctCbH.mjs';
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
  __name: "explore",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const search = ref();
    const route = useRoute();
    watchEffect(() => {
      if (isMediumOrLargeScreen && route.name === "explore" && search.value?.input)
        search.value?.input?.focus();
    });
    const userSettings = useUserSettings();
    const tabs = computed(() => [
      {
        to: isHydrated.value ? `/${currentServer.value}/explore` : "/explore",
        display: t("tab.posts")
      },
      {
        to: isHydrated.value ? `/${currentServer.value}/explore/tags` : "/explore/tags",
        display: t("tab.hashtags")
      },
      {
        to: isHydrated.value ? `/${currentServer.value}/explore/links` : "/explore/links",
        display: t("tab.news"),
        hide: userSettings.value.preferences.hideNews
      },
      // This section can only be accessed after logging in
      {
        to: isHydrated.value ? `/${currentServer.value}/explore/users` : "/explore/users",
        display: t("tab.for_you"),
        disabled: !isHydrated.value || !currentUser.value
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MainContent = _sfc_main$2;
      const _component_CommonRouteTabs = _sfc_main$1;
      const _component_NuxtPage = __nuxt_component_4;
      _push(ssrRenderComponent(_component_MainContent, _attrs, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span timeline-title-style flex items-center gap-2 cursor-pointer${_scopeId}><div i-ri:compass-3-line${_scopeId}></div><span${_scopeId}>${ssrInterpolate(unref(t)("nav.explore"))}</span></span>`);
          } else {
            return [
              createVNode("span", {
                "timeline-title-style": "",
                flex: "",
                "items-center": "",
                "gap-2": "",
                "cursor-pointer": "",
                onClick: _ctx.$scrollToTop
              }, [
                createVNode("div", { "i-ri:compass-3-line": "" }),
                createVNode("span", null, toDisplayString(unref(t)("nav.explore")), 1)
              ], 8, ["onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[[server]]/explore.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
