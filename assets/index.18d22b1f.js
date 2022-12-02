var a=Object.defineProperty;var p=(c,s,i)=>s in c?a(c,s,{enumerable:!0,configurable:!0,writable:!0,value:i}):c[s]=i;var r=(c,s,i)=>(p(c,typeof s!="symbol"?s+"":s,i),i);(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))e(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const h of o.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&e(h)}).observe(document,{childList:!0,subtree:!0});function i(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(n){if(n.ep)return;n.ep=!0;const o=i(n);fetch(n.href,o)}})();const t={physicsAccuracy:3,mouseInfluence:20,mouseCut:2,gravity:1200,clothHeight:60,clothWidth:100,startY:20,spacing:7,tearDistance:60,canvas:null,ctx:null,cloth:null,boundsx:null,boundsy:null,mouse:{down:!1,button:1,x:0,y:0,px:0,py:0}};class y{constructor(s,i){r(this,"length");this.p1=s,this.p2=i,this.length=t.spacing}resolve(){const s=this.p1.x-this.p2.x,i=this.p1.y-this.p2.y,e=Math.sqrt(s*s+i*i),n=(this.length-e)/e;e>t.tearDistance&&this.p1.removeConstraint(this);const o=s*n*.5,h=i*n*.5;this.p1.x+=o,this.p1.y+=h,this.p2.x-=o,this.p2.y-=h}draw(){t.ctx&&(t.ctx.moveTo(this.p1.x,this.p1.y),t.ctx.lineTo(this.p2.x,this.p2.y))}}class d{constructor(s,i){r(this,"vx",0);r(this,"vy",0);r(this,"px");r(this,"py");r(this,"pinX",null);r(this,"pinY",null);r(this,"constraints",[]);this.x=s,this.y=i,this.px=this.x,this.py=this.y}update(s){if(t.mouse.down){const n=this.x-t.mouse.x,o=this.y-t.mouse.y,h=Math.sqrt(n*n+o*o);t.mouse.button==1?h<t.mouseInfluence&&(this.px=this.x-(t.mouse.x-t.mouse.px)*1.8,this.py=this.y-(t.mouse.y-t.mouse.py)*1.8):h<t.mouseCut&&(this.constraints=[])}this.addForce(0,t.gravity),s*=s;const i=this.x+(this.x-this.px)*.99+this.vx/2*s,e=this.y+(this.y-this.py)*.99+this.vy/2*s;this.px=this.x,this.py=this.y,this.x=i,this.y=e,this.vy=this.vx=0}draw(){if(!this.constraints.length)return;let s=this.constraints.length;for(;s--;)this.constraints[s].draw()}resolveConstraints(){var i,e,n,o;if(this.pinX!=null&&this.pinY!=null){this.x=this.pinX,this.y=this.pinY;return}let s=this.constraints.length;for(;s--;)this.constraints[s].resolve();this.x>((i=t.boundsx)!=null?i:0)?this.x=2*((e=t.boundsx)!=null?e:0)-this.x:1>this.x&&(this.x=2)-this.x,this.y<1?this.y=2-this.y:this.y>((n=t.boundsy)!=null?n:0)&&(this.y=2*((o=t.boundsy)!=null?o:0)-this.y)}attach(s){this.constraints.push(new y(this,s))}removeConstraint(s){this.constraints.splice(this.constraints.indexOf(s),1)}addForce(s,i){this.vx+=s,this.vy+=i;const e=400;this.vx=~~(this.vx*e)/e,this.vy=~~(this.vy*e)/e}pin(s,i){this.pinX=s,this.pinY=i}}class x{constructor(){r(this,"points",[]);if(t.canvas){const s=t.canvas.width/2-t.clothWidth*t.spacing/2;for(let i=0;i<=t.clothHeight;i++)for(let e=0;e<=t.clothWidth;e++){const n=new d(s+e*t.spacing,t.startY+i*t.spacing);e!=0&&n.attach(this.points[this.points.length-1]),i==0&&n.pin(n.x,n.y),i!=0&&n.attach(this.points[e+(i-1)*(t.clothWidth+1)]),this.points.push(n)}}}update(){let s=t.physicsAccuracy;for(;s--;){let i=this.points.length;for(;i--;)this.points[i].resolveConstraints()}for(s=this.points.length;s--;)this.points[s].update(.016)}draw(){if(t.ctx&&t.cloth){t.ctx.beginPath();let s=t.cloth.points.length;for(;s--;)t.cloth.points[s].draw();t.ctx.stroke()}}}function u(){if(t.canvas&&t.ctx&&t.cloth){const{width:c,height:s}=t.canvas;t.ctx.clearRect(0,0,c,s),t.cloth.update(),t.cloth.draw()}requestAnimationFrame(u)}function f(){const{canvas:c,ctx:s}=t;if(c&&s){const i=h=>{t.mouse.button=h.which,t.mouse.px=t.mouse.x,t.mouse.py=t.mouse.y;const l=t.canvas.getBoundingClientRect();t.mouse.x=h.clientX-l.left,t.mouse.y=h.clientY-l.top,t.mouse.down=!0,h.preventDefault()},e=h=>{t.mouse.down=!1,h.preventDefault()},n=h=>{t.mouse.px=t.mouse.x,t.mouse.py=t.mouse.y;const l=t.canvas.getBoundingClientRect();t.mouse.x=h.clientX-l.left,t.mouse.y=h.clientY-l.top,h.preventDefault()},o=h=>{h.preventDefault()};c.onmouseup=e,c.onmousemove=n,c.onmousedown=i,c.oncontextmenu=o,t.boundsx=c.width-1,t.boundsy=c.height-1,s.strokeStyle="#666"}t.cloth=new x,u()}onload=()=>{t.canvas=document.querySelector("canvas"),t.canvas&&(t.ctx=t.canvas.getContext("2d"),t.canvas.width=1160,t.canvas.height=700),f()};