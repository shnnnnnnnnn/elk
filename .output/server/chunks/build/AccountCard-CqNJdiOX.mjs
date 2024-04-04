import { a3 as cacheAccount, k as getAccountRoute, n as _sfc_main$7, Q as _sfc_main$t } from './server.mjs';
import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AccountCard",
  __ssrInlineRender: true,
  props: {
    account: {},
    hoverCard: { type: Boolean },
    relationshipContext: {}
  },
  setup(__props) {
    cacheAccount(__props.account);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AccountInfo = _sfc_main$7;
      const _component_AccountFollowButton = _sfc_main$t;
      _push(`<div${ssrRenderAttrs(mergeProps({
        flex: "",
        "justify-between": "",
        "hover:bg-active": "",
        "transition-100": ""
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_AccountInfo, {
        account: _ctx.account,
        hover: "",
        p1: "",
        as: "router-link",
        "hover-card": _ctx.hoverCard,
        shrink: "",
        "overflow-hidden": "",
        to: ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(_ctx.account)
      }, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(`<div h-full p1 shrink-0>`);
        _push(ssrRenderComponent(_component_AccountFollowButton, {
          account: _ctx.account,
          context: _ctx.relationshipContext
        }, null, _parent));
        _push(`</div>`);
      }, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
