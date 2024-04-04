import { defineComponent, ref, watch, createVNode, resolveDynamicComponent, mergeProps, withCtx, renderSlot, useSSRContext, computed, unref } from 'vue';
import { ssrRenderVNode, ssrRenderSlot, ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { b as unrefElement, b0 as _sfc_main$m, b1 as _sfc_main$l } from './server.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CommonScrollIntoView",
  __ssrInlineRender: true,
  props: {
    as: { default: "div" },
    active: { type: Boolean }
  },
  setup(__props) {
    const el = ref();
    watch(() => __props.active, (active) => {
      const _el = unrefElement(el);
      if (active && _el)
        _el.scrollIntoView({ block: "nearest", inline: "start" });
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.as), mergeProps({
        ref_key: "el",
        ref: el
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/CommonScrollIntoView.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SearchHashtagInfo",
  __ssrInlineRender: true,
  props: {
    hashtag: {}
  },
  setup(__props) {
    const totalTrend = computed(
      () => __props.hashtag.history?.reduce((total, item) => total + (Number(item.accounts) || 0), 0)
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonTrending = _sfc_main$m;
      const _component_CommonTrendingCharts = _sfc_main$l;
      _push(`<div${ssrRenderAttrs(mergeProps({
        flex: "",
        "flex-row": "",
        "items-center": "",
        gap2: "",
        relative: ""
      }, _attrs))}><div w-10 h-10 flex-none rounded-full bg-active flex place-items-center place-content-center><div i-ri:hashtag text-secondary text-lg></div></div><div flex flex-col><span>${ssrInterpolate(_ctx.hashtag.name)}</span>`);
      if (_ctx.hashtag.history) {
        _push(ssrRenderComponent(_component_CommonTrending, {
          history: _ctx.hashtag.history,
          "text-xs": "",
          "text-secondary": "",
          truncate: ""
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(totalTrend) && _ctx.hashtag.history) {
        _push(`<div absolute left-15 right-0 top-0 bottom-4 op35 flex place-items-center place-content-center ml-auto>`);
        _push(ssrRenderComponent(_component_CommonTrendingCharts, {
          history: _ctx.hashtag.history,
          width: 150,
          height: 20,
          "text-xs": "",
          "text-secondary": "",
          "h-full": "",
          "w-full": ""
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/search/SearchHashtagInfo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$1 as _, _sfc_main as a };
