import { defineComponent, ref, provide, resolveComponent, mergeProps, unref, withCtx, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { aY as useColorMode, aZ as InjectionKeyDropdownContext } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Dropdown",
  __ssrInlineRender: true,
  props: {
    placement: {},
    autoBoundaryMaxSize: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    const dropdown = ref();
    const colorMode = useColorMode();
    function hide() {
      return dropdown.value.hide();
    }
    provide(InjectionKeyDropdownContext, {
      hide
    });
    __expose({
      hide
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VDropdown = resolveComponent("VDropdown");
      _push(ssrRenderComponent(_component_VDropdown, mergeProps(_ctx.$attrs, {
        ref_key: "dropdown",
        ref: dropdown,
        class: unref(colorMode).value,
        placement: _ctx.placement || "auto",
        "auto-boundary-max-size": _ctx.autoBoundaryMaxSize
      }, _attrs), {
        popper: withCtx((scope, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "popper", scope, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "popper", scope)
            ];
          }
        }),
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
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/dropdown/Dropdown.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
