const findEle=(e,t)=>e.tagName.toLowerCase()===t?e:e.querySelectorAll(t);export default{inserted:function(t){if("INPUT"!=t.tagName){if("DIV"==t.tagName){let e=findEle(t,"input");e&&e.length&&e[0].focus()}}else t.focus()}};