// 子应用枚举
export enum SubAppEnum {
  // 足迹
  PCF = 'PCF',
  // 盘查
  ECI = 'ECI',
  // 目标
  SBT = 'SBT',
  // 碳数据
  CMD = 'CMD',
  // 系统
  MAIN = 'MAIN'
}

// 子应用路径枚举
export enum SubAppPathEnum {
  // 足迹
  PCF = '/pcf',
  // 盘查
  ECI = '/eci',
  // 目标
  SBT = '/sbt',
  // 碳数据
  CMD = '/cmd',
  // 系统
  MAIN = '/main'
}

// 所有bizScope枚举
export enum AllBizScopeEnum {
  // 工作台
  WBH = 'common',
  // 足迹
  PCF = 'footprint',
  // 盘查
  ECI = 'ghg_inventory',
  // 目标
  SBT = 'target',
  // 碳数据
  CMD = 'meta_data',
  // 系统
  MAIN = 'common'
}

// 系统版本字段枚举
export enum SubAppVersionEnum {
  // 工作台
  WBH = 'common-version',
  // 足迹
  PCF = 'footprint-version',
  // 盘查
  ECI = 'inventory-version',
  // 目标
  SBT = 'target-version',
  // 碳数据
  CMD = 'meta-data-version',
  // 系统
  MAIN = 'common-version'
}