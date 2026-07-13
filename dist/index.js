import { createRequire } from 'module';

createRequire(import.meta.url);

// src/components/styles/bg-varieties.scss
var bg_varieties_default = ".bg-varieties-container {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  pointer-events: none;\n  overflow: hidden;\n  box-sizing: border-box;\n}\n.bg-varieties-container canvas.bg-varieties-canvas {\n  display: block;\n  width: 100% !important;\n  height: 100% !important;\n  pointer-events: auto; /* enable if interactive, otherwise controlled by JS */\n  transition: opacity 0.5s ease-in-out;\n}";

// src/components/scripts/bg-varieties.inline.ts
var bg_varieties_inline_default = 'var at=Object.defineProperty;var it=(p,o,t)=>o in p?at(p,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):p[o]=t;var Q=(p,o,t)=>it(p,typeof o!="symbol"?o+"":o,t);var V=class{constructor(){Q(this,"p",[]);let o=Array.from({length:256},(t,l)=>l);for(let t=255;t>0;t--){let l=Math.floor(Math.random()*(t+1));[o[t],o[l]]=[o[l],o[t]]}this.p=[...o,...o]}fade(o){return o*o*o*(o*(o*6-15)+10)}lerp(o,t,l){return t+o*(l-t)}grad(o,t,l){let u=o&7,A=u<4?t:l,y=u<4?l:t;return(u&1?-A:A)+(u&2?-2*y:2*y)}noise2D(o,t){let l=Math.floor(o)&255,u=Math.floor(t)&255;o-=Math.floor(o),t-=Math.floor(t);let A=this.fade(o),y=this.fade(t),g=this.p[l]+u,F=this.p[l+1]+u;return this.lerp(y,this.lerp(A,this.grad(this.p[g],o,t),this.grad(this.p[F],o-1,t)),this.lerp(A,this.grad(this.p[g+1],o,t-1),this.grad(this.p[F+1],o-1,t-1)))}},L=null,I=null,k=null,q=null,R=null,b=[],H=0,U="",Z=-1,B=-1,j=null;function st(p){let o={r:128,g:128,b:128};if(!p)return o;if(p.startsWith("#")){let t=p.slice(1);if(t.length===3)return{r:parseInt(t[0]+t[0],16),g:parseInt(t[1]+t[1],16),b:parseInt(t[2]+t[2],16)};if(t.length===6)return{r:parseInt(t.slice(0,2),16),g:parseInt(t.slice(2,4),16),b:parseInt(t.slice(4,6),16)}}else if(p.startsWith("rgb")){let t=p.match(/\\d+/g);if(t&&t.length>=3)return{r:parseInt(t[0]),g:parseInt(t[1]),b:parseInt(t[2])}}return o}function S(p,o){let{r:t,g:l,b:u}=st(p);return`rgba(${t}, ${l}, ${u}, ${o})`}var tt={cosmic:["#8a2be2","#ff1493","#ee82ee","#4b0082","#00bfff"],aurora:["#00ff7f","#008080","#98fb98","#191970","#32cd32"],nebula:["#ff69b4","#00ffff","#9370db","#090979","#4a0e4e"],sunset:["#ffa500","#ffbf00","#ff7f50","#483d8b","#ffc0cb"],minimalist:[]};function et(){nt();let p=document.querySelector(".bg-varieties-container");if(!p)return;let o=p.querySelector(".bg-varieties-canvas");if(!o)return;let t=o.getContext("2d");if(!t)return;let l={};try{l=JSON.parse(p.getAttribute("data-options")||"{}")}catch(d){console.error("[BgVarieties] Failed to parse options:",d)}let u=l.type||"vector",A=l.opacity!==void 0?l.opacity:.4,y=l.speedMultiplier!==void 0?l.speedMultiplier:1,g=l.density!==void 0?l.density:50,F=l.interactive!==void 0?l.interactive:!0,$=l.theme||"auto",P=l.palette||"cosmic";o.style.opacity=A.toString();let f=0,h=0;function G(){let d=window.devicePixelRatio||1;f=window.innerWidth,h=window.innerHeight,o.width=f*d,o.height=h*d,t.scale(d,d)}G(),k=()=>{G(),Y()},window.addEventListener("resize",k);let m={x:-9999,y:-9999,active:!1};F&&(q=d=>{m.x=d.clientX,m.y=d.clientY,m.active=!0},R=()=>{m.x=-9999,m.y=-9999,m.active=!1},window.addEventListener("mousemove",q),window.addEventListener("mouseleave",R));let C=!1,w="#faf8f8",x="#000000",v=[];function X(){C=document.documentElement.classList.contains("dark")||document.documentElement.getAttribute("data-theme")==="dark"||$==="dark",$==="light"&&(C=!1);let d=window.getComputedStyle(document.body);if(w=d.backgroundColor||(C?"#161618":"#faf8f8"),(w==="rgba(0, 0, 0, 0)"||w==="transparent")&&(w=C?"#161618":"#faf8f8"),x=d.color||(C?"#ffffff":"#000000"),(x==="rgba(0, 0, 0, 0)"||x==="transparent")&&(x=C?"#ffffff":"#000000"),Array.isArray(P))v=P;else{let r=tt[P]||tt.cosmic;if(P==="minimalist"){let i=window.getComputedStyle(document.documentElement).getPropertyValue("--lightgray").trim()||(C?"rgba(255, 255, 255, 0.15)":"rgba(0, 0, 0, 0.15)");v=[x,i,S(x,.5)]}else v=r}}X(),I=new MutationObserver(()=>{let d=w,r=x,n=Array.isArray(v)?v.join(","):"";X();let i=Array.isArray(v)?v.join(","):"";if(w!==d||x!==r||i!==n){u==="perlin-noise"?(t.fillStyle=w,t.fillRect(0,0,f,h)):t.clearRect(0,0,f,h);for(let e of b)e.color=T()}}),I.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]});function T(){return v.length===0?x:v[Math.floor(Math.random()*v.length)]}let ot=new V;function Y(){let d=U!==u,r=Z!==g,n=B!==y,i=Array.isArray(P)?P.join(","):P,c=(Array.isArray(j)?j.join(","):j)!==i;if(U=u,Z=g,B=y,j=P,u==="perlin-noise"&&(t.fillStyle=w,t.fillRect(0,0,f,h)),b.length>0&&!d&&!r&&!c){for(let a of b)if(a.x>f&&(a.x=Math.random()*f),a.y>h&&(a.y=Math.random()*h),n&&Math.sqrt(a.vx*a.vx+a.vy*a.vy)>0){let M=y/(B||1);a.vx*=M,a.vy*=M}return}if(b.length=0,u==="vector"){let a=Math.floor(80*(g/50));for(let s=0;s<a;s++)b.push({x:Math.random()*f,y:Math.random()*h,vx:(Math.random()-.5)*.8*y,vy:(Math.random()-.5)*.8*y,r:Math.random()*2+1,color:T()})}else if(u==="perlin-noise"){let a=Math.floor(100*(g/50));for(let s=0;s<a;s++)b.push({x:Math.random()*f,y:Math.random()*h,vx:0,vy:0,color:T(),alpha:Math.random()*.5+.3,life:Math.random()*200+100,maxLife:300})}else if(u==="dots"){let a=Math.floor(50*(g/50));for(let s=0;s<a;s++)b.push({x:Math.random()*f,y:Math.random()*h,vx:(Math.random()-.5)*.3*y,vy:-(Math.random()*.4+.1)*y,r:Math.random()*25+5,color:T(),pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.005+Math.random()*.01})}}Y();let rt=0;function J(d){if(rt=d,u==="perlin-noise"){t.fillStyle=S(w,.06),t.fillRect(0,0,f,h);let r=.003,n=.08*y,i=1.5*y;for(let e of b){let a=ot.noise2D(e.x*r,e.y*r)*Math.PI*4;e.vx+=Math.cos(a)*n,e.vy+=Math.sin(a)*n;let s=Math.sqrt(e.vx*e.vx+e.vy*e.vy);s>i&&(e.vx=e.vx/s*i,e.vy=e.vy/s*i),e.x+=e.vx,e.y+=e.vy,e.life-=1,t.beginPath(),t.moveTo(e.x-e.vx*2,e.y-e.vy*2),t.lineTo(e.x,e.y),t.strokeStyle=S(e.color,e.alpha*(e.life/e.maxLife)),t.lineWidth=1.5,t.stroke(),(e.x<0||e.x>f||e.y<0||e.y>h||e.life<=0)&&(e.x=Math.random()*f,e.y=Math.random()*h,e.vx=0,e.vy=0,e.life=Math.random()*e.maxLife*.5+e.maxLife*.5,e.color=T())}}else if(u==="vector"){t.clearRect(0,0,f,h);for(let n of b){if(n.x+=n.vx,n.y+=n.vy,(n.x<0||n.x>f)&&(n.vx*=-1),(n.y<0||n.y>h)&&(n.vy*=-1),m.active){let i=n.x-m.x,e=n.y-m.y,c=Math.sqrt(i*i+e*e);if(c<150){let a=(150-c)/150;n.x+=i/c*a*2*y,n.y+=e/c*a*2*y}}t.beginPath(),t.arc(n.x,n.y,n.r,0,Math.PI*2),t.fillStyle=S(n.color,.6),t.fill()}let r=120;for(let n=0;n<b.length;n++){let i=b[n];for(let e=n+1;e<b.length;e++){let c=b[e],a=i.x-c.x,s=i.y-c.y,M=Math.sqrt(a*a+s*s);if(M<r){let W=(1-M/r)*.25;t.beginPath(),t.moveTo(i.x,i.y),t.lineTo(c.x,c.y),t.strokeStyle=S(i.color,W),t.lineWidth=.8,t.stroke()}}if(m.active){let e=i.x-m.x,c=i.y-m.y,a=Math.sqrt(e*e+c*c);if(a<180){let s=(1-a/180)*.4;t.beginPath(),t.moveTo(i.x,i.y),t.lineTo(m.x,m.y),t.strokeStyle=S(i.color,s),t.lineWidth=1.2,t.stroke()}}}}else if(u==="dots"){t.clearRect(0,0,f,h);for(let r of b){let n=r.r+Math.sin(d*r.pulseSpeed+r.pulsePhase)*4;if(r.x+=r.vx,r.y+=r.vy,r.y+n<0&&(r.y=h+n,r.x=Math.random()*f),r.x+n<0&&(r.x=f+n),r.x-n>f&&(r.x=-n),m.active){let e=r.x-m.x,c=r.y-m.y,a=Math.sqrt(e*e+c*c);if(a<200){let s=(200-a)/200;r.x+=e/a*s*1.5*y,r.y+=c/a*s*1.5*y}}let i=t.createRadialGradient(r.x,r.y,0,r.x,r.y,n);i.addColorStop(0,S(r.color,.3)),i.addColorStop(.5,S(r.color,.1)),i.addColorStop(1,"rgba(0, 0, 0, 0)"),t.beginPath(),t.arc(r.x,r.y,n,0,Math.PI*2),t.fillStyle=i,t.fill()}}else if(u==="fractals"){t.clearRect(0,0,f,h),H+=.005*y;let r=H*.2,n=f/2,i=h/2,e=Math.min(f,h)*.12*(g/50+.5),c=g>65?8:g>35?6:5,a=g>75?7:g>35?6:5;for(let s=0;s<c;s++){let M=r+s*Math.PI*2/c;D(n,i,e,M,a,H)}}L=requestAnimationFrame(J)}function D(d,r,n,i,e,c){if(e===0)return;let a=d+Math.cos(i)*n,s=r+Math.sin(i)*n;t.lineWidth=e*.5,t.lineCap="round";let M=v[0]||x;if(v.length>1){let E=Math.min(v.length-1,Math.floor((1-e/7)*v.length));M=v[E]}t.strokeStyle=S(M,.08+e*.03),t.beginPath(),t.moveTo(d,r),t.lineTo(a,s),t.stroke();let W=n*.68,N=Math.sin(c*2+e)*.05,O=0;if(m.active){let E=m.x-a,z=m.y-s,K=Math.sqrt(E*E+z*z);K<250&&(O=(Math.atan2(z,E)-i)*.06*(1-K/250))}let _=.45+Math.sin(c*.5)*.05;D(a,s,W,i-_+N+O,e-1,c),D(a,s,W,i+_+N+O,e-1,c),e===1&&(t.beginPath(),t.arc(a,s,2,0,Math.PI*2),t.fillStyle=S(v[0]||x,.3),t.fill())}L=requestAnimationFrame(J)}function nt(){L&&(cancelAnimationFrame(L),L=null),I&&(I.disconnect(),I=null),k&&(window.removeEventListener("resize",k),k=null),q&&(window.removeEventListener("mousemove",q),q=null),R&&(window.removeEventListener("mouseleave",R),R=null)}document.addEventListener("nav",()=>{et()});document.addEventListener("render",()=>{et()});typeof window<"u"&&window.addCleanup&&window.addCleanup(()=>{nt()});\n';
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

// src/index.ts
function init(options) {
}

export { BgVarieties_default as BgVarieties, init };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map