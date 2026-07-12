import { createRequire } from 'module';

createRequire(import.meta.url);

// node_modules/@quartz-community/utils/dist/lang.js
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/components/styles/example.scss
var example_default = ".example-component {\n  padding: 8px 16px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border-radius: 4px;\n  font-weight: 600;\n  display: inline-block;\n}";

// src/components/scripts/example.inline.ts
var example_inline_default = 'function l(){let e=window.location.pathname;return e.startsWith("/")&&(e=e.slice(1)),e.endsWith("/")&&(e=e.slice(0,-1)),e||"index"}function r(){let e=document.querySelectorAll(".example-component");if(e.length===0)return;let t=[];function o(n){(n.ctrlKey||n.metaKey)&&n.shiftKey&&n.key.toLowerCase()==="e"&&(n.preventDefault(),console.log("[ExampleComponent] Keyboard shortcut triggered!"))}document.addEventListener("keydown",o),t.push(()=>document.removeEventListener("keydown",o));for(let n of e){let i=()=>{console.log("[ExampleComponent] Clicked!")};n.addEventListener("click",i),t.push(()=>n.removeEventListener("click",i))}typeof window<"u"&&window.addCleanup&&window.addCleanup(()=>{t.forEach(n=>n())}),console.log("[ExampleComponent] Initialized with",e.length,"component(s)")}document.addEventListener("nav",e=>{let t=e.detail?.url||l();console.log("[ExampleComponent] Navigation to:",t),r()});document.addEventListener("render",()=>{console.log("[ExampleComponent] Render event - re-initializing"),r()});document.addEventListener("prenav",()=>{let e=document.querySelector(".example-component");e&&sessionStorage.setItem("exampleScrollTop",e.scrollTop?.toString()||"0")});\n';
var l;
l = { __e: function(n2, l2, u3, t2) {
  for (var i2, o2, r2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((o2 = i2.constructor) && null != o2.getDerivedStateFromError && (i2.setState(o2.getDerivedStateFromError(n2)), r2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), r2 = i2.__d), r2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;

// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f2 = 0;
function u2(e2, t2, n2, o2, i2, u3) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i2, __self: u3 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l.vnode && l.vnode(l2), l2;
}

// src/components/ExampleComponent.tsx
var ExampleComponent_default = ((opts) => {
  const { prefix = "", suffix = "", className = "example-component" } = opts ?? {};
  const Component = (props) => {
    const frontmatter = props.fileData?.frontmatter;
    const title = frontmatter?.title ?? "Untitled";
    const fullText = `${prefix}${title}${suffix}`;
    return /* @__PURE__ */ u2("div", { class: classNames(className), children: fullText });
  };
  Component.css = example_default;
  Component.afterDOMLoaded = example_inline_default;
  return Component;
});

// src/components/styles/bg-varieties.scss
var bg_varieties_default = ".bg-varieties-container {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  pointer-events: none;\n  overflow: hidden;\n  box-sizing: border-box;\n}\n.bg-varieties-container canvas.bg-varieties-canvas {\n  display: block;\n  width: 100% !important;\n  height: 100% !important;\n  pointer-events: auto; /* enable if interactive, otherwise controlled by JS */\n  transition: opacity 0.5s ease-in-out;\n}";

// src/components/scripts/bg-varieties.inline.ts
var bg_varieties_inline_default = 'var Z=Object.defineProperty;var ee=(h,o,e)=>o in h?Z(h,o,{enumerable:!0,configurable:!0,writable:!0,value:e}):h[o]=e;var G=(h,o,e)=>ee(h,typeof o!="symbol"?o+"":o,e);var H=class{constructor(){G(this,"p",[]);let o=Array.from({length:256},(e,a)=>a);for(let e=255;e>0;e--){let a=Math.floor(Math.random()*(e+1));[o[e],o[a]]=[o[a],o[e]]}this.p=[...o,...o]}fade(o){return o*o*o*(o*(o*6-15)+10)}lerp(o,e,a){return e+o*(a-e)}grad(o,e,a){let m=o&7,w=m<4?e:a,y=m<4?a:e;return(m&1?-w:w)+(m&2?-2*y:2*y)}noise2D(o,e){let a=Math.floor(o)&255,m=Math.floor(e)&255;o-=Math.floor(o),e-=Math.floor(e);let w=this.fade(o),y=this.fade(e),x=this.p[a]+m,q=this.p[a+1]+m;return this.lerp(y,this.lerp(w,this.grad(this.p[x],o,e),this.grad(this.p[q],o-1,e)),this.lerp(w,this.grad(this.p[x+1],o,e-1),this.grad(this.p[q+1],o-1,e-1)))}},T=null,L=null,k=null,C=null,A=null;function te(h){let o={r:128,g:128,b:128};if(!h)return o;if(h.startsWith("#")){let e=h.slice(1);if(e.length===3)return{r:parseInt(e[0]+e[0],16),g:parseInt(e[1]+e[1],16),b:parseInt(e[2]+e[2],16)};if(e.length===6)return{r:parseInt(e.slice(0,2),16),g:parseInt(e.slice(2,4),16),b:parseInt(e.slice(4,6),16)}}else if(h.startsWith("rgb")){let e=h.match(/\\d+/g);if(e&&e.length>=3)return{r:parseInt(e[0]),g:parseInt(e[1]),b:parseInt(e[2])}}return o}function M(h,o){let{r:e,g:a,b:m}=te(h);return`rgba(${e}, ${a}, ${m}, ${o})`}var X={cosmic:["#8a2be2","#ff1493","#ee82ee","#4b0082","#00bfff"],aurora:["#00ff7f","#008080","#98fb98","#191970","#32cd32"],nebula:["#ff69b4","#00ffff","#9370db","#090979","#4a0e4e"],sunset:["#ffa500","#ffbf00","#ff7f50","#483d8b","#ffc0cb"],minimalist:[]};function Y(){J();let h=document.querySelector(".bg-varieties-container");if(!h)return;let o=h.querySelector(".bg-varieties-canvas");if(!o)return;let e=o.getContext("2d");if(!e)return;let a={};try{a=JSON.parse(h.getAttribute("data-options")||"{}")}catch(s){console.error("[BgVarieties] Failed to parse options:",s)}let m=a.type||"vector",w=a.opacity!==void 0?a.opacity:.4,y=a.speedMultiplier!==void 0?a.speedMultiplier:1,x=a.density!==void 0?a.density:50,q=a.interactive!==void 0?a.interactive:!0,z=a.theme||"auto",R=a.palette||"cosmic";o.style.opacity=w.toString();let d=0,f=0;function D(){let s=window.devicePixelRatio||1;d=window.innerWidth,f=window.innerHeight,o.width=d*s,o.height=f*s,e.scale(s,s)}D(),k=()=>{D(),$()},window.addEventListener("resize",k);let u={x:-9999,y:-9999,active:!1};q&&(C=s=>{u.x=s.clientX,u.y=s.clientY,u.active=!0},A=()=>{u.x=-9999,u.y=-9999,u.active=!1},window.addEventListener("mousemove",C),window.addEventListener("mouseleave",A));let S=!1,E="#faf8f8",b="#000000",v=[];function O(){S=document.documentElement.classList.contains("dark")||document.documentElement.getAttribute("data-theme")==="dark"||z==="dark",z==="light"&&(S=!1);let s=window.getComputedStyle(document.body);if(E=s.backgroundColor||(S?"#161618":"#faf8f8"),(E==="rgba(0, 0, 0, 0)"||E==="transparent")&&(E=S?"#161618":"#faf8f8"),b=s.color||(S?"#ffffff":"#000000"),(b==="rgba(0, 0, 0, 0)"||b==="transparent")&&(b=S?"#ffffff":"#000000"),Array.isArray(R))v=R;else{let n=X[R]||X.cosmic;if(R==="minimalist"){let i=window.getComputedStyle(document.documentElement).getPropertyValue("--lightgray").trim()||(S?"rgba(255, 255, 255, 0.15)":"rgba(0, 0, 0, 0.15)");v=[b,i,M(b,.5)]}else v=n}}O(),L=new MutationObserver(()=>{O()}),L.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]});function W(){return v.length===0?b:v[Math.floor(Math.random()*v.length)]}let g=[],N=new H,V=0;function $(){if(g.length=0,m==="vector"){let s=Math.floor(80*(x/50));for(let n=0;n<s;n++)g.push({x:Math.random()*d,y:Math.random()*f,vx:(Math.random()-.5)*.8*y,vy:(Math.random()-.5)*.8*y,r:Math.random()*2+1,color:W()})}else if(m==="perlin-noise"){let s=Math.floor(100*(x/50));for(let n=0;n<s;n++)g.push({x:Math.random()*d,y:Math.random()*f,vx:0,vy:0,color:W(),alpha:Math.random()*.5+.3,life:Math.random()*200+100,maxLife:300})}else if(m==="dots"){let s=Math.floor(50*(x/50));for(let n=0;n<s;n++)g.push({x:Math.random()*d,y:Math.random()*f,vx:(Math.random()-.5)*.3*y,vy:-(Math.random()*.4+.1)*y,r:Math.random()*25+5,color:W(),pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.005+Math.random()*.01})}}$();let _=0;function B(s){if(_=s,m==="perlin-noise"){e.fillStyle=M(E,.06),e.fillRect(0,0,d,f);let n=.003,r=.08*y,i=1.5*y;for(let t of g){let c=N.noise2D(t.x*n,t.y*n)*Math.PI*4;t.vx+=Math.cos(c)*r,t.vy+=Math.sin(c)*r;let p=Math.sqrt(t.vx*t.vx+t.vy*t.vy);p>i&&(t.vx=t.vx/p*i,t.vy=t.vy/p*i),t.x+=t.vx,t.y+=t.vy,t.life-=1,e.beginPath(),e.moveTo(t.x-t.vx*2,t.y-t.vy*2),e.lineTo(t.x,t.y),e.strokeStyle=M(t.color,t.alpha*(t.life/t.maxLife)),e.lineWidth=1.5,e.stroke(),(t.x<0||t.x>d||t.y<0||t.y>f||t.life<=0)&&(t.x=Math.random()*d,t.y=Math.random()*f,t.vx=0,t.vy=0,t.life=Math.random()*t.maxLife*.5+t.maxLife*.5,t.color=W())}}else if(m==="vector"){e.clearRect(0,0,d,f);for(let r of g){if(r.x+=r.vx,r.y+=r.vy,(r.x<0||r.x>d)&&(r.vx*=-1),(r.y<0||r.y>f)&&(r.vy*=-1),u.active){let i=r.x-u.x,t=r.y-u.y,l=Math.sqrt(i*i+t*t);if(l<150){let c=(150-l)/150;r.x+=i/l*c*2*y,r.y+=t/l*c*2*y}}e.beginPath(),e.arc(r.x,r.y,r.r,0,Math.PI*2),e.fillStyle=M(r.color,.6),e.fill()}let n=120;for(let r=0;r<g.length;r++){let i=g[r];for(let t=r+1;t<g.length;t++){let l=g[t],c=i.x-l.x,p=i.y-l.y,P=Math.sqrt(c*c+p*p);if(P<n){let F=(1-P/n)*.25;e.beginPath(),e.moveTo(i.x,i.y),e.lineTo(l.x,l.y),e.strokeStyle=M(i.color,F),e.lineWidth=.8,e.stroke()}}if(u.active){let t=i.x-u.x,l=i.y-u.y,c=Math.sqrt(t*t+l*l);if(c<180){let p=(1-c/180)*.4;e.beginPath(),e.moveTo(i.x,i.y),e.lineTo(u.x,u.y),e.strokeStyle=M(i.color,p),e.lineWidth=1.2,e.stroke()}}}}else if(m==="dots"){e.clearRect(0,0,d,f);for(let n of g){let r=n.r+Math.sin(s*n.pulseSpeed+n.pulsePhase)*4;if(n.x+=n.vx,n.y+=n.vy,n.y+r<0&&(n.y=f+r,n.x=Math.random()*d),n.x+r<0&&(n.x=d+r),n.x-r>d&&(n.x=-r),u.active){let t=n.x-u.x,l=n.y-u.y,c=Math.sqrt(t*t+l*l);if(c<200){let p=(200-c)/200;n.x+=t/c*p*1.5*y,n.y+=l/c*p*1.5*y}}let i=e.createRadialGradient(n.x,n.y,0,n.x,n.y,r);i.addColorStop(0,M(n.color,.3)),i.addColorStop(.5,M(n.color,.1)),i.addColorStop(1,"rgba(0, 0, 0, 0)"),e.beginPath(),e.arc(n.x,n.y,r,0,Math.PI*2),e.fillStyle=i,e.fill()}}else if(m==="fractals"){e.clearRect(0,0,d,f),V+=.01*y;let n=Math.sin(V)*.05,r=0;u.active&&(r=(u.x/d-.5)*.15);let i=n+r;if((x>60?3:(x>25,1))===3)I(d*.25,f,f*.18,-Math.PI/2,7,i*.8,v[1]||b),I(d*.75,f,f*.18,-Math.PI/2,7,i*.8,v[2]||b),I(d*.5,f,f*.24,-Math.PI/2,9,i,v[0]||b);else{let l=Math.min(f*.25,200)*(x/50+.5),c=x>40?9:8;I(d*.5,f,l,-Math.PI/2,c,i,v[0]||b)}}T=requestAnimationFrame(B)}function I(s,n,r,i,t,l,c){if(t===0)return;let p=s+Math.cos(i)*r,P=n+Math.sin(i)*r;e.lineWidth=t*.8,e.lineCap="round";let F=c;if(v.length>1){let U=Math.min(v.length-1,Math.floor((1-t/10)*v.length));F=v[U]}e.strokeStyle=M(F,.45+t*.05),e.beginPath(),e.moveTo(s,n),e.lineTo(p,P),e.stroke();let j=r*.75,K=i-.35+l,Q=i+.35+l;I(p,P,j,K,t-1,l,c),I(p,P,j,Q,t-1,l,c),t===1&&(e.beginPath(),e.arc(p,P,4,0,Math.PI*2),e.fillStyle=M(v[0]||b,.85),e.fill())}T=requestAnimationFrame(B)}function J(){T&&(cancelAnimationFrame(T),T=null),L&&(L.disconnect(),L=null),k&&(window.removeEventListener("resize",k),k=null),C&&(window.removeEventListener("mousemove",C),C=null),A&&(window.removeEventListener("mouseleave",A),A=null)}document.addEventListener("nav",()=>{Y()});document.addEventListener("render",()=>{Y()});typeof window<"u"&&window.addCleanup&&window.addCleanup(()=>{J()});\n';

// src/components/BgVarieties.tsx
var BgVarieties_default = ((opts) => {
  const options = opts ?? {};
  const zIndex = options.zIndex ?? -2;
  const Component = (props) => {
    return /* @__PURE__ */ u2(
      "div",
      {
        class: "bg-varieties-container",
        style: { zIndex },
        "data-options": JSON.stringify(options),
        children: /* @__PURE__ */ u2("canvas", { class: "bg-varieties-canvas" })
      }
    );
  };
  Component.css = bg_varieties_default;
  Component.afterDOMLoaded = bg_varieties_inline_default;
  return Component;
});

export { BgVarieties_default as BgVarieties, ExampleComponent_default as ExampleComponent };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map