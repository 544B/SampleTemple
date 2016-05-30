var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

var path = {
  "jade"	: ["src/view/**/*.jade", "!src/view/**/_*"],
  "stylus"	: ["src/style/**/*.styl", "!src/style/**/_*"],
  "webpack"	: "src/script/**/*.js",
  "html"	: "dist",
  "css"		: "dist/css",
  "js"		: "dist/js"
};

gulp.task('server', function () {
	gulp.src('dist')
    .pipe($.webserver({
      livereload: true,
    }));
});

gulp.task('jade', function () {
  gulp.src(path.jade)
  .pipe($.plumber())
  .pipe($.jade())
  .pipe(gulp.dest(path.html));
});

gulp.task('stylus', function () {
  gulp.src(path.stylus)
  .pipe($.plumber())
  .pipe($.stylus())
  .pipe(gulp.dest(path.css));
});

gulp.task('webpack', function() {
	gulp.src(path.webpack)
  	.pipe($.plumber())
	.pipe($.webpack({
		resolve: {
			extensions: ['', '.js']
		},
		  entry: {
			      // 起点となるファイルを指定
			'script'  : './src/script/script.js'
		},
		output: {
			filename: "[name].js",
			sourceMapFilename: 'maps/[name].map',
			jsonpFunction: 'fr'
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel',
					query: {
						compact: false
					}
				}
			]
		}
	}))
	.pipe(gulp.dest(path.js))
});

gulp.task('watch', function(){
  gulp.watch(path.jade, ['build']);
  gulp.watch(path.stylus, ['build']);
  gulp.watch(path.webpack, ['build']);
});
gulp.task('build', ['jade', 'stylus', 'webpack']);

gulp.task('default', ['build', 'server', 'watch']);
