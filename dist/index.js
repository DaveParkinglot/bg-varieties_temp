import { createRequire } from 'module';

createRequire(import.meta.url);

// src/components/styles/bg-varieties.scss
var bg_varieties_default = ".bg-varieties-container {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  pointer-events: none;\n  overflow: hidden;\n  box-sizing: border-box;\n}\n.bg-varieties-container canvas.bg-varieties-canvas {\n  display: block;\n  width: 100% !important;\n  height: 100% !important;\n  pointer-events: auto; /* enable if interactive, otherwise controlled by JS */\n  transition: opacity 0.5s ease-in-out;\n}";

// src/components/scripts/bg-varieties.inline.ts
var bg_varieties_inline_default = 'var at=Object.defineProperty;var st=(y,n,t)=>n in y?at(y,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):y[n]=t;var Q=(y,n,t)=>st(y,typeof n!="symbol"?n+"":n,t);var $=class{constructor(){Q(this,"p",[]);let n=Array.from({length:256},(t,l)=>l);for(let t=255;t>0;t--){let l=Math.floor(Math.random()*(t+1));[n[t],n[l]]=[n[l],n[t]]}this.p=[...n,...n]}fade(n){return n*n*n*(n*(n*6-15)+10)}lerp(n,t,l){return t+n*(l-t)}grad(n,t,l){let u=n&7,P=u<4?t:l,h=u<4?l:t;return(u&1?-P:P)+(u&2?-2*h:2*h)}noise2D(n,t){let l=Math.floor(n)&255,u=Math.floor(t)&255;n-=Math.floor(n),t-=Math.floor(t);let P=this.fade(n),h=this.fade(t),v=this.p[l]+u,R=this.p[l+1]+u;return this.lerp(h,this.lerp(P,this.grad(this.p[v],n,t),this.grad(this.p[R],n-1,t)),this.lerp(P,this.grad(this.p[v+1],n,t-1),this.grad(this.p[R+1],n-1,t-1)))}},E=null,L=null,I=null,k=null,q=null,b=[],j=0,U="",Z=-1,V=-1,D=null;function it(y){let n={r:128,g:128,b:128};if(!y)return n;if(y.startsWith("#")){let t=y.slice(1);if(t.length===3)return{r:parseInt(t[0]+t[0],16),g:parseInt(t[1]+t[1],16),b:parseInt(t[2]+t[2],16)};if(t.length===6)return{r:parseInt(t.slice(0,2),16),g:parseInt(t.slice(2,4),16),b:parseInt(t.slice(4,6),16)}}else if(y.startsWith("rgb")){let t=y.match(/\\d+/g);if(t&&t.length>=3)return{r:parseInt(t[0]),g:parseInt(t[1]),b:parseInt(t[2])}}return n}function M(y,n){let{r:t,g:l,b:u}=it(y);return`rgba(${t}, ${l}, ${u}, ${n})`}var tt={cosmic:["#8a2be2","#ff1493","#ee82ee","#4b0082","#00bfff"],aurora:["#00ff7f","#008080","#98fb98","#191970","#32cd32"],nebula:["#ff69b4","#00ffff","#9370db","#090979","#4a0e4e"],sunset:["#ffa500","#ffbf00","#ff7f50","#483d8b","#ffc0cb"],minimalist:[]};function et(){nt();let y=document.querySelector(".bg-varieties-container");if(!y)return;let n=y.querySelector(".bg-varieties-canvas");if(!n)return;let t=n.getContext("2d");if(!t)return;let l={};try{l=JSON.parse(y.getAttribute("data-options")||"{}")}catch(d){console.error("[BgVarieties] Failed to parse options:",d)}let u=l.type||"vector",P=l.opacity!==void 0?l.opacity:.4,h=l.speedMultiplier!==void 0?l.speedMultiplier:1,v=l.density!==void 0?l.density:50,R=l.interactive!==void 0?l.interactive:!0,B=l.theme||"auto",w=l.palette||"cosmic";n.style.opacity=P.toString();let m=0,p=0;function G(){let d=window.devicePixelRatio||1;m=window.innerWidth,p=window.innerHeight,n.width=m*d,n.height=p*d,t.scale(d,d)}G(),I=()=>{G(),Y()},window.addEventListener("resize",I);let f={x:-9999,y:-9999,active:!1};R&&(k=d=>{f.x=d.clientX,f.y=d.clientY,f.active=!0},q=()=>{f.x=-9999,f.y=-9999,f.active=!1},window.addEventListener("mousemove",k),window.addEventListener("mouseleave",q));let T=!1,C="#faf8f8",S="#000000",g=[];function X(){T=document.documentElement.classList.contains("dark")||document.documentElement.getAttribute("data-theme")==="dark"||B==="dark",B==="light"&&(T=!1);let d=window.getComputedStyle(document.body);if(C=d.backgroundColor||(T?"#161618":"#faf8f8"),(C==="rgba(0, 0, 0, 0)"||C==="transparent")&&(C=T?"#161618":"#faf8f8"),S=d.color||(T?"#ffffff":"#000000"),(S==="rgba(0, 0, 0, 0)"||S==="transparent")&&(S=T?"#ffffff":"#000000"),Array.isArray(w))g=w;else{let r=tt[w]||tt.cosmic;if(w==="minimalist"){let s=window.getComputedStyle(document.documentElement).getPropertyValue("--lightgray").trim()||(T?"rgba(255, 255, 255, 0.15)":"rgba(0, 0, 0, 0.15)");g=[S,s,M(S,.5)]}else g=r}}X(),L=new MutationObserver(()=>{X()}),L.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme"]});function F(){return g.length===0?S:g[Math.floor(Math.random()*g.length)]}let ot=new $;function Y(){let d=U!==u,r=Z!==v,o=V!==h,s=Array.isArray(w)?w.join(","):w,c=(Array.isArray(D)?D.join(","):D)!==s;if(U=u,Z=v,V=h,D=w,b.length>0&&!d&&!r&&!c){for(let a of b)if(a.x>m&&(a.x=Math.random()*m),a.y>p&&(a.y=Math.random()*p),o&&Math.sqrt(a.vx*a.vx+a.vy*a.vy)>0){let x=h/(V||1);a.vx*=x,a.vy*=x}return}if(b.length=0,u==="vector"){let a=Math.floor(80*(v/50));for(let i=0;i<a;i++)b.push({x:Math.random()*m,y:Math.random()*p,vx:(Math.random()-.5)*.8*h,vy:(Math.random()-.5)*.8*h,r:Math.random()*2+1,color:F()})}else if(u==="perlin-noise"){let a=Math.floor(100*(v/50));for(let i=0;i<a;i++)b.push({x:Math.random()*m,y:Math.random()*p,vx:0,vy:0,color:F(),alpha:Math.random()*.5+.3,life:Math.random()*200+100,maxLife:300})}else if(u==="dots"){let a=Math.floor(50*(v/50));for(let i=0;i<a;i++)b.push({x:Math.random()*m,y:Math.random()*p,vx:(Math.random()-.5)*.3*h,vy:-(Math.random()*.4+.1)*h,r:Math.random()*25+5,color:F(),pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.005+Math.random()*.01})}}Y();let rt=0;function J(d){if(rt=d,u==="perlin-noise"){t.fillStyle=M(C,.06),t.fillRect(0,0,m,p);let r=.003,o=.08*h,s=1.5*h;for(let e of b){let a=ot.noise2D(e.x*r,e.y*r)*Math.PI*4;e.vx+=Math.cos(a)*o,e.vy+=Math.sin(a)*o;let i=Math.sqrt(e.vx*e.vx+e.vy*e.vy);i>s&&(e.vx=e.vx/i*s,e.vy=e.vy/i*s),e.x+=e.vx,e.y+=e.vy,e.life-=1,t.beginPath(),t.moveTo(e.x-e.vx*2,e.y-e.vy*2),t.lineTo(e.x,e.y),t.strokeStyle=M(e.color,e.alpha*(e.life/e.maxLife)),t.lineWidth=1.5,t.stroke(),(e.x<0||e.x>m||e.y<0||e.y>p||e.life<=0)&&(e.x=Math.random()*m,e.y=Math.random()*p,e.vx=0,e.vy=0,e.life=Math.random()*e.maxLife*.5+e.maxLife*.5,e.color=F())}}else if(u==="vector"){t.clearRect(0,0,m,p);for(let o of b){if(o.x+=o.vx,o.y+=o.vy,(o.x<0||o.x>m)&&(o.vx*=-1),(o.y<0||o.y>p)&&(o.vy*=-1),f.active){let s=o.x-f.x,e=o.y-f.y,c=Math.sqrt(s*s+e*e);if(c<150){let a=(150-c)/150;o.x+=s/c*a*2*h,o.y+=e/c*a*2*h}}t.beginPath(),t.arc(o.x,o.y,o.r,0,Math.PI*2),t.fillStyle=M(o.color,.6),t.fill()}let r=120;for(let o=0;o<b.length;o++){let s=b[o];for(let e=o+1;e<b.length;e++){let c=b[e],a=s.x-c.x,i=s.y-c.y,x=Math.sqrt(a*a+i*i);if(x<r){let W=(1-x/r)*.25;t.beginPath(),t.moveTo(s.x,s.y),t.lineTo(c.x,c.y),t.strokeStyle=M(s.color,W),t.lineWidth=.8,t.stroke()}}if(f.active){let e=s.x-f.x,c=s.y-f.y,a=Math.sqrt(e*e+c*c);if(a<180){let i=(1-a/180)*.4;t.beginPath(),t.moveTo(s.x,s.y),t.lineTo(f.x,f.y),t.strokeStyle=M(s.color,i),t.lineWidth=1.2,t.stroke()}}}}else if(u==="dots"){t.clearRect(0,0,m,p);for(let r of b){let o=r.r+Math.sin(d*r.pulseSpeed+r.pulsePhase)*4;if(r.x+=r.vx,r.y+=r.vy,r.y+o<0&&(r.y=p+o,r.x=Math.random()*m),r.x+o<0&&(r.x=m+o),r.x-o>m&&(r.x=-o),f.active){let e=r.x-f.x,c=r.y-f.y,a=Math.sqrt(e*e+c*c);if(a<200){let i=(200-a)/200;r.x+=e/a*i*1.5*h,r.y+=c/a*i*1.5*h}}let s=t.createRadialGradient(r.x,r.y,0,r.x,r.y,o);s.addColorStop(0,M(r.color,.3)),s.addColorStop(.5,M(r.color,.1)),s.addColorStop(1,"rgba(0, 0, 0, 0)"),t.beginPath(),t.arc(r.x,r.y,o,0,Math.PI*2),t.fillStyle=s,t.fill()}}else if(u==="fractals"){t.clearRect(0,0,m,p),j+=.005*h;let r=j*.2,o=m/2,s=p/2,e=Math.min(m,p)*.12*(v/50+.5),c=v>65?8:v>35?6:5,a=v>75?7:v>35?6:5;for(let i=0;i<c;i++){let x=r+i*Math.PI*2/c;O(o,s,e,x,a,j)}}E=requestAnimationFrame(J)}function O(d,r,o,s,e,c){if(e===0)return;let a=d+Math.cos(s)*o,i=r+Math.sin(s)*o;t.lineWidth=e*.5,t.lineCap="round";let x=g[0]||S;if(g.length>1){let A=Math.min(g.length-1,Math.floor((1-e/7)*g.length));x=g[A]}t.strokeStyle=M(x,.08+e*.03),t.beginPath(),t.moveTo(d,r),t.lineTo(a,i),t.stroke();let W=o*.68,N=Math.sin(c*2+e)*.05,z=0;if(f.active){let A=f.x-a,H=f.y-i,K=Math.sqrt(A*A+H*H);K<250&&(z=(Math.atan2(H,A)-s)*.06*(1-K/250))}let _=.45+Math.sin(c*.5)*.05;O(a,i,W,s-_+N+z,e-1,c),O(a,i,W,s+_+N+z,e-1,c),e===1&&(t.beginPath(),t.arc(a,i,2,0,Math.PI*2),t.fillStyle=M(g[0]||S,.3),t.fill())}E=requestAnimationFrame(J)}function nt(){E&&(cancelAnimationFrame(E),E=null),L&&(L.disconnect(),L=null),I&&(window.removeEventListener("resize",I),I=null),k&&(window.removeEventListener("mousemove",k),k=null),q&&(window.removeEventListener("mouseleave",q),q=null)}document.addEventListener("nav",()=>{et()});document.addEventListener("render",()=>{et()});typeof window<"u"&&window.addCleanup&&window.addCleanup(()=>{nt()});\n';
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