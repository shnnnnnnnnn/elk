import { bi as useBuildInfo, e as useI18n, h as useHydratedHead, d as useFormattedDateTime, i as isHydrated, bj as openPreviewHelp, bk as elkTeamMembers, _ as _sfc_main$2 } from './server.mjs';
import { _ as _sfc_main$1 } from './SettingsItem-BFthfYno.mjs';
import { defineAsyncComponent, defineComponent, ref, mergeProps, withCtx, createVNode, toDisplayString, unref, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
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

const __nuxt_component_2_lazy = defineAsyncComponent(() => import('./SettingsSponsorsList-fTkvn6ie.mjs').then((c) => c.default || c));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const buildInfo = useBuildInfo();
    const { t } = useI18n();
    useHydratedHead({
      title: () => `${t("settings.about.label")} | ${t("nav.settings")}`
    });
    const showCommit = ref(buildInfo.env !== "release" && buildInfo.env !== "dev");
    const builtTime = useFormattedDateTime(buildInfo.time);
    function handleShowCommit() {
      setTimeout(() => {
        showCommit.value = true;
      }, 50);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MainContent = _sfc_main$2;
      const _component_SettingsItem = _sfc_main$1;
      const _component_LazySettingsSponsorsList = __nuxt_component_2_lazy;
      _push(ssrRenderComponent(_component_MainContent, mergeProps({ "back-on-small-screen": "" }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div text-lg font-bold flex items-center gap-2${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.$t("settings.about.label"))}</span></div>`);
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
                createVNode("span", null, toDisplayString(_ctx.$t("settings.about.label")), 1)
              ], 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div flex="~ col gap4" w-full items-center justify-center my5${_scopeId}><img${ssrRenderAttr("alt", _ctx.$t("app_logo"))}${ssrRenderAttr("src", `${""}/logo.svg`)} w-24 h-24 class="rtl-flip"${_scopeId}><p text-lg${_scopeId}>${ssrInterpolate(_ctx.$t("app_desc_short"))}</p></div>`);
            if ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(_component_SettingsItem, {
                text: _ctx.$t("settings.about.version"),
                to: unref(showCommit) ? `https://github.com/elk-zone/elk/commit/${unref(buildInfo).commit}` : void 0,
                external: "",
                target: "_blank",
                onClick: handleShowCommit
              }, {
                content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div font-mono${_scopeId2}><span${_scopeId2}>${ssrInterpolate(unref(buildInfo).env === "release" ? `v${unref(buildInfo).version}` : unref(buildInfo).env)}</span>`);
                    if (unref(showCommit)) {
                      _push3(`<span${_scopeId2}> (${ssrInterpolate(unref(buildInfo).shortCommit)}@${ssrInterpolate(unref(buildInfo).branch)})</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { "font-mono": "" }, [
                        createVNode("span", null, toDisplayString(unref(buildInfo).env === "release" ? `v${unref(buildInfo).version}` : unref(buildInfo).env), 1),
                        unref(showCommit) ? (openBlock(), createBlock("span", { key: 0 }, " (" + toDisplayString(unref(buildInfo).shortCommit) + "@" + toDisplayString(unref(buildInfo).branch) + ")", 1)) : createCommentVNode("", true)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_SettingsItem, {
                text: _ctx.$t("settings.about.built_at"),
                content: unref(builtTime)
              }, null, _parent2, _scopeId));
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div h-1px bg-border my2${_scopeId}></div>`);
            _push2(ssrRenderComponent(_component_SettingsItem, {
              text: _ctx.$t("nav.show_intro"),
              icon: "i-ri:article-line",
              "cursor-pointer": "",
              large: "",
              onClick: "openPreviewHelp" in _ctx ? _ctx.openPreviewHelp : unref(openPreviewHelp)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SettingsItem, {
              text: _ctx.$t("nav.docs"),
              icon: "i-ri:book-open-line",
              to: "https://docs.elk.zone/",
              large: "",
              target: "_blank"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SettingsItem, {
              text: "Mastodon",
              icon: "i-ri:mastodon-line",
              to: "/m.webtoo.ls/@elk",
              large: "",
              target: "_blank"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SettingsItem, {
              text: "Discord",
              icon: "i-ri:discord-fill",
              to: "https://chat.elk.zone",
              external: "",
              large: "",
              target: "_blank"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SettingsItem, {
              text: "GitHub",
              icon: "i-ri:github-fill",
              to: "https://github.com/elk-zone/elk",
              external: "",
              large: "",
              target: "_blank"
            }, null, _parent2, _scopeId));
            _push2(`<div h-1px bg-border my2${_scopeId}></div><p px5 py3 font-bold text-lg${_scopeId}>${ssrInterpolate(_ctx.$t("settings.about.sponsors"))}</p><p px5 text-secondary${_scopeId}>${ssrInterpolate(_ctx.$t("settings.about.sponsors_body_1"))}</p>`);
            _push2(ssrRenderComponent(_component_LazySettingsSponsorsList, null, null, _parent2, _scopeId));
            _push2(`<p px5 mb1 text-secondary${_scopeId}>${ssrInterpolate(_ctx.$t("settings.about.sponsors_body_2"))}</p><p px5 mb2 text-secondary${_scopeId}>${ssrInterpolate(_ctx.$t("settings.about.sponsors_body_3"))}</p>`);
            _push2(ssrRenderComponent(_component_SettingsItem, {
              text: _ctx.$t("settings.about.sponsor_action"),
              to: "https://github.com/sponsors/elk-zone",
              description: _ctx.$t("settings.about.sponsor_action_desc"),
              external: "",
              large: "",
              target: "_blank"
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div i-ri-heart-3-fill text-rose rounded-full w-8 h-8 height="32" width="32"${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode("div", {
                      "i-ri-heart-3-fill": "",
                      "text-rose": "",
                      "rounded-full": "",
                      "w-8": "",
                      "h-8": "",
                      height: "32",
                      width: "32"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div h-1px bg-border my2${_scopeId}></div>`);
            if ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) {
              _push2(`<!--[--><p px5 py3 font-bold text-lg${_scopeId}>${ssrInterpolate(_ctx.$t("settings.about.meet_the_team"))}</p><!--[-->`);
              ssrRenderList("elkTeamMembers" in _ctx ? _ctx.elkTeamMembers : unref(elkTeamMembers), (team) => {
                _push2(ssrRenderComponent(_component_SettingsItem, {
                  key: team.github,
                  text: team.display,
                  to: team.link,
                  external: "",
                  target: "_blank"
                }, {
                  icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<img${ssrRenderAttr("src", `/avatars/${team.github}-60x60.png`)}${ssrRenderAttr("alt", team.display)} rounded-full w-8 h-8 height="32" width="32"${_scopeId2}>`);
                    } else {
                      return [
                        createVNode("img", {
                          src: `/avatars/${team.github}-60x60.png`,
                          alt: team.display,
                          "rounded-full": "",
                          "w-8": "",
                          "h-8": "",
                          height: "32",
                          width: "32"
                        }, null, 8, ["src", "alt"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", {
                flex: "~ col gap4",
                "w-full": "",
                "items-center": "",
                "justify-center": "",
                my5: ""
              }, [
                createVNode("img", {
                  alt: _ctx.$t("app_logo"),
                  src: `${""}/logo.svg`,
                  "w-24": "",
                  "h-24": "",
                  class: "rtl-flip"
                }, null, 8, ["alt", "src"]),
                createVNode("p", { "text-lg": "" }, toDisplayString(_ctx.$t("app_desc_short")), 1)
              ]),
              ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                createVNode(_component_SettingsItem, {
                  text: _ctx.$t("settings.about.version"),
                  to: unref(showCommit) ? `https://github.com/elk-zone/elk/commit/${unref(buildInfo).commit}` : void 0,
                  external: "",
                  target: "_blank",
                  onClick: handleShowCommit
                }, {
                  content: withCtx(() => [
                    createVNode("div", { "font-mono": "" }, [
                      createVNode("span", null, toDisplayString(unref(buildInfo).env === "release" ? `v${unref(buildInfo).version}` : unref(buildInfo).env), 1),
                      unref(showCommit) ? (openBlock(), createBlock("span", { key: 0 }, " (" + toDisplayString(unref(buildInfo).shortCommit) + "@" + toDisplayString(unref(buildInfo).branch) + ")", 1)) : createCommentVNode("", true)
                    ])
                  ]),
                  _: 1
                }, 8, ["text", "to"]),
                createVNode(_component_SettingsItem, {
                  text: _ctx.$t("settings.about.built_at"),
                  content: unref(builtTime)
                }, null, 8, ["text", "content"])
              ], 64)) : createCommentVNode("", true),
              createVNode("div", {
                "h-1px": "",
                "bg-border": "",
                my2: ""
              }),
              createVNode(_component_SettingsItem, {
                text: _ctx.$t("nav.show_intro"),
                icon: "i-ri:article-line",
                "cursor-pointer": "",
                large: "",
                onClick: "openPreviewHelp" in _ctx ? _ctx.openPreviewHelp : unref(openPreviewHelp)
              }, null, 8, ["text", "onClick"]),
              createVNode(_component_SettingsItem, {
                text: _ctx.$t("nav.docs"),
                icon: "i-ri:book-open-line",
                to: "https://docs.elk.zone/",
                large: "",
                target: "_blank"
              }, null, 8, ["text"]),
              createVNode(_component_SettingsItem, {
                text: "Mastodon",
                icon: "i-ri:mastodon-line",
                to: "/m.webtoo.ls/@elk",
                large: "",
                target: "_blank"
              }),
              createVNode(_component_SettingsItem, {
                text: "Discord",
                icon: "i-ri:discord-fill",
                to: "https://chat.elk.zone",
                external: "",
                large: "",
                target: "_blank"
              }),
              createVNode(_component_SettingsItem, {
                text: "GitHub",
                icon: "i-ri:github-fill",
                to: "https://github.com/elk-zone/elk",
                external: "",
                large: "",
                target: "_blank"
              }),
              createVNode("div", {
                "h-1px": "",
                "bg-border": "",
                my2: ""
              }),
              createVNode("p", {
                px5: "",
                py3: "",
                "font-bold": "",
                "text-lg": ""
              }, toDisplayString(_ctx.$t("settings.about.sponsors")), 1),
              createVNode("p", {
                px5: "",
                "text-secondary": ""
              }, toDisplayString(_ctx.$t("settings.about.sponsors_body_1")), 1),
              createVNode(_component_LazySettingsSponsorsList),
              createVNode("p", {
                px5: "",
                mb1: "",
                "text-secondary": ""
              }, toDisplayString(_ctx.$t("settings.about.sponsors_body_2")), 1),
              createVNode("p", {
                px5: "",
                mb2: "",
                "text-secondary": ""
              }, toDisplayString(_ctx.$t("settings.about.sponsors_body_3")), 1),
              createVNode(_component_SettingsItem, {
                text: _ctx.$t("settings.about.sponsor_action"),
                to: "https://github.com/sponsors/elk-zone",
                description: _ctx.$t("settings.about.sponsor_action_desc"),
                external: "",
                large: "",
                target: "_blank"
              }, {
                icon: withCtx(() => [
                  createVNode("div", {
                    "i-ri-heart-3-fill": "",
                    "text-rose": "",
                    "rounded-full": "",
                    "w-8": "",
                    "h-8": "",
                    height: "32",
                    width: "32"
                  })
                ]),
                _: 1
              }, 8, ["text", "description"]),
              createVNode("div", {
                "h-1px": "",
                "bg-border": "",
                my2: ""
              }),
              ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                createVNode("p", {
                  px5: "",
                  py3: "",
                  "font-bold": "",
                  "text-lg": ""
                }, toDisplayString(_ctx.$t("settings.about.meet_the_team")), 1),
                (openBlock(true), createBlock(Fragment, null, renderList("elkTeamMembers" in _ctx ? _ctx.elkTeamMembers : unref(elkTeamMembers), (team) => {
                  return openBlock(), createBlock(_component_SettingsItem, {
                    key: team.github,
                    text: team.display,
                    to: team.link,
                    external: "",
                    target: "_blank"
                  }, {
                    icon: withCtx(() => [
                      createVNode("img", {
                        src: `/avatars/${team.github}-60x60.png`,
                        alt: team.display,
                        "rounded-full": "",
                        "w-8": "",
                        "h-8": "",
                        height: "32",
                        width: "32"
                      }, null, 8, ["src", "alt"])
                    ]),
                    _: 2
                  }, 1032, ["text", "to"]);
                }), 128))
              ], 64)) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings/about/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
