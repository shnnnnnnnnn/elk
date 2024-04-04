import { b as _sfc_main$d } from './CommonPaginator-BbZe3uv5.mjs';
import { u as useRoute, Z as useLocalStorage, bd as STORAGE_KEY_LAST_ACCESSED_NOTIFICATION_ROUTE, Y as useMastoClient, a4 as useStreaming, k as getAccountRoute, x as usePreferences, e as useI18n, be as getReportRoute, ar as useHumanReadableNumber, aG as _sfc_main$h, R as _sfc_main$c, m as _sfc_main$e, l as __nuxt_component_0$1, P as _sfc_main$u } from './server.mjs';
import { _ as _sfc_main$5 } from './AccountCard-CqNJdiOX.mjs';
import { useSSRContext, defineComponent, mergeProps, unref, computed, ref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, resolveComponent } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { g as _sfc_main$j, h as _sfc_main$9, i as _sfc_main$4$1, j as _sfc_main$6, _ as _sfc_main$a } from './StatusCard-CHVUTCdD.mjs';
import { _ as _sfc_main$7 } from './AccountBigCard-BGOdR6LF.mjs';
import { _ as _sfc_main$8 } from './AccountFollowRequestButton-F9n9PrN0.mjs';
import { _ as _sfc_main$b } from './AccountInlineInfo-s2DIkMwx.mjs';
import { u as useNotifications } from './notification-DvxggPx6.mjs';

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "NotificationGroupedFollow",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    const count = computed(() => __props.items.items.length);
    const isExpanded = ref(false);
    const lang = computed(() => {
      return count.value > 1 || count.value === 0 ? void 0 : __props.items.items[0].status?.language;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLocalizedNumber = _sfc_main$h;
      const _component_AccountDisplayName = _sfc_main$c;
      const _component_AccountCard = _sfc_main$5;
      const _component_AccountHoverWrapper = _sfc_main$e;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AccountAvatar = _sfc_main$u;
      _push(`<article${ssrRenderAttrs(mergeProps({
        flex: "",
        "flex-col": "",
        relative: "",
        lang: unref(lang) ?? void 0
      }, _attrs))}><div flex items-center top-0 left-2 pt-2 px-3><div class="${ssrRenderClass(unref(count) > 1 ? "i-ri-group-line" : "i-ri-user-3-line")}" me-3 color-blue text-xl aria-hidden="true"></div>`);
      if (unref(count) > 1) {
        _push(ssrRenderComponent(_component_CommonLocalizedNumber, {
          keypath: "notification.followed_you_count",
          count: unref(count)
        }, null, _parent));
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_AccountDisplayName, {
          account: _ctx.items.items[0]?.account,
          "text-primary": "",
          "me-1": "",
          "font-bold": "",
          "line-clamp-1": "",
          "ws-pre-wrap": "",
          "break-all": ""
        }, null, _parent));
        _push(`<span me-1 ws-nowrap>${ssrInterpolate(_ctx.$t("notification.followed_you"))}</span><!--]-->`);
      }
      _push(`</div><div pb-2 ps8>`);
      if (unref(isExpanded)) {
        _push(`<div><!--[-->`);
        ssrRenderList(_ctx.items.items, (item) => {
          _push(ssrRenderComponent(_component_AccountCard, {
            key: item.id,
            account: item.account,
            p3: ""
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div flex="~ wrap gap-1.75" p4><!--[-->`);
        ssrRenderList(_ctx.items.items, (item) => {
          _push(ssrRenderComponent(_component_AccountHoverWrapper, {
            key: item.id,
            account: item.account
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  to: ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(item.account)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_AccountAvatar, {
                        account: item.account,
                        "w-12": "",
                        "h-12": ""
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_AccountAvatar, {
                          account: item.account,
                          "w-12": "",
                          "h-12": ""
                        }, null, 8, ["account"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_NuxtLink, {
                    to: ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(item.account)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_AccountAvatar, {
                        account: item.account,
                        "w-12": "",
                        "h-12": ""
                      }, null, 8, ["account"])
                    ]),
                    _: 2
                  }, 1032, ["to"])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></article>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/notification/NotificationGroupedFollow.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "NotificationGroupedLikes",
  __ssrInlineRender: true,
  props: {
    group: {}
  },
  setup(__props) {
    const useStarFavoriteIcon = usePreferences("useStarFavoriteIcon");
    const reblogs = computed(() => __props.group.likes.filter((i) => i.reblog));
    const likes = computed(() => __props.group.likes.filter((i) => i.favourite && !i.reblog));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_StatusLink = _sfc_main$j;
      const _component_AccountHoverWrapper = _sfc_main$e;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AccountAvatar = _sfc_main$u;
      const _component_StatusBody = _sfc_main$9;
      const _component_StatusMedia = _sfc_main$4$1;
      const _component_StatusPoll = _sfc_main$6;
      _push(`<article${ssrRenderAttrs(mergeProps({
        flex: "",
        "flex-col": "",
        relative: ""
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_StatusLink, {
        status: _ctx.group.status,
        pb4: "",
        pt5: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div flex flex-col gap-3${_scopeId}>`);
            if (unref(reblogs).length) {
              _push2(`<div flex="~ gap-1"${_scopeId}><div i-ri:repeat-fill text-xl me-2 color-green${_scopeId}></div><!--[-->`);
              ssrRenderList(unref(reblogs), (i, idx) => {
                _push2(ssrRenderComponent(_component_AccountHoverWrapper, {
                  account: i.account
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_NuxtLink, {
                        to: ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(i.account)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_AccountAvatar, {
                              "text-primary": "",
                              "font-bold": "",
                              account: i.account,
                              class: "h-1.5em w-1.5em"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_AccountAvatar, {
                                "text-primary": "",
                                "font-bold": "",
                                account: i.account,
                                class: "h-1.5em w-1.5em"
                              }, null, 8, ["account"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_NuxtLink, {
                          to: ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(i.account)
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_AccountAvatar, {
                              "text-primary": "",
                              "font-bold": "",
                              account: i.account,
                              class: "h-1.5em w-1.5em"
                            }, null, 8, ["account"])
                          ]),
                          _: 2
                        }, 1032, ["to"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--><div ml1${_scopeId}>${ssrInterpolate(_ctx.$t("notification.reblogged_post"))}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(likes).length) {
              _push2(`<div flex="~ gap-1"${_scopeId}><div class="${ssrRenderClass(unref(useStarFavoriteIcon) ? "i-ri:star-line color-yellow" : "i-ri:heart-line color-red")}" text-xl me-2${_scopeId}></div><!--[-->`);
              ssrRenderList(unref(likes), (i, idx) => {
                _push2(ssrRenderComponent(_component_AccountHoverWrapper, {
                  account: i.account
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_NuxtLink, {
                        to: ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(i.account)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_AccountAvatar, {
                              "text-primary": "",
                              "font-bold": "",
                              account: i.account,
                              class: "h-1.5em w-1.5em"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_AccountAvatar, {
                                "text-primary": "",
                                "font-bold": "",
                                account: i.account,
                                class: "h-1.5em w-1.5em"
                              }, null, 8, ["account"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_NuxtLink, {
                          to: ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(i.account)
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_AccountAvatar, {
                              "text-primary": "",
                              "font-bold": "",
                              account: i.account,
                              class: "h-1.5em w-1.5em"
                            }, null, 8, ["account"])
                          ]),
                          _: 2
                        }, 1032, ["to"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--><div ms1${_scopeId}>${ssrInterpolate(_ctx.$t("notification.favourited_post"))}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div ps9 mt-1${_scopeId}>`);
            _push2(ssrRenderComponent(_component_StatusBody, {
              status: _ctx.group.status,
              "text-secondary": ""
            }, null, _parent2, _scopeId));
            if (!_ctx.group.status.content) {
              _push2(`<!--[-->`);
              if (_ctx.group.status.mediaAttachments?.length) {
                _push2(ssrRenderComponent(_component_StatusMedia, {
                  status: _ctx.group.status,
                  "is-preview": false,
                  "pointer-events-none": ""
                }, null, _parent2, _scopeId));
              } else if (_ctx.group.status.poll) {
                _push2(ssrRenderComponent(_component_StatusPoll, {
                  status: _ctx.group.status
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                flex: "",
                "flex-col": "",
                "gap-3": ""
              }, [
                unref(reblogs).length ? (openBlock(), createBlock("div", {
                  key: 0,
                  flex: "~ gap-1"
                }, [
                  createVNode("div", {
                    "i-ri:repeat-fill": "",
                    "text-xl": "",
                    "me-2": "",
                    "color-green": ""
                  }),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(reblogs), (i, idx) => {
                    return openBlock(), createBlock(_component_AccountHoverWrapper, {
                      key: idx,
                      account: i.account
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtLink, {
                          to: ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(i.account)
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_AccountAvatar, {
                              "text-primary": "",
                              "font-bold": "",
                              account: i.account,
                              class: "h-1.5em w-1.5em"
                            }, null, 8, ["account"])
                          ]),
                          _: 2
                        }, 1032, ["to"])
                      ]),
                      _: 2
                    }, 1032, ["account"]);
                  }), 128)),
                  createVNode("div", { ml1: "" }, toDisplayString(_ctx.$t("notification.reblogged_post")), 1)
                ])) : createCommentVNode("", true),
                unref(likes).length ? (openBlock(), createBlock("div", {
                  key: 1,
                  flex: "~ gap-1"
                }, [
                  createVNode("div", {
                    class: unref(useStarFavoriteIcon) ? "i-ri:star-line color-yellow" : "i-ri:heart-line color-red",
                    "text-xl": "",
                    "me-2": ""
                  }, null, 2),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(likes), (i, idx) => {
                    return openBlock(), createBlock(_component_AccountHoverWrapper, {
                      key: idx,
                      account: i.account
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtLink, {
                          to: ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(i.account)
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_AccountAvatar, {
                              "text-primary": "",
                              "font-bold": "",
                              account: i.account,
                              class: "h-1.5em w-1.5em"
                            }, null, 8, ["account"])
                          ]),
                          _: 2
                        }, 1032, ["to"])
                      ]),
                      _: 2
                    }, 1032, ["account"]);
                  }), 128)),
                  createVNode("div", { ms1: "" }, toDisplayString(_ctx.$t("notification.favourited_post")), 1)
                ])) : createCommentVNode("", true)
              ]),
              createVNode("div", {
                ps9: "",
                "mt-1": ""
              }, [
                createVNode(_component_StatusBody, {
                  status: _ctx.group.status,
                  "text-secondary": ""
                }, null, 8, ["status"]),
                !_ctx.group.status.content ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  _ctx.group.status.mediaAttachments?.length ? (openBlock(), createBlock(_component_StatusMedia, {
                    key: 0,
                    status: _ctx.group.status,
                    "is-preview": false,
                    "pointer-events-none": ""
                  }, null, 8, ["status"])) : _ctx.group.status.poll ? (openBlock(), createBlock(_component_StatusPoll, {
                    key: 1,
                    status: _ctx.group.status
                  }, null, 8, ["status"])) : createCommentVNode("", true)
                ], 64)) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</article>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/notification/NotificationGroupedLikes.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "NotificationCard",
  __ssrInlineRender: true,
  props: {
    notification: {}
  },
  setup(__props) {
    const { t } = useI18n();
    const unsupportedEmojiReactionTypes = ["pleroma:emoji_reaction", "reaction"];
    if (unsupportedEmojiReactionTypes.includes(__props.notification.type))
      console.warn(`[DEV] ${t("notification.missing_type")} '${__props.notification.type}' (notification.id: ${__props.notification.id})`);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AccountDisplayName = _sfc_main$c;
      const _component_AccountBigCard = _sfc_main$7;
      const _component_i18n_t = resolveComponent("i18n-t");
      const _component_AccountCard = _sfc_main$5;
      const _component_AccountFollowRequestButton = _sfc_main$8;
      const _component_StatusCard = _sfc_main$a;
      const _component_AccountInlineInfo = _sfc_main$b;
      _push(`<article${ssrRenderAttrs(mergeProps({
        flex: "",
        "flex-col": "",
        relative: ""
      }, _attrs))}>`);
      if (_ctx.notification.type === "follow") {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(_ctx.notification.account)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div flex items-center absolute ps-3 pe-4 inset-is-0 rounded-ie-be-3 py-3 bg-base top-0${_scopeId}><div i-ri-user-3-line text-xl me-3 color-blue${_scopeId}></div>`);
              _push2(ssrRenderComponent(_component_AccountDisplayName, {
                account: _ctx.notification.account,
                "text-primary": "",
                "me-1": "",
                "font-bold": "",
                "line-clamp-1": "",
                "ws-pre-wrap": "",
                "break-all": ""
              }, null, _parent2, _scopeId));
              _push2(`<span ws-nowrap${_scopeId}>${ssrInterpolate(_ctx.$t("notification.followed_you"))}</span></div>`);
              _push2(ssrRenderComponent(_component_AccountBigCard, {
                ms10: "",
                account: _ctx.notification.account
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode("div", {
                  flex: "",
                  "items-center": "",
                  absolute: "",
                  "ps-3": "",
                  "pe-4": "",
                  "inset-is-0": "",
                  "rounded-ie-be-3": "",
                  "py-3": "",
                  "bg-base": "",
                  "top-0": ""
                }, [
                  createVNode("div", {
                    "i-ri-user-3-line": "",
                    "text-xl": "",
                    "me-3": "",
                    "color-blue": ""
                  }),
                  createVNode(_component_AccountDisplayName, {
                    account: _ctx.notification.account,
                    "text-primary": "",
                    "me-1": "",
                    "font-bold": "",
                    "line-clamp-1": "",
                    "ws-pre-wrap": "",
                    "break-all": ""
                  }, null, 8, ["account"]),
                  createVNode("span", { "ws-nowrap": "" }, toDisplayString(_ctx.$t("notification.followed_you")), 1)
                ]),
                createVNode(_component_AccountBigCard, {
                  ms10: "",
                  account: _ctx.notification.account
                }, null, 8, ["account"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (_ctx.notification.type === "admin.sign_up") {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(_ctx.notification.account)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div flex p4 items-center bg-shaded${_scopeId}><div i-ri:user-add-line text-xl me-2 color-purple${_scopeId}></div>`);
              _push2(ssrRenderComponent(_component_AccountDisplayName, {
                account: _ctx.notification.account,
                "text-purple": "",
                "me-1": "",
                "font-bold": "",
                "line-clamp-1": "",
                "ws-pre-wrap": "",
                "break-all": ""
              }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>${ssrInterpolate(_ctx.$t("notification.signed_up"))}</span></div>`);
            } else {
              return [
                createVNode("div", {
                  flex: "",
                  p4: "",
                  "items-center": "",
                  "bg-shaded": ""
                }, [
                  createVNode("div", {
                    "i-ri:user-add-line": "",
                    "text-xl": "",
                    "me-2": "",
                    "color-purple": ""
                  }),
                  createVNode(_component_AccountDisplayName, {
                    account: _ctx.notification.account,
                    "text-purple": "",
                    "me-1": "",
                    "font-bold": "",
                    "line-clamp-1": "",
                    "ws-pre-wrap": "",
                    "break-all": ""
                  }, null, 8, ["account"]),
                  createVNode("span", null, toDisplayString(_ctx.$t("notification.signed_up")), 1)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (_ctx.notification.type === "admin.report") {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: ("getReportRoute" in _ctx ? _ctx.getReportRoute : unref(getReportRoute))(_ctx.notification.report?.id)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div flex p4 items-center bg-shaded${_scopeId}><div i-ri:flag-line text-xl me-2 color-purple${_scopeId}></div>`);
              _push2(ssrRenderComponent(_component_i18n_t, { keypath: "notification.reported" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_AccountDisplayName, {
                      account: _ctx.notification.account,
                      "text-purple": "",
                      "me-1": "",
                      "font-bold": "",
                      "line-clamp-1": "",
                      "ws-pre-wrap": "",
                      "break-all": ""
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_AccountDisplayName, {
                      account: _ctx.notification.report?.targetAccount,
                      "text-purple": "",
                      "ms-1": "",
                      "font-bold": "",
                      "line-clamp-1": "",
                      "ws-pre-wrap": "",
                      "break-all": ""
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_AccountDisplayName, {
                        account: _ctx.notification.account,
                        "text-purple": "",
                        "me-1": "",
                        "font-bold": "",
                        "line-clamp-1": "",
                        "ws-pre-wrap": "",
                        "break-all": ""
                      }, null, 8, ["account"]),
                      createVNode(_component_AccountDisplayName, {
                        account: _ctx.notification.report?.targetAccount,
                        "text-purple": "",
                        "ms-1": "",
                        "font-bold": "",
                        "line-clamp-1": "",
                        "ws-pre-wrap": "",
                        "break-all": ""
                      }, null, 8, ["account"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", {
                  flex: "",
                  p4: "",
                  "items-center": "",
                  "bg-shaded": ""
                }, [
                  createVNode("div", {
                    "i-ri:flag-line": "",
                    "text-xl": "",
                    "me-2": "",
                    "color-purple": ""
                  }),
                  createVNode(_component_i18n_t, { keypath: "notification.reported" }, {
                    default: withCtx(() => [
                      createVNode(_component_AccountDisplayName, {
                        account: _ctx.notification.account,
                        "text-purple": "",
                        "me-1": "",
                        "font-bold": "",
                        "line-clamp-1": "",
                        "ws-pre-wrap": "",
                        "break-all": ""
                      }, null, 8, ["account"]),
                      createVNode(_component_AccountDisplayName, {
                        account: _ctx.notification.report?.targetAccount,
                        "text-purple": "",
                        "ms-1": "",
                        "font-bold": "",
                        "line-clamp-1": "",
                        "ws-pre-wrap": "",
                        "break-all": ""
                      }, null, 8, ["account"])
                    ]),
                    _: 1
                  })
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (_ctx.notification.type === "follow_request") {
        _push(`<!--[--><div flex px-3 py-2><div i-ri-user-shared-line text-xl me-3 color-blue></div>`);
        _push(ssrRenderComponent(_component_AccountDisplayName, {
          account: _ctx.notification.account,
          "text-primary": "",
          "me-1": "",
          "font-bold": "",
          "line-clamp-1": "",
          "ws-pre-wrap": "",
          "break-all": ""
        }, null, _parent));
        _push(`<span me-1 ws-nowrap>${ssrInterpolate(_ctx.$t("notification.request_to_follow"))}</span></div>`);
        _push(ssrRenderComponent(_component_AccountCard, {
          p: "s-2 e-4 b-2",
          "hover-card": "",
          account: _ctx.notification.account
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_AccountFollowRequestButton, {
                account: _ctx.notification.account
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_AccountFollowRequestButton, {
                  account: _ctx.notification.account
                }, null, 8, ["account"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else if (_ctx.notification.type === "update") {
        _push(ssrRenderComponent(_component_StatusCard, {
          status: _ctx.notification.status,
          "in-notification": true,
          actions: false
        }, {
          meta: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div flex="~" gap-1 items-center mt1${_scopeId}><div i-ri:edit-2-fill text-xl me-1 text-secondary${_scopeId}></div>`);
              _push2(ssrRenderComponent(_component_AccountInlineInfo, {
                account: _ctx.notification.account,
                me1: ""
              }, null, _parent2, _scopeId));
              _push2(`<span ws-nowrap${_scopeId}>${ssrInterpolate(_ctx.$t("notification.update_status"))}</span></div>`);
            } else {
              return [
                createVNode("div", {
                  flex: "~",
                  "gap-1": "",
                  "items-center": "",
                  mt1: ""
                }, [
                  createVNode("div", {
                    "i-ri:edit-2-fill": "",
                    "text-xl": "",
                    "me-1": "",
                    "text-secondary": ""
                  }),
                  createVNode(_component_AccountInlineInfo, {
                    account: _ctx.notification.account,
                    me1: ""
                  }, null, 8, ["account"]),
                  createVNode("span", { "ws-nowrap": "" }, toDisplayString(_ctx.$t("notification.update_status")), 1)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (_ctx.notification.type === "mention" || _ctx.notification.type === "poll" || _ctx.notification.type === "status") {
        _push(ssrRenderComponent(_component_StatusCard, {
          status: _ctx.notification.status
        }, null, _parent));
      } else if (!unsupportedEmojiReactionTypes.includes(_ctx.notification.type)) {
        _push(`<div text-red font-bold> [DEV] ${ssrInterpolate(_ctx.$t("notification.missing_type"))} &#39;${ssrInterpolate(_ctx.notification.type)}&#39; </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</article>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/notification/NotificationCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const virtualScroller = false;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "NotificationPaginator",
  __ssrInlineRender: true,
  props: {
    paginator: {},
    stream: {}
  },
  setup(__props) {
    const groupCapacity = Number.MAX_VALUE;
    const includeNotificationTypes = ["update", "mention", "poll", "status"];
    function includeNotificationsForStatusCard({ type, status }) {
      return status || !includeNotificationTypes.includes(type);
    }
    function groupId(item) {
      const id = item.status ? {
        status: item.status?.id,
        type: item.type === "reblog" || item.type === "favourite" ? "like" : item.type
      } : {
        type: item.type
      };
      return JSON.stringify(id);
    }
    function hasHeader(account) {
      return !account.header.endsWith("/original/missing.png");
    }
    function groupItems(items) {
      const results = [];
      let id = 0;
      let currentGroupId = "";
      let currentGroup = [];
      const processGroup = () => {
        if (currentGroup.length === 0)
          return;
        const group = currentGroup;
        currentGroup = [];
        if (group[0].type === "follow") {
          const processedGroup = [...group];
          processedGroup.sort((a, b) => {
            const aHasHeader = hasHeader(a.account);
            const bHasHeader = hasHeader(b.account);
            if (bHasHeader && !aHasHeader)
              return 1;
            if (aHasHeader && !bHasHeader)
              return -1;
            return b.account.followersCount - a.account.followersCount;
          });
          if (processedGroup.length > 0 && hasHeader(processedGroup[0].account))
            results.push(processedGroup.shift());
          if (processedGroup.length === 1 && hasHeader(processedGroup[0].account))
            results.push(processedGroup.shift());
          if (processedGroup.length > 0) {
            results.push({
              id: `grouped-${id++}`,
              type: "grouped-follow",
              items: processedGroup
            });
          }
          return;
        } else if (group.length && (group[0].type === "reblog" || group[0].type === "favourite")) {
          if (!group[0].status) {
            return;
          }
          const likes = [];
          for (const notification of group) {
            let like = likes.find((like2) => like2.account.id === notification.account.id);
            if (!like) {
              like = { account: notification.account };
              likes.push(like);
            }
            like[notification.type === "reblog" ? "reblog" : "favourite"] = notification;
          }
          likes.sort((a, b) => a.reblog ? !b.reblog || a.favourite && !b.favourite ? -1 : 0 : 0);
          results.push({
            id: `grouped-${id++}`,
            type: "grouped-reblogs-and-favourites",
            status: group[0].status,
            likes
          });
          return;
        }
        results.push(...group);
      };
      for (const item of items.filter(includeNotificationsForStatusCard)) {
        const itemId = groupId(item);
        if (currentGroupId !== itemId || currentGroup.length >= groupCapacity)
          processGroup();
        currentGroup.push(item);
        currentGroupId = itemId;
      }
      processGroup();
      return results;
    }
    function removeFiltered(items) {
      return items.filter((item) => !item.status?.filtered?.find(
        (filter) => filter.filter.filterAction === "hide" && filter.filter.context.includes("notifications")
      ));
    }
    function preprocess(items) {
      const flattenedNotifications = [];
      for (const item of items) {
        if (item.type === "grouped-reblogs-and-favourites") {
          const group = item;
          for (const like of group.likes) {
            if (like.reblog)
              flattenedNotifications.push(like.reblog);
            if (like.favourite)
              flattenedNotifications.push(like.favourite);
          }
        } else if (item.type === "grouped-follow") {
          flattenedNotifications.push(...item.items);
        } else {
          flattenedNotifications.push(item);
        }
      }
      return groupItems(removeFiltered(flattenedNotifications));
    }
    const { clearNotifications } = useNotifications();
    const { formatNumber } = useHumanReadableNumber();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonPaginator = _sfc_main$d;
      const _component_NotificationGroupedFollow = _sfc_main$4;
      const _component_NotificationGroupedLikes = _sfc_main$3;
      const _component_NotificationCard = _sfc_main$2;
      _push(ssrRenderComponent(_component_CommonPaginator, mergeProps({
        paginator: _ctx.paginator,
        preprocess,
        stream: _ctx.stream,
        eventType: "notification",
        virtualScroller
      }, _attrs), {
        updater: withCtx(({ number, update }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button id="elk_show_new_items" py-4 border="b base" flex="~ col" p-3 w-full text-primary font-bold${_scopeId}>${ssrInterpolate(_ctx.$t("timeline.show_new_items", number, { named: { v: unref(formatNumber)(number) } }))}</button>`);
          } else {
            return [
              createVNode("button", {
                id: "elk_show_new_items",
                "py-4": "",
                border: "b base",
                flex: "~ col",
                "p-3": "",
                "w-full": "",
                "text-primary": "",
                "font-bold": "",
                onClick: () => {
                  update();
                  unref(clearNotifications)();
                }
              }, toDisplayString(_ctx.$t("timeline.show_new_items", number, { named: { v: unref(formatNumber)(number) } })), 9, ["onClick"])
            ];
          }
        }),
        default: withCtx(({ item, active }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            {
              _push2(`<!--[-->`);
              if (item.type === "grouped-follow") {
                _push2(ssrRenderComponent(_component_NotificationGroupedFollow, {
                  items: item,
                  border: "b base"
                }, null, _parent2, _scopeId));
              } else if (item.type === "grouped-reblogs-and-favourites") {
                _push2(ssrRenderComponent(_component_NotificationGroupedLikes, {
                  group: item,
                  border: "b base"
                }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(_component_NotificationCard, {
                  notification: item,
                  "hover:bg-active": "",
                  border: "b base"
                }, null, _parent2, _scopeId));
              }
              _push2(`<!--]-->`);
            }
          } else {
            return [
              (openBlock(), createBlock(Fragment, { key: 1 }, [
                item.type === "grouped-follow" ? (openBlock(), createBlock(_component_NotificationGroupedFollow, {
                  key: 0,
                  items: item,
                  border: "b base"
                }, null, 8, ["items"])) : item.type === "grouped-reblogs-and-favourites" ? (openBlock(), createBlock(_component_NotificationGroupedLikes, {
                  key: 1,
                  group: item,
                  border: "b base"
                }, null, 8, ["group"])) : (openBlock(), createBlock(_component_NotificationCard, {
                  key: 2,
                  notification: item,
                  "hover:bg-active": "",
                  border: "b base"
                }, null, 8, ["notification"]))
              ], 64))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/notification/NotificationPaginator.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TimelineNotifications",
  __ssrInlineRender: true,
  props: {
    filter: {}
  },
  setup(__props) {
    const route = useRoute();
    const lastAccessedNotificationRoute = useLocalStorage(STORAGE_KEY_LAST_ACCESSED_NOTIFICATION_ROUTE, "");
    const options = { limit: 30, types: __props.filter ? [__props.filter] : [] };
    const paginator = useMastoClient().v1.notifications.list(options);
    const stream = useStreaming((client) => client.user.notification.subscribe());
    lastAccessedNotificationRoute.value = route.path.replace(/\/notifications\/?/, "");
    useNotifications();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NotificationPaginator = _sfc_main$1;
      _push(ssrRenderComponent(_component_NotificationPaginator, mergeProps({ paginator: unref(paginator), stream: unref(stream) }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/timeline/TimelineNotifications.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
