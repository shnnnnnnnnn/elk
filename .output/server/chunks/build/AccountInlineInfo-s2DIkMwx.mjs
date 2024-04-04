import { q as useUserSettings, k as getAccountRoute, s as getPreferences, m as _sfc_main$e, l as __nuxt_component_0$1, P as _sfc_main$u, R as _sfc_main$c } from './server.mjs';
import { defineComponent, mergeProps, withCtx, unref, openBlock, createBlock, createCommentVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';

const __default__ = {
  inheritAttrs: false
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __name: "AccountInlineInfo",
  __ssrInlineRender: true,
  props: {
    account: {},
    link: { type: Boolean, default: true },
    avatar: { type: Boolean, default: true }
  },
  setup(__props) {
    const userSettings = useUserSettings();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AccountHoverWrapper = _sfc_main$e;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AccountAvatar = _sfc_main$u;
      const _component_AccountDisplayName = _sfc_main$c;
      _push(ssrRenderComponent(_component_AccountHoverWrapper, mergeProps({ account: _ctx.account }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, mergeProps({
              to: _ctx.link ? ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(_ctx.account) : void 0,
              class: _ctx.link ? "text-link-rounded -ml-1.5rem pl-1.5rem rtl-ml0 rtl-pl-0.5rem rtl--mr-1.5rem rtl-pr-1.5rem" : ""
            }, _ctx.$attrs, {
              "min-w-0": "",
              flex: "",
              "gap-2": "",
              "items-center": ""
            }), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (_ctx.avatar) {
                    _push3(ssrRenderComponent(_component_AccountAvatar, {
                      account: _ctx.account,
                      "w-5": "",
                      "h-5": ""
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_component_AccountDisplayName, {
                    account: _ctx.account,
                    "hide-emojis": ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideUsernameEmojis"),
                    "line-clamp-1": "",
                    "ws-pre-wrap": "",
                    "break-all": ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    _ctx.avatar ? (openBlock(), createBlock(_component_AccountAvatar, {
                      key: 0,
                      account: _ctx.account,
                      "w-5": "",
                      "h-5": ""
                    }, null, 8, ["account"])) : createCommentVNode("", true),
                    createVNode(_component_AccountDisplayName, {
                      account: _ctx.account,
                      "hide-emojis": ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideUsernameEmojis"),
                      "line-clamp-1": "",
                      "ws-pre-wrap": "",
                      "break-all": ""
                    }, null, 8, ["account", "hide-emojis"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, mergeProps({
                to: _ctx.link ? ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(_ctx.account) : void 0,
                class: _ctx.link ? "text-link-rounded -ml-1.5rem pl-1.5rem rtl-ml0 rtl-pl-0.5rem rtl--mr-1.5rem rtl-pr-1.5rem" : ""
              }, _ctx.$attrs, {
                "min-w-0": "",
                flex: "",
                "gap-2": "",
                "items-center": ""
              }), {
                default: withCtx(() => [
                  _ctx.avatar ? (openBlock(), createBlock(_component_AccountAvatar, {
                    key: 0,
                    account: _ctx.account,
                    "w-5": "",
                    "h-5": ""
                  }, null, 8, ["account"])) : createCommentVNode("", true),
                  createVNode(_component_AccountDisplayName, {
                    account: _ctx.account,
                    "hide-emojis": ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideUsernameEmojis"),
                    "line-clamp-1": "",
                    "ws-pre-wrap": "",
                    "break-all": ""
                  }, null, 8, ["account", "hide-emojis"])
                ]),
                _: 1
              }, 16, ["to", "class"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountInlineInfo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
