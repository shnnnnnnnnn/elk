import { ag as useRouter, an as useCommand, l as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, renderSlot, createCommentVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SettingsItem",
  __ssrInlineRender: true,
  props: {
    text: {},
    content: {},
    description: {},
    icon: {},
    to: {},
    command: { type: Boolean },
    disabled: { type: Boolean },
    external: { type: Boolean },
    large: { type: Boolean },
    match: { type: Boolean },
    target: {}
  },
  setup(__props) {
    const props = __props;
    const router = useRouter();
    const scrollOnClick = computed(() => props.to && !(props.target === "_blank" || props.external));
    useCommand({
      scope: "Settings",
      name: () => props.text ?? (props.to ? typeof props.to === "string" ? props.to : props.to.name : ""),
      description: () => props.description,
      icon: () => props.icon || "",
      visible: () => props.command && props.to,
      onActivate() {
        router.push(props.to);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        disabled: _ctx.disabled,
        to: _ctx.to,
        external: _ctx.external,
        target: _ctx.target,
        "exact-active-class": "text-primary",
        class: _ctx.disabled ? "op25 pointer-events-none " : _ctx.match ? "text-primary" : "",
        block: "",
        "w-full": "",
        group: "",
        "focus:outline-none": "",
        tabindex: _ctx.disabled ? -1 : null,
        onClick: ($event) => unref(scrollOnClick) ? _ctx.$scrollToTop() : void 0
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div w-full flex px5 py3 md:gap2 gap4 items-center transition-250 group-hover:bg-active group-focus-visible:ring="2 current"${_scopeId}><div flex-1 flex items-center md:gap2 gap4${_scopeId}>`);
            if (_ctx.$slots.icon || _ctx.icon) {
              _push2(`<div flex items-center justify-center flex-shrink-0 class="${ssrRenderClass(_ctx.$slots.description ? "w-12 h-12" : "")}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
                if (_ctx.icon) {
                  _push2(`<div class="${ssrRenderClass([_ctx.icon, _ctx.large ? "text-xl mr-1" : "text-xl md:text-size-inherit"])}"${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div flex="~ col gap-0.5"${_scopeId}><p${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(`<span${_scopeId}>${ssrInterpolate(_ctx.text)}</span>`);
            }, _push2, _parent2, _scopeId);
            _push2(`</p>`);
            if (_ctx.$slots.description || _ctx.description) {
              _push2(`<p text-sm text-secondary${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                _push2(`${ssrInterpolate(_ctx.description)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (_ctx.$slots.content || _ctx.content) {
              _push2(`<p text-sm text-secondary${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "content", {}, () => {
                _push2(`${ssrInterpolate(_ctx.content)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.to) {
              _push2(`<div class="${ssrRenderClass([!_ctx.external ? "i-ri:arrow-right-s-line" : "i-ri:external-link-line", "rtl-flip"])}" text-xl text-secondary-light${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                "w-full": "",
                flex: "",
                px5: "",
                py3: "",
                "md:gap2": "",
                gap4: "",
                "items-center": "",
                "transition-250": "",
                "group-hover:bg-active": "",
                "group-focus-visible:ring": "2 current"
              }, [
                createVNode("div", {
                  "flex-1": "",
                  flex: "",
                  "items-center": "",
                  "md:gap2": "",
                  gap4: ""
                }, [
                  _ctx.$slots.icon || _ctx.icon ? (openBlock(), createBlock("div", {
                    key: 0,
                    flex: "",
                    "items-center": "",
                    "justify-center": "",
                    "flex-shrink-0": "",
                    class: _ctx.$slots.description ? "w-12 h-12" : ""
                  }, [
                    renderSlot(_ctx.$slots, "icon", {}, () => [
                      _ctx.icon ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: [_ctx.icon, _ctx.large ? "text-xl mr-1" : "text-xl md:text-size-inherit"]
                      }, null, 2)) : createCommentVNode("", true)
                    ])
                  ], 2)) : createCommentVNode("", true),
                  createVNode("div", { flex: "~ col gap-0.5" }, [
                    createVNode("p", null, [
                      renderSlot(_ctx.$slots, "default", {}, () => [
                        createVNode("span", null, toDisplayString(_ctx.text), 1)
                      ])
                    ]),
                    _ctx.$slots.description || _ctx.description ? (openBlock(), createBlock("p", {
                      key: 0,
                      "text-sm": "",
                      "text-secondary": ""
                    }, [
                      renderSlot(_ctx.$slots, "description", {}, () => [
                        createTextVNode(toDisplayString(_ctx.description), 1)
                      ])
                    ])) : createCommentVNode("", true)
                  ])
                ]),
                _ctx.$slots.content || _ctx.content ? (openBlock(), createBlock("p", {
                  key: 0,
                  "text-sm": "",
                  "text-secondary": ""
                }, [
                  renderSlot(_ctx.$slots, "content", {}, () => [
                    createTextVNode(toDisplayString(_ctx.content), 1)
                  ])
                ])) : createCommentVNode("", true),
                _ctx.to ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: [!_ctx.external ? "i-ri:arrow-right-s-line" : "i-ri:external-link-line", "rtl-flip"],
                  "text-xl": "",
                  "text-secondary-light": ""
                }, null, 2)) : createCommentVNode("", true)
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/SettingsItem.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
