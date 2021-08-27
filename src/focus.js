/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-08-27 14:55:48
 * @FilePath: /vue-directives/src/focus.js
 */
export default {
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
}