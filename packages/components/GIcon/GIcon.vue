<!--
 * @Description: 
 * @Author: qingyang
 * @Date: 2022-01-19 13:28:51
 * @LastEditors: chenju
 * @LastEditTime: 2022-11-30 18:42:11
-->
<template>
  <i class="g-icon">
    <svg class="icon svgfont" aria-hidden="true">
      <use :xlink:href="xlinkHref"></use>
    </svg>
  </i>
</template>

<script lang="ts">
import '../assets/iconfont/iconfont.js';
import { defineComponent, computed } from 'vue';
export default defineComponent({
  name: 'GIcon',
  props: {
    type: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const xlinkHref = computed(() => {
      return `#${props.type}`;
    });

    return {
      xlinkHref
    };
  }
});
</script>

<style scoped lang="scss">
.g-icon {
  font-size: 16px;
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>
