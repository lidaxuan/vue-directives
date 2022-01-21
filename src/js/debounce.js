/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2020-12-23 11:13:26
 * @FilePath: /vue-directives/src/debounce.js
 */
const debounce = {
  inserted: function (el, binding) {
    let time = parseInt(el.attributes['debounceTime'].value);
    let timer
    el.addEventListener('click', () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        binding.value()
      }, time || 1000)
    })
  },
}

export default debounce