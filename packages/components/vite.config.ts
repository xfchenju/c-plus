import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue"
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import { PKG_NAME } from '../../build/utils/constants'
import { buildOutput, projRoot } from '../../build/utils/paths'

export default defineConfig({
  build: {
    target: 'modules',
      //打包文件目录
      outDir: "es",
      //压缩
      minify: false,
      //css分离
      //cssCodeSplit: true,
      rollupOptions: {
        //忽略打包vue文件
        external: ['vue', 'element-plus', 'lodash', /\.scss/],
        input: ['./index.ts'],
        output: [
          {
            format: 'es',
            //不用打包成.es.js,这里我们想把它打包成.js
            entryFileNames: '[name].js',
            //让打包目录和我们目录对应
            preserveModules: true,
            //配置打包根目录
            dir: resolve(buildOutput, `es`),
            preserveModulesRoot: PKG_NAME
          },
          {
            format: 'cjs',
            entryFileNames: '[name].js',
            //让打包目录和我们目录对应
            preserveModules: true,
            //配置打包根目录
            dir: resolve(buildOutput, `lib`),
            preserveModulesRoot: PKG_NAME
          }
        ]
      },
      lib: {
        entry: './index.ts',
        formats: ['es', 'cjs']
      }
  },
  plugins: [
    vue(),
    dts({
        outputDir: resolve(buildOutput, `./es/packages/components`),
        //指定使用的tsconfig.json为我们整个项目根目录下掉,如果不配置,你也可以在components下新建tsconfig.json
        tsConfigFilePath: resolve(projRoot, `./tsconfig.json`)
      }),
      //因为这个插件默认打包到es下，我们想让lib目录下也生成声明文件需要再配置一个
      dts({
        outputDir: resolve(buildOutput, `./lib/packages/components`),
        tsConfigFilePath: resolve(projRoot, `./tsconfig.json`)
      }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
    },
  },
})