<!--
 * @Description: 
 * @Author: chenju
 * @Date: 2022-02-14 18:05:50
 * @LastEditors: qingyang
 * @LastEditTime: 2022-11-21 13:47:27
-->
<template>
  <el-select
    ref="selectRef"
    v-model="selectValue"
    :style="selectStyles"
    @change="handleChange"
    v-bind="$attrs"
    @visible-change="handleVisibleChange"
  >
    <template #prefix v-if="$slots.prefix">
      <slot name="prefix"></slot>
    </template>
    <slot></slot>
  </el-select>
</template>
<script lang="ts">
import { defineComponent, computed, ref, toRefs, PropType } from 'vue';
export default defineComponent({
  name: 'GSelect',
  props: {
    value: {
      type: [Number, String]
    },
    propOptions: {
      type: Array as PropType<any[]>,
      default: () => {
        return [];
      }
    },
    autoWidth: {
      type: Boolean,
      default: false
    },
    defaultAutoWidth: {
      type: Number,
      default: 104
    },
    maxAutoWidth: {
      type: Number,
      default: 240
    }
  },
  emits: ['update:value', 'change', 'visible-change'],
  setup(props, { emit }) {
    const selectRef = ref();
    const selectValue = computed({
      get: () => {
        return props.value;
      },
      set: (val: any) => {
        emit('update:value', val);
      }
    });
    const getSelectName = (selectVal: any) => {
      if (selectVal) {
        const index = propOptions.value.findIndex((n: any) => n.value === selectVal);
        if (index > -1) {
          selectValueName.value = propOptions.value[index].label;
        }
      } else {
        selectValueName.value = '';
      }
      console.log('getSelectName after', selectValueName.value, selectValueName.value.length);
    };

    const selectValueName = ref('');
    if (props.autoWidth) {
      getSelectName(props.value);
    }

    const { propOptions } = toRefs(props);

    const selectStyles = computed(() => {
      if (!props.autoWidth) return {};
      const len = selectValueName.value ? getStrWidthLen(selectValueName.value) : 0;
      const calcWidth = props.defaultAutoWidth + (len - 4 < 0 ? 0 : len - 4) * 14;
      return {
        width: (calcWidth > props.maxAutoWidth ? props.maxAutoWidth : calcWidth) + 'px'
      };
    });
    const handleChange = (e: any) => {
      console.log('handleChange', e);
      if (props.autoWidth) {
        getSelectName(e);
      }
      emit('change', e);
    };

    function handleVisibleChange(...e: any) {
      emit('visible-change', ...e);
    }

    function getStrWidthLen(str: string): number {
      let totalLength = 0;
      let charCode;
      for (var i = 0; i < str.length; i++) {
        charCode = str.charCodeAt(i);
        // 单字节字符（数字、字母）
        if (charCode < 0x007f) {
          totalLength += 0.5;
        } else {
          totalLength += 1;
        }
      }
      return Math.ceil(totalLength);
    }
    const blur = () => {
      selectRef.value.blur();
    };
    return {
      selectValue,
      selectStyles,
      selectRef,
      handleChange,
      handleVisibleChange,
      blur
    };
  }
});
</script>
<style lang="scss" scoped></style>
