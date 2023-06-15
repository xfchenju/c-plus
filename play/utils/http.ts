/*
 * @Description: axios封装
 * @Author: chenju
 * @Date: 2021-01-05 16:08:55
 * @LastEditors: qingyang
 * @LastEditTime: 2023-01-31 11:27:54
 */

import axios from 'axios';
import { ElMessage } from 'element-plus';
import { showMessage } from './http.utils';

// http请求返回的code码
export enum HTTP_RESPONSE_CODE {
  // 请求成功
  OK_CODE = 100000,
  // 校验令牌checkToken失效时
  CHECK_TOKEN_EXPIRATED_ERROR_CODE = 100004
}
const RESPONSE_ERROR = new Map<string, string>([
  ['ABNORMAL_ERROR', '异常错误！'],
  ['ERROR_400', '请求参数异常！'],
  ['ERROR_404', '请求地址不存在！'],
  ['ERROR_500', '服务端异常，请稍后再试！'],
  ['ERROR_503', '系统升级中，请稍后再试！'],
  ['NETWORK_ERROR', '网络连接异常！'],
  ['REQUEST_CANCEL', '用户取消操作！'],
  ['TOKEN_EXPIRED', '登录状态已过期，请重新登录！'],
  ['TIME_OUT', '请求超时！']
]);
// saas用户版本 用户信息变更（角色、企业订阅等）时的code
export enum SAAS_USER_INFO_CHANGE_CODE_ENUM {
  // 企业未订阅该业务
  ENTERPRISE_HAS_NO_SUB = 100005,
  // 用户没有该业务权限
  USER_HAS_NO_PERMISSION = 100006
}
const constants = {
  RESPONSE_ERROR,
  SAAS_USER_INFO_CHANGE_CODE_ENUM
}
declare const window: any;
const $http: any = axios.create();
// post请求头设置
$http.defaults.headers.post['Content-Type'] = 'application/json';
$http.defaults.headers.put['Content-Type'] = 'application/json';
// 请求域名
$http.defaults.baseURL = 'http://carbon-dev.odinscf.com';
// 超时时间
// $http.defaults.timeout = config.TIMEOUT;
// request 拦截
$http.interceptors.request.use(
  async (config: any) => {
    console.log('request interceptor', config);
    config.headers['Biz-Scope'] = 'common';
    config.headers['Enterprise-No'] = 'C0000001';
    config.headers.Authorization = `Bearer 8cdf254b-9a97-4bc0-9001-e4ff450010eb`;
    return config;
  },
  (error: any) => {
    console.log('request error', error);
    return Promise.reject(error);
  }
);

// response 拦截
$http.interceptors.response.use(
  (response: any) => {
    console.log('response', response);
    // (Message as any).closeAll();
    const { code, data, msg } = response.data;
    if (code && code === HTTP_RESPONSE_CODE.OK_CODE) {
      return data;
    } else {
      response.config.showMessage &&
        showMessage(msg || constants.RESPONSE_ERROR.get('ABNORMAL_ERROR'));
      return Promise.reject(response);
    }
  },
  (error: any) => {
    console.log('response error', error, error.message, error.response);
    const { message: errorMsg, response } = error;
    if (errorMsg === '已经退出') {
      return Promise.reject(error);
    } else if (errorMsg === 'Network Error') {
      ElMessage.error(constants.RESPONSE_ERROR.get('NETWORK_ERROR') as string);
    } else if (errorMsg.includes('timeout')) {
      ElMessage.error(constants.RESPONSE_ERROR.get('TIME_OUT') as string);
    } else if (errorMsg === '用户取消操作') {
      response.config.showMessage &&
        showMessage(constants.RESPONSE_ERROR.get('REQUEST_CANCEL') as string);
    } else if (response && response.status === 400) {
      response.config.showMessage &&
        showMessage(response.data.msg || (constants.RESPONSE_ERROR.get('ERROR_400') as string));
      return Promise.reject(error);
    } else if (response && response.status === 401) {
      // handleNoAuthAndGotoLogin();
      return Promise.reject(error);
    } else if (response && response.status === 404) {
      response.config.showMessage &&
        showMessage(response.data.msg || (constants.RESPONSE_ERROR.get('ERROR_404') as string));
      return Promise.reject(error);
    } else if (response && response.status === 500) {
      response.config.showMessage &&
        showMessage(response.data.msg || (constants.RESPONSE_ERROR.get('ERROR_500') as string));
      return Promise.reject(error);
    } else if (response && response.status === 503) {
      ElMessage.error(constants.RESPONSE_ERROR.get('ERROR_503') as string);
      return Promise.reject(error);
    } else {
      if (response.data.msg || errorMsg) {
        ElMessage.error(response.data.msg || errorMsg);
      }
      return Promise.reject(error);
    }
  }
);

export const baseURL = $http.defaults.baseURL;

export const get = (url: string, params?: any, noAuth = false, showMessage = true) => {
  return $http({
    method: 'get',
    url: url,
    params,
    noAuth,
    showMessage
  });
};

export const post = (url: string, params?: any, noAuth = false, showMessage = true) => {
  return $http({
    method: 'post',
    url: url,
    data: params,
    noAuth,
    showMessage
  });
};