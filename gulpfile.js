var gulp = require('gulp'),
  sass = require('gulp-sass'),
  cleancss = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  // livereload = require('gulp-livereload'),
  concat = require('gulp-concat'),
  gulpUtil = require('gulp-util'),
  del = require('del'),
  // connect = require('gulp-connect'),
  jade = require('gulp-jade'),
  express = require('gulp-express');

gulp.task('styles', function(){
  // del(['dist/css']);
  gulp.src('src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'})
      .on('error', sass.logError))
    .pipe(gulp.dest('public/stylesheets'))
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

gulp.task('html', function() {
  // gulp.src('src/html/*.jade')
  //   .pipe(jade({pretty: true}))
  //   .pipe(gulp.dest('html'))
  //   .pipe(connect.reload());

  gulp.src('html/**/*.html')
    .pipe(connect.reload());
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

  gulp.watch('src/scss/**/*.scss', ['styles']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('views/**/*.jade', express.run);
  gulp.watch(['app.js', 'routes/**/*.js'], express.run);
});

gulp.task('default', ['server']);
