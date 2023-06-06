/*
 * @Description:
 * @Author: chenju
 * @Date: 2022-01-14 16:50:02
 * @LastEditors: qingyang
 * @LastEditTime: 2022-10-28 10:58:29
 */
export interface BaseTableProps {
  // 是否有上边框
  topBorder?: boolean;
  // 数据加载方法
  loadData: Fn;
  // 分页器配置
  pagination?: boolean | any;
  // 是否立即请求接口
  immediate?: boolean;
  // 是否需要复选框
  selection?: boolean;
  // 是否隐藏总复选框
  hideSelection?: boolean;
  // el-table option
  elTableOption?: any;
}
