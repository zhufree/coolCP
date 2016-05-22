var gulp = require('gulp'),
  sass = require('gulp-sass'),
  cleancss = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  gulpUtil = require('gulp-util'),
  del = require('del'),
  jade = require('gulp-jade'),
  express = require('gulp-express');

gulp.task('styles', function(){
  // del(['dist/css']);
  gulp.src('src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'})
      .on('error', sass.logError))
    // .pipe(gulp.dest('public/stylesheets'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cleancss())
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('scripts', function () {
  // del(['dist/js']);
  gulp.src('src/javascript/**/*.js')
    // .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify().on('error', gulpUtil.log))
    .pipe(gulp.dest('public/javascripts'));
});

gulp.task('clean', function(cb) {
  del(['dist/css', 'dist/js'], cb);
});

// gulp.task('connect', function () {
//   connect.server({
//     root: './',
//     livereload: true
//   });
// });

gulp.task('server', ['styles', 'scripts'], function() {
  express.run(['./bin/www']);

  gulp.watch('src/scss/**/*.scss', ['styles', express.notify]);
  gulp.watch('src/js/**/*.js', ['scripts', express.notify]);
  gulp.watch('views/**/*.jade', express.notify);
  gulp.watch(['app.js', 'routes/**/*.js'], express.run);
});

gulp.task('default', ['server']);
