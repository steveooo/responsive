var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var order = require('gulp-order');
var ngmin = require('gulp-ngmin');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var htmlmin = require('gulp-htmlmin');

require('es6-promise').polyfill();

gulp.task('html', function(){
    gulp.src(['html/**/*.html'])
        .pipe(plumber())
        .pipe(gulp.dest('../dist'))
});

gulp.task('assets', function(){
    gulp.src(['../assets/**/*.*'])
        .pipe(gulp.dest('../dist/assets'))
});

gulp.task('babel', function(){
    gulp.src(['js/*.js'])
		 .pipe(order([
		    "_init.js",
		    "main.js"
		 ]))
        .pipe(plumber())
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(ngmin())
        .pipe(uglify())
        .pipe(gulp.dest('../dist'));
    
    gulp.src(['js/libs/*.{js,map}'])
    .pipe(gulp.dest('../dist/js/libs'));
});

gulp.task('scss', function(){
    gulp.src(['scss/app.scss'])
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
        	browsers: ['> 5% in US', 'not ie < 10'],
            cascade: false
        }))
        .pipe(concat('app.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest('../dist'));
    

    gulp.src(['scss/libs/*.css'])
    .pipe(gulp.dest('../dist/css/libs'));
});

gulp.task('styles', ['scss']);
gulp.task('scripts', ['babel']);
gulp.task('build', ['scripts', 'styles', 'assets', 'html']);

gulp.task('watch', ['build'], function(){
    gulp.watch('html/**/*.html', ['html']);
    gulp.watch('js/**/*.js', ['scripts']);
    gulp.watch('scss/**/*.scss', ['styles']);
});
