import { u as useRoute, bi as useBuildInfo, x as usePreferences, i as isHydrated, c as currentUser, k as getAccountRoute, ag as useRouter, an as useCommand, bf as onHydrated, Z as useLocalStorage, bd as STORAGE_KEY_LAST_ACCESSED_NOTIFICATION_ROUTE, a0 as STORAGE_KEY_LAST_ACCESSED_EXPLORE_ROUTE, E as currentServer, bq as useSignIn, br as useOnline, aY as useColorMode, q as useUserSettings, bs as invoke, a$ as useEventListener, s as getPreferences, ah as useTimeAgoOptions, ai as useTimeAgo, bm as togglePreferences, bt as toggleKeyboardShortcuts, aJ as proxy, bu as onClickOutside, bk as elkTeamMembers, bv as useTimeout, bw as useScrollLock, bx as mediaPreviewList, by as mediaPreviewIndex, a5 as useMagicKeys, bz as whenever, d as useFormattedDateTime, bA as useIsMac, bB as useCommandRegistry, a as useMasto, e as useI18n, D as getServerName, p as useRelationship, bC as openCommandPanel, bD as isSigninDialogOpen, bE as isPreviewHelpOpen, bF as closePreviewHelp, bG as isPublishDialogOpen, bH as dialogDraftKey, bI as isMediaPreviewOpen, bJ as closeMediaPreview, bK as isEditHistoryDialogOpen, bL as statusEdit, bM as isCommandPanelOpen, bN as closeCommandPanel, bO as isConfirmDialogOpen, bP as confirmDialogLabel, bQ as isErrorDialogOpen, bR as errorDialogData, bS as isFavouritedBoostedByDialogOpen, bT as isKeyboardShortcutsDialogOpen, bU as closeKeyboardShortcuts, bV as isReportDialogOpen, bW as reportAccount, bX as reportStatus, bY as closeReportDialog, bo as useUsers, l as __nuxt_component_0$1, n as _sfc_main$7$1, aU as __nuxt_component_11, M as _sfc_main$o$1, X as _export_sfc, P as _sfc_main$u, bZ as _sfc_main$5$1, b_ as switchUser, R as _sfc_main$c$1, V as _sfc_main$8$1, a_ as useRuntimeConfig, b$ as commandPanelInput, c0 as favouritedBoostedByStatusId, aE as lastPublishDialogStatus, c1 as confirmDialogChoice, a8 as useNuxtApp, c2 as isObject$1, aj as useIntersectionObserver, b as unrefElement, c3 as tryOnUnmounted } from './server.mjs';
import { useSSRContext, defineComponent, useSlots, reactive, h, computed, resolveComponent, onUpdated, defineAsyncComponent, mergeProps, unref, withCtx, createVNode, ref, withDirectives, createTextVNode, toDisplayString, vShow, nextTick, renderSlot, openBlock, createBlock, createCommentVNode, useModel, watch, isRef, shallowRef, mergeModels, onUnmounted, watchEffect, withAsyncContext, render } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderList, ssrGetDirectiveProps, ssrLooseEqual, ssrLooseContain } from 'vue/server-renderer';
import { i as isMediumOrLargeScreen, a as isSmallScreen } from './screen-yh7ctCbH.mjs';
import { u as useNotifications } from './notification-DvxggPx6.mjs';
import { u as useSearch, _ as _sfc_main$s, a as __nuxt_component_1$2, b as _sfc_main$2$1 } from './SearchWidget-Dm1RXdb8.mjs';
import { _ as __nuxt_component_0$2 } from './ModalDialog-BaHoBdlt.mjs';
import { _ as __nuxt_component_3 } from './PublishWidget-DoHJnaJO.mjs';
import { useGesture } from '@vueuse/gesture';
import sync, { getFrameData } from 'framesync';
import { inertia, animate, velocityPerSecond, cubicBezier, linear, easeIn, easeInOut, easeOut, circIn, circInOut, circOut, backIn, backInOut, backOut, anticipate, bounceIn, bounceInOut, bounceOut } from 'popmotion';
import { number, px, color, degrees, scale, alpha, progressPercentage, filter, complex } from 'style-value-types';
import { isHTMLTag } from '@vue/shared';
import { _ as _sfc_main$t } from './AccountInlineInfo-s2DIkMwx.mjs';
import { k as _sfc_main$8$2, h as _sfc_main$9$1, i as _sfc_main$4$1, _ as _sfc_main$x } from './StatusCard-CHVUTCdD.mjs';
import { _ as _sfc_main$v } from './CommonCheckbox-D4Ek4LfU.mjs';
import { _ as _sfc_main$w } from './AccountPaginator-Dkw4dtyf.mjs';
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
import './SearchHashtagInfo-DJpkg2KL.mjs';
import '@vueuse/integrations/useFocusTrap';
import './CommonErrorMessage-CvbJeSnR.mjs';
import './Dropdown-YHaGe2K7.mjs';
import 'iso-639-1';
import './icons-m16uagef.mjs';
import 'string-length';
import 'tippy.js';
import './CommonPaginator-BbZe3uv5.mjs';
import 'vue-virtual-scroller';
import './translate-B4UXe0Hf.mjs';
import './StatusPreviewCard-C7wSe9bY.mjs';
import 'unlazy';
import 'blurhash';
import './AccountCard-CqNJdiOX.mjs';

