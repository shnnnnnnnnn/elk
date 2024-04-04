import { e as useI18n, h as useHydratedHead, q as useUserSettings, bl as DEFAULT_FONT_SIZE, aY as useColorMode, _ as _sfc_main$2$1 } from './server.mjs';
import { useSSRContext, defineComponent, mergeProps, withCtx, createVNode, toDisplayString, unref, withAsyncContext, computed } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
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

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SettingsFontSize",
  __ssrInlineRender: true,
  setup(__props) {
    const userSettings = useUserSettings();
    const sizes = Array.from({ length: 11 }).fill(0).map((x, i) => `${10 + i}px`);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        flex: "",
        "items-center": "",
        "space-x-4": ""
      }, _attrs))}><span text-xs text-secondary>Aa</span><div flex-1 relative flex items-center><input${ssrRenderAttr("value", unref(sizes).indexOf(unref(userSettings).fontSize))}${ssrRenderAttr("aria-valuetext", `${unref(userSettings).fontSize}${unref(userSettings).fontSize === unref(DEFAULT_FONT_SIZE) ? ` ${_ctx.$t("settings.interface.default")}` : ""}`)}${ssrRenderAttr("min", 0)}${ssrRenderAttr("max", unref(sizes).length - 1)}${ssrRenderAttr("step", 1)} type="range" focus:outline-none appearance-none bg-transparent w-full cursor-pointer><div flex items-center justify-between absolute w-full pointer-events-none><!--[-->`);
      ssrRenderList(unref(sizes).length, (i) => {
        _push(`<div h-3 w-3 rounded-full bg-secondary-light relative>`);
        if (unref(sizes).indexOf(unref(userSettings).fontSize) === i - 1) {
          _push(`<div absolute rounded-full class="-top-1 -left-1" bg-primary h-5 w-5></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div><span text-xl text-secondary>Aa</span></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/SettingsFontSize.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SettingsColorMode",
  __ssrInlineRender: true,
  setup(__props) {
    const colorMode = useColorMode();
    const modes = [
      {
        icon: "i-ri-moon-line",
        label: "settings.interface.dark_mode",
        mode: "dark"
      },
      {
        icon: "i-ri-sun-line",
        label: "settings.interface.light_mode",
        mode: "light"
      },
      {
        icon: "i-ri-computer-line",
        label: "settings.interface.system_mode",
        mode: "system"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        flex: "~ gap4 wrap",
        "w-full": ""
      }, _attrs))}><!--[-->`);
      ssrRenderList(modes, ({ icon, label, mode }) => {
        _push(`<button btn-text flex-1 flex="~ gap-1 center" p4 border="~ base rounded" bg-base ws-nowrap${ssrRenderAttr("tabindex", unref(colorMode).preference === mode ? 0 : -1)} class="${ssrRenderClass(unref(colorMode).preference === mode ? "pointer-events-none" : "filter-saturate-0")}"><span class="${ssrRenderClass(`${icon}`)}"></span> ${ssrInterpolate(_ctx.$t(label))}</button>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/SettingsColorMode.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SettingsThemeColors",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const themes = ([__temp, __restore] = withAsyncContext(() => import('./themes-CZHa26_Q.mjs').then((r) => r.default)), __temp = await __temp, __restore(), __temp);
    const settings = useUserSettings();
    const currentTheme = computed(() => settings.value.themeColors?.["--theme-color-name"] || themes[0][1]["--theme-color-name"]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        flex: "~ gap4 wrap",
        p2: ""
      }, _attrs))}><!--[-->`);
      ssrRenderList(unref(themes), ([key, theme]) => {
        _push(`<button style="${ssrRenderStyle({
          "background": key,
          "--local-ring-color": key
        })}" class="${ssrRenderClass(unref(currentTheme) === theme["--theme-color-name"] ? "ring-2" : "scale-90")}"${ssrRenderAttr("title", theme["--theme-color-name"])} w-8 h-8 rounded-full transition-all ring="$local-ring-color offset-3 offset-$c-bg-base"></button>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/SettingsThemeColors.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useHydratedHead({
      title: () => `${t("settings.interface.label")} | ${t("nav.settings")}`
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MainContent = _sfc_main$2$1;
      const _component_SettingsFontSize = _sfc_main$3;
      const _component_SettingsColorMode = _sfc_main$2;
      const _component_SettingsThemeColors = _sfc_main$1;
      _push(ssrRenderComponent(_component_MainContent, mergeProps({ "back-on-small-screen": "" }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div text-lg font-bold flex items-center gap-2${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.$t("settings.interface.label"))}</span></div>`);
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
                createVNode("span", null, toDisplayString(_ctx.$t("settings.interface.label")), 1)
              ], 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div p6 flex="~ col gap6"${_scopeId}><label space-y-2${_scopeId}><p font-medium${_scopeId}>${ssrInterpolate(_ctx.$t("settings.interface.font_size"))}</p>`);
            _push2(ssrRenderComponent(_component_SettingsFontSize, { "select-settings": "" }, null, _parent2, _scopeId));
            _push2(`</label><div space-y-2${_scopeId}><p font-medium${_scopeId}>${ssrInterpolate(_ctx.$t("settings.interface.color_mode"))}</p>`);
            _push2(ssrRenderComponent(_component_SettingsColorMode, null, null, _parent2, _scopeId));
            _push2(`</div><div space-y-2${_scopeId}><p font-medium${_scopeId}>${ssrInterpolate(_ctx.$t("settings.interface.theme_color"))}</p>`);
            _push2(ssrRenderComponent(_component_SettingsThemeColors, null, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", {
                p6: "",
                flex: "~ col gap6"
              }, [
                createVNode("label", { "space-y-2": "" }, [
                  createVNode("p", { "font-medium": "" }, toDisplayString(_ctx.$t("settings.interface.font_size")), 1),
                  createVNode(_component_SettingsFontSize, { "select-settings": "" })
                ]),
                createVNode("div", { "space-y-2": "" }, [
                  createVNode("p", { "font-medium": "" }, toDisplayString(_ctx.$t("settings.interface.color_mode")), 1),
                  createVNode(_component_SettingsColorMode)
                ]),
                createVNode("div", { "space-y-2": "" }, [
                  createVNode("p", { "font-medium": "" }, toDisplayString(_ctx.$t("settings.interface.theme_color")), 1),
                  createVNode(_component_SettingsThemeColors)
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings/interface/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
