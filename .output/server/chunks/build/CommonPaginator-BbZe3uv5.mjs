import { defineComponent, toRef, unref, withCtx, mergeProps, renderSlot, useSSRContext, ref, computed, watch } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { e as useI18n, X as _export_sfc, i as isHydrated, aW as useElementBounding, aX as useDeactivated, ay as cacheStatus, aB as removeCachedStatus, a8 as useNuxtApp } from './server.mjs';
import { DynamicScroller } from 'vue-virtual-scroller';

const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    flex: "",
    "flex-col": "",
    "gap-2": "",
    "px-4": "",
    "py-3": ""
  }, _attrs))}><div flex gap-4><div><div w-12 h-12 rounded-full class="skeleton-loading-bg"></div></div><div flex="~ col 1 gap-2" pb2 min-w-0><div flex class="skeleton-loading-bg" h-5 w-20 rounded></div><div flex class="skeleton-loading-bg" h-4 w-full rounded></div><div flex class="skeleton-loading-bg" h-4 w="4/5" rounded></div><div flex class="skeleton-loading-bg" h-4 w="2/5" rounded></div></div></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/StatusCardSkeleton.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_StatusCardSkeleton = __nuxt_component_5;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_StatusCardSkeleton, {
    border: "b base",
    op50: ""
  }, null, _parent));
  _push(ssrRenderComponent(_component_StatusCardSkeleton, {
    border: "b base",
    op35: ""
  }, null, _parent));
  _push(ssrRenderComponent(_component_StatusCardSkeleton, {
    border: "b base",
    op25: ""
  }, null, _parent));
  _push(ssrRenderComponent(_component_StatusCardSkeleton, {
    border: "b base",
    op10: ""
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/timeline/TimelineSkeleton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
function usePaginator(_paginator, stream, eventType = "update", preprocess = (items) => items, buffer = 10) {
  _paginator.clone();
  const state = ref(isHydrated.value ? "idle" : "loading");
  const items = ref([]);
  ref([]);
  const prevItems = ref([]);
  const endAnchor = ref();
  const bound = useElementBounding(endAnchor);
  computed(() => bound.top.value < (void 0).innerHeight * 2);
  const error = ref();
  useDeactivated();
  async function update() {
    items.value.unshift(...preprocess(prevItems.value));
    prevItems.value = [];
  }
  watch(stream, async (stream2) => {
    if (!stream2)
      return;
    for await (const entry of stream2) {
      if (entry.event === eventType) {
        const status = entry.payload;
        if ("uri" in status)
          cacheStatus(status, void 0, true);
        const index = prevItems.value.findIndex((i) => i.id === status.id);
        if (index >= 0)
          prevItems.value.splice(index, 1);
        prevItems.value.unshift(status);
      } else if (entry.event === "status.update") {
        const status = entry.payload;
        cacheStatus(status, void 0, true);
        const data = items.value;
        const index = data.findIndex((s) => s.id === status.id);
        if (index >= 0)
          data[index] = status;
      } else if (entry.event === "delete") {
        const id = entry.payload;
        removeCachedStatus(id);
        const data = items.value;
        const index = data.findIndex((s) => s.id === id);
        if (index >= 0)
          data.splice(index, 1);
      }
    }
  }, { immediate: true });
  return {
    items,
    prevItems,
    update,
    state,
    error,
    endAnchor
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CommonPaginator",
  __ssrInlineRender: true,
  props: {
    paginator: {},
    keyProp: { default: "id" },
    virtualScroller: { type: Boolean, default: false },
    stream: {},
    eventType: {},
    preprocess: { type: Function },
    endMessage: { type: [Boolean, String], default: true }
  },
  setup(__props, { expose: __expose }) {
    const { t } = useI18n();
    const nuxtApp = useNuxtApp();
    const { items, prevItems, update, state, endAnchor, error } = usePaginator(__props.paginator, toRef(() => __props.stream), __props.eventType, __props.preprocess);
    nuxtApp.hook("elk-logo:click", () => {
      update();
      nuxtApp.$scrollToTop();
    });
    function createEntry(item) {
      items.value = [...items.value, __props.preprocess?.([item]) ?? item];
    }
    function updateEntry(item) {
      const id = item[__props.keyProp];
      const index = items.value.findIndex((i) => i[__props.keyProp] === id);
      if (index > -1)
        items.value = [...items.value.slice(0, index), __props.preprocess?.([item]) ?? item, ...items.value.slice(index + 1)];
    }
    function removeEntry(entryId) {
      items.value = items.value.filter((i) => i[__props.keyProp] !== entryId);
    }
    __expose({ createEntry, removeEntry, updateEntry });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TimelineSkeleton = __nuxt_component_6;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(prevItems).length) {
        ssrRenderSlot(_ctx.$slots, "updater", { number: unref(prevItems).length, update: unref(update) }, null, _push, _parent);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "items", { items: unref(items) }, () => {
        if (_ctx.virtualScroller) {
          _push(ssrRenderComponent(unref(DynamicScroller), {
            items: unref(items),
            "min-item-size": 200,
            "key-field": _ctx.keyProp,
            "page-mode": ""
          }, {
            default: withCtx(({ item, active, index }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderSlot(_ctx.$slots, "default", mergeProps({ key: item[_ctx.keyProp] }, {
                  item,
                  active,
                  older: unref(items)[index + 1],
                  newer: unref(items)[index - 1],
                  index,
                  items: unref(items)
                }), null, _push2, _parent2, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, "default", mergeProps({ key: item[_ctx.keyProp] }, {
                    item,
                    active,
                    older: unref(items)[index + 1],
                    newer: unref(items)[index - 1],
                    index,
                    items: unref(items)
                  }))
                ];
              }
            }),
            _: 3
          }, _parent));
        } else {
          _push(`<!--[-->`);
          ssrRenderList(unref(items), (item, index) => {
            ssrRenderSlot(_ctx.$slots, "default", mergeProps({ key: item[_ctx.keyProp] }, {
              item,
              older: unref(items)[index + 1],
              newer: unref(items)[index - 1],
              index,
              items: unref(items)
            }), null, _push, _parent);
          });
          _push(`<!--]-->`);
        }
      }, _push, _parent);
      _push(`<div></div>`);
      if (unref(state) === "loading") {
        ssrRenderSlot(_ctx.$slots, "loading", {}, () => {
          _push(ssrRenderComponent(_component_TimelineSkeleton, null, null, _parent));
        }, _push, _parent);
      } else if (unref(state) === "done" && _ctx.endMessage !== false) {
        ssrRenderSlot(_ctx.$slots, "done", {
          items: unref(items)
        }, () => {
          _push(`<div p5 text-secondary italic text-center>${ssrInterpolate(unref(t)(typeof _ctx.endMessage === "string" && unref(items).length <= 0 ? _ctx.endMessage : "common.end_of_list"))}</div>`);
        }, _push, _parent);
      } else if (unref(state) === "error") {
        _push(`<div p5 text-secondary>${ssrInterpolate(unref(t)("common.error"))}: ${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/CommonPaginator.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { __nuxt_component_5 as _, __nuxt_component_6 as a, _sfc_main as b };
