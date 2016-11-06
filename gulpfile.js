var gulp = require('gulp'),
  sass = require('gulp-sass'),
  cleancss = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  gulpUtil = require('gulp-util'),
  del = require('del'),
  jade = require('gulp-jade'),
  connect = require('gulp-connect'),
  express = require('gulp-express'),
  babel = require('gulp-babel');

gulp.task('styles', function(){
  // del(['dist/css']);
  gulp.src('src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'})
      .on('error', sass.logError))
    // .pipe(gulp.dest('public/stylesheets'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cleancss())
    .pipe(gulp.dest('public/stylesheets'));
  express.notify();
});

gulp.task('scripts', function () {
  // del(['dist/js']);
  gulp.src('src/javascript/**/*.js')
    // .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify().on('error', gulpUtil.log))
    .pipe(gulp.dest('public/javascripts'));
  express.notify();
});

gulp.task('clean', function(cb) {
  del(['dist/css', 'dist/js'], cb);
});

// gulp.task('babel', function() {
//   gulp.src('app.js')
//     .pipe(babel())
//     .pipe(gulp.dest('.'));
// });

gulp.task('server', ['styles', 'scripts'], function() {
  express.run(['./bin/www']);

  gulp.watch('src/scss/**/*.scss', ['styles']);
  gulp.watch('src/javascript/**/*.js', ['scripts']);
  gulp.watch('views/**/*.jade', express.notify);
  gulp.watch('public/**/*.css', express.notify);
  gulp.watch('public/**/*.js', express.notify);
  gulp.watch(['app.js', 'routes/**/*.js', 'models/**/*.js'], express.run);
});

gulp.task('default', ['server']);
