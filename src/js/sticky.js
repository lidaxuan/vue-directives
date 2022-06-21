/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-06-21 10:55:04
 * @FilePath: /vue-directives/src/js/sticky.js
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-06-21 11:06:36
 */

/**
 * 思路：
 * 表格距离顶部的距离
 * 设置表格距离顶部多少就吸顶---offsetTop1
 * 获取滚动条滚动的距离
 * 当滚动条滚动 offsetTop1 后，表格就自动吸顶
 */
const tableStickyObj = {}

const __STICKY_TABLE = {
  // 给固定头设置样式
  doFix(dom, top, data) {
    const { uid, domType, isExist } = data
    const uObj = tableStickyObj[uid]
    const curObj = uObj[domType]
    const headerRect = tableStickyObj[uid].headerRect

    if (!isExist) {
      dom.style.position = 'fixed'
      dom.style.zIndex = '2001'
      dom.style.top = top + 'px'
    }
    uObj.tableWrapDom.style.marginTop = headerRect.height + 'px'

    if (domType === 'fixed') {
      dom.style.left = curObj.left + 'px'
    } else if (domType === 'fixedRight') {
      dom.style.left = curObj.left + 1 + 'px'
    }
  },
  // 给固定头取消样式
  removeFix(dom, data) {
    const { uid, domType } = data
    // dom.parentNode.style.paddingTop = 0
    const uObj = tableStickyObj[uid]
    const curObj = uObj[domType]
    dom.style.position = 'static'
    dom.style.top = '0'
    dom.style.zIndex = '0'

    uObj.tableWrapDom.style.marginTop = '0'

    if (domType === 'fixed') {
      curObj.dom.style.top = '0'
    } else if (domType === 'fixedRight') {
      curObj.dom.style.top = '0'
    }
  },
  // 给固定头添加class
  addClass(dom, fixtop, data) {
    fixtop = fixtop || 0
    const isExist = dom.classList.contains('fixed')
    data.isExist = !!isExist
    if (!isExist) { // 若有，就不再添加
      dom.classList.add('fixed')
    }
    this.doFix(dom, fixtop, data)
  },
  // 给固定头移除class
  removeClass(dom, data) {
    if (dom.classList.contains('fixed')) {
      dom.classList.remove('fixed')
      this.removeFix(dom, data)
    }
  },

  /**
   * 计算某元素距离相对父元素的top距离
   * @param {Nodes} e 某元素
   * @param {String} domId 父元素id
   * @param {Boolean} isParent 是否父元素
   * @returns {Number}
   */
  getPosY(el, domId) {
    let offset = 0
    const pDom = el.offsetParent
    if (pDom != null && '.' + el.id !== domId) {
      offset = el.offsetTop
      offset += this.getPosY(pDom, domId)
    }
    return offset
  },

  // 获取元素的横坐标（相对于窗口）
  getPosX(e) {
    var offset = e.offsetLeft
    if (e.offsetParent != null) offset += this.getPosX(e.offsetParent)
    return offset
  },
  fixHead(scrollDom, el, uid, binding) {
    this.fixHead1(this, { scrollDom, el, uid, binding })
  },
  // 具体判断是否固定头的主函数
  fixHead1: sticky_throttle((_this, { scrollDom, el, uid, binding }) => {
    const top = binding.value.top || 0;
    /**
     * myTop 当前元素距离滚动父容器的高度，
     * fixtop 当前元素需要设置的绝对定位的高度
     * parentHeight 滚动父容器的高度
     */
    // 表头DOM节点
    // const headerWrapDom = el.children[1] // el-table__header-wrapper
    const headerWrapDom = el.querySelector('.el-table__header-wrapper') // el-table__header-wrapper
    const headerTop = tableStickyObj[uid].headerRect.top
    const scrollTop = scrollDom.scrollTop
    const fixedHeadDom = tableStickyObj[uid].fixed.headerDom
    const fixedHeadRightDom = tableStickyObj[uid].fixedRight.headerDom
    if (scrollTop >= headerTop) {
      const fixtop = top + scrollDom.getBoundingClientRect().top
      // 如果表头滚动到 父容器顶部了。fixed定位
      _this.addClass(headerWrapDom, fixtop, { domType: 'mainBody', uid })
      fixedHeadDom && _this.addClass(fixedHeadDom, fixtop, { domType: 'fixed', uid })
      fixedHeadRightDom && _this.addClass(fixedHeadRightDom, fixtop, { domType: 'fixedRight', uid })
    } else {
      // 如果表格向上滚动 又滚动到父容器里。取消fixed定位
      _this.removeClass(headerWrapDom, { domType: 'mainBody', uid })
      fixedHeadDom && _this.removeClass(fixedHeadDom, { domType: 'fixed', uid })
      fixedHeadRightDom && _this.removeClass(fixedHeadRightDom, { domType: 'fixedRight', uid })
    }
  }, 100, { eventType: 'fixHead111' }),
  //
  setHeadWidth(data) {
    this.setHeadWidth1(this, data)
  },
  // 设置头部固定时表头外容器的宽度写死为表格body的宽度
  setHeadWidth1: sticky_debounce((_this, data) => {
    const { el, uid, binding, eventType } = data
    const { scrollDom } = tableStickyObj[uid]
    // const headerWrapDom = el.children[1] // el-table__header-wrapper
    const headerWrapDom = el.querySelector('.el-table__header-wrapper') // el-table__header-wrapper
    // const headerH = headerWrapDom.offsetHeight
    const headerH = headerWrapDom.getBoundingClientRect().height
    const distTop = _this.getPosY(headerWrapDom, binding.value.parent) - 125
    // const distTop = headerWrapDom.getBoundingClientRect().height
    // const distTop = 0
    const scrollDistTop = _this.getPosY(scrollDom) // 滚动条距离顶部的距离
    tableStickyObj[uid].headerRect.top = distTop + headerH - scrollDistTop / 3 // 表头距离顶部的距离 - 表头自身高度 - 滚动条距离顶部的距离
    tableStickyObj[uid].headerRect.height = headerH
    // tableStickyObj[uid].headerRect.width = tableW

    // debugger
    // fixed left/right header
    // 确保每次刷新，只获取一次
    // tableStickyObj[uid].fixed.dom = ''
    _this.initFixedWrap({ el, uid, eventType, key: 'fixed', className: 'el-table__fixed', className1: 'el-table__fixed-header-wrapper' })
    _this.initFixedWrap({ el, uid, eventType, key: 'fixedRight', className: 'el-table__fixed-right', className1: 'el-table__fixed-header-wrapper' })

    // debugger
    // 获取到当前表格个表格body的宽度
    const bodyWrapperDom = el.getElementsByClassName('el-table__body-wrapper')[0]
    const width = getComputedStyle(bodyWrapperDom).width
    // 给表格设置宽度。这里默认一个页面中的多个表格宽度是一样的。所以直接遍历赋值，也可以根据自己需求，单独设置
    const tableParent = el.getElementsByClassName('el-table__header-wrapper')
    for (let i = 0; i < tableParent.length; i++) {
      tableParent[i].style.width = width
    }
    // debugger
    _this.fixHead(scrollDom, el, uid, binding) // 判断顶部是否已吸顶的一个过程
  }),

  initFixedWrap(data) {
    const { key, el, eventType, className, className1, uid } = data
    // 确保每次刷新，只获取一次
    if (eventType === 'resize' || !tableStickyObj[uid][key].dom) {
      const tableFixedDom = el.getElementsByClassName(className)
      if (tableFixedDom.length) {
        const fixedDom = tableFixedDom[0]
        const arr = fixedDom.getElementsByClassName(className1) //
        const headW = getComputedStyle(fixedDom).width

        tableStickyObj[uid][key].dom = fixedDom
        if (arr.length) {
          const distLeft = this.getPosX(fixedDom) // 距离窗口左侧的距离
          const headDom = arr[0]
          headDom.style.width = headW
          tableStickyObj[uid][key].left = distLeft // 距离窗口左边像素

          if (key === 'fixedRight') { // right-fixed 的特别之处
            headDom.classList.add('scroll-bar-h0')
            headDom.style.overflow = 'auto'
            headDom.scrollLeft = headDom.scrollWidth
            headDom.style.overflow = 'hidden' // 设置了滚动到最后，设置不可滚动
          } else {
            headDom.style.overflow = 'hidden'
          }

          tableStickyObj[uid][key].headerDom = headDom // 取第一个
        }
      }
    }
  },

  // 监听父级的某些变量（父级一定要有才能被监听到）
  watched({ el, binding, vnode, uid }) {
    // 监听左侧导航栏是否折叠
    vnode.context.$watch('isNavFold', (val) => {
      vnode.context.$nextTick(() => {
        setTimeout(() => {
          // debugger
          this.setHeadWidth({ el, uid, binding, eventType: 'resize' })
        }, 200)
      })
    })
  }

}

