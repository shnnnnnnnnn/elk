import { p as useRelationship, a as useMasto, M as _sfc_main$o } from './server.mjs';
import { defineComponent, createPropsRestProxy, computed, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AccountFollowRequestButton",
  __ssrInlineRender: true,
  props: {
    account: {},
    relationship: {}
  },
  setup(__props) {
    const props = createPropsRestProxy(__props, ["account"]);
    const relationship = computed(() => props.relationship || useRelationship(__props.account).value);
    const { client } = useMasto();
    async function authorizeFollowRequest() {
      relationship.value.requestedBy = false;
      relationship.value.followedBy = true;
      try {
        const newRel = await client.value.v1.followRequests.$select(__props.account.id).authorize();
        Object.assign(relationship, newRel);
      } catch (err) {
        console.error(err);
        relationship.value.requestedBy = true;
        relationship.value.followedBy = false;
      }
    }
    async function rejectFollowRequest() {
      relationship.value.requestedBy = false;
      try {
        const newRel = await client.value.v1.followRequests.$select(__props.account.id).reject();
        Object.assign(relationship, newRel);
      } catch (err) {
        console.error(err);
        relationship.value.requestedBy = true;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonTooltip = _sfc_main$o;
      _push(`<div${ssrRenderAttrs(mergeProps({
        flex: "",
        "gap-4": ""
      }, _attrs))}>`);
      if (unref(relationship)?.requestedBy) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_CommonTooltip, {
          content: _ctx.$t("account.authorize"),
          "no-auto-focus": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button type="button" rounded-full text-sm p2 border-1 hover:text-green transition-colors${_scopeId}><span block text-current i-ri:check-fill${_scopeId}></span></button>`);
            } else {
              return [
                createVNode("button", {
                  type: "button",
                  "rounded-full": "",
                  "text-sm": "",
                  p2: "",
                  "border-1": "",
                  "hover:text-green": "",
                  "transition-colors": "",
                  onClick: authorizeFollowRequest
                }, [
                  createVNode("span", {
                    block: "",
                    "text-current": "",
                    "i-ri:check-fill": ""
                  })
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_CommonTooltip, {
          content: _ctx.$t("account.reject"),
          "no-auto-focus": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button type="button" rounded-full text-sm p2 border-1 hover:text-red transition-colors${_scopeId}><span block text-current i-ri:close-fill${_scopeId}></span></button>`);
            } else {
              return [
                createVNode("button", {
                  type: "button",
                  "rounded-full": "",
                  "text-sm": "",
                  p2: "",
                  "border-1": "",
                  "hover:text-red": "",
                  "transition-colors": "",
                  onClick: rejectFollowRequest
                }, [
                  createVNode("span", {
                    block: "",
                    "text-current": "",
                    "i-ri:close-fill": ""
                  })
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<span text-secondary>${ssrInterpolate(unref(relationship)?.followedBy ? _ctx.$t("account.authorized") : _ctx.$t("account.rejected"))}</span>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountFollowRequestButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
