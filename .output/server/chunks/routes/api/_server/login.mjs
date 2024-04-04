import { d as defineEventHandler, g as getRouterParams, r as readBody, c as createError, s as stringifyQuery } from '../../../runtime.mjs';
import { g as getApp, a as getRedirectURI } from '../../../_/shared.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'xss';
import 'chokidar';
import 'anymatch';

const login = defineEventHandler(async (event) => {
  let { server } = getRouterParams(event);
  const { origin, force_login, lang } = await readBody(event);
  server = server.toLocaleLowerCase().trim();
  const app = await getApp(origin, server);
  if (!app) {
    throw createError({
      statusCode: 400,
      statusMessage: `App not registered for server: ${server}`
    });
  }
  const query = stringifyQuery({
    client_id: app.client_id,
    force_login: force_login === true ? "true" : "false",
    scope: "read write follow push",
    response_type: "code",
    lang,
    redirect_uri: getRedirectURI(origin, server)
  });
  return `https://${server}/oauth/authorize?${query}`;
});

export { login as default };
