// ********************* Modules **************************

var gulp          = require('gulp');
var tslint   	  	= require('gulp-tslint');
var rename        = require('gulp-rename');
var sourcemaps 	  =	require('gulp-sourcemaps');
var uglify        = require('gulp-uglify');
var minifyCss     = require('gulp-minify-css');
var util          = require('gulp-util');
var sass          = require('gulp-sass');
var concat        = require('gulp-concat');
var tsc 		  		= require('gulp-typescript');
var nodemon 			= require('gulp-nodemon');
var browserSync   = require('browser-sync');
var Server        = require('karma').Server;


// ********************* CONFIG *******************************

// specify the file/library you're working on.
// to compile the whole libarary, use empty string ''
// define input and output path
var src = {
	module
	// 'script'  : './src/js/**/*.ts',
	// 'scriptNM': './src/js/**/*.!(module).ts',
	// 'scriptM' : './src/js/**/*.module.ts',
	// 'style'   : './src/css/**/*.scss',
	// 'html'		: './public/**/*.html'
	// 'template' : './public/template/*'
}

var des = {
	'script'  : './public/js/',
	'style'	  : './public/css/'
}

var fileName = 'kmk.js';
var fileNameMin = 'kmk.min.js';

// ********************** MAIN TASK ************************

gulp.task('default',['ts-module', 'test', 'watch']);
// gulp.task('default',['ts-lint','build-js', 'build-css', 'browser-sync', 'watch']);

// ********************** CHECK ************************

// check if any typing error in the file
gulp.task('ts-lint',function(){
	return gulp.src(src.script)
		.pipe(tslint())
		.pipe(tslint.report('prose'));
});

// watch file change and keep checking
gulp.task('watch',function(){
	// gulp.watch(src.script, ['ts-lint', 'build-js']);
	// gulp.watch(src.style,['build-css']);
	// gulp.watch([src.html], function(){
	// 	browserSync.reload();
	// });
	gulp.watch(['./src/util/*.ts'], ['ts-module']);
})

// ********************** TS *******************************

gulp.task('ts-module', function(){
	return gulp.src(['./src/util/*.ts'])
		.pipe(tsc({
      module: "CommonJS",
      sourcemap: true			
		}))
		.pipe(gulp.dest('./src/utiljs'));
});

// ********************** Karma *******************************

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

// ********************** JS *******************************

// build javascript file
gulp.task('build-js', function(){
	return gulp.src([src.scriptNM, src.scriptM])
		.pipe(sourcemaps.init())
		.pipe(tsc())		
		.pipe(concat(fileName))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(des.script));
})

// minify javascript file
gulp.task('minify-js', ['build-js'], function(){
	return gulp.src(des.script+'kmk.js')
		.pipe(rename('kmk.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(des.script))
})

// ********************* SASS *******************************

// build css file
gulp.task('build-css',function(){
	return gulp.src(src.style)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(concat('style.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(des.style));
});

// minify css file
gulp.task('minify-css',['build-css'],function(){
	return gulp.src(des.style+'style.css')
		.pipe(rename('style.min.css'))
		.pipe(minifyCss())
		.pipe(gulp.dest(des.style))
})

// ********************* nodemon *******************************

gulp.task('browser-sync', ['nodemon'], function(){
	browserSync.init(null, {
		proxy: "http://localhost:3000",
		port: "5000"
	});
});

gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return nodemon({
		script: 'server.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	}).on('restart', function onRestart() {
    // reload connected browsers after a slight delay
    setTimeout(function reload() {
      browserSync.reload({
        stream: false
      });
    }, 500);
  });
});