/**
 * 节流函数: 指定时间间隔内只会执行一次任务
 * @param {function} fn
 * @param {Number} interval
 */
function sticky_throttle(fn, interval = 300) {
  let canRun = true
  return function () {
    if (!canRun) return
    canRun = false
    setTimeout(() => {
      fn.apply(this, arguments)
      canRun = true
    }, interval)
  }
}

/**
 * 防抖: 指定时间间隔内只会执行一次任务，并且该时间段内再触发，都会重新计算时间。(函数防抖的非立即执行版)
 * 在频繁触发某些事件，导致大量的计算或者非常消耗资源的操作的时候，防抖可以强制在一段连续的时间内只执行一次
 * */
function sticky_debounce(fn, delay, config) {
  const _delay = delay || 200
  config = config || {}
  // const _this = this // 该this指向common.js
  return function () {
    const th = this // 该this指向实例
    const args = arguments
    // debounceNum++
    // let str = `, label: ${th && th.listItem && th.listItem.label}`
    if (fn.timer) {
      clearTimeout(fn.timer)
      fn.timer = null
    } else {
      // fn.debounceNum = debounceNum
    }
    fn.timer = setTimeout(function () {
      // str = `, label: ${th && th.listItem && th.listItem.label}`
      fn.timer = null
      fn.apply(th, args)
    }, _delay)
  }
}

