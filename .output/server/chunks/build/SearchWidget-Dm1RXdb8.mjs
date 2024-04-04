import { _ as _sfc_main$1$1, a as _sfc_main$4 } from './SearchHashtagInfo-DJpkg2KL.mjs';
import { a as useMasto, b7 as resolveUnref, i as isHydrated, b8 as watchDebounced, c as currentUser, e as useI18n, ag as useRouter, b9 as useFocusWithin, X as _export_sfc, k as getAccountRoute, ba as getTagRoute, af as getStatusRoute, P as _sfc_main$u, R as _sfc_main$c, T as _sfc_main$a, U as _sfc_main$9, V as _sfc_main$8 } from './server.mjs';
import { useSSRContext, ref, computed, watch, readonly, defineComponent, mergeProps, unref, withCtx, openBlock, createBlock, createCommentVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$5 } from './StatusCard-CHVUTCdD.mjs';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SearchAccountInfo",
  __ssrInlineRender: true,
  props: {
    account: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AccountAvatar = _sfc_main$u;
      const _component_AccountDisplayName = _sfc_main$c;
      const _component_AccountLockIndicator = _sfc_main$a;
      const _component_AccountBotIndicator = _sfc_main$9;
      const _component_AccountHandle = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({
        flex: "",
        "gap-2": "",
        "items-center": ""
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_AccountAvatar, {
        "w-10": "",
        "h-10": "",
        account: _ctx.account,
        "shrink-0": ""
      }, null, _parent));
      _push(`<div flex="~ col gap1" shrink h-full overflow-hidden leading-none><div flex="~" gap-2>`);
      _push(ssrRenderComponent(_component_AccountDisplayName, {
        account: _ctx.account,
        "line-clamp-1": "",
        "ws-pre-wrap": "",
        "break-all": "",
        "text-base": ""
      }, null, _parent));
      if (_ctx.account.locked) {
        _push(ssrRenderComponent(_component_AccountLockIndicator, { "text-xs": "" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (_ctx.account.bot) {
        _push(ssrRenderComponent(_component_AccountBotIndicator, { "text-xs": "" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_AccountHandle, {
        "text-sm": "",
        account: _ctx.account,
        "text-secondary-light": ""
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/search/SearchAccountInfo.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SearchResult",
  __ssrInlineRender: true,
  props: {
    result: {},
    active: { type: Boolean }
  },
  setup(__props) {
    function onActivate() {
      (void 0).activeElement.blur();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonScrollIntoView = _sfc_main$1$1;
      const _component_SearchHashtagInfo = _sfc_main$4;
      const _component_SearchAccountInfo = _sfc_main$3;
      const _component_StatusCard = _sfc_main$5;
      _push(ssrRenderComponent(_component_CommonScrollIntoView, mergeProps({
        as: "RouterLink",
        "hover:bg-active": "",
        active: _ctx.active,
        to: _ctx.result.to,
        py2: "",
        block: "",
        px2: "",
        "aria-selected": _ctx.active,
        class: { "bg-active": _ctx.active },
        onClick: () => onActivate()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.result.type === "hashtag") {
              _push2(ssrRenderComponent(_component_SearchHashtagInfo, {
                hashtag: _ctx.result.data
              }, null, _parent2, _scopeId));
            } else if (_ctx.result.type === "account") {
              _push2(ssrRenderComponent(_component_SearchAccountInfo, {
                account: _ctx.result.data
              }, null, _parent2, _scopeId));
            } else if (_ctx.result.type === "status") {
              _push2(ssrRenderComponent(_component_StatusCard, {
                status: _ctx.result.data,
                actions: false,
                "show-reply-to": false
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              _ctx.result.type === "hashtag" ? (openBlock(), createBlock(_component_SearchHashtagInfo, {
                key: 0,
                hashtag: _ctx.result.data
              }, null, 8, ["hashtag"])) : _ctx.result.type === "account" ? (openBlock(), createBlock(_component_SearchAccountInfo, {
                key: 1,
                account: _ctx.result.data
              }, null, 8, ["account"])) : _ctx.result.type === "status" ? (openBlock(), createBlock(_component_StatusCard, {
                key: 2,
                status: _ctx.result.data,
                actions: false,
                "show-reply-to": false
              }, null, 8, ["status"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/search/SearchResult.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    flex: "",
    "flex-col": "",
    "gap-2": "",
    "px-4": "",
    "py-3": ""
  }, _attrs))}><div flex gap-4><div><div w-12 h-12 rounded-full class="skeleton-loading-bg"></div></div><div flex="~ col 1 gap-2" pb2 min-w-0><div flex class="skeleton-loading-bg" h-5 w-20 rounded></div><div flex class="skeleton-loading-bg" h-4 w-full rounded></div></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/search/SearchResultSkeleton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
function useSearch(query, options = {}) {
  const done = ref(false);
  const { client } = useMasto();
  const loading = ref(false);
  const accounts = ref([]);
  const hashtags = ref([]);
  const statuses = ref([]);
  const q = computed(() => resolveUnref(query).trim());
  let paginator;
  const appendResults = (results, empty = false) => {
    if (empty) {
      accounts.value = [];
      hashtags.value = [];
      statuses.value = [];
    }
    accounts.value = [...accounts.value, ...results.accounts.map((account) => ({
      type: "account",
      id: account.id,
      data: account,
      to: getAccountRoute(account)
    }))];
    hashtags.value = [...hashtags.value, ...results.hashtags.map((hashtag) => ({
      type: "hashtag",
      id: `hashtag-${hashtag.name}`,
      data: hashtag,
      to: getTagRoute(hashtag.name)
    }))];
    statuses.value = [...statuses.value, ...results.statuses.map((status) => ({
      type: "status",
      id: status.id,
      data: status,
      to: getStatusRoute(status)
    }))];
  };
  watch(() => resolveUnref(query), () => {
    loading.value = !!(q.value && isHydrated.value);
  });
  watchDebounced(() => resolveUnref(query), async () => {
    if (!q.value || !isHydrated.value)
      return;
    loading.value = true;
    paginator = client.value.v2.search.list({
      q: q.value,
      ...resolveUnref(options),
      resolve: !!currentUser.value
    });
    const nextResults = await paginator.next();
    done.value = !!nextResults.done;
    if (!nextResults.done)
      appendResults(nextResults.value, true);
    loading.value = false;
  }, { debounce: 300 });
  const next = async () => {
    if (!q.value || !isHydrated.value || !paginator)
      return;
    loading.value = true;
    const nextResults = await paginator.next();
    loading.value = false;
    done.value = !!nextResults.done;
    if (!nextResults.done)
      appendResults(nextResults.value);
  };
  return {
    accounts,
    hashtags,
    statuses,
    loading: readonly(loading),
    next
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SearchWidget",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const query = ref("");
    const { accounts, hashtags, loading, statuses } = useSearch(query);
    const index = ref(0);
    const { t } = useI18n();
    const el = ref();
    const input = ref();
    useRouter();
    const { focused } = useFocusWithin(el);
    __expose({
      input
    });
    const results = computed(() => {
      if (query.value.length === 0)
        return [];
      const results2 = [
        ...hashtags.value.slice(0, 3),
        ...accounts.value,
        ...statuses.value
        // Disable until search page is implemented
        // {
        //   type: 'action',
        //   to: `/search?q=${query.value}`,
        //   action: {
        //     label: `Search for ${query.value}`,
        //   },
        // },
      ];
      return results2;
    });
    watch([results, focused], () => index.value = -1);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SearchResult = _sfc_main$2;
      const _component_SearchResultSkeleton = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "el",
        ref: el,
        relative: "",
        group: ""
      }, _attrs))}><div bg-base border="~ base" h10 ps-4 pe-1 rounded-3 flex="~ row" items-center relative focus-within:box-shadow-outline><div i-ri:search-2-line pointer-events-none text-secondary mt="1px" class="rtl-flip"></div><input${ssrRenderAttr("value", unref(query))} h-full rounded-3 w-full bg-transparent outline="focus:none" ps-3 pe-1 ml-1${ssrRenderAttr("placeholder", unref(t)("nav.search"))} pb="1px" placeholder-text-secondary>`);
      if (unref(query).length) {
        _push(`<button btn-action-icon text-secondary><span aria-hidden="true" class="i-ri:close-line"></span></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div left-0 top-11 absolute w-full z10 group-focus-within="pointer-events-auto visible" invisible pointer-events-none><div w-full bg-base border="~ base" rounded-3 max-h-100 overflow-auto py2>`);
      if (unref(query).trim().length === 0) {
        _push(`<span block text-center text-sm text-secondary>${ssrInterpolate(unref(t)("search.search_desc"))}</span>`);
      } else if (!unref(loading)) {
        _push(`<!--[-->`);
        if (unref(results).length > 0) {
          _push(`<!--[-->`);
          ssrRenderList(unref(results), (result, i) => {
            _push(ssrRenderComponent(_component_SearchResult, {
              key: result.id,
              active: unref(index) === parseInt(i.toString()),
              result,
              tabindex: unref(focused) ? 0 : -1
            }, null, _parent));
          });
          _push(`<!--]-->`);
        } else {
          _push(`<span block text-center text-sm text-secondary>${ssrInterpolate(unref(t)("search.search_empty"))}</span>`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_SearchResultSkeleton, null, null, _parent));
        _push(ssrRenderComponent(_component_SearchResultSkeleton, null, null, _parent));
        _push(ssrRenderComponent(_component_SearchResultSkeleton, null, null, _parent));
        _push(`</div>`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/search/SearchWidget.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _, __nuxt_component_1 as a, _sfc_main$2 as b, useSearch as u };
