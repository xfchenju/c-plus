import { buildPackages } from '../../build/packages'
import path from 'path'

export default buildPackages(path.resolve(__dirname), 'utils')