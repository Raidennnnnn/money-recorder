if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let o={};const c=e=>i(e,l),t={module:{uri:l},exports:o,require:c};s[l]=Promise.all(n.map((e=>t[e]||c(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3e8df8c8"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"apple-touch-icon-180x180.png",revision:"1468aa0f0e98646f6c35f49902211d84"},{url:"assets/category-detail-CuAmPTdB.js",revision:null},{url:"assets/fluent-emoji-disguised-face-CrMRpvSq.js",revision:null},{url:"assets/index-Bphujsnw.js",revision:null},{url:"assets/index-nJAmpILM.css",revision:null},{url:"assets/past-12-month-chart-9clKGmn9.js",revision:null},{url:"assets/place-holder-BYOobv_I.js",revision:null},{url:"assets/place-holder-CUfOZ1BF.css",revision:null},{url:"favicon.ico",revision:"bb7aa37868c50c4b3d124bfce0efacd1"},{url:"favicon.svg",revision:"872f50f5417d8f1c30849594f1cbb00f"},{url:"index.html",revision:"0f08b20cdbc5076f622fd680f071e012"},{url:"maskable-icon-512x512.png",revision:"a97d573d5a33e95a7f1e56c750124740"},{url:"pwa-192x192.png",revision:"15f5527fd3ed5a6c23397550e41a9b93"},{url:"pwa-512x512.png",revision:"6f5908609686d44f71068c6e26e3d098"},{url:"pwa-64x64.png",revision:"1fc6802a000ad00b50ee74a096a0d6cf"},{url:"manifest.webmanifest",revision:"96004679d1ac6a24356b86259575d4f3"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
