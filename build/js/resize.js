const targetStyle={position:"relative"},common={position:"absolute",margin:"auto"},styleObj={t:{top:"-5px",left:0,right:"0",width:"100%",height:"10px",cursor:"n-resize"},l:{top:"0",left:"-5px",bottom:"0",width:"10px",height:"100%",cursor:"w-resize"},r:{top:"0",right:"-5px",bottom:0,width:"10px",height:"100%",cursor:"e-resize"},b:{left:0,right:0,bottom:"-5px",width:"100%",height:"10px",cursor:"s-resize"},tl:{width:"10px",height:"10px",top:"-5px",left:"-5px",cursor:"nw-resize"},tr:{width:"10px",height:"10px",top:"-5px",right:"-5px",cursor:"ne-resize"},bl:{width:"10px",height:"10px",bottom:"-5px",left:"-5px",cursor:"sw-resize"},br:{width:"10px",height:"10px",bottom:"-5px",right:"-5px",cursor:"se-resize"}};let dataType="",currentEvent=void 0;const resize={bind(i,t){const o=Object.assign({},{ele:i,max:{width:0,height:0},min:{width:0,height:0},speed:1,disabled:!1,move:{t:!0,l:!0,r:!0,b:!0,tl:!0,tr:!0,bl:!0,br:!0}},t.value||{});if(o.disabled)return;for(const p in targetStyle)i.style[p]=targetStyle[p];for(const a in styleObj)if(o.move[a]){var e=Object.assign({},styleObj[a],common);const x=document.createElement("div");for(const c in e)x.style[c]=e[c];x.setAttribute("data-type",a),i.addEventListener("mousedown",s),i.addEventListener("mouseup",n),i.appendChild(x)}function r(t){var e,r;o.disabled||({width:e,height:r}=h(i),e=parseInt(e),r=parseInt(r),d[dataType](t,e,r),currentEvent=t)}function n(t){console.log("抬起",t.target),document.body.removeEventListener("mousemove",r),document.body.style.cursor="default"}function h(t){return t.currentStyle||getComputedStyle(t,!1)}function s(t){var e=h(t.target)["cursor"];return dataType=t.target.getAttribute("data-type"),currentEvent=t,document.body.addEventListener("mousemove",r),document.body.style.cursor=e,t.preventDefault(),!1}document.body.addEventListener("mouseup",n);const d={r:function(t,e){var r;t.x>currentEvent.x?(r=e+(t.x-currentEvent.x)*o.speed,i.style.width=o.max.width?Math.min(o.max.width,r)+"px":r+"px"):(r=e-(currentEvent.x-t.x)*o.speed,i.style.width=o.min.width?Math.max(o.min.width,r)+"px":r+"px")},l:function(t,e){var r;t.x>currentEvent.x?(r=e-(t.x-currentEvent.x)*o.speed,i.style.width=o.min.width?Math.max(o.min.width,r)+"px":r+"px"):(r=e+(currentEvent.x-t.x)*o.speed,i.style.width=o.max.width?Math.min(o.max.width,r)+"px":r+"px")},t:function(t,e,r){var n;t.y>currentEvent.y?(n=r-(t.y-currentEvent.y)*o.speed,i.style.height=o.min.height?Math.max(o.min.height,n)+"px":n+"px"):(n=r+(currentEvent.y-t.y)*o.speed,i.style.height=o.max.height?Math.min(o.max.height,n)+"px":n+"px")},b:function(t,e,r){var n;t.y>currentEvent.y?(console.log(currentEvent.y),n=r+(t.y-currentEvent.y)*o.speed,i.style.height=o.max.height?Math.min(o.max.height,n)+"px":n+"px"):(n=r-(currentEvent.y-t.y)*o.speed,console.log(r,currentEvent.y,t.y),i.style.height=o.min.height?Math.max(o.min.height,n)+"px":n+"px")},br(t,e,r){this.common(t,e,r)},tl(t,e,r){this.common(t,e,r)},tr(t,e,r){this.common(t,e,r)},bl(t,e,r){this.common(t,e,r)},common(t,e,r){var n=dataType.split("");this[n[0]](t,e,r),this[n[1]](t,e,r)}}}};export default resize;