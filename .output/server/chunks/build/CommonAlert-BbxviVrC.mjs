import { defineComponent, mergeModels, useModel, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CommonAlert",
  __ssrInlineRender: true,
  props: {
    "modelValue": { type: Boolean },
    "modelModifiers": {}
  },
  emits: /* @__PURE__ */ mergeModels(["close"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    useModel(__props, "modelValue");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        flex: "~ gap-2",
        "justify-between": "",
        "items-center": "",
        border: "b base",
        "text-sm": "",
        "text-secondary": "",
        px4: "",
        py2: "",
        "sm:py4": ""
      }, _attrs))}><div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div><button text-xl hover:text-primary bg-hover-overflow w="1.2em" h="1.2em"><div i-ri:close-line></div></button></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/CommonAlert.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
