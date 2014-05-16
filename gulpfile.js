var gulp = require('gulp'),
    yargs = require('yargs'),
    gif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint');

var config = {
  dist: !!yargs.argv.dist,
  debug: !yargs.argv.dist,
  src: 'src/',
  dest: 'target/'
};

gulp.task('js', function () {
  return gulp.src(config.src + '**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gif(config.dist, uglify({ preserveComments: 'some' })))
    .pipe(gulp.dest(config.dest));
});

gulp.task('watch', function () {
  gulp.watch(config.src + '**/*.js', ['js']);
});

gulp.task('build', ['js']);
gulp.task('default', ['build', 'watch']);
