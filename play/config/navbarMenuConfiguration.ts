// 菜单类型
export enum NavbarMenuEnum {
  // 工作台
  WBH = 'WBH',
  // 碳足迹
  PCF = 'PCF',
  // 碳盘查
  ECI = 'ECI',
  // 碳目标
  SBT = 'SBT',
  // 碳数据
  CMD = 'CMD',
  // 系统
  MAIN = 'MAIN'
}

// 导航菜单配置的类型
export interface NavbarMenuConfigurationItem {
  // 菜单名称
  name: string;
  // 所属应用
  subApp: string;
  // 所属应用路径
  subAppPath: string;
  // 菜单类型
  menuIndex: keyof typeof NavbarMenuEnum;
  // 路径
  path: string;
  // 图标
  icon?: string;
  // 提示
  tooltips?: string;
}

// 导航菜单的配置信息
export const navbarMenuConfiguration: NavbarMenuConfigurationItem[] = [
  {
    name: '工作台',
    subApp: 'MAIN',
    subAppPath: '/main',
    menuIndex: 'WBH',
    path: '/main/workbench'
  },
  {
    name: '碳足迹',
    subApp: 'PCF',
    subAppPath: '/pcf',
    menuIndex: 'PCF',
    path: '/pcf'
  },
  {
    name: '碳盘查',
    subApp: 'ECI',
    subAppPath: '/eci',
    menuIndex: 'ECI',
    path: '/eci',
    icon: 'icon_sgs2',
    tooltips: '已通过SGS核查'
  },
  {
    name: '碳目标',
    subApp: 'SBT',
    subAppPath: '/sbt',
    menuIndex: 'SBT',
    path: '/sbt'
  },
  {
    name: '碳数据',
    subApp: 'CMD',
    subAppPath: '/cmd',
    menuIndex: 'CMD',
    path: '/cmd'
  },
  {
    name: '系统',
    subApp: 'MAIN',
    subAppPath: '/main',
    menuIndex: 'MAIN',
    path: '/main/redirect?type=system'
  }
];

export default navbarMenuConfiguration;
