<template>
  <i class="c-icon" :style="style" v-bind="$attrs"><slot></slot></i>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { iconProps } from './icon'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'CIcon',
  inheritAttrs: false
})
const props = defineProps(iconProps)

const style = computed<CSSProperties>(() => {
  const { size, color } = props
  if (!size && !color) return {}

  return {
    fontSize: size + 'px',
    color: color,
  }
})
</script>
