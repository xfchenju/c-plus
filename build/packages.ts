import { series, parallel, src, dest } from "gulp"
import { buildConfig } from './utils/build-info';
import path from 'path';
import ts from 'gulp-typescript';
import { projRoot, buildOutput } from "./utils/paths";
import { withTaskName } from "./utils";

export const buildPackages = (dirname: string, name: string) => {
  console.log(dirname, name)

  const task = Object.entries(buildConfig).map(([module, config]) => {
    const output = path.resolve(dirname, config.output.name)
    console.log('output', output)
    return series(
      withTaskName(`build: ${dirname}`, async () => {
        const tsConfig = path.resolve(projRoot, 'tsconfig.json');
        const inputs = ['**/*.ts', '!gulpfile.ts', '!node_modules'];
        console.log('build', inputs)
        return src(inputs).pipe(ts.createProject(tsConfig, {
          declaration: true,
          strict: false,
          module: config.module
        })()).pipe(dest(output))
      }),
      withTaskName(`copy: ${dirname}`, async () => {
        return src(`${output}/**`).pipe(dest(path.resolve(buildOutput, config.output.name, name)))
      })
    )
  })


  return parallel(...task)
}