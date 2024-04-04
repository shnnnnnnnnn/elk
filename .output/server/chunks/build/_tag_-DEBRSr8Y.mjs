import { u as useRoute, a as useMasto, a4 as useStreaming, h as useHydratedHead, o as onReactivated, _ as _sfc_main$2, a6 as _sfc_main$n } from './server.mjs';
import { _ as _sfc_main$1 } from './TimelinePaginator-D6qhsp0Y.mjs';
import { defineComponent, computed, withAsyncContext, mergeProps, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, renderSlot, useSSRContext, shallowRef } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { u as useAsyncData } from './asyncData-D0OdvhXd.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[tag]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const params = useRoute().params;
    const tagName = computed(() => params.tag);
    const { client } = useMasto();
    const { data: tag, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(() => client.value.v1.tags.$select(tagName.value).fetch(), { default: () => shallowRef() }, "$U6L6yWc3J7")), __temp = await __temp, __restore(), __temp);
    const paginator = client.value.v1.timelines.tag.$select(tagName.value).list();
    const stream = useStreaming((client2) => client2.hashtag.subscribe({ tag: tagName.value }));
    if (tag.value) {
      useHydratedHead({
        title: () => `#${tag.value.name}`
      });
    }
    onReactivated();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MainContent = _sfc_main$2;
      const _component_TagActionButton = _sfc_main$n;
      const _component_TimelinePaginator = _sfc_main$1;
      _push(ssrRenderComponent(_component_MainContent, mergeProps({ back: "" }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<bdi text-lg font-bold${_scopeId}>#${ssrInterpolate(unref(tagName))}</bdi>`);
          } else {
            return [
              createVNode("bdi", {
                "text-lg": "",
                "font-bold": ""
              }, "#" + toDisplayString(unref(tagName)), 1)
            ];
          }
        }),
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (typeof unref(tag)?.following === "boolean") {
              _push2(ssrRenderComponent(_component_TagActionButton, {
                tag: unref(tag),
                onChange: ($event) => unref(refresh)()
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              typeof unref(tag)?.following === "boolean" ? (openBlock(), createBlock(_component_TagActionButton, {
                key: 0,
                tag: unref(tag),
                onChange: ($event) => unref(refresh)()
              }, null, 8, ["tag", "onChange"])) : createCommentVNode("", true)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(ssrRenderComponent(_component_TimelinePaginator, mergeProps({ paginator: unref(paginator), stream: unref(stream) }, { context: "public" }), null, _parent2, _scopeId));
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createVNode(_component_TimelinePaginator, mergeProps({ paginator: unref(paginator), stream: unref(stream) }, { context: "public" }), null, 16)
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[[server]]/tags/[tag].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
