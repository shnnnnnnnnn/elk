import { _ as _sfc_main$1 } from './TimelineNotifications-DuYFmr2Z.mjs';
import { u as useRoute, e as useI18n, i as isHydrated, h as useHydratedHead } from './server.mjs';
import { defineComponent, computed, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { a as isNotification } from './notification-DFG6Wtw2.mjs';
import './CommonPaginator-BbZe3uv5.mjs';
import 'vue-virtual-scroller';
import './AccountCard-CqNJdiOX.mjs';
import './StatusCard-CHVUTCdD.mjs';
import './AccountInlineInfo-s2DIkMwx.mjs';
import './icons-m16uagef.mjs';
import './Dropdown-YHaGe2K7.mjs';
import './translate-B4UXe0Hf.mjs';
import './StatusPreviewCard-C7wSe9bY.mjs';
import 'unlazy';
import 'blurhash';
import './AccountBigCard-BGOdR6LF.mjs';
import './AccountFollowRequestButton-F9n9PrN0.mjs';
import './notification-DvxggPx6.mjs';
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
  __name: "[filter]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { t } = useI18n();
    const filter = computed(() => {
      if (!isHydrated.value)
        return void 0;
      const rawFilter = route.params?.filter;
      const actualFilter = Array.isArray(rawFilter) ? rawFilter[0] : rawFilter;
      if (isNotification(actualFilter))
        return actualFilter;
      return void 0;
    });
    useHydratedHead({
      title: () => `${t(`tab.notifications_${filter.value ?? "all"}`)} | ${t("nav.notifications")}`
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TimelineNotifications = _sfc_main$1;
      if ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) {
        _push(ssrRenderComponent(_component_TimelineNotifications, mergeProps({ filter: unref(filter) }, _attrs), null, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/notifications/[filter].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
