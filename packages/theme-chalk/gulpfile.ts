import { series, src, dest } from 'gulp'
import gulpSass from 'gulp-sass'
import autoPrefixer from 'gulp-autoprefixer'
import cleanCss from 'gulp-clean-css'
import dartSass from 'sass'
import path from 'path'

function compile() {
  const sass = gulpSass(dartSass);
  return src(path.resolve(__dirname, './src/*.scss')).pipe(sass.sync()).pipe(autoPrefixer()).pipe(cleanCss()).pipe(dest('./dist/css'))
}

function copyFont() {
  return src(path.resolve(__dirname, './src/fonts/**')).pipe(cleanCss()).pipe(dest('./dist/css/fonts'))
}

function copyFullStyles() {
  return src(path.resolve(__dirname, './dist/**')).pipe(dest(path.resolve(__dirname, '../../dist/theme-chalk')))
}

export default series(compile, copyFont, copyFullStyles)
