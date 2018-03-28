'use strict';

var   gulp = require('gulp'),
    concat = require('gulp-concat'),
       del = require('del'),
livereload = require('gulp-livereload'),
      sass = require('gulp-sass'),
   connect = require('gulp-connect'); 
    
gulp.task('compileSass', function() {
  return gulp.src("scss/styles.scss")
      .pipe(sass())
      .pipe(gulp.dest('css'))
      .pipe(livereload());
});    

gulp.task("concatIndex", function() {
  gulp.src(['partials/header.html', 'partials/indexbody.html', 'partials/footer.html'])
  .pipe(concat("index.html"))
  .pipe(gulp.dest("public"))
  .pipe(livereload());
});

gulp.task("concatAbout", function() {
  gulp.src(['partials/header.html', 'partials/aboutbody.html', 'partials/footer.html'])
  .pipe(concat("about.html"))
  .pipe(gulp.dest("public"))
  .pipe(livereload());
});

gulp.task("concatContact", function() {
  gulp.src(['partials/header.html', 'partials/contactbody.html', 'partials/footer.html'])
  .pipe(concat("contact.html"))
  .pipe(gulp.dest("public"))
  .pipe(livereload());
});

gulp.task("watch", function() {
  livereload.listen();
  return gulp.watch(['partials/*.html', 'scss/*', 'img/*', 'js/*'], ['build'])
  
})

gulp.task('clean', function() {
  del(['public'])
});

gulp.task("build", ['compileSass', 'concatIndex', 'concatAbout', 'concatContact'], function() {
  return gulp.src(["css/*", "img/*", "js/*"], { base: './'})
  .pipe(gulp.dest('public'));
            
});

gulp.task('connect', function(){
  connect.server({
    root: 'public',
    livereload: true
  });
});

gulp.task("default", ["build", "connect", "watch"]);