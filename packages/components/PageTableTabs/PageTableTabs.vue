<!--
 * @Description: 
 * @Author: chenju
 * @Date: 2022-03-18 18:24:43
 * @LastEditors: chenju
 * @LastEditTime: 2022-12-01 11:15:16
-->
<template>
  <div class="g-page-tabs">
    <div class="g-page-tabs__header">
      <div class="g-page-tabs__header-left g-flex-start-center">
        <g-icon
          type="g-fanhui"
          class="g-cur-poi g-mr8"
          @click="handleGoBack"
          style="color: #000000"
          v-if="isBack"
        ></g-icon>
        <slot name="titleIcon"></slot>
        <slot name="title">
          <span class="header-title" v-if="title">{{ title }}</span>
        </slot>
        <div class="line" v-if="showLine"></div>
        <div
          class="tab"
          v-for="(item, index) in panes"
          :class="{ 'is-active': currentName == item.paneName }"
          @click="currentName = item.paneName"
          :key="index"
          >{{ item.paneName }}</div
        >
      </div>
      <div class="g-page-tabs__header-right g-flex-end-center">
        <slot name="titleRight"></slot>
      </div>
    </div>
    <!-- <div class="g-page-tabs__header g-flex-start-center">
      <span>{{ title }}</span>
      <el-tabs v-model="currentName" @tab-click="handleClick">
        <el-tab-pane
          :label="tabItem.paneName"
          :name="tabItem.paneName"
          v-for="(tabItem, tabIndex) in panes"
          :key="tabIndex"
        ></el-tab-pane>
      </el-tabs>
    </div> -->
    <div class="g-page-tabs__content">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  provide,
  ref,
  Fragment,
  // onUpdated,
  onMounted
} from 'vue';
import type { ComponentInternalInstance, Component, VNode } from 'vue';
// import { useRouter } from 'vue-router';

const getPaneInstanceFromSlot = (
  vnode: VNode,
  paneInstanceList: ComponentInternalInstance[] = []
) => {
  const children = (vnode.children || []) as ArrayLike<VNode>;
  Array.from(children).forEach(node => {
    let type = node.type;
    type = (type as Component).name || type;
    if (type === 'GPageTabPane' && node.component) {
      paneInstanceList.push(node.component);
    } else if (type === Fragment || type === 'template') {
      getPaneInstanceFromSlot(node, paneInstanceList);
    }
  });
  return paneInstanceList;
};

export default defineComponent({
  name: 'GPageTabs',
  components: {},
  props: {
    // 激活的tab的name
    active: {
      type: String,
      default: ''
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 是否有返回图标
    isBack: {
      type: Boolean,
      default: false
    },
    showLine: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:active'],
  setup(props, { slots, emit, expose }) {
    const instance = getCurrentInstance()!;

    const currentName = computed({
      get: () => {
        return props.active;
      },
      set: val => {
        emit('update:active', val);
      }
    });

    provide('pageTabRootContext', {
      currentName,
      updatePaneState: (pane: any) => (paneStatesMap[pane.uid] = pane)
    });

    const panes = ref<any[]>([]);

    const paneStatesMap: Record<number, any> = {};

    const updatePaneInstances = (isForceUpdate = false) => {
      if (slots.default) {
        const children = instance.subTree.children as ArrayLike<VNode>;
        console.log('instance', instance.subTree.children);
        const content = Array.from(children).find(
          ({ props }) => props?.class === 'g-page-tabs__content'
        );
        if (!content) return;

        const paneInstanceList: any[] = getPaneInstanceFromSlot(content).map(
          paneComponent => paneStatesMap[paneComponent.uid]
        );

        const panesChanged = !(
          paneInstanceList.length === panes.value.length &&
          paneInstanceList.every((pane, index) => pane.uid === panes.value[index].uid)
        );

        if (isForceUpdate || panesChanged) {
          panes.value = paneInstanceList;
        }
      } else if (panes.value.length !== 0) {
        panes.value = [];
      }

      for (let i in panes.value) {
        const pane = panes.value[i];
        console.log('pane', pane);
      }
    };

    // onUpdated(() => updatePaneInstances());
    onMounted(() => updatePaneInstances());

    const handleClick = (tab: string, event: Event) => {
      console.log(tab, event);
    };

    expose({
      currentName
    });

    // const router = useRouter();
    const handleGoBack = () => {
      console.log('handleGoBack 2')
      // router.go(-1);
    };

    return {
      currentName,
      panes,
      handleClick,

      handleGoBack
    };
  }
});
</script>
<style lang="scss" scoped>
.g-page-tabs {
  .g-page-tabs__header {
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    border-bottom: 1px solid #e4e7ed;
    background: #fff;
    padding: 0 24px;
    .header-title {
      font-size: 16px;
      font-weight: bold;
      color: #212529;
      line-height: 24px;
    }
    .line {
      width: 1px;
      height: 32px;
      background: #ebeef5;
      border-radius: 4px 4px 0px 0px;
      margin-left: 24px;
    }
    .tab {
      position: relative;
      min-width: 80px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #51596c;
      height: 56px;
      cursor: pointer;
      &.is-active {
        font-weight: bold;
        color: #212529;
      }
    }
    .tab::after {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      border-bottom: 2px solid #03ac82;
      transform: scale(0.0001);
      opacity: 0;
      transition: transform 0.15s cubic-bezier(0.215, 0.61, 0.355, 1),
        opacity 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);
      content: '';
    }
    .is-active::after {
      opacity: 1;
      transform: scale(1);
      transition: transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1),
        opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
}
</style>
