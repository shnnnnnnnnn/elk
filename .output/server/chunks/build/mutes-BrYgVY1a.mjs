import { e as useI18n, h as useHydratedHead, i as isHydrated, Y as useMastoClient, _ as _sfc_main$2 } from './server.mjs';
import { _ as _sfc_main$3 } from './AccountPaginator-Dkw4dtyf.mjs';
import { useSSRContext, defineComponent, mergeProps, withCtx, createVNode, toDisplayString, unref, openBlock, createBlock, createCommentVNode } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'xss';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'ts-custom-error';
import 'ws';
import 'events-to-async';
import 'lru-cache';
import 'ultrahtml';
import '@iconify/utils';
import 'tiny-decode';
import '@iconify-emoji/twemoji';
import '@iconify/utils/lib/emoji/replace/find';
import 'floating-vue';
import './CommonPaginator-BbZe3uv5.mjs';
import 'vue-virtual-scroller';
import './AccountCard-CqNJdiOX.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TimelineMutes",
  __ssrInlineRender: true,
  setup(__props) {
    const paginator = useMastoClient().v1.mutes.list();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AccountPaginator = _sfc_main$3;
      _push(ssrRenderComponent(_component_AccountPaginator, mergeProps({ paginator: unref(paginator) }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/timeline/TimelineMutes.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "mutes",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useHydratedHead({
      title: () => t("nav.muted_users")
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MainContent = _sfc_main$2;
      const _component_TimelineMutes = _sfc_main$1;
      _push(ssrRenderComponent(_component_MainContent, mergeProps({ back: "" }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span timeline-title-style${_scopeId}>${ssrInterpolate(_ctx.$t("nav.muted_users"))}</span>`);
          } else {
            return [
              createVNode("span", { "timeline-title-style": "" }, toDisplayString(_ctx.$t("nav.muted_users")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) {
              _push2(ssrRenderComponent(_component_TimelineMutes, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) ? (openBlock(), createBlock(_component_TimelineMutes, { key: 0 })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mutes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
