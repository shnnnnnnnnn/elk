import { e as useI18n, h as useHydratedHead, c as currentUser, q as useUserSettings, _ as _sfc_main$2$1, l as __nuxt_component_0$1 } from './server.mjs';
import { useSSRContext, defineComponent, withAsyncContext, computed, mergeProps, withCtx, createVNode, toDisplayString, unref, createTextVNode, openBlock, createBlock, createCommentVNode, ref } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _sfc_main$3 } from './SettingsItem-BFthfYno.mjs';
import { _ as _sfc_main$4 } from './CommonCheckbox-D4Ek4LfU.mjs';
import ISO6391 from 'iso-639-1';
import { s as supportedTranslationCodes } from './translate-B4UXe0Hf.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SettingsLanguage",
  __ssrInlineRender: true,
  setup(__props) {
    const userSettings = useUserSettings();
    const { locales } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<select${ssrRenderAttrs(_attrs)}><!--[-->`);
      ssrRenderList(unref(locales), (item) => {
        _push(`<option${ssrRenderAttr("value", item.code)}${ssrIncludeBooleanAttr(unref(userSettings).language === item.code) ? " selected" : ""}>${ssrInterpolate(item.name)}</option>`);
      });
      _push(`<!--]--></select>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/SettingsLanguage.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SettingsTranslations",
  __ssrInlineRender: true,
  setup(__props) {
    const supportedTranslationLanguages = ISO6391.getLanguages([...supportedTranslationCodes]);
    const userSettings = useUserSettings();
    ref(null);
    const availableOptions = computed(() => {
      return Object.values(supportedTranslationLanguages).filter((value) => {
        return !userSettings.value.disabledTranslationLanguages.includes(value.code);
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonCheckbox = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_CommonCheckbox, {
        modelValue: unref(userSettings).preferences.hideTranslation,
        "onUpdate:modelValue": ($event) => unref(userSettings).preferences.hideTranslation = $event,
        label: _ctx.$t("settings.preferences.hide_translation")
      }, null, _parent));
      if (!unref(userSettings).preferences.hideTranslation) {
        _push(`<div class="mt-1 ms-2"><p class="mb-2">${ssrInterpolate(_ctx.$t("settings.language.translations.hide_specific"))}</p><div class="ms-4"><ul><!--[-->`);
        ssrRenderList(unref(userSettings).disabledTranslationLanguages, (langCode) => {
          _push(`<li class="flex items-center"><div>${ssrInterpolate(unref(ISO6391).getNativeName(langCode))}</div><button class="btn-text" type="button"${ssrRenderAttr("title", _ctx.$t("settings.language.translations.remove"))}><span class="block i-ri:close-line" aria-hidden="true"></span></button></li>`);
        });
        _push(`<!--]--></ul><div class="flex items-center mt-2"><select class="select-settings"><option disabled selected${ssrRenderAttr("value", null)}>${ssrInterpolate(_ctx.$t("settings.language.translations.choose_language"))}</option><!--[-->`);
        ssrRenderList(unref(availableOptions), (availableOption) => {
          _push(`<option${ssrRenderAttr("value", availableOption.code)}>${ssrInterpolate(availableOption.nativeName)}</option>`);
        });
        _push(`<!--]--></select><button class="btn-text shrink-0">${ssrInterpolate(_ctx.$t("settings.language.translations.add"))}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/SettingsTranslations.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { t, locale } = useI18n();
    const translationStatus = ([__temp, __restore] = withAsyncContext(() => import('./elk-translation-status-5z4wY0Kj.mjs').then((m) => m.default)), __temp = await __temp, __restore(), __temp);
    useHydratedHead({
      title: () => `${t("settings.language.label")} | ${t("nav.settings")}`
    });
    const status = computed(() => {
      const entry = translationStatus.locales[locale.value];
      return t("settings.language.status", [entry.total, translationStatus.total, entry.percentage]);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MainContent = _sfc_main$2$1;
      const _component_SettingsLanguage = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_SettingsItem = _sfc_main$3;
      const _component_SettingsTranslations = _sfc_main$1;
      _push(ssrRenderComponent(_component_MainContent, mergeProps({ "back-on-small-screen": "" }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div text-lg font-bold flex items-center gap-2${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.$t("settings.language.label"))}</span></div>`);
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
                createVNode("span", null, toDisplayString(_ctx.$t("settings.language.label")), 1)
              ], 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div p6${_scopeId}><div space-y-2${_scopeId}><h2 py2 font-bold text-xl flex="~ gap-1" items-center${_scopeId}>${ssrInterpolate(_ctx.$t("settings.language.display_language"))}</h2><div${_scopeId}>${ssrInterpolate(unref(status))}</div>`);
            _push2(ssrRenderComponent(_component_SettingsLanguage, { "select-settings": "" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLink, {
              href: "https://docs.elk.zone/guide/contributing",
              target: "_blank",
              "hover:underline": "",
              "text-primary": "",
              "inline-flex": "",
              "items-center": "",
              "gap-1": ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span inline-block i-ri:information-line${_scopeId2}></span> ${ssrInterpolate(_ctx.$t("settings.language.how_to_contribute"))}`);
                } else {
                  return [
                    createVNode("span", {
                      "inline-block": "",
                      "i-ri:information-line": ""
                    }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("settings.language.how_to_contribute")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div mt4${_scopeId}><h2 font-bold text-xl flex="~ gap-1" items-center${_scopeId}>${ssrInterpolate(_ctx.$t("settings.language.post_language"))}</h2>`);
            if ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)) {
              _push2(ssrRenderComponent(_component_SettingsItem, {
                command: "",
                large: "",
                icon: "i-ri:quill-pen-line",
                text: _ctx.$t("settings.language.post_language"),
                description: _ctx.$t("settings.account_settings.description"),
                to: `https://${("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)).server}/settings/preferences/other`,
                external: "",
                target: "_blank"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><h2 py4 mt2 font-bold text-xl flex="~ gap-1" items-center${_scopeId}>${ssrInterpolate(_ctx.$t("settings.language.translations.heading"))}</h2>`);
            _push2(ssrRenderComponent(_component_SettingsTranslations, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { p6: "" }, [
                createVNode("div", { "space-y-2": "" }, [
                  createVNode("h2", {
                    py2: "",
                    "font-bold": "",
                    "text-xl": "",
                    flex: "~ gap-1",
                    "items-center": ""
                  }, toDisplayString(_ctx.$t("settings.language.display_language")), 1),
                  createVNode("div", null, toDisplayString(unref(status)), 1),
                  createVNode(_component_SettingsLanguage, { "select-settings": "" }),
                  createVNode(_component_NuxtLink, {
                    href: "https://docs.elk.zone/guide/contributing",
                    target: "_blank",
                    "hover:underline": "",
                    "text-primary": "",
                    "inline-flex": "",
                    "items-center": "",
                    "gap-1": ""
                  }, {
                    default: withCtx(() => [
                      createVNode("span", {
                        "inline-block": "",
                        "i-ri:information-line": ""
                      }),
                      createTextVNode(" " + toDisplayString(_ctx.$t("settings.language.how_to_contribute")), 1)
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { mt4: "" }, [
                  createVNode("h2", {
                    "font-bold": "",
                    "text-xl": "",
                    flex: "~ gap-1",
                    "items-center": ""
                  }, toDisplayString(_ctx.$t("settings.language.post_language")), 1),
                  ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)) ? (openBlock(), createBlock(_component_SettingsItem, {
                    key: 0,
                    command: "",
                    large: "",
                    icon: "i-ri:quill-pen-line",
                    text: _ctx.$t("settings.language.post_language"),
                    description: _ctx.$t("settings.account_settings.description"),
                    to: `https://${("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)).server}/settings/preferences/other`,
                    external: "",
                    target: "_blank"
                  }, null, 8, ["text", "description", "to"])) : createCommentVNode("", true)
                ]),
                createVNode("h2", {
                  py4: "",
                  mt2: "",
                  "font-bold": "",
                  "text-xl": "",
                  flex: "~ gap-1",
                  "items-center": ""
                }, toDisplayString(_ctx.$t("settings.language.translations.heading")), 1),
                createVNode(_component_SettingsTranslations)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings/language/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
