/*
 * @Description: 通用模块接口
 * @Author: chenju
 * @Date: 2023-01-09 14:12:37
 * @LastEditors: qingyang
 * @LastEditTime: 2023-05-29 16:17:42
 */
import { computed } from 'vue';
import { useGlobalConfig } from '@c-plus/hooks';
import { IAddFeedBack, IMailParams, IReadType, IMailItem } from './model/commonModel';
import { BasicPagingListParams, BasicPagingListResult } from '../basicModel';
const globalConfig = useGlobalConfig()

const get = computed(() => {
  return globalConfig.value?.get
})

const post = computed(() => {
  return globalConfig.value?.post
})

enum Api {
  //使用反馈提交
  SUBMIT_FEEDBACK = '/management/feedback/submit',
  // 全部已读
  UPDATE_ALL_READ = '/message/message/updateAllRead',
  // 前台站内信分页
  MAIL_LIST = '/message/message/pageCustomerSiteMail',
  // 获取未读条数
  GET_UNREAD = '/message/message/countUnread',
  // 更新未已读
  UPDATE_READ = '/message/message/updateRead'
}

// 新版本文件上传路径
// export const newUploadFilePostUrl =
//   process.env.VUE_APP_BASE_URL + '/thirdability/file/uploadFile/V2';

// 提交反馈
export const submitFeedback = (params: IAddFeedBack): Promise<void> =>
  post.value(Api.SUBMIT_FEEDBACK, params);

export const updateAllRead = (type: IReadType): Promise<void> => post.value(Api.UPDATE_ALL_READ, { type });

export const getMailList = (
  params: IMailParams & BasicPagingListParams
): Promise<BasicPagingListResult<IMailItem>> => get.value(Api.MAIL_LIST, params);

export const getUnReadCount = (type?: string): Promise<number> => get.value(Api.GET_UNREAD, { type });

export const updateRead = (ids: string[]): Promise<void> => post.value(Api.UPDATE_READ, { ids });

export const getManagerInfo = () => get.value(`/upms/customer/getCustomerInfo`);
