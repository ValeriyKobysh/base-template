const gulp = require('gulp'),
      browserSync = require('browser-sync').create(),
      plumber = require('gulp-plumber'),
      notify = require('gulp-notify');

const paths = {
    root: './dist',
    templates: {
        pages: 'src/views/*.pug',
        dist: 'dist/'
    },
    styles: {
        source: './src/sass/index.sass',
        dist: 'dist/css'
    },
    images: {
        source: './src/images/**/*.*',
        dist: 'dist/img'
    }
}

const pug = require('gulp-pug');
/**
 * ***PUG***
 */
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(plumber({
            errorHandler: notify.onError(function(error){
                return {
                    title: "Style",
                    message: error.message
                };
            })
        }))
        .pipe(pug({ pretty: true }))
        .pipe(notify("HTML is done"))
        .pipe(gulp.dest(paths.templates.dist));
}

const sass = require('gulp-sass'),
      rename = require('gulp-rename'),
      sourcemaps = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      csso = require('gulp-csso');
/**
 * ***SASS***
 */
function styles() {
    return gulp.src(paths.styles.source)
        .pipe(plumber({
            errorHandler: notify.onError(function(error){
                return {
                    title: "Style",
                    message: error.message
                };
            })
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(sourcemaps.write())
        .pipe(rename({ suffix: '.min' }))
        .pipe(notify("Styles is done"))
        .pipe(gulp.dest(paths.styles.dist))
}
/**
 * ***IMAGES***
 */
function images() {
    return gulp.src(paths.images.source)
        .pipe(gulp.dest(paths.images.dist));
}

const del = require('del');
/**
 * ***CLEAR DIST DIR***
 */
function clear(){
    return del(paths.root);
}
/**
 * ***WATCH SOURCE FILES***
 */
function watch() {
    gulp.watch(paths.styles.source, styles);
    gulp.watch(paths.templates.pages, templates);
    gulp.watch(paths.images.source, images);
}
/**
 * ***WATCH BUILD FILES AND RELOAD BROWSER***
 */
function server(){
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}


exports.templates = templates;
exports.styles = styles;
exports.clear = clear;
exports.images = images;

gulp.task('default', gulp.series(
    gulp.parallel(styles, templates, images),
    gulp.parallel(watch, server)
));

gulp.task('build', gulp.series(
    clear,
    gulp.parallel(styles, templates, images)
));