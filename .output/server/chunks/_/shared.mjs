import { existsSync, promises } from 'fs';
import { resolve, relative, join } from 'path';
import { watch } from 'chokidar';
import { e as defineDriver, f as createRequiredError, h as readFile, w as writeFile, i as unlink, j as readdirRecursive, k as rmRecursive, l as createError, m as useStorage, u as useRuntimeConfig, $ as $fetch } from '../runtime.mjs';
import anymatch from 'anymatch';

const PATH_TRAVERSE_RE = /\.\.\:|\.\.$/;
const DRIVER_NAME = "fs";
const fs = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  if (!opts.ignore) {
    opts.ignore = ["**/node_modules/**", "**/.git/**"];
  }
  opts.base = resolve(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  let _watcher;
  const _unwatch = async () => {
    if (_watcher) {
      await _watcher.close();
      _watcher = void 0;
    }
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys() {
      return readdirRecursive(r("."), anymatch(opts.ignore || []));
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    },
    async dispose() {
      if (_watcher) {
        await _watcher.close();
      }
    },
    async watch(callback) {
      if (_watcher) {
        return _unwatch;
      }
      await new Promise((resolve2, reject) => {
        _watcher = watch(opts.base, {
          ignoreInitial: true,
          ignored: opts.ignore,
          ...opts.watchOptions
        }).on("ready", () => {
          resolve2();
        }).on("error", reject).on("all", (eventName, path) => {
          path = relative(opts.base, path);
          if (eventName === "change" || eventName === "add") {
            callback("update", path);
          } else if (eventName === "unlink") {
            callback("remove", path);
          }
        });
      });
      return _unwatch;
    }
  };
});

const env = "canary";

const APP_NAME = "Elk";

const storage = useStorage();
{
  const config = useRuntimeConfig();
  storage.mount("servers", fs({ base: config.storage.fsBase }));
}
function getRedirectURI(origin, server) {
  origin = origin.replace(/\?.*$/, "");
  return `${origin}/api/${server}/oauth/${encodeURIComponent(origin)}`;
}
async function fetchAppInfo(origin, server) {
  const app = await $fetch(`https://${server}/api/v1/apps`, {
    method: "POST",
    body: {
      client_name: APP_NAME + (` (${env})` ),
      website: "https://elk.zone",
      redirect_uris: getRedirectURI(origin, server),
      scopes: "read write follow push"
    }
  });
  return app;
}
async function getApp(origin, server) {
  const host = origin.replace(/^https?:\/\//, "").replace(/[^\w\d]/g, "-").replace(/\?.*$/, "");
  const key = `servers:v3:${server}:${host}.json`.toLowerCase();
  try {
    if (await storage.hasItem(key))
      return storage.getItem(key, {});
    const appInfo = await fetchAppInfo(origin, server);
    await storage.setItem(key, appInfo);
    return appInfo;
  } catch {
    return null;
  }
}
async function deleteApp(server) {
  const keys = await storage.getKeys(`servers:v3:${server}:`);
  for (const key of keys)
    await storage.removeItem(key);
}
async function listServers() {
  const keys = await storage.getKeys("servers:v3:");
  const servers = /* @__PURE__ */ new Set();
  for await (const key of keys) {
    const id = key.split(":")[2];
    if (id)
      servers.add(id.toLocaleLowerCase());
  }
  return Array.from(servers).sort();
}

export { getRedirectURI as a, deleteApp as d, getApp as g, listServers as l };
