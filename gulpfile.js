const gulp = require('gulp');
const less = require('gulp-less');
var plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const run = require('run-sequence');
const rollup = require('gulp-rollup');
const minifyJs = require("gulp-babel-minify");
const minifyHtml = require('gulp-htmlmin');

gulp.task('minHTML', () => {
  return gulp.src('source/html/*.html')
      .pipe(minifyHtml({
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true
      }))
      .pipe(gulp.dest('public'))
});

gulp.task('less', ()=>{
  return gulp.src('source/test/**/*.less')
  .pipe(plumber())
  .pipe(less())
  .pipe(autoprefixer())
  .pipe(concat('main.css'))
  .pipe(gulp.dest('public/css'))
  .pipe(minify())
  .pipe(rename('main.min.css'))
  .pipe(gulp.dest('public/css'))
});

gulp.task('images', function(){
  return gulp.src('./img/**/*.{png,svg,jpg}')
  .pipe(imagemin([
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest('public/img'));
});

gulp.task('webp', function(){
  return gulp.src('./public/img/**/*.{jpg,png}')
  .pipe(webp({quality: 70}))
  .pipe(gulp.dest('./public/img/webp'))
});

gulp.task('js', function() {
  gulp.src('./source/js/**/*.js')
  .pipe(plumber())
    .pipe(rollup({
      input: './source/js/pages/formPageScript.js',
      output: {
        format: 'iife'
      }

    }))

    .pipe(gulp.dest('./public/js'));
});

gulp.task("minify", () => {
  return gulp.src("./public/js/pages/formPageScript.js")
    .pipe(minifyJs({
      mangle: {
        keepClassName: true
      }
    }))
	 .pipe(rename('formPageScript.min.js'))
    .pipe(gulp.dest("./public/js/"));
}

);

gulp.task('replaceImg', ()=> {
  return gulp.src('./source/js/replaceImg.js')
  .pipe(minifyJs({
    mangle: {
      keepClassName: true
    }
  }))
  .pipe(rename('replaceImg.min.js'))
  .pipe(gulp.dest("./public/js"));
});

gulp.task('build', function(){
  run('minHTML', 'js')
});

gulp.task('serve', ()=>{
  browserSync.init({
    server: {
      baseDir: './public'
    }
  });

  gulp.watch('source/html/*.html', ['minHTML']);
  gulp.watch('source/test/**/*.less', ['less']);
  gulp.watch('source/js/**/*.js', ['js']);
  gulp.watch('public/js/pages/*.js');
  gulp.watch('public/index.html');
});
