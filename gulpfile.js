const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browsersync = require('browser-sync').create();
const tailwind = require('tailwindcss');
const tailwindConfig = require('./tailwind.config');

function scssTask() {
  return src('src/scss/style.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('public/dist', { sourcemaps: '.' }));
}

function tailwindcssTask() {
  return src('src/tailwind/tailwind.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(
      postcss([tailwind(tailwindConfig), autoprefixer(), cssnano()])
    )
    .pipe(dest('public/dist', { sourcemaps: '.' }));
}

function browserSyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: './public/',
    },
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
      },
    },
  });
  cb();
}
function browserSyncReload(cb) {
  browsersync.reload();
  cb();
}

function watchTask() {
  watch('public/*.html', browserSyncReload);
  watch(
    `${tailwindConfig.content[0]}`,
    series(tailwindcssTask, browserSyncReload)
  );
  watch(
    `${tailwindConfig.content[1]}`,
    series(tailwindcssTask, browserSyncReload)
  );
  watch(
    ['src/scss/**/*.scss', 'src/js'],
    series(scssTask, browserSyncReload)
  );
}

// Default Gulp Task
exports.default = series(
  scssTask,
  tailwindcssTask,
  browserSyncServe,
  watchTask
);
