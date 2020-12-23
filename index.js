import copy from './src/copy';
import longpress from './src/longpress';
import debounce from './src/debounce';
import emoji from './src/emoji';
import LazyLoad from './src/lazyLoad';
import waterMarker from './src/waterMarker';
import draggable from './src/draggable';

const directives = {
  copy,
  longpress,
  debounce,
  emoji,
  LazyLoad,
  waterMarker,
  draggable
};

export default {
  install(Vue) {
    Object.keys(directives).forEach(key => {
      Vue.directive(key, directives[key]);
    });
  }
}