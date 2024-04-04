import { aV as isGlitchEdition, e as useI18n, h as useHydratedHead, a as useMasto, c as currentUser, a3 as cacheAccount, aS as useDropZone, bf as onHydrated, o as onReactivated, bn as refreshAccountInfo, _ as _sfc_main$2$1, R as _sfc_main$c, T as _sfc_main$a, U as _sfc_main$9, V as _sfc_main$8, M as _sfc_main$o } from './server.mjs';
import { useSSRContext, computed, defineComponent, ref, mergeProps, withCtx, createVNode, toDisplayString, unref, withDirectives, vModelCheckbox, isRef, openBlock, createBlock, Fragment, renderList, withModifiers, createCommentVNode, vModelText, createTextVNode, mergeModels, useModel, watch, reactive } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderAttr, ssrRenderList, ssrRenderAttrs, ssrRenderClass } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './ModalDialog-BaHoBdlt.mjs';
import { Cropper } from 'vue-advanced-cropper';
import { _ as _sfc_main$5 } from './Dropdown-YHaGe2K7.mjs';
import { decode } from 'tiny-decode';
import { parse, TEXT_NODE } from 'ultrahtml';
import { g as getAccountFieldIcon, a as accountFieldIcons } from './icons-m16uagef.mjs';
import { _ as _sfc_main$4 } from './CommonErrorMessage-CvbJeSnR.mjs';
import { useForm } from 'slimeform';
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
import '@iconify/utils';
import '@iconify-emoji/twemoji';
import '@iconify/utils/lib/emoji/replace/find';
import 'floating-vue';
import '@vueuse/integrations/useFocusTrap';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CommonInputImage",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    original: {},
    allowedFileTypes: { default: () => ["image/jpeg", "image/png"] },
    allowedFileSize: { default: 1024 * 1024 * 5 },
    imgClass: {},
    loading: { type: Boolean }
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["pick", "error"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const file = useModel(__props, "modelValue");
    useI18n();
    const defaultImage = computed(() => props.original || "");
    const previewImage = ref("");
    const imageSrc = computed(() => previewImage.value || defaultImage.value);
    watch(file, (image, _, onCleanup) => {
      let expired = false;
      onCleanup(() => expired = true);
      if (!image) {
        previewImage.value = "";
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (evt) => {
        if (expired)
          return;
        previewImage.value = evt.target?.result;
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<label${ssrRenderAttrs(mergeProps({
        class: "bg-slate-500/10 focus-within:outline focus-within:outline-primary",
        relative: "",
        flex: "",
        "justify-center": "",
        "items-center": "",
        "cursor-pointer": "",
        "of-hidden": ""
      }, _attrs))}>`);
      if (unref(imageSrc)) {
        _push(`<img${ssrRenderAttr("src", unref(imageSrc))} class="${ssrRenderClass(_ctx.imgClass || "")}" object-cover w-full h-full>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span absolute bg="black/50" text-white rounded-full text-xl w12 h12 flex justify-center items-center hover="bg-black/40 text-primary"><span block i-ri:upload-line></span></span>`);
      if (_ctx.loading) {
        _push(`<span absolute inset-0 bg="black/30" text-white flex justify-center items-center><span class="animate-spin animate-duration-[2.5s] preserve-3d"><span block i-ri:loader-4-line text-4xl></span></span></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</label>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/CommonInputImage.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CommonCropImage",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    stencilAspectRatio: { default: 1 / 1 },
    stencilSizePercentage: { default: 0.9 }
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const props = __props;
    const file = useModel(__props, "modelValue");
    const cropperDialog = ref(false);
    const cropper = ref();
    const cropperFlag = ref(false);
    const cropperImage = reactive({
      src: "",
      type: "image/jpg"
    });
    function stencilSize({ boundaries }) {
      return {
        width: boundaries.width * props.stencilSizePercentage,
        height: boundaries.height * props.stencilSizePercentage
      };
    }
    watch(file, (file2, _, onCleanup) => {
      let expired = false;
      onCleanup(() => expired = true);
      if (file2 && !cropperFlag.value) {
        cropperDialog.value = true;
        const reader = new FileReader();
        reader.readAsDataURL(file2);
        reader.onload = (e) => {
          if (expired)
            return;
          cropperImage.src = e.target?.result;
          cropperImage.type = file2.type;
        };
      }
      cropperFlag.value = false;
    });
    function cropImage() {
      if (cropper.value && file.value) {
        cropperFlag.value = true;
        cropperDialog.value = false;
        const { canvas } = cropper.value.getResult();
        canvas?.toBlob((blob) => {
          file.value = new File([blob], `cropped${file.value?.name}`, { type: blob?.type });
        }, cropperImage.type);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModalDialog = __nuxt_component_0;
      _push(ssrRenderComponent(_component_ModalDialog, mergeProps({
        modelValue: unref(cropperDialog),
        "onUpdate:modelValue": ($event) => isRef(cropperDialog) ? cropperDialog.value = $event : null,
        "use-v-if": false,
        "max-w-500px": "",
        flex: ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div flex-1 w-0${_scopeId}><div text-lg text-center my2 px3${_scopeId}><h1${_scopeId}>${ssrInterpolate(_ctx.$t("action.edit"))}</h1></div><div aspect-ratio-1${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Cropper), {
              ref_key: "cropper",
              ref: cropper,
              class: "overflow-hidden w-full h-full",
              src: unref(cropperImage).src,
              "resize-image": {
                adjustStencil: false
              },
              "stencil-size": stencilSize,
              "stencil-props": {
                aspectRatio: props.stencilAspectRatio,
                movable: false,
                resizable: false,
                handlers: {}
              },
              "image-restriction": "stencil"
            }, null, _parent2, _scopeId));
            _push2(`</div><div m-4${_scopeId}><button btn-solid w-full rounded text-sm${_scopeId}>${ssrInterpolate(_ctx.$t("action.confirm"))}</button></div></div>`);
          } else {
            return [
              createVNode("div", {
                "flex-1": "",
                "w-0": ""
              }, [
                createVNode("div", {
                  "text-lg": "",
                  "text-center": "",
                  my2: "",
                  px3: ""
                }, [
                  createVNode("h1", null, toDisplayString(_ctx.$t("action.edit")), 1)
                ]),
                createVNode("div", { "aspect-ratio-1": "" }, [
                  createVNode(unref(Cropper), {
                    ref_key: "cropper",
                    ref: cropper,
                    class: "overflow-hidden w-full h-full",
                    src: unref(cropperImage).src,
                    "resize-image": {
                      adjustStencil: false
                    },
                    "stencil-size": stencilSize,
                    "stencil-props": {
                      aspectRatio: props.stencilAspectRatio,
                      movable: false,
                      resizable: false,
                      handlers: {}
                    },
                    "image-restriction": "stencil"
                  }, null, 8, ["src", "stencil-props"])
                ]),
                createVNode("div", { "m-4": "" }, [
                  createVNode("button", {
                    "btn-solid": "",
                    "w-full": "",
                    rounded: "",
                    "text-sm": "",
                    onClick: ($event) => cropImage()
                  }, toDisplayString(_ctx.$t("action.confirm")), 9, ["onClick"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/CommonCropImage.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const maxAccountFieldCount = computed(() => isGlitchEdition.value ? 16 : 4);
function convertMetadata(metadata) {
  try {
    const tree = parse(metadata);
    return tree.children.map((n) => convertToText(n)).join("").trim();
  } catch (err) {
    console.error(err);
    return "";
  }
}
function convertToText(input) {
  let text = "";
  if (input.type === TEXT_NODE)
    return decode(input.value);
  if ("children" in input)
    text = input.children.map((n) => convertToText(n)).join("");
  return text;
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SettingsProfileMetadata",
  __ssrInlineRender: true,
  props: {
    "modelValue": { required: true },
    "modelModifiers": {}
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const form = useModel(__props, "modelValue");
    const dropdown = ref();
    const fieldIcons = computed(
      () => Array.from({ length: maxAccountFieldCount.value }, (_, i) => getAccountFieldIcon(form.value.fieldsAttributes[i].name))
    );
    const fieldCount = computed(() => {
      const idx = [...form.value.fieldsAttributes].reverse().findIndex((f) => f.name || f.value);
      if (idx === -1)
        return 1;
      return Math.min(
        form.value.fieldsAttributes.length - idx + 1,
        maxAccountFieldCount.value
      );
    });
    function chooseIcon(i, text) {
      form.value.fieldsAttributes[i].name = text;
      dropdown.value[i]?.hide();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonDropdown = _sfc_main$5;
      const _component_CommonTooltip = _sfc_main$o;
      _push(`<div${ssrRenderAttrs(mergeProps({ "space-y-2": "" }, _attrs))}><div font-medium>${ssrInterpolate(_ctx.$t("settings.profile.appearance.profile_metadata"))}</div><div text-sm text-secondary>${ssrInterpolate(_ctx.$t("settings.profile.appearance.profile_metadata_desc", ["maxAccountFieldCount" in _ctx ? _ctx.maxAccountFieldCount : unref(maxAccountFieldCount)]))}</div><div flex="~ col gap4"><!--[-->`);
      ssrRenderList(unref(fieldCount), (i) => {
        _push(`<div flex="~ gap3" items-center>`);
        _push(ssrRenderComponent(_component_CommonDropdown, {
          ref_for: true,
          ref_key: "dropdown",
          ref: dropdown,
          placement: "left"
        }, {
          popper: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div flex="~ wrap gap-1" max-w-60 m2 me1${_scopeId}><!--[-->`);
              ssrRenderList("accountFieldIcons" in _ctx ? _ctx.accountFieldIcons : unref(accountFieldIcons), (icon, text) => {
                _push2(ssrRenderComponent(_component_CommonTooltip, {
                  key: icon,
                  content: text
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      if (text !== "Joined") {
                        _push3(`<button type="button" btn-action-icon${_scopeId2}><div text-xl class="${ssrRenderClass(icon)}"${_scopeId2}></div></button>`);
                      } else {
                        _push3(`<!---->`);
                      }
                    } else {
                      return [
                        text !== "Joined" ? (openBlock(), createBlock("button", {
                          key: 0,
                          type: "button",
                          "btn-action-icon": "",
                          onClick: ($event) => chooseIcon(i - 1, text)
                        }, [
                          createVNode("div", {
                            "text-xl": "",
                            class: icon
                          }, null, 2)
                        ], 8, ["onClick"])) : createCommentVNode("", true)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              return [
                createVNode("div", {
                  flex: "~ wrap gap-1",
                  "max-w-60": "",
                  m2: "",
                  me1: ""
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList("accountFieldIcons" in _ctx ? _ctx.accountFieldIcons : unref(accountFieldIcons), (icon, text) => {
                    return openBlock(), createBlock(_component_CommonTooltip, {
                      key: icon,
                      content: text
                    }, {
                      default: withCtx(() => [
                        text !== "Joined" ? (openBlock(), createBlock("button", {
                          key: 0,
                          type: "button",
                          "btn-action-icon": "",
                          onClick: ($event) => chooseIcon(i - 1, text)
                        }, [
                          createVNode("div", {
                            "text-xl": "",
                            class: icon
                          }, null, 2)
                        ], 8, ["onClick"])) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1032, ["content"]);
                  }), 128))
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_CommonTooltip, {
                content: _ctx.$t("tooltip.pick_an_icon")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<button type="button" btn-action-icon${_scopeId2}><div class="${ssrRenderClass(unref(fieldIcons)[i - 1] || "i-ri:question-mark")}"${_scopeId2}></div></button>`);
                  } else {
                    return [
                      createVNode("button", {
                        type: "button",
                        "btn-action-icon": ""
                      }, [
                        createVNode("div", {
                          class: unref(fieldIcons)[i - 1] || "i-ri:question-mark"
                        }, null, 2)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_CommonTooltip, {
                  content: _ctx.$t("tooltip.pick_an_icon")
                }, {
                  default: withCtx(() => [
                    createVNode("button", {
                      type: "button",
                      "btn-action-icon": ""
                    }, [
                      createVNode("div", {
                        class: unref(fieldIcons)[i - 1] || "i-ri:question-mark"
                      }, null, 2)
                    ])
                  ]),
                  _: 2
                }, 1032, ["content"])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<input${ssrRenderAttr("value", form.value.fieldsAttributes[i - 1].name)} type="text" placeholder-text-secondary${ssrRenderAttr("placeholder", _ctx.$t("settings.profile.appearance.profile_metadata_label"))} input-base><input${ssrRenderAttr("value", form.value.fieldsAttributes[i - 1].value)} type="text" placeholder-text-secondary${ssrRenderAttr("placeholder", _ctx.$t("settings.profile.appearance.profile_metadata_value"))} input-base></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/SettingsProfileMetadata.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "appearance",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useHydratedHead({
      title: () => `${t("settings.profile.appearance.title")} | ${t("nav.settings")}`
    });
    const { client } = useMasto();
    const avatarInput = ref();
    const headerInput = ref();
    const account = computed(() => currentUser.value?.account);
    const onlineSrc = computed(() => ({
      avatar: account.value?.avatar || "",
      header: account.value?.header || ""
    }));
    const { form, reset, submitter, isDirty, isError } = useForm({
      form: () => {
        const fieldsAttributes = Array.from({ length: maxAccountFieldCount.value }, (_, i) => {
          const field = { ...account.value?.fields?.[i] || { name: "", value: "" } };
          field.value = convertMetadata(field.value);
          return field;
        });
        return {
          displayName: account.value?.displayName ?? "",
          note: account.value?.source.note.replaceAll("\r", "") ?? "",
          avatar: null,
          header: null,
          fieldsAttributes,
          bot: account.value?.bot ?? false,
          locked: account.value?.locked ?? false
          // These look more like account and privacy settings than appearance settings
          // discoverable: false,
          // locked: false,
        };
      }
    });
    const isCanSubmit = computed(() => !isError.value && isDirty.value);
    const failedMessages = ref([]);
    const { submit, submitting } = submitter(async ({ dirtyFields }) => {
      if (!isCanSubmit.value)
        return;
      const res = await client.value.v1.accounts.updateCredentials(dirtyFields.value).then((account2) => ({ account: account2 })).catch((error) => ({ error }));
      if ("error" in res) {
        console.error(res.error);
        failedMessages.value.push(res.error.message);
        return;
      }
      const server = currentUser.value.server;
      if (!res.account.acct.includes("@"))
        res.account.acct = `${res.account.acct}@${server}`;
      cacheAccount(res.account, server, true);
      currentUser.value.account = res.account;
      reset();
    });
    async function refreshInfo() {
      if (!currentUser.value)
        return;
      await refreshAccountInfo();
      if (!isDirty)
        reset();
    }
    useDropZone(avatarInput, (files) => {
      if (files?.[0])
        form.avatar = files[0];
    });
    useDropZone(headerInput, (files) => {
      if (files?.[0])
        form.header = files[0];
    });
    onHydrated(refreshInfo);
    onReactivated();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MainContent = _sfc_main$2$1;
      const _component_CommonInputImage = _sfc_main$3;
      const _component_CommonCropImage = _sfc_main$2;
      const _component_AccountDisplayName = _sfc_main$c;
      const _component_AccountLockIndicator = _sfc_main$a;
      const _component_AccountBotIndicator = _sfc_main$9;
      const _component_AccountHandle = _sfc_main$8;
      const _component_SettingsProfileMetadata = _sfc_main$1;
      const _component_CommonErrorMessage = _sfc_main$4;
      const _component_CommonTooltip = _sfc_main$o;
      _push(ssrRenderComponent(_component_MainContent, mergeProps({ back: "" }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div text-lg font-bold flex items-center gap-2${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.$t("settings.profile.appearance.title"))}</span></div>`);
          } else {
            return [
              createVNode("div", {
                "text-lg": "",
                "font-bold": "",
                flex: "",
                "items-center": "",
                "gap-2": "",
                onClick: _ctx.$scrollToTop
              }, [
                createVNode("span", null, toDisplayString(_ctx.$t("settings.profile.appearance.title")), 1)
              ], 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form space-y-5${_scopeId}>`);
            if (unref(account)) {
              _push2(`<div${_scopeId}><div of-hidden bg="gray-500/20" aspect="3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_CommonInputImage, {
                ref_key: "headerInput",
                ref: headerInput,
                modelValue: unref(form).header,
                "onUpdate:modelValue": ($event) => unref(form).header = $event,
                original: unref(onlineSrc).header,
                "w-full": "",
                "h-full": ""
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(ssrRenderComponent(_component_CommonCropImage, {
                modelValue: unref(form).header,
                "onUpdate:modelValue": ($event) => unref(form).header = $event,
                "stencil-aspect-ratio": 3 / 1
              }, null, _parent2, _scopeId));
              _push2(`<div px-4 flex="~ gap4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_CommonInputImage, {
                ref_key: "avatarInput",
                ref: avatarInput,
                modelValue: unref(form).avatar,
                "onUpdate:modelValue": ($event) => unref(form).avatar = $event,
                original: unref(onlineSrc).avatar,
                "mt--10": "",
                "rounded-full": "",
                border: "bg-base 4",
                w: "sm:30 24",
                "min-w": "sm:30 24",
                h: "sm:30 24"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(ssrRenderComponent(_component_CommonCropImage, {
                modelValue: unref(form).avatar,
                "onUpdate:modelValue": ($event) => unref(form).avatar = $event
              }, null, _parent2, _scopeId));
              _push2(`<div px4${_scopeId}><div flex justify-between${_scopeId}>`);
              _push2(ssrRenderComponent(_component_AccountDisplayName, {
                account: { ...unref(account), displayName: unref(form).displayName },
                "font-bold": "",
                "sm:text-2xl": "",
                "text-xl": ""
              }, null, _parent2, _scopeId));
              _push2(`<div flex="~ row" items-center gap2${_scopeId}><label${_scopeId}>`);
              _push2(ssrRenderComponent(_component_AccountLockIndicator, {
                "show-label": "",
                px2: "",
                py1: ""
              }, {
                prepend: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<input${ssrIncludeBooleanAttr(Array.isArray(unref(form).locked) ? ssrLooseContain(unref(form).locked, null) : unref(form).locked) ? " checked" : ""} type="checkbox" cursor-pointer${_scopeId2}>`);
                  } else {
                    return [
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).locked = $event,
                        type: "checkbox",
                        "cursor-pointer": ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelCheckbox, unref(form).locked]
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</label><label${_scopeId}>`);
              _push2(ssrRenderComponent(_component_AccountBotIndicator, {
                "show-label": "",
                px2: "",
                py1: ""
              }, {
                prepend: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<input${ssrIncludeBooleanAttr(Array.isArray(unref(form).bot) ? ssrLooseContain(unref(form).bot, null) : unref(form).bot) ? " checked" : ""} type="checkbox" cursor-pointer${_scopeId2}>`);
                  } else {
                    return [
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).bot = $event,
                        type: "checkbox",
                        "cursor-pointer": ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelCheckbox, unref(form).bot]
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</label></div></div>`);
              _push2(ssrRenderComponent(_component_AccountHandle, { account: unref(account) }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div px4 py3 space-y-5${_scopeId}><label space-y-2 block${_scopeId}><p font-medium${_scopeId}>${ssrInterpolate(_ctx.$t("settings.profile.appearance.display_name"))}</p><input${ssrRenderAttr("value", unref(form).displayName)} type="text" input-base${_scopeId}></label><label space-y-2 block${_scopeId}><p font-medium${_scopeId}>${ssrInterpolate(_ctx.$t("settings.profile.appearance.bio"))}</p><textarea maxlength="500" min-h-10ex input-base${_scopeId}>${ssrInterpolate(unref(form).note)}</textarea></label>`);
            _push2(ssrRenderComponent(_component_SettingsProfileMetadata, {
              modelValue: unref(form),
              "onUpdate:modelValue": ($event) => isRef(form) ? form.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`<div flex="~ gap2" justify-end${_scopeId}><button type="button" btn-text text-sm flex gap-x-2 items-center text-red${_scopeId}><div aria-hidden="true" i-ri:eraser-line${_scopeId}></div> ${ssrInterpolate(_ctx.$t("action.reset"))}</button>`);
            if (unref(failedMessages).length === 0) {
              _push2(`<button type="submit" btn-solid rounded-full text-sm flex gap-x-2 items-center${ssrIncludeBooleanAttr(unref(submitting) || !unref(isCanSubmit)) ? " disabled" : ""}${_scopeId}>`);
              if (unref(submitting)) {
                _push2(`<span aria-hidden="true" block animate-spin preserve-3d${_scopeId}><span block i-ri:loader-2-fill aria-hidden="true"${_scopeId}></span></span>`);
              } else {
                _push2(`<span aria-hidden="true" block i-ri:save-line${_scopeId}></span>`);
              }
              _push2(` ${ssrInterpolate(_ctx.$t("action.save"))}</button>`);
            } else {
              _push2(`<button type="submit" btn-danger rounded-full text-sm flex gap-x-2 items-center${_scopeId}><span aria-hidden="true" block i-carbon:face-dizzy-filled${_scopeId}></span><span${_scopeId}>${ssrInterpolate(_ctx.$t("state.save_failed"))}</span></button>`);
            }
            _push2(`</div>`);
            if (unref(failedMessages).length > 0) {
              _push2(ssrRenderComponent(_component_CommonErrorMessage, { "described-by": "save-failed" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<header id="save-failed" flex justify-between${_scopeId2}><div flex items-center gap-x-2 font-bold${_scopeId2}><div aria-hidden="true" i-ri:error-warning-fill${_scopeId2}></div><p${_scopeId2}>${ssrInterpolate(_ctx.$t("state.save_failed"))}</p></div>`);
                    _push3(ssrRenderComponent(_component_CommonTooltip, {
                      placement: "bottom",
                      content: _ctx.$t("action.clear_save_failed")
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<button flex rounded-4 p1 hover:bg-active cursor-pointer transition-100${ssrRenderAttr("aria-label", _ctx.$t("action.clear_save_failed"))}${_scopeId3}><span aria-hidden="true" w="1.75em" h="1.75em" i-ri:close-line${_scopeId3}></span></button>`);
                        } else {
                          return [
                            createVNode("button", {
                              flex: "",
                              "rounded-4": "",
                              p1: "",
                              "hover:bg-active": "",
                              "cursor-pointer": "",
                              "transition-100": "",
                              "aria-label": _ctx.$t("action.clear_save_failed"),
                              onClick: ($event) => failedMessages.value = []
                            }, [
                              createVNode("span", {
                                "aria-hidden": "true",
                                w: "1.75em",
                                h: "1.75em",
                                "i-ri:close-line": ""
                              })
                            ], 8, ["aria-label", "onClick"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</header><ol ps-2 sm:ps-1${_scopeId2}><!--[-->`);
                    ssrRenderList(unref(failedMessages), (error, i) => {
                      _push3(`<li flex="~ col sm:row" gap-y-1 sm:gap-x-2${_scopeId2}><strong${_scopeId2}>${ssrInterpolate(i + 1)}.</strong><span${_scopeId2}>${ssrInterpolate(error)}</span></li>`);
                    });
                    _push3(`<!--]--></ol>`);
                  } else {
                    return [
                      createVNode("header", {
                        id: "save-failed",
                        flex: "",
                        "justify-between": ""
                      }, [
                        createVNode("div", {
                          flex: "",
                          "items-center": "",
                          "gap-x-2": "",
                          "font-bold": ""
                        }, [
                          createVNode("div", {
                            "aria-hidden": "true",
                            "i-ri:error-warning-fill": ""
                          }),
                          createVNode("p", null, toDisplayString(_ctx.$t("state.save_failed")), 1)
                        ]),
                        createVNode(_component_CommonTooltip, {
                          placement: "bottom",
                          content: _ctx.$t("action.clear_save_failed")
                        }, {
                          default: withCtx(() => [
                            createVNode("button", {
                              flex: "",
                              "rounded-4": "",
                              p1: "",
                              "hover:bg-active": "",
                              "cursor-pointer": "",
                              "transition-100": "",
                              "aria-label": _ctx.$t("action.clear_save_failed"),
                              onClick: ($event) => failedMessages.value = []
                            }, [
                              createVNode("span", {
                                "aria-hidden": "true",
                                w: "1.75em",
                                h: "1.75em",
                                "i-ri:close-line": ""
                              })
                            ], 8, ["aria-label", "onClick"])
                          ]),
                          _: 1
                        }, 8, ["content"])
                      ]),
                      createVNode("ol", {
                        "ps-2": "",
                        "sm:ps-1": ""
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(failedMessages), (error, i) => {
                          return openBlock(), createBlock("li", {
                            key: i,
                            flex: "~ col sm:row",
                            "gap-y-1": "",
                            "sm:gap-x-2": ""
                          }, [
                            createVNode("strong", null, toDisplayString(i + 1) + ".", 1),
                            createVNode("span", null, toDisplayString(error), 1)
                          ]);
                        }), 128))
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                "space-y-5": "",
                onSubmit: withModifiers(unref(submit), ["prevent"])
              }, [
                unref(account) ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode("div", {
                    "of-hidden": "",
                    bg: "gray-500/20",
                    aspect: "3"
                  }, [
                    createVNode(_component_CommonInputImage, {
                      ref_key: "headerInput",
                      ref: headerInput,
                      modelValue: unref(form).header,
                      "onUpdate:modelValue": ($event) => unref(form).header = $event,
                      original: unref(onlineSrc).header,
                      "w-full": "",
                      "h-full": ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "original"])
                  ]),
                  createVNode(_component_CommonCropImage, {
                    modelValue: unref(form).header,
                    "onUpdate:modelValue": ($event) => unref(form).header = $event,
                    "stencil-aspect-ratio": 3 / 1
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", {
                    "px-4": "",
                    flex: "~ gap4"
                  }, [
                    createVNode(_component_CommonInputImage, {
                      ref_key: "avatarInput",
                      ref: avatarInput,
                      modelValue: unref(form).avatar,
                      "onUpdate:modelValue": ($event) => unref(form).avatar = $event,
                      original: unref(onlineSrc).avatar,
                      "mt--10": "",
                      "rounded-full": "",
                      border: "bg-base 4",
                      w: "sm:30 24",
                      "min-w": "sm:30 24",
                      h: "sm:30 24"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "original"])
                  ]),
                  createVNode(_component_CommonCropImage, {
                    modelValue: unref(form).avatar,
                    "onUpdate:modelValue": ($event) => unref(form).avatar = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", { px4: "" }, [
                    createVNode("div", {
                      flex: "",
                      "justify-between": ""
                    }, [
                      createVNode(_component_AccountDisplayName, {
                        account: { ...unref(account), displayName: unref(form).displayName },
                        "font-bold": "",
                        "sm:text-2xl": "",
                        "text-xl": ""
                      }, null, 8, ["account"]),
                      createVNode("div", {
                        flex: "~ row",
                        "items-center": "",
                        gap2: ""
                      }, [
                        createVNode("label", null, [
                          createVNode(_component_AccountLockIndicator, {
                            "show-label": "",
                            px2: "",
                            py1: ""
                          }, {
                            prepend: withCtx(() => [
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).locked = $event,
                                type: "checkbox",
                                "cursor-pointer": ""
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelCheckbox, unref(form).locked]
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("label", null, [
                          createVNode(_component_AccountBotIndicator, {
                            "show-label": "",
                            px2: "",
                            py1: ""
                          }, {
                            prepend: withCtx(() => [
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).bot = $event,
                                type: "checkbox",
                                "cursor-pointer": ""
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelCheckbox, unref(form).bot]
                              ])
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    createVNode(_component_AccountHandle, { account: unref(account) }, null, 8, ["account"])
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", {
                  px4: "",
                  py3: "",
                  "space-y-5": ""
                }, [
                  createVNode("label", {
                    "space-y-2": "",
                    block: ""
                  }, [
                    createVNode("p", { "font-medium": "" }, toDisplayString(_ctx.$t("settings.profile.appearance.display_name")), 1),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(form).displayName = $event,
                      type: "text",
                      "input-base": ""
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).displayName]
                    ])
                  ]),
                  createVNode("label", {
                    "space-y-2": "",
                    block: ""
                  }, [
                    createVNode("p", { "font-medium": "" }, toDisplayString(_ctx.$t("settings.profile.appearance.bio")), 1),
                    withDirectives(createVNode("textarea", {
                      "onUpdate:modelValue": ($event) => unref(form).note = $event,
                      maxlength: "500",
                      "min-h-10ex": "",
                      "input-base": ""
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).note]
                    ])
                  ]),
                  createVNode(_component_SettingsProfileMetadata, {
                    modelValue: unref(form),
                    "onUpdate:modelValue": ($event) => isRef(form) ? form.value = $event : null
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", {
                    flex: "~ gap2",
                    "justify-end": ""
                  }, [
                    createVNode("button", {
                      type: "button",
                      "btn-text": "",
                      "text-sm": "",
                      flex: "",
                      "gap-x-2": "",
                      "items-center": "",
                      "text-red": "",
                      onClick: ($event) => unref(reset)()
                    }, [
                      createVNode("div", {
                        "aria-hidden": "true",
                        "i-ri:eraser-line": ""
                      }),
                      createTextVNode(" " + toDisplayString(_ctx.$t("action.reset")), 1)
                    ], 8, ["onClick"]),
                    unref(failedMessages).length === 0 ? (openBlock(), createBlock("button", {
                      key: 0,
                      type: "submit",
                      "btn-solid": "",
                      "rounded-full": "",
                      "text-sm": "",
                      flex: "",
                      "gap-x-2": "",
                      "items-center": "",
                      disabled: unref(submitting) || !unref(isCanSubmit)
                    }, [
                      unref(submitting) ? (openBlock(), createBlock("span", {
                        key: 0,
                        "aria-hidden": "true",
                        block: "",
                        "animate-spin": "",
                        "preserve-3d": ""
                      }, [
                        createVNode("span", {
                          block: "",
                          "i-ri:loader-2-fill": "",
                          "aria-hidden": "true"
                        })
                      ])) : (openBlock(), createBlock("span", {
                        key: 1,
                        "aria-hidden": "true",
                        block: "",
                        "i-ri:save-line": ""
                      })),
                      createTextVNode(" " + toDisplayString(_ctx.$t("action.save")), 1)
                    ], 8, ["disabled"])) : (openBlock(), createBlock("button", {
                      key: 1,
                      type: "submit",
                      "btn-danger": "",
                      "rounded-full": "",
                      "text-sm": "",
                      flex: "",
                      "gap-x-2": "",
                      "items-center": ""
                    }, [
                      createVNode("span", {
                        "aria-hidden": "true",
                        block: "",
                        "i-carbon:face-dizzy-filled": ""
                      }),
                      createVNode("span", null, toDisplayString(_ctx.$t("state.save_failed")), 1)
                    ]))
                  ]),
                  unref(failedMessages).length > 0 ? (openBlock(), createBlock(_component_CommonErrorMessage, {
                    key: 0,
                    "described-by": "save-failed"
                  }, {
                    default: withCtx(() => [
                      createVNode("header", {
                        id: "save-failed",
                        flex: "",
                        "justify-between": ""
                      }, [
                        createVNode("div", {
                          flex: "",
                          "items-center": "",
                          "gap-x-2": "",
                          "font-bold": ""
                        }, [
                          createVNode("div", {
                            "aria-hidden": "true",
                            "i-ri:error-warning-fill": ""
                          }),
                          createVNode("p", null, toDisplayString(_ctx.$t("state.save_failed")), 1)
                        ]),
                        createVNode(_component_CommonTooltip, {
                          placement: "bottom",
                          content: _ctx.$t("action.clear_save_failed")
                        }, {
                          default: withCtx(() => [
                            createVNode("button", {
                              flex: "",
                              "rounded-4": "",
                              p1: "",
                              "hover:bg-active": "",
                              "cursor-pointer": "",
                              "transition-100": "",
                              "aria-label": _ctx.$t("action.clear_save_failed"),
                              onClick: ($event) => failedMessages.value = []
                            }, [
                              createVNode("span", {
                                "aria-hidden": "true",
                                w: "1.75em",
                                h: "1.75em",
                                "i-ri:close-line": ""
                              })
                            ], 8, ["aria-label", "onClick"])
                          ]),
                          _: 1
                        }, 8, ["content"])
                      ]),
                      createVNode("ol", {
                        "ps-2": "",
                        "sm:ps-1": ""
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(failedMessages), (error, i) => {
                          return openBlock(), createBlock("li", {
                            key: i,
                            flex: "~ col sm:row",
                            "gap-y-1": "",
                            "sm:gap-x-2": ""
                          }, [
                            createVNode("strong", null, toDisplayString(i + 1) + ".", 1),
                            createVNode("span", null, toDisplayString(error), 1)
                          ]);
                        }), 128))
                      ])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ])
              ], 40, ["onSubmit"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings/profile/appearance.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
