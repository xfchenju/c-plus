<template>
    <div class="c-top-menu">
      <el-menu :default-active="activeMenu" mode="horizontal" @select="changePlatform">
        <el-menu-item
          :index="item.menuIndex"
          v-for="item in navbarMenuConfiguration"
          :key="item.menuIndex"
          >{{ item.name }}
          <el-tooltip :content="item.tooltips" v-if="item?.icon">
            <span class="g-flex">
              <img
                :src="item.icon"
                class="sub-app-icon"
              />
            </span>
          </el-tooltip>
        </el-menu-item>
      </el-menu>
    </div>
</template>
<script lang="ts" setup name="TopMenu">
import { ref, inject, onMounted } from 'vue';
import { navbarMenuConfiguration } from './config';
import { useGlobalConfig } from '../../hooks';
import { getManagerInfo } from '../../commonModule/apis/common/common'
const activeMenu = ref()

const globalConfig = useGlobalConfig()

const config = globalConfig.value.CommonModuleConfig

// const { get } = globalConfig.value;
const user = ref()
onMounted(async () => {
  const res = await getManagerInfo()
  console.log('res', res)
  user.value = res.user
})

defineOptions({
  name: 'CTopMenu',
  inheritAttrs: false
})



function changePlatform() {
  console.log('changePlatform')
}
</script>
