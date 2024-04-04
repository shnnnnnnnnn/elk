import { hasInjectionContext, inject, version, onUnmounted, computed, isRef, ref, watch, nextTick, shallowRef, reactive, watchEffect, defineComponent, provide, createElementBlock, h, getCurrentInstance, unref, shallowReactive, Suspense, Transition, useSSRContext, mergeProps, createPropsRestProxy, resolveComponent, withCtx, createVNode, renderSlot, createTextVNode, toDisplayString as toDisplayString$1, Fragment, isVNode as isVNode$1, openBlock, createBlock, createCommentVNode, resolveDynamicComponent, getCurrentScope, onScopeDispose, toRef as toRef$1, readonly, customRef, createApp, effectScope, onErrorCaptured, onServerPrefetch, isReactive, toRaw, isReadonly, Text, markRaw, toRefs, isShallow } from 'vue';
import { u as useRuntimeConfig$1, $ as $fetch, c as createError$1, B as klona, C as defu, D as defuFn, E as getRequestHeaders, F as createHooks, G as sanitizeStatusCode, H as getRequestURL, I as toRouteMatcher, J as createRouter$1, K as snakeCase, L as camelCase, b as sendRedirect, M as parse$2, N as getRequestHeader, O as destr, P as isEqual$1, Q as setCookie, R as getCookie, S as deleteCookie } from '../runtime.mjs';
import { getActiveHead } from 'unhead';
import { defineHeadPlugin, composableNames } from '@unhead/shared';
import { useRoute as useRoute$1, RouterView, RouterLink, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import { CustomError } from 'ts-custom-error';
import WebSocket from 'ws';
import { on } from 'events-to-async';
import { LRUCache } from 'lru-cache';
import { parse as parse$1, TEXT_NODE, render, h as h$1, DOCUMENT_NODE, ELEMENT_NODE } from 'ultrahtml';
import { findAndReplaceEmojisInText } from '@iconify/utils';
import { decode as decode$1 } from 'tiny-decode';
import { emojiRegEx, emojiFilename, emojiPrefix } from '@iconify-emoji/twemoji';
import { getEmojiMatchesInText } from '@iconify/utils/lib/emoji/replace/find';
import FloatingVue from 'floating-vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrRenderStyle, ssrRenderVNode, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderSuspense } from 'vue/server-renderer';

function createContext$1(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers$1.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers$1.delete(onLeave);
      }
    }
  };
}
function createNamespace$1(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext$1({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey$3 = "__unctx__";
const defaultNamespace = _globalThis[globalKey$3] || (_globalThis[globalKey$3] = createNamespace$1());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey$1 = "__unctx_async_handlers__";
const asyncHandlers$1 = _globalThis[asyncHandlersKey$1] || (_globalThis[asyncHandlersKey$1] = /* @__PURE__ */ new Set());

const fn = function() {
};
function createMock(name, overrides = {}) {
  fn.prototype.name = name;
  const props = {};
  return new Proxy(fn, {
    get(_target, prop) {
      if (prop === "caller") {
        return null;
      }
      if (prop === "__createMock__") {
        return createMock;
      }
      if (prop === "__unenv__") {
        return true;
      }
      if (prop in overrides) {
        return overrides[prop];
      }
      return props[prop] = props[prop] || createMock(`${name}.${prop.toString()}`);
    },
    apply(_target, _this, _args) {
      return createMock(`${name}()`);
    },
    construct(_target, _args, _newT) {
      return createMock(`[${name}]`);
    },
    // @ts-ignore (ES6-only - removed in ES7)
    // https://github.com/tc39/ecma262/issues/161
    enumerate() {
      return [];
    }
  });
}
const proxy = createMock("mock");

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function withoutProtocol(input) {
  return withProtocol(input, "");
}
function withProtocol(input, protocol) {
  const match = input.match(PROTOCOL_REGEX);
  if (!match) {
    return protocol + input;
  }
  return protocol + input.slice(match[0].length);
}
function isEqual(a, b, options = {}) {
  if (!options.trailingSlash) {
    a = withTrailingSlash(a);
    b = withTrailingSlash(b);
  }
  if (!options.leadingSlash) {
    a = withLeadingSlash(a);
    b = withLeadingSlash(b);
  }
  if (!options.encoding) {
    a = decode(a);
    b = decode(b);
  }
  return a === b;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  const [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  const { pathname, search, hash } = parsePath(
    path.replace(/\/(?=[A-Za-z]:)/, "")
  );
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}

const nuxtAppCtx = /* @__PURE__ */ getContext("nuxt-app", {
  asyncContext: false
});
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.11.1";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: reactive({
      data: {},
      state: {},
      once: /* @__PURE__ */ new Set(),
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    runWithContext: (fn) => nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn)),
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter$1(nuxtApp, $name, value);
    defineGetter$1(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter$1(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter$1(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
      nuxtApp.ssrContext._payloadReducers = {};
      nuxtApp.payload.path = nuxtApp.ssrContext.url;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig ;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (plugin.hooks) {
    nuxtApp.hooks.addHooks(plugin.hooks);
  }
  if (typeof plugin === "function") {
    const { provide } = await nuxtApp.runWithContext(() => plugin(nuxtApp)) || {};
    if (provide && typeof provide === "object") {
      for (const key in provide) {
        nuxtApp.provide(key, provide[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins) {
  const resolvedPlugins = [];
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin) {
    const unresolvedPluginsForThisPlugin = plugin.dependsOn?.filter((name) => plugins.some((p) => p._name === name) && !resolvedPlugins.includes(name)) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin).then(async () => {
        if (plugin._name) {
          resolvedPlugins.push(plugin._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin._name)) {
              dependsOn.delete(plugin._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin of plugins) {
    if (nuxtApp.ssrContext?.islandContext && plugin.env?.islands === false) {
      continue;
    }
    await executePlugin(plugin);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin) {
  if (typeof plugin === "function") {
    return plugin;
  }
  const _name = plugin._name || plugin.name;
  delete plugin.name;
  return Object.assign(plugin.setup || (() => {
  }), plugin, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
// @__NO_SIDE_EFFECTS__
function tryUseNuxtApp() {
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || nuxtAppCtx.tryUse();
  return nuxtAppInstance || null;
}
// @__NO_SIDE_EFFECTS__
function useNuxtApp() {
  const nuxtAppInstance = /* @__PURE__ */ tryUseNuxtApp();
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return (/* @__PURE__ */ useNuxtApp()).$config;
}
function defineGetter$1(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}

const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");

const useRouter = () => {
  return useNuxtApp()?.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const addRouteMiddleware = (name, middleware, options = {}) => {
  const nuxtApp = useNuxtApp();
  const global = options.global || typeof name !== "string";
  const mw = typeof name !== "string" ? name : middleware;
  if (!mw) {
    console.warn("[nuxt] No route middleware passed to `addRouteMiddleware`.", name);
    return;
  }
  if (global) {
    nuxtApp._middleware.global.push(mw);
  } else {
    nuxtApp._middleware.named[name] = mw;
  }
};
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : withQuery(to.path || "/", to.query || {}) + (to.hash || "");
  if (options?.open) {
    return Promise.resolve();
  }
  const isExternal = options?.external || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal) {
    if (!options?.external) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const protocol = parseURL(toPath).protocol;
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(/"/g, "%22");
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: location2 }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options?.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return options?.replace ? router.replace(to) : router.push(to);
};

const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef$1(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = useNuxtApp();
    const error2 = useError();
    if (false) ;
    error2.value = error2.value || nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const clearError = async (options = {}) => {
  const nuxtApp = useNuxtApp();
  const error = useError();
  nuxtApp.callHook("app:error:cleared", options);
  if (options.redirect) {
    await useRouter().replace(options.redirect);
  }
  error.value = null;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};

const path_LH0ulmb5c1 = defineNuxtPlugin({
  order: -40,
  setup: (nuxtApp) => {
    delete nuxtApp.payload.path;
  }
});

version.startsWith("3");
function resolveUnref$1(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref, lastKey = "") {
  if (ref instanceof Promise)
    return ref;
  const root = resolveUnref$1(ref);
  if (!ref || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
  }
  return root;
}
defineHeadPlugin({
  hooks: {
    "entries:resolve": function(ctx) {
      for (const entry of ctx.entries)
        entry.resolvedInput = resolveUnrefHeadInput(entry.input);
    }
  }
});
const headSymbol = "usehead";
const _global$1 = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey$2 = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler) {
  _global$1[globalKey$2] = handler;
}
function injectHead() {
  if (globalKey$2 in _global$1) {
    return _global$1[globalKey$2]();
  }
  const head = inject(headSymbol);
  if (!head && "production" !== "production")
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}

function useHead(input, options = {}) {
  const head = options.head || injectHead();
  if (head) {
    if (!head.ssr)
      return clientUseHead(head, input, options);
    return head.push(input, options);
  }
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry.patch(e);
  });
  getCurrentInstance();
  return entry;
}

const coreComposableNames = [
  "injectHead"
];
({
  "@unhead/vue": [...coreComposableNames, ...composableNames]
});

const unhead_3dWckw4Y8m = defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head ;
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => useNuxtApp().vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
  }
});

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis$1 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey$1 = "__unctx__";
_globalThis$1[globalKey$1] || (_globalThis$1[globalKey$1] = createNamespace());
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis$1[asyncHandlersKey] || (_globalThis$1[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}

const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => route.params[r.slice(1)]?.toString() || "");
};
const generateRouteKey$1 = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => m.components?.default === routeProps.Component.type);
  const source = override ?? matchedRoute?.meta.key ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}

const inlineConfig = {
  "storage": {
    "driver": "fs"
  },
  "nuxt": {
    "buildId": "f4104ecd-3f30-4d88-9222-fe4bacc71b85"
  },
  "env": "canary",
  "buildInfo": {
    "version": "0.13.1",
    "time": 1712226647244,
    "commit": "7dcafa3fe0c381f717ae7eb74959573faa9e313d",
    "shortCommit": "7dcafa3",
    "branch": "main",
    "env": "canary"
  },
  "pwaEnabled": true
};
const __appConfig = /* @__PURE__ */ defuFn(inlineConfig);

function useAppConfig() {
  const nuxtApp = useNuxtApp();
  if (!nuxtApp._appConfig) {
    nuxtApp._appConfig = klona(__appConfig) ;
  }
  return nuxtApp._appConfig;
}

const appKeepalive = true;

const appLayoutTransition = false;

const appPageTransition = false;

const nuxtLinkDefaults = {"componentName":"NuxtLink"};

const asyncDataDefaults = {"deep":true};

async function getRouteRules(url) {
  {
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: useRuntimeConfig().nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(url).reverse());
  }
}

const __nuxt_page_meta$O = {
      middleware: async (to) => {
        const permalink = Array.isArray(to.params.permalink) ? to.params.permalink.join("/") : to.params.permalink;
        if (hasProtocol(permalink)) {
          const { host, pathname } = parseURL(permalink);
          if (host)
            return `/${host}${pathname}`;
        }
        return false;
      }
    };

const __nuxt_page_meta$N = {
      name: "status",
      key: (route2) => route2.path,
      // GoToSocial
      alias: ["/:server?/@:account/statuses/:status"]
    };

const __nuxt_page_meta$M = { name: "account-followers" };

const __nuxt_page_meta$L = { name: "account-following" };

const __nuxt_page_meta$K = { name: "account-index" };

const __nuxt_page_meta$J = { name: "account-media" };

const __nuxt_page_meta$I = { name: "account-replies" };

const DEFAULT_POST_CHARS_LIMIT = 500;
const DEFAULT_FONT_SIZE = "15px";
const STORAGE_KEY_USERS = "elk-users";
const STORAGE_KEY_SERVERS = "elk-servers";
const STORAGE_KEY_NODES = "elk-nodes";
const STORAGE_KEY_CURRENT_USER_HANDLE = "elk-current-user-handle";
const STORAGE_KEY_FIRST_VISIT = "elk-first-visit";
const STORAGE_KEY_SETTINGS = "elk-settings";
const STORAGE_KEY_HIDE_EXPLORE_POSTS_TIPS = "elk-hide-explore-posts-tips";
const STORAGE_KEY_HIDE_EXPLORE_NEWS_TIPS = "elk-hide-explore-news-tips";
const STORAGE_KEY_HIDE_EXPLORE_TAGS_TIPS = "elk-hide-explore-tags-tips";
const STORAGE_KEY_NOTIFICATION = "elk-notification";
const STORAGE_KEY_NOTIFICATION_POLICY = "elk-notification-policy";
const STORAGE_KEY_LAST_ACCESSED_NOTIFICATION_ROUTE = "elk-last-accessed-notification-route";
const STORAGE_KEY_LAST_ACCESSED_EXPLORE_ROUTE = "elk-last-accessed-explore-route";
const NOTIFICATION_FILTER_TYPES = ["status", "reblog", "follow", "follow_request", "favourite", "poll", "update", "admin.sign_up", "admin.report"];
const THEME_COLORS = {
  themeDark: "#111111",
  themeLight: "#fafafa",
  backgroundDark: "#fafafa",
  backgroundLight: "#111111"
};

const isVue2 = false;

function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function toValue(r) {
  return typeof r === "function" ? r() : unref(r);
}
const resolveUnref = toValue;
const isClient = false;
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
const notNullish = (val) => val != null;
const toString = Object.prototype.toString;
const isObject$1 = (val) => toString.call(val) === "[object Object]";
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const noop$3 = () => {
};
function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    return new Promise((resolve, reject) => {
      Promise.resolve(filter(() => fn.apply(this, args), { fn, thisArg: this, args })).then(resolve).catch(reject);
    });
  }
  return wrapper;
}
const bypassFilter = (invoke2) => {
  return invoke2();
};
function debounceFilter(ms, options = {}) {
  let timer;
  let maxTimer;
  let lastRejector = noop$3;
  const _clearTimeout = (timer2) => {
    clearTimeout(timer2);
    lastRejector();
    lastRejector = noop$3;
  };
  const filter = (invoke2) => {
    const duration = toValue(ms);
    const maxDuration = toValue(options.maxWait);
    if (timer)
      _clearTimeout(timer);
    if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
      if (maxTimer) {
        _clearTimeout(maxTimer);
        maxTimer = null;
      }
      return Promise.resolve(invoke2());
    }
    return new Promise((resolve, reject) => {
      lastRejector = options.rejectOnCancel ? reject : resolve;
      if (maxDuration && !maxTimer) {
        maxTimer = setTimeout(() => {
          if (timer)
            _clearTimeout(timer);
          maxTimer = null;
          resolve(invoke2());
        }, maxDuration);
      }
      timer = setTimeout(() => {
        if (maxTimer)
          _clearTimeout(maxTimer);
        maxTimer = null;
        resolve(invoke2());
      }, duration);
    });
  };
  return filter;
}
function pausableFilter(extendFilter = bypassFilter) {
  const isActive = ref(true);
  function pause() {
    isActive.value = false;
  }
  function resume() {
    isActive.value = true;
  }
  const eventFilter = (...args) => {
    if (isActive.value)
      extendFilter(...args);
  };
  return { isActive: readonly(isActive), pause, resume, eventFilter };
}
function promiseTimeout(ms, throwOnTimeout = false, reason = "Timeout") {
  return new Promise((resolve, reject) => {
    if (throwOnTimeout)
      setTimeout(() => reject(reason), ms);
    else
      setTimeout(resolve, ms);
  });
}
function createSingletonPromise(fn) {
  let _promise;
  function wrapper() {
    if (!_promise)
      _promise = fn();
    return _promise;
  }
  wrapper.reset = async () => {
    const _prev = _promise;
    _promise = void 0;
    if (_prev)
      await _prev;
  };
  return wrapper;
}
function invoke(fn) {
  return fn();
}
function increaseWithUnit(target, delta) {
  var _a;
  if (typeof target === "number")
    return target + delta;
  const value = ((_a = target.match(/^-?[0-9]+\.?[0-9]*/)) == null ? void 0 : _a[0]) || "";
  const unit = target.slice(value.length);
  const result = Number.parseFloat(value) + delta;
  if (Number.isNaN(result))
    return target;
  return result + unit;
}
function getLifeCycleTarget(target) {
  return target || getCurrentInstance();
}
function toRef(...args) {
  if (args.length !== 1)
    return toRef$1(...args);
  const r = args[0];
  return typeof r === "function" ? readonly(customRef(() => ({ get: r, set: noop$3 }))) : ref(r);
}
function watchWithFilter(source, cb, options = {}) {
  const {
    eventFilter = bypassFilter,
    ...watchOptions
  } = options;
  return watch(
    source,
    createFilterWrapper(
      eventFilter,
      cb
    ),
    watchOptions
  );
}
function watchPausable(source, cb, options = {}) {
  const {
    eventFilter: filter,
    ...watchOptions
  } = options;
  const { eventFilter, pause, resume, isActive } = pausableFilter(filter);
  const stop = watchWithFilter(
    source,
    cb,
    {
      ...watchOptions,
      eventFilter
    }
  );
  return { stop, pause, resume, isActive };
}
function tryOnBeforeUnmount(fn, target) {
  getLifeCycleTarget(target);
}
function tryOnMounted(fn, sync = true, target) {
  const instance = getLifeCycleTarget();
  if (instance)
     ;
  else if (sync)
    fn();
  else
    nextTick(fn);
}
function tryOnUnmounted(fn, target) {
  const instance = getLifeCycleTarget(target);
  if (instance)
    onUnmounted(fn, target);
}
function createUntil(r, isNot = false) {
  function toMatch(condition, { flush = "sync", deep = false, timeout, throwOnTimeout } = {}) {
    let stop = null;
    const watcher = new Promise((resolve) => {
      stop = watch(
        r,
        (v) => {
          if (condition(v) !== isNot) {
            stop == null ? void 0 : stop();
            resolve(v);
          }
        },
        {
          flush,
          deep,
          immediate: true
        }
      );
    });
    const promises = [watcher];
    if (timeout != null) {
      promises.push(
        promiseTimeout(timeout, throwOnTimeout).then(() => toValue(r)).finally(() => stop == null ? void 0 : stop())
      );
    }
    return Promise.race(promises);
  }
  function toBe(value, options) {
    if (!isRef(value))
      return toMatch((v) => v === value, options);
    const { flush = "sync", deep = false, timeout, throwOnTimeout } = options != null ? options : {};
    let stop = null;
    const watcher = new Promise((resolve) => {
      stop = watch(
        [r, value],
        ([v1, v2]) => {
          if (isNot !== (v1 === v2)) {
            stop == null ? void 0 : stop();
            resolve(v1);
          }
        },
        {
          flush,
          deep,
          immediate: true
        }
      );
    });
    const promises = [watcher];
    if (timeout != null) {
      promises.push(
        promiseTimeout(timeout, throwOnTimeout).then(() => toValue(r)).finally(() => {
          stop == null ? void 0 : stop();
          return toValue(r);
        })
      );
    }
    return Promise.race(promises);
  }
  function toBeTruthy(options) {
    return toMatch((v) => Boolean(v), options);
  }
  function toBeNull(options) {
    return toBe(null, options);
  }
  function toBeUndefined(options) {
    return toBe(void 0, options);
  }
  function toBeNaN(options) {
    return toMatch(Number.isNaN, options);
  }
  function toContains(value, options) {
    return toMatch((v) => {
      const array = Array.from(v);
      return array.includes(value) || array.includes(toValue(value));
    }, options);
  }
  function changed(options) {
    return changedTimes(1, options);
  }
  function changedTimes(n = 1, options) {
    let count = -1;
    return toMatch(() => {
      count += 1;
      return count >= n;
    }, options);
  }
  if (Array.isArray(toValue(r))) {
    const instance = {
      toMatch,
      toContains,
      changed,
      changedTimes,
      get not() {
        return createUntil(r, !isNot);
      }
    };
    return instance;
  } else {
    const instance = {
      toMatch,
      toBe,
      toBeTruthy,
      toBeNull,
      toBeNaN,
      toBeUndefined,
      changed,
      changedTimes,
      get not() {
        return createUntil(r, !isNot);
      }
    };
    return instance;
  }
}
function until(r) {
  return createUntil(r);
}
function useIntervalFn(cb, interval = 1e3, options = {}) {
  const {
    immediate = true,
    immediateCallback = false
  } = options;
  let timer = null;
  const isActive = ref(false);
  function clean() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
  function pause() {
    isActive.value = false;
    clean();
  }
  function resume() {
    const intervalValue = toValue(interval);
    if (intervalValue <= 0)
      return;
    isActive.value = true;
    if (immediateCallback)
      cb();
    clean();
    timer = setInterval(cb, intervalValue);
  }
  if (immediate && isClient)
    resume();
  if (isRef(interval) || typeof interval === "function") {
    const stopWatch = watch(interval, () => {
      if (isActive.value && isClient)
        resume();
    });
    tryOnScopeDispose(stopWatch);
  }
  tryOnScopeDispose(pause);
  return {
    isActive,
    pause,
    resume
  };
}
function useTimeoutFn(cb, interval, options = {}) {
  const {
    immediate = true
  } = options;
  const isPending = ref(false);
  let timer = null;
  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function stop() {
    isPending.value = false;
    clear();
  }
  function start(...args) {
    clear();
    isPending.value = true;
    timer = setTimeout(() => {
      isPending.value = false;
      timer = null;
      cb(...args);
    }, toValue(interval));
  }
  if (immediate) {
    isPending.value = true;
  }
  tryOnScopeDispose(stop);
  return {
    isPending: readonly(isPending),
    start,
    stop
  };
}
function useTimeout(interval = 1e3, options = {}) {
  const {
    controls: exposeControls = false,
    callback
  } = options;
  const controls = useTimeoutFn(
    callback != null ? callback : noop$3,
    interval,
    options
  );
  const ready = computed(() => !controls.isPending.value);
  if (exposeControls) {
    return {
      ready,
      ...controls
    };
  } else {
    return ready;
  }
}
function useToggle(initialValue = false, options = {}) {
  const {
    truthyValue = true,
    falsyValue = false
  } = options;
  const valueIsRef = isRef(initialValue);
  const _value = ref(initialValue);
  function toggle(value) {
    if (arguments.length) {
      _value.value = value;
      return _value.value;
    } else {
      const truthy = toValue(truthyValue);
      _value.value = _value.value === truthy ? toValue(falsyValue) : truthy;
      return _value.value;
    }
  }
  if (valueIsRef)
    return toggle;
  else
    return [_value, toggle];
}
function watchDebounced(source, cb, options = {}) {
  const {
    debounce = 0,
    maxWait = void 0,
    ...watchOptions
  } = options;
  return watchWithFilter(
    source,
    cb,
    {
      ...watchOptions,
      eventFilter: debounceFilter(debounce, { maxWait })
    }
  );
}
function watchOnce(source, cb, options) {
  const stop = watch(source, (...args) => {
    nextTick(() => stop());
    return cb(...args);
  }, options);
  return stop;
}
function whenever(source, cb, options) {
  const stop = watch(
    source,
    (v, ov, onInvalidate) => {
      if (v) {
        if (options == null ? void 0 : options.once)
          nextTick(() => stop());
        cb(v, ov, onInvalidate);
      }
    },
    {
      ...options,
      once: false
    }
  );
  return stop;
}

function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
const defaultWindow = void 0;
const defaultNavigator = void 0;
function useEventListener(...args) {
  let target;
  let events2;
  let listeners;
  let options;
  if (typeof args[0] === "string" || Array.isArray(args[0])) {
    [events2, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events2, listeners, options] = args;
  }
  if (!target)
    return noop$3;
  if (!Array.isArray(events2))
    events2 = [events2];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options2) => {
    el.addEventListener(event, listener, options2);
    return () => el.removeEventListener(event, listener, options2);
  };
  const stopWatch = watch(
    () => [unrefElement(target), toValue(options)],
    ([el, options2]) => {
      cleanup();
      if (!el)
        return;
      const optionsClone = isObject$1(options2) ? { ...options2 } : options2;
      cleanups.push(
        ...events2.flatMap((event) => {
          return listeners.map((listener) => register(el, event, listener, optionsClone));
        })
      );
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function onClickOutside(target, handler, options = {}) {
  const { window: window2 = defaultWindow, ignore = [], capture = true, detectIframe = false } = options;
  if (!window2)
    return noop$3;
  let shouldListen = true;
  const shouldIgnore = (event) => {
    return ignore.some((target2) => {
      if (typeof target2 === "string") {
        return Array.from(window2.document.querySelectorAll(target2)).some((el) => el === event.target || event.composedPath().includes(el));
      } else {
        const el = unrefElement(target2);
        return el && (event.target === el || event.composedPath().includes(el));
      }
    });
  };
  const listener = (event) => {
    const el = unrefElement(target);
    if (!el || el === event.target || event.composedPath().includes(el))
      return;
    if (event.detail === 0)
      shouldListen = !shouldIgnore(event);
    if (!shouldListen) {
      shouldListen = true;
      return;
    }
    handler(event);
  };
  const cleanup = [
    useEventListener(window2, "click", listener, { passive: true, capture }),
    useEventListener(window2, "pointerdown", (e) => {
      const el = unrefElement(target);
      shouldListen = !shouldIgnore(e) && !!(el && !e.composedPath().includes(el));
    }, { passive: true }),
    detectIframe && useEventListener(window2, "blur", (event) => {
      setTimeout(() => {
        var _a;
        const el = unrefElement(target);
        if (((_a = window2.document.activeElement) == null ? void 0 : _a.tagName) === "IFRAME" && !(el == null ? void 0 : el.contains(window2.document.activeElement)))
          handler(event);
      }, 0);
    })
  ].filter(Boolean);
  const stop = () => cleanup.forEach((fn) => fn());
  return stop;
}
function useActiveElement(options = {}) {
  var _a;
  const {
    window: window2 = defaultWindow,
    deep = true
  } = options;
  const document2 = (_a = options.document) != null ? _a : window2 == null ? void 0 : window2.document;
  const getDeepActiveElement = () => {
    var _a2;
    let element = document2 == null ? void 0 : document2.activeElement;
    if (deep) {
      while (element == null ? void 0 : element.shadowRoot)
        element = (_a2 = element == null ? void 0 : element.shadowRoot) == null ? void 0 : _a2.activeElement;
    }
    return element;
  };
  const activeElement = ref();
  const trigger = () => {
    activeElement.value = getDeepActiveElement();
  };
  if (window2) {
    useEventListener(window2, "blur", (event) => {
      if (event.relatedTarget !== null)
        return;
      trigger();
    }, true);
    useEventListener(window2, "focus", trigger, true);
  }
  trigger();
  return activeElement;
}
function useMounted() {
  const isMounted = ref(false);
  getCurrentInstance();
  return isMounted;
}
function useSupported(callback) {
  const isMounted = useMounted();
  return computed(() => {
    isMounted.value;
    return Boolean(callback());
  });
}
function useRafFn(fn, options = {}) {
  const {
    immediate = true,
    fpsLimit = void 0,
    window: window2 = defaultWindow
  } = options;
  const isActive = ref(false);
  const intervalLimit = fpsLimit ? 1e3 / fpsLimit : null;
  let previousFrameTimestamp = 0;
  let rafId = null;
  function loop(timestamp2) {
    if (!isActive.value || !window2)
      return;
    if (!previousFrameTimestamp)
      previousFrameTimestamp = timestamp2;
    const delta = timestamp2 - previousFrameTimestamp;
    if (intervalLimit && delta < intervalLimit) {
      rafId = window2.requestAnimationFrame(loop);
      return;
    }
    previousFrameTimestamp = timestamp2;
    fn({ delta, timestamp: timestamp2 });
    rafId = window2.requestAnimationFrame(loop);
  }
  function resume() {
    if (!isActive.value && window2) {
      isActive.value = true;
      previousFrameTimestamp = 0;
      rafId = window2.requestAnimationFrame(loop);
    }
  }
  function pause() {
    isActive.value = false;
    if (rafId != null && window2) {
      window2.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }
  if (immediate)
    resume();
  tryOnScopeDispose(pause);
  return {
    isActive: readonly(isActive),
    pause,
    resume
  };
}
function useMediaQuery(query, options = {}) {
  const { window: window2 = defaultWindow } = options;
  const isSupported = useSupported(() => window2 && "matchMedia" in window2 && typeof window2.matchMedia === "function");
  let mediaQuery;
  const matches = ref(false);
  const handler = (event) => {
    matches.value = event.matches;
  };
  const cleanup = () => {
    if (!mediaQuery)
      return;
    if ("removeEventListener" in mediaQuery)
      mediaQuery.removeEventListener("change", handler);
    else
      mediaQuery.removeListener(handler);
  };
  const stopWatch = watchEffect(() => {
    if (!isSupported.value)
      return;
    cleanup();
    mediaQuery = window2.matchMedia(toValue(query));
    if ("addEventListener" in mediaQuery)
      mediaQuery.addEventListener("change", handler);
    else
      mediaQuery.addListener(handler);
    matches.value = mediaQuery.matches;
  });
  tryOnScopeDispose(() => {
    stopWatch();
    cleanup();
    mediaQuery = void 0;
  });
  return matches;
}
const breakpointsTailwind = {
  "sm": 640,
  "md": 768,
  "lg": 1024,
  "xl": 1280,
  "2xl": 1536
};
function useBreakpoints(breakpoints, options = {}) {
  function getValue2(k, delta) {
    let v = toValue(breakpoints[toValue(k)]);
    if (delta != null)
      v = increaseWithUnit(v, delta);
    if (typeof v === "number")
      v = `${v}px`;
    return v;
  }
  const { window: window2 = defaultWindow, strategy = "min-width" } = options;
  function match(query) {
    if (!window2)
      return false;
    return window2.matchMedia(query).matches;
  }
  const greaterOrEqual = (k) => {
    return useMediaQuery(() => `(min-width: ${getValue2(k)})`, options);
  };
  const smallerOrEqual = (k) => {
    return useMediaQuery(() => `(max-width: ${getValue2(k)})`, options);
  };
  const shortcutMethods = Object.keys(breakpoints).reduce((shortcuts, k) => {
    Object.defineProperty(shortcuts, k, {
      get: () => strategy === "min-width" ? greaterOrEqual(k) : smallerOrEqual(k),
      enumerable: true,
      configurable: true
    });
    return shortcuts;
  }, {});
  function current() {
    const points = Object.keys(breakpoints).map((i) => [i, greaterOrEqual(i)]);
    return computed(() => points.filter(([, v]) => v.value).map(([k]) => k));
  }
  return Object.assign(shortcutMethods, {
    greaterOrEqual,
    smallerOrEqual,
    greater(k) {
      return useMediaQuery(() => `(min-width: ${getValue2(k, 0.1)})`, options);
    },
    smaller(k) {
      return useMediaQuery(() => `(max-width: ${getValue2(k, -0.1)})`, options);
    },
    between(a, b) {
      return useMediaQuery(() => `(min-width: ${getValue2(a)}) and (max-width: ${getValue2(b, -0.1)})`, options);
    },
    isGreater(k) {
      return match(`(min-width: ${getValue2(k, 0.1)})`);
    },
    isGreaterOrEqual(k) {
      return match(`(min-width: ${getValue2(k)})`);
    },
    isSmaller(k) {
      return match(`(max-width: ${getValue2(k, -0.1)})`);
    },
    isSmallerOrEqual(k) {
      return match(`(max-width: ${getValue2(k)})`);
    },
    isInBetween(a, b) {
      return match(`(min-width: ${getValue2(a)}) and (max-width: ${getValue2(b, -0.1)})`);
    },
    current,
    active() {
      const bps = current();
      return computed(() => bps.value.length === 0 ? "" : bps.value.at(-1));
    }
  });
}
function usePermission(permissionDesc, options = {}) {
  const {
    controls = false,
    navigator = defaultNavigator
  } = options;
  const isSupported = useSupported(() => navigator && "permissions" in navigator);
  let permissionStatus;
  const desc = typeof permissionDesc === "string" ? { name: permissionDesc } : permissionDesc;
  const state = ref();
  const onChange = () => {
    if (permissionStatus)
      state.value = permissionStatus.state;
  };
  const query = createSingletonPromise(async () => {
    if (!isSupported.value)
      return;
    if (!permissionStatus) {
      try {
        permissionStatus = await navigator.permissions.query(desc);
        useEventListener(permissionStatus, "change", onChange);
        onChange();
      } catch (e) {
        state.value = "prompt";
      }
    }
    return permissionStatus;
  });
  query();
  if (controls) {
    return {
      state,
      isSupported,
      query
    };
  } else {
    return state;
  }
}
function useClipboard(options = {}) {
  const {
    navigator = defaultNavigator,
    read = false,
    source,
    copiedDuring = 1500,
    legacy = false
  } = options;
  const isClipboardApiSupported = useSupported(() => navigator && "clipboard" in navigator);
  const permissionRead = usePermission("clipboard-read");
  const permissionWrite = usePermission("clipboard-write");
  const isSupported = computed(() => isClipboardApiSupported.value || legacy);
  const text = ref("");
  const copied = ref(false);
  const timeout = useTimeoutFn(() => copied.value = false, copiedDuring);
  function updateText() {
    if (isClipboardApiSupported.value && isAllowed(permissionRead.value)) {
      navigator.clipboard.readText().then((value) => {
        text.value = value;
      });
    } else {
      text.value = legacyRead();
    }
  }
  if (isSupported.value && read)
    useEventListener(["copy", "cut"], updateText);
  async function copy(value = toValue(source)) {
    if (isSupported.value && value != null) {
      if (isClipboardApiSupported.value && isAllowed(permissionWrite.value))
        await navigator.clipboard.writeText(value);
      else
        legacyCopy(value);
      text.value = value;
      copied.value = true;
      timeout.start();
    }
  }
  function legacyCopy(value) {
    const ta = (void 0).createElement("textarea");
    ta.value = value != null ? value : "";
    ta.style.position = "absolute";
    ta.style.opacity = "0";
    (void 0).body.appendChild(ta);
    ta.select();
    (void 0).execCommand("copy");
    ta.remove();
  }
  function legacyRead() {
    var _a, _b, _c;
    return (_c = (_b = (_a = void 0 ) == null ? void 0 : _a.call(void 0)) == null ? void 0 : _b.toString()) != null ? _c : "";
  }
  function isAllowed(status) {
    return status === "granted" || status === "prompt";
  }
  return {
    isSupported,
    text,
    copied,
    copy
  };
}
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__vueuse_ssr_handlers__";
const handlers = /* @__PURE__ */ getHandlers();
function getHandlers() {
  if (!(globalKey in _global))
    _global[globalKey] = _global[globalKey] || {};
  return _global[globalKey];
}
function getSSRHandler(key, fallback) {
  return handlers[key] || fallback;
}
function guessSerializerType(rawInit) {
  return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : rawInit instanceof Date ? "date" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
}
const StorageSerializers = {
  boolean: {
    read: (v) => v === "true",
    write: (v) => String(v)
  },
  object: {
    read: (v) => JSON.parse(v),
    write: (v) => JSON.stringify(v)
  },
  number: {
    read: (v) => Number.parseFloat(v),
    write: (v) => String(v)
  },
  any: {
    read: (v) => v,
    write: (v) => String(v)
  },
  string: {
    read: (v) => v,
    write: (v) => String(v)
  },
  map: {
    read: (v) => new Map(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v.entries()))
  },
  set: {
    read: (v) => new Set(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v))
  },
  date: {
    read: (v) => new Date(v),
    write: (v) => v.toISOString()
  }
};
const customStorageEventName = "vueuse-storage";
function useStorage(key, defaults2, storage, options = {}) {
  var _a;
  const {
    flush = "pre",
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    mergeDefaults = false,
    shallow,
    window: window2 = defaultWindow,
    eventFilter,
    onError = (e) => {
      console.error(e);
    },
    initOnMounted
  } = options;
  const data = (shallow ? shallowRef : ref)(typeof defaults2 === "function" ? defaults2() : defaults2);
  if (!storage) {
    try {
      storage = getSSRHandler("getDefaultStorage", () => {
        var _a2;
        return (_a2 = defaultWindow) == null ? void 0 : _a2.localStorage;
      })();
    } catch (e) {
      onError(e);
    }
  }
  if (!storage)
    return data;
  const rawInit = toValue(defaults2);
  const type = guessSerializerType(rawInit);
  const serializer = (_a = options.serializer) != null ? _a : StorageSerializers[type];
  const { pause: pauseWatch, resume: resumeWatch } = watchPausable(
    data,
    () => write(data.value),
    { flush, deep, eventFilter }
  );
  if (window2 && listenToStorageChanges) {
    tryOnMounted(() => {
      useEventListener(window2, "storage", update);
      useEventListener(window2, customStorageEventName, updateFromCustomEvent);
      if (initOnMounted)
        update();
    });
  }
  if (!initOnMounted)
    update();
  function dispatchWriteEvent(oldValue, newValue) {
    if (window2) {
      window2.dispatchEvent(new CustomEvent(customStorageEventName, {
        detail: {
          key,
          oldValue,
          newValue,
          storageArea: storage
        }
      }));
    }
  }
  function write(v) {
    try {
      const oldValue = storage.getItem(key);
      if (v == null) {
        dispatchWriteEvent(oldValue, null);
        storage.removeItem(key);
      } else {
        const serialized = serializer.write(v);
        if (oldValue !== serialized) {
          storage.setItem(key, serialized);
          dispatchWriteEvent(oldValue, serialized);
        }
      }
    } catch (e) {
      onError(e);
    }
  }
  function read(event) {
    const rawValue = event ? event.newValue : storage.getItem(key);
    if (rawValue == null) {
      if (writeDefaults && rawInit != null)
        storage.setItem(key, serializer.write(rawInit));
      return rawInit;
    } else if (!event && mergeDefaults) {
      const value = serializer.read(rawValue);
      if (typeof mergeDefaults === "function")
        return mergeDefaults(value, rawInit);
      else if (type === "object" && !Array.isArray(value))
        return { ...rawInit, ...value };
      return value;
    } else if (typeof rawValue !== "string") {
      return rawValue;
    } else {
      return serializer.read(rawValue);
    }
  }
  function update(event) {
    if (event && event.storageArea !== storage)
      return;
    if (event && event.key == null) {
      data.value = rawInit;
      return;
    }
    if (event && event.key !== key)
      return;
    pauseWatch();
    try {
      if ((event == null ? void 0 : event.newValue) !== serializer.write(data.value))
        data.value = read(event);
    } catch (e) {
      onError(e);
    } finally {
      if (event)
        nextTick(resumeWatch);
      else
        resumeWatch();
    }
  }
  function updateFromCustomEvent(event) {
    update(event.detail);
  }
  return data;
}
function useMutationObserver(target, callback, options = {}) {
  const { window: window2 = defaultWindow, ...mutationOptions } = options;
  let observer;
  const isSupported = useSupported(() => window2 && "MutationObserver" in window2);
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const targets = computed(() => {
    const value = toValue(target);
    const items = (Array.isArray(value) ? value : [value]).map(unrefElement).filter(notNullish);
    return new Set(items);
  });
  const stopWatch = watch(
    () => targets.value,
    (targets2) => {
      cleanup();
      if (isSupported.value && window2 && targets2.size) {
        observer = new MutationObserver(callback);
        targets2.forEach((el) => observer.observe(el, mutationOptions));
      }
    },
    { immediate: true, flush: "post" }
  );
  const takeRecords = () => {
    return observer == null ? void 0 : observer.takeRecords();
  };
  const stop = () => {
    cleanup();
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    stop,
    takeRecords
  };
}
function useDropZone(target, options = {}) {
  const isOverDropZone = ref(false);
  const files = shallowRef(null);
  return {
    files,
    isOverDropZone
  };
}
function useResizeObserver(target, callback, options = {}) {
  const { window: window2 = defaultWindow, ...observerOptions } = options;
  let observer;
  const isSupported = useSupported(() => window2 && "ResizeObserver" in window2);
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const targets = computed(() => Array.isArray(target) ? target.map((el) => unrefElement(el)) : [unrefElement(target)]);
  const stopWatch = watch(
    targets,
    (els) => {
      cleanup();
      if (isSupported.value && window2) {
        observer = new ResizeObserver(callback);
        for (const _el of els)
          _el && observer.observe(_el, observerOptions);
      }
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    cleanup();
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    stop
  };
}
function useElementBounding(target, options = {}) {
  const {
    reset = true,
    windowResize = true,
    windowScroll = true,
    immediate = true
  } = options;
  const height = ref(0);
  const bottom = ref(0);
  const left = ref(0);
  const right = ref(0);
  const top = ref(0);
  const width = ref(0);
  const x = ref(0);
  const y = ref(0);
  function update() {
    const el = unrefElement(target);
    if (!el) {
      if (reset) {
        height.value = 0;
        bottom.value = 0;
        left.value = 0;
        right.value = 0;
        top.value = 0;
        width.value = 0;
        x.value = 0;
        y.value = 0;
      }
      return;
    }
    const rect = el.getBoundingClientRect();
    height.value = rect.height;
    bottom.value = rect.bottom;
    left.value = rect.left;
    right.value = rect.right;
    top.value = rect.top;
    width.value = rect.width;
    x.value = rect.x;
    y.value = rect.y;
  }
  useResizeObserver(target, update);
  watch(() => unrefElement(target), (ele) => !ele && update());
  useMutationObserver(target, update, {
    attributeFilter: ["style", "class"]
  });
  if (windowScroll)
    useEventListener("scroll", update, { capture: true, passive: true });
  if (windowResize)
    useEventListener("resize", update, { passive: true });
  tryOnMounted(() => {
    if (immediate)
      update();
  });
  return {
    height,
    bottom,
    left,
    right,
    top,
    width,
    x,
    y,
    update
  };
}
function useElementHover(el, options = {}) {
  const {
    delayEnter = 0,
    delayLeave = 0,
    window: window2 = defaultWindow
  } = options;
  const isHovered = ref(false);
  let timer;
  const toggle = (entering) => {
    const delay = entering ? delayEnter : delayLeave;
    if (timer) {
      clearTimeout(timer);
      timer = void 0;
    }
    if (delay)
      timer = setTimeout(() => isHovered.value = entering, delay);
    else
      isHovered.value = entering;
  };
  if (!window2)
    return isHovered;
  useEventListener(el, "mouseenter", () => toggle(true), { passive: true });
  useEventListener(el, "mouseleave", () => toggle(false), { passive: true });
  return isHovered;
}
function useIntersectionObserver(target, callback, options = {}) {
  const {
    root,
    rootMargin = "0px",
    threshold = 0.1,
    window: window2 = defaultWindow,
    immediate = true
  } = options;
  const isSupported = useSupported(() => window2 && "IntersectionObserver" in window2);
  const targets = computed(() => {
    const _target = toValue(target);
    return (Array.isArray(_target) ? _target : [_target]).map(unrefElement).filter(notNullish);
  });
  let cleanup = noop$3;
  const isActive = ref(immediate);
  const stopWatch = isSupported.value ? watch(
    () => [targets.value, unrefElement(root), isActive.value],
    ([targets2, root2]) => {
      cleanup();
      if (!isActive.value)
        return;
      if (!targets2.length)
        return;
      const observer = new IntersectionObserver(
        callback,
        {
          root: unrefElement(root2),
          rootMargin,
          threshold
        }
      );
      targets2.forEach((el) => el && observer.observe(el));
      cleanup = () => {
        observer.disconnect();
        cleanup = noop$3;
      };
    },
    { immediate, flush: "post" }
  ) : noop$3;
  const stop = () => {
    cleanup();
    stopWatch();
    isActive.value = false;
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    isActive,
    pause() {
      cleanup();
      isActive.value = false;
    },
    resume() {
      isActive.value = true;
    },
    stop
  };
}
const events = /* @__PURE__ */ new Map();
function useEventBus(key) {
  const scope = getCurrentScope();
  function on(listener) {
    var _a;
    const listeners = events.get(key) || /* @__PURE__ */ new Set();
    listeners.add(listener);
    events.set(key, listeners);
    const _off = () => off(listener);
    (_a = scope == null ? void 0 : scope.cleanups) == null ? void 0 : _a.push(_off);
    return _off;
  }
  function once(listener) {
    function _listener(...args) {
      off(_listener);
      listener(...args);
    }
    return on(_listener);
  }
  function off(listener) {
    const listeners = events.get(key);
    if (!listeners)
      return;
    listeners.delete(listener);
    if (!listeners.size)
      reset();
  }
  function reset() {
    events.delete(key);
  }
  function emit(event, payload) {
    var _a;
    (_a = events.get(key)) == null ? void 0 : _a.forEach((v) => v(event, payload));
  }
  return { on, once, off, emit, reset };
}
function useFocusWithin(target, options = {}) {
  const activeElement = useActiveElement(options);
  const targetElement = computed(() => unrefElement(target));
  const focused = computed(() => targetElement.value && activeElement.value ? targetElement.value.contains(activeElement.value) : false);
  return { focused };
}
function resolveElement(el) {
  if (typeof Window !== "undefined" && el instanceof Window)
    return el.document.documentElement;
  if (typeof Document !== "undefined" && el instanceof Document)
    return el.documentElement;
  return el;
}
function useLocalStorage(key, initialValue, options = {}) {
  const { window: window2 = defaultWindow } = options;
  return useStorage(key, initialValue, window2 == null ? void 0 : window2.localStorage, options);
}
const DefaultMagicKeysAliasMap = {
  ctrl: "control",
  command: "meta",
  cmd: "meta",
  option: "alt",
  up: "arrowup",
  down: "arrowdown",
  left: "arrowleft",
  right: "arrowright"
};
function useMagicKeys(options = {}) {
  const {
    reactive: useReactive = false,
    target = defaultWindow,
    aliasMap = DefaultMagicKeysAliasMap,
    passive = true,
    onEventFired = noop$3
  } = options;
  const current = reactive(/* @__PURE__ */ new Set());
  const obj = {
    toJSON() {
      return {};
    },
    current
  };
  const refs = useReactive ? reactive(obj) : obj;
  const metaDeps = /* @__PURE__ */ new Set();
  const usedKeys = /* @__PURE__ */ new Set();
  function setRefs(key, value) {
    if (key in refs) {
      if (useReactive)
        refs[key] = value;
      else
        refs[key].value = value;
    }
  }
  function reset() {
    current.clear();
    for (const key of usedKeys)
      setRefs(key, false);
  }
  function updateRefs(e, value) {
    var _a, _b;
    const key = (_a = e.key) == null ? void 0 : _a.toLowerCase();
    const code = (_b = e.code) == null ? void 0 : _b.toLowerCase();
    const values = [code, key].filter(Boolean);
    if (key) {
      if (value)
        current.add(key);
      else
        current.delete(key);
    }
    for (const key2 of values) {
      usedKeys.add(key2);
      setRefs(key2, value);
    }
    if (key === "meta" && !value) {
      metaDeps.forEach((key2) => {
        current.delete(key2);
        setRefs(key2, false);
      });
      metaDeps.clear();
    } else if (typeof e.getModifierState === "function" && e.getModifierState("Meta") && value) {
      [...current, ...values].forEach((key2) => metaDeps.add(key2));
    }
  }
  useEventListener(target, "keydown", (e) => {
    updateRefs(e, true);
    return onEventFired(e);
  }, { passive });
  useEventListener(target, "keyup", (e) => {
    updateRefs(e, false);
    return onEventFired(e);
  }, { passive });
  useEventListener("blur", reset, { passive: true });
  useEventListener("focus", reset, { passive: true });
  const proxy = new Proxy(
    refs,
    {
      get(target2, prop, rec) {
        if (typeof prop !== "string")
          return Reflect.get(target2, prop, rec);
        prop = prop.toLowerCase();
        if (prop in aliasMap)
          prop = aliasMap[prop];
        if (!(prop in refs)) {
          if (/[+_-]/.test(prop)) {
            const keys2 = prop.split(/[+_-]/g).map((i) => i.trim());
            refs[prop] = computed(() => keys2.every((key) => toValue(proxy[key])));
          } else {
            refs[prop] = ref(false);
          }
        }
        const r = Reflect.get(target2, prop, rec);
        return useReactive ? toValue(r) : r;
      }
    }
  );
  return proxy;
}
function useNetwork(options = {}) {
  const { window: window2 = defaultWindow } = options;
  const navigator = window2 == null ? void 0 : window2.navigator;
  const isSupported = useSupported(() => navigator && "connection" in navigator);
  const isOnline = ref(true);
  const saveData = ref(false);
  const offlineAt = ref(void 0);
  const onlineAt = ref(void 0);
  const downlink = ref(void 0);
  const downlinkMax = ref(void 0);
  const rtt = ref(void 0);
  const effectiveType = ref(void 0);
  const type = ref("unknown");
  const connection = isSupported.value && navigator.connection;
  function updateNetworkInformation() {
    if (!navigator)
      return;
    isOnline.value = navigator.onLine;
    offlineAt.value = isOnline.value ? void 0 : Date.now();
    onlineAt.value = isOnline.value ? Date.now() : void 0;
    if (connection) {
      downlink.value = connection.downlink;
      downlinkMax.value = connection.downlinkMax;
      effectiveType.value = connection.effectiveType;
      rtt.value = connection.rtt;
      saveData.value = connection.saveData;
      type.value = connection.type;
    }
  }
  if (window2) {
    useEventListener(window2, "offline", () => {
      isOnline.value = false;
      offlineAt.value = Date.now();
    });
    useEventListener(window2, "online", () => {
      isOnline.value = true;
      onlineAt.value = Date.now();
    });
  }
  if (connection)
    useEventListener(connection, "change", updateNetworkInformation, false);
  updateNetworkInformation();
  return {
    isSupported,
    isOnline,
    saveData,
    offlineAt,
    onlineAt,
    downlink,
    downlinkMax,
    effectiveType,
    rtt,
    type
  };
}
function useNow(options = {}) {
  const {
    controls: exposeControls = false,
    interval = "requestAnimationFrame"
  } = options;
  const now = ref(/* @__PURE__ */ new Date());
  const update = () => now.value = /* @__PURE__ */ new Date();
  const controls = interval === "requestAnimationFrame" ? useRafFn(update, { immediate: true }) : useIntervalFn(update, interval, { immediate: true });
  if (exposeControls) {
    return {
      now,
      ...controls
    };
  } else {
    return now;
  }
}
function useOnline(options = {}) {
  const { isOnline } = useNetwork(options);
  return isOnline;
}
function usePreferredReducedMotion(options) {
  const isReduced = useMediaQuery("(prefers-reduced-motion: reduce)", options);
  return computed(() => {
    if (isReduced.value)
      return "reduce";
    return "no-preference";
  });
}
const elInitialOverflow = /* @__PURE__ */ new WeakMap();
function useScrollLock(element, initialState = false) {
  const isLocked = ref(initialState);
  watch(toRef(element), (el) => {
    const target = resolveElement(toValue(el));
    if (target) {
      const ele = target;
      if (!elInitialOverflow.get(ele))
        elInitialOverflow.set(ele, ele.style.overflow);
      if (isLocked.value)
        ele.style.overflow = "hidden";
    }
  }, {
    immediate: true
  });
  const lock = () => {
    const el = resolveElement(toValue(element));
    if (!el || isLocked.value)
      return;
    el.style.overflow = "hidden";
    isLocked.value = true;
  };
  const unlock = () => {
    var _a;
    const el = resolveElement(toValue(element));
    if (!el || !isLocked.value)
      return;
    el.style.overflow = (_a = elInitialOverflow.get(el)) != null ? _a : "";
    elInitialOverflow.delete(el);
    isLocked.value = false;
  };
  tryOnScopeDispose(unlock);
  return computed({
    get() {
      return isLocked.value;
    },
    set(v) {
      if (v)
        lock();
      else
        unlock();
    }
  });
}
function useShare(shareOptions = {}, options = {}) {
  const { navigator = defaultNavigator } = options;
  const _navigator = navigator;
  const isSupported = useSupported(() => _navigator && "canShare" in _navigator);
  const share = async (overrideOptions = {}) => {
    if (isSupported.value) {
      const data = {
        ...toValue(shareOptions),
        ...toValue(overrideOptions)
      };
      let granted = true;
      if (data.files && _navigator.canShare)
        granted = _navigator.canShare({ files: data.files });
      if (granted)
        return _navigator.share(data);
    }
  };
  return {
    isSupported,
    share
  };
}
const DEFAULT_UNITS = [
  { max: 6e4, value: 1e3, name: "second" },
  { max: 276e4, value: 6e4, name: "minute" },
  { max: 72e6, value: 36e5, name: "hour" },
  { max: 5184e5, value: 864e5, name: "day" },
  { max: 24192e5, value: 6048e5, name: "week" },
  { max: 28512e6, value: 2592e6, name: "month" },
  { max: Number.POSITIVE_INFINITY, value: 31536e6, name: "year" }
];
const DEFAULT_MESSAGES = {
  justNow: "just now",
  past: (n) => n.match(/\d/) ? `${n} ago` : n,
  future: (n) => n.match(/\d/) ? `in ${n}` : n,
  month: (n, past) => n === 1 ? past ? "last month" : "next month" : `${n} month${n > 1 ? "s" : ""}`,
  year: (n, past) => n === 1 ? past ? "last year" : "next year" : `${n} year${n > 1 ? "s" : ""}`,
  day: (n, past) => n === 1 ? past ? "yesterday" : "tomorrow" : `${n} day${n > 1 ? "s" : ""}`,
  week: (n, past) => n === 1 ? past ? "last week" : "next week" : `${n} week${n > 1 ? "s" : ""}`,
  hour: (n) => `${n} hour${n > 1 ? "s" : ""}`,
  minute: (n) => `${n} minute${n > 1 ? "s" : ""}`,
  second: (n) => `${n} second${n > 1 ? "s" : ""}`,
  invalid: ""
};
function DEFAULT_FORMATTER(date) {
  return date.toISOString().slice(0, 10);
}
function useTimeAgo(time, options = {}) {
  const {
    controls: exposeControls = false,
    updateInterval = 3e4
  } = options;
  const { now, ...controls } = useNow({ interval: updateInterval, controls: true });
  const timeAgo = computed(() => formatTimeAgo(new Date(toValue(time)), options, toValue(now)));
  if (exposeControls) {
    return {
      timeAgo,
      ...controls
    };
  } else {
    return timeAgo;
  }
}
function formatTimeAgo(from, options = {}, now = Date.now()) {
  var _a;
  const {
    max,
    messages = DEFAULT_MESSAGES,
    fullDateFormatter = DEFAULT_FORMATTER,
    units = DEFAULT_UNITS,
    showSecond = false,
    rounding = "round"
  } = options;
  const roundFn = typeof rounding === "number" ? (n) => +n.toFixed(rounding) : Math[rounding];
  const diff = +now - +from;
  const absDiff = Math.abs(diff);
  function getValue2(diff2, unit) {
    return roundFn(Math.abs(diff2) / unit.value);
  }
  function format(diff2, unit) {
    const val = getValue2(diff2, unit);
    const past = diff2 > 0;
    const str = applyFormat(unit.name, val, past);
    return applyFormat(past ? "past" : "future", str, past);
  }
  function applyFormat(name, val, isPast) {
    const formatter = messages[name];
    if (typeof formatter === "function")
      return formatter(val, isPast);
    return formatter.replace("{0}", val.toString());
  }
  if (absDiff < 6e4 && !showSecond)
    return messages.justNow;
  if (typeof max === "number" && absDiff > max)
    return fullDateFormatter(new Date(from));
  if (typeof max === "string") {
    const unitMax = (_a = units.find((i) => i.name === max)) == null ? void 0 : _a.max;
    if (unitMax && absDiff > unitMax)
      return fullDateFormatter(new Date(from));
  }
  for (const [idx, unit] of units.entries()) {
    const val = getValue2(diff, unit);
    if (val <= 0 && units[idx - 1])
      return format(diff, units[idx - 1]);
    if (absDiff < unit.max)
      return format(diff, unit);
  }
  return messages.invalid;
}
function useWindowSize(options = {}) {
  const {
    window: window2 = defaultWindow,
    initialWidth = Number.POSITIVE_INFINITY,
    initialHeight = Number.POSITIVE_INFINITY,
    listenOrientation = true,
    includeScrollbar = true
  } = options;
  const width = ref(initialWidth);
  const height = ref(initialHeight);
  const update = () => {
    if (window2) {
      if (includeScrollbar) {
        width.value = window2.innerWidth;
        height.value = window2.innerHeight;
      } else {
        width.value = window2.document.documentElement.clientWidth;
        height.value = window2.document.documentElement.clientHeight;
      }
    }
  };
  update();
  tryOnMounted(update);
  useEventListener("resize", update, { passive: true });
  if (listenOrientation) {
    const matches = useMediaQuery("(orientation: portrait)");
    watch(matches, () => update());
  }
  return { width, height };
}

class MastoUnexpectedError extends CustomError {
}

class MastoDeserializeError extends CustomError {
    constructor(message, contentType, data, options) {
        super(message, options);
        this.contentType = contentType;
        this.data = data;
    }
}

class MastoHttpError extends CustomError {
    constructor(props, errorOptions) {
        super(props.message, errorOptions);
        this.statusCode = props.statusCode;
        this.message = props.message;
        this.description = props.description;
        this.additionalProperties = props.additionalProperties;
        this.details = props.details;
    }
}

class MastoTimeoutError extends CustomError {
}

class MastoWebSocketError extends CustomError {
    constructor(message, options) {
        super(message, options);
        this.message = message;
    }
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));

const isRecord = (x) => typeof x === "object" && x !== null && x.constructor.name === "Object";

function noop$2() {
    //
}

class ExponentialBackoffError extends CustomError {
    constructor(attempts, options) {
        super(`Maximum number of attempts reached: ${attempts}`, options);
    }
}
// https://en.wikipedia.org/wiki/Exponential_backoff
class ExponentialBackoff {
    constructor(props = {}) {
        this.props = props;
        this.attempts = 0;
    }
    sleep() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.attempts >= this.maxAttempts) {
                throw new ExponentialBackoffError(this.attempts);
            }
            yield sleep(this.getTimeout());
            this.attempts++;
        });
    }
    clear() {
        this.attempts = 0;
    }
    get factor() {
        var _a;
        return (_a = this.props.factor) !== null && _a !== void 0 ? _a : 1000;
    }
    get base() {
        var _a;
        return (_a = this.props.base) !== null && _a !== void 0 ? _a : 2;
    }
    get maxAttempts() {
        var _a;
        return (_a = this.props.maxAttempts) !== null && _a !== void 0 ? _a : Number.POSITIVE_INFINITY;
    }
    getTimeout() {
        return this.factor * Math.pow(this.base, this.attempts);
    }
    values() {
        return __asyncGenerator(this, arguments, function* values_1() {
            while (this.attempts < this.maxAttempts) {
                yield yield __await(this.sleep());
            }
        });
    }
    [Symbol.asyncIterator]() {
        return this.values();
    }
}

// https://github.com/tc39/proposal-promise-with-resolvers
const createPromiseWithResolvers = () => {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return { promise, resolve, reject };
};

const parseLinkHeader = (linkHeader) => {
    const links = new Map();
    for (const link of linkHeader.split(",")) {
        const match = link.match(/<([^>]+)>;\s*rel="([^"]+)"/);
        if (match) {
            links.set(match[2], match[1]);
        }
    }
    return links;
};

class PaginatorHttp {
    constructor(http, nextPath, nextParams, meta, direction = "next") {
        this.http = http;
        this.nextPath = nextPath;
        this.nextParams = nextParams;
        this.meta = meta;
        this.direction = direction;
    }
    next() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.nextPath == undefined) {
                return { done: true, value: undefined };
            }
            const response = yield this.http.request(Object.assign({ method: "GET", path: this.nextPath, search: this.nextParams }, this.meta));
            const nextUrl = this.getLink(response.headers.get("link"));
            this.nextPath = nextUrl === null || nextUrl === void 0 ? void 0 : nextUrl.pathname;
            this.nextParams = nextUrl === null || nextUrl === void 0 ? void 0 : nextUrl.search.replace(/^\?/, "");
            const data = (yield response.data);
            return {
                done: false,
                value: data,
            };
        });
    }
    return(value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.clear();
            return {
                done: true,
                value: yield value,
            };
        });
    }
    throw(e) {
        return __awaiter(this, void 0, void 0, function* () {
            this.clear();
            throw e;
        });
    }
    then(onfulfilled = Promise.resolve.bind(Promise), onrejected = Promise.reject.bind(Promise)) {
        // we assume the first item won't be undefined
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.next().then((value) => onfulfilled(value.value), onrejected);
    }
    values() {
        return this[Symbol.asyncIterator]();
    }
    getDirection() {
        return this.direction;
    }
    setDirection(direction) {
        return new PaginatorHttp(this.http, this.nextPath, this.nextParams, this.meta, direction);
    }
    [Symbol.asyncIterator]() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this;
    }
    getLink(value) {
        if (value == undefined) {
            return;
        }
        const parsed = parseLinkHeader(value).get(this.direction);
        if (parsed == undefined) {
            return;
        }
        return new URL(parsed);
    }
    clear() {
        this.nextPath = undefined;
        this.nextParams = undefined;
    }
    clone() {
        return new PaginatorHttp(this.http, this.nextPath, this.nextParams, this.meta, this.direction);
    }
}

class HttpActionDispatcher {
    constructor(http, hook) {
        this.http = http;
        this.hook = hook;
    }
    dispatch(action) {
        if (this.hook != undefined) {
            action = this.hook.beforeDispatch(action);
        }
        let result = this.hook.dispatch(action);
        if (result !== false) {
            return result;
        }
        switch (action.type) {
            case "fetch": {
                result = this.http.get(action.path, action.data, action.meta);
                break;
            }
            case "create": {
                result = this.http.post(action.path, action.data, action.meta);
                break;
            }
            case "update": {
                result = this.http.put(action.path, action.data, action.meta);
                break;
            }
            case "remove": {
                result = this.http.delete(action.path, action.data, action.meta);
                break;
            }
            case "list": {
                result = new PaginatorHttp(this.http, action.path, action.data);
                break;
            }
        }
        /* eslint-disable unicorn/prefer-ternary, prettier/prettier */
        if (result instanceof Promise) {
            return result.then((result) => { var _a; return (_a = this.hook) === null || _a === void 0 ? void 0 : _a.afterDispatch(action, result); });
        }
        else {
            return this.hook.afterDispatch(action, result);
        }
        /* eslint-enable unicorn/prefer-ternary, prettier/prettier */
    }
}

function waitForOpen(ws) {
    if (ws.readyState === WebSocket.OPEN) {
        return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
        const handleError = (error) => {
            reject(error);
        };
        const handleClose = () => {
            reject(new Error("WebSocket closed"));
        };
        const handleOpen = () => {
            resolve();
        };
        ws.addEventListener("error", handleError, { once: true });
        ws.addEventListener("close", handleClose, { once: true });
        ws.addEventListener("open", handleOpen, { once: true });
    });
}
function waitForClose(ws) {
    if (ws.readyState === WebSocket.CLOSED) {
        return Promise.resolve();
    }
    return new Promise((resolve) => {
        const handleClose = () => {
            resolve();
        };
        ws.addEventListener("error", handleClose, { once: true });
        ws.addEventListener("close", handleClose, { once: true });
    });
}

class WebSocketConnectorImpl {
    constructor(props, logger) {
        this.props = props;
        this.logger = logger;
        this.queue = [];
        this.disableRetry = false;
        this.initialized = false;
        this.init = () => __awaiter(this, void 0, void 0, function* () {
            var _a, e_1, _b, _c;
            var _d, _e, _f, _g, _h, _j;
            if (this.initialized) {
                return;
            }
            this.initialized = true;
            try {
                for (var _k = true, _l = __asyncValues(this.backoff), _m; _m = yield _l.next(), _a = _m.done, !_a; _k = true) {
                    _c = _m.value;
                    _k = false;
                    const _ = _c;
                    (_d = this.ws) === null || _d === void 0 ? void 0 : _d.close();
                    try {
                        (_e = this.logger) === null || _e === void 0 ? void 0 : _e.log("info", "Connecting to WebSocket...");
                        {
                            const ctor = ((_f = this.props.implementation) !== null && _f !== void 0 ? _f : WebSocket);
                            const ws = new ctor(...this.props.constructorParameters);
                            yield waitForOpen(ws);
                            this.ws = ws;
                        }
                        (_g = this.logger) === null || _g === void 0 ? void 0 : _g.log("info", "Connected to WebSocket");
                        for (const { resolve } of this.queue) {
                            resolve(this.ws);
                        }
                        this.queue = [];
                        yield waitForClose(this.ws);
                        (_h = this.logger) === null || _h === void 0 ? void 0 : _h.log("info", "WebSocket closed");
                        this.backoff.clear();
                    }
                    catch (error) {
                        (_j = this.logger) === null || _j === void 0 ? void 0 : _j.log("error", "WebSocket error:", error);
                    }
                    if (this.disableRetry) {
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_k && !_a && (_b = _l.return)) yield _b.call(_l);
                }
                finally { if (e_1) throw e_1.error; }
            }
            for (const { reject } of this.queue) {
                reject(new MastoWebSocketError(`Failed to connect to WebSocket after ${this.props.maxAttempts} attempts`));
            }
            this.queue = [];
        });
        this.backoff = new ExponentialBackoff({
            maxAttempts: this.props.maxAttempts,
        });
    }
    canAcquire() {
        return !this.disableRetry;
    }
    acquire() {
        return __awaiter(this, void 0, void 0, function* () {
            this.init();
            if (this.ws != undefined) {
                return this.ws;
            }
            const promiseWithResolvers = createPromiseWithResolvers();
            this.queue.push(promiseWithResolvers);
            return yield promiseWithResolvers.promise;
        });
    }
    close() {
        var _a;
        this.disableRetry = true;
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.close();
        this.backoff.clear();
        for (const { reject } of this.queue) {
            reject(new MastoWebSocketError("WebSocket closed"));
        }
        this.queue = [];
    }
}

function toAsyncIterable(ws) {
    return __asyncGenerator(this, arguments, function* toAsyncIterable_1() {
        var _a, e_1, _b, _c;
        const handleClose = (e) => __awaiter(this, void 0, void 0, function* () {
            /* istanbul ignore next */
            if (events.return == undefined) {
                throw new MastoUnexpectedError("events.return is undefined");
            }
            yield events.return(e);
        });
        const handleError = (e) => __awaiter(this, void 0, void 0, function* () {
            /* istanbul ignore next */
            if (events.return == undefined) {
                throw new MastoUnexpectedError("events.return is undefined");
            }
            yield events.return(e);
        });
        const events = on((handler) => {
            ws.addEventListener("message", handler);
            ws.addEventListener("error", handleError);
            ws.addEventListener("close", handleClose);
            return () => {
                ws.removeEventListener("message", handler);
                ws.removeEventListener("error", handleError);
                ws.removeEventListener("close", handleClose);
            };
        });
        try {
            for (var _d = true, events_1 = __asyncValues(events), events_1_1; events_1_1 = yield __await(events_1.next()), _a = events_1_1.done, !_a; _d = true) {
                _c = events_1_1.value;
                _d = false;
                const [event] = _c;
                yield yield __await(event);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = events_1.return)) yield __await(_b.call(events_1));
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}

class WebSocketSubscription {
    constructor(connector, serializer, stream, logger, params) {
        this.connector = connector;
        this.serializer = serializer;
        this.stream = stream;
        this.logger = logger;
        this.params = params;
    }
    values() {
        var _a, _b, _c;
        return __asyncGenerator(this, arguments, function* values_1() {
            var _d, e_1, _e, _f;
            (_a = this.logger) === null || _a === void 0 ? void 0 : _a.log("info", "Subscribing to stream", this.stream);
            while (this.connector.canAcquire()) {
                this.connection = yield __await(this.connector.acquire());
                const messages = toAsyncIterable(this.connection);
                const data = this.serializer.serialize("json", Object.assign({ type: "subscribe", stream: this.stream }, this.params));
                (_b = this.logger) === null || _b === void 0 ? void 0 : _b.log("debug", "↑ WEBSOCKET", data);
                this.connection.send(data);
                try {
                    for (var _g = true, _h = (e_1 = void 0, __asyncValues(this.transformIntoEvents(messages))), _j; _j = yield __await(_h.next()), _d = _j.done, !_d; _g = true) {
                        _f = _j.value;
                        _g = false;
                        const event = _f;
                        if (!this.matches(event))
                            continue;
                        (_c = this.logger) === null || _c === void 0 ? void 0 : _c.log("debug", "↓ WEBSOCKET", event);
                        yield yield __await(event);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_g && !_d && (_e = _h.return)) yield __await(_e.call(_h));
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        });
    }
    unsubscribe() {
        if (this.connection == undefined) {
            return;
        }
        const data = this.serializer.serialize("json", Object.assign({ type: "unsubscribe", stream: this.stream }, this.params));
        this.connection.send(data);
    }
    [Symbol.asyncIterator]() {
        return this.values();
    }
    /**
     * @experimental This is an experimental API.
     */
    [Symbol.dispose]() {
        this.unsubscribe();
    }
    matches(event) {
        var _a;
        // subscribe("hashtag", { tag: "foo" }) -> ["hashtag", "foo"]
        // subscribe("list", { list: "foo" })   -> ["list", "foo"]
        const params = (_a = this.params) !== null && _a !== void 0 ? _a : {};
        const extra = Object.values(params);
        const stream = [this.stream, ...extra];
        return stream.every((s) => event.stream.includes(s));
    }
    transformIntoEvents(messages) {
        return __asyncGenerator(this, arguments, function* transformIntoEvents_1() {
            var _a, e_2, _b, _c;
            try {
                for (var _d = true, messages_1 = __asyncValues(messages), messages_1_1; messages_1_1 = yield __await(messages_1.next()), _a = messages_1_1.done, !_a; _d = true) {
                    _c = messages_1_1.value;
                    _d = false;
                    const message = _c;
                    const event = yield __await(this.parseMessage(message.data));
                    yield yield __await(event);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = messages_1.return)) yield __await(_b.call(messages_1));
                }
                finally { if (e_2) throw e_2.error; }
            }
        });
    }
    parseMessage(rawEvent) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.serializer.deserialize("json", rawEvent);
            if ("error" in data) {
                throw new MastoUnexpectedError(data.error);
            }
            const payload = data.event === "delete" || data.payload == undefined
                ? data.payload
                : this.serializer.deserialize("json", data.payload);
            return {
                stream: data.stream,
                event: data.event,
                payload: payload,
            };
        });
    }
}

class WebSocketActionDispatcher {
    constructor(connector, serializer, logger) {
        this.connector = connector;
        this.serializer = serializer;
        this.logger = logger;
    }
    dispatch(action) {
        var _a;
        if (action.type === "close") {
            this.connector.close();
            return {};
        }
        if (action.type === "prepare") {
            return this.connector.acquire();
        }
        if (action.type !== "subscribe") {
            throw new MastoUnexpectedError(`Unknown action type ${action.type}`);
        }
        const data = (_a = action.data) !== null && _a !== void 0 ? _a : {};
        const stream = action.path.replace(/^\//, "").replaceAll("/", ":");
        return new WebSocketSubscription(this.connector, this.serializer, stream, this.logger, Object.assign({}, data));
    }
    [Symbol.dispose]() {
        this.connector.close();
    }
}

const createActionProxy = (actionDispatcher, options = {}) => {
    const { context = [], applicable = false } = options;
    let target = {};
    const handler = {
        get: get(actionDispatcher, context),
    };
    if (applicable) {
        target = noop$2;
        handler.apply = apply$1(actionDispatcher, context);
    }
    return new Proxy(target, handler);
};
const SPECIAL_PROPERTIES = new Set([
    "then",
    "catch",
    "finally",
    "inspect",
    "toString",
    "valueOf",
    "toJSON",
    "constructor",
    "prototype",
    "length",
    "name",
    "caller",
    "callee",
    "arguments",
    "bind",
    "apply",
    "call",
]);
const get = (actionDispatcher, context) => (_, property) => {
    if (typeof property === "string" && SPECIAL_PROPERTIES.has(property)) {
        return;
    }
    if (property === Symbol.dispose) {
        return actionDispatcher[Symbol.dispose];
    }
    if (typeof property === "symbol") {
        return;
    }
    if (property.startsWith("$")) {
        return createActionProxy(actionDispatcher, {
            context: [...context, property],
            applicable: true,
        });
    }
    return createActionProxy(actionDispatcher, {
        context: [...context, snakeCase(property)],
        applicable: true,
    });
};
const apply$1 = (actionDispatcher, context) => (_1, _2, args) => {
    const action = context.pop();
    /* istanbul ignore next */
    if (action == undefined) {
        throw new Error("No action specified");
    }
    if (action === "$select") {
        return createActionProxy(actionDispatcher, {
            context: [...context, ...args],
            applicable: true,
        });
    }
    const path = "/" + context.join("/");
    const [data, meta] = args;
    return actionDispatcher.dispatch({
        type: action,
        path,
        data,
        meta: meta,
    });
};

function isHttpActionType(actionType) {
    return ["fetch", "create", "update", "remove", "list"].includes(actionType);
}
function toHttpActionType(action) {
    if (isHttpActionType(action)) {
        return action;
    }
    switch (action) {
        case "lookup":
        case "verify_credentials": {
            return "fetch";
        }
        case "update_credentials": {
            return "update";
        }
        default: {
            return "create";
        }
    }
}
function inferEncoding(action, path) {
    if ((action === "create" && path === "/api/v1/accounts") ||
        (action === "update" && path === "/api/v1/accounts/update_credentials") ||
        (action === "create" && path === "/api/v1/email") ||
        (action === "create" && path === "/api/v1/featured_tag") ||
        (action === "create" && path === "/api/v1/media") ||
        (action === "create" && path === "/api/v2/media")) {
        return "multipart-form";
    }
    return "json";
}
function waitForMediaAttachment(id, timeout, http) {
    return __awaiter(this, void 0, void 0, function* () {
        let media;
        const signal = AbortSignal.timeout(timeout);
        while (media == undefined) {
            if (signal.aborted) {
                throw new MastoTimeoutError(`Media processing timed out of ${timeout}ms`);
            }
            try {
                yield sleep(1000);
                const processing = yield http.get(`/api/v1/media/${id}`);
                if (processing.url != undefined) {
                    media = processing;
                }
            }
            catch (error) {
                if (error instanceof MastoHttpError && error.statusCode === 404) {
                    continue;
                }
                throw error;
            }
        }
        return media;
    });
}
class HttpActionDispatcherHookMastodon {
    constructor(http, mediaTimeout = 1000 * 60) {
        this.http = http;
        this.mediaTimeout = mediaTimeout;
    }
    beforeDispatch(action) {
        const type = toHttpActionType(action.type);
        const path = isHttpActionType(action.type)
            ? action.path
            : action.path + "/" + snakeCase(action.type);
        const encoding = inferEncoding(type, path);
        const meta = Object.assign(Object.assign({}, action.meta), { encoding });
        return { type, path, data: action.data, meta };
    }
    dispatch(action) {
        if (action.type === "update" &&
            action.path === "/api/v1/accounts/update_credentials") {
            return this.http.patch(action.path, action.data, action.meta);
        }
        return false;
    }
    afterDispatch(action, result) {
        var _a;
        if (action.type === "create" && action.path === "/api/v2/media") {
            const media = result;
            if (isRecord(action.data) && ((_a = action.data) === null || _a === void 0 ? void 0 : _a.skipPolling) === true) {
                return media;
            }
            return waitForMediaAttachment(media.id, this.mediaTimeout, this.http);
        }
        return result;
    }
}

const mergeAbortSignals = (signals) => {
    const abortController = new AbortController();
    for (const signal of signals) {
        signal.addEventListener("abort", () => abortController.abort(), {
            once: true,
        });
    }
    return abortController.signal;
};

const mergeHeadersInit = ([head, ...tail]) => {
    const headers = new Headers(head);
    for (const entry of tail) {
        for (const [key, value] of new Headers(entry).entries()) {
            headers.set(key, value);
        }
    }
    return headers;
};

const DEFAULT_TIMEOUT_MS = 1000 * 300;
class HttpConfigImpl {
    constructor(props, serializer) {
        this.props = props;
        this.serializer = serializer;
    }
    mergeRequestInitWithDefaults(override = {}) {
        const requestInit = Object.assign({}, this.props.requestInit);
        // Merge
        {
            const { headers, signal } = override, rest = __rest(override, ["headers", "signal"]);
            Object.assign(requestInit, rest);
            requestInit.headers = this.mergeHeadersWithDefaults(headers);
            requestInit.signal = this.mergeAbortSignalWithDefaults(signal);
        }
        return requestInit;
    }
    resolvePath(path, params) {
        const url = new URL(path, this.props.url);
        if (typeof params === "string") {
            url.search = params;
        }
        else if (params != undefined) {
            url.search = this.serializer.serialize("querystring", params);
        }
        return url;
    }
    createTimeout() {
        var _a;
        return AbortSignal.timeout((_a = this.props.timeout) !== null && _a !== void 0 ? _a : DEFAULT_TIMEOUT_MS);
    }
    mergeHeadersWithDefaults(override = {}) {
        var _a, _b;
        const headersInit = mergeHeadersInit([
            (_b = (_a = this.props.requestInit) === null || _a === void 0 ? void 0 : _a.headers) !== null && _b !== void 0 ? _b : {},
            override,
        ]);
        const headers = new Headers(headersInit);
        if (this.props.accessToken) {
            headers.set("Authorization", `Bearer ${this.props.accessToken}`);
        }
        return new Headers(headers);
    }
    mergeAbortSignalWithDefaults(signal) {
        var _a;
        const timeout = this.createTimeout();
        const signals = [timeout];
        if ((_a = this.props.requestInit) === null || _a === void 0 ? void 0 : _a.signal) {
            signals.push(this.props.requestInit.signal);
        }
        if (signal != undefined) {
            signals.push(signal);
        }
        return mergeAbortSignals(signals);
    }
}

class WebSocketConfigImpl {
    constructor(props, serializer) {
        this.props = props;
        this.serializer = serializer;
    }
    getProtocols(protocols = []) {
        if (this.props.useInsecureAccessToken ||
            this.props.accessToken == undefined) {
            return [...protocols];
        }
        return [this.props.accessToken, ...protocols];
    }
    resolvePath(path, params = {}) {
        const url = new URL(path, this.props.streamingApiUrl);
        if (this.props.useInsecureAccessToken) {
            params.accessToken = this.props.accessToken;
        }
        url.search = this.serializer.serialize("querystring", params);
        return url;
    }
    getMaxAttempts() {
        if (this.props.retry === true || this.props.retry == undefined) {
            return Number.POSITIVE_INFINITY;
        }
        if (this.props.retry === false) {
            return 1;
        }
        return this.props.retry;
    }
}

class BaseHttp {
    get(path, data, meta = {}) {
        return this.request(Object.assign({ method: "GET", path, search: data }, meta)).then((response) => response.data);
    }
    post(path, data, meta = {}) {
        return this.request(Object.assign({ method: "POST", path, body: data }, meta)).then((response) => response.data);
    }
    delete(path, data, meta = {}) {
        return this.request(Object.assign({ method: "DELETE", path, body: data }, meta)).then((response) => response.data);
    }
    put(path, data, meta = {}) {
        return this.request(Object.assign({ method: "PUT", path, body: data }, meta)).then((response) => response.data);
    }
    patch(path, data, meta = {}) {
        return this.request(Object.assign({ method: "PATCH", path, body: data }, meta)).then((response) => response.data);
    }
}

const getEncoding = (headers) => {
    var _a;
    const contentType = (_a = headers.get("Content-Type")) === null || _a === void 0 ? void 0 : _a.replace(/\s*;.*$/, "");
    if (typeof contentType !== "string") {
        return;
    }
    switch (contentType) {
        case "application/json": {
            return "json";
        }
        case "multipart/form-data": {
            return "multipart-form";
        }
        default: {
            return;
        }
    }
};

class HttpNativeImpl extends BaseHttp {
    constructor(serializer, config, logger) {
        super();
        this.serializer = serializer;
        this.config = config;
        this.logger = logger;
    }
    request(params) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            const request = this.createRequest(params);
            try {
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.log("info", `↑ ${request.method} ${request.url}`);
                (_b = this.logger) === null || _b === void 0 ? void 0 : _b.log("debug", "\tbody", {
                    encoding: params.encoding,
                    body: params.body,
                });
                const response = yield fetch(request);
                if (!response.ok) {
                    throw response;
                }
                const text = yield response.text();
                const encoding = getEncoding(response.headers);
                if (encoding == undefined) {
                    throw new MastoUnexpectedError("The server returned data with an unknown encoding.");
                }
                const data = this.serializer.deserialize(encoding, text);
                (_c = this.logger) === null || _c === void 0 ? void 0 : _c.log("info", `↓ ${request.method} ${request.url}`);
                (_d = this.logger) === null || _d === void 0 ? void 0 : _d.log("debug", "\tbody", text);
                return {
                    headers: response.headers,
                    data,
                };
            }
            catch (error) {
                (_e = this.logger) === null || _e === void 0 ? void 0 : _e.log("debug", `HTTP failed`, error);
                throw yield this.createError(error);
            }
        });
    }
    createRequest(params) {
        const { method, path, search, encoding = "json", requestInit = {}, } = params;
        const url = this.config.resolvePath(path, search);
        const body = this.serializer.serialize(encoding, params.body);
        const init = this.config.mergeRequestInitWithDefaults(requestInit);
        const request = new Request(url, Object.assign({ method,
            body }, init));
        if (typeof body === "string" && encoding === "json") {
            request.headers.set("Content-Type", "application/json");
        }
        return request;
    }
    createError(error) {
        return __awaiter(this, void 0, void 0, function* () {
            if (error instanceof Response) {
                const encoding = getEncoding(error.headers);
                if (encoding == undefined) {
                    throw new MastoUnexpectedError("The server returned data with an unknown encoding. The server may be down.");
                }
                const data = this.serializer.deserialize(encoding, yield error.text());
                const { error: message, errorDescription, details } = data, additionalProperties = __rest(data, ["error", "errorDescription", "details"]);
                return new MastoHttpError({
                    statusCode: error.status,
                    message: message,
                    description: errorDescription,
                    details: details,
                    additionalProperties,
                }, { cause: error });
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (error != undefined && error.name === "AbortError") {
                return new MastoTimeoutError(`Request timed out`, { cause: error });
            }
            /* istanbul ignore next */
            return error;
        });
    }
}

class LoggerConsoleImpl {
    constructor(level) {
        this.level = level;
    }
    log(type, message, meta) {
        if (!this.level.satisfies(type)) {
            return;
        }
        const args = meta == undefined ? [message] : [message, meta];
        switch (type) {
            case "debug": {
                console.debug(...args);
                return;
            }
            case "info": {
                console.info(...args);
                return;
            }
            case "warn": {
                console.warn(...args);
                return;
            }
            case "error": {
                console.error(...args);
                return;
            }
        }
    }
}

/* eslint-disable unicorn/prefer-math-trunc */
const LOG_TYPES = Object.freeze({
    DEBUG: 1 << 0,
    INFO: 1 << 1,
    WARN: 1 << 2,
    ERROR: 1 << 3,
});
class LogLevel {
    constructor(level) {
        this.level = level;
    }
    satisfies(type) {
        switch (type) {
            case "debug": {
                return Boolean(this.level & LOG_TYPES.DEBUG);
            }
            case "info": {
                return Boolean(this.level & LOG_TYPES.INFO);
            }
            case "warn": {
                return Boolean(this.level & LOG_TYPES.WARN);
            }
            case "error": {
                return Boolean(this.level & LOG_TYPES.ERROR);
            }
        }
    }
    static from(type) {
        switch (type) {
            case "debug": {
                return new LogLevel(LOG_TYPES.DEBUG | LOG_TYPES.INFO | LOG_TYPES.WARN | LOG_TYPES.ERROR);
            }
            case "info": {
                return new LogLevel(LOG_TYPES.INFO | LOG_TYPES.WARN | LOG_TYPES.ERROR);
            }
            case "warn": {
                return new LogLevel(LOG_TYPES.WARN | LOG_TYPES.ERROR);
            }
            case "error": {
                return new LogLevel(LOG_TYPES.ERROR);
            }
        }
    }
}

const createLogger = (type) => {
    const level = LogLevel.from(type !== null && type !== void 0 ? type : "warn");
    return new LoggerConsoleImpl(level);
};

const flattenRecord = (object, parent = "") => {
    if (Array.isArray(object)) {
        return object
            .map((value, i) => flattenRecord(value, parent == "" ? i.toString() : `${parent}[${i}]`))
            .reduce((prev, curr) => Object.assign(prev, curr), {});
    }
    if (isRecord(object)) {
        return Object.entries(object)
            .map(([key, value]) => flattenRecord(value, parent === "" ? key : `${parent}[${key}]`))
            .reduce((prev, curr) => Object.assign(prev, curr), {});
    }
    // Unit of the monoid is always an object
    return parent === ""
        ? object
        : { [parent]: object };
};

const flatten = (object, parent = "") => {
    if (Array.isArray(object)) {
        return object.flatMap((value, i) => flatten(value, parent == "" ? i.toString() : `${parent}[]`));
    }
    if (isRecord(object)) {
        return Object.entries(object).flatMap(([key, value]) => flatten(value, parent === "" ? key : `${parent}[${key}]`));
    }
    return [[parent, object]];
};
const stringify = (object) => {
    return flatten(object)
        .filter(([, v]) => v != undefined)
        .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
        .join("&");
};
const railsQueryString = { stringify };

const _transformKeys = (data, transform) => {
    if (Array.isArray(data)) {
        return data.map((value) => _transformKeys(value, transform));
    }
    if (isRecord(data)) {
        return Object.fromEntries(Object.entries(data).map(([key, value]) => [
            transform(key),
            _transformKeys(value, transform),
        ]));
    }
    return data;
};
const transformKeys = (data, transform) => {
    const f = (key) => {
        // `PATCH /v1/preferences` uses `:` as a delimiter
        if (key.includes(":"))
            return key;
        // `PATCH /v2/filters` uses _destroy as a special key
        if (key.startsWith("_"))
            return key;
        return transform(key);
    };
    return _transformKeys(data, f);
};

class SerializerNativeImpl {
    serialize(type, rawData) {
        const data = transformKeys(rawData, snakeCase);
        switch (type) {
            case "json": {
                return JSON.stringify(data);
            }
            case "multipart-form": {
                const formData = new FormData();
                for (const [key, value] of Object.entries(flattenRecord(data))) {
                    formData.append(key, value);
                }
                return formData;
            }
            case "querystring": {
                return railsQueryString.stringify(data);
            }
            default: {
                throw new MastoUnexpectedError(`Unknown content type ${type} to serialize.`);
            }
        }
    }
    deserialize(type, data) {
        switch (type) {
            case "json": {
                try {
                    return transformKeys(JSON.parse(data), camelCase);
                }
                catch (_a) {
                    throw new MastoDeserializeError(`Malformed JSON ${data} returned from the server.`, type, data);
                }
            }
            default: {
                throw new MastoDeserializeError(`Unknown content type ${type} returned from the server.`, type, data);
            }
        }
    }
}

const createRestAPIClient = (props) => {
    const serializer = new SerializerNativeImpl();
    const config = new HttpConfigImpl(props, serializer);
    const logger = createLogger(props.log);
    const http = new HttpNativeImpl(serializer, config, logger);
    const hook = new HttpActionDispatcherHookMastodon(http);
    const actionDispatcher = new HttpActionDispatcher(http, hook);
    const actionProxy = createActionProxy(actionDispatcher, {
        context: ["api"],
    });
    return actionProxy;
};
function createStreamingAPIClient(props) {
    const serializer = new SerializerNativeImpl();
    const config = new WebSocketConfigImpl(props, serializer);
    const logger = createLogger(props.log);
    const connector = new WebSocketConnectorImpl({
        constructorParameters: [
            config.resolvePath("/api/v1/streaming"),
            config.getProtocols(),
        ],
        implementation: props.implementation,
        maxAttempts: config.getMaxAttempts(),
    }, logger);
    const actionDispatcher = new WebSocketActionDispatcher(connector, serializer, logger);
    const actionProxy = createActionProxy(actionDispatcher);
    return actionProxy;
}

function createMasto() {
  return {
    client: shallowRef(void 0),
    streamingClient: shallowRef()
  };
}
function useMasto() {
  return useNuxtApp().$masto;
}
function useMastoClient() {
  return useMasto().client.value;
}
function mastoLogin(masto, user) {
  const server = user.server;
  const url = `https://${server}`;
  const instance = reactive(getInstanceCache(server) || { uri: server, accountDomain: server });
  const accessToken = user.token;
  const createStreamingClient = (streamingApiUrl2) => {
    return streamingApiUrl2 ? createStreamingAPIClient({ streamingApiUrl: streamingApiUrl2, accessToken, implementation: globalThis.WebSocket }) : void 0;
  };
  const streamingApiUrl = instance?.urls?.streamingApi;
  masto.client.value = createRestAPIClient({ url, accessToken });
  masto.streamingClient.value = createStreamingClient(streamingApiUrl);
  masto.client.value.v1.instance.fetch().then((newInstance) => {
    Object.assign(instance, newInstance);
    if (newInstance.urls.streamingApi !== streamingApiUrl)
      masto.streamingClient.value = createStreamingClient(newInstance.urls.streamingApi);
    instanceStorage.value[server] = newInstance;
  });
  return instance;
}
function useStreaming(cb, { immediate = true, controls } = {}) {
  const { streamingClient } = useMasto();
  const isActive = ref(immediate);
  const stream = ref();
  function pause() {
    isActive.value = false;
  }
  function resume() {
    isActive.value = true;
  }
  function cleanup() {
    if (stream.value) {
      stream.value.unsubscribe();
      stream.value = void 0;
    }
  }
  watchEffect(() => {
    cleanup();
    if (streamingClient.value && isActive.value)
      stream.value = cb(streamingClient.value);
  });
  tryOnBeforeUnmount();
  if (controls)
    return { stream, isActive, pause, resume };
  else
    return stream;
}

const cache$1 = new LRUCache({
  max: 1e3
});
function setCached(key, value, override = false) {
  if (override || !cache$1.has(key))
    cache$1.set(key, value);
}
function removeCached(key) {
  cache$1.delete(key);
}
function fetchStatus(id, force = false) {
  const server = currentServer.value;
  const userId = currentUser.value?.account.id;
  const key = `${server}:${userId}:status:${id}`;
  const cached = cache$1.get(key);
  if (cached && !force)
    return Promise.resolve(cached);
  const promise = useMastoClient().v1.statuses.$select(id).fetch().then((status) => {
    cacheStatus(status);
    return status;
  });
  cache$1.set(key, promise);
  return promise;
}
function fetchAccountById(id) {
  if (!id)
    return Promise.resolve(null);
  const server = currentServer.value;
  const userId = currentUser.value?.account.id;
  const key = `${server}:${userId}:account:${id}`;
  const cached = cache$1.get(key);
  if (cached)
    return Promise.resolve(cached);
  const domain = getInstanceDomainFromServer(server);
  const promise = useMastoClient().v1.accounts.$select(id).fetch().then((r) => {
    if (r.acct && !r.acct.includes("@") && domain)
      r.acct = `${r.acct}@${domain}`;
    cacheAccount(r, server, true);
    return r;
  });
  cache$1.set(key, promise);
  return promise;
}
async function fetchAccountByHandle(acct) {
  const server = currentServer.value;
  const userId = currentUser.value?.account.id;
  const domain = getInstanceDomainFromServer(server);
  const userAcct = domain && acct.endsWith(`@${domain}`) ? acct.slice(0, -domain.length - 1) : acct;
  const key = `${server}:${userId}:account:${userAcct}`;
  const cached = cache$1.get(key);
  if (cached)
    return Promise.resolve(cached);
  async function lookupAccount() {
    const client = useMastoClient();
    let account;
    if (!isGotoSocial.value) {
      account = await client.v1.accounts.lookup({ acct: userAcct });
    } else {
      const userAcctDomain = userAcct.includes("@") ? userAcct : `${userAcct}@${domain}`;
      account = (await client.v1.search.fetch({ q: `@${userAcctDomain}`, type: "accounts" })).accounts[0];
    }
    if (account.acct && !account.acct.includes("@") && domain)
      account.acct = `${account.acct}@${domain}`;
    return account;
  }
  const promise = lookupAccount().then((r) => {
    cacheAccount(r, server, true);
    return r;
  });
  cache$1.set(key, promise);
  return promise;
}
function fetchTag(tagName, force = false) {
  const server = currentServer.value;
  const userId = currentUser.value?.account.id;
  const key = `${server}:${userId}:tag:${tagName}`;
  const cached = cache$1.get(key);
  if (cached && !force)
    return Promise.resolve(cached);
  const promise = useMastoClient().v1.tags.$select(tagName).fetch().then((tag) => {
    cacheTag(tag);
    return tag;
  });
  cache$1.set(key, promise);
  return promise;
}
function cacheStatus(status, server = currentServer.value, override) {
  const userId = currentUser.value?.account.id;
  setCached(`${server}:${userId}:status:${status.id}`, status, override);
}
function removeCachedStatus(id, server = currentServer.value) {
  const userId = currentUser.value?.account.id;
  removeCached(`${server}:${userId}:status:${id}`);
}
function cacheAccount(account, server = currentServer.value, override) {
  const userId = currentUser.value?.account.id;
  const userAcct = account.acct.endsWith(`@${server}`) ? account.acct.slice(0, -server.length - 1) : account.acct;
  setCached(`${server}:${userId}:account:${account.id}`, account, override);
  setCached(`${server}:${userId}:account:${userAcct}`, account, override);
}
function cacheTag(tag, server = currentServer.value, override) {
  const userId = currentUser.value?.account.id;
  setCached(`${server}:${userId}:tag:${tag.name}`, tag, override);
}

function getEmojiAttributes(input) {
  const match = typeof input === "string" ? getEmojiMatchesInText(emojiRegEx, input)?.[0] : input;
  const file = emojiFilename(match);
  const className = `iconify-emoji iconify-emoji--${emojiPrefix}${file.padding ? " iconify-emoji-padded" : ""}`;
  return {
    class: className,
    src: `/emojis/${emojiPrefix}/${file.filename}`,
    alt: match.match
  };
}

function useRequestEvent(nuxtApp = useNuxtApp()) {
  return nuxtApp.ssrContext?.event;
}
function useRequestHeaders(include) {
  const event = useRequestEvent();
  const _headers = event ? getRequestHeaders(event) : {};
  if (!include || !event) {
    return _headers;
  }
  const headers = /* @__PURE__ */ Object.create(null);
  for (const _key of include) {
    const key = _key.toLowerCase();
    const header = _headers[key];
    if (header) {
      headers[key] = header;
    }
  }
  return headers;
}

const UserLinkRE = /^(?:https:\/)?\/([^/]+)\/@([^/]+)$/;
const TagLinkRE = /^https?:\/\/([^/]+)\/tags\/([^/]+)\/?$/;
const HTMLTagRE = /<[^>]+>/g;
function getDataUrlFromArr(arr, w, h) {
  if (typeof w === "undefined" || typeof h === "undefined")
    w = h = Math.sqrt(arr.length / 4);
  const canvas = (void 0).createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = w;
  canvas.height = h;
  const imgData = ctx.createImageData(w, h);
  imgData.data.set(arr);
  ctx.putImageData(imgData, 0, 0);
  return canvas.toDataURL();
}
function emojisArrayToObject(emojis) {
  return Object.fromEntries(emojis.map((i) => [i.shortcode, i]));
}
function noop$1() {
}
function useIsMac() {
  const headers = useRequestHeaders(["user-agent"]);
  return computed(() => headers["user-agent"]?.includes("Macintosh") ?? void 0 ?? false);
}
function removeHTMLTags(str) {
  return str.replaceAll(HTMLTagRE, "");
}

const sanitizerBasicClasses = filterClasses(/^(h-\S*|p-\S*|u-\S*|dt-\S*|e-\S*|mention|hashtag|ellipsis|invisible)$/u);
const sanitizer = sanitize({
  // Allow basic elements as seen in https://github.com/mastodon/mastodon/blob/17f79082b098e05b68d6f0d38fabb3ac121879a9/lib/sanitize_ext/sanitize_config.rb
  br: {},
  p: {},
  a: {
    href: filterHref(),
    class: sanitizerBasicClasses,
    rel: set("nofollow noopener noreferrer"),
    target: set("_blank")
  },
  span: {
    class: sanitizerBasicClasses
  },
  // Allow elements potentially created for Markdown code blocks above
  pre: {},
  code: {
    class: filterClasses(/^language-\w+$/)
  },
  // Other elements supported in glitch, as seen in
  // https://github.com/glitch-soc/mastodon/blob/13227e1dafd308dfe1a3effc3379b766274809b3/lib/sanitize_ext/sanitize_config.rb#L75
  abbr: {
    title: keep
  },
  del: {},
  blockquote: {
    cite: filterHref()
  },
  b: {},
  strong: {},
  u: {},
  sub: {},
  sup: {},
  i: {},
  em: {},
  h1: {},
  h2: {},
  h3: {},
  h4: {},
  h5: {},
  ul: {},
  ol: {
    start: keep,
    reversed: keep
  },
  li: {
    value: keep
  }
});
function parseMastodonHTML(html, options = {}) {
  const {
    markdown = true,
    replaceUnicodeEmoji = true,
    convertMentionLink = false,
    collapseMentionLink = false,
    hideEmojis = false,
    mentions,
    status,
    inReplyToStatus
  } = options;
  if (markdown) {
    html = html.replace(/>(```|~~~)(\w*)([\s\S]+?)\1/g, (_1, _2, lang, raw) => {
      const code = htmlToText(raw).replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/`/g, "&#96;");
      const classes = lang ? ` class="language-${lang}"` : "";
      return `><pre><code${classes}>${code}</code></pre>`;
    }).replace(/`([^`\n]*)`/g, (_1, raw) => {
      return raw ? `<code>${htmlToText(raw).replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code>` : "";
    });
  }
  const transforms = [
    sanitizer,
    ...options.astTransforms || []
  ];
  if (hideEmojis) {
    transforms.push(removeUnicodeEmoji);
    transforms.push(removeCustomEmoji(options.emojis ?? {}));
  } else {
    if (replaceUnicodeEmoji)
      transforms.push(transformUnicodeEmoji);
    transforms.push(replaceCustomEmoji(options.emojis ?? {}));
  }
  if (markdown)
    transforms.push(transformMarkdown);
  if (mentions?.length)
    transforms.push(createTransformNamedMentions(mentions));
  if (convertMentionLink)
    transforms.push(transformMentionLink);
  transforms.push(transformParagraphs);
  if (collapseMentionLink)
    transforms.push(transformCollapseMentions(status, inReplyToStatus));
  return transformSync(parse$1(html), transforms);
}
function convertMastodonHTML(html, customEmojis = {}) {
  const tree = parseMastodonHTML(html, {
    emojis: customEmojis,
    markdown: true,
    convertMentionLink: true
  });
  return render(tree);
}
function sanitizeEmbeddedIframe(html) {
  const transforms = [
    sanitize({
      iframe: {
        src: (src) => {
          if (typeof src !== "string")
            return void 0;
          const url = new URL(src);
          return url.protocol === "https:" ? src : void 0;
        },
        allowfullscreen: set("true")
      }
    })
  ];
  return transformSync(parse$1(html), transforms);
}
function htmlToText(html) {
  try {
    const tree = parse$1(html);
    return tree.children.map((n) => treeToText(n)).join("").trim();
  } catch (err) {
    console.error(err);
    return "";
  }
}
function recursiveTreeToText(input) {
  if (input && input.children && input.children.length > 0)
    return input.children.map((n) => recursiveTreeToText(n)).join("");
  else
    return treeToText(input);
}
const emojiIdNeedsWrappingRE = /^(\d|\w|-|_)+$/;
function treeToText(input) {
  let pre = "";
  let body = "";
  let post = "";
  if (input.type === TEXT_NODE)
    return decode$1(input.value);
  if (input.name === "br")
    return "\n";
  if (["p", "pre"].includes(input.name))
    pre = "\n";
  if (input.attributes?.["data-type"] === "mention") {
    const acct = input.attributes["data-id"];
    if (acct)
      return acct.startsWith("@") ? acct : `@${acct}`;
  }
  if (input.name === "code") {
    if (input.parent?.name === "pre") {
      const lang = input.attributes.class?.replace("language-", "");
      pre = `\`\`\`${lang || ""}
`;
      post = "\n```";
    } else {
      pre = "`";
      post = "`";
    }
  } else if (input.name === "b" || input.name === "strong") {
    pre = "**";
    post = "**";
  } else if (input.name === "i" || input.name === "em") {
    pre = "*";
    post = "*";
  } else if (input.name === "del") {
    pre = "~~";
    post = "~~";
  }
  if ("children" in input)
    body = input.children.map((n) => treeToText(n)).join("");
  if (input.name === "img" || input.name === "picture") {
    if (input.attributes.class?.includes("custom-emoji")) {
      const id = input.attributes["data-emoji-id"] ?? input.attributes.alt ?? input.attributes.title ?? "unknown";
      return id.match(emojiIdNeedsWrappingRE) ? `:${id}:` : id;
    }
    if (input.attributes.class?.includes("iconify-emoji"))
      return input.attributes.alt;
  }
  return pre + body + post;
}
function transformSync(doc, transforms) {
  function visit(node, transform, root) {
    if (Array.isArray(node.children)) {
      const children = [];
      for (let i = 0; i < node.children.length; i++) {
        const result = visit(node.children[i], transform, root);
        if (Array.isArray(result))
          children.push(...result);
        else if (result)
          children.push(result);
      }
      node.children = children.map((value) => {
        if (typeof value === "string")
          return { type: TEXT_NODE, value, parent: node };
        value.parent = node;
        return value;
      });
    }
    return transform(node, root);
  }
  for (const transform of transforms)
    doc = visit(doc, transform, doc);
  return doc;
}
function sanitize(allowedElements) {
  return (node) => {
    if (node.type !== ELEMENT_NODE)
      return node;
    if (!Object.prototype.hasOwnProperty.call(allowedElements, node.name))
      return null;
    const attrSanitizers = allowedElements[node.name];
    const attrs = {};
    for (const [name, func] of Object.entries(attrSanitizers)) {
      const value = func(node.attributes[name]);
      if (value !== void 0)
        attrs[name] = value;
    }
    node.attributes = attrs;
    return node;
  };
}
function filterClasses(allowed) {
  return (c) => {
    if (!c)
      return void 0;
    return c.split(/\s/g).filter((cls) => allowed.test(cls)).join(" ");
  };
}
function keep(value) {
  return value;
}
function set(value) {
  return () => value;
}
function filterHref() {
  const LINK_PROTOCOLS = /* @__PURE__ */ new Set([
    "http:",
    "https:",
    "dat:",
    "dweb:",
    "ipfs:",
    "ipns:",
    "ssb:",
    "gopher:",
    "xmpp:",
    "magnet:",
    "gemini:"
  ]);
  return (href) => {
    if (href === void 0)
      return void 0;
    if (href.startsWith("/") || href.startsWith("."))
      return href;
    href = href.replace(/&amp;/g, "&");
    let url;
    try {
      url = new URL(href);
    } catch (err) {
      if (err instanceof TypeError)
        return void 0;
      throw err;
    }
    if (LINK_PROTOCOLS.has(url.protocol))
      return url.toString();
    return "#";
  };
}
function removeUnicodeEmoji(node) {
  if (node.type !== TEXT_NODE)
    return node;
  let start = 0;
  const matches = [];
  findAndReplaceEmojisInText(emojiRegEx, node.value, (match, result) => {
    matches.push(result.slice(start).trimEnd());
    start = result.length + match.match.length;
    return void 0;
  });
  if (matches.length === 0)
    return node;
  matches.push(node.value.slice(start));
  return matches.filter(Boolean);
}
function transformUnicodeEmoji(node) {
  if (node.type !== TEXT_NODE)
    return node;
  let start = 0;
  const matches = [];
  findAndReplaceEmojisInText(emojiRegEx, node.value, (match, result) => {
    const attrs = getEmojiAttributes(match);
    matches.push(result.slice(start));
    matches.push(h$1("img", { src: attrs.src, alt: attrs.alt, class: attrs.class }));
    start = result.length + match.match.length;
    return void 0;
  });
  if (matches.length === 0)
    return node;
  matches.push(node.value.slice(start));
  return matches.filter(Boolean);
}
function removeCustomEmoji(customEmojis) {
  return (node) => {
    if (node.type !== TEXT_NODE)
      return node;
    const split = node.value.split(/\s?:([\w-]+?):/g);
    if (split.length === 1)
      return node;
    return split.map((name, i) => {
      if (i % 2 === 0)
        return name;
      const emoji = customEmojis[name];
      if (!emoji)
        return `:${name}:`;
      return "";
    }).filter(Boolean);
  };
}
function replaceCustomEmoji(customEmojis) {
  return (node) => {
    if (node.type !== TEXT_NODE)
      return node;
    const split = node.value.split(/:([\w-]+?):/g);
    if (split.length === 1)
      return node;
    return split.map((name, i) => {
      if (i % 2 === 0)
        return name;
      const emoji = customEmojis[name];
      if (!emoji)
        return `:${name}:`;
      return h$1(
        "picture",
        {
          "alt": `:${name}:`,
          "class": "custom-emoji",
          "data-emoji-id": name
        },
        [
          h$1(
            "source",
            {
              srcset: emoji.staticUrl,
              media: "(prefers-reduced-motion: reduce)"
            }
          ),
          h$1(
            "img",
            {
              src: emoji.url,
              alt: `:${name}:`
            }
          )
        ]
      );
    }).filter(Boolean);
  };
}
const _markdownReplacements = [
  [/\*\*\*(.*?)\*\*\*/g, ([c]) => h$1("b", null, [h$1("em", null, c)])],
  [/\*\*(.*?)\*\*/g, (c) => h$1("b", null, c)],
  [/\*(.*?)\*/g, (c) => h$1("em", null, c)],
  [/~~(.*?)~~/g, (c) => h$1("del", null, c)],
  [/`([^`]+?)`/g, (c) => h$1("code", null, c)],
  // transform @username@twitter.com as links
  [/\B@([a-zA-Z0-9_]+)@twitter\.com\b/gi, (c) => h$1("a", { href: `https://twitter.com/${c}`, target: "_blank", rel: "nofollow noopener noreferrer", class: "mention external" }, `@${c}@twitter.com`)]
];
function _markdownProcess(value) {
  const results = [];
  let start = 0;
  while (true) {
    let found;
    for (const [re, replacer] of _markdownReplacements) {
      re.lastIndex = start;
      const match = re.exec(value);
      if (match) {
        if (!found || match.index < found.match.index)
          found = { match, replacer };
      }
    }
    if (!found)
      break;
    results.push(value.slice(start, found.match.index));
    results.push(found.replacer(_markdownProcess(found.match[1])));
    start = found.match.index + found.match[0].length;
  }
  results.push(value.slice(start));
  return results.filter(Boolean);
}
function transformMarkdown(node) {
  if (node.type !== TEXT_NODE)
    return node;
  return _markdownProcess(node.value);
}
function addBdiParagraphs(node) {
  if (node.name === "p" && !("dir" in node.attributes) && node.children?.length && node.children.length > 1)
    node.attributes.dir = "auto";
  return node;
}
function transformParagraphs(node) {
  addBdiParagraphs(node);
  if (node.parent?.type === DOCUMENT_NODE && node.name === "p" && node.parent.children.at(-1) !== node)
    return [node, h$1("p")];
  return node;
}
function isMention(node) {
  const child = node.children?.length === 1 ? node.children[0] : null;
  return Boolean(child?.name === "a" && child.attributes.class?.includes("mention"));
}
function isSpacing(node) {
  return node.type === TEXT_NODE && !node.value.trim();
}
function getMentionHandle(node) {
  return hrefToHandle(node.children?.[0].attributes.href) ?? node.children?.[0]?.children?.[0]?.attributes?.["data-id"];
}
function transformCollapseMentions(status, inReplyToStatus) {
  let processed = false;
  return (node, root) => {
    if (processed || node.parent !== root || !node.children)
      return node;
    const mentions = [];
    const children = node.children;
    let trimContentStart;
    for (const child of children) {
      if (isMention(child)) {
        mentions.push(child);
      } else if (isSpacing(child)) {
        mentions.push(child);
      } else {
        if (child.type === TEXT_NODE) {
          trimContentStart = () => {
            child.value = child.value.trimStart();
          };
        }
        if (child.name === "br")
          mentions.push(void 0);
        break;
      }
    }
    processed = true;
    if (mentions.length === 0)
      return node;
    let mentionsCount = 0;
    let contextualMentionsCount = 0;
    let removeNextSpacing = false;
    const contextualMentions = mentions.filter((mention) => {
      if (!mention)
        return false;
      if (removeNextSpacing && isSpacing(mention)) {
        removeNextSpacing = false;
        return false;
      }
      if (isMention(mention)) {
        mentionsCount++;
        if (inReplyToStatus) {
          const mentionHandle = getMentionHandle(mention);
          if (inReplyToStatus.account.acct === mentionHandle || inReplyToStatus.mentions.some((m) => m.acct === mentionHandle)) {
            removeNextSpacing = true;
            return false;
          }
        }
        contextualMentionsCount++;
      }
      return true;
    });
    const showMentions = !(contextualMentionsCount === 0 || mentionsCount === 1 && status?.inReplyToAccountId);
    const grouped = contextualMentionsCount > 2;
    if (!showMentions || grouped)
      trimContentStart?.();
    const contextualChildren = children.slice(mentions.length);
    const mentionNodes = showMentions ? grouped ? [h$1("mention-group", null, ...contextualMentions)] : contextualMentions : [];
    return {
      ...node,
      children: [...mentionNodes, ...contextualChildren]
    };
  };
}
function hrefToHandle(href) {
  const matchUser = href.match(UserLinkRE);
  if (matchUser) {
    const [, server, username] = matchUser;
    return `${username}@${server.replace(/(.+\.)(.+\..+)/, "$2")}`;
  }
}
function transformMentionLink(node) {
  if (node.name === "a" && node.attributes.class?.includes("mention")) {
    const href = node.attributes.href;
    if (href) {
      const handle = hrefToHandle(href);
      if (handle) {
        return h$1("span", { "data-type": "mention", "data-id": handle }, handle);
      }
    }
  }
  return node;
}
function createTransformNamedMentions(mentions) {
  return (node) => {
    if (node.name === "a" && node.attributes.class?.includes("mention")) {
      const href = node.attributes.href;
      const mention = href && mentions.find((m) => m.url === href);
      if (mention) {
        node.attributes.href = `/${currentServer.value}/@${mention.acct}`;
        node.children = [h$1("span", { "data-type": "mention", "data-id": mention.acct }, `@${mention.username}`)];
        return node;
      }
    }
    return node;
  };
}

const currentUserDrafts = computed(() => ({})) ;
const ALL_VISIBILITY = ["public", "unlisted", "private", "direct"];
function getDefaultVisibility(currentVisibility) {
  const preferredVisibility = currentUser.value?.account.source.privacy || "public";
  return ALL_VISIBILITY.indexOf(currentVisibility) > ALL_VISIBILITY.indexOf(preferredVisibility) ? currentVisibility : preferredVisibility;
}
function getDefaultDraft(options = {}) {
  const {
    attachments = [],
    initialText = "",
    status,
    inReplyToId,
    visibility,
    sensitive,
    spoilerText,
    language,
    mentions,
    poll
  } = options;
  return {
    attachments,
    initialText,
    params: {
      status: status || "",
      poll,
      inReplyToId,
      visibility: getDefaultVisibility(visibility || "public"),
      sensitive: sensitive ?? false,
      spoilerText: spoilerText || "",
      language: language || ""
      // auto inferred from current language on posting
    },
    mentions,
    lastUpdated: Date.now()
  };
}
async function getDraftFromStatus(status) {
  const info = {
    status: await convertMastodonHTML(status.content),
    visibility: status.visibility,
    attachments: status.mediaAttachments,
    sensitive: status.sensitive,
    spoilerText: status.spoilerText,
    language: status.language,
    inReplyToId: status.inReplyToId
  };
  return getDefaultDraft(status.mediaAttachments !== void 0 && status.mediaAttachments.length > 0 ? { ...info, mediaIds: status.mediaAttachments.map((att) => att.id) } : {
    ...info,
    poll: status.poll ? {
      expiresIn: Math.abs((/* @__PURE__ */ new Date()).getTime() - new Date(status.poll.expiresAt).getTime()) / 1e3,
      options: [...status.poll.options.map(({ title }) => title), ""],
      multiple: status.poll.multiple,
      hideTotals: status.poll.options[0].votesCount === null
    } : void 0
  });
}
function getAccountsToMention(status) {
  const userId = currentUser.value?.account.id;
  const accountsToMention = /* @__PURE__ */ new Set();
  if (status.account.id !== userId)
    accountsToMention.add(status.account.acct);
  status.mentions.filter((mention) => mention.id !== userId).map((mention) => mention.acct).forEach((i) => accountsToMention.add(i));
  return Array.from(accountsToMention);
}
function getReplyDraft(status) {
  const accountsToMention = getAccountsToMention(status);
  return {
    key: `reply-${status.id}`,
    draft: () => {
      return getDefaultDraft({
        initialText: "",
        inReplyToId: status.id,
        sensitive: status.sensitive,
        spoilerText: status.spoilerText,
        visibility: status.visibility,
        mentions: accountsToMention,
        language: status.language
      });
    }
  };
}
function isEmptyDraft(draft) {
  if (!draft)
    return true;
  const { params, attachments } = draft;
  const status = params.status || "";
  const text = htmlToText(status).trim().replace(/^(@\S+\s?)+/, "").replaceAll(/```/g, "").trim();
  return text.length === 0 && attachments.length === 0;
}
function useDraft(draftKey, initial = () => getDefaultDraft({})) {
  const draft = draftKey ? computed({
    get() {
      if (!currentUserDrafts.value[draftKey])
        currentUserDrafts.value[draftKey] = initial();
      return currentUserDrafts.value[draftKey];
    },
    set(val) {
      currentUserDrafts.value[draftKey] = val;
    }
  }) : ref(initial());
  const isEmpty = computed(() => isEmptyDraft(draft.value));
  onUnmounted(async () => {
    if (isEmpty.value && draftKey) {
      await nextTick();
      delete currentUserDrafts.value[draftKey];
    }
  });
  return { draft, isEmpty };
}
function mentionUser(account) {
  openPublishDialog("dialog", getDefaultDraft({
    status: `@${account.acct} `
  }));
}
function directMessageUser(account) {
  openPublishDialog("dialog", getDefaultDraft({
    status: `@${account.acct} `,
    visibility: "direct"
  }));
}

const confirmDialogChoice = ref();
const confirmDialogLabel = ref();
const errorDialogData = ref();
const mediaPreviewList = ref([]);
const mediaPreviewIndex = ref(0);
const statusEdit = ref();
const dialogDraftKey = ref();
const reportAccount = ref();
const reportStatus = ref();
const commandPanelInput = ref("");
const isFirstVisit = useLocalStorage(STORAGE_KEY_FIRST_VISIT, true);
const isSigninDialogOpen = ref(false);
const isPublishDialogOpen = ref(false);
const isKeyboardShortcutsDialogOpen = ref(false);
const isMediaPreviewOpen = ref(false);
const isEditHistoryDialogOpen = ref(false);
const isPreviewHelpOpen = ref(isFirstVisit.value);
const isCommandPanelOpen = ref(false);
const isConfirmDialogOpen = ref(false);
const isErrorDialogOpen = ref(false);
const isFavouritedBoostedByDialogOpen = ref(false);
const isReportDialogOpen = ref(false);
const lastPublishDialogStatus = ref(null);
const favouritedBoostedByStatusId = ref(null);
function openSigninDialog() {
  isSigninDialogOpen.value = true;
}
async function openConfirmDialog(label) {
  confirmDialogLabel.value = typeof label === "string" ? { title: label } : label;
  confirmDialogChoice.value = void 0;
  isConfirmDialogOpen.value = true;
  await until(isConfirmDialogOpen).toBe(false);
  return confirmDialogChoice.value;
}
async function openPublishDialog(draftKey = "dialog", draft, overwrite = false) {
  dialogDraftKey.value = draftKey;
  if (draft) {
    if (overwrite && !isEmptyDraft(currentUserDrafts.value[draftKey])) ;
    if (overwrite || !currentUserDrafts.value[draftKey])
      currentUserDrafts.value[draftKey] = draft;
  }
  isPublishDialogOpen.value = true;
  await until(isPublishDialogOpen).toBe(false);
}
async function openFavoridedBoostedByDialog(statusId) {
  isFavouritedBoostedByDialogOpen.value = true;
  favouritedBoostedByStatusId.value = statusId;
}
if (isPreviewHelpOpen.value) {
  watch(isPreviewHelpOpen, () => {
    isFirstVisit.value = false;
  });
}
function openMediaPreview(attachments, index = 0) {
  mediaPreviewList.value = attachments;
  mediaPreviewIndex.value = index;
  isMediaPreviewOpen.value = true;
  history.pushState({
    ...history.state,
    mediaPreview: true,
    mediaPreviewList: JSON.stringify(attachments),
    mediaPreviewIndex: index
  }, "");
}
async function openErrorDialog(data) {
  errorDialogData.value = data;
  isErrorDialogOpen.value = true;
  await until(isErrorDialogOpen).toBe(false);
}
function closeMediaPreview() {
  history.back();
}
function openEditHistoryDialog(edit) {
  statusEdit.value = edit;
  isEditHistoryDialogOpen.value = true;
}
function openPreviewHelp() {
  isPreviewHelpOpen.value = true;
}
function closePreviewHelp() {
  isPreviewHelpOpen.value = false;
}
function openCommandPanel(isCommandMode = false) {
  commandPanelInput.value = isCommandMode ? "> " : "";
  isCommandPanelOpen.value = true;
}
function closeCommandPanel() {
  isCommandPanelOpen.value = false;
}
function toggleKeyboardShortcuts() {
  isKeyboardShortcutsDialogOpen.value = !isKeyboardShortcutsDialogOpen.value;
}
function closeKeyboardShortcuts() {
  isKeyboardShortcutsDialogOpen.value = false;
}
function openReportDialog(account, status) {
  reportAccount.value = account;
  reportStatus.value = status;
  isReportDialogOpen.value = true;
}
function closeReportDialog() {
  isReportDialogOpen.value = false;
}

function initializeUsers() {
  let defaultUsers = [];
  let removeUsersOnLocalStorage = false;
  if (globalThis?.localStorage) {
    const usersOnLocalStorageString = globalThis.localStorage.getItem(STORAGE_KEY_USERS);
    if (usersOnLocalStorageString) {
      defaultUsers = JSON.parse(usersOnLocalStorageString);
      removeUsersOnLocalStorage = true;
    }
  }
  const users2 = ref(defaultUsers) ;
  if (removeUsersOnLocalStorage)
    globalThis.localStorage.removeItem(STORAGE_KEY_USERS);
  return users2;
}
const users = initializeUsers() ;
const nodes = useLocalStorage(STORAGE_KEY_NODES, {}, { deep: true });
const currentUserHandle = useLocalStorage(STORAGE_KEY_CURRENT_USER_HANDLE, "");
const instanceStorage = useLocalStorage(STORAGE_KEY_SERVERS, {}, { deep: true });
function getInstanceCache(server) {
  return instanceStorage.value[server];
}
const currentUser = computed(() => {
  if (currentUserHandle.value) {
    const user = users.value.find((user2) => user2.account?.acct === currentUserHandle.value);
    if (user)
      return user;
  }
  return users.value[0];
});
const publicInstance = ref(null);
const currentInstance = computed(() => currentUser.value ? instanceStorage.value[currentUser.value.server] ?? null : publicInstance.value);
function getInstanceDomain(instance) {
  return instance.accountDomain || withoutProtocol(instance.uri);
}
const publicServer = ref("");
const currentServer = computed(() => currentUser.value?.server || publicServer.value);
const currentNodeInfo = computed(() => nodes.value[currentServer.value] || null);
const isGotoSocial = computed(() => currentNodeInfo.value?.software?.name === "gotosocial");
const isGlitchEdition = computed(() => currentInstance.value?.version?.includes("+glitch"));
function useUsers() {
  return users;
}
function useSelfAccount(user) {
  return computed(() => currentUser.value && resolveUnref(user)?.id === currentUser.value.account.id);
}
const characterLimit = computed(() => currentInstance.value?.configuration?.statuses.maxCharacters ?? DEFAULT_POST_CHARS_LIMIT);
async function loginTo(masto, user) {
  const { client } = masto;
  const instance = mastoLogin(masto, user);
  const url = `https://${user.server}`;
  fetch(`${url}/nodeinfo/2.0`).then((r) => r.json()).then((info) => {
    nodes.value[user.server] = info;
  }).catch(() => void 0);
  if (!user?.token) {
    publicServer.value = user.server;
    publicInstance.value = instance;
    return;
  }
  function getUser() {
    return users.value.find((u) => u.server === user.server && u.token === user.token);
  }
  const account = getUser()?.account;
  if (account)
    currentUserHandle.value = account.acct;
  const [me, pushSubscription] = await Promise.all([
    fetchAccountInfo(client.value, user.server),
    // if PWA is not enabled, don't get push subscription
    useAppConfig().pwaEnabled ? client.value.v1.push.subscription.fetch().catch(() => Promise.resolve(void 0)) : Promise.resolve(void 0)
  ]);
  const existingUser = getUser();
  if (existingUser) {
    existingUser.account = me;
    existingUser.pushSubscription = pushSubscription;
  } else {
    users.value.push({
      ...user,
      account: me,
      pushSubscription
    });
  }
  currentUserHandle.value = me.acct;
}
const accountPreferencesMap = /* @__PURE__ */ new Map();
function getExpandSpoilersByDefault(account) {
  return accountPreferencesMap.get(account.acct)?.["reading:expand:spoilers"] ?? false;
}
function getExpandMediaByDefault(account) {
  return accountPreferencesMap.get(account.acct)?.["reading:expand:media"] === "show_all";
}
function getHideMediaByDefault(account) {
  return accountPreferencesMap.get(account.acct)?.["reading:expand:media"] === "hide_all";
}
async function fetchAccountInfo(client, server) {
  const fetchPrefs = async () => {
    try {
      return await client.v1.preferences.fetch();
    } catch (e) {
      console.warn(`Cannot fetch preferences: ${e}`);
      return {};
    }
  };
  const [account, preferences] = await Promise.all([
    client.v1.accounts.verifyCredentials(),
    fetchPrefs()
  ]);
  if (!account.acct.includes("@")) {
    const webDomain = getInstanceDomainFromServer(server);
    account.acct = `${account.acct}@${webDomain}`;
  }
  accountPreferencesMap.set(account.acct, preferences);
  cacheAccount(account, server, true);
  return account;
}
function getInstanceDomainFromServer(server) {
  const instance = getInstanceCache(server);
  const webDomain = instance ? getInstanceDomain(instance) : server;
  return webDomain;
}
async function refreshAccountInfo() {
  const account = await fetchAccountInfo(useMastoClient(), currentServer.value);
  currentUser.value.account = account;
  return account;
}
async function removePushNotificationData(user, fromSWPushManager = true) {
  user.pushSubscription = void 0;
  const { acct } = user.account;
  delete useLocalStorage(STORAGE_KEY_NOTIFICATION, {}).value[acct];
  delete useLocalStorage(STORAGE_KEY_NOTIFICATION_POLICY, {}).value[acct];
  const pwaEnabled = useAppConfig().pwaEnabled;
  const pwa = useNuxtApp().$pwa;
  const registrationError = pwa?.registrationError === true;
  const unregister = pwaEnabled && !registrationError && pwa?.registrationError === true && fromSWPushManager;
  if (unregister && (users.value.length === 0 || users.value.every((u) => !u.pushSubscription))) {
    try {
      const registration = await (void 0).serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription)
        await subscription.unsubscribe();
    } catch {
    }
  }
}
async function removePushNotifications(user) {
  if (!user.pushSubscription)
    return;
  await useMastoClient().v1.push.subscription.remove().catch(() => Promise.resolve());
}
async function switchUser(user) {
  const masto = useMasto();
  await loginTo(masto, user);
  const route = useRoute();
  const router = useRouter();
  if ("server" in route.params && user?.token && !useNuxtApp()._processingMiddleware) {
    await router.push({
      ...route,
      force: true
    });
  }
}
async function signOut() {
  if (!currentUser.value)
    return;
  const masto = useMasto();
  const _currentUserId = currentUser.value.account.id;
  const index = users.value.findIndex((u) => u.account?.id === _currentUserId);
  if (index !== -1) {
    clearUserLocalStorage();
    if (!users.value.some((u, i) => u.server === currentUser.value.server && i !== index))
      delete instanceStorage.value[currentUser.value.server];
    await removePushNotifications(currentUser.value);
    await removePushNotificationData(currentUser.value);
    currentUserHandle.value = "";
    users.value.splice(index, 1);
  }
  currentUserHandle.value = users.value[0]?.account?.acct;
  if (!currentUserHandle.value)
    await useRouter().push("/");
  loginTo(masto, currentUser.value || { server: publicServer.value });
}
function checkLogin() {
  if (!currentUser.value) {
    openSigninDialog();
    return false;
  }
  return true;
}
function useUserLocalStorage(key, initial) {
  return shallowRef(initial());
}
function clearUserLocalStorage(account) {
  if (!account)
    account = currentUser.value?.account;
  if (!account)
    return;
  const id = `${account.acct}@${currentInstance.value ? getInstanceDomain(currentInstance.value) : currentServer.value}`;
  const cacheMap = useUserLocalStorage._;
  cacheMap?.forEach(({ value }) => {
    if (value.value[id])
      delete value.value[id];
  });
}

const __nuxt_page_meta$H = {
      key: (route) => `${route.params.server ?? currentServer.value}:${route.params.account}`
    };

const __nuxt_page_meta$G = null;

const __nuxt_page_meta$F = null;

const __nuxt_page_meta$E = null;

const __nuxt_page_meta$D = null;

const __nuxt_page_meta$C = null;

const __nuxt_page_meta$B = {
      name: "list-accounts"
    };

const __nuxt_page_meta$A = {
      name: "list"
    };

const __nuxt_page_meta$z = {
      middleware: "auth"
    };

const __nuxt_page_meta$y = {
      middleware: "auth"
    };

const __nuxt_page_meta$x = null;

const __nuxt_page_meta$w = null;

const __nuxt_page_meta$v = null;

function getDisplayName(account, options) {
  const displayName = account.displayName || account.username || account.acct || "";
  if (options?.rich)
    return displayName;
  return displayName.replace(/:([\w-]+?):/g, "");
}
function accountToShortHandle(acct) {
  return `@${acct.includes("@") ? acct.split("@")[0] : acct}`;
}
function getShortHandle({ acct }) {
  if (!acct)
    return "";
  return accountToShortHandle(acct);
}
function getServerName(account) {
  if (account.acct?.includes("@"))
    return account.acct.split("@")[1];
  return currentInstance.value ? getInstanceDomain(currentInstance.value) : "";
}
function getFullHandle(account) {
  const handle = `@${account.acct}`;
  if (!currentUser.value || account.acct.includes("@"))
    return handle;
  return `${handle}@${getServerName(account)}`;
}
function toShortHandle(fullHandle) {
  if (!currentUser.value)
    return fullHandle;
  const server = currentUser.value.server;
  if (fullHandle.endsWith(`@${server}`))
    return fullHandle.slice(0, -server.length - 1);
  return fullHandle;
}
function extractAccountHandle(account) {
  let handle = getFullHandle(account).slice(1);
  const uri = currentInstance.value ? getInstanceDomain(currentInstance.value) : currentServer.value;
  if (currentInstance.value && handle.endsWith(`@${uri}`))
    handle = handle.slice(0, -uri.length - 1);
  return handle;
}

function getAccountRoute(account) {
  return useRouter().resolve({
    name: "account-index",
    params: {
      server: currentServer.value,
      account: extractAccountHandle(account)
    }
  });
}
function getAccountFollowingRoute(account) {
  return useRouter().resolve({
    name: "account-following",
    params: {
      server: currentServer.value,
      account: extractAccountHandle(account)
    }
  });
}
function getAccountFollowersRoute(account) {
  return useRouter().resolve({
    name: "account-followers",
    params: {
      server: currentServer.value,
      account: extractAccountHandle(account)
    }
  });
}
function getReportRoute(id) {
  return `https://${currentUser.value?.server}/admin/reports/${encodeURIComponent(id)}`;
}
function getStatusRoute(status) {
  return useRouter().resolve({
    name: "status",
    params: {
      server: currentServer.value,
      account: extractAccountHandle(status.account),
      status: status.id
    }
  });
}
function getTagRoute(tag) {
  return useRouter().resolve({
    name: "tag",
    params: {
      server: currentServer.value,
      tag
    }
  });
}
function getStatusPermalinkRoute(status) {
  return status.url ? withoutProtocol(status.url) : null;
}
function getStatusInReplyToRoute(status) {
  return useRouter().resolve({
    name: "status-by-id",
    params: {
      server: currentServer.value,
      status: status.inReplyToId
    }
  });
}
function navigateToStatus({ status, focusReply = false }) {
  return navigateTo({
    path: getStatusRoute(status).href,
    state: { focusReply }
  });
}

const __nuxt_page_meta$u = {
      name: "status-by-id",
      middleware: async (to) => {let __temp, __restore;
        const params = to.params;
        const id = params.status;
        const status = (([__temp,__restore]=executeAsync(()=>fetchStatus(id))),__temp=await __temp,__restore(),__temp);
        return getStatusRoute(status);
      }
    };

const __nuxt_page_meta$t = {
      name: "tag"
    };

const __nuxt_page_meta$s = {
      middleware: "auth"
    };

const __nuxt_page_meta$r = {
      middleware: "auth"
    };

const __nuxt_page_meta$q = {
      middleware: "auth"
    };

const __nuxt_page_meta$p = {
      middleware: "auth"
    };

const __nuxt_page_meta$o = {
      middleware: "auth"
    };

const __nuxt_page_meta$n = {
      middleware: "auth"
    };

const __nuxt_page_meta$m = {
      middleware: "auth"
    };

const __nuxt_page_meta$l = {
      middleware: "auth",
      alias: ["/signin/callback"]
    };

const __nuxt_page_meta$k = {
      middleware: "auth"
    };

const __nuxt_page_meta$j = null;

const __nuxt_page_meta$i = {
      middleware: "auth"
    };

const __nuxt_page_meta$h = null;

const __nuxt_page_meta$g = null;

const __nuxt_page_meta$f = {
      middleware: "auth"
    };

const __nuxt_page_meta$e = {
      middleware: "auth"
    };

const __nuxt_page_meta$d = null;

const __nuxt_page_meta$c = null;

const __nuxt_page_meta$b = null;

const __nuxt_page_meta$a = null;

const __nuxt_page_meta$9 = {
      middleware: "auth"
    };

const __nuxt_page_meta$8 = {
      middleware: "auth"
    };

const __nuxt_page_meta$7 = {
      middleware: ["auth", () => {
        if (!useAppConfig().pwaEnabled)
          return navigateTo("/settings/notifications");
      }]
    };

const __nuxt_page_meta$6 = null;

const __nuxt_page_meta$5 = {
      middleware: "auth"
    };

const __nuxt_page_meta$4 = {
      middleware: "auth"
    };

const __nuxt_page_meta$3 = {
      middleware: "auth"
    };

const __nuxt_page_meta$2 = null;

const __nuxt_page_meta$1 = {
      wideLayout: true
    };

const __nuxt_page_meta = {
  middleware: () => {
    if (!useAppConfig().pwaEnabled)
      return navigateTo('/')
  },
};

const _routes = [
  {
    name: __nuxt_page_meta$O?.name ?? "permalink",
    path: __nuxt_page_meta$O?.path ?? "/:permalink(.*)*",
    meta: __nuxt_page_meta$O || {},
    alias: __nuxt_page_meta$O?.alias || [],
    redirect: __nuxt_page_meta$O?.redirect,
    component: () => import('./_...permalink_-DkoBH9Kg.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$N?.name ?? "server-@account-status",
    path: __nuxt_page_meta$N?.path ?? "/:server?/@:account()/:status()",
    meta: __nuxt_page_meta$N || {},
    alias: __nuxt_page_meta$N?.alias || [],
    redirect: __nuxt_page_meta$N?.redirect,
    component: () => import('./_status_-Bp_rCaNu.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$H?.name ?? undefined,
    path: __nuxt_page_meta$H?.path ?? "/:server?/@:account()",
    meta: __nuxt_page_meta$H || {},
    alias: __nuxt_page_meta$H?.alias || [],
    redirect: __nuxt_page_meta$H?.redirect,
    component: () => import('./index-DmAxJjCX.mjs').then(m => m.default || m),
    children: [
  {
    name: __nuxt_page_meta$M?.name ?? "server-@account-index-followers",
    path: __nuxt_page_meta$M?.path ?? "followers",
    meta: __nuxt_page_meta$M || {},
    alias: __nuxt_page_meta$M?.alias || [],
    redirect: __nuxt_page_meta$M?.redirect,
    component: () => import('./followers-8281TWQR.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$L?.name ?? "server-@account-index-following",
    path: __nuxt_page_meta$L?.path ?? "following",
    meta: __nuxt_page_meta$L || {},
    alias: __nuxt_page_meta$L?.alias || [],
    redirect: __nuxt_page_meta$L?.redirect,
    component: () => import('./following-xhc-aPud.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$K?.name ?? "server-@account-index",
    path: __nuxt_page_meta$K?.path ?? "",
    meta: __nuxt_page_meta$K || {},
    alias: __nuxt_page_meta$K?.alias || [],
    redirect: __nuxt_page_meta$K?.redirect,
    component: () => import('./index-DMu_RerI.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$J?.name ?? "server-@account-index-media",
    path: __nuxt_page_meta$J?.path ?? "media",
    meta: __nuxt_page_meta$J || {},
    alias: __nuxt_page_meta$J?.alias || [],
    redirect: __nuxt_page_meta$J?.redirect,
    component: () => import('./media-D9ZKetx3.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$I?.name ?? "server-@account-index-with_replies",
    path: __nuxt_page_meta$I?.path ?? "with_replies",
    meta: __nuxt_page_meta$I || {},
    alias: __nuxt_page_meta$I?.alias || [],
    redirect: __nuxt_page_meta$I?.redirect,
    component: () => import('./with_replies-Bm_9uakz.mjs').then(m => m.default || m)
  }
]
  },
  {
    name: undefined,
    path: "/:server?/explore",
    meta: {},
    alias: [],
    redirect: __nuxt_page_meta$C?.redirect,
    component: () => import('./explore-CtkC8x4h.mjs').then(m => m.default || m),
    children: [
  {
    name: "server-explore",
    path: "",
    meta: {},
    alias: [],
    redirect: __nuxt_page_meta$G?.redirect,
    component: () => import('./index-BSHwhZWz.mjs').then(m => m.default || m)
  },
  {
    name: "server-explore-links",
    path: "links",
    meta: {},
    alias: [],
    redirect: __nuxt_page_meta$F?.redirect,
    component: () => import('./links-NCDJvCZ6.mjs').then(m => m.default || m)
  },
  {
    name: "server-explore-tags",
    path: "tags",
    meta: {},
    alias: [],
    redirect: __nuxt_page_meta$E?.redirect,
    component: () => import('./tags-DMOTGSIf.mjs').then(m => m.default || m)
  },
  {
    name: "server-explore-users",
    path: "users",
    meta: {},
    alias: [],
    redirect: __nuxt_page_meta$D?.redirect,
    component: () => import('./users-BL_4uS3r.mjs').then(m => m.default || m)
  }
]
  },
  {
    name: __nuxt_page_meta$z?.name ?? undefined,
    path: __nuxt_page_meta$z?.path ?? "/:server?/list/:list()",
    meta: __nuxt_page_meta$z || {},
    alias: __nuxt_page_meta$z?.alias || [],
    redirect: __nuxt_page_meta$z?.redirect,
    component: () => import('./index-DatN5Iye.mjs').then(m => m.default || m),
    children: [
  {
    name: __nuxt_page_meta$B?.name ?? "server-list-list-index-accounts",
    path: __nuxt_page_meta$B?.path ?? "accounts",
    meta: __nuxt_page_meta$B || {},
    alias: __nuxt_page_meta$B?.alias || [],
    redirect: __nuxt_page_meta$B?.redirect,
    component: () => import('./accounts-BS4e-jkD.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$A?.name ?? "server-list-list-index",
    path: __nuxt_page_meta$A?.path ?? "",
    meta: __nuxt_page_meta$A || {},
    alias: __nuxt_page_meta$A?.alias || [],
    redirect: __nuxt_page_meta$A?.redirect,
    component: () => import('./index-DnNXh7jE.mjs').then(m => m.default || m)
  }
]
  },
  {
    name: __nuxt_page_meta$y?.name ?? "server-lists",
    path: __nuxt_page_meta$y?.path ?? "/:server?/lists",
    meta: __nuxt_page_meta$y || {},
    alias: __nuxt_page_meta$y?.alias || [],
    redirect: __nuxt_page_meta$y?.redirect,
    component: () => import('./lists-e2wsFzfv.mjs').then(m => m.default || m)
  },
  {
    name: "server-public",
    path: "/:server?/public",
    meta: {},
    alias: [],
    redirect: __nuxt_page_meta$x?.redirect,
    component: () => import('./index-voveR--8.mjs').then(m => m.default || m)
  },
  {
    name: "server-public-local",
    path: "/:server?/public/local",
    meta: {},
    alias: [],
    redirect: __nuxt_page_meta$w?.redirect,
    component: () => import('./local-J3hhtqDl.mjs').then(m => m.default || m)
  },
  {
    name: "server-search",
    path: "/:server?/search",
    meta: {},
    alias: [],
    redirect: __nuxt_page_meta$v?.redirect,
    component: () => import('./search-CCuBOTMP.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$u?.name ?? "server-status-status",
    path: __nuxt_page_meta$u?.path ?? "/:server?/status/:status()",
    meta: __nuxt_page_meta$u || {},
    alias: __nuxt_page_meta$u?.alias || [],
    redirect: __nuxt_page_meta$u?.redirect,
    component: () => import('./_status_-DaCnE7Jc.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$t?.name ?? "server-tags-tag",
    path: __nuxt_page_meta$t?.path ?? "/:server?/tags/:tag()",
    meta: __nuxt_page_meta$t || {},
    alias: __nuxt_page_meta$t?.alias || [],
    redirect: __nuxt_page_meta$t?.redirect,
    component: () => import('./_tag_-DEBRSr8Y.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$s?.name ?? "blocks",
    path: __nuxt_page_meta$s?.path ?? "/blocks",
    meta: __nuxt_page_meta$s || {},
    alias: __nuxt_page_meta$s?.alias || [],
    redirect: __nuxt_page_meta$s?.redirect,
    component: () => import('./blocks-BH9en7MK.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$r?.name ?? "bookmarks",
    path: __nuxt_page_meta$r?.path ?? "/bookmarks",
    meta: __nuxt_page_meta$r || {},
    alias: __nuxt_page_meta$r?.alias || [],
    redirect: __nuxt_page_meta$r?.redirect,
    component: () => import('./bookmarks-tz_kU0_G.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$q?.name ?? "compose",
    path: __nuxt_page_meta$q?.path ?? "/compose",
    meta: __nuxt_page_meta$q || {},
    alias: __nuxt_page_meta$q?.alias || [],
    redirect: __nuxt_page_meta$q?.redirect,
    component: () => import('./compose-BEqIdUgB.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$p?.name ?? "conversations",
    path: __nuxt_page_meta$p?.path ?? "/conversations",
    meta: __nuxt_page_meta$p || {},
    alias: __nuxt_page_meta$p?.alias || [],
    redirect: __nuxt_page_meta$p?.redirect,
    component: () => import('./conversations-DFSSSDKG.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$o?.name ?? "domain_blocks",
    path: __nuxt_page_meta$o?.path ?? "/domain_blocks",
    meta: __nuxt_page_meta$o || {},
    alias: __nuxt_page_meta$o?.alias || [],
    redirect: __nuxt_page_meta$o?.redirect,
    component: () => import('./domain_blocks-CZvlIAZ2.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$n?.name ?? "favourites",
    path: __nuxt_page_meta$n?.path ?? "/favourites",
    meta: __nuxt_page_meta$n || {},
    alias: __nuxt_page_meta$n?.alias || [],
    redirect: __nuxt_page_meta$n?.redirect,
    component: () => import('./favourites-D8aXQyBE.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$m?.name ?? "hashtags",
    path: __nuxt_page_meta$m?.path ?? "/hashtags",
    meta: __nuxt_page_meta$m || {},
    alias: __nuxt_page_meta$m?.alias || [],
    redirect: __nuxt_page_meta$m?.redirect,
    component: () => import('./hashtags-CnhscK4d.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$l?.name ?? "home",
    path: __nuxt_page_meta$l?.path ?? "/home",
    meta: __nuxt_page_meta$l || {},
    alias: __nuxt_page_meta$l?.alias || [],
    redirect: __nuxt_page_meta$l?.redirect,
    component: () => import('./home-D-h5bnWd.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$k?.name ?? "index",
    path: __nuxt_page_meta$k?.path ?? "/",
    meta: __nuxt_page_meta$k || {},
    alias: __nuxt_page_meta$k?.alias || [],
    redirect: __nuxt_page_meta$k?.redirect,
    component: () => import('./index-Tp2xdUrw.mjs').then(m => m.default || m)
  },
  {
    name: "intent-post",
    path: "/intent/post",
    meta: {},
    alias: [],
    redirect: __nuxt_page_meta$j?.redirect,
    component: () => import('./post-CjRb5TZB.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$i?.name ?? "mutes",
    path: __nuxt_page_meta$i?.path ?? "/mutes",
    meta: __nuxt_page_meta$i || {},
    alias: __nuxt_page_meta$i?.alias || [],
    redirect: __nuxt_page_meta$i?.redirect,
    component: () => import('./mutes-BrYgVY1a.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$f?.name ?? undefined,
    path: __nuxt_page_meta$f?.path ?? "/notifications",
    meta: __nuxt_page_meta$f || {},
    alias: __nuxt_page_meta$f?.alias || [],
    redirect: __nuxt_page_meta$f?.redirect,
    component: () => import('./notifications-CepMVBke.mjs').then(m => m.default || m),
    children: [
  {
    name: "notifications-filter",
    path: ":filter()",
    meta: {},
    alias: [],
    redirect: __nuxt_page_meta$h?.redirect,
    component: () => import('./_filter_-DAtoOTFq.mjs').then(m => m.default || m)
  },
  {
    name: "notifications",
    path: "",
    meta: {},
    alias: [],
    redirect: __nuxt_page_meta$g?.redirect,
    component: () => import('./index-CR-ak61P.mjs').then(m => m.default || m)
  }
]
  },
  {
    name: __nuxt_page_meta$e?.name ?? "pinned",
    path: __nuxt_page_meta$e?.path ?? "/pinned",
    meta: __nuxt_page_meta$e || {},
    alias: __nuxt_page_meta$e?.alias || [],
    redirect: __nuxt_page_meta$e?.redirect,
    component: () => import('./pinned-ufGuTcMR.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$1?.name ?? undefined,
    path: __nuxt_page_meta$1?.path ?? "/settings",
    meta: __nuxt_page_meta$1 || {},
    alias: __nuxt_page_meta$1?.alias || [],
    redirect: __nuxt_page_meta$1?.redirect,
    component: () => import('./settings-ByhwiXdw.mjs').then(m => m.default || m),
    children: [
  {
    name: "settings-about",
    path: "about",
    meta: {},
    alias: [],
    redirect: __nuxt_page_meta$d?.redirect,
    component: () => import('./index-i0UYE8cC.mjs').then(m => m.default || m)
  },
  {
    name: "settings",
    path: "",
    meta: {},
    alias: [],
    redirect: __nuxt_page_meta$c?.redirect,
    component: () => import('./index-DvaCMkpA.mjs').then(m => m.default || m)
  },
  {
    name: "settings-interface",
    path: "interface",
    meta: {},
    alias: [],
    redirect: __nuxt_page_meta$b?.redirect,
    component: () => import('./index-CDermPdT.mjs').then(m => m.default || m)
  },
  {
    name: "settings-language",
    path: "language",
    meta: {},
    alias: [],
    redirect: __nuxt_page_meta$a?.redirect,
    component: () => import('./index-DU-VxdQg.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$9?.name ?? "settings-notifications",
    path: __nuxt_page_meta$9?.path ?? "notifications",
    meta: __nuxt_page_meta$9 || {},
    alias: __nuxt_page_meta$9?.alias || [],
    redirect: __nuxt_page_meta$9?.redirect,
    component: () => import('./index-ZlynEP1Y.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$8?.name ?? "settings-notifications-notifications",
    path: __nuxt_page_meta$8?.path ?? "notifications/notifications",
    meta: __nuxt_page_meta$8 || {},
    alias: __nuxt_page_meta$8?.alias || [],
    redirect: __nuxt_page_meta$8?.redirect,
    component: () => import('./notifications-NeCQHFQz.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$7?.name ?? "settings-notifications-push-notifications",
    path: __nuxt_page_meta$7?.path ?? "notifications/push-notifications",
    meta: __nuxt_page_meta$7 || {},
    alias: __nuxt_page_meta$7?.alias || [],
    redirect: __nuxt_page_meta$7?.redirect,
    component: () => import('./push-notifications-DfAFkpn4.mjs').then(m => m.default || m)
  },
  {
    name: "settings-preferences",
    path: "preferences",
    meta: {},
    alias: [],
    redirect: __nuxt_page_meta$6?.redirect,
    component: () => import('./index-u3hVBL8h.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$5?.name ?? "settings-profile-appearance",
    path: __nuxt_page_meta$5?.path ?? "profile/appearance",
    meta: __nuxt_page_meta$5 || {},
    alias: __nuxt_page_meta$5?.alias || [],
    redirect: __nuxt_page_meta$5?.redirect,
    component: () => import('./appearance-CtS2hrvg.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$4?.name ?? "settings-profile-featured-tags",
    path: __nuxt_page_meta$4?.path ?? "profile/featured-tags",
    meta: __nuxt_page_meta$4 || {},
    alias: __nuxt_page_meta$4?.alias || [],
    redirect: __nuxt_page_meta$4?.redirect,
    component: () => import('./featured-tags-C5DzMMpt.mjs').then(m => m.default || m)
  },
  {
    name: __nuxt_page_meta$3?.name ?? "settings-profile",
    path: __nuxt_page_meta$3?.path ?? "profile",
    meta: __nuxt_page_meta$3 || {},
    alias: __nuxt_page_meta$3?.alias || [],
    redirect: __nuxt_page_meta$3?.redirect,
    component: () => import('./index-DWfrbAXF.mjs').then(m => m.default || m)
  },
  {
    name: "settings-users",
    path: "users",
    meta: {},
    alias: [],
    redirect: __nuxt_page_meta$2?.redirect,
    component: () => import('./index-CLknhm8d.mjs').then(m => m.default || m)
  }
]
  },
  {
    name: __nuxt_page_meta?.name ?? "share-target",
    path: __nuxt_page_meta?.path ?? "/share-target",
    meta: __nuxt_page_meta || {},
    alias: __nuxt_page_meta?.alias || [],
    redirect: __nuxt_page_meta?.redirect,
    component: () => import('./share-target-ChRM2FRO.mjs').then(m => m.default || m)
  }
];

const _wrapIf = (component, props, slots) => {
  props = props === true ? {} : props;
  return { default: () => props ? h(component, props, slots) : slots.default?.() };
};
function generateRouteKey(route) {
  const source = route?.meta.key ?? route.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => route.params[r.slice(1)]?.toString() || "");
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => comp.components && comp.components.default === from.matched[index]?.components?.default
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}

const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    const behavior = useRouter().options?.scrollBehaviorType ?? "auto";
    let position = savedPosition || void 0;
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (!position && from && to && routeAllowsScrollToTop !== false && isChangingPage(to, from)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
      }
      return false;
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await new Promise((resolve2) => setTimeout(resolve2, 0));
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}

const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
...configRouterOptions,
...routerOptions0,
};

/* _processed_nuxt_unctx_transform */
const validate = defineNuxtRouteMiddleware(async (to) => {let __temp, __restore;
  if (!to.meta?.validate) {
    return;
  }
  useRouter();
  const result = (([__temp,__restore]=executeAsync(()=>Promise.resolve(to.meta.validate(to)))),__temp=await __temp,__restore(),__temp);
  if (result === true) {
    return;
  }
  {
    return result;
  }
});

/* _processed_nuxt_unctx_transform */
const _1_45permalink_45global = defineNuxtRouteMiddleware(async (to, from) => {  return;
});

const _2_45single_45instance_45global = defineNuxtRouteMiddleware(async (to) => {
  return;
});

/* _processed_nuxt_unctx_transform */
const manifest_45route_45rule = defineNuxtRouteMiddleware(async (to) => {  {
    return;
  }
});

const globalMiddleware = [
  validate,
  _1_45permalink_45global,
  _2_45single_45instance_45global,
  manifest_45route_45rule
];
const namedMiddleware = {
  auth: () => import('./auth-BlM-1Fqo.mjs')
};

/* _processed_nuxt_unctx_transform */
const plugin$1 = defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {let __temp, __restore;
    let routerBase = useRuntimeConfig().app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history = routerOptions.history?.(routerBase) ?? (createMemoryHistory(routerBase));
    const routes = routerOptions.routes?.(_routes) ?? _routes;
    let startPosition;
    const initialURL = nuxtApp.ssrContext.url ;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const _route = shallowRef(router.resolve(initialURL));
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      if (to.matched[0]?.components?.default === from.matched[0]?.components?.default) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key]
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    useError();
    try {
      if (true) {
        ;(([__temp,__restore]=executeAsync(()=>router.push(initialURL))),await __temp,__restore());;
      }
      ;(([__temp,__restore]=executeAsync(()=>router.isReady())),await __temp,__restore());;
    } catch (error2) {
(([__temp,__restore]=executeAsync(()=>nuxtApp.runWithContext(() => showError(error2)))),await __temp,__restore());    }
    if (nuxtApp.ssrContext?.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!nuxtApp.ssrContext?.islandContext) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry of toArray(componentMiddleware)) {
            middlewareEntries.add(entry);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules(to.path));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry of middlewareEntries) {
          const middleware = typeof entry === "string" ? nuxtApp._middleware.named[entry] || await namedMiddleware[entry]?.().then((r) => r.default || r) : entry;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry}'.`);
          }
          const result = await nuxtApp.runWithContext(() => middleware(to, from));
          {
            if (result === false || result instanceof Error) {
              const error2 = result || createError$1({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              await nuxtApp.runWithContext(() => showError(error2));
              return false;
            }
          }
          if (result === true) {
            continue;
          }
          if (result || result === false) {
            return result;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach(async (to, _from, failure) => {
      delete nuxtApp._processingMiddleware;
      if (failure) {
        await nuxtApp.callHook("page:loading:end");
      }
      if (failure?.type === 4) {
        return;
      }
      if (to.matched.length === 0) {
        await nuxtApp.runWithContext(() => showError(createError$1({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      } else if (to.redirectedFrom && to.fullPath !== initialURL) {
        await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        const to = router.resolve(initialURL);
        if ("name" in to) {
          to.name = void 0;
        }
        await router.replace({
          ...to,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});

/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function isPlainObject$1(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin) => _p.push(plugin));
        toBeInstalled = [];
      }
    },
    use(plugin) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin);
      } else {
        _p.push(plugin);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
const fallbackRunWithContext = (fn) => fn();
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  }
  if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject$1(targetValue) && isPlainObject$1(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function shouldHydrate(obj) {
  return !isPlainObject$1(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign: assign$2 } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && (!("production" !== "production") )) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = toRefs(pinia.state.value[id]);
    return assign$2(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign$2({ actions: {} }, options);
  const $subscribeOptions = {
    deep: true
    // flush: 'post',
  };
  let isListening;
  let isSyncListening;
  let subscriptions = [];
  let actionSubscriptions = [];
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && (!("production" !== "production") )) {
    {
      pinia.state.value[$id] = {};
    }
  }
  ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign$2($state, newState);
    });
  } : (
    /* istanbul ignore next */
    noop
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  function wrapAction(name, action) {
    return function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name,
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = action.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign$2({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(partialStore);
  pinia._s.set($id, store);
  const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
  const setupStore = runWithContext(() => pinia._e.run(() => (scope = effectScope()).run(setup)));
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
    } else if (typeof prop === "function") {
      const actionValue = wrapAction(key, prop);
      {
        setupStore[key] = actionValue;
      }
      optionsForPlugin.actions[key] = prop;
    } else ;
  }
  {
    assign$2(store, setupStore);
    assign$2(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => pinia.state.value[$id],
    set: (state) => {
      $patch(($state) => {
        assign$2($state, state);
      });
    }
  });
  pinia._p.forEach((extender) => {
    {
      assign$2(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
  }
  function useStore(pinia, hot) {
    const hasContext = hasInjectionContext();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (pinia) || (hasContext ? inject(piniaSymbol, null) : null);
    if (pinia)
      setActivePinia(pinia);
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
    }
    const store = pinia._s.get(id);
    return store;
  }
  useStore.$id = id;
  return useStore;
}

const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef$1(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}

const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  const opts = { ...CookieDefaults, ..._opts };
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? opts.default?.());
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual$1(cookie.value, cookies[name])) {
        return;
      }
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse$2(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}

function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}

function useRequestURL() {
  {
    return getRequestURL(useRequestEvent());
  }
}

const clientOnlySymbol = Symbol.for("nuxt:client-only");
const __nuxt_component_2$1 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  // eslint-disable-next-line vue/require-prop-types
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    provide(clientOnlySymbol, true);
    return (props) => {
      if (mounted.value) {
        return slots.default?.();
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});

const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  function resolveTrailingSlashBehavior(to, resolve) {
    if (!to || options.trailingSlash !== "append" && options.trailingSlash !== "remove") {
      return to;
    }
    if (typeof to === "string") {
      return applyTrailingSlashBehavior(to, options.trailingSlash);
    }
    const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
    const resolvedPath = {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: applyTrailingSlashBehavior(path, options.trailingSlash)
    };
    return resolvedPath;
  }
  return defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const config = useRuntimeConfig();
      const to = computed(() => {
        const path = props.to || props.href || "";
        return resolveTrailingSlashBehavior(path, router.resolve);
      });
      const isAbsoluteUrl = computed(() => typeof to.value === "string" && hasProtocol(to.value, { acceptRelative: true }));
      const hasTarget = computed(() => props.target && props.target !== "_self");
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (hasTarget.value) {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || isAbsoluteUrl.value;
      });
      const prefetched = ref(false);
      const el = void 0 ;
      const elRef = void 0 ;
      return () => {
        if (!isExternal.value) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            if (prefetched.value) {
              routerLinkProps.class = props.prefetchedClass || options.prefetchedClass;
            }
            routerLinkProps.rel = props.rel || void 0;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const href = typeof to.value === "object" ? router.resolve(to.value)?.href ?? null : to.value && !props.external && !isAbsoluteUrl.value ? resolveTrailingSlashBehavior(joinURL(config.app.baseURL, to.value), router.resolve) : to.value || null;
        const target = props.target || null;
        const rel = firstNonUndefined(
          // converts `""` to `null` to prevent the attribute from being added as empty (`rel=""`)
          props.noRel ? "" : props.rel,
          options.externalRelAttribute,
          /*
          * A fallback rel of `noopener noreferrer` is applied for external links or links that open in a new tab.
          * This solves a reverse tabnapping security flaw in browsers pre-2021 as well as improving privacy.
          */
          isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : ""
        ) || null;
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          const navigate = () => navigateTo(href, { replace: props.replace, external: props.external });
          return slots.default({
            href,
            navigate,
            get route() {
              if (!href) {
                return void 0;
              }
              const url = parseURL(href);
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href
              };
            },
            rel,
            target,
            isExternal: isExternal.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { ref: el, href, rel, target }, slots.default?.());
      };
    }
  });
}
const __nuxt_component_0$1 = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
  const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
  const hasProtocolDifferentFromHttp = hasProtocol(to) && !to.startsWith("http");
  if (hasProtocolDifferentFromHttp) {
    return to;
  }
  return normalizeFn(to, true);
}

const plugin = defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);
  setActivePinia(pinia);
  {
    nuxtApp.payload.pinia = pinia.state.value;
  }
  return {
    provide: {
      pinia
    }
  };
});

const reducers = {
  NuxtError: (data) => isNuxtError(data) && data.toJSON(),
  EmptyShallowRef: (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  EmptyRef: (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  ShallowRef: (data) => isRef(data) && isShallow(data) && data.value,
  ShallowReactive: (data) => isReactive(data) && isShallow(data) && toRaw(data),
  Ref: (data) => isRef(data) && data.value,
  Reactive: (data) => isReactive(data) && toRaw(data)
};
const revive_payload_server_hLdkTd5pOU = defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const reducer in reducers) {
      definePayloadReducer(reducer, reducers[reducer]);
    }
  }
});

const components_plugin_KR1HBZs4kY = defineNuxtPlugin({
  name: 'nuxt:global-components',
});

const preference = "system";

const plugin_server_3ZqZMOppMQ = defineNuxtPlugin((nuxtApp) => {
  const colorMode = nuxtApp.ssrContext?.islandContext ? ref({}) : useState("color-mode", () => reactive({
    preference,
    value: preference,
    unknown: true,
    forced: false
  })).value;
  const htmlAttrs = {};
  {
    useHead({ htmlAttrs });
  }
  useRouter().afterEach((to) => {
    const forcedColorMode = to.meta.colorMode;
    if (forcedColorMode && forcedColorMode !== "system") {
      colorMode.value = htmlAttrs["data-color-mode-forced"] = forcedColorMode;
      colorMode.forced = true;
    } else if (forcedColorMode === "system") {
      console.warn("You cannot force the colorMode to system at the page level.");
    }
  });
  nuxtApp.provide("colorMode", colorMode);
});

/*!
  * shared v9.9.1
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
const inBrowser = false;
const makeSymbol = (name, shareable = false) => !shareable ? Symbol(name) : Symbol.for(name);
const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
const isNumber = (val) => typeof val === "number" && isFinite(val);
const isDate = (val) => toTypeString(val) === "[object Date]";
const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
const assign = Object.assign;
function escapeHtml$1(rawText) {
  return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isBoolean = (val) => typeof val === "boolean";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isPlainObject = (val) => {
  if (!isObject(val))
    return false;
  const proto = Object.getPrototypeOf(val);
  return proto === null || proto.constructor === Object;
};
const toDisplayString = (val) => {
  return val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
};
function join(items, separator = "") {
  return items.reduce((str, item, index) => index === 0 ? str + item : str + separator + item, "");
}
function incrementer(code) {
  let current = code;
  return () => ++current;
}
function warn(msg, err) {
  if (typeof console !== "undefined") {
    console.warn(`[intlify] ` + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}
const isNotObjectOrIsArray = (val) => !isObject(val) || isArray(val);
function deepCopy(src, des) {
  if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
    throw new Error("Invalid value");
  }
  const stack = [{ src, des }];
  while (stack.length) {
    const { src: src2, des: des2 } = stack.pop();
    Object.keys(src2).forEach((key) => {
      if (isNotObjectOrIsArray(src2[key]) || isNotObjectOrIsArray(des2[key])) {
        des2[key] = src2[key];
      } else {
        stack.push({ src: src2[key], des: des2[key] });
      }
    });
  }
}

/*!
  * message-compiler v9.9.1
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
function createPosition(line, column, offset) {
  return { line, column, offset };
}
function createLocation(start, end, source) {
  const loc = { start, end };
  if (source != null) {
    loc.source = source;
  }
  return loc;
}
const CompileErrorCodes = {
  // tokenizer error codes
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  // parser error codes
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  // generator error codes
  UNHANDLED_CODEGEN_NODE_TYPE: 15,
  // minifier error codes
  UNHANDLED_MINIFIER_NODE_TYPE: 16,
  // Special value for higher-order compilers to pick up the last code
  // to avoid collision of error codes. This should always be kept as the last
  // item.
  __EXTEND_POINT__: 17
};
function createCompileError(code, loc, options = {}) {
  const { domain, messages, args } = options;
  const msg = code;
  const error = new SyntaxError(String(msg));
  error.code = code;
  if (loc) {
    error.location = loc;
  }
  error.domain = domain;
  return error;
}
function defaultOnError(error) {
  throw error;
}
const CHAR_SP = " ";
const CHAR_CR = "\r";
const CHAR_LF = "\n";
const CHAR_LS = String.fromCharCode(8232);
const CHAR_PS = String.fromCharCode(8233);
function createScanner(str) {
  const _buf = str;
  let _index = 0;
  let _line = 1;
  let _column = 1;
  let _peekOffset = 0;
  const isCRLF = (index2) => _buf[index2] === CHAR_CR && _buf[index2 + 1] === CHAR_LF;
  const isLF = (index2) => _buf[index2] === CHAR_LF;
  const isPS = (index2) => _buf[index2] === CHAR_PS;
  const isLS = (index2) => _buf[index2] === CHAR_LS;
  const isLineEnd = (index2) => isCRLF(index2) || isLF(index2) || isPS(index2) || isLS(index2);
  const index = () => _index;
  const line = () => _line;
  const column = () => _column;
  const peekOffset = () => _peekOffset;
  const charAt = (offset) => isCRLF(offset) || isPS(offset) || isLS(offset) ? CHAR_LF : _buf[offset];
  const currentChar = () => charAt(_index);
  const currentPeek = () => charAt(_index + _peekOffset);
  function next() {
    _peekOffset = 0;
    if (isLineEnd(_index)) {
      _line++;
      _column = 0;
    }
    if (isCRLF(_index)) {
      _index++;
    }
    _index++;
    _column++;
    return _buf[_index];
  }
  function peek() {
    if (isCRLF(_index + _peekOffset)) {
      _peekOffset++;
    }
    _peekOffset++;
    return _buf[_index + _peekOffset];
  }
  function reset() {
    _index = 0;
    _line = 1;
    _column = 1;
    _peekOffset = 0;
  }
  function resetPeek(offset = 0) {
    _peekOffset = offset;
  }
  function skipToPeek() {
    const target = _index + _peekOffset;
    while (target !== _index) {
      next();
    }
    _peekOffset = 0;
  }
  return {
    index,
    line,
    column,
    peekOffset,
    charAt,
    currentChar,
    currentPeek,
    next,
    peek,
    reset,
    resetPeek,
    skipToPeek
  };
}
const EOF = void 0;
const DOT = ".";
const LITERAL_DELIMITER = "'";
const ERROR_DOMAIN$3 = "tokenizer";
function createTokenizer(source, options = {}) {
  const location = options.location !== false;
  const _scnr = createScanner(source);
  const currentOffset = () => _scnr.index();
  const currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index());
  const _initLoc = currentPosition();
  const _initOffset = currentOffset();
  const _context = {
    currentType: 14,
    offset: _initOffset,
    startLoc: _initLoc,
    endLoc: _initLoc,
    lastType: 14,
    lastOffset: _initOffset,
    lastStartLoc: _initLoc,
    lastEndLoc: _initLoc,
    braceNest: 0,
    inLinked: false,
    text: ""
  };
  const context = () => _context;
  const { onError } = options;
  function emitError(code, pos, offset, ...args) {
    const ctx = context();
    pos.column += offset;
    pos.offset += offset;
    if (onError) {
      const loc = location ? createLocation(ctx.startLoc, pos) : null;
      const err = createCompileError(code, loc, {
        domain: ERROR_DOMAIN$3,
        args
      });
      onError(err);
    }
  }
  function getToken(context2, type, value) {
    context2.endLoc = currentPosition();
    context2.currentType = type;
    const token = { type };
    if (location) {
      token.loc = createLocation(context2.startLoc, context2.endLoc);
    }
    if (value != null) {
      token.value = value;
    }
    return token;
  }
  const getEndToken = (context2) => getToken(
    context2,
    14
    /* TokenTypes.EOF */
  );
  function eat(scnr, ch) {
    if (scnr.currentChar() === ch) {
      scnr.next();
      return ch;
    } else {
      emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
      return "";
    }
  }
  function peekSpaces(scnr) {
    let buf = "";
    while (scnr.currentPeek() === CHAR_SP || scnr.currentPeek() === CHAR_LF) {
      buf += scnr.currentPeek();
      scnr.peek();
    }
    return buf;
  }
  function skipSpaces(scnr) {
    const buf = peekSpaces(scnr);
    scnr.skipToPeek();
    return buf;
  }
  function isIdentifierStart(ch) {
    if (ch === EOF) {
      return false;
    }
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || // a-z
    cc >= 65 && cc <= 90 || // A-Z
    cc === 95;
  }
  function isNumberStart(ch) {
    if (ch === EOF) {
      return false;
    }
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57;
  }
  function isNamedIdentifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ret = isIdentifierStart(scnr.currentPeek());
    scnr.resetPeek();
    return ret;
  }
  function isListIdentifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ch = scnr.currentPeek() === "-" ? scnr.peek() : scnr.currentPeek();
    const ret = isNumberStart(ch);
    scnr.resetPeek();
    return ret;
  }
  function isLiteralStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === LITERAL_DELIMITER;
    scnr.resetPeek();
    return ret;
  }
  function isLinkedDotStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 8) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === ".";
    scnr.resetPeek();
    return ret;
  }
  function isLinkedModifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 9) {
      return false;
    }
    peekSpaces(scnr);
    const ret = isIdentifierStart(scnr.currentPeek());
    scnr.resetPeek();
    return ret;
  }
  function isLinkedDelimiterStart(scnr, context2) {
    const { currentType } = context2;
    if (!(currentType === 8 || currentType === 12)) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === ":";
    scnr.resetPeek();
    return ret;
  }
  function isLinkedReferStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 10) {
      return false;
    }
    const fn = () => {
      const ch = scnr.currentPeek();
      if (ch === "{") {
        return isIdentifierStart(scnr.peek());
      } else if (ch === "@" || ch === "%" || ch === "|" || ch === ":" || ch === "." || ch === CHAR_SP || !ch) {
        return false;
      } else if (ch === CHAR_LF) {
        scnr.peek();
        return fn();
      } else {
        return isIdentifierStart(ch);
      }
    };
    const ret = fn();
    scnr.resetPeek();
    return ret;
  }
  function isPluralStart(scnr) {
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === "|";
    scnr.resetPeek();
    return ret;
  }
  function detectModuloStart(scnr) {
    const spaces = peekSpaces(scnr);
    const ret = scnr.currentPeek() === "%" && scnr.peek() === "{";
    scnr.resetPeek();
    return {
      isModulo: ret,
      hasSpace: spaces.length > 0
    };
  }
  function isTextStart(scnr, reset = true) {
    const fn = (hasSpace = false, prev = "", detectModulo = false) => {
      const ch = scnr.currentPeek();
      if (ch === "{") {
        return prev === "%" ? false : hasSpace;
      } else if (ch === "@" || !ch) {
        return prev === "%" ? true : hasSpace;
      } else if (ch === "%") {
        scnr.peek();
        return fn(hasSpace, "%", true);
      } else if (ch === "|") {
        return prev === "%" || detectModulo ? true : !(prev === CHAR_SP || prev === CHAR_LF);
      } else if (ch === CHAR_SP) {
        scnr.peek();
        return fn(true, CHAR_SP, detectModulo);
      } else if (ch === CHAR_LF) {
        scnr.peek();
        return fn(true, CHAR_LF, detectModulo);
      } else {
        return true;
      }
    };
    const ret = fn();
    reset && scnr.resetPeek();
    return ret;
  }
  function takeChar(scnr, fn) {
    const ch = scnr.currentChar();
    if (ch === EOF) {
      return EOF;
    }
    if (fn(ch)) {
      scnr.next();
      return ch;
    }
    return null;
  }
  function takeIdentifierChar(scnr) {
    const closure = (ch) => {
      const cc = ch.charCodeAt(0);
      return cc >= 97 && cc <= 122 || // a-z
      cc >= 65 && cc <= 90 || // A-Z
      cc >= 48 && cc <= 57 || // 0-9
      cc === 95 || // _
      cc === 36;
    };
    return takeChar(scnr, closure);
  }
  function takeDigit(scnr) {
    const closure = (ch) => {
      const cc = ch.charCodeAt(0);
      return cc >= 48 && cc <= 57;
    };
    return takeChar(scnr, closure);
  }
  function takeHexDigit(scnr) {
    const closure = (ch) => {
      const cc = ch.charCodeAt(0);
      return cc >= 48 && cc <= 57 || // 0-9
      cc >= 65 && cc <= 70 || // A-F
      cc >= 97 && cc <= 102;
    };
    return takeChar(scnr, closure);
  }
  function getDigits(scnr) {
    let ch = "";
    let num = "";
    while (ch = takeDigit(scnr)) {
      num += ch;
    }
    return num;
  }
  function readModulo(scnr) {
    skipSpaces(scnr);
    const ch = scnr.currentChar();
    if (ch !== "%") {
      emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
    }
    scnr.next();
    return "%";
  }
  function readText(scnr) {
    let buf = "";
    while (true) {
      const ch = scnr.currentChar();
      if (ch === "{" || ch === "}" || ch === "@" || ch === "|" || !ch) {
        break;
      } else if (ch === "%") {
        if (isTextStart(scnr)) {
          buf += ch;
          scnr.next();
        } else {
          break;
        }
      } else if (ch === CHAR_SP || ch === CHAR_LF) {
        if (isTextStart(scnr)) {
          buf += ch;
          scnr.next();
        } else if (isPluralStart(scnr)) {
          break;
        } else {
          buf += ch;
          scnr.next();
        }
      } else {
        buf += ch;
        scnr.next();
      }
    }
    return buf;
  }
  function readNamedIdentifier(scnr) {
    skipSpaces(scnr);
    let ch = "";
    let name = "";
    while (ch = takeIdentifierChar(scnr)) {
      name += ch;
    }
    if (scnr.currentChar() === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
    }
    return name;
  }
  function readListIdentifier(scnr) {
    skipSpaces(scnr);
    let value = "";
    if (scnr.currentChar() === "-") {
      scnr.next();
      value += `-${getDigits(scnr)}`;
    } else {
      value += getDigits(scnr);
    }
    if (scnr.currentChar() === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
    }
    return value;
  }
  function readLiteral(scnr) {
    skipSpaces(scnr);
    eat(scnr, `'`);
    let ch = "";
    let literal = "";
    const fn = (x) => x !== LITERAL_DELIMITER && x !== CHAR_LF;
    while (ch = takeChar(scnr, fn)) {
      if (ch === "\\") {
        literal += readEscapeSequence(scnr);
      } else {
        literal += ch;
      }
    }
    const current = scnr.currentChar();
    if (current === CHAR_LF || current === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, currentPosition(), 0);
      if (current === CHAR_LF) {
        scnr.next();
        eat(scnr, `'`);
      }
      return literal;
    }
    eat(scnr, `'`);
    return literal;
  }
  function readEscapeSequence(scnr) {
    const ch = scnr.currentChar();
    switch (ch) {
      case "\\":
      case `'`:
        scnr.next();
        return `\\${ch}`;
      case "u":
        return readUnicodeEscapeSequence(scnr, ch, 4);
      case "U":
        return readUnicodeEscapeSequence(scnr, ch, 6);
      default:
        emitError(CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE, currentPosition(), 0, ch);
        return "";
    }
  }
  function readUnicodeEscapeSequence(scnr, unicode, digits) {
    eat(scnr, unicode);
    let sequence = "";
    for (let i = 0; i < digits; i++) {
      const ch = takeHexDigit(scnr);
      if (!ch) {
        emitError(CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE, currentPosition(), 0, `\\${unicode}${sequence}${scnr.currentChar()}`);
        break;
      }
      sequence += ch;
    }
    return `\\${unicode}${sequence}`;
  }
  function readInvalidIdentifier(scnr) {
    skipSpaces(scnr);
    let ch = "";
    let identifiers = "";
    const closure = (ch2) => ch2 !== "{" && ch2 !== "}" && ch2 !== CHAR_SP && ch2 !== CHAR_LF;
    while (ch = takeChar(scnr, closure)) {
      identifiers += ch;
    }
    return identifiers;
  }
  function readLinkedModifier(scnr) {
    let ch = "";
    let name = "";
    while (ch = takeIdentifierChar(scnr)) {
      name += ch;
    }
    return name;
  }
  function readLinkedRefer(scnr) {
    const fn = (detect = false, buf) => {
      const ch = scnr.currentChar();
      if (ch === "{" || ch === "%" || ch === "@" || ch === "|" || ch === "(" || ch === ")" || !ch) {
        return buf;
      } else if (ch === CHAR_SP) {
        return buf;
      } else if (ch === CHAR_LF || ch === DOT) {
        buf += ch;
        scnr.next();
        return fn(detect, buf);
      } else {
        buf += ch;
        scnr.next();
        return fn(true, buf);
      }
    };
    return fn(false, "");
  }
  function readPlural(scnr) {
    skipSpaces(scnr);
    const plural = eat(
      scnr,
      "|"
      /* TokenChars.Pipe */
    );
    skipSpaces(scnr);
    return plural;
  }
  function readTokenInPlaceholder(scnr, context2) {
    let token = null;
    const ch = scnr.currentChar();
    switch (ch) {
      case "{":
        if (context2.braceNest >= 1) {
          emitError(CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER, currentPosition(), 0);
        }
        scnr.next();
        token = getToken(
          context2,
          2,
          "{"
          /* TokenChars.BraceLeft */
        );
        skipSpaces(scnr);
        context2.braceNest++;
        return token;
      case "}":
        if (context2.braceNest > 0 && context2.currentType === 2) {
          emitError(CompileErrorCodes.EMPTY_PLACEHOLDER, currentPosition(), 0);
        }
        scnr.next();
        token = getToken(
          context2,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
        context2.braceNest--;
        context2.braceNest > 0 && skipSpaces(scnr);
        if (context2.inLinked && context2.braceNest === 0) {
          context2.inLinked = false;
        }
        return token;
      case "@":
        if (context2.braceNest > 0) {
          emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
        }
        token = readTokenInLinked(scnr, context2) || getEndToken(context2);
        context2.braceNest = 0;
        return token;
      default:
        let validNamedIdentifier = true;
        let validListIdentifier = true;
        let validLiteral = true;
        if (isPluralStart(scnr)) {
          if (context2.braceNest > 0) {
            emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          }
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (context2.braceNest > 0 && (context2.currentType === 5 || context2.currentType === 6 || context2.currentType === 7)) {
          emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          context2.braceNest = 0;
          return readToken(scnr, context2);
        }
        if (validNamedIdentifier = isNamedIdentifierStart(scnr, context2)) {
          token = getToken(context2, 5, readNamedIdentifier(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (validListIdentifier = isListIdentifierStart(scnr, context2)) {
          token = getToken(context2, 6, readListIdentifier(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (validLiteral = isLiteralStart(scnr, context2)) {
          token = getToken(context2, 7, readLiteral(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (!validNamedIdentifier && !validListIdentifier && !validLiteral) {
          token = getToken(context2, 13, readInvalidIdentifier(scnr));
          emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, token.value);
          skipSpaces(scnr);
          return token;
        }
        break;
    }
    return token;
  }
  function readTokenInLinked(scnr, context2) {
    const { currentType } = context2;
    let token = null;
    const ch = scnr.currentChar();
    if ((currentType === 8 || currentType === 9 || currentType === 12 || currentType === 10) && (ch === CHAR_LF || ch === CHAR_SP)) {
      emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
    }
    switch (ch) {
      case "@":
        scnr.next();
        token = getToken(
          context2,
          8,
          "@"
          /* TokenChars.LinkedAlias */
        );
        context2.inLinked = true;
        return token;
      case ".":
        skipSpaces(scnr);
        scnr.next();
        return getToken(
          context2,
          9,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        skipSpaces(scnr);
        scnr.next();
        return getToken(
          context2,
          10,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        if (isPluralStart(scnr)) {
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (isLinkedDotStart(scnr, context2) || isLinkedDelimiterStart(scnr, context2)) {
          skipSpaces(scnr);
          return readTokenInLinked(scnr, context2);
        }
        if (isLinkedModifierStart(scnr, context2)) {
          skipSpaces(scnr);
          return getToken(context2, 12, readLinkedModifier(scnr));
        }
        if (isLinkedReferStart(scnr, context2)) {
          skipSpaces(scnr);
          if (ch === "{") {
            return readTokenInPlaceholder(scnr, context2) || token;
          } else {
            return getToken(context2, 11, readLinkedRefer(scnr));
          }
        }
        if (currentType === 8) {
          emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
        }
        context2.braceNest = 0;
        context2.inLinked = false;
        return readToken(scnr, context2);
    }
  }
  function readToken(scnr, context2) {
    let token = {
      type: 14
      /* TokenTypes.EOF */
    };
    if (context2.braceNest > 0) {
      return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
    }
    if (context2.inLinked) {
      return readTokenInLinked(scnr, context2) || getEndToken(context2);
    }
    const ch = scnr.currentChar();
    switch (ch) {
      case "{":
        return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
      case "}":
        emitError(CompileErrorCodes.UNBALANCED_CLOSING_BRACE, currentPosition(), 0);
        scnr.next();
        return getToken(
          context2,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return readTokenInLinked(scnr, context2) || getEndToken(context2);
      default:
        if (isPluralStart(scnr)) {
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        const { isModulo, hasSpace } = detectModuloStart(scnr);
        if (isModulo) {
          return hasSpace ? getToken(context2, 0, readText(scnr)) : getToken(context2, 4, readModulo(scnr));
        }
        if (isTextStart(scnr)) {
          return getToken(context2, 0, readText(scnr));
        }
        break;
    }
    return token;
  }
  function nextToken() {
    const { currentType, offset, startLoc, endLoc } = _context;
    _context.lastType = currentType;
    _context.lastOffset = offset;
    _context.lastStartLoc = startLoc;
    _context.lastEndLoc = endLoc;
    _context.offset = currentOffset();
    _context.startLoc = currentPosition();
    if (_scnr.currentChar() === EOF) {
      return getToken(
        _context,
        14
        /* TokenTypes.EOF */
      );
    }
    return readToken(_scnr, _context);
  }
  return {
    nextToken,
    currentOffset,
    currentPosition,
    context
  };
}
const ERROR_DOMAIN$2 = "parser";
const KNOWN_ESCAPES = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function fromEscapeSequence(match, codePoint4, codePoint6) {
  switch (match) {
    case `\\\\`:
      return `\\`;
    case `\\'`:
      return `'`;
    default: {
      const codePoint = parseInt(codePoint4 || codePoint6, 16);
      if (codePoint <= 55295 || codePoint >= 57344) {
        return String.fromCodePoint(codePoint);
      }
      return "�";
    }
  }
}
function createParser(options = {}) {
  const location = options.location !== false;
  const { onError } = options;
  function emitError(tokenzer, code, start, offset, ...args) {
    const end = tokenzer.currentPosition();
    end.offset += offset;
    end.column += offset;
    if (onError) {
      const loc = location ? createLocation(start, end) : null;
      const err = createCompileError(code, loc, {
        domain: ERROR_DOMAIN$2,
        args
      });
      onError(err);
    }
  }
  function startNode(type, offset, loc) {
    const node = { type };
    if (location) {
      node.start = offset;
      node.end = offset;
      node.loc = { start: loc, end: loc };
    }
    return node;
  }
  function endNode(node, offset, pos, type) {
    if (type) {
      node.type = type;
    }
    if (location) {
      node.end = offset;
      if (node.loc) {
        node.loc.end = pos;
      }
    }
  }
  function parseText(tokenizer, value) {
    const context = tokenizer.context();
    const node = startNode(3, context.offset, context.startLoc);
    node.value = value;
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseList(tokenizer, index) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(5, offset, loc);
    node.index = parseInt(index, 10);
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseNamed(tokenizer, key) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(4, offset, loc);
    node.key = key;
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLiteral(tokenizer, value) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(9, offset, loc);
    node.value = value.replace(KNOWN_ESCAPES, fromEscapeSequence);
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLinkedModifier(tokenizer) {
    const token = tokenizer.nextToken();
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(8, offset, loc);
    if (token.type !== 12) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER, context.lastStartLoc, 0);
      node.value = "";
      endNode(node, offset, loc);
      return {
        nextConsumeToken: token,
        node
      };
    }
    if (token.value == null) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
    }
    node.value = token.value || "";
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return {
      node
    };
  }
  function parseLinkedKey(tokenizer, value) {
    const context = tokenizer.context();
    const node = startNode(7, context.offset, context.startLoc);
    node.value = value;
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLinked(tokenizer) {
    const context = tokenizer.context();
    const linkedNode = startNode(6, context.offset, context.startLoc);
    let token = tokenizer.nextToken();
    if (token.type === 9) {
      const parsed = parseLinkedModifier(tokenizer);
      linkedNode.modifier = parsed.node;
      token = parsed.nextConsumeToken || tokenizer.nextToken();
    }
    if (token.type !== 10) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
    }
    token = tokenizer.nextToken();
    if (token.type === 2) {
      token = tokenizer.nextToken();
    }
    switch (token.type) {
      case 11:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseLinkedKey(tokenizer, token.value || "");
        break;
      case 5:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseNamed(tokenizer, token.value || "");
        break;
      case 6:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseList(tokenizer, token.value || "");
        break;
      case 7:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseLiteral(tokenizer, token.value || "");
        break;
      default:
        emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY, context.lastStartLoc, 0);
        const nextContext = tokenizer.context();
        const emptyLinkedKeyNode = startNode(7, nextContext.offset, nextContext.startLoc);
        emptyLinkedKeyNode.value = "";
        endNode(emptyLinkedKeyNode, nextContext.offset, nextContext.startLoc);
        linkedNode.key = emptyLinkedKeyNode;
        endNode(linkedNode, nextContext.offset, nextContext.startLoc);
        return {
          nextConsumeToken: token,
          node: linkedNode
        };
    }
    endNode(linkedNode, tokenizer.currentOffset(), tokenizer.currentPosition());
    return {
      node: linkedNode
    };
  }
  function parseMessage(tokenizer) {
    const context = tokenizer.context();
    const startOffset = context.currentType === 1 ? tokenizer.currentOffset() : context.offset;
    const startLoc = context.currentType === 1 ? context.endLoc : context.startLoc;
    const node = startNode(2, startOffset, startLoc);
    node.items = [];
    let nextToken = null;
    do {
      const token = nextToken || tokenizer.nextToken();
      nextToken = null;
      switch (token.type) {
        case 0:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseText(tokenizer, token.value || ""));
          break;
        case 6:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseList(tokenizer, token.value || ""));
          break;
        case 5:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseNamed(tokenizer, token.value || ""));
          break;
        case 7:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseLiteral(tokenizer, token.value || ""));
          break;
        case 8:
          const parsed = parseLinked(tokenizer);
          node.items.push(parsed.node);
          nextToken = parsed.nextConsumeToken || null;
          break;
      }
    } while (context.currentType !== 14 && context.currentType !== 1);
    const endOffset = context.currentType === 1 ? context.lastOffset : tokenizer.currentOffset();
    const endLoc = context.currentType === 1 ? context.lastEndLoc : tokenizer.currentPosition();
    endNode(node, endOffset, endLoc);
    return node;
  }
  function parsePlural(tokenizer, offset, loc, msgNode) {
    const context = tokenizer.context();
    let hasEmptyMessage = msgNode.items.length === 0;
    const node = startNode(1, offset, loc);
    node.cases = [];
    node.cases.push(msgNode);
    do {
      const msg = parseMessage(tokenizer);
      if (!hasEmptyMessage) {
        hasEmptyMessage = msg.items.length === 0;
      }
      node.cases.push(msg);
    } while (context.currentType !== 14);
    if (hasEmptyMessage) {
      emitError(tokenizer, CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL, loc, 0);
    }
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseResource(tokenizer) {
    const context = tokenizer.context();
    const { offset, startLoc } = context;
    const msgNode = parseMessage(tokenizer);
    if (context.currentType === 14) {
      return msgNode;
    } else {
      return parsePlural(tokenizer, offset, startLoc, msgNode);
    }
  }
  function parse(source) {
    const tokenizer = createTokenizer(source, assign({}, options));
    const context = tokenizer.context();
    const node = startNode(0, context.offset, context.startLoc);
    if (location && node.loc) {
      node.loc.source = source;
    }
    node.body = parseResource(tokenizer);
    if (options.onCacheKey) {
      node.cacheKey = options.onCacheKey(source);
    }
    if (context.currentType !== 14) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, source[context.offset] || "");
    }
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  return { parse };
}
function getTokenCaption(token) {
  if (token.type === 14) {
    return "EOF";
  }
  const name = (token.value || "").replace(/\r?\n/gu, "\\n");
  return name.length > 10 ? name.slice(0, 9) + "…" : name;
}
function createTransformer(ast, options = {}) {
  const _context = {
    ast,
    helpers: /* @__PURE__ */ new Set()
  };
  const context = () => _context;
  const helper = (name) => {
    _context.helpers.add(name);
    return name;
  };
  return { context, helper };
}
function traverseNodes(nodes, transformer) {
  for (let i = 0; i < nodes.length; i++) {
    traverseNode(nodes[i], transformer);
  }
}
function traverseNode(node, transformer) {
  switch (node.type) {
    case 1:
      traverseNodes(node.cases, transformer);
      transformer.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      traverseNodes(node.items, transformer);
      break;
    case 6:
      const linked = node;
      traverseNode(linked.key, transformer);
      transformer.helper(
        "linked"
        /* HelperNameMap.LINKED */
      );
      transformer.helper(
        "type"
        /* HelperNameMap.TYPE */
      );
      break;
    case 5:
      transformer.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      );
      transformer.helper(
        "list"
        /* HelperNameMap.LIST */
      );
      break;
    case 4:
      transformer.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      );
      transformer.helper(
        "named"
        /* HelperNameMap.NAMED */
      );
      break;
  }
}
function transform(ast, options = {}) {
  const transformer = createTransformer(ast);
  transformer.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  );
  ast.body && traverseNode(ast.body, transformer);
  const context = transformer.context();
  ast.helpers = Array.from(context.helpers);
}
function optimize(ast) {
  const body = ast.body;
  if (body.type === 2) {
    optimizeMessageNode(body);
  } else {
    body.cases.forEach((c) => optimizeMessageNode(c));
  }
  return ast;
}
function optimizeMessageNode(message) {
  if (message.items.length === 1) {
    const item = message.items[0];
    if (item.type === 3 || item.type === 9) {
      message.static = item.value;
      delete item.value;
    }
  } else {
    const values = [];
    for (let i = 0; i < message.items.length; i++) {
      const item = message.items[i];
      if (!(item.type === 3 || item.type === 9)) {
        break;
      }
      if (item.value == null) {
        break;
      }
      values.push(item.value);
    }
    if (values.length === message.items.length) {
      message.static = join(values);
      for (let i = 0; i < message.items.length; i++) {
        const item = message.items[i];
        if (item.type === 3 || item.type === 9) {
          delete item.value;
        }
      }
    }
  }
}
function minify(node) {
  node.t = node.type;
  switch (node.type) {
    case 0:
      const resource = node;
      minify(resource.body);
      resource.b = resource.body;
      delete resource.body;
      break;
    case 1:
      const plural = node;
      const cases = plural.cases;
      for (let i = 0; i < cases.length; i++) {
        minify(cases[i]);
      }
      plural.c = cases;
      delete plural.cases;
      break;
    case 2:
      const message = node;
      const items = message.items;
      for (let i = 0; i < items.length; i++) {
        minify(items[i]);
      }
      message.i = items;
      delete message.items;
      if (message.static) {
        message.s = message.static;
        delete message.static;
      }
      break;
    case 3:
    case 9:
    case 8:
    case 7:
      const valueNode = node;
      if (valueNode.value) {
        valueNode.v = valueNode.value;
        delete valueNode.value;
      }
      break;
    case 6:
      const linked = node;
      minify(linked.key);
      linked.k = linked.key;
      delete linked.key;
      if (linked.modifier) {
        minify(linked.modifier);
        linked.m = linked.modifier;
        delete linked.modifier;
      }
      break;
    case 5:
      const list = node;
      list.i = list.index;
      delete list.index;
      break;
    case 4:
      const named = node;
      named.k = named.key;
      delete named.key;
      break;
  }
  delete node.type;
}
function createCodeGenerator(ast, options) {
  const { sourceMap, filename, breakLineCode, needIndent: _needIndent } = options;
  const location = options.location !== false;
  const _context = {
    filename,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode,
    needIndent: _needIndent,
    indentLevel: 0
  };
  if (location && ast.loc) {
    _context.source = ast.loc.source;
  }
  const context = () => _context;
  function push(code, node) {
    _context.code += code;
  }
  function _newline(n, withBreakLine = true) {
    const _breakLineCode = withBreakLine ? breakLineCode : "";
    push(_needIndent ? _breakLineCode + `  `.repeat(n) : _breakLineCode);
  }
  function indent(withNewLine = true) {
    const level = ++_context.indentLevel;
    withNewLine && _newline(level);
  }
  function deindent(withNewLine = true) {
    const level = --_context.indentLevel;
    withNewLine && _newline(level);
  }
  function newline() {
    _newline(_context.indentLevel);
  }
  const helper = (key) => `_${key}`;
  const needIndent = () => _context.needIndent;
  return {
    context,
    push,
    indent,
    deindent,
    newline,
    helper,
    needIndent
  };
}
function generateLinkedNode(generator, node) {
  const { helper } = generator;
  generator.push(`${helper(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`);
  generateNode(generator, node.key);
  if (node.modifier) {
    generator.push(`, `);
    generateNode(generator, node.modifier);
    generator.push(`, _type`);
  } else {
    generator.push(`, undefined, _type`);
  }
  generator.push(`)`);
}
function generateMessageNode(generator, node) {
  const { helper, needIndent } = generator;
  generator.push(`${helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`);
  generator.indent(needIndent());
  const length = node.items.length;
  for (let i = 0; i < length; i++) {
    generateNode(generator, node.items[i]);
    if (i === length - 1) {
      break;
    }
    generator.push(", ");
  }
  generator.deindent(needIndent());
  generator.push("])");
}
function generatePluralNode(generator, node) {
  const { helper, needIndent } = generator;
  if (node.cases.length > 1) {
    generator.push(`${helper(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`);
    generator.indent(needIndent());
    const length = node.cases.length;
    for (let i = 0; i < length; i++) {
      generateNode(generator, node.cases[i]);
      if (i === length - 1) {
        break;
      }
      generator.push(", ");
    }
    generator.deindent(needIndent());
    generator.push(`])`);
  }
}
function generateResource(generator, node) {
  if (node.body) {
    generateNode(generator, node.body);
  } else {
    generator.push("null");
  }
}
function generateNode(generator, node) {
  const { helper } = generator;
  switch (node.type) {
    case 0:
      generateResource(generator, node);
      break;
    case 1:
      generatePluralNode(generator, node);
      break;
    case 2:
      generateMessageNode(generator, node);
      break;
    case 6:
      generateLinkedNode(generator, node);
      break;
    case 8:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 7:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 5:
      generator.push(`${helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${helper(
        "list"
        /* HelperNameMap.LIST */
      )}(${node.index}))`, node);
      break;
    case 4:
      generator.push(`${helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${helper(
        "named"
        /* HelperNameMap.NAMED */
      )}(${JSON.stringify(node.key)}))`, node);
      break;
    case 9:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 3:
      generator.push(JSON.stringify(node.value), node);
      break;
  }
}
const generate = (ast, options = {}) => {
  const mode = isString(options.mode) ? options.mode : "normal";
  const filename = isString(options.filename) ? options.filename : "message.intl";
  const sourceMap = !!options.sourceMap;
  const breakLineCode = options.breakLineCode != null ? options.breakLineCode : mode === "arrow" ? ";" : "\n";
  const needIndent = options.needIndent ? options.needIndent : mode !== "arrow";
  const helpers = ast.helpers || [];
  const generator = createCodeGenerator(ast, {
    mode,
    filename,
    sourceMap,
    breakLineCode,
    needIndent
  });
  generator.push(mode === "normal" ? `function __msg__ (ctx) {` : `(ctx) => {`);
  generator.indent(needIndent);
  if (helpers.length > 0) {
    generator.push(`const { ${join(helpers.map((s) => `${s}: _${s}`), ", ")} } = ctx`);
    generator.newline();
  }
  generator.push(`return `);
  generateNode(generator, ast);
  generator.deindent(needIndent);
  generator.push(`}`);
  delete ast.helpers;
  const { code, map } = generator.context();
  return {
    ast,
    code,
    map: map ? map.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function baseCompile$1(source, options = {}) {
  const assignedOptions = assign({}, options);
  const jit = !!assignedOptions.jit;
  const enalbeMinify = !!assignedOptions.minify;
  const enambeOptimize = assignedOptions.optimize == null ? true : assignedOptions.optimize;
  const parser = createParser(assignedOptions);
  const ast = parser.parse(source);
  if (!jit) {
    transform(ast, assignedOptions);
    return generate(ast, assignedOptions);
  } else {
    enambeOptimize && optimize(ast);
    enalbeMinify && minify(ast);
    return { ast, code: "" };
  }
}
const pathStateMachine = [];
pathStateMachine[
  0
  /* States.BEFORE_PATH */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    0
    /* States.BEFORE_PATH */
  ],
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4
    /* States.IN_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7
    /* States.AFTER_PATH */
  ]
};
pathStateMachine[
  1
  /* States.IN_PATH */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    1
    /* States.IN_PATH */
  ],
  [
    "."
    /* PathCharTypes.DOT */
  ]: [
    2
    /* States.BEFORE_IDENT */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4
    /* States.IN_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7
    /* States.AFTER_PATH */
  ]
};
pathStateMachine[
  2
  /* States.BEFORE_IDENT */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    2
    /* States.BEFORE_IDENT */
  ],
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "0"
    /* PathCharTypes.ZERO */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  3
  /* States.IN_IDENT */
] = {
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "0"
    /* PathCharTypes.ZERO */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    1,
    1
    /* Actions.PUSH */
  ],
  [
    "."
    /* PathCharTypes.DOT */
  ]: [
    2,
    1
    /* Actions.PUSH */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4,
    1
    /* Actions.PUSH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7,
    1
    /* Actions.PUSH */
  ]
};
pathStateMachine[
  4
  /* States.IN_SUB_PATH */
] = {
  [
    "'"
    /* PathCharTypes.SINGLE_QUOTE */
  ]: [
    5,
    0
    /* Actions.APPEND */
  ],
  [
    '"'
    /* PathCharTypes.DOUBLE_QUOTE */
  ]: [
    6,
    0
    /* Actions.APPEND */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4,
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ],
  [
    "]"
    /* PathCharTypes.RIGHT_BRACKET */
  ]: [
    1,
    3
    /* Actions.PUSH_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  5
  /* States.IN_SINGLE_QUOTE */
] = {
  [
    "'"
    /* PathCharTypes.SINGLE_QUOTE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    5,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  6
  /* States.IN_DOUBLE_QUOTE */
] = {
  [
    '"'
    /* PathCharTypes.DOUBLE_QUOTE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    6,
    0
    /* Actions.APPEND */
  ]
};
const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
  return literalValueRE.test(exp);
}
function stripQuotes(str) {
  const a = str.charCodeAt(0);
  const b = str.charCodeAt(str.length - 1);
  return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
}
function getPathCharType(ch) {
  if (ch === void 0 || ch === null) {
    return "o";
  }
  const code2 = ch.charCodeAt(0);
  switch (code2) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return ch;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function formatSubPath(path) {
  const trimmed = path.trim();
  if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
    return false;
  }
  return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
}
function parse(path) {
  const keys = [];
  let index = -1;
  let mode = 0;
  let subPathDepth = 0;
  let c;
  let key;
  let newChar;
  let type;
  let transition;
  let action;
  let typeMap;
  const actions = [];
  actions[
    0
    /* Actions.APPEND */
  ] = () => {
    if (key === void 0) {
      key = newChar;
    } else {
      key += newChar;
    }
  };
  actions[
    1
    /* Actions.PUSH */
  ] = () => {
    if (key !== void 0) {
      keys.push(key);
      key = void 0;
    }
  };
  actions[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    actions[
      0
      /* Actions.APPEND */
    ]();
    subPathDepth++;
  };
  actions[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = 4;
      actions[
        0
        /* Actions.APPEND */
      ]();
    } else {
      subPathDepth = 0;
      if (key === void 0) {
        return false;
      }
      key = formatSubPath(key);
      if (key === false) {
        return false;
      } else {
        actions[
          1
          /* Actions.PUSH */
        ]();
      }
    }
  };
  function maybeUnescapeQuote() {
    const nextChar = path[index + 1];
    if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
      index++;
      newChar = "\\" + nextChar;
      actions[
        0
        /* Actions.APPEND */
      ]();
      return true;
    }
  }
  while (mode !== null) {
    index++;
    c = path[index];
    if (c === "\\" && maybeUnescapeQuote()) {
      continue;
    }
    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap[
      "l"
      /* PathCharTypes.ELSE */
    ] || 8;
    if (transition === 8) {
      return;
    }
    mode = transition[0];
    if (transition[1] !== void 0) {
      action = actions[transition[1]];
      if (action) {
        newChar = c;
        if (action() === false) {
          return;
        }
      }
    }
    if (mode === 7) {
      return keys;
    }
  }
}
const cache = /* @__PURE__ */ new Map();
function resolveWithKeyValue(obj, path) {
  return isObject(obj) ? obj[path] : null;
}
function resolveValue(obj, path) {
  if (!isObject(obj)) {
    return null;
  }
  let hit = cache.get(path);
  if (!hit) {
    hit = parse(path);
    if (hit) {
      cache.set(path, hit);
    }
  }
  if (!hit) {
    return null;
  }
  const len = hit.length;
  let last = obj;
  let i = 0;
  while (i < len) {
    const val = last[hit[i]];
    if (val === void 0) {
      return null;
    }
    if (isFunction(last)) {
      return null;
    }
    last = val;
    i++;
  }
  return last;
}
const DEFAULT_MODIFIER = (str) => str;
const DEFAULT_MESSAGE = (ctx) => "";
const DEFAULT_MESSAGE_DATA_TYPE = "text";
const DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : join(values);
const DEFAULT_INTERPOLATE = toDisplayString;
function pluralDefault(choice, choicesLength) {
  choice = Math.abs(choice);
  if (choicesLength === 2) {
    return choice ? choice > 1 ? 1 : 0 : 1;
  }
  return choice ? Math.min(choice, 2) : 0;
}
function getPluralIndex(options) {
  const index = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
  return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index : index;
}
function normalizeNamed(pluralIndex, props) {
  if (!props.count) {
    props.count = pluralIndex;
  }
  if (!props.n) {
    props.n = pluralIndex;
  }
}
function createMessageContext(options = {}) {
  const locale = options.locale;
  const pluralIndex = getPluralIndex(options);
  const pluralRule = isObject(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
  const orgPluralRule = isObject(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
  const plural = (messages) => {
    return messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
  };
  const _list = options.list || [];
  const list = (index) => _list[index];
  const _named = options.named || {};
  isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
  const named = (key) => _named[key];
  function message(key) {
    const msg = isFunction(options.messages) ? options.messages(key) : isObject(options.messages) ? options.messages[key] : false;
    return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
  }
  const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
  const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
  const interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
  const type = isPlainObject(options.processor) && isString(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
  const linked = (key, ...args) => {
    const [arg1, arg2] = args;
    let type2 = "text";
    let modifier = "";
    if (args.length === 1) {
      if (isObject(arg1)) {
        modifier = arg1.modifier || modifier;
        type2 = arg1.type || type2;
      } else if (isString(arg1)) {
        modifier = arg1 || modifier;
      }
    } else if (args.length === 2) {
      if (isString(arg1)) {
        modifier = arg1 || modifier;
      }
      if (isString(arg2)) {
        type2 = arg2 || type2;
      }
    }
    const ret = message(key)(ctx);
    const msg = (
      // The message in vnode resolved with linked are returned as an array by processor.nomalize
      type2 === "vnode" && isArray(ret) && modifier ? ret[0] : ret
    );
    return modifier ? _modifier(modifier)(msg, type2) : msg;
  };
  const ctx = {
    [
      "list"
      /* HelperNameMap.LIST */
    ]: list,
    [
      "named"
      /* HelperNameMap.NAMED */
    ]: named,
    [
      "plural"
      /* HelperNameMap.PLURAL */
    ]: plural,
    [
      "linked"
      /* HelperNameMap.LINKED */
    ]: linked,
    [
      "message"
      /* HelperNameMap.MESSAGE */
    ]: message,
    [
      "type"
      /* HelperNameMap.TYPE */
    ]: type,
    [
      "interpolate"
      /* HelperNameMap.INTERPOLATE */
    ]: interpolate,
    [
      "normalize"
      /* HelperNameMap.NORMALIZE */
    ]: normalize,
    [
      "values"
      /* HelperNameMap.VALUES */
    ]: assign({}, _list, _named)
  };
  return ctx;
}
const CoreWarnCodes = {
  NOT_FOUND_KEY: 1,
  FALLBACK_TO_TRANSLATE: 2,
  CANNOT_FORMAT_NUMBER: 3,
  FALLBACK_TO_NUMBER_FORMAT: 4,
  CANNOT_FORMAT_DATE: 5,
  FALLBACK_TO_DATE_FORMAT: 6,
  EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: 7,
  __EXTEND_POINT__: 8
};
const code$2 = CompileErrorCodes.__EXTEND_POINT__;
const inc$2 = incrementer(code$2);
const CoreErrorCodes = {
  INVALID_ARGUMENT: code$2,
  INVALID_DATE_ARGUMENT: inc$2(),
  INVALID_ISO_DATE_ARGUMENT: inc$2(),
  NOT_SUPPORT_NON_STRING_MESSAGE: inc$2(),
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: inc$2(),
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: inc$2(),
  NOT_SUPPORT_LOCALE_TYPE: inc$2(),
  __EXTEND_POINT__: inc$2()
  // 25
};
function createCoreError(code2) {
  return createCompileError(code2, null, void 0);
}
function getLocale$1(context, options) {
  return options.locale != null ? resolveLocale(options.locale) : resolveLocale(context.locale);
}
let _resolveLocale;
function resolveLocale(locale) {
  if (isString(locale)) {
    return locale;
  } else {
    if (isFunction(locale)) {
      if (locale.resolvedOnce && _resolveLocale != null) {
        return _resolveLocale;
      } else if (locale.constructor.name === "Function") {
        const resolve = locale();
        if (isPromise(resolve)) {
          throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
        }
        return _resolveLocale = resolve;
      } else {
        throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
      }
    } else {
      throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_TYPE);
    }
  }
}
function fallbackWithSimple(ctx, fallback, start) {
  return [.../* @__PURE__ */ new Set([
    start,
    ...isArray(fallback) ? fallback : isObject(fallback) ? Object.keys(fallback) : isString(fallback) ? [fallback] : [start]
  ])];
}
function fallbackWithLocaleChain(ctx, fallback, start) {
  const startLocale = isString(start) ? start : DEFAULT_LOCALE;
  const context = ctx;
  if (!context.__localeChainCache) {
    context.__localeChainCache = /* @__PURE__ */ new Map();
  }
  let chain = context.__localeChainCache.get(startLocale);
  if (!chain) {
    chain = [];
    let block = [start];
    while (isArray(block)) {
      block = appendBlockToChain(chain, block, fallback);
    }
    const defaults = isArray(fallback) || !isPlainObject(fallback) ? fallback : fallback["default"] ? fallback["default"] : null;
    block = isString(defaults) ? [defaults] : defaults;
    if (isArray(block)) {
      appendBlockToChain(chain, block, false);
    }
    context.__localeChainCache.set(startLocale, chain);
  }
  return chain;
}
function appendBlockToChain(chain, block, blocks) {
  let follow = true;
  for (let i = 0; i < block.length && isBoolean(follow); i++) {
    const locale = block[i];
    if (isString(locale)) {
      follow = appendLocaleToChain(chain, block[i], blocks);
    }
  }
  return follow;
}
function appendLocaleToChain(chain, locale, blocks) {
  let follow;
  const tokens = locale.split("-");
  do {
    const target = tokens.join("-");
    follow = appendItemToChain(chain, target, blocks);
    tokens.splice(-1, 1);
  } while (tokens.length && follow === true);
  return follow;
}
function appendItemToChain(chain, target, blocks) {
  let follow = false;
  if (!chain.includes(target)) {
    follow = true;
    if (target) {
      follow = target[target.length - 1] !== "!";
      const locale = target.replace(/!/g, "");
      chain.push(locale);
      if ((isArray(blocks) || isPlainObject(blocks)) && blocks[locale]) {
        follow = blocks[locale];
      }
    }
  }
  return follow;
}
const VERSION$1 = "9.9.1";
const NOT_REOSLVED = -1;
const DEFAULT_LOCALE = "en-US";
const MISSING_RESOLVE_VALUE = "";
const capitalize = (str) => `${str.charAt(0).toLocaleUpperCase()}${str.substr(1)}`;
function getDefaultLinkedModifiers() {
  return {
    upper: (val, type) => {
      return type === "text" && isString(val) ? val.toUpperCase() : type === "vnode" && isObject(val) && "__v_isVNode" in val ? val.children.toUpperCase() : val;
    },
    lower: (val, type) => {
      return type === "text" && isString(val) ? val.toLowerCase() : type === "vnode" && isObject(val) && "__v_isVNode" in val ? val.children.toLowerCase() : val;
    },
    capitalize: (val, type) => {
      return type === "text" && isString(val) ? capitalize(val) : type === "vnode" && isObject(val) && "__v_isVNode" in val ? capitalize(val.children) : val;
    }
  };
}
let _compiler;
function registerMessageCompiler(compiler) {
  _compiler = compiler;
}
let _resolver;
function registerMessageResolver(resolver) {
  _resolver = resolver;
}
let _fallbacker;
function registerLocaleFallbacker(fallbacker) {
  _fallbacker = fallbacker;
}
const setAdditionalMeta = /* @__NO_SIDE_EFFECTS__ */ (meta) => {
};
let _fallbackContext = null;
const setFallbackContext = (context) => {
  _fallbackContext = context;
};
const getFallbackContext = () => _fallbackContext;
let _cid = 0;
function createCoreContext(options = {}) {
  const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
  const version = isString(options.version) ? options.version : VERSION$1;
  const locale = isString(options.locale) || isFunction(options.locale) ? options.locale : DEFAULT_LOCALE;
  const _locale = isFunction(locale) ? DEFAULT_LOCALE : locale;
  const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale;
  const messages = isPlainObject(options.messages) ? options.messages : { [_locale]: {} };
  const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale]: {} };
  const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale]: {} };
  const modifiers = assign({}, options.modifiers || {}, getDefaultLinkedModifiers());
  const pluralRules = options.pluralRules || {};
  const missing = isFunction(options.missing) ? options.missing : null;
  const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  const fallbackFormat = !!options.fallbackFormat;
  const unresolving = !!options.unresolving;
  const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  const processor = isPlainObject(options.processor) ? options.processor : null;
  const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  const escapeParameter = !!options.escapeParameter;
  const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
  const messageResolver = isFunction(options.messageResolver) ? options.messageResolver : _resolver || resolveWithKeyValue;
  const localeFallbacker = isFunction(options.localeFallbacker) ? options.localeFallbacker : _fallbacker || fallbackWithSimple;
  const fallbackContext = isObject(options.fallbackContext) ? options.fallbackContext : void 0;
  const internalOptions = options;
  const __datetimeFormatters = isObject(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
  const __numberFormatters = isObject(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
  const __meta = isObject(internalOptions.__meta) ? internalOptions.__meta : {};
  _cid++;
  const context = {
    version,
    cid: _cid,
    locale,
    fallbackLocale,
    messages,
    modifiers,
    pluralRules,
    missing,
    missingWarn,
    fallbackWarn,
    fallbackFormat,
    unresolving,
    postTranslation,
    processor,
    warnHtmlMessage,
    escapeParameter,
    messageCompiler,
    messageResolver,
    localeFallbacker,
    fallbackContext,
    onWarn,
    __meta
  };
  {
    context.datetimeFormats = datetimeFormats;
    context.numberFormats = numberFormats;
    context.__datetimeFormatters = __datetimeFormatters;
    context.__numberFormatters = __numberFormatters;
  }
  return context;
}
function handleMissing(context, key, locale, missingWarn, type) {
  const { missing, onWarn } = context;
  if (missing !== null) {
    const ret = missing(context, locale, key, type);
    return isString(ret) ? ret : key;
  } else {
    return key;
  }
}
function updateFallbackLocale(ctx, locale, fallback) {
  const context = ctx;
  context.__localeChainCache = /* @__PURE__ */ new Map();
  ctx.localeFallbacker(ctx, fallback, locale);
}
function format(ast) {
  const msg = (ctx) => formatParts(ctx, ast);
  return msg;
}
function formatParts(ctx, ast) {
  const body = ast.b || ast.body;
  if ((body.t || body.type) === 1) {
    const plural = body;
    const cases = plural.c || plural.cases;
    return ctx.plural(cases.reduce((messages, c) => [
      ...messages,
      formatMessageParts(ctx, c)
    ], []));
  } else {
    return formatMessageParts(ctx, body);
  }
}
function formatMessageParts(ctx, node) {
  const _static = node.s || node.static;
  if (_static) {
    return ctx.type === "text" ? _static : ctx.normalize([_static]);
  } else {
    const messages = (node.i || node.items).reduce((acm, c) => [...acm, formatMessagePart(ctx, c)], []);
    return ctx.normalize(messages);
  }
}
function formatMessagePart(ctx, node) {
  const type = node.t || node.type;
  switch (type) {
    case 3:
      const text = node;
      return text.v || text.value;
    case 9:
      const literal = node;
      return literal.v || literal.value;
    case 4:
      const named = node;
      return ctx.interpolate(ctx.named(named.k || named.key));
    case 5:
      const list = node;
      return ctx.interpolate(ctx.list(list.i != null ? list.i : list.index));
    case 6:
      const linked = node;
      const modifier = linked.m || linked.modifier;
      return ctx.linked(formatMessagePart(ctx, linked.k || linked.key), modifier ? formatMessagePart(ctx, modifier) : void 0, ctx.type);
    case 7:
      const linkedKey = node;
      return linkedKey.v || linkedKey.value;
    case 8:
      const linkedModifier = node;
      return linkedModifier.v || linkedModifier.value;
    default:
      throw new Error(`unhandled node type on format message part: ${type}`);
  }
}
const defaultOnCacheKey = (message) => message;
let compileCache = /* @__PURE__ */ Object.create(null);
const isMessageAST = (val) => isObject(val) && (val.t === 0 || val.type === 0) && ("b" in val || "body" in val);
function baseCompile(message, options = {}) {
  let detectError = false;
  const onError = options.onError || defaultOnError;
  options.onError = (err) => {
    detectError = true;
    onError(err);
  };
  return { ...baseCompile$1(message, options), detectError };
}
function compile(message, context) {
  if (isString(message)) {
    isBoolean(context.warnHtmlMessage) ? context.warnHtmlMessage : true;
    const onCacheKey = context.onCacheKey || defaultOnCacheKey;
    const cacheKey = onCacheKey(message);
    const cached = compileCache[cacheKey];
    if (cached) {
      return cached;
    }
    const { ast, detectError } = baseCompile(message, {
      ...context,
      location: "production" !== "production",
      jit: true
    });
    const msg = format(ast);
    return !detectError ? compileCache[cacheKey] = msg : msg;
  } else {
    const cacheKey = message.cacheKey;
    if (cacheKey) {
      const cached = compileCache[cacheKey];
      if (cached) {
        return cached;
      }
      return compileCache[cacheKey] = format(message);
    } else {
      return format(message);
    }
  }
}
const NOOP_MESSAGE_FUNCTION = () => "";
const isMessageFunction = (val) => isFunction(val);
function translate(context, ...args) {
  const { fallbackFormat, postTranslation, unresolving, messageCompiler, fallbackLocale, messages } = context;
  const [key, options] = parseTranslateArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
  const resolvedMessage = !!options.resolvedMessage;
  const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : !messageCompiler ? () => key : key : fallbackFormat ? !messageCompiler ? () => key : key : "";
  const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== "";
  const locale = getLocale$1(context, options);
  escapeParameter && escapeParams(options);
  let [formatScope, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
    key,
    locale,
    messages[locale] || {}
  ];
  let format2 = formatScope;
  let cacheBaseKey = key;
  if (!resolvedMessage && !(isString(format2) || isMessageAST(format2) || isMessageFunction(format2))) {
    if (enableDefaultMsg) {
      format2 = defaultMsgOrKey;
      cacheBaseKey = format2;
    }
  }
  if (!resolvedMessage && (!(isString(format2) || isMessageAST(format2) || isMessageFunction(format2)) || !isString(targetLocale))) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let occurred = false;
  const onError = () => {
    occurred = true;
  };
  const msg = !isMessageFunction(format2) ? compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) : format2;
  if (occurred) {
    return format2;
  }
  const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
  const msgContext = createMessageContext(ctxOptions);
  const messaged = evaluateMessage(context, msg, msgContext);
  const ret = postTranslation ? postTranslation(messaged, key) : messaged;
  return ret;
}
function escapeParams(options) {
  if (isArray(options.list)) {
    options.list = options.list.map((item) => isString(item) ? escapeHtml$1(item) : item);
  } else if (isObject(options.named)) {
    Object.keys(options.named).forEach((key) => {
      if (isString(options.named[key])) {
        options.named[key] = escapeHtml$1(options.named[key]);
      }
    });
  }
}
function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
  const { messages, onWarn, messageResolver: resolveValue2, localeFallbacker } = context;
  const locales = localeFallbacker(context, fallbackLocale, locale);
  let message = {};
  let targetLocale;
  let format2 = null;
  const type = "translate";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    message = messages[targetLocale] || {};
    if ((format2 = resolveValue2(message, key)) === null) {
      format2 = message[key];
    }
    if (isString(format2) || isMessageAST(format2) || isMessageFunction(format2)) {
      break;
    }
    const missingRet = handleMissing(
      context,
      // eslint-disable-line @typescript-eslint/no-explicit-any
      key,
      targetLocale,
      missingWarn,
      type
    );
    if (missingRet !== key) {
      format2 = missingRet;
    }
  }
  return [format2, targetLocale, message];
}
function compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) {
  const { messageCompiler, warnHtmlMessage } = context;
  if (isMessageFunction(format2)) {
    const msg2 = format2;
    msg2.locale = msg2.locale || targetLocale;
    msg2.key = msg2.key || key;
    return msg2;
  }
  if (messageCompiler == null) {
    const msg2 = () => format2;
    msg2.locale = targetLocale;
    msg2.key = key;
    return msg2;
  }
  const msg = messageCompiler(format2, getCompileContext(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, onError));
  msg.locale = targetLocale;
  msg.key = key;
  msg.source = format2;
  return msg;
}
function evaluateMessage(context, msg, msgCtx) {
  const messaged = msg(msgCtx);
  return messaged;
}
function parseTranslateArgs(...args) {
  const [arg1, arg2, arg3] = args;
  const options = {};
  if (!isString(arg1) && !isNumber(arg1) && !isMessageFunction(arg1) && !isMessageAST(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
  if (isNumber(arg2)) {
    options.plural = arg2;
  } else if (isString(arg2)) {
    options.default = arg2;
  } else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
    options.named = arg2;
  } else if (isArray(arg2)) {
    options.list = arg2;
  }
  if (isNumber(arg3)) {
    options.plural = arg3;
  } else if (isString(arg3)) {
    options.default = arg3;
  } else if (isPlainObject(arg3)) {
    assign(options, arg3);
  }
  return [key, options];
}
function getCompileContext(context, locale, key, source, warnHtmlMessage, onError) {
  return {
    locale,
    key,
    warnHtmlMessage,
    onError: (err) => {
      onError && onError(err);
      {
        throw err;
      }
    },
    onCacheKey: (source2) => generateFormatCacheKey(locale, key, source2)
  };
}
function getMessageContextOptions(context, locale, message, options) {
  const { modifiers, pluralRules, messageResolver: resolveValue2, fallbackLocale, fallbackWarn, missingWarn, fallbackContext } = context;
  const resolveMessage = (key) => {
    let val = resolveValue2(message, key);
    if (val == null && fallbackContext) {
      const [, , message2] = resolveMessageFormat(fallbackContext, key, locale, fallbackLocale, fallbackWarn, missingWarn);
      val = resolveValue2(message2, key);
    }
    if (isString(val) || isMessageAST(val)) {
      let occurred = false;
      const onError = () => {
        occurred = true;
      };
      const msg = compileMessageFormat(context, key, locale, val, key, onError);
      return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
    } else if (isMessageFunction(val)) {
      return val;
    } else {
      return NOOP_MESSAGE_FUNCTION;
    }
  };
  const ctxOptions = {
    locale,
    modifiers,
    pluralRules,
    messages: resolveMessage
  };
  if (context.processor) {
    ctxOptions.processor = context.processor;
  }
  if (options.list) {
    ctxOptions.list = options.list;
  }
  if (options.named) {
    ctxOptions.named = options.named;
  }
  if (isNumber(options.plural)) {
    ctxOptions.pluralIndex = options.plural;
  }
  return ctxOptions;
}
function datetime(context, ...args) {
  const { datetimeFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __datetimeFormatters } = context;
  const [key, value, options, overrides] = parseDateTimeArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = getLocale$1(context, options);
  const locales = localeFallbacker(
    context,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    fallbackLocale,
    locale
  );
  if (!isString(key) || key === "") {
    return new Intl.DateTimeFormat(locale, overrides).format(value);
  }
  let datetimeFormat = {};
  let targetLocale;
  let format2 = null;
  const type = "datetime format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    datetimeFormat = datetimeFormats[targetLocale] || {};
    format2 = datetimeFormat[key];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
  }
  if (!isPlainObject(format2) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __datetimeFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(targetLocale, assign({}, format2, overrides));
    __datetimeFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const DATETIME_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function parseDateTimeArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = {};
  let overrides = {};
  let value;
  if (isString(arg1)) {
    const matches = arg1.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!matches) {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
    const dateTime = matches[3] ? matches[3].trim().startsWith("T") ? `${matches[1].trim()}${matches[3].trim()}` : `${matches[1].trim()}T${matches[3].trim()}` : matches[1].trim();
    value = new Date(dateTime);
    try {
      value.toISOString();
    } catch (e) {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (isDate(arg1)) {
    if (isNaN(arg1.getTime())) {
      throw createCoreError(CoreErrorCodes.INVALID_DATE_ARGUMENT);
    }
    value = arg1;
  } else if (isNumber(arg1)) {
    value = arg1;
  } else {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (DATETIME_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearDateTimeFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id = `${locale}__${key}`;
    if (!context.__datetimeFormatters.has(id)) {
      continue;
    }
    context.__datetimeFormatters.delete(id);
  }
}
function number(context, ...args) {
  const { numberFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __numberFormatters } = context;
  const [key, value, options, overrides] = parseNumberArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = getLocale$1(context, options);
  const locales = localeFallbacker(
    context,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    fallbackLocale,
    locale
  );
  if (!isString(key) || key === "") {
    return new Intl.NumberFormat(locale, overrides).format(value);
  }
  let numberFormat = {};
  let targetLocale;
  let format2 = null;
  const type = "number format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    numberFormat = numberFormats[targetLocale] || {};
    format2 = numberFormat[key];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
  }
  if (!isPlainObject(format2) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __numberFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.NumberFormat(targetLocale, assign({}, format2, overrides));
    __numberFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const NUMBER_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function parseNumberArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = {};
  let overrides = {};
  if (!isNumber(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const value = arg1;
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (NUMBER_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearNumberFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id = `${locale}__${key}`;
    if (!context.__numberFormatters.has(id)) {
      continue;
    }
    context.__numberFormatters.delete(id);
  }
}

/*!
  * vue-i18n v9.9.1
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
const VERSION = "9.9.1";
const code$1 = CoreWarnCodes.__EXTEND_POINT__;
const inc$1 = incrementer(code$1);
({
  FALLBACK_TO_ROOT: code$1,
  NOT_SUPPORTED_PRESERVE: inc$1(),
  NOT_SUPPORTED_FORMATTER: inc$1(),
  NOT_SUPPORTED_PRESERVE_DIRECTIVE: inc$1(),
  NOT_SUPPORTED_GET_CHOICE_INDEX: inc$1(),
  COMPONENT_NAME_LEGACY_COMPATIBLE: inc$1(),
  NOT_FOUND_PARENT_SCOPE: inc$1(),
  IGNORE_OBJ_FLATTEN: inc$1(),
  NOTICE_DROP_ALLOW_COMPOSITION: inc$1()
  // 17
});
const code = CoreErrorCodes.__EXTEND_POINT__;
const inc = incrementer(code);
const I18nErrorCodes = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: code,
  // legacy module errors
  INVALID_ARGUMENT: inc(),
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: inc(),
  NOT_INSTALLED: inc(),
  NOT_AVAILABLE_IN_LEGACY_MODE: inc(),
  // directive module errors
  REQUIRED_VALUE: inc(),
  INVALID_VALUE: inc(),
  // vue-devtools errors
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: inc(),
  NOT_INSTALLED_WITH_PROVIDE: inc(),
  // unexpected error
  UNEXPECTED_ERROR: inc(),
  // not compatible legacy vue-i18n constructor
  NOT_COMPATIBLE_LEGACY_VUE_I18N: inc(),
  // bridge support vue 2.x only
  BRIDGE_SUPPORT_VUE_2_ONLY: inc(),
  // need to define `i18n` option in `allowComposition: true` and `useScope: 'local' at `useI18n``
  MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: inc(),
  // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: inc(),
  // for enhancement
  __EXTEND_POINT__: inc()
  // 40
};
function createI18nError(code2, ...args) {
  return createCompileError(code2, null, void 0);
}
const TranslateVNodeSymbol = /* @__PURE__ */ makeSymbol("__translateVNode");
const DatetimePartsSymbol = /* @__PURE__ */ makeSymbol("__datetimeParts");
const NumberPartsSymbol = /* @__PURE__ */ makeSymbol("__numberParts");
const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
const InejctWithOptionSymbol = /* @__PURE__ */ makeSymbol("__injectWithOption");
const DisposeSymbol = /* @__PURE__ */ makeSymbol("__dispose");
function handleFlatJson(obj) {
  if (!isObject(obj)) {
    return obj;
  }
  for (const key in obj) {
    if (!hasOwn(obj, key)) {
      continue;
    }
    if (!key.includes(".")) {
      if (isObject(obj[key])) {
        handleFlatJson(obj[key]);
      }
    } else {
      const subKeys = key.split(".");
      const lastIndex = subKeys.length - 1;
      let currentObj = obj;
      let hasStringValue = false;
      for (let i = 0; i < lastIndex; i++) {
        if (!(subKeys[i] in currentObj)) {
          currentObj[subKeys[i]] = {};
        }
        if (!isObject(currentObj[subKeys[i]])) {
          hasStringValue = true;
          break;
        }
        currentObj = currentObj[subKeys[i]];
      }
      if (!hasStringValue) {
        currentObj[subKeys[lastIndex]] = obj[key];
        delete obj[key];
      }
      if (isObject(currentObj[subKeys[lastIndex]])) {
        handleFlatJson(currentObj[subKeys[lastIndex]]);
      }
    }
  }
  return obj;
}
function getLocaleMessages(locale, options) {
  const { messages, __i18n, messageResolver, flatJson } = options;
  const ret = isPlainObject(messages) ? messages : isArray(__i18n) ? {} : { [locale]: {} };
  if (isArray(__i18n)) {
    __i18n.forEach((custom) => {
      if ("locale" in custom && "resource" in custom) {
        const { locale: locale2, resource } = custom;
        if (locale2) {
          ret[locale2] = ret[locale2] || {};
          deepCopy(resource, ret[locale2]);
        } else {
          deepCopy(resource, ret);
        }
      } else {
        isString(custom) && deepCopy(JSON.parse(custom), ret);
      }
    });
  }
  if (messageResolver == null && flatJson) {
    for (const key in ret) {
      if (hasOwn(ret, key)) {
        handleFlatJson(ret[key]);
      }
    }
  }
  return ret;
}
function getComponentOptions(instance) {
  return instance.type;
}
function adjustI18nResources(gl, options, componentOptions) {
  let messages = isObject(options.messages) ? options.messages : {};
  if ("__i18nGlobal" in componentOptions) {
    messages = getLocaleMessages(gl.locale.value, {
      messages,
      __i18n: componentOptions.__i18nGlobal
    });
  }
  const locales = Object.keys(messages);
  if (locales.length) {
    locales.forEach((locale) => {
      gl.mergeLocaleMessage(locale, messages[locale]);
    });
  }
  {
    if (isObject(options.datetimeFormats)) {
      const locales2 = Object.keys(options.datetimeFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (isObject(options.numberFormats)) {
      const locales2 = Object.keys(options.numberFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
  }
}
function createTextNode(key) {
  return createVNode(Text, null, key, 0);
}
const DEVTOOLS_META = "__INTLIFY_META__";
const NOOP_RETURN_ARRAY = () => [];
const NOOP_RETURN_FALSE = () => false;
let composerID = 0;
function defineCoreMissingHandler(missing) {
  return (ctx, locale, key, type) => {
    return missing(locale, key, getCurrentInstance() || void 0, type);
  };
}
const getMetaInfo = /* @__NO_SIDE_EFFECTS__ */ () => {
  const instance = getCurrentInstance();
  let meta = null;
  return instance && (meta = getComponentOptions(instance)[DEVTOOLS_META]) ? { [DEVTOOLS_META]: meta } : null;
};
function createComposer(options = {}, VueI18nLegacy) {
  const { __root, __injectWithOption } = options;
  const _isGlobal = __root === void 0;
  const flatJson = options.flatJson;
  const _ref = shallowRef;
  let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = _ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : DEFAULT_LOCALE
  );
  const _fallbackLocale = _ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
  const _messages = _ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = _ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = _ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  let _fallbackFormat = !!options.fallbackFormat;
  let _missing = isFunction(options.missing) ? options.missing : null;
  let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
  let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  let _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  const getCoreContext = () => {
    _isGlobal && setFallbackContext(null);
    const ctxOptions = {
      version: VERSION,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
      modifiers: _modifiers,
      pluralRules: _pluralRules,
      missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
      missingWarn: _missingWarn,
      fallbackWarn: _fallbackWarn,
      fallbackFormat: _fallbackFormat,
      unresolving: true,
      postTranslation: _postTranslation === null ? void 0 : _postTranslation,
      warnHtmlMessage: _warnHtmlMessage,
      escapeParameter: _escapeParameter,
      messageResolver: options.messageResolver,
      messageCompiler: options.messageCompiler,
      __meta: { framework: "vue" }
    };
    {
      ctxOptions.datetimeFormats = _datetimeFormats.value;
      ctxOptions.numberFormats = _numberFormats.value;
      ctxOptions.__datetimeFormatters = isPlainObject(_context) ? _context.__datetimeFormatters : void 0;
      ctxOptions.__numberFormatters = isPlainObject(_context) ? _context.__numberFormatters : void 0;
    }
    const ctx = createCoreContext(ctxOptions);
    _isGlobal && setFallbackContext(ctx);
    return ctx;
  };
  _context = getCoreContext();
  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => _locale.value,
    set: (val) => {
      _locale.value = val;
      _context.locale = _locale.value;
    }
  });
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val) => {
      _fallbackLocale.value = val;
      _context.fallbackLocale = _fallbackLocale.value;
      updateFallbackLocale(_context, _locale.value, val);
    }
  });
  const messages = computed(() => _messages.value);
  const datetimeFormats = /* @__PURE__ */ computed(() => _datetimeFormats.value);
  const numberFormats = /* @__PURE__ */ computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return isFunction(_postTranslation) ? _postTranslation : null;
  }
  function setPostTranslationHandler(handler) {
    _postTranslation = handler;
    _context.postTranslation = handler;
  }
  function getMissingHandler() {
    return _missing;
  }
  function setMissingHandler(handler) {
    if (handler !== null) {
      _runtimeMissing = defineCoreMissingHandler(handler);
    }
    _missing = handler;
    _context.missing = _runtimeMissing;
  }
  const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
    trackReactivityValues();
    let ret;
    try {
      if ("production" !== "production" || false) ;
      if (!_isGlobal) {
        _context.fallbackContext = __root ? getFallbackContext() : void 0;
      }
      ret = fn(_context);
    } finally {
      if (!_isGlobal) {
        _context.fallbackContext = void 0;
      }
    }
    if (warnType !== "translate exists" && // for not `te` (e.g `t`)
    isNumber(ret) && ret === NOT_REOSLVED || warnType === "translate exists" && !ret) {
      const [key, arg2] = argumentParser();
      return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
    } else if (successCondition(ret)) {
      return ret;
    } else {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
    }
  };
  function t(...args) {
    return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root) => Reflect.apply(root.t, root, [...args]), (key) => key, (val) => isString(val));
  }
  function rt(...args) {
    const [arg1, arg2, arg3] = args;
    if (arg3 && !isObject(arg3)) {
      throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
    }
    return t(...[arg1, arg2, assign({ resolvedMessage: true }, arg3 || {})]);
  }
  function d(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => Reflect.apply(root.d, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
  }
  function n(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => Reflect.apply(root.n, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
  }
  function normalize(values) {
    return values.map((val) => isString(val) || isNumber(val) || isBoolean(val) ? createTextNode(String(val)) : val);
  }
  const interpolate = (val) => val;
  const processor = {
    normalize,
    interpolate,
    type: "vnode"
  };
  function translateVNode(...args) {
    return wrapWithDeps(
      (context) => {
        let ret;
        const _context2 = context;
        try {
          _context2.processor = processor;
          ret = Reflect.apply(translate, null, [_context2, ...args]);
        } finally {
          _context2.processor = null;
        }
        return ret;
      },
      () => parseTranslateArgs(...args),
      "translate",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[TranslateVNodeSymbol](...args),
      (key) => [createTextNode(key)],
      (val) => isArray(val)
    );
  }
  function numberParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(number, null, [context, ...args]),
      () => parseNumberArgs(...args),
      "number format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[NumberPartsSymbol](...args),
      NOOP_RETURN_ARRAY,
      (val) => isString(val) || isArray(val)
    );
  }
  function datetimeParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(datetime, null, [context, ...args]),
      () => parseDateTimeArgs(...args),
      "datetime format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[DatetimePartsSymbol](...args),
      NOOP_RETURN_ARRAY,
      (val) => isString(val) || isArray(val)
    );
  }
  function setPluralRules(rules) {
    _pluralRules = rules;
    _context.pluralRules = _pluralRules;
  }
  function te(key, locale2) {
    return wrapWithDeps(() => {
      if (!key) {
        return false;
      }
      const targetLocale = isString(locale2) ? locale2 : _locale.value;
      const message = getLocaleMessage(targetLocale);
      const resolved = _context.messageResolver(message, key);
      return isMessageAST(resolved) || isMessageFunction(resolved) || isString(resolved);
    }, () => [key], "translate exists", (root) => {
      return Reflect.apply(root.te, root, [key, locale2]);
    }, NOOP_RETURN_FALSE, (val) => isBoolean(val));
  }
  function resolveMessages(key) {
    let messages2 = null;
    const locales = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
    for (let i = 0; i < locales.length; i++) {
      const targetLocaleMessages = _messages.value[locales[i]] || {};
      const messageValue = _context.messageResolver(targetLocaleMessages, key);
      if (messageValue != null) {
        messages2 = messageValue;
        break;
      }
    }
    return messages2;
  }
  function tm(key) {
    const messages2 = resolveMessages(key);
    return messages2 != null ? messages2 : __root ? __root.tm(key) || {} : {};
  }
  function getLocaleMessage(locale2) {
    return _messages.value[locale2] || {};
  }
  function setLocaleMessage(locale2, message) {
    if (flatJson) {
      const _message = { [locale2]: message };
      for (const key in _message) {
        if (hasOwn(_message, key)) {
          handleFlatJson(_message[key]);
        }
      }
      message = _message[locale2];
    }
    _messages.value[locale2] = message;
    _context.messages = _messages.value;
  }
  function mergeLocaleMessage(locale2, message) {
    _messages.value[locale2] = _messages.value[locale2] || {};
    const _message = { [locale2]: message };
    if (flatJson) {
      for (const key in _message) {
        if (hasOwn(_message, key)) {
          handleFlatJson(_message[key]);
        }
      }
    }
    message = _message[locale2];
    deepCopy(message, _messages.value[locale2]);
    _context.messages = _messages.value;
  }
  function getDateTimeFormat(locale2) {
    return _datetimeFormats.value[locale2] || {};
  }
  function setDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = format2;
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function mergeDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = assign(_datetimeFormats.value[locale2] || {}, format2);
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function getNumberFormat(locale2) {
    return _numberFormats.value[locale2] || {};
  }
  function setNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = format2;
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  function mergeNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = assign(_numberFormats.value[locale2] || {}, format2);
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  composerID++;
  if (__root && inBrowser) {
    watch(__root.locale, (val) => {
      if (_inheritLocale) {
        _locale.value = val;
        _context.locale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
    watch(__root.fallbackLocale, (val) => {
      if (_inheritLocale) {
        _fallbackLocale.value = val;
        _context.fallbackLocale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
  }
  const composer = {
    id: composerID,
    locale,
    fallbackLocale,
    get inheritLocale() {
      return _inheritLocale;
    },
    set inheritLocale(val) {
      _inheritLocale = val;
      if (val && __root) {
        _locale.value = __root.locale.value;
        _fallbackLocale.value = __root.fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort();
    },
    messages,
    get modifiers() {
      return _modifiers;
    },
    get pluralRules() {
      return _pluralRules || {};
    },
    get isGlobal() {
      return _isGlobal;
    },
    get missingWarn() {
      return _missingWarn;
    },
    set missingWarn(val) {
      _missingWarn = val;
      _context.missingWarn = _missingWarn;
    },
    get fallbackWarn() {
      return _fallbackWarn;
    },
    set fallbackWarn(val) {
      _fallbackWarn = val;
      _context.fallbackWarn = _fallbackWarn;
    },
    get fallbackRoot() {
      return _fallbackRoot;
    },
    set fallbackRoot(val) {
      _fallbackRoot = val;
    },
    get fallbackFormat() {
      return _fallbackFormat;
    },
    set fallbackFormat(val) {
      _fallbackFormat = val;
      _context.fallbackFormat = _fallbackFormat;
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      _warnHtmlMessage = val;
      _context.warnHtmlMessage = val;
    },
    get escapeParameter() {
      return _escapeParameter;
    },
    set escapeParameter(val) {
      _escapeParameter = val;
      _context.escapeParameter = val;
    },
    t,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [SetPluralRulesSymbol]: setPluralRules
  };
  {
    composer.datetimeFormats = datetimeFormats;
    composer.numberFormats = numberFormats;
    composer.rt = rt;
    composer.te = te;
    composer.tm = tm;
    composer.d = d;
    composer.n = n;
    composer.getDateTimeFormat = getDateTimeFormat;
    composer.setDateTimeFormat = setDateTimeFormat;
    composer.mergeDateTimeFormat = mergeDateTimeFormat;
    composer.getNumberFormat = getNumberFormat;
    composer.setNumberFormat = setNumberFormat;
    composer.mergeNumberFormat = mergeNumberFormat;
    composer[InejctWithOptionSymbol] = __injectWithOption;
    composer[TranslateVNodeSymbol] = translateVNode;
    composer[DatetimePartsSymbol] = datetimeParts;
    composer[NumberPartsSymbol] = numberParts;
  }
  return composer;
}
const baseFormatProps = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (val) => val === "parent" || val === "global",
    default: "parent"
    /* ComponentI18nScope */
  },
  i18n: {
    type: Object
  }
};
function getInterpolateArg({ slots }, keys) {
  if (keys.length === 1 && keys[0] === "default") {
    const ret = slots.default ? slots.default() : [];
    return ret.reduce((slot, current) => {
      return [
        ...slot,
        // prettier-ignore
        ...current.type === Fragment ? current.children : [current]
      ];
    }, []);
  } else {
    return keys.reduce((arg, key) => {
      const slot = slots[key];
      if (slot) {
        arg[key] = slot();
      }
      return arg;
    }, {});
  }
}
function getFragmentableTag(tag) {
  return Fragment;
}
const TranslationImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-t",
  props: assign({
    keypath: {
      type: String,
      required: true
    },
    plural: {
      type: [Number, String],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validator: (val) => isNumber(val) || !isNaN(val)
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const { slots, attrs } = context;
    const i18n = props.i18n || useI18n$1({
      useScope: props.scope,
      __useComponent: true
    });
    return () => {
      const keys = Object.keys(slots).filter((key) => key !== "_");
      const options = {};
      if (props.locale) {
        options.locale = props.locale;
      }
      if (props.plural !== void 0) {
        options.plural = isString(props.plural) ? +props.plural : props.plural;
      }
      const arg = getInterpolateArg(context, keys);
      const children = i18n[TranslateVNodeSymbol](props.keypath, arg, options);
      const assignedAttrs = assign({}, attrs);
      const tag = isString(props.tag) || isObject(props.tag) ? props.tag : getFragmentableTag();
      return h(tag, assignedAttrs, children);
    };
  }
});
const Translation = TranslationImpl;
function isVNode(target) {
  return isArray(target) && !isString(target[0]);
}
function renderFormatter(props, context, slotKeys, partFormatter) {
  const { slots, attrs } = context;
  return () => {
    const options = { part: true };
    let overrides = {};
    if (props.locale) {
      options.locale = props.locale;
    }
    if (isString(props.format)) {
      options.key = props.format;
    } else if (isObject(props.format)) {
      if (isString(props.format.key)) {
        options.key = props.format.key;
      }
      overrides = Object.keys(props.format).reduce((options2, prop) => {
        return slotKeys.includes(prop) ? assign({}, options2, { [prop]: props.format[prop] }) : options2;
      }, {});
    }
    const parts = partFormatter(...[props.value, options, overrides]);
    let children = [options.key];
    if (isArray(parts)) {
      children = parts.map((part, index) => {
        const slot = slots[part.type];
        const node = slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
        if (isVNode(node)) {
          node[0].key = `${part.type}-${index}`;
        }
        return node;
      });
    } else if (isString(parts)) {
      children = [parts];
    }
    const assignedAttrs = assign({}, attrs);
    const tag = isString(props.tag) || isObject(props.tag) ? props.tag : getFragmentableTag();
    return h(tag, assignedAttrs, children);
  };
}
const NumberFormatImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-n",
  props: assign({
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n = props.i18n || useI18n$1({
      useScope: "parent",
      __useComponent: true
    });
    return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[NumberPartsSymbol](...args)
    ));
  }
});
const NumberFormat = NumberFormatImpl;
const DatetimeFormatImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-d",
  props: assign({
    value: {
      type: [Number, Date],
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n = props.i18n || useI18n$1({
      useScope: "parent",
      __useComponent: true
    });
    return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[DatetimePartsSymbol](...args)
    ));
  }
});
const DatetimeFormat = DatetimeFormatImpl;
function getComposer$2(i18n, instance) {
  const i18nInternal = i18n;
  if (i18n.mode === "composition") {
    return i18nInternal.__getInstance(instance) || i18n.global;
  } else {
    const vueI18n = i18nInternal.__getInstance(instance);
    return vueI18n != null ? vueI18n.__composer : i18n.global.__composer;
  }
}
function vTDirective(i18n) {
  const _process = (binding) => {
    const { instance, modifiers, value } = binding;
    if (!instance || !instance.$) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const composer = getComposer$2(i18n, instance.$);
    const parsedValue = parseValue(value);
    return [
      Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]),
      composer
    ];
  };
  const register = (el, binding) => {
    const [textContent, composer] = _process(binding);
    el.__composer = composer;
    el.textContent = textContent;
  };
  const unregister = (el) => {
    if (el.__composer) {
      el.__composer = void 0;
      delete el.__composer;
    }
  };
  const update = (el, { value }) => {
    if (el.__composer) {
      const composer = el.__composer;
      const parsedValue = parseValue(value);
      el.textContent = Reflect.apply(composer.t, composer, [
        ...makeParams(parsedValue)
      ]);
    }
  };
  const getSSRProps = (binding) => {
    const [textContent] = _process(binding);
    return { textContent };
  };
  return {
    created: register,
    unmounted: unregister,
    beforeUpdate: update,
    getSSRProps
  };
}
function parseValue(value) {
  if (isString(value)) {
    return { path: value };
  } else if (isPlainObject(value)) {
    if (!("path" in value)) {
      throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, "path");
    }
    return value;
  } else {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
}
function makeParams(value) {
  const { path, locale, args, choice, plural } = value;
  const options = {};
  const named = args || {};
  if (isString(locale)) {
    options.locale = locale;
  }
  if (isNumber(choice)) {
    options.plural = choice;
  }
  if (isNumber(plural)) {
    options.plural = plural;
  }
  return [path, named, options];
}
function apply(app, i18n, ...options) {
  const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
  const useI18nComponentName = !!pluginOptions.useI18nComponentName;
  const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
  if (globalInstall) {
    [!useI18nComponentName ? Translation.name : "i18n", "I18nT"].forEach((name) => app.component(name, Translation));
    [NumberFormat.name, "I18nN"].forEach((name) => app.component(name, NumberFormat));
    [DatetimeFormat.name, "I18nD"].forEach((name) => app.component(name, DatetimeFormat));
  }
  {
    app.directive("t", vTDirective(i18n));
  }
}
const I18nInjectionKey = /* @__PURE__ */ makeSymbol("global-vue-i18n");
function createI18n(options = {}, VueI18nLegacy) {
  const __globalInjection = isBoolean(options.globalInjection) ? options.globalInjection : true;
  const __allowComposition = true;
  const __instances = /* @__PURE__ */ new Map();
  const [globalScope, __global] = createGlobal(options);
  const symbol = /* @__PURE__ */ makeSymbol("");
  function __getInstance(component) {
    return __instances.get(component) || null;
  }
  function __setInstance(component, instance) {
    __instances.set(component, instance);
  }
  function __deleteInstance(component) {
    __instances.delete(component);
  }
  {
    const i18n = {
      // mode
      get mode() {
        return "composition";
      },
      // allowComposition
      get allowComposition() {
        return __allowComposition;
      },
      // install plugin
      async install(app, ...options2) {
        app.__VUE_I18N_SYMBOL__ = symbol;
        app.provide(app.__VUE_I18N_SYMBOL__, i18n);
        if (isPlainObject(options2[0])) {
          const opts = options2[0];
          i18n.__composerExtend = opts.__composerExtend;
          i18n.__vueI18nExtend = opts.__vueI18nExtend;
        }
        let globalReleaseHandler = null;
        if (__globalInjection) {
          globalReleaseHandler = injectGlobalFields(app, i18n.global);
        }
        {
          apply(app, i18n, ...options2);
        }
        const unmountApp = app.unmount;
        app.unmount = () => {
          globalReleaseHandler && globalReleaseHandler();
          i18n.dispose();
          unmountApp();
        };
      },
      // global accessor
      get global() {
        return __global;
      },
      dispose() {
        globalScope.stop();
      },
      // @internal
      __instances,
      // @internal
      __getInstance,
      // @internal
      __setInstance,
      // @internal
      __deleteInstance
    };
    return i18n;
  }
}
function useI18n$1(options = {}) {
  const instance = getCurrentInstance();
  if (instance == null) {
    throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
  }
  if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) {
    throw createI18nError(I18nErrorCodes.NOT_INSTALLED);
  }
  const i18n = getI18nInstance(instance);
  const gl = getGlobalComposer(i18n);
  const componentOptions = getComponentOptions(instance);
  const scope = getScope(options, componentOptions);
  if (scope === "global") {
    adjustI18nResources(gl, options, componentOptions);
    return gl;
  }
  if (scope === "parent") {
    let composer2 = getComposer$3(i18n, instance, options.__useComponent);
    if (composer2 == null) {
      composer2 = gl;
    }
    return composer2;
  }
  const i18nInternal = i18n;
  let composer = i18nInternal.__getInstance(instance);
  if (composer == null) {
    const composerOptions = assign({}, options);
    if ("__i18n" in componentOptions) {
      composerOptions.__i18n = componentOptions.__i18n;
    }
    if (gl) {
      composerOptions.__root = gl;
    }
    composer = createComposer(composerOptions);
    if (i18nInternal.__composerExtend) {
      composer[DisposeSymbol] = i18nInternal.__composerExtend(composer);
    }
    setupLifeCycle(i18nInternal, instance, composer);
    i18nInternal.__setInstance(instance, composer);
  }
  return composer;
}
function createGlobal(options, legacyMode, VueI18nLegacy) {
  const scope = effectScope();
  {
    const obj = scope.run(() => createComposer(options));
    if (obj == null) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    return [scope, obj];
  }
}
function getI18nInstance(instance) {
  {
    const i18n = inject(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey);
    if (!i18n) {
      throw createI18nError(!instance.isCE ? I18nErrorCodes.UNEXPECTED_ERROR : I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE);
    }
    return i18n;
  }
}
function getScope(options, componentOptions) {
  return isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
}
function getGlobalComposer(i18n) {
  return i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
}
function getComposer$3(i18n, target, useComponent = false) {
  let composer = null;
  const root = target.root;
  let current = getParentComponentInstance(target, useComponent);
  while (current != null) {
    const i18nInternal = i18n;
    if (i18n.mode === "composition") {
      composer = i18nInternal.__getInstance(current);
    }
    if (composer != null) {
      break;
    }
    if (root === current) {
      break;
    }
    current = current.parent;
  }
  return composer;
}
function getParentComponentInstance(target, useComponent = false) {
  if (target == null) {
    return null;
  }
  {
    return !useComponent ? target.parent : target.vnode.ctx || target.parent;
  }
}
function setupLifeCycle(i18n, target, composer) {
  {
    onUnmounted(() => {
      const _composer = composer;
      i18n.__deleteInstance(target);
      const dispose = _composer[DisposeSymbol];
      if (dispose) {
        dispose();
        delete _composer[DisposeSymbol];
      }
    }, target);
  }
}
const globalExportProps = [
  "locale",
  "fallbackLocale",
  "availableLocales"
];
const globalExportMethods = ["t", "rt", "d", "n", "tm", "te"];
function injectGlobalFields(app, composer) {
  const i18n = /* @__PURE__ */ Object.create(null);
  globalExportProps.forEach((prop) => {
    const desc = Object.getOwnPropertyDescriptor(composer, prop);
    if (!desc) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const wrap = isRef(desc.value) ? {
      get() {
        return desc.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(val) {
        desc.value.value = val;
      }
    } : {
      get() {
        return desc.get && desc.get();
      }
    };
    Object.defineProperty(i18n, prop, wrap);
  });
  app.config.globalProperties.$i18n = i18n;
  globalExportMethods.forEach((method) => {
    const desc = Object.getOwnPropertyDescriptor(composer, method);
    if (!desc || !desc.value) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
  });
  const dispose = () => {
    delete app.config.globalProperties.$i18n;
    globalExportMethods.forEach((method) => {
      delete app.config.globalProperties[`$${method}`];
    });
  };
  return dispose;
}
{
  registerMessageCompiler(compile);
}
registerMessageResolver(resolveValue);
registerLocaleFallbacker(fallbackWithLocaleChain);

// @ts-nocheck


const localeCodes =  [
  "ar-EG",
  "ca-ES",
  "ca-valencia",
  "ckb",
  "cs-CZ",
  "de-DE",
  "en-GB",
  "en-US",
  "es-419",
  "es-ES",
  "eu-ES",
  "fa-IR",
  "fi-FI",
  "fr-FR",
  "gl-ES",
  "hu-HU",
  "id-ID",
  "it-IT",
  "ja-JP",
  "ko-KR",
  "nl-NL",
  "pl-PL",
  "pt-BR",
  "pt-PT",
  "ru-RU",
  "th-TH",
  "tl-PH",
  "tr-TR",
  "uk-UA",
  "vi-VN",
  "zh-CN",
  "zh-TW"
];

const localeLoaders = {
  "ar-EG": [{ key: "../locales/ar.json", load: () => import('./ar-CxDEsZHZ.mjs' /* webpackChunkName: "locale__opt_elk_locales_ar_json" */), cache: true },
{ key: "../locales/ar-EG.json", load: () => import('./ar-EG-DAXw-dR4.mjs' /* webpackChunkName: "locale__opt_elk_locales_ar_EG_json" */), cache: true }],
  "ca-ES": [{ key: "../locales/ca.json", load: () => import('./ca-CeJu8r6K.mjs' /* webpackChunkName: "locale__opt_elk_locales_ca_json" */), cache: true },
{ key: "../locales/ca-ES.json", load: () => import('./ca-ES-DAXw-dR4.mjs' /* webpackChunkName: "locale__opt_elk_locales_ca_ES_json" */), cache: true }],
  "ca-valencia": [{ key: "../locales/ca.json", load: () => import('./ca-CeJu8r6K.mjs' /* webpackChunkName: "locale__opt_elk_locales_ca_json" */), cache: true },
{ key: "../locales/ca-valencia.json", load: () => import('./ca-valencia-QAzGgPT0.mjs' /* webpackChunkName: "locale__opt_elk_locales_ca_valencia_json" */), cache: true }],
  "ckb": [{ key: "../locales/ckb.json", load: () => import('./ckb-B6UklGYs.mjs' /* webpackChunkName: "locale__opt_elk_locales_ckb_json" */), cache: true }],
  "cs-CZ": [{ key: "../locales/cs-CZ.json", load: () => import('./cs-CZ-BrmjuQOc.mjs' /* webpackChunkName: "locale__opt_elk_locales_cs_CZ_json" */), cache: true }],
  "de-DE": [{ key: "../locales/de-DE.json", load: () => import('./de-DE-C9T_0yWg.mjs' /* webpackChunkName: "locale__opt_elk_locales_de_DE_json" */), cache: true }],
  "en-GB": [{ key: "../locales/en.json", load: () => import('./en-CUbrPSkz.mjs' /* webpackChunkName: "locale__opt_elk_locales_en_json" */), cache: true },
{ key: "../locales/en-GB.json", load: () => import('./en-GB-BjwfMqNd.mjs' /* webpackChunkName: "locale__opt_elk_locales_en_GB_json" */), cache: true }],
  "en-US": [{ key: "../locales/en.json", load: () => import('./en-CUbrPSkz.mjs' /* webpackChunkName: "locale__opt_elk_locales_en_json" */), cache: true },
{ key: "../locales/en-US.json", load: () => import('./en-US-DAXw-dR4.mjs' /* webpackChunkName: "locale__opt_elk_locales_en_US_json" */), cache: true }],
  "es-419": [{ key: "../locales/es.json", load: () => import('./es-ByV4cu7W.mjs' /* webpackChunkName: "locale__opt_elk_locales_es_json" */), cache: true },
{ key: "../locales/es-419.json", load: () => import('./es-419-C-_APO9F.mjs' /* webpackChunkName: "locale__opt_elk_locales_es_419_json" */), cache: true }],
  "es-ES": [{ key: "../locales/es.json", load: () => import('./es-ByV4cu7W.mjs' /* webpackChunkName: "locale__opt_elk_locales_es_json" */), cache: true },
{ key: "../locales/es-ES.json", load: () => import('./es-ES-DAXw-dR4.mjs' /* webpackChunkName: "locale__opt_elk_locales_es_ES_json" */), cache: true }],
  "eu-ES": [{ key: "../locales/eu-ES.json", load: () => import('./eu-ES-BOanOQJ3.mjs' /* webpackChunkName: "locale__opt_elk_locales_eu_ES_json" */), cache: true }],
  "fa-IR": [{ key: "../locales/fa-IR.json", load: () => import('./fa-IR-DruJfFZb.mjs' /* webpackChunkName: "locale__opt_elk_locales_fa_IR_json" */), cache: true }],
  "fi-FI": [{ key: "../locales/fi-FI.json", load: () => import('./fi-FI-fBpeAMXP.mjs' /* webpackChunkName: "locale__opt_elk_locales_fi_FI_json" */), cache: true }],
  "fr-FR": [{ key: "../locales/fr-FR.json", load: () => import('./fr-FR-DdUf4tpx.mjs' /* webpackChunkName: "locale__opt_elk_locales_fr_FR_json" */), cache: true }],
  "gl-ES": [{ key: "../locales/gl-ES.json", load: () => import('./gl-ES-BQMKc9_t.mjs' /* webpackChunkName: "locale__opt_elk_locales_gl_ES_json" */), cache: true }],
  "hu-HU": [{ key: "../locales/hu-HU.json", load: () => import('./hu-HU-DkHrSEEq.mjs' /* webpackChunkName: "locale__opt_elk_locales_hu_HU_json" */), cache: true }],
  "id-ID": [{ key: "../locales/id-ID.json", load: () => import('./id-ID-NHaWQ8Fb.mjs' /* webpackChunkName: "locale__opt_elk_locales_id_ID_json" */), cache: true }],
  "it-IT": [{ key: "../locales/it-IT.json", load: () => import('./it-IT-CicDjebe.mjs' /* webpackChunkName: "locale__opt_elk_locales_it_IT_json" */), cache: true }],
  "ja-JP": [{ key: "../locales/ja-JP.json", load: () => import('./ja-JP-n4D0cIVi.mjs' /* webpackChunkName: "locale__opt_elk_locales_ja_JP_json" */), cache: true }],
  "ko-KR": [{ key: "../locales/ko-KR.json", load: () => import('./ko-KR-SEWEDhcM.mjs' /* webpackChunkName: "locale__opt_elk_locales_ko_KR_json" */), cache: true }],
  "nl-NL": [{ key: "../locales/nl-NL.json", load: () => import('./nl-NL-D-kwT8T-.mjs' /* webpackChunkName: "locale__opt_elk_locales_nl_NL_json" */), cache: true }],
  "pl-PL": [{ key: "../locales/pl-PL.json", load: () => import('./pl-PL-WyWkZ03G.mjs' /* webpackChunkName: "locale__opt_elk_locales_pl_PL_json" */), cache: true }],
  "pt-BR": [{ key: "../locales/pt.json", load: () => import('./pt-CGEuCYaM.mjs' /* webpackChunkName: "locale__opt_elk_locales_pt_json" */), cache: true },
{ key: "../locales/pt-BR.json", load: () => import('./pt-BR-B_oIb7fg.mjs' /* webpackChunkName: "locale__opt_elk_locales_pt_BR_json" */), cache: true }],
  "pt-PT": [{ key: "../locales/pt.json", load: () => import('./pt-CGEuCYaM.mjs' /* webpackChunkName: "locale__opt_elk_locales_pt_json" */), cache: true },
{ key: "../locales/pt-PT.json", load: () => import('./pt-PT-DAXw-dR4.mjs' /* webpackChunkName: "locale__opt_elk_locales_pt_PT_json" */), cache: true }],
  "ru-RU": [{ key: "../locales/ru-RU.json", load: () => import('./ru-RU-D8mnJBmW.mjs' /* webpackChunkName: "locale__opt_elk_locales_ru_RU_json" */), cache: true }],
  "th-TH": [{ key: "../locales/th-TH.json", load: () => import('./th-TH-CFWMYHCg.mjs' /* webpackChunkName: "locale__opt_elk_locales_th_TH_json" */), cache: true }],
  "tl-PH": [{ key: "../locales/tl-PH.json", load: () => import('./tl-PH-CxtavoBP.mjs' /* webpackChunkName: "locale__opt_elk_locales_tl_PH_json" */), cache: true }],
  "tr-TR": [{ key: "../locales/tr-TR.json", load: () => import('./tr-TR-xVodxdMV.mjs' /* webpackChunkName: "locale__opt_elk_locales_tr_TR_json" */), cache: true }],
  "uk-UA": [{ key: "../locales/uk-UA.json", load: () => import('./uk-UA-zDhIV496.mjs' /* webpackChunkName: "locale__opt_elk_locales_uk_UA_json" */), cache: true }],
  "vi-VN": [{ key: "../locales/vi-VN.json", load: () => import('./vi-VN-BCLwgqRT.mjs' /* webpackChunkName: "locale__opt_elk_locales_vi_VN_json" */), cache: true }],
  "zh-CN": [{ key: "../locales/zh-CN.json", load: () => import('./zh-CN-NuAMC3d5.mjs' /* webpackChunkName: "locale__opt_elk_locales_zh_CN_json" */), cache: true }],
  "zh-TW": [{ key: "../locales/zh-TW.json", load: () => import('./zh-TW-CpzIxDTq.mjs' /* webpackChunkName: "locale__opt_elk_locales_zh_TW_json" */), cache: true }]
};

const vueI18nConfigs = [
  () => import('./i18n.config-BJFprXay.mjs' /* webpackChunkName: "__config_i18n_config_ts_dcfe1420" */)
];

const normalizedLocales = [
  {
    "code": "ar-EG",
    "name": "العربية",
    "dir": "rtl",
    "files": [
      {
        "path": "locales/ar.json"
      },
      {
        "path": "locales/ar-EG.json"
      }
    ]
  },
  {
    "code": "ca-ES",
    "name": "Català (Espanya)",
    "files": [
      {
        "path": "locales/ca.json"
      },
      {
        "path": "locales/ca-ES.json"
      }
    ]
  },
  {
    "code": "ca-valencia",
    "name": "Català (valencià)",
    "files": [
      {
        "path": "locales/ca.json"
      },
      {
        "path": "locales/ca-valencia.json"
      }
    ]
  },
  {
    "code": "ckb",
    "name": "کوردیی ناوەندی",
    "dir": "rtl",
    "files": [
      {
        "path": "locales/ckb.json"
      }
    ]
  },
  {
    "code": "cs-CZ",
    "name": "Česky",
    "files": [
      {
        "path": "locales/cs-CZ.json"
      }
    ]
  },
  {
    "code": "de-DE",
    "name": "Deutsch",
    "files": [
      {
        "path": "locales/de-DE.json"
      }
    ]
  },
  {
    "code": "en-GB",
    "name": "English (UK)",
    "files": [
      {
        "path": "locales/en.json"
      },
      {
        "path": "locales/en-GB.json"
      }
    ]
  },
  {
    "code": "en-US",
    "name": "English (US)",
    "files": [
      {
        "path": "locales/en.json"
      },
      {
        "path": "locales/en-US.json"
      }
    ]
  },
  {
    "code": "es-419",
    "name": "Español (Latinoamérica)",
    "files": [
      {
        "path": "locales/es.json"
      },
      {
        "path": "locales/es-419.json"
      }
    ]
  },
  {
    "code": "es-ES",
    "name": "Español (España)",
    "files": [
      {
        "path": "locales/es.json"
      },
      {
        "path": "locales/es-ES.json"
      }
    ]
  },
  {
    "code": "eu-ES",
    "name": "Euskara",
    "files": [
      {
        "path": "locales/eu-ES.json"
      }
    ]
  },
  {
    "code": "fa-IR",
    "name": "فارسی",
    "dir": "rtl",
    "files": [
      {
        "path": "locales/fa-IR.json"
      }
    ]
  },
  {
    "code": "fi-FI",
    "name": "Suomi",
    "files": [
      {
        "path": "locales/fi-FI.json"
      }
    ]
  },
  {
    "code": "fr-FR",
    "name": "Français",
    "files": [
      {
        "path": "locales/fr-FR.json"
      }
    ]
  },
  {
    "code": "gl-ES",
    "name": "Galego",
    "files": [
      {
        "path": "locales/gl-ES.json"
      }
    ]
  },
  {
    "code": "hu-HU",
    "name": "Magyar",
    "files": [
      {
        "path": "locales/hu-HU.json"
      }
    ]
  },
  {
    "code": "id-ID",
    "name": "Indonesia",
    "files": [
      {
        "path": "locales/id-ID.json"
      }
    ]
  },
  {
    "code": "it-IT",
    "name": "Italiano",
    "files": [
      {
        "path": "locales/it-IT.json"
      }
    ]
  },
  {
    "code": "ja-JP",
    "name": "日本語",
    "files": [
      {
        "path": "locales/ja-JP.json"
      }
    ]
  },
  {
    "code": "ko-KR",
    "name": "한국어",
    "files": [
      {
        "path": "locales/ko-KR.json"
      }
    ]
  },
  {
    "code": "nl-NL",
    "name": "Nederlands",
    "files": [
      {
        "path": "locales/nl-NL.json"
      }
    ]
  },
  {
    "code": "pl-PL",
    "name": "Polski",
    "files": [
      {
        "path": "locales/pl-PL.json"
      }
    ]
  },
  {
    "code": "pt-BR",
    "name": "Português (Brasil)",
    "files": [
      {
        "path": "locales/pt.json"
      },
      {
        "path": "locales/pt-BR.json"
      }
    ]
  },
  {
    "code": "pt-PT",
    "name": "Português (Portugal)",
    "files": [
      {
        "path": "locales/pt.json"
      },
      {
        "path": "locales/pt-PT.json"
      }
    ]
  },
  {
    "code": "ru-RU",
    "name": "Русский",
    "files": [
      {
        "path": "locales/ru-RU.json"
      }
    ]
  },
  {
    "code": "th-TH",
    "name": "ไทย",
    "files": [
      {
        "path": "locales/th-TH.json"
      }
    ]
  },
  {
    "code": "tl-PH",
    "name": "Tagalog",
    "files": [
      {
        "path": "locales/tl-PH.json"
      }
    ]
  },
  {
    "code": "tr-TR",
    "name": "Türkçe",
    "files": [
      {
        "path": "locales/tr-TR.json"
      }
    ]
  },
  {
    "code": "uk-UA",
    "name": "Українська",
    "files": [
      {
        "path": "locales/uk-UA.json"
      }
    ]
  },
  {
    "code": "vi-VN",
    "name": "Tiếng Việt",
    "files": [
      {
        "path": "locales/vi-VN.json"
      }
    ]
  },
  {
    "code": "zh-CN",
    "name": "简体中文",
    "files": [
      {
        "path": "locales/zh-CN.json"
      }
    ]
  },
  {
    "code": "zh-TW",
    "name": "繁體中文",
    "files": [
      {
        "path": "locales/zh-TW.json"
      }
    ]
  }
];

const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n";
const parallelPlugin = false;
const isSSG = false;

const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18n";
const DEFAULT_COOKIE_KEY = "i18n_redirected";
const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp";

const cacheMessages = /* @__PURE__ */ new Map();
async function loadVueI18nOptions(vueI18nConfigs, nuxt) {
  const vueI18nOptions = { messages: {} };
  for (const configFile of vueI18nConfigs) {
    const { default: resolver } = await configFile();
    const resolved = typeof resolver === "function" ? await nuxt.runWithContext(async () => await resolver()) : resolver;
    deepCopy(resolved, vueI18nOptions);
  }
  return vueI18nOptions;
}
function makeFallbackLocaleCodes(fallback, locales) {
  let fallbackLocales = [];
  if (isArray(fallback)) {
    fallbackLocales = fallback;
  } else if (isObject(fallback)) {
    const targets = [...locales, "default"];
    for (const locale of targets) {
      if (fallback[locale]) {
        fallbackLocales = [...fallbackLocales, ...fallback[locale].filter(Boolean)];
      }
    }
  } else if (isString(fallback) && locales.every((locale) => locale !== fallback)) {
    fallbackLocales.push(fallback);
  }
  return fallbackLocales;
}
async function loadInitialMessages(messages, localeLoaders, options) {
  const { defaultLocale, initialLocale, localeCodes, fallbackLocale, lazy } = options;
  if (lazy && fallbackLocale) {
    const fallbackLocales = makeFallbackLocaleCodes(fallbackLocale, [defaultLocale, initialLocale]);
    await Promise.all(fallbackLocales.map((locale) => loadAndSetLocaleMessages(locale, localeLoaders, messages)));
  }
  const locales = lazy ? [...(/* @__PURE__ */ new Set()).add(defaultLocale).add(initialLocale)] : localeCodes;
  await Promise.all(locales.map((locale) => loadAndSetLocaleMessages(locale, localeLoaders, messages)));
  return messages;
}
async function loadMessage(locale, { key, load }) {
  let message = null;
  try {
    const getter = await load().then((r) => r.default || r);
    if (isFunction(getter)) {
      message = await getter(locale);
    } else {
      message = getter;
      if (message != null && cacheMessages) {
        cacheMessages.set(key, message);
      }
    }
  } catch (e) {
    console.error("Failed locale loading: " + e.message);
  }
  return message;
}
async function loadLocale(locale, localeLoaders, setter) {
  const loaders = localeLoaders[locale];
  if (loaders == null) {
    console.warn("Could not find messages for locale code: " + locale);
    return;
  }
  const targetMessage = {};
  for (const loader of loaders) {
    let message = null;
    if (cacheMessages && cacheMessages.has(loader.key) && loader.cache) {
      message = cacheMessages.get(loader.key);
    } else {
      message = await loadMessage(locale, loader);
    }
    if (message != null) {
      deepCopy(message, targetMessage);
    }
  }
  setter(locale, targetMessage);
}
async function loadAndSetLocaleMessages(locale, localeLoaders, messages) {
  const setter = (locale2, message) => {
    const base = messages[locale2] || {};
    deepCopy(message, base);
    messages[locale2] = base;
  };
  await loadLocale(locale, localeLoaders, setter);
}

function isHTTPS(req, trustProxy = true) {
  const _xForwardedProto = trustProxy && req.headers ? req.headers["x-forwarded-proto"] : void 0;
  const protoCheck = typeof _xForwardedProto === "string" ? _xForwardedProto.includes("https") : void 0;
  if (protoCheck) {
    return true;
  }
  const _encrypted = req.connection ? req.connection.encrypted : void 0;
  const encryptedCheck = _encrypted !== void 0 ? _encrypted === true : void 0;
  if (encryptedCheck) {
    return true;
  }
  if (protoCheck === void 0 && encryptedCheck === void 0) {
    return void 0;
  }
  return false;
}

function getNormalizedLocales(locales) {
  locales = locales || [];
  const normalized = [];
  for (const locale of locales) {
    if (isString(locale)) {
      normalized.push({ code: locale });
    } else {
      normalized.push(locale);
    }
  }
  return normalized;
}
function isI18nInstance(i18n) {
  return i18n != null && "global" in i18n && "mode" in i18n;
}
function isComposer(target) {
  return target != null && !("__composer" in target) && "locale" in target && isRef(target.locale);
}
function isVueI18n(target) {
  return target != null && "__composer" in target;
}
function getI18nTarget(i18n) {
  return isI18nInstance(i18n) ? i18n.global : i18n;
}
function getComposer(i18n) {
  const target = getI18nTarget(i18n);
  if (isComposer(target))
    return target;
  if (isVueI18n(target))
    return target.__composer;
  return target;
}
function getLocale(i18n) {
  return unref(getI18nTarget(i18n).locale);
}
function getLocales(i18n) {
  return unref(getI18nTarget(i18n).locales);
}
function getLocaleCodes(i18n) {
  return unref(getI18nTarget(i18n).localeCodes);
}
function setLocale(i18n, locale) {
  const target = getI18nTarget(i18n);
  if (isRef(target.locale)) {
    target.locale.value = locale;
  } else {
    target.locale = locale;
  }
}
function getRouteName(routeName) {
  if (isString(routeName))
    return routeName;
  if (isSymbol(routeName))
    return routeName.toString();
  return "(null)";
}
function getLocaleRouteName(routeName, locale, {
  defaultLocale,
  strategy,
  routesNameSeparator,
  defaultLocaleRouteNameSuffix
}) {
  let name = getRouteName(routeName) + (strategy === "no_prefix" ? "" : routesNameSeparator + locale);
  if (locale === defaultLocale && strategy === "prefix_and_default") {
    name += routesNameSeparator + defaultLocaleRouteNameSuffix;
  }
  return name;
}
function resolveBaseUrl(baseUrl, context) {
  if (isFunction(baseUrl)) {
    return baseUrl(context);
  }
  return baseUrl;
}
function matchBrowserLocale(locales, browserLocales) {
  const matchedLocales = [];
  for (const [index, browserCode] of browserLocales.entries()) {
    const matchedLocale = locales.find((l) => l.iso.toLowerCase() === browserCode.toLowerCase());
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 1 - index / browserLocales.length });
      break;
    }
  }
  for (const [index, browserCode] of browserLocales.entries()) {
    const languageCode = browserCode.split("-")[0].toLowerCase();
    const matchedLocale = locales.find((l) => l.iso.split("-")[0].toLowerCase() === languageCode);
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 0.999 - index / browserLocales.length });
      break;
    }
  }
  return matchedLocales;
}
const DefaultBrowserLocaleMatcher = matchBrowserLocale;
function compareBrowserLocale(a, b) {
  if (a.score === b.score) {
    return b.code.length - a.code.length;
  }
  return b.score - a.score;
}
const DefaultBrowerLocaleComparer = compareBrowserLocale;
function findBrowserLocale(locales, browserLocales, { matcher = DefaultBrowserLocaleMatcher, comparer = DefaultBrowerLocaleComparer } = {}) {
  const normalizedLocales = [];
  for (const l of locales) {
    const { code } = l;
    const iso = l.iso || code;
    normalizedLocales.push({ code, iso });
  }
  const matchedLocales = matcher(normalizedLocales, browserLocales);
  if (matchedLocales.length > 1) {
    matchedLocales.sort(comparer);
  }
  return matchedLocales.length ? matchedLocales[0].code : "";
}
function getLocalesRegex(localeCodes) {
  return new RegExp(`^/(${localeCodes.join("|")})(?:/|$)`, "i");
}

function split(str, index) {
  const result = [str.slice(0, index), str.slice(index)];
  return result;
}
function routeToObject(route) {
  const { fullPath, query, hash, name, path, params, meta, redirectedFrom, matched } = route;
  return {
    fullPath,
    params,
    query,
    hash,
    name,
    path,
    meta,
    matched,
    redirectedFrom
  };
}
function resolve({ router }, route, strategy, locale) {
  if (strategy !== "prefix") {
    return router.resolve(route);
  }
  const [rootSlash, restPath] = split(route.path, 1);
  const targetPath = `${rootSlash}${locale}${restPath === "" ? restPath : `/${restPath}`}`;
  const _route = router.options?.routes?.find((r) => r.path === targetPath);
  if (_route == null) {
    return route;
  }
  const _resolvableRoute = assign({}, route, _route);
  _resolvableRoute.path = targetPath;
  return router.resolve(_resolvableRoute);
}

const RESOLVED_PREFIXED = /* @__PURE__ */ new Set(["prefix_and_default", "prefix_except_default"]);
function prefixable(options) {
  const { currentLocale, defaultLocale, strategy } = options;
  const isDefaultLocale = currentLocale === defaultLocale;
  return !(isDefaultLocale && RESOLVED_PREFIXED.has(strategy)) && // no prefix for any language
  !(strategy === "no_prefix");
}
const DefaultPrefixable = prefixable;
function getRouteBaseName(common, givenRoute) {
  const { routesNameSeparator } = common.runtimeConfig.public.i18n;
  const route = unref(givenRoute);
  if (route == null || !route.name) {
    return;
  }
  const name = getRouteName(route.name);
  return name.split(routesNameSeparator)[0];
}
function localePath(common, route, locale) {
  if (typeof route === "string" && hasProtocol(route, { acceptRelative: true })) {
    return route;
  }
  const localizedRoute = resolveRoute(common, route, locale);
  return localizedRoute == null ? "" : localizedRoute.redirectedFrom?.fullPath || localizedRoute.fullPath;
}
function localeRoute(common, route, locale) {
  const resolved = resolveRoute(common, route, locale);
  return resolved ?? void 0;
}
function localeLocation(common, route, locale) {
  const resolved = resolveRoute(common, route, locale);
  return resolved ?? void 0;
}
function resolveRoute(common, route, locale) {
  const { router, i18n } = common;
  const _locale = locale || getLocale(i18n);
  const { routesNameSeparator, defaultLocale, defaultLocaleRouteNameSuffix, strategy, trailingSlash } = common.runtimeConfig.public.i18n;
  const prefixable2 = extendPrefixable(common.runtimeConfig);
  let _route;
  if (isString(route)) {
    if (route[0] === "/") {
      const { pathname: path, search, hash } = parsePath(route);
      const query = parseQuery(search);
      _route = { path, query, hash };
    } else {
      _route = { name: route };
    }
  } else {
    _route = route;
  }
  let localizedRoute = assign({}, _route);
  const isRouteLocationPathRaw = (val) => "path" in val && !!val.path && !("name" in val);
  if (isRouteLocationPathRaw(localizedRoute)) {
    const resolvedRoute = resolve(common, localizedRoute, strategy, _locale);
    const resolvedRouteName = getRouteBaseName(common, resolvedRoute);
    if (isString(resolvedRouteName)) {
      localizedRoute = {
        name: getLocaleRouteName(resolvedRouteName, _locale, {
          defaultLocale,
          strategy,
          routesNameSeparator,
          defaultLocaleRouteNameSuffix
        }),
        // @ts-ignore
        params: resolvedRoute.params,
        query: resolvedRoute.query,
        hash: resolvedRoute.hash
      };
      localizedRoute.state = resolvedRoute.state;
    } else {
      if (prefixable2({ currentLocale: _locale, defaultLocale, strategy })) {
        localizedRoute.path = `/${_locale}${localizedRoute.path}`;
      }
      localizedRoute.path = trailingSlash ? withTrailingSlash(localizedRoute.path, true) : withoutTrailingSlash(localizedRoute.path, true);
    }
  } else {
    if (!localizedRoute.name && !("path" in localizedRoute)) {
      localizedRoute.name = getRouteBaseName(common, router.currentRoute.value);
    }
    localizedRoute.name = getLocaleRouteName(localizedRoute.name, _locale, {
      defaultLocale,
      strategy,
      routesNameSeparator,
      defaultLocaleRouteNameSuffix
    });
  }
  try {
    const resolvedRoute = router.resolve(localizedRoute);
    if (resolvedRoute.name) {
      return resolvedRoute;
    }
    return router.resolve(route);
  } catch (e) {
    if (typeof e === "object" && "type" in e && e.type === 1) {
      return null;
    }
  }
}
const DefaultSwitchLocalePathIntercepter = (path) => path;
function getLocalizableMetaFromDynamicParams(common, route) {
  if (common.runtimeConfig.public.i18n.experimental.switchLocalePathLinkSSR) {
    return unref(common.metaState.value);
  }
  const meta = route.meta || {};
  return unref(meta)?.[DEFAULT_DYNAMIC_PARAMS_KEY] || {};
}
function switchLocalePath(common, locale, _route) {
  const route = _route ?? common.router.currentRoute.value;
  const name = getRouteBaseName(common, route);
  if (!name) {
    return "";
  }
  const switchLocalePathIntercepter = extendSwitchLocalePathIntercepter(common.runtimeConfig);
  const routeCopy = routeToObject(route);
  const resolvedParams = getLocalizableMetaFromDynamicParams(common, route)[locale];
  const baseRoute = { ...routeCopy, name, params: { ...routeCopy.params, ...resolvedParams } };
  const path = localePath(common, baseRoute, locale);
  return switchLocalePathIntercepter(path, locale);
}

function localeHead(common, {
  addDirAttribute = false,
  addSeoAttributes: seoAttributes = true,
  identifierAttribute: idAttribute = "hid"
}) {
  const { defaultDirection } = useRuntimeConfig().public.i18n;
  const i18n = getComposer(common.i18n);
  const metaObject = {
    htmlAttrs: {},
    link: [],
    meta: []
  };
  if (unref(i18n.locales) == null || unref(i18n.baseUrl) == null) {
    return metaObject;
  }
  const locale = getLocale(common.i18n);
  const locales = getLocales(common.i18n);
  const currentLocale = getNormalizedLocales(locales).find((l) => l.code === locale) || {
    code: locale
  };
  const currentIso = currentLocale.iso;
  const currentDir = currentLocale.dir || defaultDirection;
  if (addDirAttribute) {
    metaObject.htmlAttrs.dir = currentDir;
  }
  if (seoAttributes && locale && unref(i18n.locales)) {
    if (currentIso) {
      metaObject.htmlAttrs.lang = currentIso;
    }
    metaObject.link.push(
      ...getHreflangLinks(common, unref(locales), idAttribute),
      ...getCanonicalLink(common, idAttribute, seoAttributes)
    );
    metaObject.meta.push(
      ...getOgUrl(common, idAttribute, seoAttributes),
      ...getCurrentOgLocale(currentLocale, currentIso, idAttribute),
      ...getAlternateOgLocales(unref(locales), currentIso, idAttribute)
    );
  }
  return metaObject;
}
function getBaseUrl() {
  const i18n = getComposer(useNuxtApp().$i18n);
  return unref(i18n.baseUrl);
}
function getHreflangLinks(common, locales, idAttribute) {
  const baseUrl = getBaseUrl();
  const { defaultLocale, strategy } = useRuntimeConfig().public.i18n;
  const links = [];
  if (strategy === "no_prefix")
    return links;
  const localeMap = /* @__PURE__ */ new Map();
  for (const locale of locales) {
    const localeIso = locale.iso;
    if (!localeIso) {
      console.warn("Locale ISO code is required to generate alternate link");
      continue;
    }
    const [language, region] = localeIso.split("-");
    if (language && region && (locale.isCatchallLocale || !localeMap.has(language))) {
      localeMap.set(language, locale);
    }
    localeMap.set(localeIso, locale);
  }
  for (const [iso, mapLocale] of localeMap.entries()) {
    const localePath = switchLocalePath(common, mapLocale.code);
    if (localePath) {
      links.push({
        [idAttribute]: `i18n-alt-${iso}`,
        rel: "alternate",
        href: toAbsoluteUrl(localePath, baseUrl),
        hreflang: iso
      });
    }
  }
  if (defaultLocale) {
    const localePath = switchLocalePath(common, defaultLocale);
    if (localePath) {
      links.push({
        [idAttribute]: "i18n-xd",
        rel: "alternate",
        href: toAbsoluteUrl(localePath, baseUrl),
        hreflang: "x-default"
      });
    }
  }
  return links;
}
function getCanonicalUrl(common, baseUrl, seoAttributes) {
  const route = common.router.currentRoute.value;
  const currentRoute = localeRoute(common, { ...route, name: getRouteBaseName(common, route) });
  if (!currentRoute)
    return "";
  let href = toAbsoluteUrl(currentRoute.path, baseUrl);
  const canonicalQueries = isObject(seoAttributes) && seoAttributes.canonicalQueries || [];
  const currentRouteQueryParams = currentRoute.query;
  const params = new URLSearchParams();
  for (const queryParamName of canonicalQueries) {
    if (queryParamName in currentRouteQueryParams) {
      const queryParamValue = currentRouteQueryParams[queryParamName];
      if (isArray(queryParamValue)) {
        queryParamValue.forEach((v) => params.append(queryParamName, v || ""));
      } else {
        params.append(queryParamName, queryParamValue || "");
      }
    }
  }
  const queryString = params.toString();
  if (queryString) {
    href = `${href}?${queryString}`;
  }
  return href;
}
function getCanonicalLink(common, idAttribute, seoAttributes) {
  const baseUrl = getBaseUrl();
  const href = getCanonicalUrl(common, baseUrl, seoAttributes);
  if (!href)
    return [];
  return [{ [idAttribute]: "i18n-can", rel: "canonical", href }];
}
function getOgUrl(common, idAttribute, seoAttributes) {
  const baseUrl = getBaseUrl();
  const href = getCanonicalUrl(common, baseUrl, seoAttributes);
  if (!href)
    return [];
  return [{ [idAttribute]: "i18n-og-url", property: "og:url", content: href }];
}
function getCurrentOgLocale(currentLocale, currentIso, idAttribute) {
  if (!currentLocale || !currentIso)
    return [];
  return [{ [idAttribute]: "i18n-og", property: "og:locale", content: hypenToUnderscore(currentIso) }];
}
function getAlternateOgLocales(locales, currentIso, idAttribute) {
  const alternateLocales = locales.filter((locale) => locale.iso && locale.iso !== currentIso);
  return alternateLocales.map((locale) => ({
    [idAttribute]: `i18n-og-alt-${locale.iso}`,
    property: "og:locale:alternate",
    content: hypenToUnderscore(locale.iso)
  }));
}
function hypenToUnderscore(str) {
  return (str || "").replace(/-/g, "_");
}
function toAbsoluteUrl(urlOrPath, baseUrl) {
  if (urlOrPath.match(/^https?:\/\//))
    return urlOrPath;
  return baseUrl + urlOrPath;
}

function setCookieLocale(i18n, locale) {
  return callVueI18nInterfaces(i18n, "setLocaleCookie", locale);
}
function mergeLocaleMessage(i18n, locale, messages) {
  return callVueI18nInterfaces(i18n, "mergeLocaleMessage", locale, messages);
}
function onBeforeLanguageSwitch(i18n, oldLocale, newLocale, initial, context) {
  return callVueI18nInterfaces(i18n, "onBeforeLanguageSwitch", oldLocale, newLocale, initial, context);
}
function onLanguageSwitched(i18n, oldLocale, newLocale) {
  return callVueI18nInterfaces(i18n, "onLanguageSwitched", oldLocale, newLocale);
}
function initCommonComposableOptions(i18n) {
  return {
    i18n: i18n ?? useNuxtApp().$i18n,
    router: useRouter(),
    runtimeConfig: useRuntimeConfig(),
    metaState: useState("nuxt-i18n-meta", () => ({}))
  };
}
async function loadAndSetLocale(newLocale, i18n, runtimeI18n, initial = false) {
  const { differentDomains, skipSettingLocaleOnNavigate, lazy } = runtimeI18n;
  const opts = runtimeDetectBrowserLanguage(runtimeI18n);
  const nuxtApp = useNuxtApp();
  let ret = false;
  const oldLocale = getLocale(i18n);
  if (!newLocale) {
    return [ret, oldLocale];
  }
  if (!initial && differentDomains) {
    return [ret, oldLocale];
  }
  if (oldLocale === newLocale) {
    return [ret, oldLocale];
  }
  const localeOverride = await onBeforeLanguageSwitch(i18n, oldLocale, newLocale, initial, nuxtApp);
  const localeCodes = getLocaleCodes(i18n);
  if (localeOverride && localeCodes && localeCodes.includes(localeOverride)) {
    if (localeOverride === oldLocale) {
      return [ret, oldLocale];
    }
    newLocale = localeOverride;
  }
  const i18nFallbackLocales = getVueI18nPropertyValue(i18n, "fallbackLocale");
  if (lazy) {
    const setter = (locale, message) => mergeLocaleMessage(i18n, locale, message);
    if (i18nFallbackLocales) {
      const fallbackLocales = makeFallbackLocaleCodes(i18nFallbackLocales, [newLocale]);
      await Promise.all(fallbackLocales.map((locale) => loadLocale(locale, localeLoaders, setter)));
    }
    await loadLocale(newLocale, localeLoaders, setter);
  }
  if (skipSettingLocaleOnNavigate) {
    return [ret, oldLocale];
  }
  if (opts !== false && opts.useCookie) {
    setCookieLocale(i18n, newLocale);
  }
  setLocale(i18n, newLocale);
  await onLanguageSwitched(i18n, oldLocale, newLocale);
  ret = true;
  return [ret, oldLocale];
}
function detectLocale(route, routeLocaleGetter, vueI18nOptionsLocale, initialLocaleLoader, detectLocaleContext, runtimeI18n) {
  const { strategy, defaultLocale, differentDomains } = runtimeI18n;
  const _detectBrowserLanguage = runtimeDetectBrowserLanguage(runtimeI18n);
  const initialLocale = isFunction(initialLocaleLoader) ? initialLocaleLoader() : initialLocaleLoader;
  const { ssg, callType, firstAccess, localeCookie } = detectLocaleContext;
  const {
    locale: browserLocale,
    stat,
    reason,
    from
  } = _detectBrowserLanguage ? detectBrowserLanguage(route, vueI18nOptionsLocale, detectLocaleContext, initialLocale) : DefaultDetectBrowserLanguageFromResult;
  if (reason === "detect_ignore_on_ssg") {
    return initialLocale;
  }
  if ((from === "navigator_or_header" || from === "cookie" || from === "fallback") && browserLocale) {
    return browserLocale;
  }
  let finalLocale = browserLocale;
  if (!finalLocale) {
    if (differentDomains) {
      finalLocale = getLocaleDomain(normalizedLocales);
    } else if (strategy !== "no_prefix") {
      finalLocale = routeLocaleGetter(route);
    } else {
      if (!_detectBrowserLanguage) {
        finalLocale = initialLocale;
      }
    }
  }
  if (!finalLocale && _detectBrowserLanguage && _detectBrowserLanguage.useCookie) {
    finalLocale = localeCookie.value || "";
  }
  if (!finalLocale) {
    finalLocale = defaultLocale || "";
  }
  return finalLocale;
}
function detectRedirect({
  route,
  targetLocale,
  routeLocaleGetter,
  calledWithRouting = false
}) {
  const nuxtApp = useNuxtApp();
  const common = initCommonComposableOptions();
  const { strategy, differentDomains } = common.runtimeConfig.public.i18n;
  let redirectPath = "";
  const { fullPath: toFullPath } = route.to;
  if (!differentDomains && (calledWithRouting || strategy !== "no_prefix") && routeLocaleGetter(route.to) !== targetLocale) {
    const routePath = nuxtApp.$switchLocalePath(targetLocale) || nuxtApp.$localePath(toFullPath, targetLocale);
    if (isString(routePath) && routePath && !isEqual(routePath, toFullPath) && !routePath.startsWith("//")) {
      redirectPath = !(route.from && route.from.fullPath === routePath) ? routePath : "";
    }
  }
  if ((differentDomains || isSSG ) && routeLocaleGetter(route.to) !== targetLocale) {
    const routePath = switchLocalePath(common, targetLocale, route.to);
    if (isString(routePath) && routePath && !isEqual(routePath, toFullPath) && !routePath.startsWith("//")) {
      redirectPath = routePath;
    }
  }
  return redirectPath;
}
function isRootRedirectOptions(rootRedirect) {
  return isObject(rootRedirect) && "path" in rootRedirect && "statusCode" in rootRedirect;
}
const useRedirectState = () => useState(NUXT_I18N_MODULE_ID + ":redirect", () => "");
function _navigate(redirectPath, status) {
  return navigateTo(redirectPath, { redirectCode: status });
}
async function navigate(args, { status = 302, enableNavigate = false } = {}) {
  const { nuxtApp, i18n, locale, route } = args;
  const { rootRedirect, differentDomains, skipSettingLocaleOnNavigate } = nuxtApp.$config.public.i18n;
  let { redirectPath } = args;
  if (route.path === "/" && rootRedirect) {
    if (isString(rootRedirect)) {
      redirectPath = "/" + rootRedirect;
    } else if (isRootRedirectOptions(rootRedirect)) {
      redirectPath = "/" + rootRedirect.path;
      status = rootRedirect.statusCode;
    }
    redirectPath = nuxtApp.$localePath(redirectPath, locale);
    return _navigate(redirectPath, status);
  }
  if (!differentDomains) {
    if (redirectPath) {
      return _navigate(redirectPath, status);
    }
  } else {
    const state = useRedirectState();
    if (state.value && state.value !== redirectPath) {
      {
        state.value = redirectPath;
      }
    }
  }
}
function injectNuxtHelpers(nuxt, i18n) {
  defineGetter(nuxt, "$i18n", getI18nTarget(i18n));
  defineGetter(nuxt, "$getRouteBaseName", getRouteBaseName);
  defineGetter(nuxt, "$localePath", wrapComposable(localePath));
  defineGetter(nuxt, "$localeRoute", wrapComposable(localeRoute));
  defineGetter(nuxt, "$switchLocalePath", wrapComposable(switchLocalePath));
  defineGetter(nuxt, "$localeHead", wrapComposable(localeHead));
}
function extendPrefixable(runtimeConfig = useRuntimeConfig()) {
  return (opts) => {
    return DefaultPrefixable(opts) && !runtimeConfig.public.i18n.differentDomains;
  };
}
function extendSwitchLocalePathIntercepter(runtimeConfig = useRuntimeConfig()) {
  return (path, locale) => {
    if (runtimeConfig.public.i18n.differentDomains) {
      const domain = getDomainFromLocale(locale);
      if (domain) {
        return joinURL(domain, path);
      } else {
        return path;
      }
    } else {
      return DefaultSwitchLocalePathIntercepter(path);
    }
  };
}
function extendBaseUrl() {
  return () => {
    const ctx = useNuxtApp();
    const { baseUrl, defaultLocale, differentDomains } = ctx.$config.public.i18n;
    if (isFunction(baseUrl)) {
      const baseUrlResult = baseUrl(ctx);
      return baseUrlResult;
    }
    const localeCode = isFunction(defaultLocale) ? defaultLocale() : defaultLocale;
    if (differentDomains && localeCode) {
      const domain = getDomainFromLocale(localeCode);
      if (domain) {
        return domain;
      }
    }
    if (baseUrl) {
      return baseUrl;
    }
    return baseUrl;
  };
}

function formatMessage(message) {
  return NUXT_I18N_MODULE_ID + " " + message;
}
function callVueI18nInterfaces(i18n, name, ...args) {
  const target = getI18nTarget(i18n);
  const [obj, method] = [target, target[name]];
  return Reflect.apply(method, obj, [...args]);
}
function getVueI18nPropertyValue(i18n, name) {
  const target = getI18nTarget(i18n);
  return unref(target[name]);
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
function wrapComposable(fn, common = initCommonComposableOptions()) {
  return (...args) => fn(common, ...args);
}
function parseAcceptLanguage(input) {
  return input.split(",").map((tag) => tag.split(";")[0]);
}
function getBrowserLocale() {
  let ret;
  {
    const header = useRequestHeaders(["accept-language"]);
    const accept = header["accept-language"];
    if (accept) {
      ret = findBrowserLocale(normalizedLocales, parseAcceptLanguage(accept));
    }
  }
  return ret;
}
function getI18nCookie() {
  const detect = runtimeDetectBrowserLanguage();
  const cookieKey = detect && detect.cookieKey || DEFAULT_COOKIE_KEY;
  const date = /* @__PURE__ */ new Date();
  const cookieOptions = {
    expires: new Date(date.setDate(date.getDate() + 365)),
    path: "/",
    sameSite: detect && detect.cookieCrossOrigin ? "none" : "lax",
    secure: detect && detect.cookieCrossOrigin || detect && detect.cookieSecure
  };
  if (detect && detect.cookieDomain) {
    cookieOptions.domain = detect.cookieDomain;
  }
  return useCookie(cookieKey, cookieOptions);
}
function getLocaleCookie(cookieRef, detect) {
  if (detect === false || !detect.useCookie) {
    return;
  }
  const localeCode = cookieRef.value ?? void 0;
  if (localeCode == null) {
    return;
  }
  if (localeCodes.includes(localeCode)) {
    return localeCode;
  }
}
function setLocaleCookie(cookieRef, locale, detect) {
  if (detect === false || !detect.useCookie) {
    return;
  }
  cookieRef.value = locale;
}
const DefaultDetectBrowserLanguageFromResult = {
  locale: "",
  stat: false,
  reason: "unknown",
  from: "unknown"
};
function detectBrowserLanguage(route, vueI18nOptionsLocale, detectLocaleContext, locale = "") {
  const { strategy } = useRuntimeConfig().public.i18n;
  const { ssg, callType, firstAccess, localeCookie } = detectLocaleContext;
  if (!firstAccess) {
    return { locale: strategy === "no_prefix" ? locale : "", stat: false, reason: "first_access_only" };
  }
  const { redirectOn, alwaysRedirect, useCookie, fallbackLocale } = runtimeDetectBrowserLanguage();
  const path = isString(route) ? route : route.path;
  if (strategy !== "no_prefix") {
    if (redirectOn === "root") {
      if (path !== "/") {
        return { locale: "", stat: false, reason: "not_redirect_on_root" };
      }
    } else if (redirectOn === "no prefix") {
      if (!alwaysRedirect && path.match(getLocalesRegex(localeCodes))) {
        return { locale: "", stat: false, reason: "not_redirect_on_no_prefix" };
      }
    }
  }
  let localeFrom = "unknown";
  let cookieLocale;
  let matchedLocale;
  if (useCookie) {
    matchedLocale = cookieLocale = localeCookie.value;
    localeFrom = "cookie";
  }
  if (!matchedLocale) {
    matchedLocale = getBrowserLocale();
    localeFrom = "navigator_or_header";
  }
  const finalLocale = matchedLocale || fallbackLocale;
  if (!matchedLocale && fallbackLocale) {
    localeFrom = "fallback";
  }
  const vueI18nLocale = locale || vueI18nOptionsLocale;
  if (finalLocale && (!useCookie || alwaysRedirect || !cookieLocale)) {
    if (strategy === "no_prefix") {
      return { locale: finalLocale, stat: true, from: localeFrom };
    } else {
      if (callType === "setup") {
        if (finalLocale !== vueI18nLocale) {
          return { locale: finalLocale, stat: true, from: localeFrom };
        }
      }
      if (alwaysRedirect) {
        const redirectOnRoot = path === "/";
        const redirectOnAll = redirectOn === "all";
        const redirectOnNoPrefix = redirectOn === "no prefix" && !path.match(getLocalesRegex(localeCodes));
        if (redirectOnRoot || redirectOnAll || redirectOnNoPrefix) {
          return { locale: finalLocale, stat: true, from: localeFrom };
        }
      }
    }
  }
  if (ssg === "ssg_setup" && finalLocale) {
    return { locale: finalLocale, stat: true, from: localeFrom };
  }
  if ((localeFrom === "navigator_or_header" || localeFrom === "cookie") && finalLocale) {
    return { locale: finalLocale, stat: true, from: localeFrom };
  }
  return { locale: "", stat: false, reason: "not_found_match" };
}
function getHost() {
  let host;
  {
    const header = useRequestHeaders(["x-forwarded-host", "host"]);
    let detectedHost;
    if ("x-forwarded-host" in header) {
      detectedHost = header["x-forwarded-host"];
    } else if ("host" in header) {
      detectedHost = header["host"];
    }
    host = isArray(detectedHost) ? detectedHost[0] : detectedHost;
  }
  return host;
}
function getLocaleDomain(locales) {
  let host = getHost() || "";
  if (host) {
    const matchingLocale = locales.find((locale) => {
      if (locale && locale.domain) {
        let domain = locale.domain;
        if (hasProtocol(locale.domain)) {
          domain = locale.domain.replace(/(http|https):\/\//, "");
        }
        return domain === host;
      }
      return false;
    });
    if (matchingLocale) {
      return matchingLocale.code;
    } else {
      host = "";
    }
  }
  return host;
}
function getDomainFromLocale(localeCode) {
  const runtimeConfig = useRuntimeConfig();
  const nuxtApp = useNuxtApp();
  const config = runtimeConfig.public.i18n;
  const lang = normalizedLocales.find((locale) => locale.code === localeCode);
  const domain = config?.locales?.[localeCode]?.domain ?? lang?.domain;
  if (domain) {
    if (hasProtocol(domain, { strict: true })) {
      return domain;
    }
    let protocol;
    {
      const {
        node: { req }
      } = useRequestEvent(nuxtApp);
      protocol = req && isHTTPS(req) ? "https:" : "http:";
    }
    return protocol + "//" + domain;
  }
  console.warn(formatMessage("Could not find domain name for locale " + localeCode));
}
const runtimeDetectBrowserLanguage = (opts = useRuntimeConfig().public.i18n) => {
  if (opts?.detectBrowserLanguage === false)
    return false;
  return opts?.detectBrowserLanguage;
};

function useSwitchLocalePath() {
  return wrapComposable(switchLocalePath);
}

function extendI18n(i18n, {
  locales = [],
  localeCodes = [],
  baseUrl = "",
  hooks = {},
  context = {}
} = {}) {
  const scope = effectScope();
  const orgInstall = i18n.install;
  i18n.install = (vue, ...options) => {
    const pluginOptions = isPluginOptions(options[0]) ? assign({}, options[0]) : { inject: true };
    if (pluginOptions.inject == null) {
      pluginOptions.inject = true;
    }
    const orgComposerExtend = pluginOptions.__composerExtend;
    pluginOptions.__composerExtend = (localComposer) => {
      const globalComposer2 = getComposer(i18n);
      localComposer.locales = computed(() => globalComposer2.locales.value);
      localComposer.localeCodes = computed(() => globalComposer2.localeCodes.value);
      localComposer.baseUrl = computed(() => globalComposer2.baseUrl.value);
      let orgComposerDispose;
      if (isFunction(orgComposerExtend)) {
        orgComposerDispose = Reflect.apply(orgComposerExtend, pluginOptions, [localComposer]);
      }
      return () => {
        orgComposerDispose && orgComposerDispose();
      };
    };
    if (i18n.mode === "legacy") {
      const orgVueI18nExtend = pluginOptions.__vueI18nExtend;
      pluginOptions.__vueI18nExtend = (vueI18n) => {
        extendVueI18n(vueI18n, hooks.onExtendVueI18n);
        let orgVueI18nDispose;
        if (isFunction(orgVueI18nExtend)) {
          orgVueI18nDispose = Reflect.apply(orgVueI18nExtend, pluginOptions, [vueI18n]);
        }
        return () => {
          orgVueI18nDispose && orgVueI18nDispose();
        };
      };
    }
    options[0] = pluginOptions;
    Reflect.apply(orgInstall, i18n, [vue, ...options]);
    const globalComposer = getComposer(i18n);
    scope.run(() => {
      extendComposer(globalComposer, { locales, localeCodes, baseUrl, hooks, context });
      if (i18n.mode === "legacy" && isVueI18n(i18n.global)) {
        extendVueI18n(i18n.global, hooks.onExtendVueI18n);
      }
    });
    const app = vue;
    const exported = i18n.mode === "composition" ? app.config.globalProperties.$i18n : null;
    if (exported) {
      extendExportedGlobal(exported, globalComposer, hooks.onExtendExportedGlobal);
    }
    if (pluginOptions.inject) {
      const common = initCommonComposableOptions(i18n);
      vue.mixin({
        methods: {
          getRouteBaseName,
          resolveRoute: wrapComposable(resolveRoute, common),
          localePath: wrapComposable(localePath, common),
          localeRoute: wrapComposable(localeRoute, common),
          localeLocation: wrapComposable(localeLocation, common),
          switchLocalePath: wrapComposable(switchLocalePath, common),
          localeHead: wrapComposable(localeHead, common)
        }
      });
    }
    if (app.unmount) {
      const unmountApp = app.unmount;
      app.unmount = () => {
        scope.stop();
        unmountApp();
      };
    }
  };
  return scope;
}
function extendComposer(composer, options) {
  const { locales, localeCodes, baseUrl, context } = options;
  const _locales = ref(locales);
  const _localeCodes = ref(localeCodes);
  const _baseUrl = ref("");
  composer.locales = computed(() => _locales.value);
  composer.localeCodes = computed(() => _localeCodes.value);
  composer.baseUrl = computed(() => _baseUrl.value);
  {
    _baseUrl.value = resolveBaseUrl(baseUrl, context);
  }
  if (options.hooks && options.hooks.onExtendComposer) {
    options.hooks.onExtendComposer(composer);
  }
}
function extendPropertyDescriptors(composer, exported, hook) {
  const properties = [
    {
      locales: {
        get() {
          return composer.locales.value;
        }
      },
      localeCodes: {
        get() {
          return composer.localeCodes.value;
        }
      },
      baseUrl: {
        get() {
          return composer.baseUrl.value;
        }
      }
    }
  ];
  hook && properties.push(hook(composer));
  for (const property of properties) {
    for (const [key, descriptor] of Object.entries(property)) {
      Object.defineProperty(exported, key, descriptor);
    }
  }
}
function extendExportedGlobal(exported, g, hook) {
  extendPropertyDescriptors(g, exported, hook);
}
function extendVueI18n(vueI18n, hook) {
  const c = getComposer(vueI18n);
  extendPropertyDescriptors(c, vueI18n, hook);
}
function isPluginOptions(options) {
  return isObject(options) && ("inject" in options || "__composerExtend" in options || "__vueI18nExtend" in options);
}

function createLocaleFromRouteGetter() {
  const { routesNameSeparator, defaultLocaleRouteNameSuffix } = useRuntimeConfig().public.i18n;
  const localesPattern = `(${localeCodes.join("|")})`;
  const defaultSuffixPattern = `(?:${routesNameSeparator}${defaultLocaleRouteNameSuffix})?`;
  const regexpName = new RegExp(`${routesNameSeparator}${localesPattern}${defaultSuffixPattern}$`, "i");
  const regexpPath = getLocalesRegex(localeCodes);
  const getLocaleFromRoute = (route) => {
    if (isObject(route)) {
      if (route.name) {
        const name = isString(route.name) ? route.name : route.name.toString();
        const matches = name.match(regexpName);
        if (matches && matches.length > 1) {
          return matches[1];
        }
      } else if (route.path) {
        const matches = route.path.match(regexpPath);
        if (matches && matches.length > 1) {
          return matches[1];
        }
      }
    } else if (isString(route)) {
      const matches = route.match(regexpPath);
      if (matches && matches.length > 1) {
        return matches[1];
      }
    }
    return "";
  };
  return getLocaleFromRoute;
}

/* _processed_nuxt_unctx_transform */
const i18n_Xdq3nYb1Y4 = defineNuxtPlugin({
  name: "i18n:plugin",
  parallel: parallelPlugin,
  async setup(nuxt) {let __temp, __restore;
    const route = useRoute();
    const { vueApp: app } = nuxt;
    const nuxtContext = nuxt;
    const runtimeI18n = { ...nuxtContext.$config.public.i18n };
    runtimeI18n.baseUrl = extendBaseUrl();
    const _detectBrowserLanguage = runtimeDetectBrowserLanguage();
    const vueI18nOptions = (([__temp,__restore]=executeAsync(()=>loadVueI18nOptions(vueI18nConfigs, useNuxtApp()))),__temp=await __temp,__restore(),__temp);
    vueI18nOptions.messages = vueI18nOptions.messages || {};
    vueI18nOptions.fallbackLocale = vueI18nOptions.fallbackLocale ?? false;
    const getLocaleFromRoute = createLocaleFromRouteGetter();
    const getDefaultLocale = (defaultLocale) => defaultLocale || vueI18nOptions.locale || "en-US";
    const localeCookie = getI18nCookie();
    let initialLocale = detectLocale(
      route,
      getLocaleFromRoute,
      vueI18nOptions.locale,
      getDefaultLocale(runtimeI18n.defaultLocale),
      {
        ssg: "normal",
        callType: "setup",
        firstAccess: true,
        localeCookie
      },
      runtimeI18n
    );
    vueI18nOptions.messages = (([__temp,__restore]=executeAsync(()=>loadInitialMessages(vueI18nOptions.messages, localeLoaders, {
      localeCodes,
      initialLocale,
      lazy: runtimeI18n.lazy,
      defaultLocale: runtimeI18n.defaultLocale,
      fallbackLocale: vueI18nOptions.fallbackLocale
    }))),__temp=await __temp,__restore(),__temp);
    initialLocale = getDefaultLocale(initialLocale);
    const i18n = createI18n({ ...vueI18nOptions, locale: initialLocale });
    let notInitialSetup = true;
    const isInitialLocaleSetup = (locale) => initialLocale !== locale && notInitialSetup;
    extendI18n(i18n, {
      locales: runtimeI18n.configLocales,
      localeCodes,
      baseUrl: runtimeI18n.baseUrl,
      context: nuxtContext,
      hooks: {
        onExtendComposer(composer) {
          composer.strategy = runtimeI18n.strategy;
          composer.localeProperties = computed(
            () => normalizedLocales.find((l) => l.code === composer.locale.value) || { code: composer.locale.value }
          );
          composer.setLocale = async (locale) => {
            const localeSetup = isInitialLocaleSetup(locale);
            const [modified] = await loadAndSetLocale(locale, i18n, runtimeI18n, localeSetup);
            if (modified && localeSetup) {
              notInitialSetup = false;
            }
            const redirectPath = await nuxtContext.runWithContext(
              () => detectRedirect({
                route: { to: route },
                targetLocale: locale,
                routeLocaleGetter: getLocaleFromRoute
              })
            );
            await nuxtContext.runWithContext(
              async () => await navigate(
                {
                  nuxtApp: nuxtContext,
                  i18n,
                  redirectPath,
                  locale,
                  route
                },
                { enableNavigate: true }
              )
            );
          };
          composer.loadLocaleMessages = async (locale) => {
            const setter = (locale2, message) => mergeLocaleMessage(i18n, locale2, message);
            await loadLocale(locale, localeLoaders, setter);
          };
          composer.differentDomains = runtimeI18n.differentDomains;
          composer.defaultLocale = runtimeI18n.defaultLocale;
          composer.getBrowserLocale = () => getBrowserLocale();
          composer.getLocaleCookie = () => getLocaleCookie(localeCookie, _detectBrowserLanguage);
          composer.setLocaleCookie = (locale) => setLocaleCookie(localeCookie, locale, _detectBrowserLanguage);
          composer.onBeforeLanguageSwitch = (oldLocale, newLocale, initialSetup, context) => nuxt.callHook("i18n:beforeLocaleSwitch", { oldLocale, newLocale, initialSetup, context });
          composer.onLanguageSwitched = (oldLocale, newLocale) => nuxt.callHook("i18n:localeSwitched", { oldLocale, newLocale });
          composer.finalizePendingLocaleChange = async () => {
            if (!i18n.__pendingLocale) {
              return;
            }
            setLocale(i18n, i18n.__pendingLocale);
            if (i18n.__resolvePendingLocalePromise) {
              await i18n.__resolvePendingLocalePromise();
            }
            i18n.__pendingLocale = void 0;
          };
          composer.waitForPendingLocaleChange = async () => {
            if (i18n.__pendingLocale && i18n.__pendingLocalePromise) {
              await i18n.__pendingLocalePromise;
            }
          };
        },
        onExtendExportedGlobal(g) {
          return {
            strategy: {
              get() {
                return g.strategy;
              }
            },
            localeProperties: {
              get() {
                return g.localeProperties.value;
              }
            },
            setLocale: {
              get() {
                return async (locale) => Reflect.apply(g.setLocale, g, [locale]);
              }
            },
            differentDomains: {
              get() {
                return g.differentDomains;
              }
            },
            defaultLocale: {
              get() {
                return g.defaultLocale;
              }
            },
            getBrowserLocale: {
              get() {
                return () => Reflect.apply(g.getBrowserLocale, g, []);
              }
            },
            getLocaleCookie: {
              get() {
                return () => Reflect.apply(g.getLocaleCookie, g, []);
              }
            },
            setLocaleCookie: {
              get() {
                return (locale) => Reflect.apply(g.setLocaleCookie, g, [locale]);
              }
            },
            onBeforeLanguageSwitch: {
              get() {
                return (oldLocale, newLocale, initialSetup, context) => Reflect.apply(g.onBeforeLanguageSwitch, g, [oldLocale, newLocale, initialSetup, context]);
              }
            },
            onLanguageSwitched: {
              get() {
                return (oldLocale, newLocale) => Reflect.apply(g.onLanguageSwitched, g, [oldLocale, newLocale]);
              }
            },
            finalizePendingLocaleChange: {
              get() {
                return () => Reflect.apply(g.finalizePendingLocaleChange, g, []);
              }
            },
            waitForPendingLocaleChange: {
              get() {
                return () => Reflect.apply(g.waitForPendingLocaleChange, g, []);
              }
            }
          };
        },
        onExtendVueI18n(composer) {
          return {
            strategy: {
              get() {
                return composer.strategy;
              }
            },
            localeProperties: {
              get() {
                return composer.localeProperties.value;
              }
            },
            setLocale: {
              get() {
                return async (locale) => Reflect.apply(composer.setLocale, composer, [locale]);
              }
            },
            loadLocaleMessages: {
              get() {
                return async (locale) => Reflect.apply(composer.loadLocaleMessages, composer, [locale]);
              }
            },
            differentDomains: {
              get() {
                return composer.differentDomains;
              }
            },
            defaultLocale: {
              get() {
                return composer.defaultLocale;
              }
            },
            getBrowserLocale: {
              get() {
                return () => Reflect.apply(composer.getBrowserLocale, composer, []);
              }
            },
            getLocaleCookie: {
              get() {
                return () => Reflect.apply(composer.getLocaleCookie, composer, []);
              }
            },
            setLocaleCookie: {
              get() {
                return (locale) => Reflect.apply(composer.setLocaleCookie, composer, [locale]);
              }
            },
            onBeforeLanguageSwitch: {
              get() {
                return (oldLocale, newLocale, initialSetup, context) => Reflect.apply(composer.onBeforeLanguageSwitch, composer, [
                  oldLocale,
                  newLocale,
                  initialSetup,
                  context
                ]);
              }
            },
            onLanguageSwitched: {
              get() {
                return (oldLocale, newLocale) => Reflect.apply(composer.onLanguageSwitched, composer, [oldLocale, newLocale]);
              }
            },
            finalizePendingLocaleChange: {
              get() {
                return () => Reflect.apply(composer.finalizePendingLocaleChange, composer, []);
              }
            },
            waitForPendingLocaleChange: {
              get() {
                return () => Reflect.apply(composer.waitForPendingLocaleChange, composer, []);
              }
            }
          };
        }
      }
    });
    const pluginOptions = {
      __composerExtend: (c) => {
        const g = getComposer(i18n);
        c.strategy = g.strategy;
        c.localeProperties = computed(() => g.localeProperties.value);
        c.setLocale = g.setLocale;
        c.differentDomains = g.differentDomains;
        c.getBrowserLocale = g.getBrowserLocale;
        c.getLocaleCookie = g.getLocaleCookie;
        c.setLocaleCookie = g.setLocaleCookie;
        c.onBeforeLanguageSwitch = g.onBeforeLanguageSwitch;
        c.onLanguageSwitched = g.onLanguageSwitched;
        c.finalizePendingLocaleChange = g.finalizePendingLocaleChange;
        c.waitForPendingLocaleChange = g.waitForPendingLocaleChange;
        return () => {
        };
      }
    };
    app.use(i18n, pluginOptions);
    injectNuxtHelpers(nuxtContext, i18n);
    if (runtimeI18n.experimental.switchLocalePathLinkSSR === true) {
      const switchLocalePath = useSwitchLocalePath();
      const switchLocalePathLinkWrapperExpr = new RegExp(
        [
          `<!--${SWITCH_LOCALE_PATH_LINK_IDENTIFIER}-\\[(\\w+)\\]-->`,
          `.+?`,
          `<!--/${SWITCH_LOCALE_PATH_LINK_IDENTIFIER}-->`
        ].join(""),
        "g"
      );
      nuxt.hook("app:rendered", (ctx) => {
        if (ctx.renderResult?.html == null)
          return;
        ctx.renderResult.html = ctx.renderResult.html.replaceAll(
          switchLocalePathLinkWrapperExpr,
          (match, p1) => match.replace(/href="([^"]+)"/, `href="${switchLocalePath(p1 ?? "")}"`)
        );
      });
    }
    let routeChangeCount = 0;
    addRouteMiddleware(
      "locale-changing",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      defineNuxtRouteMiddleware(async (to, from) => {let __temp, __restore;
        const locale = detectLocale(
          to,
          getLocaleFromRoute,
          vueI18nOptions.locale,
          () => {
            return getLocale(i18n) || getDefaultLocale(runtimeI18n.defaultLocale);
          },
          {
            ssg: "normal",
            callType: "routing",
            firstAccess: routeChangeCount === 0,
            localeCookie
          },
          runtimeI18n
        );
        const localeSetup = isInitialLocaleSetup(locale);
        const [modified] = (([__temp,__restore]=executeAsync(()=>loadAndSetLocale(locale, i18n, runtimeI18n, localeSetup))),__temp=await __temp,__restore(),__temp);
        if (modified && localeSetup) {
          notInitialSetup = false;
        }
        const redirectPath = (([__temp,__restore]=executeAsync(()=>nuxtContext.runWithContext(
          () => detectRedirect({
            route: { to, from },
            targetLocale: locale,
            routeLocaleGetter: runtimeI18n.strategy === "no_prefix" ? () => locale : getLocaleFromRoute,
            calledWithRouting: true
          })
        ))),__temp=await __temp,__restore(),__temp);
        routeChangeCount++;
        return (([__temp,__restore]=executeAsync(()=>nuxtContext.runWithContext(
          async () => navigate({ nuxtApp: nuxtContext, i18n, redirectPath, locale, route: to })
        ))),__temp=await __temp,__restore(),__temp);
      }),
      { global: true }
    );
  }
});

const unocss_MzCDxu9LMj = defineNuxtPlugin(() => {});

const _1_scroll_to_top_UkFDmv2kEl = defineNuxtPlugin(() => {
  return {
    provide: {
      scrollToTop: () => {
        (void 0).scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
  };
});

const useColorMode = () => {
  return useState("color-mode").value;
};

const color_mode_Tkxaf6OtwV = defineNuxtPlugin(() => {
  const colorMode = useColorMode();
  useHead({
    meta: [{
      id: "theme-color",
      name: "theme-color",
      content: () => colorMode.value === "dark" ? THEME_COLORS.themeDark : THEME_COLORS.themeLight
    }]
  });
});

const floating_vue_BiOD74u9sH = defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(FloatingVue);
});

const masto_XvM57Hn2Y4 = defineNuxtPlugin(() => {
  const { params, query } = useRoute();
  publicServer.value = params.server || useRuntimeConfig().public.defaultServer;
  const masto = createMasto();
  const user = typeof query.server === "string" && typeof query.token === "string" ? {
    server: query.server,
    token: query.token,
    vapidKey: typeof query.vapid_key === "string" ? query.vapid_key : void 0
  } : currentUser.value || { server: publicServer.value };
  loginTo(masto, user);
  return {
    provide: {
      masto
    }
  };
});

const oldFontSizeMap = {
  xs: "13px",
  sm: "14px",
  md: "15px",
  lg: "16px",
  xl: "17px"
};

const setup_head_script_server_v8QdxScEPh = defineNuxtPlugin(() => {
  useHead({
    script: [
      {
        innerHTML: `
;(function() {
  const handle = localStorage.getItem('${STORAGE_KEY_CURRENT_USER_HANDLE}') || '[anonymous]'
  const allSettings = JSON.parse(localStorage.getItem('${STORAGE_KEY_SETTINGS}') || '{}')
  const settings = allSettings[handle]
  if (!settings) { return }

  const html = document.documentElement
  ${""}

  if (settings.fontSize) {
    const oldFontSizeMap = ${JSON.stringify(oldFontSizeMap)}
    html.style.setProperty('--font-size', oldFontSizeMap[settings.fontSize] || settings.fontSize)
  }
  if (settings.language) {
    html.setAttribute('lang', settings.language)
  }
  if (settings.preferences.zenMode) {
    html.classList.add('zen')
  }
  if (settings.themeColors) {
    Object.entries(settings.themeColors).map(i => html.style.setProperty(i[0], i[1]))
  }
})()`.trim().replace(/\s*\n+\s*/g, ";")
      }
    ]
  });
});

const isHydrated = ref(false);
function onHydrated(cb) {
  watchOnce(isHydrated, () => cb(), { immediate: isHydrated.value });
}
function useDeactivated() {
  const deactivated = ref(false);
  return deactivated;
}
function onReactivated(hook, target) {
  ref(true);
}
function useHydratedHead(input, options) {
  if (input && typeof input === "object" && !("value" in input)) {
    const title = "title" in input ? input.title : void 0;
    if (title) {
      input.meta = input.meta || [];
      if (Array.isArray(input.meta)) {
        input.meta.push(
          { property: "og:title", content: typeof input.title === "function" ? input.title() : input.title }
        );
      }
    } else if (title) {
      input.title = () => isHydrated.value ? typeof title === "function" ? title() : title : "";
    }
  }
  return useHead(() => {
    if (!isHydrated.value)
      return {};
    return resolveUnref(input);
  }, options);
}

function useI18n() {
  const {
    t,
    d,
    n,
    ...rest
  } = useI18n$1();
  return {
    ...rest,
    t: wrapI18n(t),
    d: wrapI18n(d),
    n: wrapI18n(n)
  };
}
function wrapI18n(t) {
  return (...args) => {
    return isHydrated.value ? t(...args) : "";
  };
}

function getDefaultLanguage(languages) {
  return "en-US";
}
const DEFAULT__PREFERENCES_SETTINGS = {
  hideAltIndicatorOnPosts: false,
  hideBoostCount: false,
  hideReplyCount: false,
  hideFavoriteCount: false,
  hideFollowerCount: false,
  hideTranslation: false,
  hideUsernameEmojis: false,
  hideAccountHoverCard: false,
  hideTagHoverCard: false,
  hideNews: false,
  grayscaleMode: false,
  enableAutoplay: true,
  optimizeForLowPerformanceDevice: false,
  enableDataSaving: false,
  enablePinchToZoom: false,
  useStarFavoriteIcon: false,
  zenMode: false,
  experimentalVirtualScroller: true,
  experimentalGitHubCards: true,
  experimentalUserPicker: true,
  experimentalEmbeddedMedia: false
};
function getDefaultUserSettings(locales) {
  return {
    language: getDefaultLanguage(),
    fontSize: DEFAULT_FONT_SIZE,
    disabledTranslationLanguages: [],
    preferences: DEFAULT__PREFERENCES_SETTINGS
  };
}

function useUserSettings() {
  const { locales } = useNuxtApp().$i18n;
  unref(locales).map((locale) => locale.code);
  const settingsStorage = useUserLocalStorage(STORAGE_KEY_SETTINGS, () => getDefaultUserSettings());
  if (settingsStorage.value.fontSize && !settingsStorage.value.fontSize.includes("px"))
    settingsStorage.value.fontSize = oldFontSizeMap[settingsStorage.value.fontSize];
  return settingsStorage;
}
function usePreferences(name) {
  const userSettings = useUserSettings();
  return computed({
    get() {
      return getPreferences(userSettings.value, name);
    },
    set(value) {
      userSettings.value.preferences[name] = value;
    }
  });
}
function getPreferences(userSettings, name) {
  const preference = userSettings?.preferences?.[name] ?? DEFAULT__PREFERENCES_SETTINGS[name];
  if (name === "enableAutoplay")
    return getPreferences(userSettings, "enableDataSaving") ? false : preference;
  return preference;
}
function togglePreferences(key) {
  const flag = usePreferences(key);
  flag.value = !flag.value;
}

/* _processed_nuxt_unctx_transform */
const setup_i18n_t7wYybOP9U = defineNuxtPlugin(async (nuxt) => {  const t = nuxt.vueApp.config.globalProperties.$t;
  const d = nuxt.vueApp.config.globalProperties.$d;
  const n = nuxt.vueApp.config.globalProperties.$n;
  nuxt.vueApp.config.globalProperties.$t = wrapI18n(t);
  nuxt.vueApp.config.globalProperties.$d = wrapI18n(d);
  nuxt.vueApp.config.globalProperties.$n = wrapI18n(n);
});

/* _processed_nuxt_unctx_transform */
const BOT_RE = /bot\b|index|spider|facebookexternalhit|crawl|wget|slurp|mediapartners-google|whatsapp/i;
const social_server_uPLBkz1xMM = defineNuxtPlugin(async (nuxtApp) => {let __temp, __restore;
  const route = useRoute();
  if (!("server" in route.params))
    return;
  const userAgent = useRequestHeaders()["user-agent"];
  if (!userAgent)
    return;
  const isOpenGraphCrawler = BOT_RE.test(userAgent);
  if (isOpenGraphCrawler) {
(([__temp,__restore]=executeAsync(()=>sendRedirect(nuxtApp.ssrContext.event, `https:/${route.path}`, 301))),await __temp,__restore());  }
});

const plugins = [
  path_LH0ulmb5c1,
  unhead_3dWckw4Y8m,
  plugin$1,
  plugin,
  revive_payload_server_hLdkTd5pOU,
  components_plugin_KR1HBZs4kY,
  plugin_server_3ZqZMOppMQ,
  i18n_Xdq3nYb1Y4,
  unocss_MzCDxu9LMj,
  _1_scroll_to_top_UkFDmv2kEl,
  color_mode_Tkxaf6OtwV,
  floating_vue_BiOD74u9sH,
  masto_XvM57Hn2Y4,
  setup_head_script_server_v8QdxScEPh,
  setup_i18n_t7wYybOP9U,
  social_server_uPLBkz1xMM
];

function defaultEstimatedProgress(duration, elapsed) {
  const completionPercentage = elapsed / duration * 100;
  return 2 / Math.PI * 100 * Math.atan(completionPercentage / 50);
}
function createLoadingIndicator(opts = {}) {
  const { duration = 2e3, throttle = 200, hideDelay = 500, resetDelay = 400 } = opts;
  opts.estimatedProgress || defaultEstimatedProgress;
  const nuxtApp = useNuxtApp();
  const progress = ref(0);
  const isLoading = ref(false);
  const start = () => set(0);
  function set(at = 0) {
    if (nuxtApp.isHydrating) {
      return;
    }
    if (at >= 100) {
      return finish();
    }
    progress.value = at < 0 ? 0 : at;
    if (throttle && false) {
      setTimeout(() => {
        isLoading.value = true;
      }, throttle);
    } else {
      isLoading.value = true;
    }
  }
  function finish(opts2 = {}) {
    progress.value = 100;
    if (opts2.force) {
      progress.value = 0;
      isLoading.value = false;
    }
  }
  function clear() {
  }
  let _cleanup = () => {
  };
  return {
    _cleanup,
    progress: computed(() => progress.value),
    isLoading: computed(() => isLoading.value),
    start,
    set,
    finish,
    clear
  };
}
function useLoadingIndicator(opts = {}) {
  const nuxtApp = useNuxtApp();
  const indicator = nuxtApp._loadingIndicator = nuxtApp._loadingIndicator || createLoadingIndicator(opts);
  return indicator;
}

const __nuxt_component_0 = defineComponent({
  name: "NuxtLoadingIndicator",
  props: {
    throttle: {
      type: Number,
      default: 200
    },
    duration: {
      type: Number,
      default: 2e3
    },
    height: {
      type: Number,
      default: 3
    },
    color: {
      type: [String, Boolean],
      default: "repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)"
    },
    estimatedProgress: {
      type: Function,
      required: false
    }
  },
  setup(props, { slots, expose }) {
    const { progress, isLoading, start, finish, clear } = useLoadingIndicator({
      duration: props.duration,
      throttle: props.throttle,
      estimatedProgress: props.estimatedProgress
    });
    expose({
      progress,
      isLoading,
      start,
      finish,
      clear
    });
    return () => h("div", {
      class: "nuxt-loading-indicator",
      style: {
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        pointerEvents: "none",
        width: "auto",
        height: `${props.height}px`,
        opacity: isLoading.value ? 1 : 0,
        background: props.color || void 0,
        backgroundSize: `${100 / progress.value * 100}% auto`,
        transform: `scaleX(${progress.value}%)`,
        transformOrigin: "left",
        transition: "transform 0.1s, height 0.4s, opacity 0.4s",
        zIndex: 999999
      }
    }, slots);
  }
});

const layouts = {
  default: () => import('./default-D0cV2DiW.mjs').then(m => m.default || m),
  none: () => import('./none-DjpMs3vg.mjs').then(m => m.default || m)
};

const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  async setup(props, context) {
    const LayoutComponent = await layouts[props.name]().then((r) => r.default || r);
    return () => h(LayoutComponent, props.layoutProps, context.slots);
  }
});
const __nuxt_component_1 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    },
    fallback: {
      type: [String, Object],
      default: null
    }
  },
  setup(props, context) {
    const nuxtApp = useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      let layout2 = unref(props.name) ?? route.meta.layout ?? "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = ref();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route.meta.layoutTransition ?? appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => h(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h(
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, { ref: layoutRef }),
              key: layout.value || void 0,
              name: layout.value,
              shouldProvide: !props.name,
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        isCurrent: (route) => name === (route.meta.layout ?? "default")
      });
    }
    return () => {
      if (!name || typeof name === "string" && !(name in layouts)) {
        return context.slots.default?.();
      }
      return h(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});

const RouteProvider = defineComponent({
  props: {
    vnode: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key]
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});

const __nuxt_component_4 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    const forkRoute = inject(PageRouteSymbol, null);
    let previousPageKey;
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    let vnode;
    const done = nuxtApp.deferHydration();
    if (props.pageKey) {
      watch(() => props.pageKey, (next, prev) => {
        if (next !== prev) {
          nuxtApp.callHook("page:loading:start");
        }
      });
    }
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            done();
            return;
          }
          const key = generateRouteKey$1(routeProps, props.pageKey);
          if (!nuxtApp.isHydrating && !hasChildrenRoutes(forkRoute, routeProps.route, routeProps.Component) && previousPageKey === key) {
            nuxtApp.callHook("page:loading:end");
          }
          previousPageKey = key;
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          const keepaliveConfig = props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive;
          vnode = _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              keepaliveConfig,
              h(Suspense, {
                suspensible: true,
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).then(() => nuxtApp.callHook("page:loading:end")).finally(done));
                }
              }, {
                default: () => {
                  const providerVNode = h(RouteProvider, {
                    key: key || void 0,
                    vnode: routeProps.Component,
                    route: routeProps.route,
                    renderKey: key || void 0,
                    trackRootNodes: hasTransition,
                    vnodeRef: pageRef
                  });
                  return providerVNode;
                }
              })
            )
          ).default();
          return vnode;
        }
      });
    };
  }
});
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: prop.onAfterLeave ? toArray(prop.onAfterLeave) : void 0
  }));
  return defu(..._props);
}
function hasChildrenRoutes(fork, newRoute, Component) {
  if (!fork) {
    return false;
  }
  const index = newRoute.matched.findIndex((m) => m.components?.default === Component?.type);
  return index < newRoute.matched.length - 1;
}

const ariaAnnouncer = useEventBus(Symbol("aria-announcer"));
function useAriaAnnouncer() {
  const announce = (message) => {
    ariaAnnouncer.emit("announce", message);
  };
  const mute = () => {
    ariaAnnouncer.emit("mute");
  };
  const unmute = () => {
    ariaAnnouncer.emit("unmute");
  };
  return { announce, ariaAnnouncer, mute, unmute };
}

const _sfc_main$w = /* @__PURE__ */ defineComponent({
  __name: "AriaAnnouncer",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const { t, locale, locales } = useI18n();
    const { ariaAnnouncer, announce } = useAriaAnnouncer();
    const localeMap = locales.value.reduce((acc, l) => {
      acc[l.code] = l.name;
      return acc;
    }, {});
    const ariaLive = ref("polite");
    const ariaMessage = ref("");
    watch(locale, (l, ol) => {
      if (ol) {
        announce(t("a11y.locale_changing", [localeMap[ol] ?? ol]));
        setTimeout(() => {
          announce(t("a11y.locale_changed", [localeMap[l] ?? l]));
        }, 1e3);
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<p${ssrRenderAttrs(mergeProps({
        "sr-only": "",
        role: "status",
        "aria-live": unref(ariaLive)
      }, _attrs))}>${ssrInterpolate(unref(ariaMessage))}</p>`);
    };
  }
});

const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/aria/AriaAnnouncer.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};

const elkTeamMembers = [
  {
    github: "antfu",
    display: "Anthony Fu",
    twitter: "antfu7",
    mastodon: "antfu@webtoo.ls",
    link: "/m.webtoo.ls/@antfu"
  },
  {
    github: "patak-dev",
    display: "Patak",
    twitter: "patak_dev",
    mastodon: "patak@webtoo.ls",
    link: "/m.webtoo.ls/@patak"
  },
  {
    github: "danielroe",
    display: "Daniel Roe",
    twitter: "danielcroe",
    mastodon: "daniel@roe.dev",
    link: "/mastodon.roe.dev/@daniel"
  },
  {
    github: "sxzz",
    display: "三咲智子 Kevin Deng",
    twitter: "sanxiaozhizi",
    mastodon: "sxzz@webtoo.ls",
    link: "/m.webtoo.ls/@sxzz"
  },
  {
    github: "userquin",
    display: "Joaquín Sánchez",
    twitter: "userquin",
    mastodon: "userquin@webtoo.ls",
    link: "/m.webtoo.ls/@userquin",
    sponsors: "elk-zone"
    // sponsors/userquin isn't enabled
  },
  {
    github: "shuuji3",
    display: "TAKAHASHI Shuuji",
    mastodon: "shuuji3@webtoo.ls",
    link: "/m.webtoo.ls/@shuuji3",
    sponsors: "elk-zone"
    // sponsors/shuuji3 isn't enabled
  }
].sort(() => Math.random() - 0.5);
function useBuildInfo() {
  return useAppConfig().buildInfo;
}

function setupPageHeader() {
  const { locale, locales, t } = useI18n();
  useColorMode();
  const buildInfo = useBuildInfo();
  const enablePinchToZoom = usePreferences("enablePinchToZoom");
  const localeMap = locales.value.reduce((acc, l) => {
    acc[l.code] = l.dir ?? "ltr";
    return acc;
  }, {});
  useHydratedHead({
    htmlAttrs: {
      lang: () => locale.value,
      dir: () => localeMap[locale.value] ?? "ltr",
      class: () => enablePinchToZoom.value ? ["enable-pinch-to-zoom"] : []
    },
    meta: [{
      name: "viewport",
      content: () => `width=device-width,initial-scale=1${enablePinchToZoom.value ? "" : ",maximum-scale=1,user-scalable=0"},viewport-fit=cover`
    }],
    titleTemplate: (title) => {
      let titleTemplate = title ?? "";
      if (titleTemplate.match(/&[a-z0-9#]+;/gi)) {
        titleTemplate = unescapeTitleTemplate(titleTemplate, [
          ['"', ["&#34;", "&quot;"]],
          ["&", ["&#38;", "&amp;"]],
          ["'", ["&#39;", "&apos;"]],
          ["<", ["&#60;", "&lt;"]],
          [">", ["&#62;", "&gt;"]]
        ]);
        if (titleTemplate.length > 60)
          titleTemplate = `${titleTemplate.slice(0, 60)}...${titleTemplate.endsWith('"') ? '"' : ""}`;
        if (!titleTemplate.includes('"'))
          titleTemplate = `"${titleTemplate}"`;
      } else if (titleTemplate.length > 60) {
        titleTemplate = `${titleTemplate.slice(0, 60)}...${titleTemplate.endsWith('"') ? '"' : ""}`;
      }
      if (titleTemplate.length)
        titleTemplate += " | ";
      titleTemplate += t("app_name");
      if (buildInfo.env !== "release")
        titleTemplate += ` (${buildInfo.env})`;
      return titleTemplate;
    },
    link: []
  });
}
function unescapeTitleTemplate(titleTemplate, replacements) {
  let result = titleTemplate;
  for (const [replacement, entities] of replacements) {
    for (const e of entities)
      result = result.replaceAll(e, replacement);
  }
  return result.trim();
}

function useSignIn(input) {
  const singleInstanceServer = useRuntimeConfig().public.singleInstance;
  const userSettings = useUserSettings();
  const users = useUsers();
  const { t } = useI18n();
  const busy = ref(false);
  const error = ref(false);
  const server = ref("");
  const displayError = ref(false);
  async function oauth() {
    if (busy.value)
      return;
    busy.value = true;
    error.value = false;
    displayError.value = false;
    await nextTick();
    if (!singleInstanceServer && server.value)
      server.value = server.value.split("/")[0];
    try {
      let href;
      if (singleInstanceServer) {
        href = await globalThis.$fetch(`/api/${publicServer.value}/login`, {
          method: "POST",
          body: {
            force_login: users.value.length > 0,
            origin: (void 0).origin,
            lang: userSettings.value.language
          }
        });
        busy.value = false;
      } else {
        href = await globalThis.$fetch(`/api/${server.value || publicServer.value}/login`, {
          method: "POST",
          body: {
            force_login: users.value.some((u) => u.server === server.value),
            origin: (void 0).origin,
            lang: userSettings.value.language
          }
        });
      }
      (void 0).href = href;
    } catch (err) {
      if (singleInstanceServer) {
        console.error(err);
        busy.value = false;
        await openErrorDialog({
          title: t("common.error"),
          messages: [t("error.sign_in_error")],
          close: t("action.close")
        });
      } else {
        displayError.value = true;
        error.value = true;
        await nextTick();
        input?.value?.focus();
        await nextTick();
        setTimeout(() => {
          busy.value = false;
          error.value = false;
        }, 512);
      }
    }
  }
  return { busy, displayError, error, server, singleInstanceServer, oauth };
}

const scopes = [
  "",
  "Actions",
  "Tabs",
  "Navigation",
  "Preferences",
  "Account",
  "Languages",
  "Switch account",
  "Settings",
  "Hashtags",
  "Users"
];
function resolveFunction(i) {
  return typeof i === "function" ? i() : i;
}
const useCommandRegistry = defineStore("command", () => {
  const providers = reactive(/* @__PURE__ */ new Set());
  const commands = computed(() => [...providers].filter((command) => command.visible ? command.visible() : true).map((provider) => ({
    ...provider,
    icon: resolveFunction(provider.icon),
    name: resolveFunction(provider.name),
    description: resolveFunction(provider.description),
    bindings: resolveFunction(provider.bindings)
  })));
  let lastScope = "";
  let lastFuse;
  watch(commands, () => {
    lastFuse = void 0;
  });
  return {
    register: (provider) => {
      providers.add(provider);
    },
    remove: (provider) => {
      providers.delete(provider);
    },
    query: (scope, query) => {
      const cmds = commands.value.filter((cmd) => (cmd.parent ?? "") === scope);
      if (query) {
        const fuse = lastScope === scope && lastFuse ? lastFuse : new proxy(cmds, {
          keys: ["scope", "name", "description"],
          includeScore: true
        });
        lastScope = scope;
        lastFuse = fuse;
        const res = fuse.search(query).map(({ item }) => ({ ...item }));
        const grouped = /* @__PURE__ */ new Map();
        for (const cmd of res) {
          const scope2 = cmd.scope ?? "";
          if (!grouped.has(scope2))
            grouped.set(scope2, []);
          grouped.get(scope2).push({
            index: 0,
            type: "command",
            scope: scope2,
            cmd,
            onActivate: cmd.onActivate,
            onComplete: cmd.onComplete
          });
        }
        let index = 0;
        const indexed = [];
        for (const items of grouped.values()) {
          for (const cmd of items) {
            cmd.index = index++;
            indexed.push(cmd);
          }
        }
        return {
          length: res.length,
          items: indexed,
          grouped
        };
      } else {
        const indexed = cmds.map((cmd, index2) => ({ ...cmd, index: index2 }));
        const grouped = new Map(
          scopes.map((scope2) => [scope2, []])
        );
        for (const cmd of indexed) {
          const scope2 = cmd.scope ?? "";
          grouped.get(scope2).push({
            index: cmd.index,
            type: "command",
            scope: scope2,
            cmd,
            onActivate: cmd.onActivate,
            onComplete: cmd.onComplete
          });
        }
        let index = 0;
        const sorted = [];
        for (const [scope2, items] of grouped) {
          if (items.length === 0) {
            grouped.delete(scope2);
          } else {
            const o = (item) => (item.cmd.order ?? 0) * 100 + item.index;
            items.sort((a, b) => o(a) - o(b));
            for (const cmd of items) {
              cmd.index = index++;
              sorted.push(cmd);
            }
          }
        }
        return {
          length: indexed.length,
          items: sorted,
          grouped
        };
      }
    }
  };
});
function useCommand(cmd) {
  const registry = useCommandRegistry();
  const register = () => registry.register(cmd);
  const cleanup = () => registry.remove(cmd);
  register();
  tryOnScopeDispose(cleanup);
}
function useCommands(cmds) {
  const registry = useCommandRegistry();
  const commands = computed(cmds);
  watch(commands, (n, o = []) => {
    for (const cmd of o)
      registry.remove(cmd);
    for (const cmd of n)
      registry.register(cmd);
  }, { deep: true, immediate: true });
  const cleanup = () => {
    commands.value.forEach((cmd) => registry.remove(cmd));
  };
  tryOnScopeDispose(cleanup);
}
function provideGlobalCommands() {
  const { locale, t } = useI18n();
  const { locales } = useI18n();
  const users = useUsers();
  const masto = useMasto();
  const colorMode = useColorMode();
  const userSettings = useUserSettings();
  const { singleInstanceServer, oauth } = useSignIn();
  useCommand({
    scope: "Preferences",
    name: () => t("command.toggle_dark_mode"),
    icon: () => colorMode.value === "light" ? "i-ri:sun-line" : "i-ri:moon-line",
    onActivate() {
      colorMode.preference = colorMode.value === "light" ? "dark" : "light";
    }
  });
  useCommand({
    scope: "Preferences",
    name: () => t("command.toggle_zen_mode"),
    icon: () => userSettings.value.preferences.zenMode ? "i-ri:layout-right-2-line" : "i-ri:layout-right-line",
    onActivate() {
      togglePreferences("zenMode");
    }
  });
  useCommand({
    scope: "Preferences",
    name: () => t("command.select_lang"),
    icon: "i-ri:earth-line",
    onComplete: () => ({
      id: "language",
      display: "Languages"
    })
  });
  useCommands(() => locales.value.map((l) => ({
    parent: "language",
    scope: "Languages",
    name: l.name,
    icon: "i-ri:earth-line",
    onActivate() {
      locale.value = l.code;
    }
  })));
  useCommand({
    scope: "Account",
    name: () => t("action.sign_in"),
    description: () => t("command.sign_in_desc"),
    icon: "i-ri:user-add-line",
    onActivate() {
      if (singleInstanceServer)
        oauth();
      else
        openSigninDialog();
    }
  });
  useCommand({
    scope: "Account",
    visible: () => users.value.length > 1,
    name: () => t("action.switch_account"),
    description: () => t("command.switch_account_desc"),
    icon: "i-ri:user-shared-line",
    onComplete: () => ({
      id: "account-switch",
      display: "Accounts"
    })
  });
  useCommands(() => users.value.map((user) => ({
    parent: "account-switch",
    scope: "Switch account",
    visible: () => user.account.id !== currentUser.value?.account.id,
    name: () => t("command.switch_account", [getFullHandle(user.account)]),
    icon: "i-ri:user-shared-line",
    onActivate() {
      loginTo(masto, user);
    }
  })));
  useCommand({
    scope: "Account",
    visible: () => currentUser.value,
    name: () => t("user.sign_out_account", [getFullHandle(currentUser.value.account)]),
    icon: "i-ri:logout-box-line",
    onActivate() {
      signOut();
    }
  });
}

const _sfc_main$v = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    setupPageHeader();
    provideGlobalCommands();
    const route = useRoute();
    if (!route.path.startsWith("/settings")) {
      const url = useRequestURL();
      useHead({
        meta: [
          { property: "og:url", content: `${url.origin}${route.path}` }
        ]
      });
    }
    const key = computed(() => `${currentUser.value?.server ?? currentServer.value}:${currentUser.value?.account.id || ""}`);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLoadingIndicator = __nuxt_component_0;
      const _component_NuxtLayout = __nuxt_component_1;
      const _component_NuxtPage = __nuxt_component_4;
      const _component_AriaAnnouncer = _sfc_main$w;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_NuxtLoadingIndicator, { color: "repeating-linear-gradient(to right,var(--c-primary) 0%,var(--c-primary-active) 100%)" }, null, _parent));
      _push(ssrRenderComponent(_component_NuxtLayout, { key: unref(key) }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtPage)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_AriaAnnouncer, null, null, _parent));
      _push(`<svg absolute op0 width="0" height="0"><defs><clipPath id="avatar-mask" clipPathUnits="objectBoundingBox"><path d="M 0,0.5 C 0,0 0,0 0.5,0 S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5"></path></clipPath></defs></svg><!--]-->`);
    };
  }
});

const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};

const __nuxt_component_11 = defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});

const _sfc_main$u = /* @__PURE__ */ defineComponent({
  __name: "AccountAvatar",
  __ssrInlineRender: true,
  props: {
    account: {},
    square: { type: Boolean }
  },
  setup(__props) {
    const loaded = ref(false);
    const error = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<img${ssrRenderAttrs(mergeProps({
        key: _ctx.account.avatar,
        width: "400",
        height: "400",
        "select-none": "",
        src: unref(error) || !unref(loaded) ? "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" : _ctx.account.avatar,
        alt: _ctx.$t("account.avatar_description", [_ctx.account.username]),
        loading: "lazy",
        class: ["account-avatar", (unref(loaded) ? "bg-base" : "bg-gray:10") + (_ctx.square ? " " : " rounded-full")],
        style: { "clip-path": _ctx.square ? `url(#avatar-mask)` : "none" }
      }, _ctx.$attrs, _attrs))}>`);
    };
  }
});

const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountAvatar.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};

const requestedRelationships = /* @__PURE__ */ new Map();
let timeoutHandle;
function useRelationship(account) {
  if (!currentUser.value)
    return ref();
  let relationship = requestedRelationships.get(account.id);
  if (relationship)
    return relationship;
  relationship = ref();
  requestedRelationships.set(account.id, relationship);
  if (timeoutHandle)
    clearTimeout(timeoutHandle);
  timeoutHandle = setTimeout(() => {
    timeoutHandle = void 0;
    fetchRelationships();
  }, 100);
  return relationship;
}
async function fetchRelationships() {
  const requested = Array.from(requestedRelationships.entries()).filter(([, r]) => !r.value);
  const relationships = await useMastoClient().v1.accounts.relationships.fetch({ id: requested.map(([id]) => id) });
  for (const relationship of relationships) {
    const requestedToUpdate = requested.find(([id]) => id === relationship.id);
    if (!requestedToUpdate)
      continue;
    requestedToUpdate[1].value = relationship;
  }
}
async function toggleFollowAccount(relationship, account) {
  const { client } = useMasto();
  const i18n = useNuxtApp().$i18n;
  const unfollow = relationship.following || relationship.requested;
  if (unfollow) {
    const confirmUnfollow = await openConfirmDialog({
      title: i18n.t("confirm.unfollow.title"),
      description: i18n.t("confirm.unfollow.description", [`@${account.acct}`]),
      confirm: i18n.t("confirm.unfollow.confirm"),
      cancel: i18n.t("confirm.unfollow.cancel")
    });
    if (confirmUnfollow.choice !== "confirm")
      return;
  }
  if (unfollow) {
    relationship.following = false;
    relationship.requested = false;
  } else if (account.locked) {
    relationship.requested = true;
  } else {
    relationship.following = true;
  }
  relationship = await client.value.v1.accounts.$select(account.id)[unfollow ? "unfollow" : "follow"]();
}
async function toggleMuteAccount(relationship, account) {
  const { client } = useMasto();
  const i18n = useNuxtApp().$i18n;
  let duration = 0;
  let notifications = true;
  if (!relationship.muting) {
    const confirmMute = await openConfirmDialog({
      title: i18n.t("confirm.mute_account.title"),
      description: i18n.t("confirm.mute_account.description", [account.acct]),
      confirm: i18n.t("confirm.mute_account.confirm"),
      cancel: i18n.t("confirm.mute_account.cancel"),
      extraOptionType: "mute"
    });
    if (confirmMute.choice !== "confirm")
      return;
    duration = confirmMute.extraOptions.mute.duration;
    notifications = confirmMute.extraOptions.mute.notifications;
  }
  relationship.muting = !relationship.muting;
  relationship = relationship.muting ? await client.value.v1.accounts.$select(account.id).mute({
    duration,
    notifications
  }) : await client.value.v1.accounts.$select(account.id).unmute();
}
async function toggleBlockAccount(relationship, account) {
  const { client } = useMasto();
  const i18n = useNuxtApp().$i18n;
  if (!relationship.blocking) {
    const confirmBlock = await openConfirmDialog({
      title: i18n.t("confirm.block_account.title"),
      description: i18n.t("confirm.block_account.description", [account.acct]),
      confirm: i18n.t("confirm.block_account.confirm"),
      cancel: i18n.t("confirm.block_account.cancel")
    });
    if (confirmBlock.choice !== "confirm")
      return;
  }
  relationship.blocking = !relationship.blocking;
  relationship = await client.value.v1.accounts.$select(account.id)[relationship.blocking ? "block" : "unblock"]();
}
async function toggleBlockDomain(relationship, account) {
  const { client } = useMasto();
  const i18n = useNuxtApp().$i18n;
  if (!relationship.domainBlocking) {
    const confirmDomainBlock = await openConfirmDialog({
      title: i18n.t("confirm.block_domain.title"),
      description: i18n.t("confirm.block_domain.description", [getServerName(account)]),
      confirm: i18n.t("confirm.block_domain.confirm"),
      cancel: i18n.t("confirm.block_domain.cancel")
    });
    if (confirmDomainBlock.choice !== "confirm")
      return;
  }
  relationship.domainBlocking = !relationship.domainBlocking;
  await client.value.v1.domainBlocks[relationship.domainBlocking ? "create" : "remove"]({ domain: getServerName(account) });
}

const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "AccountFollowButton",
  __ssrInlineRender: true,
  props: {
    account: {},
    relationship: {},
    context: {},
    command: { type: Boolean }
  },
  setup(__props) {
    const props = createPropsRestProxy(__props, ["account", "command", "context"]);
    const { t } = useI18n();
    const isSelf = useSelfAccount(() => __props.account);
    const enable = computed(() => !isSelf.value && currentUser.value);
    const relationship = computed(() => props.relationship || useRelationship(__props.account).value);
    const isLoading = computed(() => relationship.value === void 0);
    useMasto();
    useCommand({
      scope: "Actions",
      order: -2,
      visible: () => __props.command && enable,
      name: () => `${relationship.value?.following ? t("account.unfollow") : t("account.follow")} ${getShortHandle(__props.account)}`,
      icon: "i-ri:star-line",
      onActivate: () => toggleFollowAccount(relationship.value, __props.account)
    });
    const buttonStyle = computed(() => {
      if (relationship.value?.blocking)
        return "text-inverted bg-red border-red";
      if (relationship.value?.muting)
        return "text-base bg-card border-base";
      if (relationship.value ? relationship.value.following : __props.context === "following")
        return `text-base ${relationship.value?.followedBy ? "border-strong" : "border-base"}`;
      if (isLoading.value)
        return "text-base border-base";
      return "text-inverted bg-primary border-primary";
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(enable)) {
        _push(`<button${ssrRenderAttrs(mergeProps({
          "gap-1": "",
          "items-center": "",
          group: "",
          "border-1": "",
          "rounded-full": "",
          flex: "~ gap2 center",
          "font-500": "",
          "min-w-30": "",
          "h-fit": "",
          px3: "",
          py1: "",
          class: unref(buttonStyle),
          hover: !unref(relationship)?.blocking && !unref(relationship)?.muting && unref(relationship)?.following ? "border-red text-red" : "bg-base border-primary text-primary"
        }, _attrs))}>`);
        if (unref(isLoading)) {
          _push(`<span i-svg-spinners-180-ring-with-bg></span>`);
        } else {
          _push(`<!--[-->`);
          if (unref(relationship)?.blocking) {
            _push(`<!--[--><span elk-group-hover="hidden">${ssrInterpolate(_ctx.$t("account.blocking"))}</span><span hidden elk-group-hover="inline">${ssrInterpolate(_ctx.$t("account.unblock"))}</span><!--]-->`);
          } else {
            _push(`<!---->`);
          }
          if (unref(relationship)?.muting) {
            _push(`<!--[--><span elk-group-hover="hidden">${ssrInterpolate(_ctx.$t("account.muting"))}</span><span hidden elk-group-hover="inline">${ssrInterpolate(_ctx.$t("account.unmute"))}</span><!--]-->`);
          } else if (unref(relationship) ? unref(relationship).following : _ctx.context === "following") {
            _push(`<!--[--><span elk-group-hover="hidden">${ssrInterpolate(unref(relationship)?.followedBy ? _ctx.$t("account.mutuals") : _ctx.$t("account.following"))}</span><span hidden elk-group-hover="inline">${ssrInterpolate(_ctx.$t("account.unfollow"))}</span><!--]-->`);
          } else if (unref(relationship)?.requested) {
            _push(`<!--[--><span elk-group-hover="hidden">${ssrInterpolate(_ctx.$t("account.follow_requested"))}</span><span hidden elk-group-hover="inline">${ssrInterpolate(_ctx.$t("account.withdraw_follow_request"))}</span><!--]-->`);
          } else if (unref(relationship) ? unref(relationship).followedBy : _ctx.context === "followedBy") {
            _push(`<!--[--><span elk-group-hover="hidden">${ssrInterpolate(_ctx.$t("account.follows_you"))}</span><span hidden elk-group-hover="inline">${ssrInterpolate(_ctx.account.locked ? _ctx.$t("account.request_follow") : _ctx.$t("account.follow_back"))}</span><!--]-->`);
          } else {
            _push(`<span>${ssrInterpolate(_ctx.account.locked ? _ctx.$t("account.request_follow") : _ctx.$t("account.follow"))}</span>`);
          }
          _push(`<!--]-->`);
        }
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});

const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountFollowButton.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};

function getDefault() {
  return {
    lastUpdate: 0,
    emojis: []
  };
}
const currentCustomEmojis = computed(getDefault) ;
function transformEmojiData(emojis) {
  const result = [];
  for (const emoji of emojis) {
    if (!emoji.visibleInPicker)
      continue;
    result.push({
      id: emoji.shortcode,
      native: ":emoji.shortcode:",
      name: emoji.shortcode,
      skins: [{ src: emoji.url || emoji.staticUrl }]
    });
  }
  return result;
}
computed(() => currentCustomEmojis.value.emojis.length ? [{
  id: "custom",
  name: `Custom emojis on ${currentServer.value}`,
  emojis: transformEmojiData(currentCustomEmojis.value.emojis)
}] : void 0);
function useEmojisFallback(emojisGetter) {
  return computed(() => {
    const result = [];
    const emojis = emojisGetter();
    if (emojis)
      result.push(...emojis);
    result.push(...currentCustomEmojis.value.emojis);
    return emojisArrayToObject(result);
  });
}

const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "Emoji",
  __ssrInlineRender: true,
  props: {
    as: {},
    alt: {},
    dataEmojiId: {}
  },
  setup(__props) {
    const title = ref();
    if (__props.alt) {
      if (__props.alt.startsWith(":")) {
        title.value = __props.alt.replace(/:/g, "");
      } else {
        import('node-emoji').then(({ find }) => {
          title.value = find(__props.alt)?.key.replace(/_/g, " ");
        });
      }
    }
    if (__props.dataEmojiId)
      title.value = __props.dataEmojiId;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.as), mergeProps(_ctx.$attrs, {
        alt: _ctx.alt,
        "data-emoji-id": _ctx.dataEmojiId,
        title: unref(title)
      }, _attrs), {
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
      }), _parent);
    };
  }
});

const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/emoji/Emoji.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};

const highlighter = ref();
const registeredLang = ref(/* @__PURE__ */ new Map());
let shikiImport;
function useHighlighter(lang) {
  if (!shikiImport) {
    shikiImport = import('shiki').then(async ({ getHighlighter }) => {
      highlighter.value = await getHighlighter({
        themes: [
          "vitesse-dark",
          "vitesse-light"
        ],
        langs: [
          "js",
          "css",
          "html"
        ]
      });
    });
    return { promise: shikiImport };
  }
  if (!highlighter.value)
    return { promise: shikiImport };
  if (!registeredLang.value.get(lang)) {
    const promise = highlighter.value.loadLanguage(lang).then(() => {
      registeredLang.value.set(lang, true);
    }).catch(() => {
      const fallbackLang = "md";
      highlighter.value?.loadLanguage(fallbackLang).then(() => {
        registeredLang.value.set(fallbackLang, true);
      });
    });
    return { promise };
  }
  return { highlighter: highlighter.value };
}
function useShikiTheme() {
  return useColorMode().value === "dark" ? "vitesse-dark" : "vitesse-light";
}
const HTML_ENTITIES = {
  "<": "&lt;",
  ">": "&gt;",
  "&": "&amp;",
  "'": "&apos;",
  '"': "&quot;"
};
function escapeHtml(text) {
  return text.replace(/[<>&'"]/g, (ch) => HTML_ENTITIES[ch]);
}
function highlightCode(code, lang) {
  const { highlighter: highlighter2 } = useHighlighter(lang);
  if (!highlighter2)
    return escapeHtml(code);
  return highlighter2.codeToHtml(code, {
    lang,
    theme: useShikiTheme()
  });
}

const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "ContentCode",
  __ssrInlineRender: true,
  props: {
    code: {},
    lang: {}
  },
  setup(__props) {
    const props = __props;
    const raw = computed(() => decodeURIComponent(props.code).replace(/&#39;/g, "'"));
    const langMap = {
      js: "javascript",
      ts: "typescript",
      vue: "html"
    };
    const highlighted = computed(() => {
      return props.lang ? highlightCode(raw.value, langMap[props.lang] || props.lang) : raw;
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (_ctx.lang) {
        _push(`<pre${ssrRenderAttrs(mergeProps({ class: "code-block" }, _attrs))}>${unref(highlighted)}</pre>`);
      } else {
        _push(`<pre${ssrRenderAttrs(mergeProps({ class: "code-block" }, _attrs))}>${ssrInterpolate(unref(raw))}</pre>`);
      }
    };
  }
});

const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/ContentCode.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};

const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "ContentMentionGroup",
  __ssrInlineRender: true,
  props: {
    replying: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<p${ssrRenderAttrs(mergeProps({
        flex: "~ gap-1 wrap",
        "items-center": "",
        "text-sm": "",
        class: { "zen-none": !_ctx.replying }
      }, _attrs))}><span i-ri-arrow-right-line ml--1 text-secondary-light></span>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</p>`);
    };
  }
});

const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/ContentMentionGroup.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main$p = {};

function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    p4: "",
    flex: "",
    "justify-between": "",
    "gap-4": ""
  }, _attrs))}><div flex="~ col 1 gap-2"><div flex class="skeleton-loading-bg" h-5 w-30 rounded></div><div flex class="skeleton-loading-bg" h-4 w-45 rounded></div></div><div flex items-center><div flex class="skeleton-loading-bg" h-9 w-15 rounded></div></div></div>`);
}
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("components/tag/TagCardSkeleton.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : undefined
};
const __nuxt_component_2 = /*#__PURE__*/_export_sfc(_sfc_main$p, [['ssrRender',_sfc_ssrRender$1]]);

const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "CommonTooltip",
  __ssrInlineRender: true,
  props: {
    content: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VTooltip = resolveComponent("VTooltip");
      if (("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated))) {
        _push(ssrRenderComponent(_component_VTooltip, mergeProps(_ctx.$attrs, { "auto-hide": "" }, _attrs), {
          popper: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div text-3${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "popper", {}, () => {
                _push2(`${ssrInterpolate(_ctx.content)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { "text-3": "" }, [
                  renderSlot(_ctx.$slots, "popper", {}, () => [
                    createTextVNode(toDisplayString$1(_ctx.content), 1)
                  ])
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
      } else {
        _push(`<!---->`);
      }
    };
  }
});

const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/CommonTooltip.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};

const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "TagActionButton",
  __ssrInlineRender: true,
  props: {
    tag: {}
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    useMasto();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonTooltip = _sfc_main$o;
      _push(`<button${ssrRenderAttrs(mergeProps({
        rounded: "",
        group: "",
        "focus:outline-none": "",
        "hover:text-primary": "",
        "focus-visible:text-primary": "",
        "aria-label": _ctx.tag.following ? _ctx.$t("tag.unfollow_label", [_ctx.tag.name]) : _ctx.$t("tag.follow_label", [_ctx.tag.name])
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_CommonTooltip, {
        placement: "bottom",
        content: _ctx.tag.following ? _ctx.$t("tag.unfollow") : _ctx.$t("tag.follow")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div rounded-full p2 elk-group-hover="bg-orange/10" group-focus-visible="bg-orange/10" group-focus-visible:ring="2 current"${_scopeId}><div class="${ssrRenderClass([_ctx.tag.following ? "i-ri:star-fill" : "i-ri:star-line"])}"${_scopeId}></div></div>`);
          } else {
            return [
              createVNode("div", {
                "rounded-full": "",
                p2: "",
                "elk-group-hover": "bg-orange/10",
                "group-focus-visible": "bg-orange/10",
                "group-focus-visible:ring": "2 current"
              }, [
                createVNode("div", {
                  class: [_ctx.tag.following ? "i-ri:star-fill" : "i-ri:star-line"]
                }, null, 2)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button>`);
    };
  }
});

const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tag/TagActionButton.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};

const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "CommonTrending",
  __ssrInlineRender: true,
  props: {
    history: {},
    maxDay: { default: 2 }
  },
  setup(__props) {
    const ongoingHot = computed(() => __props.history.slice(0, __props.maxDay));
    const people = computed(
      () => ongoingHot.value.reduce((total, item) => total + (Number(item.accounts) || 0), 0)
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<p${ssrRenderAttrs(_attrs)}>${ssrInterpolate(_ctx.$t("command.n_people_in_the_past_n_days", [unref(people), _ctx.maxDay]))}</p>`);
    };
  }
});

const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/CommonTrending.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};

function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}

var sparkline_commonjs2 = function(t) {
  var e = {};
  function r(n) {
    if (e[n])
      return e[n].exports;
    var o = e[n] = { i: n, l: false, exports: {} };
    return t[n].call(o.exports, o, o.exports, r), o.l = true, o.exports;
  }
  return r.m = t, r.c = e, r.d = function(t2, e2, n) {
    r.o(t2, e2) || Object.defineProperty(t2, e2, { enumerable: true, get: n });
  }, r.r = function(t2) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
  }, r.t = function(t2, e2) {
    if (1 & e2 && (t2 = r(t2)), 8 & e2)
      return t2;
    if (4 & e2 && "object" == typeof t2 && t2 && t2.__esModule)
      return t2;
    var n = /* @__PURE__ */ Object.create(null);
    if (r.r(n), Object.defineProperty(n, "default", { enumerable: true, value: t2 }), 2 & e2 && "string" != typeof t2)
      for (var o in t2)
        r.d(n, o, function(e3) {
          return t2[e3];
        }.bind(null, o));
    return n;
  }, r.n = function(t2) {
    var e2 = t2 && t2.__esModule ? function() {
      return t2.default;
    } : function() {
      return t2;
    };
    return r.d(e2, "a", e2), e2;
  }, r.o = function(t2, e2) {
    return Object.prototype.hasOwnProperty.call(t2, e2);
  }, r.p = "", r(r.s = 1);
}([function(t, e, r) {
  var n = r(2), o = r(3), i = r(4);
  t.exports = function(t2) {
    return n(t2) || o(t2) || i();
  };
}, function(t, e, r) {
  r.r(e), r.d(e, "sparkline", function() {
    return c;
  });
  var n = r(0), o = r.n(n);
  function i(t2, e2, r2, n2) {
    return parseFloat((e2 - n2 * e2 / t2 + r2).toFixed(2));
  }
  function a(t2) {
    return t2.value;
  }
  function u(t2, e2) {
    var r2 = (void 0).createElementNS("http://www.w3.org/2000/svg", t2);
    for (var n2 in e2)
      r2.setAttribute(n2, e2[n2]);
    return r2;
  }
  function c(t2, e2, r2) {
    var n2;
    if (n2 = t2, o()(n2.querySelectorAll("*")).forEach(function(t3) {
      return n2.removeChild(t3);
    }), !(e2.length <= 1)) {
      r2 = r2 || {}, "number" == typeof e2[0] && (e2 = e2.map(function(t3) {
        return { value: t3 };
      }));
      var c2 = r2.onmousemove, l = r2.onmouseout, s = "interactive" in r2 ? r2.interactive : !!c2, f = r2.spotRadius || 2, p = 2 * f, d = r2.cursorWidth || 2, v = parseFloat(t2.attributes["stroke-width"].value), b = r2.fetch || a, h = e2.map(function(t3) {
        return b(t3);
      }), y = parseFloat(t2.attributes.width.value) - 2 * p, x = parseFloat(t2.attributes.height.value), m = x - 2 * v - p, g = Math.max.apply(Math, o()(h)), A = -1e3, w = h.length - 1, j = y / w, O = [], k = i(g, m, v + f, h[0]), S = "M".concat(p, " ").concat(k);
      h.forEach(function(t3, r3) {
        var n3 = r3 * j + p, o2 = i(g, m, v + f, t3);
        O.push(Object.assign({}, e2[r3], { index: r3, x: n3, y: o2 })), S += " L ".concat(n3, " ").concat(o2);
      });
      var M = u("path", { class: "sparkline--line", d: S, fill: "none" }), C = u("path", { class: "sparkline--fill", d: "".concat(S, " V ").concat(x, " L ").concat(p, " ").concat(x, " Z"), stroke: "none" });
      if (t2.appendChild(C), t2.appendChild(M), s) {
        var E = u("line", { class: "sparkline--cursor", x1: A, x2: A, y1: 0, y2: x, "stroke-width": d }), _ = u("circle", { class: "sparkline--spot", cx: A, cy: A, r: f });
        t2.appendChild(E), t2.appendChild(_);
        var F = u("rect", { width: t2.attributes.width.value, height: t2.attributes.height.value, style: "fill: transparent; stroke: transparent", class: "sparkline--interaction-layer" });
        t2.appendChild(F), F.addEventListener("mouseout", function(t3) {
          E.setAttribute("x1", A), E.setAttribute("x2", A), _.setAttribute("cx", A), l && l(t3);
        }), F.addEventListener("mousemove", function(t3) {
          var e3 = t3.offsetX, r3 = O.find(function(t4) {
            return t4.x >= e3;
          });
          r3 || (r3 = O[w]);
          var n3, o2 = O[O.indexOf(r3) - 1], i2 = (n3 = o2 ? o2.x + (r3.x - o2.x) / 2 <= e3 ? r3 : o2 : r3).x, a2 = n3.y;
          _.setAttribute("cx", i2), _.setAttribute("cy", a2), E.setAttribute("x1", i2), E.setAttribute("x2", i2), c2 && c2(t3, n3);
        });
      }
    }
  }
  e.default = c;
}, function(t, e) {
  t.exports = function(t2) {
    if (Array.isArray(t2)) {
      for (var e2 = 0, r = new Array(t2.length); e2 < t2.length; e2++)
        r[e2] = t2[e2];
      return r;
    }
  };
}, function(t, e) {
  t.exports = function(t2) {
    if (Symbol.iterator in Object(t2) || "[object Arguments]" === Object.prototype.toString.call(t2))
      return Array.from(t2);
  };
}, function(t, e) {
  t.exports = function() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  };
}]);

const sparkline = /*@__PURE__*/getDefaultExportFromCjs(sparkline_commonjs2);

const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "CommonTrendingCharts",
  __ssrInlineRender: true,
  props: {
    history: {},
    width: { default: 60 },
    height: { default: 40 }
  },
  setup(__props) {
    const historyNum = computed(() => {
      if (!__props.history)
        return [1, 1, 1, 1, 1, 1, 1];
      return [...__props.history].reverse().map((item) => Number(item.accounts) || 0);
    });
    const sparklineEl = ref();
    const sparklineFn = typeof sparkline !== "function" ? sparkline.default : sparkline;
    watch([historyNum, sparklineEl], ([historyNum2, sparklineEl2]) => {
      if (!sparklineEl2)
        return;
      sparklineFn(sparklineEl2, historyNum2);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps({
        ref_key: "sparklineEl",
        ref: sparklineEl,
        class: "sparkline",
        width: _ctx.width,
        height: _ctx.height,
        "stroke-width": "3"
      }, _attrs))}></svg>`);
    };
  }
});

const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/CommonTrendingCharts.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};

const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "TagCard",
  __ssrInlineRender: true,
  props: {
    tag: {}
  },
  setup(__props) {
    computed(() => {
      const { hostname, pathname } = new URL(__props.tag.url);
      return `/${hostname}${pathname}`;
    });
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TagActionButton = _sfc_main$n;
      const _component_CommonTrending = _sfc_main$m;
      const _component_CommonTrendingCharts = _sfc_main$l;
      _push(`<div${ssrRenderAttrs(mergeProps({
        block: "",
        p4: "",
        "hover:bg-active": "",
        flex: "",
        "justify-between": "",
        "cursor-pointer": "",
        "flex-gap-2": ""
      }, _attrs))}><div flex flex-gap-2>`);
      _push(ssrRenderComponent(_component_TagActionButton, { tag: _ctx.tag }, null, _parent));
      _push(`<div><h4 flex items-center text-size-base leading-normal font-medium line-clamp-1 break-all ws-pre-wrap><bdi><span>#</span><span hover:underline>${ssrInterpolate(_ctx.tag.name)}</span></bdi></h4>`);
      if (_ctx.tag.history) {
        _push(ssrRenderComponent(_component_CommonTrending, {
          history: _ctx.tag.history,
          "text-sm": "",
          "text-secondary": "",
          "line-clamp-1": "",
          "ws-pre-wrap": "",
          "break-all": ""
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (_ctx.tag.history) {
        _push(`<div flex items-center>`);
        _push(ssrRenderComponent(_component_CommonTrendingCharts, {
          history: _ctx.tag.history
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});

const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tag/TagCard.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};

const _sfc_main$j = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "TagHoverWrapper",
  __ssrInlineRender: true,
  props: {
    tagName: {},
    disabled: { type: Boolean }
  },
  setup(__props) {
    const tag = ref();
    const tagHover = ref();
    const hovered = useElementHover(tagHover);
    watch(hovered, (newHovered) => {
      if (newHovered && __props.tagName) {
        fetchTag(__props.tagName).then((t) => {
          tag.value = t;
        });
      }
    });
    const userSettings = useUserSettings();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VMenu = resolveComponent("VMenu");
      const _component_TagCardSkeleton = __nuxt_component_2;
      const _component_TagCard = _sfc_main$k;
      _push(`<span${ssrRenderAttrs(mergeProps({
        ref_key: "tagHover",
        ref: tagHover
      }, _attrs))}>`);
      if (!_ctx.disabled && !("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideTagHoverCard")) {
        _push(ssrRenderComponent(_component_VMenu, mergeProps({
          placement: "bottom-start",
          delay: { show: 500, hide: 100 }
        }, _ctx.$attrs, { "close-on-content-click": false }), {
          popper: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (!unref(tag)) {
                _push2(ssrRenderComponent(_component_TagCardSkeleton, null, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(_component_TagCard, { tag: unref(tag) }, null, _parent2, _scopeId));
              }
            } else {
              return [
                !unref(tag) ? (openBlock(), createBlock(_component_TagCardSkeleton, { key: 0 })) : (openBlock(), createBlock(_component_TagCard, {
                  key: 1,
                  tag: unref(tag)
                }, null, 8, ["tag"]))
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
      } else {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      }
      _push(`</span>`);
    };
  }
});

const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/TagHoverWrapper.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};

function getTextualAstComponents(astChildren) {
  return astChildren.filter(({ type }) => type === TEXT_NODE).map(({ value }) => value).reduce((accumulator, current) => accumulator + current, "").trim();
}
function contentToVNode(content, options) {
  let tree = parseMastodonHTML(content, options);
  const textContents = getTextualAstComponents(tree.children);
  if (options?.hideEmojis && textContents.length === 0)
    tree = parseMastodonHTML(content, { ...options, hideEmojis: false });
  return h(Fragment, (tree.children || []).map((n) => treeToVNode(n)));
}
function nodeToVNode(node) {
  if (node.type === TEXT_NODE)
    return node.value;
  if (node.name === "mention-group")
    return h(_sfc_main$q, node.attributes, () => node.children.map(treeToVNode));
  if (node.name === "picture" || node.name === "img" && node.attributes?.alt) {
    const props = node.attributes ?? {};
    props.as = node.name;
    return h(
      _sfc_main$s,
      props,
      () => node.children.map(treeToVNode)
    );
  }
  if ("children" in node) {
    if (node.name === "a" && (node.attributes.href?.startsWith("/") || node.attributes.href?.startsWith("."))) {
      node.attributes.to = node.attributes.href;
      const { href: _href, target: _target, ...attrs } = node.attributes;
      return h(
        RouterLink,
        attrs,
        () => node.children.map(treeToVNode)
      );
    }
    return h(
      node.name,
      node.attributes,
      node.children.map(treeToVNode)
    );
  }
  return null;
}
function treeToVNode(input) {
  if (!input)
    return null;
  if (input.type === TEXT_NODE)
    return decode$1(input.value);
  if ("children" in input) {
    const node = handleNode(input);
    if (node == null)
      return null;
    if (isVNode$1(node))
      return node;
    return nodeToVNode(node);
  }
  return null;
}
function addBdiNode(node) {
  if (node.children.length === 1 && node.children[0].type === ELEMENT_NODE && node.children[0].name === "bdi")
    return;
  const children = node.children.splice(0, node.children.length);
  const bdi = {
    name: "bdi",
    parent: node,
    loc: node.loc,
    type: ELEMENT_NODE,
    attributes: {},
    children
  };
  children.forEach((n) => n.parent = bdi);
  node.children.push(bdi);
}
function handleMention(el) {
  if (el.name === "a" && el.attributes.class?.includes("mention")) {
    const href = el.attributes.href;
    if (href) {
      const matchUser = href.match(UserLinkRE);
      if (matchUser) {
        const [, server, username] = matchUser;
        const handle = `${username}@${server.replace(/(.+\.)(.+\..+)/, "$2")}`;
        el.attributes.href = `/${server}/@${username}`;
        addBdiNode(el);
        return h(_sfc_main$e, { handle, class: "inline-block" }, () => nodeToVNode(el));
      }
      const matchTag = href.match(TagLinkRE);
      if (matchTag) {
        const [, , tagName] = matchTag;
        addBdiNode(el);
        el.attributes.href = `/${currentServer.value}/tags/${tagName}`;
        return h(_sfc_main$j, { tagName, class: "inline-block" }, () => nodeToVNode(el));
      }
    }
  }
  return void 0;
}
function handleCodeBlock(el) {
  if (el.name === "pre" && el.children[0]?.name === "code") {
    const codeEl = el.children[0];
    const classes = codeEl.attributes.class;
    const lang = classes?.split(/\s/g).find((i) => i.startsWith("language-"))?.replace("language-", "");
    const code = codeEl.children && codeEl.children.length > 0 ? recursiveTreeToText(codeEl) : "";
    return h(_sfc_main$r, { lang, code: encodeURIComponent(code) });
  }
}
function handleNode(el) {
  return handleCodeBlock(el) || handleMention(el) || el;
}

const _sfc_main$i = /* @__PURE__ */ defineComponent({
  ...{
    name: "ContentRich"
  },
  __name: "ContentRich.setup",
  props: {
    content: {},
    emojis: {},
    hideEmojis: { type: Boolean, default: false },
    markdown: { type: Boolean, default: true }
  },
  setup(__props) {
    const emojisObject = useEmojisFallback(() => __props.emojis);
    
    return () => h(
      "span",
      { class: "content-rich", dir: "auto" },
      contentToVNode(__props.content, {
        emojis: emojisObject.value,
        hideEmojis: __props.hideEmojis,
        markdown: __props.markdown
      })
    )
  }
});

const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/ContentRich.setup.ts");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};

function useHumanReadableNumber() {
  const { n, locale } = useI18n();
  const fn = (num) => {
    return n(
      num,
      num < 1e4 ? "smallCounting" : num < 1e6 ? "kiloCounting" : "millionCounting",
      locale.value
    );
  };
  return {
    formatHumanReadableNumber: (num) => fn(unref(num)),
    formatNumber: (num) => n(unref(num), "smallCounting", locale.value),
    formatPercentage: (num) => n(unref(num), "percentage", locale.value),
    forSR: (num) => unref(num) > 1e4
  };
}
function useFormattedDateTime(value, options = { dateStyle: "long", timeStyle: "medium" }) {
  const { locale } = useI18n();
  const formatter2 = computed(() => Intl.DateTimeFormat(locale.value, options));
  return computed(() => {
    const v = resolveUnref(value);
    return v ? formatter2.value.format(new Date(v)) : "";
  });
}
function useTimeAgoOptions(short = false) {
  const { d, t, n: fnf, locale } = useI18n();
  const prefix = short ? "short_" : "";
  const fn = (n, past, key) => {
    return t(`time_ago_options.${prefix}${key}_${past ? "past" : "future"}`, n, {
      named: {
        v: fnf(n, "smallCounting", locale.value)
      }
    });
  };
  return {
    rounding: "floor",
    showSecond: !short,
    updateInterval: short ? 6e4 : 1e3,
    messages: {
      justNow: t("time_ago_options.just_now"),
      // just return the value
      past: (n) => n,
      // just return the value
      future: (n) => n,
      second: (n, p) => fn(n, p, "second"),
      minute: (n, p) => fn(n, p, "minute"),
      hour: (n, p) => fn(n, p, "hour"),
      day: (n, p) => fn(n, p, "day"),
      week: (n, p) => fn(n, p, "week"),
      month: (n, p) => fn(n, p, "month"),
      year: (n, p) => fn(n, p, "year"),
      invalid: ""
    },
    fullDateFormatter(date) {
      return d(date, short ? "short" : "long");
    }
  };
}

const _sfc_main$h = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "LocalizedNumber",
  __ssrInlineRender: true,
  props: {
    count: {},
    keypath: {}
  },
  setup(__props) {
    const props = __props;
    const { formatHumanReadableNumber, formatNumber, forSR } = useHumanReadableNumber();
    const useSR = computed(() => forSR(props.count));
    const rawNumber = computed(() => formatNumber(props.count));
    const humanReadableNumber = computed(() => formatHumanReadableNumber(props.count));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n_t = resolveComponent("i18n-t");
      const _component_CommonTooltip = _sfc_main$o;
      _push(ssrRenderComponent(_component_i18n_t, mergeProps({
        keypath: _ctx.keypath,
        plural: _ctx.count,
        tag: "span",
        class: "flex gap-x-1"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(useSR)) {
              _push2(ssrRenderComponent(_component_CommonTooltip, {
                content: unref(rawNumber),
                placement: "bottom"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span${ssrRenderAttrs(mergeProps({ "aria-hidden": "true" }, _ctx.$attrs))}${_scopeId2}>${ssrInterpolate(unref(humanReadableNumber))}</span><span sr-only${_scopeId2}>${ssrInterpolate(unref(rawNumber))}</span>`);
                  } else {
                    return [
                      createVNode("span", mergeProps({ "aria-hidden": "true" }, _ctx.$attrs), toDisplayString$1(unref(humanReadableNumber)), 17),
                      createVNode("span", { "sr-only": "" }, toDisplayString$1(unref(rawNumber)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<span${ssrRenderAttrs(_ctx.$attrs)}${_scopeId}>${ssrInterpolate(unref(humanReadableNumber))}</span>`);
            }
          } else {
            return [
              unref(useSR) ? (openBlock(), createBlock(_component_CommonTooltip, {
                key: 0,
                content: unref(rawNumber),
                placement: "bottom"
              }, {
                default: withCtx(() => [
                  createVNode("span", mergeProps({ "aria-hidden": "true" }, _ctx.$attrs), toDisplayString$1(unref(humanReadableNumber)), 17),
                  createVNode("span", { "sr-only": "" }, toDisplayString$1(unref(rawNumber)), 1)
                ]),
                _: 1
              }, 8, ["content"])) : (openBlock(), createBlock("span", mergeProps({ key: 1 }, _ctx.$attrs), toDisplayString$1(unref(humanReadableNumber)), 17))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/LocalizedNumber.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};

const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "AccountPostsFollowers",
  __ssrInlineRender: true,
  props: {
    account: {},
    isHoverCard: { type: Boolean }
  },
  setup(__props) {
    const userSettings = useUserSettings();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_CommonLocalizedNumber = _sfc_main$h;
      _push(`<div${ssrRenderAttrs(mergeProps({
        flex: "",
        "gap-5": ""
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(_ctx.account),
        replace: "",
        "text-secondary": "",
        "exact-active-class": "text-primary"
      }, {
        default: withCtx(({ isExactActive }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CommonLocalizedNumber, {
              keypath: "account.posts_count",
              count: _ctx.account.statusesCount,
              "font-bold": "",
              class: isExactActive ? "text-primary" : "text-base"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_CommonLocalizedNumber, {
                keypath: "account.posts_count",
                count: _ctx.account.statusesCount,
                "font-bold": "",
                class: isExactActive ? "text-primary" : "text-base"
              }, null, 8, ["count", "class"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (!(_ctx.isHoverCard && ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideFollowerCount"))) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: ("getAccountFollowingRoute" in _ctx ? _ctx.getAccountFollowingRoute : unref(getAccountFollowingRoute))(_ctx.account),
          replace: "",
          "text-secondary": "",
          "exact-active-class": "text-primary"
        }, {
          default: withCtx(({ isExactActive }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (!("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideFollowerCount")) {
                _push2(`<!--[-->`);
                if (_ctx.account.followingCount >= 0) {
                  _push2(ssrRenderComponent(_component_CommonLocalizedNumber, {
                    keypath: "account.following_count",
                    count: _ctx.account.followingCount,
                    "font-bold": "",
                    class: isExactActive ? "text-primary" : "text-base"
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<div flex gap-x-1${_scopeId}><span font-bold text-base${_scopeId}>Hidden</span><span${_scopeId}>${ssrInterpolate(_ctx.$t("account.following"))}</span></div>`);
                }
                _push2(`<!--]-->`);
              } else {
                _push2(`<span${_scopeId}>${ssrInterpolate(_ctx.$t("account.following"))}</span>`);
              }
            } else {
              return [
                !("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideFollowerCount") ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  _ctx.account.followingCount >= 0 ? (openBlock(), createBlock(_component_CommonLocalizedNumber, {
                    key: 0,
                    keypath: "account.following_count",
                    count: _ctx.account.followingCount,
                    "font-bold": "",
                    class: isExactActive ? "text-primary" : "text-base"
                  }, null, 8, ["count", "class"])) : (openBlock(), createBlock("div", {
                    key: 1,
                    flex: "",
                    "gap-x-1": ""
                  }, [
                    createVNode("span", {
                      "font-bold": "",
                      "text-base": ""
                    }, "Hidden"),
                    createVNode("span", null, toDisplayString$1(_ctx.$t("account.following")), 1)
                  ]))
                ], 64)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString$1(_ctx.$t("account.following")), 1))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!(_ctx.isHoverCard && ("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideFollowerCount"))) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: ("getAccountFollowersRoute" in _ctx ? _ctx.getAccountFollowersRoute : unref(getAccountFollowersRoute))(_ctx.account),
          replace: "",
          "text-secondary": "",
          "exact-active-class": "text-primary"
        }, {
          default: withCtx(({ isExactActive }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (!("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideFollowerCount")) {
                _push2(`<!--[-->`);
                if (_ctx.account.followersCount >= 0) {
                  _push2(ssrRenderComponent(_component_CommonLocalizedNumber, {
                    keypath: "account.followers_count",
                    count: _ctx.account.followersCount,
                    "font-bold": "",
                    class: isExactActive ? "text-primary" : "text-base"
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<div flex gap-x-1${_scopeId}><span font-bold text-base${_scopeId}>Hidden</span><span${_scopeId}>${ssrInterpolate(_ctx.$t("account.followers"))}</span></div>`);
                }
                _push2(`<!--]-->`);
              } else {
                _push2(`<span${_scopeId}>${ssrInterpolate(_ctx.$t("account.followers"))}</span>`);
              }
            } else {
              return [
                !("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideFollowerCount") ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  _ctx.account.followersCount >= 0 ? (openBlock(), createBlock(_component_CommonLocalizedNumber, {
                    key: 0,
                    keypath: "account.followers_count",
                    count: _ctx.account.followersCount,
                    "font-bold": "",
                    class: isExactActive ? "text-primary" : "text-base"
                  }, null, 8, ["count", "class"])) : (openBlock(), createBlock("div", {
                    key: 1,
                    flex: "",
                    "gap-x-1": ""
                  }, [
                    createVNode("span", {
                      "font-bold": "",
                      "text-base": ""
                    }, "Hidden"),
                    createVNode("span", null, toDisplayString$1(_ctx.$t("account.followers")), 1)
                  ]))
                ], 64)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString$1(_ctx.$t("account.followers")), 1))
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

const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountPostsFollowers.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};

const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "AccountHoverCard",
  __ssrInlineRender: true,
  props: {
    account: {}
  },
  setup(__props) {
    const relationship = useRelationship(__props.account);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AccountInfo = _sfc_main$7;
      const _component_AccountFollowButton = _sfc_main$t;
      const _component_ContentRich = _sfc_main$i;
      const _component_AccountPostsFollowers = _sfc_main$g;
      _push(`<div${ssrRenderAttrs(mergeProps({
        style: unref(relationship) ? null : { display: "none" },
        flex: "~ col gap2",
        rounded: "",
        "min-w-90": "",
        "max-w-120": "",
        "z-100": "",
        "overflow-hidden": "",
        "p-4": ""
      }, _attrs))}><div flex="~ gap2" items-center>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: ("getAccountRoute" in _ctx ? _ctx.getAccountRoute : unref(getAccountRoute))(_ctx.account),
        "flex-auto": "",
        "rounded-full": "",
        "hover:bg-active": "",
        "transition-100": "",
        pe5: "",
        "me-a": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_AccountInfo, { account: _ctx.account }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_AccountInfo, { account: _ctx.account }, null, 8, ["account"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_AccountFollowButton, {
        "text-sm": "",
        account: _ctx.account,
        relationship: unref(relationship)
      }, null, _parent));
      _push(`</div>`);
      if (_ctx.account.note) {
        _push(`<div max-h-100 overflow-y-auto>`);
        _push(ssrRenderComponent(_component_ContentRich, {
          "text-4": "",
          "text-secondary": "",
          content: _ctx.account.note,
          emojis: _ctx.account.emojis
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_AccountPostsFollowers, {
        "text-sm": "",
        account: _ctx.account,
        "is-hover-card": true
      }, null, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountHoverCard.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};

const _sfc_main$e = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "AccountHoverWrapper",
  __ssrInlineRender: true,
  props: {
    account: {},
    handle: {},
    disabled: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const accountHover = ref();
    const hovered = useElementHover(accountHover);
    const account = ref(props.account);
    watch(
      () => [props.account, props.handle, hovered.value],
      ([newAccount, newHandle, newVisible], oldProps) => {
        if (!newVisible || false)
          return;
        if (newAccount) {
          account.value = newAccount;
          return;
        }
        if (newHandle) {
          const [_oldAccount, oldHandle, _oldVisible] = oldProps ?? [void 0, void 0, false];
          if (!oldHandle || newHandle !== oldHandle || !account.value) {
            fetchAccountByHandle(newHandle).then((acc) => {
              if (newHandle === props.handle)
                account.value = acc;
            });
          }
          return;
        }
        account.value = void 0;
      },
      { immediate: true, flush: "post" }
    );
    const userSettings = useUserSettings();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VMenu = resolveComponent("VMenu");
      const _component_AccountHoverCard = _sfc_main$f;
      _push(`<span${ssrRenderAttrs(mergeProps({
        ref_key: "accountHover",
        ref: accountHover
      }, _attrs))}>`);
      if (!_ctx.disabled && unref(account) && !("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "hideAccountHoverCard")) {
        _push(ssrRenderComponent(_component_VMenu, mergeProps({
          placement: "bottom-start",
          delay: { show: 500, hide: 100 }
        }, _ctx.$attrs, { "close-on-content-click": false }), {
          popper: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(account)) {
                _push2(ssrRenderComponent(_component_AccountHoverCard, { account: unref(account) }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                unref(account) ? (openBlock(), createBlock(_component_AccountHoverCard, {
                  key: 0,
                  account: unref(account)
                }, null, 8, ["account"])) : createCommentVNode("", true)
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
      } else {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      }
      _push(`</span>`);
    };
  }
});

const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountHoverWrapper.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};

const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "AccountBigAvatar",
  __ssrInlineRender: true,
  props: {
    account: {},
    square: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AccountAvatar = _sfc_main$u;
      _push(`<div${ssrRenderAttrs(mergeProps({
        key: _ctx.account.avatar
      }, _ctx.$attrs, {
        style: { "clip-path": _ctx.square ? `url(#avatar-mask)` : "none" },
        class: { "rounded-full": !_ctx.square },
        "bg-base": "",
        "w-54px": "",
        "h-54px": "",
        flex: "",
        "items-center": "",
        "justify-center": ""
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_AccountAvatar, {
        account: _ctx.account,
        "w-48px": "",
        "h-48px": "",
        square: _ctx.square
      }, null, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountBigAvatar.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};

const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "AccountDisplayName",
  __ssrInlineRender: true,
  props: {
    account: {},
    hideEmojis: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentRich = _sfc_main$i;
      _push(ssrRenderComponent(_component_ContentRich, mergeProps({
        content: ("getDisplayName" in _ctx ? _ctx.getDisplayName : unref(getDisplayName))(_ctx.account, { rich: true }),
        emojis: _ctx.account.emojis,
        "hide-emojis": _ctx.hideEmojis,
        markdown: false
      }, _attrs), null, _parent));
    };
  }
});

const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountDisplayName.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};

const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "AccountRolesIndicator",
  __ssrInlineRender: true,
  props: {
    account: {},
    limit: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div flex="~ gap1" items-center class="border border-base rounded-md px-1" text-secondary-light>`);
      ssrRenderSlot(_ctx.$slots, "prepend", {}, null, _push, _parent);
      _push(`<!--[-->`);
      ssrRenderList(_ctx.account.roles?.slice(0, _ctx.limit), (role) => {
        _push(`<div flex><div style="${ssrRenderStyle(`color: ${role.color}; border-color: ${role.color}`)}">${ssrInterpolate(role.name)}</div></div>`);
      });
      _push(`<!--]--></div>`);
      if (_ctx.limit && _ctx.account.roles?.length > _ctx.limit) {
        _push(`<div flex="~ gap1" items-center class="border border-base rounded-md px-1" text-secondary-light> +${ssrInterpolate(_ctx.account.roles?.length - _ctx.limit)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});

const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountRolesIndicator.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};

const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "AccountLockIndicator",
  __ssrInlineRender: true,
  props: {
    showLabel: { type: Boolean }
  },
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonTooltip = _sfc_main$o;
      _push(`<div${ssrRenderAttrs(mergeProps({
        flex: "~ gap1",
        "items-center": "",
        class: { "border border-base rounded-md px-1": _ctx.showLabel },
        "text-secondary-light": ""
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "prepend", {}, null, _push, _parent);
      _push(ssrRenderComponent(_component_CommonTooltip, {
        "no-auto-focus": "",
        content: "Lock",
        disabled: _ctx.showLabel
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div i-ri:lock-line${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { "i-ri:lock-line": "" })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (_ctx.showLabel) {
        _push(`<div>${ssrInterpolate(unref(t)("account.lock"))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});

const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountLockIndicator.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};

const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "AccountBotIndicator",
  __ssrInlineRender: true,
  props: {
    showLabel: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonTooltip = _sfc_main$o;
      _push(`<div${ssrRenderAttrs(mergeProps({
        flex: "~ gap1",
        "items-center": "",
        class: { "border border-base rounded-md px-1": _ctx.showLabel },
        "text-secondary-light": ""
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "prepend", {}, null, _push, _parent);
      _push(ssrRenderComponent(_component_CommonTooltip, {
        "no-auto-focus": "",
        content: _ctx.$t("account.bot"),
        disabled: _ctx.showLabel
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div i-mdi:robot-outline${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { "i-mdi:robot-outline": "" })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (_ctx.showLabel) {
        _push(`<div>${ssrInterpolate(_ctx.$t("account.bot"))}</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountBotIndicator.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};

const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "AccountHandle",
  __ssrInlineRender: true,
  props: {
    account: {}
  },
  setup(__props) {
    const serverName = computed(() => getServerName(__props.account));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<p${ssrRenderAttrs(mergeProps({
        "line-clamp-1": "",
        "whitespace-pre-wrap": "",
        "break-all": "",
        "text-secondary-light": "",
        "leading-tight": "",
        dir: "ltr"
      }, _attrs))}><span text-secondary>${ssrInterpolate(("getShortHandle" in _ctx ? _ctx.getShortHandle : unref(getShortHandle))(_ctx.account))}</span>`);
      if (unref(serverName)) {
        _push(`<span text-secondary-light>@${ssrInterpolate(unref(serverName))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</p>`);
    };
  }
});

const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountHandle.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};

const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "AccountInfo",
  __ssrInlineRender: true,
  props: {
    account: {},
    as: { default: "div" },
    hoverCard: { type: Boolean },
    square: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AccountHoverWrapper = _sfc_main$e;
      const _component_AccountBigAvatar = _sfc_main$d;
      const _component_AccountDisplayName = _sfc_main$c;
      const _component_AccountRolesIndicator = _sfc_main$b;
      const _component_AccountLockIndicator = _sfc_main$a;
      const _component_AccountBotIndicator = _sfc_main$9;
      const _component_AccountHandle = _sfc_main$8;
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.as), mergeProps({
        flex: "",
        "gap-3": ""
      }, _ctx.$attrs, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_AccountHoverWrapper, {
              disabled: !_ctx.hoverCard,
              account: _ctx.account
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_AccountBigAvatar, {
                    account: _ctx.account,
                    "shrink-0": "",
                    square: _ctx.square
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_AccountBigAvatar, {
                      account: _ctx.account,
                      "shrink-0": "",
                      square: _ctx.square
                    }, null, 8, ["account", "square"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div flex="~ col" shrink pt-1 h-full overflow-hidden justify-center leading-none select-none${_scopeId}><div flex="~" gap-2${_scopeId}>`);
            _push2(ssrRenderComponent(_component_AccountDisplayName, {
              account: _ctx.account,
              "font-bold": "",
              "line-clamp-1": "",
              "ws-pre-wrap": "",
              "break-all": "",
              "text-lg": ""
            }, null, _parent2, _scopeId));
            if (_ctx.account.roles?.length) {
              _push2(ssrRenderComponent(_component_AccountRolesIndicator, {
                account: _ctx.account,
                limit: 1
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.account.locked) {
              _push2(ssrRenderComponent(_component_AccountLockIndicator, { "text-xs": "" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.account.bot) {
              _push2(ssrRenderComponent(_component_AccountBotIndicator, { "text-xs": "" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_AccountHandle, {
              account: _ctx.account,
              "text-secondary-light": ""
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(_component_AccountHoverWrapper, {
                disabled: !_ctx.hoverCard,
                account: _ctx.account
              }, {
                default: withCtx(() => [
                  createVNode(_component_AccountBigAvatar, {
                    account: _ctx.account,
                    "shrink-0": "",
                    square: _ctx.square
                  }, null, 8, ["account", "square"])
                ]),
                _: 1
              }, 8, ["disabled", "account"]),
              createVNode("div", {
                flex: "~ col",
                shrink: "",
                "pt-1": "",
                "h-full": "",
                "overflow-hidden": "",
                "justify-center": "",
                "leading-none": "",
                "select-none": ""
              }, [
                createVNode("div", {
                  flex: "~",
                  "gap-2": ""
                }, [
                  createVNode(_component_AccountDisplayName, {
                    account: _ctx.account,
                    "font-bold": "",
                    "line-clamp-1": "",
                    "ws-pre-wrap": "",
                    "break-all": "",
                    "text-lg": ""
                  }, null, 8, ["account"]),
                  _ctx.account.roles?.length ? (openBlock(), createBlock(_component_AccountRolesIndicator, {
                    key: 0,
                    account: _ctx.account,
                    limit: 1
                  }, null, 8, ["account"])) : createCommentVNode("", true),
                  _ctx.account.locked ? (openBlock(), createBlock(_component_AccountLockIndicator, {
                    key: 1,
                    "text-xs": ""
                  })) : createCommentVNode("", true),
                  _ctx.account.bot ? (openBlock(), createBlock(_component_AccountBotIndicator, {
                    key: 2,
                    "text-xs": ""
                  })) : createCommentVNode("", true)
                ]),
                createVNode(_component_AccountHandle, {
                  account: _ctx.account,
                  "text-secondary-light": ""
                }, null, 8, ["account"])
              ])
            ];
          }
        }),
        _: 1
      }), _parent);
    };
  }
});

const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AccountInfo.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};

const InjectionKeyDropdownContext = Symbol("dropdown-context");

function useDropdownContext() {
  return inject(InjectionKeyDropdownContext, void 0);
}

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "DropdownItem",
  __ssrInlineRender: true,
  props: {
    is: { default: "div" },
    text: {},
    description: {},
    icon: {},
    checked: { type: Boolean },
    command: { type: Boolean }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { hide } = useDropdownContext() || {};
    const el = ref();
    function handleClick(evt) {
      hide?.();
      emit("click", evt);
    }
    useCommand({
      scope: "Actions",
      order: -1,
      visible: () => props.command && props.text,
      name: () => props.text,
      icon: () => props.icon ?? "i-ri:question-line",
      description: () => props.description,
      onActivate() {
        const clickEvent = new MouseEvent("click", {
          view: void 0,
          bubbles: true,
          cancelable: true
        });
        el.value?.dispatchEvent(clickEvent);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.is), mergeProps(_ctx.$attrs, {
        ref_key: "el",
        ref: el,
        "w-full": "",
        flex: "",
        "gap-3": "",
        "items-center": "",
        "cursor-pointer": "",
        px4: "",
        py3: "",
        "select-none": "",
        "hover-bg-active": "",
        "aria-label": _ctx.text,
        onClick: handleClick
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.icon) {
              _push2(`<div class="${ssrRenderClass(_ctx.icon)}"${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div flex="~ col"${_scopeId}><div text-15px${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(`${ssrInterpolate(_ctx.text)}`);
            }, _push2, _parent2, _scopeId);
            _push2(`</div><div text-3 text-secondary${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "description", {}, () => {
              if (_ctx.description) {
                _push2(`<p${_scopeId}>${ssrInterpolate(_ctx.description)}</p>`);
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            _push2(`</div></div><div flex-auto${_scopeId}></div>`);
            if (_ctx.checked) {
              _push2(`<div i-ri:check-line${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              _ctx.icon ? (openBlock(), createBlock("div", {
                key: 0,
                class: _ctx.icon
              }, null, 2)) : createCommentVNode("", true),
              createVNode("div", { flex: "~ col" }, [
                createVNode("div", { "text-15px": "" }, [
                  renderSlot(_ctx.$slots, "default", {}, () => [
                    createTextVNode(toDisplayString$1(_ctx.text), 1)
                  ])
                ]),
                createVNode("div", {
                  "text-3": "",
                  "text-secondary": ""
                }, [
                  renderSlot(_ctx.$slots, "description", {}, () => [
                    _ctx.description ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString$1(_ctx.description), 1)) : createCommentVNode("", true)
                  ])
                ])
              ]),
              createVNode("div", { "flex-auto": "" }),
              _ctx.checked ? (openBlock(), createBlock("div", {
                key: 1,
                "i-ri:check-line": ""
              })) : createCommentVNode("", true),
              renderSlot(_ctx.$slots, "actions")
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
});

const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/dropdown/DropdownItem.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "UserSwitcher",
  __ssrInlineRender: true,
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const all = useUsers();
    const { singleInstanceServer, oauth } = useSignIn();
    const sorted = computed(() => {
      return [
        currentUser.value,
        ...all.value.filter((account) => account.token !== currentUser.value?.token)
      ].filter(Boolean);
    });
    useRouter();
    function processSignIn() {
      if (singleInstanceServer)
        oauth();
      else
        openSigninDialog();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AccountInfo = _sfc_main$7;
      const _component_CommonDropdownItem = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(mergeProps({
        "sm:min-w-80": "",
        "max-w-100vw": "",
        mxa: "",
        py2: "",
        flex: "~ col"
      }, _attrs))}><!--[-->`);
      ssrRenderList(unref(sorted), (user) => {
        _push(`<button flex rounded px4 py3 text-left hover:bg-active cursor-pointer transition-100 aria-label="Switch user">`);
        _push(ssrRenderComponent(_component_AccountInfo, {
          account: user.account,
          "hover-card": false,
          square: ""
        }, null, _parent));
        _push(`<div flex-auto></div>`);
        if (user.token === ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser))?.token) {
          _push(`<div i-ri:check-line text-primary mya text-2xl></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--><div border="t base" pt2>`);
      _push(ssrRenderComponent(_component_CommonDropdownItem, {
        is: "button",
        text: _ctx.$t("user.add_existing"),
        icon: "i-ri:user-add-line",
        "w-full": "",
        onClick: processSignIn
      }, null, _parent));
      if (("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) && ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser))) {
        _push(ssrRenderComponent(_component_CommonDropdownItem, {
          is: "button",
          text: _ctx.$t("user.sign_out_account", [("getFullHandle" in _ctx ? _ctx.getFullHandle : unref(getFullHandle))(("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)).account)]),
          icon: "i-ri:logout-box-line rtl-flip",
          "w-full": "",
          onClick: ("signOut" in _ctx ? _ctx.signOut : unref(signOut))
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});

const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/user/UserSwitcher.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};

const _sfc_main$4 = {
  __name: 'NavUser',
  __ssrInlineRender: true,
  setup(__props) {

const { busy, oauth, singleInstanceServer } = useSignIn();

return (_ctx, _push, _parent, _attrs) => {
  const _component_VDropdown = resolveComponent("VDropdown");
  const _component_AccountAvatar = _sfc_main$u;
  const _component_UserSwitcher = _sfc_main$5;
  const _component_i18n_t = resolveComponent("i18n-t");

  if (("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) && ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser))) {
    _push(ssrRenderComponent(_component_VDropdown, mergeProps({ "sm:hidden": "" }, _attrs), {
      popper: withCtx(({ hide }, _push, _parent, _scopeId) => {
        if (_push) {
          _push(ssrRenderComponent(_component_UserSwitcher, {
            onClick: $event => (hide())
          }, null, _parent, _scopeId));
        } else {
          return [
            createVNode(_component_UserSwitcher, {
              onClick: $event => (hide())
            }, null, 8, ["onClick"])
          ]
        }
      }),
      default: withCtx((_, _push, _parent, _scopeId) => {
        if (_push) {
          _push(`<div style="${
            ssrRenderStyle({"-webkit-touch-callout":"none"})
          }"${
            _scopeId
          }>`);
          _push(ssrRenderComponent(_component_AccountAvatar, {
            account: ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)).account,
            "h-8": "",
            "w-8": "",
            draggable: false,
            square: ""
          }, null, _parent, _scopeId));
          _push(`</div>`);
        } else {
          return [
            createVNode("div", { style: {"-webkit-touch-callout":"none"} }, [
              createVNode(_component_AccountAvatar, {
                account: ("currentUser" in _ctx ? _ctx.currentUser : unref(currentUser)).account,
                "h-8": "",
                "w-8": "",
                draggable: false,
                square: ""
              }, null, 8, ["account"])
            ])
          ]
        }
      }),
      _: 1
    }, _parent));
  } else {
    _push(`<!--[-->`);
    if (unref(singleInstanceServer)) {
      _push(`<button flex="~ row" gap-x-1 items-center justify-center btn-solid text-sm px-2 py-1 xl:hidden${(ssrIncludeBooleanAttr(unref(busy))) ? " disabled" : ""}>`);
      if (unref(busy)) {
        _push(`<span aria-hidden="true" block animate animate-spin preserve-3d class="rtl-flip"><span block i-ri:loader-2-fill aria-hidden="true"></span></span>`);
      } else {
        _push(`<span aria-hidden="true" block i-ri:login-circle-line class="rtl-flip"></span>`);
      }
      _push(ssrRenderComponent(_component_i18n_t, { keypath: "action.sign_in_to" }, {
        default: withCtx((_, _push, _parent, _scopeId) => {
          if (_push) {
            _push(`<strong${
              _scopeId
            }>${
              ssrInterpolate(("currentServer" in _ctx ? _ctx.currentServer : unref(currentServer)))
            }</strong>`);
          } else {
            return [
              createVNode("strong", null, toDisplayString$1(("currentServer" in _ctx ? _ctx.currentServer : unref(currentServer))), 1)
            ]
          }
        }),
        _: 1
      }, _parent));
      _push(`</button>`);
    } else {
      _push(`<button flex="~ row" gap-x-1 items-center justify-center btn-solid text-sm px-2 py-1 xl:hidden><span aria-hidden="true" block i-ri:login-circle-line class="rtl-flip"></span> ${ssrInterpolate(_ctx.$t('action.sign_in'))}</button>`);
    }
    _push(`<!--]-->`);
  }
}
}

};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("components/nav/NavUser.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : undefined
};

const _sfc_main$3 = {};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    "bg-base": "",
    "h-8": "",
    "w-8": "",
    "rounded-full": ""
  }, _attrs))}></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("components/nav/NavUserSkeleton.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : undefined
};
const __nuxt_component_3 = /*#__PURE__*/_export_sfc(_sfc_main$3, [['ssrRender',_sfc_ssrRender]]);

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MainContent",
  __ssrInlineRender: true,
  props: {
    backOnSmallScreen: { type: Boolean },
    back: { type: Boolean },
    noOverflowHidden: { type: Boolean }
  },
  setup(__props) {
    const container = ref();
    const route = useRoute();
    const userSettings = useUserSettings();
    const { height: windowHeight } = useWindowSize();
    const { height: containerHeight } = useElementBounding(container);
    const wideLayout = computed(() => route.meta.wideLayout ?? false);
    const sticky = computed(() => route.path?.startsWith("/settings/"));
    const containerClass = computed(() => {
      if (!isHydrated.value || !sticky.value || windowHeight.value < containerHeight.value)
        return null;
      return "lg:sticky lg:top-0";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_PwaBadge = __nuxt_component_11;
      const _component_NavUser = _sfc_main$4;
      const _component_NavUserSkeleton = __nuxt_component_3;
      const _component_PwaInstallPrompt = __nuxt_component_11;
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "container",
        ref: container,
        class: unref(containerClass)
      }, _attrs))}><div sticky top-0 z10 pt="[env(safe-area-inset-top,0)]" bg="[rgba(var(--rgb-bg-base),0.7)]" class="${ssrRenderClass([{
        "backdrop-blur": !("getPreferences" in _ctx ? _ctx.getPreferences : unref(getPreferences))(unref(userSettings), "optimizeForLowPerformanceDevice")
      }, "native:lg:w-[calc(100vw-5rem)] native:xl:w-[calc(135%+(100vw-1200px)/2)]"])}"><div flex justify-between px5 py2 class="${ssrRenderClass([{ "xl:hidden": _ctx.$route.name !== "tag" }, "native:xl:flex"])}" border="b base"><div flex gap-3 items-center${ssrRenderAttr("overflow-hidden", !_ctx.noOverflowHidden ? "" : false)} py2 w-full>`);
      if (_ctx.backOnSmallScreen || _ctx.back) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          flex: "~ gap1",
          "items-center": "",
          "btn-text": "",
          "p-0": "",
          "xl:hidden": "",
          "aria-label": _ctx.$t("nav.back"),
          onClick: ($event) => _ctx.$router.go(-1)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div i-ri:arrow-left-line class="rtl-flip"${_scopeId}></div>`);
            } else {
              return [
                createVNode("div", {
                  "i-ri:arrow-left-line": "",
                  class: "rtl-flip"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div${ssrRenderAttr("truncate", !_ctx.noOverflowHidden ? "" : false)} flex w-full data-tauri-drag-region class="native-mac:justify-start native-mac:text-center">`);
      ssrRenderSlot(_ctx.$slots, "title", {}, null, _push, _parent);
      _push(`</div><div sm:hidden h-7 w-1px></div></div><div flex items-center flex-shrink-0 gap-x-2>`);
      ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push, _parent);
      _push(ssrRenderComponent(_component_PwaBadge, { "xl:hidden": "" }, null, _parent));
      if (("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated))) {
        _push(ssrRenderComponent(_component_NavUser, null, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_NavUserSkeleton, null, null, _parent));
      }
      _push(`</div></div>`);
      ssrRenderSlot(_ctx.$slots, "header", {}, () => {
        _push(`<div hidden></div>`);
      }, _push, _parent);
      _push(`</div>`);
      _push(ssrRenderComponent(_component_PwaInstallPrompt, { "xl:hidden": "" }, null, _parent));
      _push(`<div class="${ssrRenderClass(("isHydrated" in _ctx ? _ctx.isHydrated : unref(isHydrated)) && unref(wideLayout) ? "xl:w-full sm:max-w-600px" : "sm:max-w-600px md:shrink-0")}" m-auto><div hidden class="${ssrRenderClass({ "xl:block": _ctx.$route.name !== "tag" && !_ctx.$slots.header })}" h-6></div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/main/MainContent.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const defaultMessage = "Something went wrong";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "error",
  __ssrInlineRender: true,
  props: {
    error: {}
  },
  setup(__props) {
    const errorCodes = {
      404: "Page not found"
    };
    const message = __props.error.message ?? errorCodes[__props.error.statusCode] ?? defaultMessage;
    const state = ref("error");
    async function reload() {
      state.value = "reloading";
      try {
        clearError({ redirect: currentUser.value ? "/home" : `/${currentServer.value}/public/local` });
      } catch (err) {
        console.error(err);
        state.value = "error";
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLoadingIndicator = __nuxt_component_0;
      const _component_NuxtLayout = __nuxt_component_1;
      const _component_MainContent = _sfc_main$2;
      const _component_AriaAnnouncer = _sfc_main$w;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_NuxtLoadingIndicator, { color: "repeating-linear-gradient(to right,var(--c-primary) 0%,var(--c-primary-active) 100%)" }, null, _parent));
      _push(ssrRenderComponent(_component_NuxtLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_MainContent, null, {
              title: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span timeline-title-style${_scopeId2}>Error</span>`);
                } else {
                  return [
                    createVNode("span", { "timeline-title-style": "" }, "Error")
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, () => {
                    _push3(`<form p5 grid gap-y-4${_scopeId2}><div text-lg${_scopeId2}> Something went wrong </div><div text-secondary${_scopeId2}>${ssrInterpolate(unref(message))}</div><button flex items-center gap-2 justify-center btn-solid text-center${ssrIncludeBooleanAttr(unref(state) === "reloading") ? " disabled" : ""}${_scopeId2}>`);
                    if (unref(state) === "reloading") {
                      _push3(`<span block animate-spin preserve-3d${_scopeId2}><span block i-ri:loader-2-fill${_scopeId2}></span></span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(` ${ssrInterpolate(unref(state) === "reloading" ? "Reloading" : "Reload")}</button></form>`);
                  }, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default", {}, () => [
                      createVNode("form", {
                        p5: "",
                        grid: "",
                        "gap-y-4": "",
                        onSubmit: reload
                      }, [
                        createVNode("div", { "text-lg": "" }, " Something went wrong "),
                        createVNode("div", { "text-secondary": "" }, toDisplayString$1(unref(message)), 1),
                        createVNode("button", {
                          flex: "",
                          "items-center": "",
                          "gap-2": "",
                          "justify-center": "",
                          "btn-solid": "",
                          "text-center": "",
                          disabled: unref(state) === "reloading"
                        }, [
                          unref(state) === "reloading" ? (openBlock(), createBlock("span", {
                            key: 0,
                            block: "",
                            "animate-spin": "",
                            "preserve-3d": ""
                          }, [
                            createVNode("span", {
                              block: "",
                              "i-ri:loader-2-fill": ""
                            })
                          ])) : createCommentVNode("", true),
                          createTextVNode(" " + toDisplayString$1(unref(state) === "reloading" ? "Reloading" : "Reload"), 1)
                        ], 8, ["disabled"])
                      ], 32)
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_MainContent, null, {
                title: withCtx(() => [
                  createVNode("span", { "timeline-title-style": "" }, "Error")
                ]),
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", {}, () => [
                    createVNode("form", {
                      p5: "",
                      grid: "",
                      "gap-y-4": "",
                      onSubmit: reload
                    }, [
                      createVNode("div", { "text-lg": "" }, " Something went wrong "),
                      createVNode("div", { "text-secondary": "" }, toDisplayString$1(unref(message)), 1),
                      createVNode("button", {
                        flex: "",
                        "items-center": "",
                        "gap-2": "",
                        "justify-center": "",
                        "btn-solid": "",
                        "text-center": "",
                        disabled: unref(state) === "reloading"
                      }, [
                        unref(state) === "reloading" ? (openBlock(), createBlock("span", {
                          key: 0,
                          block: "",
                          "animate-spin": "",
                          "preserve-3d": ""
                        }, [
                          createVNode("span", {
                            block: "",
                            "i-ri:loader-2-fill": ""
                          })
                        ])) : createCommentVNode("", true),
                        createTextVNode(" " + toDisplayString$1(unref(state) === "reloading" ? "Reloading" : "Reload"), 1)
                      ], 8, ["disabled"])
                    ], 32)
                  ])
                ]),
                _: 3
              })
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent(_component_AriaAnnouncer, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("error.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url ;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$v), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/nuxt@3.11.1_@upstash+redis@1.27.1_@vercel+kv@1.0.1_eslint@8.57.0_idb-keyval@6.2.1_rollup@4.13_6nweheqbcv2lzpwb5rwp6svije/node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error = nuxt.payload.error || createError(error);
    }
    if (ssrContext?._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

const server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $: STORAGE_KEY_HIDE_EXPLORE_POSTS_TIPS,
  A: getServerName,
  B: currentServer,
  C: toggleBlockDomain,
  D: openReportDialog,
  E: openConfirmDialog,
  F: _sfc_main$6,
  G: _sfc_main$o,
  H: openMediaPreview,
  I: getShortHandle,
  J: _sfc_main$u,
  K: _sfc_main$t,
  L: _sfc_main$c,
  M: _sfc_main$b,
  N: _sfc_main$a,
  O: _sfc_main$9,
  P: _sfc_main$8,
  Q: _sfc_main$i,
  R: _sfc_main$g,
  S: toShortHandle,
  T: useUserSettings,
  U: getPreferences,
  V: fetchAccountByHandle,
  W: __nuxt_component_4,
  X: _export_sfc,
  Y: useMastoClient,
  Z: useLocalStorage,
  _: __nuxt_component_0$1,
  a: useI18n,
  a$: useRuntimeConfig,
  a0: STORAGE_KEY_LAST_ACCESSED_EXPLORE_ROUTE,
  a1: STORAGE_KEY_HIDE_EXPLORE_NEWS_TIPS,
  a2: STORAGE_KEY_HIDE_EXPLORE_TAGS_TIPS,
  a3: cacheAccount,
  a4: useStreaming,
  a5: useMagicKeys,
  a6: _sfc_main$n,
  a7: asyncDataDefaults,
  a8: useNuxtApp,
  a9: createError,
  aA: useToggle,
  aB: useTimeAgo,
  aC: useHumanReadableNumber,
  aD: _sfc_main$h,
  aE: clamp,
  aF: usePreferredReducedMotion,
  aG: getDataUrlFromArr,
  aH: sanitizeEmbeddedIframe,
  aI: nodeToVNode,
  aJ: getHideMediaByDefault,
  aK: navigateToStatus,
  aL: _sfc_main$d,
  aM: currentInstance,
  aN: useDropZone,
  aO: htmlToText,
  aP: isGlitchEdition,
  aQ: useHighlighter,
  aR: getEmojiAttributes,
  aS: getDefaultDraft,
  aT: useDraft,
  aU: characterLimit,
  aV: accountToShortHandle,
  aW: _sfc_main$q,
  aX: useElementBounding,
  aY: useDeactivated,
  aZ: useColorMode,
  a_: InjectionKeyDropdownContext,
  aa: __nuxt_component_11,
  ab: _sfc_main$k,
  ac: __nuxt_component_2,
  ad: useRouter,
  ae: getStatusRoute,
  af: useIntersectionObserver,
  ag: fetchAccountById,
  ah: getStatusInReplyToRoute,
  ai: useTimeAgoOptions,
  aj: formatTimeAgo,
  ak: openEditHistoryDialog,
  al: useCommand,
  am: checkLogin,
  an: cacheStatus,
  ao: noop$1,
  ap: useClipboard,
  aq: removeCachedStatus,
  ar: openPublishDialog,
  as: getDraftFromStatus,
  at: lastPublishDialogStatus,
  au: openFavoridedBoostedByDialog,
  av: getStatusPermalinkRoute,
  aw: useEmojisFallback,
  ax: contentToVNode,
  ay: getExpandSpoilersByDefault,
  az: getExpandMediaByDefault,
  b: useHydratedHead,
  b$: reportStatus,
  b0: useEventListener,
  b1: _sfc_main$m,
  b2: _sfc_main$l,
  b3: useCommands,
  b4: useBreakpoints,
  b5: breakpointsTailwind,
  b6: resolveUnref,
  b7: watchDebounced,
  b8: getTagRoute,
  b9: useFocusWithin,
  bA: mediaPreviewList,
  bB: mediaPreviewIndex,
  bC: whenever,
  bD: useIsMac,
  bE: useCommandRegistry,
  bF: commandPanelInput,
  bG: favouritedBoostedByStatusId,
  bH: isSigninDialogOpen,
  bI: isPreviewHelpOpen,
  bJ: closePreviewHelp,
  bK: isPublishDialogOpen,
  bL: dialogDraftKey,
  bM: isMediaPreviewOpen,
  bN: closeMediaPreview,
  bO: isEditHistoryDialogOpen,
  bP: statusEdit,
  bQ: isCommandPanelOpen,
  bR: closeCommandPanel,
  bS: isConfirmDialogOpen,
  bT: confirmDialogLabel,
  bU: isErrorDialogOpen,
  bV: errorDialogData,
  bW: isFavouritedBoostedByDialogOpen,
  bX: isKeyboardShortcutsDialogOpen,
  bY: closeKeyboardShortcuts,
  bZ: isReportDialogOpen,
  b_: reportAccount,
  ba: useAppConfig,
  bb: NOTIFICATION_FILTER_TYPES,
  bc: getReportRoute,
  bd: STORAGE_KEY_LAST_ACCESSED_NOTIFICATION_ROUTE,
  be: onHydrated,
  bf: until,
  bg: __nuxt_component_2$1,
  bh: useBuildInfo,
  bi: openPreviewHelp,
  bj: elkTeamMembers,
  bk: DEFAULT_FONT_SIZE,
  bl: togglePreferences,
  bm: refreshAccountInfo,
  bn: useUsers,
  bo: defineNuxtRouteMiddleware,
  bp: useSignIn,
  bq: _sfc_main$5,
  br: switchUser,
  bs: useOnline,
  bt: invoke,
  bu: toggleKeyboardShortcuts,
  bv: onClickOutside,
  bw: isObject$1,
  bx: tryOnUnmounted,
  by: useTimeout,
  bz: useScrollLock,
  c: getAccountRoute,
  c0: closeReportDialog,
  c1: openCommandPanel,
  c2: confirmDialogChoice,
  d: _sfc_main$e,
  default: entry$1,
  e: _sfc_main$7,
  f: currentUser,
  g: getDisplayName,
  h: useRoute,
  i: isHydrated,
  j: fetchStatus,
  k: useMasto,
  l: unrefElement,
  m: getReplyDraft,
  n: _sfc_main$2,
  o: onReactivated,
  p: useRelationship,
  q: useSelfAccount,
  r: removeHTMLTags,
  s: usePreferences,
  t: useShare,
  u: useFormattedDateTime,
  v: mentionUser,
  w: watchOnce,
  x: directMessageUser,
  y: toggleMuteAccount,
  z: toggleBlockAccount
});

export { STORAGE_KEY_HIDE_EXPLORE_POSTS_TIPS as $, directMessageUser as A, toggleMuteAccount as B, toggleBlockAccount as C, getServerName as D, currentServer as E, toggleBlockDomain as F, openReportDialog as G, fetchAccountByHandle as H, _sfc_main$i as I, __nuxt_component_4 as J, openConfirmDialog as K, _sfc_main$6 as L, _sfc_main$o as M, openMediaPreview as N, getShortHandle as O, _sfc_main$u as P, _sfc_main$t as Q, _sfc_main$c as R, _sfc_main$b as S, _sfc_main$a as T, _sfc_main$9 as U, _sfc_main$8 as V, _sfc_main$g as W, _export_sfc as X, useMastoClient as Y, useLocalStorage as Z, _sfc_main$2 as _, useMasto as a, useEventListener as a$, STORAGE_KEY_LAST_ACCESSED_EXPLORE_ROUTE as a0, STORAGE_KEY_HIDE_EXPLORE_NEWS_TIPS as a1, STORAGE_KEY_HIDE_EXPLORE_TAGS_TIPS as a2, cacheAccount as a3, useStreaming as a4, useMagicKeys as a5, _sfc_main$n as a6, asyncDataDefaults as a7, useNuxtApp as a8, createError as a9, openEditHistoryDialog as aA, removeCachedStatus as aB, openPublishDialog as aC, getDraftFromStatus as aD, lastPublishDialogStatus as aE, openFavoridedBoostedByDialog as aF, _sfc_main$h as aG, navigateToStatus as aH, getStatusPermalinkRoute as aI, proxy as aJ, getEmojiAttributes as aK, useHighlighter as aL, getDefaultDraft as aM, useDraft as aN, htmlToText as aO, characterLimit as aP, accountToShortHandle as aQ, currentInstance as aR, useDropZone as aS, _sfc_main$q as aT, __nuxt_component_11 as aU, isGlitchEdition as aV, useElementBounding as aW, useDeactivated as aX, useColorMode as aY, InjectionKeyDropdownContext as aZ, useRuntimeConfig as a_, useEmojisFallback as aa, contentToVNode as ab, getExpandSpoilersByDefault as ac, getExpandMediaByDefault as ad, useToggle as ae, getStatusRoute as af, useRouter as ag, useTimeAgoOptions as ah, useTimeAgo as ai, useIntersectionObserver as aj, fetchAccountById as ak, getStatusInReplyToRoute as al, formatTimeAgo as am, useCommand as an, checkLogin as ao, noop$1 as ap, useClipboard as aq, useHumanReadableNumber as ar, clamp as as, usePreferredReducedMotion as at, getDataUrlFromArr as au, sanitizeEmbeddedIframe as av, nodeToVNode as aw, getHideMediaByDefault as ax, cacheStatus as ay, _sfc_main$d as az, unrefElement as b, commandPanelInput as b$, _sfc_main$m as b0, _sfc_main$l as b1, useCommands as b2, useBreakpoints as b3, breakpointsTailwind as b4, _sfc_main$k as b5, __nuxt_component_2 as b6, resolveUnref as b7, watchDebounced as b8, useFocusWithin as b9, useIsMac as bA, useCommandRegistry as bB, openCommandPanel as bC, isSigninDialogOpen as bD, isPreviewHelpOpen as bE, closePreviewHelp as bF, isPublishDialogOpen as bG, dialogDraftKey as bH, isMediaPreviewOpen as bI, closeMediaPreview as bJ, isEditHistoryDialogOpen as bK, statusEdit as bL, isCommandPanelOpen as bM, closeCommandPanel as bN, isConfirmDialogOpen as bO, confirmDialogLabel as bP, isErrorDialogOpen as bQ, errorDialogData as bR, isFavouritedBoostedByDialogOpen as bS, isKeyboardShortcutsDialogOpen as bT, closeKeyboardShortcuts as bU, isReportDialogOpen as bV, reportAccount as bW, reportStatus as bX, closeReportDialog as bY, _sfc_main$5 as bZ, switchUser as b_, getTagRoute as ba, useAppConfig as bb, NOTIFICATION_FILTER_TYPES as bc, STORAGE_KEY_LAST_ACCESSED_NOTIFICATION_ROUTE as bd, getReportRoute as be, onHydrated as bf, until as bg, __nuxt_component_2$1 as bh, useBuildInfo as bi, openPreviewHelp as bj, elkTeamMembers as bk, DEFAULT_FONT_SIZE as bl, togglePreferences as bm, refreshAccountInfo as bn, useUsers as bo, defineNuxtRouteMiddleware as bp, useSignIn as bq, useOnline as br, invoke as bs, toggleKeyboardShortcuts as bt, onClickOutside as bu, useTimeout as bv, useScrollLock as bw, mediaPreviewList as bx, mediaPreviewIndex as by, whenever as bz, currentUser as c, favouritedBoostedByStatusId as c0, confirmDialogChoice as c1, isObject$1 as c2, tryOnUnmounted as c3, server as c4, useFormattedDateTime as d, useI18n as e, fetchStatus as f, getReplyDraft as g, useHydratedHead as h, isHydrated as i, getDisplayName as j, getAccountRoute as k, __nuxt_component_0$1 as l, _sfc_main$e as m, _sfc_main$7 as n, onReactivated as o, useRelationship as p, useUserSettings as q, removeHTMLTags as r, getPreferences as s, toShortHandle as t, useRoute as u, useSelfAccount as v, watchOnce as w, usePreferences as x, useShare as y, mentionUser as z };
