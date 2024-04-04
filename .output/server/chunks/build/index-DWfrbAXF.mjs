import { e as useI18n, h as useHydratedHead, i as isHydrated, c as currentUser, _ as _sfc_main$2 } from './server.mjs';
import { _ as _sfc_main$1 } from './SettingsItem-BFthfYno.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, toDisplayString, unref, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useHydratedHead({
      title: () => `${t("settings.profile.label")} | ${t("nav.settings")}`
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MainContent = _sfc_main$2;
      const _component_SettingsItem = _sfc_main$1;
      _push(ssrRenderComponent(_component_MainContent, mergeProps({ "back-on-small-screen": "" }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div text-lg font-bold flex items-center gap-2${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.$t("settings.profile.label"))}</span></div>`);
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
                createVNode("span", null, toDisplayString(_ctx.$t("settings.profile.label")), 1)
              ], 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_SettingsItem, {
              command: "",
              large: "",
              icon: "i-ri:user-settings-line",
              text: _ctx.$t("settings.profile.appearance.label"),
              description: _ctx.$t("settings.profile.appearance.description"),
              to: "/settings/profile/appearance"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SettingsItem, {
              command: "",
              large: "",
              icon: "i-ri:hashtag",
              text: _ctx.$t("settings.profile.featured_tags.label"),
              description: _ctx.$t("settings.profile.featured_tags.description"),
              to: "/settings/profile/featured-tags"
            }, null, _parent2, _scopeId));
            if (("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) && ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser))) {
              _push2(ssrRenderComponent(_component_SettingsItem, {
                command: "",
                large: "",
                icon: "i-ri:settings-line",
                text: _ctx.$t("settings.account_settings.label"),
                description: _ctx.$t("settings.account_settings.description"),
                to: `https://${("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)).server}/auth/edit`,
                external: "",
                target: "_blank"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_SettingsItem, {
                command: "",
                large: "",
                icon: "i-ri:user-settings-line",
                text: _ctx.$t("settings.profile.appearance.label"),
                description: _ctx.$t("settings.profile.appearance.description"),
                to: "/settings/profile/appearance"
              }, null, 8, ["text", "description"]),
              createVNode(_component_SettingsItem, {
                command: "",
                large: "",
                icon: "i-ri:hashtag",
                text: _ctx.$t("settings.profile.featured_tags.label"),
                description: _ctx.$t("settings.profile.featured_tags.description"),
                to: "/settings/profile/featured-tags"
              }, null, 8, ["text", "description"]),
              ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) && ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)) ? (openBlock(), createBlock(_component_SettingsItem, {
                key: 0,
                command: "",
                large: "",
                icon: "i-ri:settings-line",
                text: _ctx.$t("settings.account_settings.label"),
                description: _ctx.$t("settings.account_settings.description"),
                to: `https://${("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)).server}/auth/edit`,
                external: "",
                target: "_blank"
              }, null, 8, ["text", "description", "to"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings/profile/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
