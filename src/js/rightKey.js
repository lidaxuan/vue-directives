/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-01-21 10:22:32
 * @FilePath: /vue-directives/Users/lidaxuan/Desktop/gulp/src/js/rightKey.js
 */

import Vue from "vue";
import ContextMenu from '../components/menu.vue';

function init() {
  function newInstance() {
    const Instance = new Vue({
      data() {
        return {
          list: [],
          style: {},
          visible: false,
          callback: void 0,
          data: void 0
        }
      },
      mounted() {
        document.addEventListener('click', this.hide);
      },
      methods: {
        show(list, style, cb, data) {
          this.list = list;
          this.style = style;
          this.visible = true;
          this.callback = cb;
          this.data = data;
        },
        hide() {
          this.visible = false;
        }
      },
      render(h) {
        return h(ContextMenu, {
          style: this.style,
          props: {
            visible: this.visible,
            list: this.list
          },
          on: {
            'itemClick': (e) => {
              this.hide();
              this.callback && this.callback(e.item, this.data);
            }
          },
        })
      },
      beforeDestroy() {
        document.removeEventListener('click', this.hide);
      },
    })
    const el = Instance.$mount();
    document.body.appendChild(el.$el);
    return el;
  }

  let instance = void 0;
  return function getInstance() {
    if (!instance) {
      instance = newInstance();
    }
    return instance;
  }
}

let instance = void 0;
export default {
  bind(el, binding) {
    function getInstance() {
      if (!instance) {
        instance = init()();
      }
    }
    getInstance();
    el.addEventListener('contextmenu', function (e) {
      const value = binding.value;
      let cb = void 0;
      for (const key in value) {
        if (typeof value[key] == 'function') {
          cb = value[key];
          break;
        }
      }
      instance.show(value.menuList, { left: `${e.pageX}px`, top: `${e.pageY}px` }, cb, value.data);
      e.preventDefault();
      e.stopPropagation();
    })
  },
  unbind(el) { }
}