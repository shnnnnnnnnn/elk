import { e as useI18n, h as useHydratedHead, i as isHydrated, Y as useMastoClient, a4 as useStreaming, _ as _sfc_main$2, l as __nuxt_component_0$1 } from './server.mjs';
import { _ as _sfc_main$3 } from './TimelinePaginator-D6qhsp0Y.mjs';
import { useSSRContext, defineComponent, withCtx, createVNode, toDisplayString, unref, openBlock, createBlock, createCommentVNode, mergeProps } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs } from 'vue/server-renderer';
import { r as reorderedTimeline } from './timeline-DRoske77.mjs';
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
import './StatusCard-CHVUTCdD.mjs';
import './AccountInlineInfo-s2DIkMwx.mjs';
import './icons-m16uagef.mjs';
import './Dropdown-YHaGe2K7.mjs';
import './translate-B4UXe0Hf.mjs';
import './StatusPreviewCard-C7wSe9bY.mjs';
import 'unlazy';
import 'blurhash';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TimelinePublic",
  __ssrInlineRender: true,
  setup(__props) {
    const paginator = useMastoClient().v1.timelines.public.list({ limit: 30 });
    const stream = useStreaming((client) => client.public.subscribe());
    function reorderAndFilter(items) {
      return reorderedTimeline(items, "public");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TimelinePaginator = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_TimelinePaginator, mergeProps({ paginator: unref(paginator), stream: unref(stream) }, {
        preprocess: reorderAndFilter,
        context: "public"
      }), null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/timeline/TimelinePublic.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useHydratedHead({
      title: () => t("title.federated_timeline")
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MainContent = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_TimelinePublic = _sfc_main$1;
      _push(ssrRenderComponent(_component_MainContent, _attrs, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/public",
              "timeline-title-style": "",
              flex: "",
              "items-center": "",
              "gap-2": "",
              onClick: _ctx.$scrollToTop
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div i-ri:earth-line${_scopeId2}></div><span${_scopeId2}>${ssrInterpolate(_ctx.$t("title.federated_timeline"))}</span>`);
                } else {
                  return [
                    createVNode("div", { "i-ri:earth-line": "" }),
                    createVNode("span", null, toDisplayString(_ctx.$t("title.federated_timeline")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, {
                to: "/public",
                "timeline-title-style": "",
                flex: "",
                "items-center": "",
                "gap-2": "",
                onClick: _ctx.$scrollToTop
              }, {
                default: withCtx(() => [
                  createVNode("div", { "i-ri:earth-line": "" }),
                  createVNode("span", null, toDisplayString(_ctx.$t("title.federated_timeline")), 1)
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) {
              _push2(ssrRenderComponent(_component_TimelinePublic, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) ? (openBlock(), createBlock(_component_TimelinePublic, { key: 0 })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[[server]]/public/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
