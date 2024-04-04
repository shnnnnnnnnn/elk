import { e as useI18n, h as useHydratedHead, bo as useUsers, _ as _sfc_main$2, n as _sfc_main$7 } from './server.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, toDisplayString, unref, openBlock, createBlock, Fragment, renderList, createTextVNode, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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
      title: () => `${t("settings.users.label")} | ${t("nav.settings")}`
    });
    const loggedInUsers = useUsers();
    async function exportTokens() {
      return;
    }
    async function importTokens() {
      return;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MainContent = _sfc_main$2;
      const _component_AccountInfo = _sfc_main$7;
      _push(ssrRenderComponent(_component_MainContent, mergeProps({ "back-on-small-screen": "" }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div text-lg font-bold flex items-center gap-2${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.$t("settings.users.label"))}</span></div>`);
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
                createVNode("span", null, toDisplayString(_ctx.$t("settings.users.label")), 1)
              ], 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div p6${_scopeId}>`);
            if (unref(loggedInUsers).length) {
              _push2(`<!--[--><div flex="~ col gap2"${_scopeId}><!--[-->`);
              ssrRenderList(unref(loggedInUsers), (user) => {
                _push2(`<div${_scopeId}>`);
                _push2(ssrRenderComponent(_component_AccountInfo, {
                  account: user.account,
                  "hover-card": false
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]--></div><div my4 border="t base"${_scopeId}></div><button btn-text flex="~ gap-2" items-center${_scopeId}><span block i-ri-download-2-line${_scopeId}></span> ${ssrInterpolate(_ctx.$t("settings.users.export"))}</button><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button btn-text flex="~ gap-2" items-center${_scopeId}><span block i-ri-upload-2-line${_scopeId}></span> ${ssrInterpolate(_ctx.$t("settings.users.import"))}</button></div>`);
          } else {
            return [
              createVNode("div", { p6: "" }, [
                unref(loggedInUsers).length ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  createVNode("div", { flex: "~ col gap2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(loggedInUsers), (user) => {
                      return openBlock(), createBlock("div", {
                        key: user.account.id
                      }, [
                        createVNode(_component_AccountInfo, {
                          account: user.account,
                          "hover-card": false
                        }, null, 8, ["account"])
                      ]);
                    }), 128))
                  ]),
                  createVNode("div", {
                    my4: "",
                    border: "t base"
                  }),
                  createVNode("button", {
                    "btn-text": "",
                    flex: "~ gap-2",
                    "items-center": "",
                    onClick: exportTokens
                  }, [
                    createVNode("span", {
                      block: "",
                      "i-ri-download-2-line": ""
                    }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("settings.users.export")), 1)
                  ])
                ], 64)) : createCommentVNode("", true),
                createVNode("button", {
                  "btn-text": "",
                  flex: "~ gap-2",
                  "items-center": "",
                  onClick: importTokens
                }, [
                  createVNode("span", {
                    block: "",
                    "i-ri-upload-2-line": ""
                  }),
                  createTextVNode(" " + toDisplayString(_ctx.$t("settings.users.import")), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings/users/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
