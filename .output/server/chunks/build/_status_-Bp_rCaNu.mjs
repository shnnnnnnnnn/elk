import { u as useRoute, i as isHydrated, f as fetchStatus, a as useMasto, w as watchOnce, b as unrefElement, g as getReplyDraft, o as onReactivated, c as currentUser, d as useFormattedDateTime, e as useI18n, h as useHydratedHead, j as getDisplayName, r as removeHTMLTags, k as getAccountRoute, _ as _sfc_main$2$1, l as __nuxt_component_0$1, m as _sfc_main$e, n as _sfc_main$7 } from './server.mjs';
import { _ as _sfc_main$3, a as _sfc_main$a, b as _sfc_main$2$2, c as _sfc_main$d, d as _sfc_main$g, e as _sfc_main$1$1 } from './StatusCard-CHVUTCdD.mjs';
import { useSSRContext, defineComponent, computed, ref, shallowRef, nextTick, provide, watch, mergeProps, withCtx, unref, openBlock, createBlock, createVNode, Fragment, renderList, createCommentVNode, toDisplayString, createTextVNode } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { _ as __nuxt_component_3 } from './PublishWidget-DoHJnaJO.mjs';
import { _ as __nuxt_component_5$1 } from './CommonNotFound-8CAoMNMP.mjs';
import { _ as __nuxt_component_5, a as __nuxt_component_6 } from './CommonPaginator-BbZe3uv5.mjs';
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';
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
import './AccountInlineInfo-s2DIkMwx.mjs';
import './icons-m16uagef.mjs';
import './Dropdown-YHaGe2K7.mjs';
import './translate-B4UXe0Hf.mjs';
import './StatusPreviewCard-C7wSe9bY.mjs';
import 'unlazy';
import 'blurhash';
import './CommonErrorMessage-CvbJeSnR.mjs';
import './ModalDialog-BaHoBdlt.mjs';
import '@vueuse/integrations/useFocusTrap';
import './CommonCheckbox-D4Ek4LfU.mjs';
import 'iso-639-1';
import 'string-length';
import 'tippy.js';
import './SearchHashtagInfo-DJpkg2KL.mjs';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "StatusDetails",
  __ssrInlineRender: true,
  props: {
    status: {},
    newer: {},
    command: { type: Boolean },
    actions: { type: Boolean, default: true }
  },
  emits: ["refetchStatus"],
  setup(__props) {
    const props = __props;
    const status = computed(() => {
      if (props.status.reblog && props.status.reblog)
        return props.status.reblog;
      return props.status;
    });
    const createdAt = useFormattedDateTime(status.value.createdAt);
    const { t } = useI18n();
    useHydratedHead({
      title: () => `${getDisplayName(status.value.account)} ${t("common.in")} ${t("app_name")}: "${removeHTMLTags(status.value.content) || ""}"`
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_StatusActionsMore = _sfc_main$a;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AccountHoverWrapper = _sfc_main$e;
      const _component_AccountInfo = _sfc_main$7;
      const _component_StatusContent = _sfc_main$2$2;
      const _component_StatusEditIndicator = _sfc_main$d;
      const _component_StatusVisibilityIndicator = _sfc_main$g;
      const _component_StatusActions = _sfc_main$1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: `status-${unref(status).id}`,
        flex: "",
        "flex-col": "",
        "gap-2": "",
        pt2: "",
        pb1: "",
        "ps-3": "",
        "pe-4": "",
        relative: "",
        lang: unref(status).language ?? void 0,
        "aria-roledescription": "status-details"
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_StatusActionsMore, {
        status: unref(status),
        details: true,
        absolute: "",
        "inset-ie-2": "",
        "top-2": "",
        onAfterEdit: ($event) => _ctx.$emit("refetchStatus")
      }, null, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(unref(status).account),
        "rounded-full": "",
        "hover:bg-active": "",
        "transition-100": "",
        pe5: "",
        "me-a": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_AccountHoverWrapper, {
              account: unref(status).account
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_AccountInfo, {
                    account: unref(status).account
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_AccountInfo, {
                      account: unref(status).account
                    }, null, 8, ["account"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_AccountHoverWrapper, {
                account: unref(status).account
              }, {
                default: withCtx(() => [
                  createVNode(_component_AccountInfo, {
                    account: unref(status).account
                  }, null, 8, ["account"])
                ]),
                _: 1
              }, 8, ["account"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_StatusContent, {
        status: unref(status),
        newer: _ctx.newer,
        context: "details"
      }, null, _parent));
      _push(`<div flex="~ gap-1" items-center text-secondary text-sm><div flex><div>${ssrInterpolate(unref(createdAt))}</div>`);
      _push(ssrRenderComponent(_component_StatusEditIndicator, {
        status: unref(status),
        inline: false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span ms1 font-bold cursor-pointer${_scopeId}>${ssrInterpolate(_ctx.$t("state.edited"))}</span>`);
          } else {
            return [
              createVNode("span", {
                ms1: "",
                "font-bold": "",
                "cursor-pointer": ""
              }, toDisplayString(_ctx.$t("state.edited")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div aria-hidden="true"> \xB7 </div>`);
      _push(ssrRenderComponent(_component_StatusVisibilityIndicator, { status: unref(status) }, null, _parent));
      if (unref(status).application?.name) {
        _push(`<div aria-hidden="true"> \xB7 </div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(status).application?.website && unref(status).application.name) {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(status).application.website
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(status).application.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(status).application.name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (unref(status).application?.name) {
        _push(`<div>${ssrInterpolate(unref(status).application?.name)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div border="t base" py-2>`);
      if (_ctx.actions) {
        _push(ssrRenderComponent(_component_StatusActions, {
          status: unref(status),
          details: "",
          command: _ctx.command
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/StatusDetails.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "StatusNotFound",
  __ssrInlineRender: true,
  props: {
    account: {},
    status: {}
  },
  setup(__props) {
    const originalUrl = computed(() => {
      const [handle, _server] = __props.account.split("@");
      const server = _server || currentUser.value?.server;
      if (!server)
        return null;
      return `https://${server}/@${handle}/${__props.status}`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonNotFound = __nuxt_component_5$1;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_CommonNotFound, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div flex="~ col center gap2"${_scopeId}><div${_scopeId}>${ssrInterpolate(_ctx.$t("error.status_not_found"))}</div>`);
            if (unref(originalUrl)) {
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: unref(originalUrl),
                external: "",
                target: "_blank"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<button btn-solid flex="~ center gap-2" text-sm px2 py1${_scopeId2}><div i-ri:arrow-right-up-line${_scopeId2}></div> ${ssrInterpolate(_ctx.$t("status.try_original_site"))}</button>`);
                  } else {
                    return [
                      createVNode("button", {
                        "btn-solid": "",
                        flex: "~ center gap-2",
                        "text-sm": "",
                        px2: "",
                        py1: ""
                      }, [
                        createVNode("div", { "i-ri:arrow-right-up-line": "" }),
                        createTextVNode(" " + toDisplayString(_ctx.$t("status.try_original_site")), 1)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { flex: "~ col center gap2" }, [
                createVNode("div", null, toDisplayString(_ctx.$t("error.status_not_found")), 1),
                unref(originalUrl) ? (openBlock(), createBlock(_component_NuxtLink, {
                  key: 0,
                  to: unref(originalUrl),
                  external: "",
                  target: "_blank"
                }, {
                  default: withCtx(() => [
                    createVNode("button", {
                      "btn-solid": "",
                      flex: "~ center gap-2",
                      "text-sm": "",
                      px2: "",
                      py1: ""
                    }, [
                      createVNode("div", { "i-ri:arrow-right-up-line": "" }),
                      createTextVNode(" " + toDisplayString(_ctx.$t("status.try_original_site")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["to"])) : createCommentVNode("", true)
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/StatusNotFound.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[status]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const id = computed(() => route.params.status);
    const main = ref(null);
    const { data: status, pending, refresh: refreshStatus } = useAsyncData(
      `status:${id.value}`,
      () => fetchStatus(id.value, true),
      { watch: [isHydrated], immediate: isHydrated.value, default: () => shallowRef() }
    );
    const { client } = useMasto();
    const { data: context, pending: pendingContext, refresh: refreshContext } = useAsyncData(
      `context:${id.value}`,
      async () => client.value.v1.statuses.$select(id.value).context.fetch(),
      { watch: [isHydrated], immediate: isHydrated.value, lazy: true, default: () => shallowRef() }
    );
    if (pendingContext)
      watchOnce(pendingContext, scrollTo);
    if (pending)
      watchOnce(pending, scrollTo);
    async function scrollTo() {
      await nextTick();
      const statusElement = unrefElement(main);
      if (!statusElement)
        return;
      statusElement.scrollIntoView(true);
    }
    const publishWidget = ref();
    function focusEditor() {
      return publishWidget.value?.focusEditor?.();
    }
    provide("focus-editor", focusEditor);
    watch(publishWidget, () => {
      if ((void 0).history.state.focusReply)
        focusEditor();
    });
    const replyDraft = computed(() => status.value ? getReplyDraft(status.value) : null);
    onReactivated();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MainContent = _sfc_main$2$1;
      const _component_StatusCard = _sfc_main$3;
      const _component_StatusDetails = _sfc_main$2;
      const _component_PublishWidget = __nuxt_component_3;
      const _component_StatusNotFound = _sfc_main$1;
      const _component_StatusCardSkeleton = __nuxt_component_5;
      const _component_TimelineSkeleton = __nuxt_component_6;
      _push(ssrRenderComponent(_component_MainContent, mergeProps({ back: "" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!unref(pending)) {
              _push2(`<!--[-->`);
              if (unref(status)) {
                _push2(`<div xl:mt-4 mb="50vh" border="b base"${_scopeId}>`);
                if (!unref(pendingContext)) {
                  _push2(`<!--[-->`);
                  ssrRenderList(unref(context)?.ancestors, (comment, i) => {
                    _push2(ssrRenderComponent(_component_StatusCard, {
                      key: comment.id,
                      status: comment,
                      actions: comment.visibility !== "direct",
                      context: "account",
                      "has-older": true,
                      newer: unref(context)?.ancestors[i - 1]
                    }, null, _parent2, _scopeId));
                  });
                  _push2(`<!--]-->`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(ssrRenderComponent(_component_StatusDetails, {
                  ref_key: "main",
                  ref: main,
                  status: unref(status),
                  newer: unref(context)?.ancestors.at(-1),
                  command: "",
                  style: { "scroll-margin-top": "60px" },
                  onRefetchStatus: ($event) => unref(refreshStatus)()
                }, null, _parent2, _scopeId));
                if ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)) {
                  _push2(ssrRenderComponent(_component_PublishWidget, {
                    ref_key: "publishWidget",
                    ref: publishWidget,
                    border: "y base",
                    "draft-key": unref(replyDraft).key,
                    initial: unref(replyDraft).draft,
                    onPublished: ($event) => unref(refreshContext)()
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                if (!unref(pendingContext)) {
                  _push2(ssrRenderComponent(unref(DynamicScroller), {
                    items: unref(context)?.descendants || [],
                    "min-item-size": 200,
                    buffer: 800,
                    "key-field": "id",
                    "page-mode": ""
                  }, {
                    default: withCtx(({ item, index, active }, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(unref(DynamicScrollerItem), {
                          item,
                          active
                        }, {
                          default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(_component_StatusCard, {
                                key: item.id,
                                status: item,
                                context: "account",
                                older: unref(context)?.descendants[index + 1],
                                newer: index > 0 ? unref(context)?.descendants[index - 1] : unref(status),
                                "has-newer": index === 0,
                                main: unref(status)
                              }, null, _parent4, _scopeId3));
                            } else {
                              return [
                                (openBlock(), createBlock(_component_StatusCard, {
                                  key: item.id,
                                  status: item,
                                  context: "account",
                                  older: unref(context)?.descendants[index + 1],
                                  newer: index > 0 ? unref(context)?.descendants[index - 1] : unref(status),
                                  "has-newer": index === 0,
                                  main: unref(status)
                                }, null, 8, ["status", "older", "newer", "has-newer", "main"]))
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(unref(DynamicScrollerItem), {
                            item,
                            active
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(_component_StatusCard, {
                                key: item.id,
                                status: item,
                                context: "account",
                                older: unref(context)?.descendants[index + 1],
                                newer: index > 0 ? unref(context)?.descendants[index - 1] : unref(status),
                                "has-newer": index === 0,
                                main: unref(status)
                              }, null, 8, ["status", "older", "newer", "has-newer", "main"]))
                            ]),
                            _: 2
                          }, 1032, ["item", "active"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(ssrRenderComponent(_component_StatusNotFound, {
                  account: unref(route).params.account,
                  status: unref(id)
                }, null, _parent2, _scopeId));
              }
              _push2(`<!--]-->`);
            } else {
              _push2(ssrRenderComponent(_component_StatusCardSkeleton, { border: "b base" }, null, _parent2, _scopeId));
            }
            if (unref(pending) || unref(pendingContext)) {
              _push2(ssrRenderComponent(_component_TimelineSkeleton, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !unref(pending) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                unref(status) ? (openBlock(), createBlock("div", {
                  key: 0,
                  "xl:mt-4": "",
                  mb: "50vh",
                  border: "b base"
                }, [
                  !unref(pendingContext) ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(context)?.ancestors, (comment, i) => {
                    return openBlock(), createBlock(_component_StatusCard, {
                      key: comment.id,
                      status: comment,
                      actions: comment.visibility !== "direct",
                      context: "account",
                      "has-older": true,
                      newer: unref(context)?.ancestors[i - 1]
                    }, null, 8, ["status", "actions", "newer"]);
                  }), 128)) : createCommentVNode("", true),
                  createVNode(_component_StatusDetails, {
                    ref_key: "main",
                    ref: main,
                    status: unref(status),
                    newer: unref(context)?.ancestors.at(-1),
                    command: "",
                    style: { "scroll-margin-top": "60px" },
                    onRefetchStatus: ($event) => unref(refreshStatus)()
                  }, null, 8, ["status", "newer", "onRefetchStatus"]),
                  ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)) ? (openBlock(), createBlock(_component_PublishWidget, {
                    key: 1,
                    ref_key: "publishWidget",
                    ref: publishWidget,
                    border: "y base",
                    "draft-key": unref(replyDraft).key,
                    initial: unref(replyDraft).draft,
                    onPublished: ($event) => unref(refreshContext)()
                  }, null, 8, ["draft-key", "initial", "onPublished"])) : createCommentVNode("", true),
                  !unref(pendingContext) ? (openBlock(), createBlock(unref(DynamicScroller), {
                    key: 2,
                    items: unref(context)?.descendants || [],
                    "min-item-size": 200,
                    buffer: 800,
                    "key-field": "id",
                    "page-mode": ""
                  }, {
                    default: withCtx(({ item, index, active }) => [
                      createVNode(unref(DynamicScrollerItem), {
                        item,
                        active
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(_component_StatusCard, {
                            key: item.id,
                            status: item,
                            context: "account",
                            older: unref(context)?.descendants[index + 1],
                            newer: index > 0 ? unref(context)?.descendants[index - 1] : unref(status),
                            "has-newer": index === 0,
                            main: unref(status)
                          }, null, 8, ["status", "older", "newer", "has-newer", "main"]))
                        ]),
                        _: 2
                      }, 1032, ["item", "active"])
                    ]),
                    _: 1
                  }, 8, ["items"])) : createCommentVNode("", true)
                ])) : (openBlock(), createBlock(_component_StatusNotFound, {
                  key: 1,
                  account: unref(route).params.account,
                  status: unref(id)
                }, null, 8, ["account", "status"]))
              ], 64)) : (openBlock(), createBlock(_component_StatusCardSkeleton, {
                key: 1,
                border: "b base"
              })),
              unref(pending) || unref(pendingContext) ? (openBlock(), createBlock(_component_TimelineSkeleton, { key: 2 })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[[server]]/@[account]/[status].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
