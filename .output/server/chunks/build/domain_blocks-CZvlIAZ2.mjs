import { e as useI18n, h as useHydratedHead, i as isHydrated, a as useMasto, _ as _sfc_main$2, L as _sfc_main$6 } from './server.mjs';
import { b as _sfc_main$3 } from './CommonPaginator-BbZe3uv5.mjs';
import { useSSRContext, defineComponent, mergeProps, withCtx, createVNode, toDisplayString, unref, openBlock, createBlock, createCommentVNode, createTextVNode } from 'vue';
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
import 'vue-virtual-scroller';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TimelineDomainBlocks",
  __ssrInlineRender: true,
  setup(__props) {
    const { client } = useMasto();
    const paginator = client.value.v1.domainBlocks.list();
    async function unblock(domain) {
      await client.value.v1.domainBlocks.remove({ domain });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonPaginator = _sfc_main$3;
      const _component_CommonDropdownItem = _sfc_main$6;
      _push(ssrRenderComponent(_component_CommonPaginator, mergeProps({ paginator: unref(paginator) }, _attrs), {
        default: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CommonDropdownItem, { class: "!cursor-auto" }, {
              actions: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div i-ri:lock-unlock-line text-primary cursor-pointer${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode("div", {
                      "i-ri:lock-unlock-line": "",
                      "text-primary": "",
                      "cursor-pointer": "",
                      onClick: ($event) => unblock(item)
                    }, null, 8, ["onClick"])
                  ];
                }
              }),
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(item)} `);
                } else {
                  return [
                    createTextVNode(toDisplayString(item) + " ", 1)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_CommonDropdownItem, { class: "!cursor-auto" }, {
                actions: withCtx(() => [
                  createVNode("div", {
                    "i-ri:lock-unlock-line": "",
                    "text-primary": "",
                    "cursor-pointer": "",
                    onClick: ($event) => unblock(item)
                  }, null, 8, ["onClick"])
                ]),
                default: withCtx(() => [
                  createTextVNode(toDisplayString(item) + " ", 1)
                ]),
                _: 2
              }, 1024)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/timeline/TimelineDomainBlocks.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "domain_blocks",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useHydratedHead({
      title: () => t("nav.blocked_domains")
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MainContent = _sfc_main$2;
      const _component_TimelineDomainBlocks = _sfc_main$1;
      _push(ssrRenderComponent(_component_MainContent, mergeProps({ back: "" }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span timeline-title-style${_scopeId}>${ssrInterpolate(_ctx.$t("nav.blocked_domains"))}</span>`);
          } else {
            return [
              createVNode("span", { "timeline-title-style": "" }, toDisplayString(_ctx.$t("nav.blocked_domains")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) {
              _push2(ssrRenderComponent(_component_TimelineDomainBlocks, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) ? (openBlock(), createBlock(_component_TimelineDomainBlocks, { key: 0 })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/domain_blocks.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
