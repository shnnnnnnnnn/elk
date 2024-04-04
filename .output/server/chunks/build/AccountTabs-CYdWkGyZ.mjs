import { _ as _sfc_main$1 } from './CommonRouteTabs-LigkcvTo.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { e as useI18n, u as useRoute } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AccountTabs",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const route = useRoute();
    const server = computed(() => route.params.server);
    const account = computed(() => route.params.account);
    const tabs = computed(() => [
      {
        name: "account-index",
        to: {
          name: "account-index",
          params: { server: server.value, account: account.value }
        },
        display: t("tab.posts"),
        icon: "i-ri:file-list-2-line"
      },
      {
        name: "account-replies",
        to: {
          name: "account-replies",
          params: { server: server.value, account: account.value }
        },
        display: t("tab.posts_with_replies"),
        icon: "i-ri:chat-1-line"
      },
      {
        name: "account-media",
        to: {
          name: "account-media",
          params: { server: server.value, account: account.value }
        },
        display: t("tab.media"),
        icon: "i-ri:camera-2-line"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonRouteTabs = _sfc_main$1;
      _push(ssrRenderComponent(_component_CommonRouteTabs, mergeProps({
        force: "",
        replace: "",
        options: unref(tabs),
        "prevent-scroll-top": "",
        command: "",
        border: "base b"
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountTabs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
