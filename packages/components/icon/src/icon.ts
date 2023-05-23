import type { ExtractPropTypes } from "vue"
import type Icon from './icon.vue'

export const iconProps = {
  size: {
    type: Number,
  },
  color: {
    type: String,
  },
}

export type IconProps = ExtractPropTypes<typeof iconProps>
export type IconInstance = InstanceType<typeof Icon>