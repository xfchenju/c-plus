/*
 * @Description: page table hooks
 * @Author: chenju
 * @Date: 2022-01-17 10:35:32
 * @LastEditors: qingyang
 * @LastEditTime: 2022-11-18 17:49:55
 */
import { ref, unref, watch, onUnmounted } from 'vue';
import type { WatchStopHandle } from 'vue';
import { PageTableProps, PageTableActionType } from '../../types';

export function useGPageTable(
  pageTableProps: PageTableProps
): [(instance: PageTableActionType) => void, PageTableActionType] {
  const pageTableRef = ref<Nullable<any>>(null);
  const loadedRef = ref<Nullable<boolean>>(false);

  let stopWatch: WatchStopHandle;

  // 注册
  function register(instance: PageTableActionType) {
    // 销毁时清空
    onUnmounted(() => {
      pageTableRef.value = null;
      loadedRef.value = null;
    });

    if (instance === unref(pageTableRef)) return;

    pageTableRef.value = instance;
    pageTableProps && instance.setProps(getDynamicProps(pageTableProps));
    loadedRef.value = true;

    // 入参可以变化
    stopWatch?.();

    stopWatch = watch(
      () => pageTableProps,
      () => {
        console.log('watch pageTableProps', pageTableProps);
        pageTableProps && instance.setProps(getDynamicProps(pageTableProps));
      },
      {
        immediate: true,
        deep: true
      }
    );
  }

  // 获取pageTable实例
  function getPageTableInstance(): PageTableActionType {
    const pageTable = unref(pageTableRef);
    if (!pageTable) {
      console.error(
        'The table instance has not been obtained yet, please make sure the table is presented when performing the table operation!'
      );
    }
    return pageTable as PageTableActionType;
  }

  // 实例提供方法
  const methods: PageTableActionType = {
    refresh: async (isReset?: boolean) => {
      getPageTableInstance().refresh(isReset);
    },
    setProps: (props: Partial<PageTableProps>) => {
      getPageTableInstance().setProps(props);
    },
    resetSelection: () => {
      getPageTableInstance().resetSelection();
    },
    getSelection: () => {
      return getPageTableInstance().getSelection();
    },
    // tree、expand类型的表格；收起展开子项
    toggleRowExpansion: (row: any, expanded: boolean) => {
      return getPageTableInstance().toggleRowExpansion(row, expanded);
    },
    // 用于刷新searchOption的配置信息
    refreshSearchOptions: (index?: number | number[]) => {
      if (typeof index !== 'undefined') {
        return getPageTableInstance().refreshSearchOptions(index);
      } else {
        return getPageTableInstance().refreshSearchOptions();
      }
    },
    getTotal: () => {
      return getPageTableInstance().getTotal();
    },
    clearData: async () => {
      getPageTableInstance().clearData();
    }
  };

  return [register, methods];
}

// dynamic use hook props
export function getDynamicProps<T, U = any>(props: T): Partial<U> {
  const ret: Recordable = {};

  Object.keys(props as Recordable).map(key => {
    ret[key] = unref((props as Recordable)[key]);
  });

  return ret as Partial<U>;
}
