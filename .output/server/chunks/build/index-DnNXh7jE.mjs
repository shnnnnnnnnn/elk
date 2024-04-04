import { _ as _sfc_main$1 } from './TimelinePaginator-D6qhsp0Y.mjs';
import { r as reorderedTimeline } from './timeline-DRoske77.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { u as useRoute, Y as useMastoClient, a4 as useStreaming } from './server.mjs';
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
  setup(__props) {
    const params = useRoute().params;
    const listId = computed(() => params.list);
    const client = useMastoClient();
    const paginator = client.v1.timelines.list.$select(listId.value).list();
    const stream = useStreaming((client2) => client2.list.subscribe({ list: listId.value }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TimelinePaginator = _sfc_main$1;
      _push(ssrRenderComponent(_component_TimelinePaginator, mergeProps({ paginator: unref(paginator), stream: unref(stream) }, {
        preprocess: "reorderedTimeline" in _ctx ? _ctx.reorderedTimeline : unref(reorderedTimeline),
        context: "home"
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[[server]]/list/[list]/index/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
