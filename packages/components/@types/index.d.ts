/*
 * @Description:
 * @Author: chenju
 * @Date: 2022-01-13 16:00:01
 * @LastEditors: chenju
 * @LastEditTime: 2022-11-30 18:45:20
 */
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

declare type RefType<T> = T | null;

declare type LabelValueOptions = {
  label: string;
  value: any;
}[];

declare type EmitType = (event: string, ...args: any[]) => void;

declare type TargetContext = '_self' | '_blank';

declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T;
}

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;
declare module '@baiducloud/sdk' {
  import baidubce from '@baiducloud/sdk';
  export default baidubce;
}

declare module 'dom-to-image' {
  import domtoimg from 'dom-to-image';
  export default domtoimg;
}

declare type Nullable<T> = T | null;

declare type Recordable<T = any> = Record<string, T>;
