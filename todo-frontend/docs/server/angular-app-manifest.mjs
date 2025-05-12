
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/todo_repo/',
  locale: undefined,
  routes: [
  {
    "renderMode": 1,
    "route": "/todo_repo"
  },
  {
    "renderMode": 1,
    "route": "/todo_repo/todos"
  },
  {
    "renderMode": 1,
    "route": "/todo_repo/add"
  },
  {
    "renderMode": 1,
    "route": "/todo_repo/edit/*"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 6003, hash: '932939b03ebd56580236dac515fdd10e4ce76a92564881548bccab00616c7be5', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1019, hash: '28cfdff63404748236340b10be119c13f97d37b9711a37fdfe80c73e5f535e6f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-K4B74LV3.css': {size: 304573, hash: 'fYjp0Co/stQ', text: () => import('./assets-chunks/styles-K4B74LV3_css.mjs').then(m => m.default)}
  },
};
