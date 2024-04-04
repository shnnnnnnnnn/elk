import { d as defineEventHandler } from '../../runtime.mjs';
import { l as listServers$1 } from '../../_/shared.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'xss';
import 'chokidar';
import 'anymatch';

let servers;
const listServers = defineEventHandler(async () => {
  if (!servers)
    servers = await listServers$1();
  return servers;
});

export { listServers as default };
