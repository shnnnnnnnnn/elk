import { d as defineEventHandler, g as getRouterParams, a as getQuery, u as useRuntimeConfig } from '../../../runtime.mjs';
import { d as deleteApp } from '../../../_/shared.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'xss';
import 'chokidar';
import 'anymatch';

const clear = defineEventHandler(async (event) => {
  const { server } = getRouterParams(event);
  const { key } = getQuery(event);
  if (key !== String(useRuntimeConfig().adminKey))
    return { status: false, error: "incorrect key" };
  await deleteApp(server);
  return { status: true };
});

export { clear as default };
