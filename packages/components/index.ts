import { App } from 'vue'
import CIcon from './icon'
import CTopMenu from './TopMenu'
import CNavbar from './navbar'

const components = [CIcon, CTopMenu, CNavbar]
export {
    CIcon,
    CTopMenu,
    CNavbar
}

export default {
    install: (app: App) => {
        components.forEach(c => app.use(c));
    }
}