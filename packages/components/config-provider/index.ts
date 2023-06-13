import { withInstall } from '../utils'

import ConfigProvider from './src/config-provider'

export const CConfigProvider = withInstall(ConfigProvider)
export default CConfigProvider

export * from './src/config-provider'
