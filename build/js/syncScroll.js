function bindValue(e,t){t=Object.assign({},t.value||{});const l=t.type||"xy";t=t.target||"";const o=e,r=document.getElementById(t)||"";if(!t||!r)throw new Error("请设定target, target为要滚动目标元素的id");const n=(e.scrollWidth-e.clientWidth)/(r.scrollWidth-r.clientWidth)||1,s=(e.scrollHeight-e.clientHeight)/(r.scrollHeight-r.clientHeight)||1;if(("x"==l||"xy"==l||"yx"==l)&&NaN==n)return!1;if(("y"==l||"xy"==l||"yx"==l)&&NaN==s)return!1;let c;o.addEventListener("mouseover",()=>{c=!0}),r.addEventListener("mouseover",()=>{c=!1}),o.addEventListener("scroll",e=>{c&&("x"!=l&&"xy"!=l&&"yx"!=l||(r.scrollLeft=o.scrollLeft/n),"y"!=l&&"xy"!=l&&"yx"!=l||(r.scrollTop=o.scrollTop/s))},!0),r.addEventListener("scroll",e=>{c||("x"!=l&&"xy"!=l&&"yx"!=l||(o.scrollLeft=r.scrollLeft/n),"y"!=l&&"xy"!=l&&"yx"!=l||(o.scrollTop=r.scrollTop/s))},!0)}const syncScroll={bind(e,t){setTimeout(()=>{bindValue(e,t)},10)},unbind:function(e,t){t=Object.assign({},t.value||{}).target||"";const l=e;l.removeEventListener("mouseover"),l.removeEventListener("scroll");const o=document.getElementById(t)||"";t&&o&&(o.removeEventListener("mouseover"),o.removeEventListener("scroll"))}};export default syncScroll;