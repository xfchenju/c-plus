/*
 * @Description: 通用模块接口类型声明
 * @Author: chenju
 * @Date: 2023-01-09 14:13:03
 * @LastEditors: qingyang
 * @LastEditTime: 2023-05-31 18:16:27
 */
// 提交反馈 入参
export interface IAddFeedBack {
  scope: string;
  feedbackContent: string;
  attachmentUrl?: string;
  attachmentSmallUrl?: string;
}

export type IReadType = '' | 'APPROVE' | ' COOPERATION' | 'OTHER';
export interface IMailParams {
  type: IReadType;
  isRead?: boolean;
}

export interface IMailItem {
  id: string;
  noticeTitle: string;
  receiveUsername: string;
  receiveEmail: string;
  sendTime: string;
  content: any;
  isRead: boolean;
}
