/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2020-12-23 09:51:57
 * @FilePath: /vue-directives/Users/lidaxuan/Desktop/gulp/src/index.js
 */
// import copy from './src/copy';
// import longpress from './src/longpress';
// import debounce from './src/debounce';
// import testIpt from './src/testIpt';
// import lazyLoad from './src/lazyLoad';
// import waterMarker from './src/waterMarker';
// import draggable from './src/draggable';
// import int from './src/int';
// import focus from './src/focus';
// import waves from './src/waves';
// import resize from './src/resize';
// import separator from './src/separator';

// const directives = {
//   copy,
//   longpress,
//   debounce,
//   testIpt,
//   lazyLoad,
//   waterMarker,
//   draggable,
//   int,
//   focus,
//   waves,
//   resize,
//   separator
// };


let directives = {};

// 自动加载该目录下的所有文件
const files = require.context('./js', true, /\.(js)$/);

// 根据文件名组织模块对象
files.keys().map(src => {
  const match = src.match(/\/(.+)\./);
  if (match && match.length >= 1) {
    const name = match[1];
    const moduleValue = files(src);
    if (moduleValue.default) {
      directives[name] = moduleValue.default;
    }
  }
});

export default {
  install(Vue) {
    Object.keys(directives || {}).forEach(key => {
      Vue.directive(key, directives[key]);
    });
  }
}