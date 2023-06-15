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
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAkCAYAAADo6zjiAAAAAXNSR0IArs4c6QAAAmlJREFUWEftVzFv01AQvrMDGZjKgLqUisZWV9QR4pAOrVR+QJeqUV8GfkErgYREKiGB1P4Blri06sIPQIgObWOXsWIFO0ghCzDQiSGAfei5dUliPwe/RHiJt8Q+f999d/fdM0LGF2aMD2MCQynQfvfqOi/h1J3l77KllCbQtM2H5MNTDowKPC4U2XMZElIEHMusAdGTHkDETd1gtbQkUhOIBQ9RJUgICbj2yyXw/RcENJU2q+7nEbANCA80g72Je4+YQMP8PCz4pTCAba3EbqYi4DTqNEzm/bF6qRqbrFCBMYFMFYgbNVXBxZkiO+C1daz6ERDc6/UBONaNapn/98k2Fzyf3v6LT0R6QDjniO+14tocIpJjmWUgOuwDmNcNdkRE6No7p0B0O9LEMT7RQ4Dbq+/TM2H3I1Z0g+1FVMC/2TuWuQpEu6J3KAo+6rbtSwJ8sXR+//hGQKooGBFahcnJWdTvd7pVyEGufKtUOSbndb755etHIoqd+WBvAHr53LUb4QJLReBi8Wxoxep2qAICkmawef7btevr5MNWkn8ICfCggSXgGSCeXYGrhWlj5YyrkCOVePYta3/iF/xsEtFEEgFhCcKgxGVz8RCCsq2V1ja6gdzGzhaBv57onoOaMAWJjqrmZ2furrSCsTvZn/a8zgcAyCc0cOy6lrZiRNzTDFYJam+Zu0S0mpT9yHcB9wNVgTkO6vlwyuf/vxIIwBADZwSihcTaA8DIFRgE2H8/NQE36wNJ5kcykcRJPqEg1goG20xTntSn4nMLjh7LZcDPd4PklemHScg5008zSeEiYdIlGBMYlQJ/ALVYNTRAcva/AAAAAElFTkSuQmCC',
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
    name: '管理后台',
    subApp: 'MAIN',
    subAppPath: '/main',
    menuIndex: 'MAIN',
    path: '/main/redirect?type=system'
  }
];

export default navbarMenuConfiguration;
