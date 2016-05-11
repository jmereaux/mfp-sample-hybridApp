var gulp = require('gulp'), 
	wiredep = require('gulp-wiredep'),
	less = require('gulp-less'),
	minifyCSS = require('gulp-minify-css'),
	serve = require('gulp-serve'),
	shell = require('gulp-shell'),
	inject = require('gulp-inject');

gulp.task('less', function () {
	gulp.src('./common/assets/app.less')
	.pipe(less())
	.pipe(minifyCSS())
	.pipe(gulp.dest('./common/css'));
});

gulp.task('inject-bower-deps', function () {
    gulp.src('./common/index.html')
    .pipe(wiredep())
	.pipe(gulp.dest('./common'));
});

gulp.task('inject-app-deps', function () {
  var sources = gulp.src(['./common/assets/**/*.js', './common/css/**/*.css'], {read: false});
  gulp.src('./common/index.html')
  	.pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest('./common'));
});
 
gulp.task('inject-deps', ['inject-bower-deps','inject-app-deps']);

gulp.task('watch', function() {
  gulp.watch('./common/assets/**/*.less', ['less']);
});

gulp.task('serve', ['less', 'inject-deps', 'watch'], serve('common'));

gulp.task('mfp', ['less', 'inject-deps'], shell.task([
  'mfp push',
]));

gulp.task('mfp-preview', ['mfp'], shell.task([
  'mfp preview',
]));