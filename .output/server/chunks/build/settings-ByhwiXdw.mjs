import { e as useI18n, h as useHydratedHead, u as useRoute, c as currentUser, _ as _sfc_main$2, bh as __nuxt_component_2$1 } from './server.mjs';
import { _ as _sfc_main$1 } from './SettingsItem-BFthfYno.mjs';
import { defineComponent, computed, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "settings",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useHydratedHead({
      title: () => t("nav.settings")
    });
    const route = useRoute();
    const isRootPath = computed(() => route.name === "settings");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MainContent = _sfc_main$2;
      const _component_SettingsItem = _sfc_main$1;
      const _component_ClientOnly = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div min-h-screen flex><div border="e base" class="${ssrRenderClass(unref(isRootPath) ? "block lg:flex-none flex-1" : "hidden lg:block")}">`);
      _push(ssrRenderComponent(_component_MainContent, null, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div timeline-title-style flex items-center gap-2${_scopeId}><div i-ri:settings-3-line${_scopeId}></div><span${_scopeId}>${ssrInterpolate(_ctx.$t("nav.settings"))}</span></div>`);
          } else {
            return [
              createVNode("div", {
                "timeline-title-style": "",
                flex: "",
                "items-center": "",
                "gap-2": "",
                onClick: _ctx.$scrollToTop
              }, [
                createVNode("div", { "i-ri:settings-3-line": "" }),
                createVNode("span", null, toDisplayString(_ctx.$t("nav.settings")), 1)
              ], 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div xl:w-97 lg:w-78 w-full${_scopeId}>`);
            if ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)) {
              _push2(ssrRenderComponent(_component_SettingsItem, {
                command: "",
                icon: "i-ri:user-line",
                text: _ctx.$t("settings.profile.label"),
                to: "/settings/profile",
                match: _ctx.$route.path.startsWith("/settings/profile/")
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_SettingsItem, {
              command: "",
              icon: "i-ri-compasses-2-line",
              text: _ctx.$t("settings.interface.label"),
              to: "/settings/interface",
              match: _ctx.$route.path.startsWith("/settings/interface/")
            }, null, _parent2, _scopeId));
            if ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)) {
              _push2(ssrRenderComponent(_component_SettingsItem, {
                command: "",
                icon: "i-ri:notification-badge-line",
                text: _ctx.$t("settings.notifications_settings"),
                to: "/settings/notifications",
                match: _ctx.$route.path.startsWith("/settings/notifications/")
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_SettingsItem, {
              command: "",
              icon: "i-ri-globe-line",
              text: _ctx.$t("settings.language.label"),
              to: "/settings/language",
              match: _ctx.$route.path.startsWith("/settings/language/")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SettingsItem, {
              command: "",
              icon: "i-ri-equalizer-line",
              text: _ctx.$t("settings.preferences.label"),
              to: "/settings/preferences",
              match: _ctx.$route.path.startsWith("/settings/preferences/")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SettingsItem, {
              command: "",
              icon: "i-ri-group-line",
              text: _ctx.$t("settings.users.label"),
              to: "/settings/users",
              match: _ctx.$route.path.startsWith("/settings/users/")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SettingsItem, {
              command: "",
              icon: "i-ri:information-line",
              text: _ctx.$t("settings.about.label"),
              to: "/settings/about",
              match: _ctx.$route.path.startsWith("/settings/about/")
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                "xl:w-97": "",
                "lg:w-78": "",
                "w-full": ""
              }, [
                ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)) ? (openBlock(), createBlock(_component_SettingsItem, {
                  key: 0,
                  command: "",
                  icon: "i-ri:user-line",
                  text: _ctx.$t("settings.profile.label"),
                  to: "/settings/profile",
                  match: _ctx.$route.path.startsWith("/settings/profile/")
                }, null, 8, ["text", "match"])) : createCommentVNode("", true),
                createVNode(_component_SettingsItem, {
                  command: "",
                  icon: "i-ri-compasses-2-line",
                  text: _ctx.$t("settings.interface.label"),
                  to: "/settings/interface",
                  match: _ctx.$route.path.startsWith("/settings/interface/")
                }, null, 8, ["text", "match"]),
                ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)) ? (openBlock(), createBlock(_component_SettingsItem, {
                  key: 1,
                  command: "",
                  icon: "i-ri:notification-badge-line",
                  text: _ctx.$t("settings.notifications_settings"),
                  to: "/settings/notifications",
                  match: _ctx.$route.path.startsWith("/settings/notifications/")
                }, null, 8, ["text", "match"])) : createCommentVNode("", true),
                createVNode(_component_SettingsItem, {
                  command: "",
                  icon: "i-ri-globe-line",
                  text: _ctx.$t("settings.language.label"),
                  to: "/settings/language",
                  match: _ctx.$route.path.startsWith("/settings/language/")
                }, null, 8, ["text", "match"]),
                createVNode(_component_SettingsItem, {
                  command: "",
                  icon: "i-ri-equalizer-line",
                  text: _ctx.$t("settings.preferences.label"),
                  to: "/settings/preferences",
                  match: _ctx.$route.path.startsWith("/settings/preferences/")
                }, null, 8, ["text", "match"]),
                createVNode(_component_SettingsItem, {
                  command: "",
                  icon: "i-ri-group-line",
                  text: _ctx.$t("settings.users.label"),
                  to: "/settings/users",
                  match: _ctx.$route.path.startsWith("/settings/users/")
                }, null, 8, ["text", "match"]),
                createVNode(_component_SettingsItem, {
                  command: "",
                  icon: "i-ri:information-line",
                  text: _ctx.$t("settings.about.label"),
                  to: "/settings/about",
                  match: _ctx.$route.path.startsWith("/settings/about/")
                }, null, 8, ["text", "match"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div flex-1 class="${ssrRenderClass(unref(isRootPath) ? "hidden lg:block" : "block")}">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
