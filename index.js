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
import emoji from './src/emoji';
import LazyLoad from './src/lazyLoad';
import waterMarker from './src/waterMarker';
import draggable from './src/draggable';
import Int from './src/int';
import focus from './src/focus';
import waves from './src/waves';
import resize from './src/resize';

const directives = {
  copy,
  longpress,
  debounce,
  emoji,
  LazyLoad,
  waterMarker,
  draggable,
  Int,
  focus,
  waves,
  resize
};

export default {
  install(Vue) {
    Object.keys(directives || {}).forEach(key => {
      Vue.directive(key, directives[key]);
    });
  }
}