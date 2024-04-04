import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CommonErrorMessage",
  __ssrInlineRender: true,
  props: {
    describedBy: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        role: "alert",
        "aria-live": "polite",
        "aria-describedby": _ctx.describedBy,
        flex: "~ col",
        "gap-1": "",
        "text-sm": "",
        "pt-1": "",
        "ps-2": "",
        "pe-1": "",
        "pb-2": "",
        "text-red-600": "",
        "dark:text-red-400": "",
        border: "~ base rounded red-600 dark:red-400"
      }, _ctx.$attrs, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/CommonErrorMessage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
