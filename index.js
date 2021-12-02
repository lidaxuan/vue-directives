/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2020-12-23 09:51:57
 * @FilePath: /vue-directives/index.js
 */
import copy from './src/copy';
import longpress from './src/longpress';
import debounce from './src/debounce';
import testIpt from './src/testIpt';
import lazyLoad from './src/lazyLoad';
import waterMarker from './src/waterMarker';
import draggable from './src/draggable';
import int from './src/int';
import focus from './src/focus';
import waves from './src/waves';
import resize from './src/resize';
import separator from './src/separator';

const directives = {
  copy,
  longpress,
  debounce,
  testIpt,
  lazyLoad,
  waterMarker,
  draggable,
  int,
  focus,
  waves,
  resize,
  separator
};

export default {
  install(Vue) {
    Object.keys(directives || {}).forEach(key => {
      Vue.directive(key, directives[key]);
    });
  }
}