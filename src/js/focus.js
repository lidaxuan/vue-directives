/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-08-27 14:55:48
 * @FilePath: /vue-directives/src/focus.js
 */
const findEle = (parent, type) => {
  return parent.tagName.toLowerCase() === type ? parent : parent.querySelectorAll(type)
}

export default {
  inserted: function (el) {
    // 聚焦元素
    if (el.tagName == 'INPUT') {
      el.focus();
      return;
    }
    if (el.tagName == 'DIV') {
      let nodes = findEle(el, 'input');
      if (nodes && nodes.length) {
        nodes[0].focus();
      }
    }
  }
}