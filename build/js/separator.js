export default{bind(e,t){let l=t.value,a=",";"object"==typeof t.value&&(l=t.value.num,a=t.value.separator||",");t=String(l).split(".");let n=t[0];t=1<t.length?"."+t[1]:"";const r=/(\d+)(\d{3})/;for(;r.test(n);)n=n.replace(r,"$1"+a+"$2");e.innerHTML=n+t}};