import { useSSRContext, defineComponent, mergeProps, defineAsyncComponent, unref, computed, ref, watchEffect, withCtx, openBlock, createBlock, createVNode, withModifiers, createCommentVNode } from 'vue';
import { x as usePreferences, a_ as useRuntimeConfig, q as useUserSettings, s as getPreferences, l as __nuxt_component_0$1 } from './server.mjs';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { createPlaceholderFromHash, autoSizes, loadImage, lazyLoad } from 'unlazy';

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "UnLazyImage",
  __ssrInlineRender: true,
  props: {
    src: { default: void 0 },
    srcSet: { default: void 0 },
    sources: { default: void 0 },
    autoSizes: { type: Boolean, default: false },
    blurhash: { default: void 0 },
    thumbhash: { default: void 0 },
    placeholderSrc: { default: void 0 },
    placeholderSize: { default: void 0 },
    placeholderRatio: { default: void 0 },
    lazyLoad: { type: Boolean, default: true },
    preload: { type: Boolean, default: false },
    ssr: { type: Boolean, default: void 0 }
  },
  emits: ["loaded", "error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const unlazy = useRuntimeConfig().public.unlazy;
    const hash = computed(() => props.thumbhash || props.blurhash);
    const pngPlaceholder = (props.ssr ?? unlazy.ssr) && hash.value ? createPlaceholderFromHash({
      hash: hash.value,
      hashType: props.thumbhash ? "thumbhash" : "blurhash",
      size: props.placeholderSize || unlazy.placeholderSize,
      ratio: props.placeholderRatio
    }) : void 0;
    const target = ref();
    let cleanup;
    let lastHash;
    watchEffect(() => {
      cleanup?.();
      if (!target.value)
        return;
      if (hash.value && hash.value !== lastHash) {
        const placeholder = createPlaceholderFromHash({
          image: target.value,
          hash: hash.value,
          hashType: props.thumbhash ? "thumbhash" : "blurhash",
          size: props.placeholderSize || unlazy.placeholderSize,
          ratio: props.placeholderRatio
        });
        if (placeholder)
          target.value.src = placeholder;
        lastHash = hash.value;
      }
      if (props.preload) {
        if (props.autoSizes)
          autoSizes(target.value);
        loadImage(target.value);
        return;
      }
      if (!props.lazyLoad)
        return;
      cleanup = lazyLoad(target.value, {
        hash: false,
        onImageLoad: (image) => emit("loaded", image)
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (props.sources?.length) {
        _push(`<picture${ssrRenderAttrs(_attrs)}><!--[-->`);
        ssrRenderList(props.sources, (source, index) => {
          _push(`<source${ssrRenderAttr("type", source.type)}${ssrRenderAttr("data-srcset", source.srcSet)}${ssrRenderAttr("data-sizes", source.sizes)}>`);
        });
        _push(`<!--]--><img${ssrRenderAttrs(mergeProps({
          ref_key: "target",
          ref: target
        }, _ctx.$attrs, {
          src: unref(pngPlaceholder) || _ctx.placeholderSrc,
          "data-src": _ctx.src,
          "data-srcset": _ctx.srcSet,
          "data-sizes": _ctx.autoSizes ? "auto" : void 0,
          loading: "lazy"
        }))}></picture>`);
      } else {
        _push(`<img${ssrRenderAttrs(mergeProps({
          ref_key: "target",
          ref: target
        }, _ctx.$attrs, {
          src: unref(pngPlaceholder) || _ctx.placeholderSrc,
          "data-src": _ctx.src,
          "data-srcset": _ctx.srcSet,
          "data-sizes": _ctx.autoSizes ? "auto" : void 0,
          loading: "lazy"
        }, _attrs))}>`);
      }
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/@unlazy+nuxt@0.11.2_rollup@4.13.0/node_modules/@unlazy/nuxt/dist/runtime/components/UnLazyImage.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "CommonBlurhash",
  __ssrInlineRender: true,
  props: {
    blurhash: { default: "" },
    src: {},
    srcset: {},
    shouldLoadImage: { type: Boolean, default: true }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UnLazyImage = _sfc_main$4;
      _push(ssrRenderComponent(_component_UnLazyImage, mergeProps(_ctx.$attrs, {
        blurhash: _ctx.blurhash,
        src: _ctx.src,
        "src-set": _ctx.srcset,
        "lazy-load": _ctx.shouldLoadImage,
        "auto-sizes": ""
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/CommonBlurhash.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "StatusPreviewCardInfo",
  __ssrInlineRender: true,
  props: {
    card: {},
    root: { type: Boolean },
    provider: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "max-h-2xl": "",
        flex: "",
        "flex-col": "",
        "my-auto": "",
        class: [
          _ctx.root ? "flex-gap-1" : "justify-center sm:justify-start"
        ]
      }, _attrs))}><p text-secondary break-all line-clamp-1>${ssrInterpolate(_ctx.provider)}</p>`);
      if (_ctx.card.title) {
        _push(`<strong font-normal sm:font-medium line-clamp-1 break-all>${ssrInterpolate(_ctx.card.title)}</strong>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.card.description) {
        _push(`<p line-clamp-1 break-all sm:break-words text-secondary class="${ssrRenderClass([_ctx.root ? "sm:line-clamp-2" : ""])}">${ssrInterpolate(_ctx.card.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/StatusPreviewCardInfo.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ogImageWidth = 400;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "StatusPreviewCardNormal",
  __ssrInlineRender: true,
  props: {
    card: {},
    smallPictureOnly: { type: Boolean },
    root: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const alt = computed(() => `${props.card.title} - ${props.card.title}`);
    const isSquare = computed(() => props.smallPictureOnly || props.card.width === props.card.height || Number(props.card.width || 0) < ogImageWidth || Number(props.card.height || 0) < ogImageWidth / 2);
    const providerName = computed(() => props.card.providerName ? props.card.providerName : new URL(props.card.url).hostname);
    const cardTypeIconMap = {
      link: "i-ri:profile-line",
      photo: "i-ri:image-line",
      video: "i-ri:play-line",
      rich: "i-ri:profile-line"
    };
    const userSettings = useUserSettings();
    const shouldLoadAttachment = ref(!getPreferences(userSettings.value, "enableDataSaving"));
    function loadAttachment() {
      shouldLoadAttachment.value = true;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_CommonBlurhash = _sfc_main$3;
      const _component_StatusPreviewCardInfo = _sfc_main$2;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        block: "",
        "of-hidden": "",
        to: _ctx.card.url,
        "bg-card": "",
        "hover:bg-active": "",
        class: {
          "flex": unref(isSquare),
          "p-4": _ctx.root,
          "rounded-lg": !_ctx.root
        },
        target: "_blank",
        external: ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.card.image) {
              _push2(`<div flex flex-col display-block of-hidden class="${ssrRenderClass({
                "sm:min-w-32 sm:w-32 sm:h-32 min-w-24 w-24 h-24": unref(isSquare),
                "w-full aspect-[1.91]": !unref(isSquare),
                "rounded-lg": _ctx.root
              })}" relative${_scopeId}>`);
              _push2(ssrRenderComponent(_component_CommonBlurhash, {
                blurhash: _ctx.card.blurhash,
                src: _ctx.card.image,
                width: _ctx.card.width,
                height: _ctx.card.height,
                alt: unref(alt),
                "should-load-image": unref(shouldLoadAttachment),
                "w-full": "",
                "h-full": "",
                "object-cover": "",
                class: !unref(shouldLoadAttachment) ? "brightness-60" : ""
              }, null, _parent2, _scopeId));
              if (!unref(shouldLoadAttachment)) {
                _push2(`<button type="button" absolute class="status-preview-card-load bg-black/64" p-2 transition rounded hover:bg-black cursor-pointer${_scopeId}><span text-sm text-white flex flex-col justify-center items-center gap-3 w-6 h-6 i-ri:file-download-line${_scopeId}></span></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<div min-w-24 w-24 h-24 sm="min-w-32 w-32 h-32" bg="slate-500/10" flex justify-center items-center class="${ssrRenderClass([
                _ctx.root ? "rounded-lg" : ""
              ])}"${_scopeId}><div class="${ssrRenderClass(cardTypeIconMap[_ctx.card.type])}" w="30%" h="30%" text-secondary${_scopeId}></div></div>`);
            }
            _push2(ssrRenderComponent(_component_StatusPreviewCardInfo, {
              p: unref(isSquare) ? "x-4" : "4",
              root: _ctx.root,
              card: _ctx.card,
              provider: unref(providerName)
            }, null, _parent2, _scopeId));
          } else {
            return [
              _ctx.card.image ? (openBlock(), createBlock("div", {
                key: 0,
                flex: "",
                "flex-col": "",
                "display-block": "",
                "of-hidden": "",
                class: {
                  "sm:min-w-32 sm:w-32 sm:h-32 min-w-24 w-24 h-24": unref(isSquare),
                  "w-full aspect-[1.91]": !unref(isSquare),
                  "rounded-lg": _ctx.root
                },
                relative: ""
              }, [
                createVNode(_component_CommonBlurhash, {
                  blurhash: _ctx.card.blurhash,
                  src: _ctx.card.image,
                  width: _ctx.card.width,
                  height: _ctx.card.height,
                  alt: unref(alt),
                  "should-load-image": unref(shouldLoadAttachment),
                  "w-full": "",
                  "h-full": "",
                  "object-cover": "",
                  class: !unref(shouldLoadAttachment) ? "brightness-60" : ""
                }, null, 8, ["blurhash", "src", "width", "height", "alt", "should-load-image", "class"]),
                !unref(shouldLoadAttachment) ? (openBlock(), createBlock("button", {
                  key: 0,
                  type: "button",
                  absolute: "",
                  class: "status-preview-card-load bg-black/64",
                  "p-2": "",
                  transition: "",
                  rounded: "",
                  "hover:bg-black": "",
                  "cursor-pointer": "",
                  onClick: withModifiers(($event) => !unref(shouldLoadAttachment) ? loadAttachment() : null, ["stop", "prevent"])
                }, [
                  createVNode("span", {
                    "text-sm": "",
                    "text-white": "",
                    flex: "",
                    "flex-col": "",
                    "justify-center": "",
                    "items-center": "",
                    "gap-3": "",
                    "w-6": "",
                    "h-6": "",
                    "i-ri:file-download-line": ""
                  })
                ], 8, ["onClick"])) : createCommentVNode("", true)
              ], 2)) : (openBlock(), createBlock("div", {
                key: 1,
                "min-w-24": "",
                "w-24": "",
                "h-24": "",
                sm: "min-w-32 w-32 h-32",
                bg: "slate-500/10",
                flex: "",
                "justify-center": "",
                "items-center": "",
                class: [
                  _ctx.root ? "rounded-lg" : ""
                ]
              }, [
                createVNode("div", {
                  class: cardTypeIconMap[_ctx.card.type],
                  w: "30%",
                  h: "30%",
                  "text-secondary": ""
                }, null, 2)
              ], 2)),
              createVNode(_component_StatusPreviewCardInfo, {
                p: unref(isSquare) ? "x-4" : "4",
                root: _ctx.root,
                card: _ctx.card,
                provider: unref(providerName)
              }, null, 8, ["p", "root", "card", "provider"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/StatusPreviewCardNormal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0_lazy = defineAsyncComponent(() => import('./StatusPreviewGitHub-BDedSVPp.mjs').then((c) => c.default || c));
const __nuxt_component_1_lazy = defineAsyncComponent(() => import('./StatusPreviewStackBlitz-CcIWpQpa.mjs').then((c) => c.default || c));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "StatusPreviewCard",
  __ssrInlineRender: true,
  props: {
    card: {},
    smallPictureOnly: { type: Boolean },
    root: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const providerName = props.card.providerName;
    const gitHubCards = usePreferences("experimentalGitHubCards");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LazyStatusPreviewGitHub = __nuxt_component_0_lazy;
      const _component_LazyStatusPreviewStackBlitz = __nuxt_component_1_lazy;
      const _component_StatusPreviewCardNormal = _sfc_main$1;
      if (unref(gitHubCards) && unref(providerName) === "GitHub") {
        _push(ssrRenderComponent(_component_LazyStatusPreviewGitHub, mergeProps({ card: _ctx.card }, _attrs), null, _parent));
      } else if (unref(gitHubCards) && unref(providerName) === "StackBlitz") {
        _push(ssrRenderComponent(_component_LazyStatusPreviewStackBlitz, mergeProps({
          card: _ctx.card,
          "small-picture-only": _ctx.smallPictureOnly,
          root: _ctx.root
        }, _attrs), null, _parent));
      } else {
        _push(ssrRenderComponent(_component_StatusPreviewCardNormal, mergeProps({
          card: _ctx.card,
          "small-picture-only": _ctx.smallPictureOnly,
          root: _ctx.root
        }, _attrs), null, _parent));
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/StatusPreviewCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _, _sfc_main$3 as a, _sfc_main$1 as b };
