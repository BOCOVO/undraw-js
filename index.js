(()=>{const t={initialConfigs:{nameAttr:"data-ujs-name",colorAttr:"data-ujs-color",doneAttr:"data-ujs-done",fallbackAttr:"data-ujs-fall-img",version:"0.0.1"},maxRetry:2,retryDelay:3e3,initObserver(){if(!this.observed){const t={childList:!0,subtree:!0};new MutationObserver((()=>{this.refresh()})).observe(document.body,t),this.observed=!0}},init(t={}){this.options={...this.initialConfigs,...t},this.initObserver(),this.refresh()},getUrl(t){return`https://unpkg.com/undraw-js@${this.options.version}/src/images/${t}.svg`},async loadSvg(t,e,s,o,i=0){const r=()=>{i<this.maxRetry?setTimeout((()=>{this.loadSvg(t,e,s,o,i+1)}),this.retryDelay):s()};try{const s=await fetch(t);if(200===s.status){const t=await s.text();try{e(t)}catch(t){console.log(t)}}else r()}catch(t){r()}},getDataImage(t,e){return t=this.replaceColor(t,e),"data:image/svg+xml;utf8,"+encodeURIComponent(t)},replaceColor:(t,e)=>e?t.replace(/#6c63ff/g,e):t,refresh(){const t=document.querySelectorAll(`img[${this.options.nameAttr}]:not([${this.options.doneAttr}])`);for(let e=0;e<t.length;e++){const s=t[e],o=s.getAttribute(this.options.nameAttr),i=s.getAttribute(this.options.colorAttr)||this.options.defaultColor,r=s.getAttribute(this.options.fallbackAttr);if(o){const t=this.getUrl(o);this.loadSvg(t,(t=>{s.src=this.getDataImage(t,i),s.setAttribute(this.options.doneAttr,"true")}),(()=>{s.getAttribute("alt")||s.setAttribute("alt",o),r&&(s.src=r)}),o)}}}};window.UndrawJS=Object.setPrototypeOf({},t)})();