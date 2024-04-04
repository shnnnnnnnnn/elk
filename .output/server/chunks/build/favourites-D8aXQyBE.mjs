import { e as useI18n, x as usePreferences, h as useHydratedHead, i as isHydrated, Y as useMastoClient, _ as _sfc_main$2, l as __nuxt_component_0$1 } from './server.mjs';
import { _ as _sfc_main$3 } from './TimelinePaginator-D6qhsp0Y.mjs';
import { useSSRContext, defineComponent, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, mergeProps } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "TimelineFavourites",
  __ssrInlineRender: true,
  setup(__props) {
    const paginator = useMastoClient().v1.favourites.list();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TimelinePaginator = _sfc_main$3;
      _push(ssrRenderComponent(_component_TimelinePaginator, mergeProps({
        "end-message": "common.no_favourites",
        paginator: unref(paginator)
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/timeline/TimelineFavourites.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "favourites",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const useStarFavoriteIcon = usePreferences("useStarFavoriteIcon");
    useHydratedHead({
      title: () => t("nav.favourites")
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MainContent = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_TimelineFavourites = _sfc_main$1;
      _push(ssrRenderComponent(_component_MainContent, _attrs, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/favourites",
              "timeline-title-style": "",
              flex: "",
              "items-center": "",
              "gap-2": "",
              onClick: _ctx.$scrollToTop
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="${ssrRenderClass(unref(useStarFavoriteIcon) ? "i-ri:star-line" : "i-ri:heart-3-line")}"${_scopeId2}></div><span${_scopeId2}>${ssrInterpolate(unref(t)("nav.favourites"))}</span>`);
                } else {
                  return [
                    createVNode("div", {
                      class: unref(useStarFavoriteIcon) ? "i-ri:star-line" : "i-ri:heart-3-line"
                    }, null, 2),
                    createVNode("span", null, toDisplayString(unref(t)("nav.favourites")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, {
                to: "/favourites",
                "timeline-title-style": "",
                flex: "",
                "items-center": "",
                "gap-2": "",
                onClick: _ctx.$scrollToTop
              }, {
                default: withCtx(() => [
                  createVNode("div", {
                    class: unref(useStarFavoriteIcon) ? "i-ri:star-line" : "i-ri:heart-3-line"
                  }, null, 2),
                  createVNode("span", null, toDisplayString(unref(t)("nav.favourites")), 1)
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) {
              _push2(ssrRenderComponent(_component_TimelineFavourites, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) ? (openBlock(), createBlock(_component_TimelineFavourites, { key: 0 })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/favourites.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
