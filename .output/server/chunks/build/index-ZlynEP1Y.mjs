import { e as useI18n, bb as useAppConfig, h as useHydratedHead, _ as _sfc_main$2 } from './server.mjs';
import { _ as _sfc_main$1 } from './SettingsItem-BFthfYno.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, toDisplayString, unref, useSSRContext } from 'vue';
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
    const pwaEnabled = useAppConfig().pwaEnabled;
    useHydratedHead({
      title: () => `${t("settings.notifications.label")} | ${t("nav.settings")}`
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MainContent = _sfc_main$2;
      const _component_SettingsItem = _sfc_main$1;
      _push(ssrRenderComponent(_component_MainContent, mergeProps({ "back-on-small-screen": "" }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div text-lg font-bold flex items-center gap-2${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.$t("settings.notifications.label"))}</span></div>`);
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
                createVNode("span", null, toDisplayString(_ctx.$t("settings.notifications.label")), 1)
              ], 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_SettingsItem, {
              command: "",
              text: _ctx.$t("settings.notifications.notifications.label"),
              to: "/settings/notifications/notifications"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SettingsItem, {
              command: "",
              disabled: !unref(pwaEnabled),
              text: _ctx.$t("settings.notifications.push_notifications.label"),
              description: _ctx.$t("settings.notifications.push_notifications.description"),
              to: "/settings/notifications/push-notifications"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_SettingsItem, {
                command: "",
                text: _ctx.$t("settings.notifications.notifications.label"),
                to: "/settings/notifications/notifications"
              }, null, 8, ["text"]),
              createVNode(_component_SettingsItem, {
                command: "",
                disabled: !unref(pwaEnabled),
                text: _ctx.$t("settings.notifications.push_notifications.label"),
                description: _ctx.$t("settings.notifications.push_notifications.description"),
                to: "/settings/notifications/push-notifications"
              }, null, 8, ["disabled", "text", "description"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings/notifications/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
