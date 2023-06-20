import { App, Ref } from 'vue'
export * from './constants/types';
export * from './constants';
// import { CommonModuleConfigType } from './constants/types'
import CIcon from './icon'
import CTopMenu from './TopMenu'
// import CConfigProvider from './config-provider'
// import type { ConfigProviderProps } from './config-provider';
import { provideGlobalConfig } from './hooks'
// export type { ConfigProviderProps };

const components = [CIcon, CTopMenu]
export {
    CIcon,
    CTopMenu
}

// export interface CPlusOptions {
//     CommonModuleConfig: Ref<CommonModuleConfigType>
// }

export default {
    install: (app: App, options: any) => {
        console.log('options', options)
        components.forEach(c => app.use(c));

        if (options) provideGlobalConfig(options)
    }
}