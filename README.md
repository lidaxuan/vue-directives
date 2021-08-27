# vue-directives
vue自定义指令
`main.js`

```js
import Vue from 'vue'
import Directives from '@lijixuan/vue-customdirectives';
Vue.use(Directives)
```
1. `v-copy`
需求：

实现一键复制文本内容，用于鼠标右键粘贴。
```js
<template>
  <button v-copy="copyText">复制按钮</button>
</template>

<script> export default {
    data() {
      return {
        copyText: '我是李大玄!',
      }
    },
  }
</script>
```

2. `v-longpress`
需求：
实现长按，用户需要按下并按住按钮几秒钟，触发相应的事件
思路：
创建一个计时器， 2 秒后执行函数
当用户按下按钮时触发 mousedown 事件，启动计时器；用户松开按钮时调用 mouseout 事件。
如果 mouseup 事件 2 秒内被触发，就清除计时器，当作一个普通的点击事件
如果计时器没有在 2 秒内清除，则判定为一次长按，可以执行关联的函数。
在移动端要考虑 touchstart，touchend 事件

新增长按时间, 不传默认是 2000 毫秒
```js
<template>
  <button v-longpress="longpress" lp-time="2000">长按</button>
</template>

<script> 
export default {
  methods: {
    longpress () {
      alert('长按指令生效!')
    }
  }
} 
</script>
```

3. `v-debounce`
背景：
在开发中，有些提交保存按钮有时候会在短时间内被点击多次，这样就会多次重复请求后端接口，造成数据的混乱，比如新增表单的提交按钮，多次点击就会新增多条重复的数据。

需求：
防止按钮在短时间内被多次点击，使用防抖函数限制规定时间内只能点击一次。  时间可以自定义 不传默认是 1000 毫秒
```js
<template>
  <button v-debounce="debounceClick" debounceTime="2000">防抖</button>
</template>

<script> 
export default {
  methods: {
    debounceClick () {
      console.log('只触发一次')
    }
  }
} 
</script>
```

4. `v-emoji`
背景：
开发中遇到的表单输入，往往会有对输入内容的限制，比如不能输入表情和特殊字符，只能输入数字或字母等。
我们常规方法是在每一个表单的 on-change 事件上做处理。


```js
<template>
  <input type="text" v-model="note" @change="vaidateEmoji" />
</template>

<script>
export default {
  methods: {
    vaidateEmoji() {
      var reg = /[^u4E00-u9FA5|d|a-zA-Z|rns,.?!，。？！…—&$=()-+/*{}[]]|s/g
      this.note = this.note.replace(reg, '')
    },
  },
}
</script>
```

4. `v-LazyLoad`
背景：在类电商类项目，往往存在大量的图片，如 banner 广告图，菜单导航图，美团等商家列表头图等。图片众多以及图片体积过大往往会影响页面加载速度，造成不良的用户体验，所以进行图片懒加载优化势在必行。

需求：实现一个图片懒加载指令，只加载浏览器可见区域的图片。

思路：
图片懒加载的原理主要是判断当前图片是否到了可视区域这一核心逻辑实现的
拿到所有的图片 Dom ，遍历每个图片判断当前图片是否到了可视区范围内
如果到了就设置图片的 src 属性，否则显示默认图片
图片懒加载有两种方式可以实现，一是绑定 srcoll 事件进行监听，二是使用 IntersectionObserver 判断图片是否到了可视区域，但是有浏览器兼容性问题。
下面封装一个懒加载指令兼容两种方法，判断浏览器是否支持 IntersectionObserver API，如果支持就使用 IntersectionObserver 实现懒加载，否则则使用 srcoll 事件监听 + 节流的方法实现

```js
<template>
  <img v-LazyLoad="xxx.jpg" />
</template>
```

6. `v-waterMarker`
需求：给整个页面添加背景水印
思路：
使用 canvas 特性生成 base64 格式的图片文件，设置其字体大小，颜色等。
将其设置为背景图片，从而实现页面或组件水印效果
```
<template>
  <div v-waterMarker="{text:'lzg版权所有',textColor:'rgba(180, 180, 180, 0.4)'}"></div>
</template>
```

7. `v-draggable`
需求：
实现一个拖拽指令，可在页面可视区域任意拖拽元素。

思路：
设置需要拖拽的元素为相对定位，其父元素为绝对定位。
鼠标按下(onmousedown)时记录目标元素当前的 left 和 top 值。
鼠标移动(onmousemove)时计算每次移动的横向距离和纵向距离的变化值，并改变元素的 left 和 top 值
鼠标松开(onmouseup)时完成一次拖拽
```
<template>
  <div class="el-dialog" v-draggable></div>
</template>
```

8. `v-Int`
需求:
实现一个input只能输入正整数 0 除外
```html
<el-input v-model="input" v-Int></el-input>
```

9. `v-focus`
需求:
实现一个input自动获取焦点
```html
<el-input v-model="input" v-Int v-focus></el-input>
```