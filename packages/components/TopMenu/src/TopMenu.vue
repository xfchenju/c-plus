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
import { ref } from 'vue';
import { navbarMenuConfiguration } from './config';
const activeMenu = ref()

defineOptions({
  name: 'CTopMenu',
  inheritAttrs: false
})

function changePlatform() {
  console.log('changePlatform')
}
</script>
