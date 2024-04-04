import { u as useRoute, ag as useRouter, e as useI18n, h as useHydratedHead, i as isHydrated, Y as useMastoClient, a4 as useStreaming, _ as _sfc_main$2, l as __nuxt_component_0$1 } from './server.mjs';
import { _ as __nuxt_component_3 } from './PublishWidget-DoHJnaJO.mjs';
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
import './CommonErrorMessage-CvbJeSnR.mjs';
import './StatusCard-CHVUTCdD.mjs';
import './AccountInlineInfo-s2DIkMwx.mjs';
import './icons-m16uagef.mjs';
import './Dropdown-YHaGe2K7.mjs';
import './CommonPaginator-BbZe3uv5.mjs';
import 'vue-virtual-scroller';
import './translate-B4UXe0Hf.mjs';
import './StatusPreviewCard-C7wSe9bY.mjs';
import 'unlazy';
import 'blurhash';
import './ModalDialog-BaHoBdlt.mjs';
import '@vueuse/integrations/useFocusTrap';
import './CommonCheckbox-D4Ek4LfU.mjs';
import 'iso-639-1';
import 'string-length';
import 'tippy.js';
import './SearchHashtagInfo-DJpkg2KL.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TimelineHome",
  __ssrInlineRender: true,
  setup(__props) {
    const paginator = useMastoClient().v1.timelines.home.list({ limit: 30 });
    const stream = useStreaming((client) => client.user.subscribe());
    function reorderAndFilter(items) {
      return reorderedTimeline(items, "home");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PublishWidget = __nuxt_component_3;
      const _component_TimelinePaginator = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_PublishWidget, {
        "draft-key": "home",
        border: "b base"
      }, null, _parent));
      _push(ssrRenderComponent(_component_TimelinePaginator, mergeProps({ paginator: unref(paginator), stream: unref(stream) }, {
        preprocess: reorderAndFilter,
        context: "home"
      }), null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/timeline/TimelineHome.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "home",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    useRouter();
    const { t } = useI18n();
    useHydratedHead({
      title: () => t("nav.home")
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MainContent = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_TimelineHome = _sfc_main$1;
      _push(ssrRenderComponent(_component_MainContent, _attrs, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/home",
              "timeline-title-style": "",
              flex: "",
              "items-center": "",
              "gap-2": "",
              onClick: _ctx.$scrollToTop
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div i-ri:home-5-line${_scopeId2}></div><span${_scopeId2}>${ssrInterpolate(_ctx.$t("nav.home"))}</span>`);
                } else {
                  return [
                    createVNode("div", { "i-ri:home-5-line": "" }),
                    createVNode("span", null, toDisplayString(_ctx.$t("nav.home")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, {
                to: "/home",
                "timeline-title-style": "",
                flex: "",
                "items-center": "",
                "gap-2": "",
                onClick: _ctx.$scrollToTop
              }, {
                default: withCtx(() => [
                  createVNode("div", { "i-ri:home-5-line": "" }),
                  createVNode("span", null, toDisplayString(_ctx.$t("nav.home")), 1)
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) {
              _push2(ssrRenderComponent(_component_TimelineHome, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) ? (openBlock(), createBlock(_component_TimelineHome, { key: 0 })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
