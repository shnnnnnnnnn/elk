import { b as _sfc_main$1 } from './CommonPaginator-BbZe3uv5.mjs';
import { b5 as _sfc_main$k, b6 as __nuxt_component_2 } from './server.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TagCardPaginator",
  __ssrInlineRender: true,
  props: {
    paginator: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonPaginator = _sfc_main$1;
      const _component_TagCard = _sfc_main$k;
      const _component_TagCardSkeleton = __nuxt_component_2;
      _push(ssrRenderComponent(_component_CommonPaginator, mergeProps({
        paginator: _ctx.paginator,
        "key-prop": "name"
      }, _attrs), {
        default: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_TagCard, {
              tag: item,
              border: "b base"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_TagCard, {
                tag: item,
                border: "b base"
              }, null, 8, ["tag"])
            ];
          }
        }),
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_TagCardSkeleton, { border: "b base" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TagCardSkeleton, { border: "b base" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TagCardSkeleton, {
              border: "b base",
              op50: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TagCardSkeleton, {
              border: "b base",
              op50: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TagCardSkeleton, {
              border: "b base",
              op25: ""
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_TagCardSkeleton, { border: "b base" }),
              createVNode(_component_TagCardSkeleton, { border: "b base" }),
              createVNode(_component_TagCardSkeleton, {
                border: "b base",
                op50: ""
              }),
              createVNode(_component_TagCardSkeleton, {
                border: "b base",
                op50: ""
              }),
              createVNode(_component_TagCardSkeleton, {
                border: "b base",
                op25: ""
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tag/TagCardPaginator.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
