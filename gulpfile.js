const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browsersync = require('browser-sync').create();

function scssTask() {
  return src('src/scss/style.scss', { sourcemaps: false })
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(rename('style.min.css'))
    .pipe(dest('public/dist', { sourcemaps: '.' }));
}

function browserSyncServe(cb) {
  browsersync.init({
    server: { baseDir: './public/' },
    notify: { styles: { top: 'auto', bottom: '0' } },
  });
  cb();
}
function browserSyncReload(cb) {
  browsersync.reload();
  cb();
}

function watchTask() {
  watch('public/**/*.{html,css,js}', browserSyncReload);
  watch(['src/scss/**/*.scss'], series(scssTask, browserSyncReload));
}

// Default Gulp Task
exports.default = series(scssTask, browserSyncServe, watchTask);
