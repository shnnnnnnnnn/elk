import { u as useRoute, e as useI18n, bb as useAppConfig, i as isHydrated, bc as NOTIFICATION_FILTER_TYPES, _ as _sfc_main$2, l as __nuxt_component_0$1, aU as __nuxt_component_11, J as __nuxt_component_4 } from './server.mjs';
import { _ as _sfc_main$1 } from './CommonRouteTabs-LigkcvTo.mjs';
import { defineComponent, computed, withCtx, unref, createVNode, toDisplayString, renderSlot, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { i as isNotificationFilter } from './notification-DFG6Wtw2.mjs';
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
  __name: "notifications",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { t } = useI18n();
    const pwaEnabled = useAppConfig().pwaEnabled;
    const tabs = computed(() => [
      {
        name: "all",
        to: "/notifications",
        display: t("tab.notifications_all")
      },
      {
        name: "mention",
        to: "/notifications/mention",
        display: t("tab.notifications_mention")
      }
    ]);
    const filter = computed(() => {
      if (!isHydrated.value)
        return void 0;
      const rawFilter = route.params?.filter;
      const actualFilter = Array.isArray(rawFilter) ? rawFilter[0] : rawFilter;
      if (isNotificationFilter(actualFilter))
        return actualFilter;
      return void 0;
    });
    const filterIconMap = {
      "mention": "i-ri:at-line",
      "status": "i-ri:account-pin-circle-line",
      "reblog": "i-ri:repeat-fill",
      "follow": "i-ri:user-follow-line",
      "follow_request": "i-ri:user-shared-line",
      "favourite": "i-ri:heart-3-line",
      "poll": "i-ri:chat-poll-line",
      "update": "i-ri:edit-2-line",
      "admin.sign_up": "i-ri:user-add-line",
      "admin.report": "i-ri:flag-line"
    };
    const filterText = computed(() => `${t("tab.notifications_more_tooltip")}${filter.value ? `: ${t(`tab.notifications_${filter.value}`)}` : ""}`);
    const notificationFilterRoutes = computed(() => NOTIFICATION_FILTER_TYPES.map(
      (name) => ({
        name,
        to: `/notifications/${name}`,
        display: t(`tab.notifications_${name}`),
        icon: filterIconMap[name],
        match: name === filter.value
      })
    ));
    const moreOptions = computed(() => ({
      options: notificationFilterRoutes.value,
      icon: "i-ri:filter-2-line",
      tooltip: filterText.value,
      match: !!filter.value
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MainContent = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_CommonRouteTabs = _sfc_main$1;
      const _component_NotificationPreferences = __nuxt_component_11;
      const _component_NuxtPage = __nuxt_component_4;
      _push(ssrRenderComponent(_component_MainContent, _attrs, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/notifications",
              "timeline-title-style": "",
              flex: "",
              "items-center": "",
              "gap-2": "",
              onClick: _ctx.$scrollToTop
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div i-ri:notification-4-line${_scopeId2}></div><span${_scopeId2}>${ssrInterpolate(unref(t)("nav.notifications"))}</span>`);
                } else {
                  return [
                    createVNode("div", { "i-ri:notification-4-line": "" }),
                    createVNode("span", null, toDisplayString(unref(t)("nav.notifications")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, {
                to: "/notifications",
                "timeline-title-style": "",
                flex: "",
                "items-center": "",
                "gap-2": "",
                onClick: _ctx.$scrollToTop
              }, {
                default: withCtx(() => [
                  createVNode("div", { "i-ri:notification-4-line": "" }),
                  createVNode("span", null, toDisplayString(unref(t)("nav.notifications")), 1)
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              flex: "",
              "rounded-4": "",
              p1: "",
              "hover:bg-active": "",
              "cursor-pointer": "",
              "transition-100": "",
              title: unref(t)("settings.notifications.show_btn"),
              to: "/settings/notifications"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span aria-hidden="true" i-ri:notification-badge-line${_scopeId2}></span>`);
                } else {
                  return [
                    createVNode("span", {
                      "aria-hidden": "true",
                      "i-ri:notification-badge-line": ""
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, {
                flex: "",
                "rounded-4": "",
                p1: "",
                "hover:bg-active": "",
                "cursor-pointer": "",
                "transition-100": "",
                title: unref(t)("settings.notifications.show_btn"),
                to: "/settings/notifications"
              }, {
                default: withCtx(() => [
                  createVNode("span", {
                    "aria-hidden": "true",
                    "i-ri:notification-badge-line": ""
                  })
                ]),
                _: 1
              }, 8, ["title"])
            ];
          }
        }),
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CommonRouteTabs, {
              replace: "",
              options: unref(tabs),
              "more-options": unref(moreOptions)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_CommonRouteTabs, {
                replace: "",
                options: unref(tabs),
                "more-options": unref(moreOptions)
              }, null, 8, ["options", "more-options"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              if (unref(pwaEnabled)) {
                _push2(ssrRenderComponent(_component_NotificationPreferences, null, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                unref(pwaEnabled) ? (openBlock(), createBlock(_component_NotificationPreferences, { key: 0 })) : createCommentVNode("", true),
                createVNode(_component_NuxtPage)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/notifications.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
