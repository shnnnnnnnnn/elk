import { e as useI18n, h as useHydratedHead, q as useUserSettings, s as getPreferences, bm as togglePreferences, _ as _sfc_main$2 } from './server.mjs';
import { useSSRContext, defineComponent, mergeProps, withCtx, createVNode, toDisplayString, unref, createTextVNode } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SettingsToggleItem",
  __ssrInlineRender: true,
  props: {
    icon: {},
    text: {},
    checked: { type: Boolean },
    disabled: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        "exact-active-class": "text-primary",
        block: "",
        "w-full": "",
        group: "",
        "focus:outline-none": "",
        "text-start": "",
        role: "checkbox",
        "aria-checked": _ctx.checked,
        disabled: _ctx.disabled,
        class: _ctx.disabled ? "opacity-50 cursor-not-allowed" : ""
      }, _attrs))}><div w-full flex w-fit px5 py3 md:gap2 gap4 items-center transition-250 class="${ssrRenderClass(_ctx.disabled ? "" : "group-hover:bg-active")}" group-focus-visible:ring="2 current"><div flex-1 flex items-center md:gap2 gap4>`);
      if (_ctx.icon) {
        _push(`<div flex items-center justify-center flex-shrink-0 class="${ssrRenderClass(_ctx.$slots.description ? "w-12 h-12" : "")}">`);
        ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
          if (_ctx.icon) {
            _push(`<div class="${ssrRenderClass(_ctx.icon)}" md:text-size-inherit text-xl></div>`);
          } else {
            _push(`<!---->`);
          }
        }, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div space-y-1><p class="${ssrRenderClass(_ctx.checked ? "text-base" : "text-secondary")}">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(`<span>${ssrInterpolate(_ctx.text)}</span>`);
      }, _push, _parent);
      _push(`</p>`);
      if (_ctx.$slots.description) {
        _push(`<p text-sm text-secondary>`);
        ssrRenderSlot(_ctx.$slots, "description", {}, null, _push, _parent);
        _push(`</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div text-lg class="${ssrRenderClass(_ctx.checked ? "i-ri-checkbox-line text-primary" : "i-ri-checkbox-blank-line text-secondary")}"></div></div></button>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/SettingsToggleItem.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useHydratedHead({
      title: () => `${t("settings.preferences.label")} | ${t("nav.settings")}`
    });
    const userSettings = useUserSettings();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MainContent = _sfc_main$2;
      const _component_SettingsToggleItem = _sfc_main$1;
      _push(ssrRenderComponent(_component_MainContent, mergeProps({ "back-on-small-screen": "" }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 text-lg font-bold flex items-center gap-2${_scopeId}>${ssrInterpolate(_ctx.$t("settings.preferences.label"))}</h1>`);
          } else {
            return [
              createVNode("h1", {
                "text-lg": "",
                "font-bold": "",
                flex: "",
                "items-center": "",
                "gap-2": "",
                onClick: _ctx.$scrollToTop
              }, toDisplayString(_ctx.$t("settings.preferences.label")), 9, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_SettingsToggleItem, {
              checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideAltIndicatorOnPosts"),
              onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("hideAltIndicatorOnPosts")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.hide_alt_indi_on_posts"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.hide_alt_indi_on_posts")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SettingsToggleItem, {
              checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideAccountHoverCard"),
              onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("hideAccountHoverCard")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.hide_account_hover_card"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.hide_account_hover_card")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SettingsToggleItem, {
              checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideTagHoverCard"),
              onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("hideTagHoverCard")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.hide_tag_hover_card"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.hide_tag_hover_card")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SettingsToggleItem, {
              checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "enableAutoplay"),
              disabled: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "enableDataSaving"),
              onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("enableAutoplay")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.enable_autoplay"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.enable_autoplay")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SettingsToggleItem, {
              checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "optimizeForLowPerformanceDevice"),
              onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("optimizeForLowPerformanceDevice")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.optimize_for_low_performance_device"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.optimize_for_low_performance_device")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SettingsToggleItem, {
              checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "enableDataSaving"),
              onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("enableDataSaving")
            }, {
              description: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.enable_data_saving_description"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.enable_data_saving_description")), 1)
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.enable_data_saving"))} `);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.enable_data_saving")) + " ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SettingsToggleItem, {
              checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "enablePinchToZoom"),
              onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("enablePinchToZoom")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.enable_pinch_to_zoom"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.enable_pinch_to_zoom")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SettingsToggleItem, {
              checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "useStarFavoriteIcon"),
              onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("useStarFavoriteIcon")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.use_star_favorite_icon"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.use_star_favorite_icon")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h2 px6 py4 mt2 font-bold text-xl flex="~ gap-1" items-center${_scopeId}><div i-ri-hearts-line${_scopeId}></div> ${ssrInterpolate(_ctx.$t("settings.preferences.wellbeing"))}</h2>`);
            _push2(ssrRenderComponent(_component_SettingsToggleItem, {
              checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "grayscaleMode"),
              onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("grayscaleMode")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.grayscale_mode"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.grayscale_mode")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SettingsToggleItem, {
              checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideBoostCount"),
              onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("hideBoostCount")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.hide_boost_count"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.hide_boost_count")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SettingsToggleItem, {
              checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideFavoriteCount"),
              onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("hideFavoriteCount")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.hide_favorite_count"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.hide_favorite_count")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SettingsToggleItem, {
              checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideReplyCount"),
              onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("hideReplyCount")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.hide_reply_count"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.hide_reply_count")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SettingsToggleItem, {
              checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideFollowerCount"),
              onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("hideFollowerCount")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.hide_follower_count"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.hide_follower_count")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SettingsToggleItem, {
              checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideUsernameEmojis"),
              onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("hideUsernameEmojis")
            }, {
              description: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.hide_username_emojis_description"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.hide_username_emojis_description")), 1)
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.hide_username_emojis"))} `);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.hide_username_emojis")) + " ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SettingsToggleItem, {
              checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideNews"),
              onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("hideNews")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.hide_news"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.hide_news")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SettingsToggleItem, {
              checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "zenMode"),
              onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("zenMode")
            }, {
              description: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.zen_mode_description"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.zen_mode_description")), 1)
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.zen_mode"))} `);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.zen_mode")) + " ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h2 px6 py4 mt2 font-bold text-xl flex="~ gap-1" items-center${_scopeId}><div i-ri-flask-line${_scopeId}></div> ${ssrInterpolate(_ctx.$t("settings.preferences.title"))}</h2>`);
            _push2(ssrRenderComponent(_component_SettingsToggleItem, {
              checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "experimentalEmbeddedMedia"),
              onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("experimentalEmbeddedMedia")
            }, {
              description: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.embedded_media_description"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.embedded_media_description")), 1)
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.embedded_media"))} `);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.embedded_media")) + " ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SettingsToggleItem, {
              checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "experimentalVirtualScroller"),
              onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("experimentalVirtualScroller")
            }, {
              description: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.virtual_scroll_description"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.virtual_scroll_description")), 1)
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.virtual_scroll"))} `);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.virtual_scroll")) + " ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SettingsToggleItem, {
              checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "experimentalGitHubCards"),
              onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("experimentalGitHubCards")
            }, {
              description: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.github_cards_description"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.github_cards_description")), 1)
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.github_cards"))} `);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.github_cards")) + " ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SettingsToggleItem, {
              checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "experimentalUserPicker"),
              onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("experimentalUserPicker")
            }, {
              description: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.user_picker_description"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.user_picker_description")), 1)
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("settings.preferences.user_picker"))} `);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("settings.preferences.user_picker")) + " ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_SettingsToggleItem, {
                checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideAltIndicatorOnPosts"),
                onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("hideAltIndicatorOnPosts")
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.hide_alt_indi_on_posts")), 1)
                ]),
                _: 1
              }, 8, ["checked", "onClick"]),
              createVNode(_component_SettingsToggleItem, {
                checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideAccountHoverCard"),
                onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("hideAccountHoverCard")
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.hide_account_hover_card")), 1)
                ]),
                _: 1
              }, 8, ["checked", "onClick"]),
              createVNode(_component_SettingsToggleItem, {
                checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideTagHoverCard"),
                onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("hideTagHoverCard")
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.hide_tag_hover_card")), 1)
                ]),
                _: 1
              }, 8, ["checked", "onClick"]),
              createVNode(_component_SettingsToggleItem, {
                checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "enableAutoplay"),
                disabled: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "enableDataSaving"),
                onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("enableAutoplay")
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.enable_autoplay")), 1)
                ]),
                _: 1
              }, 8, ["checked", "disabled", "onClick"]),
              createVNode(_component_SettingsToggleItem, {
                checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "optimizeForLowPerformanceDevice"),
                onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("optimizeForLowPerformanceDevice")
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.optimize_for_low_performance_device")), 1)
                ]),
                _: 1
              }, 8, ["checked", "onClick"]),
              createVNode(_component_SettingsToggleItem, {
                checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "enableDataSaving"),
                onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("enableDataSaving")
              }, {
                description: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.enable_data_saving_description")), 1)
                ]),
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.enable_data_saving")) + " ", 1)
                ]),
                _: 1
              }, 8, ["checked", "onClick"]),
              createVNode(_component_SettingsToggleItem, {
                checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "enablePinchToZoom"),
                onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("enablePinchToZoom")
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.enable_pinch_to_zoom")), 1)
                ]),
                _: 1
              }, 8, ["checked", "onClick"]),
              createVNode(_component_SettingsToggleItem, {
                checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "useStarFavoriteIcon"),
                onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("useStarFavoriteIcon")
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.use_star_favorite_icon")), 1)
                ]),
                _: 1
              }, 8, ["checked", "onClick"]),
              createVNode("h2", {
                px6: "",
                py4: "",
                mt2: "",
                "font-bold": "",
                "text-xl": "",
                flex: "~ gap-1",
                "items-center": ""
              }, [
                createVNode("div", { "i-ri-hearts-line": "" }),
                createTextVNode(" " + toDisplayString(_ctx.$t("settings.preferences.wellbeing")), 1)
              ]),
              createVNode(_component_SettingsToggleItem, {
                checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "grayscaleMode"),
                onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("grayscaleMode")
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.grayscale_mode")), 1)
                ]),
                _: 1
              }, 8, ["checked", "onClick"]),
              createVNode(_component_SettingsToggleItem, {
                checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideBoostCount"),
                onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("hideBoostCount")
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.hide_boost_count")), 1)
                ]),
                _: 1
              }, 8, ["checked", "onClick"]),
              createVNode(_component_SettingsToggleItem, {
                checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideFavoriteCount"),
                onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("hideFavoriteCount")
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.hide_favorite_count")), 1)
                ]),
                _: 1
              }, 8, ["checked", "onClick"]),
              createVNode(_component_SettingsToggleItem, {
                checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideReplyCount"),
                onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("hideReplyCount")
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.hide_reply_count")), 1)
                ]),
                _: 1
              }, 8, ["checked", "onClick"]),
              createVNode(_component_SettingsToggleItem, {
                checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideFollowerCount"),
                onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("hideFollowerCount")
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.hide_follower_count")), 1)
                ]),
                _: 1
              }, 8, ["checked", "onClick"]),
              createVNode(_component_SettingsToggleItem, {
                checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideUsernameEmojis"),
                onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("hideUsernameEmojis")
              }, {
                description: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.hide_username_emojis_description")), 1)
                ]),
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.hide_username_emojis")) + " ", 1)
                ]),
                _: 1
              }, 8, ["checked", "onClick"]),
              createVNode(_component_SettingsToggleItem, {
                checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideNews"),
                onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("hideNews")
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.hide_news")), 1)
                ]),
                _: 1
              }, 8, ["checked", "onClick"]),
              createVNode(_component_SettingsToggleItem, {
                checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "zenMode"),
                onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("zenMode")
              }, {
                description: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.zen_mode_description")), 1)
                ]),
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.zen_mode")) + " ", 1)
                ]),
                _: 1
              }, 8, ["checked", "onClick"]),
              createVNode("h2", {
                px6: "",
                py4: "",
                mt2: "",
                "font-bold": "",
                "text-xl": "",
                flex: "~ gap-1",
                "items-center": ""
              }, [
                createVNode("div", { "i-ri-flask-line": "" }),
                createTextVNode(" " + toDisplayString(_ctx.$t("settings.preferences.title")), 1)
              ]),
              createVNode(_component_SettingsToggleItem, {
                checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "experimentalEmbeddedMedia"),
                onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("experimentalEmbeddedMedia")
              }, {
                description: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.embedded_media_description")), 1)
                ]),
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.embedded_media")) + " ", 1)
                ]),
                _: 1
              }, 8, ["checked", "onClick"]),
              createVNode(_component_SettingsToggleItem, {
                checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "experimentalVirtualScroller"),
                onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("experimentalVirtualScroller")
              }, {
                description: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.virtual_scroll_description")), 1)
                ]),
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.virtual_scroll")) + " ", 1)
                ]),
                _: 1
              }, 8, ["checked", "onClick"]),
              createVNode(_component_SettingsToggleItem, {
                checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "experimentalGitHubCards"),
                onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("experimentalGitHubCards")
              }, {
                description: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.github_cards_description")), 1)
                ]),
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.github_cards")) + " ", 1)
                ]),
                _: 1
              }, 8, ["checked", "onClick"]),
              createVNode(_component_SettingsToggleItem, {
                checked: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "experimentalUserPicker"),
                onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("experimentalUserPicker")
              }, {
                description: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.user_picker_description")), 1)
                ]),
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("settings.preferences.user_picker")) + " ", 1)
                ]),
                _: 1
              }, 8, ["checked", "onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings/preferences/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
