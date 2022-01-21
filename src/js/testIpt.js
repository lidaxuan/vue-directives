/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2020-12-23 11:17:24
 * @FilePath: /vue-directives/src/emoji.js
 */

const findEle = (parent, type) => {
  return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type)
}


const map = {
  emoji: /[^u4E00-u9FA5|d|a-zA-Z|rns,.?!，。？！…—&$=()-+/*{}[]]|s/g,
  email: /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/, // 邮政编码
  prot: /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/,
  video: /^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/i,
  time: /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,
  fraction: /^150$|^(?:\d|[1-9]\d|1[0-4]\d)(?:\.5)?$/,
  floatingPointNumber: /^(-?\d+)(\.\d+)?$/, // 浮点数 例如 1.5
  integer: /^-?[0-9]\d*$/, // 整数 -213 123
  positiveInteger: /^\+?[1-9]\d*$/, // 正整数 不含0
  url: /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-\(\)]*[\w@?^=%&/~+#-\(\)])?$/, // 例如: www.aa.com || https://aa.com || http://aa.com || https://aa.com/search/name/a 
  version: /^\d+(?:\.\d+){2}$/, // 例如: x:y:z
  strAndNumber: /^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|(\d))+$/ // 中文和数字
}

const emoji = {
  bind: function (el, binding, vnode) {
    // 正则规则可根据需求自定义
    const name = binding.rawName.split('.')[1] || '';
    let regRule = new RegExp(map[name] ? map[name] : /./g);
    let $ipt = findEle(el, 'input');
    const handle = function () {
      const val = $ipt.value;
      if (!regRule.test(val)) {
        binding.value(false);
      } else {
        binding.value(true);
      }
    }
    $ipt.addEventListener('blur', handle)
  },
}

export default emoji