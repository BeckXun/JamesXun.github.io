var gulp = require('gulp');
var uglify = require('gulp-uglify'); //压缩js
var cssmin = require('gulp-minify-css');//压缩css
var concat = require('gulp-concat');//合并
var sass = require('gulp-sass');//引用sass
var browserSync = require('browser-sync');
var clean = require('gulp-clean');//避免冗余的清空
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var runSequence = require('run-sequence');
var imagemin = require('gulp-imagemin');
var babel = require('gulp-babel');



//清空dist文件夹
gulp.task('clean',function(){
    return gulp.src('dist',{read:false}).pipe(clean());
});

//浏览器实时刷新
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './'//根文件目录
    }
  })
});

//监控sass并编译成css
gulp.task('sass', function() {
  return gulp.src('APP/sass/*.scss') // Gets all files ending with .scss in APP/scss
    .pipe(sass())
    .pipe(gulp.dest('APP/css'))
    .pipe(browserSync.reload({
      stream: true//让每次css文件更改都刷新一下浏览器
    }))
});

//监控es6并编译成es5
gulp.task('babel', function(){
  return gulp.src('APP/es6/*.js')
      .pipe(babel({
          presets: ['es2015']
      }))
      .pipe(gulp.dest('APP/js/'))
      .pipe(browserSync.reload({
        stream: true//让每次js文件更改都刷新一下浏览器
      }))
});

//实时监控文件变化
gulp.task('watch', ['browserSync', 'sass', 'babel'], function (){
  gulp.watch('APP/sass/*.scss', ['sass']);
  gulp.watch('APP/es6/*.js', ['babel']);
  gulp.watch('APP/*.html', browserSync.reload);
});

//合并代码
// gulp.task('concat', function() {
//   return gulp.src(['APP/js/*.js'])//合并
//     .pipe(concat('index.js'))
//     .pipe(gulp.dest('./dist/'));
// });

//压缩JS/生成版本号
gulp.task('jsCompress', function () {
    gulp.src('APP/scripts/*.js')
        .pipe(uglify('index.js'))
        .pipe(rev())
        .pipe(gulp.dest("dist/scripts/"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("dist/scripts/"));
});

//压缩css/生成版本号
gulp.task('cssCompress', function () {
    gulp.src('APP/css/*.css')
        .pipe(cssmin())
        .pipe(rev())
        .pipe(gulp.dest("dist/css/"))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/css/'));
});

// Minify PNG, JPEG, GIF and SVG images
// gulp.task('imgCompress', function() {
//   gulp.src('APP/images/*')
//       .pipe(imagemin())
//       .pipe(gulp.dest('dist/images/'));
// });

//压缩html/更新引入文件版本
gulp.task('updataVersion', function () {
  return gulp.src(['dist/**/*.json', 'APP/*.html'])
    .pipe(revCollector({replaceReved: true}))
    .pipe(gulp.dest('dist'));
});

//打包
gulp.task('build', function(callback) {
  runSequence(['clean'],
              ['cssCompress'],
              ['jsCompress'],
              ['updataVersion'],
              callback);
});
