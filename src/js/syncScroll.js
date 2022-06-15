/*
 * @Description: 同步滚动
 * @Author: 李大玄
 * @Date: 2022-06-15 18:27:26
 * @FilePath: /vue-directives/src/js/syncScroll.js
 */

function bindValue(el, binding) {
  // console.log(el, binding);
  const value = Object.assign({}, binding.value || {});
  const type = value.type || 'xy';
  const target = value.target || '';

  const sourceDom = el;
  const targetDom = document.getElementById(target) || "";
  // console.log(el, targetDom);
  if (!target || !targetDom) {
    throw new Error("请设定target, target为要滚动目标元素的id"); //Error要大写
  }

  // x 滚动比例计算
  const sourceWidth = el.scrollWidth - el.clientWidth;
  const targetWidth = targetDom.scrollWidth - targetDom.clientWidth;
  const proportionW = (sourceWidth / targetWidth) || 1;
  // y 滚动比例计算
  const sourceHeight = el.scrollHeight - el.clientHeight;
  const targetHeight = targetDom.scrollHeight - targetDom.clientHeight;
  const proportionH = (sourceHeight / targetHeight) || 1;
  // console.log(proportionW, proportionH);
  if ((type == 'x' || type == 'xy' || type == 'yx') && proportionW == NaN) {
    // console.log(1);
    return false
  }
  if ((type == 'y' || type == 'xy' || type == 'yx') && proportionH == NaN) {
    // console.log(2);
    return false
  }

  /**
   * @description: 判断当前鼠标在那个 dom 中 不然会相对滚动
   * @param {*}
   * @return {*}
   */
  let flag;
  sourceDom.addEventListener('mouseover', () => {
    flag = true;
  });
  targetDom.addEventListener('mouseover', () => {
    flag = false;
  });


  sourceDom.addEventListener('scroll', (e) => {
    if (!flag) {
      return;
    }
    if (type == "x" || type == 'xy' || type == 'yx') {
      targetDom.scrollLeft = sourceDom.scrollLeft / proportionW;
    }
    if (type == 'y' || type == 'xy' || type == 'yx') {
      targetDom.scrollTop = sourceDom.scrollTop / proportionH;
    }
  }, true);
  targetDom.addEventListener('scroll', (e) => {
    if (flag) {
      return;
    }
    if (type == "x" || type == 'xy' || type == 'yx') {
      sourceDom.scrollLeft = targetDom.scrollLeft / proportionW;
    }
    if (type == 'y' || type == 'xy' || type == 'yx') {
      sourceDom.scrollTop = targetDom.scrollTop / proportionH;
    }
  }, true);
}

const syncScroll = {

  bind(el, binding) {
    setTimeout(() => {
      bindValue(el, binding)
    }, 10);
    // span.getBoundingClientRect().width

    return;
  },
  unbind: function (el, binding) {
    const value = Object.assign({}, binding.value || {});
    const target = value.target || '';

    const sourceDom = el;
    sourceDom.removeEventListener('mouseover');
    sourceDom.removeEventListener('scroll');
    const targetDom = document.getElementById(target) || "";
    if (!target || !targetDom) {
      return;
    }
    targetDom.removeEventListener('mouseover');
    targetDom.removeEventListener('scroll');
  },
}
export default syncScroll;