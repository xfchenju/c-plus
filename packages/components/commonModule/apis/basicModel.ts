/*
 * @Description: 基础类型
 * @Author: chenju
 * @Date: 2021-10-22 16:15:17
 * @LastEditors: qingyang
 * @LastEditTime: 2023-06-01 18:03:54
 */
// 基础分页列表传参
export interface BasicPagingListParams {
  current: number;
  size: number;
}

// 基础分页列表返回值
export interface BasicPagingListResult<T extends any> {
  records: T[];
  pages: number;
  total: number;
  // 票面总金额合计
  totalAmt?: string;
  // 未回款金额合计
  totalUnreceivedAmt?: string;
}

// 主键
export type PrimaryKey = string | number;
