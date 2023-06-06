<!--
 * @descsription: 空状态
 * @Author: chenju
 * @Date: 2022-01-19 14:45:50
 * @LastEditors: chenju
 * @LastEditTime: 2022-11-30 18:35:30
-->
<template>
  <div class="no-task-container g-flex-center-center--column" :style="taskStyle">
    <!-- <img class="no-task-image" src="@/assets/images/no-task.png" /> -->
    <slot name="title">
      <span class="g-font-18n2500 g-mt12 g-mb8">{{ title }}</span>
    </slot>
    <slot name="tips">
      <span class="g-font-14n2">{{ tips }}</span>
    </slot>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
export default defineComponent({
  name: 'GNoTask',
  props: {
    height: {
      type: String,
      default: 'calc(100vh - 50px - 56px - 56px)'
    },
    title: {
      type: String,
      default: '当前页面暂无数据'
    },
    tips: {
      type: String,
      default: '请确保您已创建任务并导入数据'
    }
  },
  setup(props) {
    const taskStyle = computed(() => {
      return {
        height: props.height
      };
    });

    return {
      taskStyle
    };
  }
});
</script>
<style lang="scss" scoped>
.no-task-container {
  // height: calc(100vh - 50px - 56px - 56px);
}
.no-task-image {
  margin-top: -100px;
  width: 280px;
  height: 196px;
}
</style>
