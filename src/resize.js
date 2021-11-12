/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-11-12 14:39:01
 * @FilePath: /vue-shelf/src/directives/resize.js
 */
const targetStyle = {
  position: 'relative',
};

const common = {
  position: 'absolute',
  margin: 'auto'
};
const styleObj = {
  t: {
    top: "-5px",
    left: 0,
    right: "0",
    width: "100%",
    height: "10px",
    cursor: "n-resize",
    /* 此光标指示矩形框的边缘可被向上（北）移动。 */
  },
  l: {
    top: '0',
    left: '-5px',
    bottom: '0',
    width: '10px',
    height: '100%',
    cursor: "w-resize",
    /** 此光标指示矩形框的边缘可被向左移动（西）。 */
  },
  r: {
    top: '0',
    right: '-5px',
    bottom: 0,
    width: '10px',
    height: '100%',
    cursor: "e-resize",
    /** 此光标指示矩形框的边缘可被向右（东）移动。 */
  },
  b: {
    left: 0,
    right: 0,
    bottom: '-5px',
    width: '100%',
    height: '10px',
    cursor: "s-resize",
    /** 此光标指示矩形框的边缘可被向下移动（南）。 */
  },
  tl: {
    width: '10px',
    height: '10px',
    top: '-5px',
    left: '-5px',
    cursor: "nw-resize",
    /** 此光标指示矩形框的边缘可被向上及向左移动（北/西）。 */
  },
  tr: {
    width: '10px',
    height: '10px',
    top: "-5px",
    right: "-5px",
    cursor: "ne-resize",
    /** 此光标指示矩形框的边缘可被向上及向右移动（北/东）。 */
  },
  bl: {
    width: '10px',
    height: '10px',
    bottom: '-5px',
    left: '-5px',
    cursor: "sw-resize",
    /** 此光标指示矩形框的边缘可被向下及向左移动（南/西）。 */
  },
  br: {
    width: '10px',
    height: '10px',
    bottom: '-5px',
    right: '-5px',
    cursor: 'se-resize',
    /** 此光标指示矩形框的边缘可被向下及向右移动（南/东）。 */
  }
}

let dataType = '';
let currentEvent = void 0;

const resize = {
  bind(el, binding) {
    const opts = Object.assign({}, {
      ele: el, // 波纹作用元素
      max: {
        width: 0,
        height: 0,
      },
      min: {
        width: 0,
        height: 0,
      },
      speed: 1,
      disabled: false,
      move: {
        t: true, // top
        l: true, // left
        r: true, // right
        b: true, // bottom
        tl: true, // top left
        tr: true, // top right
        bl: true, // bottom left
        br: true, // bottom right<br />}
      },
    }, binding.value || {})
    // 设置父级样式
    if (opts.disabled) {
      return;
    }
    for (const key in targetStyle) {
      el.style[key] = targetStyle[key];
    }
    // 循环创建dom
    for (const key in styleObj) {
      if (!opts.move[key]) {
        continue;
      }
      const styleQuery = Object.assign({}, styleObj[key], common);
      const dom = document.createElement('div');
      for (const styleKey in styleQuery) {
        dom.style[styleKey] = styleQuery[styleKey];
      }
      dom.setAttribute("data-type", key);
      el.addEventListener('mousedown', mousedownHanlder);
      el.addEventListener('mouseup', mouseupHanlder);
      el.appendChild(dom);
    }
    document.body.addEventListener('mouseup', mouseupHanlder); // 反方向 鼠标抬起
    // 鼠标移动
    function mousemoveHandler(e) {
      if (opts.disabled) {
        return;
      }
      let { width, height } = getStyle(el);
      width = parseInt(width);
      height = parseInt(height);
      functionObj[dataType](e, width, height);
      currentEvent = e; // 比较重要
    };
    // 鼠标抬起 移除事件
    function mouseupHanlder(e) {
      console.log('抬起', e.target);
      document.body.removeEventListener('mousemove', mousemoveHandler);
      document.body.style.cursor = 'default';
    };
    // 获取样式
    function getStyle(element) {
      if (element.currentStyle) {
        return element.currentStyle;
      } else {
        return getComputedStyle(element, false);
      }
    };
    // 鼠标按下
    function mousedownHanlder(e) {
      let { cursor } = getStyle(e.target);
      dataType = e.target.getAttribute('data-type');
      currentEvent = e;
      document.body.addEventListener('mousemove', mousemoveHandler);
      document.body.style.cursor = cursor;
      e.preventDefault();
      return false;
    };

    const functionObj = {
      r: function (e, width) {
        // 向右
        if (e.x > currentEvent.x) {
          const toRightWidth = width + (e.x - currentEvent.x) * opts.speed;
          el.style.width = opts.max.width ? `${Math.min(opts.max.width, toRightWidth)}px` : `${toRightWidth}px`;
        } else {
          // 向左
          const toLeftWidth = width - (currentEvent.x - e.x) * opts.speed;
          el.style.width = opts.min.width ? `${Math.max(opts.min.width, toLeftWidth)}px` : `${toLeftWidth}px`;
        }
      },
      l: function (e, width) {
        // 向右
        if (e.x > currentEvent.x) {
          const toRightWidth = width - (e.x - currentEvent.x) * opts.speed;
          el.style.width = opts.min.width ? `${Math.max(opts.min.width, toRightWidth)}px` : `${toRightWidth}px`;
        } else {
          // 向左
          const toLeftWidth = width + (currentEvent.x - e.x) * opts.speed;
          el.style.width = opts.max.width ? `${Math.min(opts.max.width, toLeftWidth)}px` : `${toLeftWidth}px`;
        }
      },
      t: function (e, width, height) {
        // 向上
        if (e.y > currentEvent.y) {
          const toTopHeight = height - (e.y - currentEvent.y) * opts.speed;
          el.style.height = opts.min.height ? `${Math.max(opts.min.height, toTopHeight)}px` : `${toTopHeight}px`;
        } else {
          const toBottomHeight = height + (currentEvent.y - e.y) * opts.speed;
          el.style.height = opts.max.height ? `${Math.min(opts.max.height, toBottomHeight)}px` : `${toBottomHeight}px`;
        }
      },
      b: function (e, width, height) {
        if (e.y > currentEvent.y) {
          console.log(currentEvent.y);
          const toTopHeight = height + (e.y - currentEvent.y) * opts.speed;
          el.style.height = opts.max.height ? `${Math.min(opts.max.height, toTopHeight)}px` : `${toTopHeight}px`;
        } else {
          const toBottomHeight = height - (currentEvent.y - e.y) * opts.speed;
          console.log(height, currentEvent.y, e.y);
          el.style.height = opts.min.height ? `${Math.max(opts.min.height, toBottomHeight)}px` : `${toBottomHeight}px`;
        }
      },
      br(e, width, height) {
        this.common(e, width, height);
      },
      tl(e, width, height) {
        this.common(e, width, height);
      },
      tr(e, width, height) {
        this.common(e, width, height);
      },
      bl(e, width, height) {
        this.common(e, width, height);
      },
      common(e, width, height) {
        const funcArr = dataType.split('');
        this[funcArr[0]](e, width, height);
        this[funcArr[1]](e, width, height);
      }
    };
  },
};
export default resize;