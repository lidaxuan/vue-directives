const copy={bind(l,{value:e}){l.$value=e,l.handler=()=>{if(l.$value){const e=document.createElement("textarea");e.readOnly=!0,e.style.position="absolute",e.style.left="-9999px",e.value=l.$value,document.body.appendChild(e),e.select(),document.execCommand("Copy")&&console.log("复制成功"),document.body.removeChild(e)}else console.log("无复制内容")},l.addEventListener("click",l.handler)},componentUpdated(e,{value:l}){e.$value=l},unbind(e){e.removeEventListener("click",e.handler)}};export default copy;