import { defineComponent, mergeModels, useModel, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CommonCheckbox",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    label: {},
    hover: { type: Boolean },
    iconChecked: {},
    iconUnchecked: {},
    checkedIconColor: {},
    prependCheckbox: { type: Boolean }
  }, {
    "modelValue": { type: Boolean },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const modelValue = useModel(__props, "modelValue");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<label${ssrRenderAttrs(mergeProps({
        class: ["common-checkbox flex items-center cursor-pointer py-1 text-md w-full gap-y-1", _ctx.hover ? "hover:bg-active ms--2 px-4 py-2" : null]
      }, _ctx.$attrs, _attrs))}>`);
      if (_ctx.label && !_ctx.prependCheckbox) {
        _push(`<span flex-1 ms-2 pointer-events-none>${ssrInterpolate(_ctx.label)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="${ssrRenderClass([
        modelValue.value ? _ctx.iconChecked ?? "i-ri:checkbox-line" : _ctx.iconUnchecked ?? "i-ri:checkbox-blank-line",
        modelValue.value && _ctx.checkedIconColor
      ])}" text-lg aria-hidden="true"></span><input${ssrIncludeBooleanAttr(Array.isArray(modelValue.value) ? ssrLooseContain(modelValue.value, null) : modelValue.value) ? " checked" : ""} type="checkbox" sr-only>`);
      if (_ctx.label && _ctx.prependCheckbox) {
        _push(`<span flex-1 ms-2 pointer-events-none>${ssrInterpolate(_ctx.label)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</label>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/CommonCheckbox.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
