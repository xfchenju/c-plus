import { withInstall } from '../utils'
import ConfigProvider from './src/config-provider'

export const CConfigProvider = withInstall(ConfigProvider)
export default CConfigProvider

export * from './src/config-provider'
export * from './src/config-provider-props'
export * from './src/constants'
export * from './src/hooks/use-global-config'
