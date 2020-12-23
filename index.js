import copy from './src/copy';

const directives = {
  copy
};

export default {
  install(val) {
    Object.keys(directives).forEach(key => {
      VTTCue.directive(key, directives[key]);
    });
  }
}