if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let c={};const t=e=>s(e,o),f={module:{uri:o},exports:c,require:t};i[o]=Promise.all(n.map((e=>f[e]||t(e)))).then((e=>(r(...e),c)))}}define(["./workbox-3e8df8c8"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"apple-touch-icon-180x180.png",revision:"1468aa0f0e98646f6c35f49902211d84"},{url:"assets/app-statistic-CtvMQsCO.js",revision:null},{url:"assets/index-CxOeJs7d.js",revision:null},{url:"assets/index-g2HcSs7H.css",revision:null},{url:"favicon.ico",revision:"bb7aa37868c50c4b3d124bfce0efacd1"},{url:"favicon.svg",revision:"872f50f5417d8f1c30849594f1cbb00f"},{url:"index.html",revision:"98302731751e3885ed1ff669b2eb0b06"},{url:"maskable-icon-512x512.png",revision:"a97d573d5a33e95a7f1e56c750124740"},{url:"pwa-192x192.png",revision:"15f5527fd3ed5a6c23397550e41a9b93"},{url:"pwa-512x512.png",revision:"6f5908609686d44f71068c6e26e3d098"},{url:"pwa-64x64.png",revision:"1fc6802a000ad00b50ee74a096a0d6cf"},{url:"manifest.webmanifest",revision:"db3dd32a73798e3119c4448b204aab4c"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
