import { e as useI18n, ag as useRouter, b2 as useCommands, i as isHydrated, l as __nuxt_component_0$1, M as _sfc_main$o, L as _sfc_main$6 } from './server.mjs';
import { _ as _sfc_main$1 } from './Dropdown-YHaGe2K7.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, toDisplayString, unref, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CommonRouteTabs",
  __ssrInlineRender: true,
  props: {
    options: {},
    moreOptions: {},
    command: { type: Boolean },
    replace: { type: Boolean },
    preventScrollTop: { type: Boolean, default: false }
  },
  setup(__props) {
    const { t } = useI18n();
    const router = useRouter();
    useCommands(() => __props.command ? __props.options.map((tab) => ({
      scope: "Tabs",
      name: tab.display,
      icon: tab.icon ?? "i-ri:file-list-2-line",
      onActivate: () => router.replace(tab.to)
    })) : []);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_CommonDropdown = _sfc_main$1;
      const _component_CommonTooltip = _sfc_main$o;
      const _component_CommonDropdownItem = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(mergeProps({
        flex: "",
        "w-full": "",
        "items-center": "",
        "lg:text-lg": "",
        "of-x-auto": "",
        "scrollbar-hide": "",
        border: "b base"
      }, _attrs))}><!--[-->`);
      ssrRenderList(_ctx.options.filter((item) => !item.hide), (option, index) => {
        _push(`<!--[-->`);
        if (!option.disabled) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: option.to,
            replace: _ctx.replace,
            relative: "",
            flex: "",
            "flex-auto": "",
            "cursor-pointer": "",
            "sm:px6": "",
            px2: "",
            rounded: "",
            "transition-all": "",
            tabindex: "0",
            "hover:bg-active": "",
            "transition-100": "",
            "exact-active-class": "children:text-secondary !children:border-primary !children:op100 !children:text-base",
            onClick: ($event) => !_ctx.preventScrollTop && _ctx.$scrollToTop()
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span ws-nowrap mxa sm:px2 sm:py3 xl:pb4 xl:pt5 py2 text-center border-b-3 text-secondary-light hover:text-secondary border-transparent${_scopeId}>${ssrInterpolate(option.display || "\xA0")}</span>`);
              } else {
                return [
                  createVNode("span", {
                    "ws-nowrap": "",
                    mxa: "",
                    "sm:px2": "",
                    "sm:py3": "",
                    "xl:pb4": "",
                    "xl:pt5": "",
                    py2: "",
                    "text-center": "",
                    "border-b-3": "",
                    "text-secondary-light": "",
                    "hover:text-secondary": "",
                    "border-transparent": ""
                  }, toDisplayString(option.display || "\xA0"), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<div flex flex-auto sm:px6 px2 xl:pb4 xl:pt5><span ws-nowrap mxa sm:px2 sm:py3 py2 text-center text-secondary-light op50>${ssrInterpolate(option.display)}</span></div>`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]-->`);
      if (("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) && _ctx.moreOptions?.options?.length) {
        _push(ssrRenderComponent(_component_CommonDropdown, {
          placement: "bottom",
          flex: "",
          "cursor-pointer": "",
          "mx-1.25rem": ""
        }, {
          popper: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(_ctx.moreOptions.options.filter((item) => !item.hide), (option, index) => {
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  key: option?.name || index,
                  to: option.to
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_CommonDropdownItem, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<span flex="~ row" gap-x-4 items-center class="${ssrRenderClass(option.match ? "text-primary" : "")}"${_scopeId3}>`);
                            if (option.icon) {
                              _push4(`<span class="${ssrRenderClass([option.icon, option.match ? "text-primary" : "text.secondary"])}" text-md me--1 block${_scopeId3}></span>`);
                            } else {
                              _push4(`<span block${_scopeId3}>\xA0</span>`);
                            }
                            _push4(`<span${_scopeId3}>${ssrInterpolate(option.display)}</span></span>`);
                          } else {
                            return [
                              createVNode("span", {
                                flex: "~ row",
                                "gap-x-4": "",
                                "items-center": "",
                                class: option.match ? "text-primary" : ""
                              }, [
                                option.icon ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: [option.icon, option.match ? "text-primary" : "text.secondary"],
                                  "text-md": "",
                                  "me--1": "",
                                  block: ""
                                }, null, 2)) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  block: ""
                                }, "\xA0")),
                                createVNode("span", null, toDisplayString(option.display), 1)
                              ], 2)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_CommonDropdownItem, null, {
                          default: withCtx(() => [
                            createVNode("span", {
                              flex: "~ row",
                              "gap-x-4": "",
                              "items-center": "",
                              class: option.match ? "text-primary" : ""
                            }, [
                              option.icon ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: [option.icon, option.match ? "text-primary" : "text.secondary"],
                                "text-md": "",
                                "me--1": "",
                                block: ""
                              }, null, 2)) : (openBlock(), createBlock("span", {
                                key: 1,
                                block: ""
                              }, "\xA0")),
                              createVNode("span", null, toDisplayString(option.display), 1)
                            ], 2)
                          ]),
                          _: 2
                        }, 1024)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(_ctx.moreOptions.options.filter((item) => !item.hide), (option, index) => {
                  return openBlock(), createBlock(_component_NuxtLink, {
                    key: option?.name || index,
                    to: option.to
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_CommonDropdownItem, null, {
                        default: withCtx(() => [
                          createVNode("span", {
                            flex: "~ row",
                            "gap-x-4": "",
                            "items-center": "",
                            class: option.match ? "text-primary" : ""
                          }, [
                            option.icon ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: [option.icon, option.match ? "text-primary" : "text.secondary"],
                              "text-md": "",
                              "me--1": "",
                              block: ""
                            }, null, 2)) : (openBlock(), createBlock("span", {
                              key: 1,
                              block: ""
                            }, "\xA0")),
                            createVNode("span", null, toDisplayString(option.display), 1)
                          ], 2)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1032, ["to"]);
                }), 128))
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_CommonTooltip, {
                placement: "top",
                "no-auto-focus": "",
                content: _ctx.moreOptions.tooltip || unref(t)("action.more")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<button cursor-pointer flex gap-1 w-12 rounded hover:bg-active btn-action-icon op75 px4 group${ssrRenderAttr("aria-label", unref(t)("action.more"))} class="${ssrRenderClass(_ctx.moreOptions.match ? "text-primary" : "text-secondary")}"${_scopeId2}>`);
                    if (_ctx.moreOptions.icon) {
                      _push3(`<span class="${ssrRenderClass(_ctx.moreOptions.icon)}" text-sm me--1 block${_scopeId2}></span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<span i-ri:arrow-down-s-line text-sm me--1 block${_scopeId2}></span></button>`);
                  } else {
                    return [
                      createVNode("button", {
                        "cursor-pointer": "",
                        flex: "",
                        "gap-1": "",
                        "w-12": "",
                        rounded: "",
                        "hover:bg-active": "",
                        "btn-action-icon": "",
                        op75: "",
                        px4: "",
                        group: "",
                        "aria-label": unref(t)("action.more"),
                        class: _ctx.moreOptions.match ? "text-primary" : "text-secondary"
                      }, [
                        _ctx.moreOptions.icon ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: _ctx.moreOptions.icon,
                          "text-sm": "",
                          "me--1": "",
                          block: ""
                        }, null, 2)) : createCommentVNode("", true),
                        createVNode("span", {
                          "i-ri:arrow-down-s-line": "",
                          "text-sm": "",
                          "me--1": "",
                          block: ""
                        })
                      ], 10, ["aria-label"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_CommonTooltip, {
                  placement: "top",
                  "no-auto-focus": "",
                  content: _ctx.moreOptions.tooltip || unref(t)("action.more")
                }, {
                  default: withCtx(() => [
                    createVNode("button", {
                      "cursor-pointer": "",
                      flex: "",
                      "gap-1": "",
                      "w-12": "",
                      rounded: "",
                      "hover:bg-active": "",
                      "btn-action-icon": "",
                      op75: "",
                      px4: "",
                      group: "",
                      "aria-label": unref(t)("action.more"),
                      class: _ctx.moreOptions.match ? "text-primary" : "text-secondary"
                    }, [
                      _ctx.moreOptions.icon ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: _ctx.moreOptions.icon,
                        "text-sm": "",
                        "me--1": "",
                        block: ""
                      }, null, 2)) : createCommentVNode("", true),
                      createVNode("span", {
                        "i-ri:arrow-down-s-line": "",
                        "text-sm": "",
                        "me--1": "",
                        block: ""
                      })
                    ], 10, ["aria-label"])
                  ]),
                  _: 1
                }, 8, ["content"])
              ];
            }
          }),
          _: 1
        }, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/CommonRouteTabs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