// 全局注册 自定义事件


export default {
  name: 'sticky',
  // 当被绑定的元素插入到 DOM 中时……
  inserted(el, binding, vnode) {
    // 获取当前vueComponent的ID。作为存放各种监听事件的key
    const uid = vnode.componentInstance._uid
    // 获取当前滚动的容器是什么。如果是document滚动。则可默认不传入parent参数
    const scrollDom = document.querySelector(binding.value.parent) || document.body // TODO:得考虑没有 binding.value.parent 的情况，重新登录直接进到内页会出现
    if (!tableStickyObj[uid]) {
      tableStickyObj[uid] = {
        uid,
        fixFunObj: {}, // 用于存放滚动容器的监听scroll事件
        setWidthFunObj: {}, // 用于存放页面resize后重新计算head宽度事件
        autoMoveFunObj: {}, // 用户存放如果是DOM元素内局部滚动时，document滚动时，fix布局的表头也需要跟着document一起向上滚动
        scrollDomRect: {},
        headerRect: { top: 0, left: 0 },
        fixed: {}, // 表格左浮动
        fixedRight: {}, // 表格右浮动
        // binding,
        // el,
        tableWrapDom: el.getElementsByClassName('el-table__body-wrapper')[0],
        scrollDom
      }
    }

    __STICKY_TABLE.watched({ el, binding, vnode, uid }) // 监听父级的某些变量

    // 当window resize时 重新计算设置表头宽度，并将监听函数存入 监听函数对象中，方便移除监听事件
    window.addEventListener('resize', (tableStickyObj[uid].setWidthFunObj = () => {
      __STICKY_TABLE.setHeadWidth({ el, uid, binding, eventType: 'resize' }) // 首先设置表头宽度
    })
    )

    // 给滚动容器加scroll监听事件。并将监听函数存入 监听函数对象中，方便移除监听事件
    scrollDom.addEventListener('scroll', (tableStickyObj[uid].fixFunObj = (e) => {
      __STICKY_TABLE.fixHead(scrollDom, el, uid, binding)
    }))
  },





  // component 更新后。重新计算表头宽度
  componentUpdated(el, binding, vnode) {
    const uid = vnode.componentInstance._uid
    __STICKY_TABLE.setHeadWidth({ el, uid, binding, eventType: 'componentUpdated' })
  },
  // 节点取消绑定时 移除各项监听事件。
  unbind(el, binding, vnode) {
    const uid = vnode.componentInstance._uid
    window.removeEventListener('resize', tableStickyObj[uid].setWidthFunObj)
    const scrollDom = document.querySelector(binding.value.parent) || document
    scrollDom.removeEventListener('scroll', tableStickyObj[uid].fixFunObj)
    if (binding.value.parent) {
      document.removeEventListener('scroll', tableStickyObj[uid].autoMoveFunObj)
    }
  }
}