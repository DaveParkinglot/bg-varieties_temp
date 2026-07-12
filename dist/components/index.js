import { createRequire } from 'module';

createRequire(import.meta.url);

// src/components/styles/bg-varieties.scss
var bg_varieties_default = ".bg-varieties-container {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  pointer-events: none;\n  overflow: hidden;\n  box-sizing: border-box;\n}\n.bg-varieties-container canvas.bg-varieties-canvas {\n  display: block;\n  width: 100% !important;\n  height: 100% !important;\n  pointer-events: auto; /* enable if interactive, otherwise controlled by JS */\n  transition: opacity 0.5s ease-in-out;\n}";

// src/components/scripts/bg-varieties.inline.ts
var bg_varieties_inline_default = 'var et=Object.defineProperty;var nt=(u,o,t)=>o in u?et(u,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):u[o]=t;var _=(u,o,t)=>nt(u,typeof o!="symbol"?o+"":o,t);var V=class{constructor(){_(this,"p",[]);let o=Array.from({length:256},(t,i)=>i);for(let t=255;t>0;t--){let i=Math.floor(Math.random()*(t+1));[o[t],o[i]]=[o[i],o[t]]}this.p=[...o,...o]}fade(o){return o*o*o*(o*(o*6-15)+10)}lerp(o,t,i){return t+o*(i-t)}grad(o,t,i){let h=o&7,w=h<4?t:i,y=h<4?i:t;return(h&1?-w:w)+(h&2?-2*y:2*y)}noise2D(o,t){let i=Math.floor(o)&255,h=Math.floor(t)&255;o-=Math.floor(o),t-=Math.floor(t);let w=this.fade(o),y=this.fade(t),b=this.p[i]+h,q=this.p[i+1]+h;return this.lerp(y,this.lerp(w,this.grad(this.p[b],o,t),this.grad(this.p[q],o-1,t)),this.lerp(w,this.grad(this.p[b+1],o,t-1),this.grad(this.p[q+1],o-1,t-1)))}},P=null,I=null,k=null,C=null,A=null;function ot(u){let o={r:128,g:128,b:128};if(!u)return o;if(u.startsWith("#")){let t=u.slice(1);if(t.length===3)return{r:parseInt(t[0]+t[0],16),g:parseInt(t[1]+t[1],16),b:parseInt(t[2]+t[2],16)};if(t.length===6)return{r:parseInt(t.slice(0,2),16),g:parseInt(t.slice(2,4),16),b:parseInt(t.slice(4,6),16)}}else if(u.startsWith("rgb")){let t=u.match(/\\d+/g);if(t&&t.length>=3)return{r:parseInt(t[0]),g:parseInt(t[1]),b:parseInt(t[2])}}return o}function M(u,o){let{r:t,g:i,b:h}=ot(u);return`rgba(${t}, ${i}, ${h}, ${o})`}var K={cosmic:["#8a2be2","#ff1493","#ee82ee","#4b0082","#00bfff"],aurora:["#00ff7f","#008080","#98fb98","#191970","#32cd32"],nebula:["#ff69b4","#00ffff","#9370db","#090979","#4a0e4e"],sunset:["#ffa500","#ffbf00","#ff7f50","#483d8b","#ffc0cb"],minimalist:[]};function Q(){U();let u=document.querySelector(".bg-varieties-container");if(!u)return;let o=u.querySelector(".bg-varieties-canvas");if(!o)return;let t=o.getContext("2d");if(!t)return;let i={};try{i=JSON.parse(u.getAttribute("data-options")||"{}")}catch(l){console.error("[BgVarieties] Failed to parse options:",l)}let h=i.type||"vector",w=i.opacity!==void 0?i.opacity:.4,y=i.speedMultiplier!==void 0?i.speedMultiplier:1,b=i.density!==void 0?i.density:50,q=i.interactive!==void 0?i.interactive:!0,$=i.theme||"auto",R=i.palette||"cosmic";o.style.opacity=w.toString();let m=0,p=0;function B(){let l=window.devicePixelRatio||1;m=window.innerWidth,p=window.innerHeight,o.width=m*l,o.height=p*l,t.scale(l,l)}B(),k=()=>{B(),G()},window.addEventListener("resize",k);let d={x:-9999,y:-9999,active:!1};q&&(C=l=>{d.x=l.clientX,d.y=l.clientY,d.active=!0},A=()=>{d.x=-9999,d.y=-9999,d.active=!1},window.addEventListener("mousemove",C),window.addEventListener("mouseleave",A));let S=!1,E="#faf8f8",g="#000000",v=[];function j(){S=document.documentElement.classList.contains("dark")||document.documentElement.getAttribute("data-theme")==="dark"||$==="dark",$==="light"&&(S=!1);let l=window.getComputedStyle(document.body);if(E=l.backgroundColor||(S?"#161618":"#faf8f8"),(E==="rgba(0, 0, 0, 0)"||E==="transparent")&&(E=S?"#161618":"#faf8f8"),g=l.color||(S?"#ffffff":"#000000"),(g==="rgba(0, 0, 0, 0)"||g==="transparent")&&(g=S?"#ffffff":"#000000"),Array.isArray(R))v=R;else{let n=K[R]||K.cosmic;if(R==="minimalist"){let a=window.getComputedStyle(document.documentElement).getPropertyValue("--lightgray").trim()||(S?"rgba(255, 255, 255, 0.15)":"rgba(0, 0, 0, 0.15)");v=[g,a,M(g,.5)]}else v=n}}j(),I=new MutationObserver(()=>{j()}),I.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]});function W(){return v.length===0?g:v[Math.floor(Math.random()*v.length)]}let x=[],Z=new V,O=0;function G(){if(x.length=0,h==="vector"){let l=Math.floor(80*(b/50));for(let n=0;n<l;n++)x.push({x:Math.random()*m,y:Math.random()*p,vx:(Math.random()-.5)*.8*y,vy:(Math.random()-.5)*.8*y,r:Math.random()*2+1,color:W()})}else if(h==="perlin-noise"){let l=Math.floor(100*(b/50));for(let n=0;n<l;n++)x.push({x:Math.random()*m,y:Math.random()*p,vx:0,vy:0,color:W(),alpha:Math.random()*.5+.3,life:Math.random()*200+100,maxLife:300})}else if(h==="dots"){let l=Math.floor(50*(b/50));for(let n=0;n<l;n++)x.push({x:Math.random()*m,y:Math.random()*p,vx:(Math.random()-.5)*.3*y,vy:-(Math.random()*.4+.1)*y,r:Math.random()*25+5,color:W(),pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.005+Math.random()*.01})}}G();let tt=0;function X(l){if(tt=l,h==="perlin-noise"){t.fillStyle=M(E,.06),t.fillRect(0,0,m,p);let n=.003,r=.08*y,a=1.5*y;for(let e of x){let c=Z.noise2D(e.x*n,e.y*n)*Math.PI*4;e.vx+=Math.cos(c)*r,e.vy+=Math.sin(c)*r;let f=Math.sqrt(e.vx*e.vx+e.vy*e.vy);f>a&&(e.vx=e.vx/f*a,e.vy=e.vy/f*a),e.x+=e.vx,e.y+=e.vy,e.life-=1,t.beginPath(),t.moveTo(e.x-e.vx*2,e.y-e.vy*2),t.lineTo(e.x,e.y),t.strokeStyle=M(e.color,e.alpha*(e.life/e.maxLife)),t.lineWidth=1.5,t.stroke(),(e.x<0||e.x>m||e.y<0||e.y>p||e.life<=0)&&(e.x=Math.random()*m,e.y=Math.random()*p,e.vx=0,e.vy=0,e.life=Math.random()*e.maxLife*.5+e.maxLife*.5,e.color=W())}}else if(h==="vector"){t.clearRect(0,0,m,p);for(let r of x){if(r.x+=r.vx,r.y+=r.vy,(r.x<0||r.x>m)&&(r.vx*=-1),(r.y<0||r.y>p)&&(r.vy*=-1),d.active){let a=r.x-d.x,e=r.y-d.y,s=Math.sqrt(a*a+e*e);if(s<150){let c=(150-s)/150;r.x+=a/s*c*2*y,r.y+=e/s*c*2*y}}t.beginPath(),t.arc(r.x,r.y,r.r,0,Math.PI*2),t.fillStyle=M(r.color,.6),t.fill()}let n=120;for(let r=0;r<x.length;r++){let a=x[r];for(let e=r+1;e<x.length;e++){let s=x[e],c=a.x-s.x,f=a.y-s.y,T=Math.sqrt(c*c+f*f);if(T<n){let F=(1-T/n)*.25;t.beginPath(),t.moveTo(a.x,a.y),t.lineTo(s.x,s.y),t.strokeStyle=M(a.color,F),t.lineWidth=.8,t.stroke()}}if(d.active){let e=a.x-d.x,s=a.y-d.y,c=Math.sqrt(e*e+s*s);if(c<180){let f=(1-c/180)*.4;t.beginPath(),t.moveTo(a.x,a.y),t.lineTo(d.x,d.y),t.strokeStyle=M(a.color,f),t.lineWidth=1.2,t.stroke()}}}}else if(h==="dots"){t.clearRect(0,0,m,p);for(let n of x){let r=n.r+Math.sin(l*n.pulseSpeed+n.pulsePhase)*4;if(n.x+=n.vx,n.y+=n.vy,n.y+r<0&&(n.y=p+r,n.x=Math.random()*m),n.x+r<0&&(n.x=m+r),n.x-r>m&&(n.x=-r),d.active){let e=n.x-d.x,s=n.y-d.y,c=Math.sqrt(e*e+s*s);if(c<200){let f=(200-c)/200;n.x+=e/c*f*1.5*y,n.y+=s/c*f*1.5*y}}let a=t.createRadialGradient(n.x,n.y,0,n.x,n.y,r);a.addColorStop(0,M(n.color,.3)),a.addColorStop(.5,M(n.color,.1)),a.addColorStop(1,"rgba(0, 0, 0, 0)"),t.beginPath(),t.arc(n.x,n.y,r,0,Math.PI*2),t.fillStyle=a,t.fill()}}else if(h==="fractals"){t.clearRect(0,0,m,p),O+=.005*y;let n=O*.2,r=m/2,a=p/2,e=Math.min(m,p)*.12*(b/50+.5),s=b>65?8:b>35?6:5,c=b>75?7:b>35?6:5;for(let f=0;f<s;f++){let T=n+f*Math.PI*2/s;z(r,a,e,T,c,O)}}P=requestAnimationFrame(X)}function z(l,n,r,a,e,s){if(e===0)return;let c=l+Math.cos(a)*r,f=n+Math.sin(a)*r;t.lineWidth=e*.5,t.lineCap="round";let T=v[0]||g;if(v.length>1){let L=Math.min(v.length-1,Math.floor((1-e/7)*v.length));T=v[L]}t.strokeStyle=M(T,.08+e*.03),t.beginPath(),t.moveTo(l,n),t.lineTo(c,f),t.stroke();let F=r*.68,Y=Math.sin(s*2+e)*.05,D=0;if(d.active){let L=d.x-c,H=d.y-f,N=Math.sqrt(L*L+H*H);N<250&&(D=(Math.atan2(H,L)-a)*.06*(1-N/250))}let J=.45+Math.sin(s*.5)*.05;z(c,f,F,a-J+Y+D,e-1,s),z(c,f,F,a+J+Y+D,e-1,s),e===1&&(t.beginPath(),t.arc(c,f,2,0,Math.PI*2),t.fillStyle=M(v[0]||g,.3),t.fill())}P=requestAnimationFrame(X)}function U(){P&&(cancelAnimationFrame(P),P=null),I&&(I.disconnect(),I=null),k&&(window.removeEventListener("resize",k),k=null),C&&(window.removeEventListener("mousemove",C),C=null),A&&(window.removeEventListener("mouseleave",A),A=null)}document.addEventListener("nav",()=>{Q()});document.addEventListener("render",()=>{Q()});typeof window<"u"&&window.addCleanup&&window.addCleanup(()=>{U()});\n';
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

export { BgVarieties_default as BgVarieties };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map