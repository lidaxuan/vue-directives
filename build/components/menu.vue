<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-01-20 15:01:08
 * @FilePath: /vue-shelf/src/components/menu.vue
-->
<template>
  <div v-show="visible" class="ldx-context-menu">
    <div v-for="(item, index) in list" :key="index" class="ldx-context-menu-item" @click.stop="$emit('itemClick', { item })">
      <span>{{ item.text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContextMenu',
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.ldx-context-menu {
  position: absolute;
  z-index: 999;
  background-color: #fff;
  box-shadow: 0 3px 6px 0 rgba(51, 51, 51, 0.2);
  padding: 10px 0;
  border-radius: 5px;
  min-width: 90px;
  &-item {
    line-height: 34px;
    font-size: 14px;
    padding: 0 20px;
    white-space: nowrap;
    color: #606266;
    &:hover {
      color: #6a7eed;
      background-color: #f5f6f7;
      cursor: pointer;
    }
  }
}
</style>
