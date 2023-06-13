import { ElMessage } from 'element-plus';

/**
 * 展示消息 做了节流
 * @param msg
 */
let showMessageFlag = false;
export const showMessage = (msg: string) => {
  console.log('showMessage', msg);
  if (showMessageFlag) return;
  console.log('showMessage show', msg);
  ElMessage.error(msg);
  showMessageFlag = true;
  setTimeout(() => {
    showMessageFlag = false;
  }, 200);
};
