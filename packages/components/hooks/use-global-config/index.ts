import { ref } from 'vue';

const globalConfig = ref();

export const useGlobalConfig = () => {
  return globalConfig;
}

export const provideGlobalConfig = (options: any) => {
  globalConfig.value = options;
  return globalConfig
}