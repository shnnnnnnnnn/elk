import { _ as _sfc_main$1 } from './AccountTabs-CYdWkGyZ.mjs';
import { _ as _sfc_main$2 } from './TimelinePaginator-D6qhsp0Y.mjs';
import { defineComponent, computed, withAsyncContext, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useRoute, e as useI18n, H as fetchAccountByHandle, Y as useMastoClient, h as useHydratedHead, j as getDisplayName } from './server.mjs';
import { r as reorderedTimeline } from './timeline-DRoske77.mjs';
import './CommonRouteTabs-LigkcvTo.mjs';
import './Dropdown-YHaGe2K7.mjs';
import './CommonPaginator-BbZe3uv5.mjs';
import 'vue-virtual-scroller';
import './StatusCard-CHVUTCdD.mjs';
import './AccountInlineInfo-s2DIkMwx.mjs';
import './icons-m16uagef.mjs';
import './translate-B4UXe0Hf.mjs';
import './StatusPreviewCard-C7wSe9bY.mjs';
import 'unlazy';
import 'blurhash';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const params = useRoute().params;
    const handle = computed(() => params.account);
    const { t } = useI18n();
    const account = ([__temp, __restore] = withAsyncContext(() => fetchAccountByHandle(handle.value)), __temp = await __temp, __restore(), __temp);
    function reorderAndFilter(items) {
      return reorderedTimeline(items, "account");
    }
    const paginator = useMastoClient().v1.accounts.$select(account.id).statuses.list({ limit: 30, excludeReplies: true });
    if (account) {
      useHydratedHead({
        title: () => `${t("account.posts")} | ${getDisplayName(account)} (@${account.acct})`
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AccountTabs = _sfc_main$1;
      const _component_TimelinePaginator = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_AccountTabs, null, null, _parent));
      _push(ssrRenderComponent(_component_TimelinePaginator, {
        paginator: unref(paginator),
        preprocess: reorderAndFilter,
        context: "account",
        account: unref(account)
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[[server]]/@[account]/index/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
