<template>
  <el-header class="c-navbar g-flex-between-center">
    <slot></slot>
    <div class="g-flex-start-center">
      <!-- <el-tooltip placement="bottom" content="通知" :offset="5" :visible="visible">
        <div @click="visible = false" @mouseenter="visible = true" @mouseleave="visible = false">
          <notification :nameWidth="width"></notification>
        </div>
      </el-tooltip> -->
      <div class="short-line"></div>
      <el-select
        v-if="!isEps"
        style="width: 180px"
        v-model="currentCompany"
        class="g-mr12"
        placeholder="请选择"
        @change="changeCompany"
      >
        <el-option
          v-for="item in companyList"
          :key="item.enterpriseNo"
          :label="item.enterpriseName"
          :value="item.enterpriseNo"
        />
      </el-select>
      <el-dropdown popper-class="navbar-dropdown" tabindex="-1">
        <div class="avatar-wrap">
          <span class="name g-ell" ref="nameEl">{{ userName }} </span>
          <!-- <img class="avatar-img g-ml6" src="@/assets/images/user_photo.png" /> -->
        </div>
        <template #dropdown>
          <div class="navbar-dropdown-container">
            <p class="user_name">{{ userName }}</p>
            <div class="company">
              <p class="company_tip">上次登录时间：{{ lastLoginTime || '-' }}</p>
            </div>
            <div class="middle"></div>
            <el-dropdown-menu style="padding: 0px" v-if="!isEps">
              <!-- <div class="logout" @click="UserVisible = true">账号信息</div> -->
            </el-dropdown-menu>
            <el-dropdown-menu style="padding: 0px" v-if="!isEps">
              <!-- <div class="logout" @click="showChangePsw = true">修改密码</div> -->
            </el-dropdown-menu>
            <el-dropdown-menu style="padding: 0px; margin-bottom: 12px">
              <!-- <div class="logout" @click="logoutDebounce">{{ isEps ? '返回EPS' : '退出登录' }}</div> -->
            </el-dropdown-menu>
          </div>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script lang="ts" setup name="Navbar">
import { onMounted, computed, ref } from 'vue';
import type { IEnterprise } from './types'
interface TopMenuProps {
  get: any;
  post: any;
  userInfo: any;
  isEPSTokenLoginFlag?: boolean,
  CommonModuleConfig: any
}
const props = withDefaults(defineProps<TopMenuProps>(), {}) 
const emits = defineEmits(['select'])

const localUserInfo = computed(() => {
  return props.userInfo
})

const userName = computed(() => {
  return localUserInfo.value?.realName || '';
});

const lastLoginTime = computed(() => {
  return localUserInfo.value?.lastLoginTime || '';
});

const isEps = computed(() => {
  return props.isEPSTokenLoginFlag;
});

const currentCompany = computed(() => {
  return localUserInfo.value?.enterpriseNo || localStorage.getItem('enterpriseNo');
});

const getListCustomerEnterprise = (): Promise<IEnterprise[]> =>
    props.get(`/upms/enterprise/listCustomerEnterprise`);

const switchEnterprise = (enterpriseName: string, enterpriseNo: string): Promise<void> =>
  props.post(`/upms/enterprise/switchEnterprise`, { enterpriseName, enterpriseNo });

const companyList = ref<IEnterprise[]>([]);

getListCustomerEnterprise().then(res => {
  companyList.value = res;
});

const changeCompany = async (enterprise: string) => {
  const company = companyList.value.filter(item => item.enterpriseNo == enterprise);
  if (company.length) {
    await switchEnterprise(company[0].enterpriseName, company[0].enterpriseNo);
    localStorage.setItem('enterpriseNo', enterprise);
    window.location.href = props.CommonModuleConfig.CURRENT_PLATFORM_PATH;
  }
};

defineOptions({
  name: 'CNavbar',
  inheritAttrs: false
})
</script>
