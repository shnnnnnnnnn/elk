import { _ as _sfc_main$1 } from './AccountPaginator-Dkw4dtyf.mjs';
import { defineComponent, computed, withAsyncContext, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { e as useI18n, u as useRoute, H as fetchAccountByHandle, Y as useMastoClient, v as useSelfAccount, h as useHydratedHead, j as getDisplayName } from './server.mjs';
import './CommonPaginator-BbZe3uv5.mjs';
import 'vue-virtual-scroller';
import './AccountCard-CqNJdiOX.mjs';
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
  __name: "following",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { t } = useI18n();
    const params = useRoute().params;
    const handle = computed(() => params.account);
    const account = ([__temp, __restore] = withAsyncContext(() => fetchAccountByHandle(handle.value)), __temp = await __temp, __restore(), __temp);
    const paginator = account ? useMastoClient().v1.accounts.$select(account.id).following.list() : null;
    const isSelf = useSelfAccount(account);
    if (account) {
      useHydratedHead({
        title: () => `${t("account.following")} | ${getDisplayName(account)} (@${account.acct})`
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AccountPaginator = _sfc_main$1;
      if (unref(paginator)) {
        _push(ssrRenderComponent(_component_AccountPaginator, mergeProps({
          paginator: unref(paginator),
          "relationship-context": unref(isSelf) ? "following" : void 0,
          context: "following",
          account: unref(account)
        }, _attrs), null, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[[server]]/@[account]/index/following.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
