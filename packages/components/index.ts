import { App } from 'vue'
import { CommonModuleConfigType } from './constants/types'
import CIcon from './icon'
import CTopMenu from './TopMenu'

const components = [CIcon, CTopMenu]
export {
    CIcon,
    CTopMenu
}



interface CPlusOptions {
    CommonModuleConfig: CommonModuleConfigType
}

export default {
    install: (app: App, options: CPlusOptions) => {
        console.log('options', options)
        components.forEach(c => app.use(c));
    }
}