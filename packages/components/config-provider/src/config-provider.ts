import { defineComponent, renderSlot, defineProps } from 'vue'
// import { buildProps } from '../../utils'
import { provideGlobalConfig } from '../../hooks'
import { CommonModuleConfigType } from '../../constants/types'
// import type { ExtractPropTypes } from 'vue'

export interface ConfigProviderProps {
  CommonModuleConfig: CommonModuleConfigType,
  get: any,
  post: any
}

// export const configProviderProps = defineProps({
//   /**
//    * @description Controlling if the users want a11y features
//    */
//   a11y: {
//     type: Boolean
//   }
// } as const)
// export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

const ConfigProvider = defineComponent({
  name: 'CConfigProvider',
  props: {
    /**
   * @description Controlling if the users want a11y features
   */
    CommonModuleConfig: {
      type: Object
    }
  },

  setup(props, { slots }) {
    const config = provideGlobalConfig(props)
    console.log('config', config)
    return () => renderSlot(slots, 'default', { config: config?.value })
  },
})
export type ConfigProviderInstance = InstanceType<typeof ConfigProvider>

export default ConfigProvider
