import { l as __nuxt_component_0$1 } from './server.mjs';
import { b as _sfc_main$1 } from './StatusPreviewCard-C7wSe9bY.mjs';
import { defineComponent, computed, unref, mergeProps, withCtx, openBlock, createBlock, Fragment, createVNode, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import reservedNames from 'github-reserved-names';
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
import 'unlazy';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "StatusPreviewGitHub",
  __ssrInlineRender: true,
  props: {
    card: {}
  },
  setup(__props) {
    const props = __props;
    const supportedReservedRoutes = ["sponsors"];
    const meta = computed(() => {
      const { url } = props.card;
      const path = url.split("https://github.com/")[1];
      const [firstName, secondName] = path?.split("/") || [];
      if (!firstName || reservedNames.check(firstName) && !supportedReservedRoutes.includes(firstName))
        return void 0;
      const firstIsUser = firstName && !supportedReservedRoutes.includes(firstName);
      const user = firstIsUser ? firstName : secondName;
      const repo = firstIsUser ? secondName : void 0;
      let type = repo ? "repo" : "user";
      let number;
      let details = (props.card.title ?? "").replace("GitHub - ", "").split(" \xB7 ")[0];
      if (repo) {
        const repoPath = `${user}/${repo}`;
        details = details.replace(`${repoPath}: `, "");
        const inRepoPath = path.split(`${repoPath}/`)?.[1];
        if (inRepoPath) {
          number = inRepoPath.match(/issues\/(\d+)/)?.[1];
          if (number) {
            type = "issue";
          } else {
            number = inRepoPath.match(/pull\/(\d+)/)?.[1];
            if (number)
              type = "pull";
          }
        }
      }
      const avatar = `https://github.com/${user}.png?size=256`;
      const author = props.card.authorName;
      return {
        type,
        user,
        titleUrl: `https://github.com/${user}${repo ? `/${repo}` : ""}`,
        details,
        repo,
        number,
        avatar,
        author: author ? {
          avatar: `https://github.com/${author}.png?size=64`,
          user: author
        } : void 0
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_StatusPreviewCardNormal = _sfc_main$1;
      if (_ctx.card.image && unref(meta)) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          flex: "",
          "flex-col": "",
          "display-block": "",
          "of-hidden": "",
          "bg-card": "",
          relative: "",
          "w-full": "",
          "min-h-50": "",
          "md:min-h-60": "",
          "justify-center": "",
          "rounded-lg": ""
        }, _attrs))}><div p4 sm:px-8 flex flex-col justify-between min-h-50 md:min-h-60 h-full><div flex justify-between items-center gap-2 sm:gap-6 h-full mb-2 min-h-35 md:min-h-45><div flex flex-col gap-2>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          flex: "",
          "gap-1": "",
          "text-xl": "",
          "sm:text-3xl": "",
          "flex-wrap": "",
          "leading-none": "",
          href: unref(meta).titleUrl,
          target: "_blank",
          external: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(meta).repo) {
                _push2(`<!--[--><span${_scopeId}>${ssrInterpolate(unref(meta).user)}</span><span text-secondary-light${_scopeId}>/</span><span text-primary font-bold${_scopeId}>${ssrInterpolate(unref(meta).repo)}</span><!--]-->`);
              } else {
                _push2(`<span${_scopeId}>${ssrInterpolate(unref(meta).user)}</span>`);
              }
            } else {
              return [
                unref(meta).repo ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  createVNode("span", null, toDisplayString(unref(meta).user), 1),
                  createVNode("span", { "text-secondary-light": "" }, "/"),
                  createVNode("span", {
                    "text-primary": "",
                    "font-bold": ""
                  }, toDisplayString(unref(meta).repo), 1)
                ], 64)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(unref(meta).user), 1))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          "sm:text-lg": "",
          href: _ctx.card.url,
          target: "_blank",
          external: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(meta).type === "issue") {
                _push2(`<span text-secondary-light me-2${_scopeId}> #${ssrInterpolate(unref(meta).number)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(meta).type === "pull") {
                _push2(`<span text-secondary-light me-2${_scopeId}> PR #${ssrInterpolate(unref(meta).number)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<span text-secondary leading-tight${_scopeId}>${ssrInterpolate(unref(meta).details)}</span>`);
            } else {
              return [
                unref(meta).type === "issue" ? (openBlock(), createBlock("span", {
                  key: 0,
                  "text-secondary-light": "",
                  "me-2": ""
                }, " #" + toDisplayString(unref(meta).number), 1)) : createCommentVNode("", true),
                unref(meta).type === "pull" ? (openBlock(), createBlock("span", {
                  key: 1,
                  "text-secondary-light": "",
                  "me-2": ""
                }, " PR #" + toDisplayString(unref(meta).number), 1)) : createCommentVNode("", true),
                createVNode("span", {
                  "text-secondary": "",
                  "leading-tight": ""
                }, toDisplayString(unref(meta).details), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div shrink-0 w-18 sm:w-30>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          href: unref(meta).titleUrl,
          target: "_blank",
          external: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img w-full aspect-square width="112" height="112" rounded-2${ssrRenderAttr("src", unref(meta).avatar)}${_scopeId}>`);
            } else {
              return [
                createVNode("img", {
                  "w-full": "",
                  "aspect-square": "",
                  width: "112",
                  height: "112",
                  "rounded-2": "",
                  src: unref(meta).avatar
                }, null, 8, ["src"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div flex justify-between>`);
        if (unref(meta).author) {
          _push(`<div flex class="gap-2.5" items-center><div><img w-8 aspect-square width="25" height="25" rounded-full${ssrRenderAttr("src", unref(meta).author?.avatar)}></div><span text-lg text-primary>@${ssrInterpolate(unref(meta).author?.user)}</span></div>`);
        } else {
          _push(`<div></div>`);
        }
        _push(`<div text-3xl i-ri:github-fill text-secondary></div></div></div></div>`);
      } else {
        _push(ssrRenderComponent(_component_StatusPreviewCardNormal, mergeProps({ card: _ctx.card }, _attrs), null, _parent));
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/status/StatusPreviewGitHub.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
