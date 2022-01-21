/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-12-01 17:31:25
 * @FilePath: /vue-shelf/src/directives/separator.js
 */
export default {
  bind(el, binding) {
    let num = binding.value;
    let separator = ',';
    if (typeof binding.value == 'object') {
      num = binding.value.num;
      separator = binding.value.separator || ',';
    }
    const numArr = String(num).split('.');
    let x1 = numArr[0];
    const x2 = numArr.length > 1 ? '.' + numArr[1] : '';
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + separator + '$2');
    }
    el.innerHTML = x1 + x2;
  }
}