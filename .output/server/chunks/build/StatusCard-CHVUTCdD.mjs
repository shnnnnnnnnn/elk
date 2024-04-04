import { useSSRContext, defineComponent, computed, mergeProps, unref, createVNode, resolveDynamicComponent, ref, watchEffect, withCtx, toDisplayString, withModifiers, renderSlot, openBlock, createBlock, Fragment, createCommentVNode, withDirectives, vShow, watch, resolveComponent, createTextVNode, inject, reactive, resolveDirective, createSlots } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderVNode, ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrRenderClass, ssrRenderList, ssrRenderStyle, ssrIncludeBooleanAttr, ssrGetDirectiveProps } from 'vue/server-renderer';
import { aa as useEmojisFallback, ab as contentToVNode, c as currentUser, ac as getExpandSpoilersByDefault, ad as getExpandMediaByDefault, ae as useToggle, q as useUserSettings, af as getStatusRoute, ag as useRouter, d as useFormattedDateTime, ah as useTimeAgoOptions, ai as useTimeAgo, k as getAccountRoute, s as getPreferences, aj as useIntersectionObserver, ak as fetchAccountById, al as getStatusInReplyToRoute, j as getDisplayName, Y as useMastoClient, am as formatTimeAgo, an as useCommand, ao as checkLogin, ap as noop$1, aq as useClipboard, u as useRoute, e as useI18n, x as usePreferences, a as useMasto, y as useShare, i as isHydrated, z as mentionUser, p as useRelationship, B as toggleMuteAccount, C as toggleBlockAccount, D as getServerName, E as currentServer, F as toggleBlockDomain, G as openReportDialog, I as _sfc_main$i$1, ar as useHumanReadableNumber, as as clamp, at as usePreferredReducedMotion, au as getDataUrlFromArr, av as sanitizeEmbeddedIframe, aw as nodeToVNode, ax as getHideMediaByDefault, ay as cacheStatus, m as _sfc_main$e$1, l as __nuxt_component_0$1, P as _sfc_main$u, az as _sfc_main$d$1, T as _sfc_main$a$1, U as _sfc_main$9$1, M as _sfc_main$o, R as _sfc_main$c$1, V as _sfc_main$8$1, aA as openEditHistoryDialog, L as _sfc_main$6$1, K as openConfirmDialog, aB as removeCachedStatus, aC as openPublishDialog, aD as getDraftFromStatus, aE as lastPublishDialogStatus, g as getReplyDraft, aF as openFavoridedBoostedByDialog, aG as _sfc_main$h$1, aH as navigateToStatus, X as _export_sfc, aI as getStatusPermalinkRoute } from './server.mjs';
import { _ as _sfc_main$k } from './AccountInlineInfo-s2DIkMwx.mjs';
import { s as statusVisibilities } from './icons-m16uagef.mjs';
import { _ as _sfc_main$m } from './Dropdown-YHaGe2K7.mjs';
import { b as _sfc_main$l } from './CommonPaginator-BbZe3uv5.mjs';
import { u as useTranslation, g as getLanguageCode } from './translate-B4UXe0Hf.mjs';
import { a as _sfc_main$3$1, _ as _sfc_main$n } from './StatusPreviewCard-C7wSe9bY.mjs';
import { decode } from 'blurhash';

