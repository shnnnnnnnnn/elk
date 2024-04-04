import { Y as useMastoClient, aJ as proxy, aK as getEmojiAttributes, X as _export_sfc, e as useI18n, q as useUserSettings, aL as useHighlighter, aM as getDefaultDraft, aN as useDraft, aO as htmlToText, aP as characterLimit, i as isHydrated, c as currentUser, k as getAccountRoute, aQ as accountToShortHandle, aR as currentInstance, M as _sfc_main$o, L as _sfc_main$6$1, a as useMasto, aS as useDropZone, n as _sfc_main$7$1, l as __nuxt_component_0$1, az as _sfc_main$d, aT as _sfc_main$q, aU as __nuxt_component_11, aV as isGlitchEdition, aH as navigateToStatus } from './server.mjs';
import { _ as _sfc_main$e } from './CommonErrorMessage-CvbJeSnR.mjs';
import { f as _sfc_main$5$1 } from './StatusCard-CHVUTCdD.mjs';
import { _ as __nuxt_component_0 } from './ModalDialog-BaHoBdlt.mjs';
import { useSSRContext, defineComponent, mergeProps, ref, unref, isRef, withCtx, createVNode, toDisplayString, withDirectives, vModelText, resolveComponent, openBlock, createBlock, createCommentVNode, useModel, computed, mergeModels, Fragment, renderList, renderSlot, watch, vModelSelect, toRef, withModifiers } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderList, ssrRenderSlot, ssrLooseContain, ssrLooseEqual, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _sfc_main$b } from './Dropdown-YHaGe2K7.mjs';
import { _ as _sfc_main$f } from './CommonCheckbox-D4Ek4LfU.mjs';
import ISO6391 from 'iso-639-1';
import { s as statusVisibilities } from './icons-m16uagef.mjs';
import stringLength from 'string-length';
import tippy from 'tippy.js';
import { _ as _sfc_main$1$1, a as _sfc_main$c } from './SearchHashtagInfo-DJpkg2KL.mjs';
import { emojiRegEx } from '@iconify-emoji/twemoji';

