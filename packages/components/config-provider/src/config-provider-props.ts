
import { defineProps, PropType } from 'vue';
import type { ExtractPropTypes } from 'vue'

export const configProviderProps = defineProps({
  get: {
    type: Function as PropType<any>
  },
  post: {
    type: Function as PropType<any>
  }
} as const)
export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>
