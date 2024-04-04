import { b as _sfc_main$1 } from './CommonPaginator-BbZe3uv5.mjs';
import { _ as _sfc_main$2 } from './AccountCard-CqNJdiOX.mjs';
import { c as currentUser, D as getServerName, E as currentServer, l as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, computed, mergeProps, createSlots, withCtx, createVNode, unref, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AccountPaginator",
  __ssrInlineRender: true,
  props: {
    paginator: {},
    context: {},
    account: {},
    relationshipContext: {}
  },
  setup(__props) {
    const fallbackContext = computed(() => {
      return ["following", "followers"].includes(__props.context);
    });
    const showOriginSite = computed(
      () => __props.account && __props.account.id !== currentUser.value?.account.id && getServerName(__props.account) !== currentServer.value
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonPaginator = _sfc_main$1;
      const _component_AccountCard = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_CommonPaginator, mergeProps({ paginator: _ctx.paginator }, _attrs), createSlots({
        default: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_AccountCard, {
              account: item,
              "relationship-context": _ctx.relationshipContext,
              "hover-card": "",
              border: "b base",
              py2: "",
              px4: ""
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_AccountCard, {
                account: item,
                "relationship-context": _ctx.relationshipContext,
                "hover-card": "",
                border: "b base",
                py2: "",
                px4: ""
              }, null, 8, ["account", "relationship-context"])
            ];
          }
        }),
        _: 2
      }, [
        unref(fallbackContext) && unref(showOriginSite) ? {
          name: "done",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div p5 text-secondary text-center flex flex-col items-center gap1${_scopeId}><span italic${_scopeId}>${ssrInterpolate(_ctx.$t(`account.view_other_${_ctx.context}`))}</span>`);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                href: _ctx.account.url,
                target: "_blank",
                external: "",
                flex: "~ gap-1",
                "items-center": "",
                "text-primary": "",
                hover: "underline text-primary-active"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div i-ri:external-link-fill${_scopeId2}></div> ${ssrInterpolate(_ctx.$t("menu.open_in_original_site"))}`);
                  } else {
                    return [
                      createVNode("div", { "i-ri:external-link-fill": "" }),
                      createTextVNode(" " + toDisplayString(_ctx.$t("menu.open_in_original_site")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", {
                  p5: "",
                  "text-secondary": "",
                  "text-center": "",
                  flex: "",
                  "flex-col": "",
                  "items-center": "",
                  gap1: ""
                }, [
                  createVNode("span", { italic: "" }, toDisplayString(_ctx.$t(`account.view_other_${_ctx.context}`)), 1),
                  createVNode(_component_NuxtLink, {
                    href: _ctx.account.url,
                    target: "_blank",
                    external: "",
                    flex: "~ gap-1",
                    "items-center": "",
                    "text-primary": "",
                    hover: "underline text-primary-active"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { "i-ri:external-link-fill": "" }),
                      createTextVNode(" " + toDisplayString(_ctx.$t("menu.open_in_original_site")), 1)
                    ]),
                    _: 1
                  }, 8, ["href"])
                ])
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountPaginator.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
