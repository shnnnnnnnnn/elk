import { b as _sfc_main$1 } from './CommonPaginator-BbZe3uv5.mjs';
import { _ as _sfc_main$2 } from './StatusCard-CHVUTCdD.mjs';
import { ar as useHumanReadableNumber, x as usePreferences, c as currentUser, D as getServerName, E as currentServer, l as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, createSlots, withCtx, createVNode, toDisplayString, openBlock, createBlock, createTextVNode, Fragment, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { DynamicScrollerItem } from 'vue-virtual-scroller';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TimelinePaginator",
  __ssrInlineRender: true,
  props: {
    paginator: {},
    stream: {},
    context: {},
    account: {},
    preprocess: { type: Function },
    buffer: { default: 10 },
    endMessage: { type: [Boolean, String], default: true }
  },
  setup(__props) {
    const { formatNumber } = useHumanReadableNumber();
    const virtualScroller = usePreferences("experimentalVirtualScroller");
    const showOriginSite = computed(
      () => __props.account && __props.account.id !== currentUser.value?.account.id && getServerName(__props.account) !== currentServer.value
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonPaginator = _sfc_main$1;
      const _component_StatusCard = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_CommonPaginator, mergeProps({ paginator: _ctx.paginator, stream: _ctx.stream, preprocess: _ctx.preprocess, buffer: _ctx.buffer, endMessage: _ctx.endMessage }, { "virtual-scroller": unref(virtualScroller) }, _attrs), createSlots({
        updater: withCtx(({ number, update }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button id="elk_show_new_items" py-4 border="b base" flex="~ col" p-3 w-full text-primary font-bold${_scopeId}>${ssrInterpolate(_ctx.$t("timeline.show_new_items", number, { named: { v: unref(formatNumber)(number) } }))}</button>`);
          } else {
            return [
              createVNode("button", {
                id: "elk_show_new_items",
                "py-4": "",
                border: "b base",
                flex: "~ col",
                "p-3": "",
                "w-full": "",
                "text-primary": "",
                "font-bold": "",
                onClick: update
              }, toDisplayString(_ctx.$t("timeline.show_new_items", number, { named: { v: unref(formatNumber)(number) } })), 9, ["onClick"])
            ];
          }
        }),
        default: withCtx(({ item, older, newer, active }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(virtualScroller)) {
              _push2(ssrRenderComponent(unref(DynamicScrollerItem), {
                item,
                active,
                tag: "article"
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_StatusCard, {
                      status: item,
                      context: _ctx.context,
                      older,
                      newer
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_StatusCard, {
                        status: item,
                        context: _ctx.context,
                        older,
                        newer
                      }, null, 8, ["status", "context", "older", "newer"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_StatusCard, {
                status: item,
                context: _ctx.context,
                older,
                newer
              }, null, _parent2, _scopeId));
            }
          } else {
            return [
              unref(virtualScroller) ? (openBlock(), createBlock(unref(DynamicScrollerItem), {
                key: 0,
                item,
                active,
                tag: "article"
              }, {
                default: withCtx(() => [
                  createVNode(_component_StatusCard, {
                    status: item,
                    context: _ctx.context,
                    older,
                    newer
                  }, null, 8, ["status", "context", "older", "newer"])
                ]),
                _: 2
              }, 1032, ["item", "active"])) : (openBlock(), createBlock(_component_StatusCard, {
                key: 1,
                status: item,
                context: _ctx.context,
                older,
                newer
              }, null, 8, ["status", "context", "older", "newer"]))
            ];
          }
        }),
        _: 2
      }, [
        _ctx.context === "account" ? {
          name: "done",
          fn: withCtx(({ items }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(showOriginSite) || items.length === 0) {
                _push2(`<div p5 text-secondary text-center flex flex-col items-center gap1${_scopeId}>`);
                if (unref(showOriginSite)) {
                  _push2(`<!--[--><span italic${_scopeId}>${ssrInterpolate(_ctx.$t("timeline.view_older_posts"))}</span>`);
                  _push2(ssrRenderComponent(_component_NuxtLink, {
                    href: _ctx.account.url,
                    target: "_blank",
                    external: "",
                    flex: "~ gap-1",
                    "items-center": "",
                    "text-primary": "",
                    hover: "underline text-primary-active"
                  }, {
                    default: withCtx((_, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div i-ri:external-link-fill${_scopeId2}></div> ${ssrInterpolate(_ctx.$t("menu.open_in_original_site"))}`);
                      } else {
                        return [
                          createVNode("div", { "i-ri:external-link-fill": "" }),
                          createTextVNode(" " + toDisplayString(_ctx.$t("menu.open_in_original_site")), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`<!--]-->`);
                } else if (items.length === 0) {
                  _push2(`<span${_scopeId}>No posts here!</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                unref(showOriginSite) || items.length === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  p5: "",
                  "text-secondary": "",
                  "text-center": "",
                  flex: "",
                  "flex-col": "",
                  "items-center": "",
                  gap1: ""
                }, [
                  unref(showOriginSite) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createVNode("span", { italic: "" }, toDisplayString(_ctx.$t("timeline.view_older_posts")), 1),
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
                  ], 64)) : items.length === 0 ? (openBlock(), createBlock("span", { key: 1 }, "No posts here!")) : createCommentVNode("", true)
                ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/timeline/TimelinePaginator.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