const _sfc_main$r = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<span${ssrRenderAttrs(mergeProps({
    "shrink-0": "",
    aspect: "1/1",
    "sm:h-8": "",
    "xl:h-10": "",
    class: "rtl-flip"
  }, _attrs))} data-v-5cb58bfe><svg xmlns="http://www.w3.org/2000/svg" w-full aspect="1/1" sm:h-8 xl:h-10 sm:w-8 xl:w-10 viewBox="0 0 250 250" fill="none" data-v-5cb58bfe><mask id="a" width="240" height="234" x="4" y="1" maskUnits="userSpaceOnUse" style="${ssrRenderStyle({ "mask-type": "alpha" })}" data-v-5cb58bfe><path id="path19" fill="#D9D9D9" d="M244 123c0 64.617-38.383 112-103 112-64.617 0-103-30.883-103-95.5C38 111.194-8.729 36.236 8 16 29.46-9.959 88.689 6 125 6c64.617 0 119 52.383 119 117Z" data-v-5cb58bfe></path></mask><g id="g28" mask="url(#a)" transform="matrix(0.90923731,0,0,1.0049564,13.520015,-3.1040835)" data-v-5cb58bfe><path id="path22" class="body" d="m 116.94,88.1 c -13.344,1.552 -20.436,-2.019 -24.706,10.71 0,0 14.336,21.655 52.54,21.112 -2.135,8.848 -1.144,15.368 -1.144,23.207 0,26.079 -20.589,48.821 -65.961,48.821 -23.03,0 -51.015,4.191 -72.367,15.911 -15.175,8.305 -27.048,20.336 -32.302,37.023 l 5.956,8.461 11.4,0.155 v 47.889 l -13.91,21.966 3.998,63.645 H -6.364 L -5.22,335.773 C 1.338,331.892 16.36,321.802 29.171,306.279 46.557,285.4 59.902,255.052 44.193,217.486 l 11.744,-5.045 c 12.887,30.814 8.388,57.514 -2.898,79.013 21.58,-0.698 40.11,-2.095 55.819,-4.734 l -3.584,-43.698 12.659,-1.087 L 129.98,387 h 13.116 l 2.212,-94.459 c 10.447,-4.502 34.239,-21.034 45.372,-78.47 1.372,-6.986 2.135,-12.885 2.516,-17.93 1.754,-12.806 2.745,-27.243 3.051,-43.698 l -18.683,-5.976 h 57.42 l 5.567,-12.807 c -5.414,0.233 -11.896,-2.639 -11.896,-2.639 l 1.297,-6.209 H 242 L 176.801,90.428 c -7.244,2.794 -14.87,6.442 -20.208,10.866 -4.27,-3.105 -19.063,-12.807 -39.653,-13.195 z" data-v-5cb58bfe></path><path id="path24" class="wood" d="M 6.217,24.493 18.494,21 c 5.948,21.577 13.345,33.375 22.648,39.352 8.388,5.099 19.75,5.239 31.799,4.579 C 69.433,63.767 66.154,62.137 63.104,59.886 56.317,54.841 50.522,46.458 46.175,31.246 l 12.201,-3.649 c 3.279,11.488 7.092,18.085 12.201,21.888 5.11,3.726 11.286,4.657 18.606,5.433 13.726,1.553 30.884,2.174 52.312,12.264 2.898,1.086 5.872,2.483 8.769,4.036 -0.381,-0.776 -0.762,-1.553 -1.296,-2.406 -3.66,-5.822 -10.828,-11.953 -24.097,-16.92 l 4.27,-12.109 c 21.581,7.917 30.121,19.171 33.553,28.097 3.965,10.168 1.525,18.124 1.525,18.124 -3.05,1.009 -6.1,2.406 -9.608,3.492 -6.634,-4.579 -12.887,-8.033 -18.835,-10.75 C 113.814,70.442 92.31,76.108 73.246,77.893 58.91,79.213 45.794,78.591 34.432,71.295 23.222,64.155 13.385,50.495 6.217,24.493 Z" data-v-5cb58bfe></path><path id="path26" class="wood" d="M 90.098,45.294 C 87.582,39.55 86.057,32.487 86.743,23.794 l 12.659,0.932 c -0.763,10.555 2.897,17.696 7.015,22.353 -5.338,-0.931 -10.447,-1.04 -16.319,-1.785 z m 80.069,-1.32 8.312,-9.702 c 21.58,19.094 8.159,46.415 8.159,46.415 l -11.819,-1.32 c -0.382,-6.24 -1.144,-17.836 -6.635,-24.371 3.584,1.84 6.635,3.865 9.99,6.908 0,-5.666 -1.754,-12.341 -8.007,-17.93 z" data-v-5cb58bfe></path></g></svg></span>`);
}
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/nav/NavLogo.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-5cb58bfe"]]);
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "NavTitle",
  __ssrInlineRender: true,
  setup(__props) {
    const { env } = useBuildInfo();
    const router = useRouter();
    const back = ref("");
    const nuxtApp = useNuxtApp();
    function onClickLogo() {
      nuxtApp.hooks.callHook("elk-logo:click");
    }
    router.afterEach(() => {
      back.value = router.options.history.state.back;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_NavLogo = __nuxt_component_1$1;
      const _component_CommonTooltip = _sfc_main$o$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        flex: "",
        "justify-between": "",
        sticky: "",
        "top-0": "",
        "bg-base": "",
        "z-1": "",
        "py-4": "",
        "native:py-7": "",
        "data-tauri-drag-region": ""
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        flex: "",
        "items-end": "",
        "gap-3": "",
        py2: "",
        "px-5": "",
        "text-2xl": "",
        "select-none": "",
        "focus-visible:ring": "2 current",
        to: "/home",
        onClick: onClickLogo
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NavLogo, {
              "shrink-0": "",
              aspect: "1/1",
              "sm:h-8": "",
              "xl:h-10": "",
              class: "rtl-flip"
            }, null, _parent2, _scopeId));
            _push2(`<div style="${ssrRenderStyle(("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) ? null : { display: "none" })}" hidden xl:block text-secondary${_scopeId}>${ssrInterpolate(_ctx.$t("app_name"))} <sup text-sm italic mt-1${_scopeId}>${ssrInterpolate(unref(env) === "release" ? "alpha" : unref(env))}</sup></div>`);
          } else {
            return [
              createVNode(_component_NavLogo, {
                "shrink-0": "",
                aspect: "1/1",
                "sm:h-8": "",
                "xl:h-10": "",
                class: "rtl-flip"
              }),
              withDirectives(createVNode("div", {
                hidden: "",
                "xl:block": "",
                "text-secondary": ""
              }, [
                createTextVNode(toDisplayString(_ctx.$t("app_name")) + " ", 1),
                createVNode("sup", {
                  "text-sm": "",
                  italic: "",
                  "mt-1": ""
                }, toDisplayString(unref(env) === "release" ? "alpha" : unref(env)), 1)
              ], 512), [
                [vShow, "isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div hidden xl:flex items-center me-8 mt-2 gap-1>`);
      _push(ssrRenderComponent(_component_CommonTooltip, {
        content: _ctx.$t("nav.back")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              "aria-label": _ctx.$t("nav.back"),
              class: { "pointer-events-none op0": !unref(back) || unref(back) === "/", "xl:flex": _ctx.$route.name !== "tag" },
              onClick: ($event) => _ctx.$router.go(-1)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div text-xl i-ri:arrow-left-line class="rtl-flip" btn-text${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode("div", {
                      "text-xl": "",
                      "i-ri:arrow-left-line": "",
                      class: "rtl-flip",
                      "btn-text": ""
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, {
                "aria-label": _ctx.$t("nav.back"),
                class: { "pointer-events-none op0": !unref(back) || unref(back) === "/", "xl:flex": _ctx.$route.name !== "tag" },
                onClick: ($event) => _ctx.$router.go(-1)
              }, {
                default: withCtx(() => [
                  createVNode("div", {
                    "text-xl": "",
                    "i-ri:arrow-left-line": "",
                    class: "rtl-flip",
                    "btn-text": ""
                  })
                ]),
                _: 1
              }, 8, ["aria-label", "class", "onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/nav/NavTitle.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "NavSideItem",
  __ssrInlineRender: true,
  props: {
    text: {},
    icon: {},
    to: {},
    userOnly: { type: Boolean, default: false },
    command: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const router = useRouter();
    useCommand({
      scope: "Navigation",
      name: () => props.text ?? (typeof props.to === "string" ? props.to : props.to.name),
      icon: () => props.icon,
      visible: () => props.command,
      onActivate() {
        router.push(props.to);
      }
    });
    const activeClass = ref("text-primary");
    onHydrated(async () => {
      activeClass.value = "";
      await nextTick();
      activeClass.value = "text-primary";
    });
    const noUserDisable = computed(() => !isHydrated.value || props.userOnly && !currentUser.value);
    const noUserVisual = computed(() => isHydrated.value && props.userOnly && !currentUser.value);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_CommonTooltip = _sfc_main$o$1;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: _ctx.to,
        disabled: unref(noUserDisable),
        class: unref(noUserVisual) ? "op25 pointer-events-none " : "",
        "active-class": unref(activeClass),
        group: "",
        "focus:outline-none": "",
        "disabled:pointer-events-none": "",
        tabindex: unref(noUserDisable) ? -1 : null,
        onClick: _ctx.$scrollToTop
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CommonTooltip, {
              disabled: !("isMediumOrLargeScreen" in _ctx ? _ctx.isMediumOrLargeScreen : unref(isMediumOrLargeScreen)),
              content: _ctx.text,
              placement: "right"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div flex items-center gap4 xl="ml0 mr5 px5 w-auto" class="${ssrRenderClass([("isSmallScreen" in _ctx ? _ctx.isSmallScreen : unref(isSmallScreen)) ? `
            w-full
            px5 sm:mxa
            transition-colors duration-200 transform
            hover-bg-gray-100 hover-dark:bg-gray-700 hover-dark:text-white
          ` : `
            w-fit rounded-3
            px2 mx3 sm:mxa
            transition-100
            elk-group-hover-bg-active
            group-focus-visible:ring-2
            group-focus-visible:ring-current
          `, "item"])}" data-v-16939a83${_scopeId2}>`);
                  ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
                    _push3(`<div class="${ssrRenderClass(_ctx.icon)}" text-xl data-v-16939a83${_scopeId2}></div>`);
                  }, _push3, _parent3, _scopeId2);
                  ssrRenderSlot(_ctx.$slots, "default", {}, () => {
                    _push3(`<span block sm:hidden xl:block select-none data-v-16939a83${_scopeId2}>${ssrInterpolate(("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) ? _ctx.text : "\xA0")}</span>`);
                  }, _push3, _parent3, _scopeId2);
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: ["item", ("isSmallScreen" in _ctx ? _ctx.isSmallScreen : unref(isSmallScreen)) ? `
            w-full
            px5 sm:mxa
            transition-colors duration-200 transform
            hover-bg-gray-100 hover-dark:bg-gray-700 hover-dark:text-white
          ` : `
            w-fit rounded-3
            px2 mx3 sm:mxa
            transition-100
            elk-group-hover-bg-active
            group-focus-visible:ring-2
            group-focus-visible:ring-current
          `],
                      flex: "",
                      "items-center": "",
                      gap4: "",
                      xl: "ml0 mr5 px5 w-auto"
                    }, [
                      renderSlot(_ctx.$slots, "icon", {}, () => [
                        createVNode("div", {
                          class: _ctx.icon,
                          "text-xl": ""
                        }, null, 2)
                      ], true),
                      renderSlot(_ctx.$slots, "default", {}, () => [
                        createVNode("span", {
                          block: "",
                          "sm:hidden": "",
                          "xl:block": "",
                          "select-none": ""
                        }, toDisplayString(("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) ? _ctx.text : "\xA0"), 1)
                      ], true)
                    ], 2)
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_CommonTooltip, {
                disabled: !("isMediumOrLargeScreen" in _ctx ? _ctx.isMediumOrLargeScreen : unref(isMediumOrLargeScreen)),
                content: _ctx.text,
                placement: "right"
              }, {
                default: withCtx(() => [
                  createVNode("div", {
                    class: ["item", ("isSmallScreen" in _ctx ? _ctx.isSmallScreen : unref(isSmallScreen)) ? `
            w-full
            px5 sm:mxa
            transition-colors duration-200 transform
            hover-bg-gray-100 hover-dark:bg-gray-700 hover-dark:text-white
          ` : `
            w-fit rounded-3
            px2 mx3 sm:mxa
            transition-100
            elk-group-hover-bg-active
            group-focus-visible:ring-2
            group-focus-visible:ring-current
          `],
                    flex: "",
                    "items-center": "",
                    gap4: "",
                    xl: "ml0 mr5 px5 w-auto"
                  }, [
                    renderSlot(_ctx.$slots, "icon", {}, () => [
                      createVNode("div", {
                        class: _ctx.icon,
                        "text-xl": ""
                      }, null, 2)
                    ], true),
                    renderSlot(_ctx.$slots, "default", {}, () => [
                      createVNode("span", {
                        block: "",
                        "sm:hidden": "",
                        "xl:block": "",
                        "select-none": ""
                      }, toDisplayString(("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) ? _ctx.text : "\xA0"), 1)
                    ], true)
                  ], 2)
                ]),
                _: 3
              }, 8, ["disabled", "content"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/nav/NavSideItem.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-16939a83"]]);
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "NavSide",
  __ssrInlineRender: true,
  props: {
    command: { type: Boolean }
  },
  setup(__props) {
    const { notifications } = useNotifications();
    const useStarFavoriteIcon = usePreferences("useStarFavoriteIcon");
    const lastAccessedNotificationRoute = useLocalStorage(STORAGE_KEY_LAST_ACCESSED_NOTIFICATION_ROUTE, "");
    const lastAccessedExploreRoute = useLocalStorage(STORAGE_KEY_LAST_ACCESSED_EXPLORE_ROUTE, "");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NavSideItem = __nuxt_component_0;
      _push(`<nav${ssrRenderAttrs(mergeProps({
        "sm:px3": "",
        flex: "~ col gap2",
        shrink: "",
        "text-size-base": "",
        "leading-normal": "",
        "md:text-lg": "",
        "h-full": "",
        "mt-1": "",
        "overflow-y-auto": ""
      }, _attrs))} data-v-50e7b1d7>`);
      _push(ssrRenderComponent(_component_NavSideItem, {
        text: _ctx.$t("nav.search"),
        to: "/search",
        icon: "i-ri:search-line",
        "xl:hidden": "",
        command: _ctx.command
      }, null, _parent));
      _push(`<div class="spacer" shrink xl:hidden data-v-50e7b1d7></div>`);
      _push(ssrRenderComponent(_component_NavSideItem, {
        text: _ctx.$t("nav.home"),
        to: "/home",
        icon: "i-ri:home-5-line",
        "user-only": "",
        command: _ctx.command
      }, null, _parent));
      _push(ssrRenderComponent(_component_NavSideItem, {
        text: _ctx.$t("nav.notifications"),
        to: `/notifications/${unref(lastAccessedNotificationRoute)}`,
        icon: "i-ri:notification-4-line",
        "user-only": "",
        command: _ctx.command
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div flex relative data-v-50e7b1d7${_scopeId}><div class="i-ri:notification-4-line" text-xl data-v-50e7b1d7${_scopeId}></div>`);
            if (unref(notifications)) {
              _push2(`<div class="top-[-0.3rem] right-[-0.3rem]" absolute font-bold rounded-full h-4 w-4 text-xs bg-primary text-inverted flex items-center justify-center data-v-50e7b1d7${_scopeId}>${ssrInterpolate(unref(notifications) < 10 ? unref(notifications) : "\u2022")}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                flex: "",
                relative: ""
              }, [
                createVNode("div", {
                  class: "i-ri:notification-4-line",
                  "text-xl": ""
                }),
                unref(notifications) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "top-[-0.3rem] right-[-0.3rem]",
                  absolute: "",
                  "font-bold": "",
                  "rounded-full": "",
                  "h-4": "",
                  "w-4": "",
                  "text-xs": "",
                  "bg-primary": "",
                  "text-inverted": "",
                  flex: "",
                  "items-center": "",
                  "justify-center": ""
                }, toDisplayString(unref(notifications) < 10 ? unref(notifications) : "\u2022"), 1)) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NavSideItem, {
        text: _ctx.$t("nav.conversations"),
        to: "/conversations",
        icon: "i-ri:at-line",
        "user-only": "",
        command: _ctx.command
      }, null, _parent));
      _push(ssrRenderComponent(_component_NavSideItem, {
        text: _ctx.$t("nav.favourites"),
        to: "/favourites",
        icon: unref(useStarFavoriteIcon) ? "i-ri:star-line" : "i-ri:heart-3-line",
        "user-only": "",
        command: _ctx.command
      }, null, _parent));
      _push(ssrRenderComponent(_component_NavSideItem, {
        text: _ctx.$t("nav.bookmarks"),
        to: "/bookmarks",
        icon: "i-ri:bookmark-line",
        "user-only": "",
        command: _ctx.command
      }, null, _parent));
      _push(`<div class="spacer" shrink hidden sm:block data-v-50e7b1d7></div>`);
      _push(ssrRenderComponent(_component_NavSideItem, {
        text: _ctx.$t("action.compose"),
        to: "/compose",
        icon: "i-ri:quill-pen-line",
        "user-only": "",
        command: _ctx.command
      }, null, _parent));
      _push(`<div class="spacer" shrink hidden sm:block data-v-50e7b1d7></div>`);
      _push(ssrRenderComponent(_component_NavSideItem, {
        text: _ctx.$t("nav.explore"),
        to: ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) ? `/${"currentServer" in _ctx ? _ctx.currentServer : unref(currentServer)}/explore/${unref(lastAccessedExploreRoute)}` : `/explore/${unref(lastAccessedExploreRoute)}`,
        icon: "i-ri:compass-3-line",
        command: _ctx.command
      }, null, _parent));
      _push(ssrRenderComponent(_component_NavSideItem, {
        text: _ctx.$t("nav.local"),
        to: ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) ? `/${"currentServer" in _ctx ? _ctx.currentServer : unref(currentServer)}/public/local` : "/public/local",
        icon: "i-ri:group-2-line ",
        command: _ctx.command
      }, null, _parent));
      _push(ssrRenderComponent(_component_NavSideItem, {
        text: _ctx.$t("nav.federated"),
        to: ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) ? `/${"currentServer" in _ctx ? _ctx.currentServer : unref(currentServer)}/public` : "/public",
        icon: "i-ri:earth-line",
        command: _ctx.command
      }, null, _parent));
      _push(ssrRenderComponent(_component_NavSideItem, {
        text: _ctx.$t("nav.lists"),
        to: ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) ? `/${"currentServer" in _ctx ? _ctx.currentServer : unref(currentServer)}/lists` : "/lists",
        icon: "i-ri:list-check",
        "user-only": "",
        command: _ctx.command
      }, null, _parent));
      _push(ssrRenderComponent(_component_NavSideItem, {
        text: _ctx.$t("nav.hashtags"),
        to: "/hashtags",
        icon: "i-ri:hashtag",
        "user-only": "",
        command: _ctx.command
      }, null, _parent));
      _push(`<div class="spacer" shrink hidden sm:block data-v-50e7b1d7></div>`);
      _push(ssrRenderComponent(_component_NavSideItem, {
        text: _ctx.$t("nav.settings"),
        to: "/settings",
        icon: "i-ri:settings-3-line",
        command: _ctx.command
      }, null, _parent));
      _push(`</nav>`);
    };
  }
});
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/nav/NavSide.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-50e7b1d7"]]);
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "UserSignInEntry",
  __ssrInlineRender: true,
  setup(__props) {
    const { busy, oauth, singleInstanceServer } = useSignIn();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n_t = resolveComponent("i18n-t");
      _push(`<div${ssrRenderAttrs(mergeProps({
        p8: "",
        "lg:flex": "~ col gap2",
        hidden: ""
      }, _attrs))}>`);
      if ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) {
        _push(`<p text-sm>`);
        _push(ssrRenderComponent(_component_i18n_t, { keypath: "user.sign_in_notice_title" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<strong${_scopeId}>${ssrInterpolate("currentServer" in _ctx ? _ctx.currentServer : unref(currentServer))}</strong>`);
            } else {
              return [
                createVNode("strong", null, toDisplayString("currentServer" in _ctx ? _ctx.currentServer : unref(currentServer)), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p text-sm text-secondary>${ssrInterpolate(_ctx.$t(unref(singleInstanceServer) ? "user.single_instance_sign_in_desc" : "user.sign_in_desc"))}</p>`);
      if (unref(singleInstanceServer)) {
        _push(`<button flex="~ row" gap-x-2 items-center justify-center btn-solid text-center rounded-3${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}>`);
        if (unref(busy)) {
          _push(`<span aria-hidden="true" block animate animate-spin preserve-3d class="rtl-flip"><span block i-ri:loader-2-fill aria-hidden="true"></span></span>`);
        } else {
          _push(`<span aria-hidden="true" block i-ri:login-circle-line class="rtl-flip"></span>`);
        }
        _push(` ${ssrInterpolate(_ctx.$t("action.sign_in"))}</button>`);
      } else {
        _push(`<button btn-solid rounded-3 text-center mt-2 select-none>${ssrInterpolate(_ctx.$t("action.sign_in"))}</button>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/user/UserSignInEntry.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "CommonMask",
  __ssrInlineRender: true,
  props: {
    zIndex: { default: 100 },
    background: { default: "transparent" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        fixed: "",
        "top-0": "",
        "bottom-0": "",
        "left-0": "",
        "right-0": "",
        style: { background: _ctx.background, zIndex: _ctx.zIndex }
      }, _attrs))}></div>`);
    };
  }
});
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/CommonMask.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
function useMask(options = {}) {
  const {
    background = "transparent",
    getContainer = () => (void 0).body,
    zIndex = 100
  } = options;
  const wrapperEl = null;
  function show() {
    const container = getContainer();
    container?.appendChild(wrapperEl);
    const MaskComp = h(_sfc_main$m, { background, zIndex });
    render(MaskComp, wrapperEl);
  }
  function hide() {
    render(null, wrapperEl);
    wrapperEl.parentNode?.removeChild(wrapperEl);
  }
  return {
    show,
    hide
  };
}
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "UserDropdown",
  __ssrInlineRender: true,
  setup(__props) {
    const mask = useMask();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VDropdown = resolveComponent("VDropdown");
      const _component_AccountAvatar = _sfc_main$u;
      const _component_UserSwitcher = _sfc_main$5$1;
      _push(ssrRenderComponent(_component_VDropdown, mergeProps({
        distance: 0,
        placement: "top-start",
        strategy: "fixed",
        onApplyShow: ($event) => unref(mask).show(),
        onApplyHide: ($event) => unref(mask).hide()
      }, _attrs), {
        popper: withCtx(({ hide }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UserSwitcher, { onClick: hide }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UserSwitcher, { onClick: hide }, null, 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button btn-action-icon${ssrRenderAttr("aria-label", _ctx.$t("action.switch_account"))}${_scopeId}><div class="${ssrRenderClass({ "hidden xl:block": "currentUser" in _ctx ? _ctx.currentUser : unref(currentUser) })}" i-ri:more-2-line${_scopeId}></div>`);
            if ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)) {
              _push2(ssrRenderComponent(_component_AccountAvatar, {
                "xl:hidden": "",
                account: ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)).account,
                "w-9": "",
                "h-9": "",
                square: ""
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</button>`);
          } else {
            return [
              createVNode("button", {
                "btn-action-icon": "",
                "aria-label": _ctx.$t("action.switch_account")
              }, [
                createVNode("div", {
                  class: { "hidden xl:block": "currentUser" in _ctx ? _ctx.currentUser : unref(currentUser) },
                  "i-ri:more-2-line": ""
                }, null, 2),
                ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)) ? (openBlock(), createBlock(_component_AccountAvatar, {
                  key: 0,
                  "xl:hidden": "",
                  account: ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)).account,
                  "w-9": "",
                  "h-9": "",
                  square: ""
                }, null, 8, ["account"])) : createCommentVNode("", true)
              ], 8, ["aria-label"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/user/UserDropdown.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "UserPicker",
  __ssrInlineRender: true,
  setup(__props) {
    const all = useUsers();
    const router = useRouter();
    function clickUser(user) {
      if (user.account.acct === currentUser.value?.account.acct)
        router.push(getAccountRoute(user.account));
      else
        switchUser(user);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonTooltip = _sfc_main$o$1;
      const _component_AccountAvatar = _sfc_main$u;
      const _component_AccountDisplayName = _sfc_main$c$1;
      const _component_AccountHandle = _sfc_main$8$1;
      const _component_UserDropdown = _sfc_main$l;
      _push(`<div${ssrRenderAttrs(mergeProps({
        flex: "",
        "justify-start": "",
        "items-end": "",
        "px-2": "",
        "gap-5": ""
      }, _attrs))}><div flex="~ wrap-reverse" gap-5><!--[-->`);
      ssrRenderList(unref(all), (user) => {
        _push(ssrRenderComponent(_component_CommonTooltip, {
          distance: 8,
          delay: { show: 300, hide: 100 }
        }, {
          popper: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div text-center${_scopeId}><span text-4${_scopeId}>`);
              _push2(ssrRenderComponent(_component_AccountDisplayName, {
                account: user.account
              }, null, _parent2, _scopeId));
              _push2(`</span>`);
              _push2(ssrRenderComponent(_component_AccountHandle, {
                account: user.account
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { "text-center": "" }, [
                  createVNode("span", { "text-4": "" }, [
                    createVNode(_component_AccountDisplayName, {
                      account: user.account
                    }, null, 8, ["account"])
                  ]),
                  createVNode(_component_AccountHandle, {
                    account: user.account
                  }, null, 8, ["account"])
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button flex rounded cursor-pointer aria-label="Switch user" class="${ssrRenderClass(user.account.acct === ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser))?.account.acct ? "" : "op25 grayscale")}" hover="filter-none op100"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_AccountAvatar, {
                "w-13": "",
                "h-13": "",
                account: user.account,
                square: ""
              }, null, _parent2, _scopeId));
              _push2(`</button>`);
            } else {
              return [
                createVNode("button", {
                  flex: "",
                  rounded: "",
                  "cursor-pointer": "",
                  "aria-label": "Switch user",
                  class: user.account.acct === ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser))?.account.acct ? "" : "op25 grayscale",
                  hover: "filter-none op100",
                  onClick: ($event) => clickUser(user)
                }, [
                  createVNode(_component_AccountAvatar, {
                    "w-13": "",
                    "h-13": "",
                    account: user.account,
                    square: ""
                  }, null, 8, ["account"])
                ], 10, ["onClick"])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><div flex items-center justify-center w-13 h-13>`);
      _push(ssrRenderComponent(_component_UserDropdown, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/user/UserPicker.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "OfflineChecker",
  __ssrInlineRender: true,
  setup(__props) {
    const online = useOnline();
    return (_ctx, _push, _parent, _attrs) => {
      if (!unref(online)) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          "w-full": "",
          "min-h-30px": "",
          px4: "",
          py3: "",
          "text-primary": "",
          "bg-base": "",
          border: "t base",
          flex: "~ gap-2 center"
        }, _attrs))}><div i-ri:wifi-off-line></div> ${ssrInterpolate(_ctx.$t("common.offline_desc"))}</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/OfflineChecker.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "NavBottomMoreMenu",
  __ssrInlineRender: true,
  props: {
    "modelValue": { type: Boolean, ...{ required: true } },
    "modelModifiers": {}
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const modelValue = useModel(__props, "modelValue");
    const colorMode = useColorMode();
    const userSettings = useUserSettings();
    const drawerEl = ref();
    function toggleVisible() {
      modelValue.value = !modelValue.value;
    }
    const buttonEl = ref();
    function clickEvent(mouse) {
      if (mouse.target && !buttonEl.value?.children[0].contains(mouse.target)) {
        if (modelValue.value) {
          (void 0).removeEventListener("click", clickEvent);
          modelValue.value = false;
        }
      }
    }
    watch(modelValue, (val) => {
      if (val && false)
        (void 0).addEventListener("click", clickEvent);
    });
    const { dragging, dragDistance } = invoke(() => {
      const triggerDistance = 120;
      let scrollTop = 0;
      let beforeTouchPointY = 0;
      const dragDistance2 = ref(0);
      const dragging2 = ref(false);
      useEventListener(drawerEl, "scroll", (e) => {
        scrollTop = e.target.scrollTop;
        if (dragDistance2.value > 0)
          e.target.scrollTop = 0;
      }, { passive: true });
      useEventListener(drawerEl, "touchstart", (e) => {
        if (!modelValue.value)
          return;
        beforeTouchPointY = e.touches[0].pageY;
        dragDistance2.value = 0;
      }, { passive: true });
      useEventListener(drawerEl, "touchmove", (e) => {
        if (!modelValue.value)
          return;
        if (scrollTop > 0 && dragDistance2.value <= 0) {
          dragging2.value = false;
          beforeTouchPointY = e.touches[0].pageY;
          return;
        }
        const { pageY } = e.touches[0];
        dragDistance2.value += pageY - beforeTouchPointY;
        if (dragDistance2.value < 0)
          dragDistance2.value = 0;
        beforeTouchPointY = pageY;
        if (dragDistance2.value > 1)
          dragging2.value = true;
        if (dragDistance2.value > 0) {
          if (e?.cancelable && e?.preventDefault)
            e.preventDefault();
          e?.stopPropagation();
        }
      }, { passive: true });
      useEventListener(drawerEl, "touchend", () => {
        if (!modelValue.value)
          return;
        if (dragDistance2.value >= triggerDistance)
          modelValue.value = false;
        dragging2.value = false;
      }, { passive: true });
      return {
        dragDistance: dragDistance2,
        dragging: dragging2
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NavSide = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "buttonEl",
        ref: buttonEl,
        flex: "",
        "items-center": "",
        static: ""
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {
        toggleVisible,
        show: modelValue.value
      }, null, _push, _parent);
      _push(`<div style="${ssrRenderStyle(modelValue.value ? null : { display: "none" })}" absolute inset-x-0 top-auto bottom-full z-20 h-100vh flex items-end of-y-scroll of-x-hidden scrollbar-hide overscroll-none bg="black/50"><div absolute inset-0 opacity-0 h="[calc(100vh+0.5px)]"></div><div style="${ssrRenderStyle({
        transform: unref(dragging) ? `translateY(${unref(dragDistance)}px)` : ""
      })}" class="${ssrRenderClass({
        "duration-0": unref(dragging),
        "duration-250": !unref(dragging),
        "backdrop-blur-md": !("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "optimizeForLowPerformanceDevice")
      })}" transition="transform ease-in" flex-1 min-w-48 py-6 mb="-1px" of-y-auto scrollbar-hide overscroll-none max-h="[calc(100vh-200px)]" rounded-t-lg bg="white/85 dark:neutral-900/85" backdrop-filter border-t-1 border-base>`);
      _push(ssrRenderComponent(_component_NavSide, null, null, _parent));
      _push(`<div border="neutral-300 dark:neutral-700 t-1" m="x-3 y-2"></div><div flex="~ col gap2"><button flex flex-row items-center block px-5 py-2 focus-blue w-full text-sm text-base capitalize text-left whitespace-nowrap transition-colors duration-200 transform hover="bg-gray-100 dark:bg-gray-700 dark:text-white"><span class="i-ri:sun-line dark:i-ri:moon-line flex-shrink-0 text-xl me-4 !align-middle"></span> ${ssrInterpolate(unref(colorMode).value === "light" ? _ctx.$t("menu.toggle_theme.dark") : _ctx.$t("menu.toggle_theme.light"))}</button><button flex flex-row items-center block px-5 py-2 focus-blue w-full text-sm text-base capitalize text-left whitespace-nowrap transition-colors duration-200 transform hover="bg-gray-100 dark:bg-gray-700 dark:text-white"${ssrRenderAttr("aria-label", _ctx.$t("nav.zen_mode"))}><span class="${ssrRenderClass([("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "zenMode") ? "i-ri:layout-right-2-line" : "i-ri:layout-right-line", "flex-shrink-0 text-xl me-4 !align-middle"])}"></span> ${ssrInterpolate(_ctx.$t("nav.zen_mode"))}</button></div></div></div></div>`);
    };
  }
});
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/nav/NavBottomMoreMenu.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "NavBottom",
  __ssrInlineRender: true,
  setup(__props) {
    const moreMenuVisible = ref(false);
    const { notifications } = useNotifications();
    const lastAccessedNotificationRoute = useLocalStorage(STORAGE_KEY_LAST_ACCESSED_NOTIFICATION_ROUTE, "");
    const lastAccessedExploreRoute = useLocalStorage(STORAGE_KEY_LAST_ACCESSED_EXPLORE_ROUTE, "");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_NavBottomMoreMenu = _sfc_main$i;
      _push(`<nav${ssrRenderAttrs(mergeProps({
        "h-14": "",
        border: "t base",
        flex: "",
        "flex-row": "",
        "text-xl": "",
        "of-y-scroll": "",
        "scrollbar-hide": "",
        "overscroll-none": "",
        class: "after-content-empty after:h-[calc(100%+0.5px)] after:w-0.1px after:pointer-events-none"
      }, _attrs))}>`);
      if ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/home",
          "aria-label": _ctx.$t("nav.home"),
          "active-class": unref(moreMenuVisible) ? "" : "text-primary",
          flex: "",
          "flex-row": "",
          "items-center": "",
          "place-content-center": "",
          "h-full": "",
          "flex-1": "",
          class: "coarse-pointer:select-none",
          onClick: _ctx.$scrollToTop
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div i-ri:home-5-line${_scopeId}></div>`);
            } else {
              return [
                createVNode("div", { "i-ri:home-5-line": "" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/search",
          "aria-label": _ctx.$t("nav.search"),
          "active-class": unref(moreMenuVisible) ? "" : "text-primary",
          flex: "",
          "flex-row": "",
          "items-center": "",
          "place-content-center": "",
          "h-full": "",
          "flex-1": "",
          class: "coarse-pointer:select-none",
          onClick: _ctx.$scrollToTop
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div i-ri:search-line${_scopeId}></div>`);
            } else {
              return [
                createVNode("div", { "i-ri:search-line": "" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/notifications/${unref(lastAccessedNotificationRoute)}`,
          "aria-label": _ctx.$t("nav.notifications"),
          "active-class": unref(moreMenuVisible) ? "" : "text-primary",
          flex: "",
          "flex-row": "",
          "items-center": "",
          "place-content-center": "",
          "h-full": "",
          "flex-1": "",
          class: "coarse-pointer:select-none",
          onClick: _ctx.$scrollToTop
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div flex relative${_scopeId}><div class="i-ri:notification-4-line" text-xl${_scopeId}></div>`);
              if (unref(notifications)) {
                _push2(`<div class="top-[-0.3rem] right-[-0.3rem]" absolute font-bold rounded-full h-4 w-4 text-xs bg-primary text-inverted flex items-center justify-center${_scopeId}>${ssrInterpolate(unref(notifications) < 10 ? unref(notifications) : "\u2022")}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", {
                  flex: "",
                  relative: ""
                }, [
                  createVNode("div", {
                    class: "i-ri:notification-4-line",
                    "text-xl": ""
                  }),
                  unref(notifications) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "top-[-0.3rem] right-[-0.3rem]",
                    absolute: "",
                    "font-bold": "",
                    "rounded-full": "",
                    "h-4": "",
                    "w-4": "",
                    "text-xs": "",
                    "bg-primary": "",
                    "text-inverted": "",
                    flex: "",
                    "items-center": "",
                    "justify-center": ""
                  }, toDisplayString(unref(notifications) < 10 ? unref(notifications) : "\u2022"), 1)) : createCommentVNode("", true)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/conversations",
          "aria-label": _ctx.$t("nav.conversations"),
          "active-class": unref(moreMenuVisible) ? "" : "text-primary",
          flex: "",
          "flex-row": "",
          "items-center": "",
          "place-content-center": "",
          "h-full": "",
          "flex-1": "",
          class: "coarse-pointer:select-none",
          onClick: _ctx.$scrollToTop
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div i-ri:at-line${_scopeId}></div>`);
            } else {
              return [
                createVNode("div", { "i-ri:at-line": "" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/${"currentServer" in _ctx ? _ctx.currentServer : unref(currentServer)}/explore/${unref(lastAccessedExploreRoute)}`,
          "aria-label": _ctx.$t("nav.explore"),
          "active-class": unref(moreMenuVisible) ? "" : "text-primary",
          flex: "",
          "flex-row": "",
          "items-center": "",
          "place-content-center": "",
          "h-full": "",
          "flex-1": "",
          class: "coarse-pointer:select-none",
          onClick: _ctx.$scrollToTop
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div i-ri:compass-3-line${_scopeId}></div>`);
            } else {
              return [
                createVNode("div", { "i-ri:compass-3-line": "" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          group: "",
          to: `/${"currentServer" in _ctx ? _ctx.currentServer : unref(currentServer)}/public/local`,
          "aria-label": _ctx.$t("nav.local"),
          "active-class": unref(moreMenuVisible) ? "" : "text-primary",
          flex: "",
          "flex-row": "",
          "items-center": "",
          "place-content-center": "",
          "h-full": "",
          "flex-1": "",
          class: "coarse-pointer:select-none",
          onClick: _ctx.$scrollToTop
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div i-ri:group-2-line${_scopeId}></div>`);
            } else {
              return [
                createVNode("div", { "i-ri:group-2-line": "" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/${"currentServer" in _ctx ? _ctx.currentServer : unref(currentServer)}/public`,
          "aria-label": _ctx.$t("nav.federated"),
          "active-class": unref(moreMenuVisible) ? "" : "text-primary",
          flex: "",
          "flex-row": "",
          "items-center": "",
          "place-content-center": "",
          "h-full": "",
          "flex-1": "",
          class: "coarse-pointer:select-none",
          onClick: _ctx.$scrollToTop
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div i-ri:earth-line${_scopeId}></div>`);
            } else {
              return [
                createVNode("div", { "i-ri:earth-line": "" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      }
      _push(ssrRenderComponent(_component_NavBottomMoreMenu, {
        modelValue: unref(moreMenuVisible),
        "onUpdate:modelValue": ($event) => isRef(moreMenuVisible) ? moreMenuVisible.value = $event : null,
        flex: "",
        "flex-row": "",
        "items-center": "",
        "place-content-center": "",
        "h-full": "",
        "flex-1": "",
        "cursor-pointer": ""
      }, {
        default: withCtx(({ toggleVisible, show }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button flex items-center place-content-center h-full flex-1 class="${ssrRenderClass([show ? "!text-primary" : "", "select-none"])}" aria-label="More menu"${_scopeId}><span class="${ssrRenderClass(show ? "i-ri:close-fill" : "i-ri:more-fill")}"${_scopeId}></span></button>`);
          } else {
            return [
              createVNode("button", {
                flex: "",
                "items-center": "",
                "place-content-center": "",
                "h-full": "",
                "flex-1": "",
                class: ["select-none", show ? "!text-primary" : ""],
                "aria-label": "More menu",
                onClick: toggleVisible
              }, [
                createVNode("span", {
                  class: show ? "i-ri:close-fill" : "i-ri:more-fill"
                }, null, 2)
              ], 10, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav>`);
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/nav/NavBottom.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "NavFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const buildInfo = useBuildInfo();
    const timeAgoOptions = useTimeAgoOptions();
    const config = useRuntimeConfig();
    const userSettings = useUserSettings();
    const buildTimeDate = new Date(buildInfo.time);
    const buildTimeAgo = useTimeAgo(buildTimeDate, timeAgoOptions);
    const colorMode = useColorMode();
    function toggleDark() {
      colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonTooltip = _sfc_main$o$1;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_i18n_t = resolveComponent("i18n-t");
      _push(`<footer${ssrRenderAttrs(mergeProps({
        p4: "",
        "text-sm": "",
        "text-secondary-light": "",
        flex: "~ col"
      }, _attrs))}><div flex="~ gap2" items-center mb4>`);
      _push(ssrRenderComponent(_component_CommonTooltip, {
        content: _ctx.$t("nav.toggle_theme")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button flex i-ri:sun-line dark-i-ri:moon-line text-lg${ssrRenderAttr("aria-label", _ctx.$t("nav.toggle_theme"))}${_scopeId}></button>`);
          } else {
            return [
              createVNode("button", {
                flex: "",
                "i-ri:sun-line": "",
                "dark-i-ri:moon-line": "",
                "text-lg": "",
                "aria-label": _ctx.$t("nav.toggle_theme"),
                onClick: ($event) => toggleDark()
              }, null, 8, ["aria-label", "onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_CommonTooltip, {
        content: _ctx.$t("nav.zen_mode")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button flex text-lg class="${ssrRenderClass(("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "zenMode") ? "i-ri:layout-right-2-line" : "i-ri:layout-right-line")}"${ssrRenderAttr("aria-label", _ctx.$t("nav.zen_mode"))}${_scopeId}></button>`);
          } else {
            return [
              createVNode("button", {
                flex: "",
                "text-lg": "",
                class: ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "zenMode") ? "i-ri:layout-right-2-line" : "i-ri:layout-right-line",
                "aria-label": _ctx.$t("nav.zen_mode"),
                onClick: ($event) => ("togglePreferences" in _ctx ? _ctx.togglePreferences : unref(togglePreferences))("zenMode")
              }, null, 10, ["aria-label", "onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_CommonTooltip, {
        content: _ctx.$t("magic_keys.dialog_header")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button flex i-ri:keyboard-box-line dark-i-ri:keyboard-box-line text-lg${ssrRenderAttr("aria-label", _ctx.$t("magic_keys.dialog_header"))}${_scopeId}></button>`);
          } else {
            return [
              createVNode("button", {
                flex: "",
                "i-ri:keyboard-box-line": "",
                "dark-i-ri:keyboard-box-line": "",
                "text-lg": "",
                "aria-label": _ctx.$t("magic_keys.dialog_header"),
                onClick: "toggleKeyboardShortcuts" in _ctx ? _ctx.toggleKeyboardShortcuts : unref(toggleKeyboardShortcuts)
              }, null, 8, ["aria-label", "onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_CommonTooltip, {
        content: _ctx.$t("settings.about.sponsor_action")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              flex: "",
              "text-lg": "",
              "i-ri-heart-3-line": "",
              hover: "i-ri-heart-3-fill text-rose",
              "aria-label": _ctx.$t("settings.about.sponsor_action"),
              href: "https://github.com/sponsors/elk-zone",
              target: "_blank"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, {
                flex: "",
                "text-lg": "",
                "i-ri-heart-3-line": "",
                hover: "i-ri-heart-3-fill text-rose",
                "aria-label": _ctx.$t("settings.about.sponsor_action"),
                href: "https://github.com/sponsors/elk-zone",
                target: "_blank"
              }, null, 8, ["aria-label"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div>`);
      if ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) {
        _push(ssrRenderComponent(_component_i18n_t, { keypath: "nav.built_at" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<time${ssrRenderAttr("datetime", String(unref(buildTimeDate)))}${ssrRenderAttr("title", _ctx.$d(unref(buildTimeDate), "long"))}${_scopeId}>${ssrInterpolate(unref(buildTimeAgo))}</time>`);
            } else {
              return [
                createVNode("time", {
                  datetime: String(unref(buildTimeDate)),
                  title: _ctx.$d(unref(buildTimeDate), "long")
                }, toDisplayString(unref(buildTimeAgo)), 9, ["datetime", "title"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<span>${ssrInterpolate(_ctx.$t("nav.built_at", [_ctx.$d(unref(buildTimeDate), "shortDate")]))}</span>`);
      }
      _push(` \xB7 `);
      if (unref(buildInfo).env === "release") {
        _push(ssrRenderComponent(_component_NuxtLink, {
          external: "",
          href: `https://github.com/elk-zone/elk/releases/tag/v${unref(buildInfo).version}`,
          target: "_blank",
          "font-mono": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` v${ssrInterpolate(unref(buildInfo).version)}`);
            } else {
              return [
                createTextVNode(" v" + toDisplayString(unref(buildInfo).version), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<span>${ssrInterpolate(unref(buildInfo).env)}</span>`);
      }
      if (unref(buildInfo).commit && unref(buildInfo).branch !== "release") {
        _push(`<!--[--> \xB7 `);
        _push(ssrRenderComponent(_component_NuxtLink, {
          external: "",
          href: `https://github.com/elk-zone/elk/commit/${unref(buildInfo).commit}`,
          target: "_blank",
          "font-mono": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(buildInfo).shortCommit)}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(buildInfo).shortCommit), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        "cursor-pointer": "",
        "hover:underline": "",
        to: "/settings/about"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("settings.about.label"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("settings.about.label")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(config).public.privacyPolicyUrl) {
        _push(`<!--[--> \xB7 `);
        _push(ssrRenderComponent(_component_NuxtLink, {
          "cursor-pointer": "",
          "hover:underline": "",
          to: unref(config).public.privacyPolicyUrl
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("nav.privacy"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("nav.privacy")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(` \xB7 `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        href: "/m.webtoo.ls/@elk",
        target: "_blank"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Mastodon `);
          } else {
            return [
              createTextVNode(" Mastodon ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` \xB7 `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        href: "https://chat.elk.zone",
        target: "_blank",
        external: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Discord `);
          } else {
            return [
              createTextVNode(" Discord ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` \xB7 `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        href: "https://github.com/elk-zone/elk",
        target: "_blank",
        external: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` GitHub `);
          } else {
            return [
              createTextVNode(" GitHub ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></footer>`);
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/nav/NavFooter.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "UserSignIn",
  __ssrInlineRender: true,
  setup(__props) {
    const input = ref();
    ref([]);
    const autocompleteIndex = ref(0);
    const autocompleteShow = ref(false);
    const { busy, error, displayError, server, oauth } = useSignIn(input);
    const fuse = shallowRef(new proxy([]));
    const filteredServers = computed(() => {
      if (!server.value)
        return [];
      const results = fuse.value.search(server.value, { limit: 6 }).map((result) => result.item);
      if (results[0] === server.value)
        return [];
      return results;
    });
    function toSelector(server2) {
      return server2.replace(/[^\w-]/g, "-");
    }
    onClickOutside(input, () => {
      autocompleteShow.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n_t = resolveComponent("i18n-t");
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<form${ssrRenderAttrs(mergeProps({
        "text-center": "",
        "justify-center": "",
        "items-center": "",
        "max-w-150": "",
        py6: "",
        flex: "~ col gap-3"
      }, _attrs))}><div flex="~ center" items-end mb2 gap-x-2><img${ssrRenderAttr("src", `/${""}logo.svg`)} w-12 h-12 mxa height="48" width="48"${ssrRenderAttr("alt", _ctx.$t("app_logo"))} class="rtl-flip"><div text-3xl>${ssrInterpolate(_ctx.$t("action.sign_in"))}</div></div><div>${ssrInterpolate(_ctx.$t("user.server_address_label"))}</div><div class="${ssrRenderClass(unref(error) ? "animate animate-shake-x animate-delay-100" : null)}"><div dir="ltr" flex bg-gray:10 px4 py2 mxa rounded border="~ base" items-center font-mono focus:outline-none focus:ring="2 primary inset" relative class="${ssrRenderClass(unref(displayError) ? "border-red-600 dark:border-red-400" : null)}"><span text-secondary-light me1>https://</span><input${ssrRenderAttr("value", unref(server))} autocapitalize="off" inputmode="url" outline-none bg-transparent w-full max-w-50 spellcheck="false" autocorrect="off" autocomplete="off">`);
      if (unref(autocompleteShow) && unref(filteredServers).length) {
        _push(`<div absolute left-6em right-0 top="100%" bg-base rounded border="~ base" z-10 shadow of-auto overflow-y-auto class="max-h-[8rem]"><!--[-->`);
        ssrRenderList(unref(filteredServers), (name, idx) => {
          _push(`<button${ssrRenderAttr("id", toSelector(name))}${ssrRenderAttr("value", name)} px-2 py1 font-mono w-full text-left class="${ssrRenderClass(unref(autocompleteIndex) === idx ? "text-primary font-bold" : null)}">${ssrInterpolate(name)}</button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div min-h-4>`);
      if (unref(displayError)) {
        _push(`<p role="alert" p-0 m-0 text-xs text-red-600 dark:text-red-400>${ssrInterpolate(_ctx.$t("error.sign_in_error"))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div text-secondary text-sm flex><div i-ri:lightbulb-line me-1></div><span>`);
      _push(ssrRenderComponent(_component_i18n_t, { keypath: "user.tip_no_account" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              href: "https://joinmastodon.org/servers",
              target: "_blank",
              external: "",
              class: "text-primary",
              hover: "underline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("user.tip_register_account"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("user.tip_register_account")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, {
                href: "https://joinmastodon.org/servers",
                target: "_blank",
                external: "",
                class: "text-primary",
                hover: "underline"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("user.tip_register_account")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span></div><button flex="~ row" gap-x-2 items-center btn-solid mt2${ssrIncludeBooleanAttr(!unref(server) || unref(busy)) ? " disabled" : ""}>`);
      if (unref(busy)) {
        _push(`<span aria-hidden="true" block animate animate-spin preserve-3d class="rtl-flip"><span block i-ri:loader-2-fill aria-hidden="true"></span></span>`);
      } else {
        _push(`<span aria-hidden="true" block i-ri:login-circle-line class="rtl-flip"></span>`);
      }
      _push(` ${ssrInterpolate(_ctx.$t("action.sign_in"))}</button></form>`);
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/user/UserSignIn.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "HelpPreview",
  __ssrInlineRender: true,
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const vAutoFocus = (el) => el.focus();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        "my-8": "",
        "px-3": "",
        "sm:px-8": "",
        "md:max-w-200": "",
        flex: "~ col gap-4",
        relative: ""
      }, _attrs))}><button${ssrRenderAttrs(mergeProps({
        type: "button",
        "btn-action-icon": "",
        absolute: "",
        "top--8": "",
        "right-0": "",
        m1: "",
        "aria-label": "Close"
      }, ssrGetDirectiveProps(_ctx, vAutoFocus)))}><span i-ri:close-line></span></button><img${ssrRenderAttr("alt", _ctx.$t("app_logo"))}${ssrRenderAttr("src", `/${""}logo.svg`)} w-20 h-20 height="80" width="80" mxa class="rtl-flip"><h1 mxa text-4xl mb4>${ssrInterpolate(_ctx.$t("help.title"))}</h1><p>${ssrInterpolate(_ctx.$t("help.desc_para1"))}</p><p><b text-primary>${ssrInterpolate(_ctx.$t("help.desc_highlight"))}</b> ${ssrInterpolate(_ctx.$t("help.desc_para2"))}</p><p>${ssrInterpolate(_ctx.$t("help.desc_para4"))} `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        "font-bold": "",
        "text-primary": "",
        href: "https://github.com/elk-zone/elk",
        target: "_blank"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("help.desc_para5"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("help.desc_para5")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` ${ssrInterpolate(_ctx.$t("help.desc_para6"))}</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        "hover:text-primary": "",
        href: "https://github.com/sponsors/elk-zone",
        target: "_blank"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("help.desc_para3"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("help.desc_para3")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p flex="~ gap-2 wrap justify-center" mxa><!--[-->`);
      ssrRenderList("elkTeamMembers" in _ctx ? _ctx.elkTeamMembers : unref(elkTeamMembers), (team) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          href: team.link,
          target: "_blank",
          external: "",
          "rounded-full": "",
          transition: "",
          "duration-300": "",
          border: "~ transparent",
          hover: "scale-105 border-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttr("src", `/avatars/${team.github}-100x100.png`)}${ssrRenderAttr("alt", team.display)} rounded-full w-15 h-15 height="60" width="60"${_scopeId}>`);
            } else {
              return [
                createVNode("img", {
                  src: `/avatars/${team.github}-100x100.png`,
                  alt: team.display,
                  "rounded-full": "",
                  "w-15": "",
                  "h-15": "",
                  height: "60",
                  width: "60"
                }, null, 8, ["src", "alt"])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></p><p italic flex justify-center w-full>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        href: "https://github.com/sponsors/elk-zone",
        target: "_blank"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span text-xl font-script hover:text-primary transition duration-300${_scopeId}>${ssrInterpolate(_ctx.$t("help.footer_team"))}</span>`);
          } else {
            return [
              createVNode("span", {
                "text-xl": "",
                "font-script": "",
                "hover:text-primary": "",
                transition: "",
                "duration-300": ""
              }, toDisplayString(_ctx.$t("help.footer_team")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p><button type="button" btn-solid mxa>${ssrInterpolate(_ctx.$t("action.enter_app"))}</button></div>`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/help/HelpPreview.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class SubscriptionManager {
  constructor() {
    __publicField$1(this, "subscriptions", /* @__PURE__ */ new Set());
  }
  add(handler) {
    this.subscriptions.add(handler);
    return () => this.subscriptions.delete(handler);
  }
  notify(a, b, c) {
    if (!this.subscriptions.size)
      return;
    for (const handler of this.subscriptions)
      handler(a, b, c);
  }
  clear() {
    this.subscriptions.clear();
  }
}
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function isFloat(value) {
  return !isNaN(parseFloat(value));
}
class MotionValue {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   */
  constructor(init) {
    __publicField(this, "current");
    __publicField(this, "prev");
    __publicField(this, "timeDelta", 0);
    __publicField(this, "lastUpdated", 0);
    __publicField(this, "updateSubscribers", new SubscriptionManager());
    __publicField(this, "stopAnimation");
    __publicField(this, "canTrackVelocity", false);
    __publicField(this, "updateAndNotify", (v) => {
      this.prev = this.current;
      this.current = v;
      const { delta, timestamp } = getFrameData();
      if (this.lastUpdated !== timestamp) {
        this.timeDelta = delta;
        this.lastUpdated = timestamp;
      }
      sync.postRender(this.scheduleVelocityCheck);
      this.updateSubscribers.notify(this.current);
    });
    __publicField(this, "scheduleVelocityCheck", () => sync.postRender(this.velocityCheck));
    __publicField(this, "velocityCheck", ({ timestamp }) => {
      if (!this.canTrackVelocity)
        this.canTrackVelocity = isFloat(this.current);
      if (timestamp !== this.lastUpdated)
        this.prev = this.current;
    });
    this.prev = this.current = init;
    this.canTrackVelocity = isFloat(this.current);
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   */
  onChange(subscription) {
    return this.updateSubscribers.add(subscription);
  }
  clearListeners() {
    this.updateSubscribers.clear();
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @param v
   * @param render
   */
  set(v) {
    this.updateAndNotify(v);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   */
  get() {
    return this.current;
  }
  /**
   * Get previous value.
   *
   * @returns - The previous latest state of `MotionValue`
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   */
  getVelocity() {
    return this.canTrackVelocity ? velocityPerSecond(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta) : 0;
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   */
  start(animation) {
    this.stop();
    return new Promise((resolve) => {
      const { stop } = animation(resolve);
      this.stopAnimation = stop;
    }).then(() => this.clearAnimation());
  }
  /**
   * Stop the currently active animation.
   */
  stop() {
    if (this.stopAnimation)
      this.stopAnimation();
    this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   */
  isAnimating() {
    return !!this.stopAnimation;
  }
  /**
   * Clear the current animation reference.
   */
  clearAnimation() {
    this.stopAnimation = null;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   */
  destroy() {
    this.updateSubscribers.clear();
    this.stop();
  }
}
function getMotionValue(init) {
  return new MotionValue(init);
}
const { isArray } = Array;
function useMotionValues() {
  const motionValues = ref({});
  const stop = (keys) => {
    const destroyKey = (key) => {
      if (!motionValues.value[key])
        return;
      motionValues.value[key].stop();
      motionValues.value[key].destroy();
      delete motionValues.value[key];
    };
    if (keys) {
      if (isArray(keys)) {
        keys.forEach(destroyKey);
      } else {
        destroyKey(keys);
      }
    } else {
      Object.keys(motionValues.value).forEach(destroyKey);
    }
  };
  const get = (key, from, target) => {
    if (motionValues.value[key])
      return motionValues.value[key];
    const motionValue = getMotionValue(from);
    motionValue.onChange((v) => target[key] = v);
    motionValues.value[key] = motionValue;
    return motionValue;
  };
  tryOnUnmounted(stop);
  return {
    motionValues,
    get,
    stop
  };
}
function isKeyframesTarget(v) {
  return Array.isArray(v);
}
function underDampedSpring() {
  return {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restDelta: 0.5,
    restSpeed: 10
  };
}
function criticallyDampedSpring(to) {
  return {
    type: "spring",
    stiffness: 550,
    damping: to === 0 ? 2 * Math.sqrt(550) : 30,
    restDelta: 0.01,
    restSpeed: 10
  };
}
function overDampedSpring(to) {
  return {
    type: "spring",
    stiffness: 550,
    damping: to === 0 ? 100 : 30,
    restDelta: 0.01,
    restSpeed: 10
  };
}
function linearTween() {
  return {
    type: "keyframes",
    ease: "linear",
    duration: 300
  };
}
function keyframes(values) {
  return {
    type: "keyframes",
    duration: 800,
    values
  };
}
const defaultTransitions = {
  default: overDampedSpring,
  x: underDampedSpring,
  y: underDampedSpring,
  z: underDampedSpring,
  rotate: underDampedSpring,
  rotateX: underDampedSpring,
  rotateY: underDampedSpring,
  rotateZ: underDampedSpring,
  scaleX: criticallyDampedSpring,
  scaleY: criticallyDampedSpring,
  scale: criticallyDampedSpring,
  backgroundColor: linearTween,
  color: linearTween,
  opacity: linearTween
};
function getDefaultTransition(valueKey, to) {
  let transitionFactory;
  if (isKeyframesTarget(to)) {
    transitionFactory = keyframes;
  } else {
    transitionFactory = defaultTransitions[valueKey] || defaultTransitions.default;
  }
  return { to, ...transitionFactory(to) };
}
const int = {
  ...number,
  transform: Math.round
};
const valueTypes = {
  // Color props
  color,
  backgroundColor: color,
  outlineColor: color,
  fill: color,
  stroke: color,
  // Border props
  borderColor: color,
  borderTopColor: color,
  borderRightColor: color,
  borderBottomColor: color,
  borderLeftColor: color,
  borderWidth: px,
  borderTopWidth: px,
  borderRightWidth: px,
  borderBottomWidth: px,
  borderLeftWidth: px,
  borderRadius: px,
  radius: px,
  borderTopLeftRadius: px,
  borderTopRightRadius: px,
  borderBottomRightRadius: px,
  borderBottomLeftRadius: px,
  // Positioning props
  width: px,
  maxWidth: px,
  height: px,
  maxHeight: px,
  size: px,
  top: px,
  right: px,
  bottom: px,
  left: px,
  // Spacing props
  padding: px,
  paddingTop: px,
  paddingRight: px,
  paddingBottom: px,
  paddingLeft: px,
  margin: px,
  marginTop: px,
  marginRight: px,
  marginBottom: px,
  marginLeft: px,
  // Transform props
  rotate: degrees,
  rotateX: degrees,
  rotateY: degrees,
  rotateZ: degrees,
  scale,
  scaleX: scale,
  scaleY: scale,
  scaleZ: scale,
  skew: degrees,
  skewX: degrees,
  skewY: degrees,
  distance: px,
  translateX: px,
  translateY: px,
  translateZ: px,
  x: px,
  y: px,
  z: px,
  perspective: px,
  transformPerspective: px,
  opacity: alpha,
  originX: progressPercentage,
  originY: progressPercentage,
  originZ: px,
  // Misc
  zIndex: int,
  filter,
  WebkitFilter: filter,
  // SVG
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: int
};
const getValueType = (key) => valueTypes[key];
function getValueAsType(value, type) {
  return type && typeof value === "number" && type.transform ? type.transform(value) : value;
}
function getAnimatableNone(key, value) {
  let defaultValueType = getValueType(key);
  if (defaultValueType !== filter)
    defaultValueType = complex;
  return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : void 0;
}
const easingLookup = {
  linear,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate,
  bounceIn,
  bounceInOut,
  bounceOut
};
function easingDefinitionToFunction(definition) {
  if (Array.isArray(definition)) {
    const [x1, y1, x2, y2] = definition;
    return cubicBezier(x1, y1, x2, y2);
  } else if (typeof definition === "string") {
    return easingLookup[definition];
  }
  return definition;
}
function isEasingArray(ease) {
  return Array.isArray(ease) && typeof ease[0] !== "number";
}
function isAnimatable(key, value) {
  if (key === "zIndex")
    return false;
  if (typeof value === "number" || Array.isArray(value))
    return true;
  if (typeof value === "string" && // It's animatable if we have a string
  complex.test(value) && // And it contains numbers and/or colors
  !value.startsWith("url("))
    return true;
  return false;
}
function hydrateKeyframes(options) {
  if (Array.isArray(options.to) && options.to[0] === null) {
    options.to = [...options.to];
    options.to[0] = options.from;
  }
  return options;
}
function convertTransitionToAnimationOptions({ ease, times, delay, ...transition }) {
  const options = { ...transition };
  if (times)
    options.offset = times;
  if (ease) {
    options.ease = isEasingArray(ease) ? ease.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease);
  }
  if (delay)
    options.elapsed = -delay;
  return options;
}
function getPopmotionAnimationOptions(transition, options, key) {
  if (Array.isArray(options.to)) {
    if (!transition.duration)
      transition.duration = 800;
  }
  hydrateKeyframes(options);
  if (!isTransitionDefined(transition)) {
    transition = {
      ...transition,
      ...getDefaultTransition(key, options.to)
    };
  }
  return {
    ...options,
    ...convertTransitionToAnimationOptions(transition)
  };
}
function isTransitionDefined({ delay, repeat, repeatType, repeatDelay, from, ...transition }) {
  return !!Object.keys(transition).length;
}
function getValueTransition(transition, key) {
  return transition[key] || transition.default || transition;
}
function getAnimation(key, value, target, transition, onComplete) {
  const valueTransition = getValueTransition(transition, key);
  let origin = valueTransition.from === null || valueTransition.from === void 0 ? value.get() : valueTransition.from;
  const isTargetAnimatable = isAnimatable(key, target);
  if (origin === "none" && isTargetAnimatable && typeof target === "string")
    origin = getAnimatableNone(key, target);
  const isOriginAnimatable = isAnimatable(key, origin);
  function start(complete) {
    const options = {
      from: origin,
      to: target,
      velocity: transition.velocity ? transition.velocity : value.getVelocity(),
      onUpdate: (v) => value.set(v)
    };
    return valueTransition.type === "inertia" || valueTransition.type === "decay" ? inertia({ ...options, ...valueTransition }) : animate({
      ...getPopmotionAnimationOptions(valueTransition, options, key),
      onUpdate: (v) => {
        options.onUpdate(v);
        if (valueTransition.onUpdate)
          valueTransition.onUpdate(v);
      },
      onComplete: () => {
        if (transition.onComplete)
          transition.onComplete();
        if (onComplete)
          onComplete();
        if (complete)
          complete();
      }
    });
  }
  function set(complete) {
    value.set(target);
    if (transition.onComplete)
      transition.onComplete();
    if (onComplete)
      onComplete();
    if (complete)
      complete();
    return { stop: () => {
    } };
  }
  return !isOriginAnimatable || !isTargetAnimatable || valueTransition.type === false ? set : start;
}
function useMotionTransitions() {
  const { motionValues, stop, get } = useMotionValues();
  const push = (key, value, target, transition = {}, onComplete) => {
    const from = target[key];
    const motionValue = get(key, from, target);
    if (transition && transition.immediate) {
      motionValue.set(value);
      return;
    }
    const animation = getAnimation(key, motionValue, value, transition, onComplete);
    motionValue.start(animation);
  };
  return { motionValues, stop, push };
}
function useMotionControls(motionProperties, variants = {}, { motionValues, push, stop } = useMotionTransitions()) {
  const _variants = unref(variants);
  const isAnimating = ref(false);
  watch(
    motionValues,
    (newVal) => {
      isAnimating.value = Object.values(newVal).filter((value) => value.isAnimating()).length > 0;
    },
    {
      immediate: true,
      deep: true
    }
  );
  const getVariantFromKey = (variant) => {
    if (!_variants || !_variants[variant])
      throw new Error(`The variant ${variant} does not exist.`);
    return _variants[variant];
  };
  const apply = (variant) => {
    if (typeof variant === "string")
      variant = getVariantFromKey(variant);
    return Promise.all(
      Object.entries(variant).map(([key, value]) => {
        if (key === "transition")
          return void 0;
        return new Promise(
          (resolve) => (
            // @ts-expect-error - Fix errors later for typescript 5
            push(key, value, motionProperties, variant.transition || getDefaultTransition(key, variant[key]), resolve)
          )
        );
      }).filter(Boolean)
    );
  };
  const set = (variant) => {
    const variantData = isObject$1(variant) ? variant : getVariantFromKey(variant);
    Object.entries(variantData).forEach(([key, value]) => {
      if (key === "transition")
        return;
      push(key, value, motionProperties, {
        immediate: true
      });
    });
  };
  const leave = async (done) => {
    let leaveVariant;
    if (_variants) {
      if (_variants.leave)
        leaveVariant = _variants.leave;
      if (!_variants.leave && _variants.initial)
        leaveVariant = _variants.initial;
    }
    if (!leaveVariant) {
      done();
      return;
    }
    await apply(leaveVariant);
    done();
  };
  return {
    isAnimating,
    apply,
    set,
    leave,
    stop
  };
}
function registerEventListeners({ target, state, variants, apply }) {
  const _variants = unref(variants);
  const hovered = ref(false);
  const tapped = ref(false);
  const focused = ref(false);
  const mutableKeys = computed(() => {
    let result = [];
    if (!_variants)
      return result;
    if (_variants.hovered)
      result = [...result, ...Object.keys(_variants.hovered)];
    if (_variants.tapped)
      result = [...result, ...Object.keys(_variants.tapped)];
    if (_variants.focused)
      result = [...result, ...Object.keys(_variants.focused)];
    return result;
  });
  const computedProperties = computed(() => {
    const result = {};
    Object.assign(result, state.value);
    if (hovered.value && _variants.hovered)
      Object.assign(result, _variants.hovered);
    if (tapped.value && _variants.tapped)
      Object.assign(result, _variants.tapped);
    if (focused.value && _variants.focused)
      Object.assign(result, _variants.focused);
    for (const key in result) {
      if (!mutableKeys.value.includes(key))
        delete result[key];
    }
    return result;
  });
  if (_variants.hovered) {
    useEventListener(target, "mouseenter", () => hovered.value = true);
    useEventListener(target, "mouseleave", () => {
      hovered.value = false;
      tapped.value = false;
    });
    useEventListener(target, "mouseout", () => {
      hovered.value = false;
      tapped.value = false;
    });
  }
  if (_variants.tapped)
    ;
  if (_variants.focused) {
    useEventListener(target, "focus", () => focused.value = true);
    useEventListener(target, "blur", () => focused.value = false);
  }
  watch(computedProperties, apply);
}
function registerLifeCycleHooks({ set, target, variants, variant }) {
  const _variants = unref(variants);
  watch(
    () => target,
    () => {
      if (!_variants)
        return;
      if (_variants.initial)
        set("initial");
      if (_variants.enter)
        variant.value = "enter";
    },
    {
      immediate: true,
      flush: "pre"
    }
  );
}
function registerVariantsSync({ state, apply }) {
  watch(
    state,
    (newVal) => {
      if (newVal)
        apply(newVal);
    },
    {
      immediate: true
    }
  );
}
function registerVisibilityHooks({ target, variants, variant }) {
  const _variants = unref(variants);
  if (_variants && (_variants.visible || _variants.visibleOnce)) {
    useIntersectionObserver(target, ([{ isIntersecting }]) => {
      if (_variants.visible) {
        if (isIntersecting)
          variant.value = "visible";
        else
          variant.value = "initial";
      } else if (_variants.visibleOnce) {
        if (isIntersecting && variant.value !== "visibleOnce")
          variant.value = "visibleOnce";
        else if (!variant.value)
          variant.value = "initial";
      }
    });
  }
}
function useMotionFeatures(instance, options = {
  syncVariants: true,
  lifeCycleHooks: true,
  visibilityHooks: true,
  eventListeners: true
}) {
  if (options.lifeCycleHooks)
    registerLifeCycleHooks(instance);
  if (options.syncVariants)
    registerVariantsSync(instance);
  if (options.visibilityHooks)
    registerVisibilityHooks(instance);
  if (options.eventListeners)
    registerEventListeners(instance);
}
function reactiveStyle(props = {}) {
  const state = reactive({
    ...props
  });
  const style = ref({});
  watch(
    state,
    () => {
      const result = {};
      for (const [key, value] of Object.entries(state)) {
        const valueType = getValueType(key);
        const valueAsType = getValueAsType(value, valueType);
        result[key] = valueAsType;
      }
      style.value = result;
    },
    {
      immediate: true,
      deep: true
    }
  );
  return {
    state,
    style
  };
}
function usePermissiveTarget(target, onTarget) {
  watch(
    () => unrefElement(target),
    (el) => {
      if (!el)
        return;
      onTarget(el);
    },
    {
      immediate: true
    }
  );
}
const translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ"
};
function reactiveTransform(props = {}, enableHardwareAcceleration = true) {
  const state = reactive({ ...props });
  const transform = ref("");
  watch(
    state,
    (newVal) => {
      let result = "";
      let hasHardwareAcceleration = false;
      if (enableHardwareAcceleration && (newVal.x || newVal.y || newVal.z)) {
        const str = [newVal.x || 0, newVal.y || 0, newVal.z || 0].map(px.transform).join(",");
        result += `translate3d(${str}) `;
        hasHardwareAcceleration = true;
      }
      for (const [key, value] of Object.entries(newVal)) {
        if (enableHardwareAcceleration && (key === "x" || key === "y" || key === "z"))
          continue;
        const valueType = getValueType(key);
        const valueAsType = getValueAsType(value, valueType);
        result += `${translateAlias[key] || key}(${valueAsType}) `;
      }
      if (enableHardwareAcceleration && !hasHardwareAcceleration)
        result += "translateZ(0px) ";
      transform.value = result.trim();
    },
    {
      immediate: true,
      deep: true
    }
  );
  return {
    state,
    transform
  };
}
const transformAxes = ["", "X", "Y", "Z"];
const order = ["perspective", "translate", "scale", "rotate", "skew"];
const transformProps = ["transformPerspective", "x", "y", "z"];
order.forEach((operationKey) => {
  transformAxes.forEach((axesKey) => {
    const key = operationKey + axesKey;
    transformProps.push(key);
  });
});
const transformPropSet = new Set(transformProps);
function isTransformProp(key) {
  return transformPropSet.has(key);
}
const transformOriginProps = /* @__PURE__ */ new Set(["originX", "originY", "originZ"]);
function isTransformOriginProp(key) {
  return transformOriginProps.has(key);
}
function splitValues(variant) {
  const transform = {};
  const style = {};
  Object.entries(variant).forEach(([key, value]) => {
    if (isTransformProp(key) || isTransformOriginProp(key))
      transform[key] = value;
    else
      style[key] = value;
  });
  return { transform, style };
}
function variantToStyle(variant) {
  const { transform: _transform, style: _style } = splitValues(variant);
  const { transform } = reactiveTransform(_transform);
  const { style } = reactiveStyle(_style);
  if (transform.value)
    style.value.transform = transform.value;
  return style.value;
}
function useElementStyle(target, onInit) {
  let _cache;
  let _target;
  const { state, style } = reactiveStyle();
  usePermissiveTarget(target, (el) => {
    _target = el;
    for (const key of Object.keys(valueTypes)) {
      if (el.style[key] === null || el.style[key] === "" || isTransformProp(key) || isTransformOriginProp(key))
        continue;
      state[key] = el.style[key];
    }
    if (_cache) {
      Object.entries(_cache).forEach(([key, value]) => el.style[key] = value);
    }
    if (onInit)
      onInit(state);
  });
  watch(
    style,
    (newVal) => {
      if (!_target) {
        _cache = newVal;
        return;
      }
      for (const key in newVal)
        _target.style[key] = newVal[key];
    },
    {
      immediate: true
    }
  );
  return {
    style: state
  };
}
function parseTransform(transform) {
  const transforms = transform.trim().split(/\) |\)/);
  if (transforms.length === 1)
    return {};
  const parseValues = (value) => {
    if (value.endsWith("px") || value.endsWith("deg"))
      return parseFloat(value);
    if (isNaN(Number(value)))
      return Number(value);
    return value;
  };
  return transforms.reduce((acc, transform2) => {
    if (!transform2)
      return acc;
    const [name, transformValue] = transform2.split("(");
    const valueArray = transformValue.split(",");
    const values = valueArray.map((val) => {
      return parseValues(val.endsWith(")") ? val.replace(")", "") : val.trim());
    });
    const value = values.length === 1 ? values[0] : values;
    return {
      ...acc,
      [name]: value
    };
  }, {});
}
function stateFromTransform(state, transform) {
  Object.entries(parseTransform(transform)).forEach(([key, value]) => {
    const axes = ["x", "y", "z"];
    if (key === "translate3d") {
      if (value === 0) {
        axes.forEach((axis) => state[axis] = 0);
        return;
      }
      value.forEach((axisValue, index) => state[axes[index]] = axisValue);
      return;
    }
    value = parseFloat(value);
    if (key === "translateX") {
      state.x = value;
      return;
    }
    if (key === "translateY") {
      state.y = value;
      return;
    }
    if (key === "translateZ") {
      state.z = value;
      return;
    }
    state[key] = value;
  });
}
function useElementTransform(target, onInit) {
  let _cache;
  let _target;
  const { state, transform } = reactiveTransform();
  usePermissiveTarget(target, (el) => {
    _target = el;
    if (el.style.transform)
      stateFromTransform(state, el.style.transform);
    if (_cache)
      el.style.transform = _cache;
    if (onInit)
      onInit(state);
  });
  watch(
    transform,
    (newValue) => {
      if (!_target) {
        _cache = newValue;
        return;
      }
      _target.style.transform = newValue;
    },
    {
      immediate: true
    }
  );
  return {
    transform: state
  };
}
function useMotionProperties(target, defaultValues) {
  const motionProperties = reactive({});
  const apply = (values) => Object.entries(values).forEach(([key, value]) => motionProperties[key] = value);
  const { style } = useElementStyle(target, apply);
  const { transform } = useElementTransform(target, apply);
  watch(
    motionProperties,
    (newVal) => {
      Object.entries(newVal).forEach(([key, value]) => {
        const target2 = isTransformProp(key) ? transform : style;
        if (target2[key] && target2[key] === value)
          return;
        target2[key] = value;
      });
    },
    {
      immediate: true,
      deep: true
    }
  );
  usePermissiveTarget(target, () => defaultValues && apply(defaultValues));
  return {
    motionProperties,
    style,
    transform
  };
}
function useMotionVariants(variants = {}) {
  const _variants = unref(variants);
  const variant = ref();
  const state = computed(() => {
    if (!variant.value)
      return;
    return _variants[variant.value];
  });
  return {
    state,
    variant
  };
}
function useMotion(target, variants = {}, options) {
  const { motionProperties } = useMotionProperties(target);
  const { variant, state } = useMotionVariants(variants);
  const controls = useMotionControls(motionProperties, variants);
  const instance = {
    target,
    variant,
    variants,
    state,
    motionProperties,
    ...controls
  };
  useMotionFeatures(instance, options);
  return instance;
}
const fade = {
  initial: {
    opacity: 0
  },
  enter: {
    opacity: 1
  }
};
const fadeVisible = {
  initial: {
    opacity: 0
  },
  visible: {
    opacity: 1
  }
};
const fadeVisibleOnce = {
  initial: {
    opacity: 0
  },
  visibleOnce: {
    opacity: 1
  }
};
const pop = {
  initial: {
    scale: 0,
    opacity: 0
  },
  enter: {
    scale: 1,
    opacity: 1
  }
};
const popVisible = {
  initial: {
    scale: 0,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1
  }
};
const popVisibleOnce = {
  initial: {
    scale: 0,
    opacity: 0
  },
  visibleOnce: {
    scale: 1,
    opacity: 1
  }
};
const rollLeft = {
  initial: {
    x: -100,
    rotate: 90,
    opacity: 0
  },
  enter: {
    x: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleLeft = {
  initial: {
    x: -100,
    rotate: 90,
    opacity: 0
  },
  visible: {
    x: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleOnceLeft = {
  initial: {
    x: -100,
    rotate: 90,
    opacity: 0
  },
  visibleOnce: {
    x: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollRight = {
  initial: {
    x: 100,
    rotate: -90,
    opacity: 0
  },
  enter: {
    x: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleRight = {
  initial: {
    x: 100,
    rotate: -90,
    opacity: 0
  },
  visible: {
    x: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleOnceRight = {
  initial: {
    x: 100,
    rotate: -90,
    opacity: 0
  },
  visibleOnce: {
    x: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollTop = {
  initial: {
    y: -100,
    rotate: -90,
    opacity: 0
  },
  enter: {
    y: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleTop = {
  initial: {
    y: -100,
    rotate: -90,
    opacity: 0
  },
  visible: {
    y: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleOnceTop = {
  initial: {
    y: -100,
    rotate: -90,
    opacity: 0
  },
  visibleOnce: {
    y: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollBottom = {
  initial: {
    y: 100,
    rotate: 90,
    opacity: 0
  },
  enter: {
    y: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleBottom = {
  initial: {
    y: 100,
    rotate: 90,
    opacity: 0
  },
  visible: {
    y: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleOnceBottom = {
  initial: {
    y: 100,
    rotate: 90,
    opacity: 0
  },
  visibleOnce: {
    y: 0,
    rotate: 0,
    opacity: 1
  }
};
const slideLeft = {
  initial: {
    x: -100,
    opacity: 0
  },
  enter: {
    x: 0,
    opacity: 1
  }
};
const slideVisibleLeft = {
  initial: {
    x: -100,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1
  }
};
const slideVisibleOnceLeft = {
  initial: {
    x: -100,
    opacity: 0
  },
  visibleOnce: {
    x: 0,
    opacity: 1
  }
};
const slideRight = {
  initial: {
    x: 100,
    opacity: 0
  },
  enter: {
    x: 0,
    opacity: 1
  }
};
const slideVisibleRight = {
  initial: {
    x: 100,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1
  }
};
const slideVisibleOnceRight = {
  initial: {
    x: 100,
    opacity: 0
  },
  visibleOnce: {
    x: 0,
    opacity: 1
  }
};
const slideTop = {
  initial: {
    y: -100,
    opacity: 0
  },
  enter: {
    y: 0,
    opacity: 1
  }
};
const slideVisibleTop = {
  initial: {
    y: -100,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1
  }
};
const slideVisibleOnceTop = {
  initial: {
    y: -100,
    opacity: 0
  },
  visibleOnce: {
    y: 0,
    opacity: 1
  }
};
const slideBottom = {
  initial: {
    y: 100,
    opacity: 0
  },
  enter: {
    y: 0,
    opacity: 1
  }
};
const slideVisibleBottom = {
  initial: {
    y: 100,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1
  }
};
const slideVisibleOnceBottom = {
  initial: {
    y: 100,
    opacity: 0
  },
  visibleOnce: {
    y: 0,
    opacity: 1
  }
};
const presets = {
  __proto__: null,
  fade,
  fadeVisible,
  fadeVisibleOnce,
  pop,
  popVisible,
  popVisibleOnce,
  rollBottom,
  rollLeft,
  rollRight,
  rollTop,
  rollVisibleBottom,
  rollVisibleLeft,
  rollVisibleOnceBottom,
  rollVisibleOnceLeft,
  rollVisibleOnceRight,
  rollVisibleOnceTop,
  rollVisibleRight,
  rollVisibleTop,
  slideBottom,
  slideLeft,
  slideRight,
  slideTop,
  slideVisibleBottom,
  slideVisibleLeft,
  slideVisibleOnceBottom,
  slideVisibleOnceLeft,
  slideVisibleOnceRight,
  slideVisibleOnceTop,
  slideVisibleRight,
  slideVisibleTop
};
defineComponent({
  props: {
    is: {
      type: [String, Object],
      required: false
    },
    // Preset to be loaded
    preset: {
      type: String,
      required: false
    },
    // Instance
    instance: {
      type: Object,
      required: false
    },
    // Variants
    variants: {
      type: Object,
      required: false
    },
    // Initial variant
    initial: {
      type: Object,
      required: false
    },
    // Lifecycle hooks variants
    enter: {
      type: Object,
      required: false
    },
    leave: {
      type: Object,
      required: false
    },
    // Intersection observer variants
    visible: {
      type: Object,
      required: false
    },
    visibleOnce: {
      type: Object,
      required: false
    },
    // Event listeners variants
    hovered: {
      type: Object,
      required: false
    },
    tapped: {
      type: Object,
      required: false
    },
    focused: {
      type: Object,
      required: false
    },
    // Helpers
    delay: {
      type: [Number, String],
      required: false
    }
  },
  setup(props) {
    const slots = useSlots();
    const instances = reactive({});
    if (!props.is && !slots.default)
      return () => h("div", {});
    const _preset = computed(() => {
      let preset;
      if (props.preset)
        preset = presets[props.preset];
      return preset;
    });
    const propsConfig = computed(() => ({
      initial: props.initial,
      enter: props.enter,
      leave: props.leave,
      visible: props.visible,
      visibleOnce: props.visibleOnce,
      hovered: props.hovered,
      tapped: props.tapped,
      focused: props.focused
    }));
    const motionConfig = computed(() => {
      const config = {
        ...propsConfig.value,
        ..._preset.value || {},
        ...props.variants || {}
      };
      if (props.delay) {
        config.enter.transition = { ...config.enter.transition };
        config.enter.transition.delay = parseInt(props.delay);
      }
      return config;
    });
    const component2 = computed(() => {
      if (!props.is)
        return;
      let comp = props.is;
      if (typeof component2.value === "string" && !isHTMLTag(comp)) {
        comp = resolveComponent(comp);
      }
      return comp;
    });
    if (process?.env?.NODE_ENV === "development" || false) {
      const replayAnimation = (instance) => {
        if (instance.variants?.initial)
          instance.set("initial");
        setTimeout(() => {
          if (instance.variants?.enter)
            instance.apply("enter");
          if (instance.variants?.visible)
            instance.apply("visible");
          if (instance.variants?.visibleOnce)
            instance.apply("visibleOnce");
        }, 10);
      };
      onUpdated(() => Object.entries(instances).forEach(([_, value]) => replayAnimation(value)));
    }
    return {
      slots,
      component: component2,
      motionConfig,
      instances
    };
  },
  render({ slots, motionConfig, instances, component: component2 }) {
    const style = variantToStyle(motionConfig.initial || {});
    const setNode = (node, index) => {
      if (!node.props)
        node.props = {};
      node.props.style = style;
      node.props.onVnodeMounted = ({ el }) => {
        const instance = useMotion(el, motionConfig);
        instances[index] = instance;
      };
      return node;
    };
    if (component2) {
      const node = h(component2, void 0, slots);
      setNode(node, 0);
      return node;
    }
    const nodes = slots.default?.() || [];
    return nodes.map((node, index) => setNode(node, index));
  }
});
const slideGap = 20;
const doubleTapThreshold = 250;
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "ModalMediaPreviewCarousel",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    media: { default: () => [] }
  }, {
    "modelValue": { required: true },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["close"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const modelValue = useModel(__props, "modelValue");
    const view = ref();
    ref();
    const slide = ref();
    const image = ref();
    const reduceMotion = ref(false);
    const isInitialScrollDone = useTimeout(350);
    const canAnimate = computed(() => isInitialScrollDone.value && !reduceMotion.value);
    const scale2 = ref(1);
    const x = ref(0);
    const y = ref(0);
    const isDragging = ref(false);
    const isPinching = ref(false);
    const maxZoomOut = ref(1);
    const isZoomedIn = computed(() => scale2.value > 1);
    function goToFocusedSlide() {
      scale2.value = 1;
      x.value = slide.value[modelValue.value].offsetLeft * scale2.value;
      y.value = 0;
    }
    watch(modelValue, goToFocusedSlide);
    let lastOrigin = [0, 0];
    let initialScale = 0;
    useGesture({
      onPinch({ first, initial: [initialDistance], movement: [deltaDistance], da: [distance], origin, touches }) {
        isPinching.value = true;
        if (first) {
          initialScale = scale2.value;
        } else {
          if (touches === 0)
            handleMouseWheelZoom(initialScale, deltaDistance, origin);
          else
            handlePinchZoom(initialScale, initialDistance, distance, origin);
        }
        lastOrigin = origin;
      },
      onPinchEnd() {
        isPinching.value = false;
        isDragging.value = false;
        if (!isZoomedIn.value)
          goToFocusedSlide();
      },
      onDrag({ movement, delta, pinching, tap, last, swipe, event, xy }) {
        event.preventDefault();
        if (pinching)
          return;
        if (last)
          handleLastDrag(tap, swipe, movement, xy);
        else
          handleDrag(delta, movement);
      }
    }, {
      domTarget: view,
      eventOptions: {
        passive: false
      }
    });
    const shiftRestrictions = computed(() => {
      const focusedImage = image.value[modelValue.value];
      const focusedSlide = slide.value[modelValue.value];
      const scaledImageWidth = focusedImage.offsetWidth * scale2.value;
      const scaledHorizontalOverflow = scaledImageWidth / 2 - view.value.clientWidth / 2 + slideGap;
      const horizontalOverflow = Math.max(0, scaledHorizontalOverflow / scale2.value);
      const scaledImageHeight = focusedImage.offsetHeight * scale2.value;
      const scaledVerticalOverflow = scaledImageHeight / 2 - view.value.clientHeight / 2 + slideGap;
      const verticalOverflow = Math.max(0, scaledVerticalOverflow / scale2.value);
      return {
        left: focusedSlide.offsetLeft - horizontalOverflow,
        right: focusedSlide.offsetLeft + horizontalOverflow,
        top: focusedSlide.offsetTop - verticalOverflow,
        bottom: focusedSlide.offsetTop + verticalOverflow
      };
    });
    function handlePinchZoom(initialScale2, initialDistance, distance, [originX, originY]) {
      scale2.value = initialScale2 * (distance / initialDistance);
      scale2.value = Math.max(maxZoomOut.value, scale2.value);
      const deltaCenterX = originX - lastOrigin[0];
      const deltaCenterY = originY - lastOrigin[1];
      handleZoomDrag([deltaCenterX, deltaCenterY]);
    }
    function handleMouseWheelZoom(initialScale2, deltaDistance, [originX, originY]) {
      scale2.value = initialScale2 + deltaDistance / 1e3;
      scale2.value = Math.max(maxZoomOut.value, scale2.value);
      const deltaCenterX = lastOrigin[0] - originX;
      const deltaCenterY = lastOrigin[1] - originY;
      handleZoomDrag([deltaCenterX, deltaCenterY]);
    }
    function handleLastDrag(tap, swipe, movement, position) {
      isDragging.value = false;
      if (tap)
        handleTap(position);
      else if (swipe[0] || swipe[1])
        handleSwipe(swipe, movement);
      else if (!isZoomedIn.value)
        slideToClosestSlide();
    }
    let lastTapAt = 0;
    function handleTap([positionX, positionY]) {
      const now = Date.now();
      const isDoubleTap = now - lastTapAt < doubleTapThreshold;
      lastTapAt = now;
      if (!isDoubleTap)
        return;
      if (isZoomedIn.value) {
        goToFocusedSlide();
      } else {
        const focusedSlideBounding = slide.value[modelValue.value].getBoundingClientRect();
        const slideCenterX = focusedSlideBounding.left + focusedSlideBounding.width / 2;
        const slideCenterY = focusedSlideBounding.top + focusedSlideBounding.height / 2;
        scale2.value = 3;
        x.value += positionX - slideCenterX;
        y.value += positionY - slideCenterY;
        restrictShiftToInsideSlide();
      }
    }
    function handleSwipe([horiz, vert], [movementX, movementY]) {
      if (isZoomedIn.value || isPinching.value)
        return;
      const isHorizontalDrag = Math.abs(movementX) >= Math.abs(movementY);
      if (isHorizontalDrag) {
        if (horiz === 1)
          modelValue.value = Math.max(0, modelValue.value - 1);
        if (horiz === -1)
          modelValue.value = Math.min(__props.media.length - 1, modelValue.value + 1);
      } else if (vert === 1 || vert === -1) {
        emit("close");
      }
      goToFocusedSlide();
    }
    function slideToClosestSlide() {
      const startOfFocusedSlide = slide.value[modelValue.value].offsetLeft * scale2.value;
      const slideWidth = slide.value[modelValue.value].offsetWidth * scale2.value;
      if (x.value > startOfFocusedSlide + slideWidth / 2)
        modelValue.value = Math.min(__props.media.length - 1, modelValue.value + 1);
      else if (x.value < startOfFocusedSlide - slideWidth / 2)
        modelValue.value = Math.max(0, modelValue.value - 1);
      goToFocusedSlide();
    }
    function handleDrag(delta, movement) {
      isDragging.value = true;
      if (isZoomedIn.value)
        handleZoomDrag(delta);
      else
        handleSlideDrag(movement);
    }
    function handleZoomDrag([deltaX, deltaY]) {
      x.value -= deltaX / scale2.value;
      y.value -= deltaY / scale2.value;
      restrictShiftToInsideSlide();
    }
    function handleSlideDrag([movementX, movementY]) {
      goToFocusedSlide();
      if (Math.abs(movementY) > Math.abs(movementX))
        y.value -= movementY / scale2.value;
      else
        x.value -= movementX / scale2.value;
      if (__props.media.length === 1)
        x.value = 0;
    }
    function restrictShiftToInsideSlide() {
      x.value = Math.min(shiftRestrictions.value.right, Math.max(shiftRestrictions.value.left, x.value));
      y.value = Math.min(shiftRestrictions.value.bottom, Math.max(shiftRestrictions.value.top, y.value));
    }
    const sliderStyle = computed(() => {
      const style = {
        transform: `scale(${scale2.value}) translate(${-x.value}px, ${-y.value}px)`,
        transition: "none",
        gap: `${slideGap}px`
      };
      if (canAnimate.value && !isDragging.value && !isPinching.value)
        style.transition = "all 0.3s ease";
      return style;
    });
    const imageStyle = computed(() => ({
      cursor: isDragging.value ? "grabbing" : "grab"
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "view",
        ref: view,
        flex: "",
        "flex-row": "",
        "h-full": "",
        "w-full": "",
        "overflow-hidden": ""
      }, _attrs))}><div style="${ssrRenderStyle(unref(sliderStyle))}" w-full h-full flex items-center><!--[-->`);
      ssrRenderList(_ctx.media, (item) => {
        _push(`<div flex-shrink-0 w-full h-full flex items-center justify-center><img select-none max-w-full max-h-full style="${ssrRenderStyle(unref(imageStyle))}"${ssrRenderAttr("draggable", false)}${ssrRenderAttr("src", item.url || item.previewUrl)}${ssrRenderAttr("alt", item.description || "")}></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/ModalMediaPreviewCarousel.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "ModalMediaPreview",
  __ssrInlineRender: true,
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const locked = useScrollLock((void 0).body);
    const index = mediaPreviewIndex;
    const current = computed(() => mediaPreviewList.value[mediaPreviewIndex.value]);
    const hasNext = computed(() => index.value < mediaPreviewList.value.length - 1);
    const hasPrev = computed(() => index.value > 0);
    const keys = useMagicKeys();
    whenever(keys.arrowLeft, prev);
    whenever(keys.arrowRight, next);
    function next() {
      if (hasNext.value)
        index.value++;
    }
    function prev() {
      if (hasPrev.value)
        index.value--;
    }
    onUnmounted(() => locked.value = false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModalMediaPreviewCarousel = _sfc_main$d;
      _push(`<div${ssrRenderAttrs(mergeProps({
        relative: "",
        "h-full": "",
        "w-full": "",
        flex: "",
        "pt-12": "",
        "w-100vh": ""
      }, _attrs))}>`);
      if (unref(hasNext)) {
        _push(`<button pointer-events-auto btn-action-icon bg="black/20"${ssrRenderAttr("aria-label", _ctx.$t("action.previous"))} hover:bg="black/40" dark:bg="white/30" dark-hover:bg="white/20" absolute top="1/2" right-1 z5${ssrRenderAttr("title", _ctx.$t("action.next"))}><div i-ri:arrow-right-s-line text-white></div></button>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(hasPrev)) {
        _push(`<button pointer-events-auto btn-action-icon bg="black/20" aria-label="action.next" hover:bg="black/40" dark:bg="white/30" dark:hover-bg="white/20" absolute top="1/2" left-1 z5${ssrRenderAttr("title", _ctx.$t("action.prev"))}><div i-ri:arrow-left-s-line text-white></div></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div flex="~ col center" h-full w-full>`);
      _push(ssrRenderComponent(_component_ModalMediaPreviewCarousel, {
        modelValue: unref(index),
        "onUpdate:modelValue": ($event) => isRef(index) ? index.value = $event : null,
        media: "mediaPreviewList" in _ctx ? _ctx.mediaPreviewList : unref(mediaPreviewList),
        onClose: ($event) => emit("close")
      }, null, _parent));
      _push(`<div bg="black/30" dark:bg="white/10" mb-6 mt-4 text-white rounded-full flex="~ center shrink-0" overflow-hidden>`);
      if (("mediaPreviewList" in _ctx ? _ctx.mediaPreviewList : unref(mediaPreviewList)).length > 1) {
        _push(`<div p="y-1 x-3" rounded-r-0 shrink-0>${ssrInterpolate(unref(index) + 1)} / ${ssrInterpolate(("mediaPreviewList" in _ctx ? _ctx.mediaPreviewList : unref(mediaPreviewList)).length)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(current).description) {
        _push(`<p bg="dark/30" dark:bg="white/10" p="y-1 x-3" rounded-ie-full line-clamp-1 ws-pre-wrap break-all${ssrRenderAttr("title", unref(current).description)} w-full>${ssrInterpolate(unref(current).description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div absolute top-0 w-full flex justify-end><button btn-action-icon bg="black/30" aria-label="action.close" hover:bg="black/40" dark:bg="white/30" dark:hover-bg="white/20" pointer-events-auto shrink-0><div i-ri:close-line text-white></div></button></div></div>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/ModalMediaPreview.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "StatusEditPreview",
  __ssrInlineRender: true,
  props: {
    edit: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AccountInlineInfo = _sfc_main$t;
      const _component_StatusSpoiler = _sfc_main$8$2;
      const _component_StatusBody = _sfc_main$9$1;
      const _component_StatusMedia = _sfc_main$4$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        px3: "",
        "py-4": "",
        flex: "~ col"
      }, _attrs))}><div text-center flex="~ row gap-1 wrap">`);
      _push(ssrRenderComponent(_component_AccountInlineInfo, {
        account: _ctx.edit.account
      }, null, _parent));
      _push(`<span>${ssrInterpolate(_ctx.$t("status_history.edited", [("useFormattedDateTime" in _ctx ? _ctx.useFormattedDateTime : unref(useFormattedDateTime))(_ctx.edit.createdAt).value]))}</span></div><div h1px bg="gray/20" my2></div>`);
      _push(ssrRenderComponent(_component_StatusSpoiler, {
        enabled: _ctx.edit.sensitive
      }, {
        spoiler: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.edit.spoilerText)}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.edit.spoilerText), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_StatusBody, { status: _ctx.edit }, null, _parent2, _scopeId));
            if (_ctx.edit.mediaAttachments.length) {
              _push2(ssrRenderComponent(_component_StatusMedia, { status: _ctx.edit }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_StatusBody, { status: _ctx.edit }, null, 8, ["status"]),
              _ctx.edit.mediaAttachments.length ? (openBlock(), createBlock(_component_StatusMedia, {
                key: 0,
                status: _ctx.edit
              }, null, 8, ["status"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/edit/StatusEditPreview.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "CommandKey",
  __ssrInlineRender: true,
  props: {
    name: {}
  },
  setup(__props) {
    const props = __props;
    const isMac = useIsMac();
    const keys = computed(() => props.name.toLowerCase().split("+"));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center px-1" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(keys), (key, index) => {
        _push(`<!--[-->`);
        if (index > 0) {
          _push(`<div class="inline-block px-.5"> + </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="p-1 grid place-items-center rounded-lg shadow-sm" text="xs secondary" border="1 base">`);
        if (key === "enter") {
          _push(`<div i-material-symbols:keyboard-return-rounded></div>`);
        } else if (key === "meta" && unref(isMac)) {
          _push(`<div i-material-symbols:keyboard-command-key></div>`);
        } else if (key === "meta" && !unref(isMac)) {
          _push(`<div i-material-symbols:window-sharp></div>`);
        } else if (key === "alt" && unref(isMac)) {
          _push(`<div i-material-symbols:keyboard-option-key-rounded></div>`);
        } else if (key === "arrowup") {
          _push(`<div i-ri:arrow-up-line></div>`);
        } else if (key === "arrowdown") {
          _push(`<div i-ri:arrow-down-line></div>`);
        } else if (key === "arrowleft") {
          _push(`<div i-ri:arrow-left-line></div>`);
        } else if (key === "arrowright") {
          _push(`<div i-ri:arrow-right-line></div>`);
        } else if (key === "escape") {
          _push(`<!--[--> ESC <!--]-->`);
        } else {
          _push(`<div class="${ssrRenderClass({ "px-.5": key.length === 1 })}">${ssrInterpolate(key[0].toUpperCase() + key.slice(1))}</div>`);
        }
        _push(`</div><!--]-->`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/command/CommandKey.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "CommandItem",
  __ssrInlineRender: true,
  props: {
    cmd: {},
    index: {},
    active: { type: Boolean, default: false }
  },
  emits: ["activate"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommandKey = _sfc_main$a;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["flex px-3 py-2 my-1 items-center rounded-lg hover:bg-active transition-all duration-65 ease-in-out cursor-pointer scroll-m-10", { "bg-active": _ctx.active }],
        "data-index": _ctx.index
      }, _attrs))}>`);
      if (_ctx.cmd.icon) {
        _push(`<div me-2 class="${ssrRenderClass(_ctx.cmd.icon)}"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex-1 flex items-baseline gap-2"><div class="${ssrRenderClass({ "font-medium": _ctx.active })}">${ssrInterpolate(_ctx.cmd.name)}</div>`);
      if (_ctx.cmd.description) {
        _push(`<div class="text-xs text-secondary">${ssrInterpolate(_ctx.cmd.description)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (_ctx.cmd.onComplete) {
        _push(`<div class="${ssrRenderClass([_ctx.active ? "opacity-100" : "opacity-0", "flex items-center gap-1 transition-all duration-65 ease-in-out"])}"><div class="text-xs text-secondary">${ssrInterpolate(_ctx.$t("command.complete"))}</div>`);
        _push(ssrRenderComponent(_component_CommandKey, { name: "Tab" }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.cmd.onActivate) {
        _push(`<div class="${ssrRenderClass([_ctx.active ? "opacity-100" : "opacity-0", "flex items-center gap-1 transition-all duration-65 ease-in-out"])}"><div class="text-xs text-secondary">${ssrInterpolate(_ctx.$t("command.activate"))}</div>`);
        _push(ssrRenderComponent(_component_CommandKey, { name: "Enter" }, null, _parent));
        _push(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/command/CommandItem.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "CommandPanel",
  __ssrInlineRender: true,
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const registry = useCommandRegistry();
    const router = useRouter();
    ref();
    ref();
    const scopes = ref([]);
    const input = commandPanelInput;
    const commandMode = computed(() => input.value.startsWith(">"));
    const query = computed(() => commandMode.value ? "" : input.value.trim());
    const { accounts, hashtags, loading } = useSearch(query);
    function toSearchQueryResultItem(search) {
      return {
        index: 0,
        type: "search",
        search,
        onActivate: () => router.push(search.to)
      };
    }
    const searchResult = computed(() => {
      if (query.value.length === 0 || loading.value)
        return { length: 0, items: [], grouped: {} };
      const hashtagList = hashtags.value.slice(0, 3).map(toSearchQueryResultItem);
      const accountList = accounts.value.map(toSearchQueryResultItem);
      const grouped = /* @__PURE__ */ new Map();
      grouped.set("Hashtags", hashtagList);
      grouped.set("Users", accountList);
      let index = 0;
      for (const items of grouped.values()) {
        for (const item of items)
          item.index = index++;
      }
      return {
        grouped,
        items: [...hashtagList, ...accountList],
        length: hashtagList.length + accountList.length
      };
    });
    const result = computed(
      () => commandMode.value ? registry.query(scopes.value.map((s) => s.id).join("."), input.value.slice(1).trim()) : searchResult.value
    );
    const isMac = useIsMac();
    const modifierKeyName = computed(() => isMac.value ? "\u2318" : "Ctrl");
    const active = ref(0);
    watch(result, (n, o) => {
      if (n.length !== o.length || !n.items.every((i, idx) => i === o.items[idx]))
        active.value = 0;
    });
    function onCommandActivate(item) {
      if (item.onActivate) {
        item.onActivate();
        emit("close");
      } else if (item.onComplete) {
        scopes.value.push(item.onComplete());
        input.value = "> ";
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommandKey = _sfc_main$a;
      const _component_SearchResultSkeleton = __nuxt_component_1$2;
      const _component_SearchResult = _sfc_main$2$1;
      const _component_CommandItem = _sfc_main$9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col w-50vw max-w-180 h-50vh max-h-120" }, _attrs))}><label class="flex mx-3 my-1 items-center"><div mx-1 i-ri:search-line></div><!--[-->`);
      ssrRenderList(unref(scopes), (scope) => {
        _push(`<div class="flex items-center mx-1 gap-2"><div class="text-sm">${ssrInterpolate(scope.display)}</div><span class="text-secondary">/</span></div>`);
      });
      _push(`<!--]--><input${ssrRenderAttr("value", unref(input))} class="focus:outline-none flex-1 p-2 rounded bg-base" placeholder="Search">`);
      _push(ssrRenderComponent(_component_CommandKey, { name: "Escape" }, null, _parent));
      _push(`</label><div class="w-full border-b-1 border-base"></div><div class="flex-1 mx-1 overflow-y-auto">`);
      if (unref(loading)) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_SearchResultSkeleton, null, null, _parent));
        _push(ssrRenderComponent(_component_SearchResultSkeleton, null, null, _parent));
        _push(ssrRenderComponent(_component_SearchResultSkeleton, null, null, _parent));
        _push(`<!--]-->`);
      } else if (unref(result).length) {
        _push(`<!--[-->`);
        ssrRenderList(unref(result).grouped, ([scope, group]) => {
          _push(`<!--[--><div class="mt-2 px-2 py-1 text-sm text-secondary">${ssrInterpolate(scope)}</div><!--[-->`);
          ssrRenderList(group, (item) => {
            _push(`<!--[-->`);
            if (item.type === "search") {
              _push(ssrRenderComponent(_component_SearchResult, {
                active: unref(active) === item.index,
                result: item.search
              }, null, _parent));
            } else {
              _push(ssrRenderComponent(_component_CommandItem, {
                index: item.index,
                cmd: item.cmd,
                active: unref(active) === item.index,
                onActivate: ($event) => onCommandActivate(item)
              }, null, _parent));
            }
            _push(`<!--]-->`);
          });
          _push(`<!--]--><!--]-->`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<div p5 text-center text-secondary italic>${ssrInterpolate(unref(input).trim().length ? _ctx.$t("common.not_found") : _ctx.$t("search.search_desc"))}</div>`);
      }
      _push(`</div><div class="w-full border-b-1 border-base"></div><div class="flex items-center px-3 py-1 text-xs"><div i-ri:lightbulb-flash-line></div> Tip: Use `);
      _push(ssrRenderComponent(_component_CommandKey, {
        name: `${unref(modifierKeyName)}+K`
      }, null, _parent));
      _push(` to search, `);
      _push(ssrRenderComponent(_component_CommandKey, {
        name: `${unref(modifierKeyName)}+/`
      }, null, _parent));
      _push(` to activate command mode. </div></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/command/CommandPanel.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "DurationPicker",
  __ssrInlineRender: true,
  props: {
    "modelValue": {},
    "modelModifiers": {},
    "isValid": { type: Boolean },
    "isValidModifiers": {}
  },
  emits: ["update:modelValue", "update:isValid"],
  setup(__props) {
    const model = useModel(__props, "modelValue");
    const isValid = useModel(__props, "isValid");
    const days = ref(0);
    const hours = ref(1);
    const minutes = ref(0);
    watchEffect(() => {
      if (days.value === "" || hours.value === "" || minutes.value === "") {
        isValid.value = false;
        return;
      }
      const duration = days.value * 24 * 60 * 60 + hours.value * 60 * 60 + minutes.value * 60;
      if (duration <= 0) {
        isValid.value = false;
        return;
      }
      isValid.value = true;
      model.value = duration;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        flex: "",
        "flex-grow-0": "",
        "gap-2": ""
      }, _attrs))}><label flex items-center gap-2><input${ssrRenderAttr("value", unref(days))} type="number" min="0" max="1999" input-base class="${ssrRenderClass(!isValid.value ? "input-error" : null)}"> ${ssrInterpolate(_ctx.$t("confirm.mute_account.days", unref(days) === "" ? 0 : unref(days)))}</label><label flex items-center gap-2><input${ssrRenderAttr("value", unref(hours))} type="number" min="0" max="24" input-base class="${ssrRenderClass(!isValid.value ? "input-error" : null)}"> ${ssrInterpolate(_ctx.$t("confirm.mute_account.hours", unref(hours) === "" ? 0 : unref(hours)))}</label><label flex items-center gap-2><input${ssrRenderAttr("value", unref(minutes))} type="number" min="0" max="59" step="5" input-base class="${ssrRenderClass(!isValid.value ? "input-error" : null)}"> ${ssrInterpolate(_ctx.$t("confirm.mute_account.minute", unref(minutes) === "" ? 0 : unref(minutes)))}</label></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/DurationPicker.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ModalConfirm",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {},
    confirm: {},
    cancel: {},
    extraOptionType: {}
  },
  emits: ["choice"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const hasDuration = ref(false);
    const isValidDuration = ref(true);
    const duration = ref(60 * 60);
    const shouldMuteNotifications = ref(true);
    const isMute = computed(() => props.extraOptionType === "mute");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonCheckbox = _sfc_main$v;
      _push(`<div${ssrRenderAttrs(mergeProps({
        flex: "~ col",
        "gap-6": ""
      }, _attrs))}><div font-bold text-lg>${ssrInterpolate(_ctx.title)}</div>`);
      if (_ctx.description) {
        _push(`<div>${ssrInterpolate(_ctx.description)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isMute)) {
        _push(`<div flex-col flex gap-4>`);
        _push(ssrRenderComponent(_component_CommonCheckbox, {
          modelValue: unref(hasDuration),
          "onUpdate:modelValue": ($event) => isRef(hasDuration) ? hasDuration.value = $event : null,
          label: _ctx.$t("confirm.mute_account.specify_duration"),
          "prepend-checkbox": "",
          "checked-icon-color": "text-primary"
        }, null, _parent));
        if (unref(hasDuration)) {
          _push(ssrRenderComponent(_sfc_main$7, {
            modelValue: unref(duration),
            "onUpdate:modelValue": ($event) => isRef(duration) ? duration.value = $event : null,
            "is-valid": unref(isValidDuration),
            "onUpdate:isValid": ($event) => isRef(isValidDuration) ? isValidDuration.value = $event : null
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_CommonCheckbox, {
          modelValue: unref(shouldMuteNotifications),
          "onUpdate:modelValue": ($event) => isRef(shouldMuteNotifications) ? shouldMuteNotifications.value = $event : null,
          label: _ctx.$t("confirm.mute_account.notifications"),
          "prepend-checkbox": "",
          "checked-icon-color": "text-primary"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div flex justify-end gap-2><button btn-text>${ssrInterpolate(_ctx.cancel || _ctx.$t("confirm.common.cancel"))}</button><button btn-solid${ssrIncludeBooleanAttr(!unref(isValidDuration)) ? " disabled" : ""}>${ssrInterpolate(_ctx.confirm || _ctx.$t("confirm.common.confirm"))}</button></div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/ModalConfirm.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ModalError",
  __ssrInlineRender: true,
  props: {
    title: {},
    messages: {},
    close: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        flex: "~ col",
        "gap-6": ""
      }, _attrs))}><div font-bold text-lg text-center>${ssrInterpolate(_ctx.title)}</div><div flex="~ col" gap-1 text-sm pt-1 ps-2 pe-1 pb-2 text-red-600 dark:text-red-400 border="~ base rounded red-600 dark:red-400"><ol ps-2 sm:ps-1><!--[-->`);
      ssrRenderList(_ctx.messages, (message, i) => {
        _push(`<li flex="~ col sm:row" gap-y-1 sm:gap-x-2>${ssrInterpolate(message)}</li>`);
      });
      _push(`<!--]--></ol></div><div flex justify-end gap-2><button btn-text>${ssrInterpolate(_ctx.close)}</button></div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/ModalError.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "StatusFavouritedBoostedBy",
  __ssrInlineRender: true,
  setup(__props) {
    const type = ref("favourited-by");
    const { client } = useMasto();
    function load() {
      return client.value.v1.statuses.$select(favouritedBoostedByStatusId.value)[type.value === "favourited-by" ? "favouritedBy" : "rebloggedBy"].list();
    }
    const paginator = computed(() => load());
    function showFavouritedBy() {
      type.value = "favourited-by";
    }
    function showRebloggedBy() {
      type.value = "boosted-by";
    }
    const { t } = useI18n();
    const tabs = [
      {
        name: "favourited-by",
        display: t("status.favourited_by"),
        onClick: showFavouritedBy
      },
      {
        name: "boosted-by",
        display: t("status.boosted_by"),
        onClick: showRebloggedBy
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AccountPaginator = _sfc_main$w;
      _push(`<!--[--><div flex w-full items-center lg:text-lg of-x-auto scrollbar-hide><!--[-->`);
      ssrRenderList(tabs, (option) => {
        _push(`<div relative flex flex-auto cursor-pointer sm:px6 px2 rounded transition-all tabindex="0" hover:bg-active transition-100><span ws-nowrap mxa sm:px2 sm:py3 xl:pb4 xl:pt5 py2 text-center border-b-3 class="${ssrRenderClass(option.name === unref(type) ? "border-primary op100 text-base" : "border-transparent text-secondary-light hover:text-secondary op50")}">${ssrInterpolate(option.display)}</span></div>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_AccountPaginator, {
        key: `paginator-${unref(type)}`,
        paginator: unref(paginator)
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/StatusFavouritedBoostedBy.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "MagickeysKeyboardShortcuts",
  __ssrInlineRender: true,
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const isMac = useIsMac();
    const modifierKeyName = computed(() => isMac.value ? "\u2318" : "Ctrl");
    const shortcutItemGroups = computed(() => [
      {
        name: t("magic_keys.groups.navigation.title"),
        items: [
          {
            description: t("magic_keys.groups.navigation.shortcut_help"),
            shortcut: { keys: ["?"], isSequence: false }
          },
          // {
          //   description: t('magic_keys.groups.navigation.next_status'),
          //   shortcut: { keys: ['j'], isSequence: false },
          // },
          // {
          //   description: t('magic_keys.groups.navigation.previous_status'),
          //   shortcut: { keys: ['k'], isSequence: false },
          // },
          {
            description: t("magic_keys.groups.navigation.go_to_search"),
            shortcut: { keys: ["/"], isSequence: false }
          },
          {
            description: t("magic_keys.groups.navigation.go_to_home"),
            shortcut: { keys: ["g", "h"], isSequence: true }
          },
          {
            description: t("magic_keys.groups.navigation.go_to_notifications"),
            shortcut: { keys: ["g", "n"], isSequence: true }
          },
          {
            description: t("magic_keys.groups.navigation.go_to_conversations"),
            shortcut: { keys: ["g", "c"], isSequence: true }
          },
          {
            description: t("magic_keys.groups.navigation.go_to_favourites"),
            shortcut: { keys: ["g", "f"], isSequence: true }
          },
          {
            description: t("magic_keys.groups.navigation.go_to_bookmarks"),
            shortcut: { keys: ["g", "b"], isSequence: true }
          },
          {
            description: t("magic_keys.groups.navigation.go_to_explore"),
            shortcut: { keys: ["g", "e"], isSequence: true }
          },
          {
            description: t("magic_keys.groups.navigation.go_to_local"),
            shortcut: { keys: ["g", "l"], isSequence: true }
          },
          {
            description: t("magic_keys.groups.navigation.go_to_federated"),
            shortcut: { keys: ["g", "t"], isSequence: true }
          },
          {
            description: t("magic_keys.groups.navigation.go_to_lists"),
            shortcut: { keys: ["g", "i"], isSequence: true }
          },
          {
            description: t("magic_keys.groups.navigation.go_to_settings"),
            shortcut: { keys: ["g", "s"], isSequence: true }
          },
          {
            description: t("magic_keys.groups.navigation.go_to_profile"),
            shortcut: { keys: ["g", "p"], isSequence: true }
          }
        ]
      },
      {
        name: t("magic_keys.groups.actions.title"),
        items: [
          {
            description: t("magic_keys.groups.actions.search"),
            shortcut: { keys: [modifierKeyName.value, "k"], isSequence: false }
          },
          {
            description: t("magic_keys.groups.actions.command_mode"),
            shortcut: { keys: [modifierKeyName.value, "/"], isSequence: false }
          },
          {
            description: t("magic_keys.groups.actions.compose"),
            shortcut: { keys: ["c"], isSequence: false }
          },
          {
            description: t("magic_keys.groups.actions.show_new_items"),
            shortcut: { keys: ["."], isSequence: false }
          },
          {
            description: t("magic_keys.groups.actions.favourite"),
            shortcut: { keys: ["f"], isSequence: false }
          },
          {
            description: t("magic_keys.groups.actions.boost"),
            shortcut: { keys: ["b"], isSequence: false }
          }
        ]
      },
      {
        name: t("magic_keys.groups.media.title"),
        items: []
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "px-3": "",
        "sm:px-5": "",
        "py-2": "",
        "sm:py-4": "",
        "max-w-220": "",
        relative: "",
        "max-h-screen": ""
      }, _attrs))}><button btn-action-icon absolute top-1 sm:top-2 right-1 sm:right-2 m1${ssrRenderAttr("aria-label", _ctx.$t("modals.aria_label_close"))}><div i-ri:close-fill></div></button><h2 text-xl font-700 mb3>${ssrInterpolate(_ctx.$t("magic_keys.dialog_header"))}</h2><div mb2 grid grid-cols-1 md:grid-cols-3 gap-y- md:gap-x-6 lg:gap-x-8><!--[-->`);
      ssrRenderList(unref(shortcutItemGroups), (group) => {
        _push(`<div><h3 font-700 my-2 text-lg>${ssrInterpolate(group.name)}</h3><!--[-->`);
        ssrRenderList(group.items, (item) => {
          _push(`<div flex my-1 lg:my-2 justify-between place-items-center max-w-full text-base><div mr-2 break-words overflow-hidden leading-4 h-full inline-block align-middle>${ssrInterpolate(item.description)}</div><div><!--[-->`);
          ssrRenderList(item.shortcut.keys, (key, idx) => {
            _push(`<!--[-->`);
            if (idx !== 0) {
              _push(`<span mx1 text-sm op80>${ssrInterpolate(item.shortcut.isSequence ? _ctx.$t("magic_keys.sequence_then") : "+")}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<code class="px2 md:px1.5 lg:px2 lg:px2 py0 lg:py-0.5" rounded bg-code border="px $c-border-code" shadow-sm my1 font-mono font-600>${ssrInterpolate(key)}</code><!--]-->`);
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]--></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/magickeys/MagickeysKeyboardShortcuts.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ReportModal",
  __ssrInlineRender: true,
  props: {
    account: {},
    status: {}
  },
  emits: ["close"],
  async setup(__props, { emit: __emit }) {
    let __temp, __restore;
    const { client } = useMasto();
    const step = ref("selectCategory");
    const serverRules = ref(([__temp, __restore] = withAsyncContext(() => client.value.v2.instance.fetch()), __temp = await __temp, __restore(), __temp).rules || []);
    const reportReason = ref("");
    const selectedRuleIds = ref([]);
    const availableStatuses = ref(__props.status ? [__props.status] : []);
    const selectedStatusIds = ref(__props.status ? [__props.status.id] : []);
    const additionalComments = ref("");
    const forwardReport = ref(false);
    ref();
    loadStatuses();
    async function loadStatuses() {
      if (__props.status) {
        const prevStatuses = await client.value.v1.accounts.$select(__props.account.id).statuses.list({
          maxId: __props.status.id,
          limit: 5
        });
        const nextStatuses = await client.value.v1.accounts.$select(__props.account.id).statuses.list({
          minId: __props.status.id,
          limit: 5
        });
        availableStatuses.value = availableStatuses.value.concat(prevStatuses);
        availableStatuses.value = availableStatuses.value.concat(nextStatuses);
      } else {
        const mostRecentStatuses = await client.value.v1.accounts.$select(__props.account.id).statuses.list({
          limit: 10
        });
        availableStatuses.value = mostRecentStatuses;
      }
      availableStatuses.value.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n_t = resolveComponent("i18n-t");
      const _component_StatusCard = _sfc_main$x;
      _push(`<div${ssrRenderAttrs(mergeProps({
        "my-8": "",
        "px-3": "",
        "sm:px-8": "",
        flex: "~ col gap-4",
        relative: ""
      }, _attrs))}><h2 mxa text-xl>`);
      _push(ssrRenderComponent(_component_i18n_t, {
        keypath: unref(reportReason) === "dontlike" ? "report.limiting" : "report.reporting"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<b text-primary${_scopeId}>@${ssrInterpolate(_ctx.account.acct)}</b>`);
          } else {
            return [
              createVNode("b", { "text-primary": "" }, "@" + toDisplayString(_ctx.account.acct), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h2><button btn-action-icon absolute top--8 right-0 m1 aria-label="Close"><div i-ri:close-line></div></button>`);
      if (unref(step) === "selectCategory") {
        _push(`<!--[--><h1 mxa text-4xl mb4>${ssrInterpolate(_ctx.status ? _ctx.$t("report.whats_wrong_post") : _ctx.$t("report.whats_wrong_account"))}</h1><p text-xl>${ssrInterpolate(_ctx.$t("report.select_one"))}</p><div><input id="dontlike"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(reportReason), "dontlike")) ? " checked" : ""} type="radio" value="dontlike"><label pl-2 for="dontlike" font-bold>${ssrInterpolate(_ctx.$t("report.dontlike"))}</label><p pl-6>${ssrInterpolate(_ctx.$t("report.dontlike_desc"))}</p></div><div><input id="spam"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(reportReason), "spam")) ? " checked" : ""} type="radio" value="spam"><label pl-2 for="spam" font-bold>${ssrInterpolate(_ctx.$t("report.spam"))}</label><p pl-6>${ssrInterpolate(_ctx.$t("report.spam_desc"))}</p></div>`);
        if (unref(serverRules).length > 0) {
          _push(`<div><input id="violation"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(reportReason), "violation")) ? " checked" : ""} type="radio" value="violation"><label pl-2 for="violation" font-bold>${ssrInterpolate(_ctx.$t("report.violation"))}</label>`);
          if (unref(reportReason) === "violation") {
            _push(`<p pl-6 pt-2 text-primary font-bold>${ssrInterpolate(_ctx.$t("report.select_many"))}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<ul pl-6><!--[-->`);
          ssrRenderList(unref(serverRules), (rule) => {
            _push(`<li pt-2><input${ssrRenderAttr("id", rule.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedRuleIds)) ? ssrLooseContain(unref(selectedRuleIds), rule.id) : unref(selectedRuleIds)) ? " checked" : ""} type="checkbox"${ssrRenderAttr("value", rule.id)}${ssrIncludeBooleanAttr(unref(reportReason) !== "violation") ? " disabled" : ""}><label pl-2${ssrRenderAttr("for", rule.id)}>${ssrInterpolate(rule.text)}</label></li>`);
          });
          _push(`<!--]--></ul></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div><input id="other"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(reportReason), "other")) ? " checked" : ""} type="radio" value="other"><label pl-2 for="other" font-bold>${ssrInterpolate(_ctx.$t("report.other"))}</label><p pl-6>${ssrInterpolate(_ctx.$t("report.other_desc"))}</p></div>`);
        if (unref(reportReason) && unref(reportReason) !== "dontlike") {
          _push(`<div><h3 mt-8 mb-4 font-bold>${ssrInterpolate(_ctx.$t("report.anything_else"))}</h3><textarea w-full h-20 p-3 border${ssrRenderAttr("placeholder", _ctx.$t("report.additional_comments"))}>${ssrInterpolate(unref(additionalComments))}</textarea>`);
          if (("getServerName" in _ctx ? _ctx.getServerName : unref(getServerName))(_ctx.account) && ("getServerName" in _ctx ? _ctx.getServerName : unref(getServerName))(_ctx.account) !== ("currentServer" in _ctx ? _ctx.currentServer : unref(currentServer))) {
            _push(`<div><h3 mt-8 mb-2 font-bold>${ssrInterpolate(_ctx.$t("report.another_server"))}</h3><p pb-1>${ssrInterpolate(_ctx.$t("report.forward_question"))}</p><input id="forward"${ssrIncludeBooleanAttr(Array.isArray(unref(forwardReport)) ? ssrLooseContain(unref(forwardReport), "rule.id") : unref(forwardReport)) ? " checked" : ""} type="checkbox" value="rule.id"><label pl-2 for="forward"><b>${ssrInterpolate(_ctx.$t("report.forward", [("getServerName" in _ctx ? _ctx.getServerName : unref(getServerName))(_ctx.account)]))}</b></label></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button btn-solid mxa mt-10${ssrIncludeBooleanAttr(!unref(reportReason) || unref(reportReason) === "violation" && unref(selectedRuleIds).length < 1) ? " disabled" : ""}>${ssrInterpolate(_ctx.$t("action.next"))}</button><!--]-->`);
      } else if (unref(step) === "selectStatuses") {
        _push(`<!--[--><h1 mxa text-4xl mb4>${ssrInterpolate(_ctx.status ? _ctx.$t("report.select_posts_other") : _ctx.$t("report.select_posts"))}</h1><p text-primary font-bold>${ssrInterpolate(_ctx.$t("report.select_many"))}</p><table><!--[-->`);
        ssrRenderList(unref(availableStatuses), (availableStatus) => {
          _push(`<tr><td><input${ssrRenderAttr("id", availableStatus.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStatusIds)) ? ssrLooseContain(unref(selectedStatusIds), availableStatus.id) : unref(selectedStatusIds)) ? " checked" : ""} type="checkbox"${ssrRenderAttr("value", availableStatus.id)}></td><td><label${ssrRenderAttr("for", availableStatus.id)}>`);
          _push(ssrRenderComponent(_component_StatusCard, {
            status: availableStatus,
            actions: false,
            "pointer-events-none": ""
          }, null, _parent));
          _push(`</label></td></tr>`);
        });
        _push(`<!--]--></table><button btn-solid mxa mt-5>${ssrInterpolate(_ctx.$t("report.submit"))}</button><!--]-->`);
      } else if (unref(step) === "furtherActions") {
        _push(`<!--[--><h1 mxa text-4xl mb4>${ssrInterpolate(unref(reportReason) === "dontlike" ? _ctx.$t("report.further_actions.limit.title") : _ctx.$t("report.further_actions.report.title"))}</h1><p text-xl>${ssrInterpolate(unref(reportReason) === "dontlike" ? _ctx.$t("report.further_actions.limit.description") : _ctx.$t("report.further_actions.report.description"))}</p>`);
        if (unref(useRelationship)(_ctx.account).value?.following) {
          _push(`<div><button btn-outline mxa mt-4 mb-2>`);
          _push(ssrRenderComponent(_component_i18n_t, { keypath: "menu.unfollow_account" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<b${_scopeId}>@${ssrInterpolate(_ctx.account.acct)}</b>`);
              } else {
                return [
                  createVNode("b", null, "@" + toDisplayString(_ctx.account.acct), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</button><br> ${ssrInterpolate(_ctx.$t("report.unfollow_desc"))}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (!unref(useRelationship)(_ctx.account).value?.muting) {
          _push(`<div><button btn-outline mxa mt-4 mb-2>`);
          _push(ssrRenderComponent(_component_i18n_t, { keypath: "menu.mute_account" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<b${_scopeId}>@${ssrInterpolate(_ctx.account.acct)}</b>`);
              } else {
                return [
                  createVNode("b", null, "@" + toDisplayString(_ctx.account.acct), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</button><br> ${ssrInterpolate(_ctx.$t("report.mute_desc"))}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (!unref(useRelationship)(_ctx.account).value?.blocking) {
          _push(`<div><button btn-outline mxa mt-4 mb-2>`);
          _push(ssrRenderComponent(_component_i18n_t, { keypath: "menu.block_account" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<b${_scopeId}>@${ssrInterpolate(_ctx.account.acct)}</b>`);
              } else {
                return [
                  createVNode("b", null, "@" + toDisplayString(_ctx.account.acct), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</button><br> ${ssrInterpolate(_ctx.$t("report.block_desc"))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button btn-solid mxa mt-10>${ssrInterpolate(_ctx.$t("action.done"))}</button><!--]-->`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/report/ReportModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ModalContainer",
  __ssrInlineRender: true,
  setup(__props) {
    const isMac = useIsMac();
    useEventListener("keydown", (e) => {
      if ((e.key === "k" || e.key === "\u043B") && (isMac.value ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        openCommandPanel(e.shiftKey);
      }
      if ((e.key === "/" || e.key === ",") && (isMac.value ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        openCommandPanel(true);
      }
    });
    function handlePublished(status) {
      lastPublishDialogStatus.value = status;
      isPublishDialogOpen.value = false;
    }
    function handlePublishClose() {
      lastPublishDialogStatus.value = null;
    }
    function handleConfirmChoice(choice) {
      confirmDialogChoice.value = choice;
      isConfirmDialogOpen.value = false;
    }
    function handleFavouritedBoostedByClose() {
      isFavouritedBoostedByDialogOpen.value = false;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModalDialog = __nuxt_component_0$2;
      const _component_UserSignIn = _sfc_main$f;
      const _component_HelpPreview = _sfc_main$e;
      const _component_PublishWidget = __nuxt_component_3;
      const _component_ModalMediaPreview = _sfc_main$c;
      const _component_StatusEditPreview = _sfc_main$b;
      const _component_CommandPanel = _sfc_main$8;
      const _component_ModalConfirm = _sfc_main$6;
      const _component_ModalError = _sfc_main$5;
      const _component_StatusFavouritedBoostedBy = _sfc_main$4;
      const _component_MagickeysKeyboardShortcuts = _sfc_main$3;
      const _component_ReportModal = _sfc_main$2;
      if ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_ModalDialog, {
          modelValue: unref(isSigninDialogOpen),
          "onUpdate:modelValue": ($event) => isRef(isSigninDialogOpen) ? isSigninDialogOpen.value = $event : null,
          "py-4": "",
          "px-8": "",
          "max-w-125": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UserSignIn, null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UserSignIn)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_ModalDialog, {
          modelValue: unref(isPreviewHelpOpen),
          "onUpdate:modelValue": ($event) => isRef(isPreviewHelpOpen) ? isPreviewHelpOpen.value = $event : null,
          "keep-alive": "",
          "max-w-125": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_HelpPreview, {
                onClose: ($event) => ("closePreviewHelp" in _ctx ? _ctx.closePreviewHelp : unref(closePreviewHelp))()
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_HelpPreview, {
                  onClose: ($event) => ("closePreviewHelp" in _ctx ? _ctx.closePreviewHelp : unref(closePreviewHelp))()
                }, null, 8, ["onClose"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_ModalDialog, {
          modelValue: unref(isPublishDialogOpen),
          "onUpdate:modelValue": ($event) => isRef(isPublishDialogOpen) ? isPublishDialogOpen.value = $event : null,
          "max-w-180": "",
          flex: "",
          onClose: handlePublishClose
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if ("dialogDraftKey" in _ctx ? _ctx.dialogDraftKey : unref(dialogDraftKey)) {
                _push2(ssrRenderComponent(_component_PublishWidget, {
                  "draft-key": "dialogDraftKey" in _ctx ? _ctx.dialogDraftKey : unref(dialogDraftKey),
                  expanded: "",
                  "flex-1": "",
                  "w-0": "",
                  onPublished: handlePublished
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                ("dialogDraftKey" in _ctx ? _ctx.dialogDraftKey : unref(dialogDraftKey)) ? (openBlock(), createBlock(_component_PublishWidget, {
                  key: 0,
                  "draft-key": "dialogDraftKey" in _ctx ? _ctx.dialogDraftKey : unref(dialogDraftKey),
                  expanded: "",
                  "flex-1": "",
                  "w-0": "",
                  onPublished: handlePublished
                }, null, 8, ["draft-key"])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_ModalDialog, {
          "model-value": unref(isMediaPreviewOpen),
          "w-full": "",
          "max-w-full": "",
          "h-full": "",
          "max-h-full": "",
          "bg-transparent": "",
          "border-0": "",
          "shadow-none": "",
          "onUpdate:modelValue": "closeMediaPreview" in _ctx ? _ctx.closeMediaPreview : unref(closeMediaPreview)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(isMediaPreviewOpen)) {
                _push2(ssrRenderComponent(_component_ModalMediaPreview, {
                  onClose: ($event) => ("closeMediaPreview" in _ctx ? _ctx.closeMediaPreview : unref(closeMediaPreview))()
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                unref(isMediaPreviewOpen) ? (openBlock(), createBlock(_component_ModalMediaPreview, {
                  key: 0,
                  onClose: ($event) => ("closeMediaPreview" in _ctx ? _ctx.closeMediaPreview : unref(closeMediaPreview))()
                }, null, 8, ["onClose"])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_ModalDialog, {
          modelValue: unref(isEditHistoryDialogOpen),
          "onUpdate:modelValue": ($event) => isRef(isEditHistoryDialogOpen) ? isEditHistoryDialogOpen.value = $event : null,
          "max-w-125": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if ("statusEdit" in _ctx ? _ctx.statusEdit : unref(statusEdit)) {
                _push2(ssrRenderComponent(_component_StatusEditPreview, { edit: "statusEdit" in _ctx ? _ctx.statusEdit : unref(statusEdit) }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                ("statusEdit" in _ctx ? _ctx.statusEdit : unref(statusEdit)) ? (openBlock(), createBlock(_component_StatusEditPreview, {
                  key: 0,
                  edit: "statusEdit" in _ctx ? _ctx.statusEdit : unref(statusEdit)
                }, null, 8, ["edit"])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_ModalDialog, {
          modelValue: unref(isCommandPanelOpen),
          "onUpdate:modelValue": ($event) => isRef(isCommandPanelOpen) ? isCommandPanelOpen.value = $event : null,
          "max-w-fit": "",
          flex: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_CommandPanel, {
                onClose: ($event) => ("closeCommandPanel" in _ctx ? _ctx.closeCommandPanel : unref(closeCommandPanel))()
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_CommandPanel, {
                  onClose: ($event) => ("closeCommandPanel" in _ctx ? _ctx.closeCommandPanel : unref(closeCommandPanel))()
                }, null, 8, ["onClose"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_ModalDialog, {
          modelValue: unref(isConfirmDialogOpen),
          "onUpdate:modelValue": ($event) => isRef(isConfirmDialogOpen) ? isConfirmDialogOpen.value = $event : null,
          "py-4": "",
          "px-8": "",
          "max-w-125": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if ("confirmDialogLabel" in _ctx ? _ctx.confirmDialogLabel : unref(confirmDialogLabel)) {
                _push2(ssrRenderComponent(_component_ModalConfirm, mergeProps("confirmDialogLabel" in _ctx ? _ctx.confirmDialogLabel : unref(confirmDialogLabel), { onChoice: handleConfirmChoice }), null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                ("confirmDialogLabel" in _ctx ? _ctx.confirmDialogLabel : unref(confirmDialogLabel)) ? (openBlock(), createBlock(_component_ModalConfirm, mergeProps({ key: 0 }, "confirmDialogLabel" in _ctx ? _ctx.confirmDialogLabel : unref(confirmDialogLabel), { onChoice: handleConfirmChoice }), null, 16)) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_ModalDialog, {
          modelValue: unref(isErrorDialogOpen),
          "onUpdate:modelValue": ($event) => isRef(isErrorDialogOpen) ? isErrorDialogOpen.value = $event : null,
          "py-4": "",
          "px-8": "",
          "max-w-125": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if ("errorDialogData" in _ctx ? _ctx.errorDialogData : unref(errorDialogData)) {
                _push2(ssrRenderComponent(_component_ModalError, "errorDialogData" in _ctx ? _ctx.errorDialogData : unref(errorDialogData), null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                ("errorDialogData" in _ctx ? _ctx.errorDialogData : unref(errorDialogData)) ? (openBlock(), createBlock(_component_ModalError, mergeProps({ key: 0 }, "errorDialogData" in _ctx ? _ctx.errorDialogData : unref(errorDialogData)), null, 16)) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_ModalDialog, {
          modelValue: unref(isFavouritedBoostedByDialogOpen),
          "onUpdate:modelValue": ($event) => isRef(isFavouritedBoostedByDialogOpen) ? isFavouritedBoostedByDialogOpen.value = $event : null,
          "max-w-180": "",
          onClose: handleFavouritedBoostedByClose
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_StatusFavouritedBoostedBy, null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_StatusFavouritedBoostedBy)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_ModalDialog, {
          modelValue: unref(isKeyboardShortcutsDialogOpen),
          "onUpdate:modelValue": ($event) => isRef(isKeyboardShortcutsDialogOpen) ? isKeyboardShortcutsDialogOpen.value = $event : null,
          "max-w-full": "",
          "sm:max-w-140": "",
          "md:max-w-170": "",
          "lg:max-w-220": "",
          "md:min-w-160": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_MagickeysKeyboardShortcuts, {
                onClose: ($event) => ("closeKeyboardShortcuts" in _ctx ? _ctx.closeKeyboardShortcuts : unref(closeKeyboardShortcuts))()
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_MagickeysKeyboardShortcuts, {
                  onClose: ($event) => ("closeKeyboardShortcuts" in _ctx ? _ctx.closeKeyboardShortcuts : unref(closeKeyboardShortcuts))()
                }, null, 8, ["onClose"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_ModalDialog, {
          modelValue: unref(isReportDialogOpen),
          "onUpdate:modelValue": ($event) => isRef(isReportDialogOpen) ? isReportDialogOpen.value = $event : null,
          "keep-alive": "",
          "max-w-175": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if ("reportAccount" in _ctx ? _ctx.reportAccount : unref(reportAccount)) {
                _push2(ssrRenderComponent(_component_ReportModal, {
                  account: "reportAccount" in _ctx ? _ctx.reportAccount : unref(reportAccount),
                  status: "reportStatus" in _ctx ? _ctx.reportStatus : unref(reportStatus),
                  onClose: ($event) => ("closeReportDialog" in _ctx ? _ctx.closeReportDialog : unref(closeReportDialog))()
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                ("reportAccount" in _ctx ? _ctx.reportAccount : unref(reportAccount)) ? (openBlock(), createBlock(_component_ReportModal, {
                  key: 0,
                  account: "reportAccount" in _ctx ? _ctx.reportAccount : unref(reportAccount),
                  status: "reportStatus" in _ctx ? _ctx.reportStatus : unref(reportStatus),
                  onClose: ($event) => ("closeReportDialog" in _ctx ? _ctx.closeReportDialog : unref(closeReportDialog))()
                }, null, 8, ["account", "status", "onClose"])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/ModalContainer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
function toValue(r) {
  return typeof r === "function" ? r() : unref(r);
}
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
function logicAnd(...args) {
  return computed(() => args.every((i) => toValue(i)));
}
const __nuxt_component_12_lazy = defineAsyncComponent(() => import('./CommonPreviewPrompt-hoPBSHAe.mjs').then((c) => c.default || c));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const info = useBuildInfo();
    const wideLayout = computed(() => route.meta.wideLayout ?? false);
    const showUserPicker = logicAnd(
      usePreferences("experimentalUserPicker"),
      () => useUsers().value.length > 1
    );
    const isGrayscale = usePreferences("grayscaleMode");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NavTitle = _sfc_main$q;
      const _component_NavSide = __nuxt_component_1;
      const _component_UserSignInEntry = _sfc_main$n;
      const _component_UserPicker = _sfc_main$k;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AccountInfo = _sfc_main$7$1;
      const _component_UserDropdown = _sfc_main$l;
      const _component_CommonOfflineChecker = _sfc_main$j;
      const _component_NavBottom = _sfc_main$h;
      const _component_SearchWidget = _sfc_main$s;
      const _component_PwaPrompt = __nuxt_component_11;
      const _component_PwaInstallPrompt = __nuxt_component_11;
      const _component_LazyCommonPreviewPrompt = __nuxt_component_12_lazy;
      const _component_NavFooter = _sfc_main$g;
      const _component_ModalContainer = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        "h-full": "",
        "data-mode": ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) && unref(isGrayscale) ? "grayscale" : "",
        "data-tauri-drag-region": ""
      }, _attrs))}><main flex w-full mxa lg:max-w-80rem class="native:grid native:sm:grid-cols-[auto_1fr] native:lg:grid-cols-[auto_minmax(600px,2fr)_1fr]"><aside class="native:w-auto w-1/8 md:w-1/6 lg:w-1/5 xl:w-1/4 zen-hide" hidden sm:flex justify-end xl:me-4 native:me-0 relative><div sticky top-0 w-20 xl:w-100 h-100dvh flex="~ col" lt-xl-items-center>`);
      ssrRenderSlot(_ctx.$slots, "left", {}, () => {
        _push(`<div flex="~ col" overflow-y-auto justify-between h-full max-w-full overflow-x-hidden>`);
        _push(ssrRenderComponent(_component_NavTitle, null, null, _parent));
        _push(ssrRenderComponent(_component_NavSide, { command: "" }, null, _parent));
        _push(`<div flex-auto></div>`);
        if ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) {
          _push(`<div flex flex-col sticky bottom-0 bg-base><div hidden xl:block>`);
          if (!("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser))) {
            _push(ssrRenderComponent(_component_UserSignInEntry, null, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)) {
            _push(`<div p6 pb8 w-full><div hidden xl-block>`);
            if (unref(showUserPicker)) {
              _push(ssrRenderComponent(_component_UserPicker, null, null, _parent));
            } else {
              _push(`<div flex="~" items-center justify-between>`);
              _push(ssrRenderComponent(_component_NuxtLink, {
                hidden: "",
                "xl:block": "",
                "rounded-3": "",
                "text-primary": "",
                "text-start": "",
                "w-full": "",
                "hover:bg-active": "",
                "cursor-pointer": "",
                "transition-100": "",
                to: ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)).account)
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(ssrRenderComponent(_component_AccountInfo, {
                      account: ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)).account,
                      "md:break-words": "",
                      square: ""
                    }, null, _parent2, _scopeId));
                  } else {
                    return [
                      createVNode(_component_AccountInfo, {
                        account: ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)).account,
                        "md:break-words": "",
                        square: ""
                      }, null, 8, ["account"])
                    ];
                  }
                }),
                _: 1
              }, _parent));
              _push(ssrRenderComponent(_component_UserDropdown, null, null, _parent));
              _push(`</div>`);
            }
            _push(`</div>`);
            _push(ssrRenderComponent(_component_UserDropdown, { "xl:hidden": "" }, null, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }, _push, _parent);
      _push(`</div></aside><div w-full min-h-screen class="${ssrRenderClass(("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) && unref(wideLayout) ? "xl:w-full sm:w-600px" : "sm:w-600px md:shrink-0")}" border-base><div min-h="[calc(100vh-3.5rem)]" sm:min-h-screen>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div><div sticky left-0 right-0 bottom-0 z-10 bg-base pb="[env(safe-area-inset-bottom)]" transition="padding 20">`);
      if ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) {
        _push(ssrRenderComponent(_component_CommonOfflineChecker, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if ("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) {
        _push(ssrRenderComponent(_component_NavBottom, { "sm:hidden": "" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) && !unref(wideLayout)) {
        _push(`<aside class="hidden lg:w-1/5 xl:w-1/4 sm:none xl:block native:w-full zen-hide"><div sticky top-0 h-100dvh flex="~ col" gap-2 py3 ms-2>`);
        ssrRenderSlot(_ctx.$slots, "right", {}, () => {
          _push(ssrRenderComponent(_component_SearchWidget, {
            "mt-4": "",
            "mx-1": "",
            hidden: "",
            "xl:block": ""
          }, null, _parent));
          _push(`<div flex-auto></div>`);
          _push(ssrRenderComponent(_component_PwaPrompt, null, null, _parent));
          _push(ssrRenderComponent(_component_PwaInstallPrompt, null, null, _parent));
          if (unref(info).env === "preview") {
            _push(ssrRenderComponent(_component_LazyCommonPreviewPrompt, null, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(ssrRenderComponent(_component_NavFooter, null, null, _parent));
        }, _push, _parent);
        _push(`</div></aside>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main>`);
      _push(ssrRenderComponent(_component_ModalContainer, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
