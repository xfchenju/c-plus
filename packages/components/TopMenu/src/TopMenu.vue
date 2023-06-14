<template>
    <div class="c-top-menu app-menu-list g-ml8">
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
import { ref, onMounted } from 'vue';
import { navbarMenuConfiguration } from './config'
interface TopMenuProps {
  get: any;
  post: any;
}
const props = defineProps<TopMenuProps>()
const getManagerInfo = () => props.get(`/upms/customer/getCustomerInfo`);
const activeMenu = ref();
const user = ref()
onMounted(async () => {
  const res = await getManagerInfo()
  console.log('res', res)
  user.value = res.user
})

function changePlatform() {
  console.log('changePlatform')
}

defineOptions({
  name: 'CTopMenu',
  inheritAttrs: false
})
</script>
