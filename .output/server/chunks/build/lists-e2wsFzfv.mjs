import { e as useI18n, Y as useMastoClient, h as useHydratedHead, _ as _sfc_main$2, l as __nuxt_component_0$1, M as _sfc_main$o, K as openConfirmDialog } from './server.mjs';
import { b as _sfc_main$3 } from './CommonPaginator-BbZe3uv5.mjs';
import { _ as _sfc_main$4 } from './CommonErrorMessage-CvbJeSnR.mjs';
import { useSSRContext, defineComponent, ref, computed, withCtx, unref, createVNode, toDisplayString, withModifiers, withDirectives, isRef, withKeys, vModelText, openBlock, createBlock, createTextVNode, createCommentVNode, renderSlot, mergeModels, useModel, nextTick, Fragment } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
import 'ultrahtml';
import '@iconify/utils';
import 'tiny-decode';
import '@iconify-emoji/twemoji';
import '@iconify/utils/lib/emoji/replace/find';
import 'floating-vue';
import 'vue-virtual-scroller';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ListEntry",
  __ssrInlineRender: true,
  props: {
    "modelValue": { required: true },
    "modelModifiers": {}
  },
  emits: /* @__PURE__ */ mergeModels(["listUpdated", "listRemoved"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const list = useModel(__props, "modelValue");
    const { t } = useI18n();
    const client = useMastoClient();
    const { form, isDirty, submitter, reset } = useForm({
      form: () => ({ ...list.value })
    });
    const isEditing = ref(false);
    const deleting = ref(false);
    const actionError = ref(void 0);
    const input = ref();
    const editBtn = ref();
    const deleteBtn = ref();
    async function prepareEdit() {
      isEditing.value = true;
      actionError.value = void 0;
      await nextTick();
      input.value?.focus();
    }
    async function cancelEdit() {
      isEditing.value = false;
      actionError.value = void 0;
      reset();
      await nextTick();
      editBtn.value?.focus();
    }
    const { submit, submitting } = submitter(async () => {
      try {
        list.value = await client.v1.lists.$select(form.id).update({
          title: form.title
        });
        cancelEdit();
      } catch (err) {
        console.error(err);
        actionError.value = err.message;
        await nextTick();
        input.value?.focus();
      }
    });
    async function removeList() {
      if (deleting.value)
        return;
      const confirmDelete = await openConfirmDialog({
        title: t("confirm.delete_list.title"),
        description: t("confirm.delete_list.description", [list.value.title]),
        confirm: t("confirm.delete_list.confirm"),
        cancel: t("confirm.delete_list.cancel")
      });
      deleting.value = true;
      actionError.value = void 0;
      await nextTick();
      if (confirmDelete.choice === "confirm") {
        await nextTick();
        try {
          await client.v1.lists.$select(list.value.id).remove();
          emit("listRemoved", list.value.id);
        } catch (err) {
          console.error(err);
          actionError.value = err.message;
          await nextTick();
          deleteBtn.value?.focus();
        } finally {
          deleting.value = false;
        }
      } else {
        deleting.value = false;
      }
    }
    async function clearError() {
      actionError.value = void 0;
      await nextTick();
      if (isEditing.value)
        input.value?.focus();
      else
        deleteBtn.value?.focus();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonTooltip = _sfc_main$o;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_CommonErrorMessage = _sfc_main$4;
      _push(`<!--[--><form hover:bg-active flex justify-between items-center gap-x-2${ssrRenderAttr("aria-describedby", unref(actionError) ? `action-list-error-${list.value.id}` : void 0)} class="${ssrRenderClass(unref(actionError) ? "border border-base border-rounded rounded-be-is-0 rounded-be-ie-0 border-b-unset border-$c-danger-active" : null)}">`);
      if (unref(isEditing)) {
        _push(`<div bg-base border="~ base" h10 m2 ps-1 pe-4 rounded-3 w-full flex="~ row" items-center relative focus-within:box-shadow-outline gap-3>`);
        if (unref(isEditing)) {
          _push(ssrRenderComponent(_component_CommonTooltip, {
            content: _ctx.$t("list.cancel_edit"),
            "no-auto-focus": ""
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<button type="button" rounded-full text-sm p2 transition-colors hover:text-primary${_scopeId}><span block text-current i-ri:close-fill${_scopeId}></span></button>`);
              } else {
                return [
                  createVNode("button", {
                    type: "button",
                    "rounded-full": "",
                    "text-sm": "",
                    p2: "",
                    "transition-colors": "",
                    "hover:text-primary": "",
                    onClick: ($event) => cancelEdit()
                  }, [
                    createVNode("span", {
                      block: "",
                      "text-current": "",
                      "i-ri:close-fill": ""
                    })
                  ], 8, ["onClick"])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<input${ssrRenderAttr("value", unref(form).title)} rounded-3 w-full bg-transparent outline="focus:none" pe-4 pb="1px" flex-1 placeholder-text-secondary></div>`);
      } else {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `list/${list.value.id}`,
          block: "",
          grow: "",
          p4: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(form).title)}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(form).title), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`<div mr4 flex gap2>`);
      if (unref(isEditing)) {
        _push(ssrRenderComponent(_component_CommonTooltip, {
          content: _ctx.$t("list.save"),
          "no-auto-focus": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button type="submit" text-sm p2 border-1 transition-colors border-dark hover:text-primary btn-action-icon${ssrIncludeBooleanAttr(unref(deleting) || !unref(isDirty) || unref(submitting)) ? " disabled" : ""}${_scopeId}>`);
              if (unref(isEditing)) {
                _push2(`<!--[-->`);
                if (unref(submitting)) {
                  _push2(`<span aria-hidden="true" block animate animate-spin preserve-3d class="rtl-flip"${_scopeId}><span block i-ri:loader-2-fill aria-hidden="true"${_scopeId}></span></span>`);
                } else {
                  _push2(`<span block text-current i-ri:save-2-fill class="rtl-flip"${_scopeId}></span>`);
                }
                _push2(`<!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</button>`);
            } else {
              return [
                createVNode("button", {
                  type: "submit",
                  "text-sm": "",
                  p2: "",
                  "border-1": "",
                  "transition-colors": "",
                  "border-dark": "",
                  "hover:text-primary": "",
                  "btn-action-icon": "",
                  disabled: unref(deleting) || !unref(isDirty) || unref(submitting)
                }, [
                  unref(isEditing) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    unref(submitting) ? (openBlock(), createBlock("span", {
                      key: 0,
                      "aria-hidden": "true",
                      block: "",
                      animate: "",
                      "animate-spin": "",
                      "preserve-3d": "",
                      class: "rtl-flip"
                    }, [
                      createVNode("span", {
                        block: "",
                        "i-ri:loader-2-fill": "",
                        "aria-hidden": "true"
                      })
                    ])) : (openBlock(), createBlock("span", {
                      key: 1,
                      block: "",
                      "text-current": "",
                      "i-ri:save-2-fill": "",
                      class: "rtl-flip"
                    }))
                  ], 64)) : createCommentVNode("", true)
                ], 8, ["disabled"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_CommonTooltip, {
          content: _ctx.$t("list.edit"),
          "no-auto-focus": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button type="button" text-sm p2 border-1 transition-colors border-dark hover:text-primary btn-action-icon${_scopeId}><span block text-current i-ri:edit-2-line class="rtl-flip"${_scopeId}></span></button>`);
            } else {
              return [
                createVNode("button", {
                  ref_key: "editBtn",
                  ref: editBtn,
                  type: "button",
                  "text-sm": "",
                  p2: "",
                  "border-1": "",
                  "transition-colors": "",
                  "border-dark": "",
                  "hover:text-primary": "",
                  "btn-action-icon": "",
                  onClick: withModifiers(prepareEdit, ["prevent"])
                }, [
                  createVNode("span", {
                    block: "",
                    "text-current": "",
                    "i-ri:edit-2-line": "",
                    class: "rtl-flip"
                  })
                ], 512)
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(ssrRenderComponent(_component_CommonTooltip, {
        content: _ctx.$t("list.delete"),
        "no-auto-focus": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button type="button" text-sm p2 border-1 transition-colors border-dark hover:text-primary btn-action-icon${ssrIncludeBooleanAttr(unref(isEditing)) ? " disabled" : ""}${_scopeId}>`);
            if (unref(deleting)) {
              _push2(`<span aria-hidden="true" block animate animate-spin preserve-3d class="rtl-flip"${_scopeId}><span block i-ri:loader-2-fill aria-hidden="true"${_scopeId}></span></span>`);
            } else {
              _push2(`<span block text-current i-ri:delete-bin-2-line class="rtl-flip"${_scopeId}></span>`);
            }
            _push2(`</button>`);
          } else {
            return [
              createVNode("button", {
                type: "button",
                "text-sm": "",
                p2: "",
                "border-1": "",
                "transition-colors": "",
                "border-dark": "",
                "hover:text-primary": "",
                "btn-action-icon": "",
                disabled: unref(isEditing),
                onClick: withModifiers(removeList, ["prevent"])
              }, [
                unref(deleting) ? (openBlock(), createBlock("span", {
                  key: 0,
                  "aria-hidden": "true",
                  block: "",
                  animate: "",
                  "animate-spin": "",
                  "preserve-3d": "",
                  class: "rtl-flip"
                }, [
                  createVNode("span", {
                    block: "",
                    "i-ri:loader-2-fill": "",
                    "aria-hidden": "true"
                  })
                ])) : (openBlock(), createBlock("span", {
                  key: 1,
                  block: "",
                  "text-current": "",
                  "i-ri:delete-bin-2-line": "",
                  class: "rtl-flip"
                }))
              ], 8, ["disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form>`);
      if (unref(actionError)) {
        _push(ssrRenderComponent(_component_CommonErrorMessage, {
          id: `action-list-error-${list.value.id}`,
          "described-by": `action-list-failed-${list.value.id}`,
          class: "rounded-bs-is-0 rounded-bs-ie-0 border-t-dashed m-b-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<header${ssrRenderAttr("id", `action-list-failed-${list.value.id}`)} flex justify-between${_scopeId}><div flex items-center gap-x-2 font-bold${_scopeId}><div aria-hidden="true" i-ri:error-warning-fill${_scopeId}></div><p${_scopeId}>${ssrInterpolate(_ctx.$t(`list.${unref(isEditing) ? "edit_error" : "delete_error"}`))}</p></div>`);
              _push2(ssrRenderComponent(_component_CommonTooltip, {
                placement: "bottom",
                content: _ctx.$t("list.clear_error"),
                "no-auto-focus": ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<button flex rounded-4 p1 hover:bg-active cursor-pointer transition-100${ssrRenderAttr("aria-label", _ctx.$t("list.clear_error"))}${_scopeId2}><span aria-hidden="true" w="1.75em" h="1.75em" i-ri:close-line${_scopeId2}></span></button>`);
                  } else {
                    return [
                      createVNode("button", {
                        flex: "",
                        "rounded-4": "",
                        p1: "",
                        "hover:bg-active": "",
                        "cursor-pointer": "",
                        "transition-100": "",
                        "aria-label": _ctx.$t("list.clear_error"),
                        onClick: clearError
                      }, [
                        createVNode("span", {
                          "aria-hidden": "true",
                          w: "1.75em",
                          h: "1.75em",
                          "i-ri:close-line": ""
                        })
                      ], 8, ["aria-label"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</header><ol ps-2 sm:ps-1${_scopeId}><li flex="~ col sm:row" gap-y-1 sm:gap-x-2${_scopeId}><strong sr-only${_scopeId}>${ssrInterpolate(_ctx.$t("list.error_prefix"))}</strong><span${_scopeId}>${ssrInterpolate(unref(actionError))}</span></li></ol>`);
            } else {
              return [
                createVNode("header", {
                  id: `action-list-failed-${list.value.id}`,
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
                    createVNode("p", null, toDisplayString(_ctx.$t(`list.${unref(isEditing) ? "edit_error" : "delete_error"}`)), 1)
                  ]),
                  createVNode(_component_CommonTooltip, {
                    placement: "bottom",
                    content: _ctx.$t("list.clear_error"),
                    "no-auto-focus": ""
                  }, {
                    default: withCtx(() => [
                      createVNode("button", {
                        flex: "",
                        "rounded-4": "",
                        p1: "",
                        "hover:bg-active": "",
                        "cursor-pointer": "",
                        "transition-100": "",
                        "aria-label": _ctx.$t("list.clear_error"),
                        onClick: clearError
                      }, [
                        createVNode("span", {
                          "aria-hidden": "true",
                          w: "1.75em",
                          h: "1.75em",
                          "i-ri:close-line": ""
                        })
                      ], 8, ["aria-label"])
                    ]),
                    _: 1
                  }, 8, ["content"])
                ], 8, ["id"]),
                createVNode("ol", {
                  "ps-2": "",
                  "sm:ps-1": ""
                }, [
                  createVNode("li", {
                    flex: "~ col sm:row",
                    "gap-y-1": "",
                    "sm:gap-x-2": ""
                  }, [
                    createVNode("strong", { "sr-only": "" }, toDisplayString(_ctx.$t("list.error_prefix")), 1),
                    createVNode("span", null, toDisplayString(unref(actionError)), 1)
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/list/ListEntry.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "lists",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const client = useMastoClient();
    const paginator = client.v1.lists.list();
    useHydratedHead({
      title: () => t("nav.lists")
    });
    const paginatorRef = ref();
    const inputRef = ref();
    const actionError = ref(void 0);
    const busy = ref(false);
    const createText = ref("");
    const enableSubmit = computed(() => createText.value.length > 0);
    async function createList() {
      if (busy.value || !enableSubmit.value)
        return;
      busy.value = true;
      actionError.value = void 0;
      await nextTick();
      try {
        const newEntry = await client.v1.lists.create({
          title: createText.value
        });
        paginatorRef.value?.createEntry(newEntry);
        createText.value = "";
      } catch (err) {
        console.error(err);
        actionError.value = err.message;
        nextTick(() => {
          inputRef.value?.focus();
        });
      } finally {
        busy.value = false;
      }
    }
    function clearError(focusBtn) {
      actionError.value = void 0;
      focusBtn && nextTick(() => {
        inputRef.value?.focus();
      });
    }
    function updateEntry(list) {
      paginatorRef.value?.updateEntry(list);
    }
    function removeEntry(id) {
      paginatorRef.value?.removeEntry(id);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MainContent = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_CommonPaginator = _sfc_main$3;
      const _component_ListEntry = _sfc_main$1;
      const _component_CommonErrorMessage = _sfc_main$4;
      const _component_CommonTooltip = _sfc_main$o;
      _push(ssrRenderComponent(_component_MainContent, _attrs, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/lists",
              "timeline-title-style": "",
              flex: "",
              "items-center": "",
              "gap-2": "",
              onClick: _ctx.$scrollToTop
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div i-ri:list-check${_scopeId2}></div><span text-lg font-bold${_scopeId2}>${ssrInterpolate(unref(t)("nav.lists"))}</span>`);
                } else {
                  return [
                    createVNode("div", { "i-ri:list-check": "" }),
                    createVNode("span", {
                      "text-lg": "",
                      "font-bold": ""
                    }, toDisplayString(unref(t)("nav.lists")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, {
                to: "/lists",
                "timeline-title-style": "",
                flex: "",
                "items-center": "",
                "gap-2": "",
                onClick: _ctx.$scrollToTop
              }, {
                default: withCtx(() => [
                  createVNode("div", { "i-ri:list-check": "" }),
                  createVNode("span", {
                    "text-lg": "",
                    "font-bold": ""
                  }, toDisplayString(unref(t)("nav.lists")), 1)
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(ssrRenderComponent(_component_CommonPaginator, {
                ref_key: "paginatorRef",
                ref: paginatorRef,
                paginator: unref(paginator)
              }, {
                default: withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_ListEntry, {
                      "model-value": item,
                      "onUpdate:modelValue": updateEntry,
                      onListRemoved: removeEntry
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_ListEntry, {
                        "model-value": item,
                        "onUpdate:modelValue": updateEntry,
                        onListRemoved: removeEntry
                      }, null, 8, ["model-value"])
                    ];
                  }
                }),
                done: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<form border="t base" p-4 w-full flex="~ wrap" relative gap-3${ssrRenderAttr("aria-describedby", unref(actionError) ? "create-list-error" : void 0)} class="${ssrRenderClass(unref(actionError) ? "border border-base border-rounded rounded-be-is-0 rounded-be-ie-0 border-b-unset border-$c-danger-active" : null)}"${_scopeId2}><div bg-base border="~ base" flex-1 h10 ps-1 pe-4 rounded-2 w-full flex="~ row" items-center relative focus-within:box-shadow-outline gap-3${_scopeId2}><input${ssrRenderAttr("value", unref(createText))} bg-transparent outline="focus:none" px-4 pb="1px" flex-1 placeholder-text-secondary${ssrRenderAttr("placeholder", _ctx.$t("list.list_title_placeholder"))}${_scopeId2}></div><div flex="~ col" gap-y-4 gap-x-2 sm="~ justify-between flex-row"${_scopeId2}><button flex="~ row" gap-x-2 items-center btn-solid${ssrIncludeBooleanAttr(!unref(enableSubmit) || unref(busy)) ? " disabled" : ""}${_scopeId2}>`);
                    if (unref(busy)) {
                      _push3(`<span aria-hidden="true" block animate animate-spin preserve-3d class="rtl-flip"${_scopeId2}><span block i-ri:loader-2-fill aria-hidden="true"${_scopeId2}></span></span>`);
                    } else {
                      _push3(`<span aria-hidden="true" block i-material-symbols:playlist-add-rounded class="rtl-flip"${_scopeId2}></span>`);
                    }
                    _push3(` ${ssrInterpolate(_ctx.$t("list.create"))}</button></div></form>`);
                    if (unref(actionError)) {
                      _push3(ssrRenderComponent(_component_CommonErrorMessage, {
                        id: "create-list-error",
                        "described-by": "create-list-failed",
                        class: "rounded-bs-is-0 rounded-bs-ie-0 border-t-dashed m-b-2"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<header id="create-list-failed" flex justify-between${_scopeId3}><div flex items-center gap-x-2 font-bold${_scopeId3}><div aria-hidden="true" i-ri:error-warning-fill${_scopeId3}></div><p${_scopeId3}>${ssrInterpolate(_ctx.$t("list.error"))}</p></div>`);
                            _push4(ssrRenderComponent(_component_CommonTooltip, {
                              placement: "bottom",
                              content: _ctx.$t("list.clear_error"),
                              "no-auto-focus": ""
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<button flex rounded-4 p1 hover:bg-active cursor-pointer transition-100${ssrRenderAttr("aria-label", _ctx.$t("list.clear_error"))}${_scopeId4}><span aria-hidden="true" w="1.75em" h="1.75em" i-ri:close-line${_scopeId4}></span></button>`);
                                } else {
                                  return [
                                    createVNode("button", {
                                      flex: "",
                                      "rounded-4": "",
                                      p1: "",
                                      "hover:bg-active": "",
                                      "cursor-pointer": "",
                                      "transition-100": "",
                                      "aria-label": _ctx.$t("list.clear_error"),
                                      onClick: ($event) => clearError(true)
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
                            }, _parent4, _scopeId3));
                            _push4(`</header><ol ps-2 sm:ps-1${_scopeId3}><li flex="~ col sm:row" gap-y-1 sm:gap-x-2${_scopeId3}><strong sr-only${_scopeId3}>${ssrInterpolate(_ctx.$t("list.error_prefix"))}</strong><span${_scopeId3}>${ssrInterpolate(unref(actionError))}</span></li></ol>`);
                          } else {
                            return [
                              createVNode("header", {
                                id: "create-list-failed",
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
                                  createVNode("p", null, toDisplayString(_ctx.$t("list.error")), 1)
                                ]),
                                createVNode(_component_CommonTooltip, {
                                  placement: "bottom",
                                  content: _ctx.$t("list.clear_error"),
                                  "no-auto-focus": ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode("button", {
                                      flex: "",
                                      "rounded-4": "",
                                      p1: "",
                                      "hover:bg-active": "",
                                      "cursor-pointer": "",
                                      "transition-100": "",
                                      "aria-label": _ctx.$t("list.clear_error"),
                                      onClick: ($event) => clearError(true)
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
                                createVNode("li", {
                                  flex: "~ col sm:row",
                                  "gap-y-1": "",
                                  "sm:gap-x-2": ""
                                }, [
                                  createVNode("strong", { "sr-only": "" }, toDisplayString(_ctx.$t("list.error_prefix")), 1),
                                  createVNode("span", null, toDisplayString(unref(actionError)), 1)
                                ])
                              ])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      createVNode("form", {
                        border: "t base",
                        "p-4": "",
                        "w-full": "",
                        flex: "~ wrap",
                        relative: "",
                        "gap-3": "",
                        "aria-describedby": unref(actionError) ? "create-list-error" : void 0,
                        class: unref(actionError) ? "border border-base border-rounded rounded-be-is-0 rounded-be-ie-0 border-b-unset border-$c-danger-active" : null,
                        onSubmit: withModifiers(createList, ["prevent"])
                      }, [
                        createVNode("div", {
                          "bg-base": "",
                          border: "~ base",
                          "flex-1": "",
                          h10: "",
                          "ps-1": "",
                          "pe-4": "",
                          "rounded-2": "",
                          "w-full": "",
                          flex: "~ row",
                          "items-center": "",
                          relative: "",
                          "focus-within:box-shadow-outline": "",
                          "gap-3": ""
                        }, [
                          withDirectives(createVNode("input", {
                            ref_key: "inputRef",
                            ref: inputRef,
                            "onUpdate:modelValue": ($event) => isRef(createText) ? createText.value = $event : null,
                            "bg-transparent": "",
                            outline: "focus:none",
                            "px-4": "",
                            pb: "1px",
                            "flex-1": "",
                            "placeholder-text-secondary": "",
                            placeholder: _ctx.$t("list.list_title_placeholder"),
                            onKeypress: withKeys(createList, ["enter"])
                          }, null, 40, ["onUpdate:modelValue", "placeholder"]), [
                            [vModelText, unref(createText)]
                          ])
                        ]),
                        createVNode("div", {
                          flex: "~ col",
                          "gap-y-4": "",
                          "gap-x-2": "",
                          sm: "~ justify-between flex-row"
                        }, [
                          createVNode("button", {
                            flex: "~ row",
                            "gap-x-2": "",
                            "items-center": "",
                            "btn-solid": "",
                            disabled: !unref(enableSubmit) || unref(busy)
                          }, [
                            unref(busy) ? (openBlock(), createBlock("span", {
                              key: 0,
                              "aria-hidden": "true",
                              block: "",
                              animate: "",
                              "animate-spin": "",
                              "preserve-3d": "",
                              class: "rtl-flip"
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
                              "i-material-symbols:playlist-add-rounded": "",
                              class: "rtl-flip"
                            })),
                            createTextVNode(" " + toDisplayString(_ctx.$t("list.create")), 1)
                          ], 8, ["disabled"])
                        ])
                      ], 42, ["aria-describedby"]),
                      unref(actionError) ? (openBlock(), createBlock(_component_CommonErrorMessage, {
                        key: 0,
                        id: "create-list-error",
                        "described-by": "create-list-failed",
                        class: "rounded-bs-is-0 rounded-bs-ie-0 border-t-dashed m-b-2"
                      }, {
                        default: withCtx(() => [
                          createVNode("header", {
                            id: "create-list-failed",
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
                              createVNode("p", null, toDisplayString(_ctx.$t("list.error")), 1)
                            ]),
                            createVNode(_component_CommonTooltip, {
                              placement: "bottom",
                              content: _ctx.$t("list.clear_error"),
                              "no-auto-focus": ""
                            }, {
                              default: withCtx(() => [
                                createVNode("button", {
                                  flex: "",
                                  "rounded-4": "",
                                  p1: "",
                                  "hover:bg-active": "",
                                  "cursor-pointer": "",
                                  "transition-100": "",
                                  "aria-label": _ctx.$t("list.clear_error"),
                                  onClick: ($event) => clearError(true)
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
                            createVNode("li", {
                              flex: "~ col sm:row",
                              "gap-y-1": "",
                              "sm:gap-x-2": ""
                            }, [
                              createVNode("strong", { "sr-only": "" }, toDisplayString(_ctx.$t("list.error_prefix")), 1),
                              createVNode("span", null, toDisplayString(unref(actionError)), 1)
                            ])
                          ])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createVNode(_component_CommonPaginator, {
                  ref_key: "paginatorRef",
                  ref: paginatorRef,
                  paginator: unref(paginator)
                }, {
                  default: withCtx(({ item }) => [
                    createVNode(_component_ListEntry, {
                      "model-value": item,
                      "onUpdate:modelValue": updateEntry,
                      onListRemoved: removeEntry
                    }, null, 8, ["model-value"])
                  ]),
                  done: withCtx(() => [
                    createVNode("form", {
                      border: "t base",
                      "p-4": "",
                      "w-full": "",
                      flex: "~ wrap",
                      relative: "",
                      "gap-3": "",
                      "aria-describedby": unref(actionError) ? "create-list-error" : void 0,
                      class: unref(actionError) ? "border border-base border-rounded rounded-be-is-0 rounded-be-ie-0 border-b-unset border-$c-danger-active" : null,
                      onSubmit: withModifiers(createList, ["prevent"])
                    }, [
                      createVNode("div", {
                        "bg-base": "",
                        border: "~ base",
                        "flex-1": "",
                        h10: "",
                        "ps-1": "",
                        "pe-4": "",
                        "rounded-2": "",
                        "w-full": "",
                        flex: "~ row",
                        "items-center": "",
                        relative: "",
                        "focus-within:box-shadow-outline": "",
                        "gap-3": ""
                      }, [
                        withDirectives(createVNode("input", {
                          ref_key: "inputRef",
                          ref: inputRef,
                          "onUpdate:modelValue": ($event) => isRef(createText) ? createText.value = $event : null,
                          "bg-transparent": "",
                          outline: "focus:none",
                          "px-4": "",
                          pb: "1px",
                          "flex-1": "",
                          "placeholder-text-secondary": "",
                          placeholder: _ctx.$t("list.list_title_placeholder"),
                          onKeypress: withKeys(createList, ["enter"])
                        }, null, 40, ["onUpdate:modelValue", "placeholder"]), [
                          [vModelText, unref(createText)]
                        ])
                      ]),
                      createVNode("div", {
                        flex: "~ col",
                        "gap-y-4": "",
                        "gap-x-2": "",
                        sm: "~ justify-between flex-row"
                      }, [
                        createVNode("button", {
                          flex: "~ row",
                          "gap-x-2": "",
                          "items-center": "",
                          "btn-solid": "",
                          disabled: !unref(enableSubmit) || unref(busy)
                        }, [
                          unref(busy) ? (openBlock(), createBlock("span", {
                            key: 0,
                            "aria-hidden": "true",
                            block: "",
                            animate: "",
                            "animate-spin": "",
                            "preserve-3d": "",
                            class: "rtl-flip"
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
                            "i-material-symbols:playlist-add-rounded": "",
                            class: "rtl-flip"
                          })),
                          createTextVNode(" " + toDisplayString(_ctx.$t("list.create")), 1)
                        ], 8, ["disabled"])
                      ])
                    ], 42, ["aria-describedby"]),
                    unref(actionError) ? (openBlock(), createBlock(_component_CommonErrorMessage, {
                      key: 0,
                      id: "create-list-error",
                      "described-by": "create-list-failed",
                      class: "rounded-bs-is-0 rounded-bs-ie-0 border-t-dashed m-b-2"
                    }, {
                      default: withCtx(() => [
                        createVNode("header", {
                          id: "create-list-failed",
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
                            createVNode("p", null, toDisplayString(_ctx.$t("list.error")), 1)
                          ]),
                          createVNode(_component_CommonTooltip, {
                            placement: "bottom",
                            content: _ctx.$t("list.clear_error"),
                            "no-auto-focus": ""
                          }, {
                            default: withCtx(() => [
                              createVNode("button", {
                                flex: "",
                                "rounded-4": "",
                                p1: "",
                                "hover:bg-active": "",
                                "cursor-pointer": "",
                                "transition-100": "",
                                "aria-label": _ctx.$t("list.clear_error"),
                                onClick: ($event) => clearError(true)
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
                          createVNode("li", {
                            flex: "~ col sm:row",
                            "gap-y-1": "",
                            "sm:gap-x-2": ""
                          }, [
                            createVNode("strong", { "sr-only": "" }, toDisplayString(_ctx.$t("list.error_prefix")), 1),
                            createVNode("span", null, toDisplayString(unref(actionError)), 1)
                          ])
                        ])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["paginator"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[[server]]/lists.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