const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "PublishCharacterCounter",
  __ssrInlineRender: true,
  props: {
    max: {},
    length: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        dir: "ltr",
        "pointer-events-none": "",
        "pe-1": "",
        "pt-2": "",
        "text-sm": "",
        "tabular-nums": "",
        "text-secondary": "",
        flex: "",
        gap: "0.5",
        class: { "text-rose-500": _ctx.length > _ctx.max }
      }, _attrs))}>${ssrInterpolate(_ctx.length ?? 0)}<span text-secondary-light>/</span><span text-secondary-light>${ssrInterpolate(_ctx.max)}</span></div>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/publish/PublishCharacterCounter.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const maxDescriptionLength = 1500;
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "PublishAttachment",
  __ssrInlineRender: true,
  props: {
    attachment: {},
    alt: {},
    removable: { type: Boolean, default: true },
    dialogLabelledBy: {}
  },
  emits: ["remove", "setDescription"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isEditDialogOpen = ref(false);
    const description = ref(props.attachment.description ?? "");
    function toggleApply() {
      isEditDialogOpen.value = false;
      emit("setDescription", description.value);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_StatusAttachment = _sfc_main$5$1;
      const _component_ModalDialog = __nuxt_component_0;
      const _component_PublishCharacterCounter = _sfc_main$a;
      _push(`<div${ssrRenderAttrs(mergeProps({
        relative: "",
        group: ""
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_StatusAttachment, {
        attachment: _ctx.attachment,
        "w-full": "",
        "is-preview": ""
      }, null, _parent));
      _push(`<div absolute right-2 top-2>`);
      if (_ctx.removable) {
        _push(`<div${ssrRenderAttr("aria-label", _ctx.$t("attachment.remove_label"))} class="bg-black/75 hover:bg-red/75" text-white px2 py2 rounded-full cursor-pointer><div i-ri:close-line text-3 text-6 md:text-3></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div absolute right-2 bottom-2><button class="bg-black/75" text-white px2 py1 rounded-2>${ssrInterpolate(_ctx.$t("action.edit"))}</button></div>`);
      _push(ssrRenderComponent(_component_ModalDialog, {
        modelValue: unref(isEditDialogOpen),
        "onUpdate:modelValue": ($event) => isRef(isEditDialogOpen) ? isEditDialogOpen.value = $event : null,
        "dialog-labelled-by": _ctx.dialogLabelledBy,
        "py-6": "",
        "px-6": "",
        "max-w-300": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div flex flex-col-reverse gap-5 md:flex-row${_scopeId}><div flex flex-col gap-2 justify-between${_scopeId}><h1 id="edit-attachment" font-bold${_scopeId}>${ssrInterpolate(_ctx.$t("attachment.edit_title"))}</h1><div flex flex-col gap-2${_scopeId}><textarea p-3 h-50 bg-base rounded-2 border-strong border-1 md:w-100${_scopeId}>${ssrInterpolate(unref(description))}</textarea><div flex flex-row-reverse${_scopeId}>`);
            _push2(ssrRenderComponent(_component_PublishCharacterCounter, {
              length: unref(description).length,
              max: maxDescriptionLength
            }, null, _parent2, _scopeId));
            _push2(`</div><button btn-outline${ssrIncludeBooleanAttr(unref(description).length > maxDescriptionLength) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(_ctx.$t("action.apply"))}</button></div><button btn-outline${_scopeId}>${ssrInterpolate(_ctx.$t("action.close"))}</button></div>`);
            _push2(ssrRenderComponent(_component_StatusAttachment, {
              attachment: _ctx.attachment,
              "w-full": "",
              "is-preview": ""
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                flex: "",
                "flex-col-reverse": "",
                "gap-5": "",
                "md:flex-row": ""
              }, [
                createVNode("div", {
                  flex: "",
                  "flex-col": "",
                  "gap-2": "",
                  "justify-between": ""
                }, [
                  createVNode("h1", {
                    id: "edit-attachment",
                    "font-bold": ""
                  }, toDisplayString(_ctx.$t("attachment.edit_title")), 1),
                  createVNode("div", {
                    flex: "",
                    "flex-col": "",
                    "gap-2": ""
                  }, [
                    withDirectives(createVNode("textarea", {
                      "onUpdate:modelValue": ($event) => isRef(description) ? description.value = $event : null,
                      "p-3": "",
                      "h-50": "",
                      "bg-base": "",
                      "rounded-2": "",
                      "border-strong": "",
                      "border-1": "",
                      "md:w-100": ""
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(description)]
                    ]),
                    createVNode("div", {
                      flex: "",
                      "flex-row-reverse": ""
                    }, [
                      createVNode(_component_PublishCharacterCounter, {
                        length: unref(description).length,
                        max: maxDescriptionLength
                      }, null, 8, ["length"])
                    ]),
                    createVNode("button", {
                      "btn-outline": "",
                      disabled: unref(description).length > maxDescriptionLength,
                      onClick: toggleApply
                    }, toDisplayString(_ctx.$t("action.apply")), 9, ["disabled"])
                  ]),
                  createVNode("button", {
                    "btn-outline": "",
                    onClick: ($event) => isEditDialogOpen.value = false
                  }, toDisplayString(_ctx.$t("action.close")), 9, ["onClick"])
                ]),
                createVNode(_component_StatusAttachment, {
                  attachment: _ctx.attachment,
                  "w-full": "",
                  "is-preview": ""
                }, null, 8, ["attachment"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/publish/PublishAttachment.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "PublishEditorTools",
  __ssrInlineRender: true,
  props: {
    editor: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonTooltip = _sfc_main$o;
      const _component_VDropdown = resolveComponent("VDropdown");
      _push(ssrRenderComponent(_component_CommonTooltip, mergeProps({
        placement: "top",
        content: _ctx.$t("tooltip.open_editor_tools")
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.editor) {
              _push2(ssrRenderComponent(_component_VDropdown, { placement: "bottom" }, {
                popper: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div flex gap-1${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_CommonTooltip, {
                      placement: "top",
                      content: _ctx.$t("tooltip.toggle_code_block")
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<button btn-action-icon${ssrRenderAttr("aria-label", _ctx.$t("tooltip.toggle_code_block"))} class="${ssrRenderClass(_ctx.editor.isActive("codeBlock") ? "text-primary" : "")}"${_scopeId3}><div i-ri:code-s-slash-line${_scopeId3}></div></button>`);
                        } else {
                          return [
                            createVNode("button", {
                              "btn-action-icon": "",
                              "aria-label": _ctx.$t("tooltip.toggle_code_block"),
                              class: _ctx.editor.isActive("codeBlock") ? "text-primary" : "",
                              onClick: ($event) => _ctx.editor?.chain().focus().toggleCodeBlock().run()
                            }, [
                              createVNode("div", { "i-ri:code-s-slash-line": "" })
                            ], 10, ["aria-label", "onClick"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_CommonTooltip, {
                      placement: "top",
                      content: _ctx.$t("tooltip.toggle_bold")
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<button btn-action-icon${ssrRenderAttr("aria-label", _ctx.$t("tooltip.toggle_bold"))} class="${ssrRenderClass(_ctx.editor.isActive("bold") ? "text-primary" : "")}"${_scopeId3}><div i-ri:bold${_scopeId3}></div></button>`);
                        } else {
                          return [
                            createVNode("button", {
                              "btn-action-icon": "",
                              "aria-label": _ctx.$t("tooltip.toggle_bold"),
                              class: _ctx.editor.isActive("bold") ? "text-primary" : "",
                              onClick: ($event) => _ctx.editor?.chain().focus().toggleBold().run()
                            }, [
                              createVNode("div", { "i-ri:bold": "" })
                            ], 10, ["aria-label", "onClick"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_CommonTooltip, {
                      placement: "top",
                      content: _ctx.$t("tooltip.toggle_italic")
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<button btn-action-icon${ssrRenderAttr("aria-label", _ctx.$t("tooltip.toggle_italic"))} class="${ssrRenderClass(_ctx.editor.isActive("italic") ? "text-primary" : "")}"${_scopeId3}><div i-ri:italic${_scopeId3}></div></button>`);
                        } else {
                          return [
                            createVNode("button", {
                              "btn-action-icon": "",
                              "aria-label": _ctx.$t("tooltip.toggle_italic"),
                              class: _ctx.editor.isActive("italic") ? "text-primary" : "",
                              onClick: ($event) => _ctx.editor?.chain().focus().toggleItalic().run()
                            }, [
                              createVNode("div", { "i-ri:italic": "" })
                            ], 10, ["aria-label", "onClick"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", {
                        flex: "",
                        "gap-1": ""
                      }, [
                        createVNode(_component_CommonTooltip, {
                          placement: "top",
                          content: _ctx.$t("tooltip.toggle_code_block")
                        }, {
                          default: withCtx(() => [
                            createVNode("button", {
                              "btn-action-icon": "",
                              "aria-label": _ctx.$t("tooltip.toggle_code_block"),
                              class: _ctx.editor.isActive("codeBlock") ? "text-primary" : "",
                              onClick: ($event) => _ctx.editor?.chain().focus().toggleCodeBlock().run()
                            }, [
                              createVNode("div", { "i-ri:code-s-slash-line": "" })
                            ], 10, ["aria-label", "onClick"])
                          ]),
                          _: 1
                        }, 8, ["content"]),
                        createVNode(_component_CommonTooltip, {
                          placement: "top",
                          content: _ctx.$t("tooltip.toggle_bold")
                        }, {
                          default: withCtx(() => [
                            createVNode("button", {
                              "btn-action-icon": "",
                              "aria-label": _ctx.$t("tooltip.toggle_bold"),
                              class: _ctx.editor.isActive("bold") ? "text-primary" : "",
                              onClick: ($event) => _ctx.editor?.chain().focus().toggleBold().run()
                            }, [
                              createVNode("div", { "i-ri:bold": "" })
                            ], 10, ["aria-label", "onClick"])
                          ]),
                          _: 1
                        }, 8, ["content"]),
                        createVNode(_component_CommonTooltip, {
                          placement: "top",
                          content: _ctx.$t("tooltip.toggle_italic")
                        }, {
                          default: withCtx(() => [
                            createVNode("button", {
                              "btn-action-icon": "",
                              "aria-label": _ctx.$t("tooltip.toggle_italic"),
                              class: _ctx.editor.isActive("italic") ? "text-primary" : "",
                              onClick: ($event) => _ctx.editor?.chain().focus().toggleItalic().run()
                            }, [
                              createVNode("div", { "i-ri:italic": "" })
                            ], 10, ["aria-label", "onClick"])
                          ]),
                          _: 1
                        }, 8, ["content"])
                      ])
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<button btn-action-icon${ssrRenderAttr("aria-label", _ctx.$t("tooltip.open_editor_tools"))}${_scopeId2}><div i-ri:font-size-2${_scopeId2}></div></button>`);
                  } else {
                    return [
                      createVNode("button", {
                        "btn-action-icon": "",
                        "aria-label": _ctx.$t("tooltip.open_editor_tools")
                      }, [
                        createVNode("div", { "i-ri:font-size-2": "" })
                      ], 8, ["aria-label"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              _ctx.editor ? (openBlock(), createBlock(_component_VDropdown, {
                key: 0,
                placement: "bottom"
              }, {
                popper: withCtx(() => [
                  createVNode("div", {
                    flex: "",
                    "gap-1": ""
                  }, [
                    createVNode(_component_CommonTooltip, {
                      placement: "top",
                      content: _ctx.$t("tooltip.toggle_code_block")
                    }, {
                      default: withCtx(() => [
                        createVNode("button", {
                          "btn-action-icon": "",
                          "aria-label": _ctx.$t("tooltip.toggle_code_block"),
                          class: _ctx.editor.isActive("codeBlock") ? "text-primary" : "",
                          onClick: ($event) => _ctx.editor?.chain().focus().toggleCodeBlock().run()
                        }, [
                          createVNode("div", { "i-ri:code-s-slash-line": "" })
                        ], 10, ["aria-label", "onClick"])
                      ]),
                      _: 1
                    }, 8, ["content"]),
                    createVNode(_component_CommonTooltip, {
                      placement: "top",
                      content: _ctx.$t("tooltip.toggle_bold")
                    }, {
                      default: withCtx(() => [
                        createVNode("button", {
                          "btn-action-icon": "",
                          "aria-label": _ctx.$t("tooltip.toggle_bold"),
                          class: _ctx.editor.isActive("bold") ? "text-primary" : "",
                          onClick: ($event) => _ctx.editor?.chain().focus().toggleBold().run()
                        }, [
                          createVNode("div", { "i-ri:bold": "" })
                        ], 10, ["aria-label", "onClick"])
                      ]),
                      _: 1
                    }, 8, ["content"]),
                    createVNode(_component_CommonTooltip, {
                      placement: "top",
                      content: _ctx.$t("tooltip.toggle_italic")
                    }, {
                      default: withCtx(() => [
                        createVNode("button", {
                          "btn-action-icon": "",
                          "aria-label": _ctx.$t("tooltip.toggle_italic"),
                          class: _ctx.editor.isActive("italic") ? "text-primary" : "",
                          onClick: ($event) => _ctx.editor?.chain().focus().toggleItalic().run()
                        }, [
                          createVNode("div", { "i-ri:italic": "" })
                        ], 10, ["aria-label", "onClick"])
                      ]),
                      _: 1
                    }, 8, ["content"])
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("button", {
                    "btn-action-icon": "",
                    "aria-label": _ctx.$t("tooltip.open_editor_tools")
                  }, [
                    createVNode("div", { "i-ri:font-size-2": "" })
                  ], 8, ["aria-label"])
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/publish/PublishEditorTools.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const languagesNameList = ISO6391.getAllCodes().map((code) => ({
  code,
  nativeName: ISO6391.getNativeName(code),
  name: ISO6391.getName(code)
}));
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "PublishLanguagePicker",
  __ssrInlineRender: true,
  props: {
    "modelValue": { required: true },
    "modelModifiers": {}
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const modelValue = useModel(__props, "modelValue");
    const { t } = useI18n();
    const userSettings = useUserSettings();
    const languageKeyword = ref("");
    const fuse = new proxy(languagesNameList, {
      keys: ["code", "nativeName", "name"],
      shouldSort: true
    });
    const languages = computed(
      () => languageKeyword.value.trim() ? fuse.search(languageKeyword.value).map((r) => r.item) : [...languagesNameList].filter((entry) => !userSettings.value.disabledTranslationLanguages.includes(entry.code)).sort(({ code: a }, { code: b }) => {
        if (a === "en")
          return -1;
        return a === modelValue.value ? -1 : b === modelValue.value ? 1 : a.localeCompare(b);
      })
    );
    const preferredLanguages = computed(
      () => {
        const result = [];
        for (const langCode of userSettings.value.disabledTranslationLanguages) {
          const completeLang = languagesNameList.find((listEntry) => listEntry.code === langCode);
          if (completeLang)
            result.push(completeLang);
        }
        return result;
      }
    );
    function chooseLanguage(language) {
      modelValue.value = language;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonDropdownItem = _sfc_main$6$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        relative: "",
        "of-x-hidden": ""
      }, _attrs))}><div p2><input${ssrRenderAttr("value", unref(languageKeyword))}${ssrRenderAttr("placeholder", unref(t)("language.search"))} p2 border-rounded w-full bg-transparent outline-none border="~ base"></div><div max-h-40vh overflow-auto>`);
      if (!unref(languageKeyword).trim()) {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(unref(preferredLanguages), ({ code, nativeName, name }) => {
          _push(ssrRenderComponent(_component_CommonDropdownItem, {
            key: code,
            text: nativeName,
            description: name,
            checked: code === modelValue.value,
            onClick: ($event) => chooseLanguage(code)
          }, null, _parent));
        });
        _push(`<!--]--><hr class="border-base"><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(languages), ({ code, nativeName, name }) => {
        _push(ssrRenderComponent(_component_CommonDropdownItem, {
          key: code,
          text: nativeName,
          description: name,
          checked: code === modelValue.value,
          onClick: ($event) => chooseLanguage(code)
        }, null, _parent));
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/publish/PublishLanguagePicker.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "PublishVisibilityPicker",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    editing: { type: Boolean }
  }, {
    "modelValue": {
      required: true
    },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const modelValue = useModel(__props, "modelValue");
    const currentVisibility = computed(
      () => statusVisibilities.find((v) => v.value === modelValue.value) || statusVisibilities[0]
    );
    function chooseVisibility(visibility) {
      modelValue.value = visibility;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonTooltip = _sfc_main$o;
      const _component_CommonDropdown = _sfc_main$b;
      const _component_CommonDropdownItem = _sfc_main$6$1;
      _push(ssrRenderComponent(_component_CommonTooltip, mergeProps({
        placement: "top",
        content: _ctx.editing ? _ctx.$t(`visibility.${unref(currentVisibility).value}`) : _ctx.$t("tooltip.change_content_visibility")
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CommonDropdown, { placement: "bottom" }, {
              popper: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList("statusVisibilities" in _ctx ? _ctx.statusVisibilities : unref(statusVisibilities), (visibility) => {
                    _push3(ssrRenderComponent(_component_CommonDropdownItem, {
                      key: visibility.value,
                      icon: visibility.icon,
                      text: _ctx.$t(`visibility.${visibility.value}`),
                      description: _ctx.$t(`visibility.${visibility.value}_desc`),
                      checked: visibility.value === modelValue.value,
                      onClick: ($event) => chooseVisibility(visibility.value)
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList("statusVisibilities" in _ctx ? _ctx.statusVisibilities : unref(statusVisibilities), (visibility) => {
                      return openBlock(), createBlock(_component_CommonDropdownItem, {
                        key: visibility.value,
                        icon: visibility.icon,
                        text: _ctx.$t(`visibility.${visibility.value}`),
                        description: _ctx.$t(`visibility.${visibility.value}_desc`),
                        checked: visibility.value === modelValue.value,
                        onClick: ($event) => chooseVisibility(visibility.value)
                      }, null, 8, ["icon", "text", "description", "checked", "onClick"]);
                    }), 128))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", { visibility: unref(currentVisibility) }, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default", { visibility: unref(currentVisibility) })
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_CommonDropdown, { placement: "bottom" }, {
                popper: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList("statusVisibilities" in _ctx ? _ctx.statusVisibilities : unref(statusVisibilities), (visibility) => {
                    return openBlock(), createBlock(_component_CommonDropdownItem, {
                      key: visibility.value,
                      icon: visibility.icon,
                      text: _ctx.$t(`visibility.${visibility.value}`),
                      description: _ctx.$t(`visibility.${visibility.value}_desc`),
                      checked: visibility.value === modelValue.value,
                      onClick: ($event) => chooseVisibility(visibility.value)
                    }, null, 8, ["icon", "text", "description", "checked", "onClick"]);
                  }), 128))
                ]),
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", { visibility: unref(currentVisibility) })
                ]),
                _: 3
              })
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/publish/PublishVisibilityPicker.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const EditorContent = proxy;
const NodeViewContent = proxy;
const NodeViewWrapper = proxy;
const nodeViewProps = proxy;
const Node = proxy;
const mergeAttributes = proxy;
const nodeInputRule = proxy;
const nodePasteRule = proxy;
const VueNodeViewRenderer = proxy;
const VueRenderer = proxy;
const callOrReturn = proxy;
const InputRule = proxy;
function usePublish(options) {
  const { draft, isEmpty } = options.draftState;
  const { client } = useMasto();
  const settings = useUserSettings();
  const preferredLanguage = computed(() => (currentUser.value?.account.source.language || settings.value?.language || "en").split("-")[0]);
  const isSending = ref(false);
  const isExpanded = ref(false);
  const failedMessages = ref([]);
  const publishSpoilerText = computed({
    get() {
      return draft.value.params.sensitive ? draft.value.params.spoilerText : "";
    },
    set(val) {
      if (!draft.value.params.sensitive)
        return;
      draft.value.params.spoilerText = val;
    }
  });
  const shouldExpanded = computed(() => options.expanded.value || isExpanded.value || !isEmpty.value);
  const isPublishDisabled = computed(() => {
    const { params, attachments } = draft.value;
    const firstEmptyInputIndex = params.poll?.options.findIndex((option) => option.trim().length === 0);
    return isEmpty.value || options.isUploading.value || isSending.value || attachments.length === 0 && !params.status || failedMessages.value.length > 0 || attachments.length > 0 && params.poll !== null && params.poll !== void 0 || params.poll !== null && params.poll !== void 0 && (firstEmptyInputIndex !== -1 && firstEmptyInputIndex !== params.poll.options.length - 1 || params.poll.options.findLastIndex((option) => option.trim().length > 0) + 1 < 2 || new Set(params.poll.options).size !== params.poll.options.length || currentInstance.value?.configuration?.polls.maxCharactersPerOption !== void 0 && params.poll.options.find((option) => option.length > currentInstance.value.configuration.polls.maxCharactersPerOption) !== void 0);
  });
  watch(draft, () => {
    if (failedMessages.value.length > 0)
      failedMessages.value.length = 0;
  }, { deep: true });
  async function publishDraft() {
    if (isPublishDisabled.value)
      return;
    let content = htmlToText(draft.value.params.status || "");
    if (draft.value.mentions?.length)
      content = `${draft.value.mentions.map((i) => `@${i}`).join(" ")} ${content}`;
    let poll;
    if (draft.value.params.poll) {
      let options2 = draft.value.params.poll.options;
      if (currentInstance.value?.configuration !== void 0 && (options2.length < currentInstance.value.configuration.polls.maxOptions || options2[options2.length - 1].trim().length === 0))
        options2 = options2.slice(0, options2.length - 1);
      poll = { ...draft.value.params.poll, options: options2 };
    }
    const payload = {
      ...draft.value.params,
      spoilerText: publishSpoilerText.value,
      status: content,
      mediaIds: draft.value.attachments.map((a) => a.id),
      language: draft.value.params.language || preferredLanguage.value,
      poll,
      ...isGlitchEdition.value ? { "content-type": "text/markdown" } : {}
    };
    try {
      isSending.value = true;
      let status;
      if (!draft.value.editingStatus) {
        status = await client.value.v1.statuses.create(payload);
      } else {
        status = await client.value.v1.statuses.$select(draft.value.editingStatus.id).update({
          ...payload,
          mediaAttributes: draft.value.attachments.map((media) => ({
            id: media.id,
            description: media.description
          }))
        });
      }
      if (draft.value.params.inReplyToId)
        navigateToStatus({ status });
      draft.value = options.initialDraft.value();
      return status;
    } catch (err) {
      console.error(err);
      failedMessages.value.push(err.message);
    } finally {
      isSending.value = false;
    }
  }
  return {
    isSending,
    isExpanded,
    shouldExpanded,
    isPublishDisabled,
    failedMessages,
    preferredLanguage,
    publishSpoilerText,
    publishDraft
  };
}
function useUploadMediaAttachment(draft) {
  const { client } = useMasto();
  const { t } = useI18n();
  const isUploading = ref(false);
  const isExceedingAttachmentLimit = ref(false);
  const failedAttachments = ref([]);
  const dropZoneRef = ref();
  const maxPixels = computed(() => {
    return currentInstance.value?.configuration?.mediaAttachments?.imageMatrixLimit ?? 4096 ** 2;
  });
  const loadImage = (inputFile) => new Promise((resolve, reject) => {
    const url = URL.createObjectURL(inputFile);
    const img = new Image();
    img.onerror = (err) => reject(err);
    img.onload = () => resolve(img);
    img.src = url;
  });
  function resizeImage(img, type = "image/png") {
    const { width, height } = img;
    const aspectRatio = width / height;
    const canvas = (void 0).createElement("canvas");
    const resizedWidth = canvas.width = Math.round(Math.sqrt(maxPixels.value * aspectRatio));
    const resizedHeight = canvas.height = Math.round(Math.sqrt(maxPixels.value / aspectRatio));
    const context = canvas.getContext("2d");
    context?.drawImage(img, 0, 0, resizedWidth, resizedHeight);
    return new Promise((resolve) => {
      canvas.toBlob(resolve, type);
    });
  }
  async function processImageFile(file) {
    try {
      const image = await loadImage(file);
      if (image.width * image.height > maxPixels.value)
        file = await resizeImage(image, file.type);
      return file;
    } catch (e) {
      console.error(e);
      return file;
    }
  }
  async function processFile(file) {
    if (file.type.startsWith("image/"))
      return await processImageFile(file);
    return file;
  }
  async function uploadAttachments(files) {
    isUploading.value = true;
    failedAttachments.value = [];
    const limit = currentInstance.value.configuration?.statuses.maxMediaAttachments || 4;
    for (const file of files.slice(0, limit)) {
      if (draft.value.attachments.length < limit) {
        isExceedingAttachmentLimit.value = false;
        try {
          const attachment = await client.value.v1.media.create({
            file: await processFile(file)
          });
          draft.value.attachments.push(attachment);
        } catch (e) {
          console.error(e);
          failedAttachments.value = [...failedAttachments.value, [file.name, e.message]];
        }
      } else {
        isExceedingAttachmentLimit.value = true;
        failedAttachments.value = [...failedAttachments.value, [file.name, t("state.attachments_limit_error")]];
      }
    }
    isUploading.value = false;
  }
  async function pickAttachments() {
    return;
  }
  async function setDescription(att, description) {
    att.description = description;
    if (!draft.value.editingStatus)
      await client.value.v1.media.$select(att.id).update({ description: att.description });
  }
  function removeAttachment(index) {
    draft.value.attachments.splice(index, 1);
  }
  async function onDrop(files) {
    if (files)
      await uploadAttachments(files);
  }
  const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);
  return {
    isUploading,
    isExceedingAttachmentLimit,
    isOverDropZone,
    failedAttachments,
    dropZoneRef,
    uploadAttachments,
    pickAttachments,
    setDescription,
    removeAttachment
  };
}
const PluginKey = proxy;
const createParser = proxy;
const createHighlightPlugin = proxy;
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "TiptapMentionList",
  __ssrInlineRender: true,
  props: {
    items: {},
    command: {},
    isPending: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    const selectedIndex = ref(0);
    watch(() => __props.items, () => {
      selectedIndex.value = 0;
    });
    function onKeyDown(event) {
      if (__props.items.length === 0)
        return false;
      if (event.key === "ArrowUp") {
        selectedIndex.value = (selectedIndex.value + __props.items.length - 1) % __props.items.length;
        return true;
      } else if (event.key === "ArrowDown") {
        selectedIndex.value = (selectedIndex.value + 1) % __props.items.length;
        return true;
      } else if (event.key === "Enter") {
        selectItem(selectedIndex.value);
        return true;
      }
      return false;
    }
    function selectItem(index) {
      const item = __props.items[index];
      if (item)
        __props.command({ id: item.acct });
    }
    __expose({
      onKeyDown
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AccountInfo = _sfc_main$7$1;
      if (_ctx.isPending || _ctx.items.length) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          relative: "",
          "bg-base": "",
          "text-base": "",
          shadow: "",
          border: "~ base rounded",
          "text-sm": "",
          "py-2": "",
          "overflow-x-hidden": "",
          "overflow-y-auto": "",
          "max-h-100": ""
        }, _attrs))}>`);
        if (_ctx.isPending) {
          _push(`<div flex gap-1 items-center p2 animate-pulse><div animate-spin preserve-3d><div i-ri:loader-2-line></div></div><span>${ssrInterpolate(_ctx.$t("common.fetching"))}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.items.length) {
          _push(`<!--[-->`);
          ssrRenderList(_ctx.items, (item, index) => {
            _push(ssrRenderComponent(_sfc_main$1$1, {
              key: index,
              active: index === unref(selectedIndex),
              as: "button",
              class: index === unref(selectedIndex) ? "bg-active" : "text-secondary",
              block: "",
              m0: "",
              "w-full": "",
              "text-left": "",
              px2: "",
              py1: "",
              onClick: ($event) => selectItem(index)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_AccountInfo, { account: item }, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_AccountInfo, { account: item }, null, 8, ["account"])
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
      }
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tiptap/TiptapMentionList.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "TiptapHashtagList",
  __ssrInlineRender: true,
  props: {
    items: {},
    command: {},
    isPending: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    const selectedIndex = ref(0);
    watch(() => __props.items, () => {
      selectedIndex.value = 0;
    });
    function onKeyDown(event) {
      if (__props.items.length === 0)
        return false;
      if (event.key === "ArrowUp") {
        selectedIndex.value = (selectedIndex.value + __props.items.length - 1) % __props.items.length;
        return true;
      } else if (event.key === "ArrowDown") {
        selectedIndex.value = (selectedIndex.value + 1) % __props.items.length;
        return true;
      } else if (event.key === "Enter") {
        selectItem(selectedIndex.value);
        return true;
      }
      return false;
    }
    function selectItem(index) {
      const item = __props.items[index];
      if (item)
        __props.command({ id: item.name });
    }
    __expose({
      onKeyDown
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SearchHashtagInfo = _sfc_main$c;
      if (_ctx.isPending || _ctx.items.length) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          relative: "",
          "bg-base": "",
          "text-base": "",
          shadow: "",
          border: "~ base rounded",
          "text-sm": "",
          "py-2": "",
          "overflow-x-hidden": "",
          "overflow-y-auto": "",
          "max-h-100": ""
        }, _attrs))}>`);
        if (_ctx.isPending) {
          _push(`<div flex gap-1 items-center p2 animate-pulse><div animate-spin preserve-3d><div i-ri:loader-2-line></div></div><span>${ssrInterpolate(_ctx.$t("common.fetching"))}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.items.length) {
          _push(`<!--[-->`);
          ssrRenderList(_ctx.items, (item, index) => {
            _push(ssrRenderComponent(_sfc_main$1$1, {
              key: index,
              active: index === unref(selectedIndex),
              as: "button",
              class: index === unref(selectedIndex) ? "bg-active" : "text-secondary",
              block: "",
              m0: "",
              "w-full": "",
              "text-left": "",
              px2: "",
              py1: "",
              onClick: ($event) => selectItem(index)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_SearchHashtagInfo, { hashtag: item }, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_SearchHashtagInfo, { hashtag: item }, null, 8, ["hashtag"])
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
      }
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tiptap/TiptapHashtagList.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SearchEmojiInfo",
  __ssrInlineRender: true,
  props: {
    emoji: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        flex: "~ gap3",
        "items-center": "",
        "text-base": ""
      }, _attrs))}><img width="20" height="20"${ssrRenderAttr("src", _ctx.emoji.src)} loading="lazy"><span shrink overflow-hidden leading-none text-base><span text-secondary>:</span>${ssrInterpolate(_ctx.emoji.title)}<span text-secondary>:</span></span></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/search/SearchEmojiInfo.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TiptapEmojiList",
  __ssrInlineRender: true,
  props: {
    items: {},
    command: {},
    isPending: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    const emojis = computed(() => {
      return [];
    });
    const selectedIndex = ref(0);
    watch(() => __props.items, () => {
      selectedIndex.value = 0;
    });
    function onKeyDown(event) {
      if (__props.items.length === 0)
        return false;
      if (event.key === "ArrowUp") {
        selectedIndex.value = (selectedIndex.value + __props.items.length - 1) % __props.items.length;
        return true;
      } else if (event.key === "ArrowDown") {
        selectedIndex.value = (selectedIndex.value + 1) % __props.items.length;
        return true;
      } else if (event.key === "Enter") {
        selectItem(selectedIndex.value);
        return true;
      }
      return false;
    }
    function selectItem(index) {
      const emoji = emojis.value[index];
      if (emoji)
        __props.command(emoji);
    }
    __expose({
      onKeyDown
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SearchEmojiInfo = _sfc_main$3;
      if (_ctx.isPending || _ctx.items.length) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          relative: "",
          "bg-base": "",
          "text-base": "",
          shadow: "",
          border: "~ base rounded",
          "text-sm": "",
          "py-2": "",
          "overflow-x-hidden": "",
          "overflow-y-auto": "",
          "max-h-100": "",
          "min-w-40": "",
          "max-w-50": ""
        }, _attrs))}>`);
        if (_ctx.isPending) {
          _push(`<div flex gap-1 items-center p2 animate-pulse><div i-ri:loader-2-line animate-spin></div><span>${ssrInterpolate(_ctx.$t("common.fetching"))}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.items.length) {
          _push(`<!--[-->`);
          ssrRenderList(unref(emojis), (item, index) => {
            _push(ssrRenderComponent(_sfc_main$1$1, {
              key: index,
              active: index === unref(selectedIndex),
              as: "button",
              class: index === unref(selectedIndex) ? "bg-active" : "text-secondary",
              block: "",
              m0: "",
              "w-full": "",
              "text-left": "",
              px2: "",
              py1: "",
              onClick: ($event) => selectItem(index)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_SearchEmojiInfo, { emoji: item }, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_SearchEmojiInfo, { emoji: item }, null, 8, ["emoji"])
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tiptap/TiptapEmojiList.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
function isCustomEmoji(emoji) {
  return !!emoji.custom;
}
({
  pluginKey: new PluginKey("hashtag"),
  char: "#",
  async items({ query }) {
    if (query.length === 0)
      return [];
    const paginator = useMastoClient().v2.search.list({
      q: query,
      type: "hashtags",
      limit: 25,
      resolve: false,
      excludeUnreviewed: true
    });
    return (await paginator.next()).value?.hashtags ?? [];
  },
  render: createSuggestionRenderer(_sfc_main$4)
});
({
  pluginKey: new PluginKey("emoji"),
  char: ":",
  async items({ query }) {
    return [];
  },
  command: ({ editor, props, range }) => {
    const emoji = props.emoji;
    editor.commands.deleteRange(range);
    if (isCustomEmoji(emoji)) {
      editor.commands.insertCustomEmoji({
        title: emoji.shortcode,
        src: emoji.url
      });
    } else {
      const skin = emoji.skins.find((skin2) => skin2.native !== void 0);
      if (skin)
        editor.commands.insertEmoji(skin.native);
    }
  },
  render: createSuggestionRenderer(_sfc_main$2)
});
function createSuggestionRenderer(component) {
  return () => {
    let renderer;
    let popup;
    return {
      onStart(props) {
        renderer = new VueRenderer(component, {
          props,
          editor: props.editor
        });
        if (!props.clientRect)
          return;
        popup = tippy((void 0).body, {
          getReferenceClientRect: props.clientRect,
          appendTo: () => (void 0).body,
          content: renderer.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start"
        });
      },
      // Use arrow function here because Nuxt will transform it incorrectly as Vue hook causing the build to fail
      onBeforeUpdate: (props) => {
        props.editor.isFocused && renderer.updateProps({ ...props, isPending: true });
      },
      onUpdate(props) {
        if (!props.editor.isFocused)
          return;
        renderer.updateProps({ ...props, isPending: false });
        if (!props.clientRect)
          return;
        popup?.setProps({
          getReferenceClientRect: props.clientRect
        });
      },
      onKeyDown(props) {
        if (props.event.key === "Escape") {
          popup?.hide();
          return true;
        }
        return renderer?.ref?.onKeyDown(props.event);
      },
      onExit() {
        popup?.destroy();
        renderer?.destroy();
      }
    };
  };
}
let parser;
const shikiParser = (options) => {
  const lang = options.language ?? "text";
  const { highlighter, promise } = useHighlighter(lang);
  if (!highlighter)
    return promise ?? [];
  if (!parser)
    parser = createParser(highlighter);
  return parser(options);
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TiptapCodeBlock",
  __ssrInlineRender: true,
  props: nodeViewProps,
  setup(__props) {
    const props = __props;
    const languages = [
      "c",
      "cpp",
      "csharp",
      "css",
      "dart",
      "go",
      "html",
      "java",
      "javascript",
      "jsx",
      "kotlin",
      "python",
      "rust",
      "svelte",
      "swift",
      "tsx",
      "typescript",
      "vue"
    ];
    const selectedLanguage = computed({
      get() {
        return props.node.attrs.language;
      },
      set(language) {
        props.updateAttributes({ language });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(NodeViewWrapper), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div relative my2${_scopeId}><select contenteditable="false" absolute top-1 right-1 rounded px2 op0 hover:op100 focus:op100 transition outline-none border="~ base"${_scopeId}><option${ssrRenderAttr("value", null)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedLanguage)) ? ssrLooseContain(unref(selectedLanguage), null) : ssrLooseEqual(unref(selectedLanguage), null)) ? " selected" : ""}${_scopeId}> plain </option><!--[-->`);
            ssrRenderList(languages, (language, index) => {
              _push2(`<option${ssrRenderAttr("value", language)}${_scopeId}>${ssrInterpolate(language)}</option>`);
            });
            _push2(`<!--]--></select><pre class="code-block"${_scopeId}><code${_scopeId}>`);
            _push2(ssrRenderComponent(unref(NodeViewContent), null, null, _parent2, _scopeId));
            _push2(`</code></pre></div>`);
          } else {
            return [
              createVNode("div", {
                relative: "",
                my2: ""
              }, [
                withDirectives(createVNode("select", {
                  "onUpdate:modelValue": ($event) => isRef(selectedLanguage) ? selectedLanguage.value = $event : null,
                  contenteditable: "false",
                  absolute: "",
                  "top-1": "",
                  "right-1": "",
                  rounded: "",
                  px2: "",
                  op0: "",
                  "hover:op100": "",
                  "focus:op100": "",
                  transition: "",
                  "outline-none": "",
                  border: "~ base"
                }, [
                  createVNode("option", { value: null }, " plain "),
                  (openBlock(), createBlock(Fragment, null, renderList(languages, (language, index) => {
                    return createVNode("option", {
                      key: index,
                      value: language
                    }, toDisplayString(language), 9, ["value"]);
                  }), 64))
                ], 8, ["onUpdate:modelValue"]), [
                  [vModelSelect, unref(selectedLanguage)]
                ]),
                createVNode("pre", { class: "code-block" }, [
                  createVNode("code", null, [
                    createVNode(unref(NodeViewContent))
                  ])
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tiptap/TiptapCodeBlock.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
proxy.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      defaultLanguage: null
    };
  },
  addProseMirrorPlugins() {
    return [
      createHighlightPlugin({ parser: shikiParser, nodeTypes: ["codeBlock"] })
    ];
  },
  addNodeView() {
    return VueNodeViewRenderer(_sfc_main$1);
  }
});
const inputRegex = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;
Node.create({
  name: "custom-emoji",
  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {}
    };
  },
  inline() {
    return this.options.inline;
  },
  group() {
    return this.options.inline ? "inline" : "block";
  },
  draggable: false,
  addAttributes() {
    return {
      "src": {
        default: null
      },
      "alt": {
        default: null
      },
      "title": {
        default: null
      },
      "width": {
        default: null
      },
      "height": {
        default: null
      },
      "data-emoji-id": {
        default: null
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: this.options.allowBase64 ? "img[src]" : 'img[src]:not([src^="data:"])'
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["img", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },
  addCommands() {
    return {
      insertCustomEmoji: (options) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options
        });
      }
    };
  },
  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => {
          const [, , alt, src, title] = match;
          return { src, alt, title };
        }
      })
    ];
  }
});
function wrapHandler(handler) {
  return (...args) => {
    try {
      return handler(...args);
    } catch (e) {
      return null;
    }
  };
}
function createEmojiRule(nodeRule, type) {
  const rule = nodeRule({
    find: emojiRegEx,
    type,
    getAttributes: (match) => {
      const [native] = match;
      return getEmojiAttributes(native);
    }
  });
  rule.handler = wrapHandler(rule.handler.bind(rule));
  return [rule];
}
Node.create({
  name: "em-emoji",
  inline: () => true,
  group: () => "inline",
  draggable: false,
  parseHTML() {
    return [
      {
        tag: "img.iconify-emoji"
      }
    ];
  },
  addAttributes() {
    return {
      alt: {
        default: null
      },
      src: {
        default: null
      },
      class: {
        default: null
      }
    };
  },
  renderHTML(args) {
    return ["img", mergeAttributes(this.options.HTMLAttributes, args.HTMLAttributes)];
  },
  addCommands() {
    return {
      insertEmoji: (code) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: getEmojiAttributes(code)
        });
      }
    };
  },
  addInputRules() {
    function emojiInputRule(config) {
      return new InputRule({
        find: config.find,
        handler: ({ state, range, match }) => {
          const attributes = callOrReturn(config.getAttributes, void 0, match) || {};
          const { tr } = state;
          const start = range.from;
          const end = range.to;
          tr.insert(start, config.type.create(attributes)).delete(
            tr.mapping.map(start),
            tr.mapping.map(end)
          );
          tr.scrollIntoView();
        }
      });
    }
    return createEmojiRule(emojiInputRule, this.type);
  },
  addPasteRules() {
    return createEmojiRule(nodePasteRule, this.type);
  }
});
function useTiptap(options) {
  return { editor: ref() };
}
const expiresInDefaultOptionIndex = 2;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PublishWidget",
  __ssrInlineRender: true,
  props: {
    draftKey: {},
    initial: { type: Function, default: getDefaultDraft },
    placeholder: {},
    inReplyToId: {},
    inReplyToVisibility: {},
    expanded: { type: Boolean, default: false },
    dialogLabelledBy: {}
  },
  emits: ["published"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const { t } = useI18n();
    const draftState = useDraft(__props.draftKey, __props.initial);
    const { draft } = draftState;
    const {
      isExceedingAttachmentLimit,
      isUploading,
      failedAttachments,
      isOverDropZone,
      uploadAttachments,
      pickAttachments,
      setDescription,
      removeAttachment,
      dropZoneRef
    } = useUploadMediaAttachment(draft);
    const { shouldExpanded, isExpanded, isSending, isPublishDisabled, publishDraft, failedMessages, preferredLanguage, publishSpoilerText } = usePublish(
      {
        draftState,
        ...{ expanded: toRef(() => __props.expanded), isUploading, initialDraft: toRef(() => __props.initial) }
      }
    );
    const { editor } = useTiptap({
      content: computed({
        get: () => draft.value.params.status,
        set: (newVal) => {
          draft.value.params.status = newVal;
          draft.value.lastUpdated = Date.now();
        }
      }),
      placeholder: computed(() => __props.placeholder ?? draft.value.params.inReplyToId ? t("placeholder.replying") : t("placeholder.default_1")),
      autofocus: shouldExpanded.value,
      onSubmit: publish,
      onFocus() {
        if (!isExpanded && draft.value.initialText) {
          editor.value?.chain().insertContent(`${draft.value.initialText} `).focus("end").run();
          draft.value.initialText = "";
        }
        isExpanded.value = true;
      },
      onPaste: handlePaste
    });
    function trimPollOptions() {
      const indexLastNonEmpty = draft.value.params.poll.options.findLastIndex((option) => option.trim().length > 0);
      const trimmedOptions = draft.value.params.poll.options.slice(0, indexLastNonEmpty + 1);
      if (currentInstance.value?.configuration && trimmedOptions.length >= currentInstance.value?.configuration?.polls.maxOptions)
        draft.value.params.poll.options = trimmedOptions;
      else
        draft.value.params.poll.options = [...trimmedOptions, ""];
    }
    function deletePollOption(index) {
      const newPollOptions = draft.value.params.poll.options.slice();
      newPollOptions.splice(index, 1);
      draft.value.params.poll.options = newPollOptions;
      trimPollOptions();
    }
    const expiresInOptions = computed(() => [
      {
        seconds: 1 * 60 * 60,
        label: t("time_ago_options.hour_future", 1)
      },
      {
        seconds: 2 * 60 * 60,
        label: t("time_ago_options.hour_future", 2)
      },
      {
        seconds: 1 * 24 * 60 * 60,
        label: t("time_ago_options.day_future", 1)
      },
      {
        seconds: 2 * 24 * 60 * 60,
        label: t("time_ago_options.day_future", 2)
      },
      {
        seconds: 7 * 24 * 60 * 60,
        label: t("time_ago_options.day_future", 7)
      }
    ]);
    const characterCount = computed(() => {
      const text = htmlToText(editor.value?.getHTML() || "");
      let length = stringLength(text);
      const linkRegex = /(https?:\/\/(www\.)?|xmpp:)\S+/g;
      const countableMentionRegex = /(^|[^/\w])@(([a-z0-9_]+)@[a-z0-9.-]+[a-z0-9]+)/ig;
      const maxLength = 23;
      for (const [fullMatch] of text.matchAll(linkRegex))
        length -= fullMatch.length - Math.min(maxLength, fullMatch.length);
      for (const [fullMatch, before, _handle, username] of text.matchAll(countableMentionRegex))
        length -= fullMatch.length - (before + username).length - 1;
      if (draft.value.mentions) {
        length += draft.value.mentions.map((mention) => {
          const [handle] = mention.split("@");
          return `@${handle}`;
        }).join(" ").length + 1;
      }
      length += stringLength(publishSpoilerText.value);
      return length;
    });
    const isExceedingCharacterLimit = computed(() => {
      return characterCount.value > characterLimit.value;
    });
    const postLanguageDisplay = computed(() => languagesNameList.find((i) => i.code === (draft.value.params.language || preferredLanguage))?.nativeName);
    const isDM = computed(() => draft.value.params.visibility === "direct");
    async function handlePaste(evt) {
      const files = evt.clipboardData?.files;
      if (!files || files.length === 0)
        return;
      evt.preventDefault();
      await uploadAttachments(Array.from(files));
    }
    function insertEmoji(name) {
      editor.value?.chain().focus().insertEmoji(name).run();
    }
    function insertCustomEmoji(image) {
      editor.value?.chain().focus().insertCustomEmoji(image).run();
    }
    async function toggleSensitive() {
      draft.value.params.sensitive = !draft.value.params.sensitive;
    }
    async function publish() {
      const status = await publishDraft();
      if (status)
        emit("published", status);
    }
    __expose({
      focusEditor: () => {
        editor.value?.commands?.focus?.();
      }
    });
    function stopQuestionMarkPropagation(e) {
      if (e.key === "?")
        e.stopImmediatePropagation();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AccountBigAvatar = _sfc_main$d;
      const _component_ContentMentionGroup = _sfc_main$q;
      const _component_CommonErrorMessage = _sfc_main$e;
      const _component_CommonTooltip = _sfc_main$o;
      const _component_PublishAttachment = _sfc_main$9;
      const _component_PublishEmojiPicker = __nuxt_component_11;
      const _component_CommonDropdown = _sfc_main$b;
      const _component_CommonCheckbox = _sfc_main$f;
      const _component_CommonDropdownItem = _sfc_main$6$1;
      const _component_PublishEditorTools = _sfc_main$8;
      const _component_PublishCharacterCounter = _sfc_main$a;
      const _component_PublishLanguagePicker = _sfc_main$7;
      const _component_PublishVisibilityPicker = _sfc_main$6;
      if (("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) && ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser))) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          flex: "~ col gap-4",
          py3: "",
          px2: "",
          "sm:px4": "",
          "aria-roledescription": "publish-widget"
        }, _attrs))} data-v-1a1643b1>`);
        if (unref(draft).editingStatus) {
          _push(`<div id="state-editing" text-secondary self-center data-v-1a1643b1>${ssrInterpolate(_ctx.$t("state.editing"))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div flex gap-3 flex-1 data-v-1a1643b1>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          "self-start": "",
          to: ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)).account)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_AccountBigAvatar, {
                account: ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)).account,
                square: ""
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_AccountBigAvatar, {
                  account: ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)).account,
                  square: ""
                }, null, 8, ["account"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div flex w-0 flex-col gap-3 flex-1 border="2 dashed transparent" class="${ssrRenderClass([unref(isSending) ? "pointer-events-none" : "", unref(isOverDropZone) ? "!border-primary" : ""])}" data-v-1a1643b1>`);
        if (unref(draft).mentions?.length && unref(shouldExpanded)) {
          _push(ssrRenderComponent(_component_ContentMentionGroup, { replying: "" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<!--[-->`);
                ssrRenderList(unref(draft).mentions, (m, i) => {
                  _push2(`<button text-primary hover:color-red data-v-1a1643b1${_scopeId}>${ssrInterpolate(("accountToShortHandle" in _ctx ? _ctx.accountToShortHandle : unref(accountToShortHandle))(m))}</button>`);
                });
                _push2(`<!--]-->`);
              } else {
                return [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(draft).mentions, (m, i) => {
                    return openBlock(), createBlock("button", {
                      key: m,
                      "text-primary": "",
                      "hover:color-red": "",
                      onClick: ($event) => unref(draft).mentions?.splice(i, 1)
                    }, toDisplayString(("accountToShortHandle" in _ctx ? _ctx.accountToShortHandle : unref(accountToShortHandle))(m)), 9, ["onClick"]);
                  }), 128))
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(draft).params.sensitive) {
          _push(`<div data-v-1a1643b1><input${ssrRenderAttr("value", unref(publishSpoilerText))} type="text"${ssrRenderAttr("placeholder", _ctx.$t("placeholder.content_warning"))} p2 border-rounded w-full bg-transparent outline-none border="~ base" data-v-1a1643b1></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(failedMessages).length > 0) {
          _push(ssrRenderComponent(_component_CommonErrorMessage, { "described-by": "publish-failed" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<header id="publish-failed" flex justify-between data-v-1a1643b1${_scopeId}><div flex items-center gap-x-2 font-bold data-v-1a1643b1${_scopeId}><div aria-hidden="true" i-ri:error-warning-fill data-v-1a1643b1${_scopeId}></div><p data-v-1a1643b1${_scopeId}>${ssrInterpolate(_ctx.$t("state.publish_failed"))}</p></div>`);
                _push2(ssrRenderComponent(_component_CommonTooltip, {
                  placement: "bottom",
                  content: _ctx.$t("action.clear_publish_failed")
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<button flex rounded-4 p1 hover:bg-active cursor-pointer transition-100${ssrRenderAttr("aria-label", _ctx.$t("action.clear_publish_failed"))} data-v-1a1643b1${_scopeId2}><span aria-hidden="true" w="1.75em" h="1.75em" i-ri:close-line data-v-1a1643b1${_scopeId2}></span></button>`);
                    } else {
                      return [
                        createVNode("button", {
                          flex: "",
                          "rounded-4": "",
                          p1: "",
                          "hover:bg-active": "",
                          "cursor-pointer": "",
                          "transition-100": "",
                          "aria-label": _ctx.$t("action.clear_publish_failed"),
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
                }, _parent2, _scopeId));
                _push2(`</header><ol ps-2 sm:ps-1 data-v-1a1643b1${_scopeId}><!--[-->`);
                ssrRenderList(unref(failedMessages), (error, i) => {
                  _push2(`<li flex="~ col sm:row" gap-y-1 sm:gap-x-2 data-v-1a1643b1${_scopeId}><strong data-v-1a1643b1${_scopeId}>${ssrInterpolate(i + 1)}.</strong><span data-v-1a1643b1${_scopeId}>${ssrInterpolate(error)}</span></li>`);
                });
                _push2(`<!--]--></ol>`);
              } else {
                return [
                  createVNode("header", {
                    id: "publish-failed",
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
                      createVNode("p", null, toDisplayString(_ctx.$t("state.publish_failed")), 1)
                    ]),
                    createVNode(_component_CommonTooltip, {
                      placement: "bottom",
                      content: _ctx.$t("action.clear_publish_failed")
                    }, {
                      default: withCtx(() => [
                        createVNode("button", {
                          flex: "",
                          "rounded-4": "",
                          p1: "",
                          "hover:bg-active": "",
                          "cursor-pointer": "",
                          "transition-100": "",
                          "aria-label": _ctx.$t("action.clear_publish_failed"),
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
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<div relative flex-1 flex flex-col data-v-1a1643b1>`);
        _push(ssrRenderComponent(unref(EditorContent), {
          editor: unref(editor),
          flex: "",
          "max-w-full": "",
          class: {
            "min-h-30 md:max-h-[calc(100vh-200px)] sm:max-h-[calc(100vh-400px)] max-h-35 of-y-auto overscroll-contain": unref(shouldExpanded),
            "pt2 pb0.5 px3.5 bg-dm rounded-4 me--1 ms--1 mt--1": unref(isDM)
          },
          onKeydown: [stopQuestionMarkPropagation, ($event) => unref(editor)?.commands.blur()]
        }, null, _parent));
        _push(`</div>`);
        if (unref(isUploading)) {
          _push(`<div flex gap-1 items-center text-sm p1 text-primary data-v-1a1643b1><div animate-spin preserve-3d data-v-1a1643b1><div i-ri:loader-2-fill data-v-1a1643b1></div></div> ${ssrInterpolate(_ctx.$t("state.uploading"))}</div>`);
        } else if (unref(failedAttachments).length > 0) {
          _push(ssrRenderComponent(_component_CommonErrorMessage, {
            "described-by": unref(isExceedingAttachmentLimit) ? "upload-failed uploads-per-post" : "upload-failed"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<header id="upload-failed" flex justify-between data-v-1a1643b1${_scopeId}><div flex items-center gap-x-2 font-bold data-v-1a1643b1${_scopeId}><div aria-hidden="true" i-ri:error-warning-fill data-v-1a1643b1${_scopeId}></div><p data-v-1a1643b1${_scopeId}>${ssrInterpolate(_ctx.$t("state.upload_failed"))}</p></div>`);
                _push2(ssrRenderComponent(_component_CommonTooltip, {
                  placement: "bottom",
                  content: _ctx.$t("action.clear_upload_failed")
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<button flex rounded-4 p1 hover:bg-active cursor-pointer transition-100${ssrRenderAttr("aria-label", _ctx.$t("action.clear_upload_failed"))} data-v-1a1643b1${_scopeId2}><span aria-hidden="true" w="1.75em" h="1.75em" i-ri:close-line data-v-1a1643b1${_scopeId2}></span></button>`);
                    } else {
                      return [
                        createVNode("button", {
                          flex: "",
                          "rounded-4": "",
                          p1: "",
                          "hover:bg-active": "",
                          "cursor-pointer": "",
                          "transition-100": "",
                          "aria-label": _ctx.$t("action.clear_upload_failed"),
                          onClick: ($event) => failedAttachments.value = []
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
                }, _parent2, _scopeId));
                _push2(`</header>`);
                if (unref(isExceedingAttachmentLimit)) {
                  _push2(`<div id="uploads-per-post" ps-2 sm:ps-1 text-small data-v-1a1643b1${_scopeId}>${ssrInterpolate(_ctx.$t("state.attachments_exceed_server_limit"))}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<ol ps-2 sm:ps-1 data-v-1a1643b1${_scopeId}><!--[-->`);
                ssrRenderList(unref(failedAttachments), (error) => {
                  _push2(`<li flex="~ col sm:row" gap-y-1 sm:gap-x-2 data-v-1a1643b1${_scopeId}><strong data-v-1a1643b1${_scopeId}>${ssrInterpolate(error[1])}:</strong><span data-v-1a1643b1${_scopeId}>${ssrInterpolate(error[0])}</span></li>`);
                });
                _push2(`<!--]--></ol>`);
              } else {
                return [
                  createVNode("header", {
                    id: "upload-failed",
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
                      createVNode("p", null, toDisplayString(_ctx.$t("state.upload_failed")), 1)
                    ]),
                    createVNode(_component_CommonTooltip, {
                      placement: "bottom",
                      content: _ctx.$t("action.clear_upload_failed")
                    }, {
                      default: withCtx(() => [
                        createVNode("button", {
                          flex: "",
                          "rounded-4": "",
                          p1: "",
                          "hover:bg-active": "",
                          "cursor-pointer": "",
                          "transition-100": "",
                          "aria-label": _ctx.$t("action.clear_upload_failed"),
                          onClick: ($event) => failedAttachments.value = []
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
                  unref(isExceedingAttachmentLimit) ? (openBlock(), createBlock("div", {
                    key: 0,
                    id: "uploads-per-post",
                    "ps-2": "",
                    "sm:ps-1": "",
                    "text-small": ""
                  }, toDisplayString(_ctx.$t("state.attachments_exceed_server_limit")), 1)) : createCommentVNode("", true),
                  createVNode("ol", {
                    "ps-2": "",
                    "sm:ps-1": ""
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(failedAttachments), (error) => {
                      return openBlock(), createBlock("li", {
                        key: error[0],
                        flex: "~ col sm:row",
                        "gap-y-1": "",
                        "sm:gap-x-2": ""
                      }, [
                        createVNode("strong", null, toDisplayString(error[1]) + ":", 1),
                        createVNode("span", null, toDisplayString(error[0]), 1)
                      ]);
                    }), 128))
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(draft).attachments.length) {
          _push(`<div flex="~ col gap-2" overflow-auto data-v-1a1643b1><!--[-->`);
          ssrRenderList(unref(draft).attachments, (att, idx) => {
            _push(ssrRenderComponent(_component_PublishAttachment, {
              key: att.id,
              attachment: att,
              "dialog-labelled-by": _ctx.dialogLabelledBy ?? (unref(draft).editingStatus ? "state-editing" : void 0),
              onRemove: ($event) => unref(removeAttachment)(idx),
              onSetDescription: ($event) => unref(setDescription)(att, $event)
            }, null, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div flex gap-4 data-v-1a1643b1><div w-12 h-full sm:block hidden data-v-1a1643b1></div><div flex="~ col 1" max-w-full data-v-1a1643b1>`);
        if (unref(isExpanded) && unref(draft).params.poll) {
          _push(`<form my-4 flex="~ 1 col" gap-3 m="s--1" data-v-1a1643b1><!--[-->`);
          ssrRenderList(unref(draft).params.poll.options, (option, index) => {
            _push(`<div flex="~ row" gap-3 data-v-1a1643b1><input${ssrRenderAttr("value", option)} bg-base border="~ base" flex-1 h10 pe-4 rounded-2 w-full flex="~ row" items-center relative focus-within:box-shadow-outline gap-3 px-4 py-2${ssrRenderAttr("placeholder", _ctx.$t("polls.option_placeholder", { current: index + 1, max: ("currentInstance" in _ctx ? _ctx.currentInstance : unref(currentInstance))?.configuration?.polls.maxOptions }))} class="option-input" data-v-1a1643b1>`);
            _push(ssrRenderComponent(_component_CommonTooltip, {
              placement: "top",
              content: _ctx.$t("polls.remove_option"),
              class: "delete-button"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<button btn-action-icon class="hover:bg-red/75"${ssrIncludeBooleanAttr(index === unref(draft).params.poll.options.length - 1 && (index + 1 !== ("currentInstance" in _ctx ? _ctx.currentInstance : unref(currentInstance))?.configuration?.polls.maxOptions || unref(draft).params.poll.options[index].length === 0)) ? " disabled" : ""} data-v-1a1643b1${_scopeId}><div i-ri:delete-bin-line data-v-1a1643b1${_scopeId}></div></button>`);
                } else {
                  return [
                    createVNode("button", {
                      "btn-action-icon": "",
                      class: "hover:bg-red/75",
                      disabled: index === unref(draft).params.poll.options.length - 1 && (index + 1 !== ("currentInstance" in _ctx ? _ctx.currentInstance : unref(currentInstance))?.configuration?.polls.maxOptions || unref(draft).params.poll.options[index].length === 0),
                      onClick: withModifiers(($event) => deletePollOption(index), ["prevent"])
                    }, [
                      createVNode("div", { "i-ri:delete-bin-line": "" })
                    ], 8, ["disabled", "onClick"])
                  ];
                }
              }),
              _: 2
            }, _parent));
            if (("currentInstance" in _ctx ? _ctx.currentInstance : unref(currentInstance))?.configuration?.polls.maxCharactersPerOption) {
              _push(`<span class="char-limit-radial" aspect-ratio-1 h-10 style="${ssrRenderStyle({ background: `radial-gradient(closest-side, rgba(var(--rgb-bg-base)) 79%, transparent 80% 100%), conic-gradient(${unref(draft).params.poll.options[index].length / ("currentInstance" in _ctx ? _ctx.currentInstance : unref(currentInstance))?.configuration?.polls.maxCharactersPerOption > 1 ? "var(--c-danger)" : "var(--c-primary)"} ${unref(draft).params.poll.options[index].length / ("currentInstance" in _ctx ? _ctx.currentInstance : unref(currentInstance))?.configuration?.polls.maxCharactersPerOption * 100}%, var(--c-primary-fade) 0)` })}" data-v-1a1643b1>${ssrInterpolate(unref(draft).params.poll.options[index].length)}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></form>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(shouldExpanded)) {
          _push(`<div flex="~ gap-1 1 wrap" m="s--1" pt-2 justify="end" max-w-full border="t base" data-v-1a1643b1>`);
          _push(ssrRenderComponent(_component_PublishEmojiPicker, {
            onSelect: insertEmoji,
            onSelectCustom: insertCustomEmoji
          }, {}, _parent));
          if (unref(draft).params.poll === void 0) {
            _push(ssrRenderComponent(_component_CommonTooltip, {
              placement: "top",
              content: _ctx.$t("tooltip.add_media"),
              "no-auto-focus": ""
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<button btn-action-icon${ssrRenderAttr("aria-label", _ctx.$t("tooltip.add_media"))} data-v-1a1643b1${_scopeId}><div i-ri:image-add-line data-v-1a1643b1${_scopeId}></div></button>`);
                } else {
                  return [
                    createVNode("button", {
                      "btn-action-icon": "",
                      "aria-label": _ctx.$t("tooltip.add_media"),
                      onClick: unref(pickAttachments)
                    }, [
                      createVNode("div", { "i-ri:image-add-line": "" })
                    ], 8, ["aria-label", "onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          if (unref(draft).attachments.length === 0) {
            _push(`<!--[-->`);
            if (!unref(draft).params.poll) {
              _push(ssrRenderComponent(_component_CommonTooltip, {
                placement: "top",
                content: _ctx.$t("polls.create"),
                "no-auto-focus": ""
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`<button btn-action-icon${ssrRenderAttr("aria-label", _ctx.$t("polls.create"))} data-v-1a1643b1${_scopeId}><div i-ri:chat-poll-line data-v-1a1643b1${_scopeId}></div></button>`);
                  } else {
                    return [
                      createVNode("button", {
                        "btn-action-icon": "",
                        "aria-label": _ctx.$t("polls.create"),
                        onClick: ($event) => unref(draft).params.poll = { options: [""], expiresIn: unref(expiresInOptions)[expiresInDefaultOptionIndex].seconds }
                      }, [
                        createVNode("div", { "i-ri:chat-poll-line": "" })
                      ], 8, ["aria-label", "onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent));
            } else {
              _push(`<div rounded-full b-1 border-dark flex="~ row" gap-1 data-v-1a1643b1>`);
              _push(ssrRenderComponent(_component_CommonTooltip, {
                placement: "top",
                content: _ctx.$t("polls.cancel"),
                "no-auto-focus": ""
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`<button btn-action-icon b-r border-dark${ssrRenderAttr("aria-label", _ctx.$t("polls.cancel"))} data-v-1a1643b1${_scopeId}><div i-ri:close-line data-v-1a1643b1${_scopeId}></div></button>`);
                  } else {
                    return [
                      createVNode("button", {
                        "btn-action-icon": "",
                        "b-r": "",
                        "border-dark": "",
                        "aria-label": _ctx.$t("polls.cancel"),
                        onClick: ($event) => unref(draft).params.poll = void 0
                      }, [
                        createVNode("div", { "i-ri:close-line": "" })
                      ], 8, ["aria-label", "onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent));
              _push(ssrRenderComponent(_component_CommonDropdown, { placement: "top" }, {
                popper: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`<div flex="~ col" gap-1 p-2 data-v-1a1643b1${_scopeId}>`);
                    _push2(ssrRenderComponent(_component_CommonCheckbox, {
                      modelValue: unref(draft).params.poll.multiple,
                      "onUpdate:modelValue": ($event) => unref(draft).params.poll.multiple = $event,
                      label: unref(draft).params.poll.multiple ? _ctx.$t("polls.disallow_multiple") : _ctx.$t("polls.allow_multiple"),
                      "px-2": "",
                      "gap-3": "",
                      "h-9": "",
                      flex: "",
                      "justify-center": "",
                      "hover:bg-active": "",
                      "rounded-full": "",
                      "icon-checked": "i-ri:checkbox-multiple-blank-line",
                      "icon-unchecked": "i-ri:checkbox-blank-circle-line"
                    }, null, _parent2, _scopeId));
                    _push2(ssrRenderComponent(_component_CommonCheckbox, {
                      modelValue: unref(draft).params.poll.hideTotals,
                      "onUpdate:modelValue": ($event) => unref(draft).params.poll.hideTotals = $event,
                      label: unref(draft).params.poll.hideTotals ? _ctx.$t("polls.show_votes") : _ctx.$t("polls.hide_votes"),
                      "px-2": "",
                      "gap-3": "",
                      "h-9": "",
                      flex: "",
                      "justify-center": "",
                      "hover:bg-active": "",
                      "rounded-full": "",
                      "icon-checked": "i-ri:eye-close-line",
                      "icon-unchecked": "i-ri:eye-line"
                    }, null, _parent2, _scopeId));
                    _push2(`</div>`);
                  } else {
                    return [
                      createVNode("div", {
                        flex: "~ col",
                        "gap-1": "",
                        "p-2": ""
                      }, [
                        createVNode(_component_CommonCheckbox, {
                          modelValue: unref(draft).params.poll.multiple,
                          "onUpdate:modelValue": ($event) => unref(draft).params.poll.multiple = $event,
                          label: unref(draft).params.poll.multiple ? _ctx.$t("polls.disallow_multiple") : _ctx.$t("polls.allow_multiple"),
                          "px-2": "",
                          "gap-3": "",
                          "h-9": "",
                          flex: "",
                          "justify-center": "",
                          "hover:bg-active": "",
                          "rounded-full": "",
                          "icon-checked": "i-ri:checkbox-multiple-blank-line",
                          "icon-unchecked": "i-ri:checkbox-blank-circle-line"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]),
                        createVNode(_component_CommonCheckbox, {
                          modelValue: unref(draft).params.poll.hideTotals,
                          "onUpdate:modelValue": ($event) => unref(draft).params.poll.hideTotals = $event,
                          label: unref(draft).params.poll.hideTotals ? _ctx.$t("polls.show_votes") : _ctx.$t("polls.hide_votes"),
                          "px-2": "",
                          "gap-3": "",
                          "h-9": "",
                          flex: "",
                          "justify-center": "",
                          "hover:bg-active": "",
                          "rounded-full": "",
                          "icon-checked": "i-ri:eye-close-line",
                          "icon-unchecked": "i-ri:eye-line"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                      ])
                    ];
                  }
                }),
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(ssrRenderComponent(_component_CommonTooltip, {
                      placement: "top",
                      content: _ctx.$t("polls.settings"),
                      "no-auto-focus": ""
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`<button${ssrRenderAttr("aria-label", _ctx.$t("polls.settings"))} btn-action-icon w-12 data-v-1a1643b1${_scopeId2}><div i-ri:list-settings-line data-v-1a1643b1${_scopeId2}></div><div i-ri:arrow-down-s-line text-sm text-secondary me--1 data-v-1a1643b1${_scopeId2}></div></button>`);
                        } else {
                          return [
                            createVNode("button", {
                              "aria-label": _ctx.$t("polls.settings"),
                              "btn-action-icon": "",
                              "w-12": ""
                            }, [
                              createVNode("div", { "i-ri:list-settings-line": "" }),
                              createVNode("div", {
                                "i-ri:arrow-down-s-line": "",
                                "text-sm": "",
                                "text-secondary": "",
                                "me--1": ""
                              })
                            ], 8, ["aria-label"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent2, _scopeId));
                  } else {
                    return [
                      createVNode(_component_CommonTooltip, {
                        placement: "top",
                        content: _ctx.$t("polls.settings"),
                        "no-auto-focus": ""
                      }, {
                        default: withCtx(() => [
                          createVNode("button", {
                            "aria-label": _ctx.$t("polls.settings"),
                            "btn-action-icon": "",
                            "w-12": ""
                          }, [
                            createVNode("div", { "i-ri:list-settings-line": "" }),
                            createVNode("div", {
                              "i-ri:arrow-down-s-line": "",
                              "text-sm": "",
                              "text-secondary": "",
                              "me--1": ""
                            })
                          ], 8, ["aria-label"])
                        ]),
                        _: 1
                      }, 8, ["content"])
                    ];
                  }
                }),
                _: 1
              }, _parent));
              _push(ssrRenderComponent(_component_CommonDropdown, { placement: "bottom" }, {
                popper: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`<!--[-->`);
                    ssrRenderList(unref(expiresInOptions), (expiresInOption) => {
                      _push2(ssrRenderComponent(_component_CommonDropdownItem, {
                        key: expiresInOption.seconds,
                        text: expiresInOption.label,
                        checked: unref(draft).params.poll.expiresIn === expiresInOption.seconds,
                        onClick: ($event) => unref(draft).params.poll.expiresIn = expiresInOption.seconds
                      }, null, _parent2, _scopeId));
                    });
                    _push2(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(expiresInOptions), (expiresInOption) => {
                        return openBlock(), createBlock(_component_CommonDropdownItem, {
                          key: expiresInOption.seconds,
                          text: expiresInOption.label,
                          checked: unref(draft).params.poll.expiresIn === expiresInOption.seconds,
                          onClick: ($event) => unref(draft).params.poll.expiresIn = expiresInOption.seconds
                        }, null, 8, ["text", "checked", "onClick"]);
                      }), 128))
                    ];
                  }
                }),
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(ssrRenderComponent(_component_CommonTooltip, {
                      placement: "top",
                      content: _ctx.$t("polls.expiration"),
                      "no-auto-focus": ""
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`<button${ssrRenderAttr("aria-label", _ctx.$t("polls.expiration"))} btn-action-icon w-12 data-v-1a1643b1${_scopeId2}><div i-ri:hourglass-line data-v-1a1643b1${_scopeId2}></div><div i-ri:arrow-down-s-line text-sm text-secondary me--1 data-v-1a1643b1${_scopeId2}></div></button>`);
                        } else {
                          return [
                            createVNode("button", {
                              "aria-label": _ctx.$t("polls.expiration"),
                              "btn-action-icon": "",
                              "w-12": ""
                            }, [
                              createVNode("div", { "i-ri:hourglass-line": "" }),
                              createVNode("div", {
                                "i-ri:arrow-down-s-line": "",
                                "text-sm": "",
                                "text-secondary": "",
                                "me--1": ""
                              })
                            ], 8, ["aria-label"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent2, _scopeId));
                  } else {
                    return [
                      createVNode(_component_CommonTooltip, {
                        placement: "top",
                        content: _ctx.$t("polls.expiration"),
                        "no-auto-focus": ""
                      }, {
                        default: withCtx(() => [
                          createVNode("button", {
                            "aria-label": _ctx.$t("polls.expiration"),
                            "btn-action-icon": "",
                            "w-12": ""
                          }, [
                            createVNode("div", { "i-ri:hourglass-line": "" }),
                            createVNode("div", {
                              "i-ri:arrow-down-s-line": "",
                              "text-sm": "",
                              "text-secondary": "",
                              "me--1": ""
                            })
                          ], 8, ["aria-label"])
                        ]),
                        _: 1
                      }, 8, ["content"])
                    ];
                  }
                }),
                _: 1
              }, _parent));
              _push(`</div>`);
            }
            _push(`<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          if (unref(editor)) {
            _push(ssrRenderComponent(_component_PublishEditorTools, { editor: unref(editor) }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`<div flex-auto data-v-1a1643b1></div>`);
          _push(ssrRenderComponent(_component_PublishCharacterCounter, {
            max: "characterLimit" in _ctx ? _ctx.characterLimit : unref(characterLimit),
            length: unref(characterCount)
          }, null, _parent));
          _push(ssrRenderComponent(_component_CommonTooltip, {
            placement: "top",
            content: _ctx.$t("tooltip.change_language"),
            "no-auto-focus": ""
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_CommonDropdown, {
                  placement: "bottom",
                  "auto-boundary-max-size": ""
                }, {
                  popper: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_PublishLanguagePicker, {
                        modelValue: unref(draft).params.language,
                        "onUpdate:modelValue": ($event) => unref(draft).params.language = $event,
                        "min-w-80": ""
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_PublishLanguagePicker, {
                          modelValue: unref(draft).params.language,
                          "onUpdate:modelValue": ($event) => unref(draft).params.language = $event,
                          "min-w-80": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ];
                    }
                  }),
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<button btn-action-icon${ssrRenderAttr("aria-label", _ctx.$t("tooltip.change_language"))} w-max mr1 data-v-1a1643b1${_scopeId2}>`);
                      if (unref(postLanguageDisplay)) {
                        _push3(`<span text-secondary text-sm ml1 data-v-1a1643b1${_scopeId2}>${ssrInterpolate(unref(postLanguageDisplay))}</span>`);
                      } else {
                        _push3(`<div i-ri:translate-2 data-v-1a1643b1${_scopeId2}></div>`);
                      }
                      _push3(`<div i-ri:arrow-down-s-line text-sm text-secondary me--1 data-v-1a1643b1${_scopeId2}></div></button>`);
                    } else {
                      return [
                        createVNode("button", {
                          "btn-action-icon": "",
                          "aria-label": _ctx.$t("tooltip.change_language"),
                          "w-max": "",
                          mr1: ""
                        }, [
                          unref(postLanguageDisplay) ? (openBlock(), createBlock("span", {
                            key: 0,
                            "text-secondary": "",
                            "text-sm": "",
                            ml1: ""
                          }, toDisplayString(unref(postLanguageDisplay)), 1)) : (openBlock(), createBlock("div", {
                            key: 1,
                            "i-ri:translate-2": ""
                          })),
                          createVNode("div", {
                            "i-ri:arrow-down-s-line": "",
                            "text-sm": "",
                            "text-secondary": "",
                            "me--1": ""
                          })
                        ], 8, ["aria-label"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_CommonDropdown, {
                    placement: "bottom",
                    "auto-boundary-max-size": ""
                  }, {
                    popper: withCtx(() => [
                      createVNode(_component_PublishLanguagePicker, {
                        modelValue: unref(draft).params.language,
                        "onUpdate:modelValue": ($event) => unref(draft).params.language = $event,
                        "min-w-80": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    default: withCtx(() => [
                      createVNode("button", {
                        "btn-action-icon": "",
                        "aria-label": _ctx.$t("tooltip.change_language"),
                        "w-max": "",
                        mr1: ""
                      }, [
                        unref(postLanguageDisplay) ? (openBlock(), createBlock("span", {
                          key: 0,
                          "text-secondary": "",
                          "text-sm": "",
                          ml1: ""
                        }, toDisplayString(unref(postLanguageDisplay)), 1)) : (openBlock(), createBlock("div", {
                          key: 1,
                          "i-ri:translate-2": ""
                        })),
                        createVNode("div", {
                          "i-ri:arrow-down-s-line": "",
                          "text-sm": "",
                          "text-secondary": "",
                          "me--1": ""
                        })
                      ], 8, ["aria-label"])
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_CommonTooltip, {
            placement: "top",
            content: _ctx.$t("tooltip.add_content_warning"),
            "no-auto-focus": ""
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<button btn-action-icon${ssrRenderAttr("aria-label", _ctx.$t("tooltip.add_content_warning"))} data-v-1a1643b1${_scopeId}>`);
                if (unref(draft).params.sensitive) {
                  _push2(`<div i-ri:alarm-warning-fill text-orange data-v-1a1643b1${_scopeId}></div>`);
                } else {
                  _push2(`<div i-ri:alarm-warning-line data-v-1a1643b1${_scopeId}></div>`);
                }
                _push2(`</button>`);
              } else {
                return [
                  createVNode("button", {
                    "btn-action-icon": "",
                    "aria-label": _ctx.$t("tooltip.add_content_warning"),
                    onClick: toggleSensitive
                  }, [
                    unref(draft).params.sensitive ? (openBlock(), createBlock("div", {
                      key: 0,
                      "i-ri:alarm-warning-fill": "",
                      "text-orange": ""
                    })) : (openBlock(), createBlock("div", {
                      key: 1,
                      "i-ri:alarm-warning-line": ""
                    }))
                  ], 8, ["aria-label"])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_PublishVisibilityPicker, {
            modelValue: unref(draft).params.visibility,
            "onUpdate:modelValue": ($event) => unref(draft).params.visibility = $event,
            editing: !!unref(draft).editingStatus
          }, {
            default: withCtx(({ visibility }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<button${ssrIncludeBooleanAttr(!!unref(draft).editingStatus) ? " disabled" : ""}${ssrRenderAttr("aria-label", _ctx.$t("tooltip.change_content_visibility"))} btn-action-icon class="${ssrRenderClass({ "w-12": !unref(draft).editingStatus })}" data-v-1a1643b1${_scopeId}><div class="${ssrRenderClass(visibility.icon)}" data-v-1a1643b1${_scopeId}></div>`);
                if (!unref(draft).editingStatus) {
                  _push2(`<div i-ri:arrow-down-s-line text-sm text-secondary me--1 data-v-1a1643b1${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</button>`);
              } else {
                return [
                  createVNode("button", {
                    disabled: !!unref(draft).editingStatus,
                    "aria-label": _ctx.$t("tooltip.change_content_visibility"),
                    "btn-action-icon": "",
                    class: { "w-12": !unref(draft).editingStatus }
                  }, [
                    createVNode("div", {
                      class: visibility.icon
                    }, null, 2),
                    !unref(draft).editingStatus ? (openBlock(), createBlock("div", {
                      key: 0,
                      "i-ri:arrow-down-s-line": "",
                      "text-sm": "",
                      "text-secondary": "",
                      "me--1": ""
                    })) : createCommentVNode("", true)
                  ], 10, ["disabled", "aria-label"])
                ];
              }
            }),
            _: 1
          }, _parent));
          if (unref(failedMessages).length > 0) {
            _push(ssrRenderComponent(_component_CommonTooltip, {
              id: "publish-failed-tooltip",
              placement: "top",
              content: _ctx.$t("tooltip.publish_failed"),
              "no-auto-focus": ""
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<button btn-danger rounded-3 text-sm w-full flex="~ gap1" items-center md:w-fit aria-describedby="publish-failed-tooltip" data-v-1a1643b1${_scopeId}><span block data-v-1a1643b1${_scopeId}><div block i-carbon:face-dizzy-filled data-v-1a1643b1${_scopeId}></div></span><span data-v-1a1643b1${_scopeId}>${ssrInterpolate(_ctx.$t("state.publish_failed"))}</span></button>`);
                } else {
                  return [
                    createVNode("button", {
                      "btn-danger": "",
                      "rounded-3": "",
                      "text-sm": "",
                      "w-full": "",
                      flex: "~ gap1",
                      "items-center": "",
                      "md:w-fit": "",
                      "aria-describedby": "publish-failed-tooltip"
                    }, [
                      createVNode("span", { block: "" }, [
                        createVNode("div", {
                          block: "",
                          "i-carbon:face-dizzy-filled": ""
                        })
                      ]),
                      createVNode("span", null, toDisplayString(_ctx.$t("state.publish_failed")), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(ssrRenderComponent(_component_CommonTooltip, {
              id: "publish-tooltip",
              placement: "top",
              content: _ctx.$t("tooltip.add_publishable_content"),
              disabled: !(unref(isPublishDisabled) || unref(isExceedingCharacterLimit)),
              "no-auto-focus": ""
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<button btn-solid rounded-3 text-sm w-full flex="~ gap1" items-center md:w-fit class="publish-button"${ssrRenderAttr("aria-disabled", unref(isPublishDisabled) || unref(isExceedingCharacterLimit))} aria-describedby="publish-tooltip" data-v-1a1643b1${_scopeId}>`);
                  if (unref(isSending)) {
                    _push2(`<span block animate-spin preserve-3d data-v-1a1643b1${_scopeId}><div block i-ri:loader-2-fill data-v-1a1643b1${_scopeId}></div></span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (unref(failedMessages).length) {
                    _push2(`<span block data-v-1a1643b1${_scopeId}><div block i-carbon:face-dizzy-filled data-v-1a1643b1${_scopeId}></div></span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (unref(draft).editingStatus) {
                    _push2(`<span data-v-1a1643b1${_scopeId}>${ssrInterpolate(_ctx.$t("action.save_changes"))}</span>`);
                  } else if (unref(draft).params.inReplyToId) {
                    _push2(`<span data-v-1a1643b1${_scopeId}>${ssrInterpolate(_ctx.$t("action.reply"))}</span>`);
                  } else {
                    _push2(`<span data-v-1a1643b1${_scopeId}>${ssrInterpolate(!unref(isSending) ? _ctx.$t("action.publish") : _ctx.$t("state.publishing"))}</span>`);
                  }
                  _push2(`</button>`);
                } else {
                  return [
                    createVNode("button", {
                      "btn-solid": "",
                      "rounded-3": "",
                      "text-sm": "",
                      "w-full": "",
                      flex: "~ gap1",
                      "items-center": "",
                      "md:w-fit": "",
                      class: "publish-button",
                      "aria-disabled": unref(isPublishDisabled) || unref(isExceedingCharacterLimit),
                      "aria-describedby": "publish-tooltip",
                      onClick: publish
                    }, [
                      unref(isSending) ? (openBlock(), createBlock("span", {
                        key: 0,
                        block: "",
                        "animate-spin": "",
                        "preserve-3d": ""
                      }, [
                        createVNode("div", {
                          block: "",
                          "i-ri:loader-2-fill": ""
                        })
                      ])) : createCommentVNode("", true),
                      unref(failedMessages).length ? (openBlock(), createBlock("span", {
                        key: 1,
                        block: ""
                      }, [
                        createVNode("div", {
                          block: "",
                          "i-carbon:face-dizzy-filled": ""
                        })
                      ])) : createCommentVNode("", true),
                      unref(draft).editingStatus ? (openBlock(), createBlock("span", { key: 2 }, toDisplayString(_ctx.$t("action.save_changes")), 1)) : unref(draft).params.inReplyToId ? (openBlock(), createBlock("span", { key: 3 }, toDisplayString(_ctx.$t("action.reply")), 1)) : (openBlock(), createBlock("span", { key: 4 }, toDisplayString(!unref(isSending) ? _ctx.$t("action.publish") : _ctx.$t("state.publishing")), 1))
                    ], 8, ["aria-disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent));
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/publish/PublishWidget.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1a1643b1"]]);

export { __nuxt_component_3 as _ };