const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "StatusLink",
  __ssrInlineRender: true,
  props: {
    status: {},
    hover: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const el = ref();
    useRouter();
    computed(() => getStatusRoute(props.status));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: `status-${_ctx.status.id}`,
        ref_key: "el",
        ref: el,
        relative: "",
        flex: "~ col gap1",
        p: "b-2 is-3 ie-4",
        class: { "hover:bg-active": _ctx.hover },
        tabindex: "0",
        "focus:outline-none": "",
        "focus-visible:ring": "2 primary inset",
        "aria-roledescription": "status-card",
        lang: _ctx.status.language ?? void 0
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/StatusLink.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "StatusReplyingTo",
  __ssrInlineRender: true,
  props: {
    status: {},
    isSelfReply: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const link = ref();
    const targetIsVisible = ref(false);
    const isSelf = computed(() => props.status.inReplyToAccountId === props.status.account.id);
    const account = ref(isSelf.value ? props.status.account : void 0);
    useIntersectionObserver(
      link,
      ([{ intersectionRatio }]) => {
        targetIsVisible.value = intersectionRatio > 0.1;
      }
    );
    watch(
      () => [props.status, targetIsVisible.value],
      ([newStatus, newVisible]) => {
        if (newStatus.account && newStatus.inReplyToAccountId === newStatus.account.id) {
          account.value = newStatus.account;
          return;
        }
        if (!newVisible)
          return;
        const newId = newStatus.inReplyToAccountId;
        if (newId) {
          fetchAccountById(newStatus.inReplyToAccountId).then((acc) => {
            if (newId === props.status.inReplyToAccountId)
              account.value = acc;
          });
          return;
        }
        account.value = void 0;
      },
      { immediate: true, flush: "post" }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_i18n_t = resolveComponent("i18n-t");
      const _component_AccountInlineInfo = _sfc_main$k;
      if (_ctx.status.inReplyToId) {
        _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
          ref_key: "link",
          ref: link,
          flex: "~ gap2",
          "items-center": "",
          "h-auto": "",
          "text-sm": "",
          "text-secondary": "",
          to: ("getStatusInReplyToRoute" in _ctx ? _ctx.getStatusInReplyToRoute : unref(getStatusInReplyToRoute))(_ctx.status),
          title: _ctx.$t("status.replying_to", [unref(account) ? ("getDisplayName" in _ctx ? _ctx.getDisplayName : unref(getDisplayName))(unref(account)) : _ctx.$t("status.someone")]),
          "text-blue": "",
          "saturate-50": "",
          "hover:saturate-100": ""
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (_ctx.isSelfReply) {
                _push2(`<!--[--><div i-ri-discuss-line text-blue${_scopeId}></div><span${_scopeId}>${ssrInterpolate(_ctx.$t("status.show_full_thread"))}</span><!--]-->`);
              } else {
                _push2(`<!--[--><div i-ri-chat-1-line text-blue${_scopeId}></div><div ws-nowrap flex${_scopeId}>`);
                _push2(ssrRenderComponent(_component_i18n_t, { keypath: "status.replying_to" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      if (unref(account)) {
                        _push3(ssrRenderComponent(_component_AccountInlineInfo, {
                          account: unref(account),
                          link: false,
                          "m-inline-2": ""
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!--[-->${ssrInterpolate(_ctx.$t("status.someone"))}<!--]-->`);
                      }
                    } else {
                      return [
                        unref(account) ? (openBlock(), createBlock(_component_AccountInlineInfo, {
                          key: 0,
                          account: unref(account),
                          link: false,
                          "m-inline-2": ""
                        }, null, 8, ["account"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                          createTextVNode(toDisplayString(_ctx.$t("status.someone")), 1)
                        ], 64))
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div><!--]-->`);
              }
            } else {
              return [
                _ctx.isSelfReply ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  createVNode("div", {
                    "i-ri-discuss-line": "",
                    "text-blue": ""
                  }),
                  createVNode("span", null, toDisplayString(_ctx.$t("status.show_full_thread")), 1)
                ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createVNode("div", {
                    "i-ri-chat-1-line": "",
                    "text-blue": ""
                  }),
                  createVNode("div", {
                    "ws-nowrap": "",
                    flex: ""
                  }, [
                    createVNode(_component_i18n_t, { keypath: "status.replying_to" }, {
                      default: withCtx(() => [
                        unref(account) ? (openBlock(), createBlock(_component_AccountInlineInfo, {
                          key: 0,
                          account: unref(account),
                          link: false,
                          "m-inline-2": ""
                        }, null, 8, ["account"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                          createTextVNode(toDisplayString(_ctx.$t("status.someone")), 1)
                        ], 64))
                      ]),
                      _: 1
                    })
                  ])
                ], 64))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/StatusReplyingTo.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "StatusAccountDetails",
  __ssrInlineRender: true,
  props: {
    account: {},
    link: { type: Boolean, default: true }
  },
  setup(__props) {
    const userSettings = useUserSettings();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AccountDisplayName = _sfc_main$c$1;
      const _component_AccountHandle = _sfc_main$8$1;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: _ctx.link ? ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(_ctx.account) : void 0,
        flex: "~ col",
        "min-w-0": "",
        "md:flex": "~ row gap-2",
        "md:items-center": "",
        "text-link-rounded": ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_AccountDisplayName, {
              account: _ctx.account,
              "hide-emojis": ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideUsernameEmojis"),
              "font-bold": "",
              "line-clamp-1": "",
              "ws-pre-wrap": "",
              "break-all": ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_AccountHandle, {
              account: _ctx.account,
              class: "zen-none"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_AccountDisplayName, {
                account: _ctx.account,
                "hide-emojis": ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideUsernameEmojis"),
                "font-bold": "",
                "line-clamp-1": "",
                "ws-pre-wrap": "",
                "break-all": ""
              }, null, 8, ["account", "hide-emojis"]),
              createVNode(_component_AccountHandle, {
                account: _ctx.account,
                class: "zen-none"
              }, null, 8, ["account"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/StatusAccountDetails.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "StatusVisibilityIndicator",
  __ssrInlineRender: true,
  props: {
    status: {}
  },
  setup(__props) {
    const visibility = computed(() => statusVisibilities.find((v) => v.value === __props.status.visibility));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonTooltip = _sfc_main$o;
      _push(ssrRenderComponent(_component_CommonTooltip, mergeProps({
        content: _ctx.$t(`visibility.${unref(visibility).value}`),
        placement: "bottom"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass(unref(visibility).icon)}"${ssrRenderAttr("aria-label", _ctx.$t(`visibility.${unref(visibility).value}`))}${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", {
                class: unref(visibility).icon,
                "aria-label": _ctx.$t(`visibility.${unref(visibility).value}`)
              }, null, 10, ["aria-label"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/StatusVisibilityIndicator.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const _sfc_main$f = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "skeleton-loading-bg",
    "h-5": "",
    "w-full": "",
    rounded: "",
    my2: ""
  }, _attrs))}></div>`);
}
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/edit/StatusEditHistorySkeleton.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "StatusEditHistory",
  __ssrInlineRender: true,
  props: {
    status: {}
  },
  setup(__props) {
    const paginator = useMastoClient().v1.statuses.$select(__props.status.id).history.list();
    function showHistory(edit) {
      openEditHistoryDialog(edit);
    }
    const timeAgoOptions = useTimeAgoOptions();
    function reverseHistory(items) {
      return [...items].reverse();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonPaginator = _sfc_main$l;
      const _component_CommonDropdownItem = _sfc_main$6$1;
      const _component_i18n_t = resolveComponent("i18n-t");
      const _component_StatusEditHistorySkeleton = __nuxt_component_2;
      _push(ssrRenderComponent(_component_CommonPaginator, mergeProps({
        paginator: unref(paginator),
        "key-prop": "createdAt",
        preprocess: reverseHistory
      }, _attrs), {
        default: withCtx(({ items, item, index }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CommonDropdownItem, {
              px: "0.5",
              onClick: ($event) => showHistory(item)
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(("getDisplayName" in _ctx ? _ctx.getDisplayName : unref(getDisplayName))(item.account))} `);
                  if (index === items.length - 1) {
                    _push3(ssrRenderComponent(_component_i18n_t, { keypath: "status_history.created" }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(formatTimeAgo)(new Date(item.createdAt), unref(timeAgoOptions)))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(formatTimeAgo)(new Date(item.createdAt), unref(timeAgoOptions))), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(_component_i18n_t, { keypath: "status_history.edited" }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(formatTimeAgo)(new Date(item.createdAt), unref(timeAgoOptions)))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(formatTimeAgo)(new Date(item.createdAt), unref(timeAgoOptions))), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    createTextVNode(toDisplayString(("getDisplayName" in _ctx ? _ctx.getDisplayName : unref(getDisplayName))(item.account)) + " ", 1),
                    index === items.length - 1 ? (openBlock(), createBlock(_component_i18n_t, {
                      key: 0,
                      keypath: "status_history.created"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(formatTimeAgo)(new Date(item.createdAt), unref(timeAgoOptions))), 1)
                      ]),
                      _: 2
                    }, 1024)) : (openBlock(), createBlock(_component_i18n_t, {
                      key: 1,
                      keypath: "status_history.edited"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(formatTimeAgo)(new Date(item.createdAt), unref(timeAgoOptions))), 1)
                      ]),
                      _: 2
                    }, 1024))
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_CommonDropdownItem, {
                px: "0.5",
                onClick: ($event) => showHistory(item)
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(("getDisplayName" in _ctx ? _ctx.getDisplayName : unref(getDisplayName))(item.account)) + " ", 1),
                  index === items.length - 1 ? (openBlock(), createBlock(_component_i18n_t, {
                    key: 0,
                    keypath: "status_history.created"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(formatTimeAgo)(new Date(item.createdAt), unref(timeAgoOptions))), 1)
                    ]),
                    _: 2
                  }, 1024)) : (openBlock(), createBlock(_component_i18n_t, {
                    key: 1,
                    keypath: "status_history.edited"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(formatTimeAgo)(new Date(item.createdAt), unref(timeAgoOptions))), 1)
                    ]),
                    _: 2
                  }, 1024))
                ]),
                _: 2
              }, 1032, ["onClick"])
            ];
          }
        }),
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_StatusEditHistorySkeleton, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_StatusEditHistorySkeleton, { op50: "" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_StatusEditHistorySkeleton, { op25: "" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_StatusEditHistorySkeleton),
              createVNode(_component_StatusEditHistorySkeleton, { op50: "" }),
              createVNode(_component_StatusEditHistorySkeleton, { op25: "" })
            ];
          }
        }),
        done: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}></span>`);
          } else {
            return [
              createVNode("span")
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/edit/StatusEditHistory.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "StatusEditIndicator",
  __ssrInlineRender: true,
  props: {
    status: {},
    inline: { type: Boolean }
  },
  setup(__props) {
    const editedAt = computed(() => __props.status.editedAt);
    const formatted = useFormattedDateTime(editedAt);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonTooltip = _sfc_main$o;
      const _component_CommonDropdown = _sfc_main$m;
      const _component_StatusEditHistory = _sfc_main$e;
      if (unref(editedAt)) {
        _push(`<!--[-->`);
        if (_ctx.inline) {
          _push(ssrRenderComponent(_component_CommonTooltip, {
            content: _ctx.$t("status.edited", [unref(formatted)])
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` \xA0 <time${ssrRenderAttr("title", unref(editedAt))}${ssrRenderAttr("datetime", unref(editedAt))} font-bold underline decoration-dashed text-secondary${_scopeId}>\xA0*\xA0</time>`);
              } else {
                return [
                  createTextVNode(" \xA0 "),
                  createVNode("time", {
                    title: unref(editedAt),
                    datetime: unref(editedAt),
                    "font-bold": "",
                    underline: "",
                    "decoration-dashed": "",
                    "text-secondary": ""
                  }, "\xA0*\xA0", 8, ["title", "datetime"])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(ssrRenderComponent(_component_CommonDropdown, null, {
            popper: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div text-sm p2${_scopeId}><div text-center mb1${_scopeId}>${ssrInterpolate(_ctx.$t("status.edited", [unref(formatted)]))}</div>`);
                _push2(ssrRenderComponent(_component_StatusEditHistory, { status: _ctx.status }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                return [
                  createVNode("div", {
                    "text-sm": "",
                    p2: ""
                  }, [
                    createVNode("div", {
                      "text-center": "",
                      mb1: ""
                    }, toDisplayString(_ctx.$t("status.edited", [unref(formatted)])), 1),
                    createVNode(_component_StatusEditHistory, { status: _ctx.status }, null, 8, ["status"])
                  ])
                ];
              }
            }),
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, "default")
                ];
              }
            }),
            _: 3
          }, _parent));
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/edit/StatusEditIndicator.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "AnimateNumber",
  __ssrInlineRender: true,
  props: {
    increased: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "of-hidden": "",
        h: "1.25rem"
      }, _attrs))}><div flex="~ col" transition-transform duration-300 class="${ssrRenderClass(_ctx.increased ? "translate-y--1/2" : "translate-y-0")}">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "next", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/AnimateNumber.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "StatusActionButton",
  __ssrInlineRender: true,
  props: {
    text: {},
    content: {},
    color: {},
    icon: {},
    activeIcon: {},
    inactiveIcon: {},
    hover: {},
    elkGroupHover: {},
    active: { type: Boolean },
    disabled: { type: Boolean },
    as: { default: "button" },
    command: { type: Boolean }
  },
  setup(__props) {
    const el = ref();
    useCommand({
      scope: "Actions",
      order: -2,
      visible: () => __props.command && !__props.disabled,
      name: () => __props.content,
      icon: () => __props.icon,
      onActivate() {
        if (!checkLogin())
          return;
        const clickEvent = new MouseEvent("click", {
          view: void 0,
          bubbles: true,
          cancelable: true
        });
        el.value?.dispatchEvent(clickEvent);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonTooltip = _sfc_main$o;
      const _component_CommonAnimateNumber = _sfc_main$c;
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.as), mergeProps(_ctx.$attrs, {
        ref_key: "el",
        ref: el,
        "w-fit": "",
        flex: "",
        "gap-1": "",
        "items-center": "",
        "transition-all": "",
        "select-none": "",
        rounded: "",
        group: "",
        hover: !_ctx.disabled ? _ctx.hover : void 0,
        "focus:outline-none": "",
        "focus-visible": _ctx.hover,
        class: _ctx.active ? _ctx.color : _ctx.disabled ? "op25 cursor-not-allowed" : "text-secondary",
        "aria-label": _ctx.content,
        disabled: _ctx.disabled,
        "aria-disabled": _ctx.disabled
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CommonTooltip, {
              placement: "bottom",
              content: _ctx.content
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${ssrRenderAttrs(mergeProps({
                    "rounded-full": "",
                    p2: ""
                  }, _ctx.disabled ? {} : {
                    "elk-group-hover": _ctx.elkGroupHover,
                    "group-focus-visible": _ctx.elkGroupHover,
                    "group-focus-visible:ring": "2 current"
                  }))}${_scopeId2}><div class="${ssrRenderClass(_ctx.active && _ctx.activeIcon ? _ctx.activeIcon : _ctx.disabled && _ctx.inactiveIcon ? _ctx.inactiveIcon : _ctx.icon)}"${_scopeId2}></div></div>`);
                } else {
                  return [
                    createVNode("div", mergeProps({
                      "rounded-full": "",
                      p2: ""
                    }, _ctx.disabled ? {} : {
                      "elk-group-hover": _ctx.elkGroupHover,
                      "group-focus-visible": _ctx.elkGroupHover,
                      "group-focus-visible:ring": "2 current"
                    }), [
                      createVNode("div", {
                        class: _ctx.active && _ctx.activeIcon ? _ctx.activeIcon : _ctx.disabled && _ctx.inactiveIcon ? _ctx.inactiveIcon : _ctx.icon
                      }, null, 2)
                    ], 16)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (_ctx.text !== void 0 || _ctx.$slots.text) {
              _push2(ssrRenderComponent(_component_CommonAnimateNumber, {
                increased: _ctx.active,
                "text-sm": ""
              }, {
                next: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="${ssrRenderClass([_ctx.color])}"${_scopeId2}>`);
                    ssrRenderSlot(_ctx.$slots, "text", {}, () => {
                      _push3(`${ssrInterpolate(_ctx.text)}`);
                    }, _push3, _parent3, _scopeId2);
                    _push3(`</span>`);
                  } else {
                    return [
                      createVNode("span", {
                        class: [_ctx.color]
                      }, [
                        renderSlot(_ctx.$slots, "text", {}, () => [
                          createTextVNode(toDisplayString(_ctx.text), 1)
                        ])
                      ], 2)
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span text-secondary-light${_scopeId2}>`);
                    ssrRenderSlot(_ctx.$slots, "text", {}, () => {
                      _push3(`${ssrInterpolate(_ctx.text)}`);
                    }, _push3, _parent3, _scopeId2);
                    _push3(`</span>`);
                  } else {
                    return [
                      createVNode("span", { "text-secondary-light": "" }, [
                        renderSlot(_ctx.$slots, "text", {}, () => [
                          createTextVNode(toDisplayString(_ctx.text), 1)
                        ])
                      ])
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_CommonTooltip, {
                placement: "bottom",
                content: _ctx.content
              }, {
                default: withCtx(() => [
                  createVNode("div", mergeProps({
                    "rounded-full": "",
                    p2: ""
                  }, _ctx.disabled ? {} : {
                    "elk-group-hover": _ctx.elkGroupHover,
                    "group-focus-visible": _ctx.elkGroupHover,
                    "group-focus-visible:ring": "2 current"
                  }), [
                    createVNode("div", {
                      class: _ctx.active && _ctx.activeIcon ? _ctx.activeIcon : _ctx.disabled && _ctx.inactiveIcon ? _ctx.inactiveIcon : _ctx.icon
                    }, null, 2)
                  ], 16)
                ]),
                _: 1
              }, 8, ["content"]),
              _ctx.text !== void 0 || _ctx.$slots.text ? (openBlock(), createBlock(_component_CommonAnimateNumber, {
                key: 0,
                increased: _ctx.active,
                "text-sm": ""
              }, {
                next: withCtx(() => [
                  createVNode("span", {
                    class: [_ctx.color]
                  }, [
                    renderSlot(_ctx.$slots, "text", {}, () => [
                      createTextVNode(toDisplayString(_ctx.text), 1)
                    ])
                  ], 2)
                ]),
                default: withCtx(() => [
                  createVNode("span", { "text-secondary-light": "" }, [
                    renderSlot(_ctx.$slots, "text", {}, () => [
                      createTextVNode(toDisplayString(_ctx.text), 1)
                    ])
                  ])
                ]),
                _: 3
              }, 8, ["increased"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/StatusActionButton.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
function useStatusActions(props) {
  const status = ref({ ...props.status });
  const { client } = useMasto();
  watch(
    () => props.status,
    (val) => status.value = { ...val },
    { deep: true, immediate: true }
  );
  const isLoading = ref({
    reblogged: false,
    favourited: false,
    bookmarked: false,
    pinned: false,
    translation: false,
    muted: false
  });
  async function toggleStatusAction(action, fetchNewStatus, countField) {
    if (!checkLogin())
      return;
    const prevCount = countField ? status.value[countField] : void 0;
    isLoading.value[action] = true;
    const isCancel = status.value[action];
    fetchNewStatus().then((newStatus) => {
      if (isCancel && countField && prevCount === newStatus[countField])
        newStatus[countField] -= 1;
      Object.assign(status, newStatus);
      cacheStatus(newStatus, void 0, true);
    }).finally(() => {
      isLoading.value[action] = false;
    });
    status.value[action] = !status.value[action];
    cacheStatus(status.value, void 0, true);
    if (countField)
      status.value[countField] += status.value[action] ? 1 : -1;
  }
  const canReblog = computed(
    () => status.value.visibility !== "direct" && (status.value.visibility !== "private" || status.value.account.id === currentUser.value?.account.id)
  );
  const toggleReblog = () => toggleStatusAction(
    "reblogged",
    () => client.value.v1.statuses.$select(status.value.id)[status.value.reblogged ? "unreblog" : "reblog"]().then((res) => {
      if (status.value.reblogged)
        return res.reblog;
      return res;
    }),
    "reblogsCount"
  );
  const toggleFavourite = () => toggleStatusAction(
    "favourited",
    () => client.value.v1.statuses.$select(status.value.id)[status.value.favourited ? "unfavourite" : "favourite"](),
    "favouritesCount"
  );
  const toggleBookmark = () => toggleStatusAction(
    "bookmarked",
    () => client.value.v1.statuses.$select(status.value.id)[status.value.bookmarked ? "unbookmark" : "bookmark"]()
  );
  const togglePin = async () => toggleStatusAction(
    "pinned",
    () => client.value.v1.statuses.$select(status.value.id)[status.value.pinned ? "unpin" : "pin"]()
  );
  const toggleMute = async () => toggleStatusAction(
    "muted",
    () => client.value.v1.statuses.$select(status.value.id)[status.value.muted ? "unmute" : "mute"]()
  );
  return {
    status,
    isLoading,
    canReblog,
    toggleMute,
    toggleReblog,
    toggleFavourite,
    toggleBookmark,
    togglePin
  };
}
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "StatusActionsMore",
  __ssrInlineRender: true,
  props: {
    status: {},
    details: { type: Boolean },
    command: { type: Boolean }
  },
  emits: ["afterEdit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const focusEditor = inject("focus-editor", noop$1);
    const {
      status,
      isLoading,
      toggleBookmark,
      toggleFavourite,
      togglePin,
      toggleReblog,
      toggleMute
    } = useStatusActions(props);
    const clipboard = useClipboard();
    const router = useRouter();
    const route = useRoute();
    const { t } = useI18n();
    const userSettings = useUserSettings();
    const useStarFavoriteIcon = usePreferences("useStarFavoriteIcon");
    const isAuthor = computed(() => status.value.account.id === currentUser.value?.account.id);
    const { client } = useMasto();
    function getPermalinkUrl(status2) {
      const url = getStatusPermalinkRoute(status2);
      if (url)
        return `${(void 0).origin}/${url}`;
      return null;
    }
    async function copyLink(status2) {
      const url = getPermalinkUrl(status2);
      if (url)
        await clipboard.copy(url);
    }
    async function copyOriginalLink(status2) {
      const url = status2.url;
      if (url)
        await clipboard.copy(url);
    }
    const { share, isSupported: isShareSupported } = useShare();
    async function shareLink(status2) {
      const url = getPermalinkUrl(status2);
      if (url)
        await share({ url });
    }
    async function deleteStatus() {
      const confirmDelete = await openConfirmDialog({
        title: t("confirm.delete_posts.title"),
        description: t("confirm.delete_posts.description"),
        confirm: t("confirm.delete_posts.confirm"),
        cancel: t("confirm.delete_posts.cancel")
      });
      if (confirmDelete.choice !== "confirm")
        return;
      removeCachedStatus(status.value.id);
      await client.value.v1.statuses.$select(status.value.id).remove();
      if (route.name === "status")
        router.back();
    }
    async function deleteAndRedraft() {
      const confirmDelete = await openConfirmDialog({
        title: t("confirm.delete_posts.title"),
        description: t("confirm.delete_posts.description"),
        confirm: t("confirm.delete_posts.confirm"),
        cancel: t("confirm.delete_posts.cancel")
      });
      if (confirmDelete.choice !== "confirm")
        return;
      removeCachedStatus(status.value.id);
      await client.value.v1.statuses.$select(status.value.id).remove();
      await openPublishDialog("dialog", await getDraftFromStatus(status.value), true);
      if (lastPublishDialogStatus.value && route.name === "status")
        router.push(getStatusRoute(lastPublishDialogStatus.value));
    }
    function reply() {
      if (!checkLogin())
        return;
      if (props.details) {
        focusEditor();
      } else {
        const { key, draft } = getReplyDraft(status.value);
        openPublishDialog(key, draft());
      }
    }
    async function editStatus() {
      await openPublishDialog(`edit-${status.value.id}`, {
        ...await getDraftFromStatus(status.value),
        editingStatus: status.value
      }, true);
      emit("afterEdit");
    }
    function showFavoritedAndBoostedBy() {
      openFavoridedBoostedByDialog(status.value.id);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonDropdown = _sfc_main$m;
      const _component_StatusActionButton = _sfc_main$b;
      const _component_CommonDropdownItem = _sfc_main$6$1;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_CommonDropdown, mergeProps({
        "flex-none": "",
        ms3: "",
        placement: "bottom",
        "eager-mount": _ctx.command
      }, _attrs), {
        popper: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div flex="~ col"${_scopeId}>`);
            if (("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "zenMode") && !_ctx.details) {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(_component_CommonDropdownItem, {
                text: _ctx.$t("action.reply"),
                icon: "i-ri:chat-1-line",
                command: _ctx.command,
                onClick: ($event) => reply()
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_CommonDropdownItem, {
                text: unref(status).reblogged ? _ctx.$t("action.boosted") : _ctx.$t("action.boost"),
                icon: "i-ri:repeat-fill",
                class: unref(status).reblogged ? "text-green" : "",
                command: _ctx.command,
                disabled: unref(isLoading).reblogged,
                onClick: ($event) => unref(toggleReblog)()
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_CommonDropdownItem, {
                text: unref(status).favourited ? _ctx.$t("action.favourited") : _ctx.$t("action.favourite"),
                icon: unref(useStarFavoriteIcon) ? unref(status).favourited ? "i-ri:star-fill" : "i-ri:star-line" : unref(status).favourited ? "i-ri:heart-3-fill" : "i-ri:heart-3-line",
                class: unref(status).favourited ? unref(useStarFavoriteIcon) ? "text-yellow" : "text-rose" : "",
                command: _ctx.command,
                disabled: unref(isLoading).favourited,
                onClick: ($event) => unref(toggleFavourite)()
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_CommonDropdownItem, {
                text: unref(status).bookmarked ? _ctx.$t("action.bookmarked") : _ctx.$t("action.bookmark"),
                icon: unref(status).bookmarked ? "i-ri:bookmark-fill" : "i-ri:bookmark-line",
                class: unref(status).bookmarked ? unref(useStarFavoriteIcon) ? "text-rose" : "text-yellow" : "",
                command: _ctx.command,
                disabled: unref(isLoading).bookmarked,
                onClick: ($event) => unref(toggleBookmark)()
              }, null, _parent2, _scopeId));
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_CommonDropdownItem, {
              text: _ctx.$t("menu.show_favourited_and_boosted_by"),
              icon: "i-ri:hearts-line",
              command: _ctx.command,
              onClick: ($event) => showFavoritedAndBoostedBy()
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_CommonDropdownItem, {
              text: _ctx.$t("menu.copy_link_to_post"),
              icon: "i-ri:link",
              command: _ctx.command,
              onClick: ($event) => copyLink(unref(status))
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_CommonDropdownItem, {
              text: _ctx.$t("menu.copy_original_link_to_post"),
              icon: "i-ri:links-fill",
              command: _ctx.command,
              onClick: ($event) => copyOriginalLink(unref(status))
            }, null, _parent2, _scopeId));
            if (unref(isShareSupported)) {
              _push2(ssrRenderComponent(_component_CommonDropdownItem, {
                text: _ctx.$t("menu.share_post"),
                icon: "i-ri:share-line",
                command: _ctx.command,
                onClick: ($event) => shareLink(unref(status))
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)) && (unref(status).account.id === ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)).account.id || unref(status).mentions.some((m) => m.id === ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)).account.id))) {
              _push2(ssrRenderComponent(_component_CommonDropdownItem, {
                text: unref(status).muted ? _ctx.$t("menu.unmute_conversation") : _ctx.$t("menu.mute_conversation"),
                icon: unref(status).muted ? "i-ri:eye-line" : "i-ri:eye-off-line",
                command: _ctx.command,
                disabled: unref(isLoading).muted,
                onClick: ($event) => unref(toggleMute)()
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(status).url) {
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: unref(status).url,
                external: "",
                target: "_blank"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_CommonDropdownItem, {
                      text: _ctx.$t("menu.open_in_original_site"),
                      icon: "i-ri:arrow-right-up-line",
                      command: _ctx.command
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_CommonDropdownItem, {
                        text: _ctx.$t("menu.open_in_original_site"),
                        icon: "i-ri:arrow-right-up-line",
                        command: _ctx.command
                      }, null, 8, ["text", "command"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) && ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser))) {
              _push2(`<!--[-->`);
              if (unref(isAuthor)) {
                _push2(`<!--[-->`);
                _push2(ssrRenderComponent(_component_CommonDropdownItem, {
                  text: unref(status).pinned ? _ctx.$t("menu.unpin_on_profile") : _ctx.$t("menu.pin_on_profile"),
                  icon: "i-ri:pushpin-line",
                  command: _ctx.command,
                  onClick: unref(togglePin)
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_CommonDropdownItem, {
                  text: _ctx.$t("menu.edit"),
                  icon: "i-ri:edit-line",
                  command: _ctx.command,
                  onClick: editStatus
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_CommonDropdownItem, {
                  text: _ctx.$t("menu.delete"),
                  icon: "i-ri:delete-bin-line",
                  "text-red-600": "",
                  command: _ctx.command,
                  onClick: deleteStatus
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_CommonDropdownItem, {
                  text: _ctx.$t("menu.delete_and_redraft"),
                  icon: "i-ri:eraser-line",
                  "text-red-600": "",
                  command: _ctx.command,
                  onClick: deleteAndRedraft
                }, null, _parent2, _scopeId));
                _push2(`<!--]-->`);
              } else {
                _push2(`<!--[-->`);
                _push2(ssrRenderComponent(_component_CommonDropdownItem, {
                  text: _ctx.$t("menu.mention_account", [`@${unref(status).account.acct}`]),
                  icon: "i-ri:at-line",
                  command: _ctx.command,
                  onClick: ($event) => ("mentionUser" in _ctx ? _ctx.mentionUser : unref(mentionUser))(unref(status).account)
                }, null, _parent2, _scopeId));
                if (!unref(useRelationship)(unref(status).account).value?.muting) {
                  _push2(ssrRenderComponent(_component_CommonDropdownItem, {
                    text: _ctx.$t("menu.mute_account", [`@${unref(status).account.acct}`]),
                    icon: "i-ri:volume-mute-line",
                    command: _ctx.command,
                    onClick: ($event) => unref(toggleMuteAccount)(unref(useRelationship)(unref(status).account).value, unref(status).account)
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(ssrRenderComponent(_component_CommonDropdownItem, {
                    text: _ctx.$t("menu.unmute_account", [`@${unref(status).account.acct}`]),
                    icon: "i-ri:volume-up-fill",
                    command: _ctx.command,
                    onClick: ($event) => unref(toggleMuteAccount)(unref(useRelationship)(unref(status).account).value, unref(status).account)
                  }, null, _parent2, _scopeId));
                }
                if (!unref(useRelationship)(unref(status).account).value?.blocking) {
                  _push2(ssrRenderComponent(_component_CommonDropdownItem, {
                    text: _ctx.$t("menu.block_account", [`@${unref(status).account.acct}`]),
                    icon: "i-ri:forbid-2-line",
                    command: _ctx.command,
                    onClick: ($event) => unref(toggleBlockAccount)(unref(useRelationship)(unref(status).account).value, unref(status).account)
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(ssrRenderComponent(_component_CommonDropdownItem, {
                    text: _ctx.$t("menu.unblock_account", [`@${unref(status).account.acct}`]),
                    icon: "i-ri:checkbox-circle-line",
                    command: _ctx.command,
                    onClick: ($event) => unref(toggleBlockAccount)(unref(useRelationship)(unref(status).account).value, unref(status).account)
                  }, null, _parent2, _scopeId));
                }
                if (("getServerName" in _ctx ? _ctx.getServerName : unref(getServerName))(unref(status).account) && ("getServerName" in _ctx ? _ctx.getServerName : unref(getServerName))(unref(status).account) !== ("currentServer" in _ctx ? _ctx.currentServer : unref(currentServer))) {
                  _push2(`<!--[-->`);
                  if (!unref(useRelationship)(unref(status).account).value?.domainBlocking) {
                    _push2(ssrRenderComponent(_component_CommonDropdownItem, {
                      text: _ctx.$t("menu.block_domain", [("getServerName" in _ctx ? _ctx.getServerName : unref(getServerName))(unref(status).account)]),
                      icon: "i-ri:shut-down-line",
                      command: _ctx.command,
                      onClick: ($event) => ("toggleBlockDomain" in _ctx ? _ctx.toggleBlockDomain : unref(toggleBlockDomain))(unref(useRelationship)(unref(status).account).value, unref(status).account)
                    }, null, _parent2, _scopeId));
                  } else {
                    _push2(ssrRenderComponent(_component_CommonDropdownItem, {
                      text: _ctx.$t("menu.unblock_domain", [("getServerName" in _ctx ? _ctx.getServerName : unref(getServerName))(unref(status).account)]),
                      icon: "i-ri:restart-line",
                      command: _ctx.command,
                      onClick: ($event) => ("toggleBlockDomain" in _ctx ? _ctx.toggleBlockDomain : unref(toggleBlockDomain))(unref(useRelationship)(unref(status).account).value, unref(status).account)
                    }, null, _parent2, _scopeId));
                  }
                  _push2(`<!--]-->`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(ssrRenderComponent(_component_CommonDropdownItem, {
                  text: _ctx.$t("menu.report_account", [`@${unref(status).account.acct}`]),
                  icon: "i-ri:flag-2-line",
                  command: _ctx.command,
                  onClick: ($event) => ("openReportDialog" in _ctx ? _ctx.openReportDialog : unref(openReportDialog))(unref(status).account, unref(status))
                }, null, _parent2, _scopeId));
                _push2(`<!--]-->`);
              }
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { flex: "~ col" }, [
                ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "zenMode") && !_ctx.details ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  createVNode(_component_CommonDropdownItem, {
                    text: _ctx.$t("action.reply"),
                    icon: "i-ri:chat-1-line",
                    command: _ctx.command,
                    onClick: ($event) => reply()
                  }, null, 8, ["text", "command", "onClick"]),
                  createVNode(_component_CommonDropdownItem, {
                    text: unref(status).reblogged ? _ctx.$t("action.boosted") : _ctx.$t("action.boost"),
                    icon: "i-ri:repeat-fill",
                    class: unref(status).reblogged ? "text-green" : "",
                    command: _ctx.command,
                    disabled: unref(isLoading).reblogged,
                    onClick: ($event) => unref(toggleReblog)()
                  }, null, 8, ["text", "class", "command", "disabled", "onClick"]),
                  createVNode(_component_CommonDropdownItem, {
                    text: unref(status).favourited ? _ctx.$t("action.favourited") : _ctx.$t("action.favourite"),
                    icon: unref(useStarFavoriteIcon) ? unref(status).favourited ? "i-ri:star-fill" : "i-ri:star-line" : unref(status).favourited ? "i-ri:heart-3-fill" : "i-ri:heart-3-line",
                    class: unref(status).favourited ? unref(useStarFavoriteIcon) ? "text-yellow" : "text-rose" : "",
                    command: _ctx.command,
                    disabled: unref(isLoading).favourited,
                    onClick: ($event) => unref(toggleFavourite)()
                  }, null, 8, ["text", "icon", "class", "command", "disabled", "onClick"]),
                  createVNode(_component_CommonDropdownItem, {
                    text: unref(status).bookmarked ? _ctx.$t("action.bookmarked") : _ctx.$t("action.bookmark"),
                    icon: unref(status).bookmarked ? "i-ri:bookmark-fill" : "i-ri:bookmark-line",
                    class: unref(status).bookmarked ? unref(useStarFavoriteIcon) ? "text-rose" : "text-yellow" : "",
                    command: _ctx.command,
                    disabled: unref(isLoading).bookmarked,
                    onClick: ($event) => unref(toggleBookmark)()
                  }, null, 8, ["text", "icon", "class", "command", "disabled", "onClick"])
                ], 64)) : createCommentVNode("", true),
                createVNode(_component_CommonDropdownItem, {
                  text: _ctx.$t("menu.show_favourited_and_boosted_by"),
                  icon: "i-ri:hearts-line",
                  command: _ctx.command,
                  onClick: ($event) => showFavoritedAndBoostedBy()
                }, null, 8, ["text", "command", "onClick"]),
                createVNode(_component_CommonDropdownItem, {
                  text: _ctx.$t("menu.copy_link_to_post"),
                  icon: "i-ri:link",
                  command: _ctx.command,
                  onClick: ($event) => copyLink(unref(status))
                }, null, 8, ["text", "command", "onClick"]),
                createVNode(_component_CommonDropdownItem, {
                  text: _ctx.$t("menu.copy_original_link_to_post"),
                  icon: "i-ri:links-fill",
                  command: _ctx.command,
                  onClick: ($event) => copyOriginalLink(unref(status))
                }, null, 8, ["text", "command", "onClick"]),
                unref(isShareSupported) ? (openBlock(), createBlock(_component_CommonDropdownItem, {
                  key: 1,
                  text: _ctx.$t("menu.share_post"),
                  icon: "i-ri:share-line",
                  command: _ctx.command,
                  onClick: ($event) => shareLink(unref(status))
                }, null, 8, ["text", "command", "onClick"])) : createCommentVNode("", true),
                ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)) && (unref(status).account.id === ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)).account.id || unref(status).mentions.some((m) => m.id === ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)).account.id)) ? (openBlock(), createBlock(_component_CommonDropdownItem, {
                  key: 2,
                  text: unref(status).muted ? _ctx.$t("menu.unmute_conversation") : _ctx.$t("menu.mute_conversation"),
                  icon: unref(status).muted ? "i-ri:eye-line" : "i-ri:eye-off-line",
                  command: _ctx.command,
                  disabled: unref(isLoading).muted,
                  onClick: ($event) => unref(toggleMute)()
                }, null, 8, ["text", "icon", "command", "disabled", "onClick"])) : createCommentVNode("", true),
                unref(status).url ? (openBlock(), createBlock(_component_NuxtLink, {
                  key: 3,
                  to: unref(status).url,
                  external: "",
                  target: "_blank"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_CommonDropdownItem, {
                      text: _ctx.$t("menu.open_in_original_site"),
                      icon: "i-ri:arrow-right-up-line",
                      command: _ctx.command
                    }, null, 8, ["text", "command"])
                  ]),
                  _: 1
                }, 8, ["to"])) : createCommentVNode("", true),
                ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) && ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)) ? (openBlock(), createBlock(Fragment, { key: 4 }, [
                  unref(isAuthor) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createVNode(_component_CommonDropdownItem, {
                      text: unref(status).pinned ? _ctx.$t("menu.unpin_on_profile") : _ctx.$t("menu.pin_on_profile"),
                      icon: "i-ri:pushpin-line",
                      command: _ctx.command,
                      onClick: unref(togglePin)
                    }, null, 8, ["text", "command", "onClick"]),
                    createVNode(_component_CommonDropdownItem, {
                      text: _ctx.$t("menu.edit"),
                      icon: "i-ri:edit-line",
                      command: _ctx.command,
                      onClick: editStatus
                    }, null, 8, ["text", "command"]),
                    createVNode(_component_CommonDropdownItem, {
                      text: _ctx.$t("menu.delete"),
                      icon: "i-ri:delete-bin-line",
                      "text-red-600": "",
                      command: _ctx.command,
                      onClick: deleteStatus
                    }, null, 8, ["text", "command"]),
                    createVNode(_component_CommonDropdownItem, {
                      text: _ctx.$t("menu.delete_and_redraft"),
                      icon: "i-ri:eraser-line",
                      "text-red-600": "",
                      command: _ctx.command,
                      onClick: deleteAndRedraft
                    }, null, 8, ["text", "command"])
                  ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                    createVNode(_component_CommonDropdownItem, {
                      text: _ctx.$t("menu.mention_account", [`@${unref(status).account.acct}`]),
                      icon: "i-ri:at-line",
                      command: _ctx.command,
                      onClick: ($event) => ("mentionUser" in _ctx ? _ctx.mentionUser : unref(mentionUser))(unref(status).account)
                    }, null, 8, ["text", "command", "onClick"]),
                    !unref(useRelationship)(unref(status).account).value?.muting ? (openBlock(), createBlock(_component_CommonDropdownItem, {
                      key: 0,
                      text: _ctx.$t("menu.mute_account", [`@${unref(status).account.acct}`]),
                      icon: "i-ri:volume-mute-line",
                      command: _ctx.command,
                      onClick: ($event) => unref(toggleMuteAccount)(unref(useRelationship)(unref(status).account).value, unref(status).account)
                    }, null, 8, ["text", "command", "onClick"])) : (openBlock(), createBlock(_component_CommonDropdownItem, {
                      key: 1,
                      text: _ctx.$t("menu.unmute_account", [`@${unref(status).account.acct}`]),
                      icon: "i-ri:volume-up-fill",
                      command: _ctx.command,
                      onClick: ($event) => unref(toggleMuteAccount)(unref(useRelationship)(unref(status).account).value, unref(status).account)
                    }, null, 8, ["text", "command", "onClick"])),
                    !unref(useRelationship)(unref(status).account).value?.blocking ? (openBlock(), createBlock(_component_CommonDropdownItem, {
                      key: 2,
                      text: _ctx.$t("menu.block_account", [`@${unref(status).account.acct}`]),
                      icon: "i-ri:forbid-2-line",
                      command: _ctx.command,
                      onClick: ($event) => unref(toggleBlockAccount)(unref(useRelationship)(unref(status).account).value, unref(status).account)
                    }, null, 8, ["text", "command", "onClick"])) : (openBlock(), createBlock(_component_CommonDropdownItem, {
                      key: 3,
                      text: _ctx.$t("menu.unblock_account", [`@${unref(status).account.acct}`]),
                      icon: "i-ri:checkbox-circle-line",
                      command: _ctx.command,
                      onClick: ($event) => unref(toggleBlockAccount)(unref(useRelationship)(unref(status).account).value, unref(status).account)
                    }, null, 8, ["text", "command", "onClick"])),
                    ("getServerName" in _ctx ? _ctx.getServerName : unref(getServerName))(unref(status).account) && ("getServerName" in _ctx ? _ctx.getServerName : unref(getServerName))(unref(status).account) !== ("currentServer" in _ctx ? _ctx.currentServer : unref(currentServer)) ? (openBlock(), createBlock(Fragment, { key: 4 }, [
                      !unref(useRelationship)(unref(status).account).value?.domainBlocking ? (openBlock(), createBlock(_component_CommonDropdownItem, {
                        key: 0,
                        text: _ctx.$t("menu.block_domain", [("getServerName" in _ctx ? _ctx.getServerName : unref(getServerName))(unref(status).account)]),
                        icon: "i-ri:shut-down-line",
                        command: _ctx.command,
                        onClick: ($event) => ("toggleBlockDomain" in _ctx ? _ctx.toggleBlockDomain : unref(toggleBlockDomain))(unref(useRelationship)(unref(status).account).value, unref(status).account)
                      }, null, 8, ["text", "command", "onClick"])) : (openBlock(), createBlock(_component_CommonDropdownItem, {
                        key: 1,
                        text: _ctx.$t("menu.unblock_domain", [("getServerName" in _ctx ? _ctx.getServerName : unref(getServerName))(unref(status).account)]),
                        icon: "i-ri:restart-line",
                        command: _ctx.command,
                        onClick: ($event) => ("toggleBlockDomain" in _ctx ? _ctx.toggleBlockDomain : unref(toggleBlockDomain))(unref(useRelationship)(unref(status).account).value, unref(status).account)
                      }, null, 8, ["text", "command", "onClick"]))
                    ], 64)) : createCommentVNode("", true),
                    createVNode(_component_CommonDropdownItem, {
                      text: _ctx.$t("menu.report_account", [`@${unref(status).account.acct}`]),
                      icon: "i-ri:flag-2-line",
                      command: _ctx.command,
                      onClick: ($event) => ("openReportDialog" in _ctx ? _ctx.openReportDialog : unref(openReportDialog))(unref(status).account, unref(status))
                    }, null, 8, ["text", "command", "onClick"])
                  ], 64))
                ], 64)) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_StatusActionButton, {
              content: _ctx.$t("action.more"),
              color: "text-primary",
              hover: "text-primary",
              "elk-group-hover": "bg-primary-light",
              icon: "i-ri:more-line",
              "my--2": ""
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_StatusActionButton, {
                content: _ctx.$t("action.more"),
                color: "text-primary",
                hover: "text-primary",
                "elk-group-hover": "bg-primary-light",
                icon: "i-ri:more-line",
                "my--2": ""
              }, null, 8, ["content"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/StatusActionsMore.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "StatusBody",
  __ssrInlineRender: true,
  props: {
    status: {},
    newer: {},
    withAction: { type: Boolean, default: true }
  },
  setup(__props) {
    const { translation } = useTranslation(__props.status, getLanguageCode());
    const emojisObject = useEmojisFallback(() => __props.status.emojis);
    const vnode = computed(() => {
      if (!__props.status.content)
        return null;
      return contentToVNode(__props.status.content, {
        emojis: emojisObject.value,
        mentions: "mentions" in __props.status ? __props.status.mentions : void 0,
        markdown: true,
        collapseMentionLink: !!("inReplyToId" in __props.status && __props.status.inReplyToId),
        status: "id" in __props.status ? __props.status : void 0,
        inReplyToStatus: __props.newer
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentRich = _sfc_main$i$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["status-body", { "with-action": _ctx.withAction }],
        "whitespace-pre-wrap": "",
        "break-words": "",
        relative: ""
      }, _attrs))}>`);
      if (_ctx.status.content) {
        _push(`<span class="content-rich line-compact" dir="auto"${ssrRenderAttr("lang", "language" in _ctx.status && _ctx.status.language || void 0)}>`);
        if (unref(vnode)) {
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(vnode)), null, null), _parent);
        } else {
          _push(`<!---->`);
        }
        _push(`</span>`);
      } else {
        _push(`<div></div>`);
      }
      if (unref(translation).visible) {
        _push(`<!--[--><div my2 h-px border="b base" bg-base></div>`);
        if (unref(translation).success) {
          _push(ssrRenderComponent(_component_ContentRich, {
            class: "line-compact",
            content: unref(translation).text,
            emojis: _ctx.status.emojis
          }, null, _parent));
        } else {
          _push(`<div text-red-4> Error: ${ssrInterpolate(unref(translation).error)}</div>`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/StatusBody.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "StatusSpoiler",
  __ssrInlineRender: true,
  props: {
    enabled: { type: Boolean },
    filter: { type: Boolean },
    isDM: { type: Boolean },
    sensitiveNonSpoiler: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const expandSpoilers = computed(() => {
      const expandCW = currentUser.value ? getExpandSpoilersByDefault(currentUser.value.account) : false;
      const expandMedia = currentUser.value ? getExpandMediaByDefault(currentUser.value.account) : false;
      return !props.filter && (props.sensitiveNonSpoiler && expandMedia || !props.sensitiveNonSpoiler && expandCW);
    });
    const hideContent = props.enabled || props.sensitiveNonSpoiler;
    const showContent = ref(expandSpoilers.value ? true : !hideContent);
    useToggle(showContent);
    watchEffect(() => {
      showContent.value = expandSpoilers.value ? true : !hideContent;
    });
    function getToggleText() {
      if (props.sensitiveNonSpoiler)
        return "status.spoiler_media_hidden";
      return props.filter ? "status.filter_show_anyway" : "status.spoiler_show_more";
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (unref(hideContent)) {
        _push(`<div flex flex-col items-start><div class="content-rich" p="x-4 b-2.5" text-center text-secondary w-full border="~ base" border-0 border-b-dotted border-b-3 mt-2>`);
        ssrRenderSlot(_ctx.$slots, "spoiler", {}, null, _push, _parent);
        _push(`</div><div flex="~ gap-1 center" w-full${ssrRenderAttr("mb", _ctx.isDM && !unref(showContent) ? "4" : "")} mt="-4.5"><button btn-text px-2 py-1 rounded-lg${ssrRenderAttr("bg", _ctx.isDM ? "transparent" : "base")} flex="~ center gap-2" class="${ssrRenderClass(unref(showContent) ? "" : "filter-saturate-0 hover:filter-saturate-100")}"${ssrRenderAttr("aria-expanded", unref(showContent))}>`);
        if (unref(showContent)) {
          _push(`<div i-ri:eye-line></div>`);
        } else {
          _push(`<div i-ri:eye-close-line></div>`);
        }
        _push(` ${ssrInterpolate(unref(showContent) ? _ctx.$t("status.spoiler_show_less") : _ctx.$t(getToggleText()))}</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(hideContent) || unref(showContent)) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/StatusSpoiler.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "StatusTranslation",
  __ssrInlineRender: true,
  props: {
    status: {}
  },
  setup(__props) {
    const {
      toggle: _toggleTranslation,
      translation,
      enabled: isTranslationEnabled
    } = useTranslation(__props.status, getLanguageCode());
    const preferenceHideTranslation = usePreferences("hideTranslation");
    const showButton = computed(
      () => !preferenceHideTranslation.value && isTranslationEnabled && __props.status.content.trim().length
    );
    const translating = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(showButton)) {
        _push(`<div${ssrRenderAttrs(_attrs)}><button p-0 flex="~ center" gap-2 text-sm${ssrIncludeBooleanAttr(unref(translating)) ? " disabled" : ""} disabled-bg-transparent btn-text class="disabled-text-$c-text-btn-disabled-deeper">`);
        if (unref(translating)) {
          _push(`<span block animate-spin preserve-3d><span block i-ri:loader-2-fill></span></span>`);
        } else {
          _push(`<div i-ri:translate></div>`);
        }
        _push(` ${ssrInterpolate(unref(translation).visible ? _ctx.$t("menu.show_untranslated") : _ctx.$t("menu.translate_post"))}</button></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/StatusTranslation.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "StatusPoll",
  __ssrInlineRender: true,
  props: {
    status: {}
  },
  setup(__props) {
    const poll = reactive({ ...__props.status.poll });
    function toPercentage(num) {
      const percentage = 100 * num;
      return `${percentage.toFixed(1).replace(/\.?0+$/, "")}%`;
    }
    const timeAgoOptions = useTimeAgoOptions();
    const expiredTimeAgo = useTimeAgo(poll.expiresAt, timeAgoOptions);
    const expiredTimeFormatted = useFormattedDateTime(poll.expiresAt);
    const { formatPercentage } = useHumanReadableNumber();
    useMasto();
    const votersCount = computed(() => poll.votersCount ?? poll.votesCount ?? 0);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLocalizedNumber = _sfc_main$h$1;
      const _component_CommonTooltip = _sfc_main$o;
      _push(`<div${ssrRenderAttrs(mergeProps({
        flex: "",
        "flex-col": "",
        "w-full": "",
        "items-stretch": "",
        "gap-2": "",
        py3: "",
        dir: "auto",
        class: "poll-wrapper"
      }, _attrs))}>`);
      if (!unref(poll).voted && !unref(poll).expired) {
        _push(`<form flex="~ col gap3" accent-primary><!--[-->`);
        ssrRenderList(unref(poll).options, (option, index) => {
          _push(`<label flex="~ gap2" items-center><input name="choices"${ssrRenderAttr("value", index)}${ssrRenderAttr("type", unref(poll).multiple ? "checkbox" : "radio")} cursor-pointer> ${ssrInterpolate(option.title)}</label>`);
        });
        _push(`<!--]--><button btn-solid mt-1>${ssrInterpolate(_ctx.$t("action.vote"))}</button></form>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(unref(poll).options, (option, index) => {
          _push(`<div py-1 relative style="${ssrRenderStyle({ "--bar-width": toPercentage(unref(votersCount) === 0 ? 0 : (option.votesCount ?? 0) / unref(votersCount)) })}"><div flex justify-between pb-2 w-full><span inline-flex align-items>${ssrInterpolate(option.title)} `);
          if (unref(poll).voted && unref(poll).ownVotes?.includes(index)) {
            _push(`<span ms-2 mt-1 inline-block i-ri:checkbox-circle-line></span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span><span text-primary-active>${ssrInterpolate(unref(formatPercentage)(unref(votersCount) > 0 ? (option.votesCount || 0) / unref(votersCount) : 0))}</span></div><div class="bg-gray/40" rounded-l-sm rounded-r-lg h-5px w-full><div bg-primary-active h-full min-w="1%" class="w-[var(--bar-width)]"></div></div></div>`);
        });
        _push(`<!--]-->`);
      }
      _push(`<div text-sm flex="~ inline" gap-x-1 text-secondary>`);
      _push(ssrRenderComponent(_component_CommonLocalizedNumber, {
        keypath: "status.poll.count",
        count: unref(poll).votesCount
      }, null, _parent));
      _push(` \xB7 `);
      if (unref(poll).expiresAt) {
        _push(ssrRenderComponent(_component_CommonTooltip, {
          content: unref(expiredTimeFormatted),
          class: "inline-block",
          placement: "right"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<time${ssrRenderAttr("datetime", unref(poll).expiresAt)}${_scopeId}>${ssrInterpolate(_ctx.$t(unref(poll).expired ? "status.poll.finished" : "status.poll.ends", [unref(expiredTimeAgo)]))}</time>`);
            } else {
              return [
                createVNode("time", {
                  datetime: unref(poll).expiresAt
                }, toDisplayString(_ctx.$t(unref(poll).expired ? "status.poll.finished" : "status.poll.ends", [unref(expiredTimeAgo)])), 9, ["datetime"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/StatusPoll.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "StatusAttachment",
  __ssrInlineRender: true,
  props: {
    attachment: {},
    attachments: {},
    fullSize: { type: Boolean, default: false },
    isPreview: { type: Boolean, default: false }
  },
  setup(__props) {
    const src = computed(() => __props.attachment.previewUrl || __props.attachment.url || __props.attachment.remoteUrl);
    const srcset = computed(() => [
      [__props.attachment.url, __props.attachment.meta?.original?.width],
      [__props.attachment.remoteUrl, __props.attachment.meta?.original?.width],
      [__props.attachment.previewUrl, __props.attachment.meta?.small?.width]
    ].filter(([url]) => url).map(([url, size]) => `${url} ${size}w`).join(", "));
    const rawAspectRatio = computed(() => {
      if (__props.attachment.meta?.original?.aspect)
        return __props.attachment.meta.original.aspect;
      if (__props.attachment.meta?.small?.aspect)
        return __props.attachment.meta.small.aspect;
      return void 0;
    });
    const aspectRatio = computed(() => {
      if (__props.fullSize)
        return rawAspectRatio.value;
      if (rawAspectRatio.value)
        return clamp(rawAspectRatio.value, 0.8, 6);
      return void 0;
    });
    const objectPosition = computed(() => {
      const focusX = __props.attachment.meta?.focus?.x || 0;
      const focusY = __props.attachment.meta?.focus?.y || 0;
      const x = (focusX / 2 + 0.5) * 100;
      const y = (focusY / -2 + 0.5) * 100;
      return `${x}% ${y}%`;
    });
    const typeExtsMap = {
      video: ["mp4", "webm", "mov", "avi", "mkv", "flv", "wmv", "mpg", "mpeg"],
      audio: ["mp3", "wav", "ogg", "flac", "aac", "m4a", "wma"],
      image: ["jpg", "jpeg", "png", "svg", "webp", "bmp"],
      gifv: ["gifv", "gif"]
    };
    const type = computed(() => {
      if (__props.attachment.type && __props.attachment.type !== "unknown")
        return __props.attachment.type;
      for (const [type2, exts] of Object.entries(typeExtsMap)) {
        if (exts.some((ext) => src.value?.toLowerCase().endsWith(`.${ext}`)))
          return type2;
      }
      return "unknown";
    });
    const video = ref();
    const prefersReducedMotion = usePreferredReducedMotion();
    const isAudio = computed(() => __props.attachment.type === "audio");
    const isVideo = computed(() => __props.attachment.type === "video");
    const enableAutoplay = usePreferences("enableAutoplay");
    useIntersectionObserver(video, (entries) => {
      const ready = video.value?.dataset.ready === "true";
      if (prefersReducedMotion.value === "reduce" || !enableAutoplay.value) {
        if (ready && !video.value?.paused)
          video.value?.pause();
        return;
      }
      entries.forEach((entry) => {
        if (entry.intersectionRatio <= 0.75) {
          ready && !video.value?.paused && video.value?.pause();
        } else {
          video.value?.play().then(() => {
            video.value.dataset.ready = "true";
          }).catch(noop$1);
        }
      });
    }, { threshold: 0.75 });
    const userSettings = useUserSettings();
    const shouldLoadAttachment = ref(__props.isPreview || !getPreferences(userSettings.value, "enableDataSaving"));
    const blurHashSrc = computed(() => {
      if (!__props.attachment.blurhash)
        return "";
      const pixels = decode(__props.attachment.blurhash, 32, 32);
      return getDataUrlFromArr(pixels, 32, 32);
    });
    const videoThumbnail = ref(shouldLoadAttachment.value ? __props.attachment.previewUrl : blurHashSrc.value);
    watch(shouldLoadAttachment, () => {
      videoThumbnail.value = shouldLoadAttachment.value ? __props.attachment.previewUrl : blurHashSrc.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonBlurhash = _sfc_main$3$1;
      const _component_VDropdown = resolveComponent("VDropdown");
      const _directive_close_popper = resolveDirective("close-popper");
      _push(`<div${ssrRenderAttrs(mergeProps({
        relative: "",
        ma: "",
        flex: "",
        gap: unref(isAudio) ? "2" : ""
      }, _attrs))}>`);
      if (unref(type) === "video") {
        _push(`<button type="button" relative><video preload="none"${ssrRenderAttr("poster", unref(videoThumbnail))} muted loop playsinline${ssrIncludeBooleanAttr(unref(shouldLoadAttachment)) ? " controls" : ""} rounded-lg object-cover fullscreen:object-contain${ssrRenderAttr("width", _ctx.attachment.meta?.original?.width)}${ssrRenderAttr("height", _ctx.attachment.meta?.original?.height)} style="${ssrRenderStyle({
          aspectRatio: unref(aspectRatio),
          objectPosition: unref(objectPosition)
        })}" class="${ssrRenderClass(!unref(shouldLoadAttachment) ? "brightness-60 hover:brightness-70 transition-filter" : "")}"><source${ssrRenderAttr("src", _ctx.attachment.url || _ctx.attachment.previewUrl)} type="video/mp4"></video>`);
        if (!unref(shouldLoadAttachment)) {
          _push(`<span class="status-attachment-load" absolute text-sm text-white flex flex-col justify-center items-center gap-3 w-6 h-6 pointer-events-none i-ri:video-download-line></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      } else if (unref(type) === "gifv") {
        _push(`<button type="button" relative><video preload="none"${ssrRenderAttr("poster", unref(videoThumbnail))} muted loop playsinline rounded-lg object-cover${ssrRenderAttr("width", _ctx.attachment.meta?.original?.width)}${ssrRenderAttr("height", _ctx.attachment.meta?.original?.height)} style="${ssrRenderStyle({
          aspectRatio: unref(aspectRatio),
          objectPosition: unref(objectPosition)
        })}"><source${ssrRenderAttr("src", _ctx.attachment.url || _ctx.attachment.previewUrl)} type="video/mp4"></video>`);
        if (!unref(shouldLoadAttachment)) {
          _push(`<span class="status-attachment-load" absolute text-sm text-white flex flex-col justify-center items-center gap-3 w-6 h-6 pointer-events-none i-ri:video-download-line></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      } else if (unref(type) === "audio") {
        _push(`<audio controls h-15><source${ssrRenderAttr("src", _ctx.attachment.url || _ctx.attachment.previewUrl)} type="audio/mp3"></audio>`);
      } else {
        _push(`<button type="button" focus:outline-none focus:ring="2 primary inset" rounded-lg h-full w-full aria-label="Open image preview dialog" relative>`);
        _push(ssrRenderComponent(_component_CommonBlurhash, {
          blurhash: _ctx.attachment.blurhash || "",
          class: ["status-attachment-image", !unref(shouldLoadAttachment) ? "brightness-60 hover:brightness-70 transition-filter" : ""],
          src: unref(src),
          srcset: unref(srcset),
          width: _ctx.attachment.meta?.original?.width,
          height: _ctx.attachment.meta?.original?.height,
          alt: _ctx.attachment.description ?? "Image",
          style: {
            aspectRatio: unref(aspectRatio),
            objectPosition: unref(objectPosition)
          },
          "should-load-image": unref(shouldLoadAttachment),
          "rounded-lg": "",
          "h-full": "",
          "w-full": "",
          "object-cover": "",
          draggable: unref(shouldLoadAttachment)
        }, null, _parent));
        if (!unref(shouldLoadAttachment)) {
          _push(`<span class="status-attachment-load" absolute text-sm text-white flex flex-col justify-center items-center gap-3 w-6 h-6 pointer-events-none i-ri:file-download-line></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      }
      if (_ctx.attachment.description && !("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideAltIndicatorOnPosts")) {
        _push(`<div class="${ssrRenderClass(unref(isAudio) ? [] : [
          "absolute left-2",
          unref(isVideo) ? "top-2" : "bottom-2"
        ])}">`);
        _push(ssrRenderComponent(_component_VDropdown, {
          distance: 6,
          placement: "bottom-start"
        }, {
          popper: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div p4 flex flex-col gap-2 max-w-130${_scopeId}><div flex justify-between${_scopeId}><h2 font-bold text-xl text-secondary${_scopeId}>${ssrInterpolate(_ctx.$t("status.img_alt.desc"))}</h2><button${ssrRenderAttrs(mergeProps({
                "text-sm": "",
                "btn-outline": "",
                py0: "",
                px2: "",
                "text-secondary": "",
                "border-base": ""
              }, ssrGetDirectiveProps(_ctx, _directive_close_popper)))}${_scopeId}>${ssrInterpolate(_ctx.$t("status.img_alt.dismiss"))}</button></div><p whitespace-pre-wrap${_scopeId}>${ssrInterpolate(_ctx.attachment.description)}</p></div>`);
            } else {
              return [
                createVNode("div", {
                  p4: "",
                  flex: "",
                  "flex-col": "",
                  "gap-2": "",
                  "max-w-130": ""
                }, [
                  createVNode("div", {
                    flex: "",
                    "justify-between": ""
                  }, [
                    createVNode("h2", {
                      "font-bold": "",
                      "text-xl": "",
                      "text-secondary": ""
                    }, toDisplayString(_ctx.$t("status.img_alt.desc")), 1),
                    withDirectives((openBlock(), createBlock("button", {
                      "text-sm": "",
                      "btn-outline": "",
                      py0: "",
                      px2: "",
                      "text-secondary": "",
                      "border-base": ""
                    }, [
                      createTextVNode(toDisplayString(_ctx.$t("status.img_alt.dismiss")), 1)
                    ])), [
                      [_directive_close_popper]
                    ])
                  ]),
                  createVNode("p", { "whitespace-pre-wrap": "" }, toDisplayString(_ctx.attachment.description), 1)
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button font-bold text-sm class="${ssrRenderClass(unref(isAudio) ? "rounded-full h-15 w-15 btn-outline border-base text-secondary hover:bg-active hover:text-active" : "rounded-1 bg-black/65 text-white hover:bg-black px1.2 py0.2")}"${_scopeId}><div hidden${_scopeId}>${ssrInterpolate(_ctx.$t("status.img_alt.read", [_ctx.attachment.type]))}</div> ${ssrInterpolate(_ctx.$t("status.img_alt.ALT"))}</button>`);
            } else {
              return [
                createVNode("button", {
                  "font-bold": "",
                  "text-sm": "",
                  class: unref(isAudio) ? "rounded-full h-15 w-15 btn-outline border-base text-secondary hover:bg-active hover:text-active" : "rounded-1 bg-black/65 text-white hover:bg-black px1.2 py0.2"
                }, [
                  createVNode("div", { hidden: "" }, toDisplayString(_ctx.$t("status.img_alt.read", [_ctx.attachment.type])), 1),
                  createTextVNode(" " + toDisplayString(_ctx.$t("status.img_alt.ALT")), 1)
                ], 2)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/StatusAttachment.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "StatusMedia",
  __ssrInlineRender: true,
  props: {
    status: {},
    fullSize: { type: Boolean },
    isPreview: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_StatusAttachment = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["status-media-container", `status-media-container-${_ctx.status.mediaAttachments.length}`]
      }, _attrs))}><!--[-->`);
      ssrRenderList(_ctx.status.mediaAttachments, (attachment) => {
        _push(ssrRenderComponent(_component_StatusAttachment, {
          attachment,
          attachments: _ctx.status.mediaAttachments,
          "full-size": _ctx.fullSize,
          "w-full": "",
          "h-full": "",
          "is-preview": _ctx.isPreview
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/StatusMedia.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "StatusEmbeddedMedia",
  __ssrInlineRender: true,
  props: {
    status: {}
  },
  setup(__props) {
    const vnode = computed(() => {
      if (!__props.status.card?.html)
        return null;
      const node = sanitizeEmbeddedIframe(__props.status.card?.html)?.children[0];
      return node ? nodeToVNode(node) : null;
    });
    const overlayToggle = ref(true);
    const card = ref(__props.status.card);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_CommonBlurhash = _sfc_main$3$1;
      if (unref(card)) {
        _push(`<div${ssrRenderAttrs(_attrs)}>`);
        if (unref(overlayToggle)) {
          _push(`<div h-80 cursor-pointer relative><div p-3 absolute w-full h-full z-100 rounded-lg style="${ssrRenderStyle({ "background": "linear-gradient(black, rgba(0,0,0,0.5), transparent, transparent, rgba(0,0,0,0.20))" })}">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            flex: "",
            "flex-col": "",
            "gap-1": "",
            "hover:underline": "",
            "text-xs": "",
            "text-light": "",
            "font-light": "",
            target: "_blank",
            href: unref(card)?.url
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div flex gap-0.5${_scopeId}><p flex-row line-clamp-1${_scopeId}>${ssrInterpolate(unref(card)?.providerName)}`);
                if (unref(card)?.authorName) {
                  _push2(`<span${_scopeId}> \u2022 ${ssrInterpolate(unref(card)?.authorName)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</p><span flex-row w-4 h-4 pointer-events-none i-ri:arrow-right-up-line${_scopeId}></span></div><p font-bold line-clamp-1 text-size-base${_scopeId}>${ssrInterpolate(unref(card)?.title)}</p><p line-clamp-1${_scopeId}>${ssrInterpolate(_ctx.$t("status.embedded_warning"))}</p>`);
              } else {
                return [
                  createVNode("div", {
                    flex: "",
                    "gap-0.5": ""
                  }, [
                    createVNode("p", {
                      "flex-row": "",
                      "line-clamp-1": ""
                    }, [
                      createTextVNode(toDisplayString(unref(card)?.providerName), 1),
                      unref(card)?.authorName ? (openBlock(), createBlock("span", { key: 0 }, " \u2022 " + toDisplayString(unref(card)?.authorName), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("span", {
                      "flex-row": "",
                      "w-4": "",
                      "h-4": "",
                      "pointer-events-none": "",
                      "i-ri:arrow-right-up-line": ""
                    })
                  ]),
                  createVNode("p", {
                    "font-bold": "",
                    "line-clamp-1": "",
                    "text-size-base": ""
                  }, toDisplayString(unref(card)?.title), 1),
                  createVNode("p", { "line-clamp-1": "" }, toDisplayString(_ctx.$t("status.embedded_warning")), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<div flex h-50 mt-1 justify-center flex-items-center><button absolute bg-primary opacity-85 rounded-full hover:bg-primary-active hover:opacity-95 transition-all box-shadow-outline><span text-light flex flex-col gap-3 w-27 h-27 pointer-events-none i-ri:play-circle-line></span></button></div></div>`);
          if (unref(card)?.image) {
            _push(ssrRenderComponent(_component_CommonBlurhash, {
              blurhash: unref(card).blurhash,
              src: unref(card).image,
              "w-full": "",
              "h-full": "",
              "object-cover": "",
              "rounded-lg": ""
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<div>`);
          if (unref(vnode)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(vnode)), {
              "rounded-lg": "",
              "h-80": ""
            }, null), _parent);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/StatusEmbeddedMedia.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "StatusContent",
  __ssrInlineRender: true,
  props: {
    status: {},
    newer: {},
    context: {},
    isPreview: { type: Boolean },
    inNotification: { type: Boolean }
  },
  setup(__props) {
    const isDM = computed(() => __props.status.visibility === "direct");
    const isDetails = computed(() => __props.context === "details");
    const filterResult = computed(() => __props.status.filtered?.length ? __props.status.filtered[0] : null);
    const filter = computed(() => filterResult.value?.filter);
    const filterPhrase = computed(() => filter.value?.title);
    const isFiltered = computed(() => __props.status.account.id !== currentUser.value?.account.id && filterPhrase && __props.context && __props.context !== "details" && !!filter.value?.context.includes(__props.context));
    const spoilerTextPresent = computed(() => !!__props.status.spoilerText && __props.status.spoilerText.trim().length > 0);
    const hasSpoilerOrSensitiveMedia = computed(() => spoilerTextPresent.value || __props.status.sensitive && !!__props.status.mediaAttachments.length);
    const isSensitiveNonSpoiler = computed(() => __props.status.sensitive && !__props.status.spoilerText && !!__props.status.mediaAttachments.length);
    const hideAllMedia = computed(
      () => {
        return currentUser.value ? getHideMediaByDefault(currentUser.value.account) && (!!__props.status.mediaAttachments.length || !!__props.status.card?.html) : false;
      }
    );
    const embeddedMediaPreference = usePreferences("experimentalEmbeddedMedia");
    const allowEmbeddedMedia = computed(() => __props.status.card?.html && embeddedMediaPreference.value);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_StatusBody = _sfc_main$9;
      const _component_StatusSpoiler = _sfc_main$8;
      const _component_StatusTranslation = _sfc_main$7;
      const _component_StatusPoll = _sfc_main$6;
      const _component_StatusMedia = _sfc_main$4;
      const _component_StatusPreviewCard = _sfc_main$n;
      const _component_StatusEmbeddedMedia = _sfc_main$3;
      const _component_StatusCard = _sfc_main;
      _push(`<div${ssrRenderAttrs(mergeProps({
        "space-y-3": "",
        class: {
          "pt2 pb0.5 px3.5 bg-dm rounded-4 me--1": unref(isDM),
          "ms--3.5 mt--1 ms--1": unref(isDM) && _ctx.context !== "details"
        }
      }, _attrs))}>`);
      if (!unref(isFiltered) && unref(isSensitiveNonSpoiler) || unref(hideAllMedia)) {
        _push(ssrRenderComponent(_component_StatusBody, {
          status: _ctx.status,
          newer: _ctx.newer,
          "with-action": !unref(isDetails),
          class: unref(isDetails) ? "text-xl" : ""
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_StatusSpoiler, {
        enabled: unref(hasSpoilerOrSensitiveMedia) || unref(isFiltered),
        filter: unref(isFiltered),
        "sensitive-non-spoiler": unref(isSensitiveNonSpoiler) || unref(hideAllMedia),
        "is-d-m": unref(isDM)
      }, createSlots({
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!(unref(isSensitiveNonSpoiler) || unref(hideAllMedia))) {
              _push2(ssrRenderComponent(_component_StatusBody, {
                status: _ctx.status,
                newer: _ctx.newer,
                "with-action": !unref(isDetails),
                class: unref(isDetails) ? "text-xl" : ""
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_StatusTranslation, { status: _ctx.status }, null, _parent2, _scopeId));
            if (_ctx.status.poll) {
              _push2(ssrRenderComponent(_component_StatusPoll, { status: _ctx.status }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.status.mediaAttachments?.length) {
              _push2(ssrRenderComponent(_component_StatusMedia, {
                status: _ctx.status,
                "is-preview": _ctx.isPreview
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.status.card && !unref(allowEmbeddedMedia)) {
              _push2(ssrRenderComponent(_component_StatusPreviewCard, {
                card: _ctx.status.card,
                "small-picture-only": _ctx.status.mediaAttachments?.length > 0
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(allowEmbeddedMedia)) {
              _push2(ssrRenderComponent(_component_StatusEmbeddedMedia, { status: _ctx.status }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.status.reblog) {
              _push2(ssrRenderComponent(_component_StatusCard, {
                status: _ctx.status.reblog,
                border: "~ rounded",
                actions: false
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(isDM)) {
              _push2(`<div${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !(unref(isSensitiveNonSpoiler) || unref(hideAllMedia)) ? (openBlock(), createBlock(_component_StatusBody, {
                key: 0,
                status: _ctx.status,
                newer: _ctx.newer,
                "with-action": !unref(isDetails),
                class: unref(isDetails) ? "text-xl" : ""
              }, null, 8, ["status", "newer", "with-action", "class"])) : createCommentVNode("", true),
              createVNode(_component_StatusTranslation, { status: _ctx.status }, null, 8, ["status"]),
              _ctx.status.poll ? (openBlock(), createBlock(_component_StatusPoll, {
                key: 1,
                status: _ctx.status
              }, null, 8, ["status"])) : createCommentVNode("", true),
              _ctx.status.mediaAttachments?.length ? (openBlock(), createBlock(_component_StatusMedia, {
                key: 2,
                status: _ctx.status,
                "is-preview": _ctx.isPreview
              }, null, 8, ["status", "is-preview"])) : createCommentVNode("", true),
              _ctx.status.card && !unref(allowEmbeddedMedia) ? (openBlock(), createBlock(_component_StatusPreviewCard, {
                key: 3,
                card: _ctx.status.card,
                "small-picture-only": _ctx.status.mediaAttachments?.length > 0
              }, null, 8, ["card", "small-picture-only"])) : createCommentVNode("", true),
              unref(allowEmbeddedMedia) ? (openBlock(), createBlock(_component_StatusEmbeddedMedia, {
                key: 4,
                status: _ctx.status
              }, null, 8, ["status"])) : createCommentVNode("", true),
              _ctx.status.reblog ? (openBlock(), createBlock(_component_StatusCard, {
                key: 5,
                status: _ctx.status.reblog,
                border: "~ rounded",
                actions: false
              }, null, 8, ["status"])) : createCommentVNode("", true),
              unref(isDM) ? (openBlock(), createBlock("div", { key: 6 })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 2
      }, [
        unref(spoilerTextPresent) ? {
          name: "spoiler",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<p${_scopeId}>${ssrInterpolate(_ctx.status.spoilerText)}</p>`);
            } else {
              return [
                createVNode("p", null, toDisplayString(_ctx.status.spoilerText), 1)
              ];
            }
          }),
          key: "0"
        } : unref(filterPhrase) ? {
          name: "spoiler",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<p${_scopeId}>${ssrInterpolate(`${_ctx.$t("status.filter_hidden_phrase")}: ${unref(filterPhrase)}`)}</p>`);
            } else {
              return [
                createVNode("p", null, toDisplayString(`${_ctx.$t("status.filter_hidden_phrase")}: ${unref(filterPhrase)}`), 1)
              ];
            }
          }),
          key: "1"
        } : void 0
      ]), _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/StatusContent.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "StatusActions",
  __ssrInlineRender: true,
  props: {
    status: {},
    details: { type: Boolean },
    command: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const focusEditor = inject("focus-editor", noop$1);
    const { details, command } = props;
    const userSettings = useUserSettings();
    const useStarFavoriteIcon = usePreferences("useStarFavoriteIcon");
    const {
      status,
      isLoading,
      canReblog,
      toggleBookmark,
      toggleFavourite,
      toggleReblog
    } = useStatusActions(props);
    function reply() {
      if (!checkLogin())
        return;
      if (details)
        focusEditor();
      else
        navigateToStatus({ status: status.value, focusReply: true });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_StatusActionButton = _sfc_main$b;
      const _component_CommonLocalizedNumber = _sfc_main$h$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        flex: "",
        "justify-between": "",
        "items-center": "",
        class: "status-actions"
      }, _attrs))}><div flex-1>`);
      _push(ssrRenderComponent(_component_StatusActionButton, {
        content: _ctx.$t("action.reply"),
        text: !("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideReplyCount") && unref(status).repliesCount || "",
        color: "text-blue",
        hover: "text-blue",
        "elk-group-hover": "bg-blue/10",
        icon: "i-ri:chat-1-line",
        command: unref(command),
        onClick: reply
      }, createSlots({ _: 2 }, [
        unref(status).repliesCount && !("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideReplyCount") ? {
          name: "text",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_CommonLocalizedNumber, {
                keypath: "action.reply_count",
                count: unref(status).repliesCount
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_CommonLocalizedNumber, {
                  keypath: "action.reply_count",
                  count: unref(status).repliesCount
                }, null, 8, ["count"])
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
      _push(`</div><div flex-1>`);
      _push(ssrRenderComponent(_component_StatusActionButton, {
        content: _ctx.$t(unref(status).reblogged ? "action.boosted" : "action.boost"),
        text: !("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideBoostCount") && unref(status).reblogsCount ? unref(status).reblogsCount : "",
        color: "text-green",
        hover: "text-green",
        "elk-group-hover": "bg-green/10",
        icon: "i-ri:repeat-line",
        "active-icon": "i-ri:repeat-fill",
        "inactive-icon": "i-tabler:repeat-off",
        active: !!unref(status).reblogged,
        disabled: unref(isLoading).reblogged || !unref(canReblog),
        command: unref(command),
        onClick: ($event) => unref(toggleReblog)()
      }, createSlots({ _: 2 }, [
        unref(status).reblogsCount && !("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideBoostCount") ? {
          name: "text",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_CommonLocalizedNumber, {
                keypath: "action.boost_count",
                count: unref(status).reblogsCount
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_CommonLocalizedNumber, {
                  keypath: "action.boost_count",
                  count: unref(status).reblogsCount
                }, null, 8, ["count"])
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
      _push(`</div><div flex-1>`);
      _push(ssrRenderComponent(_component_StatusActionButton, {
        content: _ctx.$t(unref(status).favourited ? "action.favourited" : "action.favourite"),
        text: !("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideFavoriteCount") && unref(status).favouritesCount ? unref(status).favouritesCount : "",
        color: unref(useStarFavoriteIcon) ? "text-yellow" : "text-rose",
        hover: unref(useStarFavoriteIcon) ? "text-yellow" : "text-rose",
        "elk-group-hover": unref(useStarFavoriteIcon) ? "bg-yellow/10" : "bg-rose/10",
        icon: unref(useStarFavoriteIcon) ? "i-ri:star-line" : "i-ri:heart-3-line",
        "active-icon": unref(useStarFavoriteIcon) ? "i-ri:star-fill" : "i-ri:heart-3-fill",
        active: !!unref(status).favourited,
        disabled: unref(isLoading).favourited,
        command: unref(command),
        onClick: ($event) => unref(toggleFavourite)()
      }, createSlots({ _: 2 }, [
        unref(status).favouritesCount && !("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideFavoriteCount") ? {
          name: "text",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_CommonLocalizedNumber, {
                keypath: "action.favourite_count",
                count: unref(status).favouritesCount
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_CommonLocalizedNumber, {
                  keypath: "action.favourite_count",
                  count: unref(status).favouritesCount
                }, null, 8, ["count"])
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
      _push(`</div><div flex-none>`);
      _push(ssrRenderComponent(_component_StatusActionButton, {
        content: _ctx.$t(unref(status).bookmarked ? "action.bookmarked" : "action.bookmark"),
        color: unref(useStarFavoriteIcon) ? "text-rose" : "text-yellow",
        hover: unref(useStarFavoriteIcon) ? "text-rose" : "text-yellow",
        "elk-group-hover": unref(useStarFavoriteIcon) ? "bg-rose/10" : "bg-yellow/10",
        icon: "i-ri:bookmark-line",
        "active-icon": "i-ri:bookmark-fill",
        active: !!unref(status).bookmarked,
        disabled: unref(isLoading).bookmarked,
        command: unref(command),
        onClick: ($event) => unref(toggleBookmark)()
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/StatusActions.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "StatusCard",
  __ssrInlineRender: true,
  props: {
    status: {},
    actions: { type: Boolean, default: true },
    context: {},
    hover: { type: Boolean },
    inNotification: { type: Boolean },
    isPreview: { type: Boolean },
    older: {},
    newer: {},
    hasOlder: { type: Boolean },
    hasNewer: { type: Boolean },
    main: {}
  },
  setup(__props) {
    const props = __props;
    const userSettings = useUserSettings();
    const status = computed(() => {
      if (props.status.reblog && (!props.status.content || props.status.content === props.status.reblog.content))
        return props.status.reblog;
      return props.status;
    });
    const directReply = computed(() => props.hasNewer || !!status.value.inReplyToId && (status.value.inReplyToId === props.newer?.id || status.value.inReplyToId === props.newer?.reblog?.id));
    const connectReply = computed(() => props.hasOlder || status.value.id === props.older?.inReplyToId || status.value.id === props.older?.reblog?.inReplyToId);
    const replyToMain = computed(() => props.main && props.main.id === status.value.inReplyToId);
    const rebloggedBy = computed(() => props.status.reblog ? props.status.account : null);
    const statusRoute = computed(() => getStatusRoute(status.value));
    const router = useRouter();
    function go(evt) {
      if (evt.metaKey || evt.ctrlKey) {
        (void 0).open(statusRoute.value.href);
      } else {
        cacheStatus(status.value);
        router.push(statusRoute.value);
      }
    }
    const createdAt = useFormattedDateTime(status.value.createdAt);
    const timeAgoOptions = useTimeAgoOptions(true);
    const timeago = useTimeAgo(() => status.value.createdAt, timeAgoOptions);
    const isSelfReply = computed(() => status.value.inReplyToAccountId === status.value.account.id);
    const collapseRebloggedBy = computed(() => rebloggedBy.value?.id === status.value.account.id);
    const isDM = computed(() => status.value.visibility === "direct");
    const showUpperBorder = computed(() => props.newer && !directReply.value);
    const showReplyTo = computed(() => !replyToMain.value && !directReply.value);
    const forceShow = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_StatusLink = _sfc_main$j;
      const _component_StatusReplyingTo = _sfc_main$i;
      const _component_AccountHoverWrapper = _sfc_main$e$1;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AccountAvatar = _sfc_main$u;
      const _component_AccountInlineInfo = _sfc_main$k;
      const _component_AccountBigAvatar = _sfc_main$d$1;
      const _component_StatusAccountDetails = _sfc_main$h;
      const _component_AccountLockIndicator = _sfc_main$a$1;
      const _component_AccountBotIndicator = _sfc_main$9$1;
      const _component_StatusVisibilityIndicator = _sfc_main$g;
      const _component_CommonTooltip = _sfc_main$o;
      const _component_StatusEditIndicator = _sfc_main$d;
      const _component_StatusActionsMore = _sfc_main$a;
      const _component_StatusContent = _sfc_main$2;
      const _component_StatusActions = _sfc_main$1;
      _push(ssrRenderComponent(_component_StatusLink, mergeProps({
        status: unref(status),
        hover: _ctx.hover
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${ssrRenderAttr("h", unref(showUpperBorder) ? "1px" : "0")} w-auto bg-border mb-1${_scopeId}></div>`);
            ssrRenderSlot(_ctx.$slots, "meta", {}, () => {
              if (unref(status).inReplyToAccountId) {
                _push2(`<!--[-->`);
                if (unref(showReplyTo)) {
                  _push2(ssrRenderComponent(_component_StatusReplyingTo, {
                    m: "is-5",
                    p: "t-1 is-5",
                    status: unref(status),
                    "is-self-reply": unref(isSelfReply),
                    class: _ctx.inNotification ? "text-secondary-light" : ""
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div flex="~ col gap-1" items-center pos="absolute top-0 inset-is-0" w="77px" z--1${_scopeId}>`);
                if (unref(showReplyTo)) {
                  _push2(`<!--[--><div w="1px" h="0.5" border="x base" mt-3${_scopeId}></div><div w="1px" h="0.5" border="x base"${_scopeId}></div><div w="1px" h="0.5" border="x base"${_scopeId}></div><!--]-->`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div w="1px" h-10 border="x base"${_scopeId}></div></div><!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div flex="~ col" justify-between${_scopeId}>`);
              if (unref(rebloggedBy) && !unref(collapseRebloggedBy)) {
                _push2(`<div flex="~" items-center p="t-1 b-0.5 x-1px" relative text-secondary ws-nowrap${_scopeId}><div i-ri:repeat-fill me-46px text-green w-16px h-16px class="status-boosted"${_scopeId}></div><div absolute top-1 ms-24px w-32px h-32px rounded-full${_scopeId}>`);
                _push2(ssrRenderComponent(_component_AccountHoverWrapper, { account: unref(rebloggedBy) }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_NuxtLink, {
                        to: ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(unref(rebloggedBy))
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_AccountAvatar, { account: unref(rebloggedBy) }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_AccountAvatar, { account: unref(rebloggedBy) }, null, 8, ["account"])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_NuxtLink, {
                          to: ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(unref(rebloggedBy))
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_AccountAvatar, { account: unref(rebloggedBy) }, null, 8, ["account"])
                          ]),
                          _: 1
                        }, 8, ["to"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
                _push2(ssrRenderComponent(_component_AccountInlineInfo, {
                  "font-bold": "",
                  account: unref(rebloggedBy),
                  avatar: false,
                  "text-sm": ""
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }, _push2, _parent2, _scopeId);
            _push2(`<div flex gap-3 class="${ssrRenderClass({ "text-secondary": _ctx.inNotification })}"${_scopeId}>`);
            if (unref(status).account.suspended && !unref(forceShow)) {
              _push2(`<div flex="~col 1" min-w-0${_scopeId}><p italic${_scopeId}>${ssrInterpolate(_ctx.$t("status.account.suspended_message"))}</p><div${_scopeId}><button p-0 flex="~ center" gap-2 text-sm btn-text${_scopeId}><div i-ri:eye-line${_scopeId}></div><span${_scopeId}>${ssrInterpolate(_ctx.$t("status.account.suspended_show"))}</span></button></div></div>`);
            } else {
              _push2(`<!--[--><div relative${_scopeId}>`);
              if (unref(collapseRebloggedBy)) {
                _push2(`<div absolute flex items-center justify-center top--6px px-2px py-3px rounded-full bg-base${_scopeId}><div i-ri:repeat-fill text-green w-16px h-16px${_scopeId}></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_AccountHoverWrapper, {
                account: unref(status).account
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtLink, {
                      to: ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(unref(status).account),
                      "rounded-full": ""
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_AccountBigAvatar, {
                            account: unref(status).account
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_AccountBigAvatar, {
                              account: unref(status).account
                            }, null, 8, ["account"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_NuxtLink, {
                        to: ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(unref(status).account),
                        "rounded-full": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_AccountBigAvatar, {
                            account: unref(status).account
                          }, null, 8, ["account"])
                        ]),
                        _: 1
                      }, 8, ["to"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (unref(connectReply)) {
                _push2(`<div w-full h-full flex mt--3px justify-center${_scopeId}><div w-1px border="x base" mb-9${_scopeId}></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div flex="~ col 1" min-w-0${_scopeId}><div flex items-center space-x-1${_scopeId}>`);
              _push2(ssrRenderComponent(_component_AccountHoverWrapper, {
                account: unref(status).account
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_StatusAccountDetails, {
                      account: unref(status).account
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_StatusAccountDetails, {
                        account: unref(status).account
                      }, null, 8, ["account"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div flex-auto${_scopeId}></div><div style="${ssrRenderStyle(!("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "zenMode") ? null : { display: "none" })}" text-sm text-secondary flex="~ row nowrap" hover:underline whitespace-nowrap${_scopeId}>`);
              if (unref(status).account.locked) {
                _push2(ssrRenderComponent(_component_AccountLockIndicator, { "me-2": "" }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (unref(status).account.bot) {
                _push2(ssrRenderComponent(_component_AccountBotIndicator, { "me-2": "" }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div flex="~ gap1" items-center${_scopeId}>`);
              if (unref(status).visibility !== "public") {
                _push2(ssrRenderComponent(_component_StatusVisibilityIndicator, { status: unref(status) }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div flex${_scopeId}>`);
              _push2(ssrRenderComponent(_component_CommonTooltip, {
                content: unref(createdAt),
                "no-auto-focus": ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtLink, {
                      title: unref(status).createdAt,
                      href: unref(statusRoute).href,
                      onClick: ($event) => go($event)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<time text-sm ws-nowrap hover:underline${ssrRenderAttr("datetime", unref(status).createdAt)}${_scopeId3}>${ssrInterpolate(unref(timeago))}</time>`);
                        } else {
                          return [
                            createVNode("time", {
                              "text-sm": "",
                              "ws-nowrap": "",
                              "hover:underline": "",
                              datetime: unref(status).createdAt
                            }, toDisplayString(unref(timeago)), 9, ["datetime"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_NuxtLink, {
                        title: unref(status).createdAt,
                        href: unref(statusRoute).href,
                        onClick: withModifiers(($event) => go($event), ["prevent"])
                      }, {
                        default: withCtx(() => [
                          createVNode("time", {
                            "text-sm": "",
                            "ws-nowrap": "",
                            "hover:underline": "",
                            datetime: unref(status).createdAt
                          }, toDisplayString(unref(timeago)), 9, ["datetime"])
                        ]),
                        _: 1
                      }, 8, ["title", "href", "onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_StatusEditIndicator, {
                status: unref(status),
                inline: ""
              }, null, _parent2, _scopeId));
              _push2(`</div></div></div>`);
              if (_ctx.actions !== false) {
                _push2(ssrRenderComponent(_component_StatusActionsMore, {
                  status: unref(status),
                  "me--2": ""
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              _push2(ssrRenderComponent(_component_StatusContent, {
                status: unref(status),
                newer: _ctx.newer,
                context: _ctx.context,
                "is-preview": _ctx.isPreview,
                "in-notification": _ctx.inNotification,
                mb2: "",
                class: { "mt-2 mb1": unref(isDM) }
              }, null, _parent2, _scopeId));
              if (_ctx.actions !== false) {
                _push2(ssrRenderComponent(_component_StatusActions, {
                  style: !("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "zenMode") ? null : { display: "none" },
                  status: unref(status)
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><!--]-->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                h: unref(showUpperBorder) ? "1px" : "0",
                "w-auto": "",
                "bg-border": "",
                "mb-1": ""
              }, null, 8, ["h"]),
              renderSlot(_ctx.$slots, "meta", {}, () => [
                unref(status).inReplyToAccountId ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  unref(showReplyTo) ? (openBlock(), createBlock(_component_StatusReplyingTo, {
                    key: 0,
                    m: "is-5",
                    p: "t-1 is-5",
                    status: unref(status),
                    "is-self-reply": unref(isSelfReply),
                    class: _ctx.inNotification ? "text-secondary-light" : ""
                  }, null, 8, ["status", "is-self-reply", "class"])) : createCommentVNode("", true),
                  createVNode("div", {
                    flex: "~ col gap-1",
                    "items-center": "",
                    pos: "absolute top-0 inset-is-0",
                    w: "77px",
                    "z--1": ""
                  }, [
                    unref(showReplyTo) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createVNode("div", {
                        w: "1px",
                        h: "0.5",
                        border: "x base",
                        "mt-3": ""
                      }),
                      createVNode("div", {
                        w: "1px",
                        h: "0.5",
                        border: "x base"
                      }),
                      createVNode("div", {
                        w: "1px",
                        h: "0.5",
                        border: "x base"
                      })
                    ], 64)) : createCommentVNode("", true),
                    createVNode("div", {
                      w: "1px",
                      "h-10": "",
                      border: "x base"
                    })
                  ])
                ], 64)) : createCommentVNode("", true),
                createVNode("div", {
                  flex: "~ col",
                  "justify-between": ""
                }, [
                  unref(rebloggedBy) && !unref(collapseRebloggedBy) ? (openBlock(), createBlock("div", {
                    key: 0,
                    flex: "~",
                    "items-center": "",
                    p: "t-1 b-0.5 x-1px",
                    relative: "",
                    "text-secondary": "",
                    "ws-nowrap": ""
                  }, [
                    createVNode("div", {
                      "i-ri:repeat-fill": "",
                      "me-46px": "",
                      "text-green": "",
                      "w-16px": "",
                      "h-16px": "",
                      class: "status-boosted"
                    }),
                    createVNode("div", {
                      absolute: "",
                      "top-1": "",
                      "ms-24px": "",
                      "w-32px": "",
                      "h-32px": "",
                      "rounded-full": ""
                    }, [
                      createVNode(_component_AccountHoverWrapper, { account: unref(rebloggedBy) }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtLink, {
                            to: ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(unref(rebloggedBy))
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_AccountAvatar, { account: unref(rebloggedBy) }, null, 8, ["account"])
                            ]),
                            _: 1
                          }, 8, ["to"])
                        ]),
                        _: 1
                      }, 8, ["account"])
                    ]),
                    createVNode(_component_AccountInlineInfo, {
                      "font-bold": "",
                      account: unref(rebloggedBy),
                      avatar: false,
                      "text-sm": ""
                    }, null, 8, ["account"])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              createVNode("div", {
                flex: "",
                "gap-3": "",
                class: { "text-secondary": _ctx.inNotification }
              }, [
                unref(status).account.suspended && !unref(forceShow) ? (openBlock(), createBlock("div", {
                  key: 0,
                  flex: "~col 1",
                  "min-w-0": ""
                }, [
                  createVNode("p", { italic: "" }, toDisplayString(_ctx.$t("status.account.suspended_message")), 1),
                  createVNode("div", null, [
                    createVNode("button", {
                      "p-0": "",
                      flex: "~ center",
                      "gap-2": "",
                      "text-sm": "",
                      "btn-text": "",
                      onClick: ($event) => forceShow.value = true
                    }, [
                      createVNode("div", { "i-ri:eye-line": "" }),
                      createVNode("span", null, toDisplayString(_ctx.$t("status.account.suspended_show")), 1)
                    ], 8, ["onClick"])
                  ])
                ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createVNode("div", { relative: "" }, [
                    unref(collapseRebloggedBy) ? (openBlock(), createBlock("div", {
                      key: 0,
                      absolute: "",
                      flex: "",
                      "items-center": "",
                      "justify-center": "",
                      "top--6px": "",
                      "px-2px": "",
                      "py-3px": "",
                      "rounded-full": "",
                      "bg-base": ""
                    }, [
                      createVNode("div", {
                        "i-ri:repeat-fill": "",
                        "text-green": "",
                        "w-16px": "",
                        "h-16px": ""
                      })
                    ])) : createCommentVNode("", true),
                    createVNode(_component_AccountHoverWrapper, {
                      account: unref(status).account
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtLink, {
                          to: ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(unref(status).account),
                          "rounded-full": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_AccountBigAvatar, {
                              account: unref(status).account
                            }, null, 8, ["account"])
                          ]),
                          _: 1
                        }, 8, ["to"])
                      ]),
                      _: 1
                    }, 8, ["account"]),
                    unref(connectReply) ? (openBlock(), createBlock("div", {
                      key: 1,
                      "w-full": "",
                      "h-full": "",
                      flex: "",
                      "mt--3px": "",
                      "justify-center": ""
                    }, [
                      createVNode("div", {
                        "w-1px": "",
                        border: "x base",
                        "mb-9": ""
                      })
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", {
                    flex: "~ col 1",
                    "min-w-0": ""
                  }, [
                    createVNode("div", {
                      flex: "",
                      "items-center": "",
                      "space-x-1": ""
                    }, [
                      createVNode(_component_AccountHoverWrapper, {
                        account: unref(status).account
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_StatusAccountDetails, {
                            account: unref(status).account
                          }, null, 8, ["account"])
                        ]),
                        _: 1
                      }, 8, ["account"]),
                      createVNode("div", { "flex-auto": "" }),
                      withDirectives(createVNode("div", {
                        "text-sm": "",
                        "text-secondary": "",
                        flex: "~ row nowrap",
                        "hover:underline": "",
                        "whitespace-nowrap": ""
                      }, [
                        unref(status).account.locked ? (openBlock(), createBlock(_component_AccountLockIndicator, {
                          key: 0,
                          "me-2": ""
                        })) : createCommentVNode("", true),
                        unref(status).account.bot ? (openBlock(), createBlock(_component_AccountBotIndicator, {
                          key: 1,
                          "me-2": ""
                        })) : createCommentVNode("", true),
                        createVNode("div", {
                          flex: "~ gap1",
                          "items-center": ""
                        }, [
                          unref(status).visibility !== "public" ? (openBlock(), createBlock(_component_StatusVisibilityIndicator, {
                            key: 0,
                            status: unref(status)
                          }, null, 8, ["status"])) : createCommentVNode("", true),
                          createVNode("div", { flex: "" }, [
                            createVNode(_component_CommonTooltip, {
                              content: unref(createdAt),
                              "no-auto-focus": ""
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_NuxtLink, {
                                  title: unref(status).createdAt,
                                  href: unref(statusRoute).href,
                                  onClick: withModifiers(($event) => go($event), ["prevent"])
                                }, {
                                  default: withCtx(() => [
                                    createVNode("time", {
                                      "text-sm": "",
                                      "ws-nowrap": "",
                                      "hover:underline": "",
                                      datetime: unref(status).createdAt
                                    }, toDisplayString(unref(timeago)), 9, ["datetime"])
                                  ]),
                                  _: 1
                                }, 8, ["title", "href", "onClick"])
                              ]),
                              _: 1
                            }, 8, ["content"]),
                            createVNode(_component_StatusEditIndicator, {
                              status: unref(status),
                              inline: ""
                            }, null, 8, ["status"])
                          ])
                        ])
                      ], 512), [
                        [vShow, !("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "zenMode")]
                      ]),
                      _ctx.actions !== false ? (openBlock(), createBlock(_component_StatusActionsMore, {
                        key: 0,
                        status: unref(status),
                        "me--2": ""
                      }, null, 8, ["status"])) : createCommentVNode("", true)
                    ]),
                    createVNode(_component_StatusContent, {
                      status: unref(status),
                      newer: _ctx.newer,
                      context: _ctx.context,
                      "is-preview": _ctx.isPreview,
                      "in-notification": _ctx.inNotification,
                      mb2: "",
                      class: { "mt-2 mb1": unref(isDM) }
                    }, null, 8, ["status", "newer", "context", "is-preview", "in-notification", "class"]),
                    _ctx.actions !== false ? withDirectives((openBlock(), createBlock(_component_StatusActions, {
                      key: 0,
                      status: unref(status)
                    }, null, 8, ["status"])), [
                      [vShow, !("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "zenMode")]
                    ]) : createCommentVNode("", true)
                  ])
                ], 64))
              ], 2)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/StatusCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _, _sfc_main$a as a, _sfc_main$2 as b, _sfc_main$d as c, _sfc_main$g as d, _sfc_main$1 as e, _sfc_main$5 as f, _sfc_main$j as g, _sfc_main$9 as h, _sfc_main$4 as i, _sfc_main$6 as j, _sfc_main$8 as k };
