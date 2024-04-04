import { a3 as cacheAccount, P as _sfc_main$u, l as __nuxt_component_0$1, Q as _sfc_main$t, R as _sfc_main$c, V as _sfc_main$8, I as _sfc_main$i, W as _sfc_main$g } from './server.mjs';
import { defineComponent, createVNode, resolveDynamicComponent, mergeProps, withCtx, withModifiers, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderVNode, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "AccountBigCard",
  __ssrInlineRender: true,
  props: {
    account: {},
    as: { default: "div" }
  },
  setup(__props) {
    cacheAccount(__props.account);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AccountAvatar = _sfc_main$u;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AccountFollowButton = _sfc_main$t;
      const _component_AccountDisplayName = _sfc_main$c;
      const _component_AccountHandle = _sfc_main$8;
      const _component_ContentRich = _sfc_main$i;
      const _component_AccountPostsFollowers = _sfc_main$g;
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.as), mergeProps({
        block: "",
        "focus:outline-none": "",
        "focus-visible:ring": "2 primary"
      }, _ctx.$attrs, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div px2 pt2${_scopeId}><div rounded of-hidden bg="gray-500/20" aspect="3.19"${_scopeId}><img h-full w-full object-cover${ssrRenderAttr("src", _ctx.account.header)}${ssrRenderAttr("alt", _ctx.$t("account.profile_description", [_ctx.account.username]))}${_scopeId}></div></div><div px-4 pb-4 space-y-2${_scopeId}><div flex sm:flex-row flex-col flex-gap-2${_scopeId}><div flex items-center justify-between${_scopeId}><div w-17 h-17 rounded-full border-4 border-bg-base z-2 mt--2 ms--1${_scopeId}>`);
            _push2(ssrRenderComponent(_component_AccountAvatar, { account: _ctx.account }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              block: "",
              "sm:hidden": "",
              href: "javascript:;",
              onClick: () => {
              }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_AccountFollowButton, { account: _ctx.account }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_AccountFollowButton, { account: _ctx.account }, null, 8, ["account"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div sm:mt-2${_scopeId}>`);
            _push2(ssrRenderComponent(_component_AccountDisplayName, {
              account: _ctx.account,
              "font-bold": "",
              "text-lg": "",
              "line-clamp-1": "",
              "ws-pre-wrap": "",
              "break-all": ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_AccountHandle, {
              "text-sm": "",
              account: _ctx.account
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
            if (_ctx.account.note) {
              _push2(`<div max-h-100 overflow-y-auto${_scopeId}>`);
              _push2(ssrRenderComponent(_component_ContentRich, {
                content: _ctx.account.note,
                emojis: _ctx.account.emojis
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div flex justify-between items-center${_scopeId}>`);
            _push2(ssrRenderComponent(_component_AccountPostsFollowers, {
              "text-sm": "",
              account: _ctx.account
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLink, {
              "sm:block": "",
              hidden: "",
              href: "javascript:;",
              onClick: () => {
              }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_AccountFollowButton, { account: _ctx.account }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_AccountFollowButton, { account: _ctx.account }, null, 8, ["account"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", {
                px2: "",
                pt2: ""
              }, [
                createVNode("div", {
                  rounded: "",
                  "of-hidden": "",
                  bg: "gray-500/20",
                  aspect: "3.19"
                }, [
                  createVNode("img", {
                    "h-full": "",
                    "w-full": "",
                    "object-cover": "",
                    src: _ctx.account.header,
                    alt: _ctx.$t("account.profile_description", [_ctx.account.username])
                  }, null, 8, ["src", "alt"])
                ])
              ]),
              createVNode("div", {
                "px-4": "",
                "pb-4": "",
                "space-y-2": ""
              }, [
                createVNode("div", {
                  flex: "",
                  "sm:flex-row": "",
                  "flex-col": "",
                  "flex-gap-2": ""
                }, [
                  createVNode("div", {
                    flex: "",
                    "items-center": "",
                    "justify-between": ""
                  }, [
                    createVNode("div", {
                      "w-17": "",
                      "h-17": "",
                      "rounded-full": "",
                      "border-4": "",
                      "border-bg-base": "",
                      "z-2": "",
                      "mt--2": "",
                      "ms--1": ""
                    }, [
                      createVNode(_component_AccountAvatar, { account: _ctx.account }, null, 8, ["account"])
                    ]),
                    createVNode(_component_NuxtLink, {
                      block: "",
                      "sm:hidden": "",
                      href: "javascript:;",
                      onClick: withModifiers(() => {
                      }, ["stop"])
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_AccountFollowButton, { account: _ctx.account }, null, 8, ["account"])
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  createVNode("div", { "sm:mt-2": "" }, [
                    createVNode(_component_AccountDisplayName, {
                      account: _ctx.account,
                      "font-bold": "",
                      "text-lg": "",
                      "line-clamp-1": "",
                      "ws-pre-wrap": "",
                      "break-all": ""
                    }, null, 8, ["account"]),
                    createVNode(_component_AccountHandle, {
                      "text-sm": "",
                      account: _ctx.account
                    }, null, 8, ["account"])
                  ])
                ]),
                _ctx.account.note ? (openBlock(), createBlock("div", {
                  key: 0,
                  "max-h-100": "",
                  "overflow-y-auto": ""
                }, [
                  createVNode(_component_ContentRich, {
                    content: _ctx.account.note,
                    emojis: _ctx.account.emojis
                  }, null, 8, ["content", "emojis"])
                ])) : createCommentVNode("", true),
                createVNode("div", {
                  flex: "",
                  "justify-between": "",
                  "items-center": ""
                }, [
                  createVNode(_component_AccountPostsFollowers, {
                    "text-sm": "",
                    account: _ctx.account
                  }, null, 8, ["account"]),
                  createVNode(_component_NuxtLink, {
                    "sm:block": "",
                    hidden: "",
                    href: "javascript:;",
                    onClick: withModifiers(() => {
                    }, ["stop"])
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_AccountFollowButton, { account: _ctx.account }, null, 8, ["account"])
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }), _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountBigCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
