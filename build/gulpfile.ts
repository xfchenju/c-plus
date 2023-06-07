import { series, parallel } from 'gulp'
import { withTaskName, run } from './utils'

export default series(
  // withTaskName('clean', async () => run('rm -rf ./dist')),
  // NOTE element-plus写法
  withTaskName('clean', async () => run('pnpm run clean')),
  // withTaskName('buildPackages', () => run('pnpm run --filter ./packages --parallel build'))
  withTaskName('buildPackages', () => run('pnpm run -r --parallel build'))
)