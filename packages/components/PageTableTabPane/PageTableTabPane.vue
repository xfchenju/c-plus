<!--
 * @Description: 
 * @Author: chenju
 * @Date: 2022-03-18 18:25:58
 * @LastEditors: chenju
 * @LastEditTime: 2022-12-02 18:33:47
-->
<template>
  <div class="g-page-tab-pane__content" v-show="active">
    <slot name="default"></slot>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  inject,
  computed,
  watch,
  reactive,
  ref,
  markRaw
} from 'vue';

const COMPONENT_NAME = 'GPageTabPane';

export default defineComponent({
  name: 'GPageTabPane',
  components: {},
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    // console.log('slots', slots.default, slots.default());
    const instance = getCurrentInstance()!;
    const tabsRoot: any = inject('pageTabRootContext');
    if (!tabsRoot) console.error(COMPONENT_NAME, `must use with GPageTabs`);

    const loaded = ref(false);

    const index = ref<string>();

    const active = computed(() => tabsRoot.currentName.value === (props.name || index.value));

    const paneName = computed(() => props.name || index.value);

    watch(active, val => {
      if (val) loaded.value = true;
    });

    tabsRoot.updatePaneState(
      reactive({
        uid: instance.uid,
        instance: markRaw(instance),
        props,
        paneName,
        active,
        index
      })
    );

    return {
      loaded,
      active
    };
  }
});
</script>
<style lang="scss" scoped>
.g-page-tab-pane__content {
}
</style>
